from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_create_valid_session_full():
    payload = {
        "art_form_id": "warli",
        "category_id": "basic-figures",
        "exercise_id": "warli-basic-01",
        "pre_check_in": "busy",
        "display_name": "  Kanna  ",
    }
    response = client.post("/sessions", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert "session_id" in data
    assert data["session_id"].startswith("sess_")
    assert "anonymous_user_id" in data
    assert data["anonymous_user_id"].startswith("anon_")
    # Assert display_name whitespace was trimmed
    assert data["display_name"] == "Kanna"
    assert data["art_form_id"] == "warli"
    assert data["category_id"] == "basic-figures"
    assert data["exercise_id"] == "warli-basic-01"
    assert data["pre_check_in"] == "busy"
    assert data["status"] == "in_progress"
    assert "started_at" in data


def test_create_session_without_display_name():
    payload = {
        "art_form_id": "kolam",
        "category_id": "simple-dot-kolams",
        "exercise_id": "kolam-dot-01",
        "pre_check_in": "quiet",
    }
    response = client.post("/sessions", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["display_name"] is None
    assert data["art_form_id"] == "kolam"
    assert data["exercise_id"] == "kolam-dot-01"


def test_display_name_over_20_chars_rejected():
    payload = {
        "art_form_id": "warli",
        "category_id": "basic-figures",
        "exercise_id": "warli-basic-01",
        "display_name": "ThisNameIsFarTooLongAndExceedsTwentyChars",
    }
    response = client.post("/sessions", json=payload)
    assert response.status_code == 422


def test_display_name_with_markup_rejected():
    payload = {
        "art_form_id": "warli",
        "category_id": "basic-figures",
        "exercise_id": "warli-basic-01",
        "display_name": "<script>alert('xss')</script>",
    }
    response = client.post("/sessions", json=payload)
    assert response.status_code == 422


def test_invalid_pre_check_in_rejected():
    payload = {
        "art_form_id": "warli",
        "category_id": "basic-figures",
        "exercise_id": "warli-basic-01",
        "pre_check_in": "anxious_diagnostic",  # Invalid choice!
    }
    response = client.post("/sessions", json=payload)
    assert response.status_code == 422


def test_unknown_exercise_id_returns_400():
    payload = {
        "art_form_id": "warli",
        "category_id": "basic-figures",
        "exercise_id": "non-existent-exercise",
    }
    response = client.post("/sessions", json=payload)
    assert response.status_code == 400
    data = response.json()
    assert "not found" in data["detail"].lower()


def test_mismatched_art_form_returns_400():
    payload = {
        "art_form_id": "kolam",  # Mismatched! exercise is warli-basic-01
        "category_id": "basic-figures",
        "exercise_id": "warli-basic-01",
    }
    response = client.post("/sessions", json=payload)
    assert response.status_code == 400
    data = response.json()
    assert "does not belong to art form" in data["detail"].lower()


def test_submit_reflection_rating_valid():
    # 1. Create a session
    sess_res = client.post("/sessions", json={
        "art_form_id": "warli",
        "category_id": "basic-figures",
        "exercise_id": "warli-basic-01",
    })
    session_id = sess_res.json()["session_id"]

    # 2. Submit rating feedback
    payload = {
        "rating": "somewhat",
        "reason_tag": "too_generic"
    }
    res = client.post(f"/sessions/{session_id}/feedback-rating", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "success"
    assert data["rating"] == "somewhat"
    assert data["reason_tag"] == "too_generic"


def test_submit_reflection_rating_invalid():
    res = client.post("/sessions/sess_test/feedback-rating", json={
        "rating": "invalid_rating_value"
    })
    assert res.status_code == 400
    assert "invalid rating" in res.json()["detail"].lower()
