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
  const [activeTab, setActiveTab] = useState<"home" | "activity" | "settings">("home");
  const [step, setStep] = useState<ViewStep>("welcome");

  // Operational state
  const [displayName, setDisplayName] = useState<string>("");
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
        setExercises([
          {
            exercise_id: `${selectedArtFormId}-ex-01`,
            art_form_id: selectedArtFormId,
            category_id: categoryId,
            title: selectedArtFormId === "warli" ? "Standing Figure" : "Single-Loop 3x3 Grid",
            art_form: selectedArtFormId === "warli" ? "Warli" : "Kolam",
            difficulty: "beginner",
            short_description: selectedArtFormId === "warli" ? "Draw a basic figure formed by geometric triangles." : "Connect a 3x3 dot grid using straight lines.",
            reference_image_path: `/art/${selectedArtFormId}/${categoryId}/example-01.svg`,
            visible_elements: ["one circular head", "two joined triangles"],
            drawing_guidance: ["Draw a circle for the head.", "Draw two joined triangles."],
            allowed_next_actions: ["repeat", "next_example", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
          {
            exercise_id: `${selectedArtFormId}-ex-02`,
            art_form_id: selectedArtFormId,
            category_id: categoryId,
            title: selectedArtFormId === "warli" ? "Figure with Raised Arms" : "Square Star 4x4 Grid",
            art_form: selectedArtFormId === "warli" ? "Warli" : "Kolam",
            difficulty: "beginner",
            short_description: selectedArtFormId === "warli" ? "Draw a figure celebrating with arms extended upward." : "Connect points into an 8-pointed star.",
            reference_image_path: `/art/${selectedArtFormId}/${categoryId}/example-02.svg`,
            visible_elements: ["circular head", "joined triangles", "raised arm lines"],
            drawing_guidance: ["Start with torso triangles.", "Extend arms upward at 45 degrees."],
            allowed_next_actions: ["repeat", "next_example", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
          {
            exercise_id: `${selectedArtFormId}-ex-03`,
            art_form_id: selectedArtFormId,
            category_id: categoryId,
            title: selectedArtFormId === "warli" ? "Two Connected Figures" : "Cross Pattern 5x5 Grid",
            art_form: selectedArtFormId === "warli" ? "Warli" : "Kolam",
            difficulty: "intermediate",
            short_description: selectedArtFormId === "warli" ? "Draw two figures holding hands side-by-side." : "Connect a 5-dot cross grid into a flower.",
            reference_image_path: `/art/${selectedArtFormId}/${categoryId}/example-03.svg`,
            visible_elements: ["two figures", "connecting arm line"],
            drawing_guidance: ["Draw two figures side-by-side.", "Connect inner arms."],
            allowed_next_actions: ["repeat", "finish"],
            review_status: "reviewed",
            estimated_minutes: 5,
            active: true,
          },
        ]);
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
      {/* 1. FIXED TOP HEADER */}
      <header className="app-header">
        <div className="app-brand">
          <div className="brand-icon">CK</div>
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
        {step === "welcome" && (
          <WelcomeView
            displayName={displayName}
            setDisplayName={setDisplayName}
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
