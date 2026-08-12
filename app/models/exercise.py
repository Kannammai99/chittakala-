from typing import List, Optional
from pydantic import BaseModel, Field


class Exercise(BaseModel):
    exercise_id: str = Field(..., description="Unique exercise identifier (e.g. warli-basic-01)")
    art_form_id: str = Field(..., description="Belonging art form ID (warli or kolam)")
    category_id: str = Field(..., description="Belonging category ID (e.g. basic-figures)")
    title: str = Field(..., description="Display title of the exercise")
    art_form: str = Field(..., description="Human-readable art form name ('Warli' or 'Kolam')")
    difficulty: str = Field("beginner", description="Difficulty level: beginner, intermediate, advanced")
    short_description: str = Field(..., description="Brief guidance summary")
    reference_image_path: str = Field(..., description="Path to reference SVG asset")
    visible_elements: List[str] = Field(default_factory=list, description="Curated visible visual elements for Gemini context")
    drawing_guidance: List[str] = Field(default_factory=list, description="Step-by-step drawing guidance tips")
    allowed_next_actions: List[str] = Field(default_factory=list, description="Supported post-exercise options")
    source_attribution: Optional[str] = Field(None, description="Source provenance or attribution note")
    review_status: str = Field("reviewed", description="Asset review status: reviewed, draft, candidate")
    estimated_minutes: int = Field(5, description="Estimated completion time in minutes")
    active: bool = Field(True, description="Whether exercise is active")
