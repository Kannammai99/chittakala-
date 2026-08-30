import pytest
from app.agents.prohibited_language_validator import (
    ProhibitedLanguageValidator,
    RESPONSIBLE_AI_DISCLAIMER,
)


def test_sanitize_artistic_quality_words():
    text = "Your beautiful drawing has elegant lines and a perfect finish."
    sanitized, modified = ProhibitedLanguageValidator.sanitize_text(text)

    assert modified is True
    assert "beautiful" not in sanitized.lower()
    assert "elegant" not in sanitized.lower()
    assert "perfect" not in sanitized.lower()
    assert "distinct" in sanitized.lower()
    assert "flowing" in sanitized.lower()
    assert "aligned" in sanitized.lower()


def test_sanitize_mental_state_words():
    text = "Taking a mindful break makes you feel calm, focused, and relaxed."
    sanitized, modified = ProhibitedLanguageValidator.sanitize_text(text)

    assert modified is True
    assert "mindful" not in sanitized.lower()
    assert "calm" not in sanitized.lower()
    assert "focused" not in sanitized.lower()
    assert "relaxed" not in sanitized.lower()
    assert "creative" in sanitized.lower()
    assert "steady" in sanitized.lower()
    assert "centered" in sanitized.lower()


def test_sanitize_effort_words():
    text = "You are a very patient and hardworking artist."
    sanitized, modified = ProhibitedLanguageValidator.sanitize_text(text)

    assert modified is True
    assert "patient" not in sanitized.lower()
    assert "hardworking" not in sanitized.lower()
    assert "deliberate" in sanitized.lower()
    assert "detailed" in sanitized.lower()


def test_sanitize_diagnosis_words():
    text = "This therapy drawing helps diagnose anxiety symptoms."
    sanitized, modified = ProhibitedLanguageValidator.sanitize_text(text)

    assert modified is True
    assert "therapy" not in sanitized.lower()
    assert "diagnose" not in sanitized.lower()
    assert "symptom" not in sanitized.lower()


def test_sanitize_scoring_and_comparisons():
    text = "Your sketch scores 9/10 and is better than previous attempts."
    sanitized, modified = ProhibitedLanguageValidator.sanitize_text(text)

    assert modified is True
    assert "9/10" not in sanitized
    assert "better than" not in sanitized.lower()


def test_validate_and_sanitize_response_dict():
    response = {
        "visual_observation": "A beautiful Kolam sketch with calm loops.",
        "encouragement": "Stay patient and focused on your art.",
        "next_step": "Try drawing another 8/10 dot grid.",
        "safety_status": "safe",
        "needs_retake": False,
        "fallback_used": False,
    }

    sanitized_resp, any_mod = ProhibitedLanguageValidator.validate_and_sanitize_response(response)

    assert any_mod is True
    assert sanitized_resp["sanitized"] is True
    assert sanitized_resp["responsible_ai_disclaimer"] == RESPONSIBLE_AI_DISCLAIMER
    assert "beautiful" not in sanitized_resp["visual_observation"].lower()
    assert "calm" not in sanitized_resp["visual_observation"].lower()
    assert "patient" not in sanitized_resp["encouragement"].lower()
    assert "focused" not in sanitized_resp["encouragement"].lower()
    assert "8/10" not in sanitized_resp["next_step"]
