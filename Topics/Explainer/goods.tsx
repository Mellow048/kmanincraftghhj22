import type React from "react";
import { Block, Vox } from "../../src/engine";
import type { Vec3 } from "../../src/engine";

/**
 * GOODS — the things money buys. An explainer about money needs ONE thing whose price everybody knows.
 * In a village that is a loaf of bread: keep to it for the whole film.
 *
 * Part of the Explainer pack (PACK.md). `position` is always the middle of the underside.
 */

/** A loaf of bread: a brown crust, a risen golden top, three cuts across it. `scale={2}` is a loaf big enough to be the subject of a shot. */
export const Bread: React.FC<{ position?: Vec3; rotationY?: number; scale?: number }> = ({ position = [0, 0, 0], rotationY = 0, scale = 1 }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Block position={[0, 0.07, 0]} size={[0.52, 0.14, 0.24]} color="#a8641f" />
    <Block position={[0, 0.17, 0]} size={[0.46, 0.08, 0.2]} color="#c98a34" />
    <Block position={[0, 0.225, 0]} size={[0.36, 0.04, 0.15]} color="#e0a84e" />
    {[-0.12, 0, 0.12].map((x) => (
      <Block key={x} position={[x, 0.2, 0]} rotation={[0, 0.5, 0]} size={[0.035, 0.1, 0.19]} color="#7a4a14" castShadow={false} />
    ))}
  </group>
);

/** An apple. */
export const Apple: React.FC<{ position?: Vec3; rotationY?: number; scale?: number; color?: string }> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, color = "#d8342a" }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Block position={[0, 0.1, 0]} size={[0.2, 0.2, 0.2]} color={color} />
    <Block position={[-0.045, 0.16, 0.101]} size={[0.05, 0.05, 0.01]} color="#ffd9d2" castShadow={false} />
    <Block position={[0, 0.225, 0]} size={[0.03, 0.06, 0.03]} color="#5c3f24" />
    <Block position={[0.05, 0.24, 0]} size={[0.08, 0.02, 0.05]} color="#4a8c33" />
  </group>
);

/** A wooden crate: stock, a delivery, "more of them". `size` is its side in metres. */
export const Crate: React.FC<{ position?: Vec3; rotationY?: number; size?: number; label?: React.ReactNode }> = ({ position = [0, 0, 0], rotationY = 0, size = 0.7, label }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="planks" position={[0, size / 2, 0]} size={[size, size, size]} />
    {[-1, 1].flatMap((sx) =>
      [-1, 1].map((sz) => <Block key={`${sx}${sz}`} position={[(sx * size) / 2, size / 2, (sz * size) / 2]} size={[0.07, size + 0.03, 0.07]} color="#5c3f24" />),
    )}
    {[0.035, size - 0.035].map((y) => (
      <Block key={y} position={[0, y, size / 2 + 0.001]} size={[size, 0.07, 0.03]} color="#5c3f24" castShadow={false} />
    ))}
    {label ? <group position={[0, size / 2, size / 2 + 0.02]}>{label}</group> : null}
  </group>
);

/** A shelf of `count` loaves, for a shop that has plenty, or one loaf for a shop that has not. Runs along x; `position` is the floor under its middle. */
export const BreadShelf: React.FC<{ position?: Vec3; rotationY?: number; count?: number; width?: number }> = ({ position = [0, 0, 0], rotationY = 0, count = 6, width = 2.2 }) => {
  const perRow = 3;
  const rows = 2;
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {[-1, 1].map((side) => (
        <Vox key={side} kind="darkPlanks" position={[(side * width) / 2, 0.75, 0]} size={[0.1, 1.5, 0.5]} />
      ))}
      {[0.55, 1.15].map((y) => (
        <Vox key={y} kind="planks" position={[0, y, 0]} size={[width, 0.08, 0.5]} />
      ))}
      {Array.from({ length: Math.min(count, perRow * rows) }, (_, i) => {
        const row = Math.floor(i / perRow);
        return <Bread key={i} position={[-width / 2 + (width / (perRow + 1)) * ((i % perRow) + 1), row === 0 ? 1.19 : 0.59, 0]} rotationY={((i * 37) % 7) * 0.06 - 0.18} scale={1.05} />;
      })}
    </group>
  );
};
