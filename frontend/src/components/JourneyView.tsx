import React, { useState, useEffect } from "react";
import { Compass, Sparkles, Clock, Palette, Trash2, ArrowRight, ShieldCheck, HeartHandshake, CheckCircle2, RotateCcw, MessageSquare } from "lucide-react";
import { JourneyService, JourneySessionRecord, JourneyStats } from "../services/journeyService";
import { ChittakalaClient } from "../api/chittakalaClient";

interface JourneyViewProps {
  onStartActivity: (artFormId: string, categoryId?: string) => void;
}

export const JourneyView: React.FC<JourneyViewProps> = ({ onStartActivity }) => {
  const [history, setHistory] = useState<JourneySessionRecord[]>([]);
  const [stats, setStats] = useState<JourneyStats | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState<boolean>(false);

  // Reflection feedback rating states
  const [selectedRating, setSelectedRating] = useState<string | null>(null);
  const [selectedReason, setSelectedReason] = useState<string | undefined>(undefined);
  const [ratingSubmitted, setRatingSubmitted] = useState<boolean>(false);

  const loadData = () => {
    const records = JourneyService.getJourneyHistory();
    setHistory(records);
    setStats(JourneyService.computeJourneyStats());
  };

  const handleRatingSubmit = (rating: string, reasonTag?: string) => {
    const latestSession = history[0];
    const sessionId = latestSession ? latestSession.session_id : "sess_general";
    ChittakalaClient.submitReflectionRating(sessionId, rating, reasonTag).catch(() => {});
    setRatingSubmitted(true);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleClearHistory = () => {
    JourneyService.clearJourneyHistory();
    setShowClearConfirm(false);
    loadData();
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return "Recent";
    }
  };

  const formatFeel = (pre?: string, post?: string) => {
    if (!pre && !post) return null;
    const formatName = (val?: string) => {
      if (!val) return "";
      return val.replace(/_/g, " ").replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    };
    if (pre && post) {
      return `${formatName(pre)} → ${formatName(post)}`;
    }
    return formatName(post || pre);
  };

  return (
    <div className="tab-view" style={{ paddingBottom: "100px" }}>
      {/* Gen Z Hero Header */}
      <div className="genz-hero-card" style={{ padding: "28px 20px", marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, var(--color-accent-coral), #FF7A00)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              boxShadow: "0 6px 18px rgba(255, 82, 59, 0.3)",
              flexShrink: 0,
            }}
          >
            <Compass size={22} />
          </div>
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 900, color: "#0F172A", margin: 0 }}>
              My Creative Journey
            </h2>
            <span style={{ fontSize: "0.82rem", color: "#64748B", fontWeight: 600 }}>
              Your private, non-competitive art practice log
            </span>
          </div>
        </div>

        {stats && (
          <div
            style={{
              marginTop: "18px",
              background: "rgba(255, 255, 255, 0.85)",
              border: "1.5px solid #FFE4E0",
              borderRadius: "16px",
              padding: "14px 16px",
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <Sparkles size={18} color="var(--color-accent-coral)" style={{ flexShrink: 0, marginTop: "2px" }} />
            <p style={{ fontSize: "0.92rem", color: "#334155", fontWeight: 600, lineHeight: 1.55, margin: 0 }}>
              {stats.gentleReflection}
            </p>
          </div>
        )}
      </div>

      {/* Gentle Non-Competitive Stat Cards Grid */}
      {stats && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "24px" }}>
          {/* Card 1: Completed Sessions */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #E2E8F0",
              borderRadius: "18px",
              padding: "14px 10px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.03)",
            }}
          >
            <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--color-accent-coral)", fontFamily: "var(--font-heading)" }}>
              {stats.totalSessions}
            </div>
            <div style={{ fontSize: "0.74rem", color: "#64748B", fontWeight: 700, marginTop: "2px" }}>
              Practices Done
            </div>
          </div>

          {/* Card 2: Traditions Explored */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #E2E8F0",
              borderRadius: "18px",
              padding: "14px 10px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.03)",
            }}
          >
            <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#6366F1", fontFamily: "var(--font-heading)" }}>
              {stats.exploredArtForms.length}
            </div>
            <div style={{ fontSize: "0.74rem", color: "#64748B", fontWeight: 700, marginTop: "2px" }}>
              Traditions
            </div>
          </div>

          {/* Card 3: Creative Minutes */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #E2E8F0",
              borderRadius: "18px",
              padding: "14px 10px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.03)",
            }}
          >
            <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#10B981", fontFamily: "var(--font-heading)" }}>
              {stats.totalMinutes}m
            </div>
            <div style={{ fontSize: "0.74rem", color: "#64748B", fontWeight: 700, marginTop: "2px" }}>
              Peaceful Mins
            </div>
          </div>
        </div>
      )}

      {/* Gentle "Try Something Different" Suggestion Card */}
      {stats && stats.recommendation && (
        <div
          style={{
            background: "linear-gradient(135deg, #EEF2FF 0%, #FFFFFF 100%)",
            border: "2px solid #C7D2FE",
            borderRadius: "20px",
            padding: "18px",
            marginBottom: "24px",
            boxShadow: "0 6px 18px rgba(99, 102, 241, 0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <Palette size={18} color="#4338CA" />
            <span style={{ fontSize: "0.78rem", fontWeight: 900, color: "#4338CA", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Try Something Different
            </span>
          </div>

          <h3 style={{ fontSize: "1.08rem", fontWeight: 900, color: "#0F172A", marginBottom: "4px" }}>
            {stats.recommendation.title}
          </h3>

          <p style={{ fontSize: "0.86rem", color: "#475569", lineHeight: 1.5, fontWeight: 500, marginBottom: "14px" }}>
            {stats.recommendation.description}
          </p>

          <button
            type="button"
            className="btn-genz-primary"
            onClick={() => onStartActivity(stats.recommendation.art_form_id, stats.recommendation.category_id)}
            style={{
              padding: "10px 16px",
              fontSize: "0.86rem",
              background: "linear-gradient(135deg, #6366F1, #4338CA)",
              boxShadow: "0 4px 14px rgba(99, 102, 241, 0.3)",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>Explore This Tradition</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Recent Activity Timeline */}
      <div className="genz-card" style={{ marginBottom: "20px" }}>
        <h3 style={{ fontSize: "1.05rem", fontWeight: 900, color: "#0F172A", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
          <Clock size={18} color="var(--color-accent-coral)" /> Recent Activity History
        </h3>

        {history.length === 0 ? (
          <div style={{ textAlign: "center", padding: "24px 12px", background: "#F8FAFC", borderRadius: "16px", border: "1px dashed #CBD5E1" }}>
            <p style={{ fontSize: "0.9rem", color: "#64748B", fontWeight: 600, margin: 0 }}>
              No completed sessions recorded yet.
            </p>
            <p style={{ fontSize: "0.78rem", color: "#94A3B8", marginTop: "4px", margin: 0 }}>
              Complete your first 5-minute creative pause to see your history here!
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {history.map((record) => {
              const feelText = formatFeel(record.pre_check_in, record.post_check_in);
              return (
                <div
                  key={record.session_id}
                  style={{
                    background: "#F8FAFC",
                    border: "1.5px solid #E2E8F0",
                    borderRadius: "16px",
                    padding: "14px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        padding: "2px 8px",
                        borderRadius: "9999px",
                        background: "rgba(255, 82, 59, 0.1)",
                        color: "var(--color-accent-coral)",
                        textTransform: "uppercase",
                      }}
                    >
                      {record.art_form_title || record.art_form_id}
                    </span>
                    <span style={{ fontSize: "0.74rem", color: "#94A3B8", fontWeight: 600 }}>
                      {formatDate(record.completed_at)}
                    </span>
                  </div>

                  <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0F172A" }}>
                    {record.exercise_title}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.78rem", color: "#64748B", fontWeight: 500, marginTop: "2px" }}>
                    <span>⏱️ {Math.max(1, Math.round((record.duration_seconds || 300) / 60))} mins</span>
                    {feelText && (
                      <span style={{ color: "#6366F1", fontWeight: 700 }}>
                        Feel: {feelText}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Reflection Quality Feedback Loop Card (Only shown if user has completed sessions) */}
      {history.length > 0 && (
        <div
          style={{
            background: "#FFFFFF",
            border: "1.5px solid #E2E8F0",
            borderRadius: "20px",
            padding: "18px",
            marginBottom: "20px",
            boxShadow: "0 6px 18px rgba(15, 23, 42, 0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <MessageSquare size={18} color="var(--color-accent-coral)" />
            <h3 style={{ fontSize: "1.02rem", fontWeight: 900, color: "#0F172A", margin: 0 }}>
              AI Reflection Feedback
            </h3>
          </div>
          <p style={{ fontSize: "0.84rem", color: "#64748B", fontWeight: 500, marginBottom: "14px" }}>
            Were your recent Gemini AI reflections helpful and accurate for your art practice?
          </p>

          {!ratingSubmitted ? (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "12px" }}>
                {[
                  { id: "yes", label: "Yes 👍", color: "#10B981", bg: "#ECFDF5" },
                  { id: "somewhat", label: "Somewhat 🤔", color: "#D97706", bg: "#FFFBEB" },
                  { id: "no", label: "No 👎", color: "#EF4444", bg: "#FEF2F2" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setSelectedRating(opt.id);
                      if (opt.id === "yes") {
                        handleRatingSubmit("yes", undefined);
                      }
                    }}
                    style={{
                      padding: "10px",
                      borderRadius: "12px",
                      border: selectedRating === opt.id ? `2px solid ${opt.color}` : "1.5px solid #E2E8F0",
                      background: selectedRating === opt.id ? opt.bg : "#F8FAFC",
                      color: selectedRating === opt.id ? opt.color : "#334155",
                      fontWeight: 800,
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {(selectedRating === "somewhat" || selectedRating === "no") && (
                <div style={{ marginTop: "12px", background: "#F8FAFC", padding: "12px", borderRadius: "14px", border: "1px solid #E2E8F0" }}>
                  <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#475569", display: "block", marginBottom: "8px" }}>
                    What could be improved? (Optional)
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
                    {[
                      { id: "too_generic", label: "Too generic" },
                      { id: "incorrect_observation", label: "Incorrect observation" },
                      { id: "judgemental_writing", label: "Judgemental phrasing" },
                      { id: "took_too_long", label: "Took too long" },
                      { id: "technical_problem", label: "Technical problem" },
                    ].map((reason) => (
                      <button
                        key={reason.id}
                        type="button"
                        onClick={() => setSelectedReason(reason.id)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "9999px",
                          border: selectedReason === reason.id ? "1.5px solid var(--color-accent-coral)" : "1px solid #CBD5E1",
                          background: selectedReason === reason.id ? "#FFF5F3" : "#FFFFFF",
                          color: selectedReason === reason.id ? "var(--color-accent-coral)" : "#475569",
                          fontSize: "0.76rem",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        {reason.label}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="btn-genz-primary"
                    onClick={() => handleRatingSubmit(selectedRating, selectedReason)}
                    style={{ padding: "8px 14px", fontSize: "0.8rem", width: "100%" }}
                  >
                    Submit Feedback
                  </button>
                </div>
              )}
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#10B981", fontSize: "0.85rem", fontWeight: 800, background: "#ECFDF5", padding: "10px 14px", borderRadius: "12px" }}>
              <CheckCircle2 size={16} /> Thank you! Your feedback helps us continuously improve AI reflection quality.
            </div>
          )}
        </div>
      )}

      {/* Privacy Guarantee & History Teardown */}
      <div
        style={{
          background: "#FFFFFF",
          border: "1.5px solid #E2E8F0",
          borderRadius: "20px",
          padding: "16px",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", color: "#10B981", fontSize: "0.8rem", fontWeight: 800, marginBottom: "8px" }}>
          <ShieldCheck size={16} /> Privacy-Protected Metadata
        </div>
        <p style={{ fontSize: "0.78rem", color: "#64748B", lineHeight: 1.45, fontWeight: 500, marginBottom: "14px", margin: "0 0 14px 0" }}>
          Your history stores session timestamps only. Uploaded drawings are never stored in your browser journal.
        </p>

        {history.length > 0 && (
          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            style={{
              padding: "8px 14px",
              borderRadius: "9999px",
              background: "#FFF1F2",
              border: "1px solid #FECDD3",
              color: "#E11D48",
              fontSize: "0.8rem",
              fontWeight: 800,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Trash2 size={14} /> Clear Journey History
          </button>
        )}
      </div>

      {/* Clear History Confirmation Modal */}
      {showClearConfirm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "24px",
              padding: "24px",
              maxWidth: "340px",
              width: "100%",
              textAlign: "center",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ width: "48px", height: "48px", borderRadius: "16px", background: "#FFF1F2", display: "flex", alignItems: "center", justifyContent: "center", color: "#E11D48", margin: "0 auto 12px" }}>
              <Trash2 size={24} />
            </div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 900, color: "#0F172A", marginBottom: "8px" }}>
              Clear Journey History?
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.5, marginBottom: "20px", fontWeight: 500 }}>
              This will clear your local practice log. Your app settings will remain unchanged.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                style={{
                  padding: "10px",
                  borderRadius: "12px",
                  background: "#F1F5F9",
                  border: "none",
                  color: "#64748B",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClearHistory}
                style={{
                  padding: "10px",
                  borderRadius: "12px",
                  background: "#E11D48",
                  border: "none",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                }}
              >
                Clear History
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
