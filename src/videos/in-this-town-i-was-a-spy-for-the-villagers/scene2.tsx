import { Block, cam, storyScene, Vox } from "../../engine";
import { Hero, Pillager, PillagerMask, timing } from "./kit";

/** Opening event: sneak into the hall, grab a coat and mask, then put them on. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "The disguise",
  shots: [
    {
      cue: "2.start",
      ...cam.push({ on: [104, 1.45, 30], dist: 8.3, to: 6.5, yaw: 6, pitch: 4, fov: 42 }),
      zone: "camp",
      look: "overworld-night",
      note: "The open mansion hall frames the spy creeping through the doorway, small under the heavy room.",
      stage: (t) => (
        <>
          <Hero position={[104 + t * 0.35, 0, 31 - t * 0.9]} masked={false} face="uneasy" animation="creep" />
          <Pillager position={[110, 0, 33]} n={1} lookAt={[104, 1.2, 29]} />
        </>
      ),
    },
    {
      cue: "2.clothes",
      ...cam.top({ on: [105, 1.2, 27.4], height: 9.4, to: 6.2, spin: [2, -9], fov: 46 }),
      zone: "camp",
      look: "overworld-night",
      note: "From above, the spy reaches for the dark coat and square mask hanging on a rack.",
      stage: (t) => (
        <>
          <Hero position={[104.3, 0, 27.4]} masked={false} face="worried" animation="reach" />
          <Vox kind="log" position={[106.4, 1.5, 27.0]} size={[0.18, 3, 0.18]} />
          <Vox kind="log" position={[106.4, 2.7, 27.0]} size={[0.16, 0.16, 1.8]} />
          <Block position={[106.4, 2.05, 27.0]} size={[1.15, 1.3, 0.18]} color="#42343a" />
          <group position={[105.95, 2.5 + Math.sin(t * 7) * 0.05, 27.4]} scale={0.85}><PillagerMask /></group>
        </>
      ),
    },
    {
      cue: "2.pillager",
      ...cam.orbit({ on: [104.5, 1.28, 27.4], dist: 3.2, yaw: -24, yawTo: 22, pitch: 3, fov: 37 }),
      zone: "camp",
      look: "overworld-night",
      note: "The orbit finishes as the grey mask locks over the spy's face and the stolen coat matches a real pillager.",
      stage: (t) => (
        <>
          <Hero position={[104.5, 0, 27.4]} masked face="brave" animation="reach" headYaw={Math.sin(t * 5) * 0.08} />
          <Pillager position={[107.5, 0, 28.7]} n={2} walk={t * 0.15} />
        </>
      ),
    },
  ],
});
