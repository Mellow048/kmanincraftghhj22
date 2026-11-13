import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { BED, BedBox, Bo, Bread, DAY, DOOR, Daisy, Hero, IN_BED, Lawn, Mira, NIGHT, North, PLACE, SOUTH, Tip, ZONE, ahead, chestOf, ease, faceOf, hop, ramp, room, stride, timing, wordAt } from "./kit";

const U = PLACE.under;
const FLOWER: Vec3 = [U[0] + 0.42, 0, U[2] + 0.25];
const JUMP = wordAt("10.them", "jump");
const WARM = wordAt("10.them", "warm");
const NORTHW = wordAt("10.them", "north");
const A: Vec3 = [1.0, 0, 0.6];
const B: Vec3 = [2.3, 0, 3.4];

/** HE HATES IT. Everyone else's power does something. His is a flower, so he never uses it. */
export const scene10 = storyScene(timing, {
  id: "scene10",
  title: "I had a flower",
  shots: [
    {
      cue: "10.hate",
      ...cam.push({ on: faceOf(U), dist: 1.7, to: 1.45, yaw: 10, pitch: -2, fov: 34 }),
      zone: ZONE.day,
      look: DAY,
      note: "Under a second: his face, close, scowling down at it.",
      stage: () => <Hero position={U} rotationY={SOUTH} animation="idle" face="angry" headPitch={0.3} />,
    },
    {
      cue: "10.them",
      ...cam.truck({ on: [-1.7, 1.35, 2.2], dist: 3.4, yaw: 0, pitch: 3, by: [3.4, 0, 0] }),
      zone: ZONE.day,
      look: DAY,
      note: "Sliding along his three friends, each showing off as he is named: Bo leaps, Mira's loaf glows, and a red arrow snaps down in front of Tip.",
      stage: (t) => (
        <>
          <Bo position={[-1.7, hop(t, JUMP - 0.3, 2.0, 0.9), 2.2]} rotationY={SOUTH} />
          <Mira position={[0, 0, 2.2]} rotationY={SOUTH} nod={0.25} />
          <Bread position={[0, 0.98, 2.75]} warm={ease(ramp(t, WARM - 0.2, WARM + 0.3))} />
          <Tip position={[1.7, 0, 2.2]} rotationY={SOUTH} hmm={t > NORTHW ? 1 : 0} />
          {t >= NORTHW - 0.1 ? <North position={[1.7, 0.04, 3.2]} scale={0.8} /> : null}
        </>
      ),
    },
    {
      cue: "10.me",
      ...cam.push({ on: [FLOWER[0], 0.16, FLOWER[2]], dist: 1.25, to: 1.05, yaw: -20, pitch: 16, fov: 36 }),
      zone: ZONE.day,
      look: DAY,
      note: "Under a second: the daisy, alone on the path. It does nothing.",
      stage: () => <Daisy position={FLOWER} />,
    },
    {
      cue: "10.envy",
      ...cam.truck({ on: chestOf(A), dist: 2.7, yaw: 26, pitch: 3, by: [B[0] - A[0], 0, B[2] - A[2]] }),
      zone: ZONE.day,
      look: DAY,
      note: "Evening after evening: behind him, at the bell, his friends jump and glow and point. He walks away from them towards us with his head down.",
      stage: (t, { p }) => (
        <>
          <Hero {...stride(A, B, p)} animation="walk" face="sad" headPitch={0.25} />
          <Bo position={[-1.2, hop(t % 1.2, 0.1, 2.0, 0.9), -0.6]} rotationY={SOUTH} />
          <Mira position={[0, 0, -0.9]} rotationY={SOUTH} />
          <Bread position={[0, 0.98, -0.35]} warm={1} />
          <Tip position={[1.1, 0, -0.9]} rotationY={Math.PI} />
        </>
      ),
    },
    {
      cue: "10.never",
      ...cam.push({ on: faceOf(DOOR), dist: 2.5, to: 2.0, yaw: 12, pitch: 0, fov: 38 }),
      zone: ZONE.day,
      look: DAY,
      note: "At his own front door. He shrugs it off, to nobody: not once.",
      stage: () => <Hero position={DOOR} rotationY={SOUTH} animation="shrug" face="frown" />,
    },
    {
      cue: "10.grass",
      ...cam.top({ on: room(-0.9, 0.3, -1.1), height: 3.7, to: 3.1, spin: [-6, 6], fov: 46 }),
      zone: ZONE.room,
      look: NIGHT,
      note: "Straight down on him asleep. He does not see it, but we do: all round his bed, grass is coming up through the floorboards, and two daisies with it.",
      stage: (t, { p }) => {
        const k = ease(ramp(p, 0.1, 0.9));
        return (
          <>
            <BedBox position={BED} />
            <Hero position={IN_BED} animation="sleep" face="calm" />
            <Lawn position={[BED[0] + 0.95, 0, BED[2] + 0.3]} size={0.9} grow={k} seed={1} glow />
            <Lawn position={[BED[0] + 0.85, 0, BED[2] - 0.7]} size={0.7} grow={k} seed={2} />
            <Lawn position={[BED[0] + 0.1, 0, BED[2] + 1.55]} size={0.9} grow={k} seed={3} glow />
            <Lawn position={[BED[0] - 0.75, 0, BED[2] + 0.9]} size={0.5} grow={k} seed={4} />
            <Daisy position={[BED[0] + 1.0, 0.04, BED[2] + 0.35]} grow={k} />
            <Daisy position={[BED[0] + 0.2, 0.04, BED[2] + 1.6]} grow={ease(ramp(p, 0.4, 1))} />
          </>
        );
      },
    },
  ],
});
