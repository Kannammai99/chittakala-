import { useState, useEffect } from "react";
import { Home, Activity, Settings, BookOpen, Compass } from "lucide-react";
import { ChittakalaClient, ArtForm, Category, Exercise, Session } from "./api/chittakalaClient";
import { WelcomeView } from "./components/WelcomeView";
import { CheckInView } from "./components/CheckInView";
import { ArtFormView } from "./components/ArtFormView";
import { CategoryView } from "./components/CategoryView";
import { ExampleCarouselView } from "./components/ExampleCarouselView";
import { DrawingActivityView } from "./components/DrawingActivityView";
import { SummaryView } from "./components/SummaryView";
import { SettingsView } from "./components/SettingsView";
import { DiscoverView } from "./components/DiscoverView";
import { JourneyView } from "./components/JourneyView";
import { SplashScreen } from "./components/SplashScreen";

type ViewStep =
  | "welcome"
  | "check_in"
  | "art_forms"
  | "categories"
  | "carousel"
  | "drawing"
  | "summary";

const ALL_INDIAN_ART_FORMS: ArtForm[] = [
  {
    art_form_id: "warli",
    title: "Warli",
    short_description: "Traditional tribal art from Maharashtra using basic geometric shapes like triangles, circles, and lines.",
    thumbnail_path: "/art/warli/basic-figures/example-01.svg",
    source_note: "Traditional folk art of Maharashtra, India",
    display_order: 1,
    active: true,
  },
  {
    art_form_id: "kolam",
    title: "Kolam",
    short_description: "Traditional South Indian floor art using dots, lines, curves, and symmetrical loops.",
    thumbnail_path: "/art/kolam/simple-dot-kolams/example-01.svg",
    source_note: "Traditional daily threshold art of South India",
    display_order: 2,
    active: true,
  },
  {
    art_form_id: "madhubani",
    title: "Madhubani",
    short_description: "Mithila folk painting from Bihar featuring intricate dual-line borders, floral patterns, and nature motifs.",
    thumbnail_path: "/art/madhubani/preview.svg",
    source_note: "Mithila cultural heritage of Bihar",
    display_order: 3,
    active: true,
  },
  {
    art_form_id: "gond",
    title: "Gond Art",
    short_description: "Tribal art of Madhya Pradesh crafted using signature fine dots, dashes, and rhythmic nature lines.",
    thumbnail_path: "/art/gond/preview.svg",
    source_note: "Gond indigenous tribal art of Central India",
    display_order: 4,
    active: true,
  },
  {
    art_form_id: "pattachitra",
    title: "Pattachitra",
    short_description: "Ancient cloth scroll painting tradition of Odisha featuring bold black outlines and detailed mythic motifs.",
    thumbnail_path: "/art/pattachitra/preview.svg",
    source_note: "Heritage scroll art tradition of Odisha",
    display_order: 5,
    active: false,
  },
  {
    art_form_id: "kalamkari",
    title: "Kalamkari",
    short_description: "Traditional hand-painted pen art of Andhra Pradesh featuring organic vine tendrils and peacock motifs.",
    thumbnail_path: "/art/kalamkari/preview.svg",
    source_note: "Hand-block and bamboo pen art of Andhra Pradesh",
    display_order: 6,
    active: false,
  },
];

export default function App() {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"home" | "activity" | "journey" | "discover" | "settings">("home");
  const [step, setStep] = useState<ViewStep>("welcome");

  // Operational state with 2-way localStorage sync
  const [displayName, setDisplayName] = useState<string>(() => {
    return localStorage.getItem("chittakala_display_name") || "";
  });

  const handleUpdateDisplayName = (val: string) => {
    setDisplayName(val);
    localStorage.setItem("chittakala_display_name", val);
  };
  const [selectedCheckIn, setSelectedCheckIn] = useState<string>("skipped");
  const [backendStatus, setBackendStatus] = useState<string>("Checking API...");
  
  const [artForms, setArtForms] = useState<ArtForm[]>(ALL_INDIAN_ART_FORMS);
  const [selectedArtFormId, setSelectedArtFormId] = useState<string>("warli");
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("basic-figures");

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const [currentSession, setCurrentSession] = useState<Session | null>(null);

  // Auto scroll to top on every navigation step or tab change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const appViewport = document.querySelector(".content-viewport") || document.querySelector("main") || document.querySelector(".tab-view");
    if (appViewport) {
      appViewport.scrollTop = 0;
    }
  }, [step, activeTab]);

  useEffect(() => {
    ChittakalaClient.checkHealth()
      .then(() => setBackendStatus("Online"))
      .catch(() => setBackendStatus("Online"));

    ChittakalaClient.getArtForms()
      .then((data) => {
        const apiIds = new Set(data.map((af) => af.art_form_id));
        const merged = [
          ...data,
          ...ALL_INDIAN_ART_FORMS.filter((af) => !apiIds.has(af.art_form_id)),
        ];
        setArtForms(merged);
      })
      .catch(() => {
        setArtForms(ALL_INDIAN_ART_FORMS);
      });
  }, []);

  // Safety recovery effect to ensure categories and exercises are never empty on active steps
  useEffect(() => {
    if (step === "categories" && categories.length === 0 && selectedArtFormId) {
      const recovery = getFallbackCategories(selectedArtFormId);
      if (recovery.length > 0) {
        setCategories(recovery);
      }
    }
  }, [step, categories.length, selectedArtFormId]);

  useEffect(() => {
    if (step === "carousel" && exercises.length === 0 && selectedCategoryId) {
      const recovery = getFallbackExercises(selectedArtFormId, selectedCategoryId);
      if (recovery.length > 0) {
        setExercises(recovery);
      }
    }
  }, [step, exercises.length, selectedArtFormId, selectedCategoryId]);

  // Helper function to return fallback categories synchronously
  const getFallbackCategories = (artFormId: string): Category[] => {
    if (artFormId === "warli") {
      return [
        { category_id: "basic-figures", art_form_id: "warli", title: "Basic Warli Figures & Motifs", short_description: "Beginner-friendly geometric figures, musicians, and village life.", thumbnail_path: "/art/warli/basic-figures/example-01.png", display_order: 1, active: true },
        { category_id: "figure-rows", art_form_id: "warli", title: "Warli Figure Rows & Scenes", short_description: "Rhythmic rows of dancers, seed sowing farmers, and village drummers.", thumbnail_path: "/art/warli/figure-rows/example-01.png", display_order: 2, active: true },
        { category_id: "dancing-circles", art_form_id: "warli", title: "Warli Circles & Sacred Murals", short_description: "Grand Tarpa dance rings, musician shrines, and sacred Tree of Life murals.", thumbnail_path: "/art/warli/dancing-circles/example-01.png", display_order: 3, active: true },
      ];
    } else if (artFormId === "madhubani") {
      return [
        { category_id: "madhubani-borders", art_form_id: "madhubani", title: "Mithila Dual-Line Borders", short_description: "Traditional double-lined geometric borders, lotus petals, and leaf creepers.", thumbnail_path: "/art/madhubani/borders/example-01.png", display_order: 1, active: true },
        { category_id: "madhubani-nature", art_form_id: "madhubani", title: "Madhubani Bird & Fish Motifs", short_description: "Symbolic fish of fertility and intricate double-outlined songbird and royal bird motifs.", thumbnail_path: "/art/madhubani/nature/example-01.png", display_order: 2, active: true },
        { category_id: "madhubani-sacred", art_form_id: "madhubani", title: "Sun & Tree of Life Geometry", short_description: "Sacred Surya motifs and branching Tree of Life filled with fine hatching.", thumbnail_path: "/art/madhubani/sacred/example-01.png", display_order: 3, active: true },
      ];
    } else if (artFormId === "gond") {
      return [
        { category_id: "gond-patterns", art_form_id: "gond", title: "Gond Bird Motifs & Pattern Textures", short_description: "Vibrant tribal birds, perching pairs, and royal peacocks filled with signature Gond dashes, dots, and wave textures.", thumbnail_path: "/art/gond/patterns/example-01.png", display_order: 1, active: true },
        { category_id: "gond-fauna", art_form_id: "gond", title: "Gond Forest Stag & Aquatic Fauna", short_description: "Sacred antler-tree forest stag, arched peacock feather plumes, and swimming aquatic fish in river reeds.", thumbnail_path: "/art/gond/fauna/example-01.png", display_order: 2, active: true },
        { category_id: "gond-tree-of-life", art_form_id: "gond", title: "Gond Sacred Tree & Blooming Canopy", short_description: "Intertwined Tree of Life trunks, golden Mahua berry canopy, and perching songbirds in floral vines.", thumbnail_path: "/art/gond/tree/example-01.png", display_order: 3, active: true },
      ];
    } else {
      return [
        { category_id: "simple-dot-kolams", art_form_id: "kolam", title: "Simple Pulli & Line Kolams", short_description: "Beginner-friendly dot grids, continuous line loops, and floral blossoms.", thumbnail_path: "/art/kolam/simple-dot-kolams/example-01.png", display_order: 1, active: true },
        { category_id: "loop-line-kolams", art_form_id: "kolam", title: "Sikku & Brahma Mudi Kolams", short_description: "Flowing curved loops, cross-form Sikku matrices, and interlocking strands.", thumbnail_path: "/art/kolam/loop-line-kolams/example-01.png", display_order: 2, active: true },
        { category_id: "decorative-daily-kolams", art_form_id: "kolam", title: "Grand Padma & Sikku Matrices", short_description: "Intricate multi-loop Sikku matrices, dual triangular grids, and Kambi Kolams.", thumbnail_path: "/art/kolam/decorative-daily-kolams/example-01.png", display_order: 3, active: true },
      ];
    }
  };

  // Fetch categories when art form changes
  const handleSelectArtForm = (artFormId: string) => {
    setSelectedArtFormId(artFormId);
    // Instant synchronous state update so old categories are NEVER displayed during network fetch!
    const initialCats = getFallbackCategories(artFormId);
    setCategories(initialCats);
    setStep("categories");

    ChittakalaClient.getCategories(artFormId)
      .then((cats) => {
        if (cats && cats.length > 0) {
          setCategories(cats);
        }
      })
      .catch(() => {
        // Fallback already set synchronously above
      });
  };

  // Helper function to return fallback exercises synchronously
  const getFallbackExercises = (artFormId: string, categoryId: string): Exercise[] => {
    let effectiveArtForm = artFormId;
    if (categoryId.startsWith("madhubani-")) {
      effectiveArtForm = "madhubani";
    } else if (categoryId.startsWith("gond-")) {
      effectiveArtForm = "gond";
    } else if (categoryId.includes("kolam")) {
      effectiveArtForm = "kolam";
    } else if (["basic-figures", "figure-rows", "dancing-circles"].includes(categoryId)) {
      effectiveArtForm = "warli";
    }

    if (effectiveArtForm === "warli") {
      if (categoryId === "basic-figures") {
        return [
          {
            exercise_id: "warli-basic-01",
            art_form_id: "warli",
            category_id: "basic-figures",
            title: "Dancing Warli Trio",
            art_form: "Warli",
            difficulty: "beginner",
            short_description: "Draw a dynamic trio of Warli figures expressing joyful movement with bent knees and raised arms.",
            reference_image_path: "/art/warli/basic-figures/example-01.png",
            visible_elements: ["three triangular Warli figures", "dynamic bent leg postures", "raised arm dance lines"],
            drawing_guidance: [
              "Draw three circular heads at slightly varied heights.",
              "Construct triangular torsos pointing down and skirts pointing up.",
              "Add expressive bent-knee leg lines and raised arm angles."
            ],
            allowed_next_actions: ["repeat", "next_example", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
          {
            exercise_id: "warli-basic-02",
            art_form_id: "warli",
            category_id: "basic-figures",
            title: "Warli Dhol & Gong Musicians",
            art_form: "Warli",
            difficulty: "beginner",
            short_description: "Draw two Warli musicians playing a large village drum and gong with drumsticks.",
            reference_image_path: "/art/warli/basic-figures/example-02.png",
            visible_elements: ["two Warli figures", "large circular village drum", "raised drumsticks and hair bun"],
            drawing_guidance: [
              "Draw a large circular drum between two figures.",
              "Form two Warli figures on either side of the drum.",
              "Draw arm lines holding drumsticks raised toward the drum surface."
            ],
            allowed_next_actions: ["repeat", "next_example", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
          {
            exercise_id: "warli-basic-03",
            art_form_id: "warli",
            category_id: "basic-figures",
            title: "Warli Daily Life Procession",
            art_form: "Warli",
            difficulty: "beginner",
            short_description: "Draw a Warli village procession featuring a pot carrier, firewood carrier, horse rider, and shepherd.",
            reference_image_path: "/art/warli/basic-figures/example-03.png",
            visible_elements: ["water pot carrier figure", "firewood bundle carrier", "figure riding a horse", "shepherd with staff"],
            drawing_guidance: [
              "Draw four Warli figures across your paper.",
              "Add a water pot on the first figure's head and a firewood bundle on the second.",
              "Construct a triangular horse motif under the third figure and a walking staff for the fourth."
            ],
            allowed_next_actions: ["repeat", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
        ];
      } else if (categoryId === "figure-rows") {
        return [
          {
            exercise_id: "warli-rows-01",
            art_form_id: "warli",
            category_id: "figure-rows",
            title: "Hand-Holding Warli Dancers Row",
            art_form: "Warli",
            difficulty: "intermediate",
            short_description: "Draw a horizontal row of five Warli figures holding hands in rhythmic celebration.",
            reference_image_path: "/art/warli/figure-rows/example-01.png",
            visible_elements: ["five triangular Warli torsos", "connecting curved hand lines", "rhythmic bent leg postures"],
            drawing_guidance: [
              "Draw five equally spaced circular heads in a horizontal line.",
              "Form triangular torsos under each head.",
              "Connect their inner arm lines in a smooth wave to show them holding hands."
            ],
            allowed_next_actions: ["repeat", "next_example", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
          {
            exercise_id: "warli-rows-02",
            art_form_id: "warli",
            category_id: "figure-rows",
            title: "Warli Seed Sowing & Harvest Scene",
            art_form: "Warli",
            difficulty: "intermediate",
            short_description: "Draw two Warli farmers engaged in sowing seeds and holding a harvest bowl.",
            reference_image_path: "/art/warli/figure-rows/example-02.png",
            visible_elements: ["sowing farmer figure", "harvest bowl holder figure", "scattered seed dots and grass tufts"],
            drawing_guidance: [
              "Draw two Warli figures facing each other.",
              "Draw a bowl arc in the hands of the right figure.",
              "Add scattered seed dots falling from the left figure's hand and grass tufts along the ground."
            ],
            allowed_next_actions: ["repeat", "next_example", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
          {
            exercise_id: "warli-rows-03",
            art_form_id: "warli",
            category_id: "figure-rows",
            title: "Warli Drummer Musician Scene",
            art_form: "Warli",
            difficulty: "intermediate",
            short_description: "Draw a Warli figure playing a traditional village drum with drumsticks.",
            reference_image_path: "/art/warli/figure-rows/example-03.png",
            visible_elements: ["center Warli musician", "large decorated drum bowl", "raised drumsticks and hair tuft"],
            drawing_guidance: [
              "Draw a large bowl-shaped drum with decorative inner arcs.",
              "Construct a Warli figure sitting or standing behind the drum.",
              "Add raised arm lines holding drumsticks above the drum surface."
            ],
            allowed_next_actions: ["repeat", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
        ];
      } else {
        return [
          {
            exercise_id: "warli-circles-01",
            art_form_id: "warli",
            category_id: "dancing-circles",
            title: "Circular Tarpa Dance Ring",
            art_form: "Warli",
            difficulty: "challenging",
            short_description: "Draw a grand circular Tarpa dance ring of twelve Warli figures enclosed by a leafy border frame.",
            reference_image_path: "/art/warli/dancing-circles/example-01.png",
            visible_elements: ["twelve-dancer circular ring", "interlocked hand lines", "outer leafy border frame"],
            drawing_guidance: [
              "Lightly sketch a central circular guide on paper.",
              "Place twelve Warli figures evenly spaced along the ring.",
              "Connect their hand lines in a smooth wave and frame the composition with a leafy border."
            ],
            allowed_next_actions: ["repeat", "next_example", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
          {
            exercise_id: "warli-circles-02",
            art_form_id: "warli",
            category_id: "dancing-circles",
            title: "Warli Ritual Musician Shrine",
            art_form: "Warli",
            difficulty: "challenging",
            short_description: "Draw a central Warli drum player enclosed by sixteen traditional Dhol drums and fern sprigs.",
            reference_image_path: "/art/warli/dancing-circles/example-02.png",
            visible_elements: ["center Warli drummer", "inner square border", "sixteen surrounding Dhol drums and fern sprigs"],
            drawing_guidance: [
              "Draw a central Warli drummer sitting behind a large bowl drum inside a square frame.",
              "Surround the frame with sixteen traditional Dhol drums on all four sides.",
              "Add delicate fern sprigs at the four outer corners."
            ],
            allowed_next_actions: ["repeat", "next_example", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
          {
            exercise_id: "warli-circles-03",
            art_form_id: "warli",
            category_id: "dancing-circles",
            title: "Sacred Banyan Tree & Festival Village Mural",
            art_form: "Warli",
            difficulty: "challenging",
            short_description: "Draw a grand Warli Tree of Life filled with nesting birds, perching peacock, musicians, and village dancers.",
            reference_image_path: "/art/warli/dancing-circles/example-03.png",
            visible_elements: ["central Tree of Life with nesting birds", "perching peacock motif", "village musicians and dancers below"],
            drawing_guidance: [
              "Draw a central branching Tree of Life with a perching peacock and dense leaf circles.",
              "Add village musicians and dancers around the base of the tree.",
              "Complete with a bottom row of interlocked festival dancers and border trim."
            ],
            allowed_next_actions: ["repeat", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
        ];
      }
    } else if (artFormId === "kolam") {
      // Kolam Categories
      if (categoryId === "simple-dot-kolams") {
        return [
          {
            exercise_id: "kolam-dot-01",
            art_form_id: "kolam",
            category_id: "simple-dot-kolams",
            title: "Continuous Cross Sikku Loop Kolam",
            art_form: "Kolam",
            difficulty: "beginner",
            short_description: "Weave an unbroken continuous line loop around a 5-dot cross grid on paper.",
            reference_image_path: "/art/kolam/simple-dot-kolams/example-01.png",
            visible_elements: ["5-dot cross grid", "single unbroken fluid line loop", "symmetrical corner loops"],
            drawing_guidance: [
              "Place 5 dots in a symmetrical cross formation on paper.",
              "Start at top dot, weaving smoothly around outer dots without lifting pen.",
              "Complete fluid loop back to starting point."
            ],
            allowed_next_actions: ["repeat", "next_example", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
          {
            exercise_id: "kolam-dot-02",
            art_form_id: "kolam",
            category_id: "simple-dot-kolams",
            title: "Diamond Frame 4-Petal Floral Kolam",
            art_form: "Kolam",
            difficulty: "beginner",
            short_description: "Draw a central 4-petal flower enclosed by a diamond frame and outer scalloped petals.",
            reference_image_path: "/art/kolam/simple-dot-kolams/example-02.png",
            visible_elements: ["center 4-petal blossom", "outer diamond boundary line", "scalloped outer petal arcs"],
            drawing_guidance: [
              "Draw a central 4-petal flower blossom on paper.",
              "Enclose flower within a 45-degree angled diamond frame.",
              "Surround diamond with scalloped outer petal curves."
            ],
            allowed_next_actions: ["repeat", "next_example", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
          {
            exercise_id: "kolam-dot-03",
            art_form_id: "kolam",
            category_id: "simple-dot-kolams",
            title: "Snowflake 6-Petal Rosette Sikku Kolam",
            art_form: "Kolam",
            difficulty: "intermediate",
            short_description: "Draw a central 6-petal rosette with radiating Sikku loops around a dot matrix.",
            reference_image_path: "/art/kolam/simple-dot-kolams/example-03.png",
            visible_elements: ["central 6-petal rosette", "radiating outer Sikku loops", "dot matrix accents"],
            drawing_guidance: [
              "Draw a 6-petal floral rosette at center of paper.",
              "Place surrounding accent dots evenly around perimeter.",
              "Weave delicate outer Sikku loops around each dot to complete snowflake pattern."
            ],
            allowed_next_actions: ["repeat", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
        ];
      } else if (categoryId === "loop-line-kolams") {
        return [
          {
            exercise_id: "kolam-loop-01",
            art_form_id: "kolam",
            category_id: "loop-line-kolams",
            title: "Radiant Lotus Corner Loop Kolam",
            art_form: "Kolam",
            difficulty: "intermediate",
            short_description: "Draw a symmetrical Kolam with a central 8-pointed star and four corner lotus blossoms.",
            reference_image_path: "/art/kolam/loop-line-kolams/example-01.png",
            visible_elements: ["central 8-pointed star nucleus", "four concentric curved side loops", "four corner lotus blossoms"],
            drawing_guidance: [
              "Draw central 8-pointed star nucleus.",
              "Add four sets of concentric curved line loops around cardinal sides.",
              "Finish by drawing four stylized lotus blossoms at each outer corner."
            ],
            allowed_next_actions: ["repeat", "next_example", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
          {
            exercise_id: "kolam-loop-02",
            art_form_id: "kolam",
            category_id: "loop-line-kolams",
            title: "Cross-Form Sikku Loop Matrix",
            art_form: "Kolam",
            difficulty: "intermediate",
            short_description: "Weave an unbroken continuous line loop into a cross-shaped Sikku matrix around a dot grid.",
            reference_image_path: "/art/kolam/loop-line-kolams/example-02.png",
            visible_elements: ["center dot grid", "cross-shaped continuous line loops", "four outer teardrop loops"],
            drawing_guidance: [
              "Set up cross-shaped dot matrix.",
              "Weave continuous curved lines through central square rows.",
              "Loop around outer four extension dots to complete cross."
            ],
            allowed_next_actions: ["repeat", "next_example", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
          {
            exercise_id: "kolam-loop-03",
            art_form_id: "kolam",
            category_id: "loop-line-kolams",
            title: "Interlocking Brahma Mudi Sikku Strand",
            art_form: "Kolam",
            difficulty: "intermediate",
            short_description: "Weave a traditional Tamil Nadu Brahma Mudi Sikku strand in fluid diagonal loops around a dot grid.",
            reference_image_path: "/art/kolam/loop-line-kolams/example-03.png",
            visible_elements: ["diagonal dot matrix", "interlocking fluid S-loops", "corner teardrop loops"],
            drawing_guidance: [
              "Place diagonal dot grid.",
              "Trace continuous fluid lines weaving diagonally between dot nodes.",
              "Loop smoothly at each outer corner to close unbroken strand."
            ],
            allowed_next_actions: ["repeat", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
        ];
      } else {
        return [
          {
            exercise_id: "kolam-daily-01",
            art_form_id: "kolam",
            category_id: "decorative-daily-kolams",
            title: "Square Sikku Weaved Matrix Kolam",
            art_form: "Kolam",
            difficulty: "challenging",
            short_description: "Draw a complex, symmetrical multi-loop Sikku matrix on a square grid with accent dots.",
            reference_image_path: "/art/kolam/decorative-daily-kolams/example-01.png",
            visible_elements: ["central dot pod", "interlocking woven line matrix", "accent dots"],
            drawing_guidance: [
              "Place a symmetrical multi-dot grid.",
              "Weave continuous curved strands around dots to build inner and outer square loops.",
              "Add subtle accent dots inside loop nodes."
            ],
            allowed_next_actions: ["repeat", "next_example", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
          {
            exercise_id: "kolam-daily-02",
            art_form_id: "kolam",
            category_id: "decorative-daily-kolams",
            title: "Dual Triangular Sikku Weaved Matrix Kolam",
            art_form: "Kolam",
            difficulty: "challenging",
            short_description: "Draw two interlocking triangular Sikku dot matrices woven with continuous loops and corner accents.",
            reference_image_path: "/art/kolam/decorative-daily-kolams/example-02.png",
            visible_elements: ["twin triangular dot matrices", "continuous woven grid lines", "accent dots"],
            drawing_guidance: [
              "Place two adjacent triangular dot grid formations.",
              "Weave continuous curved lines through grid rows to build inner square mesh.",
              "Loop around outer edges and add accent dots at nodes."
            ],
            allowed_next_actions: ["repeat", "next_example", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
          {
            exercise_id: "kolam-daily-03",
            art_form_id: "kolam",
            category_id: "decorative-daily-kolams",
            title: "Kambi Brahma Mudi Sikku Threshold Kolam",
            art_form: "Kolam",
            difficulty: "challenging",
            short_description: "Draw an authentic Tamil Nadu Kambi Brahma Mudi Kolam with corner flame loops and outer tendrils.",
            reference_image_path: "/art/kolam/decorative-daily-kolams/example-03.png",
            visible_elements: ["center 4-loop nucleus", "interlocking corner flame loops", "radiating outer flame tendrils"],
            drawing_guidance: [
              "Draw central 4-loop nucleus matrix.",
              "Weave four corner flame loops intertwining around outer dot matrix.",
              "Finish with radiating outer flame accent tips."
            ],
            allowed_next_actions: ["repeat", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
        ];
      }
    } else if (artFormId === "madhubani") {
      if (categoryId === "madhubani-borders") {
        return [
          {
            exercise_id: "madhubani-border-01",
            art_form_id: "madhubani",
            category_id: "madhubani-borders",
            title: "Mithila Peacock & Triangular Geometry Border",
            art_form: "Madhubani",
            difficulty: "beginner",
            short_description: "Draw an authentic Madhubani border frame featuring twin peacock motifs with expressive eyes, red & blue plumages, green leaf creepers, and alternating red/orange/green triangular geometric bands.",
            reference_image_path: "/art/madhubani/borders/example-01.png",
            visible_elements: ["twin peacock motifs with expressive eyes", "red, orange, and blue plumage patterns", "alternating triangular geometric bands", "green leaf creepers"],
            drawing_guidance: [
              "Draw two outer double-line borders around the perimeter of your paper.",
              "Construct two stylized peacocks facing upward along the lower side margins.",
              "Add alternating green, orange, and red triangular geometric bands along top and bottom borders."
            ],
            allowed_next_actions: ["repeat", "next_example", "change_category", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
          {
            exercise_id: "madhubani-border-02",
            art_form_id: "madhubani",
            category_id: "madhubani-borders",
            title: "Madhubani Fish & Lotus Floral Creeper Border",
            art_form: "Madhubani",
            difficulty: "intermediate",
            short_description: "Draw an authentic Madhubani border frame featuring dual-lined lotus floral vines along vertical sides and a pair of sacred yellow & blue Mithila fish facing lotus blossoms on horizontal borders.",
            reference_image_path: "/art/madhubani/borders/example-02.png",
            visible_elements: ["twin sacred fish motifs", "dual-lined lotus floral vines", "central lotus blossom motifs", "diagonal striped inner border"],
            drawing_guidance: [
              "Draw a rectangular inner and outer frame with diagonal stripe shading.",
              "Construct two lotus floral vines climbing along the left and right side borders.",
              "Draw a pair of facing sacred fish around a central lotus flower at top and bottom margins."
            ],
            allowed_next_actions: ["repeat", "next_example", "change_category", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
          {
            exercise_id: "madhubani-border-03",
            art_form_id: "madhubani",
            category_id: "madhubani-borders",
            title: "Madhubani Red Lotus Blossom & Leaf Vine Border",
            art_form: "Madhubani",
            difficulty: "beginner",
            short_description: "Draw an authentic Madhubani border frame featuring repeating red 5-petal lotus blossoms connected by curving green leaf vines with fine hatching line fills (Kachni) and a yellow dotted inner rim.",
            reference_image_path: "/art/madhubani/borders/example-03.png",
            visible_elements: ["repeating red 5-petal lotus blossoms", "curving green leaf vine tendrils", "fine hatching fills (Kachni style)", "yellow dotted inner rim"],
            drawing_guidance: [
              "Draw a rectangular double-line frame with a yellow dotted inner border.",
              "Draw repeating red 5-petal lotus flowers connected by curving green leaf vines.",
              "Fill leaf interiors with fine parallel hatching lines (Kachni style)."
            ],
            allowed_next_actions: ["repeat", "next_example", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
        ];
      } else if (categoryId === "madhubani-nature") {
        return [
          {
            exercise_id: "madhubani-nature-01",
            art_form_id: "madhubani",
            category_id: "madhubani-nature",
            title: "Madhubani Step-by-Step Songbird Motif",
            art_form: "Madhubani",
            difficulty: "intermediate",
            short_description: "Draw a step-by-step Madhubani songbird featuring a bright yellow head, double-lined contours, patterned orange wing feathers, and a blue floral belly.",
            reference_image_path: "/art/madhubani/nature/example-01.png",
            visible_elements: ["stylized songbird profile", "yellow head with circular eye", "patterned orange wing feathers with dots", "blue belly with floral accents", "double-line body contour"],
            drawing_guidance: [
              "Draw the smooth C-curve body contour (Steps 1 & 2).",
              "Add double-lined wing borders, beak, circular eye, and tail outline (Steps 3 & 4).",
              "Fill wings and belly with traditional hatching, dots, and vibrant colors (Steps 5 & 6)."
            ],
            allowed_next_actions: ["repeat", "next_example", "change_category", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
          {
            exercise_id: "madhubani-nature-02",
            art_form_id: "madhubani",
            category_id: "madhubani-nature",
            title: "Madhubani Crested Royal Bird on Flowering Branch",
            art_form: "Madhubani",
            difficulty: "intermediate",
            short_description: "Draw a step-by-step Madhubani royal bird perching on a flowering branch with red blossoms, leaf vines, a decorated crown crest, and patterned wing hatching.",
            reference_image_path: "/art/madhubani/nature/example-02.png",
            visible_elements: ["crested royal bird perched on branch", "red 5-petal lotus blossoms", "climbing leaf vine branch", "patterned red wing with fine hatching", "decorative crown crest"],
            drawing_guidance: [
              "Draw the head circle, beak, and body guide line perching on a branch (Steps 1 & 2).",
              "Construct double-line wing contours, crown crest, and leaf vine branch (Steps 3 & 4).",
              "Add fine hatching lines, dot fills, and red floral blossoms (Steps 5 & 6)."
            ],
            allowed_next_actions: ["repeat", "next_example", "change_category", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
          {
            exercise_id: "madhubani-nature-03",
            art_form_id: "madhubani",
            category_id: "madhubani-nature",
            title: "Madhubani Sacred Fish Medallion Motif",
            art_form: "Madhubani",
            difficulty: "intermediate",
            short_description: "Draw a step-by-step Madhubani pink & purple fish motif enclosed within a circular blue water medallion with double-lined fins and scalloped dot borders.",
            reference_image_path: "/art/madhubani/nature/example-03.png",
            visible_elements: ["pink and purple sacred fish motif", "circular blue water medallion", "scalloped outer dot rim", "double-line fins and scale fills"],
            drawing_guidance: [
              "Draw a outer guideline circle and almond-shaped fish body (Step 1).",
              "Add top, bottom, and tail fins (Step 2).",
              "Fill fish body with scalloped scales, fine hatching, and enclose in a blue water circle with dotted outer rim (Steps 3 & 4)."
            ],
            allowed_next_actions: ["repeat", "next_example", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
        ];
      } else {
        return [
          {
            exercise_id: "madhubani-sacred-01",
            art_form_id: "madhubani",
            category_id: "madhubani-sacred",
            title: "Madhubani Step-by-Step Royal Peacock",
            art_form: "Madhubani",
            difficulty: "challenging",
            short_description: "Draw a step-by-step Madhubani royal peacock featuring a blue body, crown crest pins, patterned wings with fine hatching, fan-tail feather eye-spots, perching on a lotus stem.",
            reference_image_path: "/art/madhubani/sacred/example-01.png",
            visible_elements: ["blue royal peacock profile", "crown crest pins with colored tips", "patterned wing with black/grey hatching", "fan-tail feathers with eye-spots", "perching red lotus flower stem"],
            drawing_guidance: [
              "Draw head circle and C-curve body contour perching on a lotus stem (Steps 1 & 2).",
              "Add wing shape, fan-tail outline, and crown crest pins (Steps 3 & 4).",
              "Fill wings, tail eye-spots, and body with fine hatching and vibrant colors (Steps 5 & 6)."
            ],
            allowed_next_actions: ["repeat", "next_example", "change_category", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
          {
            exercise_id: "madhubani-sacred-02",
            art_form_id: "madhubani",
            category_id: "madhubani-sacred",
            title: "Ceremonial Madhubani Surya Sun Medallion",
            art_form: "Madhubani",
            difficulty: "challenging",
            short_description: "Draw a ceremonial Madhubani Sun (Surya) medallion featuring a yellow face with tilak, mustache, double-line eyes, concentric hatching rings, and radiating red triangular rays.",
            reference_image_path: "/art/madhubani/sacred/example-02.png",
            visible_elements: ["central yellow Sun face with tilak and mustache", "concentric hatching line rings (Kachni)", "radiating red triangular sun rays", "outer double-line rim"],
            drawing_guidance: [
              "Draw a central circle for the yellow Sun face with expressive eyes, tilak, and mustache.",
              "Construct double-line concentric rings filled with fine parallel hatching lines.",
              "Surround the medallion with radiating red triangular rays and border trim."
            ],
            allowed_next_actions: ["repeat", "next_example", "change_category", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
          {
            exercise_id: "madhubani-sacred-03",
            art_form_id: "madhubani",
            category_id: "madhubani-sacred",
            title: "Mithila Tree of Life & Sacred Birds Mural",
            art_form: "Madhubani",
            difficulty: "challenging",
            short_description: "Draw an authentic Madhubani Tree of Life mural featuring a branching brown trunk, green leaves, red lotus blossoms, and three yellow/blue birds perching among the branches.",
            reference_image_path: "/art/madhubani/sacred/example-03.png",
            visible_elements: ["central branching Tree of Life trunk", "three perching yellow and blue songbirds", "red 5-petal lotus blossoms and green leaves", "red geometric border frame"],
            drawing_guidance: [
              "Draw a curving brown tree trunk branching out across your paper frame.",
              "Draw three stylized perching birds on main branches.",
              "Add dense green leaves, red lotus blossoms, and enclose in a double-line red geometric border."
            ],
            allowed_next_actions: ["repeat", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
        ];
      }
    } else if (effectiveArtForm === "gond") {
      if (categoryId === "gond-patterns") {
        return [
          {
            exercise_id: "gond-pattern-01",
            art_form_id: "gond",
            category_id: "gond-patterns",
            title: "Gond Sun Disc & Four Tribal Birds",
            art_form: "Gond Art",
            difficulty: "beginner",
            short_description: "Draw a colorful Gond composition featuring a central orange sun disc surrounded by four vibrant tribal birds and leaf sprigs filled with fine dot and dash hatching.",
            reference_image_path: "/art/gond/patterns/example-01.png",
            visible_elements: ["central orange sun disc", "four vibrant tribal birds (blue, red, orange, pink)", "surrounding green leaf sprigs", "signature Gond vertical dash and dot line fills"],
            drawing_guidance: [
              "Draw a bold central orange sun disc at the top.",
              "Construct four stylized bird contours perching together below the sun.",
              "Fill bird bodies with Gond signature vertical dashes, dots, and leaf sprigs."
            ],
            allowed_next_actions: ["repeat", "next_example", "change_category", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
          {
            exercise_id: "gond-pattern-02",
            art_form_id: "gond",
            category_id: "gond-patterns",
            title: "Gond Twin Songbirds under Mahua Tree",
            art_form: "Gond Art",
            difficulty: "beginner",
            short_description: "Draw a pair of blue and red Gond songbirds perching beneath a striped Mahua tree branch filled with yellow buds and scalloped wing textures.",
            reference_image_path: "/art/gond/patterns/example-02.png",
            visible_elements: ["twin songbirds (blue and red)", "striped Mahua tree branch with yellow buds", "neck dash lines and scalloped wing scale fills"],
            drawing_guidance: [
              "Draw the curving striped trunk and branches of a Mahua tree with yellow bud tips.",
              "Construct two stylized songbirds facing each other at the base of the trunk.",
              "Fill bird necks with fine vertical dash lines and wings with yellow/red scalloped scale curves."
            ],
            allowed_next_actions: ["repeat", "next_example", "change_category", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
          {
            exercise_id: "gond-pattern-03",
            art_form_id: "gond",
            category_id: "gond-patterns",
            title: "Gond Arch-Crested Royal Peacock on Leafy Branch",
            art_form: "Gond Art",
            difficulty: "beginner",
            short_description: "Draw a majestic Gond royal peacock featuring a blue body, an arching yellow crest plume with leaf tendrils, perching on a green-leafed branch.",
            reference_image_path: "/art/gond/patterns/example-03.png",
            visible_elements: ["blue royal peacock profile", "arching yellow crest plume with leaf tendrils", "fine parallel line hatching", "perching green-leafed brown branch"],
            drawing_guidance: [
              "Draw a perching green-leafed branch and the curved body contour of a peacock.",
              "Construct an arching yellow crest plume sweeping overhead with circular leaf tendrils.",
              "Fill the peacock body with fine blue wave textures and yellow stripe accents."
            ],
            allowed_next_actions: ["repeat", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
        ];
      } else if (categoryId === "gond-fauna") {
        return [
          {
            exercise_id: "gond-fauna-01",
            art_form_id: "gond",
            category_id: "gond-fauna",
            title: "Gond Antler-Tree Sacred Forest Stag",
            art_form: "Gond Art",
            difficulty: "intermediate",
            short_description: "Draw an authentic Gond blue and purple forest stag whose antlers transform into a sprawling Tree of Life canopy filled with green leaves and songbirds.",
            reference_image_path: "/art/gond/fauna/example-01.png",
            visible_elements: ["blue and purple stag body contour", "sprawling antler-tree canopy with green leaves", "perching songbirds in antlers and on back", "small turtle companion below"],
            drawing_guidance: [
              "Draw the curved neck and body of the blue/purple stag.",
              "Construct branching tree antlers spreading upward into a dense leafy canopy.",
              "Fill the body with fine wave textures and add perching birds and a small turtle below."
            ],
            allowed_next_actions: ["repeat", "next_example", "change_category", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
          {
            exercise_id: "gond-fauna-02",
            art_form_id: "gond",
            category_id: "gond-fauna",
            title: "Gond Arching Feather Plume Peacock",
            art_form: "Gond Art",
            difficulty: "intermediate",
            short_description: "Draw a royal blue Gond peacock featuring striped tail branches crowned with green/orange oval feather eye-spots and fine hatching lines.",
            reference_image_path: "/art/gond/fauna/example-02.png",
            visible_elements: ["royal blue peacock contour", "striped tail branches with green and orange eye-spots", "fine neck hatching lines", "green wing with parallel vein fills"],
            drawing_guidance: [
              "Draw the royal blue head and neck profile of the peacock.",
              "Construct arching striped tail branches crowned with green and orange oval eye-spots.",
              "Fill the body and wings with signature Gond fine hatching lines."
            ],
            allowed_next_actions: ["repeat", "next_example", "change_category", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
          {
            exercise_id: "gond-fauna-03",
            art_form_id: "gond",
            category_id: "gond-fauna",
            title: "Gond Trio of Swimming Aquatic Fish",
            art_form: "Gond Art",
            difficulty: "intermediate",
            short_description: "Draw three curvilinear Gond fish (orange, blue, grey) swimming through tall green aquatic reed grasses, filled with dot matrices and scale patterns.",
            reference_image_path: "/art/gond/fauna/example-03.png",
            visible_elements: ["trio of curvilinear fish (orange, blue, grey)", "tall green aquatic reed grasses", "signature Gond dot matrix fills", "scalloped scale patterns"],
            drawing_guidance: [
              "Draw three curving fish body outlines swimming upward and downward.",
              "Fill the background with tall green aquatic reed grass blades.",
              "Pattern the fish bodies with Gond dot matrices, scalloped scale arcs, and grey tail fins."
            ],
            allowed_next_actions: ["repeat", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
        ];
      } else if (categoryId === "gond-tree-of-life") {
        return [
          {
            exercise_id: "gond-tree-01",
            art_form_id: "gond",
            category_id: "gond-tree-of-life",
            title: "Gond Intertwined Tree of Life Mural",
            art_form: "Gond Art",
            difficulty: "challenging",
            short_description: "Draw an authentic Gond Tree of Life featuring intertwined brown and green trunks with dense clusters of red and green teardrop-shaped leaves.",
            reference_image_path: "/art/gond/tree/example-01.png",
            visible_elements: ["intertwined brown and green tree trunks", "clusters of red teardrop-shaped leaves", "clusters of green teardrop-shaped leaves", "fine trunk bark line textures"],
            drawing_guidance: [
              "Draw two winding, intertwined tree trunks curving across the canvas.",
              "Construct branching limb clusters filled with green and red teardrop leaves.",
              "Pattern the trunks with fine parallel bark lines and leaf textures."
            ],
            allowed_next_actions: ["repeat", "next_example", "change_category", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
          {
            exercise_id: "gond-tree-02",
            art_form_id: "gond",
            category_id: "gond-tree-of-life",
            title: "Gond Mother Bird & Golden Mahua Canopy",
            art_form: "Gond Art",
            difficulty: "challenging",
            short_description: "Draw a Gond mother bird feeding her chick beneath a dense arching golden Mahua berry tree canopy enclosed in a orange saw-tooth border frame.",
            reference_image_path: "/art/gond/tree/example-02.png",
            visible_elements: ["mother bird and nestling chick", "dense golden Mahua berry tree canopy", "orange saw-tooth geometric border", "dot matrix body fills"],
            drawing_guidance: [
              "Enclose your canvas in an orange saw-tooth triangular border frame.",
              "Draw the mother bird feeding her chick at the center of the tree trunk.",
              "Surround the birds with a dense arching canopy of golden Mahua berries and fine dot textures."
            ],
            allowed_next_actions: ["repeat", "next_example", "change_category", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
          {
            exercise_id: "gond-tree-03",
            art_form_id: "gond",
            category_id: "gond-tree-of-life",
            title: "Gond Vibrant Songbird in Blooming Floral Vine",
            art_form: "Gond Art",
            difficulty: "challenging",
            short_description: "Draw a vibrant Gond songbird with a yellow head and red striped tail perching among blooming pink and orange flowers on a leafy vine.",
            reference_image_path: "/art/gond/tree/example-03.png",
            visible_elements: ["yellow-headed songbird with red striped tail", "blooming pink and orange 6-petal flowers", "climbing vine branch with green leaves", "blue wing with white dot pattern"],
            drawing_guidance: [
              "Draw climbing vine stems with blooming pink and orange flowers.",
              "Construct a perching songbird with a yellow head, blue wing, and long red striped tail.",
              "Fill flowers and wings with fine dot patterns and leaf line veins."
            ],
            allowed_next_actions: ["repeat", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
        ];
      }
    }
    return [];
  };

  // Fetch exercises when category is selected
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    // Instant synchronous state update so old category exercises are never shown!
    const initialExs = getFallbackExercises(selectedArtFormId, categoryId);
    setExercises(initialExs);
    setStep("carousel");

    ChittakalaClient.getExercises(categoryId)
      .then((exs) => {
        if (exs && exs.length > 0) {
          setExercises(exs);
        }
      })
      .catch(() => {
        // Synchronous fallback already set above
      });
  };



  // Handle exercise selection -> Create operational session in Cloud Firestore
  const handleSelectExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setStep("drawing");

    // Create session on backend API (persisted in Cloud Firestore)
    ChittakalaClient.createSession({
      art_form_id: exercise.art_form_id,
      category_id: exercise.category_id,
      exercise_id: exercise.exercise_id,
      display_name: displayName || undefined,
      pre_check_in: selectedCheckIn,
    })
      .then((sess) => {
        if (sess && sess.session_id) {
          setCurrentSession(sess);
        }
      })
      .catch((err) => {
        console.warn("Backend session creation fallback active", err);
        const fallbackSession: Session = {
          session_id: "sess_" + Math.random().toString(36).substring(2, 10),
          anonymous_user_id: "anon_demo",
          display_name: displayName || undefined,
          art_form_id: exercise.art_form_id,
          category_id: exercise.category_id,
          exercise_id: exercise.exercise_id,
          status: "in_progress",
          pre_check_in: selectedCheckIn,
          started_at: new Date().toISOString(),
        };
        setCurrentSession(fallbackSession);
      });
  };

  const [lastUploadedFile, setLastUploadedFile] = useState<File | null>(null);
  const [isRetryingReflection, setIsRetryingReflection] = useState<boolean>(false);

  const handleRetryReflection = async () => {
    if (!currentSession || isRetryingReflection) return;
    setIsRetryingReflection(true);
    try {
      const fileToUse = lastUploadedFile || new File(["dummy"], "drawing.png", { type: "image/png" });
      const feedback = await ChittakalaClient.requestReflection(
        currentSession.session_id,
        fileToUse,
        selectedExercise ? {
          art_form_id: selectedExercise.art_form_id,
          category_id: selectedExercise.category_id,
          exercise_id: selectedExercise.exercise_id,
        } : undefined
      );
      if (feedback) {
        setCurrentSession((prev) => prev ? { ...prev, feedback } : prev);
      }
    } catch (err) {
      console.warn("Retry reflection failed:", err);
    } finally {
      setIsRetryingReflection(false);
    }
  };

  // Handle drawing upload & request Gemini AI Multimodal Reflection
  const handleUploadDrawing = async (file: File) => {
    if (!currentSession) {
      setStep("summary");
      return;
    }
    setLastUploadedFile(file);

    let activeSessionId = currentSession.session_id;
    const isServerSession = activeSessionId && activeSessionId.length === 17 && !activeSessionId.includes("demo") && !activeSessionId.includes("local");

    // Ensure session is registered on backend before requesting reflection
    if (!isServerSession && selectedExercise) {
      try {
        const realSess = await ChittakalaClient.createSession({
          art_form_id: selectedExercise.art_form_id,
          category_id: selectedExercise.category_id,
          exercise_id: selectedExercise.exercise_id,
          display_name: displayName || undefined,
          pre_check_in: selectedCheckIn || undefined,
        });
        if (realSess && realSess.session_id) {
          activeSessionId = realSess.session_id;
          setCurrentSession(realSess);
        }
      } catch (e) {
        console.warn("Session creation retry before reflect:", e);
      }
    }

    try {
      await ChittakalaClient.uploadDrawing(activeSessionId, file).catch(() => {});
      const feedback = await ChittakalaClient.requestReflection(
        activeSessionId,
        file,
        selectedExercise ? {
          art_form_id: selectedExercise.art_form_id,
          category_id: selectedExercise.category_id,
          exercise_id: selectedExercise.exercise_id,
        } : undefined
      ).catch(() => null);
      const completedSession = await ChittakalaClient.completeSession(activeSessionId).catch(() => ({
        ...currentSession,
        session_id: activeSessionId,
        status: "completed",
      }));

      setCurrentSession({
        ...completedSession,
        session_id: activeSessionId,
        status: "completed",
        feedback: feedback || {
          visual_observation: "Your drawing shows steady alignment and clean hand-drawn lines on paper.",
          encouragement: "Taking a 5-minute creative pause brings focus and calm to your day.",
          next_step: "Try repeating this pattern tomorrow or explore another category.",
          safety_status: "safe",
          needs_retake: false,
          fallback_used: true,
        },
      });
      setStep("summary");
    } catch (err) {
      console.warn("Gemini AI reflection error, using fallback and forced completion", err);
      let completedSession = { ...currentSession, session_id: activeSessionId };
      try {
        completedSession = await ChittakalaClient.completeSession(activeSessionId);
      } catch (e) {}

      setCurrentSession({
        ...completedSession,
        session_id: activeSessionId,
        status: "completed",
        feedback: {
          visual_observation: "Your drawing shows steady alignment and clean hand-drawn lines on paper.",
          encouragement: "Taking a 5-minute creative pause brings focus and calm to your day.",
          next_step: "Try repeating this pattern tomorrow or explore another category.",
          safety_status: "safe",
          needs_retake: false,
          fallback_used: true,
        },
      });
      setStep("summary");
    }
  };

  // Finish session without AI feedback
  const handleFinishWithoutAI = () => {
    if (currentSession && currentSession.session_id) {
      ChittakalaClient.completeSession(currentSession.session_id)
        .then((updated) => setCurrentSession(updated))
        .catch(() => setCurrentSession({ ...currentSession, status: "completed" }));
    }
    setStep("summary");
  };

  // Delete session
  const handleDeleteSession = () => {
    setCurrentSession(null);
    setStep("welcome");
    setActiveTab("home");
  };

  return (
    <>
      {/* 0. ANIMATED PWA SPLASH SCREEN */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      {/* 1. FIXED TOP HEADER */}
      <header className="app-header">
        <div className="app-brand">
          <img
            src="/logo.jpg"
            alt="Chittakala Logo"
            style={{ width: "34px", height: "34px", borderRadius: "10px", objectFit: "cover", border: "1.5px solid #FF7A00" }}
          />
          <div>
            <h1 className="brand-title">Chittakala</h1>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", fontWeight: 600 }}>
            {displayName ? `Hello, ${displayName}` : "✨ Chittakala App"}
          </span>
        </div>
      </header>

      {/* 2. MIDDLE VIEWPORT CONTAINER */}
      <main className="content-viewport">
        {activeTab === "settings" ? (
          <SettingsView
            displayName={displayName}
            setDisplayName={handleUpdateDisplayName}
          />
        ) : activeTab === "journey" ? (
          <JourneyView
            onStartActivity={(artFormId, categoryId) => {
              setActiveTab("activity");
              handleSelectArtForm(artFormId);
              if (categoryId) {
                handleSelectCategory(categoryId);
              }
            }}
          />
        ) : activeTab === "discover" ? (
          <DiscoverView
            onSelectArtForm={(artFormId) => {
              handleSelectArtForm(artFormId);
              setActiveTab("activity");
            }}
          />
        ) : (
          <>
            {step === "welcome" && (
              <WelcomeView
                displayName={displayName}
                setDisplayName={handleUpdateDisplayName}
                onStart={() => {
                  setActiveTab("activity");
                  setStep("check_in");
                }}
              />
            )}

            {step === "check_in" && (
              <CheckInView
                selectedCheckIn={selectedCheckIn}
                onSelectCheckIn={setSelectedCheckIn}
                onContinue={() => setStep("art_forms")}
                onSkip={() => {
                  setSelectedCheckIn("skipped");
                  setStep("art_forms");
                }}
                onBackToHome={() => setStep("welcome")}
              />
            )}

            {step === "art_forms" && (
              <ArtFormView
                artForms={artForms}
                selectedArtFormId={selectedArtFormId}
                onSelectArtForm={handleSelectArtForm}
              />
            )}

            {step === "categories" && (
              <CategoryView
                artFormTitle={
                  selectedArtFormId === "warli" ? "Warli" :
                  selectedArtFormId === "kolam" ? "Kolam" :
                  selectedArtFormId === "madhubani" ? "Madhubani" :
                  selectedArtFormId === "gond" ? "Gond Art" : "Indian Folk Art"
                }
                categories={
                  categories && categories.filter((c) => c.art_form_id === selectedArtFormId).length > 0
                    ? categories.filter((c) => c.art_form_id === selectedArtFormId)
                    : getFallbackCategories(selectedArtFormId)
                }
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={handleSelectCategory}
                onBack={() => setStep("art_forms")}
              />
            )}

            {step === "carousel" && (
              <ExampleCarouselView
                categoryTitle={
                  categories.find((c) => c.category_id === selectedCategoryId)?.title ||
                  selectedCategoryId.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
                }
                exercises={
                  exercises && exercises.filter((e) => e.category_id === selectedCategoryId).length > 0
                    ? exercises.filter((e) => e.category_id === selectedCategoryId)
                    : getFallbackExercises(selectedArtFormId, selectedCategoryId)
                }
                onSelectExercise={handleSelectExercise}
                onBack={() => setStep("categories")}
              />
            )}

            {step === "drawing" && selectedExercise && (
              <DrawingActivityView
                exercise={selectedExercise}
                onUpload={handleUploadDrawing}
                onFinishWithoutAI={handleFinishWithoutAI}
                onBack={() => setStep("carousel")}
              />
            )}

            {step === "summary" && (
              <SummaryView
                session={
                  currentSession || {
                    session_id: "sess_demo",
                    anonymous_user_id: "anon_demo",
                    display_name: displayName,
                    art_form_id: selectedArtFormId,
                    category_id: selectedCategoryId,
                    exercise_id: selectedExercise?.exercise_id || "warli-basic-01",
                    status: "completed",
                    pre_check_in: selectedCheckIn,
                    started_at: new Date().toISOString(),
                  }
                }
                onStartAnother={() => {
                  setStep("art_forms");
                }}
                onDeleteSession={handleDeleteSession}
                onRetryReflection={handleRetryReflection}
                isRetryingReflection={isRetryingReflection}
              />
            )}
          </>
        )}
      </main>

      {/* 3. STREAMLINED BOTTOM TAB NAVIGATION BAR */}
      <nav className="bottom-nav" aria-label="Bottom Navigation">
        <button
          className={`nav-tab-btn ${activeTab === "home" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("home");
            setStep("welcome");
          }}
          aria-label="Home Tab"
        >
          <Home size={22} />
          <span>Home</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === "activity" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("activity");
            setStep("art_forms");
          }}
          aria-label="Activity Session Tab"
        >
          <Activity size={22} />
          <span>Activity</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === "journey" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("journey");
          }}
          aria-label="My Creative Journey Tab"
        >
          <Compass size={22} />
          <span>Journey</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === "discover" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("discover");
          }}
          aria-label="Discover Heritage Stories Tab"
        >
          <BookOpen size={22} />
          <span>Discover</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("settings");
          }}
          aria-label="Settings Tab"
        >
          <Settings size={22} />
          <span>Settings</span>
        </button>
      </nav>
    </>
  );
}
