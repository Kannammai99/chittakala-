import pytest
from app.services.telemetry_service import BigQueryTelemetryService


def test_offline_telemetry_event_queue():
    service = BigQueryTelemetryService(project_id="chittakala-test")
    service.clear_buffers()

    # Log product event
    prod_row = service.log_product_event(
        session_id="sess_offline_001",
        anonymous_user_id="anon_offline",
        art_form_id="warli",
        category_id="basic-figures",
        exercise_id="warli-basic-01",
        pre_check_in="busy",
        post_check_in="slower",
        duration_seconds=300,
        status="completed"
    )

    assert prod_row["session_id"] == "sess_offline_001"
    assert prod_row["status"] == "completed"

    events = service.get_local_product_events()
    assert len(events) == 1
    assert events[0]["event_id"] == prod_row["event_id"]
    assert events[0]["mood_shift_index"] == 2.0


def test_offline_ai_feedback_event_queue():
    service = BigQueryTelemetryService(project_id="chittakala-test")
    service.clear_buffers()

    fb_row = service.log_ai_feedback_event(
        session_id="sess_offline_002",
        rating="yes",
        reason_tag="none",
        anonymous_user_id="anon_offline"
    )

    assert fb_row["session_id"] == "sess_offline_002"
    assert fb_row["rating"] == "yes"

    feedbacks = service.get_local_feedback_events()
    assert len(feedbacks) == 1
    assert feedbacks[0]["event_id"] == fb_row["event_id"]
