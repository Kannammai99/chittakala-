# 📊 Looker Studio Executive Dashboard — Chittakala (चित्तकला)

## 🌐 Live Executive Telemetry Dashboard
👉 **[Chittakala Live Looker Studio Dashboard](https://datastudio.google.com/reporting/bb8dbdee-4d95-4f39-a8ce-a5a5831ec89f)**

---

## 🌐 1. BigQuery Data Sources
- **GCP Project**: `chittakala-12345`
- **Dataset**: `chittakala_analytics`
- **Primary Views**:
  - `v_mood_shift_summary`: Tracks total completed routines, active users, average mood shift index (-2 to +2), and check-in distributions by art form.
  - `v_ai_performance_summary`: Tracks total Gemini API requests, average and P95 latency (ms), fallback execution rate (%), non-art retake requests, and safety compliance.

---

## 🚀 2. Looker Studio Dashboard Setup Steps
1. Navigate to [Looker Studio](https://lookerstudio.google.com).
2. Click **Create** > **Data Source**.
3. Select the **BigQuery** connector.
4. Select **My Projects** > Project: `chittakala-12345` > Dataset: `chittakala_analytics`.
5. Add the following views:
   - `v_mood_shift_summary`
   - `v_ai_performance_summary`
6. Build Dashboard Cards:
   - **KPI Scorecard**: Average Mood Shift Index (`avg_mood_shift_index`)
   - **Time Series Line Chart**: Daily Active Users (`active_users`) & Total Routines (`total_sessions`)
   - **Bar Chart**: Routine Duration & Completion Breakdown by `art_form_id`
   - **Gauge Chart**: Gemini AI Fallback Rate (`fallback_rate_percent`, Goal < 2.0%)
   - **Line Chart**: Gemini AI P95 Latency (`p95_latency_ms`)

---

## 🔒 3. Data Governance & Privacy Compliance
- All telemetric records stream with **anonymous user identifiers** (`anonymous_user_id`).
- Zero personal user drawings or raw names are stored in BigQuery tables.
- All non-clinical check-in options are aggregated to comply with strict non-clinical wellness boundaries.
