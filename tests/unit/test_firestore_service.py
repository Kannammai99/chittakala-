import pytest
from datetime import datetime, timezone
from app.models.art_form import ArtForm
from app.models.category import Category
from app.models.exercise import Exercise
from app.models.session import Session, SessionCreate
from app.models.feedback import Feedback
from app.models.reminder import Reminder
from app.services.firestore_service import FirestoreService
from app.services.session_service import SessionService
from app.services.art_service import ArtService


@pytest.fixture(autouse=True)
def reset_stores():
    """Reset FirestoreService memory store before each test."""
    FirestoreService.clear_all()
    yield
    FirestoreService.clear_all()


def test_firestore_service_catalog_crud():
    """Verify FirestoreService art form, category, and exercise persistence."""
    art_form = ArtForm(
        art_form_id="test_art",
        title="Test Art",
        short_description="Test Description",
        thumbnail_path="/art/test/thumb.png",
        display_order=1,
        active=True
    )
    FirestoreService.save_art_form(art_form)

    retrieved_af = FirestoreService.get_art_form("test_art")
    assert retrieved_af is not None
    assert retrieved_af.title == "Test Art"

    category = Category(
        category_id="test_cat",
        art_form_id="test_art",
        title="Test Category",
        short_description="Test Category Desc",
        thumbnail_path="/art/test/cat.png",
        display_order=1,
        active=True
    )
    FirestoreService.save_category(category)

    cats = FirestoreService.get_categories_by_art_form("test_art")
    assert len(cats) == 1
    assert cats[0].category_id == "test_cat"

    exercise = Exercise(
        exercise_id="test_ex",
        art_form_id="test_art",
        category_id="test_cat",
        title="Test Exercise",
        art_form="Test Art",
        difficulty="beginner",
        short_description="Short desc",
        reference_image_path="/art/test/ex.png",
        visible_elements=["element1"],
        drawing_guidance=["step 1"],
        allowed_next_actions=["repeat", "finish"],
        review_status="reviewed",
        estimated_minutes=5,
        active=True
    )
    FirestoreService.save_exercise(exercise)

    retrieved_ex = FirestoreService.get_exercise("test_ex")
    assert retrieved_ex is not None
    assert retrieved_ex.title == "Test Exercise"


def test_session_service_firestore_persistence():
    """Verify SessionService creates and persists sessions via FirestoreService."""
    create_data = SessionCreate(
        art_form_id="warli",
        category_id="basic-figures",
        exercise_id="warli-basic-01",
        display_name="Test User",
        pre_check_in="quiet"
    )
    session = SessionService.create_session(create_data)
    assert session.session_id.startswith("sess_")
    assert session.status == "in_progress"

    # Retrieve session from store
    fetched = SessionService.get_session(session.session_id)
    assert fetched is not None
    assert fetched.display_name == "Test User"

    # Attach drawing
    updated = SessionService.attach_drawing(session.session_id, "uploads/drawing.png")
    assert updated.drawing_path == "uploads/drawing.png"

    # Complete session
    completed = SessionService.complete_session(session.session_id)
    assert completed.status == "completed"
    assert completed.duration_seconds >= 0

    # Delete session (Privacy NFR)
    result = SessionService.delete_session(session.session_id)
    assert result["status"] == "deleted"

    # Verify deleted session returns None
    assert SessionService.get_session(session.session_id) is None


def test_feedback_and_reminder_persistence():
    """Verify Feedback and Reminder operational records persistence (Section 2.10)."""
    feedback = Feedback(
        feedback_id="fbk_123456",
        session_id="sess_123456",
        visual_observation="Clear geometric triangles observed.",
        encouragement="Great focus on line rhythm.",
        next_step="Try expanding to figure rows.",
        safety_status="passed",
        fallback_used=False,
        model_name="gemini-2.5-flash",
        latency_ms=350
    )
    FirestoreService.save_feedback(feedback)

    retrieved_fb = FirestoreService.get_feedback("fbk_123456")
    assert retrieved_fb is not None
    assert retrieved_fb.visual_observation == "Clear geometric triangles observed."

    reminder = Reminder(
        reminder_id="rem_123456",
        anonymous_user_id="anon_123456",
        status="scheduled",
        delay_minutes=240
    )
    FirestoreService.save_reminder(reminder)

    retrieved_rem = FirestoreService.get_reminder("rem_123456")
    assert retrieved_rem is not None
    assert retrieved_rem.status == "scheduled"
