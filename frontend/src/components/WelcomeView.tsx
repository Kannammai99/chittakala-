import React from "react";
import { ArrowRight, ShieldCheck, Palette } from "lucide-react";

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
    <div className="tab-view">
      {/* Concept 1 Visual Storytelling Hero Card */}
      <div
        style={{
          borderRadius: "24px",
          overflow: "hidden",
          border: "2px solid #FFE4E0",
          boxShadow: "0 12px 32px rgba(255, 82, 59, 0.12)",
          marginBottom: "24px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <img
          src="/hero_concept1.jpg"
          alt="Creative Reset — Fading from Screen to Indian Art Creation"
          style={{ width: "100%", height: "210px", objectFit: "cover", display: "block" }}
        />
        <div style={{ padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
            <span className="pulse-badge"></span>
            <span style={{ color: "var(--color-accent-coral)", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Creative Reset
            </span>
          </div>

          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.9rem", fontWeight: 900, marginBottom: "10px", lineHeight: 1.2, color: "#0F172A", letterSpacing: "-0.03em" }}>
            Pause the scroll.<br />
            <span style={{ background: "linear-gradient(135deg, #FF523B, #FF7A00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Create your moment.
            </span>
          </h2>

          <p style={{ color: "#475569", fontSize: "0.98rem", fontWeight: 500, lineHeight: 1.6, marginBottom: "20px" }}>
            Ditch passive screen scrolling for 5 minutes. Chittakala helps you tune into real-life creation with pen, paper, and authentic Indian folk art.
          </p>

          {/* Optional Name Field */}
          <div style={{ marginBottom: "20px" }}>
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
            <span style={{ fontSize: "0.78rem", color: "#64748B", display: "block", marginTop: "-10px", fontWeight: 500 }}>
              Stored locally on your device; never sent to analytics or AI models.
            </span>
          </div>

          <button className="btn-genz-primary" onClick={onStart} aria-label="Start Creative Pause">
            Start Creative Pause <ArrowRight size={22} />
          </button>
        </div>
      </div>

      {/* Non-Clinical & Privacy Card */}
      <div className="genz-card" style={{ padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "14px", background: "rgba(245, 158, 11, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <ShieldCheck size={26} color="var(--color-accent-gold)" />
          </div>
          <div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 800, marginBottom: "4px", color: "#0F172A" }}>
              Non-Clinical & Judgement-Free
            </h4>
            <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.5, fontWeight: 500 }}>
              Focus on creative expression over perfection. Chittakala guides accessible art routines without grading skill or diagnosing mental health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
