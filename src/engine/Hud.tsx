import React from "react";
import type { ShotHud } from "./types";

/**
 * 2D Screen-Space HUD Overlay (rendered above ThreeCanvas inside <AbsoluteFill>).
 * Guarantees crisp, horizontal, never-clipped, never-sideways UI matching the
 * viral Minecraft Shorts references:
 * - Bottom-left Minecraft server chat (with optional typewriter reveal)
 * - Top-right clock / status pill (e.g. "4:00 PM", "DAY 1")
 * - Centered top-third callout banner (e.g. "20% TAX", "100 EMERALDS!")
 * - Minecraft grey inventory checklist modal (`hud.checklist`, e.g. "THE PLAN")
 * - Live rolling numeric counter (`hud.counter`, e.g. "12 YEARS", "DEBT: 500", "DAY 1000")
 * - Slanted slam-in alert stamp (`hud.stamp`, e.g. "TEST!", "GONE")
 * - Bottom animated "✓ Subscribed" pill on CTA shots
 */
export const HudOverlay: React.FC<{ hud?: ShotHud; localT: number }> = ({ hud, localT }) => {
  if (!hud) return null;

  const popScale = Math.min(1, 0.82 + Math.min(1, Math.max(0, localT) / 0.16) * 0.18);

  // Rolling counter calculation
  const counterState = hud.counter
    ? (() => {
        const c = hud.counter;
        const start = c.startAt ?? 0.1;
        const dur = Math.max(0.05, c.dur ?? 1.2);
        const rawP = Math.min(1, Math.max(0, (localT - start) / dur));
        // Cubic ease-out for crisp landing on target figure
        const eased = 1 - Math.pow(1 - rawP, 3);
        const value = Math.round(c.from + (c.to - c.from) * eased);
        const formatted = `${c.prefix ?? ""}${value.toLocaleString("en-US")}${c.suffix ?? ""}`;
        const bump = rawP > 0 && rawP < 1 ? 1 + Math.sin(rawP * Math.PI) * 0.06 : 1;
        return { formatted, bump };
      })()
    : null;

  // Stamp slam-in calculation
  const stampState = hud.stamp
    ? (() => {
        const s = hud.stamp;
        const at = s.at ?? 0.15;
        if (localT < at) return null;
        const dt = localT - at;
        const slamP = Math.min(1, dt / 0.14);
        const scale = 1.85 - 0.85 * (1 - Math.pow(1 - slamP, 3));
        const opacity = Math.min(1, dt / 0.06);
        return { scale, opacity, angle: s.angle ?? -11, color: s.color ?? "#ff3b30", text: s.text };
      })()
    : null;

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
      {/* Subtle warm sepia/vintage border vignette when a flashback filter is active */}
      {hud.filter === "sepia" || hud.filter === "vintage" ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            boxShadow: "inset 0 0 180px rgba(42, 24, 8, 0.58)",
          }}
        />
      ) : null}

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

      {/* Live rolling numeric counter (e.g. "12 YEARS", "DEBT: 500", "DAY 1000", "+2,778") */}
      {hud.counter && counterState ? (
        <div
          style={{
            position: "absolute",
            top: hud.clock && hud.counter.align === "top-right" ? 170 : 96,
            left: hud.counter.align === "top-left" ? 44 : hud.counter.align === "top-right" ? undefined : 0,
            right: hud.counter.align === "top-right" ? 44 : hud.counter.align === "top-left" ? undefined : 0,
            display: "flex",
            justifyContent:
              hud.counter.align === "top-left"
                ? "flex-start"
                : hud.counter.align === "top-right"
                  ? "flex-end"
                  : "center",
            transform: `scale(${popScale * counterState.bump})`,
          }}
        >
          <div
            style={{
              background: "rgba(12, 15, 22, 0.86)",
              border: `4px solid ${hud.counter.color ?? "#ffdd57"}`,
              borderRadius: 12,
              padding: "12px 28px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0 10px 26px rgba(0,0,0,0.48)",
            }}
          >
            {hud.counter.label ? (
              <div
                style={{
                  color: "#d4dce8",
                  fontSize: 24,
                  letterSpacing: 2,
                  marginBottom: 4,
                  textShadow: "2px 2px 0 #000",
                }}
              >
                {hud.counter.label}
              </div>
            ) : null}
            <div
              style={{
                color: hud.counter.color ?? "#ffdd57",
                fontSize: 52,
                lineHeight: 1.05,
                letterSpacing: 1.5,
                textShadow: "4px 4px 0 #000",
              }}
            >
              {counterState.formatted}
            </div>
          </div>
        </div>
      ) : null}

      {/* Top-third crisp callout banner (never sideways, never clipped off phone edges) */}
      {hud.banner ? (
        <div
          style={{
            position: "absolute",
            top: hud.counter ? 245 : 210,
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

      {/* Minecraft-style grey inventory checklist modal ("THE PLAN") */}
      {hud.checklist ? (
        <div
          style={{
            position: "absolute",
            top: hud.checklist.position === "center" ? 540 : hud.banner ? (hud.banner.sub ? 420 : 370) : 215,
            left: 56,
            right: 56,
            display: "flex",
            justifyContent: "center",
            transform: `scale(${popScale})`,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 880,
              background: "rgba(198, 198, 198, 0.95)",
              borderTop: "6px solid #ffffff",
              borderLeft: "6px solid #ffffff",
              borderRight: "6px solid #555555",
              borderBottom: "6px solid #555555",
              borderRadius: 6,
              padding: "22px 28px",
              boxShadow: "0 16px 40px rgba(0,0,0,0.58)",
            }}
          >
            <div
              style={{
                color: "#222222",
                fontSize: 38,
                letterSpacing: 1.5,
                marginBottom: 18,
                paddingBottom: 10,
                borderBottom: "3px solid #8b8b8b",
                textAlign: "center",
              }}
            >
              {hud.checklist.title}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {hud.checklist.rows.map((row, idx) => {
                const rowAt = row.at ?? idx * 0.28;
                const rowVis = Math.min(1, Math.max(0, (localT - rowAt) / 0.14));
                if (rowVis <= 0) return null;
                const doneAt = row.doneAt ?? rowAt + 0.18;
                const showMark = localT >= doneAt;
                const isDone = showMark && row.done === true;
                const isFail = showMark && row.done === "fail";

                return (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 18,
                      background: "#8b8b8b",
                      borderTop: "3px solid #373737",
                      borderLeft: "3px solid #373737",
                      borderRight: "3px solid #ffffff",
                      borderBottom: "3px solid #ffffff",
                      padding: "12px 18px",
                      opacity: rowVis,
                      transform: `translateY(${(1 - rowVis) * 10}px)`,
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        minWidth: 44,
                        background: isDone ? "#1d9c3a" : isFail ? "#d62828" : "#5a5a5a",
                        border: "3px solid #2b2b2b",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff",
                        fontSize: 32,
                        textShadow: "2px 2px 0 #000",
                      }}
                    >
                      {isDone ? "✓" : isFail ? "✕" : ""}
                    </div>
                    <div
                      style={{
                        color: "#ffffff",
                        fontSize: 32,
                        lineHeight: 1.15,
                        textShadow: "2px 2px 0 #222222",
                        textDecoration: isFail ? "line-through" : "none",
                      }}
                    >
                      {row.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {hud.checklist.footer ? (
              <div
                style={{
                  marginTop: 18,
                  padding: "10px 16px",
                  background: "rgba(24, 24, 28, 0.88)",
                  borderRadius: 4,
                  color: hud.checklist.footerColor ?? "#ff5252",
                  fontSize: 30,
                  textAlign: "center",
                  letterSpacing: 1.2,
                  textShadow: "2px 2px 0 #000",
                }}
              >
                {hud.checklist.footer}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* Slanted slam-in rubber stamp (e.g. "TEST!", "GONE", "FAILED") */}
      {stampState ? (
        <div
          style={{
            position: "absolute",
            top: 430,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: stampState.opacity,
            transform: `rotate(${stampState.angle}deg) scale(${stampState.scale})`,
          }}
        >
          <div
            style={{
              background: "rgba(18, 10, 10, 0.76)",
              border: `8px solid ${stampState.color}`,
              borderRadius: 14,
              padding: "16px 46px",
              color: stampState.color,
              fontSize: 78,
              lineHeight: 1,
              letterSpacing: 4,
              textTransform: "uppercase",
              textShadow: "5px 5px 0 #000",
              boxShadow: "0 0 0 4px rgba(0,0,0,0.45), 0 16px 36px rgba(0,0,0,0.55)",
            }}
          >
            {stampState.text}
          </div>
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
