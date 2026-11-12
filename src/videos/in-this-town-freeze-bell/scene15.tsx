import { Block, Torch, cam, storyScene, stride } from "../../engine";
import { Hero, JarNeighbor, NORTH, ramp, room, timing, tunnel, wordAt } from "./kit";
/** Beat 15: Through the gap. The recorded words, not hand-set seconds, own every cut. */
export const scene15 = storyScene(timing, {
  id: "scene15",
  title: "Through the gap",
  shots: [
    {
      cue: "15.ring",
      ...cam.push({ on: [4,1.0,-15.4], dist: 3.3, to: 2.8, yaw: 30, pitch: 10, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "The first bell shakes the loose boards beside him. His body still obeys it before he chooses to disobey.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[4,0,-15.2]} rotationY={NORTH} animation="crouch" face="fear" headYaw={-0.9} time={0.8} pack />
      </>),
    },
    {
      cue: "15.freeze",
      ...cam.push({ on: [4,0.5,-15.2], dist: 3.4, to: 3.0, yaw: 150, pitch: 58, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "His feet stop. Show the deliberate held crouch from overhead while the lens drifts, rather than freezing the video frame.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[4,0,-15.2]} rotationY={NORTH} animation="crouch" face="fear" time={0.8} breath={0} weightShift={0} blink={false} pack />
      </>),
    },
    {
      cue: "15.move",
      ...cam.push({ on: [4,0.75,-16.3], dist: 4.0, to: 3.5, yaw: 38, pitch: 12, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "He forces himself through the actual open boards. The bag follows the body; the black gap occludes him naturally before the cut inside.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[4,0,-15.2 - ramp(t,wordAt("15.move","made"),dur - 0.07) * 2.7]} rotationY={NORTH} animation="crouch" face="brave" headYaw={-1.1} time={t + 0.8} pack />
      </>),
    },
    {
      cue: "15.narrow",
      ...cam.push({ on: [0,0.9,129.9], dist: 3.0, to: 2.5, yaw: 180, pitch: 5, fov: 40 }),
      zone: "passage",
      look: "overworld-night",
      note: "From the exit side, look back at his face squeezed between wood braces. The warm torch and cold seam light both have visible sources.",
      stage: (t, { p, dur }) => (<>
        <Hero position={tunnel(0,0,0.45 - p * 0.65)} rotationY={NORTH} animation="crouch" face="uneasy" time={t + 0.8} pack><Torch position={[0,-0.02,0.06]} lean={[0.6,0,0]} light={1.1} /></Hero>
      </>),
    },
    {
      cue: "15.rope",
      ...cam.push({ on: [0.3,1.15,129.9], dist: 3.15, to: 2.85, yaw: 180, pitch: 4, fov: 42 }),
      zone: "passage",
      look: "overworld-night",
      note: "The rope is suddenly at head height beside him. Its upward jerk is the same movement as the first clue, now much too close.",
      stage: (t, { p, dur }) => (<>
        <Hero position={tunnel(0.05,0,-0.05)} rotationY={NORTH} animation="crouch" face="wow" headPitch={-0.2} time={0.8} pack><Torch position={[0,-0.02,0.06]} lean={[0.6,0,0]} light={1.1} /></Hero>
      </>),
    },
    {
      cue: "15.light",
      ...cam.push({ on: [0,1.05,129.6], dist: 2.85, to: 2.4, yaw: 180, pitch: -10, fov: 40 }),
      zone: "passage",
      look: "overworld-night",
      note: "The seam opens overhead. Keep the face below the thin light strip; the width of this little opening changes the scale of the next place.",
      stage: (t, { p, dur }) => (<>
        <Hero position={tunnel(0,0,-0.2)} rotationY={NORTH} animation="crouch" face="wow" headPitch={-0.24} time={0.8} pack>{t < wordAt("15.light","light") ? <Torch position={[0,-0.02,0.06]} lean={[0.6,0,0]} light={1.1} /> : null}</Hero><Block position={tunnel(0,2.11,-0.8)} size={[0.025 + p * 0.23,0.025,7.2]} color="#ecf6ff" emissive="#b4d5ff" emissiveIntensity={2} castShadow={false} />
      </>),
    },
    {
      cue: "15.floor",
      ...cam.push({ on: [4,0.35,-19.5], dist: 2.6, to: 2.25, yaw: 125, pitch: 28, fov: 40 }),
      zone: "shelf",
      look: "overworld-night",
      note: "His shoes land on smooth finished wood, not dirt. At this low angle the shelf is only a strange new floor; do not reveal the room yet.",
      stage: (t, { p, dur }) => (<>
        <Hero {...stride([4,0,-19.2],[4,0,-19.85],p)} animation="creep" face="uneasy" pack /><JarNeighbor />
      </>),
    },
  ],
});
