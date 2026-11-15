import { Block, cam, storyScene, stride, Vox } from "../../engine";
import { Hero, Pillager, timing } from "./kit";

/** The spy breaks cover, ducks through the drill course and runs for home. */
export const scene10 = storyScene(timing, {
  id: "scene10",
  title: "The escape",
  shots: [
    {
      cue: "10.slip",
      ...cam.push({ on: [70, 1.2, 6.3], dist: 5.0, to: 3.8, yaw: -8, pitch: 2, fov: 39 }),
      zone: "camp",
      look: "overworld-day",
      note: "The marching row hides the spy for one beat, then the masked figure slips out against their movement.",
      stage: (t, { p }) => (
        <>
          {[0, 1, 2].map((n) => <Pillager key={n} position={[67 + n * 2.1, 0, 4.4 + Math.sin(n) * 0.4]} n={n} walk={t * 1.7} />)}
          <Hero {...stride([70, 0, 6.4], [67.3, 0, 7.2], p)} masked face="fear" animation="run" />
        </>
      ),
    },
    {
      cue: "10.log",
      ...cam.orbit({ on: [69, 1.1, 9], dist: 4.2, yaw: 76, yawTo: 5, pitch: -8, fov: 38 }),
      zone: "camp",
      look: "overworld-day",
      note: "The spy slides under a swinging practice log while crossbow bolts punch into targets behind them.",
      stage: (t, { p }) => (
        <>
          <Vox kind="log" position={[70.4, 3.45, 10]} size={[8.0, 0.28, 0.28]} />
          <Block position={[66.6, 1.75, 10]} size={[0.16, 3.5, 0.16]} color="#49301f" />
          <Block position={[74.2, 1.75, 10]} size={[0.16, 3.5, 0.16]} color="#49301f" />
          <Block position={[68.2, 2.55, 10]} size={[0.07, 1.3, 0.07]} color="#49301f" />
          <Block position={[72.6, 2.55, 10]} size={[0.07, 1.3, 0.07]} color="#49301f" />
          <group position={[70.4, 1.85, 10 + Math.sin(t * 4.5) * 1.25]}>
            <Vox kind="log" position={[0, 0, 0]} size={[7.6, 0.28, 0.28]} />
          </group>
          <Hero position={[68 + p * 1.0, 0, 9.1]} masked face="fear" animation="creep" blendTo="crouch" blend={p} animDistance={p * 1.4} />
          <Pillager position={[73.5, 0, 10.8]} n={1} crossbow armR={-1.35} />
          <Vox kind="planks" position={[74, 0, 13]} size={[1.5, 1.2, 0.16]} />
          <Block position={[74, 1.2, 13.1]} size={[0.35, 0.35, 0.05]} color="#a5332b" />
          <Block position={[73.5 + p * 0.5, 1.2, 11.4 + p * 1.3]} size={[0.06, 0.06, 0.45]} color="#b7bcc1" />
        </>
      ),
    },
    {
      cue: "10.home",
      ...cam.truck({ on: [40, 1.25, 2], dist: 5.2, yaw: 78, pitch: 3, by: [-5.8, 0, 0], fov: 40 }),
      zone: "trail",
      look: "overworld-day",
      note: "A travelling side view races with the spy down the wooded road, village roofs appearing ahead.",
      stage: (t, { p }) => <Hero {...stride([40, 0, 2], [34.2, 0, 2], p)} masked face="brave" animation="run" />, 
    },
  ],
});
