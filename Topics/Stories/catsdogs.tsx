import type React from "react";
import { Block, MinecraftAvatar, Vox, clamp, getPose, shade, useFilmTime } from "../../src/engine";
import type { MinecraftAvatarProps, Pose, Vec3 } from "../../src/engine";
import { SoundRings } from "./creatures";

/**
 * CATS AND DOGS — the three bodies of the series (the player, the villager, the iron golem), each as a cat and as a dog.
 *
 * Part of the topic's pack (see PACK.md, "Cats and dogs"). Built for "In This Town, We Are All Cats", which the owner
 * loved (2026-11-15: "put the cat and dog skins on the templates for other agents to use if i want something new").
 * How each is staged, shot by shot, is in reference/we-are-all-cats/source/.
 *
 *   <CatPlayer who={2} animation="walk" />          a cat with hands, in a shirt
 *   <DogVillager who={4} bark={1} />                a dog in a robe, barking
 *   <CatGolem puff={1} tailUp={1} />                the cat golem, fur up
 *   <CatDogPlayer kind={i % 2 ? "dog" : "cat"} />   either, picked by `kind`
 *
 * What a cat does: `puff` 0–1 (fur up on the head, the back and the tail), `tailUp` 0–1, and `catArchPose` for the
 * arched back. What a dog does: `bark` 0–1 (the jaw drops, the ears fly, white rings leave the mouth, all on the film
 * clock) and `wag` 0–1. A prop of the other animal is ignored, so one crowd can be given all of them.
 *
 * `who` picks the coat and the clothes: six of each, cats in warm colours and dogs in cool ones.
 */

/** Which of the two. Every part here takes it as `kind`. */
export type CatOrDog = "cat" | "dog";
/** Six coats each. `who` picks one, the same every time. */
export const CAT_DOG_FUR: Record<CatOrDog, string[]> = {
  cat: ["#f0a24a", "#8f9096", "#34313a", "#f3ecdc", "#d2a66e", "#7a5232"],
  dog: ["#c98f52", "#7b4f2d", "#efe7d6", "#45403f", "#a9a59e", "#dcbd8c"],
};
/** Shirts. Cats wear warm colours and dogs cool ones, so a crowd of each reads as a side from far off. 0 is red for the cat and blue for the dog: the two leads. */
export const CAT_DOG_SHIRT: Record<CatOrDog, string[]> = {
  cat: ["#c0392b", "#e2a03a", "#d9577a", "#b85f2a", "#e0c24a", "#c9643a"],
  dog: ["#2f6fb8", "#3d8f8a", "#4a5ab0", "#2f8f5a", "#5a7fd0", "#3a6a9a"],
};
/** Villagers' robes: warm for cats, cool for dogs. */
export const CAT_DOG_ROBE: Record<CatOrDog, string[]> = {
  cat: ["#8a3b2a", "#b0702a", "#a04a62", "#c08a3a", "#7a4a2a", "#b8563a"],
  dog: ["#2f4f8a", "#2f6f6a", "#4a4a8a", "#3a6a4a", "#3f5f9a", "#51607a"],
};
/** The coat of number `who`. */
export const catDogFur = (kind: CatOrDog, who: number) => CAT_DOG_FUR[kind][((who % 6) + 6) % 6];
const PINK = "#ee93a8";
const WHITE = "#f8f6ee";

/** One bark is this long; `beat` is 0–1 through it, `open` how wide the mouth is. */
const barkOf = (t: number, phase: number, amount: number) => {
  const beat = (((t * 2.6 + phase * 0.37) % 1) + 1) % 1;
  const open = amount * (beat < 0.34 ? Math.sin((beat / 0.34) * Math.PI) : 0);
  return { beat, open };
};

/**
 * What makes ANY head a cat's or a dog's: two ears, a pink nose and whiskers, or two hanging ears, a snout and a jaw.
 * Draw it inside the head's group, so it turns with it. `top` is the top of the head and `mouth` the height of the
 * mouth, both above the origin the head gives; `half` is half the head's width. `puff` 0–1 stands a cat's fur up.
 * `open` 0–1 drops a dog's jaw, and `beat` 0–1 runs the white rings of one bark (`rings={false}` leaves them out).
 * This is how to make a cat or a dog of a body that is not here yet (a zombie, a pillager): give it this and a `CatDogTail`.
 */
export const CatDogHead: React.FC<{ kind: CatOrDog; fur: string; half: number; top: number; mouth: number; puff?: number; open?: number; beat?: number; rings?: boolean }> = ({
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

/**
 * A tail, drawn from where it joins the body: +Y is up and -Z is behind. A cat's is long, curls, sways, and with `up` 1
 * stands straight (`puff` makes it a bottle brush). A dog's is short and wags (`wag` 0–1). `t` is the film time.
 */
export const CatDogTail: React.FC<{ kind: CatOrDog; fur: string; up?: number; puff?: number; wag?: number; t: number; phase?: number; size?: number }> = ({ kind, fur, up = 0.25, puff = 0, wag = 0.3, t, phase = 0, size = 1 }) => {
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

export type CatDogPlayerProps = Partial<MinecraftAvatarProps> & {
  kind: CatOrDog;
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

/**
 * A cat player or a dog player: a `MinecraftAvatar` (hands, faces, every clip and pose) with a cat's or a dog's head
 * and a tail. Takes every avatar prop: `animation`, `pose`, `face`, `lookAt`, `scale`… Feet on `position`, facing +Z.
 */
export const CatDogPlayer: React.FC<CatDogPlayerProps> = ({ kind, who = 0, puff = 0, tailUp = 0.25, bark = 0, wag = 0.3, noTail = false, position = [0, 0, 0], rotationY = 0, scale = 1, head, headPitch = 0, ...p }) => {
  const t = useFilmTime();
  const fur = catDogFur(kind, who);
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
        colors={{ torso: CAT_DOG_SHIRT[kind][who % 6], arms: "skin", legs: shade(fur, -0.14) }}
        face="neutral"
        blink
        phase={who * 2.3 + 0.4}
        headPitch={headPitch - open * 0.3}
        head={
          <>
            <CatDogHead kind={kind} fur={fur} half={0.225} top={0.225} mouth={-0.135} puff={puff} open={open} beat={beat} />
            {head}
          </>
        }
        {...p}
      />
      {noTail ? null : (
        <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
          <group position={[0, 0.72, -0.12]}>
            <CatDogTail kind={kind} fur={fur} up={tailUp} puff={puff} wag={wag} t={t} phase={who * 1.3} />
          </group>
        </group>
      )}
    </>
  );
};


/**
 * The pose every cat knows: back up, head level, legs stiff, a shiver. `k` 0–1, `yaw` turns the head, `sag` 0–1 is a
 * cat too tired to hold it. Give it to a cat player as `pose`, with `puff` and `tailUp` on the same number.
 */
export const catArchPose = (t: number, k: number, yaw = 0, sag = 0): Pose => {
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
export type CatDogVillagerProps = {
  kind: CatOrDog;
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

/**
 * A cat villager or a dog villager: the robe, the folded sleeves and the one eyebrow of a villager, on a cat or a dog.
 * No hands: what it holds lies on its sleeves (`carry`). Feet on `position`, facing +Z, a little under a player's height.
 */
export const CatDogVillager: React.FC<CatDogVillagerProps> = ({ kind, who = 1, position = [0, 0, 0], rotationY = 0, scale = 0.94, fur: furIn, robe: robeIn, walk = 0, nod = 0, turn = 0, tilt = 0, lookAt, lean = 0, puff = 0, tailUp = 0.25, bark = 0, wag = 0.3, sit = false, old = false, carry, phase = 0 }) => {
  const t = useFilmTime();
  const u = U;
  const fur = furIn ?? catDogFur(kind, who + 1);
  const robe = robeIn ?? CAT_DOG_ROBE[kind][who % 6];
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
          <CatDogTail kind={kind} fur={fur} up={tailUp} puff={puff} wag={wag} t={t} phase={phase + who} size={1.05} />
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
          <CatDogHead kind={kind} fur={fur} half={4 * u} top={10 * u} mouth={2.2 * u} puff={puff} open={open} beat={beat} />
        </group>
      </group>
    </group>
  );
};

// ----------------------------------------------------------------------------- the golems

const IRON = "#d9d3c5";
export type CatDogGolemProps = {
  kind: CatOrDog;
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
};

/**
 * The cat golem or the dog golem: an iron golem with ears, whiskers and a long tail, or with hanging ears, a snout, a
 * red collar and a tag. Feet on `position`, facing +Z, 2.7 m tall. `armR` / `armL`: 0 hangs, -1.5 points ahead.
 * `sit` 0–1 lowers it onto the ground with the legs straight out. `grass` 0–1 grows grass and flowers over the feet.
 */
export const CatDogGolem: React.FC<CatDogGolemProps> = ({ kind, position = [0, 0, 0], rotationY = 0, scale = 1, walk = 0, armR, armL, headPitch = 0, headYaw = 0, bow = 0, puff = 0, tailUp = 0.3, bark = 0, wag = 0.2, sit = 0, grass = 0 }) => {
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
          <CatDogTail kind={kind} fur={shade(tint, -0.1)} up={tailUp} puff={puff} wag={wag} t={t * 0.7} phase={2} size={2.3} />
        </group>
        <group position={[0, 1.06, 0.06]} rotation={[headPitch - open * 0.2, headYaw, 0]}>
          <Vox kind="stone" tint={tint} position={[0, 0.31, 0]} size={[0.5, 0.62, 0.5]} />
          <Block position={[0, 0.47, 0.253]} size={[0.44, 0.07, 0.02]} color="#8d877a" castShadow={false} />
          {[-1, 1].map((s) => (
            <Block key={s} position={[s * 0.13, 0.385, 0.254]} size={[0.11, 0.075, 0.02]} color="#8a1c16" emissive="#ff3a24" emissiveIntensity={0.55} castShadow={false} />
          ))}
          <CatDogHead kind={kind} fur={shade(tint, -0.07)} half={0.25} top={0.62} mouth={0.16} puff={puff} open={open} beat={beat} />
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

// ----------------------------------------------------------------------------- what they like

/** A fish, 30 cm, lying along X. `position` is its middle. */
export const Fish: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number }> = ({ position = [0, 0, 0], rotation, scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block size={[0.3, 0.13, 0.06]} color="#6fa6d8" />
    <Block position={[0.02, -0.035, 0.001]} size={[0.24, 0.05, 0.062]} color="#dfeaf2" castShadow={false} />
    <Block position={[-0.2, 0, 0]} size={[0.1, 0.18, 0.05]} color="#4f86c0" />
    <Block position={[0.09, 0.02, 0.032]} size={[0.03, 0.03, 0.01]} color="#15151a" castShadow={false} />
  </group>
);

/** A bone, 30 cm, lying along X. `position` is its middle. */
export const Bone: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number }> = ({ position = [0, 0, 0], rotation, scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block size={[0.3, 0.06, 0.06]} color="#f2efe2" />
    {[-1, 1].map((s) => [-1, 1].map((v) => <Block key={`${s}${v}`} position={[s * 0.16, v * 0.035, 0]} size={[0.08, 0.07, 0.07]} color="#f7f5ea" />))}
  </group>
);

// ----------------------------------------------------------------------------- by name

type Of<P> = Omit<P, "kind">;
/** A cat player. The same as `<CatDogPlayer kind="cat" />`. */
export const CatPlayer: React.FC<Of<CatDogPlayerProps>> = (p) => <CatDogPlayer kind="cat" {...p} />;
/** A dog player. */
export const DogPlayer: React.FC<Of<CatDogPlayerProps>> = (p) => <CatDogPlayer kind="dog" {...p} />;
/** A cat villager. */
export const CatVillager: React.FC<Of<CatDogVillagerProps>> = (p) => <CatDogVillager kind="cat" {...p} />;
/** A dog villager. */
export const DogVillager: React.FC<Of<CatDogVillagerProps>> = (p) => <CatDogVillager kind="dog" {...p} />;
/** The cat golem. */
export const CatGolem: React.FC<Of<CatDogGolemProps>> = (p) => <CatDogGolem kind="cat" {...p} />;
/** The dog golem. */
export const DogGolem: React.FC<Of<CatDogGolemProps>> = (p) => <CatDogGolem kind="dog" {...p} />;
