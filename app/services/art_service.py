from typing import List, Optional
from app.models.art_form import ArtForm
from app.models.category import Category
from app.models.exercise import Exercise


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

# Static seed data strictly fulfilling FR-03 (18 active standalone exercises across 6 categories)
EXERCISES_SEED: List[Exercise] = [
    # --- WARLI: Basic Figures ---
    Exercise(
        exercise_id="warli-basic-01",
        art_form_id="warli",
        category_id="basic-figures",
        title="Standing Figure",
        art_form="Warli",
        difficulty="beginner",
        short_description="Draw a basic standing figure formed by two inverted triangles.",
        reference_image_path="/art/warli/basic-figures/example-01.svg",
        visible_elements=["one circular head", "two joined triangles forming torso", "straight vertical leg lines"],
        drawing_guidance=[
            "Draw a small circle for the head.",
            "Draw an upper triangle pointing downwards.",
            "Draw a lower triangle touching at the vertex, pointing upwards.",
            "Add simple straight lines for legs and feet."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Warli tribal art tradition of Maharashtra",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="warli-basic-02",
        art_form_id="warli",
        category_id="basic-figures",
        title="Figure with Raised Arms",
        art_form="Warli",
        difficulty="beginner",
        short_description="Draw a figure celebrating with arms extended upward in joy.",
        reference_image_path="/art/warli/basic-figures/example-02.svg",
        visible_elements=["one circular head", "two joined triangles", "two upward angled arm lines"],
        drawing_guidance=[
            "Start with the head circle and joined torso triangles.",
            "Extend two arms outward and upward at a 45-degree angle.",
            "Add legs with slight knee bends."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Warli tribal art tradition of Maharashtra",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="warli-basic-03",
        art_form_id="warli",
        category_id="basic-figures",
        title="Two Connected Figures",
        art_form="Warli",
        difficulty="beginner",
        short_description="Draw two Warli figures holding hands side-by-side.",
        reference_image_path="/art/warli/basic-figures/example-03.svg",
        visible_elements=["two circular heads", "four joined triangles", "connecting arm line between figures"],
        drawing_guidance=[
            "Draw two standing triangular figures side-by-side.",
            "Connect the inner arm lines to show them holding hands.",
            "Keep distance balanced between both figures."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Warli tribal art tradition of Maharashtra",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),

    # --- WARLI: Figure Rows ---
    Exercise(
        exercise_id="warli-rows-01",
        art_form_id="warli",
        category_id="figure-rows",
        title="Three-Figure Row",
        art_form="Warli",
        difficulty="beginner",
        short_description="Draw a rhythmically spaced horizontal row of three identical figures.",
        reference_image_path="/art/warli/figure-rows/example-01.svg",
        visible_elements=["three circular heads", "three joined triangle pairs", "even horizontal spacing"],
        drawing_guidance=[
            "Draw a subtle horizontal baseline for orientation.",
            "Draw three equally spaced Warli figures along the line.",
            "Ensure heads and torso heights align evenly."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Warli tribal art tradition of Maharashtra",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="warli-rows-02",
        art_form_id="warli",
        category_id="figure-rows",
        title="Alternating-Arm Row",
        art_form="Warli",
        difficulty="intermediate",
        short_description="Draw a row of figures alternating arm positions up and down.",
        reference_image_path="/art/warli/figure-rows/example-02.svg",
        visible_elements=["three figures", "alternating arm positions", "rhythmic horizontal pattern"],
        drawing_guidance=[
            "Draw three Warli torsos in a row.",
            "Give figure 1 raised arms, figure 2 lowered arms, and figure 3 raised arms.",
            "Focus on the steady visual rhythm across the row."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Warli tribal art tradition of Maharashtra",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="warli-rows-03",
        art_form_id="warli",
        category_id="figure-rows",
        title="Simple Village-Activity Row",
        art_form="Warli",
        difficulty="intermediate",
        short_description="Draw a row depicting figures carrying baskets or tools.",
        reference_image_path="/art/warli/figure-rows/example-03.svg",
        visible_elements=["three figures", "curved head basket or tool line", "dynamic posture lines"],
        drawing_guidance=[
            "Draw three figures engaged in simple daily tasks.",
            "Add a small bowl/basket arc above the head of the center figure.",
            "Use clean, expressive stick lines."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Warli tribal art tradition of Maharashtra",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),

    # --- WARLI: Dancing Circles ---
    Exercise(
        exercise_id="warli-circles-01",
        art_form_id="warli",
        category_id="dancing-circles",
        title="Small Dancing Circle",
        art_form="Warli",
        difficulty="intermediate",
        short_description="Draw four figures joined in a small circular dance arrangement.",
        reference_image_path="/art/warli/dancing-circles/example-01.svg",
        visible_elements=["four circular heads", "circular arm loop", "inward facing triangular torsos"],
        drawing_guidance=[
            "Lightly sketch a central circular guide.",
            "Place four Warli figures along the cardinal points facing inwards.",
            "Connect their hands to form a continuous circle of unity."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Warli tribal art tradition of Maharashtra",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="warli-circles-02",
        art_form_id="warli",
        category_id="dancing-circles",
        title="Circle with a Central Tree",
        art_form="Warli",
        difficulty="intermediate",
        short_description="Draw figures dancing around a central tree motif.",
        reference_image_path="/art/warli/dancing-circles/example-02.svg",
        visible_elements=["central vertical tree with branch arcs", "surrounding circular row of figures"],
        drawing_guidance=[
            "Draw a central trunk line with triangular leaf clusters.",
            "Draw four or five simple figures forming a ring around the tree.",
            "Emphasize balance between center tree and outer ring."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Warli tribal art tradition of Maharashtra",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="warli-circles-03",
        art_form_id="warli",
        category_id="dancing-circles",
        title="Tarpa-Inspired Circular Composition",
        art_form="Warli",
        difficulty="advanced",
        short_description="Draw a spiral dance ring around a central musician figure.",
        reference_image_path="/art/warli/dancing-circles/example-03.svg",
        visible_elements=["center musician figure", "outer spiral chain of figures", "fluid curved dance line"],
        drawing_guidance=[
            "Draw the central musician holding a horn instrument.",
            "Draw a spiral arrangement of dancers curving around the center.",
            "Take your time enjoying the continuous circular flow."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Tarpa dance tradition of Warli community (Culturally attributed & reviewed)",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),

    # --- KOLAM: Simple Dot Kolams ---
    Exercise(
        exercise_id="kolam-dot-01",
        art_form_id="kolam",
        category_id="simple-dot-kolams",
        title="Single-Loop 3x3 Dot Grid",
        art_form="Kolam",
        difficulty="beginner",
        short_description="Connect a 3x3 dot grid using straight lines to form a star square.",
        reference_image_path="/art/kolam/simple-dot-kolams/example-01.svg",
        visible_elements=["3x3 dot grid", "outer diamond border line", "central cross pattern"],
        drawing_guidance=[
            "Place 9 dots in a 3x3 square grid with even spacing.",
            "Connect the outer edge dots to form a diamond boundary.",
            "Draw straight lines through the center dot to complete the symmetry."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Traditional South Indian daily threshold art",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="kolam-dot-02",
        art_form_id="kolam",
        category_id="simple-dot-kolams",
        title="Square Star 4x4 Dot Grid",
        art_form="Kolam",
        difficulty="beginner",
        short_description="Draw a 4x4 dot grid and connect points into an 8-pointed star.",
        reference_image_path="/art/kolam/simple-dot-kolams/example-02.svg",
        visible_elements=["4x4 dot grid", "intersecting square motifs", "symmetrical star points"],
        drawing_guidance=[
            "Place 16 dots in a neat 4x4 grid.",
            "Draw two overlapping squares angled at 45 degrees around the dots.",
            "Keep line thickness smooth and steady."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Traditional South Indian daily threshold art",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="kolam-dot-03",
        art_form_id="kolam",
        category_id="simple-dot-kolams",
        title="Cross Pattern 5x5 Dot Grid",
        art_form="Kolam",
        difficulty="intermediate",
        short_description="Connect a 5-dot cross grid into a traditional geometric flower.",
        reference_image_path="/art/kolam/simple-dot-kolams/example-03.svg",
        visible_elements=["5-dot cross grid", "four petal triangles", "central square nucleus"],
        drawing_guidance=[
            "Draw a 5-dot cross shape (1 center dot, 4 arm dots).",
            "Enclose each arm dot with a smooth triangular loop.",
            "Connect all petals back to the central dot."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Traditional South Indian daily threshold art",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),

    # --- KOLAM: Loops and Line Kolams ---
    Exercise(
        exercise_id="kolam-loop-01",
        art_form_id="kolam",
        category_id="loop-line-kolams",
        title="Single Continuous Line Loop",
        art_form="Kolam",
        difficulty="intermediate",
        short_description="Weave an unbroken curved loop around a 3-dot matrix.",
        reference_image_path="/art/kolam/loop-line-kolams/example-01.svg",
        visible_elements=["3-dot center line", "continuous curved loop", "zero line intersections"],
        drawing_guidance=[
            "Place 3 dots in a horizontal line.",
            "Start a line, curving smoothly around the first dot, weaving past the second, and looping around the third.",
            "Return to the start point in one continuous fluid motion without lifting the pen."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Traditional Sikku / Brahma Mudi Kolam practice",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="kolam-loop-02",
        art_form_id="kolam",
        category_id="loop-line-kolams",
        title="Symmetrical Four-Corner Loop",
        art_form="Kolam",
        difficulty="intermediate",
        short_description="Weave four corner loops around a 3x3 dot matrix.",
        reference_image_path="/art/kolam/loop-line-kolams/example-02.svg",
        visible_elements=["3x3 dot grid", "four corner teardrop loops", "symmetrical central node"],
        drawing_guidance=[
            "Place a 3x3 dot grid.",
            "Draw a teardrop loop weaving around each of the four corner dots.",
            "Join all four loops cleanly in the center matrix."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Traditional Sikku / Brahma Mudi Kolam practice",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="kolam-loop-03",
        art_form_id="kolam",
        category_id="loop-line-kolams",
        title="Interlocking Dual-Strand Loop",
        art_form="Kolam",
        difficulty="advanced",
        short_description="Weave two interlocking continuous loops through a 4x4 matrix.",
        reference_image_path="/art/kolam/loop-line-kolams/example-03.svg",
        visible_elements=["4x4 dot grid", "two distinct interlocking loops", "four-fold rotational symmetry"],
        drawing_guidance=[
            "Place a 4x4 dot matrix.",
            "Weave strand 1 around the inner 4 dots.",
            "Weave strand 2 around the outer ring of dots, gracefully interlocking with strand 1."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Traditional Sikku / Brahma Mudi Kolam practice",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),

    # --- KOLAM: Decorative Daily Kolams ---
    Exercise(
        exercise_id="kolam-daily-01",
        art_form_id="kolam",
        category_id="decorative-daily-kolams",
        title="Lotus Motif Daily Kolam",
        art_form="Kolam",
        difficulty="intermediate",
        short_description="Draw a daily morning lotus blossom motif with petal curves.",
        reference_image_path="/art/kolam/decorative-daily-kolams/example-01.svg",
        visible_elements=["central lotus pod", "four outer curved petals", "symmetrical leaf arcs"],
        drawing_guidance=[
            "Draw a small central circle.",
            "Extend four rounded lotus petal arcs radiating from the center.",
            "Add leaf arcs between petals to ground the motif."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Traditional daily threshold art",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="kolam-daily-02",
        art_form_id="kolam",
        category_id="decorative-daily-kolams",
        title="Symmetrical Morning Star Kolam",
        art_form="Kolam",
        difficulty="intermediate",
        short_description="Draw a morning star kolam featuring overlapping diamond petals.",
        reference_image_path="/art/kolam/decorative-daily-kolams/example-02.svg",
        visible_elements=["central star motif", "eight radiating diamond tips", "outer border arcs"],
        drawing_guidance=[
            "Draw a central square dot matrix.",
            "Construct eight diamond points radiating evenly from the center.",
            "Surround with clean scalloped border lines."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Traditional daily threshold art",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="kolam-daily-03",
        art_form_id="kolam",
        category_id="decorative-daily-kolams",
        title="Eight-Petal Flower Threshold Kolam",
        art_form="Kolam",
        difficulty="advanced",
        short_description="Draw an auspicious eight-petal floral kolam composition.",
        reference_image_path="/art/kolam/decorative-daily-kolams/example-03.svg",
        visible_elements=["center floral disc", "eight rounded petal curves", "outer corner accent dots"],
        drawing_guidance=[
            "Start at the center disc.",
            "Draw eight evenly spaced petal curves radiating outward.",
            "Add subtle accent dots at the four outer corners."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Traditional daily threshold art",
        review_status="reviewed",
        estimated_minutes=5,
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
    def get_category_by_id(category_id: str) -> Optional[Category]:
        """Find a category by ID if active."""
        for cat in CATEGORIES_SEED:
            if cat.category_id == category_id and cat.active:
                return cat
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

    @staticmethod
    def get_exercises_by_category(category_id: str) -> Optional[List[Exercise]]:
        """Return active exercises for a given category ID, or None if category is invalid."""
        category = ArtService.get_category_by_id(category_id)
        if not category:
            return None
        return [ex for ex in EXERCISES_SEED if ex.category_id == category_id and ex.active]

    @staticmethod
    def get_exercise_by_id(exercise_id: str) -> Optional[Exercise]:
        """Find an exercise by ID if active."""
        for ex in EXERCISES_SEED:
            if ex.exercise_id == exercise_id and ex.active:
                return ex
        return None

    @staticmethod
    def get_all_exercises() -> List[Exercise]:
        """Return all active exercises."""
        return [ex for ex in EXERCISES_SEED if ex.active]
