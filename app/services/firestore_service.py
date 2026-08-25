import os
import logging
from typing import Dict, List, Optional, Any
from datetime import datetime, timezone

from app.models.art_form import ArtForm
from app.models.category import Category
from app.models.exercise import Exercise
from app.models.session import Session
from app.models.feedback import Feedback
from app.models.reminder import Reminder

logger = logging.getLogger("chittakala.firestore")

try:
    from google.cloud import firestore
    FIRESTORE_SDK_AVAILABLE = True
except ImportError:
    FIRESTORE_SDK_AVAILABLE = False


class FirestoreService:
    """
    Data Design & Operational Persistence Engine (Section 2.10).
    Manages Firestore collections: art_forms, categories, exercises, sessions, feedback, reminders.
    Falls back gracefully to in-memory store when Firestore SDK/credentials/project are uninitialized locally.
    """

    _db_client = None
    _initialized = False
    _use_firestore = False

    # In-memory document fallback store
    _in_memory_docs: Dict[str, Dict[str, dict]] = {
        "art_forms": {},
        "categories": {},
        "exercises": {},
        "sessions": {},
        "feedback": {},
        "reminders": {},
    }

    @classmethod
    def get_client(cls):
        """Lazy-initialize Firestore client with fallback support."""
        if not cls._initialized:
            cls._initialized = True
            emulator_host = os.environ.get("FIRESTORE_EMULATOR_HOST")
            creds_file = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
            cloud_run = os.environ.get("K_SERVICE")  # Present on GCP Cloud Run
            gcp_project = os.environ.get("GOOGLE_CLOUD_PROJECT")

            if FIRESTORE_SDK_AVAILABLE and (gcp_project or emulator_host or creds_file or cloud_run):
                target_project = gcp_project or "chittakala"
                try:
                    if emulator_host:
                        logger.info(f"Connecting to Firestore Emulator at {emulator_host}")
                    else:
                        logger.info(f"Initializing Firestore client for GCP Project '{target_project}'.")
                    cls._db_client = firestore.Client(project=target_project)
                    cls._use_firestore = True
                except Exception as exc:
                    logger.warning(f"Firestore Client initialization falling back to in-memory mode: {exc}")
                    cls._use_firestore = False
            else:
                logger.info("Firestore running in in-memory persistence mode.")
                cls._use_firestore = False

        return cls._db_client if cls._use_firestore else None

    # Helper to serialize datetimes to ISO strings for document storage
    @staticmethod
    def _serialize_doc(doc_dict: dict) -> dict:
        serialized = {}
        for k, v in doc_dict.items():
            if isinstance(v, datetime):
                serialized[k] = v.isoformat()
            else:
                serialized[k] = v
        return serialized

    # Helper to deserialize ISO strings to datetimes
    @staticmethod
    def _deserialize_doc(doc_dict: dict) -> dict:
        deserialized = {}
        for k, v in doc_dict.items():
            if isinstance(v, str) and (v.endswith("+00:00") or v.endswith("Z")) and len(v) >= 19 and "T" in v:
                try:
                    deserialized[k] = datetime.fromisoformat(v.replace("Z", "+00:00"))
                except ValueError:
                    deserialized[k] = v
            else:
                deserialized[k] = v
        return deserialized

    # --- ART FORMS ---
    @classmethod
    def save_art_form(cls, art_form: ArtForm) -> None:
        client = cls.get_client()
        doc_data = cls._serialize_doc(art_form.model_dump())
        if client:
            try:
                client.collection("art_forms").document(art_form.art_form_id).set(doc_data)
                return
            except Exception as exc:
                logger.warning(f"Firestore save_art_form failed, using in-memory fallback: {exc}")
                cls._use_firestore = False
        cls._in_memory_docs["art_forms"][art_form.art_form_id] = doc_data

    @classmethod
    def get_art_forms(cls) -> List[ArtForm]:
        client = cls.get_client()
        art_forms = []
        if client:
            try:
                docs = client.collection("art_forms").where("active", "==", True).stream()
                for doc in docs:
                    data = cls._deserialize_doc(doc.to_dict())
                    art_forms.append(ArtForm(**data))
                art_forms.sort(key=lambda x: x.display_order)
                return art_forms
            except Exception as exc:
                logger.warning(f"Firestore get_art_forms failed, using in-memory fallback: {exc}")
                cls._use_firestore = False

        for doc_data in cls._in_memory_docs["art_forms"].values():
            if doc_data.get("active", True):
                data = cls._deserialize_doc(doc_data)
                art_forms.append(ArtForm(**data))
        art_forms.sort(key=lambda x: x.display_order)
        return art_forms

    @classmethod
    def get_art_form(cls, art_form_id: str) -> Optional[ArtForm]:
        client = cls.get_client()
        if client:
            try:
                doc = client.collection("art_forms").document(art_form_id).get()
                if doc.exists:
                    data = cls._deserialize_doc(doc.to_dict())
                    return ArtForm(**data)
            except Exception as exc:
                logger.warning(f"Firestore get_art_form failed, using in-memory fallback: {exc}")
                cls._use_firestore = False

        doc_data = cls._in_memory_docs["art_forms"].get(art_form_id)
        if doc_data:
            data = cls._deserialize_doc(doc_data)
            return ArtForm(**data)
        return None

    # --- CATEGORIES ---
    @classmethod
    def save_category(cls, category: Category) -> None:
        client = cls.get_client()
        doc_data = cls._serialize_doc(category.model_dump())
        if client:
            try:
                client.collection("categories").document(category.category_id).set(doc_data)
                return
            except Exception as exc:
                logger.warning(f"Firestore save_category failed, using in-memory fallback: {exc}")
                cls._use_firestore = False
        cls._in_memory_docs["categories"][category.category_id] = doc_data

    @classmethod
    def get_categories_by_art_form(cls, art_form_id: str) -> List[Category]:
        client = cls.get_client()
        categories = []
        if client:
            try:
                docs = client.collection("categories").where("art_form_id", "==", art_form_id).where("active", "==", True).stream()
                for doc in docs:
                    data = cls._deserialize_doc(doc.to_dict())
                    categories.append(Category(**data))
                categories.sort(key=lambda x: x.display_order)
                return categories
            except Exception as exc:
                logger.warning(f"Firestore get_categories_by_art_form failed, using in-memory fallback: {exc}")
                cls._use_firestore = False

        for doc_data in cls._in_memory_docs["categories"].values():
            if doc_data.get("art_form_id") == art_form_id and doc_data.get("active", True):
                data = cls._deserialize_doc(doc_data)
                categories.append(Category(**data))
        categories.sort(key=lambda x: x.display_order)
        return categories

    @classmethod
    def get_category(cls, category_id: str) -> Optional[Category]:
        client = cls.get_client()
        if client:
            try:
                doc = client.collection("categories").document(category_id).get()
                if doc.exists:
                    data = cls._deserialize_doc(doc.to_dict())
                    return Category(**data)
            except Exception as exc:
                logger.warning(f"Firestore get_category failed, using in-memory fallback: {exc}")
                cls._use_firestore = False

        doc_data = cls._in_memory_docs["categories"].get(category_id)
        if doc_data:
            data = cls._deserialize_doc(doc_data)
            return Category(**data)
        return None

    # --- EXERCISES ---
    @classmethod
    def save_exercise(cls, exercise: Exercise) -> None:
        client = cls.get_client()
        doc_data = cls._serialize_doc(exercise.model_dump())
        if client:
            try:
                client.collection("exercises").document(exercise.exercise_id).set(doc_data)
                return
            except Exception as exc:
                logger.warning(f"Firestore save_exercise failed, using in-memory fallback: {exc}")
                cls._use_firestore = False
        cls._in_memory_docs["exercises"][exercise.exercise_id] = doc_data

    @classmethod
    def get_exercises_by_category(cls, category_id: str) -> List[Exercise]:
        client = cls.get_client()
        exercises = []
        if client:
            try:
                docs = client.collection("exercises").where("category_id", "==", category_id).where("active", "==", True).stream()
                for doc in docs:
                    data = cls._deserialize_doc(doc.to_dict())
                    exercises.append(Exercise(**data))
                return exercises
            except Exception as exc:
                logger.warning(f"Firestore get_exercises_by_category failed, using in-memory fallback: {exc}")
                cls._use_firestore = False

        for doc_data in cls._in_memory_docs["exercises"].values():
            if doc_data.get("category_id") == category_id and doc_data.get("active", True):
                data = cls._deserialize_doc(doc_data)
                exercises.append(Exercise(**data))
        return exercises

    @classmethod
    def get_exercise(cls, exercise_id: str) -> Optional[Exercise]:
        client = cls.get_client()
        if client:
            try:
                doc = client.collection("exercises").document(exercise_id).get()
                if doc.exists:
                    data = cls._deserialize_doc(doc.to_dict())
                    return Exercise(**data)
            except Exception as exc:
                logger.warning(f"Firestore get_exercise failed, using in-memory fallback: {exc}")
                cls._use_firestore = False

        doc_data = cls._in_memory_docs["exercises"].get(exercise_id)
        if doc_data:
            data = cls._deserialize_doc(doc_data)
            return Exercise(**data)
        return None

    # --- SESSIONS ---
    @classmethod
    def save_session(cls, session: Session) -> None:
        client = cls.get_client()
        doc_data = cls._serialize_doc(session.model_dump())
        if client:
            try:
                client.collection("sessions").document(session.session_id).set(doc_data)
                # Keep in-memory in sync
                cls._in_memory_docs["sessions"][session.session_id] = doc_data
                return
            except Exception as exc:
                logger.warning(f"Firestore save_session failed, using in-memory fallback: {exc}")
                cls._use_firestore = False
        cls._in_memory_docs["sessions"][session.session_id] = doc_data

    @classmethod
    def get_session(cls, session_id: str) -> Optional[Session]:
        client = cls.get_client()
        if client:
            try:
                doc = client.collection("sessions").document(session_id).get()
                if doc.exists:
                    data = cls._deserialize_doc(doc.to_dict())
                    session = Session(**data)
                    if session.status != "deleted":
                        return session
            except Exception as exc:
                logger.warning(f"Firestore get_session failed, using in-memory fallback: {exc}")
                cls._use_firestore = False

        doc_data = cls._in_memory_docs["sessions"].get(session_id)
        if doc_data:
            data = cls._deserialize_doc(doc_data)
            session = Session(**data)
            if session.status != "deleted":
                return session
        return None

    @classmethod
    def delete_session(cls, session_id: str) -> bool:
        client = cls.get_client()
        if client:
            try:
                doc_ref = client.collection("sessions").document(session_id)
                doc = doc_ref.get()
                if doc.exists:
                    doc_ref.update({
                        "status": "deleted",
                        "display_name": None,
                        "drawing_path": None,
                    })
                    cls._in_memory_docs.pop(session_id, None)
                    return True
            except Exception as exc:
                logger.warning(f"Firestore delete_session failed, using in-memory fallback: {exc}")
                cls._use_firestore = False

        if session_id in cls._in_memory_docs["sessions"]:
            doc_data = cls._in_memory_docs["sessions"][session_id]
            doc_data["status"] = "deleted"
            doc_data["display_name"] = None
            doc_data["drawing_path"] = None
            cls._in_memory_docs["sessions"].pop(session_id, None)
            return True
        return False

    # --- FEEDBACK ---
    @classmethod
    def save_feedback(cls, feedback: Feedback) -> None:
        client = cls.get_client()
        doc_data = cls._serialize_doc(feedback.model_dump())
        if client:
            try:
                client.collection("feedback").document(feedback.feedback_id).set(doc_data)
                cls.update_session_feedback(feedback.session_id, feedback.feedback_id)
                cls._in_memory_docs["feedback"][feedback.feedback_id] = doc_data
                return
            except Exception as exc:
                logger.warning(f"Firestore save_feedback failed, using in-memory fallback: {exc}")
                cls._use_firestore = False

        cls._in_memory_docs["feedback"][feedback.feedback_id] = doc_data
        cls.update_session_feedback(feedback.session_id, feedback.feedback_id)

    @classmethod
    def get_feedback(cls, feedback_id: str) -> Optional[Feedback]:
        client = cls.get_client()
        if client:
            try:
                doc = client.collection("feedback").document(feedback_id).get()
                if doc.exists:
                    data = cls._deserialize_doc(doc.to_dict())
                    return Feedback(**data)
            except Exception as exc:
                logger.warning(f"Firestore get_feedback failed, using in-memory fallback: {exc}")
                cls._use_firestore = False

        doc_data = cls._in_memory_docs["feedback"].get(feedback_id)
        if doc_data:
            data = cls._deserialize_doc(doc_data)
            return Feedback(**data)
        return None

    @classmethod
    def update_session_feedback(cls, session_id: str, feedback_id: str) -> None:
        client = cls.get_client()
        if client:
            try:
                doc_ref = client.collection("sessions").document(session_id)
                if doc_ref.get().exists:
                    doc_ref.update({"feedback_id": feedback_id})
            except Exception:
                pass
        if session_id in cls._in_memory_docs["sessions"]:
            cls._in_memory_docs["sessions"][session_id]["feedback_id"] = feedback_id

    # --- REMINDERS ---
    @classmethod
    def save_reminder(cls, reminder: Reminder) -> None:
        client = cls.get_client()
        doc_data = cls._serialize_doc(reminder.model_dump())
        if client:
            try:
                client.collection("reminders").document(reminder.reminder_id).set(doc_data)
                return
            except Exception as exc:
                logger.warning(f"Firestore save_reminder failed, using in-memory fallback: {exc}")
                cls._use_firestore = False
        cls._in_memory_docs["reminders"][reminder.reminder_id] = doc_data

    @classmethod
    def get_reminder(cls, reminder_id: str) -> Optional[Reminder]:
        client = cls.get_client()
        if client:
            try:
                doc = client.collection("reminders").document(reminder_id).get()
                if doc.exists:
                    data = cls._deserialize_doc(doc.to_dict())
                    return Reminder(**data)
            except Exception as exc:
                logger.warning(f"Firestore get_reminder failed, using in-memory fallback: {exc}")
                cls._use_firestore = False

        doc_data = cls._in_memory_docs["reminders"].get(reminder_id)
        if doc_data:
            data = cls._deserialize_doc(doc_data)
            return Reminder(**data)
        return None

    # --- CATALOG AUTO-SEEDING ---
    @classmethod
    def seed_catalog_if_empty(cls, art_forms: List[ArtForm], categories: List[Category], exercises: List[Exercise]) -> None:
        """Seed catalog collections into Firestore / in-memory store if catalog is empty."""
        client = cls.get_client()
        if client:
            try:
                existing = client.collection("art_forms").limit(1).get()
                if len(existing) == 0:
                    logger.info("Seeding initial catalog into Cloud Firestore...")
                    for af in art_forms:
                        cls.save_art_form(af)
                    for cat in categories:
                        cls.save_category(cat)
                    for ex in exercises:
                        cls.save_exercise(ex)
                return
            except Exception as exc:
                logger.warning(f"Firestore seed_catalog_if_empty failed, using in-memory fallback: {exc}")
                cls._use_firestore = False

        if not cls._in_memory_docs["art_forms"]:
            logger.info("Seeding initial catalog into in-memory store...")
            for af in art_forms:
                cls.save_art_form(af)
            for cat in categories:
                cls.save_category(cat)
            for ex in exercises:
                cls.save_exercise(ex)

    @classmethod
    def clear_all(cls) -> None:
        """Clear all in-memory docs (used in unit test setup)."""
        for coll in cls._in_memory_docs:
            cls._in_memory_docs[coll].clear()
