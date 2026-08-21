# 🎨 Chittakala (चित्तकला) — Stage 2 Implementation & Architecture Document

**Project**: Chittakala — Creative Wellness & Folk Art Application  
**GCP Project ID**: `chittakala-12345`  
**Status**: Stage 2 Complete (Production-Ready)

---

## 📌 Executive Overview

**Stage 2** expands Chittakala from a 2-art-form prototype into an enterprise-grade **Creative Wellness Platform** equipped with real-time BigQuery telemetry, Looker Studio executive reporting DDLs, Google ADK Multi-Agent vision analysis, 4 expanded Indian folk art modules, and resilient PWA user experience flows.

---

## 🏗️ Stage 2 Core Components & File Reference Map

### 1. BigQuery Telemetry Engine & Reporting
- [`app/services/telemetry_service.py`](file:///C:/Users/91986/.gemini/antigravity/scratch/chittakala/app/services/telemetry_service.py):  
  Asynchronous telemetry streaming service (`BigQueryTelemetryService`). Connects via `google-cloud-bigquery` with automatic fallback to developer `gcloud` access token when Application Default Credentials (ADC) are missing locally. Streams events to GCP dataset `chittakala_analytics`:
  - `product_events`: Tracks session ID, art form, category, exercise, pre/post non-clinical check-ins, `mood_shift_index` (-2.0 to +2.0), and routine duration.
  - `ai_reliability_events`: Tracks model version (`gemini-3.6-flash`), latency in ms, fallback status, safety compliance, and retake triggers.
- [`infrastructure/bigquery_schema.sql`](file:///C:/Users/91986/.gemini/antigravity/scratch/chittakala/infrastructure/bigquery_schema.sql):  
  Production SQL DDL script defining partitioned tables (`product_events`, `ai_reliability_events`) in location `US` and analytical views:
  - `v_mood_shift_summary`: Daily active users, total sessions (`COUNT(DISTINCT session_id)`), average mood shift index, and post check-in distribution.
  - `v_ai_performance_summary`: Daily AI request volume, P95 response latency, fallback rate percentage, and safety compliance metrics.
- [`dashboards/README.md`](file:///C:/Users/91986/.gemini/antigravity/scratch/chittakala/dashboards/README.md):  
  Step-by-step setup guide for connecting Looker Studio to BigQuery views.

---

### 2. Google ADK Multi-Agent Vision Architecture
- [`app/agents/visual_observer.py`](file:///C:/Users/91986/.gemini/antigravity/scratch/chittakala/app/agents/visual_observer.py):  
  `VisualObserverAgent` inspects physical stroke shapes, line alignment, and dot geometries without making qualitative aesthetic judgments.
- [`app/agents/mindful_coach.py`](file:///C:/Users/91986/.gemini/antigravity/scratch/chittakala/app/agents/mindful_coach.py):  
  `MindfulCoachAgent` generates warm, non-evaluative encouragement grounded strictly in visual observations and suggests a gentle next creative step.
- [`app/agents/safety_auditor.py`](file:///C:/Users/91986/.gemini/antigravity/scratch/chittakala/app/agents/safety_auditor.py):  
  `SafetyAuditorAgent` verifies safety compliance and flags non-paper or unreadable photographs requiring a fresh capture (`needs_retake`).
- [`app/agents/coordinator.py`](file:///C:/Users/91986/.gemini/antigravity/scratch/chittakala/app/agents/coordinator.py):  
  `MultiAgentCoordinator` orchestrates agent execution pipelines and formats structured `GeminiReflectionResponse` objects.
- [`app/services/gemini_service.py`](file:///C:/Users/91986/.gemini/antigravity/scratch/chittakala/app/services/gemini_service.py):  
  Integrates ADK Multi-Agent Coordinator with `gemini-3.6-flash` and logs `ai_reliability_events` telemetry.

---

### 3. Expansion Art Modules & Seed Data
- [`app/services/art_service.py`](file:///C:/Users/91986/.gemini/antigravity/scratch/chittakala/app/services/art_service.py):  
  Activated **Madhubani** (Bihar; dual-line Mithila borders, peacock & fish motifs, Surya geometry) and **Gond Art** (Madhya Pradesh; dash & dot fill textures, forest fauna, Tree of Life) seed data alongside **Warli** (Maharashtra) and **Kolam** (Tamil Nadu).
- [`frontend/src/App.tsx`](file:///C:/Users/91986/.gemini/antigravity/scratch/chittakala/frontend/src/App.tsx):  
  Configured state and dynamic art form title resolution for all 4 art traditions across `ArtFormView`, `CategoryView`, `ExampleCarouselView`, and `DrawingActivityView`.

---

### 4. PWA Frontend UX & Resilient Flows
- [`frontend/src/components/CheckInView.tsx`](file:///C:/Users/91986/.gemini/antigravity/scratch/chittakala/frontend/src/components/CheckInView.tsx):  
  Added `← Back to Home` top navigation button.
- [`frontend/src/components/DrawingActivityView.tsx`](file:///C:/Users/91986/.gemini/antigravity/scratch/chittakala/frontend/src/components/DrawingActivityView.tsx):  
  Implemented **Option A**: While AI reflection is processing, an interactive `Complete Practice Without AI →` button appears below the loading spinner for instant user completion.
- [`frontend/src/components/SummaryView.tsx`](file:///C:/Users/91986/.gemini/antigravity/scratch/chittakala/frontend/src/components/SummaryView.tsx):  
  Added 4 interactive post check-in option pills (`Slower`, `About the same`, `Faster`, `Prefer not to say`) connected via non-blocking `PATCH /sessions/{id}/check-in` sync without duplicate session completion events.
- [`frontend/src/api/chittakalaClient.ts`](file:///C:/Users/91986/.gemini/antigravity/scratch/chittakala/frontend/src/api/chittakalaClient.ts):  
  Dynamic API host resolution (`http://localhost:8000` when running on `localhost`).

---

## 🧪 Verification & Automated Testing

- **Full Pytest Suite**: 43 / 43 Pytest tests passing cleanly across unit, API, contract, security, expansion art, and multi-agent test suites.
- **Scale-to-Zero GCP Billing Guardrail**: Cloud Run configured with `--min-instances=0` guaranteeing ₹0.00 idle cost.
