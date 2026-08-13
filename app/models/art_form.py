from typing import Optional
# pyrefly: ignore [missing-import]
from pydantic import BaseModel, Field


class ArtForm(BaseModel):
    art_form_id: str = Field(..., description="Unique identifier for the art form (e.g. warli, kolam)")
    title: str = Field(..., description="Display title of the art form")
    short_description: str = Field(..., description="Brief overview description")
    thumbnail_path: str = Field(..., description="Path to curated thumbnail SVG asset")
    source_note: Optional[str] = Field(None, description="Attribution / cultural provenance note")
    display_order: int = Field(1, description="Order of display in UI")
    active: bool = Field(True, description="Whether art form is currently active")
