from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_get_active_art_forms_includes_expansion():
    response = client.get("/art-forms")
    assert response.status_code == 200
    art_forms = response.json()
    ids = [af["art_form_id"] for af in art_forms]

    assert "warli" in ids
    assert "kolam" in ids
    assert "madhubani" in ids
    assert "gond" in ids


def test_get_madhubani_categories_and_exercises():
    # Test Madhubani categories endpoint
    cat_resp = client.get("/art-forms/madhubani/categories")
    assert cat_resp.status_code == 200
    cats = cat_resp.json()
    assert len(cats) >= 3

    cat_id = cats[0]["category_id"]
    ex_resp = client.get(f"/categories/{cat_id}/exercises")
    assert ex_resp.status_code == 200
    exercises = ex_resp.json()
    assert len(exercises) >= 1
    assert exercises[0]["art_form_id"] == "madhubani"


def test_get_gond_categories_and_exercises():
    # Test Gond categories endpoint
    cat_resp = client.get("/art-forms/gond/categories")
    assert cat_resp.status_code == 200
    cats = cat_resp.json()
    assert len(cats) >= 3

    cat_id = cats[0]["category_id"]
    ex_resp = client.get(f"/categories/{cat_id}/exercises")
    assert ex_resp.status_code == 200
    exercises = ex_resp.json()
    assert len(exercises) >= 1
    assert exercises[0]["art_form_id"] == "gond"
