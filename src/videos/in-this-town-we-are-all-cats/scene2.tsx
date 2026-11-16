import { cam, storyScene } from "../../engine";
import { EAST, GAP, GOLEM_X, GOLEM_Z, Guard, Hero, KID_Z, Line, Pup, Side, WEST, posed, timing, tw, w } from "./kit";

/** 02 — Noon. The fight nobody touches anybody in. */
const FOUGHT = w("3.noon", "fought") - 0.1;
const SPREAD = w("3.fur", "spread") - 0.1;
const ARCHED = w("3.fur", "arched") - 0.1;
const SIDEWAYS = w("3.fur", "sideways") - 0.1;
const HISSED = w("3.golems", "hissed") - 0.1;
const BARKED = w("3.golems", "barked") - 0.1;

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Every day at noon",
  shots: [
    {
      cue: "3.noon",
      ...cam.push({ on: [0, 1.0, 5], dist: 14, to: 11, yaw: 0, pitch: 12, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "Down the line from the south: both sides walk up to it at the same time, cats from the left, dogs from the right, golems at the far end.",
      stage: (t) => {
        const k = tw(t, 0.1, FOUGHT);
        const gap = 6.2 - (6.2 - GAP) * k;
        const on = tw(t, FOUGHT, FOUGHT + 0.25);
        return (
          <>
            <Line />
            <Side kind="cat" t={t} gap={gap} walk={k < 1 ? 0.01 + (6.2 - gap) : 0} puff={on} arch={on} />
            <Side kind="dog" t={t} gap={gap} walk={k < 1 ? 0.01 + (6.2 - gap) : 0} bark={on} wag={on} />
          </>
        );
      },
    },
    {
      cue: "3.paws",
      ...cam.orbit({ on: [0, 0.95, KID_Z], dist: 4.6, yaw: 16, yawTo: -8, pitch: 5, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "The teller and the dog kid across the line: each lifts a paw, looks at it, and puts it down again. Not with those.",
      stage: (t) => {
        const up = tw(t, 0, 0.25) - tw(t, 0.6, 0.9);
        return (
          <>
            <Line />
            <Hero position={[-0.62, 0, KID_Z]} rotationY={EAST} pose={posed("idle", t, { armR: [-2.5 * up, 0, 0] })} headPitch={-0.2 * up} face="angry" tailUp={0.6} />
            <Pup position={[0.62, 0, KID_Z]} rotationY={WEST} pose={posed("idle", t, { armL: [-2.5 * up, 0, 0] })} headPitch={-0.2 * up} face="angry" wag={0.2} />
            <Side kind="cat" t={t} kid={false} golem={false} />
            <Side kind="dog" t={t} kid={false} golem={false} />
          </>
        );
      },
    },
    {
      cue: "3.fur",
      ...cam.truck({ on: [-GAP, 1.1, 6.6], dist: 4.8, yaw: 46, pitch: 5, fov: 44, by: [0, 0, -4.6] }),
      zone: "village",
      look: "overworld-day",
      note: "Along the cats, from the dogs' side, on the words: the fur goes up, then the backs go up, then every cat turns sideways with its tail straight up.",
      stage: (t) => (
        <>
          <Line />
          <Side kind="cat" t={t} puff={tw(t, SPREAD, SPREAD + 0.22)} arch={tw(t, ARCHED, ARCHED + 0.25)} side={tw(t, SIDEWAYS, SIDEWAYS + 0.3)} face="angry" />
        </>
      ),
    },
    {
      cue: "3.bark",
      ...cam.push({ on: [GAP, 1.25, 3.4], dist: 4.0, to: 3.3, yaw: -34, pitch: -7, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "From low on the cats' side: three dogs bark over the line, jaws open, ears flying, white rings coming off every bark.",
      stage: (t) => (
        <>
          <Line />
          <Side kind="dog" t={t} bark={1} wag={1} face="angry" />
        </>
      ),
    },
    {
      cue: "3.golems",
      ...cam.orbit({ on: [0, 1.6, GOLEM_Z], dist: 6.8, yaw: -9, yawTo: 9, pitch: -6, fov: 46 }),
      zone: "village",
      look: "overworld-day",
      note: "The two golems nose to nose over the line, from below: the iron fur of ours stands up on the word, then the jaw of theirs drops.",
      stage: (t) => {
        const hiss = tw(t, HISSED, HISSED + 0.25);
        const bark = tw(t, BARKED, BARKED + 0.15);
        return (
          <>
            <Line />
            <Guard kind="cat" position={[-GOLEM_X, 0, GOLEM_Z]} rotationY={EAST} bow={0.2 + hiss * 0.15} puff={hiss} tailUp={0.3 + 0.7 * hiss} />
            <Guard kind="dog" position={[GOLEM_X, 0, GOLEM_Z]} rotationY={WEST} bow={0.2 + bark * 0.15} bark={bark} wag={bark} />
          </>
        );
      },
    },
    {
      cue: "3.lunch",
      ...cam.push({ on: [0, 0.5, 4], dist: 15, to: 20, yaw: 180, pitch: 36, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "From high over the well, pulling away: both sides turn their backs at the same moment and walk home, and the line is left by itself.",
      stage: (t) => {
        const d = Math.max(0, t - 0.3) * 2.0;
        return (
          <>
            <Line />
            <Side kind="cat" t={t} gap={GAP + d} walk={d} away={d > 0} />
            <Side kind="dog" t={t} gap={GAP + d} walk={d} away={d > 0} wag={0.6} />
          </>
        );
      },
    },
  ],
});
