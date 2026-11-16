import type React from "react";
import { Block, MinecraftAvatar, Vox, clamp, getPose, shade, useFilmTime } from "../../engine";
import type { MinecraftAvatarProps, Pose, Timing, Vec3 } from "../../engine";
import { EAST, KID, SoundRings, WEST, ease, ramp, wordClock } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

/**
 * This film's own cast and things: a village where everyone is a cat, and the other half of it, where everyone is a dog.
 *
 * The pack (Topics/InThisTown/PACK.md) has no cats and no dogs, so all six kinds are built here, out of the same three
 * bodies the series already has: the player (`Pal`, a `MinecraftAvatar` with ears, whiskers or a snout, and a tail), the
 * villager (`Folk`: a robe, folded sleeves, one eyebrow) and the iron golem (`Guard`). What else is this story's:
 * the line of white blocks, the fish and the bone, the weather.
 *
 * The line runs north to south along x = 0. Cats live west of it (-X) and face EAST; dogs live east of it and face WEST.
 */

export { DEG, EAST, KID, NORTH, SOUTH, WEST, ease, ramp, Bits, Lantern, Puffs, SubscribeSign } from "../../../Topics/InThisTown";

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);
/** Seconds into its shot at which a word is said. `cut`: the shot cuts in that late. */
export const w = (cue: string, word: string, cut = 0, nth = 0) => wordAt(cue, word, nth) - cut;
export const tw = (t: number, a: number, b: number) => ease(ramp(t, a, b));
export const cueLen = (cue: string): number => {
  const c = (timing as unknown as { cues: Array<{ id: string; start: number; end: number }> }).cues.find((x) => x.id === cue);
  return c ? c.end - c.start : 2;
};

export type Kind = "cat" | "dog";
const FUR: Record<Kind, string[]> = {
  cat: ["#f0a24a", "#8f9096", "#34313a", "#f3ecdc", "#d2a66e", "#7a5232"],
  dog: ["#c98f52", "#7b4f2d", "#efe7d6", "#45403f", "#a9a59e", "#dcbd8c"],
};
/** Cats wear warm colours and dogs cool ones, so a side reads as a side from far off. 0 is the teller's red, and the dog kid's blue. */
const SHIRT: Record<Kind, string[]> = {
  cat: ["#c0392b", "#e2a03a", "#d9577a", "#b85f2a", "#e0c24a", "#c9643a"],
  dog: ["#2f6fb8", "#3d8f8a", "#4a5ab0", "#2f8f5a", "#5a7fd0", "#3a6a9a"],
};
const ROBE: Record<Kind, string[]> = {
  cat: ["#8a3b2a", "#b0702a", "#a04a62", "#c08a3a", "#7a4a2a", "#b8563a"],
  dog: ["#2f4f8a", "#2f6f6a", "#4a4a8a", "#3a6a4a", "#3f5f9a", "#51607a"],
};
export const furOf = (kind: Kind, who: number) => FUR[kind][((who % 6) + 6) % 6];
const PINK = "#ee93a8";
const WHITE = "#f8f6ee";

/** One bark is this long; `beat` is 0–1 through it, `open` how wide the mouth is. */
const barkOf = (t: number, phase: number, amount: number) => {
  const beat = (((t * 2.6 + phase * 0.37) % 1) + 1) % 1;
  const open = amount * (beat < 0.34 ? Math.sin((beat / 0.34) * Math.PI) : 0);
  return { beat, open };
};

/**
 * What makes a head a cat's or a dog's. Drawn inside the head, so it turns with it. `top` is the top of the head and
 * `mouth` the height of the mouth, both above the origin the head gives; `half` is half the head's width.
 */
const Headgear: React.FC<{ kind: Kind; fur: string; half: number; top: number; mouth: number; puff?: number; open?: number; beat?: number; rings?: boolean }> = ({
  kind,
  fur,
  half: h,
  top,
  mouth,
  puff = 0,
  open = 0,
  beat = 0,
  rings = true,
}) =>
  kind === "cat" ? (
    <>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * h * 0.62, top, 0]} rotation={[0, 0, -s * 0.12 * (1 - puff) - s * puff * 0.5]}>
          <Block position={[0, h * 0.2, 0]} size={[h * 0.62, h * 0.44, h * 0.4]} color={fur} />
          <Block position={[0, h * 0.56, 0]} size={[h * 0.34, h * 0.34, h * 0.32]} color={fur} />
          <Block position={[0, h * 0.2, h * 0.2 + 0.004]} size={[h * 0.3, h * 0.28, 0.01]} color={PINK} castShadow={false} />
        </group>
      ))}
      <Block position={[0, mouth + h * 0.34, h + 0.008]} size={[h * 0.24, h * 0.17, 0.02]} color={PINK} castShadow={false} />
      {[-1, 1].map((s) =>
        [-1, 1].map((v) => (
          <Block key={`${s}${v}`} position={[s * h * 1.12, mouth + h * 0.2 + v * h * 0.1, h * 0.96]} rotation={[0, 0, s * v * 0.16]} size={[h * 0.8, 0.012, 0.012]} color={WHITE} castShadow={false} />
        )),
      )}
      {/* the fur, standing up: on the top of the head, the cheeks and the back of the neck */}
      {puff > 0.02
        ? Array.from({ length: 11 }, (_, i) => {
            const a = (i / 11) * Math.PI * 2;
            const side = i % 2 ? 1 : 0.7;
            return (
              <group key={i} position={[Math.sin(a) * h * 0.98, top - h * (0.5 + side * 0.9) + (i % 3) * 0.02, -Math.abs(Math.cos(a)) * h * 0.7 + h * 0.1]} rotation={[0, 0, -Math.sin(a) * 1.2]}>
                <Block position={[0, puff * 0.05, 0]} size={[0.045, 0.1 * puff + 0.01, 0.045]} color={shade(fur, i % 2 ? 0.08 : -0.06)} castShadow={false} />
              </group>
            );
          })
        : null}
      {puff > 0.02
        ? [-0.5, 0, 0.5].map((x) => (
            <Block key={x} position={[x * h, top + 0.03 * puff, -h * 0.5]} rotation={[-0.5, 0, x * 0.5]} size={[0.05, 0.14 * puff + 0.01, 0.05]} color={shade(fur, 0.06)} castShadow={false} />
          ))
        : null}
    </>
  ) : (
    <>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * h * 1.08, top - h * 0.15, -h * 0.05]} rotation={[0, 0, s * (0.06 + open * 0.55)]}>
          <Block position={[0, -h * 0.55, 0]} size={[h * 0.26, h * 1.15, h * 0.8]} color={shade(fur, -0.3)} />
        </group>
      ))}
      <Block position={[0, mouth + h * 0.14, h * 1.3]} size={[h * 0.94, h * 0.46, h * 0.62]} color={shade(fur, 0.2)} />
      <Block position={[0, mouth + h * 0.3, h * 1.64]} size={[h * 0.36, h * 0.26, h * 0.12]} color="#1d1a1a" castShadow={false} />
      {/* the jaw drops and the mouth is red inside */}
      {open > 0.03 ? <Block position={[0, mouth - h * 0.12 - open * h * 0.16, h * 1.27]} size={[h * 0.8, open * h * 0.34, h * 0.5]} color="#8a1f24" castShadow={false} /> : null}
      <Block position={[0, mouth - h * 0.17 - open * h * 0.36, h * 1.28]} size={[h * 0.86, h * 0.16, h * 0.58]} color={shade(fur, 0.1)} />
      {open > 0.2 && rings ? <SoundRings position={[0, mouth, h * 1.7]} t={beat * 1.4} color="#ffffff" reach={h * 3.4} /> : null}
    </>
  );

/** A tail, drawn from where it joins the body: +Y is up and -Z is behind. */
const Tail: React.FC<{ kind: Kind; fur: string; up?: number; puff?: number; wag?: number; t: number; phase?: number; size?: number }> = ({ kind, fur, up = 0.25, puff = 0, wag = 0.3, t, phase = 0, size = 1 }) => {
  if (kind === "dog") {
    const swing = Math.sin(t * 15 + phase) * 0.75 * wag;
    return (
      <group rotation={[-0.75, 0, 0]} scale={size}>
        <group rotation={[0, 0, swing]}>
          <Block position={[0, 0.11, 0]} size={[0.075, 0.22, 0.075]} color={fur} />
          <group position={[0, 0.22, 0]} rotation={[0.35, 0, swing * 0.5]}>
            <Block position={[0, 0.08, 0]} size={[0.06, 0.16, 0.06]} color={shade(fur, 0.22)} />
          </group>
        </group>
      </group>
    );
  }
  const thick = 0.06 * (1 + puff * 1.6);
  const sway = Math.sin(t * 1.9 + phase) * 0.22 * (1 - puff) + Math.sin(t * 37 + phase) * 0.03 * puff;
  const bend = (1 - up) * 0.62;
  const seg = 0.19;
  const piece = (i: number): React.ReactNode =>
    i > 3 ? null : (
      <group position={[0, i ? seg : 0, 0]} rotation={[i ? bend : -2.05 + up * 1.95, 0, i ? sway * 0.6 : sway]}>
        <Block position={[0, seg / 2, 0]} size={[thick, seg + 0.01, thick]} color={i === 3 ? shade(fur, 0.18) : fur} />
        {puff > 0.05
          ? [0, 1, 2, 3].map((q) => (
              <Block key={q} position={[Math.cos(q * 1.57 + i) * thick * 0.6, seg * 0.5, Math.sin(q * 1.57 + i) * thick * 0.6]} rotation={[Math.sin(q * 1.57 + i) * 0.6, 0, -Math.cos(q * 1.57 + i) * 0.6]} size={[0.03, 0.1 * puff, 0.03]} color={shade(fur, 0.1)} castShadow={false} />
            ))
          : null}
        {piece(i + 1)}
      </group>
    );
  return <group scale={size}>{piece(0)}</group>;
};

// ----------------------------------------------------------------------------- the players

export type PalProps = Partial<MinecraftAvatarProps> & {
  kind: Kind;
  who?: number;
  /** Cats: 0–1, the fur standing up. */
  puff?: number;
  /** Cats: 0 the tail hangs in a curl, 1 it stands straight up. */
  tailUp?: number;
  /** Dogs: 0–1, barking. The jaw, the ears and the rings are driven by the clock. */
  bark?: number;
  /** Dogs: 0–1, the tail wagging. */
  wag?: number;
  /** Lying down: the tail is on the ground behind, so it is not drawn. */
  noTail?: boolean;
};

/** A cat player or a dog player: a person of the town with hands, in a shirt. Feet on `position`, facing +Z. */
export const Pal: React.FC<PalProps> = ({ kind, who = 0, puff = 0, tailUp = 0.25, bark = 0, wag = 0.3, noTail = false, position = [0, 0, 0], rotationY = 0, scale = 1, head, headPitch = 0, ...p }) => {
  const t = useFilmTime();
  const fur = furOf(kind, who);
  const { beat, open } = barkOf(t, who * 1.7 + position[2], kind === "dog" ? bark : 0);
  return (
    <>
      <MinecraftAvatar
        position={position}
        rotationY={rotationY}
        scale={scale}
        outfit="tee"
        skin={fur}
        hair={fur}
        colors={{ torso: SHIRT[kind][who % 6], arms: "skin", legs: shade(fur, -0.14) }}
        face="neutral"
        blink
        phase={who * 2.3 + 0.4}
        headPitch={headPitch - open * 0.3}
        head={
          <>
            <Headgear kind={kind} fur={fur} half={0.225} top={0.225} mouth={-0.135} puff={puff} open={open} beat={beat} />
            {head}
          </>
        }
        {...p}
      />
      {noTail ? null : (
        <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
          <group position={[0, 0.72, -0.12]}>
            <Tail kind={kind} fur={fur} up={tailUp} puff={puff} wag={wag} t={t} phase={who * 1.3} />
          </group>
        </group>
      )}
    </>
  );
};

/** The teller: a cat kid in the red shirt of every film of the series. */
export const Hero: React.FC<Omit<PalProps, "kind" | "who">> = (p) => <Pal kind="cat" who={0} scale={KID} {...p} />;
/** The dog kid who stands across the line from him. */
export const Pup: React.FC<Omit<PalProps, "kind" | "who">> = (p) => <Pal kind="dog" who={0} scale={KID} {...p} />;

/** The pose every cat knows: back up, head level, legs stiff, a shiver. `k` 0–1. `yaw` turns the head. */
export const archPose = (t: number, k: number, yaw = 0, sag = 0): Pose => {
  const b = getPose("idle", t);
  const q = Math.sin(t * 33) * 0.014 * k;
  const a = 0.55 * k * (1 - sag * 0.45);
  return {
    ...b,
    bodyY: 0.02 * k,
    bodyPitch: a,
    head: [-a * 0.85 + sag * 0.3, yaw, 0],
    armR: [-a * 1.1 + q, 0, -0.2 * k],
    armL: [-a * 1.1 - q, 0, 0.2 * k],
    legR: [-a + q, 0, -0.08 * k],
    legL: [-a - q, 0, 0.08 * k],
  };
};

// ----------------------------------------------------------------------------- the villagers

const U = 1.8 / 32;
export type FolkProps = {
  kind: Kind;
  who?: number;
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  fur?: string;
  robe?: string;
  /** Metres walked. Drives the waddle. */
  walk?: number;
  nod?: number;
  turn?: number;
  tilt?: number;
  lookAt?: Vec3;
  /** Body pitch, radians: a bow, or a cat's arched back. */
  lean?: number;
  puff?: number;
  tailUp?: number;
  bark?: number;
  wag?: number;
  sit?: boolean;
  /** A shawl and small glasses. */
  old?: boolean;
  /** Carried on the folded sleeves, since no paw ever comes out. */
  carry?: React.ReactNode;
  phase?: number;
};

/** A cat villager or a dog villager: the robe, the folded sleeves and the one eyebrow of a villager, on a cat or a dog. */
export const Folk: React.FC<FolkProps> = ({ kind, who = 1, position = [0, 0, 0], rotationY = 0, scale = 0.94, fur: furIn, robe: robeIn, walk = 0, nod = 0, turn = 0, tilt = 0, lookAt, lean = 0, puff = 0, tailUp = 0.25, bark = 0, wag = 0.3, sit = false, old = false, carry, phase = 0 }) => {
  const t = useFilmTime();
  const u = U;
  const fur = furIn ?? furOf(kind, who + 1);
  const robe = robeIn ?? ROBE[kind][who % 6];
  const gait = walk * 5.4;
  const swing = Math.sin(gait) * 0.55;
  const bob = Math.abs(Math.sin(gait)) * 0.03 + Math.sin(t * 1.3 + phase) * 0.005;
  const sway = Math.sin(gait) * 0.035;
  const { beat, open } = barkOf(t, who * 2.1 + position[2] + 0.4, kind === "dog" ? bark : 0);
  let yaw = turn;
  let pitch = nod;
  if (lookAt) {
    const dx = lookAt[0] - position[0];
    const dz = lookAt[2] - position[2];
    const dy = lookAt[1] - (position[1] + 29 * u * scale);
    let rel = Math.atan2(dx, dz) - rotationY;
    while (rel > Math.PI) rel -= Math.PI * 2;
    while (rel < -Math.PI) rel += Math.PI * 2;
    yaw = clamp(rel, -1.2, 1.2);
    pitch = clamp(-Math.atan2(dy, Math.hypot(dx, dz)), -0.6, 0.65);
  }
  const shut = (t + phase * 1.7 + who) % 3.3 < 0.12;
  const sleeve = shade(robe, 0.07);
  const shiver = Math.sin(t * 33 + phase) * 0.012 * puff;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 2 * u, 12 * u, 0]} rotation={[sit ? -Math.PI / 2 : s * swing, 0, 0]}>
          <Block position={[0, -6 * u, 0]} size={[3.8 * u, 12 * u, 4 * u]} color={shade(robe, -0.3)} />
        </group>
      ))}
      <group position={[0, 12 * u + bob, 0]} rotation={[lean + shiver, 0, sway]}>
        <Block position={[0, 6 * u, 0]} size={[8 * u, 12 * u, 6 * u]} color={robe} />
        <Block position={[0, -2.6 * u, 0]} size={[8.7 * u, 7.2 * u, 6.7 * u]} color={shade(robe, -0.09)} />
        {old ? <Block position={[0, 10.4 * u, 0]} size={[9.4 * u, 3.4 * u, 7.2 * u]} color="#e9e2d2" /> : null}
        <group position={[0, 9 * u, 1 * u]} rotation={[-0.75, 0, 0]}>
          {[-1, 1].map((s) => (
            <Block key={s} position={[s * 6 * u, -2 * u, 0]} size={[4 * u, 8 * u, 4 * u]} color={sleeve} />
          ))}
          <Block position={[0, -4 * u, 0]} size={[8 * u, 4 * u, 4 * u]} color={sleeve} />
          {carry ? <group position={[0, -1.6 * u, 3.2 * u]} rotation={[0.75, 0, 0]}>{carry}</group> : null}
          {[-1, 1].map((s) => (
            <Block key={`cuff${s}`} position={[s * 4 * u, -4 * u, 0]} size={[0.8 * u, 4.3 * u, 4.3 * u]} color={shade(robe, -0.42)} castShadow={false} />
          ))}
        </group>
        {/* the fur along the back, when it stands up */}
        {puff > 0.02
          ? [2, 5, 8, 11].map((y) => (
              <Block key={y} position={[0, y * u, -3.2 * u]} rotation={[-1.1, 0, 0]} size={[0.05, 0.13 * puff + 0.01, 0.05]} color={shade(fur, 0.08)} castShadow={false} />
            ))
          : null}
        <group position={[0, 2 * u, -3.2 * u]}>
          <Tail kind={kind} fur={fur} up={tailUp} puff={puff} wag={wag} t={t} phase={phase + who} size={1.05} />
        </group>
        <group position={[0, 12 * u, 0]} rotation={[pitch - lean * 0.8 - open * 0.3, yaw, tilt]}>
          <Block position={[0, 5 * u, 0]} size={[8 * u, 10 * u, 8 * u]} color={fur} />
          {/* one long eyebrow: it is still a villager */}
          <Block position={[0, 6.4 * u, 4.04 * u]} size={[6.2 * u, 1.1 * u, 0.12 * u]} color={shade(fur, -0.55)} castShadow={false} />
          {shut
            ? [-1, 1].map((s) => <Block key={s} position={[s * 2 * u, 5.2 * u, 4.04 * u]} size={[2 * u, 0.3 * u, 0.1 * u]} color={shade(fur, -0.4)} castShadow={false} />)
            : [-1, 1].map((s) => (
                <group key={s}>
                  <Block position={[s * 2.5 * u, 5.2 * u, 4.04 * u]} size={[1 * u, 1 * u, 0.1 * u]} color="#fbfbf5" castShadow={false} />
                  <Block position={[s * 1.5 * u, 5.2 * u, 4.04 * u]} size={[1 * u, 1 * u, 0.1 * u]} color={kind === "cat" ? "#2f8f3a" : "#5a3a1e"} castShadow={false} />
                </group>
              ))}
          {old
            ? [-1, 1].map((s) => <Block key={`g${s}`} position={[s * 2 * u, 5.2 * u, 4.2 * u]} size={[2.6 * u, 1.9 * u, 0.06 * u]} color="#dfeaf0" opacity={0.55} transparent castShadow={false} />)
            : null}
          <Headgear kind={kind} fur={fur} half={4 * u} top={10 * u} mouth={2.2 * u} puff={puff} open={open} beat={beat} />
        </group>
      </group>
    </group>
  );
};

// ----------------------------------------------------------------------------- the golems

const IRON = "#d9d3c5";
/**
 * The cat golem or the dog golem. Feet on `position`, facing +Z, 2.7 m tall. `armR` / `armL`: 0 hangs, -1.5 points ahead.
 * `sit` 0–1 lowers it onto the ground with the legs straight out. `grass` 0–1 grows grass and flowers over the feet.
 */
export const Guard: React.FC<{
  kind: Kind;
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  walk?: number;
  armR?: number;
  armL?: number;
  headPitch?: number;
  headYaw?: number;
  bow?: number;
  puff?: number;
  tailUp?: number;
  bark?: number;
  wag?: number;
  sit?: number;
  grass?: number;
}> = ({ kind, position = [0, 0, 0], rotationY = 0, scale = 1, walk = 0, armR, armL, headPitch = 0, headYaw = 0, bow = 0, puff = 0, tailUp = 0.3, bark = 0, wag = 0.2, sit = 0, grass = 0 }) => {
  const t = useFilmTime();
  const tint = kind === "cat" ? IRON : "#cdbfa8";
  const swing = Math.sin(walk * 2.4) * 0.4;
  const bob = Math.abs(Math.sin(walk * 2.4)) * 0.05 + Math.sin(t * 1.1) * 0.008;
  const angle = (s: number) => (s > 0 ? armR : armL) ?? -s * swing * 0.7 - sit * 0.5;
  const { beat, open } = barkOf(t * 0.62, 0.3, kind === "dog" ? bark : 0);
  const hip = 1.0 - sit * 0.84;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.25, hip, 0]} rotation={[s * swing * (1 - sit) - (sit * Math.PI) / 2, 0, 0]}>
          <Vox kind="stone" tint={shade(tint, -0.06)} position={[0, -0.5, 0]} size={[0.375, 1.0, 0.31]} />
        </group>
      ))}
      {/* it has stood here so long that the grass has taken its feet */}
      {grass > 0.02
        ? Array.from({ length: 26 }, (_, i) => {
            const a = i * 2.4;
            const r = 0.2 + (i % 5) * 0.075;
            const hgt = grass * (0.3 + (i % 4) * 0.14);
            return (
              <group key={i} position={[Math.cos(a) * r * 1.5, 0, Math.sin(a) * r * 1.1]}>
                <Block position={[0, hgt / 2, 0]} size={[0.09, hgt, 0.09]} color={i % 2 ? "#4f9a34" : "#63b043"} castShadow={false} />
                {i % 4 === 0 && grass > 0.7 ? <Block position={[0, hgt + 0.06, 0]} size={[0.16, 0.13, 0.16]} color={i % 8 ? "#f2d24a" : "#e8566a"} castShadow={false} /> : null}
              </group>
            );
          })
        : null}
      <group position={[0, hip + bob, 0]} rotation={[bow * 0.6, 0, 0]}>
        <Vox kind="stone" tint={shade(tint, -0.04)} position={[0, 0.16, 0]} size={[0.56, 0.32, 0.375]} />
        <Vox kind="stone" tint={tint} position={[0, 0.69, 0]} size={[1.125, 0.75, 0.69]} />
        <Block position={[-0.34, 0.62, 0.35]} size={[0.13, 0.52, 0.02]} color="#4f8a3a" castShadow={false} />
        <Block position={[0.3, 0.42, 0.35]} size={[0.13, 0.18, 0.02]} color="#4f8a3a" castShadow={false} />
        {kind === "dog" ? (
          <>
            <Block position={[0, 1.07, 0.03]} size={[0.6, 0.1, 0.6]} color="#b0302a" />
            <Block position={[0, 0.98, 0.34]} size={[0.13, 0.13, 0.03]} color="#f2c84a" castShadow={false} />
          </>
        ) : null}
        {puff > 0.02
          ? [0.3, 0.55, 0.8, 1.02].map((y, i) => (
              <Block key={y} position={[i % 2 ? 0.14 : -0.14, y, -0.37]} rotation={[-1.1, 0, 0]} size={[0.11, 0.3 * puff + 0.01, 0.11]} color={shade(tint, -0.12)} castShadow={false} />
            ))
          : null}
        <group position={[0, 0.12, -0.36]}>
          <Tail kind={kind} fur={shade(tint, -0.1)} up={tailUp} puff={puff} wag={wag} t={t * 0.7} phase={2} size={2.3} />
        </group>
        <group position={[0, 1.06, 0.06]} rotation={[headPitch - open * 0.2, headYaw, 0]}>
          <Vox kind="stone" tint={tint} position={[0, 0.31, 0]} size={[0.5, 0.62, 0.5]} />
          <Block position={[0, 0.47, 0.253]} size={[0.44, 0.07, 0.02]} color="#8d877a" castShadow={false} />
          {[-1, 1].map((s) => (
            <Block key={s} position={[s * 0.13, 0.385, 0.254]} size={[0.11, 0.075, 0.02]} color="#8a1c16" emissive="#ff3a24" emissiveIntensity={0.55} castShadow={false} />
          ))}
          <Headgear kind={kind} fur={shade(tint, -0.07)} half={0.25} top={0.62} mouth={0.16} puff={puff} open={open} beat={beat} />
        </group>
        {[-1, 1].map((s) => (
          <group key={s} position={[s * 0.69, 1.0, 0]} rotation={[angle(s), 0, 0]}>
            <Vox kind="stone" tint={shade(tint, -0.03)} position={[0, -0.94, 0]} size={[0.25, 1.875, 0.375]} />
          </group>
        ))}
      </group>
    </group>
  );
};

// ----------------------------------------------------------------------------- things

/** How far north and south the line runs, and how big one block of it is. */
export const LINE_N = -15;
export const LINE_S = 16;
export const BLOCK = 0.5;
export const LINE_BLOCKS = Math.round((LINE_S - LINE_N) / BLOCK);
export const lineZ = (i: number) => LINE_S - BLOCK / 2 - i * BLOCK;
/** The well stands on the line: the line stops at its wall and goes on behind it. */
export const WELL: Vec3 = [0, 0, -8];
const inWell = (z: number) => Math.abs(z - WELL[2]) < 1.3;

/** One block of the line: white wool, with a seam. `position` is its middle. */
export const LineBlock: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number }> = ({ position = [0, 0, 0], rotation, scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Vox kind="wool" tint="#f7f5ee" size={[BLOCK - 0.02, 0.36, BLOCK - 0.02]} />
    <Block position={[0, 0.183, 0]} size={[BLOCK - 0.1, 0.01, BLOCK - 0.1]} color="#e3dfd2" castShadow={false} />
  </group>
);

/** The line, block 0 at the south end. `gone(i)` says a block has been taken. */
export const Line: React.FC<{ gone?: (i: number) => boolean }> = ({ gone }) => (
  <>
    {Array.from({ length: LINE_BLOCKS }, (_, i) => (inWell(lineZ(i)) || gone?.(i) ? null : <LineBlock key={i} position={[0, 0.18, lineZ(i)]} />))}
  </>
);

export const Fish: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number }> = ({ position = [0, 0, 0], rotation, scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block size={[0.3, 0.13, 0.06]} color="#6fa6d8" />
    <Block position={[0.02, -0.035, 0.001]} size={[0.24, 0.05, 0.062]} color="#dfeaf2" castShadow={false} />
    <Block position={[-0.2, 0, 0]} size={[0.1, 0.18, 0.05]} color="#4f86c0" />
    <Block position={[0.09, 0.02, 0.032]} size={[0.03, 0.03, 0.01]} color="#15151a" castShadow={false} />
  </group>
);

export const Bone: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number }> = ({ position = [0, 0, 0], rotation, scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block size={[0.3, 0.06, 0.06]} color="#f2efe2" />
    {[-1, 1].map((s) => [-1, 1].map((v) => <Block key={`${s}${v}`} position={[s * 0.16, v * 0.035, 0]} size={[0.08, 0.07, 0.07]} color="#f7f5ea" />))}
  </group>
);

/** Rain, or snow: the same on every render. */
export const Weather: React.FC<{ center: Vec3; t: number; snow?: boolean; amount?: number; area?: [number, number]; count?: number; height?: number }> = ({ center, t, snow = false, amount = 1, area = [14, 16], count = 200, height = 9 }) => (
  <>
    {Array.from({ length: Math.round(count * clamp(amount, 0, 1)) }, (_, i) => {
      const fx = ((i * 0.6180339) % 1) - 0.5;
      const fz = ((i * 0.7548776) % 1) - 0.5;
      const speed = snow ? 1.3 + (i % 5) * 0.2 : 11 + (i % 5);
      const y = height - ((t * speed + i * 1.37) % height);
      const drift = snow ? Math.sin(t * 1.3 + i) * 0.25 : 0;
      return <Vox key={i} kind="wool" tint={snow ? "#ffffff" : "#cfe2ff"} position={[center[0] + fx * area[0] + drift, center[1] + y, center[2] + fz * area[1]]} size={snow ? [0.07, 0.07, 0.07] : [0.02, 0.42, 0.02]} />;
    })}
  </>
);

// ----------------------------------------------------------------------------- the two sides

type Member = { type: "pal" | "folk"; who: number; z: number; back?: number; kid?: boolean };
/** Who stands at the line, south to north, the same on both sides. The teller and the dog kid stand at z 2, the golems at z -3. */
export const ROW: Member[] = [
  { type: "folk", who: 1, z: 0.1 },
  { type: "pal", who: 1, z: 4.2 },
  { type: "folk", who: 2, z: 6.3 },
  { type: "pal", who: 2, z: 8.5 },
  { type: "folk", who: 3, z: 10.7 },
  { type: "pal", who: 3, z: 12.9 },
  { type: "pal", who: 4, z: 1.0, back: 1.5 },
  { type: "folk", who: 4, z: 3.2, back: 1.7 },
  { type: "pal", who: 5, z: 5.3, back: 1.4, kid: true },
  { type: "folk", who: 5, z: 7.5, back: 1.8 },
  { type: "pal", who: 1, z: 9.8, back: 1.5, kid: true },
  { type: "folk", who: 0, z: 11.9, back: 1.6 },
];
export const KID_Z = 2;
export const GOLEM_Z = -3;
export const GAP = 1.35;
/** How far from the line each golem stands: close enough that the two are nose to nose when they lean in. */
export const GOLEM_X = 1.12;

export type SideProps = {
  kind: Kind;
  t: number;
  /** Metres from the line to the front row. */
  gap?: number;
  /** Metres walked, for the feet. */
  walk?: number;
  /** Walking away from the line: they have turned round. */
  away?: boolean;
  /** Cats: 0–1 fur up; 0–1 back up; 0–1 turned sideways. */
  puff?: number;
  arch?: number;
  side?: number;
  /** Cats: 0–1, too tired to hold it. */
  sag?: number;
  /** Dogs: 0–1 barking. */
  bark?: number;
  wag?: number;
  face?: MinecraftAvatarProps["face"];
  /** Everybody looks here. */
  lookAt?: Vec3;
  /** Heads turn this much (radians) at their own pace: looking for something. */
  search?: number;
  /** The kid of this side stands in the row (the teller, or the dog kid). */
  kid?: boolean;
  golem?: boolean;
  golemGrass?: number;
  /** Leave these out of the row, by index in ROW. */
  skip?: number[];
};

/** One side of the village, standing at the line (or walking up to it, or home from it). */
export const Side: React.FC<SideProps> = ({ kind, t, gap = GAP, walk = 0, away = false, puff = 0, arch = 0, side = 0, sag = 0, bark = 0, wag = 0.3, face, lookAt, search = 0, kid = true, golem = true, golemGrass = 0, skip }) => {
  const s = kind === "cat" ? -1 : 1;
  const toLine = kind === "cat" ? EAST : WEST;
  const heading = away ? -toLine : toLine;
  const mood = face ?? (kind === "cat" ? (puff > 0.5 ? "angry" : "neutral") : bark > 0.5 ? "angry" : "neutral");
  const one = (m: Member, i: number, isKid: boolean) => {
    const x = s * (gap + (m.back ?? 0));
    const turnSide = (i % 2 ? 1 : -1) * side * 1.25;
    const rot = heading + (kind === "cat" ? turnSide : 0);
    const look = search ? Math.sin(t * (1.1 + (i % 3) * 0.3) + i * 1.9) * search : 0;
    const headYaw = (kind === "cat" ? -turnSide * 0.95 : 0) + look;
    const walking = walk > 0;
    const key = `${kind}${i}`;
    const p: Vec3 = [x, 0, m.z];
    const wk = walk + i * 0.37;
    if (m.type === "folk")
      return <Folk key={key} kind={kind} who={m.who} position={p} rotationY={rot} walk={walking ? wk : 0} lean={arch * 0.42 * (1 - sag * 0.5)} puff={puff} tailUp={0.25 + 0.75 * Math.max(puff, arch)} bark={bark} wag={wag} turn={headYaw} nod={sag * 0.25} lookAt={lookAt} phase={i * 1.3} />;
    const cat = kind === "cat" && (arch > 0.02 || puff > 0.02);
    return (
      <Pal
        key={key}
        kind={kind}
        who={isKid ? 0 : m.who}
        scale={isKid || m.kid ? KID : 1}
        position={p}
        rotationY={rot}
        puff={puff}
        tailUp={0.25 + 0.75 * Math.max(puff, arch)}
        bark={bark}
        wag={wag}
        face={sag > 0.5 ? "sleepy" : mood}
        {...(cat ? { pose: archPose(t + i, arch, headYaw, sag) } : walking ? { animation: "walk" as const, animDistance: wk, headYaw } : { animation: "idle" as const, headYaw })}
        {...(lookAt && !cat ? { lookAt } : {})}
      />
    );
  };
  return (
    <>
      {ROW.map((m, i) => (skip?.includes(i) ? null : one(m, i, false)))}
      {kid ? one({ type: "pal", who: 0, z: KID_Z }, 20, true) : null}
      {golem ? (
        <Guard kind={kind} position={[s * (GOLEM_X + Math.max(0, gap - GAP)), 0, GOLEM_Z]} rotationY={heading} walk={walk > 0 ? walk * 0.8 : 0} puff={puff} tailUp={0.3 + 0.7 * Math.max(puff, arch)} bark={bark} wag={wag} grass={golemGrass} headYaw={search ? Math.sin(t * 0.9) * search * 0.7 : 0} />
      ) : null}
    </>
  );
};

export const posed = (clip: Parameters<typeof getPose>[0], t: number, patch: Partial<Pose>): Pose => ({ ...getPose(clip, t), ...patch });

/** After the line: where everybody stands once nobody has a side. [x, z, facing]. Even ones are cats, odd ones dogs. */
const MIX: Array<[number, number, number]> = [
  [-3.4, 9.5, 0.4], [3.1, 10.2, -0.5], [-1.6, 12.0, 0.2], [1.9, 12.6, -0.2], [-5.2, 6.4, 0.7], [5.0, 7.0, -0.7],
  [2.6, 1.2, -0.6], [-2.8, 0.6, 0.6], [4.6, 3.6, -0.9], [-4.8, 3.0, 0.9], [-1.2, -1.4, 0.3], [1.4, -1.0, -0.3],
  [-6.6, 10.6, 0.8], [6.4, 11.4, -0.8], [0.4, 14.6, 0], [-0.8, 8.0, 0.1], [6.8, 0.4, -1.0], [-6.9, -0.6, 1.0],
];
/** The whole village with no sides: cats and dogs standing anywhere. `cheer` 0–1 makes them bounce. `spread` scales the layout. */
export const Mixed: React.FC<{ t: number; cheer?: number; lookAt?: Vec3; spread?: number; skip?: number[] }> = ({ t, cheer = 0, lookAt, spread = 1, skip }) => (
  <>
    {MIX.map(([x, z, r], i) => {
      if (skip?.includes(i)) return null;
      const kind: Kind = i % 2 ? "dog" : "cat";
      const hop = cheer * Math.abs(Math.sin(t * 7 + i * 1.3)) * 0.16;
      const p: Vec3 = [x * spread, hop, 5 + (z - 5) * spread];
      return i % 3 === 1 ? (
        <Folk key={i} kind={kind} who={i} position={p} rotationY={r} lookAt={lookAt} wag={1} tailUp={0.9} phase={i} />
      ) : (
        <Pal key={i} kind={kind} who={1 + (i % 5)} scale={i % 4 === 0 ? KID : 1} position={p} rotationY={r} animation={cheer > 0.5 ? "cheer" : "idle"} face="grin" wag={1} tailUp={0.9} {...(lookAt ? { lookAt } : {})} />
      );
    })}
  </>
);
