import React from "react";
import { Palette, ChevronRight, Sparkles, Lock } from "lucide-react";
import { ArtForm } from "../api/chittakalaClient";

interface ArtFormViewProps {
  artForms: ArtForm[];
  selectedArtFormId: string;
  onSelectArtForm: (artFormId: string) => void;
}

export const ArtFormView: React.FC<ArtFormViewProps> = ({
  artForms,
  selectedArtFormId,
  onSelectArtForm,
}) => {
  // Art form styling mapping
  const getArtFormStyle = (id: string) => {
    switch (id) {
      case "warli":
        return { color: "var(--color-accent-coral)", bg: "rgba(255, 82, 59, 0.12)", badge: "Active Practice" };
      case "kolam":
        return { color: "#6366F1", bg: "rgba(99, 102, 241, 0.12)", badge: "Active Practice" };
      case "madhubani":
        return { color: "#EC4899", bg: "rgba(236, 72, 153, 0.12)", badge: "Coming Soon" };
      case "gond":
        return { color: "#10B981", bg: "rgba(16, 185, 129, 0.12)", badge: "Coming Soon" };
      case "pattachitra":
        return { color: "#F59E0B", bg: "rgba(245, 158, 11, 0.12)", badge: "Coming Soon" };
      case "kalamkari":
        return { color: "#8B5CF6", bg: "rgba(139, 92, 246, 0.12)", badge: "Coming Soon" };
      default:
        return { color: "var(--color-accent-coral)", bg: "rgba(255, 82, 59, 0.12)", badge: "Demo" };
    }
  };

  return (
    <div className="tab-view">
      <div style={{ marginBottom: "18px" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.35rem", fontWeight: 900, marginBottom: "4px", color: "#0F172A", letterSpacing: "-0.02em" }}>
          Indian Art Traditions
        </h2>
        <p style={{ color: "#64748B", fontSize: "0.88rem", fontWeight: 500 }}>
          Explore curated Indian folk art forms designed for 5-minute creative routines.
        </p>
      </div>

      <div style={{ display: "grid", gap: "14px" }}>
        {artForms.map((af) => {
          const isSelected = selectedArtFormId === af.art_form_id;
          const isActive = af.active;
          const style = getArtFormStyle(af.art_form_id);

          return (
            <div
              key={af.art_form_id}
              className={`genz-card ${isActive ? "genz-card-interactive" : ""} ${isSelected && isActive ? "selected" : ""}`}
              style={{
                marginBottom: 0,
                borderLeft: `5px solid ${style.color}`,
                padding: "16px 18px",
                opacity: isActive ? 1 : 0.85,
                cursor: isActive ? "pointer" : "default",
              }}
              onClick={() => {
                if (isActive) onSelectArtForm(af.art_form_id);
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "14px",
                      backgroundColor: style.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Palette size={22} color={style.color} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 800, color: "#0F172A", lineHeight: 1.2 }}>
                      {af.title}
                    </h3>
                    <span style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 700 }}>
                      {isActive ? "3 Categories • 9 Activities" : "Expansion Module"}
                    </span>
                  </div>
                </div>

                {isActive ? (
                  <ChevronRight size={22} color="#94A3B8" style={{ flexShrink: 0 }} />
                ) : (
                  <span style={{ fontSize: "0.72rem", padding: "4px 10px", borderRadius: "9999px", background: "#F1F5F9", color: "#64748B", fontWeight: 800, display: "flex", alignItems: "center", gap: "4px", flexShrink: 0, whiteSpace: "nowrap" }}>
                    <Lock size={12} /> Coming Soon
                  </span>
                )}
              </div>

              <p style={{ fontSize: "0.88rem", color: "#334155", lineHeight: 1.5, marginBottom: "12px", fontWeight: 500 }}>
                {af.short_description}
              </p>

              <div style={{ background: "#F8FAFC", padding: "8px 12px", borderRadius: "12px", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
                  <span style={{ fontSize: "0.78rem", color: style.color, fontWeight: 800, display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <Sparkles size={14} style={{ flexShrink: 0 }} /> {af.source_note || "Heritage Indian Folk Art"}
                  </span>
                </div>

                {isActive && (
                  <span style={{ fontSize: "0.72rem", padding: "3px 10px", borderRadius: "9999px", background: "rgba(255, 82, 59, 0.1)", color: "var(--color-accent-coral)", fontWeight: 800, flexShrink: 0, whiteSpace: "nowrap" }}>
                    Active Practice
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
