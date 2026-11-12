import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { FRIEND_WINDOW, Fill, Hero, KID, NORTH, SOUTH, Townie, timing, wordAt } from "./kit";

const F = FRIEND_WINDOW;
const HER: Vec3 = [F[0], 0.47, F[2] + 0.32];
const ME: Vec3 = [F[0] + 0.2, 0, F[2] + 2.2];
const K1 = wordAt("9.knock", "knocked");
const K2 = wordAt("9.knock", "twice");
const SHOOK = wordAt("9.shook", "shook");
const NO = wordAt("9.shook", "No");

const Lamp = () => <pointLight position={[F[0], 1.9, F[2] + 0.45]} color="#ffc27a" intensity={3.2} distance={3} decay={2} />;

/** THE WARNING. Somebody else is awake, and she says hello, and she says don't. He goes anyway. */
export const scene9 = storyScene(timing, {
  id: "scene9",
  title: "She shook her pumpkin",
  shots: [
    {
      cue: "9.friend",
      ...cam.push({ on: [F[0], 1.25, F[2] + 0.4], dist: 3.9, to: 3.2, yaw: -9, pitch: 3, fov: 40 }),
      zone: "village",
      look: "overworld-night",
      note: "From behind him in the dark street: one window with a candle in it, and his best friend standing in it in her yellow shirt, pumpkin turned straight at him.",
      stage: () => (
        <>
          <Lamp />
          <Townie who={5} scale={KID} position={HER} rotationY={SOUTH} animation="idle" carve="flat" />
          <Hero position={ME} rotationY={NORTH} animation="idle" headPitch={-0.1} carve="wow" />
          <Fill at={[F[0] - 1, 2, F[2] + 5]} power={8} />
        </>
      ),
    },
    {
      cue: "9.knock",
      ...cam.push({ on: [F[0], 1.55, F[2] + 0.5], dist: 1.9, to: 1.5, yaw: 12, pitch: 0, fov: 36 }),
      zone: "village",
      look: "overworld-night",
      note: "Close on her through the window bars. She raps on the glass, twice: the town's hello, from scene three.",
      stage: (t) => (
        <>
          <Lamp />
          <Townie who={5} scale={KID} position={HER} rotationY={SOUTH} animation="idle" arms="press" time={t < K2 ? t - K1 : t - K2} carve="flat" />
          <Fill at={[F[0] + 0.5, 1.6, F[2] + 2.5]} power={5} />
        </>
      ),
    },
    {
      cue: "9.shook",
      ...cam.push({ on: [F[0], 1.6, F[2] + 0.45], dist: 1.6, to: 1.25, yaw: -14, pitch: -2, fov: 34 }),
      zone: "village",
      look: "overworld-night",
      note: "Closer, from the other side. Her pumpkin turns slowly left, right, left. On 'No' it stops, and the carving is afraid.",
      stage: (t) => (
        <>
          <Lamp />
          <Townie who={5} scale={KID} position={HER} rotationY={SOUTH} animation="idle" headYaw={t > SHOOK && t < NO ? Math.sin((t - SHOOK) * 9) * 0.55 : 0} carve={t < NO ? "frown" : "fear"} />
          <Fill at={[F[0] - 0.5, 1.6, F[2] + 2.5]} power={5} />
        </>
      ),
    },
  ],
});
