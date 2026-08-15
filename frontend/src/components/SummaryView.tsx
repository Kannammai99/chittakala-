import React from "react";
import { CheckCircle2, Trash2, RotateCcw } from "lucide-react";
import { Session } from "../api/chittakalaClient";

interface SummaryViewProps {
  session: Session;
  onStartAnother: () => void;
  onDeleteSession: () => void;
}

export const SummaryView: React.FC<SummaryViewProps> = ({
  session,
  onStartAnother,
  onDeleteSession,
}) => {
  return (
    <div className="tab-view">
      <div className="card-container" style={{ textAlign: "center", padding: "28px 16px" }}>
        <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(6, 182, 212, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <CheckCircle2 size={36} color="var(--color-accent-cyan)" />
        </div>

        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.6rem", fontWeight: 800, marginBottom: "8px" }}>
          Creative Activity Complete!
        </h2>

        <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", marginBottom: "20px" }}>
          {session.display_name ? `Great job, ${session.display_name}!` : "Great job completing your creative break!"}
        </p>

        {/* Summary Details Box */}
        <div style={{ background: "var(--color-bg-dark)", padding: "16px", borderRadius: "12px", textAlign: "left", marginBottom: "24px", display: "grid", gap: "8px", fontSize: "0.85rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--color-text-muted)" }}>Session ID:</span>
            <span style={{ fontFamily: "monospace", color: "var(--color-accent-cyan)" }}>{session.session_id}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--color-text-muted)" }}>Art Form:</span>
            <span style={{ fontWeight: 600, textTransform: "capitalize" }}>{session.art_form_id}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--color-text-muted)" }}>Category:</span>
            <span style={{ fontWeight: 600 }}>{session.category_id}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--color-text-muted)" }}>Exercise ID:</span>
            <span style={{ fontWeight: 600 }}>{session.exercise_id}</span>
          </div>
          {session.pre_check_in && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--color-text-muted)" }}>Pace at Start:</span>
              <span style={{ fontWeight: 600 }}>{session.pre_check_in}</span>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div style={{ display: "grid", gap: "12px" }}>
          <button className="btn-primary" onClick={onStartAnother}>
            <RotateCcw size={18} /> Start Another Activity
          </button>

          <button
            className="btn-secondary"
            onClick={onDeleteSession}
            style={{ color: "#EF4444", borderColor: "rgba(239, 68, 68, 0.3)" }}
            aria-label="Delete Session and Associated Drawing Record"
          >
            <Trash2 size={18} /> Delete Session & Remove Image Data
          </button>
        </div>
      </div>
    </div>
  );
};
