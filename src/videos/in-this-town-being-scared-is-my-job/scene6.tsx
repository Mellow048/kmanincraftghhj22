import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Barb, Bits, Boss, Bubble, Bucket, Count, EAST, Farm, IronGolem, Kevin, Me, NORTH, NewOne, PLACE, Puffs, SOUTH, Shake, SoundRings, WEST, hop, pop, posed, timing, tw, w } from "./kit";
import { Others } from "./scene1";
import { BossBucket, NEW } from "./scene4";
import { BASE, GROUND } from "./world";

/** 06 — The first real one. The glass cracks, an iron man pops out of the air, and he does not go in the water. */
const ME = PLACE.me;
const KEV = PLACE.kevin;
const SPAWN = PLACE.spawn;
const BOSS = PLACE.boss;
/** Where the iron man stands once he has turned round: just north of the middle room, looking in. */
export const STOOD: Vec3 = [0, 0, -2.3];

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "The first real one",
  shots: [
    {
      cue: "6.scared",
      ...cam.push({ on: [0, 1.52, 0.3], dist: 2.9, to: 2.0, yaw: -10, pitch: 2, fov: 42 }),
      zone: "farm",
      look: "overworld-day",
      note: "His face, very close, and it starts to shake. It has never shaken like this.",
      stage: (t, { dur }) => (
        <>
          <Farm />
          <Shake t={t} k={0.2 + 0.9 * tw(t, 0.2, dur)}>
            <Me position={ME} rotationY={SOUTH} nod={-0.15 * tw(t, 0.2, dur)} />
          </Shake>
        </>
      ),
    },
    {
      cue: "6.real",
      ...cam.push({ on: [0.2, 1.9, 1.2], dist: 7.4, to: 6.2, yaw: 30, pitch: 5, fov: 48 }),
      zone: "farm",
      look: "overworld-day",
      note: "The scream. He leaves the floor with it. The bubble is bigger than the room, rings go out through the glass, Kevin's tag blows flat, and the boss leans back with the bucket still over his head.",
      stage: (t) => {
        const go = w("6.real", "That") - 0.25;
        const k = t > go ? 1 : 0;
        return (
          <>
            <Farm crack={k ? tw(t, go + 0.2, go + 0.7) * 0.5 : 0} />
            <group position={[0, hop(t, go, 0.5, 0.5), 0]}>
              <Shake t={t} k={k ? 1 : 0.6}>
                <Me position={ME} rotationY={SOUTH} nod={k ? -0.5 : -0.1} hmm={k} />
              </Shake>
            </group>
            <Bubble text="AAAAAAH!" position={[0.3, 3.5, 1.2]} rotationY={0.52} scale={(0.95 + Math.sin(t * 30) * 0.05) * pop(t, go, 0.12)} tail={-1} tilt={Math.sin(t * 36) * 0.05} />
            <SoundRings position={[0, 1.7, 1.0]} t={k ? t - go : -1} color="#ffffff" reach={2.6} />
            <SoundRings position={[0, 1.7, 1.0]} t={k ? t - go - 0.3 : -1} color="#ffffff" reach={2.6} />
            <Others t={t} k={k} />
            <BossBucket t={t} lift={1} face={k ? "surprised" : "frown"} />
            <Kevin tagTurn={0.52} lookAt={[0, 1.6, 0.25]} mood={k ? "happy" : "sad"} />
            <NewOne position={NEW} rotationY={NORTH + 0.2} />
          </>
        );
      },
    },
    {
      cue: "6.glass",
      ...cam.push({ on: [0, 1.5, 0.95], dist: 3.2, to: 2.7, yaw: 16, pitch: 3, fov: 44 }),
      zone: "farm",
      look: "overworld-day",
      note: "The pane in front of him, close. A crack runs across it, and another, and another.",
      stage: (t, { dur }) => (
        <>
          <Farm crack={0.5 + 0.5 * tw(t, 0.05, dur * 0.7)} />
          <Me position={ME} rotationY={SOUTH} nod={-0.2} />
          <Kevin tag={false} />
        </>
      ),
    },
    {
      cue: "6.pop",
      ...cam.push({ on: [0, 1.7, -2.8], dist: 8.6, to: 7.4, yaw: 180, pitch: 8, fov: 46 }),
      zone: "farm",
      look: "overworld-day",
      note: "The stone behind the rooms. Out of nothing, with a thump: an iron man. Bigger than the others were.",
      stage: (t) => {
        const at = w("6.pop", "popped") - 0.1;
        return (
          <>
            <Farm crack={1} />
            <Me position={ME} rotationY={SOUTH} />
            <Others t={t} />
            <Kevin />
            <IronGolem position={SPAWN} rotationY={NORTH} scale={1.12 * pop(t, at, 0.18)} />
            {t > at && t < at + 0.6 ? <Puffs position={[0, 1.4, SPAWN[2]]} count={11} spread={1.5} size={0.4} rise={0.9} speed={2} color="#f4f6f8" /> : null}
          </>
        );
      },
    },
    {
      cue: "6.barb",
      ...cam.push({ on: [2.3, 1.8, 0.3], dist: 4.8, to: 4.3, yaw: 8, pitch: 5, fov: 44 }),
      zone: "farm",
      look: "overworld-day",
      note: "Barb. The dim number over her head lights up and turns over: 912. She says it out loud.",
      stage: (t) => {
        const say = w("6.barb", "nine") - 0.1;
        return (
          <>
            <Farm crack={1} />
            <Barb position={PLACE.barb} rotationY={SOUTH} nod={t > say ? -0.2 : 0.3} hmm={t > say ? 0.7 : 0} />
            <group position={[2.3, 3.0, 1.1]} rotation={[tw(t, say, say + 0.3) * Math.PI * 2, 0, 0]}>
              <Count position={[0, 0, 0]} text={t > say + 0.15 ? "912" : "911"} scale={0.8} color={t > say + 0.15 ? "#ffe27a" : "#6f6650"} />
            </group>
          </>
        );
      },
    },
    {
      cue: "6.step",
      ...cam.push({ on: [0, 1.6, -3.9], dist: 6.0, to: 5.4, yaw: 196, pitch: 6, fov: 46 }),
      zone: "farm",
      look: "overworld-day",
      note: "The same shot as the first iron man: he looks about him, and takes one step toward the water.",
      stage: (t, { dur }) => {
        const k = tw(t, dur * 0.3, dur);
        return (
          <>
            <Farm crack={1} />
            <Me position={ME} rotationY={SOUTH} />
            <Others t={t} />
            <IronGolem position={[0, 0, SPAWN[2] - 0.8 * k]} rotationY={NORTH} scale={1.12} walk={k * 0.7} headYaw={k > 0 ? 0 : Math.sin(t * 5) * 0.6} />
          </>
        );
      },
    },
    {
      cue: "6.stop",
      ...cam.push({ on: [0, 1.5, -4.2], dist: 6.4, to: 5.8, yaw: 118, pitch: 8, fov: 46 }),
      zone: "farm",
      look: "overworld-day",
      note: "From the side. One iron foot is out over the water. It stays there. He looks down at the water. He puts the foot back.",
      stage: (t) => {
        const back = w("6.stop", "He") - 0.1;
        return (
          <>
            <Farm crack={1} />
            <IronGolem position={[0, 0, SPAWN[2] - 0.8 + 0.5 * tw(t, back, back + 0.5)]} rotationY={NORTH} scale={1.12} walk={t < back ? 0.65 : 0} headPitch={t < back ? 0.55 : 0.1} />
          </>
        );
      },
    },
    {
      cue: "6.kevin",
      ...cam.push({ on: [0, 1.8, -0.3], dist: 8.2, to: 7.4, yaw: 12, pitch: 5, fov: 46 }),
      zone: "farm",
      look: "overworld-day",
      note: "From behind Kevin. The iron man has turned round. He walks up to the back of the glass room, a head taller than its roof, and looks through it, over the villager, straight at the zombie in the boat. His fists come up.",
      stage: (t, { dur }) => {
        const k = tw(t, 0, dur * 0.55);
        const fists = w("6.kevin", "Iron") - 0.1;
        return (
          <>
            <Farm crack={1} />
            <Me position={ME} rotationY={SOUTH} turn={t > fists ? 1.3 : 0} />
            <Others t={t} />
            <Kevin tagTurn={0.2} mood="scared" />
            <IronGolem position={[0, 0, SPAWN[2] + 0.5 + (STOOD[2] - SPAWN[2] - 0.5) * k]} rotationY={SOUTH} scale={1.12} walk={k * 1.5} headPitch={0.3} armR={t > fists ? -1.1 : undefined} armL={t > fists ? -1.1 : undefined} />
          </>
        );
      },
    },
    {
      cue: "6.said",
      ...cam.push({ on: [0, 1.9, -0.4], dist: 7.2, to: 6.4, yaw: 14, pitch: 5, fov: 46 }),
      zone: "farm",
      look: "overworld-day",
      note: "The villager has turned his back on us. He bangs his head on the glass in front of the iron man, twice, and says it: HE IS WITH US.",
      stage: (t) => {
        const say = w("6.said", "he") - 0.12;
        return (
          <>
            <Farm crack={1} />
            <Me position={[0, 0, 0.25 - 0.75 * tw(t, 0, 0.3) - hop(t, 0.3, 0.2, 0.25) - hop(t, 0.6, 0.2, 0.25)]} rotationY={NORTH} nod={-0.4} hmm={t > say ? 1 : 0} />
            <Bubble text="HE IS WITH US" position={[0.1, 3.3, 1.2]} rotationY={0.24} scale={0.56 * pop(t, say, 0.14)} tail={-1} />
            <Others t={t} />
            <Kevin tagTurn={0.2} mood="scared" />
            <IronGolem position={STOOD} rotationY={SOUTH} scale={1.12} headPitch={t > say ? 0.6 : 0.3} armR={t > say + 0.5 ? -0.3 : -1.1} armL={t > say + 0.5 ? -0.3 : -1.1} />
          </>
        );
      },
    },
    {
      cue: "6.turn",
      ...cam.push({ on: [0, 2.45, STOOD[2]], dist: 3.2, to: 2.9, yaw: 0, pitch: -25, fov: 50 }),
      zone: "farm",
      look: "overworld-day",
      note: "The iron face, from where the villager stands, under the edge of his own roof. It looks down at us for a long moment. Then the head turns, slowly, and the red eyes are on somebody else.",
      stage: (t) => {
        const boss = w("6.turn", "Then") - 0.1;
        const k = tw(t, boss, boss + 0.5);
        return (
          <>
            <Farm crack={1} />
            <IronGolem position={STOOD} rotationY={SOUTH} scale={1.12} headPitch={0.6 - 0.5 * k} headYaw={0.45 * k} />
          </>
        );
      },
    },
    {
      cue: "6.back",
      ...cam.push({ on: [BOSS[0], 1.3, 3.5], dist: 6.2, to: 5.8, yaw: 90, pitch: 5, fov: 46 }),
      zone: "farm",
      look: "overworld-day",
      note: "The ledge from the end of it: the boss, the bucket still in his hand, the edge of the stone behind his heels, and nothing behind that but sky. He takes one step back.",
      stage: (t) => {
        const step = w("6.back", "one") - 0.1;
        const k = tw(t, step, step + 0.35);
        return (
          <>
            <Farm crack={1} />
            <Boss position={[BOSS[0], hop(t, step, 0.12, 0.35), 3.0 + 0.95 * k]} rotationY={NORTH} face="scared" pose={posed("idle", t, { armR: [-1.45, 0, 0] })} />
            <Bucket position={[BOSS[0] - 0.1, 1.12, 2.47 + 0.95 * k]} />
          </>
        );
      },
    },
    {
      cue: "6.nofloor",
      ...cam.push({ on: [BOSS[0], 1.0, 4.3], dist: 5.6, to: 5.2, yaw: 90, pitch: 5, fov: 46 }),
      zone: "farm",
      look: "overworld-day",
      note: "He is standing on air, a foot past the edge. He looks down. He looks at us. He goes.",
      stage: (t, { dur }) => {
        const fall = dur * 0.62;
        const k = Math.max(0, t - fall);
        return (
          <>
            <Farm crack={1} />
            <Boss position={[BOSS[0], -k * k * 30, 4.75]} rotationY={NORTH} face={t < fall * 0.5 ? "surprised" : "scared"} headPitch={t < fall * 0.5 ? 0.7 : 0} headYaw={t > fall * 0.5 && t < fall ? -1.3 : 0} gaze={0} pose={posed(k > 0 ? "scared" : "idle", t, k > 0 ? { armR: [-2.9, 0, -0.3], armL: [-2.9, 0, 0.3] } : { armR: [-1.45, 0, 0] })} />
            <Bucket position={[BOSS[0] - 0.1, 1.12 - Math.max(0, k - 0.12) * Math.max(0, k - 0.12) * 30, 4.22]} />
          </>
        );
      },
    },
    {
      cue: "6.long",
      ...cam.pan({ from: [BOSS[0], 3.2, 4.0], on: [BOSS[0], GROUND, 6.5], onTo: [BASE[0], GROUND, 7.5], fov: 40, fovTo: 34 }),
      zone: "farm",
      look: "overworld-day",
      note: "Straight down past the edge of the stone: clouds, and under the clouds the ground, and a small red shirt getting smaller. A number counts beside him. At nine there is a very small puff.",
      stage: (t, { dur }) => {
        const land = dur * 0.86;
        const k = Math.min(1, t / land);
        const y = -4 + (GROUND + 4) * k;
        const n = Math.min(9, 1 + Math.floor(k * 9));
        return (
          <>
            <Farm crack={1} />
            {k < 1 ? (
              <group position={[BOSS[0], y, 6.2 + k * 1.3]} rotation={[-1.2, 0, t * 5]}>
                <Boss position={[0, -0.9, 0]} face="scared" pose={posed("idle", t, { armR: [-2.9, 0, -0.5], armL: [-2.9, 0, 0.5] })} />
              </group>
            ) : (
              <Puffs position={[BOSS[0], GROUND + 0.5, 7.5]} count={8} spread={2.5} size={1.2} rise={1.5} speed={2} color="#e9e6dc" />
            )}
            <group position={[BOSS[0] + 1.6 + k * 2.5, -3 + (GROUND * 0.5) * k * 0.2, 5.0]} rotation={[-Math.PI / 2, 0, 0]}>
              <Count position={[0, 0, 0]} text={String(n)} scale={1.2 + k * 2.2} />
            </group>
          </>
        );
      },
    },
  ],
});
void KEV; void EAST; void WEST; void Bits;
