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
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.45rem", fontWeight: 900, marginBottom: "4px", color: "#0F172A", letterSpacing: "-0.02em" }}>
          Indian Art Traditions
        </h2>
        <p style={{ color: "#64748B", fontSize: "0.88rem", fontWeight: 500, lineHeight: 1.4 }}>
          Explore curated Indian folk art forms designed for 5-minute creative routines.
        </p>
      </div>

      <div style={{ display: "grid", gap: "16px" }}>
        {artForms.map((af) => {
          const isSelected = selectedArtFormId === af.art_form_id;
          const isActive = af.active;
          const style = getArtFormStyle(af.art_form_id);

          // Concise, non-truncated origin labels for clean mobile layout
          const getConciseSource = (id: string, note?: string) => {
            switch (id) {
              case "warli": return "Folk art of Maharashtra, India";
              case "kolam": return "Daily threshold art of South India";
              case "madhubani": return "Mithila heritage of Bihar";
              case "gond": return "Tribal art of Central India";
              case "pattachitra": return "Scroll art of Odisha";
              case "kalamkari": return "Bamboo pen art of Andhra";
              default: return note || "Heritage Indian Folk Art";
            }
          };

          return (
            <div
              key={af.art_form_id}
              className={`genz-card ${isActive ? "genz-card-interactive" : ""} ${isSelected && isActive ? "selected" : ""}`}
              style={{
                marginBottom: 0,
                borderLeft: `5px solid ${style.color}`,
                padding: "18px 18px",
                opacity: isActive ? 1 : 0.85,
                cursor: isActive ? "pointer" : "default",
                boxSizing: "border-box",
                width: "100%",
                borderRadius: "20px",
              }}
              onClick={() => {
                if (isActive) onSelectArtForm(af.art_form_id);
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px", gap: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
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
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 800, color: "#0F172A", lineHeight: 1.2 }}>
                      {af.title}
                    </h3>
                    <span style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 700, display: "block", marginTop: "2px" }}>
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

              <p style={{ fontSize: "0.88rem", color: "#334155", lineHeight: 1.55, marginBottom: "14px", fontWeight: 500 }}>
                {af.short_description}
              </p>

              <div style={{ background: "#F8FAFC", padding: "8px 12px", borderRadius: "12px", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", width: "100%", boxSizing: "border-box" }}>
                <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
                  <span style={{ fontSize: "0.76rem", color: style.color, fontWeight: 800, display: "flex", alignItems: "center", gap: "5px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <Sparkles size={14} style={{ flexShrink: 0 }} /> {getConciseSource(af.art_form_id, af.source_note)}
                  </span>
                </div>

                {isActive && (
                  <span style={{ fontSize: "0.72rem", padding: "3px 10px", borderRadius: "9999px", background: "rgba(255, 82, 59, 0.12)", color: "var(--color-accent-coral)", fontWeight: 800, flexShrink: 0, whiteSpace: "nowrap" }}>
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
