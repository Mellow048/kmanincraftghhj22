import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Brother, Burst, CHAOS, Daisy, FireLight, Hero, Lawn, MUD, Orbs, SubscribeSign, ZONE, ahead, ease, faceOf, ramp, timing, wordAt } from "./kit";
import { Block } from "../../engine";

const HIM: Vec3 = [-7.0, 0, 7.1];
/** The way the teller faces: at his brother. */
const AT = Math.atan2(HIM[0] - MUD[0], HIM[2] - MUD[2]);
const BACK = Math.atan2(MUD[0] - HIM[0], MUD[2] - HIM[2]);
const LIFE = wordAt("18.life", "life");
const BREAK = wordAt("18.break", "break");
const RING: Array<[number, number]> = [[0.9, 0.4], [-0.8, 0.7], [0.3, -1.0], [-1.1, -0.5], [1.3, -0.6], [0.1, 1.2], [-0.4, -1.5], [1.6, 0.6]];

/** Everything he has grown so far; k from 0 to 1 spreads it. */
const Garden = ({ k }: { k: number }) => (
  <>
    <Lawn position={[MUD[0], 0.06, MUD[2]]} size={1.1 + 2.6 * k} seed={3} glow />
    {RING.map(([x, z], i) => (
      <Daisy key={i} position={[MUD[0] + x, 0.07, MUD[2] + z]} grow={ease(ramp(k, 0.15 + i * 0.09, 0.4 + i * 0.09))} />
    ))}
  </>
);

/** HE UNDERSTANDS. And part one stops there. */
export const scene18 = storyScene(timing, {
  id: "scene18",
  title: "My power was life",
  shots: [
    {
      cue: "18.life",
      ...cam.push({ on: [MUD[0], 0.4, MUD[2]], dist: 4.8, to: 4.0, yaw: 30, pitch: 36, fov: 42 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "From above. He is on one knee with his palm flat on the mud. On 'life' green runs out from his hand in every direction, the whole pen turns to grass, and daisies come up through it one after another.",
      stage: (t) => {
        const k = ease(ramp(t, LIFE - 0.5, LIFE + 0.8));
        return (
          <>
            <Hero position={MUD} rotationY={AT} animation="crouch" arms="press" time={0.3} face="wow" headPitch={0.4} />
            <Garden k={k} />
            <pointLight position={[MUD[0], 1.2, MUD[2]]} color="#9dff8a" intensity={5 * k} distance={7} decay={2} />
          </>
        );
      },
    },
    {
      cue: "18.break",
      from: [MUD[0] + 0.9, 0.55, MUD[2] - 0.9],
      to: [MUD[0] + 1.0, 0.7, MUD[2] - 1.2],
      target: [HIM[0], 1.45, HIM[2]],
      fov: 42,
      ease: "inOutSine",
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Looking up at the brother from the grass: fire in his hand, a hundred stolen lights turning round him, and on 'break' the town going up again behind him. All of it only burns.",
      stage: (t) => (
        <>
          <Brother position={HIM} rotationY={BACK} animation="idle" face="smug" flame={t} />
          <Orbs position={HIM} t={t} count={18} />
          <Burst position={[-3, 2, 1]} t={t - BREAK} size={4.4} seed={4} />
          <Lawn position={[MUD[0] + 1.3, 0.06, MUD[2] - 1.5]} size={1.6} seed={6} />
          <FireLight position={[HIM[0] + 1.5, 2, HIM[2] + 1.5]} power={10} reach={8} seed={3} />
        </>
      ),
    },
    {
      cue: "18.know",
      ...cam.push({ on: faceOf(MUD), dist: 3.0, to: 2.0, yaw: (AT * 180) / Math.PI - 8, pitch: -4, fov: 36 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "He stands up out of the daisies, and we push in on his face as he says it. It is the first time in the film he is not afraid of his brother.",
      stage: (t, { p }) => (
        <>
          <Hero position={MUD} rotationY={AT} animation="crouch" blendTo="idle" blend={ease(ramp(p, 0, 0.4))} face="brave" gaze={0} />
          <Garden k={1} />
          <pointLight position={[MUD[0], 1.2, MUD[2]]} color="#9dff8a" intensity={4} distance={7} decay={2} />
          <FireLight position={ahead(MUD, AT, 2.2, 1.8)} power={14} reach={7} seed={4} />
        </>
      ),
    },
    {
      cue: "18.sub",
      ...cam.push({ on: [MUD[0], 1.2, MUD[2]], dist: 4.0, to: 3.6, yaw: (AT * 180) / Math.PI + 3, pitch: 2, fov: 38 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "The same face, and a SUBSCRIBE sign standing in the daisies in front of him. He is not smiling. To be continued.",
      stage: (t) => (
        <>
          <Hero position={MUD} rotationY={AT} animation="idle" face="brave" gaze={0} />
          <SubscribeSign position={ahead(MUD, AT, 0.9, 0.95)} rotationY={AT} scale={0.42} tilt={Math.sin(t * 17) * 0.02} />
          <Block position={ahead(MUD, AT, 0.88, 0.45)} size={[0.05, 0.9, 0.05]} color="#5c3f24" />
          <FireLight position={ahead(MUD, AT, 2.4, 1.9)} power={12} reach={7} seed={9} />
          <Garden k={1} />
                    <pointLight position={[MUD[0], 1.2, MUD[2]]} color="#9dff8a" intensity={4} distance={7} decay={2} />
        </>
      ),
    },
  ],
});
