import React, { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Play, Eye, Maximize2 } from "lucide-react";
import { Exercise } from "../api/chittakalaClient";
import { ImageLightboxModal } from "./ImageLightboxModal";

interface ExampleCarouselViewProps {
  categoryTitle: string;
  exercises: Exercise[];
  onSelectExercise: (exercise: Exercise) => void;
  onBack: () => void;
}

export const ExampleCarouselView: React.FC<ExampleCarouselViewProps> = ({
  categoryTitle,
  exercises,
  onSelectExercise,
  onBack,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  if (!exercises || exercises.length === 0) {
    return (
      <div className="tab-view">
        <p style={{ color: "var(--color-text-muted)" }}>Loading category exercises...</p>
      </div>
    );
  }

  const currentExercise = exercises[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === exercises.length - 1;

  const handlePrev = () => {
    if (!isFirst) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (!isLast) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="tab-view">
      {/* Navigation Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
        <button
          className="btn-genz-secondary"
          onClick={onBack}
          style={{ width: "38px", height: "38px", padding: 0, minWidth: "38px", borderRadius: "9999px", flexShrink: 0 }}
          aria-label="Back to Categories"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            {categoryTitle}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span className="pulse-badge"></span>
            <span style={{ fontSize: "0.8rem", color: "var(--color-accent-coral)", fontWeight: 800 }}>
              Example {currentIndex + 1} of {exercises.length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Gen Z Card */}
      <div className="genz-card" style={{ textAlign: "center", padding: "20px 16px" }}>
        {/* Real SVG Reference Artwork Image Rendering with Lightbox Trigger */}
        <div
          onClick={() => setIsLightboxOpen(true)}
          style={{
            width: "100%",
            maxWidth: "260px",
            height: "175px",
            margin: "0 auto 16px",
            borderRadius: "16px",
            backgroundColor: "#F8FAFC",
            border: "1.5px solid #E2E8F0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.04)",
            position: "relative",
            cursor: "pointer",
          }}
          title="Tap to Zoom Image"
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
            src={currentExercise.reference_image_path}
            alt={currentExercise.title}
            style={{ width: "100%", height: "120px", objectFit: "contain", display: "block" }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src.endsWith(".png")) {
                target.src = target.src.replace(/\.png$/, ".svg");
              } else if (!target.src.includes("data:image/svg+xml")) {
                target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='120' viewBox='0 0 200 120'><rect width='200' height='120' fill='%23F8FAFC' rx='12'/><circle cx='100' cy='60' r='30' fill='none' stroke='%23FF523B' stroke-width='3' stroke-dasharray='5 5'/><circle cx='100' cy='60' r='5' fill='%23FF523B'/><circle cx='75' cy='60' r='4' fill='%236366F1'/><circle cx='125' cy='60' r='4' fill='%236366F1'/><circle cx='100' cy='35' r='4' fill='%236366F1'/><circle cx='100' cy='85' r='4' fill='%236366F1'/><text x='100' y='108' font-family='sans-serif' font-size='9' font-weight='bold' fill='%2364748B' text-anchor='middle'>CHITTAKALA PATTERN</text></svg>";
              }
            }}
          />
          <span style={{ fontSize: "0.7rem", color: "var(--color-accent-coral)", marginTop: "6px", fontWeight: 800, padding: "2px 10px", borderRadius: "9999px", background: "rgba(255, 82, 59, 0.1)" }}>
            {currentExercise.art_form.toUpperCase()} • {currentExercise.difficulty.toUpperCase()}
          </span>
        </div>

        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.28rem", fontWeight: 900, color: "#0F172A", marginBottom: "6px", lineHeight: 1.25 }}>
          {currentExercise.title}
        </h3>

        <p style={{ color: "#334155", fontSize: "0.88rem", lineHeight: 1.5, marginBottom: "16px", fontWeight: 500 }}>
          {currentExercise.short_description}
        </p>

        {/* Geometric Breakdown */}
        <div style={{ textAlign: "left", backgroundColor: "#F8FAFC", padding: "12px 14px", borderRadius: "14px", border: "1px solid #E2E8F0", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", fontWeight: 900, color: "#0F172A", marginBottom: "6px" }}>
            <Eye size={16} color="var(--color-accent-coral)" style={{ flexShrink: 0 }} /> Visible Pattern Elements:
          </div>
          <ul style={{ paddingLeft: "18px", fontSize: "0.84rem", color: "#475569", lineHeight: 1.5, fontWeight: 500, margin: 0 }}>
            {currentExercise.visible_elements.map((elem, idx) => (
              <li key={idx}>{elem}</li>
            ))}
          </ul>
        </div>

        {/* Carousel Navigation & Action Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}>
          <button
            className="btn-genz-secondary"
            onClick={handlePrev}
            disabled={isFirst}
            style={{
              flex: "1 1 0%",
              opacity: isFirst ? 0.35 : 1,
              padding: "10px 8px",
              fontSize: "0.8rem",
              borderRadius: "9999px",
              whiteSpace: "nowrap",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}
            aria-label="Previous Example"
          >
            <ChevronLeft size={16} /> Prev
          </button>

          <button
            className="btn-genz-primary"
            style={{
              flex: "1.6 1 0%",
              padding: "10px 10px",
              fontSize: "0.82rem",
              fontWeight: 800,
              borderRadius: "9999px",
              whiteSpace: "nowrap",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}
            onClick={() => onSelectExercise(currentExercise)}
            aria-label="Try This Example"
          >
            <Play size={16} /> Try Example
          </button>

          <button
            className="btn-genz-secondary"
            onClick={handleNext}
            disabled={isLast}
            style={{
              flex: "1 1 0%",
              opacity: isLast ? 0.35 : 1,
              padding: "10px 8px",
              fontSize: "0.8rem",
              borderRadius: "9999px",
              whiteSpace: "nowrap",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}
            aria-label="Next Example"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Full-Screen Image Zoom Lightbox Modal */}
      <ImageLightboxModal
        isOpen={isLightboxOpen}
        imagePath={currentExercise.reference_image_path}
        title={currentExercise.title}
        artForm={currentExercise.art_form}
        difficulty={currentExercise.difficulty}
        onClose={() => setIsLightboxOpen(false)}
      />
    </div>
  );
};
