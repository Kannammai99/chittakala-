from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

CATEGORIES = [
    "basic-figures",
    "figure-rows",
    "dancing-circles",
    "simple-dot-kolams",
    "loop-line-kolams",
    "decorative-daily-kolams",
]


def test_get_exercises_for_all_six_categories():
    total_exercises_count = 0
    all_exercise_ids = []

    for cat_id in CATEGORIES:
        response = client.get(f"/categories/{cat_id}/exercises")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 3, f"Category '{cat_id}' must have exactly 3 active exercises"

        for ex in data:
            assert ex["category_id"] == cat_id
            assert "exercise_id" in ex
            assert "title" in ex
            assert "art_form" in ex
            assert "reference_image_path" in ex
            assert "visible_elements" in ex
            assert "drawing_guidance" in ex
            assert ex["active"] is True
            all_exercise_ids.append(ex["exercise_id"])
            total_exercises_count += 1

    assert total_exercises_count == 18
    # Assert ID uniqueness across all 18 exercises
    assert len(set(all_exercise_ids)) == 18


def test_get_exercise_by_id_single_item():
    response = client.get("/exercises/warli-basic-01")
    assert response.status_code == 200
    data = response.json()
    assert data["exercise_id"] == "warli-basic-01"
    assert data["art_form_id"] == "warli"
    assert data["category_id"] == "basic-figures"
    assert data["title"] == "Dancing Warli Trio"
    assert len(data["visible_elements"]) > 0
    assert len(data["drawing_guidance"]) > 0


def test_get_exercise_by_id_kolam():
    response = client.get("/exercises/kolam-loop-01")
    assert response.status_code == 200
    data = response.json()
    assert data["exercise_id"] == "kolam-loop-01"
    assert data["art_form_id"] == "kolam"
    assert data["category_id"] == "loop-line-kolams"


def test_invalid_category_returns_404():
    response = client.get("/categories/invalid-category-id/exercises")
    assert response.status_code == 404
    data = response.json()
    assert "detail" in data
    assert "not found" in data["detail"].lower()


def test_invalid_exercise_returns_404():
    response = client.get("/exercises/non-existent-exercise-id")
    assert response.status_code == 404
    data = response.json()
    assert "detail" in data
    assert "not found" in data["detail"].lower()
