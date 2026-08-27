from typing import List, Optional
from app.models.art_form import ArtForm
from app.models.category import Category
from app.models.exercise import Exercise


# Seed data fulfilling 4 active art forms (Warli, Kolam, Madhubani, Gond)
ART_FORMS_SEED: List[ArtForm] = [
    ArtForm(
        art_form_id="warli",
        title="Warli",
        short_description="Traditional tribal art from Maharashtra using basic geometric shapes like triangles, circles, and lines.",
        thumbnail_path="/art/warli/basic-figures/example-01.png",
        source_note="Traditional folk art of Maharashtra, India",
        display_order=1,
        active=True,
    ),
    ArtForm(
        art_form_id="kolam",
        title="Kolam",
        short_description="Traditional South Indian floor art using dots, lines, curves, and symmetrical loops.",
        thumbnail_path="/art/kolam/simple-dot-kolams/example-01.png",
        source_note="Traditional daily threshold art of South India",
        display_order=2,
        active=True,
    ),
    ArtForm(
        art_form_id="madhubani",
        title="Madhubani",
        short_description="Mithila folk painting from Bihar featuring intricate dual-line borders, floral patterns, and nature motifs.",
        thumbnail_path="/art/madhubani/preview.png",
        source_note="Mithila cultural heritage of Bihar, India",
        display_order=3,
        active=True,
    ),
    ArtForm(
        art_form_id="gond",
        title="Gond Art",
        short_description="Tribal art of Madhya Pradesh crafted using signature fine dots, dashes, and rhythmic nature lines.",
        thumbnail_path="/art/gond/preview.png",
        source_note="Gond indigenous tribal art of Central India",
        display_order=4,
        active=True,
    ),
    ArtForm(
        art_form_id="pattachitra",
        title="Pattachitra",
        short_description="Ancient cloth scroll painting tradition of Odisha featuring bold black outlines and detailed mythic motifs.",
        thumbnail_path="/art/pattachitra/preview.png",
        source_note="Heritage scroll art tradition of Odisha",
        display_order=5,
        active=False,
    ),
    ArtForm(
        art_form_id="kalamkari",
        title="Kalamkari",
        short_description="Traditional hand-painted pen art of Andhra Pradesh featuring organic vine tendrils and peacock motifs.",
        thumbnail_path="/art/kalamkari/preview.png",
        source_note="Hand-block and bamboo pen art of Andhra Pradesh",
        display_order=6,
        active=False,
    ),
]


CATEGORIES_SEED: List[Category] = [
    # Warli Categories
    Category(
        category_id="basic-figures",
        art_form_id="warli",
        title="Basic Warli Figures & Motifs",
        short_description="Beginner-friendly geometric figures, musicians, and village life.",
        thumbnail_path="/art/warli/basic-figures/example-01.png",
        display_order=1,
        active=True,
    ),
    Category(
        category_id="figure-rows",
        art_form_id="warli",
        title="Warli Figure Rows & Scenes",
        short_description="Rhythmic rows of dancers, seed sowing farmers, and village drummers.",
        thumbnail_path="/art/warli/figure-rows/example-01.png",
        display_order=2,
        active=True,
    ),
    Category(
        category_id="dancing-circles",
        art_form_id="warli",
        title="Warli Circles & Sacred Murals",
        short_description="Grand Tarpa dance rings, musician shrines, and sacred Tree of Life murals.",
        thumbnail_path="/art/warli/dancing-circles/example-01.png",
        display_order=3,
        active=True,
    ),
    # Kolam Categories
    Category(
        category_id="simple-dot-kolams",
        art_form_id="kolam",
        title="Simple Pulli & Line Kolams",
        short_description="Beginner-friendly dot grids, continuous line loops, and floral blossoms.",
        thumbnail_path="/art/kolam/simple-dot-kolams/example-01.png",
        display_order=1,
        active=True,
    ),
    Category(
        category_id="loop-line-kolams",
        art_form_id="kolam",
        title="Sikku & Brahma Mudi Kolams",
        short_description="Flowing curved loops, cross-form Sikku matrices, and interlocking strands.",
        thumbnail_path="/art/kolam/loop-line-kolams/example-01.png",
        display_order=2,
        active=True,
    ),
    Category(
        category_id="decorative-daily-kolams",
        art_form_id="kolam",
        title="Grand Padma & Sikku Matrices",
        short_description="Intricate multi-loop Sikku matrices, dual triangular grids, and Kambi Kolams.",
        thumbnail_path="/art/kolam/decorative-daily-kolams/example-01.png",
        display_order=3,
        active=True,
    ),
    # Madhubani Categories
    Category(
        category_id="madhubani-borders",
        art_form_id="madhubani",
        title="Mithila Dual-Line Borders",
        short_description="Traditional double-lined geometric borders, lotus petals, and leaf creepers.",
        thumbnail_path="/art/madhubani/borders/example-01.png",
        display_order=1,
        active=True,
    ),
    Category(
        category_id="madhubani-nature",
        art_form_id="madhubani",
        title="Madhubani Bird & Fish Motifs",
        short_description="Symbolic fish of fertility and intricate double-outlined songbird and royal bird motifs.",
        thumbnail_path="/art/madhubani/nature/example-01.png",
        display_order=2,
        active=True,
    ),
    Category(
        category_id="madhubani-sacred",
        art_form_id="madhubani",
        title="Sun, Tree of Life & Peacock",
        short_description="Ceremonial Surya Sun medallion, sacred Tree of Life with birds, and step-by-step royal Peacock.",
        thumbnail_path="/art/madhubani/sacred/example-01.png",
        display_order=3,
        active=True,
    ),
    # Gond Categories
    Category(
        category_id="gond-patterns",
        art_form_id="gond",
        title="Gond Bird Motifs & Pattern Textures",
        short_description="Vibrant tribal birds, perching pairs, and royal peacocks filled with signature Gond dashes, dots, and wave textures.",
        thumbnail_path="/art/gond/patterns/example-01.png",
        display_order=1,
        active=True,
    ),
    Category(
        category_id="gond-fauna",
        art_form_id="gond",
        title="Gond Forest Stag & Aquatic Fauna",
        short_description="Sacred antler-tree forest stag, arched peacock feather plumes, and swimming aquatic fish in river reeds.",
        thumbnail_path="/art/gond/fauna/example-01.png",
        display_order=2,
        active=True,
    ),
    Category(
        category_id="gond-tree-of-life",
        art_form_id="gond",
        title="Gond Sacred Tree & Blooming Canopy",
        short_description="Intertwined Tree of Life trunks, golden Mahua berry canopy, and perching songbirds in floral vines.",
        thumbnail_path="/art/gond/tree/example-01.png",
        display_order=3,
        active=True,
    ),
]

EXERCISES_SEED: List[Exercise] = [
    # --- WARLI: Basic Figures ---
    Exercise(
        exercise_id="warli-basic-01",
        art_form_id="warli",
        category_id="basic-figures",
        title="Dancing Warli Trio",
        art_form="Warli",
        difficulty="beginner",
        short_description="Draw a dynamic trio of Warli figures expressing joyful movement with bent knees and raised arms.",
        reference_image_path="/art/warli/basic-figures/example-01.png",
        visible_elements=["three triangular Warli figures", "dynamic bent leg postures", "raised arm dance lines"],
        drawing_guidance=[
            "Draw three circular heads at slightly varied heights.",
            "Construct triangular torsos pointing down and skirts pointing up.",
            "Add expressive bent-knee leg lines and raised arm angles."
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
        title="Warli Dhol & Gong Musicians",
        art_form="Warli",
        difficulty="beginner",
        short_description="Draw two Warli musicians playing a large village drum and gong with drumsticks.",
        reference_image_path="/art/warli/basic-figures/example-02.png",
        visible_elements=["two Warli figures", "large circular village drum", "raised drumsticks and hair bun"],
        drawing_guidance=[
            "Draw a large circular drum between two figures.",
            "Form two Warli figures on either side of the drum.",
            "Draw arm lines holding drumsticks raised toward the drum surface."
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
        title="Warli Daily Life Procession",
        art_form="Warli",
        difficulty="beginner",
        short_description="Draw a Warli village procession featuring a pot carrier, firewood carrier, horse rider, and shepherd.",
        reference_image_path="/art/warli/basic-figures/example-03.png",
        visible_elements=["water pot carrier figure", "firewood bundle carrier", "figure riding a horse", "shepherd with staff"],
        drawing_guidance=[
            "Draw four Warli figures across your paper.",
            "Add a water pot on the first figure's head and a firewood bundle on the second.",
            "Construct a triangular horse motif under the third figure and a walking staff for the fourth."
        ],
        allowed_next_actions=["repeat", "finish"],
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
        title="Hand-Holding Warli Dancers Row",
        art_form="Warli",
        difficulty="intermediate",
        short_description="Draw a horizontal row of five Warli figures holding hands in rhythmic celebration.",
        reference_image_path="/art/warli/figure-rows/example-01.png",
        visible_elements=["five triangular Warli torsos", "connecting curved hand lines", "rhythmic bent leg postures"],
        drawing_guidance=[
            "Draw five equally spaced circular heads in a horizontal line.",
            "Form triangular torsos under each head.",
            "Connect their inner arm lines in a smooth wave to show them holding hands."
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
        title="Warli Seed Sowing & Harvest Scene",
        art_form="Warli",
        difficulty="intermediate",
        short_description="Draw two Warli farmers engaged in sowing seeds and holding a harvest bowl.",
        reference_image_path="/art/warli/figure-rows/example-02.png",
        visible_elements=["sowing farmer figure", "harvest bowl holder figure", "scattered seed dots and grass tufts"],
        drawing_guidance=[
            "Draw two Warli figures facing each other.",
            "Draw a bowl arc in the hands of the right figure.",
            "Add scattered seed dots falling from the left figure's hand and grass tufts along the ground."
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
        title="Warli Drummer Musician Scene",
        art_form="Warli",
        difficulty="intermediate",
        short_description="Draw a Warli figure playing a traditional village drum with drumsticks.",
        reference_image_path="/art/warli/figure-rows/example-03.png",
        visible_elements=["center Warli musician", "large decorated drum bowl", "raised drumsticks and hair tuft"],
        drawing_guidance=[
            "Draw a large bowl-shaped drum with decorative inner arcs.",
            "Construct a Warli figure sitting or standing behind the drum.",
            "Add raised arm lines holding drumsticks above the drum surface."
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
        title="Circular Tarpa Dance Ring",
        art_form="Warli",
        difficulty="challenging",
        short_description="Draw a grand circular Tarpa dance ring of twelve Warli figures enclosed by a leafy border frame.",
        reference_image_path="/art/warli/dancing-circles/example-01.png",
        visible_elements=["twelve-dancer circular ring", "interlocked hand lines", "outer leafy border frame"],
        drawing_guidance=[
            "Lightly sketch a central circular guide on paper.",
            "Place twelve Warli figures evenly spaced along the ring.",
            "Connect their hand lines in a smooth wave and frame the composition with a leafy border."
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
        title="Warli Ritual Musician Shrine",
        art_form="Warli",
        difficulty="challenging",
        short_description="Draw a central Warli drum player enclosed by sixteen traditional Dhol drums and fern sprigs.",
        reference_image_path="/art/warli/dancing-circles/example-02.png",
        visible_elements=["center Warli drummer", "inner square border", "sixteen surrounding Dhol drums and fern sprigs"],
        drawing_guidance=[
            "Draw a central Warli drummer sitting behind a large bowl drum inside a square frame.",
            "Surround the frame with sixteen traditional Dhol drums on all four sides.",
            "Add delicate fern sprigs at the four outer corners."
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
        title="Sacred Banyan Tree & Festival Village Mural",
        art_form="Warli",
        difficulty="challenging",
        short_description="Draw a grand Warli Tree of Life filled with nesting birds, perching peacock, musicians, and village dancers.",
        reference_image_path="/art/warli/dancing-circles/example-03.png",
        visible_elements=["central Tree of Life with nesting birds", "perching peacock motif", "village musicians and dancers below"],
        drawing_guidance=[
            "Draw a central branching Tree of Life with a perching peacock and dense leaf circles.",
            "Add village musicians and dancers around the base of the tree.",
            "Complete with a bottom row of interlocked festival dancers and border trim."
        ],
        allowed_next_actions=["repeat", "finish"],
        source_attribution="Warli tribal art tradition of Maharashtra",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),

    # --- KOLAM: Simple Dot Kolams ---
    Exercise(
        exercise_id="kolam-dot-01",
        art_form_id="kolam",
        category_id="simple-dot-kolams",
        title="Continuous Cross Sikku Loop Kolam",
        art_form="Kolam",
        difficulty="beginner",
        short_description="Weave an unbroken continuous line loop around a 5-dot cross grid on paper.",
        reference_image_path="/art/kolam/simple-dot-kolams/example-01.png",
        visible_elements=["5-dot cross grid", "single unbroken fluid line loop", "symmetrical corner loops"],
        drawing_guidance=[
            "Place 5 dots in a symmetrical cross formation on paper.",
            "Start at the top dot, weaving smoothly around the outer dots without lifting your pen.",
            "Complete the fluid loop back to the starting point."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Traditional South Indian threshold art",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="kolam-dot-02",
        art_form_id="kolam",
        category_id="simple-dot-kolams",
        title="Diamond Frame 4-Petal Floral Kolam",
        art_form="Kolam",
        difficulty="beginner",
        short_description="Draw a central 4-petal flower enclosed by a diamond frame and outer scalloped petals.",
        reference_image_path="/art/kolam/simple-dot-kolams/example-02.png",
        visible_elements=["center 4-petal blossom", "outer diamond boundary line", "scalloped outer petal arcs"],
        drawing_guidance=[
            "Draw a central 4-petal flower blossom on paper.",
            "Enclose the flower within a 45-degree angled diamond frame.",
            "Surround the diamond with scalloped outer petal curves."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Traditional South Indian threshold art",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="kolam-dot-03",
        art_form_id="kolam",
        category_id="simple-dot-kolams",
        title="Snowflake 6-Petal Rosette Sikku Kolam",
        art_form="Kolam",
        difficulty="intermediate",
        short_description="Draw a central 6-petal rosette with radiating Sikku loops around a dot matrix.",
        reference_image_path="/art/kolam/simple-dot-kolams/example-03.png",
        visible_elements=["central 6-petal rosette", "radiating outer Sikku loops", "dot matrix accents"],
        drawing_guidance=[
            "Draw a 6-petal floral rosette at the center of your paper.",
            "Place surrounding accent dots evenly around the perimeter.",
            "Weave delicate outer Sikku loops around each dot to complete the snowflake pattern."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Traditional South Indian threshold art",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),

    # --- KOLAM: Loops and Line Kolams ---
    Exercise(
        exercise_id="kolam-loop-01",
        art_form_id="kolam",
        category_id="loop-line-kolams",
        title="Radiant Lotus Corner Loop Kolam",
        art_form="Kolam",
        difficulty="intermediate",
        short_description="Draw a symmetrical blue-tile Kolam with a central 8-pointed star and four corner lotus blossoms.",
        reference_image_path="/art/kolam/loop-line-kolams/example-01.png",
        visible_elements=["central 8-pointed star nucleus", "four concentric curved side loops", "four corner lotus blossoms"],
        drawing_guidance=[
            "Draw the central 8-pointed star nucleus.",
            "Add four sets of concentric curved line loops around the cardinal sides.",
            "Finish by drawing four stylized lotus blossoms at each outer corner."
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
        title="Cross-Form Sikku Loop Matrix",
        art_form="Kolam",
        difficulty="intermediate",
        short_description="Weave an unbroken continuous line loop into a cross-shaped Sikku matrix around a dot grid.",
        reference_image_path="/art/kolam/loop-line-kolams/example-02.png",
        visible_elements=["center dot grid", "cross-shaped continuous line loops", "four outer teardrop loops"],
        drawing_guidance=[
            "Set up the cross-shaped dot matrix.",
            "Weave continuous curved lines through the central square rows.",
            "Loop around the outer four extension dots to complete the cross."
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
        title="Interlocking Brahma Mudi Sikku Strand",
        art_form="Kolam",
        difficulty="intermediate",
        short_description="Weave a traditional Tamil Nadu Brahma Mudi Sikku strand in fluid diagonal loops around a dot grid.",
        reference_image_path="/art/kolam/loop-line-kolams/example-03.png",
        visible_elements=["diagonal dot matrix", "interlocking fluid S-loops", "corner teardrop loops"],
        drawing_guidance=[
            "Place the diagonal dot grid.",
            "Trace continuous fluid lines weaving diagonally between the dot nodes.",
            "Loop smoothly at each outer corner to close the unbroken strand."
        ],
        allowed_next_actions=["repeat", "finish"],
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
        title="Square Sikku Weaved Matrix Kolam",
        art_form="Kolam",
        difficulty="challenging",
        short_description="Draw a complex, symmetrical multi-loop Sikku matrix on a square grid with red and yellow accent dots.",
        reference_image_path="/art/kolam/decorative-daily-kolams/example-01.png",
        visible_elements=["central dot pod", "interlocking woven line matrix", "red and yellow accent dots"],
        drawing_guidance=[
            "Place a symmetrical multi-dot grid.",
            "Weave continuous curved strands around the dots to build the inner and outer square loops.",
            "Add subtle red and yellow accent dots inside the loop nodes."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Traditional South Indian threshold art",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="kolam-daily-02",
        art_form_id="kolam",
        category_id="decorative-daily-kolams",
        title="Dual Triangular Sikku Weaved Matrix Kolam",
        art_form="Kolam",
        difficulty="challenging",
        short_description="Draw two interlocking triangular Sikku dot matrices woven with continuous white loops, red dots, and yellow corner accents.",
        reference_image_path="/art/kolam/decorative-daily-kolams/example-02.png",
        visible_elements=["twin triangular dot matrices", "continuous woven grid lines", "red and yellow accent dots"],
        drawing_guidance=[
            "Place two adjacent triangular dot grid formations.",
            "Weave continuous curved lines through the grid rows to build the inner square mesh.",
            "Loop around the outer edges and add red and yellow accent dots at nodes."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Traditional South Indian threshold art",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="kolam-daily-03",
        art_form_id="kolam",
        category_id="decorative-daily-kolams",
        title="Kambi Brahma Mudi Sikku Threshold Kolam",
        art_form="Kolam",
        difficulty="challenging",
        short_description="Draw an authentic Tamil Nadu Kambi Brahma Mudi Kolam with corner flame loops and outer tendrils.",
        reference_image_path="/art/kolam/decorative-daily-kolams/example-03.png",
        visible_elements=["center 4-loop nucleus", "interlocking corner flame loops", "radiating outer flame tendrils"],
        drawing_guidance=[
            "Draw the central 4-loop nucleus matrix.",
            "Weave four corner flame loops intertwining around the outer dot matrix.",
            "Finish with radiating outer flame accent tips."
        ],
        allowed_next_actions=["repeat", "finish"],
        source_attribution="Traditional South Indian threshold art",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),

    # --- MADHUBANI EXERCISES: Mithila Dual-Line Borders ---
    Exercise(
        exercise_id="madhubani-border-01",
        art_form_id="madhubani",
        category_id="madhubani-borders",
        title="Mithila Peacock & Triangular Geometry Border",
        art_form="Madhubani",
        difficulty="beginner",
        short_description="Draw an authentic Madhubani border frame featuring twin peacock motifs with expressive eyes, red & blue plumages, green leaf creepers, and alternating red/orange/green triangular geometric bands.",
        reference_image_path="/art/madhubani/borders/example-01.png",
        visible_elements=["twin peacock motifs with expressive eyes", "red, orange, and blue plumage patterns", "alternating triangular geometric bands", "green leaf creepers"],
        drawing_guidance=[
            "Draw two outer double-line borders around the perimeter of your paper.",
            "Construct two stylized peacocks facing upward along the lower side margins.",
            "Add alternating green, orange, and red triangular geometric bands along top and bottom borders."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Mithila Madhubani art tradition of Bihar",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="madhubani-border-02",
        art_form_id="madhubani",
        category_id="madhubani-borders",
        title="Madhubani Fish & Lotus Floral Creeper Border",
        art_form="Madhubani",
        difficulty="intermediate",
        short_description="Draw an authentic Madhubani border frame featuring dual-lined lotus floral vines along vertical sides and a pair of sacred yellow & blue Mithila fish facing lotus blossoms on horizontal borders.",
        reference_image_path="/art/madhubani/borders/example-02.png",
        visible_elements=["twin sacred fish motifs", "dual-lined lotus floral vines", "central lotus blossom motifs", "diagonal striped inner border"],
        drawing_guidance=[
            "Draw a rectangular inner and outer frame with diagonal stripe shading.",
            "Construct two lotus floral vines climbing along the left and right side borders.",
            "Draw a pair of facing sacred fish around a central lotus flower at top and bottom margins."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Mithila Madhubani art tradition of Bihar",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="madhubani-border-03",
        art_form_id="madhubani",
        category_id="madhubani-borders",
        title="Madhubani Red Lotus Blossom & Leaf Vine Border",
        art_form="Madhubani",
        difficulty="beginner",
        short_description="Draw an authentic Madhubani border frame featuring repeating red 5-petal lotus blossoms connected by curving green leaf vines with fine hatching line fills (Kachni) and a yellow dotted inner rim.",
        reference_image_path="/art/madhubani/borders/example-03.png",
        visible_elements=["repeating red 5-petal lotus blossoms", "curving green leaf vine tendrils", "fine hatching fills (Kachni style)", "yellow dotted inner rim"],
        drawing_guidance=[
            "Draw a rectangular double-line frame with a yellow dotted inner border.",
            "Draw repeating red 5-petal lotus flowers connected by curving green leaf vines.",
            "Fill leaf interiors with fine parallel hatching lines (Kachni style)."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Mithila Madhubani art tradition of Bihar",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="madhubani-nature-01",
        art_form_id="madhubani",
        category_id="madhubani-nature",
        title="Madhubani Step-by-Step Songbird Motif",
        art_form="Madhubani",
        difficulty="intermediate",
        short_description="Draw a step-by-step Madhubani songbird featuring a bright yellow head, double-lined contours, patterned orange wing feathers, and a blue floral belly.",
        reference_image_path="/art/madhubani/nature/example-01.png",
        visible_elements=["stylized songbird profile", "yellow head with circular eye", "patterned orange wing feathers with dots", "blue belly with floral accents", "double-line body contour"],
        drawing_guidance=[
            "Draw the smooth C-curve body contour (Steps 1 & 2).",
            "Add double-lined wing borders, beak, circular eye, and tail outline (Steps 3 & 4).",
            "Fill wings and belly with traditional hatching, dots, and vibrant colors (Steps 5 & 6)."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Mithila Madhubani art tradition of Bihar",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="madhubani-nature-02",
        art_form_id="madhubani",
        category_id="madhubani-nature",
        title="Madhubani Crested Royal Bird on Flowering Branch",
        art_form="Madhubani",
        difficulty="intermediate",
        short_description="Draw a step-by-step Madhubani royal bird perching on a flowering branch with red blossoms, leaf vines, a decorated crown crest, and patterned wing hatching.",
        reference_image_path="/art/madhubani/nature/example-02.png",
        visible_elements=["crested royal bird perched on branch", "red 5-petal lotus blossoms", "climbing leaf vine branch", "patterned red wing with fine hatching", "decorative crown crest"],
        drawing_guidance=[
            "Draw the head circle, beak, and body guide line perching on a branch (Steps 1 & 2).",
            "Construct double-line wing contours, crown crest, and leaf vine branch (Steps 3 & 4).",
            "Add fine hatching lines, dot fills, and red floral blossoms (Steps 5 & 6)."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Mithila Madhubani art tradition of Bihar",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="madhubani-nature-03",
        art_form_id="madhubani",
        category_id="madhubani-nature",
        title="Madhubani Sacred Fish Medallion Motif",
        art_form="Madhubani",
        difficulty="intermediate",
        short_description="Draw a step-by-step Madhubani pink & purple fish motif enclosed within a circular blue water medallion with double-lined fins and scalloped dot borders.",
        reference_image_path="/art/madhubani/nature/example-03.png",
        visible_elements=["pink and purple sacred fish motif", "circular blue water medallion", "scalloped outer dot rim", "double-line fins and scale fills"],
        drawing_guidance=[
            "Draw a outer guideline circle and almond-shaped fish body (Step 1).",
            "Add top, bottom, and tail fins (Step 2).",
            "Fill fish body with scalloped scales, fine hatching, and enclose in a blue water circle with dotted outer rim (Steps 3 & 4)."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Mithila Madhubani art tradition of Bihar",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="madhubani-sacred-01",
        art_form_id="madhubani",
        category_id="madhubani-sacred",
        title="Madhubani Step-by-Step Royal Peacock",
        art_form="Madhubani",
        difficulty="challenging",
        short_description="Draw a step-by-step Madhubani royal peacock featuring a blue body, crown crest pins, patterned wings with fine hatching, fan-tail feather eye-spots, perching on a lotus stem.",
        reference_image_path="/art/madhubani/sacred/example-01.png",
        visible_elements=["blue royal peacock profile", "crown crest pins with colored tips", "patterned wing with black/grey hatching", "fan-tail feathers with eye-spots", "perching red lotus flower stem"],
        drawing_guidance=[
            "Draw head circle and C-curve body contour perching on a lotus stem (Steps 1 & 2).",
            "Add wing shape, fan-tail outline, and crown crest pins (Steps 3 & 4).",
            "Fill wings, tail eye-spots, and body with fine hatching and vibrant colors (Steps 5 & 6)."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Mithila Madhubani art tradition of Bihar",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="madhubani-sacred-02",
        art_form_id="madhubani",
        category_id="madhubani-sacred",
        title="Ceremonial Madhubani Surya Sun Medallion",
        art_form="Madhubani",
        difficulty="challenging",
        short_description="Draw a ceremonial Madhubani Sun (Surya) medallion featuring a yellow face with tilak, mustache, double-line eyes, concentric hatching rings, and radiating red triangular rays.",
        reference_image_path="/art/madhubani/sacred/example-02.png",
        visible_elements=["central yellow Sun face with tilak and mustache", "concentric hatching line rings (Kachni)", "radiating red triangular sun rays", "outer double-line rim"],
        drawing_guidance=[
            "Draw a central circle for the yellow Sun face with expressive eyes, tilak, and mustache.",
            "Construct double-line concentric rings filled with fine parallel hatching lines.",
            "Surround the medallion with radiating red triangular rays and border trim."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Mithila Madhubani art tradition of Bihar",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="madhubani-sacred-03",
        art_form_id="madhubani",
        category_id="madhubani-sacred",
        title="Mithila Tree of Life & Sacred Birds Mural",
        art_form="Madhubani",
        difficulty="challenging",
        short_description="Draw an authentic Madhubani Tree of Life mural featuring a branching brown trunk, green leaves, red lotus blossoms, and three yellow/blue birds perching among the branches.",
        reference_image_path="/art/madhubani/sacred/example-03.png",
        visible_elements=["central branching Tree of Life trunk", "three perching yellow and blue songbirds", "red 5-petal lotus blossoms and green leaves", "red geometric border frame"],
        drawing_guidance=[
            "Draw a curving brown tree trunk branching out across your paper frame.",
            "Draw three stylized perching birds on main branches.",
            "Add dense green leaves, red lotus blossoms, and enclose in a double-line red geometric border."
        ],
        allowed_next_actions=["repeat", "finish"],
        source_attribution="Mithila Madhubani art tradition of Bihar",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    # --- GOND EXERCISES: Gond Bird Motifs & Pattern Textures ---
    Exercise(
        exercise_id="gond-pattern-01",
        art_form_id="gond",
        category_id="gond-patterns",
        title="Gond Sun Disc & Four Tribal Birds",
        art_form="Gond Art",
        difficulty="beginner",
        short_description="Draw a colorful Gond composition featuring a central orange sun disc surrounded by four vibrant tribal birds and leaf sprigs filled with fine dot and dash hatching.",
        reference_image_path="/art/gond/patterns/example-01.png",
        visible_elements=["central orange sun disc", "four vibrant tribal birds (blue, red, orange, pink)", "surrounding green leaf sprigs", "signature Gond vertical dash and dot line fills"],
        drawing_guidance=[
            "Draw a bold central orange sun disc at the top.",
            "Construct four stylized bird contours perching together below the sun.",
            "Fill bird bodies with Gond signature vertical dashes, dots, and leaf sprigs."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Gond indigenous tribal art of Madhya Pradesh",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="gond-pattern-02",
        art_form_id="gond",
        category_id="gond-patterns",
        title="Gond Twin Songbirds under Mahua Tree",
        art_form="Gond Art",
        difficulty="beginner",
        short_description="Draw a pair of blue and red Gond songbirds perching beneath a striped Mahua tree branch filled with yellow buds and scalloped wing textures.",
        reference_image_path="/art/gond/patterns/example-02.png",
        visible_elements=["twin songbirds (blue and red)", "striped Mahua tree branch with yellow buds", "neck dash lines and scalloped wing scale fills"],
        drawing_guidance=[
            "Draw the curving striped trunk and branches of a Mahua tree with yellow bud tips.",
            "Construct two stylized songbirds facing each other at the base of the trunk.",
            "Fill bird necks with fine vertical dash lines and wings with yellow/red scalloped scale curves."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Gond indigenous tribal art of Madhya Pradesh",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="gond-pattern-03",
        art_form_id="gond",
        category_id="gond-patterns",
        title="Gond Arch-Crested Royal Peacock on Leafy Branch",
        art_form="Gond Art",
        difficulty="beginner",
        short_description="Draw a majestic Gond royal peacock featuring a blue body, an arching yellow crest plume with leaf tendrils, perching on a green-leafed branch.",
        reference_image_path="/art/gond/patterns/example-03.png",
        visible_elements=["blue royal peacock profile", "arching yellow crest plume with leaf tendrils", "fine parallel line hatching", "perching green-leafed brown branch"],
        drawing_guidance=[
            "Draw a perching green-leafed branch and the curved body contour of a peacock.",
            "Construct an arching yellow crest plume sweeping overhead with circular leaf tendrils.",
            "Fill the peacock body with fine blue wave textures and yellow stripe accents."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Gond indigenous tribal art of Madhya Pradesh",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="gond-fauna-01",
        art_form_id="gond",
        category_id="gond-fauna",
        title="Gond Antler-Tree Sacred Forest Stag",
        art_form="Gond Art",
        difficulty="intermediate",
        short_description="Draw an authentic Gond blue and purple forest stag whose antlers transform into a sprawling Tree of Life canopy filled with green leaves and songbirds.",
        reference_image_path="/art/gond/fauna/example-01.png",
        visible_elements=["blue and purple stag body contour", "sprawling antler-tree canopy with green leaves", "perching songbirds in antlers and on back", "small turtle companion below"],
        drawing_guidance=[
            "Draw the curved neck and body of the blue/purple stag.",
            "Construct branching tree antlers spreading upward into a dense leafy canopy.",
            "Fill the body with fine wave textures and add perching birds and a small turtle below."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Gond indigenous tribal art of Madhya Pradesh",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="gond-fauna-02",
        art_form_id="gond",
        category_id="gond-fauna",
        title="Gond Arching Feather Plume Peacock",
        art_form="Gond Art",
        difficulty="intermediate",
        short_description="Draw a royal blue Gond peacock featuring striped tail branches crowned with green/orange oval feather eye-spots and fine hatching lines.",
        reference_image_path="/art/gond/fauna/example-02.png",
        visible_elements=["royal blue peacock contour", "striped tail branches with green and orange eye-spots", "fine neck hatching lines", "green wing with parallel vein fills"],
        drawing_guidance=[
            "Draw the royal blue head and neck profile of the peacock.",
            "Construct arching striped tail branches crowned with green and orange oval eye-spots.",
            "Fill the body and wings with signature Gond fine hatching lines."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Gond indigenous tribal art of Madhya Pradesh",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="gond-fauna-03",
        art_form_id="gond",
        category_id="gond-fauna",
        title="Gond Trio of Swimming Aquatic Fish",
        art_form="Gond Art",
        difficulty="intermediate",
        short_description="Draw three curvilinear Gond fish (orange, blue, grey) swimming through tall green aquatic reed grasses, filled with dot matrices and scale patterns.",
        reference_image_path="/art/gond/fauna/example-03.png",
        visible_elements=["trio of curvilinear fish (orange, blue, grey)", "tall green aquatic reed grasses", "signature Gond dot matrix fills", "scalloped scale patterns"],
        drawing_guidance=[
            "Draw three curving fish body outlines swimming upward and downward.",
            "Fill the background with tall green aquatic reed grass blades.",
            "Pattern the fish bodies with Gond dot matrices, scalloped scale arcs, and grey tail fins."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Gond indigenous tribal art of Madhya Pradesh",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="gond-tree-01",
        art_form_id="gond",
        category_id="gond-tree-of-life",
        title="Gond Intertwined Tree of Life Mural",
        art_form="Gond Art",
        difficulty="challenging",
        short_description="Draw an authentic Gond Tree of Life featuring intertwined brown and green trunks with dense clusters of red and green teardrop-shaped leaves.",
        reference_image_path="/art/gond/tree/example-01.png",
        visible_elements=["intertwined brown and green tree trunks", "clusters of red teardrop-shaped leaves", "clusters of green teardrop-shaped leaves", "fine trunk bark line textures"],
        drawing_guidance=[
            "Draw two winding, intertwined tree trunks curving across the canvas.",
            "Construct branching limb clusters filled with green and red teardrop leaves.",
            "Pattern the trunks with fine parallel bark lines and leaf textures."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Gond indigenous tribal art of Madhya Pradesh",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="gond-tree-02",
        art_form_id="gond",
        category_id="gond-tree-of-life",
        title="Gond Mother Bird & Golden Mahua Canopy",
        art_form="Gond Art",
        difficulty="challenging",
        short_description="Draw a Gond mother bird feeding her chick beneath a dense arching golden Mahua berry tree canopy enclosed in a orange saw-tooth border frame.",
        reference_image_path="/art/gond/tree/example-02.png",
        visible_elements=["mother bird and nestling chick", "dense golden Mahua berry tree canopy", "orange saw-tooth geometric border", "dot matrix body fills"],
        drawing_guidance=[
            "Enclose your canvas in an orange saw-tooth triangular border frame.",
            "Draw the mother bird feeding her chick at the center of the tree trunk.",
            "Surround the birds with a dense arching canopy of golden Mahua berries and fine dot textures."
        ],
        allowed_next_actions=["repeat", "next_example", "change_category", "finish"],
        source_attribution="Gond indigenous tribal art of Madhya Pradesh",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
    Exercise(
        exercise_id="gond-tree-03",
        art_form_id="gond",
        category_id="gond-tree-of-life",
        title="Gond Vibrant Songbird in Blooming Floral Vine",
        art_form="Gond Art",
        difficulty="challenging",
        short_description="Draw a vibrant Gond songbird with a yellow head and red striped tail perching among blooming pink and orange flowers on a leafy vine.",
        reference_image_path="/art/gond/tree/example-03.png",
        visible_elements=["yellow-headed songbird with red striped tail", "blooming pink and orange 6-petal flowers", "climbing vine branch with green leaves", "blue wing with white dot pattern"],
        drawing_guidance=[
            "Draw climbing vine stems with blooming pink and orange flowers.",
            "Construct a perching songbird with a yellow head, blue wing, and long red striped tail.",
            "Fill flowers and wings with fine dot patterns and leaf line veins."
        ],
        allowed_next_actions=["repeat", "finish"],
        source_attribution="Gond indigenous tribal art of Madhya Pradesh",
        review_status="reviewed",
        estimated_minutes=5,
        active=True,
    ),
]


from app.services.firestore_service import FirestoreService


class ArtService:
    @staticmethod
    def _ensure_seeded():
        FirestoreService.seed_catalog_if_empty(ART_FORMS_SEED, CATEGORIES_SEED, EXERCISES_SEED)

    @staticmethod
    def get_active_art_forms() -> List[ArtForm]:
        """Return all active art forms sorted by display order."""
        ArtService._ensure_seeded()
        art_forms = FirestoreService.get_art_forms()
        if art_forms:
            return art_forms
        return sorted(
            [af for af in ART_FORMS_SEED if af.active],
            key=lambda x: x.display_order,
        )

    @staticmethod
    def get_art_form_by_id(art_form_id: str) -> Optional[ArtForm]:
        """Find an art form by ID if active."""
        ArtService._ensure_seeded()
        ex_seed = next((af for af in ART_FORMS_SEED if af.art_form_id == art_form_id and af.active), None)
        if ex_seed:
            return ex_seed
        art_form = FirestoreService.get_art_form(art_form_id)
        if art_form and art_form.active:
            return art_form
        return None

    @staticmethod
    def get_category_by_id(category_id: str) -> Optional[Category]:
        """Find a category by ID if active."""
        ArtService._ensure_seeded()
        cat_seed = next((c for c in CATEGORIES_SEED if c.category_id == category_id and c.active), None)
        if cat_seed:
            return cat_seed
        cat = FirestoreService.get_category(category_id)
        if cat and cat.active:
            return cat
        return None

    @staticmethod
    def get_categories_by_art_form(art_form_id: str) -> Optional[List[Category]]:
        """Return active categories for a given art form ID, or None if art form is invalid."""
        art_form = ArtService.get_art_form_by_id(art_form_id)
        if not art_form:
            return None
        cats = [c for c in CATEGORIES_SEED if c.art_form_id == art_form_id and c.active]
        if cats:
            return sorted(cats, key=lambda x: x.display_order)
        cats_fs = FirestoreService.get_categories_by_art_form(art_form_id)
        if cats_fs:
            return cats_fs
        return None

    @staticmethod
    def get_exercises_by_category(category_id: str) -> Optional[List[Exercise]]:
        """Return active exercises for a given category ID, or None if category is invalid."""
        category = ArtService.get_category_by_id(category_id)
        if not category:
            return None
        exs = [ex for ex in EXERCISES_SEED if ex.category_id == category_id and ex.active]
        if exs:
            return exs
        exs_fs = FirestoreService.get_exercises_by_category(category_id)
        if exs_fs:
            return exs_fs
        return None

    @staticmethod
    def get_exercise_by_id(exercise_id: str) -> Optional[Exercise]:
        """Find an exercise by ID if active."""
        ArtService._ensure_seeded()
        ex_seed = next((ex for ex in EXERCISES_SEED if ex.exercise_id == exercise_id and ex.active), None)
        if ex_seed:
            return ex_seed
        ex = FirestoreService.get_exercise(exercise_id)
        if ex and ex.active:
            return ex
        return None

    @staticmethod
    def get_all_exercises() -> List[Exercise]:
        """Return all active exercises."""
        ArtService._ensure_seeded()
        return [ex for ex in EXERCISES_SEED if ex.active]
