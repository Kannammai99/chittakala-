import os
import httpx
from fastapi.testclient import TestClient
from app.main import app

TEST_BASE_URL = os.environ.get("TEST_BASE_URL", "")


def _get_client():
    if TEST_BASE_URL:
        return httpx.Client(base_url=TEST_BASE_URL, timeout=10.0)
    return TestClient(app)


def test_deployed_health_check():
    """Verify live /health endpoint returns HTTP 200 OK and expected service metadata."""
    client = _get_client()
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["service"] == "chittakala-api"


def test_deployed_art_forms():
    """Verify live /art-forms endpoint returns exactly 2 active art forms (Warli & Kolam)."""
    client = _get_client()
    response = client.get("/art-forms")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 2
    art_form_ids = [af["art_form_id"] for af in data]
    assert "warli" in art_form_ids
    assert "kolam" in art_form_ids


def test_deployed_exercise_traversal():
    """Verify live /categories/basic-figures/exercises returns 3 active Warli exercises."""
    client = _get_client()
    response = client.get("/categories/basic-figures/exercises")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 3
    for ex in data:
        assert ex["category_id"] == "basic-figures"
        assert ex["art_form_id"] == "warli"
