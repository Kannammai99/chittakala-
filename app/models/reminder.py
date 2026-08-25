from datetime import datetime, timezone
from typing import Optional
from pydantic import BaseModel, Field


class Reminder(BaseModel):
    """Reminder operational record schema matching Section 2.10 spec."""

    reminder_id: str = Field(..., description="Unique reminder record ID (e.g. rem_...)")
    anonymous_user_id: str = Field(..., description="Anonymous user identifier")
    status: str = Field("scheduled", description="Status: scheduled | sent | cancelled")
    delay_minutes: int = Field(240, description="Scheduled delay in minutes (default: 4 hours)")
    scheduled_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), description="Scheduled dispatch timestamp")
    cloud_task_name: Optional[str] = Field(None, description="Cloud Tasks execution resource name")
    notification_token_encry: Optional[str] = Field(None, description="Encrypted push notification token")
