import uuid
from datetime import datetime, timezone
from typing import Dict, Optional
from app.models.session import PostCheckInOption, Session, SessionCreate, SessionSummary
from app.services.art_service import ArtService


class SessionService:
    # In-memory session store (ready to swap with Firestore implementation)
    _sessions: Dict[str, Session] = {}

    @classmethod
    def create_session(cls, data: SessionCreate) -> Session:
        """Validate exercise hierarchy and create a new operational session."""
        exercise = ArtService.get_exercise_by_id(data.exercise_id)
        if not exercise:
            raise ValueError(f"Exercise '{data.exercise_id}' not found or inactive.")
        
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

        cls._sessions[session_id] = session
        return session

    @classmethod
    def get_session(cls, session_id: str) -> Optional[Session]:
        """Retrieve an operational session by ID if not deleted."""
        session = cls._sessions.get(session_id)
        if session and session.status == "deleted":
            return None
        return session

    @classmethod
    def attach_drawing(cls, session_id: str, drawing_path: str) -> Session:
        """Attach validated drawing path to an active session."""
        session = cls.get_session(session_id)
        if not session:
            raise KeyError(f"Session '{session_id}' not found or deleted.")
        if session.status != "in_progress":
            raise ValueError(f"Cannot upload drawing for session in '{session.status}' status.")
        
        session.drawing_path = drawing_path
        return session

    @classmethod
    def update_post_check_in(cls, session_id: str, post_check_in: PostCheckInOption) -> Session:
        """Update session post_check_in response."""
        session = cls.get_session(session_id)
        if not session:
            raise KeyError(f"Session '{session_id}' not found or deleted.")
        session.post_check_in = post_check_in
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
        return session

    @classmethod
    def get_session_summary(cls, session_id: str) -> SessionSummary:
        """Retrieve completed session summary details."""
        session = cls.get_session(session_id)
        if not session:
            raise KeyError(f"Session '{session_id}' not found or deleted.")
        
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
            feedback=None,  # Will be populated when Gemini reflection service is connected
        )

    @classmethod
    def delete_session(cls, session_id: str) -> Dict[str, str]:
        """Delete operational session record and drawing reference (FR-15)."""
        session = cls._sessions.get(session_id)
        if not session or session.status == "deleted":
            raise KeyError(f"Session '{session_id}' not found or already deleted.")

        session.status = "deleted"
        session.display_name = None  # Privacy NFR: remove display_name on deletion
        session.drawing_path = None  # Delete private drawing reference
        # Remove from active map
        cls._sessions.pop(session_id, None)

        return {
            "session_id": session_id,
            "status": "deleted",
            "message": "Session and associated drawing record deleted successfully."
        }

    @classmethod
    def clear_all(cls) -> None:
        """Reset in-memory session store (used in test setup)."""
        cls._sessions.clear()
