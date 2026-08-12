from typing import List
from fastapi import APIRouter, HTTPException, status
from app.models.exercise import Exercise
from app.services.art_service import ArtService

router = APIRouter(tags=["Exercises"])


@router.get(
    "/categories/{category_id}/exercises",
    response_model=List[Exercise],
    summary="Retrieve active exercises for a category",
    description="Returns exactly three active exercises for the specified category ID.",
)
async def get_exercises_for_category(category_id: str):
    exercises = ArtService.get_exercises_by_category(category_id.lower())
    if exercises is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Category '{category_id}' not found or inactive.",
        )
    return exercises


@router.get(
    "/exercises/{exercise_id}",
    response_model=Exercise,
    summary="Retrieve exercise details by ID",
    description="Returns full exercise details including reference image path, guidance, and visible elements.",
)
async def get_exercise_by_id(exercise_id: str):
    exercise = ArtService.get_exercise_by_id(exercise_id.lower())
    if exercise is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Exercise '{exercise_id}' not found or inactive.",
        )
    return exercise
