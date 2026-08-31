import React, { useState, useEffect } from "react";
import { ShieldCheck, User, Database, Info, CheckCircle } from "lucide-react";

interface SettingsViewProps {
  displayName: string;
  setDisplayName: (val: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  displayName,
  setDisplayName,
}) => {
  const [nameInput, setNameInput] = useState<string>(displayName);
  const [saveNotice, setSaveNotice] = useState<boolean>(false);
  const [autoDeleteImages, setAutoDeleteImages] = useState<boolean>(true);
  const [offlineMode, setOfflineMode] = useState<boolean>(true);
  const [clearedNotice, setClearedNotice] = useState<boolean>(false);

  useEffect(() => {
    setNameInput(displayName);
  }, [displayName]);

  const handleSaveName = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setDisplayName(nameInput.trim());
    setSaveNotice(true);
    setTimeout(() => setSaveNotice(false), 3000);
  };

  const handleClearCache = () => {
    localStorage.clear();
    setDisplayName("");
    setNameInput("");
    setClearedNotice(true);
    setTimeout(() => setClearedNotice(false), 3000);
  };

  return (
    <div className="tab-view">
      <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", fontWeight: 900, marginBottom: "20px", color: "#0F172A", letterSpacing: "-0.03em" }}>
        Settings & Preferences
      </h2>

      {/* 1. User Profile Settings (Explicit Save Button) */}
      <div className="genz-card" style={{ marginBottom: "20px" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 900, color: "#0F172A", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
          <User size={20} color="var(--color-accent-coral)" /> Profile & Identity
        </h3>

        <form onSubmit={handleSaveName} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <label style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0F172A", display: "block", marginBottom: "6px" }}>
              Your Display Name
            </label>
            <input
              type="text"
              className="genz-input-field"
              placeholder="e.g. Kanna or Ananya"
              maxLength={20}
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", marginTop: "4px" }}>
            <button
              type="submit"
              className="btn-genz-primary"
              disabled={nameInput.trim() === displayName}
              style={{
                padding: "10px 18px",
                fontSize: "0.85rem",
                width: "auto",
                opacity: nameInput.trim() === displayName ? 0.5 : 1,
                cursor: nameInput.trim() === displayName ? "default" : "pointer",
              }}
            >
              Save Profile Name
            </button>

            {saveNotice && (
              <span style={{ fontSize: "0.84rem", color: "#10B981", fontWeight: 800, display: "flex", alignItems: "center", gap: "6px" }}>
                <CheckCircle size={16} /> Saved!
              </span>
            )}
          </div>
        </form>
      </div>

      {/* 2. Privacy & Data Security Controls */}
      <div className="genz-card" style={{ marginBottom: "20px" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 900, color: "#0F172A", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
          <ShieldCheck size={20} color="#10B981" /> Privacy & Local Data
        </h3>

        {/* Toggle 1: Auto-Delete Images */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid #F1F5F9" }}>
          <div>
            <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0F172A" }}>Auto-Delete Uploaded Photos</div>
            <div style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 500 }}>Purge drawings immediately after session</div>
          </div>
          <button
            onClick={() => setAutoDeleteImages(!autoDeleteImages)}
            style={{
              width: "48px",
              height: "26px",
              borderRadius: "9999px",
              background: autoDeleteImages ? "var(--color-accent-coral)" : "#CBD5E1",
              border: "none",
              cursor: "pointer",
              position: "relative",
              transition: "all 0.2s ease",
            }}
            aria-label="Toggle Auto Delete Images"
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "9999px",
                background: "#FFFFFF",
                position: "absolute",
                top: "3px",
                left: autoDeleteImages ? "25px" : "3px",
                transition: "all 0.2s ease",
              }}
            />
          </button>
        </div>

        {/* Toggle 2: Offline Service Worker Cache */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <div>
            <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0F172A" }}>Offline PWA Mode</div>
            <div style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 500 }}>Cache app shell for zero-connection practice</div>
          </div>
          <button
            onClick={() => setOfflineMode(!offlineMode)}
            style={{
              width: "48px",
              height: "26px",
              borderRadius: "9999px",
              background: offlineMode ? "var(--color-accent-coral)" : "#CBD5E1",
              border: "none",
              cursor: "pointer",
              position: "relative",
              transition: "all 0.2s ease",
            }}
            aria-label="Toggle Offline PWA Mode"
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "9999px",
                background: "#FFFFFF",
                position: "absolute",
                top: "3px",
                left: offlineMode ? "25px" : "3px",
                transition: "all 0.2s ease",
              }}
            />
          </button>
        </div>

        {/* Clear Local Cache Button */}
        <button
          onClick={handleClearCache}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "14px",
            background: "#F8FAFC",
            border: "1.5px solid #E2E8F0",
            color: "#64748B",
            fontWeight: 800,
            fontSize: "0.85rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          <Database size={16} /> Clear Local Browser Cache
        </button>

        {clearedNotice && (
          <div style={{ marginTop: "10px", fontSize: "0.8rem", color: "#10B981", fontWeight: 800, display: "flex", alignItems: "center", gap: "6px", justifyContent: "center" }}>
            <CheckCircle size={16} /> Local browser cache cleared!
          </div>
        )}
      </div>

      {/* 3. About App */}
      <div className="genz-card">
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
          <Info size={22} color="var(--color-accent-coral)" style={{ flexShrink: 0, marginTop: "2px" }} />
          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: 900, color: "#0F172A", marginBottom: "4px" }}>
              Chittakala PWA v0.1.0
            </h4>
            <p style={{ fontSize: "0.82rem", color: "#64748B", lineHeight: 1.5, fontWeight: 500 }}>
              Mobile-first mindful folk art practice application. Non-clinical, non-diagnostic, and 100% focused on accessible creative resets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
