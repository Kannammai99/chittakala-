import React, { useState, useEffect } from "react";
import { Camera, Upload, Timer, CheckCircle, ArrowLeft, Play, Pause, RotateCcw, Sparkles, Eye } from "lucide-react";
import { Exercise } from "../api/chittakalaClient";

interface DrawingActivityViewProps {
  exercise: Exercise;
  onUpload: (file: File) => void;
  onFinishWithoutAI: () => void;
  onBack: () => void;
}

export const DrawingActivityView: React.FC<DrawingActivityViewProps> = ({
  exercise,
  onUpload,
  onFinishWithoutAI,
  onBack,
}) => {
  const [timerSeconds, setTimerSeconds] = useState<number>(300); // 5 minutes
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    let interval: any = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="tab-view">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
        <button
          className="btn-genz-secondary"
          onClick={onBack}
          style={{ width: "44px", height: "44px", padding: 0, minWidth: "44px", borderRadius: "9999px" }}
          aria-label="Back to Examples"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.6rem", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.03em" }}>
            {exercise.title}
          </h2>
          <span style={{ fontSize: "0.85rem", color: "var(--color-accent-coral)", fontWeight: 800 }}>
            5-Minute Pen & Paper Routine
          </span>
        </div>
      </div>

      {/* SVG Reference Display Card for Active Drawing */}
      <div className="genz-card" style={{ marginBottom: "20px", textAlign: "center", padding: "20px" }}>
        <div style={{ fontSize: "0.78rem", color: "var(--color-accent-coral)", fontWeight: 900, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
          <Eye size={16} /> Reference Artwork to Draw on Paper
        </div>
        
        <div
          style={{
            width: "100%",
            maxWidth: "260px",
            height: "190px",
            margin: "0 auto",
            borderRadius: "16px",
            backgroundColor: "#F8FAFC",
            border: "2px solid #E2E8F0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px",
            overflow: "hidden",
          }}
        >
          <img
            src={exercise.reference_image_path}
            alt={exercise.title}
            style={{ width: "100%", height: "140px", objectFit: "contain", display: "block" }}
          />
          <span style={{ fontSize: "0.72rem", color: "var(--color-accent-coral)", marginTop: "6px", fontWeight: 800, padding: "2px 10px", borderRadius: "9999px", background: "rgba(255, 82, 59, 0.1)" }}>
            {exercise.art_form.toUpperCase()} • {exercise.difficulty.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Guidance Card */}
      <div className="genz-card" style={{ marginBottom: "20px" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 900, color: "#0F172A", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
          <Sparkles size={18} color="var(--color-accent-coral)" /> Drawing Guidance:
        </h3>
        <ol style={{ paddingLeft: "20px", fontSize: "0.95rem", color: "#334155", lineHeight: 1.7, marginBottom: "20px", fontWeight: 500 }}>
          {exercise.drawing_guidance.map((step, idx) => (
            <li key={idx} style={{ marginBottom: "8px" }}>{step}</li>
          ))}
        </ol>

        {/* Gen Z 5-Minute Timer Card */}
        <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "20px", border: "1.5px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(255, 82, 59, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Timer size={20} color="var(--color-accent-coral)" />
            </div>
            <div>
              <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0F172A" }}>5-Min Timer</div>
              <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 500 }}>Optional focus pace</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 900, color: "var(--color-accent-coral)" }}>
              {formatTimer(timerSeconds)}
            </span>
            <button
              onClick={() => setTimerActive(!timerActive)}
              style={{ width: "36px", height: "36px", borderRadius: "9999px", background: "var(--color-accent-coral)", border: "none", color: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              aria-label="Toggle Timer"
            >
              {timerActive ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button
              onClick={() => { setTimerSeconds(300); setTimerActive(false); }}
              style={{ width: "36px", height: "36px", borderRadius: "9999px", background: "#F1F5F9", border: "none", color: "#64748B", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              aria-label="Reset Timer"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Gen Z Camera & Photo Capture Tile Card */}
      <div className="genz-card">
        <h3 style={{ fontSize: "1.1rem", fontWeight: 900, color: "#0F172A", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
          <Camera size={20} color="var(--color-accent-coral)" /> Photo Capture & Reflection
        </h3>

        <input
          type="file"
          id="drawing-file-input"
          accept="image/jpeg,image/png"
          capture="environment"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {!selectedFile ? (
          <label
            htmlFor="drawing-file-input"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "32px 20px",
              background: "#F8FAFC",
              border: "2px dashed #CBD5E1",
              borderRadius: "20px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <div style={{ width: "56px", height: "56px", borderRadius: "18px", background: "linear-gradient(135deg, var(--color-accent-coral), #FF7A00)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", marginBottom: "12px", boxShadow: "0 6px 16px rgba(255, 82, 59, 0.3)" }}>
              <Camera size={28} />
            </div>
            <span style={{ fontSize: "1rem", fontWeight: 800, color: "#0F172A" }}>
              Take Photo / Choose Image
            </span>
            <span style={{ fontSize: "0.8rem", color: "#64748B", marginTop: "4px", fontWeight: 500 }}>
              Supports JPEG / PNG (Max 5 MB)
            </span>
          </label>
        ) : (
          <div style={{ background: "#FFF5F3", border: "2px solid #FFE4E0", padding: "16px", borderRadius: "20px", marginBottom: "20px", textAlign: "center" }}>
            {previewUrl && (
              <img src={previewUrl} alt="Drawing Preview" style={{ width: "100%", maxHeight: "200px", objectFit: "contain", borderRadius: "12px", marginBottom: "12px" }} />
            )}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "var(--color-accent-coral)", fontWeight: 800, fontSize: "0.9rem", marginBottom: "12px" }}>
              <CheckCircle size={18} /> {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
            </div>
            <label htmlFor="drawing-file-input" style={{ fontSize: "0.82rem", color: "#64748B", fontWeight: 700, textDecoration: "underline", cursor: "pointer" }}>
              Choose a Different Photo
            </label>
          </div>
        )}

        {/* Gen Z Action Buttons */}
        <div style={{ display: "grid", gap: "12px" }}>
          {selectedFile && (
            <button className="btn-genz-primary" onClick={() => onUpload(selectedFile)}>
              <Upload size={20} /> Submit Photograph for AI Reflection
            </button>
          )}

          <button className="btn-genz-secondary" onClick={onFinishWithoutAI}>
            Complete Practice Without AI
          </button>
        </div>
      </div>
    </div>
  );
};
