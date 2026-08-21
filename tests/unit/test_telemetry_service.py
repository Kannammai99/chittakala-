import pytest
from app.services.telemetry_service import BigQueryTelemetryService, compute_mood_shift_index


def test_compute_mood_shift_index():
    # Test positive mood shift: restless (-1) -> slower (+1) => +2.0
    shift_pos = compute_mood_shift_index("restless", "slower")
    assert shift_pos == 2.0

    # Test neutral mood shift: quiet (0) -> about-the-same (0) => 0.0
    shift_neutral = compute_mood_shift_index("quiet", "about-the-same")
    assert shift_neutral == 0.0

    # Test negative mood shift: quiet (0) -> faster (1) => +1.0
    shift_val = compute_mood_shift_index("quiet", "faster")
    assert shift_val == 1.0


def test_log_product_event_buffering():
    telemetry = BigQueryTelemetryService(project_id="chittakala-test")
    telemetry.clear_buffers()

    event = telemetry.log_product_event(
        session_id="sess_test_123",
        anonymous_user_id="anon_user_456",
        art_form_id="warli",
        category_id="basic-figures",
        exercise_id="warli-basic-01",
        pre_check_in="restless",
        post_check_in="slower",
        duration_seconds=300,
        status="completed"
    )

    assert event["session_id"] == "sess_test_123"
    assert event["art_form_id"] == "warli"
    assert event["mood_shift_index"] == 2.0
    assert len(telemetry.get_local_product_events()) == 1


def test_log_ai_reliability_event_buffering():
    telemetry = BigQueryTelemetryService(project_id="chittakala-test")
    telemetry.clear_buffers()

    event = telemetry.log_ai_reliability_event(
        session_id="sess_test_123",
        model_name="gemini-3.6-flash",
        latency_ms=450,
        fallback_used=False,
        safety_status="safe",
        needs_retake=False
    )

    assert event["session_id"] == "sess_test_123"
    assert event["latency_ms"] == 450
    assert event["fallback_used"] is False
    assert len(telemetry.get_local_ai_events()) == 1
