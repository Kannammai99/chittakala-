import React, { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Play, Eye } from "lucide-react";
import { Exercise } from "../api/chittakalaClient";

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
        {/* Real SVG Reference Artwork Image Rendering */}
        <div
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
          }}
        >
          <img
            src={currentExercise.reference_image_path}
            alt={currentExercise.title}
            style={{ width: "100%", height: "120px", objectFit: "contain", display: "block" }}
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
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
    </div>
  );
};
