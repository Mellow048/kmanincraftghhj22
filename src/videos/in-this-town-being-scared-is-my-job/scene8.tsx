import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Barb, Boat, Boss, Bubble, EDGE, Farm, Gary, Glow, IronGolem, Kevin, Me, NORTH, NewOne, PLACE, SOUTH, SubscribeSign, WEST, pop, timing, tw, w } from "./kit";
import { BRINK, Dropped } from "./scene7";
import { BASE, GROUND } from "./world";

/** 08 — The edge of town. The ground is two hundred blocks away, and far below, a bed lights up. */
const END = PLACE.end;
const WZ = PLACE.water[2];
const Z = EDGE - 0.55;
/** All of them at the south edge, in depth: the three and Kevin in front, the iron man and the new one behind. */
const Edge: React.FC<{ t: number; look?: Vec3; down?: number; wave?: number }> = ({ t, look, down = 0, wave = 0 }) => (
  <>
    <Farm crack={1} open />
    <Boat position={[0, 0, 2.0]} rotationY={Math.PI / 2} />
    <Me position={[0, 0, Z]} rotationY={SOUTH} lookAt={look} nod={down} />
    <Gary position={[-0.85, 0, Z - 0.1]} rotationY={SOUTH} lookAt={look} nod={down} />
    <Barb position={[-1.65, 0, Z - 0.25]} rotationY={SOUTH} lookAt={look} nod={down} />
    <Kevin boat={false} tag={false} position={[0.9, 0, Z - 0.05]} face={0} lookAt={look} nod={down} wave={wave} mood="happy" tilt={Math.sin(t * 3) * 0.06} />
    <IronGolem position={[0.35, 0, Z - 1.5]} rotationY={SOUTH} scale={1.12} headPitch={look || down ? 0.5 : 0.1} flower />
    <NewOne position={[1.75, 0, Z - 0.9]} rotationY={SOUTH} lookAt={look} />
    <Dropped />
  </>
);

export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "Two hundred blocks",
  shots: [
    {
      cue: "8.gave",
      ...cam.push({ on: [END[0] - 1.25, 1.55, WZ + 1.6], dist: 6.8, to: 6.0, yaw: 16, pitch: 7, fov: 46 }),
      zone: "farm",
      look: "overworld-day",
      note: "The iron man stands at the hole with the orange light on him, looking down, for a long time. Barb has come to stand beside him. He turns, bends, and holds out one red flower to her.",
      stage: (t) => {
        const give = w("8.gave", "Then") - 0.1;
        const k = tw(t, give, give + 0.6);
        return (
          <>
            <Farm crack={1} open />
            <IronGolem position={[END[0] - 0.35, 0, WZ + 1.5]} rotationY={NORTH + 1.9 * k} scale={1.12} headPitch={0.6 - 0.3 * k} bow={0.25 * k} flower={k > 0.1} armR={k > 0.1 ? -1.0 * k : undefined} />
            <Barb position={[END[0] - 1.75, 0, WZ + 2.0]} rotationY={NORTH + 0.4 + 1.2 * k} lookAt={k > 0.5 ? [END[0] - 0.9, 1.6, WZ + 2.2] : undefined} nod={k > 0.5 ? 0 : 0.3} />
            <Me position={[BRINK[0] - 2.6, 0, BRINK[2] + 1.6]} rotationY={0.9} />
          </>
        );
      },
    },
    {
      cue: "8.edge",
      ...cam.push({ on: [0.1, 1.5, Z - 0.4], dist: 8.6, to: 7.6, yaw: 0, pitch: -6, fov: 46 }),
      zone: "farm",
      look: "overworld-day",
      note: "From out in the air, a little below them: all of them in a row at the lip of the stone, and one after another they look down past their own feet.",
      stage: (t, { dur }) => <Edge t={t} down={0.6 * tw(t, dur * 0.45, dur * 0.8)} />,
    },
    {
      cue: "8.down",
      ...cam.pan({ from: [0.2, 4.4, Z - 1.2], on: [0.3, -14, 9], onTo: [0.3, -20, 8.5], fov: 50 }),
      zone: "farm",
      look: "overworld-day",
      note: "Over their heads and down: the tops of a hard hat, a nightcap and a grey bun at the bottom of the frame, the edge of the stone, and then nothing: clouds, and under the clouds, very small, fields.",
      stage: (t) => <Edge t={t} down={0.6} />,
    },
    {
      cue: "8.have",
      ...cam.push({ on: [0.3, 1.5, Z - 0.5], dist: 7.2, to: 6.4, yaw: 16, pitch: 5, fov: 46 }),
      zone: "farm",
      look: "overworld-day",
      note: "The row again, from the front, as he counts what they have: the iron man behind them; the boat; and Kevin, who waves when his name comes.",
      stage: (t) => <Edge t={t} wave={t > w("8.have", "Kevin") - 0.15 ? 1 : 0} />,
    },
    {
      cue: "8.bed",
      ...cam.pan({ from: [0.3, 2.0, EDGE + 0.4], on: [BASE[0], GROUND + 0.5, BASE[2]], onTo: [BASE[0], GROUND + 0.5, BASE[2]], fov: 13, fovTo: 9 }),
      zone: "farm",
      look: "overworld-day",
      note: "Straight down, a long way, through a gap in the cloud: a plank floor the size of a stamp, with a bed on it. The bed lights up. A small red shirt is standing on it, looking up.",
      stage: (t) => {
        const lit = w("8.bed", "lit") - 0.1;
        const k = pop(t, lit, 0.2);
        return (
          <>
            <Farm crack={1} open />
            <Glow position={[BASE[0], GROUND + 1, BASE[2]]} size={7 * k} color="#fff0a0" opacity={0.75} />
            <group position={[BASE[0], GROUND + 0.6, BASE[2] + 0.2]} scale={1.6 * k}>
              <Boss position={[0, 0, 0]} rotationY={NORTH} face="angry" headPitch={-1.2} gaze={0} />
            </group>
          </>
        );
      },
    },
    {
      cue: "8.sub",
      ...cam.push({ on: [0.2, 1.8, Z - 0.5], dist: 8.0, to: 6.8, yaw: 0, pitch: 3, fov: 46 }),
      zone: "farm",
      look: "overworld-day",
      note: "The row at the edge. They all look up from the drop at us, at the same moment. Over them, the sign. Kevin waves.",
      stage: (t) => {
        const up = w("8.sub", "subscribe") - 0.2;
        return (
          <>
            <Edge t={t} down={t < up ? 0.6 : 0} wave={t > up ? 1 : 0} />
            <SubscribeSign position={[0.2, 3.75 + Math.sin(t * 8) * 0.06, Z]} scale={0.95 * pop(t, up, 0.2)} tilt={Math.sin(t * 5) * 0.05} />
          </>
        );
      },
    },
  ],
});
void Bubble; void WEST;
