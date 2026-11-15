import { cam, storyScene } from "../../engine";
import { Friend, Hero, PLACE, Splash, timing, travel } from "./kit";

/**
 * 04 SINKING — the bottom of the pool, and the friend with his shoes on.
 *
 * The lowest point of the story: he looks up, the top is far away, and somebody else has to come and get him.
 * Then the tiles, lying still, too tired to be embarrassed.
 */

const P = PLACE.pool[0];

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The Bottom",
  shots: [
    {
      cue: "4.bottom",
      ...cam.push({ on: [P + 3.2, -1.55, 3.6], dist: 3.0, to: 2.2, yaw: 150, pitch: 6, fov: 44 }),
      zone: "pool",
      look: "overworld-day",
      note: "On the floor of the pool with him: he sits on blue tile and looks up. The camera sits with him, so the audience feels the height.",
      stage: (_t, { p }) => (
        <>
          <Hero
            position={[P + 3.2, -0.95 - p * 1.07, 3.6]}
            rotationY={0.5}
            animation={p < 0.75 ? "fall" : "sit"}
            face="scared"
            headPitch={0.5}
          />
        </>
      ),
    },
    {
      cue: "4.bubble",
      ...cam.push({ on: [P + 3.3, -0.75, 3.8], dist: 2.4, to: 1.8, yaw: 24, pitch: -34, fov: 46 }),
      zone: "pool",
      look: "overworld-day",
      note: "From under him, looking up past his head: the surface is a bright ceiling with no way through it. His own bubbles go where he cannot.",
      stage: () => (
        <>
          <Hero position={[P + 3.3, -1.95, 3.8]} animation="reachUp" face="scared" headPitch={0.6} />
          <Splash at={[P + 3.3, -1.2, 3.8]} size={0.07} count={8} seed={41} />
        </>
      ),
    },
    {
      cue: "4.shoes",
      ...cam.push({ on: [P + 4.0, 0.9, 3.4], dist: 5.2, to: 4.4, yaw: 122, pitch: 8, fov: 42 }),
      zone: "pool",
      look: "overworld-day",
      note: "The rescue is ridiculous on purpose: the friend comes over the edge in mid-air, shoes still on, one arm out. Splash where he lands.",
      stage: (_t, { p }) => (
        <>
          <Friend position={[P + 4.6, 1.75 - p * 2.45, 3.4]} rotationY={-2.1} animation="fall" face="worried" shoes="#2b2b2b" />
          <Splash at={[P + 4.6, 0.02, 3.4]} size={0.3} count={14} seed={43} />
          <Hero position={[P + 3.3, -1.5, 3.7]} animation="reachUp" face="scared" />
        </>
      ),
    },
    {
      cue: "4.pull",
      ...cam.push({ on: [P + 2.2, 0.5, 6.2], dist: 3.4, to: 4.4, yaw: 152, pitch: 6, fov: 42 }),
      zone: "pool",
      look: "overworld-day",
      note: "Out of the water and onto the deck, hauled by the shirt: two wet kids, one of them still wearing shoes, and a trail of water on white tile.",
      stage: (_t, { p }) => (
        <>
          <Hero
            position={travel(p, [P + 2.4, -0.55, 5.9], [P + 2.0, 0, 6.95])}
            rotationY={-0.37}
            animation={p < 0.85 ? "stagger" : "cower"}
            face="sad"
          />
          <Friend
            position={travel(p, [P + 1.9, -0.6, 5.7], [P + 1.2, 0, 6.6])}
            rotationY={-0.66}
            animation={p < 0.85 ? "hold" : "reach"}
            face="worried"
            shoes="#2b2b2b"
          />
          <Splash at={[P + 2.4, 0.05, 6.2]} size={0.12} count={7} seed={47} />
        </>
      ),
    },
    {
      cue: "4.taste",
      ...cam.orbit({ on: [P + 2.3, 0.5, 7.0], dist: 1.8, yaw: -24, pitch: 22, yawTo: -4, fov: 36 }),
      zone: "pool",
      look: "overworld-day",
      note: "Close and above: he spits pool water onto the tiles and watches it, because his mouth tastes of the whole town's summer.",
      stage: () => (
        <>
          <Hero position={[P + 2.3, 0, 7.0]} rotationY={0.2} animation="ache" face="sad" headPitch={0.3} />
        </>
      ),
    },
    {
      cue: "4.tiles",
      ...cam.top({ on: [P + 2.75, 0.1, 7.3], height: 6.6, to: 4.6, spin: [-7, 2], fov: 42 }),
      zone: "pool",
      look: "overworld-day",
      note: "The shot the owner asked for: straight down, his whole body flat on the white tiles, arms out, water still running off him. Nothing else in frame.",
      stage: () => (
        <>
          <Hero position={[P + 2.3, 0, 7.3]} rotationY={1.6} animation="lie" face="sad" />
          <Splash at={[P + 2.3, 0.02, 6.9]} size={0.08} count={4} seed={53} />
        </>
      ),
    },
    {
      cue: "4.tired",
      ...cam.push({ on: [P + 2.3, 0.3, 7.4], dist: 3.8, to: 3.0, yaw: 34, pitch: 26, fov: 40 }),
      zone: "pool",
      look: "overworld-day",
      note: "Tile level, cheek on the tile, one eye open: the smallest shot in the film, and the emptiest. He is not getting up yet.",
      stage: () => (
        <>
          <Hero position={[P + 2.3, 0, 7.4]} rotationY={1.6} animation="lie" face="sad" headPitch={0.25} />
        </>
      ),
    },
  ],
});
