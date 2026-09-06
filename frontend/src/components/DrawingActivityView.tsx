import React, { useState, useEffect } from "react";
import { Camera, Upload, Timer, CheckCircle, ArrowLeft, Play, Pause, RotateCcw, Sparkles, Eye, Maximize2 } from "lucide-react";
import { Exercise } from "../api/chittakalaClient";
import { ImageLightboxModal } from "./ImageLightboxModal";

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
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

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

  const compressImageIfNeeded = (file: File): Promise<File> => {
    if (file.size <= 2 * 1024 * 1024) return Promise.resolve(file);

    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1600;
        const MAX_HEIGHT = 1600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(file);

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".jpg"), {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          "image/jpeg",
          0.85
        );
      };
      img.onerror = () => resolve(file);
    });
  };

  const handleSubmit = async () => {
    if (selectedFile && !isUploading) {
      setIsUploading(true);
      try {
        const fileToUpload = await compressImageIfNeeded(selectedFile);
        onUpload(fileToUpload);
      } catch (e) {
        onUpload(selectedFile);
      }
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const originalFile = e.target.files[0];
      try {
        const processedFile = await compressImageIfNeeded(originalFile);
        setSelectedFile(processedFile);
        setPreviewUrl(URL.createObjectURL(processedFile));
      } catch (err) {
        setSelectedFile(originalFile);
        setPreviewUrl(URL.createObjectURL(originalFile));
      }
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
          onClick={() => setIsLightboxOpen(true)}
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
            position: "relative",
            cursor: "pointer",
          }}
          title="Tap to Zoom Reference Image"
        >
          {/* Zoom Overlay Badge */}
          <div
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              background: "rgba(15, 23, 42, 0.75)",
              color: "#FFFFFF",
              borderRadius: "9999px",
              padding: "4px 8px",
              fontSize: "0.68rem",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              gap: "4px",
              backdropFilter: "blur(4px)",
            }}
          >
            <Maximize2 size={12} /> Zoom
          </div>

          <img
            src={exercise.reference_image_path}
            alt={exercise.title}
            style={{ width: "100%", height: "140px", objectFit: "contain", display: "block" }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src.endsWith(".png")) {
                target.src = target.src.replace(/\.png$/, ".svg");
              } else if (!target.src.includes("data:image/svg+xml")) {
                target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='140' viewBox='0 0 200 140'><rect width='200' height='140' fill='%23F8FAFC' rx='12'/><circle cx='100' cy='70' r='35' fill='none' stroke='%23FF523B' stroke-width='3' stroke-dasharray='6 6'/><circle cx='100' cy='70' r='6' fill='%23FF523B'/><circle cx='70' cy='70' r='5' fill='%236366F1'/><circle cx='130' cy='70' r='5' fill='%236366F1'/><circle cx='100' cy='40' r='5' fill='%236366F1'/><circle cx='100' cy='100' r='5' fill='%236366F1'/><text x='100' y='125' font-family='sans-serif' font-size='10' font-weight='bold' fill='%2364748B' text-anchor='middle'>CHITTAKALA PATTERN</text></svg>";
              }
            }}
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

        {/* Gen Z 5-Minute Timer Card (Responsive 2-Row Layout) */}
        <div
          style={{
            background: "#F8FAFC",
            padding: "14px 16px",
            borderRadius: "20px",
            border: "1.5px solid #E2E8F0",
            marginBottom: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {/* Header Row */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "rgba(255, 82, 59, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Timer size={20} color="var(--color-accent-coral)" />
            </div>
            <div>
              <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0F172A" }}>5-Min Timer</div>
              <div style={{ fontSize: "0.76rem", color: "#64748B", fontWeight: 500 }}>Optional focus pace for drawing</div>
            </div>
          </div>

          {/* Controls Row */}
          <div
            style={{
              background: "#FFFFFF",
              padding: "10px 16px",
              borderRadius: "14px",
              border: "1px solid #E2E8F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 2px 8px rgba(15, 23, 42, 0.03)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.6rem",
                fontWeight: 900,
                color: "var(--color-accent-coral)",
                letterSpacing: "0.02em",
              }}
            >
              {formatTimer(timerSeconds)}
            </span>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                onClick={() => setTimerActive(!timerActive)}
                style={{
                  height: "38px",
                  padding: "0 16px",
                  borderRadius: "9999px",
                  background: "var(--color-accent-coral)",
                  border: "none",
                  color: "#FFFFFF",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  boxShadow: "0 4px 12px rgba(255, 82, 59, 0.25)",
                }}
                aria-label="Toggle Timer"
              >
                {timerActive ? <Pause size={16} /> : <Play size={16} />}
                <span>{timerActive ? "Pause" : "Start"}</span>
              </button>
              <button
                onClick={() => {
                  setTimerSeconds(300);
                  setTimerActive(false);
                }}
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "9999px",
                  background: "#F1F5F9",
                  border: "none",
                  color: "#64748B",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
                aria-label="Reset Timer"
              >
                <RotateCcw size={16} />
              </button>
            </div>
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
            <button
              className="btn-genz-primary"
              onClick={handleSubmit}
              disabled={isUploading}
              style={{ opacity: isUploading ? 0.75 : 1, cursor: isUploading ? "wait" : "pointer" }}
            >
              {isUploading ? (
                <>
                  <Sparkles size={20} className="animate-spin" /> Analyzing Sketch with Gemini AI...
                </>
              ) : (
                <>
                  <Upload size={20} /> Submit Photograph for AI Reflection
                </>
              )}
            </button>
          )}

          {/* Option A: Secondary Action when AI is loading or for instant completion */}
          {isUploading ? (
            <div
              style={{
                textAlign: "center",
                marginTop: "4px",
                background: "linear-gradient(135deg, #FFF5F3 0%, #FFFFFF 100%)",
                border: "1.5px solid #FFE4E0",
                padding: "14px",
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(255, 82, 59, 0.06)",
              }}
            >
              <span style={{ fontSize: "0.82rem", color: "#64748B", fontWeight: 600, display: "block", marginBottom: "8px" }}>
                ⏱️ Taking a moment?
              </span>
              <button
                type="button"
                className="btn-genz-secondary"
                onClick={onFinishWithoutAI}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: "0.88rem",
                  fontWeight: 800,
                  color: "var(--color-accent-coral)",
                  borderColor: "var(--color-accent-coral)",
                }}
              >
                Complete Practice Without AI →
              </button>
            </div>
          ) : (
            <button className="btn-genz-secondary" onClick={onFinishWithoutAI}>
              Complete Practice Without AI
            </button>
          )}
        </div>
      </div>

      {/* Full-Screen Image Zoom Lightbox Modal */}
      <ImageLightboxModal
        isOpen={isLightboxOpen}
        imagePath={exercise.reference_image_path}
        title={exercise.title}
        artForm={exercise.art_form}
        difficulty={exercise.difficulty}
        onClose={() => setIsLightboxOpen(false)}
      />
    </div>
  );
};
