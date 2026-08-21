# Chittakala (चित्तकला) — Creative Wellness 

**Tagline**: *Pause the scroll. Create your moment.*  
**Description**: Chittakala is a mobile-first creative-wellness PWA that helps users intentionally move from passive scrolling to active creation. Users browse curated Indian folk art examples (**Warli**, **Kolam**, **Madhubani**, and **Gond Art**), recreate one with ordinary pen and paper, upload a photograph, and receive responsible Gemini AI reflection focused strictly on visible visual elements—without artistic grading or clinical diagnosis.

---

## 🏗️ Project Architecture & Tech Stack

- **Frontend**: React 18, TypeScript, Vite 5, PWA Manifest (`manifest.json`), Offline Service Worker (`sw.js`), Gen Z Sunset Coral & Dark Mode Design System (`#F8FAFC` canvas, `#FF523B` coral accents).
- **Backend API**: Python 3.11+, FastAPI, Pydantic v2, Uvicorn, Pytest.
- **AI & Multi-Agent Vision**: Google AI Studio / Vertex AI Gemini Multimodal API (`google-genai` SDK), Google ADK (Agent Development Kit Multi-Agent Architecture: VisualObserver, MindfulCoach, SafetyAuditor, Coordinator).
- **Database & Cloud Storage**: Cloud Firestore (Operational store), Cloud Storage (`gs://chittakala-user-drawings/`).
- **Cloud Infrastructure**: Google Cloud Run (Containerized FastAPI service with `--min-instances=0` scale-to-zero safeguard), Docker.
- **Telemetry & Executive Dashboards**: BigQuery Telemetry Engine (`chittakala_analytics`) & Looker Studio Executive Dashboard (`v_mood_shift_summary`, `v_ai_performance_summary`).

---

## 📁 Repository Structure

```text
chittakala/
├── app/
│   ├── agents/                 # ADK Multi-Agent Architecture (VisualObserver, MindfulCoach, SafetyAuditor, Coordinator)
│   ├── api/
│   │   ├── art_forms.py        # GET /art-forms, GET /art-forms/{id}/categories
│   │   ├── exercises.py        # GET /categories/{id}/exercises, GET /exercises/{id}
│   │   ├── health.py           # GET /health
│   │   └── sessions.py         # POST /sessions, PATCH /check-in, POST /complete, GET /summary, DELETE /sessions/{id}, POST /drawing, POST /reflect
│   ├── models/
│   │   ├── art_form.py         # ArtForm Pydantic schema
│   │   ├── category.py         # Category Pydantic schema
│   │   ├── exercise.py         # Exercise Pydantic schema
│   │   └── session.py          # Session Pydantic schemas & validation rules
│   ├── services/
│   │   ├── art_service.py      # Domain repository (Warli, Kolam, Madhubani & Gond 36 activities)
│   │   ├── gemini_service.py   # ADK Multi-Agent Gemini Vision reflection service
│   │   ├── session_service.py  # Session lifecycle repository
│   │   ├── telemetry_service.py# BigQuery telemetry streaming engine
│   │   └── upload_service.py   # 5 MB limit, JPEG/PNG & Pillow image header verification
│   └── main.py                 # FastAPI application launcher with CORSMiddleware
├── dashboards/
│   └── README.md               # Looker Studio Executive Dashboard integration guide
├── frontend/
│   ├── public/
│   │   ├── manifest.json       # PWA Manifest (standalone, portrait)
│   │   └── sw.js               # Service Worker offline caching strategy
│   ├── src/
│   │   ├── api/
│   │   │   └── chittakalaClient.ts # Typed API Client with dynamic host resolution
│   │   ├── components/         # Modular Screen Components (Welcome, CheckIn, ArtForm, Category, Carousel, Drawing, Summary)
│   │   ├── App.tsx             # SPA Shell (Header, Scroll Viewport, Navigation)
│   │   ├── index.css           # Gen Z Sunset Coral & Touch Bounding Targets
│   │   └── main.tsx            # React entry point
│   ├── package.json            # React 18, Vite 5, Lucide Icons
│   └── vite.config.ts          # Vite server config
├── infrastructure/
│   ├── bigquery_schema.sql     # BigQuery DDL script & analytical views
│   └── gcp_setup.sh            # Automated Cloud Run & GCP provisioning script
├── tests/
│   ├── ai_evaluations/         # Gemini AI reflection quality tests
│   ├── api/                    # Health, Art Forms, Exercises, Sessions, Expansion Art & Deployed Smoke Tests
│   ├── contract/               # OpenAPI schema compliance tests
│   ├── security/               # 5 MB limit, MIME type, Pillow spoofing & corruption protection tests
│   └── unit/                   # Art Service, Gemini Service, Session Service, Telemetry Service & Multi-Agent tests
├── Dockerfile                  # Production container for Cloud Run
├── requirements.txt            # Python dependencies (google-genai, google-cloud-bigquery)
├── STAGE2_IMPLEMENTATION.md    # Detailed Stage 2 Implementation & Architecture Document
└── README.md
```

---

## 🚀 How to Run the Project Locally

### Step 1: Start the Backend FastAPI Server (Port 8000)

Open a terminal in the project root `chittakala/`:

```powershell
$env:GEMINI_API_KEY="your-gemini-api-key"; .\.venv\Scripts\python -m uvicorn app.main:app --reload --port 8000
```

> 🌐 **Backend URLs**:
> - **API Root**: `http://127.0.0.1:8000/`
> - **Health Check**: `http://127.0.0.1:8000/health`
> - **Interactive Swagger Docs**: `http://127.0.0.1:8000/docs`

---

### Step 2: Start the Frontend React PWA Server (Port 3001 / 3000)

Open a **second terminal** window in the `chittakala/frontend/` directory:

```cmd
cd frontend
npm run dev
```

> 📱 **PWA Web App URL**: **`http://localhost:3001`**

---

## 🧪 Running Automated Test Suite

To run all 43 unit, API, contract, lifecycle, security, expansion art, and AI evaluation tests:

```powershell
.\.venv\Scripts\pytest
```

---

## 📅 Stage 2 Accomplishments & Status

- ✅ **BigQuery Telemetry Engine**: Streamed `product_events` and `ai_reliability_events` to GCP (`chittakala-12345`).
- ✅ **Looker Studio Dashboards**: Provisioned `v_mood_shift_summary` and `v_ai_performance_summary` analytical views.
- ✅ **ADK Multi-Agent Vision Subsystem**: Implemented `VisualObserverAgent`, `MindfulCoachAgent`, `SafetyAuditorAgent`, and `MultiAgentCoordinator`.
- ✅ **Expansion Art Modules**: Activated **Madhubani** (Bihar) and **Gond Art** (Madhya Pradesh) alongside **Warli** and **Kolam**.
- ✅ **Modern UX Enhancements**: Added `← Back to Home` button, **Option A** instant completion button (`Complete Practice Without AI →`), and deduplicated post check-in sync.
- ✅ **100% Test Pass Rate**: 43 / 43 Pytest tests passing cleanly.
