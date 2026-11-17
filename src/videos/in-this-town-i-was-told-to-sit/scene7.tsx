import { cam, storyScene, stride } from "../../engine";
import type { Vec3 } from "../../engine";
import { Axe, Bubble, Camp, Creeper, Dog, EAST, Fill, Life, Loaf, NORTH, Owner, PERCH, PLACE, Parrot, Puffs, Raider, SOUTH, go, hop, pop, posed, timing, tw, w } from "./kit";
import { NOW } from "./scene6";

/** 07 — He stands up. The axe comes up over him. Then there is a hiss, and it is not the parrot. */
/** Where he stands to guard the bed: at its foot, facing whoever is coming. */
export const GUARD: Vec3 = [PLACE.bed[0], 0, 1.3];
/** Where the one with the axe is now. */
const AXE: Vec3 = [PLACE.bed[0], 0, 2.55];
/** The one in purple, out of the way. */
const PAL: Vec3 = [0.5, 0, 3.3];
/** Where the creeper comes up behind them. */
const BEHIND: Vec3 = [PLACE.bed[0] + 0.1, 0, 3.55];
const axeUp = (t: number, k: number) => posed("idle", t, { armR: [-0.6 - 2.1 * k, 0, 0.1], armL: [-0.4 - 2.2 * k, 0, -0.2] });

export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "I stood up",
  shots: [
    {
      cue: "7.his",
      ...cam.push({ on: [0.15, 0.66, 0.5], dist: 2.9, to: 2.5, yaw: -18, pitch: 2, fov: 38 }),
      zone: "town",
      look: "overworld-day",
      note: "Close on the dog, his head turned to the bed, ears down. He does not know what it is for.",
      stage: () => (
        <>
          <Camp {...NOW} />
          <Dog onHead={<Loaf scale={0.8} />} headYaw={0.8} ears={0.35} mood="sad" shiver={0.5} blink={false} />
        </>
      ),
    },
    {
      cue: "7.his",
      cut: w("7.his", "I", 0, 1) - 0.05,
      ...cam.push({ on: [0.95, 0.55, 0.1], dist: 6.2, to: 5.4, yaw: 8, pitch: 26, fov: 44 }),
      zone: "meadow",
      look: "overworld-night",
      note: "What he knows: a night before there was a town. His owner asleep in that bed, in the red shirt, and the dog sitting beside it, awake, watching over him, in the ring of torches.",
      stage: (t) => (
        <>
          <Camp sign={0} lit={3} />
          <Fill at={[1.2, 3.5, 2.5]} power={14} reach={9} />
          <Dog headYaw={0.9} wag={0.25} />
          <Owner position={[PLACE.bed[0], 0.56, PLACE.bed[2] + 0.15]} rotationY={SOUTH} animation="sleep" face="sleepy" time={t} />
        </>
      ),
    },
    {
      cue: "7.good",
      ...cam.push({ on: [0, 0.84, 0.6], dist: 2.5, to: 1.75, yaw: 10, pitch: 0, fov: 34 }),
      zone: "town",
      look: "overworld-day",
      note: "His eyes, and the lens going into them. He is shaking harder and harder. On 'four hundred days' his ears come up.",
      stage: (t) => {
        const k = tw(t, w("7.good", "four") - 0.1, w("7.good", "four") + 0.3);
        return (
          <>
            <Camp {...NOW} />
            <Dog onHead={<Loaf scale={0.8} />} headYaw={0.35} ears={0.25 + 0.75 * k} mood={k > 0.5 ? "angry" : "wide"} shiver={0.5 + t * 0.4} blink={false} />
          </>
        );
      },
    },
    {
      cue: "7.stood",
      ...cam.push({ on: [0, 0.6, 0], dist: 4.6, to: 4.3, yaw: -40, pitch: 6, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "From the side, all of him. His back end comes up off the ground for the first time in four hundred days, gets half way, and sits down again with a bump. The loaf wobbles.",
      stage: (t) => {
        const up = tw(t, 0.05, 0.36) - tw(t, 0.42, 0.56);
        return (
          <>
            <Camp {...NOW} />
            <Dog sit={1 - 0.6 * up} roll={Math.sin(t * 30) * 0.05 * up} onHead={<Loaf scale={0.8} rotation={[0, 0, Math.sin(t * 20) * 0.2 * (t > 0.3 ? 1 : 0)]} />} mood="angry" headPitch={hop(t, 0.56, 0.2, 0.15)} blink={false} />
            {t > 0.56 ? <Puffs position={[0, 0.1, -0.7]} count={5} spread={0.5} size={0.2} rise={0.5} speed={2} color="#c9b08a" /> : null}
          </>
        );
      },
    },
    {
      cue: "7.legs",
      ...cam.push({ on: [0, 0.62, 0.1], dist: 4.3, to: 3.9, yaw: -28, pitch: 5, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "Second try: up, wobble, down. Third try: up, all four legs shaking, and he stays up. The loaf slides off his head.",
      stage: (t) => {
        const two = tw(t, 0.02, 0.24) - tw(t, 0.3, 0.42);
        const three = tw(t, 0.5, 0.78);
        const sit = 1 - 0.65 * two - three;
        const off = tw(t, 0.62, 1.0);
        return (
          <>
            <Camp {...NOW} />
            <Dog sit={sit} roll={Math.sin(t * 34) * (0.06 * two + 0.07 * three * (1 - tw(t, 0.8, 1.1)))} mood="angry" blink={false} tail={three * 0.4} onHead={off > 0 ? undefined : <Loaf scale={0.8} />} />
            {off > 0 ? <Loaf position={[-0.1 - off * 0.35, 1.02 - off * off * 0.98, 0.6 + off * 0.45]} rotation={[off * 2.2, 0, off * 1.4]} scale={0.8} /> : null}
          </>
        );
      },
    },
    {
      cue: "7.front",
      ...cam.push({ on: [PLACE.bed[0], 1.0, 1.75], dist: 5.6, to: 5.0, yaw: 86, pitch: 5, fov: 42 }),
      zone: "town",
      look: "overworld-day",
      note: "From the side: the player with the axe up over the foot of the bed, and the dog walking in on four stiff legs, between him and it. He turns to face him. On 'teeth' the lip goes up.",
      stage: (t) => {
        const k = tw(t, 0.05, 0.95);
        const g = go([0.35, 0, 0.9], GUARD, k);
        const turn = tw(t, 0.9, 1.15);
        const teeth = tw(t, w("7.front", "teeth") - 0.2, w("7.front", "teeth") + 0.05);
        return (
          <>
            <Camp {...NOW} />
            <Dog position={g.position} rotationY={g.rotationY * (1 - turn)} sit={0} walk={g.walk} teeth={teeth} mood="angry" ears={0.35} tail={0.6} blink={false} />
            <Parrot position={PERCH} headYaw={0.9} />
            <Raider who={1} axe position={[AXE[0], 0, AXE[2] - 0.35 + 0.35 * tw(t, 0.7, 1.1)]} rotationY={NORTH} face={t > 1 ? "surprised" : "angry"} pose={axeUp(t, 1 - 0.7 * tw(t, 0.8, 1.2))} headPitch={0.35} />
          </>
        );
      },
    },
    {
      cue: "7.move",
      ...cam.pan({ from: [GUARD[0] - 0.5, 0.75, GUARD[2] - 0.3], on: [AXE[0], 1.5, AXE[2]], onTo: [AXE[0], 1.6, AXE[2]], fov: 56, fovTo: 52 }),
      zone: "town",
      look: "overworld-day",
      note: "From down by the dog, looking up: the player leans over him, the axe on his shoulder. MOVE. Past the lens, the dog's white ear.",
      stage: (t) => {
        const say = w("7.move", "Move") - 0.08;
        return (
          <>
            <Raider who={1} axe position={AXE} rotationY={NORTH} face="angry" pose={posed("idle", t, { armR: [-2.4, 0, 0.2], torso: [0.25, 0, 0] as Vec3, head: [0.35, 0, 0] as Vec3 })} />
            <Raider who={0} position={PAL} rotationY={NORTH + 0.4} animation="idle" face="smug" />
            <Bubble text="MOVE" position={[AXE[0] + 0.22, 1.95, AXE[2] - 0.3]} rotationY={NORTH} scale={0.42 * pop(t, say, 0.14)} tail={-1} />
          </>
        );
      },
    },
    {
      cue: "7.over",
      ...cam.push({ on: [PLACE.bed[0], 1.3, 1.95], dist: 4.6, to: 4.1, yaw: 92, pitch: -5, fov: 44 }),
      zone: "town",
      look: "overworld-day",
      note: "From the side and low: the axe goes all the way up, over the dog this time. The dog does not step back. His eyes are shut tight and his four legs are shaking.",
      stage: (t) => {
        const up = tw(t, 0.1, 0.6);
        return (
          <>
            <Camp {...NOW} />
            <Dog position={GUARD} sit={0} teeth={0.6} mood="shut" ears={0.1} shiver={1} roll={Math.sin(t * 30) * 0.03} blink={false} />
            <Raider who={1} axe position={AXE} rotationY={NORTH} face="angry" pose={axeUp(t, up)} headPitch={0.4} />
          </>
        );
      },
    },
    {
      cue: "7.hiss2",
      ...cam.push({ on: [AXE[0] - 0.05, 1.68, AXE[2]], dist: 3.0, to: 2.7, yaw: 168, pitch: -3, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "His face, close, the axe over his head. A hiss comes in from behind him: a dark bubble this time, not a white one. He stops. He does not turn round. His eyes go to one side.",
      stage: (t) => (
        <>
          <Raider who={1} axe position={AXE} rotationY={NORTH} face={t > 0.3 ? "uneasy" : "angry"} pose={axeUp(t, 1)} gaze={t > 0.45 ? 1 : 0} saccade={false} />
          <Creeper position={BEHIND} rotationY={NORTH} fuse={0.25} />
          <Bubble text="SSSSSS" dark position={[AXE[0] - 0.36, 2.3, AXE[2] + 0.3]} rotationY={NORTH} scale={0.5 * pop(t, 0.18, 0.14)} tail={-1} tilt={Math.sin(t * 46) * 0.03} />
        </>
      ),
    },
    {
      cue: "7.nice",
      ...cam.push({ on: [1.35, 1.3, 2.6], dist: 5.4, to: 4.8, yaw: 146, pitch: 9, fov: 44 }),
      zone: "town",
      look: "overworld-day",
      note: "Wider. He grins and jerks a thumb at the sign without looking. The parrot, on the sign in front of us, has its beak shut and is shaking its head. Standing right behind the two players, where they cannot see it, is the creeper, and it has started to flash.",
      stage: (t) => (
        <>
          <Camp {...NOW} />
          <Dog position={GUARD} sit={0} mood="wide" ears={1} lookAt={[BEHIND[0], 1.4, BEHIND[2]]} blink={false} />
          <Parrot position={PERCH} headYaw={2.7 + Math.sin(t * 9) * 0.5} />
          <Raider who={1} axe position={AXE} rotationY={NORTH} face="smug" pose={posed("idle", t, { armR: [-2.4, 0, 0.2], armL: [-0.9, 0, -0.9] })} />
          <Raider who={0} position={PAL} rotationY={NORTH + 0.3} animation="laugh" face="grin" />
          <Creeper position={BEHIND} rotationY={NORTH} fuse={0.3 + 0.3 * tw(t, 0.3, 1.6)} />
        </>
      ),
    },
    {
      cue: "7.not",
      ...cam.push({ on: [BEHIND[0], 1.45, BEHIND[2]], dist: 3.4, to: 2.4, yaw: 224, pitch: 3, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "The creeper's face, flashing white, swelling, and the lens going in on it. In front of it the player's green hair turns slowly round.",
      stage: (t) => (
        <>
          <Creeper position={BEHIND} rotationY={NORTH} fuse={0.6 + 0.4 * tw(t, 0, 1)} mood="angry" />
          <Raider who={1} axe position={AXE} rotationY={NORTH + Math.PI * tw(t, 0.25, 0.8)} face="fear" pose={axeUp(t, 1 - tw(t, 0.3, 0.8))} />
        </>
      ),
    },
    {
      cue: "7.gone",
      ...cam.push({ on: [1.3, 1.0, 3.2], dist: 6.4, to: 7.4, yaw: 150, pitch: 14, fov: 48 }),
      zone: "town",
      look: "overworld-day",
      note: "They run: two players flat out down the path to the forest, dust behind them, already small. The axe is still in the air where he was standing. It turns over twice and sticks in the ground.",
      stage: (t) => {
        const k = tw(t, 0, 1.5);
        const a = stride([AXE[0] - 0.4, 0, AXE[2] + 1.6], [0.4, 0, 19], k);
        const b = stride([PAL[0] - 0.6, 0, PAL[2] + 1.2], [-0.5, 0, 21], k);
        const land = w("7.gone", "ground") - 0.1;
        const fall = tw(t, 0.1, land);
        return (
          <>
            <Camp {...NOW} />
            <Dog position={GUARD} sit={0} mood="wide" blink={false} />
            <Parrot position={PERCH} headYaw={2.7} />
            <Creeper position={BEHIND} rotationY={NORTH} fuse={0.9 - 0.3 * tw(t, 1, 1.9)} />
            <Raider who={1} {...a} animation="run" face="fear" />
            <Raider who={0} {...b} animation="run" face="fear" />
            <Axe position={[AXE[0] + 0.3, 2.3 * (1 - fall * fall) + 0.42, AXE[2] - 0.2]} rotation={[fall < 1 ? t * 13 : 2.0, 0.4, 0]} scale={1.15} />
            {t > land && t < land + 0.5 ? <Puffs position={[AXE[0] + 0.3, 0.1, AXE[2] - 0.2]} count={5} spread={0.4} size={0.2} rise={0.5} speed={2} color="#c9b08a" /> : null}
            <Puffs position={[a.position[0], 0.2, a.position[2] - 1]} count={6} spread={0.7} size={0.34} rise={0.8} speed={1.8} color="#d9cfb8" />
            <Puffs position={[b.position[0], 0.2, b.position[2] - 1]} count={6} spread={0.7} size={0.34} rise={0.8} speed={1.8} color="#d9cfb8" seed={9} />
          </>
        );
      },
    },
    {
      cue: "7.listener",
      ...cam.push({ on: [PLACE.bed[0], 1.05, 2.6], dist: 5.2, to: 4.8, yaw: 88, pitch: 4, fov: 42 }),
      zone: "town",
      look: "overworld-day",
      note: "From the side: the creeper and the dog, face to face, the axe stuck in the grass between them. The creeper stops flashing, goes back to its own size, and lets out one small puff. The dog's tail moves, once.",
      stage: (t) => {
        const down = tw(t, 0.15, 0.7);
        return (
          <>
            <Camp {...NOW} />
            <Dog position={GUARD} sit={0} mood="calm" ears={1} wag={t > 0.8 && t < 1.2 ? 1 : 0} tail={0.5} lookAt={[BEHIND[0], 1.4, BEHIND[2]]} />
            <Creeper position={BEHIND} rotationY={NORTH} fuse={0.6 * (1 - down)} lookAt={[GUARD[0], 0.8, GUARD[2] + 0.6]} />
            <Axe position={[AXE[0] + 0.3, 0.42, AXE[2] - 0.2]} rotation={[2.0, 0.4, 0]} scale={1.15} />
            {t > 0.7 && t < 1.3 ? <Puffs position={[BEHIND[0], 1.7, BEHIND[2]]} count={4} spread={0.2} size={0.16} rise={0.6} speed={1.6} /> : null}
          </>
        );
      },
    },
    {
      cue: "7.shade",
      ...cam.push({ on: [-0.6, 0.9, 0.8], onTo: [-2.6, 0.9, -1], dist: 8, to: 8.6, yaw: 36, pitch: 15, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The creeper turns and walks off across the square, past the chest, back to the dark patch under the oak, and stands in it. The dog watches it all the way.",
      stage: (t) => {
        const g = go([0.9, 0, 3.0], PLACE.shade, tw(t, 0, 2.0));
        return (
          <>
            <Camp {...NOW} />
            <Life t={t} n={4} creeper={false} look={[0, 1, 1]} />
            <Dog position={GUARD} sit={0} lookAt={[g.position[0], 1.2, g.position[2]]} tail={0.4} wag={0.4} />
            <Parrot position={PERCH} headYaw={-1.4} />
            <Creeper {...g} />
            <Axe position={[AXE[0] + 0.3, 0.42, AXE[2] - 0.2]} rotation={[2.0, 0.4, 0]} scale={1.15} />
          </>
        );
      },
    },
  ],
});
void EAST;
