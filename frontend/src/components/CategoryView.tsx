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

export const CategoryView: React.FC<CategoryViewProps> = ({
  artFormTitle,
  categories,
  selectedCategoryId,
  onSelectCategory,
  onBack,
}) => {
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
        {categories.map((cat, idx) => {
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
                padding: "14px 14px",
                borderLeft: `5px solid ${colorTheme.main}`,
                boxSizing: "border-box",
                width: "100%",
                overflow: "hidden",
              }}
              onClick={() => onSelectCategory(cat.category_id)}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "10px",
                      backgroundColor: colorTheme.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Layers size={18} color={colorTheme.main} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {cat.title}
                    </h3>
                    <span style={{ fontSize: "0.74rem", color: colorTheme.main, fontWeight: 800, display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      3 Standalone Activities
                    </span>
                  </div>
                </div>
                <ChevronRight size={20} color="#94A3B8" style={{ flexShrink: 0 }} />
              </div>

              <p style={{ fontSize: "0.85rem", color: "#334155", lineHeight: 1.45, marginBottom: "10px", fontWeight: 500 }}>
                {cat.short_description}
              </p>

              <div style={{ background: "#F8FAFC", padding: "6px 10px", borderRadius: "10px", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "6px", width: "100%", boxSizing: "border-box" }}>
                <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
                  <span style={{ fontSize: "0.74rem", color: "#64748B", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <Sparkles size={13} color={colorTheme.main} style={{ flexShrink: 0 }} /> Ready for 5-min creation
                  </span>
                </div>
                <span style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: "9999px", background: "rgba(99, 102, 241, 0.1)", color: "#6366F1", fontWeight: 800, flexShrink: 0, whiteSpace: "nowrap" }}>
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
