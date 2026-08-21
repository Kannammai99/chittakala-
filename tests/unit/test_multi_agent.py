import pytest
from app.agents.visual_observer import VisualObserverAgent
from app.agents.mindful_coach import MindfulCoachAgent
from app.agents.safety_auditor import SafetyAuditorAgent
from app.agents.coordinator import MultiAgentCoordinator


def test_visual_observer_fallback():
    obs_warli = VisualObserverAgent.generate_fallback_observation("Warli")
    assert "triangular figures" in obs_warli.lower()

    obs_kolam = VisualObserverAgent.generate_fallback_observation("Kolam")
    assert "dot alignment" in obs_kolam.lower()

    obs_madhubani = VisualObserverAgent.generate_fallback_observation("Madhubani")
    assert "double-line outlines" in obs_madhubani.lower()

    obs_gond = VisualObserverAgent.generate_fallback_observation("Gond Art")
    assert "gond" in obs_gond.lower() or "animal contours" in obs_gond.lower()


def test_mindful_coach_fallback():
    enc, next_st = MindfulCoachAgent.generate_fallback_coaching("Warli")
    assert len(enc) > 10
    assert len(next_st) > 10


def test_safety_auditor_retake():
    retake_dict = SafetyAuditorAgent.generate_retake_response()
    assert retake_dict["needs_retake"] is True
    assert retake_dict["safety_status"] == "safe"


def test_multi_agent_coordinator_orchestrated_instruction():
    instruction = MultiAgentCoordinator.get_orchestrated_system_instruction(
        art_form_title="Madhubani",
        exercise_title="Mithila Sacred Fish"
    )
    assert "VISUAL OBSERVER" in instruction
    assert "MINDFUL COACH" in instruction
    assert "SAFETY AUDITOR" in instruction
