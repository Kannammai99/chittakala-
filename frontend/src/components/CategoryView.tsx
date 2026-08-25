import React from "react";
import { ChevronRight, ArrowLeft, Layers, Sparkles } from "lucide-react";
import { Category } from "../api/chittakalaClient";

interface CategoryViewProps {
  artFormTitle: string;
  categories: Category[];
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  onBack: () => void;
}

const WARLI_CATEGORIES: Category[] = [
  { category_id: "basic-figures", art_form_id: "warli", title: "Basic Warli Figures & Motifs", short_description: "Beginner-friendly geometric figures, musicians, and village life.", thumbnail_path: "/art/warli/basic-figures/example-01.png", display_order: 1, active: true },
  { category_id: "figure-rows", art_form_id: "warli", title: "Warli Figure Rows & Scenes", short_description: "Rhythmic rows of dancers, seed sowing farmers, and village drummers.", thumbnail_path: "/art/warli/figure-rows/example-01.png", display_order: 2, active: true },
  { category_id: "dancing-circles", art_form_id: "warli", title: "Warli Circles & Sacred Murals", short_description: "Grand Tarpa dance rings, musician shrines, and sacred Tree of Life murals.", thumbnail_path: "/art/warli/dancing-circles/example-01.png", display_order: 3, active: true },
];

const MADHUBANI_CATEGORIES: Category[] = [
  { category_id: "madhubani-borders", art_form_id: "madhubani", title: "Mithila Dual-Line Borders", short_description: "Traditional double-lined geometric borders, lotus petals, and leaf creepers.", thumbnail_path: "/art/madhubani/borders/example-01.png", display_order: 1, active: true },
  { category_id: "madhubani-nature", art_form_id: "madhubani", title: "Madhubani Bird & Fish Motifs", short_description: "Symbolic fish of fertility and intricate double-outlined songbird and royal bird motifs.", thumbnail_path: "/art/madhubani/nature/example-01.png", display_order: 2, active: true },
  { category_id: "madhubani-sacred", art_form_id: "madhubani", title: "Sun, Tree of Life & Peacock", short_description: "Sacred Surya motifs and branching Tree of Life filled with fine hatching.", thumbnail_path: "/art/madhubani/sacred/example-01.png", display_order: 3, active: true },
];

const GOND_CATEGORIES: Category[] = [
  { category_id: "gond-patterns", art_form_id: "gond", title: "Gond Bird Motifs & Pattern Textures", short_description: "Vibrant tribal birds, perching pairs, and royal peacocks filled with signature Gond dashes, dots, and wave textures.", thumbnail_path: "/art/gond/patterns/example-01.png", display_order: 1, active: true },
  { category_id: "gond-fauna", art_form_id: "gond", title: "Gond Forest Stag & Aquatic Fauna", short_description: "Sacred antler-tree forest stag, arched peacock feather plumes, and swimming aquatic fish in river reeds.", thumbnail_path: "/art/gond/fauna/example-01.png", display_order: 2, active: true },
  { category_id: "gond-tree-of-life", art_form_id: "gond", title: "Gond Sacred Tree & Blooming Canopy", short_description: "Intertwined Tree of Life trunks, golden Mahua berry canopy, and perching songbirds in floral vines.", thumbnail_path: "/art/gond/tree/example-01.png", display_order: 3, active: true },
];

const KOLAM_CATEGORIES: Category[] = [
  { category_id: "simple-dot-kolams", art_form_id: "kolam", title: "Simple Pulli & Line Kolams", short_description: "Beginner-friendly dot grids, continuous line loops, and floral blossoms.", thumbnail_path: "/art/kolam/simple-dot-kolams/example-01.png", display_order: 1, active: true },
  { category_id: "loop-line-kolams", art_form_id: "kolam", title: "Sikku & Brahma Mudi Kolams", short_description: "Flowing curved loops, cross-form Sikku matrices, and interlocking strands.", thumbnail_path: "/art/kolam/loop-line-kolams/example-01.png", display_order: 2, active: true },
  { category_id: "decorative-daily-kolams", art_form_id: "kolam", title: "Grand Padma & Sikku Matrices", short_description: "Intricate multi-loop Sikku matrices, dual triangular grids, and Kambi Kolams.", thumbnail_path: "/art/kolam/decorative-daily-kolams/example-01.png", display_order: 3, active: true },
];

export const CategoryView: React.FC<CategoryViewProps> = ({
  artFormTitle,
  categories,
  selectedCategoryId,
  onSelectCategory,
  onBack,
}) => {
  const getCategoriesToRender = (): Category[] => {
    // 1. If categories prop has valid non-empty items, use them
    if (Array.isArray(categories) && categories.length > 0) {
      return categories;
    }

    // 2. Fallback by artFormTitle
    const title = (artFormTitle || "").toLowerCase();
    if (title.includes("warli")) return WARLI_CATEGORIES;
    if (title.includes("madhubani")) return MADHUBANI_CATEGORIES;
    if (title.includes("gond")) return GOND_CATEGORIES;
    return KOLAM_CATEGORIES;
  };

  const listToRender = getCategoriesToRender();

  return (
    <div className="tab-view">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
        <button
          className="btn-genz-secondary"
          onClick={onBack}
          style={{ width: "38px", height: "38px", padding: 0, minWidth: "38px", borderRadius: "9999px", flexShrink: 0 }}
          aria-label="Back to Art Forms"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.35rem", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            {artFormTitle} Categories
          </h2>
          <p style={{ color: "#64748B", fontSize: "0.85rem", fontWeight: 500 }}>
            Choose a category to browse exercises
          </p>
        </div>
      </div>

      {/* Vibrant Category Cards */}
      <div style={{ display: "grid", gap: "14px" }}>
        {listToRender.map((cat, idx) => {
          const isSelected = selectedCategoryId === cat.category_id;
          const colors = [
            { main: "var(--color-accent-coral)", bg: "rgba(255, 82, 59, 0.12)" },
            { main: "#6366F1", bg: "rgba(99, 102, 241, 0.12)" },
            { main: "#F59E0B", bg: "rgba(245, 158, 11, 0.15)" },
          ];
          const colorTheme = colors[idx % colors.length];

          return (
            <div
              key={cat.category_id}
              className={`genz-card genz-card-interactive ${isSelected ? "selected" : ""}`}
              style={{
                cursor: "pointer",
                marginBottom: 0,
                padding: "16px 16px",
                borderLeft: `5px solid ${colorTheme.main}`,
                boxSizing: "border-box",
                width: "100%",
                borderRadius: "20px",
              }}
              onClick={() => onSelectCategory(cat.category_id)}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px", gap: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "12px",
                      backgroundColor: colorTheme.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Layers size={20} color={colorTheme.main} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.18rem", fontWeight: 800, color: "#0F172A", lineHeight: 1.2 }}>
                      {cat.title}
                    </h3>
                    <span style={{ fontSize: "0.76rem", color: colorTheme.main, fontWeight: 800, display: "block", marginTop: "2px" }}>
                      3 Standalone Activities
                    </span>
                  </div>
                </div>
                <ChevronRight size={20} color="#94A3B8" style={{ flexShrink: 0 }} />
              </div>

              <p style={{ fontSize: "0.86rem", color: "#334155", lineHeight: 1.5, marginBottom: "12px", fontWeight: 500 }}>
                {cat.short_description}
              </p>

              <div style={{ background: "#F8FAFC", padding: "8px 10px", borderRadius: "12px", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "6px", width: "100%", boxSizing: "border-box" }}>
                <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
                  <span style={{ fontSize: "0.74rem", color: "#64748B", fontWeight: 700, display: "flex", alignItems: "center", gap: "5px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <Sparkles size={13} color={colorTheme.main} style={{ flexShrink: 0 }} /> 5-min creative routine
                  </span>
                </div>
                <span style={{ fontSize: "0.7rem", padding: "3px 9px", borderRadius: "9999px", background: "rgba(99, 102, 241, 0.12)", color: "#6366F1", fontWeight: 800, flexShrink: 0, whiteSpace: "nowrap" }}>
                  Explore ➔
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
