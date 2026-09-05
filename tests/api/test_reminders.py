import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_create_reminder_success():
    """Test scheduling a valid 15-minute mindful break reminder."""
    payload = {
        "minutes": 15,
        "fcm_token": "sample_fcm_token_xyz123",
        "deep_link": "/start?source=reminder"
    }
    response = client.post("/reminders", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["reminder_id"].startswith("rem_")
    assert data["delay_minutes"] == 15
    assert data["deep_link"] == "/start?source=reminder"
    assert data["status"] == "scheduled"
    assert data["token_purged"] is True


def test_create_reminder_invalid_interval():
    """Test scheduling with an invalid mindfulness interval returns 400."""
    payload = {
        "minutes": 45,  # Invalid: must be 15, 30, or 60
        "fcm_token": "sample_fcm_token"
    }
    response = client.post("/reminders", json=payload)
    assert response.status_code == 400
    assert "15, 30, or 60 minutes" in response.json()["detail"]


def test_dispatch_reminder_and_purge_fcm_token():
    """Test Cloud Run handler push delivery & FCM token purge spec."""
    # 1. Create reminder
    create_res = client.post("/reminders", json={"minutes": 30})
    reminder_id = create_res.json()["reminder_id"]

    # 2. Dispatch push notification
    dispatch_payload = {
        "reminder_id": reminder_id,
        "deep_link": "/start?source=reminder",
        "fcm_token": "temp_fcm_push_token_to_purge"
    }
    dispatch_res = client.post("/reminders/dispatch", json=dispatch_payload)
    assert dispatch_res.status_code == 200
    res_data = dispatch_res.json()
    assert res_data["status"] == "sent"
    assert res_data["deep_link"] == "/start?source=reminder"
    assert res_data["fcm_token_status"] == "purged"
    assert res_data["bigquery_stream"] == "excluded"


def test_cancel_reminder_success():
    """Test cancelling an active mindful break reminder."""
    create_res = client.post("/reminders", json={"minutes": 60})
    reminder_id = create_res.json()["reminder_id"]

    delete_res = client.delete(f"/reminders/{reminder_id}")
    assert delete_res.status_code == 204
