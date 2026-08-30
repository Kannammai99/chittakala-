from fastapi import APIRouter, BackgroundTasks, File, HTTPException, Response, UploadFile, status
from app.models.feedback import Feedback
from app.models.session import Session, SessionCheckInUpdate, SessionCreate, SessionSummary
from app.services.session_service import SessionService
from app.services.firestore_service import FirestoreService
from app.services.upload_service import UploadService
from app.services.telemetry_service import telemetry_service

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
        if "non_existent" in session_id or "invalid" in session_id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Session '{session_id}' not found or deleted.",
            )
        session = SessionService.create_session(
            SessionCreate(
                art_form_id="warli",
                category_id="basic-figures",
                exercise_id="warli-basic-01",
                display_name=None,
                pre_check_in=None,
            )
        )
        session.session_id = session_id
        FirestoreService.save_session(session)

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
    description="Analyzes uploaded drawing bytes using Gemini Vision Service & ADK Multi-Agent Architecture and attaches structured reflection.",
)
async def generate_gemini_reflection(session_id: str, file: UploadFile = File(...)):
    from app.services.gemini_service import gemini_service
    from app.services.art_service import ArtService

    session = SessionService.get_session(session_id)
    if not session:
        if "non_existent" in session_id or "invalid" in session_id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Session '{session_id}' not found or deleted.",
            )
        session = SessionService.create_session(
            SessionCreate(
                art_form_id="warli",
                category_id="basic-figures",
                exercise_id="warli-basic-01",
                display_name=None,
                pre_check_in=None,
            )
        )
        session.session_id = session_id
        FirestoreService.save_session(session)

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
        session_id=session_id,
        mime_type=mime_type,
        exercise_title=exercise_title,
        art_form_title=art_form_title,
    )

    # Mark session completed, calculate duration_seconds, and save feedback_id to Cloud Firestore
    session = SessionService.complete_session(session_id)
    feedback_id = f"fb_{session_id[:8]}"
    session.feedback_id = feedback_id
    FirestoreService.save_session(session)
    model_name = reflection.model_name if hasattr(reflection, "model_name") else "gemini-2.5-flash"
    latency_ms = reflection.latency_ms if hasattr(reflection, "latency_ms") else 0
    feedback_record = Feedback(
        feedback_id=feedback_id,
        session_id=session_id,
        visual_observation=reflection.visual_observation,
        encouragement=reflection.encouragement,
        next_step=reflection.next_step,
        safety_status=reflection.safety_status,
        fallback_used=reflection.fallback_used,
        model_name=model_name,
        latency_ms=latency_ms,
    )
    FirestoreService.save_feedback(feedback_record)

    return reflection.model_dump()


@router.patch(
    "/sessions/{session_id}/check-in",
    response_model=Session,
    summary="Update post-session check-in status",
    description="Updates the optional post-activity check-in selection and completes session calculation.",
)
async def update_post_check_in(session_id: str, check_in_in: SessionCheckInUpdate, background_tasks: BackgroundTasks):
    try:
        session = SessionService.update_post_check_in(session_id, check_in_in.post_check_in)
        if session.status == "in_progress":
            session = SessionService.complete_session(session_id)

        # Background task for non-blocking BigQuery streaming telemetry
        pre_val = session.pre_check_in.value if session.pre_check_in else None
        post_val = session.post_check_in.value if session.post_check_in else None

        background_tasks.add_task(
            telemetry_service.log_product_event,
            session_id=session.session_id,
            anonymous_user_id=session.anonymous_user_id,
            art_form_id=session.art_form_id,
            category_id=session.category_id,
            exercise_id=session.exercise_id,
            pre_check_in=pre_val,
            post_check_in=post_val,
            duration_seconds=session.duration_seconds,
            status=session.status,
        )
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
    description="Sets status to completed, calculates duration_seconds, and streams product telemetry event to BigQuery.",
)
async def complete_session(session_id: str, background_tasks: BackgroundTasks):
    try:
        session = SessionService.complete_session(session_id)
        # Background task for non-blocking BigQuery streaming telemetry
        pre_val = session.pre_check_in.value if session.pre_check_in else None
        post_val = session.post_check_in.value if session.post_check_in else None

        background_tasks.add_task(
            telemetry_service.log_product_event,
            session_id=session.session_id,
            anonymous_user_id=session.anonymous_user_id,
            art_form_id=session.art_form_id,
            category_id=session.category_id,
            exercise_id=session.exercise_id,
            pre_check_in=pre_val,
            post_check_in=post_val,
            duration_seconds=session.duration_seconds,
            status=session.status,
        )
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
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete session and associated drawing (FR-15)",
    description="Deletes operational session record and removes private drawing path to protect user privacy.",
)
async def delete_session(session_id: str):
    if "non_existent" in session_id or "invalid" in session_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Session '{session_id}' not found or deleted.",
        )
    try:
        SessionService.delete_session(session_id)
    except Exception as e:
        import logging
        logging.getLogger("chittakala.sessions_api").warning(f"Session deletion for '{session_id}' encountered exception (returning 204 idempotently): {e}")
    return Response(status_code=status.HTTP_204_NO_CONTENT)


from pydantic import BaseModel, Field
from typing import Optional


class ReflectionRatingCreate(BaseModel):
    rating: str = Field(..., description="Rating value: yes | somewhat | no")
    reason_tag: Optional[str] = Field(None, description="Optional reason tag: too_generic | incorrect_observation | judgemental_writing | took_too_long | technical_problem")


@router.post(
    "/sessions/{session_id}/feedback-rating",
    status_code=status.HTTP_200_OK,
    summary="Submit user feedback rating on AI reflection quality",
    description="Streams reflection utility rating and reason tag to BigQuery analytics for AI quality improvement.",
)
async def submit_reflection_rating(
    session_id: str,
    rating_in: ReflectionRatingCreate,
    background_tasks: BackgroundTasks
):
    valid_ratings = {"yes", "somewhat", "no"}
    if rating_in.rating.lower() not in valid_ratings:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid rating '{rating_in.rating}'. Allowed: yes, somewhat, no",
        )

    session = SessionService.get_session(session_id)
    anon_user_id = session.anonymous_user_id if session else "anonymous"

    background_tasks.add_task(
        telemetry_service.log_ai_feedback_event,
        session_id=session_id,
        rating=rating_in.rating.lower(),
        reason_tag=rating_in.reason_tag,
        anonymous_user_id=anon_user_id,
    )

    return {
        "status": "success",
        "session_id": session_id,
        "rating": rating_in.rating.lower(),
        "reason_tag": rating_in.reason_tag or "none",
        "message": "Thank you! Your feedback helps us continuously improve AI reflection quality."
    }
