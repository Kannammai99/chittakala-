from fastapi import APIRouter, HTTPException, status
from app.models.session import Session, SessionCreate
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
