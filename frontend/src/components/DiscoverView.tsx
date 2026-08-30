import React, { useState } from "react";
import { Sparkles, MapPin, Lightbulb, ArrowRight, Palette, BookOpen, ArrowLeft, ChevronRight, Lock } from "lucide-react";

interface DiscoverViewProps {
  onSelectArtForm: (artFormId: string) => void;
}

interface HeritageStory {
  id: string;
  title: string;
  shortTitle: string;
  vibeBadge: string;
  origin: string;
  shortOrigin: string;
  teaser: string;
  hook: string;
  funFact: string;
  signatures: string[];
  color: string;
  bgColor: string;
  thumbnail: string;
  active: boolean;
}

const HERITAGE_STORIES: HeritageStory[] = [
  {
    id: "warli",
    title: "Warli Tribal Art",
    shortTitle: "Warli Art",
    vibeBadge: "Ancient Tribal Geometry",
    origin: "Sahyadri Hills, Maharashtra",
    shortOrigin: "Maharashtra",
    teaser: "Prehistoric roots & Tarpa dance rings",
    hook: "Deeply rooted in ancient Sahyadri tribal traditions, Warli artists paint rice paste on red mud walls to celebrate harvests and community events. Everything is constructed from 3 fundamental geometric shapes: circles (sun & moon), triangles (mountains & trees), and squares (sacred land).",
    funFact: "No paintbrushes! Warli artists traditionally chew the tip of a soft bamboo twig to create a natural fibrous brush.",
    signatures: ["Triangular torsos", "Tarpa dance circles", "Harvest seed sowing"],
    color: "var(--color-accent-coral)",
    bgColor: "rgba(255, 82, 59, 0.12)",
    thumbnail: "/hero_concept1.jpg",
    active: true,
  },
  {
    id: "kolam",
    title: "Kolam Threshold Art",
    shortTitle: "Kolam Art",
    vibeBadge: "Threshold Art Ritual",
    origin: "Tamil Nadu & South India",
    shortOrigin: "Tamil Nadu",
    teaser: "Traditional morning dot grid routine",
    hook: "A micro-mindfulness morning ritual in South India, rice flour dot grids are drawn at household thresholds at sunrise. It serves a dual purpose: a 5-minute creative focus pause AND an eco-friendly gift to feed ants and small birds.",
    funFact: "Sikku Kolams are drawn with continuous curved lines that loop around dot matrices (Pulli) without ever lifting the hand or breaking line symmetry.",
    signatures: ["Pulli dot matrices", "Continuous curved loops", "Floral lotus symmetry"],
    color: "var(--color-accent-indigo)",
    bgColor: "rgba(99, 102, 241, 0.12)",
    thumbnail: "/art/kolam/simple-dot-kolams/example-01.png",
    active: true,
  },
  {
    id: "madhubani",
    title: "Madhubani Folk Painting",
    shortTitle: "Madhubani",
    vibeBadge: "Mithila Dual Lines",
    origin: "Mithila Region, Bihar",
    shortOrigin: "Bihar",
    teaser: "Dual-line peacocks & flower dyes",
    hook: "Traditional Mithila women originally used bamboo twigs, matchsticks, and natural plant dyes to paint vibrant peacocks, fish, and lotus motifs on mud walls. Signature rule: Every outline MUST be drawn with double parallel lines!",
    funFact: "Empty spaces are never left blank in Madhubani; they are filled with delicate line hatching, leaves, and flower motifs.",
    signatures: ["Double-line outlines", "Symbolic fish of vitality", "Lotus flower creepers"],
    color: "#EC4899",
    bgColor: "rgba(236, 72, 153, 0.12)",
    thumbnail: "/art/madhubani/borders/example-01.png",
    active: true,
  },
  {
    id: "gond",
    title: "Gond Indigenous Art",
    shortTitle: "Gond Art",
    vibeBadge: "Signature Dot Patterns",
    origin: "Central Belt, Madhya Pradesh",
    shortOrigin: "MP",
    teaser: "Forest animal dots & line textures",
    hook: "Gond artists believe that viewing sacred art brings positive energy. They fill flowing animal and tree contours with thousands of signature dots, dashes, and wavy lines so the artwork vibrantly expresses nature.",
    funFact: "Every Gond artist creates their own signature line & dot pattern, almost like a visual fingerprint!",
    signatures: ["Fine vertical dashes", "Wavy line clusters", "Perching forest birds"],
    color: "#10B981",
    bgColor: "rgba(16, 185, 129, 0.12)",
    thumbnail: "/art/gond/patterns/example-01.png",
    active: true,
  },
  {
    id: "pattachitra",
    title: "Pattachitra Scroll Painting",
    shortTitle: "Pattachitra",
    vibeBadge: "Ancient Scrolls",
    origin: "Raghurajpur Village, Odisha",
    shortOrigin: "Odisha",
    teaser: "Mythic cloth scroll & tamarind coating",
    hook: "Pattachitra is one of India's oldest scroll art traditions. Artists spend months painting mythic stories on treated cloth scrolls using bold black outlines and vibrant mineral colors.",
    funFact: "The cloth canvas ('Patta') is coated with a mixture of chalk powder and tamarind seed paste, making it water-resistant for decades!",
    signatures: ["Bold black outlines", "Expressive eyes", "Mythic floral borders"],
    color: "#F59E0B",
    bgColor: "rgba(245, 158, 11, 0.12)",
    thumbnail: "/art/pattachitra/preview.png",
    active: false,
  },
  {
    id: "kalamkari",
    title: "Kalamkari Bamboo Pen Art",
    shortTitle: "Kalamkari",
    vibeBadge: "Bamboo Pen Art",
    origin: "Srikalahasti, Andhra Pradesh",
    shortOrigin: "Andhra",
    teaser: "Plant dye pen art & tree of life",
    hook: "Derived from 'Kalam' (bamboo pen) and 'Kari' (craftsmanship). Artists use hand-sharpened bamboo pens soaked in organic plant and tree bark dyes to draw peacock & tree of life motifs.",
    funFact: "Natural black dye in Kalamkari is made by fermenting iron scrap in jaggery water for 21 days!",
    signatures: ["Organic vine tendrils", "Peacock plumes", "Tree of life motifs"],
    color: "#8B5CF6",
    bgColor: "rgba(139, 92, 246, 0.12)",
    thumbnail: "/art/kalamkari/preview.png",
    active: false,
  },
];

export const DiscoverView: React.FC<DiscoverViewProps> = ({ onSelectArtForm }) => {
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);

  const selectedStory = HERITAGE_STORIES.find((s) => s.id === selectedStoryId);

  const handleOpenStory = (id: string) => {
    setSelectedStoryId(id);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const vp = document.querySelector(".content-viewport");
    if (vp) vp.scrollTop = 0;
  };

  const handleBackToGrid = () => {
    setSelectedStoryId(null);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const vp = document.querySelector(".content-viewport");
    if (vp) vp.scrollTop = 0;
  };

  // LEVEL 2 (L2): Detailed Heritage Story View
  if (selectedStory) {
    return (
      <div className="tab-view fade-in-view">
        {/* Back Button */}
        <button
          onClick={handleBackToGrid}
          style={{
            background: "none",
            border: "none",
            color: "var(--color-accent-coral)",
            fontSize: "0.9rem",
            fontWeight: 800,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "16px",
            padding: "6px 0",
          }}
          aria-label="Back to All Traditions"
        >
          <ArrowLeft size={18} /> Back to Discover Grid
        </button>

        {/* Detailed Story Card */}
        <div
          className="genz-card"
          style={{
            padding: "22px 18px",
            borderRadius: "24px",
            borderLeft: `5px solid ${selectedStory.color}`,
            marginBottom: "20px",
          }}
        >
          {/* Badge & Title */}
          <div style={{ marginBottom: "14px" }}>
            <span
              style={{
                fontSize: "0.74rem",
                fontWeight: 800,
                padding: "4px 10px",
                borderRadius: "9999px",
                background: selectedStory.bgColor,
                color: selectedStory.color,
                letterSpacing: "0.03em",
                display: "inline-block",
                marginBottom: "8px",
              }}
            >
              ⚡ {selectedStory.vibeBadge}
            </span>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.6rem", fontWeight: 900, color: "#0F172A", lineHeight: 1.25 }}>
              {selectedStory.title}
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px", color: "#64748B", fontSize: "0.85rem", fontWeight: 600 }}>
              <MapPin size={15} color={selectedStory.color} />
              <span>{selectedStory.origin}</span>
            </div>
          </div>

          {/* Story Hook */}
          <p style={{ color: "#334155", fontSize: "0.94rem", fontWeight: 500, lineHeight: 1.6, marginBottom: "18px" }}>
            {selectedStory.hook}
          </p>

          {/* Cool Design Secret Box */}
          <div
            style={{
              background: "#F8FAFC",
              border: "1.5px solid #E2E8F0",
              borderRadius: "18px",
              padding: "14px 16px",
              marginBottom: "18px",
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
            }}
          >
            <Lightbulb size={20} color="var(--color-accent-gold)" style={{ flexShrink: 0, marginTop: "2px" }} />
            <div>
              <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0F172A", display: "block", marginBottom: "3px" }}>
                Cool Design Secret:
              </span>
              <span style={{ fontSize: "0.86rem", color: "#475569", fontWeight: 500, lineHeight: 1.45 }}>
                {selectedStory.funFact}
              </span>
            </div>
          </div>

          {/* Signature Element Pills */}
          <div style={{ marginBottom: "20px" }}>
            <span style={{ fontSize: "0.76rem", fontWeight: 800, color: "#64748B", display: "block", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              3 Key Elements to Spot:
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {selectedStory.signatures.map((sig, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: "0.76rem",
                    fontWeight: 700,
                    padding: "5px 11px",
                    borderRadius: "12px",
                    background: "#F1F5F9",
                    color: "#334155",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <Sparkles size={11} color={selectedStory.color} /> {sig}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Action */}
          {selectedStory.active ? (
            <button
              className="btn-genz-primary"
              onClick={() => onSelectArtForm(selectedStory.id)}
              style={{
                width: "100%",
                justifyContent: "center",
                fontSize: "0.92rem",
                padding: "14px 16px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxSizing: "border-box",
              }}
            >
              <span>Start {selectedStory.shortTitle} Practice</span>
              <ArrowRight size={18} style={{ flexShrink: 0 }} />
            </button>
          ) : (
            <div
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "16px",
                background: "#F1F5F9",
                color: "#64748B",
                fontSize: "0.88rem",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              Expansion Module • Coming Soon
            </div>
          )}
        </div>
      </div>
    );
  }

  // LEVEL 1 (L1): 2x3 Square Tile Grid
  return (
    <div className="tab-view fade-in-view" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header Title Section */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
          <BookOpen size={18} color="var(--color-accent-coral)" />
          <span style={{ color: "var(--color-accent-coral)", fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Heritage Vibe Check
          </span>
        </div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 900, marginBottom: "8px", color: "#0F172A", letterSpacing: "-0.02em" }}>
          Discover Indian Art Traditions
        </h2>
        <p style={{ color: "#475569", fontSize: "0.88rem", fontWeight: 500, lineHeight: 1.5, margin: 0 }}>
          Tap any square tile to explore origin stories & design secrets.
        </p>
      </div>

      {/* 2x3 Square Tile Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "14px", flex: 1, width: "100%", boxSizing: "border-box" }}>
        {HERITAGE_STORIES.map((story) => (
          <div
            key={story.id}
            className="genz-card genz-card-interactive"
            style={{
              padding: "16px 14px",
              marginBottom: 0,
              borderRadius: "20px",
              borderTop: `4px solid ${story.color}`,
              cursor: "pointer",
              boxSizing: "border-box",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "160px",
              overflow: "hidden",
            }}
            onClick={() => handleOpenStory(story.id)}
          >
            {/* Top Row: Vibe Tag & Icon */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px", gap: "6px" }}>
                <span
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 800,
                    padding: "3px 8px",
                    borderRadius: "8px",
                    background: story.bgColor,
                    color: story.color,
                    letterSpacing: "0.02em",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "80%",
                  }}
                >
                  ⚡ {story.vibeBadge}
                </span>

                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "10px",
                    background: story.bgColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Palette size={15} color={story.color} />
                </div>
              </div>

              {/* Art Form Short Title */}
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 900, color: "#0F172A", lineHeight: 1.25, marginBottom: "6px" }}>
                {story.shortTitle}
              </h3>

              {/* Micro-Teaser */}
              <p style={{ color: "#475569", fontSize: "0.8rem", fontWeight: 500, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {story.teaser}
              </p>
            </div>

            {/* Bottom Row: Location & Read Arrow */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "6px", marginTop: "10px", paddingTop: "8px", borderTop: "1px solid #F1F5F9" }}>
              <span style={{ fontSize: "0.74rem", color: "#64748B", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                <MapPin size={12} color={story.color} style={{ flexShrink: 0 }} /> {story.shortOrigin}
              </span>

              <span style={{ fontSize: "0.76rem", color: story.color, fontWeight: 800, display: "flex", alignItems: "center", flexShrink: 0 }}>
                Read <ChevronRight size={14} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Sources and Cultural Context Section */}
      <div
        className="genz-card"
        style={{
          marginTop: "24px",
          padding: "20px",
          borderRadius: "22px",
          background: "#F8FAFC",
          border: "1.5px solid #E2E8F0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
          <BookOpen size={18} color="var(--color-accent-coral)" />
          <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
            Sources & Cultural Context
          </h4>
        </div>
        <p style={{ fontSize: "0.84rem", color: "#475569", lineHeight: 1.6, fontWeight: 500, marginBottom: "12px" }}>
          Cultural narratives and design elements in Chittakala are grounded in archaeological, ethnographic, and museum archives, including:
        </p>
        <ul style={{ fontSize: "0.82rem", color: "#475569", lineHeight: 1.65, fontWeight: 500, paddingLeft: "20px", margin: 0 }}>
          <li style={{ marginBottom: "6px" }}><strong>Indira Gandhi National Centre for the Arts (IGNCA)</strong> – Folk & Tribal Art Manuscripts</li>
          <li style={{ marginBottom: "6px" }}><strong>Crafts Council of India</strong> – Heritage Craft Documentation</li>
          <li style={{ marginBottom: "6px" }}><strong>UNESCO Intangible Cultural Heritage (ICH)</strong> – Traditional Craftsmanship Guidelines</li>
        </ul>
        <p style={{ fontSize: "0.76rem", color: "#94A3B8", lineHeight: 1.45, fontWeight: 500, marginTop: "12px", fontStyle: "italic" }}>
          Note: Chittakala adapts traditional folk art motifs as gentle, non-clinical creative pauses for focus and relaxation.
        </p>
      </div>
    </div>
  );
};
