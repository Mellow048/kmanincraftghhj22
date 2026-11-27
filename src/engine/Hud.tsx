import React from "react";
import type { ShotHud } from "./types";

/**
 * 2D Screen-Space HUD Overlay (rendered above ThreeCanvas inside <AbsoluteFill>).
 * Guarantees crisp, horizontal, never-clipped, never-sideways UI matching the
 * viral Minecraft Shorts references:
 * - Bottom-left Minecraft server chat (with optional typewriter reveal)
 * - Top-right clock / status pill (e.g. "4:00 PM", "DAY 1")
 * - Centered top-third callout banner (e.g. "20% TAX", "100 EMERALDS!")
 * - Bottom animated "✓ Subscribed" pill on CTA shots
 */
export const HudOverlay: React.FC<{ hud?: ShotHud; localT: number }> = ({ hud, localT }) => {
  if (!hud) return null;

  const popScale = Math.min(1, 0.82 + Math.min(1, localT / 0.16) * 0.18);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        fontFamily: "'Courier New', 'Consolas', monospace",
        fontWeight: 800,
      }}
    >
      {/* Top-right clock / status badge (matches ServerLore Reference "3:00 AM") */}
      {hud.clock ? (
        <div
          style={{
            position: "absolute",
            top: 84,
            right: 44,
            background: "rgba(14, 18, 26, 0.82)",
            border: "3px solid rgba(255, 255, 255, 0.25)",
            borderRadius: 8,
            padding: "10px 22px",
            color: "#fff4d2",
            fontSize: 34,
            letterSpacing: 1.5,
            textShadow: "3px 3px 0 #000",
          }}
        >
          {hud.clock}
        </div>
      ) : null}

      {/* Top-third crisp callout banner (never sideways, never clipped off phone edges) */}
      {hud.banner ? (
        <div
          style={{
            position: "absolute",
            top: 230,
            left: 36,
            right: 36,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: `scale(${popScale})`,
          }}
        >
          <div
            style={{
              background: "rgba(10, 12, 18, 0.78)",
              border: `4px solid ${hud.banner.color ?? "#ffdd57"}`,
              borderRadius: 12,
              padding: "14px 28px",
              color: hud.banner.color ?? "#ffdd57",
              fontSize: 54,
              lineHeight: 1.1,
              textAlign: "center",
              letterSpacing: 1.5,
              textShadow: "4px 4px 0 #000",
              maxWidth: "96%",
            }}
          >
            {hud.banner.text}
          </div>
          {hud.banner.sub ? (
            <div
              style={{
                marginTop: 10,
                background: "rgba(10, 12, 18, 0.72)",
                borderRadius: 8,
                padding: "6px 18px",
                color: "#f2f5fa",
                fontSize: 30,
                textShadow: "2px 2px 0 #000",
              }}
            >
              {hud.banner.sub}
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Bottom-left Minecraft chat box (matches ServerLore Reference chat) */}
      {hud.chat && hud.chat.length > 0 ? (
        <div
          style={{
            position: "absolute",
            left: 34,
            right: 34,
            bottom: 430,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 6,
          }}
        >
          {hud.chat.map((line, idx) => {
            const full = line.whisper && line.sender
              ? `${line.sender} whispers to you: ${line.text}`
              : line.sender
                ? `<${line.sender}> ${line.text}`
                : line.text;
            const isLast = idx === hud.chat!.length - 1;
            let shown = full;
            if (isLast && hud.typing) {
              const frac = Math.min(1, Math.max(0.08, localT / 1.15));
              const chars = Math.max(1, Math.floor(full.length * frac));
              shown = full.slice(0, chars) + (frac < 0.99 ? "_" : "");
            }
            return (
              <div
                key={idx}
                style={{
                  background: "rgba(0, 0, 0, 0.68)",
                  padding: "10px 18px",
                  borderRadius: 6,
                  color: line.color ?? "#ffffff",
                  fontSize: 34,
                  lineHeight: 1.25,
                  textShadow: "2px 2px 0 #000",
                  maxWidth: "96%",
                }}
              >
                {shown}
              </div>
            );
          })}
        </div>
      ) : null}

      {/* Crisp YouTube-style "✓ Subscribed" pill on CTA shots (matches ServerLore Reference 1:24) */}
      {hud.subscribe ? (
        <div
          style={{
            position: "absolute",
            bottom: 240,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            transform: `scale(${popScale})`,
          }}
        >
          <div
            style={{
              background: "#f8f9fa",
              color: "#111318",
              borderRadius: 999,
              padding: "18px 46px",
              fontSize: 40,
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 800,
              boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span style={{ color: "#1a8f3e", fontSize: 44 }}>✓</span>
            <span>Subscribed</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};
