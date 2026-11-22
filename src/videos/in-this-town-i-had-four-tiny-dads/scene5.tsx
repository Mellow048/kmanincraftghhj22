import { cam, storyScene } from "../../engine";
import { BRIDGE_Y, PORCH_Y } from "./marks";
import {
  BabyHero,
  BigSlimeDad,
  DadStack,
  Hero,
  OriginalBigDad,
  Puffs,
  RogueGolem,
  SOUTH,
  TinyDad,
  TwinWhiteCraters,
  pop,
  timing,
  tw,
  w,
} from "./kit";

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Why Dad Split Twice",
  shots: [
    {
      cue: "5.stare",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({ on: [-0.95, BRIDGE_Y + 0.35, 0.72], dist: 3.65, to: 2.78, yaw: 24, pitch: 22, fov: 40 }),
      note: "Hero stares wide-eyed at the two fresh white fist craters smashed into the bridge stone.",
      stage: (t) => (
        <>
          <TwinWhiteCraters position={[-1.45, BRIDGE_Y + 0.02, 0.85]} rotationY={0.4} />
          <Hero
            position={[-0.48, BRIDGE_Y, 0.55]}
            rotationY={0.28}
            animation="crouch"
            face="wow"
            headPitch={0.28}
            headYaw={0.22 + Math.sin(t * 2.5) * 0.05}
          />
        </>
      ),
    },
    {
      cue: "5.craters",
      zone: "village",
      look: "overworld-day",
      ...cam.push({ on: [1.35, 0.25, -11.55], dist: 4.1, to: 3.15, yaw: -22, pitch: 26, fov: 41 }),
      note: "Match-cut realization: the exact same twin white craters beside our front porch steps in the wet swamp!",
      stage: () => null,
    },
    {
      cue: "5.list",
      zone: "room",
      look: "overworld-day",
      ...cam.push({ on: [-0.55, 1.08, -2.1], dist: 3.4, to: 2.65, yaw: -14, pitch: 6, fov: 39 }),
      note: "Clue flashback inside the cottage: the torn blue baby coat with the green slime fleck on the back wall.",
      stage: () => (
        <Hero
          position={[-1.12, 0, -1.85]}
          rotationY={0.68}
          animation="reach"
          face="surprised"
          headPitch={-0.08}
        />
      ),
    },
    {
      cue: "5.never",
      zone: "village",
      look: "overworld-night",
      shake: 0.26,
      ...cam.push({ on: [0.05, 0.98, -11.1], dist: 6.4, to: 5.2, yaw: -20, pitch: 13, fov: 46 }),
      note: "Flashback #1 by our porch: Original Big Dad takes the Golem's iron punch for Baby Hero and splits into two!",
      stage: (t) => {
        const hitAt = w("5.never", "never") + 0.45;
        const splitted = t >= hitAt;
        const k = tw(t, hitAt, hitAt + 0.38);
        return (
          <>
            <BabyHero position={[-1.08, PORCH_Y, -11.95]} rotationY={0.25} cry reach={0.8} />
            <RogueGolem
              position={[0.88, 0, -10.45]}
              rotationY={-0.48}
              armL={-1.85 + pop(t, hitAt, 0.3) * 1.4}
              armR={-0.8}
            />
            {!splitted ? (
              <OriginalBigDad position={[-0.32, 0, -11.25]} rotationY={0.28} mood="angry" />
            ) : (
              <>
                <BigSlimeDad which={1} position={[-0.32 - k * 0.44, Math.sin(k * Math.PI) * 0.32, -11.2]} rotationY={0.32} squash={0.24} mood="angry" />
                <BigSlimeDad which={2} position={[-0.32 + k * 0.44, Math.sin(k * Math.PI) * 0.32, -11.3]} rotationY={0.2} squash={0.24} mood="angry" />
                <Puffs position={[-0.32, 0.55, -11.25]} count={10} color="#a4ff7e" />
              </>
            )}
          </>
        );
      },
    },
    {
      cue: "5.twice",
      zone: "bridge",
      look: "overworld-night",
      shake: 0.28,
      ...cam.push({ on: [0.05, BRIDGE_Y + 0.85, 0.35], dist: 5.8, to: 4.65, yaw: 142, pitch: 10, fov: 45 }),
      note: "Flashback #2 on the bridge: both medium slime dads take a second golem fist and split into our four tiny dads!",
      stage: (t) => {
        const hitAt = w("5.twice", "fist");
        const splitted = t >= hitAt;
        const k = tw(t, hitAt, hitAt + 0.38);
        return (
          <>
            <BabyHero position={[0.55, BRIDGE_Y, -1.15]} rotationY={2.55} cry reach={0.9} />
            <RogueGolem
              position={[0.1, BRIDGE_Y, 1.45]}
              rotationY={2.72}
              armR={-1.95 + pop(t, hitAt, 0.3) * 1.45}
              armL={-1.1}
            />
            {!splitted ? (
              <>
                <BigSlimeDad which={1} position={[-0.35, BRIDGE_Y, -0.05]} rotationY={2.65} mood="angry" />
                <BigSlimeDad which={2} position={[0.45, BRIDGE_Y, -0.05]} rotationY={2.65} mood="angry" />
              </>
            ) : (
              <>
                <TinyDad which={1} position={[-0.55 - k * 0.25, BRIDGE_Y + Math.sin(k * Math.PI) * 0.35, -0.15]} rotationY={2.65} squash={0.22} mood="angry" />
                <TinyDad which={2} position={[-0.18, BRIDGE_Y + Math.sin(k * Math.PI) * 0.4, -0.25]} rotationY={2.65} squash={0.22} mood="angry" />
                <TinyDad which={3} position={[0.22, BRIDGE_Y + Math.sin(k * Math.PI) * 0.4, -0.25]} rotationY={2.65} squash={0.22} mood="angry" />
                <TinyDad which={4} position={[0.58 + k * 0.25, BRIDGE_Y + Math.sin(k * Math.PI) * 0.35, -0.15]} rotationY={2.65} squash={0.22} mood="angry" />
                <Puffs position={[0.05, BRIDGE_Y + 0.45, -0.1]} count={11} color="#a8ff82" />
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
      ...cam.push({ on: [0.05, BRIDGE_Y + 0.42, -0.45], dist: 3.7, to: 2.85, yaw: -20, pitch: 18, fov: 40 }),
      note: "Present night: all four tiny 38cm dads have zero splits left—one more hit and he's gone forever.",
      stage: (t) => (
        <>
          <TinyDad which={1} position={[-0.72, BRIDGE_Y, -0.42]} rotationY={SOUTH + 0.15} squash={0.14 + Math.sin(t * 7) * 0.05} mood="angry" />
          <TinyDad which={2} position={[-0.25, BRIDGE_Y, -0.35]} rotationY={SOUTH + 0.05} squash={0.14 + Math.cos(t * 7) * 0.05} mood="angry" />
          <TinyDad which={3} position={[0.22, BRIDGE_Y, -0.35]} rotationY={SOUTH - 0.05} squash={0.14 + Math.sin(t * 7) * 0.05} mood="angry" />
          <TinyDad which={4} position={[0.68, BRIDGE_Y, -0.42]} rotationY={SOUTH - 0.15} squash={0.14 + Math.cos(t * 7) * 0.05} mood="angry" />
          <Hero
            position={[0.88, BRIDGE_Y, -0.95]}
            rotationY={-0.38}
            animation="scared"
            face="sad"
          />
        </>
      ),
    },
    {
      cue: "5.front",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({ on: [0.18, BRIDGE_Y + 0.88, 0.25], dist: 4.9, to: 3.85, yaw: 145, pitch: 6, fov: 43 }),
      note: "Heroic tearjerker: with zero splits left, all four tiny dads STILL stack up right in front of Hero's shoes!",
      stage: (t) => (
        <>
          <Hero
            position={[0.28, BRIDGE_Y, -1.05]}
            rotationY={2.65}
            animation="reach"
            face="crying"
          />
          <DadStack
            position={[0.18, BRIDGE_Y, -0.22]}
            rotationY={2.65}
            sway={Math.sin(t * 5) * 0.2}
            squash={0.1}
            mood="angry"
          />
          <RogueGolem
            position={[0.15, BRIDGE_Y, 1.65]}
            rotationY={2.75}
            armL={-1.35}
            armR={-1.35}
            headPitch={0.18}
          />
        </>
      ),
    },
  ],
});
