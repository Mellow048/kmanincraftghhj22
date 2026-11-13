import type React from "react";
import { cam, lerp, storyScene } from "../../engine";
import { Golem, MonsterEgg, Mother, Puffs, SoundRings } from "../../../Topics/InThisTown/creatures";
import { EAST, EGG_COLORS, HeroBundle, NestEggs, PLACE, WEST, carried, ease, faceOf, ramp, timing } from "./kit";
import { STOPS, StreetMonsters } from "./scene16";
import { WellEggs } from "./world";

const N = PLACE.nest;
const WALL = PLACE.wallTop;
const LANDS = 0.9;
/** He turns to the worm, and so turns his back on the wall. */
const SIDE = -0.9;
const CALLS = carried(STOPS, SIDE, "hug");

/** Her eyes are the light now. */
const HerGlow: React.FC<{ power?: number }> = ({ power = 1 }) => (
  <pointLight position={[STOPS[0] + 3, 3, STOPS[2]]} color="#ff8a2e" intensity={34 * power} distance={12} decay={2} />
);

/** THE REVEAL. Eight shots, and every plant in the film pays off. */
export const scene17 = storyScene(timing, {
  id: "scene17",
  title: "The mother",
  shots: [
    {
      cue: "17.sky",
      ...cam.push({ on: faceOf(STOPS), dist: 1.7, to: 2.3, yaw: 68, pitch: -22, fov: 42 }),
      zone: "town",
      look: "overworld-storm",
      note: "'The sky went dark': the third colour of the film arrives on the cut. From under his chin, his face turned up to a sky gone purple.",
      stage: () => <HeroBundle position={STOPS} rotationY={EAST} face="fear" headPitch={-0.5} lift={0.7} />,
    },
    {
      cue: "17.land",
      ...cam.push({ on: [WALL[0], 14, WALL[2]], dist: 46, to: 41, yaw: -90, pitch: -12, fov: 56 }),
      impacts: [{ at: LANDS, amp: 0.3, dur: 0.7 }],
      zone: "town",
      look: "overworld-storm",
      note: "'Bigger than our whole town': the wide the film has been saving. She drops out of the sky onto the wall and does not fit in the frame.",
      stage: (t) => {
        const fall = 1 - ramp(t, 0.05, LANDS);
        const down = t >= LANDS ? 1 : 0;
        return (
          <>
            <Mother position={[WALL[0], WALL[1] + fall * fall * 36, WALL[2]]} rotationY={WEST} spread={lerp(0.3, 1, ease(ramp(t, LANDS, LANDS + 0.8)))} />
            <Puffs position={[WALL[0] - 1, WALL[1], WALL[2]]} color="#8a8690" count={12} rise={7} spread={6} size={2.2} speed={0.5} opacity={0.6 * down} seed={61} />
            <StreetMonsters bow={1} />
            <HeroBundle position={STOPS} rotationY={EAST} face="fear" lift={0.7} />
          </>
        );
      },
    },
    {
      cue: "17.why",
      ...cam.push({ on: faceOf(STOPS), dist: 1.85, to: 1.35, yaw: 74, pitch: -5, fov: 36 }),
      zone: "town",
      look: "overworld-storm",
      note: "'I finally understood the rule': his face, lit orange by something we are not shown in this shot. The old woman's line lands here.",
      stage: () => (
        <>
          <HeroBundle position={STOPS} rotationY={EAST} face="wow" lift={0.5} />
          <HerGlow />
        </>
      ),
    },
    {
      cue: "17.gifts",
      ...cam.push({ on: [N[0], 0.5, N[2]], dist: 6.4, to: 4.6, yaw: 24, pitch: 22, fov: 42 }),
      zone: "town",
      look: "overworld-storm",
      note: "'Never gifts': the stone nest from the start of the film, under the wrong sky. The same eggs, and now they look taken.",
      stage: (t) => <NestEggs tap={t} />,
    },
    {
      cue: "17.steal",
      ...cam.push({ on: [N[0] + 0.3, 1.5, N[2] - 1], dist: 8.2, to: 5.6, yaw: -10, pitch: 5, fov: 42 }),
      zone: "town",
      look: "overworld-night",
      note: "'Our golems had been stealing them': the exact camera of the night shot in scene 2. This time the eyes step out of the dark, with arms full of eggs.",
      stage: (t, { p }) => (
        <>
          <Golem position={[N[0] + 1.25, 0, lerp(N[2] - 5.3, N[2] - 3.7, p)]} rotationY={0} walk={p * 1.6} carry={1}>
            {[-0.5, 0, 0.5].map((x, i) => (
              <MonsterEgg key={i} position={[x, 0.14, 0.12 - Math.abs(x) * 0.3]} rotationY={i} scale={0.72} color={EGG_COLORS[i * 2][0]} spots={EGG_COLORS[i * 2][1]} />
            ))}
          </Golem>
          {/* The moon finds it this time. In scene 2 this light is not there, and all you get is the eyes. */}
          <pointLight position={[N[0] + 0.4, 3.4, N[2] - 1.2]} color="#a9c2ff" intensity={60} distance={13} decay={2} />
        </>
      ),
    },
    {
      cue: "17.baby",
      ...cam.top({ on: [17, 0.25, 6], height: 4.6, to: 3.0, spin: [-20, 12] }),
      zone: "town",
      look: "overworld-storm",
      note: "'A cracked egg is not broken': the exact camera of the well shot in scene 5. Every egg the town threw away is glowing.",
      stage: (t) => (
        <WellEggs glow={1} t={t} />
      ),
    },
    {
      cue: "17.call",
      ...cam.pan({ from: [6.5, 1.25, 3.1], on: [CALLS[0], CALLS[1] + 0.3, CALLS[2]], onTo: [19, 17, 1], fov: 46 }),
      zone: "town",
      look: "overworld-storm",
      note: "'Calling for its mother': from the worm, still calling in his arms, up and up to the head coming down over the wall behind him to answer.",
      stage: (t) => (
        <>
          <HeroBundle position={STOPS} rotationY={SIDE} face="fear" lift={0.8} mouth={1} />
          <SoundRings position={[CALLS[0] - 0.1, CALLS[1] + 0.42, CALLS[2] + 0.08]} rotationY={SIDE} t={(t * 1.2) % 1.1} reach={0.8} color="#fff3b0" />
          <Mother position={WALL} rotationY={WEST} lower={ease(ramp(t, 0.5, 2.2))} />
          <HerGlow power={0.6} />
        </>
      ),
    },
    {
      cue: "17.home",
      ...cam.push({ on: [15, 8, 1.2], dist: 14.5, to: 13, yaw: -90, pitch: -30, fov: 56 }),
      zone: "town",
      look: "overworld-storm",
      note: "'Mine had just called her home': him from behind, very small, and her face filling everything above him. The image the film was built for.",
      stage: () => (
        <>
          <Mother position={WALL} rotationY={WEST} lower={1} />
          <HeroBundle position={STOPS} rotationY={EAST} face="fear" lift={0.8} />
          <HerGlow />
        </>
      ),
    },
  ],
});
