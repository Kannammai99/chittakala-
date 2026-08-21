-- ==============================================================================
-- Chittakala (चित्तकला) — BigQuery Telemetry Engine DDL & Analytics Views
-- GCP Project ID: chittakala-12345
-- Target Dataset: chittakala_analytics
-- ==============================================================================

-- 1. Create Analytics Dataset
CREATE SCHEMA IF NOT EXISTS `chittakala-12345.chittakala_analytics`
OPTIONS(
  location = 'US',
  description = 'Chittakala Product Usage, Mood Shift, and Gemini AI Reliability Telemetry Dataset'
);

-- 2. Product Events Telemetry Table
CREATE TABLE IF NOT EXISTS `chittakala-12345.chittakala_analytics.product_events`
(
  event_id STRING NOT NULL OPTIONS(description="Unique telemetry event ID"),
  session_id STRING NOT NULL OPTIONS(description="Associated operational session ID"),
  anonymous_user_id STRING NOT NULL OPTIONS(description="Anonymous user identifier"),
  art_form_id STRING NOT NULL OPTIONS(description="Art form ID (warli, kolam, madhubani, gond)"),
  category_id STRING NOT NULL OPTIONS(description="Routine category ID"),
  exercise_id STRING NOT NULL OPTIONS(description="Specific exercise ID"),
  pre_check_in STRING OPTIONS(description="Pre-routine non-clinical check-in choice"),
  post_check_in STRING OPTIONS(description="Post-routine non-clinical check-in choice"),
  mood_shift_index FLOAT64 OPTIONS(description="Non-clinical mood shift delta (-2.0 to +2.0)"),
  duration_seconds INT64 OPTIONS(description="Total routine duration in seconds"),
  status STRING OPTIONS(description="Session completion status"),
  timestamp TIMESTAMP NOT NULL OPTIONS(description="Event timestamp in UTC")
)
PARTITION BY DATE(timestamp)
CLUSTER BY art_form_id, exercise_id
OPTIONS(
  description = "Tracks user session completions, art form engagement, and non-clinical mood shifts."
);

-- 3. Gemini AI Reliability Telemetry Table
CREATE TABLE IF NOT EXISTS `chittakala-12345.chittakala_analytics.ai_reliability_events`
(
  event_id STRING NOT NULL OPTIONS(description="Unique AI event ID"),
  session_id STRING NOT NULL OPTIONS(description="Associated operational session ID"),
  model_name STRING NOT NULL OPTIONS(description="Generative AI model version (gemini-3.6-flash)"),
  latency_ms INT64 NOT NULL OPTIONS(description="Gemini API response latency in milliseconds"),
  fallback_used BOOL NOT NULL OPTIONS(description="True if local fallback reflection was served"),
  safety_status STRING OPTIONS(description="Safety verification status (safe, flagged)"),
  needs_retake BOOL OPTIONS(description="True if non-art photo or unreadable upload was detected"),
  error_message STRING OPTIONS(description="Error diagnostic message if fallback was triggered"),
  timestamp TIMESTAMP NOT NULL OPTIONS(description="Event timestamp in UTC")
)
PARTITION BY DATE(timestamp)
CLUSTER BY model_name, fallback_used
OPTIONS(
  description = "Tracks Gemini 3.6 Flash API performance, response latency, fallback rates, and safety compliance."
);


-- ==============================================================================
-- Analytical Views for Looker Studio Executive Dashboard
-- ==============================================================================

-- View 1: Mood Shift & Engagement Executive Summary
CREATE OR REPLACE VIEW `chittakala-12345.chittakala_analytics.v_mood_shift_summary` AS
SELECT
  DATE(timestamp) AS event_date,
  art_form_id,
  COUNT(DISTINCT session_id) AS total_sessions,
  COUNT(DISTINCT anonymous_user_id) AS active_users,
  ROUND(AVG(mood_shift_index), 2) AS avg_mood_shift_index,
  ROUND(AVG(duration_seconds), 1) AS avg_duration_seconds,
  COUNTIF(post_check_in = 'slower') AS count_slower,
  COUNTIF(post_check_in = 'about-the-same') AS count_same,
  COUNTIF(post_check_in = 'faster') AS count_faster
FROM
  `chittakala-12345.chittakala_analytics.product_events`
WHERE
  status = 'completed'
GROUP BY
  event_date,
  art_form_id;

-- View 2: Gemini AI Reliability & Latency KPI Summary
CREATE OR REPLACE VIEW `chittakala-12345.chittakala_analytics.v_ai_performance_summary` AS
SELECT
  DATE(timestamp) AS event_date,
  model_name,
  COUNT(event_id) AS total_ai_requests,
  ROUND(AVG(latency_ms), 0) AS avg_latency_ms,
  APPROX_QUANTILES(latency_ms, 100)[OFFSET(95)] AS p95_latency_ms,
  COUNTIF(fallback_used = TRUE) AS fallback_count,
  ROUND(SAFE_DIVIDE(COUNTIF(fallback_used = TRUE), COUNT(event_id)) * 100, 2) AS fallback_rate_percent,
  COUNTIF(needs_retake = TRUE) AS retake_count,
  COUNTIF(safety_status = 'safe') AS safe_requests_count
FROM
  `chittakala-12345.chittakala_analytics.ai_reliability_events`
GROUP BY
  event_date,
  model_name;
