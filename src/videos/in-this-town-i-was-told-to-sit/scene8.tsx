import { cam, storyScene, stride } from "../../engine";
import type { Vec3 } from "../../engine";
import { Axe, Bits, Bubble, Camp, Chestplate, Dog, GROUND_SIT, GreenEye, Glow, Life, Loaf, NORTH, Owner, PERCH, PLACE, Parrot, Puffs, SOUTH, Sword, hop, pop, posed, sitPose, timing, tw, w } from "./kit";
import { NOW } from "./scene6";
import { GUARD } from "./scene7";

/** 08 — He is standing. The bed lights up, and his owner is back, with nothing. "I said sit." */
const ONBED: Vec3 = [PLACE.bed[0], 0.56, PLACE.bed[2] + 0.2];
/** Where his owner steps down to, and where he sits: beside the dog's spot, between it and the sign. */
export const BESIDE: Vec3 = [0.86, 0, 0.42];
const STEP: Vec3 = [0.95, 0, 1.2];
const AXED: Vec3 = [PLACE.bed[0] + 0.3, 0.42, 2.35];
const Stuck = () => <Axe position={AXED} rotation={[2.0, 0.4, 0]} scale={1.15} />;
/** Where the loaf fell when he stood up. */
const Fallen = () => <Loaf position={[-0.45, 0.02, 1.05]} rotation={[0, 0.7, 0]} scale={0.8} />;

export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "I said sit",
  shots: [
    {
      cue: "8.bad",
      ...cam.push({ on: [GUARD[0], 0.62, GUARD[2] + 0.4], dist: 3.4, to: 3.0, yaw: 34, pitch: 6, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "The dog looks down at his own four legs, one at a time. His ears go flat. His eyes go wide.",
      stage: (t) => {
        const down = tw(t, 0.15, 0.5);
        return (
          <>
            <Camp {...NOW} />
            <Stuck />
            <Dog position={GUARD} sit={0} headPitch={0.7 * down} headYaw={0.35 * Math.sin(t * 4) * down} ears={1 - 0.85 * tw(t, 0.6, 0.9)} mood="wide" tail={-0.6 * tw(t, 0.6, 0.9)} blink={false} />
          </>
        );
      },
    },
    {
      cue: "8.bad",
      cut: w("8.bad", "I", 0, 2) - 0.05,
      ...cam.push({ on: [0.5, 0.8, -0.2], dist: 4.4, to: 3.8, yaw: -6, pitch: 14, fov: 42 }),
      zone: "town",
      look: "overworld-day",
      note: "Where he should be: a bare brown patch in the grass, the shape of a sitting dog, with nobody on it. A loaf lying beside it. And over it the sign: DO NOT MOVE HIM.",
      stage: () => (
        <>
          <Camp {...NOW} />
          <Fallen />
          <Parrot position={PERCH} headYaw={-0.9} tilt={0.3} />
        </>
      ),
    },
    {
      cue: "8.light",
      ...cam.push({ on: [PLACE.bed[0] - 0.1, 0.6, 0.2], dist: 5.2, to: 4.6, yaw: -10, pitch: 14, fov: 44 }),
      zone: "town",
      look: "overworld-day",
      note: "Behind him, the bed starts to glow: white, then brighter, light standing up out of the blanket. The dog turns round to look.",
      stage: (t) => {
        const turn = tw(t, 0.25, 0.75);
        return (
          <>
            <Camp {...NOW} glow={tw(t, 0.05, 0.7)} />
            <Stuck />
            <Fallen />
            <Dog position={[GUARD[0], 0, GUARD[2] + 0.5]} rotationY={Math.PI * turn} sit={0} walk={turn * 0.6} mood="wide" ears={1} blink={false} />
            <Parrot position={PERCH} headYaw={1.2} />
          </>
        );
      },
    },
    {
      cue: "8.him",
      ...cam.push({ on: [PLACE.bed[0], 1.3, 0.5], dist: 5.4, to: 4.7, yaw: -8, pitch: 5, fov: 44 }),
      zone: "town",
      look: "overworld-day",
      note: "On 'there he was' a player is standing on the bed in a burst of light: a red shirt, the red of the dog's collar, and nothing else. He blinks. In front of the bed the dog looks up at him and does not breathe.",
      stage: (t) => {
        const at = w("8.him", "there") - 0.05;
        return (
          <>
            <Camp {...NOW} glow={t < at ? 1 : 1 - tw(t, at + 0.15, at + 1.0)} />
            <Stuck />
            <Dog position={[GUARD[0], 0, GUARD[2] + 0.5]} rotationY={NORTH} sit={0} mood="wide" lookAt={[ONBED[0], 2.1, ONBED[2]]} blink={false} tail={0.2} />
            {t > at ? <Owner position={[ONBED[0], ONBED[1] + hop(t, at, 0.12, 0.25), ONBED[2]]} rotationY={SOUTH} scale={pop(t, at, 0.14)} animation="idle" face={t < at + 0.6 ? "dizzy" : "surprised"} /> : null}
            {t > at && t < at + 0.5 ? <Glow position={[ONBED[0], 1.6, ONBED[2] + 0.3]} size={5 * (1 - tw(t, at, at + 0.5)) + 0.5} color="#ffffff" opacity={0.9 * (1 - tw(t, at, at + 0.5))} /> : null}
            <Bits position={[ONBED[0], 1.4, ONBED[2]]} t={t - at} color="#fff2c0" count={14} power={1.3} />
          </>
        );
      },
    },
    {
      cue: "8.nothing",
      ...cam.push({ on: [ONBED[0], 1.85, ONBED[2]], dist: 3.7, to: 3.3, yaw: -6, pitch: 2, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "He looks at his empty right hand: a grey sword appears in the air beside it and falls to bits. He looks at his chest: a grey chestplate, gone. His other hand: a green eye, gone. Three things, three small crumbles.",
      stage: (t) => {
        const a = w("8.nothing", "sword") - 0.1;
        const b = w("8.nothing", "armour") - 0.1;
        const c = w("8.nothing", "green") - 0.1;
        const show = (at: number) => (t > at && t < at + 0.36 ? pop(t, at, 0.12) : 0);
        return (
          <>
            <Camp {...NOW} />
            <Owner position={ONBED} rotationY={SOUTH} face={t > c ? "sad" : "uneasy"} pose={posed("idle", t, { armR: [-1.0 * (tw(t, a - 0.1, a + 0.1) - tw(t, b - 0.1, b)), 0, 0.2], armL: [-1.0 * tw(t, c - 0.1, c + 0.1), 0, -0.2] })} headYaw={t < b ? -0.5 : t < c ? 0 : 0.5} headPitch={t > b && t < c ? 0.5 : 0.3} />
            <group position={[ONBED[0] - 0.46, 1.75, ONBED[2] + 0.5]} scale={0.9 * show(a)}>
              <Sword position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]} />
            </group>
            <Bits position={[ONBED[0] - 0.46, 1.9, ONBED[2] + 0.5]} t={t - a - 0.36} color="#9aa2ad" count={9} />
            <Chestplate position={[ONBED[0], 1.72, ONBED[2] + 0.5]} scale={1.1 * show(b)} />
            <Bits position={[ONBED[0], 1.72, ONBED[2] + 0.5]} t={t - b - 0.36} color="#9aa2ad" count={9} />
            <GreenEye position={[ONBED[0] + 0.46, 1.85, ONBED[2] + 0.5]} scale={1.3 * show(c)} glow={0.9} />
            <Bits position={[ONBED[0] + 0.46, 1.85, ONBED[2] + 0.5]} t={t - c - 0.36} color="#3fae84" count={9} />
          </>
        );
      },
    },
    {
      cue: "8.way",
      ...cam.push({ on: [ONBED[0], 1.86, ONBED[2]], dist: 3.9, to: 3.0, yaw: 12, pitch: -5, fov: 38 }),
      zone: "town",
      look: "overworld-day",
      note: "His face, from below, and the lens going in slowly. He is not hurt. He is tired, and he has lost. On 'with nothing' he turns out two empty hands and lets them drop.",
      stage: (t) => {
        const sh = w("8.way", "With") - 0.1;
        const k = tw(t, sh, sh + 0.25) - tw(t, sh + 0.7, sh + 1.0);
        return (
          <>
            <Camp {...NOW} />
            <Owner position={ONBED} rotationY={SOUTH} face="sad" pose={posed("idle", t, { armR: [-0.7 * k, 0, 0.5 * k], armL: [-0.7 * k, 0, -0.5 * k] })} headPitch={0.2 + 0.15 * k} />
          </>
        );
      },
    },
    {
      cue: "8.looked",
      ...cam.push({ on: [0.6, 1.7, -4], dist: 9.4, to: 8.4, yaw: 6, pitch: 5, fov: 50 }),
      zone: "town",
      look: "overworld-day",
      note: "He steps down off the bed and turns right round, looking at it: houses, a bell, a well, villagers staring at him out of every doorway. None of this was here.",
      stage: (t) => {
        const k = tw(t, 0, 0.45);
        return (
          <>
            <Camp {...NOW} />
            <Life t={t} n={6} creeper={false} look={[STEP[0], 1.6, STEP[2]]} />
            <Parrot position={PERCH} headYaw={0.5} />
            <Owner position={[ONBED[0] + (STEP[0] - ONBED[0]) * k, ONBED[1] * (1 - k), ONBED[2] + (STEP[2] - ONBED[2]) * k]} rotationY={NORTH + 0.9 * Math.sin(t * 2.6)} animation="idle" face="surprised" headPitch={-0.2} />
          </>
        );
      },
    },
    {
      cue: "8.looked",
      cut: w("8.looked", "Then") - 0.05,
      ...cam.push({ on: [GUARD[0] - 0.2, 0.5, GUARD[2] + 0.5], dist: 3.1, to: 2.6, yaw: 224, pitch: 30, fov: 42 }),
      zone: "town",
      look: "overworld-day",
      note: "Then down, at the dog: standing on four legs beside the bed, ears flat, tail under him, eyes as wide as they go, one front paw off the ground. Caught.",
      stage: () => (
        <>
          <Camp {...NOW} />
          <Stuck />
          <Dog position={[GUARD[0] - 0.2, 0, GUARD[2] + 0.5]} rotationY={NORTH + 0.6} sit={0} ears={0.05} tail={-0.9} mood="wide" shiver={0.5} headPitch={-0.5} headYaw={-0.2} blink={false} />
        </>
      ),
    },
    {
      cue: "8.said",
      ...cam.push({ on: [STEP[0], 1.55, STEP[2]], dist: 3.4, to: 3.1, yaw: 24, pitch: -6, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "His owner, close, from the dog's side: one finger pointing at the bare patch. I SAID SIT.",
      stage: (t) => (
        <>
          <Camp {...NOW} />
          <Owner position={STEP} rotationY={SOUTH + 0.5} animation="point" face="frown" headPitch={0.3} />
          <Bubble text="SIT" position={[STEP[0] + 0.12, 2.12, STEP[2] + 0.3]} rotationY={0.4} scale={0.6 * pop(t, 0.1, 0.14)} tail={1} />
        </>
      ),
    },
    {
      cue: "8.sat",
      ...cam.push({ on: [0.25, 0.75, 0.3], dist: 4.6, to: 4.2, yaw: 4, pitch: 7, fov: 44 }),
      impacts: [{ at: 0.32, amp: 0.5, dur: 0.3 }],
      zone: "town",
      look: "overworld-day",
      note: "The spot, straight on, as in the first shot. The dog comes in from the right as a white streak, lands on his patch and sits so hard the ground shakes and dust comes up all round him. His eyes are screwed shut.",
      stage: (t) => {
        const land = 0.3;
        const k = tw(t, 0.04, land);
        const from: Vec3 = [GUARD[0] - 0.2, 0, GUARD[2] + 0.5];
        return (
          <>
            <Camp {...NOW} />
            <Fallen />
            <Stuck />
            <Dog position={[from[0] * (1 - k), hop(t, 0.04, 0.35, land - 0.04), from[2] * (1 - k)]} rotationY={k < 1 ? -2.2 * (1 - k) : 0} sit={tw(t, land - 0.08, land + 0.02)} walk={k * 3} mood={t > land && t < land + 1.0 ? "shut" : "wide"} ears={0.3} headPitch={hop(t, land, 0.25, 0.2)} blink={false} />
            <Parrot position={[PERCH[0], PERCH[1] + hop(t, land, 0.3, 0.3), PERCH[2]]} flap={t > land && t < land + 0.3 ? 1 : 0} headYaw={-0.9} />
            <Owner position={STEP} rotationY={SOUTH - 0.5} animation="idle" face={t > land + 0.5 ? "smile" : "frown"} lookAt={[0, 0.8, 0.5]} />
            {t > land && t < land + 0.7 ? <Puffs position={[0, 0.1, -0.2]} count={9} spread={0.9} size={0.3} rise={0.8} speed={1.9} color="#c9b08a" /> : null}
          </>
        );
      },
    },
    {
      cue: "8.down",
      ...cam.push({ on: [0.42, 0.72, 0.3], dist: 4.4, to: 3.4, yaw: 6, pitch: 4, fov: 42 }),
      zone: "town",
      look: "overworld-day",
      note: "And then his owner walks over and sits down on the grass beside him, legs out, facing the forest too. Side by side, the way the creeper stood. He puts a hand on the dog's head. The dog's tail starts and does not stop.",
      stage: (t) => {
        const k = tw(t, 0, 0.55);
        const down = tw(t, 0.55, 1.0);
        const walk = stride(STEP, BESIDE, k);
        const pat = tw(t, w("8.down", "Right") - 0.1, w("8.down", "Right") + 0.25);
        return (
          <>
            <Camp {...NOW} />
            <Fallen />
            <Dog mood={pat > 0.5 ? "happy" : "wide"} wag={down > 0.5 ? 1 : 0} ears={0.3 + 0.7 * down} headYaw={0.5 * down * (1 - pat)} headPitch={0.08 * pat} blink={false} />
            <Parrot position={PERCH} headYaw={-0.9} tilt={0.3} />
            <Owner
              position={[walk.position[0], GROUND_SIT * 1.25 * down, walk.position[2]]}
              rotationY={down > 0 ? walk.rotationY * (1 - down) : walk.rotationY}
              animDistance={walk.animDistance}
              animation="walk"
              pose={down > 0.3 ? sitPose(t, { armL: [-0.55 * pat, 0, -1.25 * pat] }) : undefined}
              face="smile"
              headYaw={-0.4 * pat}
            />
          </>
        );
      },
    },
  ],
});
void Life;
