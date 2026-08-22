# 📊 Chittakala Analytics — Looker Studio Step-by-Step Guide

This guide walks you through connecting your BigQuery dataset `chittakala_analytics` to **Looker Studio** and building a real-time Telemetry & Creative Wellness Dashboard.

---

## 🛠️ Step 1: Connect BigQuery to Looker Studio

1. Open **[Looker Studio](https://lookerstudio.google.com)**.
2. Click **Create** ➔ **Report**.
3. In the "Add data to report" panel, search for and select **BigQuery**.
4. Choose **My Projects**:
   - **Project**: Select your GCP Project ID (e.g. `chittakala-12345`).
   - **Dataset**: `chittakala_analytics`.
   - **Table**: Select `product_events`.
5. Click **Add** ➔ Confirm **Add to Report**.
6. Repeat to add the second dataset:
   - Click **Resource** ➔ **Manage added data sources** ➔ **Add a Data Source**.
   - Select **BigQuery** ➔ Select `chittakala_analytics.ai_reliability_events` ➔ Click **Add**.

---

## 📈 Step 2: Build the 5 Core Dashboard Charts

### 1. 🗓️ Daily Creative Sessions & Active Users (Time Series Line Chart)
* **Purpose**: Track daily engagement and user growth over time.
* **Chart Type**: Time Series Line Chart.
* **Data Source**: `product_events`.
* **Dimension**: `timestamp` (Change Granularity to **Date**).
* **Metrics**:
  1. `COUNT(session_id)` ➔ Rename to **Total Sessions**.
  2. `COUNT_DISTINCT(anonymous_user_id)` ➔ Rename to **Active Users**.
* **Style**: Enable smooth line, show data points, and turn on trendline.

---

### 2. 🎨 Art Form Popularity Distribution (Donut / Pie Chart)
* **Purpose**: See which Indian Art Traditions users engage with most (Warli, Kolam, Madhubani, Gond).
* **Chart Type**: Donut Chart.
* **Data Source**: `product_events`.
* **Dimension**: `art_form_id`.
* **Metric**: `COUNT(session_id)`.
* **Style**: Slice colors matching Chittakala palette:
  - `warli` ➔ Coral `#FF523B`
  - `kolam` ➔ Gold `#F59E0B`
  - `madhubani` ➔ Indigo `#6366F1`
  - `gond` ➔ Mint `#10B981`

---

### 3. 😌 Non-Clinical Mood Shift Index (Bar Chart & Scorecard)
* **Purpose**: Measure the non-clinical shift in user pace before vs. after practice (`busy` ➔ `slower` = `+2.0` shift).
* **Chart Type A (Scorecard)**:
  - **Metric**: `AVG(mood_shift_index)` ➔ Rename to **Average Mood Shift Delta**.
* **Chart Type B (Bar Chart)**:
  - **Dimension**: `pre_check_in`.
  - **Metric**: `AVG(mood_shift_index)`.
  - **Breakdown Dimension**: `post_check_in`.

---

### 4. ⚡ Gemini AI Latency & Reliability (KPI Scorecards & Line Chart)
* **Purpose**: Monitor Gemini Vision AI response speed and zero-retake reliability.
* **Chart Type (3 Scorecards in a row)**:
  1. **Avg Latency Scorecard**:
     - **Data Source**: `ai_reliability_events`.
     - **Metric**: `AVG(latency_ms)` ➔ Rename to **Avg Response Latency (ms)**.
  2. **AI Safety Status**:
     - **Data Source**: `ai_reliability_events`.
     - **Metric**: `COUNT(event_id)` where `safety_status = 'safe'`.
  3. **Fallback Rate**:
     - **Data Source**: `ai_reliability_events`.
     - **Metric**: `AVG(CAST(fallback_used AS INT64))` ➔ Format as **Percent**.

---

### 5. ⏱️ Average Session Duration & Completion Rate (Scorecards)
* **Purpose**: Verify that users complete 5-minute creative pauses without abandonment.
* **Chart Type**: Scorecards.
* **Metrics**:
  - `AVG(duration_seconds)` ➔ Divide by 60 for **Avg Minutes**.
  - `COUNT(session_id)` where `status = 'completed'`.

---

## 🎨 Step 3: Dashboard Layout & Theme Recommendations

* **Header Banner**: Deep Slate (`#0F172A`) with title *"Chittakala (चित्तकला) — Telemetry & Creative Reset Dashboard"*.
* **Background**: Crisp Light Gray (`#F8FAFC`).
* **Card Container Background**: Pure White (`#FFFFFF`) with 16px corner radius and soft border (`#E2E8F0`).
* **Auto-Refresh**: Set Data Freshness to **15 Minutes** for live BigQuery streaming updates.

---

## 🔍 SQL Query View (Optional BigQuery Unified View)

If you prefer a single joined view in BigQuery before connecting to Looker Studio, run this DDL in BigQuery SQL Editor:

```sql
CREATE OR REPLACE VIEW `chittakala-12345.chittakala_analytics.unified_session_telemetry` AS
SELECT 
  p.event_id AS prod_event_id,
  p.session_id,
  p.anonymous_user_id,
  p.art_form_id,
  p.category_id,
  p.exercise_id,
  p.pre_check_in,
  p.post_check_in,
  p.mood_shift_index,
  p.duration_seconds,
  p.status AS session_status,
  a.model_name,
  a.latency_ms,
  a.fallback_used,
  a.safety_status,
  p.timestamp
FROM `chittakala-12345.chittakala_analytics.product_events` p
LEFT JOIN `chittakala-12345.chittakala_analytics.ai_reliability_events` a
ON p.session_id = a.session_id;
```
