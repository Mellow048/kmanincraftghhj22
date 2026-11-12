import { cam, storyScene } from "../../engine";
import { Hero, JarNeighbor, NORTH, RopeLine, ramp, timing } from "./kit";
/** Beat 16: Something breathing. The recorded words, not hand-set seconds, own every cut. */
export const scene16 = storyScene(timing, {
  id: "scene16",
  title: "Something breathing",
  shots: [
    {
      cue: "16.dark",
      ...cam.push({ on: [4,0.95,-19.7], dist: 3.2, to: 2.7, yaw: 135, pitch: 8, fov: 40 }),
      zone: "shelf",
      look: "overworld-night",
      note: "Shelter behind the bare back of the town scenery. He waits while the same scrape finishes above him; the outside is still fragments, not a wide reveal.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[4,0,-19.7]} rotationY={NORTH} animation="crouch" face="uneasy" time={0.8} pack /><JarNeighbor />
      </>),
    },
    {
      cue: "16.bread",
      ...cam.push({ on: [4,0.98,-19.7], dist: 2.35, to: 1.95, yaw: 135, pitch: 4, fov: 36 }),
      zone: "shelf",
      look: "overworld-night",
      note: "A close breath and a small puzzled frown. The home smell is missing, but the bun in his bag still belongs to the town.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[4,0,-19.7]} rotationY={NORTH} animation="crouch" face="frown" headPitch={0.1} time={t + 0.8} pack /><JarNeighbor />
      </>),
    },
    {
      cue: "16.breath",
      ...cam.push({ on: [4,1.0,-19.7], dist: 2.2, to: 1.85, yaw: 135, pitch: -10, fov: 36 }),
      zone: "shelf",
      look: "overworld-night",
      note: "He hears an enormous breath before he sees its owner. Let his eyes lift, but keep the breathing child entirely behind our lens.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[4,0,-19.7]} rotationY={NORTH} animation="crouch" face="fear" headPitch={-0.22} time={0.8} pack /><JarNeighbor />
      </>),
    },
    {
      cue: "16.look",
      ...cam.push({ on: [4,3.4,-20.8], dist: 4.3, to: 3.7, yaw: 168, pitch: 12, fov: 42 }),
      zone: "shelf",
      look: "overworld-night",
      note: "The ordinary screw is climbable. His own rope takes his weight; he never yanks the bell rope. Reach the top just before the revealing cut.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[4,2.49 * ramp(p,0,0.75),-20.05 - 0.75 * ramp(p,0.55,0.8)]} rotationY={NORTH} animation="reachUp" face="brave" time={0.8} pack /><RopeLine from={[3.8,2.5,-20.8]} to={[3.75,0.8 + 1.7 * ramp(p,0,0.75),-20.05 - 0.75 * ramp(p,0.55,0.8)]} radius={0.025} /><JarNeighbor />
      </>),
    },
  ],
});
