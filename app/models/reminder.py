from datetime import datetime, timezone
from typing import Optional
from pydantic import BaseModel, Field


class ReminderCreate(BaseModel):
    """Schema for scheduling a voluntary mindful break reminder."""

    minutes: int = Field(..., description="Selected mindfulness interval: 15, 30, or 60 minutes")
    fcm_token: Optional[str] = Field(None, description="Temporary encrypted FCM web push token")
    deep_link: str = Field("/start?source=reminder", description="Target PWA deep link")


class ReminderDispatch(BaseModel):
    """Schema for Cloud Run push notification dispatch handler."""

    reminder_id: str
    deep_link: str = "/start?source=reminder"
    fcm_token: Optional[str] = Field(None, description="FCM token to be used and purged immediately")


class Reminder(BaseModel):
    """Reminder operational record schema matching Section 2.10 & 2.16 spec."""

    reminder_id: str = Field(..., description="Unique reminder record ID (e.g. rem_...)")
    anonymous_user_id: str = Field(..., description="Anonymous user identifier")
    status: str = Field("scheduled", description="Status: scheduled | sent | cancelled | purged")
    delay_minutes: int = Field(15, description="Scheduled delay in minutes (15, 30, or 60)")
    scheduled_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), description="Scheduled dispatch timestamp")
    deep_link: str = Field("/start?source=reminder", description="Target PWA deep link")
    cloud_task_name: Optional[str] = Field(None, description="Cloud Tasks execution resource name")
    token_purged: bool = Field(True, description="Flag confirming FCM token was purged following delivery (never sent to BigQuery)")

