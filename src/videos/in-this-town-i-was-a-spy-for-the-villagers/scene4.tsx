import { Block, cam, getPose, storyScene, Vox } from "../../engine";
import type { Pose } from "../../engine";
import { Hero, Pillager, timing } from "./kit";

const POST = [71, 0, 6] as [number, number, number];
const salutePose = (t: number, amount: number): Pose => {
  const base = getPose("idle", t);
  return { ...base, armR: [-1.35 * amount, 0, 0.08 * amount] };
};

/** A pratfall turns into a salute before the spy can be exposed. */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The salute",
  shots: [
    {
      cue: "4.post",
      ...cam.push({ on: [70.4, 1.1, 6.2], dist: 4.1, to: 3.2, yaw: -12, pitch: -3, fov: 39 }),
      zone: "camp",
      look: "overworld-day",
      note: "A moving medium frame shows the spy bumping a wooden post at the edge of the drill line.",
      stage: (t, { p }) => (
        <>
          <Vox kind="log" position={POST} size={[0.3, 3.1, 0.3]} />
          <Block position={[71, 2.1, 6]} size={[1.1, 0.18, 0.18]} color="#49301f" />
          <Hero position={[69.4 + p * 1.35, 0, 7]} masked face="surprised" animation="walk" animDistance={p * 1.3} headPitch={-0.18 * p} />
          <Pillager position={[67, 0, 5.5]} n={1} walk={t * 0.9} />
        </>
      ),
    },
    {
      cue: "4.turn",
      ...cam.orbit({ on: [71, 1.14, 6.6], dist: 3.0, yaw: -34, yawTo: 22, pitch: 2, fov: 36 }),
      zone: "camp",
      look: "overworld-day",
      note: "The spy spins from the post and snaps into a pillager salute, covering the mistake with a stiff pose.",
      stage: (t, { p }) => (
        <>
          <Vox kind="log" position={POST} size={[0.3, 3.1, 0.3]} />
          <Hero position={[71, 0, 7]} masked face="uneasy" pose={salutePose(t, p)} headYaw={p * 0.45} />
          <Pillager position={[68.5, 0, 5.2]} n={0} walk={t * 0.8} />
        </>
      ),
    },
    {
      cue: "4.answer",
      ...cam.pan({ from: [67, 2.4, 10], on: [70, 1.25, 7], onTo: [72.5, 1.25, 5.4], fov: 40 }),
      zone: "camp",
      look: "overworld-day",
      note: "The camera pans from the spy's awkward salute to pillagers returning it in perfect synchronized motion.",
      stage: (t, { p }) => (
        <>
          <Hero position={[70, 0, 7]} masked face="uneasy" pose={salutePose(t, 0.95)} />
          {[0, 1, 2].map((n) => <Pillager key={n} position={[72 + n * 1.45, 0, 5.2 + n * 0.25]} n={n} armR={-1.4 - p * 0.3} />)}
        </>
      ),
    },
  ],
});
