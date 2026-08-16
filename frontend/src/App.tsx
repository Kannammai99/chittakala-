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
            { category_id: "basic-figures", art_form_id: "warli", title: "Basic Warli Figures", short_description: "Simple geometric human and animal shapes built with triangles and lines.", thumbnail_path: "", display_order: 1, active: true },
            { category_id: "figure-rows", art_form_id: "warli", title: "Warli Figure Rows", short_description: "Rhythmic rows of dancing or standing figures demonstrating symmetry.", thumbnail_path: "", display_order: 2, active: true },
            { category_id: "dancing-circles", art_form_id: "warli", title: "Warli Dancing Circles", short_description: "Circular compositions celebrating community, music, and central motifs.", thumbnail_path: "", display_order: 3, active: true },
          ]);
        } else {
          setCategories([
            { category_id: "simple-dot-kolams", art_form_id: "kolam", title: "Simple Dot Kolams", short_description: "Beginner-friendly dot grids connected by straight lines.", thumbnail_path: "", display_order: 1, active: true },
            { category_id: "loop-line-kolams", art_form_id: "kolam", title: "Loops and Line Kolams", short_description: "Flowing curved loops weaving around dot grids.", thumbnail_path: "", display_order: 2, active: true },
            { category_id: "decorative-daily-kolams", art_form_id: "kolam", title: "Decorative Daily Kolams", short_description: "Symmetrical floral patterns for daily practice.", thumbnail_path: "", display_order: 3, active: true },
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
                title: "Standing Figure",
                art_form: "Warli",
                difficulty: "beginner",
                short_description: "Draw a basic standing figure formed by two inverted triangles.",
                reference_image_path: "/art/warli/basic-figures/example-01.svg",
                visible_elements: ["one circular head", "two joined triangles forming torso", "straight vertical leg lines"],
                drawing_guidance: [
                  "Draw a small circle for the head.",
                  "Draw an upper triangle pointing downwards.",
                  "Draw a lower triangle touching at the vertex, pointing upwards.",
                  "Add simple straight lines for legs and feet."
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
                title: "Figure with Raised Arms",
                art_form: "Warli",
                difficulty: "beginner",
                short_description: "Draw a figure celebrating with arms extended upward in joy.",
                reference_image_path: "/art/warli/basic-figures/example-02.svg",
                visible_elements: ["one circular head", "two joined triangles", "two upward angled arm lines"],
                drawing_guidance: [
                  "Start with head circle and joined torso triangles.",
                  "Extend two arms outward and upward at a 45-degree angle.",
                  "Add legs with slight knee bends."
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
                title: "Two Connected Figures",
                art_form: "Warli",
                difficulty: "beginner",
                short_description: "Draw two Warli figures holding hands side-by-side.",
                reference_image_path: "/art/warli/basic-figures/example-03.svg",
                visible_elements: ["two circular heads", "four joined triangles", "connecting arm line between figures"],
                drawing_guidance: [
                  "Draw two standing triangular figures side-by-side.",
                  "Connect the inner arm lines to show them holding hands.",
                  "Keep distance balanced between both figures."
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
                title: "Three-Figure Row",
                art_form: "Warli",
                difficulty: "beginner",
                short_description: "Draw a rhythmically spaced horizontal row of three identical figures.",
                reference_image_path: "/art/warli/figure-rows/example-01.svg",
                visible_elements: ["three circular heads", "three joined triangle pairs", "even horizontal spacing"],
                drawing_guidance: [
                  "Draw a subtle horizontal baseline for orientation.",
                  "Draw three equally spaced Warli figures along the line.",
                  "Ensure heads and torso heights align evenly."
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
                title: "Alternating-Arm Row",
                art_form: "Warli",
                difficulty: "intermediate",
                short_description: "Draw a row of figures alternating arm positions up and down.",
                reference_image_path: "/art/warli/figure-rows/example-02.svg",
                visible_elements: ["three figures", "alternating arm positions", "rhythmic horizontal pattern"],
                drawing_guidance: [
                  "Draw three Warli torsos in a row.",
                  "Give figure 1 raised arms, figure 2 lowered arms, and figure 3 raised arms.",
                  "Focus on steady visual rhythm across the row."
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
                title: "Village-Activity Row",
                art_form: "Warli",
                difficulty: "intermediate",
                short_description: "Draw a row depicting figures carrying baskets or tools.",
                reference_image_path: "/art/warli/figure-rows/example-03.svg",
                visible_elements: ["three figures", "curved head basket arc", "dynamic posture lines"],
                drawing_guidance: [
                  "Draw three figures engaged in simple daily tasks.",
                  "Add a small bowl/basket arc above the head of the center figure.",
                  "Use clean, expressive stick lines."
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
                title: "Small Dancing Circle",
                art_form: "Warli",
                difficulty: "intermediate",
                short_description: "Draw four figures joined in a small circular dance arrangement.",
                reference_image_path: "/art/warli/dancing-circles/example-01.svg",
                visible_elements: ["four circular heads", "circular arm loop", "inward facing triangular torsos"],
                drawing_guidance: [
                  "Lightly sketch a central circular guide.",
                  "Place four Warli figures along the cardinal points facing inwards.",
                  "Connect their hands to form a continuous circle of unity."
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
                title: "Circle with Central Tree",
                art_form: "Warli",
                difficulty: "intermediate",
                short_description: "Draw figures dancing around a central tree motif.",
                reference_image_path: "/art/warli/dancing-circles/example-02.svg",
                visible_elements: ["central vertical tree with branch arcs", "surrounding circular row of figures"],
                drawing_guidance: [
                  "Draw a central trunk line with leaf clusters.",
                  "Draw figures forming a ring around the tree.",
                  "Emphasize balance between center tree and outer ring."
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
                title: "Tarpa Dance Composition",
                art_form: "Warli",
                difficulty: "advanced",
                short_description: "Draw a spiral dance ring around a central musician figure.",
                reference_image_path: "/art/warli/dancing-circles/example-03.svg",
                visible_elements: ["center musician figure", "outer spiral chain of figures", "fluid curved dance line"],
                drawing_guidance: [
                  "Draw central musician holding a horn instrument.",
                  "Draw a spiral chain of dancers curving around.",
                  "Enjoy the continuous circular flow."
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
                title: "Single-Loop 3x3 Dot Grid",
                art_form: "Kolam",
                difficulty: "beginner",
                short_description: "Connect a 3x3 dot grid using straight lines to form a star square.",
                reference_image_path: "/art/kolam/simple-dot-kolams/example-01.svg",
                visible_elements: ["3x3 dot grid", "outer diamond border line", "central cross pattern"],
                drawing_guidance: [
                  "Place 9 dots in a 3x3 square grid with even spacing.",
                  "Connect the outer edge dots to form a diamond boundary.",
                  "Draw straight lines through the center dot to complete symmetry."
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
                title: "Square Star 4x4 Grid",
                art_form: "Kolam",
                difficulty: "beginner",
                short_description: "Draw a 4x4 dot grid and connect points into an 8-pointed star.",
                reference_image_path: "/art/kolam/simple-dot-kolams/example-02.svg",
                visible_elements: ["4x4 dot grid", "intersecting square motifs", "symmetrical star points"],
                drawing_guidance: [
                  "Place 16 dots in a neat 4x4 grid.",
                  "Draw two overlapping squares angled at 45 degrees around dots.",
                  "Keep line thickness smooth and steady."
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
                title: "Cross Pattern 5x5 Grid",
                art_form: "Kolam",
                difficulty: "intermediate",
                short_description: "Connect a 5-dot cross grid into a traditional flower.",
                reference_image_path: "/art/kolam/simple-dot-kolams/example-03.svg",
                visible_elements: ["5-dot cross grid", "four petal triangles", "central square nucleus"],
                drawing_guidance: [
                  "Draw a 5-dot cross shape.",
                  "Enclose each arm dot with a smooth triangular loop.",
                  "Connect all petals back to central dot."
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
                title: "Continuous Line Loop",
                art_form: "Kolam",
                difficulty: "intermediate",
                short_description: "Weave an unbroken curved loop around a 3-dot matrix.",
                reference_image_path: "/art/kolam/loop-line-kolams/example-01.svg",
                visible_elements: ["3-dot center line", "continuous curved loop", "zero line intersections"],
                drawing_guidance: [
                  "Place 3 dots in a horizontal line.",
                  "Curve smoothly around the first dot, past the second, and loop around third.",
                  "Return to start point in one continuous fluid motion."
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
                title: "Four-Corner Loop",
                art_form: "Kolam",
                difficulty: "intermediate",
                short_description: "Weave four corner loops around a 3x3 dot matrix.",
                reference_image_path: "/art/kolam/loop-line-kolams/example-02.svg",
                visible_elements: ["3x3 dot grid", "four corner teardrop loops", "symmetrical central node"],
                drawing_guidance: [
                  "Place a 3x3 dot grid.",
                  "Draw a teardrop loop weaving around each corner dot.",
                  "Join all four loops cleanly in center matrix."
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
                title: "Dual-Strand Loop",
                art_form: "Kolam",
                difficulty: "advanced",
                short_description: "Weave two interlocking continuous loops through a 4x4 matrix.",
                reference_image_path: "/art/kolam/loop-line-kolams/example-03.svg",
                visible_elements: ["4x4 dot grid", "two distinct interlocking loops", "four-fold rotational symmetry"],
                drawing_guidance: [
                  "Place a 4x4 dot matrix.",
                  "Weave strand 1 around inner 4 dots.",
                  "Weave strand 2 around outer ring, interlocking with strand 1."
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
                title: "Lotus Motif Daily Kolam",
                art_form: "Kolam",
                difficulty: "intermediate",
                short_description: "Draw a daily morning lotus blossom motif with petal curves.",
                reference_image_path: "/art/kolam/decorative-daily-kolams/example-01.svg",
                visible_elements: ["central lotus pod", "four outer curved petals", "symmetrical leaf arcs"],
                drawing_guidance: [
                  "Draw a small central circle.",
                  "Extend four rounded lotus petal arcs radiating outward.",
                  "Add leaf arcs between petals to ground motif."
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
                title: "Morning Star Kolam",
                art_form: "Kolam",
                difficulty: "intermediate",
                short_description: "Draw a morning star kolam featuring overlapping diamond petals.",
                reference_image_path: "/art/kolam/decorative-daily-kolams/example-02.svg",
                visible_elements: ["central star motif", "eight radiating diamond tips", "outer border arcs"],
                drawing_guidance: [
                  "Draw a central square dot matrix.",
                  "Construct eight diamond points radiating evenly.",
                  "Surround with clean scalloped border lines."
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
                title: "Eight-Petal Floral Kolam",
                art_form: "Kolam",
                difficulty: "advanced",
                short_description: "Draw an auspicious eight-petal floral kolam composition.",
                reference_image_path: "/art/kolam/decorative-daily-kolams/example-03.svg",
                visible_elements: ["center floral disc", "eight rounded petal curves", "outer corner accent dots"],
                drawing_guidance: [
                  "Start at center disc.",
                  "Draw eight evenly spaced petal curves radiating outward.",
                  "Add subtle accent dots at four outer corners."
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
      .catch((err) => {
        alert(`Session Creation Error: ${err.message}`);
        setStep("drawing");
      });
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
            style={{ width: "36px", height: "36px", borderRadius: "12px", objectFit: "cover", border: "1.5px solid #FF7A00" }}
          />
          <div>
            <h1 className="brand-title">Chittakala</h1>
          </div>
          <span className="brand-badge">PWA</span>
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
                categoryTitle={selectedCategoryId.replace("-", " ").toUpperCase()}
                exercises={exercises}
                onSelectExercise={handleSelectExercise}
                onBack={() => setStep("categories")}
              />
            )}

            {step === "drawing" && selectedExercise && (
              <DrawingActivityView
                exercise={selectedExercise}
                onUpload={() => setStep("summary")}
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
