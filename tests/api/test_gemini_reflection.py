import io
from fastapi.testclient import TestClient
from app.main import app
from app.services.gemini_service import GeminiReflectionService

client = TestClient(app)


def test_gemini_reflection_fallback_schema_contract():
    """Verify GeminiReflectionService fallback generator outputs valid Pydantic contract."""
    service = GeminiReflectionService(api_key=None)
    reflection = service.generate_fallback_reflection(art_form_title="Kolam")

    assert reflection.visual_observation != ""
    assert reflection.encouragement != ""
    assert reflection.next_step != ""
    assert reflection.safety_status == "safe"
    assert reflection.needs_retake is False
    assert reflection.fallback_used is True

    # Guardrails verification: zero numerical grading in text
    full_text = f"{reflection.visual_observation} {reflection.encouragement} {reflection.next_step}"
    assert "/10" not in full_text
    assert "%" not in full_text
    assert "score" not in full_text.lower()


def test_reflect_endpoint_lifecycle():
    """Verify POST /sessions/{session_id}/reflect API endpoint integration."""
    # 1. Create a valid session
    create_res = client.post(
        "/sessions",
        json={
            "art_form_id": "warli",
            "category_id": "basic-figures",
            "exercise_id": "warli-basic-01",
            "display_name": "TestingUser",
        },
    )
    assert create_res.status_code == 201
    session_id = create_res.json()["session_id"]

    # 2. Upload dummy PNG drawing for reflection
    fake_png = (
        b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01"
        b"\x08\x06\x00\x00\x00\x1f\x15c4\x00\x00\x00\nIDATx\x9cc\x00\x01\x00\x00\x05\x00\x01"
        b"\r\n-\xb4\x00\x00\x00\x00IEND\xaeB`\x82"
    )

    files = {"file": ("drawing.png", io.BytesIO(fake_png), "image/png")}
    reflect_res = client.post(f"/sessions/{session_id}/reflect", files=files)

    assert reflect_res.status_code == 200
    data = reflect_res.json()

    assert "visual_observation" in data
    assert "encouragement" in data
    assert "next_step" in data
    assert "safety_status" in data
    assert "needs_retake" in data
    assert "fallback_used" in data

    # Verify non-clinical zero-grading guardrails
    assert "/10" not in data["encouragement"]
    assert "grade" not in data["visual_observation"].lower()


def test_reflect_non_existent_session():
    """Verify reflect endpoint returns 404 for invalid session ID."""
    fake_png = b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01"
    files = {"file": ("drawing.png", io.BytesIO(fake_png), "image/png")}
    res = client.post("/sessions/invalid_session_id_999/reflect", files=files)
    assert res.status_code == 404
