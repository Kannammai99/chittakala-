import re
from enum import Enum
from datetime import datetime
from typing import Any, Dict, Optional
from pydantic import BaseModel, Field, field_validator


class PreCheckInOption(str, Enum):
    QUIET = "quiet"
    LOW_ENERGY = "low-energy"
    RESTLESS = "restless"
    BUSY = "busy"
    PREFER_NOT_TO_SAY = "prefer_not_to_say"


class PostCheckInOption(str, Enum):
    SLOWER = "slower"
    ABOUT_THE_SAME = "about-the-same"
    FASTER = "faster"
    PREFER_NOT_TO_SAY = "prefer_not_to_say"


class SessionCreate(BaseModel):
    art_form_id: str = Field(..., description="Art form ID (warli or kolam)")
    category_id: str = Field(..., description="Category ID")
    exercise_id: str = Field(..., description="Selected exercise ID")
    pre_check_in: Optional[PreCheckInOption] = Field(None, description="Optional non-clinical check-in status")
    display_name: Optional[str] = Field(None, description="Optional nickname or first name (max 20 chars)")

    @field_validator("display_name")
    @classmethod
    def validate_display_name(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return None
        v = v.strip()
        if not v:
            return None
        if len(v) > 20:
            raise ValueError("display_name must be 20 characters or fewer")
        # Reject markup tags or control characters
        if re.search(r"[<>]", v) or re.search(r"[\x00-\x1f\x7f]", v):
            raise ValueError("display_name contains invalid characters or markup")
        return v


class SessionCheckInUpdate(BaseModel):
    post_check_in: PostCheckInOption = Field(..., description="Post-session non-clinical check-in option")


class Session(BaseModel):
    session_id: str = Field(..., description="Unique operational session identifier")
    anonymous_user_id: str = Field(..., description="Anonymous user identifier")
    display_name: Optional[str] = Field(None, description="Optional sanitized display name")
    art_form_id: str = Field(..., description="Art form ID")
    category_id: str = Field(..., description="Category ID")
    exercise_id: str = Field(..., description="Exercise ID")
    status: str = Field("in_progress", description="Session status: in_progress, completed, deleted")
    pre_check_in: Optional[PreCheckInOption] = Field(None, description="Pre-session check-in")
    post_check_in: Optional[PostCheckInOption] = Field(None, description="Post-session check-in status")
    started_at: datetime = Field(..., description="Session start timestamp")
    completed_at: Optional[datetime] = Field(None, description="Session completion timestamp")
    duration_seconds: Optional[int] = Field(None, description="Total session duration in seconds")
    drawing_path: Optional[str] = Field(None, description="Private Cloud Storage drawing path")
    feedback_id: Optional[str] = Field(None, description="Associated Gemini feedback record ID")
    consent_version: str = Field("v1.0", description="User consent version for AI analysis")


class SessionSummary(BaseModel):
    session_id: str = Field(..., description="Session ID")
    display_name: Optional[str] = Field(None, description="Optional display name")
    art_form_id: str = Field(..., description="Art form ID")
    category_id: str = Field(..., description="Category ID")
    exercise_id: str = Field(..., description="Exercise ID")
    status: str = Field(..., description="Session status")
    pre_check_in: Optional[PreCheckInOption] = Field(None, description="Pre-session check-in choice")
    post_check_in: Optional[PostCheckInOption] = Field(None, description="Post-session check-in choice")
    started_at: datetime = Field(..., description="Start timestamp")
    completed_at: Optional[datetime] = Field(None, description="Completion timestamp")
    duration_seconds: Optional[int] = Field(None, description="Duration in seconds")
    drawing_path: Optional[str] = Field(None, description="Private drawing path")
    feedback: Optional[Dict[str, Any]] = Field(None, description="AI reflection summary payload")
