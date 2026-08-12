from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_get_art_forms_endpoint():
    response = client.get("/art-forms")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 2

    art_form_ids = [af["art_form_id"] for af in data]
    assert "warli" in art_form_ids
    assert "kolam" in art_form_ids

    for item in data:
        assert "art_form_id" in item
        assert "title" in item
        assert "short_description" in item
        assert "thumbnail_path" in item
        assert "active" in item
        assert item["active"] is True


def test_get_warli_categories_endpoint():
    response = client.get("/art-forms/warli/categories")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 3

    cat_ids = [c["category_id"] for c in data]
    assert cat_ids == ["basic-figures", "figure-rows", "dancing-circles"]

    for item in data:
        assert item["art_form_id"] == "warli"
        assert item["active"] is True


def test_get_kolam_categories_endpoint():
    response = client.get("/art-forms/kolam/categories")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 3

    cat_ids = [c["category_id"] for c in data]
    assert cat_ids == ["simple-dot-kolams", "loop-line-kolams", "decorative-daily-kolams"]

    for item in data:
        assert item["art_form_id"] == "kolam"
        assert item["active"] is True


def test_get_invalid_art_form_categories_returns_404():
    response = client.get("/art-forms/invalid-art-form/categories")
    assert response.status_code == 404
    data = response.json()
    assert "detail" in data
    assert "not found" in data["detail"].lower()
