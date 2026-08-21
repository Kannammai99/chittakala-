class SafetyAuditorAgent:
    """
    Sub-agent specialized in safety compliance, non-clinical boundary enforcement,
    and non-art photo detection (flagging non-sketch uploads like screens, documents, or photos).
    """

    @staticmethod
    def get_prompt_instructions() -> str:
        return (
            "You are the Safety Auditor Agent.\n"
            "Task: Audit the user upload image. If the image is NOT a hand-drawn paper sketch "
            "(e.g., screenshot, document, photo of a person), set 'needs_retake': true.\n"
            "Ensure zero clinical diagnosis, zero grading, and verify safety status is 'safe'."
        )

    @staticmethod
    def generate_retake_response() -> dict:
        return {
            "visual_observation": "The uploaded photo does not appear to contain a hand-drawn paper sketch. Please upload a clear photo of your paper drawing.",
            "encouragement": "Whenever you are ready, capture a photo of your hand-drawn sketch to receive your visual reflection.",
            "next_step": "Take a quick photo of your drawing on paper and submit it again.",
            "safety_status": "safe",
            "needs_retake": True,
        }
