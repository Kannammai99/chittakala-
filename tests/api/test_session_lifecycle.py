from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_full_session_lifecycle_happy_path():
    # 1. Create session
    create_payload = {
        "art_form_id": "warli",
        "category_id": "basic-figures",
        "exercise_id": "warli-basic-01",
        "pre_check_in": "busy",
        "display_name": "Kanna",
    }
    create_resp = client.post("/sessions", json=create_payload)
    assert create_resp.status_code == 201
    session_data = create_resp.json()
    session_id = session_data["session_id"]
    assert session_data["status"] == "in_progress"

    # 2. Update post-session check-in
    check_in_resp = client.patch(
        f"/sessions/{session_id}/check-in",
        json={"post_check_in": "slower"},
    )
    assert check_in_resp.status_code == 200
    assert check_in_resp.json()["post_check_in"] == "slower"

    # 3. Mark session complete
    complete_resp = client.post(f"/sessions/{session_id}/complete")
    assert complete_resp.status_code == 200
    completed_data = complete_resp.json()
    assert completed_data["status"] == "completed"
    assert completed_data["completed_at"] is not None
    assert completed_data["duration_seconds"] is not None
    assert completed_data["duration_seconds"] >= 0

    # 4. Get session summary
    summary_resp = client.get(f"/sessions/{session_id}/summary")
    assert summary_resp.status_code == 200
    summary_data = summary_resp.json()
    assert summary_data["session_id"] == session_id
    assert summary_data["status"] == "completed"
    assert summary_data["pre_check_in"] == "busy"
    assert summary_data["post_check_in"] == "slower"

    # 5. Delete session (FR-15 Privacy requirement)
    delete_resp = client.delete(f"/sessions/{session_id}")
    assert delete_resp.status_code == 200
    assert delete_resp.json()["status"] == "deleted"

    # 6. Verify session no longer exists (404 Not Found)
    verify_resp = client.get(f"/sessions/{session_id}/summary")
    assert verify_resp.status_code == 404


def test_invalid_post_check_in_option_rejected():
    # Create session first
    create_resp = client.post(
        "/sessions",
        json={
            "art_form_id": "kolam",
            "category_id": "simple-dot-kolams",
            "exercise_id": "kolam-dot-01",
        },
    )
    session_id = create_resp.json()["session_id"]

    # Attempt patch with invalid option
    patch_resp = client.patch(
        f"/sessions/{session_id}/check-in",
        json={"post_check_in": "invalid_choice"},
    )
    assert patch_resp.status_code == 422


def test_non_existent_session_id_returns_404():
    fake_id = "sess_non_existent_12345"

    assert client.patch(f"/sessions/{fake_id}/check-in", json={"post_check_in": "slower"}).status_code == 404
    assert client.post(f"/sessions/{fake_id}/complete").status_code == 404
    assert client.get(f"/sessions/{fake_id}/summary").status_code == 404
    assert client.delete(f"/sessions/{fake_id}").status_code == 404
