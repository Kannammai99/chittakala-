from datetime import datetime, timezone
from typing import Optional
from pydantic import BaseModel, Field


class Feedback(BaseModel):
    """Feedback operational record schema matching Section 2.10 spec."""

    feedback_id: str = Field(..., description="Unique feedback record ID (e.g. fbk_...)")
    session_id: str = Field(..., description="Associated operational session ID")
    visual_observation: str = Field(..., description="Objective visual pattern observation from Gemini Vision")
    encouragement: str = Field(..., description="Mindful encouragement focusing on process and effort")
    next_step: str = Field(..., description="Suggested creative exploration step")
    safety_status: str = Field("passed", description="Safety status: passed | rejected | flagged")
    fallback_used: bool = Field(False, description="True if fallback reflection template was used")
    model_name: str = Field("gemini-2.5-flash", description="Gemini model version used")
    latency_ms: int = Field(0, description="Inference latency in milliseconds")
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), description="Timestamp when feedback was generated")
