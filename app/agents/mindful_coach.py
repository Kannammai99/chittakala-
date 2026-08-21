from typing import Tuple


class MindfulCoachAgent:
    """
    Sub-agent specialized in mindful creative reflection, non-judgmental encouragement,
    and micro-steps for gentle daily art practice.
    """

    @staticmethod
    def get_prompt_instructions(art_form_title: str) -> str:
        return (
            "You are the Mindful Coach Agent.\n"
            "Task: Generate non-judgmental, affirming encouragement celebrating the user's creative pause. "
            "Suggest a simple, non-pressured next action for their drawing practice.\n"
            "STRICT GUARDRAIL: Zero numerical scores, zero clinical/medical claims, zero artistic criticism."
        )

    @staticmethod
    def generate_fallback_coaching(art_form_title: str) -> Tuple[str, str]:
        art_lower = art_form_title.lower()
        if "kolam" in art_lower:
            return (
                "Taking this 5-minute pause to connect lines and dots brings a wonderful moment of focus.",
                "Try adding a small corner accent loop or repeat this simple pattern tomorrow."
            )
        elif "madhubani" in art_lower:
            return (
                "Spending time double-lining these traditional borders creates a soothing geometric rhythm.",
                "Fill one of the central motifs with thin parallel hatching lines."
            )
        elif "gond" in art_lower:
            return (
                "Connecting with Gond nature patterns brings a refreshing sense of creative flow.",
                "Experiment with adding tiny dot clusters alongside your line fills."
            )
        else:
            return (
                "Your hand-drawn figures capture the lively spirit of village celebration and story.",
                "Add a second figure holding hands or experiment with a rhythm row of stick figures."
            )
