import { cam, storyScene } from "../../engine";
import { Baker, Crowd, Dad, Friend, Golem, Hero, Mum, SkyHole, SkyThing, DAY, ease, ramp, timing, wordAt } from "./kit";

export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "It leaves",
  shots: [
    {
      cue: "8.back",
      ...cam.push({ on: [0.3, 4.2, -2.2], dist: 7.2, to: 5.4, yaw: 68, pitch: 10, fov: 44 }),
      zone: "village",
      look: DAY,
      note: "Side on: one leg goes back into the hole, then another.",
      stage: (t) => {
        const back = ease(ramp(t, wordAt("8.back", "back"), wordAt("8.back", "another") + 0.4));
        return (
          <>
            <SkyHole position={[0.2, 5.3, -2.8]} open={1} />
            <SkyThing position={[0.35, 3.5 + back * 1.3, -1.6]} scale={1.35} legs={7} reach={0.7 * (1 - back)} turn={1.2} />
          </>
        );
      },
    },
    {
      cue: "8.slow",
      ...cam.push({ on: [0.3, 2.5, 1.1], dist: 5.2, to: 3.8, yaw: -6, pitch: -6, fov: 42 }),
      zone: "village",
      look: DAY,
      note: "His face, and the eye behind him, looking back the whole way.",
      stage: () => (
        <>
          <Hero position={[0.35, 0, 2.4]} animation="reachUp" face="brave" />
          <SkyThing position={[0.1, 3.7, -1.2]} scale={1.15} turn={0.05} />
        </>
      ),
    },
    {
      cue: "8.gone",
      ...cam.push({ on: [0, 10.5, 0.2], dist: 7.5, to: 9.5, yaw: 4, pitch: -16, fov: 44 }),
      zone: "village",
      look: DAY,
      note: "Open sky. The mouth closes. No roof behind it.",
      stage: (t) => {
        const shut = 1 - ease(ramp(t, wordAt("8.gone", "closed"), wordAt("8.gone", "closed") + 0.55));
        return <SkyHole position={[0, 11.6, 0.1]} open={Math.max(0.08, shut)} />;
      },
    },
    {
      cue: "8.quiet",
      ...cam.pan({ from: [-3.2, 1.5, 4.2], on: [-2, 1.1, 1.2], onTo: [2.4, 1.1, 1.1], fov: 40 }),
      zone: "village",
      look: DAY,
      note: "A pan across a town that has nothing left to say. Every chin is up. Nobody moves.",
      stage: () => (
        <>
          <Hero position={[0.35, 0, 1.8]} animation="idle" face="calm" />
          <Mum position={[-1.3, 0, 1.2]} nod={-0.4} />
          <Dad position={[1.5, 0, 1.05]} nod={-0.35} />
          <Friend position={[2.2, 0, 1.7]} nod={-0.4} />
          <Baker position={[-2.1, 0, 0.9]} nod={-0.4} />
          <Golem position={[3.1, 0, 2.2]} bow={-0.25} />
          <Crowd n={6} up={1} at={[0.2, 0, 0.4]} />
        </>
      ),
    },
  ],
});
