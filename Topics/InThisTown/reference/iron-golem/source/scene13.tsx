import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { EAST, FaceLight, Flake, GATE_EYE, Hero, NORTH, PLACE, Slumped, SnowCap, SnowGolem, Snowfall, Stick, ease, faceOf, lerp, ramp, roadY, timing, wordAt } from "./kit";

const STAND = PLACE.stand;
const ME: Vec3 = [STAND[0] + 0.1, 0, STAND[2] + 1.0];
const LANDED = wordAt("13.nose", "landed");
/** The end of his nose. He faces north. */
const NOSE: Vec3 = [ME[0], faceOf(ME)[1] - 0.07, ME[2] - 0.21];

const Left: React.FC<{ cap?: number }> = ({ cap = 0 }) => (
  <>
    <SnowGolem position={STAND} rotationY={NORTH - 0.25} snow={0} wet={1.0} armR={null} armL={null} fill={3} />
    <SnowCap position={[STAND[0], 0.5, STAND[2]]} amount={cap} />
    <Stick position={[STAND[0] - 0.75, 0.04, STAND[2] + 0.2]} rotation={[0, 0.5, 0]} />
    <Stick position={[STAND[0] + 0.7, 0.04, STAND[2] - 0.45]} rotation={[0, -0.9, 0]} />
  </>
);

/** IT IS NOT OVER. The gate again, and the one thing that could bring him back. */
export const scene13 = storyScene(timing, {
  id: "scene13",
  title: "Something cold",
  shots: [
    {
      cue: "13.gate",
      ...cam.push({ on: [GATE_EYE[0], GATE_EYE[1] - 0.3, GATE_EYE[2]], dist: 15, to: 8.5, yaw: -90, pitch: -7, fov: 40 }),
      zone: "village",
      look: "overworld-night",
      note: "'The gate lit up again. Something bigger was coming': up the steps between the golems that stopped, at the dark gate. It fills with purple, brighter than before. Then, behind the purple, two eyes open that are too far apart to fit through it.",
      stage: () => (
        <>
          {[[33.75, -0.6], [35.25, 4.6], [36.75, 0.2], [38.25, 4.2], [32.25, 4.9], [38.3, -1.2]].map(([x, z], i) => (
            <Slumped key={i} position={[x, roadY(x), z]} rotationY={EAST} slump={1} />
          ))}
        </>
      ),
    },
    {
      cue: "13.nose",
      ...cam.push({ on: faceOf(ME), dist: 1.9, to: 1.45, yaw: 170, pitch: -3, fov: 36 }),
      zone: "village",
      look: "overworld-night",
      note: "'Something cold landed on my nose': his face, looking up at the hill. One white flake comes down through the frame and lands on the end of his nose, and his eyes come down to it.",
      stage: (t) => {
        const k = ramp(t, LANDED - 0.95, LANDED);
        const on = t >= LANDED;
        return (
          <>
            <Hero position={ME} rotationY={NORTH} animation="idle" face={on ? "wow" : "fear"} headYaw={on ? 0 : -0.5 * (1 - ease(ramp(t, LANDED - 0.5, LANDED - 0.1)))} headPitch={on ? 0.06 : -0.12} saccade={false} gaze={0} />
            <FaceLight position={[ME[0] + 0.8, 1.5, ME[2] - 1.4]} power={5} reach={4} />
            <Flake position={on ? NOSE : [NOSE[0] + 0.12 * Math.sin(k * 7), lerp(NOSE[1] + 1.0, NOSE[1], k), NOSE[2] - 0.03]} size={0.034} spin={t * 3} />
            {on ? <Flake position={[NOSE[0] - 0.35, lerp(NOSE[1] + 0.9, NOSE[1] - 0.6, ramp(t, LANDED, LANDED + 1.1)), NOSE[2] - 0.3]} size={0.04} spin={t * 2} /> : null}
          </>
        );
      },
    },
    {
      cue: "13.snow",
      ...cam.push({ on: [STAND[0] + 0.05, 1.15, STAND[2] + 0.5], onTo: [STAND[0] + 0.05, 1.4, STAND[2] + 0.5], dist: 3.3, to: 5.0, yaw: 192, pitch: -9, fov: 42 }),
      zone: "village",
      look: "overworld-night",
      note: "'It was starting to snow': pull back from him, low, with the pumpkin at the bottom of the frame. He turns his face up. The air over the burned town fills with white, and the first of it settles on the pumpkin.",
      stage: (t, { p }) => (
        <>
          <Left cap={0.5 * p} />
          <Hero position={ME} rotationY={NORTH} animation="idle" blendTo="shrug" blend={1 - 0.6 * ease(ramp(t, 0.4, 1.0))} face="wow" headPitch={-0.55 * ease(ramp(t, 0.1, 0.6))} />
          <FaceLight position={[ME[0] + 0.6, 1.7, ME[2] - 1.5]} power={5} reach={4} />
          <Snowfall center={[STAND[0], 3.4, STAND[2]]} area={[10, 8, 10]} count={220} amount={0.25 + 0.75 * p} seed={6} />
        </>
      ),
    },
  ],
});
