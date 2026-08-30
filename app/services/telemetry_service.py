import os
import uuid
import logging
import subprocess
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional

logger = logging.getLogger("chittakala.telemetry_service")

# Mood shift mapping helper for non-clinical index analytics
PRE_CHECKIN_WEIGHTS = {
    "quiet": 0,
    "low-energy": -1,
    "restless": -1,
    "busy": -1,
    "prefer_not_to_say": 0,
}

POST_CHECKIN_WEIGHTS = {
    "slower": 1,
    "about-the-same": 0,
    "faster": 1,
    "prefer_not_to_say": 0,
}


def compute_mood_shift_index(pre_check_in: Optional[str], post_check_in: Optional[str]) -> float:
    """Compute non-clinical mood shift delta (-2.0 to +2.0)."""
    pre_val = PRE_CHECKIN_WEIGHTS.get(pre_check_in or "", 0)
    post_val = POST_CHECKIN_WEIGHTS.get(post_check_in or "", 0)
    return float(post_val - pre_val)


class BigQueryTelemetryService:
    """
    Asynchronous telemetry streaming service for Google Cloud BigQuery.
    Streams product usage metrics and Gemini AI reliability events to 'chittakala_analytics'.
    Supports safe local buffering for unit tests and local development.
    """

    def __init__(self, project_id: Optional[str] = None):
        self.project_id = project_id or os.getenv("BIGQUERY_PROJECT_ID") or os.getenv("GCP_PROJECT_ID", "chittakala-12345")
        self.dataset_id = "chittakala_analytics"
        self.product_events_table = "product_events"
        self.ai_events_table = "ai_reliability_events"
        self.ai_feedback_table = "ai_feedback_events"

        self._bq_client = None
        self._local_product_events_buffer: List[Dict[str, Any]] = []
        self._local_ai_events_buffer: List[Dict[str, Any]] = []
        self._local_feedback_events_buffer: List[Dict[str, Any]] = []

        self._init_client()

    def _init_client(self):
        """Try initializing google-cloud-bigquery client safely with fallback to gcloud access token."""
        try:
            from google.cloud import bigquery
            import google.auth
            try:
                creds, _ = google.auth.default()
                self._bq_client = bigquery.Client(project=self.project_id, credentials=creds)
                logger.info(f"BigQueryTelemetryService connected via ADC to GCP Project '{self.project_id}'.")
            except Exception:
                token = subprocess.check_output("gcloud auth print-access-token", shell=True).decode().strip()
                from google.oauth2.credentials import Credentials
                creds = Credentials(token)
                self._bq_client = bigquery.Client(project=self.project_id, credentials=creds)
                logger.info(f"BigQueryTelemetryService connected via gcloud token to GCP Project '{self.project_id}'.")
        except Exception as e:
            logger.info(f"BigQuery client not active ({e}). Local telemetry buffer active.")

    def log_product_event(
        self,
        session_id: str,
        anonymous_user_id: str,
        art_form_id: str,
        category_id: str,
        exercise_id: str,
        pre_check_in: Optional[str] = None,
        post_check_in: Optional[str] = None,
        duration_seconds: Optional[int] = None,
        status: str = "completed"
    ) -> Dict[str, Any]:
        """Record product session engagement and mood shift telemetry event."""
        event_id = f"evt_prod_{uuid.uuid4().hex[:12]}"
        now_utc = datetime.now(timezone.utc).isoformat()
        mood_shift_index = compute_mood_shift_index(pre_check_in, post_check_in)

        row = {
            "event_id": event_id,
            "session_id": session_id,
            "anonymous_user_id": anonymous_user_id,
            "art_form_id": art_form_id,
            "category_id": category_id,
            "exercise_id": exercise_id,
            "pre_check_in": pre_check_in or "none",
            "post_check_in": post_check_in or "none",
            "mood_shift_index": mood_shift_index,
            "duration_seconds": duration_seconds or 0,
            "status": status,
            "timestamp": now_utc,
        }

        self._stream_row(self.product_events_table, row, self._local_product_events_buffer)
        return row

    def log_ai_reliability_event(
        self,
        session_id: str,
        model_name: str = "gemini-3.6-flash",
        latency_ms: int = 0,
        fallback_used: bool = False,
        safety_status: str = "safe",
        needs_retake: bool = False,
        error_message: Optional[str] = None
    ) -> Dict[str, Any]:
        """Record Gemini Generative AI response latency and reliability telemetry event."""
        event_id = f"evt_ai_{uuid.uuid4().hex[:12]}"
        now_utc = datetime.now(timezone.utc).isoformat()

        row = {
            "event_id": event_id,
            "session_id": session_id,
            "model_name": model_name,
            "latency_ms": latency_ms,
            "fallback_used": fallback_used,
            "safety_status": safety_status,
            "needs_retake": needs_retake,
            "error_message": error_message or "",
            "timestamp": now_utc,
        }

        self._stream_row(self.ai_events_table, row, self._local_ai_events_buffer)
        return row

    def log_ai_feedback_event(
        self,
        session_id: str,
        rating: str,
        reason_tag: Optional[str] = None,
        anonymous_user_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """Record user reflection feedback rating and reason tag for AI quality analytics."""
        event_id = f"evt_fb_{uuid.uuid4().hex[:12]}"
        now_utc = datetime.now(timezone.utc).isoformat()

        row = {
            "event_id": event_id,
            "session_id": session_id,
            "anonymous_user_id": anonymous_user_id or "anonymous",
            "rating": rating,
            "reason_tag": reason_tag or "none",
            "timestamp": now_utc,
        }

        self._stream_row(self.ai_feedback_table, row, self._local_feedback_events_buffer)
        return row

    def _stream_row(self, table_name: str, row: Dict[str, Any], buffer: List[Dict[str, Any]]):
        """Asynchronously stream row to BigQuery or append to local memory buffer."""
        buffer.append(row)

        if self._bq_client:
            try:
                table_ref = f"{self.project_id}.{self.dataset_id}.{table_name}"
                errors = self._bq_client.insert_rows_json(table_ref, [row])
                if errors:
                    logger.warning(f"BigQuery streaming errors for {table_name}: {errors}")
                else:
                    logger.debug(f"Successfully streamed row {row['event_id']} to {table_ref}")
            except Exception as e:
                logger.warning(f"Failed to stream row to BigQuery {table_name}: {e}")

    def get_local_product_events(self) -> List[Dict[str, Any]]:
        """Return buffered product telemetry events (for unit testing)."""
        return list(self._local_product_events_buffer)

    def get_local_ai_events(self) -> List[Dict[str, Any]]:
        """Return buffered AI reliability telemetry events (for unit testing)."""
        return list(self._local_ai_events_buffer)

    def get_local_feedback_events(self) -> List[Dict[str, Any]]:
        """Return buffered AI feedback telemetry events (for unit testing)."""
        return list(self._local_feedback_events_buffer)

    def clear_buffers(self):
        """Clear local buffers."""
        self._local_product_events_buffer.clear()
        self._local_ai_events_buffer.clear()
        self._local_feedback_events_buffer.clear()


# Global telemetry service singleton
telemetry_service = BigQueryTelemetryService()
