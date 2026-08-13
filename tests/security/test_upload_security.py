import io
from PIL import Image
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def _generate_valid_image_bytes(fmt: str = "JPEG") -> bytes:
    """Generate minimal valid image byte stream for testing."""
    img = Image.new("RGB", (50, 50), color="white")
    buf = io.BytesIO()
    img.save(buf, format=fmt)
    return buf.getvalue()


def _create_test_session() -> str:
    """Helper to create a fresh in-progress session for testing."""
    res = client.post(
        "/sessions",
        json={
            "art_form_id": "warli",
            "category_id": "basic-figures",
            "exercise_id": "warli-basic-01",
        },
    )
    assert res.status_code == 201
    return res.json()["session_id"]


def test_upload_valid_jpeg_success():
    session_id = _create_test_session()
    jpeg_bytes = _generate_valid_image_bytes(fmt="JPEG")

    files = {"file": ("drawing.jpg", jpeg_bytes, "image/jpeg")}
    response = client.post(f"/sessions/{session_id}/drawing", files=files)

    assert response.status_code == 200
    data = response.json()
    assert data["session_id"] == session_id
    assert data["status"] == "uploaded"
    assert data["content_type"] == "image/jpeg"
    assert "drawing_path" in data


def test_upload_valid_png_success():
    session_id = _create_test_session()
    png_bytes = _generate_valid_image_bytes(fmt="PNG")

    files = {"file": ("drawing.png", png_bytes, "image/png")}
    response = client.post(f"/sessions/{session_id}/drawing", files=files)

    assert response.status_code == 200
    data = response.json()
    assert data["session_id"] == session_id
    assert data["status"] == "uploaded"
    assert data["content_type"] == "image/png"


def test_upload_oversized_image_rejected():
    session_id = _create_test_session()
    # Create 5.5 MB payload (exceeding 5 MB limit)
    oversized_bytes = b"X" * (5 * 1024 * 1024 + 500 * 1024)

    files = {"file": ("large_drawing.jpeg", oversized_bytes, "image/jpeg")}
    response = client.post(f"/sessions/{session_id}/drawing", files=files)

    assert response.status_code == 413
    data = response.json()
    assert "exceeds maximum allowed limit" in data["detail"].lower()


def test_upload_unsupported_extension_rejected():
    session_id = _create_test_session()
    fake_txt_bytes = b"Hello world text payload"

    files = {"file": ("notes.txt", fake_txt_bytes, "text/plain")}
    response = client.post(f"/sessions/{session_id}/drawing", files=files)

    assert response.status_code == 415
    data = response.json()
    assert "unsupported file extension" in data["detail"].lower()


def test_upload_spoofed_file_content_rejected():
    session_id = _create_test_session()
    # File named image.png but containing non-image text code
    spoofed_bytes = b"import sys\nprint('malicious code')"

    files = {"file": ("fake_image.png", spoofed_bytes, "image/png")}
    response = client.post(f"/sessions/{session_id}/drawing", files=files)

    assert response.status_code == 400
    data = response.json()
    assert "malformed, corrupted, or not a valid image" in data["detail"].lower()


def test_upload_to_non_existent_session_returns_404():
    jpeg_bytes = _generate_valid_image_bytes(fmt="JPEG")
    files = {"file": ("drawing.jpg", jpeg_bytes, "image/jpeg")}

    response = client.post("/sessions/sess_non_existent_999/drawing", files=files)
    assert response.status_code == 404
