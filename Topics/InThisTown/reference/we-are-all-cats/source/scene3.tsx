import { cam, storyScene } from "../../engine";
import { EAST, Folk, GAP, GOLEM_X, GOLEM_Z, Guard, Hero, KID_Z, Line, Pup, Side, WEST, Weather, posed, timing, tw, w } from "./kit";

/** 03 — On and on and on, until the cats are tired of it. */
const ON2 = w("4.on", "on", 0, 1) - 0.12;
const ON3 = w("4.on", "on", 0, 2) - 0.12;
const HER = w("4.grandma", "Her") - 0.1;
const FUR = w("4.back", "fur") - 0.25;
const DOG = w("4.back", "never") - 0.1;

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "On and on",
  shots: [
    {
      cue: "4.on",
      ...cam.truck({ on: [0, 1.4, 12.5], dist: 6, yaw: 0, pitch: 10, fov: 46, by: [0, 0, -9] }),
      zone: "village",
      look: "overworld-day",
      note: "Moving up the line between them while they hiss and bark: in the sun, then (and on) in the rain, then (and on) in the snow. Nobody stops.",
      stage: (t) => (
        <>
          <Line />
          <Side kind="cat" t={t} puff={1} arch={1} side={1} />
          <Side kind="dog" t={t} bark={1} wag={1} />
          {t > ON2 && t < ON3 ? <Weather center={[0, 0, 8 - t * 4]} t={t} count={260} /> : null}
          {t >= ON3 ? <Weather center={[0, 0, 8 - t * 4]} t={t * 6} snow count={300} /> : null}
        </>
      ),
    },
    {
      cue: "4.grandma",
      ...cam.pan({ from: [2.4, 1.35, 9.6], on: [-GAP, 1.15, 6.5], onTo: [-GAP, 0.9, 5.3], fov: 36, fovTo: 32 }),
      zone: "village",
      look: "overworld-day",
      note: "His grandma at the line, grey, in a shawl and glasses, with her back up; and beside her, smaller and whiter, her own grandma, doing the same.",
      stage: (t) => (
        <>
          <Line />
          <Folk kind="cat" who={2} old fur="#a9a7a2" position={[-GAP, 0, 6.5]} rotationY={EAST - 0.9} turn={0.9} lean={0.36} puff={1} tailUp={1} />
          <Folk kind="cat" who={4} old fur="#f1ede2" scale={0.72} position={[-GAP, 0, 5.3]} rotationY={EAST + 0.9} turn={-0.9} lean={0.5 + Math.sin(t * 30) * 0.02 * (t > HER ? 1 : 0)} puff={1} tailUp={1} phase={2} />
        </>
      ),
    },
    {
      cue: "4.grass",
      ...cam.pan({ from: [0.2, 0.75, GOLEM_Z + 5.2], on: [-GOLEM_X + 0.3, 0.45, GOLEM_Z], onTo: [GOLEM_X - 0.3, 0.45, GOLEM_Z], fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "From the cat golem's feet across the line to the dog golem's: grass grows up over the iron while we watch, and then flowers.",
      stage: (t) => {
        const g = tw(t, 0.15, 1.7);
        return (
          <>
            <Line />
            <Guard kind="cat" position={[-GOLEM_X, 0, GOLEM_Z]} rotationY={EAST} bow={0.2} puff={1} tailUp={1} grass={g} />
            <Guard kind="dog" position={[GOLEM_X, 0, GOLEM_Z]} rotationY={WEST} bow={0.2} bark={1} grass={g} />
          </>
        );
      },
    },
    {
      cue: "4.tired",
      ...cam.push({ on: [-GAP, 1.0, 2.4], dist: 3.9, to: 3.3, yaw: 62, pitch: 3, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "The cats again, close, and the pose is coming apart: backs sinking, eyes half shut, the teller in the middle of a yawn.",
      stage: (t) => (
        <>
          <Line />
          <Side kind="cat" t={t} puff={1} arch={1} side={1} sag={tw(t, 0.2, 1.3)} golem={false} />
        </>
      ),
    },
    {
      cue: "4.back",
      ...cam.orbit({ on: [-2.6, 1.0, KID_Z], dist: 3.4, yaw: -18, yawTo: -80, pitch: 6, fov: 42 }),
      zone: "village",
      look: "overworld-sunset",
      note: "After everyone has gone home. He rubs his back, pats fur that will not lie down, and as the lens comes round behind him: the dog kid, alone, across the line.",
      stage: (t) => {
        const rub = tw(t, 0.1, 0.4) - tw(t, FUR - 0.1, FUR + 0.15);
        const pat = tw(t, FUR, FUR + 0.25) - tw(t, DOG - 0.1, DOG + 0.2);
        const look = tw(t, DOG, DOG + 0.35);
        return (
          <>
            <Line />
            <Hero
              position={[-2.6, 0, KID_Z]}
              rotationY={EAST * (0.25 + 0.75 * look)}
              pose={posed("idle", t, { bodyPitch: 0.32 * rub, armL: [0.9 * rub, 0, 0.35 * rub], armR: [-2.75 * pat + Math.sin(t * 16) * 0.12 * pat, 0, 0.5 * pat], head: [0.1 * rub, 0, 0] })}
              face={look > 0.5 ? "uneasy" : rub > 0.5 ? "ouch" : "frown"}
              puff={0.9}
              tailUp={0.5}
            />
            <Pup position={[GAP + 0.2, 0, KID_Z]} rotationY={WEST} animation="idle" headRoll={0.3 * look} wag={0.15 + 0.5 * look} face="neutral" />
          </>
        );
      },
    },
  ],
});
