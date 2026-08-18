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
    <div className="tab-view">
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.45rem", fontWeight: 900, marginBottom: "6px", color: "#0F172A", letterSpacing: "-0.02em", lineHeight: 1.25 }}>
          How would you describe your current pace?
        </h2>
        <p style={{ color: "#64748B", fontSize: "0.88rem", fontWeight: 500, lineHeight: 1.4 }}>
          This optional check-in customizes interface wording only. It is non-clinical.
        </p>
      </div>

      <div style={{ display: "grid", gap: "12px", marginBottom: "24px" }}>
        {CHECK_IN_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selectedCheckIn === opt.id;
          return (
            <div
              key={opt.id}
              className={`genz-card genz-card-interactive ${isSelected ? "selected" : ""}`}
              style={{
                padding: "14px 16px",
                marginBottom: 0,
                display: "flex",
                alignItems: "center",
                gap: "14px",
                borderRadius: "18px",
                boxSizing: "border-box",
                width: "100%",
              }}
              onClick={() => onSelectCheckIn(opt.id)}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  backgroundColor: isSelected ? "var(--color-accent-coral)" : "#F1F5F9",
                  color: isSelected ? "#FFFFFF" : "#0F172A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: isSelected ? "0 6px 16px rgba(255, 82, 59, 0.3)" : "none",
                }}
              >
                <Icon size={20} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "#0F172A", lineHeight: 1.2 }}>
                  {opt.label}
                </h4>
                <p style={{ fontSize: "0.82rem", color: "#475569", marginTop: "2px", fontWeight: 500, lineHeight: 1.35 }}>
                  {opt.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        <button
          className="btn-genz-secondary"
          style={{ flex: 1, padding: "14px 16px", fontSize: "0.9rem", minHeight: "48px" }}
          onClick={onSkip}
        >
          Skip Check-in
        </button>
        <button
          className="btn-genz-primary"
          style={{ flex: 2, padding: "14px 16px", fontSize: "0.92rem", minHeight: "48px" }}
          onClick={onContinue}
        >
          Continue to Art Forms
        </button>
      </div>
    </div>
  );
};
