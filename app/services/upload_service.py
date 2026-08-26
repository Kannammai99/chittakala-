import io
import os
import uuid
from typing import Dict, Any
from PIL import Image, UnidentifiedImageError

MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024  # 5 MB hard limit
ALLOWED_MIME_TYPES = {"image/jpeg", "image/png"}
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png"}
UPLOAD_DIR = os.path.join("uploads", "drawings")


class UploadService:
    @classmethod
    def validate_and_save_drawing(
        cls,
        file_bytes: bytes,
        filename: str,
        content_type: str,
        session_id: str,
    ) -> Dict[str, Any]:
        """Validate drawing upload against FR-08 and FR-09 security constraints."""
        # 1. Size limit validation (FR-09)
        if len(file_bytes) > MAX_FILE_SIZE_BYTES:
            raise ValueError(f"File size exceeds maximum allowed limit of 5 MB ({len(file_bytes)} bytes provided).")

        if len(file_bytes) == 0:
            raise ValueError("Uploaded file is empty (0 bytes).")

        # 2. Extension validation (FR-09)
        ext = os.path.splitext(filename)[1].lower() if filename else ""
        if ext not in ALLOWED_EXTENSIONS:
            raise ValueError(f"Unsupported file extension '{ext}'. Allowed extensions: .jpg, .jpeg, .png")

        # 3. MIME type validation (FR-08)
        if content_type.lower() not in ALLOWED_MIME_TYPES:
            raise ValueError(f"Unsupported MIME type '{content_type}'. Allowed types: image/jpeg, image/png")

        # 4. Decoded image content header & structure verification (Spoofing Protection - FR-09)
        try:
            image = Image.open(io.BytesIO(file_bytes))
            image.verify()  # Verify image integrity and header
            format_name = (image.format or "").upper()
            if format_name not in {"JPEG", "PNG"}:
                raise ValueError(f"Decoded image format '{format_name}' does not match allowed formats (JPEG/PNG).")
        except (UnidentifiedImageError, OSError, SyntaxError) as e:
            raise ValueError("File content is malformed, corrupted, or not a valid image.")

        # 5. Save to private upload directory
        os.makedirs(UPLOAD_DIR, exist_ok=True)
        unique_filename = f"{session_id}_{uuid.uuid4().hex[:8]}{ext}"
        save_path = os.path.join(UPLOAD_DIR, unique_filename)

        with open(save_path, "wb") as f:
            f.write(file_bytes)

        return {
            "session_id": session_id,
            "drawing_path": save_path.replace("\\", "/"),
            "filename": filename,
            "content_type": content_type,
            "size_bytes": len(file_bytes),
            "status": "uploaded",
        }

    @classmethod
    def delete_drawing(cls, drawing_path: str) -> bool:
        """Physically delete uploaded drawing from disk or Cloud Storage (FR-15)."""
        if not drawing_path:
            return False
        try:
            local_path = drawing_path.replace("/", os.sep)
            if os.path.exists(local_path):
                os.remove(local_path)
                return True
        except Exception:
            pass
        return False
