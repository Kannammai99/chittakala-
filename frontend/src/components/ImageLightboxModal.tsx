import React, { useState, useRef, useEffect } from "react";
import { X, ZoomIn, ZoomOut, RotateCcw, Maximize2, Move } from "lucide-react";

interface ImageLightboxModalProps {
  isOpen: boolean;
  imagePath: string;
  title: string;
  artForm?: string;
  difficulty?: string;
  onClose: () => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  imagePath,
  title,
  artForm,
  difficulty,
  onClose,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchStartDist = useRef<number | null>(null);

  // Reset zoom & pan when modal opens
  useEffect(() => {
    if (isOpen) {
      setZoomLevel(1);
      setPan({ x: 0, y: 0 });
    }
  }, [isOpen, imagePath]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") handleZoomIn();
      if (e.key === "-") handleZoomOut();
      if (e.key === "0") handleReset();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleReset = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  };

  // Dragging / Panning handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomLevel <= 1) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile pan & pinch
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y,
      });
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartDist.current = dist;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging && zoomLevel > 1) {
      setPan({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    } else if (e.touches.length === 2 && touchStartDist.current !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const delta = dist / touchStartDist.current;
      if (delta > 1.08) {
        handleZoomIn();
        touchStartDist.current = dist;
      } else if (delta < 0.92) {
        handleZoomOut();
        touchStartDist.current = dist;
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    touchStartDist.current = null;
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000,
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "16px",
        boxSizing: "border-box",
        animation: "fadeIn 0.2s ease-out",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top Header Controls Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          width: "100%",
          maxWidth: "800px",
          margin: "0 auto",
          zIndex: 10001,
        }}
      >
        <div style={{ color: "#FFFFFF" }}>
          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.1rem",
              fontWeight: 800,
              margin: 0,
              color: "#F8FAFC",
              lineHeight: 1.2,
            }}
          >
            {title}
          </h3>
          {artForm && (
            <span style={{ fontSize: "0.75rem", color: "var(--color-accent-coral)", fontWeight: 700 }}>
              {artForm.toUpperCase()} {difficulty ? `• ${difficulty.toUpperCase()}` : ""}
            </span>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            color: "#FFFFFF",
            borderRadius: "9999px",
            padding: "8px 14px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.85rem",
            fontWeight: 800,
            cursor: "pointer",
            backdropFilter: "blur(8px)",
          }}
          aria-label="Close zoomed view"
        >
          <X size={18} /> Close
        </button>
      </div>

      {/* Main Interactive Zoom Canvas */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
          cursor: zoomLevel > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
          userSelect: "none",
          touchAction: "none",
          padding: "20px 0",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => {
          if (e.target === e.currentTarget && zoomLevel === 1) onClose();
        }}
      >
        <img
          src={imagePath}
          alt={title}
          style={{
            maxWidth: "92vw",
            maxHeight: "75vh",
            objectFit: "contain",
            borderRadius: "16px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel})`,
            transition: isDragging ? "none" : "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            willChange: "transform",
          }}
          draggable={false}
        />

        {zoomLevel > 1 && (
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(15, 23, 42, 0.75)",
              color: "#94A3B8",
              padding: "4px 12px",
              borderRadius: "9999px",
              fontSize: "0.75rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              pointerEvents: "none",
            }}
          >
            <Move size={14} /> Drag or swipe to move picture
          </div>
        )}
      </div>

      {/* Bottom Floating Controls Toolbar */}
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          background: "rgba(30, 41, 59, 0.85)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          borderRadius: "9999px",
          padding: "8px 16px",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          zIndex: 10001,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
        }}
      >
        <button
          onClick={handleZoomOut}
          disabled={zoomLevel <= 1}
          style={{
            background: "transparent",
            border: "none",
            color: zoomLevel <= 1 ? "#64748B" : "#FFFFFF",
            padding: "8px",
            borderRadius: "9999px",
            display: "flex",
            alignItems: "center",
            cursor: zoomLevel <= 1 ? "not-allowed" : "pointer",
          }}
          title="Zoom Out (-)"
          aria-label="Zoom Out"
        >
          <ZoomOut size={20} />
        </button>

        <span
          style={{
            color: "var(--color-accent-coral)",
            fontWeight: 900,
            fontSize: "0.95rem",
            minWidth: "60px",
            textAlign: "center",
          }}
        >
          {Math.round(zoomLevel * 100)}%
        </span>

        <button
          onClick={handleZoomIn}
          disabled={zoomLevel >= 3.5}
          style={{
            background: "transparent",
            border: "none",
            color: zoomLevel >= 3.5 ? "#64748B" : "#FFFFFF",
            padding: "8px",
            borderRadius: "9999px",
            display: "flex",
            alignItems: "center",
            cursor: zoomLevel >= 3.5 ? "not-allowed" : "pointer",
          }}
          title="Zoom In (+)"
          aria-label="Zoom In"
        >
          <ZoomIn size={20} />
        </button>

        <div style={{ width: "1px", height: "20px", background: "rgba(255, 255, 255, 0.2)", margin: "0 4px" }}></div>

        <button
          onClick={handleReset}
          style={{
            background: "transparent",
            border: "none",
            color: "#94A3B8",
            padding: "6px 10px",
            borderRadius: "9999px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "0.8rem",
            fontWeight: 800,
            cursor: "pointer",
          }}
          title="Reset Zoom (0)"
          aria-label="Reset Zoom"
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>
    </div>
  );
};
