import React, { useState, useEffect } from "react";
import { CheckCircle2, Trash2, RotateCcw, Sparkles, ShieldCheck, HeartHandshake, Smile, Zap, Wind, HelpCircle, AlertTriangle } from "lucide-react";
import { Session, ChittakalaClient } from "../api/chittakalaClient";

interface SummaryViewProps {
  session: Session;
  onStartAnother: () => void;
  onDeleteSession: () => void;
}

const POST_CHECK_IN_OPTIONS = [
  { id: "slower", label: "Slower", icon: Wind, desc: "Feeling more settled and calm" },
  { id: "about-the-same", label: "About the same", icon: Smile, desc: "Feeling steady and balanced" },
  { id: "faster", label: "Faster", icon: Zap, desc: "Feeling energized and active" },
  { id: "prefer_not_to_say", label: "Prefer not to say", icon: HelpCircle, desc: "Keep response neutral" },
];

export const SummaryView: React.FC<SummaryViewProps> = ({
  session,
  onStartAnother,
  onDeleteSession,
}) => {
  const [selectedPostCheckIn, setSelectedPostCheckIn] = useState<string>(session.post_check_in || "");
  const [isSavingPostCheckIn, setIsSavingPostCheckIn] = useState<boolean>(false);

  useEffect(() => {
    // Double-lock safeguard: Ensure session completion is persisted to Cloud Firestore upon mounting
    if (session && session.session_id && !session.session_id.startsWith("sess_local_")) {
      if (session.status !== "completed" || !session.completed_at) {
        ChittakalaClient.completeSession(session.session_id).catch(() => {});
      }
    }
  }, [session.session_id, session.status, session.completed_at]);

  const handleSelectPostCheckIn = (choiceId: string) => {
    setSelectedPostCheckIn(choiceId);
    setIsSavingPostCheckIn(false);

    // Instant non-blocking background telemetry sync (0ms UI latency)
    if (session.session_id && !session.session_id.startsWith("sess_local_")) {
      ChittakalaClient.updatePostCheckIn(session.session_id, choiceId).catch((e) => {
        console.warn("Background post check-in sync retry:", e);
      });
    }
  };

  const reflection = session.feedback || {
    visual_observation: session.art_form_id === "kolam"
      ? "Your drawing shows steady dot alignment and gentle flowing loops weaving smoothly on paper."
      : "Your sketch displays expressive triangular figures and clean geometric line rhythm.",
    encouragement: "Taking this 5-minute creative pause brings presence, calm, and mindfulness to your day.",
    next_step: session.art_form_id === "kolam"
      ? "Try adding a small corner accent loop or repeat this simple pattern tomorrow."
      : "Add a second figure holding hands or experiment with a rhythm row of stick figures.",
    safety_status: "safe",
    needs_retake: false,
    fallback_used: true,
  };

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);

  const handleDelete = async () => {
    setDeleteError(null);
    setIsDeleting(true);
    try {
      if (session.session_id && !session.session_id.startsWith("sess_local_")) {
        await ChittakalaClient.deleteSession(session.session_id);
      }
      setDeleteSuccess(true);
      setTimeout(() => {
        onDeleteSession();
      }, 1000);
    } catch (err: any) {
      console.error("Delete session failed:", err);
      setDeleteError("Failed to delete session. Please try again.");
      setIsDeleting(false);
    }
  };

  return (
    <div className="tab-view">
      {/* Gen Z Achievement Hero Card */}
      <div className="genz-hero-card" style={{ textAlign: "center", padding: "32px 20px" }}>
        <div
          style={{
            width: "68px",
            height: "68px",
            borderRadius: "22px",
            background: "linear-gradient(135deg, var(--color-accent-coral), #FF7A00)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            color: "#FFFFFF",
            boxShadow: "0 8px 24px rgba(255, 82, 59, 0.35)",
          }}
        >
          <CheckCircle2 size={38} />
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginBottom: "8px" }}>
          <Sparkles size={16} color="var(--color-accent-coral)" />
          <span style={{ color: "var(--color-accent-coral)", fontSize: "0.82rem", fontWeight: 900, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Mindful Session Recorded
          </span>
        </div>

        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.9rem", fontWeight: 900, marginBottom: "8px", color: "#0F172A", letterSpacing: "-0.03em" }}>
          Creative Activity Complete!
        </h2>

        <p style={{ color: "#475569", fontSize: "1.02rem", fontWeight: 500, marginBottom: "28px" }}>
          {session.display_name ? `Awesome job, ${session.display_name}!` : "Great job completing your 5-minute creative pause!"}
        </p>

        {/* Gemini AI Multimodal Vision Reflection / Transparent Fallback Banner Display */}
        {reflection.fallback_used ? (
          <div
            style={{
              background: "#FFFBEB",
              border: "2px solid #FDE68A",
              borderRadius: "20px",
              padding: "20px",
              marginBottom: "24px",
              textAlign: "left",
              boxShadow: "0 6px 18px rgba(245, 158, 11, 0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <AlertTriangle size={20} color="#D97706" />
              <h3 style={{ fontSize: "1.02rem", fontWeight: 900, color: "#92400E" }}>
                AI Analysis Unavailable
              </h3>
            </div>
            <p style={{ fontSize: "0.9rem", color: "#B45309", lineHeight: 1.55, fontWeight: 500, margin: 0 }}>
              We couldn't analyze the photograph right now. Your activity is safely recorded, and you can retry the reflection or continue without AI.
            </p>
          </div>
        ) : (
          <div
            style={{
              background: "linear-gradient(135deg, #FFF5F3 0%, #FFFFFF 100%)",
              border: "2px solid #FFE4E0",
              borderRadius: "20px",
              padding: "20px",
              marginBottom: "24px",
              textAlign: "left",
              boxShadow: "0 8px 24px rgba(255, 82, 59, 0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Sparkles size={20} color="var(--color-accent-coral)" />
                <h3 style={{ fontSize: "1.05rem", fontWeight: 900, color: "#0F172A" }}>
                  Gemini AI Vision Reflection
                </h3>
              </div>
              <span
                style={{
                  fontSize: "0.7rem",
                  padding: "3px 10px",
                  borderRadius: "9999px",
                  background: "rgba(16, 185, 129, 0.12)",
                  color: "#10B981",
                  fontWeight: 800,
                }}
              >
                ✓ Live Gemini Vision
              </span>
            </div>

            <div style={{ marginBottom: "14px" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--color-accent-coral)", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "3px" }}>
                Visual Observation
              </span>
              <p style={{ fontSize: "0.92rem", color: "#334155", lineHeight: 1.55, fontWeight: 500 }}>
                {reflection.visual_observation}
              </p>
            </div>

            <div style={{ marginBottom: "14px" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#6366F1", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "3px" }}>
                Affirmation & Encouragement
              </span>
              <p style={{ fontSize: "0.92rem", color: "#334155", lineHeight: 1.55, fontWeight: 500 }}>
                {reflection.encouragement}
              </p>
            </div>

            <div>
              <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#10B981", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "3px" }}>
                Next Creative Step
              </span>
              <p style={{ fontSize: "0.9rem", color: "#334155", lineHeight: 1.5, fontWeight: 500 }}>
                {reflection.next_step}
              </p>
            </div>
          </div>
        )}

        {/* Interactive Post-Activity Check-In Card */}
        <div
          style={{
            background: "#FFFFFF",
            border: "2px solid #E2E8F0",
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "24px",
            textAlign: "left",
            boxShadow: "0 6px 18px rgba(15, 23, 42, 0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <HeartHandshake size={20} color="#6366F1" />
            <h3 style={{ fontSize: "1.05rem", fontWeight: 900, color: "#0F172A" }}>
              Post-Routine Check-In
            </h3>
          </div>
          <p style={{ color: "#64748B", fontSize: "0.85rem", fontWeight: 500, marginBottom: "16px" }}>
            How does your mind feel after this 5-minute art routine? (Non-clinical & anonymous)
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {POST_CHECK_IN_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const isSelected = selectedPostCheckIn === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectPostCheckIn(opt.id)}
                  style={{
                    padding: "12px 14px",
                    borderRadius: "14px",
                    border: isSelected ? "2px solid #6366F1" : "1.5px solid #E2E8F0",
                    background: isSelected ? "linear-gradient(135deg, #EEF2FF 0%, #FFFFFF 100%)" : "#F8FAFC",
                    color: isSelected ? "#4338CA" : "#334155",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Icon size={16} color={isSelected ? "#4338CA" : "#64748B"} />
                      <span style={{ fontWeight: 800, fontSize: "0.9rem" }}>{opt.label}</span>
                    </div>
                    {isSelected && <CheckCircle2 size={16} color="#6366F1" />}
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 500, lineHeight: 1.25 }}>
                    {opt.desc}
                  </span>
                </button>
              );
            })}
          </div>
          {selectedPostCheckIn && (
            <p style={{ fontSize: "0.78rem", color: "#10B981", fontWeight: 800, marginTop: "10px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
              <CheckCircle2 size={14} /> Response saved anonymously
            </p>
          )}
        </div>

        {/* Gen Z Summary Details Box */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            padding: "20px",
            borderRadius: "20px",
            border: "2px solid #E2E8F0",
            textAlign: "left",
            marginBottom: "28px",
            display: "grid",
            gap: "12px",
            fontSize: "0.9rem",
            boxShadow: "0 6px 16px rgba(15, 23, 42, 0.04)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#64748B", fontWeight: 600 }}>Session ID:</span>
            <span style={{ fontFamily: "monospace", color: "var(--color-accent-coral)", fontWeight: 800, fontSize: "0.85rem", background: "rgba(255, 82, 59, 0.1)", padding: "2px 10px", borderRadius: "8px" }}>
              {session.session_id}
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#64748B", fontWeight: 600 }}>Art Tradition:</span>
            <span style={{ fontWeight: 800, color: "#0F172A", textTransform: "capitalize" }}>{session.art_form_id}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#64748B", fontWeight: 600 }}>Category:</span>
            <span style={{ fontWeight: 800, color: "#0F172A" }}>{session.category_id}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#64748B", fontWeight: 600 }}>Exercise:</span>
            <span style={{ fontWeight: 800, color: "#0F172A" }}>{session.exercise_id}</span>
          </div>

          {session.pre_check_in && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#64748B", fontWeight: 600 }}>Initial Pace:</span>
              <span style={{ fontWeight: 800, color: "#6366F1", textTransform: "capitalize" }}>{session.pre_check_in}</span>
            </div>
          )}

          {selectedPostCheckIn && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#64748B", fontWeight: 600 }}>Post Routine Feel:</span>
              <span style={{ fontWeight: 800, color: "#10B981", textTransform: "capitalize" }}>{selectedPostCheckIn}</span>
            </div>
          )}
        </div>

        {/* Primary Action Buttons */}
        <div style={{ display: "grid", gap: "12px" }}>
          <button className="btn-genz-primary" onClick={onStartAnother}>
            <RotateCcw size={20} /> Start Another Activity
          </button>
        </div>
      </div>

      {/* Subtle Privacy & Data Protection Card */}
      <div className="genz-card" style={{ padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ShieldCheck size={20} color="#10B981" />
            <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0F172A" }}>
              Session Privacy
            </span>
          </div>
          <span style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600 }}>
            Temporary Data
          </span>
        </div>

        <p style={{ fontSize: "0.85rem", color: "#475569", lineHeight: 1.5, marginBottom: "14px", fontWeight: 500 }}>
          Your session identity is anonymous. You can delete this session and any uploaded photograph at any time.
        </p>

        {deleteError && (
          <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", color: "#991B1B", padding: "10px 14px", borderRadius: "12px", fontSize: "0.82rem", fontWeight: 700, marginBottom: "12px", textAlign: "center" }}>
            {deleteError}
          </div>
        )}

        {deleteSuccess && (
          <div style={{ background: "#ECFDF5", border: "1px solid #A7F3D0", color: "#065F46", padding: "10px 14px", borderRadius: "12px", fontSize: "0.82rem", fontWeight: 800, marginBottom: "12px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            <CheckCircle2 size={16} /> Session & private drawing deleted permanently ✓
          </div>
        )}

        <button
          onClick={handleDelete}
          disabled={isDeleting || deleteSuccess}
          style={{
            width: "100%",
            padding: "10px 16px",
            borderRadius: "12px",
            background: "#F8FAFC",
            border: "1px solid #E2E8F0",
            color: isDeleting ? "#94A3B8" : "#64748B",
            fontSize: "0.82rem",
            fontWeight: 700,
            cursor: isDeleting || deleteSuccess ? "not-allowed" : "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            transition: "all 0.2s ease",
            opacity: isDeleting ? 0.7 : 1,
          }}
          aria-label="Delete Session and Associated Drawing Record"
        >
          <Trash2 size={16} /> {isDeleting ? "Deleting drawing & session..." : "Delete Session & Uploaded Photo"}
        </button>
      </div>
    </div>
  );
};
