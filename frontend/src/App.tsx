import { useState, useEffect } from "react";
import { Home, Activity, Settings } from "lucide-react";
import { ChittakalaClient, ArtForm, Category, Exercise, Session } from "./api/chittakalaClient";
import { WelcomeView } from "./components/WelcomeView";
import { CheckInView } from "./components/CheckInView";
import { ArtFormView } from "./components/ArtFormView";
import { CategoryView } from "./components/CategoryView";
import { ExampleCarouselView } from "./components/ExampleCarouselView";
import { DrawingActivityView } from "./components/DrawingActivityView";
import { SummaryView } from "./components/SummaryView";
import { SettingsView } from "./components/SettingsView";
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
    active: false,
  },
  {
    art_form_id: "gond",
    title: "Gond Art",
    short_description: "Tribal art of Madhya Pradesh crafted using signature fine dots, dashes, and rhythmic nature lines.",
    thumbnail_path: "/art/gond/preview.svg",
    source_note: "Gond indigenous tribal art of Central India",
    display_order: 4,
    active: false,
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
  const [activeTab, setActiveTab] = useState<"home" | "activity" | "settings">("home");
  const [step, setStep] = useState<ViewStep>("welcome");

  // Operational state with 2-way localStorage sync
  const [displayName, setDisplayName] = useState<string>(() => {
    return localStorage.getItem("chittakala_display_name") || "";
  });

  const handleUpdateDisplayName = (val: string) => {
    setDisplayName(val);
    localStorage.setItem("chittakala_display_name", val);
  };
  const [selectedCheckIn, setSelectedCheckIn] = useState<string>("busy");
  const [backendStatus, setBackendStatus] = useState<string>("Checking API...");
  
  const [artForms, setArtForms] = useState<ArtForm[]>(ALL_INDIAN_ART_FORMS);
  const [selectedArtFormId, setSelectedArtFormId] = useState<string>("warli");
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("basic-figures");

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const [currentSession, setCurrentSession] = useState<Session | null>(null);

  useEffect(() => {
    ChittakalaClient.checkHealth()
      .then((data) => setBackendStatus(`Online (${data.service})`))
      .catch(() => setBackendStatus("Offline / Demo"));

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

  // Fetch categories when art form changes
  const handleSelectArtForm = (artFormId: string) => {
    setSelectedArtFormId(artFormId);
    ChittakalaClient.getCategories(artFormId)
      .then((cats) => {
        setCategories(cats);
        setStep("categories");
      })
      .catch(() => {
        if (artFormId === "warli") {
          setCategories([
            { category_id: "basic-figures", art_form_id: "warli", title: "Basic Warli Figures & Motifs", short_description: "Beginner-friendly geometric figures, musicians, and village life.", thumbnail_path: "/art/warli/basic-figures/example-01.png", display_order: 1, active: true },
            { category_id: "figure-rows", art_form_id: "warli", title: "Warli Figure Rows & Scenes", short_description: "Rhythmic rows of dancers, seed sowing farmers, and village drummers.", thumbnail_path: "/art/warli/figure-rows/example-01.png", display_order: 2, active: true },
            { category_id: "dancing-circles", art_form_id: "warli", title: "Warli Circles & Sacred Murals", short_description: "Grand Tarpa dance rings, musician shrines, and sacred Tree of Life murals.", thumbnail_path: "/art/warli/dancing-circles/example-01.png", display_order: 3, active: true },
          ]);
        } else {
          setCategories([
            { category_id: "simple-dot-kolams", art_form_id: "kolam", title: "Simple Pulli & Line Kolams", short_description: "Beginner-friendly dot grids, continuous line loops, and floral blossoms.", thumbnail_path: "/art/kolam/simple-dot-kolams/example-01.png", display_order: 1, active: true },
            { category_id: "loop-line-kolams", art_form_id: "kolam", title: "Sikku & Brahma Mudi Kolams", short_description: "Flowing curved loops, cross-form Sikku matrices, and interlocking strands.", thumbnail_path: "/art/kolam/loop-line-kolams/example-01.png", display_order: 2, active: true },
            { category_id: "decorative-daily-kolams", art_form_id: "kolam", title: "Grand Padma & Sikku Matrices", short_description: "Intricate multi-loop Sikku matrices, dual triangular grids, and Kambi Kolams.", thumbnail_path: "/art/kolam/decorative-daily-kolams/example-01.png", display_order: 3, active: true },
          ]);
        }
        setStep("categories");
      });
  };

  // Fetch exercises when category is selected
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    ChittakalaClient.getExercises(categoryId)
      .then((exs) => {
        setExercises(exs);
        setStep("carousel");
      })
      .catch(() => {
        // Full category-specific fallback data matching ArtService seed
        if (selectedArtFormId === "warli") {
          if (categoryId === "basic-figures") {
            setExercises([
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
            ]);
          } else if (categoryId === "figure-rows") {
            setExercises([
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
            ]);
          } else {
            setExercises([
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
            ]);
          }
        } else {
          // Kolam Categories
          if (categoryId === "simple-dot-kolams") {
            setExercises([
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
            ]);
          } else if (categoryId === "loop-line-kolams") {
            setExercises([
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
            ]);
          } else {
            setExercises([
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
            ]);
          }
        }
        setStep("carousel");
      });
  };



  // Handle exercise selection -> Create operational session
  const handleSelectExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    ChittakalaClient.createSession({
      art_form_id: exercise.art_form_id,
      category_id: exercise.category_id,
      exercise_id: exercise.exercise_id,
      display_name: displayName || undefined,
      pre_check_in: selectedCheckIn,
    })
      .then((sess) => {
        setCurrentSession(sess);
        setStep("drawing");
      })
      .catch(() => {
        // Fallback session object for offline / demo mode
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
        setStep("drawing");
      });
  };

  // Handle drawing upload & request Gemini AI Multimodal Reflection
  const handleUploadDrawing = async (file: File) => {
    if (!currentSession) {
      setStep("summary");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);

      await fetch(`/api/sessions/${currentSession.session_id}/drawing`, {
        method: "POST",
        body: formData,
      });

      const reflectRes = await fetch(`/api/sessions/${currentSession.session_id}/reflect`, {
        method: "POST",
        body: formData,
      });

      let feedback = null;
      if (reflectRes.ok) {
        feedback = await reflectRes.json();
      }

      setCurrentSession({
        ...currentSession,
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
    } catch {
      setStep("summary");
    }
  };

  // Finish session without AI feedback
  const handleFinishWithoutAI = () => {
    if (currentSession) {
      setCurrentSession({ ...currentSession, status: "completed" });
    }
    setStep("summary");
  };

  // Delete session
  const handleDeleteSession = () => {
    if (currentSession) {
      fetch(`/api/sessions/${currentSession.session_id}`, { method: "DELETE" }).catch(() => {});
    }
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
            {displayName ? `Hello, ${displayName}` : backendStatus}
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
        ) : (
          <>
            {step === "welcome" && (
              <WelcomeView
                displayName={displayName}
                setDisplayName={handleUpdateDisplayName}
                onStart={() => setStep("check_in")}
              />
            )}

            {step === "check_in" && (
              <CheckInView
                selectedCheckIn={selectedCheckIn}
                onSelectCheckIn={setSelectedCheckIn}
                onContinue={() => setStep("art_forms")}
                onSkip={() => setStep("art_forms")}
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
                artFormTitle={selectedArtFormId === "warli" ? "Warli" : "Kolam"}
                categories={categories}
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
                exercises={exercises}
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
            if (selectedExercise) setStep("drawing");
            else setStep("art_forms");
          }}
          aria-label="Activity Session Tab"
        >
          <Activity size={22} />
          <span>Activity</span>
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
