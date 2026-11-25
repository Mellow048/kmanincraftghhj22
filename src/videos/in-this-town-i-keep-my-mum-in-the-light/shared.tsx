import type React from "react";
import { Block, clamp01, smoothstep } from "../../engine";
import type { Vec3 } from "../../engine";
import type { Timing } from "../../engine";
import { Neighbour } from "./actors";
import timingJson from "./timing.json";

export const timing = timingJson as unknown as Timing;

export const TAU = Math.PI * 2;
export const DOOR: Vec3 = [-3.72, 0, 18.1];
export const BOY: Vec3 = [-2.55, 0, 16.85];

export const win = (t: number, a: number, b: number) => smoothstep(clamp01((t - a) / (b - a)));

/** Her, pressed flat into the door frame, holding herself out of the street. */
export const HoldingIn: React.FC<{ at: Vec3 }> = ({ at }) => (
  <group position={at}>
    {[-1, 1].map((s) =>
      [0, 1, 2, 3].map((i) => (
        <Block
          key={`${s}${i}`}
          position={[s * 0.06, 0.55 + i * 0.42, -0.5 + i * 0.34]}
          size={[0.09, 0.5, 0.09]}
          color="#2a1f19"
          rotation={[s * 0.1, 0, s * 0.05]}
        />
      )),
    )}
    <Block position={[0, 1.05, -0.15]} size={[0.9, 0.7, 0.9]} color="#332419" />
    <Block position={[0, 1.08, 0.34]} size={[0.62, 0.52, 0.34]} color="#2a1e17" />
    {[[-0.2, 1.15], [-0.08, 1.1], [0.08, 1.1], [0.2, 1.15]].map((e, i) => (
      <Block key={i} position={[e[0], e[1], 0.52]} size={[0.09, 0.09, 0.05]} color={i % 2 ? "#a8241c" : "#d8352a"} />
    ))}
  </group>
);

/** The parents' evening, kept in the pocket at the bottom of the street: three chairs, three neighbours. */
export const Chairs: React.FC = () => (
  <group>
    {[-2.6, 0, 2.6].map((x, i) => (
      <group key={x} position={[x, 0, -5.0]}>
        <Block position={[0, 0.22, 0]} size={[0.62, 0.1, 0.62]} color="#6b5a44" />
        <Block position={[0, 0.46, -0.28]} size={[0.62, 0.5, 0.08]} color="#6b5a44" />
        <Block position={[0, 0.1, 0]} size={[0.5, 0.24, 0.5]} color="#4a3c2c" />
        <Neighbour position={[0, 0.27, 0]} rotationY={0} face={i === 1 ? "surprised" : "worried"} />
      </group>
    ))}
  </group>
);

/** Candles in every window, for the first try. */
export const Candles: React.FC = () => (
  <group>
    {[[-3.62, 2.15, 2.0], [-3.62, 2.15, 10.0], [-3.62, 2.15, 26.0], [3.62, 2.15, 2.0], [3.62, 2.15, 26.0]].map((p, i) => (
      <group key={i} position={[p[0], p[1], p[2]]}>
        <Block position={[0, 0, 0]} size={[0.14, 0.3, 0.14]} color="#efe4c8" />
        <Block position={[0, 0.2, 0]} size={[0.07, 0.12, 0.07]} color="#ffb347" />
      </group>
    ))}
  </group>
);
