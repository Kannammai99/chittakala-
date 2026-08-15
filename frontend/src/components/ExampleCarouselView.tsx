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
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
        <button
          className="btn-genz-secondary"
          onClick={onBack}
          style={{ width: "44px", height: "44px", padding: 0, minWidth: "44px", borderRadius: "9999px" }}
          aria-label="Back to Categories"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.6rem", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.03em" }}>
            {categoryTitle}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span className="pulse-badge"></span>
            <span style={{ fontSize: "0.85rem", color: "var(--color-accent-coral)", fontWeight: 800 }}>
              Example {currentIndex + 1} of {exercises.length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Gen Z Card */}
      <div className="genz-card" style={{ textAlign: "center", padding: "28px 20px" }}>
        {/* Curated SVG Visual Display Box */}
        <div
          style={{
            width: "100%",
            maxWidth: "280px",
            height: "220px",
            margin: "0 auto 24px",
            borderRadius: "20px",
            backgroundColor: "#F8FAFC",
            border: "2px solid #E2E8F0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div style={{ fontSize: "0.78rem", color: "var(--color-accent-coral)", fontWeight: 900, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "8px" }}>
            Curated SVG Reference
          </div>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 900, color: "#0F172A" }}>
            {currentExercise.title}
          </h3>
          <span style={{ fontSize: "0.78rem", color: "var(--color-accent-coral)", marginTop: "6px", fontWeight: 800, padding: "4px 12px", borderRadius: "9999px", background: "rgba(255, 82, 59, 0.1)" }}>
            DIFFICULTY: {currentExercise.difficulty.toUpperCase()}
          </span>
        </div>

        <p style={{ color: "#334155", fontSize: "0.98rem", lineHeight: 1.6, marginBottom: "24px", fontWeight: 500 }}>
          {currentExercise.short_description}
        </p>

        {/* Geometric Breakdown */}
        <div style={{ textAlign: "left", backgroundColor: "#F8FAFC", padding: "16px 18px", borderRadius: "16px", border: "1px solid #E2E8F0", marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.88rem", fontWeight: 900, color: "#0F172A", marginBottom: "8px" }}>
            <Eye size={18} color="var(--color-accent-coral)" /> Visible Pattern Elements:
          </div>
          <ul style={{ paddingLeft: "20px", fontSize: "0.9rem", color: "#475569", lineHeight: 1.6, fontWeight: 500 }}>
            {currentExercise.visible_elements.map((elem, idx) => (
              <li key={idx}>{elem}</li>
            ))}
          </ul>
        </div>

        {/* Carousel Navigation & Action Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            className="btn-genz-secondary"
            onClick={handlePrev}
            disabled={isFirst}
            style={{ opacity: isFirst ? 0.35 : 1, padding: "14px 20px" }}
            aria-label="Previous Example"
          >
            <ChevronLeft size={20} /> Prev
          </button>

          <button
            className="btn-genz-primary"
            style={{ flex: 1 }}
            onClick={() => onSelectExercise(currentExercise)}
            aria-label="Try This Example"
          >
            <Play size={18} /> Try This Example
          </button>

          <button
            className="btn-genz-secondary"
            onClick={handleNext}
            disabled={isLast}
            style={{ opacity: isLast ? 0.35 : 1, padding: "14px 20px" }}
            aria-label="Next Example"
          >
            Next <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
