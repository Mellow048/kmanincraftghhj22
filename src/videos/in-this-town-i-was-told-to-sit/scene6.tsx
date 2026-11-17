import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bone, Bubble, Camp, DayCount, Dog, EAST, Life, Loaf, NORTH, PERCH, PLACE, Parrot, ROBE, Raider, SoundRings, Villager, WEST, go, hop, pop, posed, timing, tw, w } from "./kit";
import { stride } from "../../engine";

/** 06 — Day four hundred: two players, the chest, the bed, an axe. */
export const NOW = { drop: 9 };
/** Where the one with the axe stands: at the foot of the bed, facing up it. */
export const FOOT: Vec3 = [PLACE.bed[0], 0, 2.15];
/** Where the one in purple stands to laugh. */
export const SIDE: Vec3 = [0.35, 0, 2.3];

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "Day four hundred",
  shots: [
    {
      cue: "6.day",
      ...cam.push({ on: [5.2, 1.15, 2.4], dist: 6.6, to: 4.2, yaw: -72, pitch: 3, fov: 44 }),
      zone: "town",
      look: "overworld-day",
      note: "DAY 400 lands at the top of the frame. Two players walk up the east path straight at the lens, grinning: one in purple, one with green hair and a black shirt. Behind them the villagers back away and go indoors.",
      stage: (t) => {
        const k = t / 2.63;
        const a = stride([10.2, 0, 2.9], [5.2, 0, 2.6], k);
        const b = stride([11.2, 0, 1.9], [6.3, 0, 2.0], k);
        const day = w("6.day", "four") - 0.1;
        return (
          <>
            <Camp {...NOW} />
            <Raider who={0} {...a} animation="walk" />
            <Raider who={1} {...b} animation="walk" face="smug" />
            {[0, 1, 2].map((i) => {
              const g = go([[9.4, 0, 5.2], [10, 0, -0.4], [12.4, 0, 3.6]][i] as Vec3, [[10.6, 0, 9], [10.6, 0, -3], [14.5, 0, 5]][i] as Vec3, tw(t, 0.2 + i * 0.2, 2.2));
              return <Villager key={i} {...g} robe={[ROBE.white, ROBE.red, ROBE.brown][i]} phase={i} />;
            })}
            <DayCount position={[4.5, 2.55 + hop(t, day, 0.1, 0.2), 2.62]} n={400} rotationY={-72 * (Math.PI / 180)} scale={0.52 * pop(t, day, 0.16)} />
          </>
        );
      },
    },
    {
      cue: "6.chest",
      ...cam.push({ on: [-1.5, 0.9, -0.1], dist: 6.0, to: 5.5, yaw: -12, pitch: 10, fov: 44 }),
      zone: "town",
      look: "overworld-day",
      note: "The one in purple flips the chest open, looks in, and says BONES. Then JUNK, and he throws one over his shoulder. It lands in front of the dog. The dog looks at the bone. The dog looks at him.",
      stage: (t) => {
        const open = w("6.chest", "opened") - 0.1;
        const bones = w("6.chest", "Bones") - 0.08;
        const junk = w("6.chest", "Junk") - 0.08;
        const k = tw(t, junk, junk + 0.5);
        const bone: Vec3 = [-2.75 + k * 2.4, 1.5 + Math.sin(k * Math.PI) * 1.0 - k * 1.42, -0.3 + k * 1.5];
        return (
          <>
            <Camp {...NOW} chest={tw(t, open, open + 0.22)} />
            <Life t={t} n={2} />
            <Dog onHead={<Loaf scale={0.8} />} lookAt={t > junk + 0.1 ? (t > junk + 0.75 ? [-2.9, 1.6, -0.4] : bone) : [-2.9, 1.6, -0.4]} ears={0.7} mood={t > junk + 0.75 ? "angry" : "calm"} />
            <Parrot position={PERCH} headYaw={-0.9} />
            <Raider who={0} position={[-2.95, 0, -0.4]} rotationY={EAST} animation={t > junk ? "shrug" : "leanOver"} face={t > junk ? "smug" : "grin"} headPitch={t > junk ? 0 : 0.3} />
            {t > junk ? <Bone position={bone} rotation={[0, t * 5, k < 1 ? t * 14 : 0]} scale={1.5} /> : null}
            <Bubble text={t > junk ? "JUNK" : "BONES"} position={[-1.95, 2.2, -0.3]} scale={0.75 * (t > junk ? pop(t, junk, 0.14) : pop(t, bones, 0.14))} tail={-1} />
          </>
        );
      },
    },
    {
      cue: "6.bed",
      ...cam.push({ on: [PLACE.bed[0], 0.95, 1.2], dist: 5.6, to: 5.0, yaw: 84, pitch: 8, fov: 42 }),
      zone: "town",
      look: "overworld-day",
      note: "From the side. The one with green hair stands at the foot of the bed and looks it up and down. FREE BED. He rubs his hands. Past the bed, the dog has turned his head to watch him.",
      stage: (t) => {
        const say = w("6.bed", "Free") - 0.1;
        return (
          <>
            <Camp {...NOW} />
            <Dog onHead={<Loaf scale={0.8} />} lookAt={[FOOT[0], 1.5, FOOT[2]]} ears={0.6} mood="angry" />
            <Parrot position={PERCH} headYaw={0.9} />
            <Raider who={1} position={FOOT} rotationY={NORTH} animation={t > say ? "cheer" : "idle"} face="grin" headPitch={0.35} />
            <Bubble text="FREE BED" position={[FOOT[0] + 0.1, 2.32, FOOT[2] - 0.5]} rotationY={EAST} scale={0.7 * pop(t, say, 0.14)} tail={1} />
          </>
        );
      },
    },
    {
      cue: "6.took",
      ...cam.push({ on: [FOOT[0], 1.35, FOOT[2]], dist: 4.6, to: 4.0, yaw: 150, pitch: 0, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "Close on him: an iron axe pops into his hand and he lifts it to look at the edge. He is smiling.",
      stage: (t) => {
        const out = w("6.took", "axe") - 0.3;
        const lift = tw(t, out, out + 0.3);
        return (
          <>
            <Camp {...NOW} />
            <Raider who={1} axe={t > out} position={FOOT} rotationY={NORTH} face="smug" pose={posed("idle", t, { armR: [-2.0 * lift, 0, 0.25] })} headPitch={-0.15} headYaw={-0.4} />
            <Raider who={0} position={[SIDE[0], 0, SIDE[2] + 0.6]} rotationY={NORTH} animation="idle" face="grin" />
          </>
        );
      },
    },
    {
      cue: "6.growl",
      ...cam.push({ on: [0, 0.62, 0.5], dist: 3.0, to: 2.6, yaw: 12, pitch: 2, fov: 38 }),
      zone: "town",
      look: "overworld-day",
      note: "The dog, close: ears back, lip up, teeth, shaking with it. A small GRRR. He is still sitting.",
      stage: (t) => (
        <>
          <Camp {...NOW} />
          <Dog onHead={<Loaf scale={0.8} />} teeth={0.9} mood="angry" ears={0.2} shiver={0.8} headYaw={0.3} blink={false} />
          <Bubble text="GRRR" position={[-0.5, 1.5, 0.9]} rotationY={0.2} scale={0.62 * pop(t, 0.12, 0.14)} tail={1} tilt={Math.sin(t * 40) * 0.04} />
        </>
      ),
    },
    {
      cue: "6.growl",
      cut: w("6.growl", "They") - 0.05,
      ...cam.pan({ from: [0.1, 0.8, 0.7], on: [1.05, 1.4, 2.3], onTo: [1.05, 1.45, 2.3], fov: 68, fovTo: 64 }),
      zone: "town",
      look: "overworld-day",
      note: "From where the dog sits, looking up at them: the two players laughing at him, the forest behind them, one with an axe on his shoulder.",
      stage: (t) => (
        <>
          <Raider who={0} position={SIDE} rotationY={NORTH + 0.2} animation="laugh" face="laugh" />
          <Raider who={1} axe position={FOOT} rotationY={NORTH - 0.3} animation="laugh" face="laugh" time={t + 0.3} />
        </>
      ),
    },
    {
      cue: "6.bite",
      ...cam.push({ on: [0, 0.95, 1.25], dist: 5.2, to: 4.7, yaw: -78, pitch: 5, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "From the side: the one in purple bends right down to the dog, nose to nose, and on 'bite' pokes him on the end of the nose. The dog's eyes cross. He does not move.",
      stage: (t) => {
        const poke = w("6.bite", "bite") - 0.12;
        const k = tw(t, poke, poke + 0.12) - tw(t, poke + 0.3, poke + 0.5);
        return (
          <>
            <Camp {...NOW} />
            <Dog onHead={<Loaf scale={0.8} />} teeth={t > poke ? 0.2 : 0.7} mood={t > poke + 0.08 ? "wide" : "angry"} ears={0.3} headPitch={-0.12 * k} blink={false} shiver={0.4} />
            <Raider who={0} position={[0, 0, 2.05]} rotationY={NORTH} face="smug" pose={posed("leanOver", t, { armR: [-1.15 - 0.25 * k, 0, 0], head: [-0.2, 0, 0] })} />
            <Raider who={1} axe position={[FOOT[0] + 0.3, 0, FOOT[2] + 0.5]} rotationY={NORTH - 0.6} animation="laugh" face="laugh" />
          </>
        );
      },
    },
    {
      cue: "6.hiss",
      ...cam.push({ on: [PERCH[0] - 0.14, PERCH[1] + 0.52, PERCH[2]], dist: 3.1, to: 2.8, yaw: -16, pitch: 2, fov: 38 }),
      zone: "town",
      look: "overworld-day",
      note: "The parrot on the sign, close. It looks left, looks right, opens its beak and does it: SSSSSS. Rings come off it.",
      stage: (t) => {
        const on = 0.35;
        return (
          <>
            <Camp {...NOW} />
            <Parrot position={PERCH} headYaw={t < 0.15 ? -0.9 : t < on ? 0.7 : -0.25} open={t > on ? 1 : 0} tilt={t > on ? 0.15 : 0} />
            <Bubble text="SSSSSS" position={[PERCH[0] - 0.2, PERCH[1] + 0.95, PERCH[2] + 0.2]} scale={0.46 * pop(t, on, 0.14)} tail={1} tilt={Math.sin(t * 46) * 0.03} />
            <SoundRings position={[PERCH[0], PERCH[1] + 0.45, PERCH[2] + 0.3]} t={t - on} color="#ffffff" reach={1} />
            <SoundRings position={[PERCH[0], PERCH[1] + 0.45, PERCH[2] + 0.3]} t={t - on - 0.4} color="#ffffff" reach={1} />
          </>
        );
      },
    },
    {
      cue: "6.jump",
      ...cam.push({ on: [1.0, 1.25, 2.3], dist: 5.8, to: 5.2, yaw: 148, pitch: 10, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "Both players leave the ground: a whole block up, arms out, faces white. They land, spin round looking for it, and both heads stop on the parrot. Their faces change.",
      stage: (t) => {
        const saw = w("6.jump", "Then") - 0.1;
        const up = hop(t, 0.04, 1.0, 0.55);
        return (
          <>
            <Camp {...NOW} />
            <Dog onHead={<Loaf scale={0.8} />} ears={0.5} mood="wide" />
            <Parrot position={PERCH} headYaw={2.6} bob={t > saw ? 1 : 0} />
            <Raider who={0} position={[SIDE[0], up, SIDE[2]]} rotationY={NORTH + 0.3} animation={t < saw ? "panic" : "idle"} face={t < saw ? "fear" : "angry"} lookAt={t > saw ? PERCH : undefined} headYaw={t < saw ? Math.sin(t * 9) * 0.8 : 0} />
            <Raider who={1} axe position={[FOOT[0], hop(t, 0.08, 1.0, 0.55), FOOT[2]]} rotationY={NORTH - 0.1} animation={t < saw ? "scared" : "idle"} face={t < saw ? "fear" : "angry"} lookAt={t > saw ? PERCH : undefined} headYaw={t < saw ? Math.sin(t * 9 + 1) * 0.8 : 0} />
          </>
        );
      },
    },
    {
      cue: "6.axe",
      ...cam.push({ on: [PLACE.bed[0], 1.25, 1.35], dist: 5.6, to: 4.8, yaw: 86, pitch: 4, fov: 42 }),
      zone: "town",
      look: "overworld-day",
      note: "From the side again: he steps up to the foot of the bed and the axe goes up over his head, both hands. Past him, the dog is watching, wide-eyed, and has started to shake.",
      stage: (t) => {
        const up = tw(t, w("6.axe", "went") - 0.15, w("6.axe", "went") + 0.25);
        return (
          <>
            <Camp {...NOW} />
            <Dog onHead={<Loaf scale={0.8} />} lookAt={[FOOT[0], 2, FOOT[2] - 0.3]} mood="wide" ears={0.4} shiver={0.8} blink={false} />
            <Parrot position={PERCH} headYaw={0.9} />
            <Raider who={1} axe position={[FOOT[0], 0, FOOT[2] - 0.25]} rotationY={NORTH} face="angry" pose={posed("idle", t, { armR: [-0.6 - 2.1 * up, 0, 0.1], armL: [-0.4 - 2.2 * up, 0, -0.2], torso: [0.12 * up, 0, 0] as Vec3 })} headPitch={0.3} />
          </>
        );
      },
    },
  ],
});
void WEST;
void Loaf;
