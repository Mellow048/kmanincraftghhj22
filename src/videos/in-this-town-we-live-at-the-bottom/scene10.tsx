import { cam, storyScene } from "../../engine";
import { Boat, EAST, EmeraldPile, FishingHero, Hero, JettyLantern, Rod, SOUTH, TOWN_ROBES, Villager, WEST, ease, ramp, timing, wordAt } from "./kit";

const CUT_BOAT = wordAt("10.rod", "Then");

export const scene10 = storyScene(timing, {
  id: "scene10",
  title: "Nine days",
  shots: [
    {
      cue: "10.night",
      ...cam.orbit({ on: [0, 1.2, 10], dist: 6.4, distTo: 4.4, yaw: 32, yawTo: 68, pitch: 8, fov: 46, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-night",
      note: "Front-3/4 shot: stationary Hero holds fishing rod cleanly beneath warm jetty lantern over dark water.",
      stage: (t) => {
        const pull = Math.sin(t * 3.8);
        return (
          <>
            <JettyLantern position={[-1.05, 0.5, 10.6]} lit={1.2 + Math.sin(t * 7) * 0.12} />
            <FishingHero position={[-0.1, 0.5, 10.0]} rotationY={EAST - 0.25} bend={0.3 + pull * 0.14} face="uneasy" headPitch={0.1} time={t} />
          </>
        );
      },
    },
    {
      cue: "10.storm",
      ...cam.push({ on: [2.4, 1.2, 11.2], dist: 13.2, to: 11.8, yaw: 14, pitch: 10, fov: 58, screenOffset: [0, 0.08] }),
      impacts: [{ at: 0.4, amp: 0.025, dur: 0.35 }, { at: 1.0, amp: 0.025, dur: 0.35 }],
      zone: "bottom",
      look: "overworld-storm",
      note: "Front-3/4 view from water side: Hero casts EAST into stormy bay with rocking Boat clear of jetty and pilings.",
      stage: (t) => (
        <>
          <FishingHero position={[-0.15, 0.5, 10.0]} rotationY={EAST - 0.15} bend={0.75 + Math.sin(t * 10) * 0.15} face="scared" headPitch={0.1} time={t * 1.6} />
          <Boat position={[3.7, 0.15 + Math.sin(t * 4.2) * 0.08, 12.2]} rotationY={0.3 + Math.sin(t * 2.2) * 0.18} bail={0.65} />
        </>
      ),
    },
    {
      cue: "10.rod",
      ...cam.push({ on: [-3.75, 1.15, -5.2], dist: 6.2, to: 5.3, yaw: -38, pitch: 8, fov: 48, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "Cut 1 ('I sold my rod'): Hero clear of stall hay bale slides rod onto stall counter to merchant.",
      stage: (t) => {
        const give = ease(ramp(t, 0, 0.9));
        return (
          <>
            <Hero position={[-3.35, 0, -4.35]} rotationY={WEST + 0.35} animation={give < 0.7 ? "reach" : "idle"} face="frown" time={t} />
            <Rod position={[-3.55 - give * 0.55, 1.06, -5.35]} bend={0.1} rotationY={WEST + 0.3} />
            <Villager position={[-4.2, 0, -6.22]} rotationY={SOUTH} robe={TOWN_ROBES[3]} hmm={0.25 + give * 0.25} />
          </>
        );
      },
    },
    {
      cue: "10.rod",
      cut: CUT_BOAT,
      ...cam.orbit({ on: [2.3, 1.1, 11.2], dist: 12.6, distTo: 11.6, yaw: 10, yawTo: 2, pitch: 12, fov: 58, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "Cut 2 ('Then the boat'): distinct-robe buyer inspects Boat in bay while Hero watches regretfully from jetty.",
      stage: (t) => {
        const give = ease(ramp(t, 0, 0.9));
        return (
          <>
            <Hero position={[-0.25, 0.5, 10.8]} rotationY={EAST - 0.25} animation="shrug" face="frown" time={t} />
            <Villager position={[0.85, 0.5, 11.0]} rotationY={EAST} robe={TOWN_ROBES[0]} hmm={0.3 + 0.2 * give} />
            <Boat position={[3.7, 0.02, 11.6 - give * 0.6]} rotationY={0.4} hole bail={0.1} />
          </>
        );
      },
    },
    {
      cue: "10.count",
      ...cam.orbit({ on: [-0.2, 1.0, 9.6], dist: 4.8, distTo: 3.8, yaw: -18, yawTo: 16, pitch: 18, fov: 44, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "Front-3/4 view: Hero leans directly over a green EmeraldPile on the planks looking at the emeralds.",
      stage: (t) => {
        const count = ease(ramp(t, 0, 1.3));
        return (
          <>
            <Hero position={[-0.55, 0.5, 9.3]} rotationY={SOUTH + 0.35} animation="leanOver" face="frown" lookAt={[0.15, 0.62, 9.9]} time={t} />
            <EmeraldPile position={[0.15, 0.52, 9.9]} n={Math.max(3, Math.round(count * 9))} scale={1.1} seed={8} />
          </>
        );
      },
    },
  ],
});
