from fastapi import FastAPI
from app.api.health import router as health_router
from app.api.art_forms import router as art_forms_router
from app.api.exercises import router as exercises_router
from app.api.sessions import router as sessions_router

app = FastAPI(
    title="Chittakala API",
    description="Backend API for Chittakala - Creative Wellness & Folk Art Application",
    version="0.1.0",
)

app.include_router(health_router)
app.include_router(art_forms_router)
app.include_router(exercises_router)
app.include_router(sessions_router)


@app.get("/")
async def root():
    return {
        "message": "Welcome to Chittakala API",
        "docs": "/docs",
        "health": "/health",
        "art_forms": "/art-forms",
    }

