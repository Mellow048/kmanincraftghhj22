import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Baker, Bo, DAY, Daisy, Folk, Hero, Mira, Mom, PLACE, SOUTH, SoundRings, Tip, ZONE, chestOf, ease, faceOf, ramp, timing, wordAt } from "./kit";

const U = PLACE.under;
const FLOWER: Vec3 = [U[0] + 0.42, 0, U[2] + 0.25];
const RANG = wordAt("9.bell", "rang");
const DAISY = wordAt("9.daisy", "daisy");

/** HIS TURN. The bell rings, and he gets one daisy. */
export const scene9 = storyScene(timing, {
  id: "scene9",
  title: "One small daisy",
  shots: [
    {
      cue: "9.bell",
      ...cam.push({ on: chestOf(U), dist: 7.2, to: 6.2, yaw: 3, pitch: 17, fov: 42 }),
      zone: ZONE.day,
      look: DAY,
      note: "Over the backs of the whole town: him, alone under the bell, facing everyone. On 'rang' the rings go out.",
      stage: (t) => (
        <>
          <Hero position={U} rotationY={SOUTH} animation="idle" face="uneasy" />
          <SoundRings position={[0, 2.7, -2.2]} t={t - RANG} color="#ffe08a" reach={2.8} />
          <Mom position={[-1.0, 0, 2.3]} rotationY={Math.PI} />
          <Bo position={[0.8, 0, 2.6]} rotationY={Math.PI} />
          <Mira position={[1.7, 0, 2.2]} rotationY={Math.PI} />
          <Tip position={[-2.1, 0, 2.6]} rotationY={Math.PI} />
          <Baker position={[2.5, 0, 2.7]} rotationY={Math.PI} />
          <Folk n={0} position={[-3.2, 0, 2.2]} rotationY={Math.PI} />
        </>
      ),
    },
    {
      cue: "9.nothing",
      ...cam.push({ on: faceOf(U), dist: 2.0, to: 1.6, yaw: -8, pitch: 0, fov: 36 }),
      zone: ZONE.day,
      look: DAY,
      note: "His face, close. His eyes go left, then right. He looks at his hands. Nothing.",
      stage: (t, { p }) => <Hero position={U} rotationY={SOUTH} animation="idle" face="uneasy" gaze={p < 0.5 ? -1 : 1} headPitch={0.25 * ease(ramp(p, 0.6, 1))} />,
    },
    {
      cue: "9.daisy",
      ...cam.push({ on: [FLOWER[0], 0.16, FLOWER[2]], dist: 1.7, to: 1.2, yaw: 24, pitch: 14, fov: 38 }),
      zone: ZONE.day,
      look: DAY,
      note: "Down at his shoes. On 'daisy' one small white flower pushes up out of the path beside his foot and opens.",
      stage: (t) => (
        <>
          <Hero position={U} rotationY={SOUTH} animation="idle" />
          <Daisy position={FLOWER} grow={ease(ramp(t, DAISY - 0.5, DAISY + 0.2))} />
        </>
      ),
    },
    {
      cue: "9.that",
      ...cam.push({ on: [U[0] + 0.15, 0.85, U[2]], dist: 3.3, to: 2.7, yaw: 16, pitch: 14, fov: 40 }),
      zone: ZONE.day,
      look: DAY,
      note: "All of him, looking down at the daisy by his foot with no expression at all. That is it.",
      stage: () => (
        <>
          <Hero position={U} rotationY={SOUTH} animation="idle" face="blank" headPitch={0.55} headYaw={-0.3} />
          <Daisy position={FLOWER} />
        </>
      ),
    },
    {
      cue: "9.town",
      ...cam.truck({ on: [-0.4, 1.45, 2.5], dist: 3.4, yaw: 196, pitch: 2, by: [1.2, 0, 0] }),
      zone: ZONE.day,
      look: DAY,
      note: "The town, from where he stands: a row of villagers rocking with laughter, noses wagging.",
      stage: (t) => (
        <>
          {[-2.1, -0.9, 0.3, 1.4, 2.5].map((x, i) => (
            <Folk key={i} n={i + 1} position={[x, Math.abs(Math.sin(t * 9 + i)) * 0.06, 2.4 + (i % 2) * 0.3]} rotationY={Math.PI} hmm={1} tilt={Math.sin(t * 8 + i * 1.3) * 0.18} />
          ))}
        </>
      ),
    },
  ],
});
