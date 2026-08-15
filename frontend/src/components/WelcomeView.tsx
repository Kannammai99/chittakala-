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
      {/* Gen Z Vibrant Hero Banner Card */}
      <div className="genz-hero-card">
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <span className="pulse-badge"></span>
          <span style={{ color: "var(--color-accent-coral)", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            A 5-Minute Creative Reset
          </span>
        </div>

        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2.1rem", fontWeight: 900, marginBottom: "14px", lineHeight: 1.2, color: "#0F172A", letterSpacing: "-0.03em" }}>
          Pause the scroll.<br />
          <span style={{ background: "linear-gradient(135deg, #FF523B, #FF7A00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Create your moment.
          </span>
        </h2>

        <p style={{ color: "#475569", fontSize: "1.02rem", fontWeight: 500, marginBottom: "28px", lineHeight: 1.6 }}>
          Ditch passive scrolling for 5 minutes. Chittakala helps you tune into real-life creation with pen, paper, and authentic Indian folk art.
        </p>

        {/* Optional Pseudonym Field */}
        <div style={{ marginBottom: "24px" }}>
          <label style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0F172A", display: "flex", alignItems: "center", gap: "8px" }}>
            <Palette size={18} color="var(--color-accent-coral)" />
            What should Chittakala call you? (Optional Pseudonym)
          </label>
          <input
            type="text"
            className="genz-input-field"
            placeholder="e.g. Kanna or ArtExplorer"
            maxLength={20}
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <span style={{ fontSize: "0.8rem", color: "#64748B", display: "block", marginTop: "-10px", fontWeight: 500 }}>
            Stored locally with your session; never sent to analytics or AI models.
          </span>
        </div>

        <button className="btn-genz-primary" onClick={onStart} aria-label="Start Creative Pause">
          Start Creative Pause <ArrowRight size={22} />
        </button>
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
