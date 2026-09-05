import React from "react";
import { ArrowRight, ShieldCheck, Palette, Sparkles } from "lucide-react";
import { MindfulReminderWidget } from "./MindfulReminderWidget";

interface WelcomeViewProps {
  displayName: string;
  setDisplayName: (val: string) => void;
  onStart: () => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({
  displayName,
  setDisplayName,
  onStart,
}) => {
  return (
    <div className="tab-view" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <MindfulReminderWidget />
      {/* Concept 1 Visual Storytelling Hero Card (Natural Height) */}
      <div
        style={{
          borderRadius: "24px",
          overflow: "hidden",
          border: "2px solid #FFE4E0",
          boxShadow: "0 12px 32px rgba(255, 82, 59, 0.12)",
          backgroundColor: "#FFFFFF",
        }}
      >
        <img
          src="/hero_concept1.jpg"
          alt="Creative Reset — Fading from Screen to Indian Art Creation"
          style={{ width: "100%", height: "185px", objectFit: "cover", display: "block" }}
        />
        <div style={{ padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
            <span className="pulse-badge"></span>
            <span style={{ color: "var(--color-accent-coral)", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Creative Reset
            </span>
          </div>

          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.85rem", fontWeight: 900, marginBottom: "10px", lineHeight: 1.2, color: "#0F172A", letterSpacing: "-0.03em" }}>
            Pause the scroll.<br />
            <span style={{ background: "linear-gradient(135deg, #FF523B, #FF7A00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Create your moment.
            </span>
          </h2>

          <p style={{ color: "#475569", fontSize: "0.95rem", fontWeight: 500, lineHeight: 1.55, marginBottom: "18px" }}>
            Ditch passive screen scrolling for 5 minutes. Chittakala helps you tune into real-life creation with pen, paper, and authentic Indian folk art.
          </p>

          {/* Optional Name Field */}
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0F172A", display: "flex", alignItems: "center", gap: "8px" }}>
              <Palette size={18} color="var(--color-accent-coral)" />
              What is your name? (Optional)
            </label>
            <input
              type="text"
              className="genz-input-field"
              placeholder="e.g. Kanna or Ananya"
              maxLength={20}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>

          <button className="btn-genz-primary" onClick={onStart} aria-label="Start Creative Pause">
            Start Creative Pause <ArrowRight size={22} />
          </button>
        </div>
      </div>

      {/* 2 Quick Highlight Feature Pills Below Card */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <div
          style={{
            background: "#FFFFFF",
            border: "1.5px solid #E2E8F0",
            borderRadius: "16px",
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.04)",
          }}
        >
          <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "rgba(255, 82, 59, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Sparkles size={16} color="var(--color-accent-coral)" />
          </div>
          <div>
            <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0F172A" }}>Folk Art Traditions</div>
            <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 600 }}>Warli • Kolam • Madhubani • Gond</div>
          </div>
        </div>

        <div
          style={{
            background: "#FFFFFF",
            border: "1.5px solid #E2E8F0",
            borderRadius: "16px",
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.04)",
          }}
        >
          <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "rgba(245, 158, 11, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <ShieldCheck size={16} color="var(--color-accent-gold)" />
          </div>
          <div>
            <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0F172A" }}>Non-Clinical Space</div>
            <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 600 }}>Zero grading & evaluation</div>
          </div>
        </div>
      </div>
    </div>
  );
};
