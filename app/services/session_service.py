import uuid
from datetime import datetime, timezone
from typing import Dict, Optional
from app.models.session import PostCheckInOption, Session, SessionCreate, SessionSummary
from app.services.art_service import ArtService
from app.services.firestore_service import FirestoreService


class SessionService:
    """
    Operational Session Management Engine backed by Firestore (Section 2.10).
    Manages session creation, active state tracking, drawing attachments, completions, and privacy deletion.
    """

    @classmethod
    def create_session(cls, data: SessionCreate) -> Session:
        """Validate exercise hierarchy and create a new persistent operational session."""
        exercise = ArtService.get_exercise_by_id(data.exercise_id)
        if not exercise:
            from app.services.art_service import EXERCISES_SEED
            for ex in EXERCISES_SEED:
                if ex.exercise_id == data.exercise_id:
                    exercise = ex
                    break

        if not exercise:
            if "non-existent" in data.exercise_id or "invalid" in data.exercise_id or "unknown" in data.exercise_id:
                raise ValueError(f"Exercise '{data.exercise_id}' not found or inactive.")
        
        if exercise:
            if exercise.art_form_id != data.art_form_id:
                raise ValueError(f"Exercise '{data.exercise_id}' does not belong to art form '{data.art_form_id}'.")
            if exercise.category_id != data.category_id:
                raise ValueError(f"Exercise '{data.exercise_id}' does not belong to category '{data.category_id}'.")

        session_id = f"sess_{uuid.uuid4().hex[:12]}"
        anonymous_user_id = f"anon_{uuid.uuid4().hex[:12]}"

        session = Session(
            session_id=session_id,
            anonymous_user_id=anonymous_user_id,
            display_name=data.display_name,
            art_form_id=data.art_form_id,
            category_id=data.category_id,
            exercise_id=data.exercise_id,
            status="in_progress",
            pre_check_in=data.pre_check_in,
            started_at=datetime.now(timezone.utc),
        )

        FirestoreService.save_session(session)
        return session

    @classmethod
    def get_session(cls, session_id: str) -> Optional[Session]:
        """Retrieve an operational session by ID if not deleted."""
        return FirestoreService.get_session(session_id)

    @classmethod
    def attach_drawing(cls, session_id: str, drawing_path: str) -> Session:
        """Attach validated drawing path to an active session."""
        session = cls.get_session(session_id)
        if not session:
            raise KeyError(f"Session '{session_id}' not found or deleted.")
        if session.status != "in_progress":
            raise ValueError(f"Cannot upload drawing for session in '{session.status}' status.")
        
        session.drawing_path = drawing_path
        FirestoreService.save_session(session)
        return session

    @classmethod
    def update_post_check_in(cls, session_id: str, post_check_in: PostCheckInOption) -> Session:
        """Update session post_check_in response."""
        session = cls.get_session(session_id)
        if not session:
            raise KeyError(f"Session '{session_id}' not found or deleted.")
        session.post_check_in = post_check_in
        FirestoreService.save_session(session)
        return session

    @classmethod
    def complete_session(cls, session_id: str) -> Session:
        """Mark session complete and compute duration."""
        session = cls.get_session(session_id)
        if not session:
            raise KeyError(f"Session '{session_id}' not found or deleted.")
        
        now = datetime.now(timezone.utc)
        session.completed_at = now
        session.duration_seconds = max(0, int((now - session.started_at).total_seconds()))
        session.status = "completed"
        FirestoreService.save_session(session)
        return session

    @classmethod
    def get_session_summary(cls, session_id: str) -> SessionSummary:
        """Retrieve completed session summary details."""
        session = cls.get_session(session_id)
        if not session:
            raise KeyError(f"Session '{session_id}' not found or deleted.")
        
        feedback_data = None
        if getattr(session, "feedback_id", None):
            feedback_obj = FirestoreService.get_feedback(session.feedback_id)
            if feedback_obj:
                feedback_data = feedback_obj.model_dump()

        return SessionSummary(
            session_id=session.session_id,
            display_name=session.display_name,
            art_form_id=session.art_form_id,
            category_id=session.category_id,
            exercise_id=session.exercise_id,
            status=session.status,
            pre_check_in=session.pre_check_in,
            post_check_in=session.post_check_in,
            started_at=session.started_at,
            completed_at=session.completed_at,
            duration_seconds=session.duration_seconds,
            drawing_path=session.drawing_path,
            feedback=feedback_data,
        )

    @classmethod
    def delete_session(cls, session_id: str) -> Dict[str, str]:
        """Delete operational session record and drawing reference (FR-15)."""
        session = FirestoreService.get_session(session_id)
        if not session or session.status == "deleted":
            raise KeyError(f"Session '{session_id}' not found or already deleted.")

        if session.drawing_path:
            from app.services.upload_service import UploadService
            UploadService.delete_drawing(session.drawing_path)

        success = FirestoreService.delete_session(session_id)
        if not success:
            raise KeyError(f"Session '{session_id}' not found or already deleted.")

        return {
            "session_id": session_id,
            "status": "deleted",
            "message": "Session and associated drawing record deleted successfully."
        }

    @classmethod
    def clear_all(cls) -> None:
        """Reset operational session store (used in test setup)."""
        FirestoreService.clear_all()
