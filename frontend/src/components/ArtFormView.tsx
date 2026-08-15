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
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.85rem", fontWeight: 900, marginBottom: "6px", color: "#0F172A", letterSpacing: "-0.03em" }}>
          Indian Art Traditions
        </h2>
        <p style={{ color: "#64748B", fontSize: "0.95rem", fontWeight: 500 }}>
          Explore curated Indian folk art forms designed for 5-minute creative routines.
        </p>
      </div>

      <div style={{ display: "grid", gap: "18px" }}>
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
                borderLeft: `6px solid ${style.color}`,
                padding: "22px 24px",
                opacity: isActive ? 1 : 0.85,
                cursor: isActive ? "pointer" : "default",
              }}
              onClick={() => {
                if (isActive) onSelectArtForm(af.art_form_id);
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "16px",
                      backgroundColor: style.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Palette size={26} color={style.color} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.45rem", fontWeight: 800, color: "#0F172A" }}>
                      {af.title}
                    </h3>
                    <span style={{ fontSize: "0.8rem", color: "#64748B", fontWeight: 700 }}>
                      {isActive ? "3 Categories • 9 Activities" : "Expansion Module"}
                    </span>
                  </div>
                </div>

                {isActive ? (
                  <ChevronRight size={24} color="#94A3B8" />
                ) : (
                  <span style={{ fontSize: "0.72rem", padding: "4px 10px", borderRadius: "9999px", background: "#F1F5F9", color: "#64748B", fontWeight: 800, display: "flex", alignItems: "center", gap: "4px" }}>
                    <Lock size={12} /> Coming Soon
                  </span>
                )}
              </div>

              <p style={{ fontSize: "0.92rem", color: "#334155", lineHeight: 1.6, marginBottom: "16px", fontWeight: 500 }}>
                {af.short_description}
              </p>

              <div style={{ background: "#F8FAFC", padding: "10px 14px", borderRadius: "14px", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.82rem", color: style.color, fontWeight: 800, display: "flex", alignItems: "center", gap: "6px" }}>
                  <Sparkles size={16} /> {af.source_note || "Heritage Indian Folk Art"}
                </span>

                {isActive && (
                  <span style={{ fontSize: "0.75rem", padding: "3px 10px", borderRadius: "9999px", background: "rgba(255, 82, 59, 0.1)", color: "var(--color-accent-coral)", fontWeight: 800 }}>
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
