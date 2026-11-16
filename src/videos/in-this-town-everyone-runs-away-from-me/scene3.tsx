import { cam, storyScene } from "../../engine";
import { Creeper, Creeps, GROUND_SIT, Hero, Little, NORTH, Puffs, SOUTH, SoundRings, Suit, WEST, bolt, cueLen, sitPose, timing, tw, w } from "./kit";

/** 03 — So he tried everything. */
const SIT: [number, number, number] = [-1.2, 0, -3.2];
const BY: [number, number, number] = [-0.45, 0, -3.1];
/** The costume sits low enough for his ears to stick out of the top. */
const LOW = -0.14;

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Everything",
  shots: [
    {
      cue: "3.tried",
      ...cam.push({ on: [-2.8, 0.95, 11], dist: 4.2, to: 3.2, yaw: -12, pitch: -6, fov: 42 }),
      zone: "town",
      look: "overworld-day",
      note: "From below: he sets his jaw. On 'everything' a green box with the face painted on it drops over him from above, and only his ears, his tail and his feet stick out.",
      stage: (t) => {
        const drop = tw(t, w("3.tried", "everything") - 0.1, w("3.tried", "everything") + 0.2);
        return (
          <>
            <Hero position={[-2.8, 0, 11]} rotationY={SOUTH - 0.2} animation="idle" face="brave" tailUp={1} />
            <Suit position={[-2.8, LOW + 2.6 * (1 - drop), 11]} rotationY={SOUTH - 0.2} wobble={Math.sin(t * 20) * 0.05 * drop * (1 - tw(t, 1.2, 1.6))} />
          </>
        );
      },
    },
    {
      cue: "3.suit",
      ...cam.orbit({ on: [-2.8, 1.1, 11], dist: 2.5, yaw: 30, yawTo: -10, pitch: 4, fov: 38 }),
      zone: "town",
      look: "overworld-day",
      note: "Close on the costume: the painted face, and two orange ears twitching over the top of the box.",
      stage: (t) => (
        <>
          <Hero position={[-2.8, 0, 11]} rotationY={SOUTH} animation="idle" tailUp={1} headRoll={Math.sin(t * 9) * 0.06} />
          <Suit position={[-2.8, LOW, 11]} rotationY={SOUTH} />
        </>
      ),
    },
    {
      cue: "3.suitran",
      ...cam.push({ on: [0, 1.1, 4.2], dist: 5.6, to: 6.6, yaw: 0, pitch: 9, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "From behind it: the box waddles up the street towards five creepers, ears and tail sticking out. They look at it for half a second, then all five jump and run.",
      stage: (t) => {
        const z = 7.2 - t * 1.5;
        return (
          <>
            <Hero position={[0, 0, z]} rotationY={NORTH} animation="walk" animDistance={t * 1.5} tailUp={1} />
            <Suit position={[0, LOW, z]} rotationY={NORTH} wobble={Math.sin(t * 9) * 0.08} />
            <Creeps spots={[[-0.8, 3.4], [0.75, 2.8], [-0.1, 1.6], [1.0, 0.8], [-1.0, 0.4]]} t={t} face={SOUTH} lookAt={[0, 1, z]} cat={[0, 0, 6]} at={0.55} speed={8} first={3} />
          </>
        );
      },
    },
    {
      cue: "3.back",
      ...cam.truck({ on: [0, 1.0, 9], dist: 4.3, yaw: 14, pitch: 4, fov: 42, by: [0, 0, -1.5 * cueLen("3.back")] }),
      ease: "linear",
      zone: "town",
      look: "overworld-day",
      note: "The camera goes with him: he walks backwards up the street with his eyes squeezed shut, feeling behind him with one paw. Up the street, behind his back, creepers watch him come.",
      stage: (t) => {
        const z = 9 - t * 1.5;
        return (
          <>
            <Hero position={[0, 0, z]} rotationY={SOUTH} animation="walk" animDistance={-t * 1.5} arms="reach" face="ouch" tailUp={1} />
            <Creeps spots={[[-1.0, 2.4], [0.9, 1.4], [0.1, 0.2], [-1.6, -0.6], [1.5, -1.2]]} t={t} face={SOUTH} lookAt={[0, 1, z]} first={7} />
          </>
        );
      },
    },
    {
      cue: "3.tail",
      ...cam.push({ on: [0, 0.85, 4.6], dist: 4.6, to: 4.0, yaw: 172, pitch: 2, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "From their side: his back and his tail coming at them, the tail straight up like a flag. The creepers jump and run at the lens and past it.",
      stage: (t) => {
        const z = 5.4 - t * 1.5;
        return (
          <>
            <Hero position={[0, 0, z]} rotationY={SOUTH} animation="walk" animDistance={-t * 1.5} tailUp={1} />
            <Creeps spots={[[-1.0, 2.9], [0.9, 2.3], [0.1, 1.5], [-1.7, 1.2], [1.6, 0.9]]} t={t} face={SOUTH} cat={[0, 0, 5.4]} at={0.3} speed={8} first={7} />
          </>
        );
      },
    },
    {
      cue: "3.still",
      ...cam.push({ on: [SIT[0], 0.6, SIT[2]], dist: 5.4, to: 4.4, yaw: 8, pitch: 12, fov: 42 }),
      zone: "town",
      look: "overworld-day",
      note: "He sits in the square like a block, eyes shut, not one hair moving. Behind him the town goes back and forth at speed: a whole day in two seconds.",
      stage: (t) => (
        <>
          <Hero position={[SIT[0], GROUND_SIT, SIT[2]]} rotationY={SOUTH} pose={sitPose(0)} face="calm" blink={false} />
          {Array.from({ length: 6 }, (_, i) => {
            const dir = i % 2 ? 1 : -1;
            const x = dir * (((t * 7 + i * 3.7) % 16) - 8);
            return <Creeper key={i} position={[x, 0, -7.5 - (i % 3) * 1.1]} rotationY={dir * (Math.PI / 2)} walk={t * 7 + i} scarf={["#7a4fb0", "#e07a2e", "#3f6fc2"][i % 3]} scale={0.95} phase={i} />;
          })}
        </>
      ),
    },
    {
      cue: "3.little",
      ...cam.orbit({ on: [-0.82, 0.62, -3.15], dist: 3.6, yaw: 22, yawTo: 4, pitch: 8, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "A very small creeper in a yellow scarf walks in, stops next to him and stands there. He opens one eye and slides it sideways. He does not dare move anything else.",
      stage: (t) => {
        const k = tw(t, 0.05, 0.95);
        return (
          <>
            <Hero position={[SIT[0], GROUND_SIT, SIT[2]]} rotationY={SOUTH} pose={sitPose(0, { head: [0, -0.5 * tw(t, 1.0, 1.3), 0] })} face={t > 1.0 ? "wow" : "calm"} blink={false} />
            <Little position={[BY[0] + (1 - k) * 2.6, 0, BY[2] + (1 - k) * 0.3]} rotationY={k < 1 ? WEST : SOUTH + 0.2} walk={k * 2.6} mood="happy" lookAt={k >= 1 ? [SIT[0], 0.75, SIT[2]] : undefined} />
          </>
        );
      },
    },
    {
      cue: "3.purr",
      ...cam.push({ on: [-0.82, 0.66, -3.15], dist: 3.6, to: 3.2, yaw: -4, pitch: 6, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "He is so happy that he purrs: he shakes all over and rings come off his chest. The little creeper goes stiff and its eyes go wide. On 'help it' his face falls: he knows what he has done.",
      stage: (t) => {
        const on = w("3.purr", "purred") - 0.15;
        const purr = t > on ? 1 : 0;
        const sorry = t > w("3.purr", "could");
        return (
          <>
            <Hero position={[SIT[0] + Math.sin(t * 60) * 0.008 * purr, GROUND_SIT, SIT[2]]} rotationY={SOUTH} pose={sitPose(0, { head: [0, -0.35, 0] })} face={sorry ? "ouch" : "smile"} />
            {purr ? <SoundRings position={[SIT[0], 0.55, SIT[2] + 0.3]} t={((t - on) * 1.6) % 1} color="#ffd9a0" reach={0.45} /> : null}
            <Little position={[BY[0], purr ? Math.abs(Math.sin((t - on) * 30)) * 0.03 : 0, BY[2]]} rotationY={SOUTH + 0.2} mood={purr ? "scared" : "happy"} lookAt={[SIT[0], 0.75, SIT[2]]} lean={purr ? -0.15 : 0} />
          </>
        );
      },
    },
    {
      cue: "3.gone",
      ...cam.push({ on: [-0.7, 0.8, -1.5], dist: 4.6, to: 5.6, yaw: 180, pitch: 12, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "From behind him: the little creeper is already at the far end of the street, small, going flat out, with a line of dust behind it. He watches it go with one paw half lifted.",
      stage: (t) => {
        const b = bolt(BY, [BY[0] - 0.15, 0, BY[2] - 1], t, -0.55, 0, 5, SOUTH);
        return (
          <>
            <Hero position={[SIT[0], GROUND_SIT, SIT[2]]} rotationY={SOUTH + 0.45} pose={sitPose(t, { armR: [-1.0, 0, 0.2] })} face="frown" />
            <Little position={b.position} rotationY={b.rotationY} walk={b.walk} lean={0.35} mood="scared" />
            {[0.25, 0.5, 0.75].map((f) => (
              <Puffs key={f} position={[BY[0] + (b.position[0] - BY[0]) * f, 0.15, BY[2] + (b.position[2] - BY[2]) * f]} seed={f * 8} color="#d8cfa8" />
            ))}
          </>
        );
      },
    },
  ],
});
