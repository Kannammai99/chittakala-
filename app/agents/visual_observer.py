from typing import Optional


class VisualObserverAgent:
    """
    Sub-agent specialized in descriptive visual observation of hand-drawn Indian folk & sacred geometry art.
    Identifies dot grids, geometric line rhythm, double outlines, and symmetry patterns on paper.
    """

    @staticmethod
    def get_prompt_instructions(art_form_title: str, exercise_title: str) -> str:
        return (
            f"You are the Visual Observer Agent for {art_form_title} ('{exercise_title}').\n"
            "Task: Observe the physical user drawing on paper. Focus on lines, dot grids (Pulli), "
            "loops, geometric triangles, double-line motifs, or fine line/dot fill patterns.\n"
            "Provide a warm, descriptive sentence of what you observe in the drawing."
        )

    @staticmethod
    def generate_fallback_observation(art_form_title: str) -> str:
        art_lower = art_form_title.lower()
        if "kolam" in art_lower:
            return "Your sketch shows steady dot alignment and gentle flowing loops weaving smoothly on paper."
        elif "madhubani" in art_lower:
            return "Your sketch displays double-line outlines and intricate fish and leaf motifs filled with care."
        elif "gond" in art_lower:
            return "Your sketch features vibrant animal contours filled with rhythmic line and dot patterns."
        else:
            return "Your sketch displays expressive triangular figures and clean geometric line rhythm."
