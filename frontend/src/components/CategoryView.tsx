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
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
        <button
          className="btn-genz-secondary"
          onClick={onBack}
          style={{ width: "44px", height: "44px", padding: 0, minWidth: "44px", borderRadius: "9999px" }}
          aria-label="Back to Art Forms"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.03em" }}>
            {artFormTitle} Categories
          </h2>
          <p style={{ color: "#64748B", fontSize: "0.92rem", fontWeight: 500 }}>
            Choose a category to browse exercises
          </p>
        </div>
      </div>

      {/* Vibrant Category Cards */}
      <div style={{ display: "grid", gap: "18px" }}>
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
                padding: "22px 24px",
                borderLeft: `6px solid ${colorTheme.main}`,
              }}
              onClick={() => onSelectCategory(cat.category_id)}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "14px",
                      backgroundColor: colorTheme.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Layers size={24} color={colorTheme.main} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.35rem", fontWeight: 800, color: "#0F172A" }}>
                      {cat.title}
                    </h3>
                    <span style={{ fontSize: "0.78rem", color: colorTheme.main, fontWeight: 800 }}>
                      3 Standalone Activities
                    </span>
                  </div>
                </div>
                <ChevronRight size={22} color="#94A3B8" />
              </div>

              <p style={{ fontSize: "0.92rem", color: "#334155", lineHeight: 1.6, marginBottom: "14px", fontWeight: 500 }}>
                {cat.short_description}
              </p>

              <div style={{ background: "#F8FAFC", padding: "10px 14px", borderRadius: "14px", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.8rem", color: "#64748B", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px" }}>
                  <Sparkles size={16} color={colorTheme.main} /> Ready for 5-minute pen & paper creation
                </span>
                <span style={{ fontSize: "0.75rem", padding: "3px 10px", borderRadius: "9999px", background: "rgba(99, 102, 241, 0.1)", color: "#6366F1", fontWeight: 800 }}>
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
