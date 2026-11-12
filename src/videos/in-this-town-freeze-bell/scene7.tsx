import { Block, cam, storyScene } from "../../engine";
import { ClosingDoor, Elder, Hero, NORTH, PLACE, ramp, timing } from "./kit";
/** Beat 7: Only the rule. The recorded words, not hand-set seconds, own every cut. */
export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "Only the rule",
  shots: [
    {
      cue: "7.ask",
      ...cam.push({ on: [-20, 1.5, -3.4], dist: 4.6, to: 4.0, yaw: 20, pitch: 7, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "The one person who might know stands on the raised porch, above the small asker. Keep both bodies in the vertical frame by depth and height.",
      stage: (t, { p, dur }) => (<>
        <Hero position={PLACE.porchFoot} rotationY={NORTH} animation="talk" face="frown" time={t + 0.8} /><Elder position={PLACE.porch} animation="idle" face="uneasy" time={t + 0.8} />
      </>),
    },
    {
      cue: "7.empty",
      ...cam.push({ on: [-12, 0.65, -4.25], dist: 3.9, to: 3.2, yaw: -5, pitch: 18, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "Her glance takes us to the neighbor doorstep and untouched blue mat. This is evidence, not a new place to establish.",
      stage: (t, { p, dur }) => (<>

      </>),
    },
    {
      cue: "7.rule",
      ...cam.push({ on: [-20, 1.75, -4.1], dist: 3.6, to: 2.85, yaw: 8, pitch: 8, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "Hold on the elder instead of cutting away from her delay. She bends to brush the mat; then she looks at the boy and gives only the rule.",
      stage: (t, { p, dur }) => (<>
        <Elder position={[-20 + 0.08 * Math.sin(t * 3) * (1 - ramp(p,0.25,0.5)), 0.5, -4.1]} animation="crouch" blendTo="talk" blend={1 - ramp(p,0.25,0.55)} face="uneasy" headPitch={0.25 * (1 - ramp(p,0.3,0.6))} time={t + 0.8} />{[0,1,2,3,4].map((i) => <Block key={i} position={[-19.8 + i * 0.11 + ramp(p,0.1,0.4) * 0.3, 0.55 + Math.sin(Math.PI * ramp(p,0.1,0.5)) * 0.1, -3.3 + i * 0.04]} size={[0.025,0.018,0.025]} color="#b39a7a" />)}<Hero position={[-20.7, 0, -2.4]} rotationY={NORTH} animation="idle" face="uneasy" time={0.8} />
      </>),
    },
    {
      cue: "7.door",
      ...cam.push({ on: [-20, 1.3, -3.9], dist: 3.7, to: 3.2, yaw: 15, pitch: 5, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "The hinged engine door shuts between the adult and the child. End on the closed door, not on an extra line explaining the warning.",
      stage: (t, { p, dur }) => (<>
        <Elder position={[-20, 0.5, -4.35 - p * 0.8]} animation="idle" face="uneasy" time={0.8} /><ClosingDoor p={p} /><Hero position={[-20.7, 0, -2.3]} rotationY={NORTH} animation="idle" face="frown" time={0.8} />
      </>),
    },
  ],
});
