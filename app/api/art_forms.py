from typing import List
# pyrefly: ignore [missing-import]
from fastapi import APIRouter, HTTPException, status
from app.models.art_form import ArtForm
from app.models.category import Category
from app.services.art_service import ArtService

router = APIRouter(tags=["Art Forms"])


@router.get(
    "/art-forms",
    response_model=List[ArtForm],
    summary="Retrieve active art forms",
    description="Returns exactly two active art forms (Warli and Kolam) with metadata.",
)
async def get_art_forms():
    return ArtService.get_active_art_forms()


@router.get(
    "/art-forms/{art_form_id}/categories",
    response_model=List[Category],
    summary="Retrieve categories for a specific art form",
    description="Returns active categories for the specified art form ID (warli or kolam).",
)
async def get_categories_for_art_form(art_form_id: str):
    categories = ArtService.get_categories_by_art_form(art_form_id.lower())
    if categories is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Art form '{art_form_id}' not found or inactive.",
        )
    return categories
