import React, { useEffect, useState } from "react";

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [fading, setFading] = useState<boolean>(false);

  useEffect(() => {
    // Show splash for 3.2s total so users can see and read the brand logo & tagline
    const timer1 = setTimeout(() => setFading(true), 2700);
    const timer2 = setTimeout(() => onFinish(), 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#0F172A",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.5s ease-out",
        padding: "24px",
      }}
    >
      {/* Prominent Large Chittakala Brand Logo Image */}
      <div
        style={{
          position: "relative",
          marginBottom: "24px",
          animation: "zoomIn 0.8s ease-out forwards",
        }}
      >
        <img
          src="/logo.jpg"
          alt="Chittakala Brand Logo"
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "36px",
            objectFit: "cover",
            boxShadow: "0 16px 48px rgba(255, 82, 59, 0.5)",
            border: "3.5px solid #FF7A00",
            display: "block",
          }}
        />
        <span
          style={{
            position: "absolute",
            bottom: "-8px",
            right: "-8px",
            background: "linear-gradient(135deg, #FF523B, #FF7A00)",
            color: "#FFFFFF",
            fontSize: "0.75rem",
            fontWeight: 900,
            padding: "3px 10px",
            borderRadius: "9999px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            letterSpacing: "0.06em",
          }}
        >
          FOLK ART
        </span>
      </div>

      {/* Brand Title */}
      <h1
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "2.6rem",
          fontWeight: 900,
          color: "#FFFFFF",
          letterSpacing: "-0.03em",
          marginBottom: "8px",
          textAlign: "center",
        }}
      >
        Chittakala
      </h1>

      <p style={{ color: "#94A3B8", fontSize: "1.05rem", fontWeight: 600, letterSpacing: "0.02em", textAlign: "center" }}>
        Pause the scroll. Create your moment.
      </p>

      {/* Animated Coral Progress Indicator */}
      <div
        style={{
          width: "140px",
          height: "4px",
          background: "#1E293B",
          borderRadius: "9999px",
          marginTop: "36px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(90deg, #FF523B, #FF7A00)",
            borderRadius: "9999px",
            animation: "progress 2.7s ease-in-out forwards",
          }}
        />
      </div>

      <style>{`
        @keyframes zoomIn {
          0% { transform: scale(0.85); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
};
