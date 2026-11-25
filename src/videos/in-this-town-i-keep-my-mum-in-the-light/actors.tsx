import type React from "react";
import { Block, MinecraftAvatar } from "../../engine";
import type { FaceName, MinecraftAvatarProps, Vec3 } from "../../engine";

/**
 * IN THIS TOWN, I KEEP MY MUM IN THE LIGHT — cast.
 *
 * MUM is a spider at domestic scale: body 1.15 wide, legs spanning about 2.8 metres, and a pink apron and bow so
 * that in frame one she reads as somebody's mother rather than a monster. She never moves fast in daylight.
 * DAD is the same part at 0.55 scale in cave-spider blue. The PHANTOM is a silhouette on purpose: body, two wings,
 * two dim eyes, nothing else.
 */

type P = { position?: Vec3; rotationY?: number; scale?: number };

const EYES: Array<[number, number, number]> = [
  [-0.26, 1.06, 0.86],
  [-0.12, 1.0, 0.9],
  [0.12, 1.0, 0.9],
  [0.26, 1.06, 0.86],
];

/** One leg: thigh out and up, knee, shin down. s is -1 for the left side. */
const Leg: React.FC<{ s: number; z: number; lift?: number }> = ({ s, z, lift = 0 }) => (
  <group>
    <Block position={[s * 0.6, 1.08 + lift, z]} size={[0.14, 0.8, 0.14]} color="#2a1f19" rotation={[0, 0, s * 0.6]} />
    <Block position={[s * 1.0, 0.66 + lift, z]} size={[0.13, 0.13, 0.13]} color="#241a15" />
    <Block position={[s * 1.28, 0.3 + lift, z]} size={[0.12, 0.66, 0.12]} color="#2a1f19" rotation={[0, 0, -s * 0.35]} />
  </group>
);

/**
 * The mum. `apron` puts her overalls on, `knit` gives her six needles, `lantern` hangs a lamp from one leg (the
 * thing she does herself in the first shot, and the last thing she holds all night).
 */
export const Spider: React.FC<
  P & { apron?: boolean; knit?: boolean; lantern?: boolean; body?: string; head?: string; legLift?: number }
> = ({
  position = [0, 0, 0],
  rotationY = 0,
  scale = 1,
  apron,
  knit,
  lantern,
  body = "#3a2a22",
  head = "#2e211b",
  legLift = 0,
}) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Block position={[0, 0.92, -0.5]} size={[1.15, 0.85, 1.1]} color={body} />
    <Block position={[0, 0.82, 0.5]} size={[0.82, 0.72, 0.78]} color={head} />
    {EYES.map((e, i) => (
      <Block key={i} position={e} size={[0.11, 0.11, 0.06]} color={i % 2 === 0 ? "#d8352a" : "#a8241c"} />
    ))}
    {/* fangs */}
    <Block position={[-0.13, 0.5, 0.78]} size={[0.1, 0.18, 0.1]} color="#15100d" />
    <Block position={[0.13, 0.5, 0.78]} size={[0.1, 0.18, 0.1]} color="#15100d" />
    {[-1, 1].map((s) =>
      [-0.55, -0.18, 0.18, 0.55].map((z, i) => (
        <Leg key={`${s}${i}`} s={s} z={z} lift={i === 1 || i === 2 ? legLift : 0} />
      )),
    )}
    {apron ? (
      <>
        <Block position={[0, 0.78, 0.2]} size={[0.66, 0.62, 0.06]} color="#e08aa0" />
        <Block position={[0, 1.44, 0.05]} size={[0.5, 0.34, 0.08]} color="#f0a7bb" />
        <Block position={[-0.2, 1.44, 0.05]} size={[0.18, 0.42, 0.1]} color="#f5bccc" rotation={[0, 0, 0.55]} />
        <Block position={[0.2, 1.44, 0.05]} size={[0.18, 0.42, 0.1]} color="#f5bccc" rotation={[0, 0, -0.55]} />
      </>
    ) : null}
    {knit ? (
      <>
        {[-0.45, -0.15, 0.15, 0.45].map((x, i) => (
          <Block key={i} position={[x, 1.15, 0.95]} size={[0.03, 0.52, 0.03]} color="#c9c3b4" rotation={[0, 0, x * 0.4]} />
        ))}
        <Block position={[0, 0.95, 1.05]} size={[0.5, 0.34, 0.08]} color="#7b4a8a" />
      </>
    ) : null}
    {lantern ? (
      <group position={[0.98, 1.5, 0.6]}>
        <Block position={[0, 0, 0]} size={[0.24, 0.24, 0.24]} color="#3a2c1c" />
        <Block position={[0, 0, 0]} size={[0.19, 0.19, 0.19]} color="#ffd479" />
        <pointLight position={[0, 0, 0]} color="#ffcf7a" intensity={7} distance={8} decay={2} />
      </group>
    ) : null}
  </group>
);

/** The dad: a cave spider, so the small blue one. */
export const Dad: React.FC<P> = ({ position = [0, 0, 0], rotationY = 0 }) => (
  <Spider position={position} rotationY={rotationY} scale={0.55} body="#2b3a5e" head="#33456e" />
);

/** A phantom: wide, slow, and never lit. Two wings and no face worth drawing. */
export const Phantom: React.FC<P & { flap?: number }> = ({ position = [0, 0, 0], rotationY = 0, flap = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Block position={[0, 0, 0]} size={[0.62, 0.6, 1.05]} color="#8ea1b8" />
    <Block position={[0, 0.1, 0.6]} size={[0.52, 0.5, 0.42]} color="#a3b6cc" />
    <Block position={[-0.15, 0.14, 0.82]} size={[0.11, 0.11, 0.05]} color="#e6eef7" />
    <Block position={[0.15, 0.14, 0.82]} size={[0.11, 0.11, 0.05]} color="#e6eef7" />
    <Block position={[0, -0.08, -0.62]} size={[0.2, 0.2, 0.55]} color="#7d90a6" />
    {[-1, 1].map((s) => (
      <Block
        key={s}
        position={[s * 1.15, 0.06, -0.1]}
        size={[2.25, 0.07, 0.8]}
        color="#9bacbf"
        rotation={[0, 0, s * (0.16 + flap)]}
      />
    ))}
  </group>
);

/** A lantern on the ground or held: the film's whole argument, in an object. */
export const HandLantern: React.FC<{ at: Vec3; lit?: boolean }> = ({ at, lit = true }) => (
  <group position={at}>
    <Block position={[0, 0, 0]} size={[0.28, 0.3, 0.28]} color="#3a2c1c" />
    <Block position={[0, 0, 0]} size={[0.22, 0.24, 0.22]} color={lit ? "#ffd479" : "#4a443c"} />
    <Block position={[0, 0.18, 0]} size={[0.1, 0.1, 0.1]} color="#3a2c1c" />
    {lit ? <pointLight position={[0, 0.1, 0]} color="#ffcf7a" intensity={6} distance={7} decay={2} /> : null}
  </group>
);

/** One block of glowstone, traded for everything he owned. */
export const Glowstone: React.FC<{ at: Vec3 }> = ({ at }) => (
  <group position={at}>
    <Block position={[0, 0, 0]} size={[0.62, 0.62, 0.62]} color="#ffd06a" />
    <Block position={[0, 0, 0]} size={[0.5, 0.5, 0.66]} color="#ffe6a8" />
    <pointLight position={[0, 0, 0]} color="#ffd98a" intensity={14} distance={12} decay={2} />
  </group>
);

type A2 = Partial<MinecraftAvatarProps>;

/** The teller. A jumper with too many sleeves, and a face that reports all of this as an ordinary week. */
export const Boy: React.FC<A2> = (p) => (
  <MinecraftAvatar
    scale={0.9}
    outfit="tee"
    skin="#e8bc93"
    hair="#2a1c12"
    face={"blank" as FaceName}
    colors={{ torso: "#84508f", arms: "#84508f", legs: "#3a3f55" }}
    blink
    {...p}
  />
);

/** The sleeves he does not need: three of them, hanging off the jumper. */
export const ExtraSleeves: React.FC<{ at: Vec3; rotY?: number }> = ({ at, rotY = 0 }) => (
  <group position={at} rotation={[0, rotY, 0]}>
    {[-0.22, 0, 0.22].map((x, i) => (
      <Block key={i} position={[x, 0.9 - i * 0.06, 0.1]} size={[0.12, 0.36, 0.12]} color="#84508f" rotation={[0, 0, x * 0.9]} />
    ))}
  </group>
);

/** A villager, for the neighbours who stand on their chairs. */
export const Neighbour: React.FC<A2> = (p) => (
  <MinecraftAvatar
    scale={1.0}
    outfit="gown"
    skin="#9a7a4f"
    hair="#3a2a18"
    face={"surprised" as FaceName}
    colors={{ torso: "#4f7a4a", arms: "#4f7a4a", legs: "#3b3a2e" }}
    {...p}
  />
);
