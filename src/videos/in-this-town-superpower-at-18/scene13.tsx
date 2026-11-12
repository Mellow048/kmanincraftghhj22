import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Brother, CHAOS, FireLight, Folk, Hero, MOM_FAR, Mom, NORTH, PLACE, Pig, SOUTH, Sock, WEST, Wisps, ZONE, ease, faceOf, ramp, timing, villagerFace, waddle, wordAt } from "./kit";
import { NEAR, STOOD } from "./scene12";

const PEN = PLACE.pen;
const SMILED = wordAt("13.father", "smiled");
const SOCKP: Vec3 = [MOM_FAR[0] - 0.5, 0.92, MOM_FAR[2]];

/** THE OFFER. A kingdom. And behind him, what the offer has already cost. */
export const scene13 = storyScene(timing, {
  id: "scene13",
  title: "I want my brother beside me",
  shots: [
    {
      cue: "13.king",
      ...cam.push({ on: faceOf(NEAR), dist: 3.6, to: 3.0, yaw: 42, pitch: 0, fov: 40 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Past the teller's red shoulder: his brother talking, easy, as if they had met at a market. The house burns behind him.",
      stage: (t) => (
        <>
          <Brother position={NEAR} rotationY={SOUTH} animation="talk" face="smile" flame={t} />
          <Hero position={STOOD} rotationY={NORTH} animation="idle" />
        </>
      ),
    },
    {
      cue: "13.want",
      ...cam.push({ on: faceOf(NEAR), dist: 1.6, to: 1.25, yaw: -12, pitch: -4, fov: 34 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Closer. He leans in on 'my brother', and the smile gets wider.",
      stage: (t, { p }) => (
        <>
          <Brother position={NEAR} rotationY={SOUTH} animation="talk" face={p < 0.55 ? "smug" : "grin"} headPitch={0.12} gaze={0} flame={t} />
          <FireLight position={[NEAR[0] + 1.1, 1.5, NEAR[2] + 1.5]} power={8} reach={6} seed={2} />
        </>
      ),
    },
    {
      cue: "13.pigs",
      ...cam.push({ on: [PEN[0] + 0.4, 0.5, PEN[2]], dist: 3.2, to: 2.6, yaw: 18, pitch: 14, fov: 40 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "The pig pen, in the firelight: three pigs pressed together in the far corner, shaking. They remember that voice.",
      stage: (t) => (
        <>
          <Pig position={[PEN[0] + 0.2, 0, PEN[2] - 0.6]} rotationY={0.3} t={t} shake={1} />
          <Pig position={[PEN[0] + 0.95, 0, PEN[2] - 0.9]} rotationY={-0.2} t={t + 1} shake={1} />
          <Pig position={[PEN[0] + 0.6, 0, PEN[2] + 0.2]} rotationY={0.1} t={t + 2} shake={1} scale={0.8} />
          <FireLight position={[PEN[0] + 2, 1.5, PEN[2] + 2]} power={10} reach={8} seed={3} />
        </>
      ),
    },
    {
      cue: "13.father",
      ...cam.pan({ from: [10.3, 1.6, 2.5], on: faceOf(STOOD), onTo: faceOf(NEAR), fov: 32 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "From his worried face, asking, across to his brother's: who says nothing, and on 'smiled' smiles.",
      stage: (t) => (
        <>
          <Hero position={STOOD} rotationY={NORTH} animation="talk" face="worried" />
          <Brother position={NEAR} rotationY={SOUTH} animation="idle" face={t < SMILED ? "neutral" : "grin"} flame={t} />
        </>
      ),
    },
    {
      cue: "13.behind",
      ...cam.push({ on: faceOf(STOOD), dist: 2.0, to: 1.7, yaw: 48, pitch: 0, fov: 36 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "He turns round, away from his brother, towards us and the town.",
      stage: (t, { p }) => {
        const k = ease(ramp(p, 0.1, 0.8));
        return (
          <>
            <Hero position={STOOD} rotationY={NORTH - (NORTH - 0.85) * k} animation="idle" face={k < 0.8 ? "worried" : "fear"} />
            <FireLight position={[STOOD[0] + 1.6, 1.6, STOOD[2] + 1.6]} power={9} reach={6} seed={4} />
          </>
        );
      },
    },
    {
      cue: "13.roofs",
      from: [8.4, 1.9, 0.2],
      to: [9.0, 2.1, 1.2],
      target: [14.2, 2.7, 10],
      fov: 46,
      ease: "inOutSine",
      zone: ZONE.ruin,
      look: CHAOS,
      note: "What he sees: the houses across the street with every roof alight and smoke pouring up, and along the road below them the whole town running one way.",
      stage: (t, { p }) => (
        <>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Folk key={i} n={i} {...waddle([4 + i * 1.7, 0, 3 + (i % 3) * 0.9], [9 + i * 1.7, 0, 3.3 + (i % 3) * 0.9], p)} lean={0.25} />
          ))}
        </>
      ),
    },
    {
      cue: "13.mother",
      ...cam.push({ on: villagerFace(MOM_FAR), dist: 8.5, to: 4.2, yaw: -84, pitch: 1, fov: 30 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "A long way down the road, through the people running past and the smoke: one white robe that is not running. His mother, standing still, looking straight back at him. We go all the way in to her.",
      stage: (t, { p }) => (
        <>
          <Mom position={MOM_FAR} rotationY={WEST} />
          <Sock position={SOCKP} rotation={[0, -1.2, 0.2]} />
          <Folk n={1} {...waddle([19, 0, 3.4], [24.5, 0, 3.8], p)} lean={0.25} />
          <Folk n={3} {...waddle([21, 0, 0.9], [27, 0, 0.7], p)} lean={0.25} />
          <Wisps position={[21, 1.5, 2.2]} t={t} count={10} reach={5} size={0.9} opacity={0.4} color="#4a403a" dir={[0, 0.1, 1]} seed={5} />
          <FireLight position={[MOM_FAR[0] - 2, 2, MOM_FAR[2] + 2]} power={12} reach={8} seed={6} />
        </>
      ),
    },
    {
      cue: "13.sock",
      ...cam.push({ on: SOCKP, dist: 1.5, to: 1.15, yaw: -70, pitch: 6, fov: 36 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "What is in front of her folded arms: one sock. She found it. It is all she could do.",
      stage: () => (
        <>
          <Mom position={MOM_FAR} rotationY={WEST} nod={0.15} />
          <Sock position={SOCKP} rotation={[0, -1.2, 0.2]} />
          <FireLight position={[MOM_FAR[0] - 1.6, 1.4, MOM_FAR[2] + 1.2]} power={8} reach={6} seed={7} />
        </>
      ),
    },
  ],
});
