import type React from "react";
import { Block, Vox, clamp01 } from "../../src/engine";
import type { Vec3 } from "../../src/engine";
import { Figure } from "../Shared";

/**
 * CHARTS — the number, as a thing you can stand next to.
 *
 * An explainer never shows a slide. A price is a tag on the loaf; "it doubled" is a bar that grows past
 * a man's head; "worth less" is a pair of scales tipping. Every part here is an object in the world, and
 * every one MOVES: give it the seconds since its word (`clock.useSince`) and it grows, tips or counts.
 *
 * Part of the Explainer pack (PACK.md).
 */

/**
 * A price tag on a string: the price OF something. Hang it on the thing. `position` is the knot at the top
 * of the string; the card hangs 0.3 below it and faces +Z. `swing` (radians) lets it sway.
 * Write the price short: "1", "5", "$20". Change `text` on the word and the price has changed.
 */
export const PriceTag: React.FC<{ text: string; position?: Vec3; rotationY?: number; scale?: number; swing?: number; color?: string }> = ({
  text,
  position = [0, 0, 0],
  rotationY = 0,
  scale = 1,
  swing = 0,
  color = "#f6ecd2",
}) => {
  if (scale <= 0.001) return null;
  const w = Math.max(0.36, 0.16 + text.length * 0.17);
  return (
    <group position={position} rotation={[0, rotationY, swing]} scale={scale}>
      <Block position={[0, -0.13, 0]} size={[0.014, 0.26, 0.014]} color="#5c4630" castShadow={false} />
      <Block position={[0, -0.42, 0]} size={[w + 0.05, 0.37, 0.03]} color="#8a6a3a" />
      <Block position={[0, -0.42, 0.012]} size={[w, 0.32, 0.03]} color={color} emissive={color} emissiveIntensity={0.25} castShadow={false} />
      <Figure text={text} position={[0, -0.45, 0.04]} height={0.2} maxWidth={w - 0.1} depth={0.25} color="#2a2118" shadow={false} castShadow={false} />
    </group>
  );
};

/**
 * One bar of a chart: a column that stands `height` metres over `position`. It is a block, so it has a top
 * you can put a figure on: `label` is written just over it and rises with it.
 */
export const Bar: React.FC<{ position?: Vec3; height: number; width?: number; color?: string; label?: string; labelHeight?: number; glow?: number }> = ({
  position = [0, 0, 0],
  height,
  width = 0.6,
  color = "#58a6ff",
  label,
  labelHeight = 0.3,
  glow = 0,
}) => {
  const h = Math.max(0.02, height);
  return (
    <group position={position}>
      <Vox kind="wool" tint={color} position={[0, h / 2, 0]} size={[width, h, width]} emissive={color} emissiveIntensity={glow} />
      <Block position={[0, h + 0.015, 0]} size={[width + 0.04, 0.03, width + 0.04]} color="#ffffff" opacity={0.5} castShadow={false} />
      {label ? <Figure text={label} position={[0, h + 0.14 + labelHeight / 2, 0]} height={labelHeight} depth={0.6} color="#ffffff" outline /> : null}
    </group>
  );
};

/**
 * A row of bars on a stone base. `values` are their full heights in metres; `grow` (0–1) is how far they have
 * risen, one number for all of them or one for each: `grow={[1, 1, k]}` holds two and raises the third.
 * `labels` are written over the bars. The row is centred on `position` and runs along x.
 *
 *   <BarChart values={[0.6, 1.2, 2.4]} labels={["1", "2", "4"]} grow={[1, 1, ease(ramp(t, 0, 0.6))]} />
 */
export const BarChart: React.FC<{
  position?: Vec3;
  rotationY?: number;
  values: number[];
  grow?: number | number[];
  labels?: string[];
  colors?: string[];
  width?: number;
  gap?: number;
  labelHeight?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, values, grow = 1, labels, colors = ["#58a6ff", "#58d66a", "#ffd24a", "#ff7a4a", "#c77dff"], width = 0.6, gap = 0.3, labelHeight = 0.3 }) => {
  const span = values.length * width + (values.length - 1) * gap;
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <Vox kind="stoneBrick" position={[0, 0.06, 0]} size={[span + 0.5, 0.12, width + 0.5]} />
      {values.map((value, i) => {
        const k = clamp01(Array.isArray(grow) ? (grow[i] ?? 1) : grow);
        return <Bar key={i} position={[-span / 2 + width / 2 + i * (width + gap), 0.12, 0]} height={value * k} width={width} color={colors[i % colors.length]} label={k > 0.05 ? labels?.[i] : undefined} labelHeight={labelHeight} />;
      })}
    </group>
  );
};

/**
 * A block arrow: UP for more, DOWN for less. `position` is its tail; it is `length` metres long and faces +Z.
 * `grow` (0–1) draws it out from the tail. Green goes up and red goes down unless you say otherwise.
 */
export const Arrow: React.FC<{ position?: Vec3; rotationY?: number; dir?: "up" | "down" | "right" | "left"; length?: number; grow?: number; thick?: number; color?: string; glow?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  dir = "up",
  length = 1.6,
  grow = 1,
  thick = 0.22,
  color,
  glow = 0.25,
}) => {
  const k = clamp01(grow);
  if (k <= 0.01) return null;
  const tint = color ?? (dir === "down" ? "#e8352b" : dir === "up" ? "#58d66a" : "#ffd24a");
  const turn = dir === "up" ? 0 : dir === "down" ? Math.PI : dir === "right" ? -Math.PI / 2 : Math.PI / 2;
  const head = thick * 2.2;
  const shaft = Math.max(0.02, length * k - head);
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <group rotation={[0, 0, turn]}>
        <Block position={[0, shaft / 2, 0]} size={[thick, shaft, thick]} color={tint} emissive={tint} emissiveIntensity={glow} />
        {/* The head: four steps, the way a triangle is built from blocks. */}
        {[0, 1, 2, 3].map((i) => (
          <Block key={i} position={[0, shaft + (head / 4) * (i + 0.5), 0]} size={[thick * (3.4 - i * 0.8), head / 4, thick]} color={tint} emissive={tint} emissiveIntensity={glow} />
        ))}
      </group>
    </group>
  );
};

/**
 * A pair of scales: what a thing is WORTH against what it COSTS. `position` is the floor under the post.
 * `tilt` runs −1 … 1: negative drops the LEFT pan (the −x side), positive the right. Put anything on a pan
 * with `left` and `right`: its origin is the middle of the pan's top.
 *
 *   <Balance tilt={0.8 * ease(ramp(t, 0, 0.7))} left={<Bread />} right={<CoinStack count={5} />} />
 */
export const Balance: React.FC<{ position?: Vec3; rotationY?: number; tilt?: number; left?: React.ReactNode; right?: React.ReactNode; scale?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  tilt = 0,
  left,
  right,
  scale = 1,
}) => {
  const angle = Math.max(-1, Math.min(1, tilt)) * 0.36;
  const arm = 1.05;
  const pivot = 1.7;
  const drop = 0.7;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <Vox kind="stoneBrick" position={[0, 0.1, 0]} size={[0.9, 0.2, 0.6]} />
      <Vox kind="log" position={[0, 0.2 + (pivot - 0.2) / 2, 0]} size={[0.16, pivot - 0.2, 0.16]} />
      <Block position={[0, pivot + 0.06, 0]} size={[0.24, 0.16, 0.24]} color="#d6dde2" metalness={0.2} roughness={0.5} />
      <group position={[0, pivot, 0]} rotation={[0, 0, angle]}>
        <Vox kind="planks" tint="#8a6a3a" size={[arm * 2 + 0.16, 0.1, 0.12]} />
      </group>
      {([-1, 1] as const).map((side) => {
        // The end of the beam swings on an arc; the pan under it hangs straight down.
        const x = side * arm * Math.cos(angle);
        const y = pivot + side * arm * Math.sin(angle);
        return (
          <group key={side} position={[x, y, 0]}>
            {[-0.24, 0.24].map((dx) => (
              <Block key={dx} position={[dx / 2, -drop / 2, 0]} size={[0.02, drop, 0.02]} rotation={[0, 0, dx > 0 ? 0.33 : -0.33]} color="#5c4630" castShadow={false} />
            ))}
            <Block position={[0, -drop - 0.03, 0]} size={[0.62, 0.06, 0.62]} color="#c9a53a" metalness={0.2} roughness={0.5} />
            <Block position={[0, -drop - 0.075, 0]} size={[0.4, 0.04, 0.4]} color="#8a6f22" />
            <group position={[0, -drop, 0]}>{side < 0 ? left : right}</group>
          </group>
        );
      })}
    </group>
  );
};
