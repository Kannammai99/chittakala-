import React, { useState, useEffect } from "react";
import { Bell, CheckCircle, Clock, X } from "lucide-react";

export const MindfulReminderWidget: React.FC = () => {
    const [activeMinutes, setActiveMinutes] = useState<number | null>(null);
    const [scheduledTimeString, setScheduledTimeString] = useState<string | null>(null);
    const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("chittakala_scheduled_reminder");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (parsed.expiryTimestamp > Date.now()) {
                    setActiveMinutes(parsed.minutes);
                    setScheduledTimeString(
                        new Date(parsed.expiryTimestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                    );
                } else {
                    localStorage.removeItem("chittakala_scheduled_reminder");
                }
            } catch (e) {
                localStorage.removeItem("chittakala_scheduled_reminder");
            }
        }
    }, []);

    const handleSchedule = async (minutes: number) => {
        if (typeof Notification !== "undefined" && Notification.permission === "default") {
            try {
                await Notification.requestPermission();
            } catch (e) {
                console.warn("Notification permission error:", e);
            }
        }

        const expiryTimestamp = Date.now() + minutes * 60 * 1000;
        const targetTime = new Date(expiryTimestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        localStorage.setItem(
            "chittakala_scheduled_reminder",
            JSON.stringify({ minutes, expiryTimestamp, createdAt: Date.now() })
        );

        setActiveMinutes(minutes);
        setScheduledTimeString(targetTime);
        setNoticeMessage(`✓ Mindful break scheduled for ${targetTime}!`);
        setTimeout(() => setNoticeMessage(null), 4000);

        if ("serviceWorker" in navigator && typeof Notification !== "undefined" && Notification.permission === "granted") {
            navigator.serviceWorker.ready.then((registration) => {
                setTimeout(() => {
                    registration.showNotification("🌿 Time for your Chittakala Creative Reset!", {
                        body: "Take a 5-minute pause on paper with Warli, Kolam, or Madhubani art.",
                        icon: "/hero_concept1.jpg",
                        badge: "/hero_concept1.jpg",
                        data: { url: "/?action=start" },
                    });
                }, minutes * 60 * 1000);
            });
        }
    };

    const handleCancel = () => {
        localStorage.removeItem("chittakala_scheduled_reminder");
        setActiveMinutes(null);
        setScheduledTimeString(null);
        setNoticeMessage("Reminder canceled.");
        setTimeout(() => setNoticeMessage(null), 3000);
    };

    return (
        <div
            className="genz-card"
            style={{
                background: "linear-gradient(135deg, #FFF5F3 0%, #FFFFFF 100%)",
                border: "2px solid #FFE4E0",
                borderRadius: "22px",
                padding: "18px 20px",
                marginBottom: "20px",
                boxShadow: "0 8px 24px rgba(255, 82, 59, 0.06)",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                    style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "12px",
                        background: "rgba(255, 82, 59, 0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                    }}
                >
                    <Bell size={18} color="var(--color-accent-coral)" />
                </div>
                <div>
                    <h3 style={{ fontSize: "0.98rem", fontWeight: 900, color: "#0F172A", margin: 0, lineHeight: 1.2 }}>
                        Schedule a Mindful Break
                    </h3>
                    <span style={{ fontSize: "0.76rem", color: "#64748B", fontWeight: 500, display: "block", marginTop: "2px" }}>
                        A voluntary 5-minute creative pause on paper
                    </span>
                </div>
            </div>

            {activeMinutes ? (
                <div
                    style={{
                        background: "#F0FDF4",
                        border: "1.5px solid #BBF7D0",
                        padding: "10px 14px",
                        borderRadius: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "10px",
                        marginTop: "14px",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <CheckCircle size={18} color="#16A34A" />
                        <span style={{ fontSize: "0.82rem", color: "#15803D", fontWeight: 800 }}>
                            Scheduled for {scheduledTimeString} ({activeMinutes} min)
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={handleCancel}
                        style={{
                            background: "none",
                            border: "none",
                            color: "#DC2626",
                            fontWeight: 800,
                            fontSize: "0.78rem",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "3px",
                        }}
                    >
                        <X size={14} /> Cancel
                    </button>
                </div>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginTop: "14px" }}>
                    {[15, 30, 60].map((mins) => (
                        <button
                            key={mins}
                            type="button"
                            onClick={() => handleSchedule(mins)}
                            style={{
                                padding: "10px 8px",
                                borderRadius: "9999px",
                                background: "#FFFFFF",
                                border: "1.5px solid #FFE4E0",
                                color: "var(--color-accent-coral)",
                                fontFamily: "var(--font-heading)",
                                fontWeight: 800,
                                fontSize: "0.82rem",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "5px",
                                transition: "all 0.2s ease",
                            }}
                        >
                            <Clock size={13} /> {mins} min
                        </button>
                    ))}
                </div>
            )}

            {noticeMessage && (
                <div
                    style={{
                        marginTop: "10px",
                        textAlign: "center",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        color: noticeMessage.startsWith("✓") ? "#16A34A" : "#64748B",
                    }}
                >
                    {noticeMessage}
                </div>
            )}
        </div>
    );
};