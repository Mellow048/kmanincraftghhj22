import { cam, storyScene } from "../../engine";
import { BRIDGE_Y, PORCH_Y } from "./marks";
import {
  BigSlimeDad,
  Bits,
  DadStack,
  EAST,
  HangingBabyCoat,
  Hero,
  NORTH,
  OriginalBigDad,
  Puffs,
  ReedBasket,
  RogueGolem,
  SOUTH,
  TinyDad,
  TwinWhiteCraters,
  pop,
  timing,
  tw,
  w,
} from "./kit";

/**
 * Clip 05 — The Four-Clue Reveal & Maximum Stakes (`05-reveal`, 7 shots):
 *   Every clue snaps into place: Dad never fell down the stairs or hit a cactus—twice he stood in front
 *   of that Iron Golem's fist to save baby Hero, and with zero splits left all four still stack in front of him!
 */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Twice He Took That Fist",
  shots: [
    {
      cue: "5.stare",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({ on: [-0.85, BRIDGE_Y + 0.85, 1.35], dist: 1.95, to: 1.48, yaw: 22, pitch: 8, fov: 33 }),
      note: "Realisation close-up: Hero stares in stunned silence at the two fresh white fist craters in the bridge stone.",
      stage: (t) => {
        const k = tw(t, 0, 0.9);
        return (
          <>
            <TwinWhiteCraters position={[-1.25, BRIDGE_Y + 0.02, 0.55]} rotationY={0.35} />
            <Hero
              position={[-0.78, BRIDGE_Y, 1.55]}
              rotationY={NORTH + 0.3}
              animation="idle"
              face="wow"
              headPitch={0.28 + k * 0.08}
              headYaw={0.14 * k}
            />
          </>
        );
      },
    },
    {
      cue: "5.craters",
      zone: "village",
      look: "overworld-day",
      ...cam.push({ on: [1.5, 0.22, -11.75], dist: 2.25, to: 1.68, yaw: -38, pitch: 28, fov: 35 }),
      note: "Clue callback #1 & #2: match-cut onto the exact same twin white fist craters beside our porch stairs in the swamp.",
      stage: (t) => {
        const settle = tw(t, 0, 0.75);
        return (
          <>
            <TinyDad
              which={1}
              position={[0.88, 0, -11.65]}
              rotationY={0.4}
              squash={0.12 + settle * 0.14}
              mood="sad"
              nod={0.2 * settle}
            />
          </>
        );
      },
    },
    {
      cue: "5.list",
      zone: "room",
      look: "warm-room",
      ...cam.push({ on: [-2.45, 1.05, 0.35], dist: 1.85, to: 1.4, yaw: 52, pitch: 8, fov: 34 }),
      note: "Clue callback #3 & #4: rapid push onto the torn blue baby coat swaying by the cottage door.",
      stage: (t) => (
        <>
          <HangingBabyCoat
            position={[-2.56, 1.15, 0.35]}
            rotationY={EAST}
            sway={0.14 * Math.sin(t * 4.5) + tw(t, 0, 0.6) * 0.08}
          />
        </>
      ),
    },
    {
      cue: "5.never",
      zone: "village",
      look: "overworld-sunset",
      ...cam.push({ on: [0.25, 1.05, -11.6], dist: 3.65, to: 2.85, yaw: -32, pitch: -6, fov: 39 }),
      note: "Flashback truth: towering two-block Dad leaps squarely between the baby basket on the porch and the Iron Golem!",
      stage: (t) => {
        const block = tw(t, 0.05, w("5.never", "never") + 0.35);
        return (
          <>
            <ReedBasket position={[0, PORCH_Y, -12.6]} rotationY={SOUTH} reach={0.8} />
            <OriginalBigDad
              position={[0.15, 0, -11.45]}
              rotationY={SOUTH}
              squash={0.15 + block * 0.18}
              mood="angry"
            />
            <RogueGolem
              position={[0.45, 0, -9.55 - block * 0.45]}
              rotationY={NORTH}
              scale={1.16}
              armR={-1.95 * block}
              armL={-1.95 * block}
            />
          </>
        );
      },
    },
    {
      cue: "5.twice",
      zone: "village",
      look: "overworld-sunset",
      shake: 0.016,
      ...cam.orbit({ on: [0.2, 0.92, -11.3], dist: 3.9, distTo: 3.05, yaw: 38, yawTo: 18, pitch: 14, fov: 41 }),
      note: "Twice he took that fist: two medium slime dads take the second slam and burst into our four tiny dads shielding the baby!",
      stage: (t) => {
        const splitAt = w("5.twice", "fist");
        const secondHit = t >= splitAt;
        const spread = tw(t, splitAt, splitAt + 0.42);
        return (
          <>
            <ReedBasket position={[0, PORCH_Y, -12.6]} rotationY={SOUTH} reach={0.95} />
            <RogueGolem
              position={[0.35, 0, -9.85]}
              rotationY={NORTH}
              scale={1.16}
              bow={pop(t, splitAt, 0.3) * 0.42}
              armR={secondHit ? 0.35 : -2.1}
              armL={secondHit ? 0.35 : -2.1}
            />
            {!secondHit ? (
              <>
                <BigSlimeDad which={1} position={[-0.42, 0, -11.35]} rotationY={SOUTH} squash={0.22} mood="angry" />
                <BigSlimeDad which={2} position={[0.58, 0, -11.35]} rotationY={SOUTH} squash={0.22} mood="angry" />
              </>
            ) : (
              <>
                <TinyDad which={1} position={[-0.68 - spread * 0.18, 0, -11.45]} rotationY={SOUTH} squash={0.3 * (1 - spread)} mood="angry" />
                <TinyDad which={2} position={[-0.22, 0, -11.35]} rotationY={SOUTH} squash={0.3 * (1 - spread)} mood="angry" />
                <TinyDad which={3} position={[0.28, 0, -11.35]} rotationY={SOUTH} squash={0.3 * (1 - spread)} mood="angry" />
                <TinyDad which={4} position={[0.74 + spread * 0.18, 0, -11.45]} rotationY={SOUTH} squash={0.3 * (1 - spread)} mood="angry" />
                <Bits position={[0.1, 0.65, -11.2]} t={t - splitAt} color="#7aff54" count={18} power={1.25} />
                <Puffs position={[0.2, 0.3, -10.9]} count={9} color="#e8e8e0" />
              </>
            )}
          </>
        );
      },
    },
    {
      cue: "5.zero",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({ on: [0, BRIDGE_Y + 0.38, -1.1], dist: 2.3, to: 1.72, yaw: -28, pitch: 16, fov: 35 }),
      note: "Back on the moonlit bridge: trembling close-up on the four tiny knee-high dads—zero splits left.",
      stage: (t) => {
        const shiver = Math.sin(t * 18) * 0.025;
        return (
          <>
            <TinyDad which={1} position={[-0.52 + shiver, BRIDGE_Y, -1.1]} rotationY={SOUTH} squash={0.16 + tw(t, 0, 0.8) * 0.1} mood="scared" />
            <TinyDad which={2} position={[-0.16 - shiver, BRIDGE_Y, -1.02]} rotationY={SOUTH} squash={0.16 + tw(t, 0, 0.8) * 0.1} mood="scared" />
            <TinyDad which={3} position={[0.22 + shiver, BRIDGE_Y, -1.05]} rotationY={SOUTH} squash={0.18 + tw(t, 0, 0.8) * 0.1} mood="scared" />
            <TinyDad which={4} position={[0.58 - shiver, BRIDGE_Y, -1.12]} rotationY={SOUTH} squash={0.16 + tw(t, 0, 0.8) * 0.1} mood="scared" />
          </>
        );
      },
    },
    {
      cue: "5.front",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({ on: [0, BRIDGE_Y + 0.92, 0.85], dist: 2.75, to: 2.08, yaw: 34, pitch: -10, fov: 36 }),
      note: "Maximum heart: with zero splits left, all four tiny dads still hop in front of Hero's shoes and stack up to guard him!",
      stage: (t) => {
        const stackUp = tw(t, 0.05, w("5.front", "stacked") + 0.25);
        return (
          <>
            <Hero
              position={[0, BRIDGE_Y, 1.62]}
              rotationY={NORTH}
              animation="reach"
              face="crying"
              headPitch={0.14}
            />
            <DadStack
              position={[0, BRIDGE_Y, 0.78]}
              rotationY={NORTH}
              sway={Math.sin(t * 7) * 0.24 * stackUp}
              squash={0.28 * (1 - stackUp) + 0.08}
              mood="angry"
              topLean={0.2 * stackUp}
            />
            <RogueGolem
              position={[0.1, BRIDGE_Y, -0.95]}
              rotationY={SOUTH}
              scale={1.16}
              armR={-1.45 * stackUp}
              armL={-1.45 * stackUp}
            />
          </>
        );
      },
    },
  ],
});
