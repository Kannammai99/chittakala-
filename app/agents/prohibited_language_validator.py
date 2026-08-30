import re
import logging
from typing import Dict, Any, Tuple

logger = logging.getLogger("chittakala.prohibited_language_validator")

# Default Responsible AI Disclaimer
RESPONSIBLE_AI_DISCLAIMER = (
    "Chittakala comments only on visible patterns. "
    "It does not score artistic ability or assess mental health."
)

# Prohibited term categories and their neutral replacement mappings
REPLACEMENT_MAP: Dict[str, str] = {
    # Artistic quality replacements -> neutral visual descriptors
    "beautiful": "distinct",
    "gorgeous": "vibrant",
    "stunning": "vibrant",
    "perfect": "aligned",
    "flawless": "smooth",
    "elegant": "flowing",
    "talented": "creative",
    "masterpiece": "drawing",
    "pretty": "clear",
    "graceful": "curved",
    "artistic": "visual",
    # Mental state replacements -> objective action/drawing descriptors
    "mindful": "creative",
    "mindfulness": "artistic pause",
    "calm": "steady",
    "focused": "centered",
    "relaxed": "flowing",
    "anxious": "expressive",
    "stressed": "active",
    "peaceful": "balanced",
    "tranquil": "quiet",
    "soothing": "rhythmic",
    "healing": "expressive",
    "happy": "lively",
    "sad": "quiet",
    # Effort / personality replacements -> neutral execution descriptors
    "dedicated": "attentive",
    "patient": "deliberate",
    "hardworking": "detailed",
    "skilled": "structured",
    "gifted": "expressive",
    "disciplined": "rhythmic",
    "persevering": "continuous",
    # Diagnosis / treatment / clinical terms -> neutral equivalents
    "diagnose": "observe",
    "diagnosed": "observed",
    "diagnosis": "observation",
    "diagnoses": "observations",
    "therapy": "art practice",
    "therapies": "art practices",
    "treatment": "drawing time",
    "treatments": "drawing sessions",
    "depression": "state",
    "anxiety": "tension",
    "anxieties": "tensions",
    "cure": "support",
    "symptom": "sign",
    "symptoms": "signs",
    "prescribe": "suggest",
    "clinical": "structural",
    # Scoring / comparison terms
    "better than": "compared to",
    "score": "count",
    "scores": "counts",
    "rating": "feedback",
    "ratings": "feedback",
    "grade": "style",
    "grades": "styles",
    "superior": "distinct",
    "inferior": "different",
}

# Compiled regexes for word boundaries (case-insensitive)
PROHIBITED_PATTERNS = {
    term: re.compile(rf"\b{re.escape(term)}\b", re.IGNORECASE)
    for term in REPLACEMENT_MAP.keys()
}

# Regex to catch score formats like "8/10", "95%"
SCORE_PATTERN = re.compile(r"\b\d{1,3}\s*(/10|/100|%)\b", re.IGNORECASE)


class ProhibitedLanguageValidator:
    """
    Deterministic post-LLM safety & language sanitizer.
    Acts as a zero-trust guardrail downstream of Gemini & ADK Multi-Agent outputs
    to ensure zero evaluative, psychological, effort-based, or clinical language.
    """

    @classmethod
    def sanitize_text(cls, text: str) -> Tuple[str, bool]:
        """
        Scans and rewrites prohibited language in a text string.
        Returns (sanitized_text, was_modified).
        """
        if not text:
            return text, False

        modified = False
        sanitized = text

        # 1. Strip numerical score formats (e.g., "8/10", "95%")
        if SCORE_PATTERN.search(sanitized):
            sanitized = SCORE_PATTERN.sub("pattern elements", sanitized)
            modified = True

        # 2. Match and replace prohibited terms while preserving capitalisation
        for term, pattern in PROHIBITED_PATTERNS.items():
            if pattern.search(sanitized):
                replacement = REPLACEMENT_MAP[term]

                def _preserve_case(match):
                    word = match.group(0)
                    if word.isupper():
                        return replacement.upper()
                    elif word.istitle():
                        return replacement.capitalize()
                    return replacement.lower()

                sanitized = pattern.sub(_preserve_case, sanitized)
                modified = True

        if modified:
            logger.info(f"ProhibitedLanguageValidator sanitized text. Original: '{text}' -> Sanitized: '{sanitized}'")

        return sanitized, modified

    @classmethod
    def validate_and_sanitize_response(cls, response_dict: Dict[str, Any]) -> Tuple[Dict[str, Any], bool]:
        """
        Sanitizes visual_observation, encouragement, and next_step fields in a reflection response dictionary.
        Attaches the responsible_ai_disclaimer and sets sanitized=True if changes were made.
        """
        cleaned_dict = dict(response_dict)
        any_modified = False

        target_fields = ["visual_observation", "encouragement", "next_step"]

        for field in target_fields:
            if field in cleaned_dict and isinstance(cleaned_dict[field], str):
                sanitized_val, was_mod = cls.sanitize_text(cleaned_dict[field])
                cleaned_dict[field] = sanitized_val
                if was_mod:
                    any_modified = True

        cleaned_dict["sanitized"] = any_modified
        cleaned_dict["responsible_ai_disclaimer"] = RESPONSIBLE_AI_DISCLAIMER

        return cleaned_dict, any_modified
