from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.health import router as health_router
from app.api.art_forms import router as art_forms_router
from app.api.exercises import router as exercises_router
from app.api.sessions import router as sessions_router
from app.api.reminders import router as reminders_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Ensure catalog seed data (Warli, Kolam, Madhubani, Gond) is populated into Firestore on startup
    try:
        from app.services.art_service import ArtService
        ArtService._ensure_seeded()
    except Exception as e:
        import logging
        logging.warning(f"Startup catalog seed warning: {e}")
    yield

app = FastAPI(
    title="Chittakala API",
    description="Backend API for Chittakala - Creative Wellness & Folk Art Application",
    version="0.1.0",
    lifespan=lifespan,
)

# Enable CORS for frontend PWA cross-origin API calls (localhost, Vercel & production domains)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_origin_regex=r"https?://.*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(art_forms_router)
app.include_router(exercises_router)
app.include_router(sessions_router)
app.include_router(reminders_router)


@app.api_route("/", methods=["GET", "OPTIONS", "HEAD"])
async def root():
    return {
        "message": "Welcome to Chittakala API",
        "docs": "/docs",
        "health": "/health",
        "art_forms": "/art-forms",
    }
