from pydantic import BaseModel, Field


class Category(BaseModel):
    category_id: str = Field(..., description="Unique category identifier (e.g. basic-figures)")
    art_form_id: str = Field(..., description="Belonging art form ID (warli or kolam)")
    title: str = Field(..., description="Display title of the category")
    short_description: str = Field(..., description="Brief category summary")
    thumbnail_path: str = Field(..., description="Path to category thumbnail SVG")
    display_order: int = Field(1, description="Display order within art form")
    active: bool = Field(True, description="Whether category is active")
