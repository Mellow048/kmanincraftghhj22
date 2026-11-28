import { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp01 } from "./math";
import { beatFrames, captionBeat, captionPixel } from "./caption-beat";
import { GLYPH_ROWS, wordBitmap } from "./pixelfont";
import type { CaptionSettings, CaptionWord } from "./types";

/**
 * One word on screen at a time, cut to the voice.
 *
 * Rendered as a crisp 2D pixel-art SVG overlay OUTSIDE <ThreeCanvas> so
 * UnrealBloomPass / PostFX NEVER makes the subtitles glow or smear, and
 * scene filters (like sepia flashbacks) keep captions razor-sharp.
 * The letters come from the same 5x7 bit table (pixelfont.ts), so no system
 * font has to be installed anywhere.
 *
 * Films do not mount this. Pass `captions` to defineFilm.
 */

/** What a word looks like on screen: no punctuation, one case. */
export function captionText(word: string, letterCase: "upper" | "lower" = "upper"): string {
  const clean = word.replace(/[^A-Za-z0-9'\-]/g, "").replace(/^['-]+|['-]+$/g, "");
  return letterCase === "upper" ? clean.toUpperCase() : clean.toLowerCase();
}

/** The word being spoken at `t`, or null in a pause. */
export function activeWord(words: CaptionWord[], t: number): CaptionWord | null {
  let lo = 0;
  let hi = words.length - 1;
  let hit = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (words[mid].s <= t) {
      hit = mid;
      lo = mid + 1;
    } else hi = mid - 1;
  }
  if (hit < 0) return null;
  const word = words[hit];
  const next = words[hit + 1];
  // Hold the word until the next one starts, but not across a real pause.
  const holdUntil = next ? Math.min(next.s, word.e + 0.45) : word.e + 0.45;
  return t < holdUntil ? word : null;
}

type WordPaths = { w: number; h: number; outlineD: string; glyphD: string };
const PATH_CACHE = new Map<string, WordPaths>();

function wordSvgPaths(text: string): WordPaths {
  const hit = PATH_CACHE.get(text);
  if (hit) return hit;

  const { width, rows } = wordBitmap(text);
  const pad = 2; // 1px outline + 1px drop shadow
  const w = width + pad * 2;
  const h = GLYPH_ROWS + pad * 2;
  const lit = (x: number, y: number) => x >= 0 && y >= 0 && x < width && y < GLYPH_ROWS && rows[y][x] === 1;

  const outlineParts: string[] = [];
  const glyphParts: string[] = [];

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const gx = x - pad;
      const gy = y - pad;
      if (lit(gx, gy)) {
        glyphParts.push(`M${x},${y}h1v1h-1z`);
      } else {
        let black = false;
        outer: for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (lit(gx + dx, gy + dy)) {
              black = true;
              break outer;
            }
          }
        }
        if (!black && (lit(gx - 2, gy - 2) || lit(gx - 1, gy - 2) || lit(gx - 2, gy - 1))) {
          black = true;
        }
        if (black) {
          outlineParts.push(`M${x},${y}h1v1h-1z`);
        }
      }
    }
  }

  const result: WordPaths = {
    w,
    h,
    outlineD: outlineParts.join(""),
    glyphD: glyphParts.join(""),
  };
  PATH_CACHE.set(text, result);
  return result;
}

export const Captions: React.FC<CaptionSettings> = ({
  words,
  y = 0.72,
  size = 1,
  letterCase = "upper",
  motion,
  accentColor = "#ffd84d",
  highlightWords,
  dangerColor = "#ff4f42",
  dangerWords,
  wordColors,
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const t = frame / fps;

  const colorLookup = useMemo(() => {
    const map = new Map<string, string>();
    if (highlightWords) {
      for (const w of highlightWords) map.set(captionText(w, letterCase), accentColor);
    }
    if (dangerWords) {
      for (const w of dangerWords) map.set(captionText(w, letterCase), dangerColor);
    }
    if (wordColors) {
      for (const [w, hex] of Object.entries(wordColors)) map.set(captionText(w, letterCase), hex);
    }
    return map;
  }, [highlightWords, accentColor, dangerWords, dangerColor, wordColors, letterCase]);

  const starts = useMemo(() => (motion === "on-beat" ? beatFrames(words, fps) : null), [motion, words, fps]);
  const beat = starts ? captionBeat(words, starts, frame, fps) : null;
  const word = motion === "on-beat" ? beat?.word : activeWord(words, t);
  const text = word ? captionText(word.w, letterCase) : "";

  if (!word || text.length === 0) return null;

  const { w: texW, h: texH, outlineD, glyphD } = wordSvgPaths(text);
  // One font pixel is 1/86 of the frame width; long words shrink to fit 88%.
  const px = captionPixel(width, texW, size, !!beat);
  // A two-frame pop on the cut to each word.
  const pop = beat?.scale ?? 1 + 0.2 * Math.pow(1 - clamp01((t - word.s) / 0.1), 2);
  const svgW = texW * px;
  const svgH = texH * px;
  const topPct = (y - (beat?.lift ?? 0)) * 100;
  const wordHex = colorLookup.get(text) || "#ffffff";

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: `${topPct}%`,
          transform: `translate(-50%, -50%) scale(${pop})`,
          transformOrigin: "center center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width={svgW}
          height={svgH}
          viewBox={`0 0 ${texW} ${texH}`}
          shapeRendering="crispEdges"
          style={{ display: "block", overflow: "visible" }}
        >
          <path d={outlineD} fill="#000000" />
          <path d={glyphD} fill={wordHex} />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
