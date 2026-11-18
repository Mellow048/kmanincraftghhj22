import type React from "react";
import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Block, Cow, Gate, Glow, HOME, IceThrower, Lost, Mailboxes, Neighbours, Plate, Puffs, STAGE_Z, SOUTH, Squid, StageSet, StageGone, hop, pop, timing, tw, w } from "./kit";
import type { Who } from "./kit";

/** 01 — The hook, and the vote. Everybody here lost one. She lost to a squid. */
const ME = HOME.cow.at;
const GATE_Z_IN = 6.4;
const S: Vec3 = [0, 0.7, STAGE_Z + 0.2];
const STAND = (i: number): Vec3 => [(i - 1) * 1.15, 1.0, STAGE_Z + 0.2];
const HEAD: Record<Who, number> = { cow: 2.35, golem: 2.4, ice: 3.3, bush: 2.2, hide: 1.5, stone: 1.55, crab: 1.15, penguin: 1.55 };
/** The players, as she saw them from the stage: rows of heads in the dark. */
const Players: React.FC<{ t: number; cheer?: number }> = ({ t, cheer = 0 }) => (
  <>
    {Array.from({ length: 40 }, (_, i) => {
      const row = Math.floor(i / 8);
      const x = (i % 8) * 1.0 - 3.5 + (row % 2) * 0.5;
      const z = STAGE_Z + 5 + row * 1.3;
      const skin = ["#c98f6a", "#8a5a3c", "#e8c39a", "#6b4a2a"][i % 4];
      const shirt = ["#19b0b0", "#e07a2a", "#7a4ab8", "#3f9a34", "#c8322a"][i % 5];
      const up = cheer * Math.max(0, Math.sin(t * 9 + i * 1.3)) * 0.25;
      return (
        <group key={i} position={[x, up, z]}>
          <Block position={[0, 0.7, 0]} size={[0.5, 0.75, 0.28]} color={shirt} />
          <Block position={[0, 1.33, 0]} size={[0.5, 0.5, 0.5]} color={skin} />
          <Block position={[0, 1.55, 0]} size={[0.52, 0.12, 0.52]} color="#3a2416" castShadow={false} />
        </group>
      );
    })}
  </>
);

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Everybody lost",
  shots: [
    {
      cue: "1.vote",
      ...cam.push({ on: [0.1, 1.5, 1.4], dist: 6.6, to: 6.0, yaw: -7, pitch: 7, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The hook, and the premise in one frame. A yellow cow with flowers on her back looks at us. Behind her a street of things nobody has seen in the game: a man in a blue hood with a block of ice, a floating bush, a crab, a penguin. A red LOST plate pops up over every head, hers first.",
      stage: (t) => (
        <>
          <Mailboxes />
          <Neighbours t={t} />
          <StageGone />
          <Cow position={[ME[0], hop(t, 0.2, 0.18, 0.3), ME[2]]} rotationY={SOUTH + 0.45} t={t} look={-0.5} tilt={0.12 * Math.sin(tw(t, 0.9, 1.5) * Math.PI)} />
          <Lost position={[ME[0] + 0.3, HEAD.cow, ME[2] + 0.6]} scale={0.95 * pop(t, 0.12, 0.2)} />
          {(["ice", "bush", "hide", "stone", "crab", "penguin"] as Who[]).map((who, i) => (
            <Lost key={who} position={[HOME[who].at[0], HEAD[who], HOME[who].at[2]]} scale={(1.05 + i * 0.22) * pop(t, 0.3 + i * 0.12, 0.2)} />
          ))}
        </>
      ),
    },
    {
      cue: "1.cow",
      ...cam.push({ on: [0, 1.0, 3.1], dist: 3.1, to: 2.7, yaw: -16, pitch: 2, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "Her face, close: yellow, a pink nose, a buttercup growing out of her head. On 'flowers' a second one pops out next to it. She does not react.",
      stage: (t) => (
        <>
          <Mailboxes />
          <Neighbours t={t} />
          <Cow position={ME} rotationY={SOUTH - 0.25} t={t} flowers={3}>
            <group position={[-0.14, 0.3, 0.26]} scale={1.3 * pop(t, w("1.cow", "flowers") - 0.1, 0.2)}>
              <Block position={[0, 0.08, 0]} size={[0.04, 0.16, 0.04]} color="#3f8a34" castShadow={false} />
              <Block position={[0, 0.2, 0]} size={[0.18, 0.1, 0.18]} color="#ffe14a" castShadow={false} />
            </group>
          </Cow>
        </>
      ),
    },
    {
      cue: "1.squid",
      ...cam.push({ on: [0, 1.9, STAGE_Z + 0.2], dist: 7.4, to: 6.8, yaw: 0, pitch: 3, fov: 46 }),
      zone: "stage",
      look: "overworld-night",
      note: "The night of the vote. A stage, three stands: a man in a blue hood, a squid in the spotlight with WINNER over it, and her. She is looking sideways at the squid.",
      stage: (t) => (
        <>
          <StageSet lit />
          <IceThrower position={[STAND(0)[0], 1.0, STAND(0)[2]]} rotationY={SOUTH} t={t} ice={0} turn={-0.7} />
          <Squid position={[0, 1.0 + Math.sin(t * 3) * 0.05, STAND(1)[2]]} t={t} />
          <Cow position={[STAND(2)[0], 1.0, STAND(2)[2] - 0.3]} rotationY={SOUTH} scale={0.8} t={t} look={0.9} />
          <Plate position={[0, 3.05, STAGE_Z + 0.3]} text="WINNER" scale={0.9 * pop(t, 0.15, 0.2)} color="#ffe27a" />
          <pointLight position={[0, 4, STAGE_Z + 2.5]} color="#bffff4" intensity={30} distance={8} decay={2} />
        </>
      ),
    },
    {
      cue: "1.glow",
      ...cam.push({ on: [0.25, 1.85, STAGE_Z + 0.2], dist: 3.6, to: 3.2, yaw: -14, pitch: 2, fov: 46 }),
      zone: "stage",
      look: "overworld-night",
      note: "Close on the squid. It glows brighter. It glows less. That is the whole act. Her head, at the edge of the frame, turns from it to us.",
      stage: (t) => {
        const us = tw(t, w("1.glow", "That") - 0.1, w("1.glow", "That") + 0.2);
        return (
          <>
            <StageSet lit />
            <Squid position={[0, 1.0 + Math.sin(t * 3) * 0.05, STAND(1)[2]]} t={t} glow={0.55 + 0.45 * Math.sin(t * 5)} />
            <Cow position={[STAND(2)[0], 1.0, STAND(2)[2] - 0.3]} rotationY={SOUTH} scale={0.8} t={t} look={0.9 * (1 - us) - 0.2 * us} />
          </>
        );
      },
    },
    {
      cue: "1.how",
      ...cam.push({ on: [0, 0.7, STAGE_Z + 3.6], dist: 5.6, to: 5.4, yaw: 180, pitch: 30, fov: 62 }),
      zone: "stage",
      look: "overworld-night",
      note: "From behind the three of them, out over the edge of the stage: rows and rows of players' heads in the dark, all looking up at three small backs.",
      stage: (t) => (
        <>
          <StageSet lit />
          <Players t={t} />
          <IceThrower position={[STAND(0)[0], 1.0, STAND(0)[2]]} rotationY={SOUTH} t={t} ice={0} />
          <Squid position={[0, 1.0, STAND(1)[2]]} t={t} />
          <Cow position={[STAND(2)[0], 1.0, STAND(2)[2] - 0.3]} rotationY={SOUTH} scale={0.8} t={t} />
          <pointLight position={[0, 3, STAGE_Z + 7]} color="#c9d0ff" intensity={30} distance={12} decay={2} />
        </>
      ),
    },
    {
      cue: "1.pick",
      ...cam.push({ on: [0, 2.3, STAGE_Z + 0.2], dist: 7.4, to: 7.9, yaw: 6, pitch: 0, fov: 46 }),
      zone: "stage",
      look: "overworld-night",
      note: "The players jump. On 'that one became real' the squid lifts off its stand in a column of light and is gone through the top of the frame. The other two watch it go.",
      stage: (t) => {
        const real = tw(t, w("1.pick", "That") - 0.1, w("1.pick", "real") + 0.2);
        return (
          <>
            <StageSet lit />
            <IceThrower position={[STAND(0)[0], 1.0, STAND(0)[2]]} rotationY={SOUTH} t={t} ice={0} nod={-0.5 * real} />
            <Squid position={[0, 1.0 + real * real * 5, STAND(1)[2]]} t={t} />
            <Cow position={[STAND(2)[0], 1.0, STAND(2)[2] - 0.3]} rotationY={SOUTH} scale={0.8} t={t} nod={-0.6 * real} />
            <Block position={[0, 4, STAGE_Z + 0.2]} size={[0.9, 8, 0.9]} color="#bffff4" emissive="#bffff4" emissiveIntensity={1} opacity={0.22 * real} castShadow={false} />
            <Glow position={[0, 2.5, STAGE_Z + 0.6]} size={5} color="#bffff4" opacity={0.25 * real} />
          </>
        );
      },
    },
    {
      cue: "1.rest",
      ...cam.push({ on: [0, 1.2, GATE_Z_IN], dist: 6.4, to: 5.8, yaw: 172, pitch: 8, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The town gate, from inside. It swings open and the two who did not win walk in side by side: the cow, and the man in the blue hood carrying his ice.",
      stage: (t, { dur }) => {
        const k = t / dur;
        return (
          <>
            <Gate open={tw(t, 0, 0.35)} />
            <Mailboxes />
            <Cow position={[-0.6, 0, 8.4 - k * 2.6]} rotationY={Math.PI} walk={k * 2.6} t={t} sad={0.6} />
            <IceThrower position={[0.7, 0, 8.9 - k * 2.6]} rotationY={Math.PI} walk={k * 2.6} t={t} nod={0.3} />
            <Puffs position={[0, 0.2, 8.6]} count={5} spread={0.8} size={0.2} rise={0.5} speed={1.6} color="#d9c9a0" />
          </>
        );
      },
    },
  ],
});
void S;
