# Chittakala — Creative Wellness PWA (Warli & Kolam) 

**Tagline**: *Pause the scroll. Create your moment.*   
**Description**: Chittakala is a mobile-first creative-wellness PWA that helps users intentionally move from passive scrolling to active creation. Users browse curated Indian folk art examples (Warli & Kolam), recreate one with ordinary pen and paper, upload a photograph, and receive responsible Gemini AI reflection focused strictly on visible visual elements—without artistic grading or clinical diagnosis.

---

## 🏗️ Project Architecture & Tech Stack

- **Frontend**: React 18, TypeScript, Vite 5, PWA Manifest (`manifest.json`), Offline Service Worker (`sw.js`), Dark Mode Design System (`#0B0F19` canvas, `#161B26` containers, `#06B6D4` cyan accents).
- **Backend API**: Python 3.11+, FastAPI, Pydantic v2, Uvicorn, Pytest.
- **AI & Agentic Framework**: Google AI Studio / Vertex AI Gemini Multimodal API (`google-genai` SDK), Google ADK (Agent Development Kit).
- **Database & Cloud Storage**: Cloud Firestore (Operational store), Cloud Storage (`gs://chittakala-user-drawings/`).
- **Cloud Infrastructure**: Google Cloud Run (Containerized FastAPI service with `--min-instances=0` scale-to-zero safeguard), Docker.
- **Analytics & Reporting**: BigQuery & Looker Studio (Anonymous product & AI reliability analytics).

---

## 📁 Repository Structure

```text
chittakala/
├── app/
│   ├── api/
│   │   ├── art_forms.py        # GET /art-forms, GET /art-forms/{id}/categories
│   │   ├── exercises.py        # GET /categories/{id}/exercises, GET /exercises/{id}
│   │   ├── health.py           # GET /health
│   │   └── sessions.py         # POST /sessions, PATCH /check-in, POST /complete, GET /summary, DELETE /sessions/{id}, POST /drawing
│   ├── models/
│   │   ├── art_form.py         # ArtForm Pydantic schema
│   │   ├── category.py         # Category Pydantic schema
│   │   ├── exercise.py         # Exercise Pydantic schema
│   │   └── session.py          # Session Pydantic schemas & validation rules
│   ├── services/
│   │   ├── art_service.py      # Domain repository (Warli & Kolam 18 activities)
│   │   ├── session_service.py  # Session lifecycle repository
│   │   └── upload_service.py   # 5 MB limit, JPEG/PNG & Pillow image header verification
│   └── main.py                 # FastAPI application launcher
├── frontend/
│   ├── public/
│   │   ├── manifest.json       # PWA Manifest (standalone, portrait)
│   │   └── sw.js               # Service Worker offline caching strategy
│   ├── src/
│   │   ├── api/
│   │   │   └── chittakalaClient.ts # Typed API Client connecting to backend
│   │   ├── components/         # Modular Screen Components (Welcome, CheckIn, ArtForm, Category, Carousel, Drawing, Summary)
│   │   ├── App.tsx             # SPA Shell (Header, Scroll Viewport, Bottom Navigation)
│   │   ├── index.css           # Dark Mode Canvas & 48x48px Touch Bounding Targets
│   │   └── main.tsx            # React entry point
│   ├── index.html              # Viewport tags, Google Fonts, SW registration
│   ├── package.json            # React 18, Vite 5, Lucide Icons
│   └── vite.config.ts          # Vite server (Port 3000 -> Proxy Port 8000)
├── infrastructure/
│   ├── gcp_setup.sh            # Automated Cloud Run & GCP provisioning script
├── tests/
│   ├── api/                    # Health, Art Forms, Exercises, Sessions, Lifecycle & Deployed Smoke Tests
│   └── security/               # 5 MB limit, MIME type, Pillow spoofing & corruption protection tests
├── Dockerfile                  # Production container for Cloud Run
├── .dockerignore               # Container build ignore rules
├── .gitignore
├── requirements.txt            # Python dependencies
└── README.md
```

---

## 🚀 How to Run the Project Locally

To run and check the full Chittakala PWA application locally:

### Step 1: Start the Backend FastAPI Server (Port 8000)

Open a terminal in the project root `chittakala/`:

```powershell
# Direct command using project virtual environment:
.\.venv\Scripts\uvicorn.exe app.main:app --reload --port 8000
```

> 🌐 **Backend URLs**:
> - **API Root**: `http://127.0.0.1:8000/`
> - **Health Check**: `http://127.0.0.1:8000/health`
> - **Interactive Swagger Docs**: `http://127.0.0.1:8000/docs`

---

### Step 2: Start the Frontend React PWA Server (Port 3000)

Open a **second terminal** window in the `chittakala/frontend/` directory:

```cmd
cd frontend
npm run dev
```

> 📱 **PWA Web App URL**:
> Open your browser and go to: **`http://localhost:3000`**

---

### 📱 3 Easy Ways to View & Demo the App in Phone Format

1. **Chrome DevTools Mobile Emulation (Instant on your PC)**:
   - Open `http://localhost:3000` in Chrome.
   - Press **`F12`** (or Right-Click ➔ *Inspect*).
   - Click the **Device Toggle Icon** 📱 (or press `Ctrl + Shift + M`).
   - Select **iPhone 14 Pro** or **Pixel 7** from the top dropdown.
   - You will see the exact mobile PWA app with touch interactions and fixed mobile header/nav!

2. **Local Network Access on your Real Smartphone**:
   - Connect your phone and PC to the same Wi-Fi.
   - Start Vite with `--host`: `cmd /c "cd /d C:\Users\91986\.gemini\antigravity\scratch\chittakala\frontend && npx vite --host"`
   - Open `http://<your-pc-ip>:3000` in Chrome/Safari on your mobile phone!

3. **Install as PWA App on Phone**:
   - On your phone's browser, tap **"Add to Home Screen"** / **"Install Chittakala"**. It will install as an app icon with no browser bar!

---

## 🧪 Running Automated Test Suite

To run all 30 unit, API, contract, lifecycle, and security tests:

```powershell
.\.venv\Scripts\pytest.exe -v
```

---

## 📅 Project Execution Status

- ✅ **Day 1**: Project structure, Python venv, FastAPI baseline & `GET /health` endpoint + tests.
- ✅ **Day 2**: Art-Form and Category domain models (`warli`, `kolam`, 6 categories) & APIs + tests.
- ✅ **Day 3**: Exercise domain models & APIs for all 18 standalone activities + tests.
- ✅ **Day 4**: Session creation API (`POST /sessions`) with display name & pre-check-in validation + tests.
- ✅ **Day 5**: Session lifecycle APIs (`PATCH check-in`, `POST complete`, `GET summary`, `DELETE session`) + tests.
- ✅ **Day 6**: Upload security validation (`POST /sessions/{id}/drawing`, 5MB limit, JPEG/PNG, header check) + tests.
- ✅ **Day 7**: Production `Dockerfile`, `.dockerignore`, `gcp_setup.sh` script, and deployed smoke tests.
- ✅ **Day 8**: React 18 + Vite 5 PWA Mobile Frontend Shell, Gen Z Sunset Coral UI design system (`#F8FAFC` canvas, `#FF523B` coral gradients), Concept 1 Visual Storytelling Banner, 3-tab navigation, custom Chittakala brand logo icon, 3.2s splash screen, real-time name sync, and 0-error production build.
- ✅ **Day 9**: Responsible Gemini AI Multimodal Vision Reflection Service (`app/services/gemini_service.py`), `gemini-3.6-flash` model, non-clinical prompt engineering, non-art image detection guardrails, zero-grading rules, structured Pydantic reflection schema, `POST /sessions/{id}/reflect` API, and safe local fallback handler.
- ✅ **Day 10**: Complete System Polish & Production Deployment Readiness: PWA Web App Manifest, Service Worker offline caching strategy, security & privacy audit (stateless API payload handling, 5 MB upload limits, image header verification), 33 passing pytest tests, 0-error Vite production build, and comprehensive project documentation.
