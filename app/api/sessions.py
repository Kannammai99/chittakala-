from fastapi import APIRouter, HTTPException, status
from app.models.session import Session, SessionCheckInUpdate, SessionCreate, SessionSummary
from app.services.session_service import SessionService

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
