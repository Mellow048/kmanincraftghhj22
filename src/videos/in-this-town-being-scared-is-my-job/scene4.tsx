import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Block, Boss, Bucket, EAST, Farm, Glow, Kevin, Me, NORTH, NewOne, PLACE, SOUTH, Under, WEST, posed, timing, tw, w } from "./kit";
import { Others } from "./scene1";

/** 04 — The boss looks up. Then he comes back with a new zombie on a rope, and a bucket. */
const ME = PLACE.me;
const KEV = PLACE.kevin;
const BOSS = PLACE.boss;
/** Where the new one is put: on the ledge, west of the boat. */
export const NEW: Vec3 = [-1.55, 0, 3.0];
/** The bucket, held out in the boss's hand over the gap between him and the boat. */
export const HELD: Vec3 = [0.72, 1.12, 2.9];
/** A rope between two points. */
export const Rope: React.FC<{ a: Vec3; b: Vec3 }> = ({ a, b }) => {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const dz = b[2] - a[2];
  const len = Math.hypot(dx, dy, dz);
  return (
    <group position={[(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]} rotation={[0, Math.atan2(dx, dz), 0]}>
      <group rotation={[-Math.asin(dy / len), 0, 0]}>
        <Block size={[0.05, 0.05, len]} color="#8a6234" castShadow={false} />
      </group>
    </group>
  );
};
/** The boss on the ledge with the bucket out in front of him. `lift` 0–1 takes it up over Kevin's head. */
export const BossBucket: React.FC<{ t: number; lift?: number; face?: string; headYaw?: number; position?: Vec3 }> = ({ t, lift = 0, face = "neutral", headYaw = 0, position = BOSS }) => (
  <>
    <Boss position={position} rotationY={WEST} face={face as never} headYaw={headYaw} gaze={0} pose={posed("idle", t, { armR: [-1.45 - lift * 1.1, 0, 0] })} />
    <Bucket position={[position[0] - 0.53 - lift * 0.25, 1.12 + lift * 1.05, position[2] - 0.1]} rotation={[0, 0, lift * 0.5]} />
  </>
);

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "He looked up",
  shots: [
    {
      cue: "4.empty",
      ...cam.push({ on: [0.1, 1.15, -0.3], dist: 5.4, to: 4.8, yaw: 12, pitch: 14, fov: 44 }),
      zone: "under",
      look: "overworld-day",
      note: "Under the floor. The boss throws the lid up. There is nothing in the chest. He stands there with his arms still out.",
      stage: (t) => {
        const k = tw(t, 0.15, 0.45);
        return (
          <>
            <Under open={k} iron={0} />
            <Boss position={[0.15, 0, 0.55]} rotationY={NORTH} face={t > 0.6 ? "surprised" : "neutral"} headPitch={0.45} pose={posed("idle", t, { armR: [-1.3, 0, 0], armL: [-1.3, 0, 0] })} />
          </>
        );
      },
    },
    {
      cue: "4.up",
      ...cam.push({ on: [0.15, 1.55, 0.55], dist: 3.6, to: 2.6, yaw: 180, pitch: 38, fov: 44 }),
      zone: "under",
      look: "overworld-day",
      note: "From above, where the villagers are. His face, slowly, tips back: and he is looking straight up at us. He is not pleased.",
      stage: (t, { dur }) => (
        <>
          <Under open={1} iron={0} pipe={false} />
          <Boss position={[0.15, 0, 0.55]} rotationY={NORTH} face={t > dur * 0.55 ? "angry" : "frown"} headPitch={0.45 - 1.25 * tw(t, 0.2, dur * 0.7)} gaze={0} />
        </>
      ),
    },
    {
      cue: "4.atme",
      ...cam.push({ on: [0.4, 1.45, 1.85], dist: 2.1, to: 1.9, yaw: 170, pitch: 2, fov: 58 }),
      zone: "farm",
      look: "overworld-day",
      note: "From inside the room, through the glass: the boss, up here for the first time, with his face almost on the pane. He looks at us. His eyes slide over to the zombie in the boat.",
      stage: (t) => {
        const kev = w("4.atme", "He", 0, 1) - 0.1;
        return (
          <>
            <Farm />
            <Boss position={[0.62, 0, 1.45]} rotationY={NORTH} face="frown" headYaw={t > kev ? 0.9 : 0} gaze={0} />
            <Kevin tagTurn={170 * (Math.PI / 180)} turn={t > kev ? -0.7 : 0} wave={t > kev + 0.3 ? 1 : 0} />
          </>
        );
      },
    },
    {
      cue: "4.left",
      ...cam.push({ on: [0, 1.4, 1.3], dist: 7.0, to: 6.4, yaw: 20, pitch: 8, fov: 46 }),
      zone: "farm",
      look: "overworld-day",
      note: "He turns and walks off along the ledge and is gone. The villager watches him go, then looks at us and shrugs with his head.",
      stage: (t, { dur }) => {
        const k = tw(t, 0, dur * 0.6);
        return (
          <>
            <Farm />
            <Me position={ME} rotationY={SOUTH} lookAt={k < 1 ? [0.95 + 4.5 * k, 1.5, 3.0] : undefined} tilt={k >= 1 ? 0.22 : 0} />
            <Others t={t} />
            <Kevin tagTurn={0.35} />
            {k < 1 ? <Boss position={[0.95 + 4.5 * k, 0, 3.0]} rotationY={EAST} animation="walk" face="frown" /> : null}
          </>
        );
      },
    },
    {
      cue: "4.rope",
      ...cam.push({ on: [-3.0, 1.3, 3.0], onTo: [-1.3, 1.3, 3.0], dist: 6.6, to: 6.6, yaw: -12, pitch: 6, fov: 46 }),
      zone: "farm",
      look: "overworld-day",
      note: "He comes back along the ledge from the other end, and behind him, on a rope, with its arms out, walks a zombie nobody has seen before.",
      stage: (t, { dur }) => {
        const x = -3.4 + 2.4 * tw(t, 0, dur);
        return (
          <>
            <Farm />
            <Me position={ME} rotationY={SOUTH} lookAt={[x, 1.5, 3.0]} />
            <Kevin tagTurn={-0.25} turn={0.9} />
            <Boss position={[x, 0, 3.0]} rotationY={EAST} animation="walk" face="frown" />
            <NewOne position={[x - 1.3, 0, 3.0]} rotationY={EAST} walk={t * 1.6} />
            <Rope a={[x - 0.3, 1.0, 3.0]} b={[x - 1.2, 1.45, 3.0]} />
          </>
        );
      },
    },
    {
      cue: "4.new",
      ...cam.push({ on: [-0.75, 1.3, 2.5], dist: 3.8, to: 3.5, yaw: 172, pitch: 2, fov: 58 }),
      zone: "farm",
      look: "overworld-day",
      note: "Through the glass: the new one, standing next to Kevin's boat. No tag over his head. Kevin waves at him. He does not wave. He does not do anything.",
      stage: (t) => (
        <>
          <Farm />
          <NewOne position={[-1.15, 0, 2.9]} rotationY={NORTH + 0.2} />
          <Kevin tagTurn={172 * (Math.PI / 180)} turn={-0.9} wave={t > 0.4 ? 1 : 0} mood="happy" />
        </>
      ),
    },
    {
      cue: "4.bucket",
      ...cam.push({ on: [0.35, 1.3, 2.5], dist: 3.2, to: 2.9, yaw: 175, pitch: 2, fov: 56 }),
      zone: "farm",
      look: "overworld-day",
      note: "Through the glass, the other way: the boss beside the boat, and in his hand, held out over Kevin, a bucket. Kevin looks at it.",
      stage: (t) => (
        <>
          <Farm />
          <BossBucket t={t} />
          <Kevin tagTurn={175 * (Math.PI / 180)} lookAt={[HELD[0], HELD[1] + 0.2, HELD[2]]} />
        </>
      ),
    },
    {
      cue: "4.fire",
      ...cam.push({ on: [HELD[0], HELD[1] + 0.22, HELD[2]], dist: 2.4, to: 1.5, yaw: 150, pitch: 20, fov: 42 }),
      zone: "farm",
      look: "overworld-day",
      note: "The bucket, close, from above. What is in it is orange, and it glows, and it moves.",
      stage: (t) => (
        <>
          <Farm />
          <BossBucket t={t} />
          <Glow position={[HELD[0], HELD[1] + 0.45, HELD[2]]} size={0.9 + Math.sin(t * 7) * 0.12} color="#ffb040" opacity={0.5} />
          <Kevin tag={false} lookAt={[HELD[0], HELD[1] + 0.2, HELD[2]]} mood="scared" />
        </>
      ),
    },
  ],
});
void KEV;
