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
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", fontWeight: 900, marginBottom: "6px", color: "#0F172A", letterSpacing: "-0.03em" }}>
          How would you describe your current pace?
        </h2>
        <p style={{ color: "#64748B", fontSize: "0.95rem", fontWeight: 500 }}>
          This optional check-in customizes interface wording only. It is non-clinical.
        </p>
      </div>

      <div style={{ display: "grid", gap: "14px", marginBottom: "28px" }}>
        {CHECK_IN_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selectedCheckIn === opt.id;
          return (
            <div
              key={opt.id}
              className={`genz-card genz-card-interactive ${isSelected ? "selected" : ""}`}
              style={{ padding: "18px 20px", marginBottom: 0, display: "flex", alignItems: "center", gap: "16px" }}
              onClick={() => onSelectCheckIn(opt.id)}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "16px",
                  backgroundColor: isSelected ? "var(--color-accent-coral)" : "#F1F5F9",
                  color: isSelected ? "#FFFFFF" : "#0F172A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: isSelected ? "0 6px 16px rgba(255, 82, 59, 0.3)" : "none",
                }}
              >
                <Icon size={24} />
              </div>

              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A" }}>
                  {opt.label}
                </h4>
                <p style={{ fontSize: "0.88rem", color: "#475569", marginTop: "2px", fontWeight: 500 }}>
                  {opt.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: "14px" }}>
        <button className="btn-genz-secondary" style={{ flex: 1 }} onClick={onSkip}>
          Skip Check-in
        </button>
        <button className="btn-genz-primary" style={{ flex: 2 }} onClick={onContinue}>
          Continue to Art Forms
        </button>
      </div>
    </div>
  );
};
