from typing import List, Optional
from app.models.art_form import ArtForm
from app.models.category import Category


# Static seed data strictly fulfilling FR-02 (2 active art forms, 3 categories per art form)
ART_FORMS_SEED: List[ArtForm] = [
    ArtForm(
        art_form_id="warli",
        title="Warli",
        short_description="Traditional tribal art from Maharashtra using basic geometric shapes like triangles, circles, and lines.",
        thumbnail_path="/art/warli/basic-figures/example-01.svg",
        source_note="Traditional folk art of Maharashtra, India",
        display_order=1,
        active=True,
    ),
    ArtForm(
        art_form_id="kolam",
        title="Kolam",
        short_description="Traditional South Indian floor art using dots, lines, curves, and symmetrical loops.",
        thumbnail_path="/art/kolam/simple-dot-kolams/example-01.svg",
        source_note="Traditional daily threshold art of South India",
        display_order=2,
        active=True,
    ),
]

CATEGORIES_SEED: List[Category] = [
    # Warli Categories
    Category(
        category_id="basic-figures",
        art_form_id="warli",
        title="Basic Warli Figures",
        short_description="Simple geometric human and animal shapes built with triangles and lines.",
        thumbnail_path="/art/warli/basic-figures/example-01.svg",
        display_order=1,
        active=True,
    ),
    Category(
        category_id="figure-rows",
        art_form_id="warli",
        title="Warli Figure Rows",
        short_description="Rhythmic rows of dancing or standing figures demonstrating symmetry.",
        thumbnail_path="/art/warli/figure-rows/example-01.svg",
        display_order=2,
        active=True,
    ),
    Category(
        category_id="dancing-circles",
        art_form_id="warli",
        title="Warli Dancing Circles",
        short_description="Circular compositions celebrating community, music, and central motifs.",
        thumbnail_path="/art/warli/dancing-circles/example-01.svg",
        display_order=3,
        active=True,
    ),
    # Kolam Categories
    Category(
        category_id="simple-dot-kolams",
        art_form_id="kolam",
        title="Simple Dot Kolams",
        short_description="Beginner-friendly dot grids connected by straight lines and geometric shapes.",
        thumbnail_path="/art/kolam/simple-dot-kolams/example-01.svg",
        display_order=1,
        active=True,
    ),
    Category(
        category_id="loop-line-kolams",
        art_form_id="kolam",
        title="Loops and Line Kolams",
        short_description="Flowing curved loops that weave around dot grids without intersecting lines.",
        thumbnail_path="/art/kolam/loop-line-kolams/example-01.svg",
        display_order=2,
        active=True,
    ),
    Category(
        category_id="decorative-daily-kolams",
        art_form_id="kolam",
        title="Decorative Daily Kolams",
        short_description="Symmetrical floral and traditional morning kolam patterns for daily practice.",
        thumbnail_path="/art/kolam/decorative-daily-kolams/example-01.svg",
        display_order=3,
        active=True,
    ),
]


class ArtService:
    @staticmethod
    def get_active_art_forms() -> List[ArtForm]:
        """Return all active art forms sorted by display order."""
        return sorted(
            [af for af in ART_FORMS_SEED if af.active],
            key=lambda x: x.display_order,
        )

    @staticmethod
    def get_art_form_by_id(art_form_id: str) -> Optional[ArtForm]:
        """Find an art form by ID if active."""
        for af in ART_FORMS_SEED:
            if af.art_form_id == art_form_id and af.active:
                return af
        return None

    @staticmethod
    def get_categories_by_art_form(art_form_id: str) -> Optional[List[Category]]:
        """Return active categories for a given art form ID, or None if art form is invalid."""
        art_form = ArtService.get_art_form_by_id(art_form_id)
        if not art_form:
            return None
        return sorted(
            [c for c in CATEGORIES_SEED if c.art_form_id == art_form_id and c.active],
            key=lambda x: x.display_order,
        )
