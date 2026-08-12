import uuid
from datetime import datetime, timezone
from typing import Dict, Optional
from app.models.session import Session, SessionCreate
from app.services.art_service import ArtService


class SessionService:
    # In-memory session store (ready to swap with Firestore implementation)
    _sessions: Dict[str, Session] = {}

    @classmethod
    def create_session(cls, data: SessionCreate) -> Session:
        """Validate exercise hierarchy and create a new operational session."""
        # 1. Validate exercise existence and hierarchy
        exercise = ArtService.get_exercise_by_id(data.exercise_id)
        if not exercise:
            raise ValueError(f"Exercise '{data.exercise_id}' not found or inactive.")
        
        if exercise.art_form_id != data.art_form_id:
            raise ValueError(f"Exercise '{data.exercise_id}' does not belong to art form '{data.art_form_id}'.")

        if exercise.category_id != data.category_id:
            raise ValueError(f"Exercise '{data.exercise_id}' does not belong to category '{data.category_id}'.")

        # 2. Generate identifiers
        session_id = f"sess_{uuid.uuid4().hex[:12]}"
        anonymous_user_id = f"anon_{uuid.uuid4().hex[:12]}"

        # 3. Build session object
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

        # 4. Save to store
        cls._sessions[session_id] = session
        return session

    @classmethod
    def get_session(cls, session_id: str) -> Optional[Session]:
        """Retrieve an operational session by ID."""
        return cls._sessions.get(session_id)

    @classmethod
    def clear_all(cls) -> None:
        """Reset in-memory session store (used in test setup)."""
        cls._sessions.clear()
