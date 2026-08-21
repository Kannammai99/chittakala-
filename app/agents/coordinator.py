import logging
from typing import Dict, Any, Optional
from app.agents.visual_observer import VisualObserverAgent
from app.agents.mindful_coach import MindfulCoachAgent
from app.agents.safety_auditor import SafetyAuditorAgent

logger = logging.getLogger("chittakala.multi_agent_coordinator")


class MultiAgentCoordinator:
    """
    ADK Multi-Agent Coordinator that orchestrates VisualObserverAgent, MindfulCoachAgent,
    and SafetyAuditorAgent into a unified structured reflection synthesis.
    """

    @classmethod
    def get_orchestrated_system_instruction(cls, art_form_title: str, exercise_title: str) -> str:
        observer_prompt = VisualObserverAgent.get_prompt_instructions(art_form_title, exercise_title)
        coach_prompt = MindfulCoachAgent.get_prompt_instructions(art_form_title)
        auditor_prompt = SafetyAuditorAgent.get_prompt_instructions()

        return (
            "You are the Chittakala ADK Multi-Agent Orchestrator executing 3 specialized sub-agents:\n\n"
            f"[AGENT 1 - VISUAL OBSERVER]:\n{observer_prompt}\n\n"
            f"[AGENT 2 - MINDFUL COACH]:\n{coach_prompt}\n\n"
            f"[AGENT 3 - SAFETY AUDITOR]:\n{auditor_prompt}\n\n"
            "COORDINATION RULES:\n"
            "1. Synthesize the findings of all 3 agents into the JSON response schema.\n"
            "2. If Safety Auditor flags non-art photo, return needs_retake=True with retake prompts.\n"
            "3. Enforce zero numerical scores, zero clinical terms, and zero artistic judgment.\n"
        )

    @classmethod
    def generate_fallback_synthesis(cls, art_form_title: str) -> Dict[str, Any]:
        obs = VisualObserverAgent.generate_fallback_observation(art_form_title)
        enc, next_st = MindfulCoachAgent.generate_fallback_coaching(art_form_title)
        return {
            "visual_observation": obs,
            "encouragement": enc,
            "next_step": next_st,
            "safety_status": "safe",
            "needs_retake": False,
            "fallback_used": True,
        }
