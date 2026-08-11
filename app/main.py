from fastapi import FastAPI
from app.api.health import router as health_router

app = FastAPI(
    title="Chittakala API",
    description="Backend API for Chittakala - Creative Wellness & Folk Art Application",
    version="0.1.0",
)

app.include_router(health_router)


@app.get("/")
async def root():
    return {
        "message": "Welcome to Chittakala API",
        "docs": "/docs",
        "health": "/health",
    }

