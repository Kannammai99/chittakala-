import React from "react";
import { Smile, Zap, Wind, Flame, HelpCircle } from "lucide-react";

interface CheckInViewProps {
  selectedCheckIn: string;
  onSelectCheckIn: (choice: string) => void;
  onContinue: () => void;
  onSkip: () => void;
}

const CHECK_IN_OPTIONS = [
  { id: "quiet", label: "Quiet", icon: Smile, desc: "Calm and seeking a relaxed moment" },
  { id: "low-energy", label: "Low-energy", icon: Wind, desc: "Tired or taking a quiet break" },
  { id: "restless", label: "Restless", icon: Flame, desc: "Full of restless energy looking for focus" },
  { id: "busy", label: "Busy", icon: Zap, desc: "Taking a quick 5-min pause between tasks" },
  { id: "prefer_not_to_say", label: "Prefer not to say", icon: HelpCircle, desc: "Keep guidance neutral" },
];

export const CheckInView: React.FC<CheckInViewProps> = ({
  selectedCheckIn,
  onSelectCheckIn,
  onContinue,
  onSkip,
}) => {
  return (
    <div className="tab-view" style={{ padding: "0 4px" }}>
      <div style={{ marginBottom: "12px" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 900, marginBottom: "3px", color: "#0F172A", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
          How would you describe your current pace?
        </h2>
        <p style={{ color: "#64748B", fontSize: "0.8rem", fontWeight: 500, lineHeight: 1.3 }}>
          This optional check-in customizes interface wording only. It is non-clinical.
        </p>
      </div>

      <div style={{ display: "grid", gap: "8px", marginBottom: "14px" }}>
        {CHECK_IN_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selectedCheckIn === opt.id;
          return (
            <div
              key={opt.id}
              className={`genz-card genz-card-interactive ${isSelected ? "selected" : ""}`}
              style={{
                padding: "8px 12px",
                marginBottom: 0,
                display: "flex",
                alignItems: "center",
                gap: "12px",
                borderRadius: "14px",
              }}
              onClick={() => onSelectCheckIn(opt.id)}
            >
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "10px",
                  backgroundColor: isSelected ? "var(--color-accent-coral)" : "#F1F5F9",
                  color: isSelected ? "#FFFFFF" : "#0F172A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: isSelected ? "0 4px 12px rgba(255, 82, 59, 0.25)" : "none",
                }}
              >
                <Icon size={18} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0F172A", lineHeight: 1.2 }}>
                  {opt.label}
                </h4>
                <p style={{ fontSize: "0.75rem", color: "#475569", marginTop: "1px", fontWeight: 500, lineHeight: 1.25, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {opt.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          className="btn-genz-secondary"
          style={{ flex: 1, padding: "10px 12px", fontSize: "0.82rem", minHeight: "42px" }}
          onClick={onSkip}
        >
          Skip
        </button>
        <button
          className="btn-genz-primary"
          style={{ flex: 2, padding: "10px 12px", fontSize: "0.85rem", minHeight: "42px" }}
          onClick={onContinue}
        >
          Continue to Art Forms
        </button>
      </div>
    </div>
  );
};
