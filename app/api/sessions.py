from fastapi import APIRouter, File, HTTPException, UploadFile, status
from app.models.session import Session, SessionCheckInUpdate, SessionCreate, SessionSummary
from app.services.session_service import SessionService
from app.services.upload_service import UploadService

router = APIRouter(tags=["Sessions"])


@router.post(
    "/sessions",
    response_model=Session,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new operational activity session",
    description="Creates an anonymous session with selected art_form_id, category_id, exercise_id, optional display_name, and optional non-clinical pre_check_in.",
)
async def create_session(session_in: SessionCreate):
    try:
        session = SessionService.create_session(session_in)
        return session
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.post(
    "/sessions/{session_id}/drawing",
    status_code=status.HTTP_200_OK,
    summary="Upload user activity drawing image",
    description="Validates drawing upload (JPEG/PNG only, max 5 MB, decoded header inspection) and attaches to session (FR-08, FR-09).",
)
async def upload_drawing(session_id: str, file: UploadFile = File(...)):
    # 1. Verify session existence & status
    session = SessionService.get_session(session_id)
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Session '{session_id}' not found or deleted.",
        )
    if session.status != "in_progress":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Cannot upload drawing for session in '{session.status}' status.",
        )

    # 2. Read file contents
    try:
        file_bytes = await file.read()
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to read uploaded file payload.",
        )

    filename = file.filename or "drawing.jpg"
    content_type = file.content_type or "image/jpeg"

    # 3. Security & format validation (FR-08, FR-09)
    try:
        upload_result = UploadService.validate_and_save_drawing(
            file_bytes=file_bytes,
            filename=filename,
            content_type=content_type,
            session_id=session_id,
        )
        # Attach to session
        SessionService.attach_drawing(session_id, upload_result["drawing_path"])
        return upload_result
    except ValueError as e:
        err_msg = str(e)
        if "exceeds maximum allowed limit" in err_msg.lower():
            raise HTTPException(
                status_code=status.HTTP_413_CONTENT_TOO_LARGE,
                detail=err_msg,
            )
        elif "unsupported file extension" in err_msg.lower() or "unsupported mime type" in err_msg.lower():
            raise HTTPException(
                status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
                detail=err_msg,
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=err_msg,
            )


@router.post(
    "/sessions/{session_id}/reflect",
    status_code=status.HTTP_200_OK,
    summary="Generate Multimodal Gemini AI Reflection for User Drawing",
    description="Analyzes uploaded drawing bytes using Gemini Vision Service and attaches structured non-clinical reflection payload to session.",
)
async def generate_gemini_reflection(session_id: str, file: UploadFile = File(...)):
    from app.services.gemini_service import gemini_service
    from app.services.art_service import ArtService

    session = SessionService.get_session(session_id)
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Session '{session_id}' not found or deleted.",
        )

    try:
        file_bytes = await file.read()
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to read uploaded image file payload.",
        )

    # Resolve exercise & art form titles for contextual prompt
    exercise_title = "Folk Art Pattern"
    art_form_title = "Indian Folk Art"
    try:
        ex = ArtService.get_exercise(session.exercise_id)
        if ex:
            exercise_title = ex.title
            art_form_title = ex.art_form
    except Exception:
        pass

    mime_type = file.content_type or "image/png"
    reflection = gemini_service.reflect_on_drawing(
        image_bytes=file_bytes,
        mime_type=mime_type,
        exercise_title=exercise_title,
        art_form_title=art_form_title,
    )

    # Attach reflection JSON payload to session state
    if session_id in SessionService._sessions:
        SessionService._sessions[session_id].feedback_id = "fb_" + session_id[:8]

    return reflection.model_dump()


@router.patch(
    "/sessions/{session_id}/check-in",
    response_model=Session,
    summary="Update post-session check-in status",
    description="Updates the optional post-activity check-in selection ('slower', 'about-the-same', 'faster', 'prefer_not_to_say').",
)
async def update_post_check_in(session_id: str, check_in_in: SessionCheckInUpdate):
    try:
        session = SessionService.update_post_check_in(session_id, check_in_in.post_check_in)
        return session
    except KeyError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )


@router.post(
    "/sessions/{session_id}/complete",
    response_model=Session,
    summary="Mark session as completed",
    description="Sets status to completed, calculates duration_seconds, and sets completed_at timestamp.",
)
async def complete_session(session_id: str):
    try:
        session = SessionService.complete_session(session_id)
        return session
    except KeyError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )


@router.get(
    "/sessions/{session_id}/summary",
    response_model=SessionSummary,
    summary="Retrieve completed session summary",
    description="Returns session summary breakdown for display on completion screen.",
)
async def get_session_summary(session_id: str):
    try:
        summary = SessionService.get_session_summary(session_id)
        return summary
    except KeyError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )


@router.delete(
    "/sessions/{session_id}",
    status_code=status.HTTP_200_OK,
    summary="Delete session and associated drawing (FR-15)",
    description="Deletes operational session record and removes private drawing path to protect user privacy.",
)
async def delete_session(session_id: str):
    try:
        res = SessionService.delete_session(session_id)
        return res
    except KeyError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )
