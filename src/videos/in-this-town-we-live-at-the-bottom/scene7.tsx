import { cam, storyScene, walkSegment } from "../../engine";
import { BedBox, EAST, Healer, Hero, Mum, SOUTH, TOWN_ROBES, ThoughtBubble, Villager, WEST, ease, pop, ramp, room, sleepingPose, timing } from "./kit";

export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "Eight gold",
  shots: [
    {
      cue: "7.sick",
      ...cam.push({ on: room(-0.6, 1.0, -1.5), dist: 4.8, to: 3.9, yaw: -16, pitch: 8, fov: 50, screenOffset: [0, 0.08] }),
      zone: "room",
      look: "warm-room",
      note: "Hero hurries to bedside clear of BedBox as sick Mum rests flush on the BedBox mattress and pillow inside room walls.",
      stage: (t) => {
        const heroWalk = walkSegment(room(-1.55, 0, -1.55), room(-1.25, 0, -1.4), t, 0, 0.75, { endYaw: EAST - 0.35 });
        return (
          <>
            <BedBox position={room(0, 0, -1.8)} rotationY={0} />
            <Mum position={room(0, 0.142, -1.75)} rotationY={SOUTH} pose={sleepingPose(t)} weightShift={0} face="sleepy" time={t} />
            <Hero {...heroWalk} animation={t < 0.75 ? heroWalk.animation : "leanOver"} face="worried" headPitch={0.22} time={t} />
          </>
        );
      },
    },
    {
      cue: "7.woman",
      ...cam.orbit({ on: room(0.0, 1.3, -1.15), dist: 4.5, distTo: 4.1, yaw: -6, yawTo: 12, pitch: 4, fov: 56, screenOffset: [0, 0.08] }),
      zone: "room",
      look: "warm-room",
      note: "Village Healer shakes her head NO smoothly clear of BedBox as Hero recoils beside grounded Mum.",
      stage: (t) => {
        const shake = ease(ramp(t, 0.25, 0.95));
        return (
          <>
            <BedBox position={room(0, 0, -1.8)} />
            <Mum position={room(0, 0.142, -1.75)} rotationY={SOUTH} pose={sleepingPose(t)} weightShift={0} face="sleepy" time={t} />
            <Healer position={room(0.84, 0, -1.15)} rotationY={WEST + 0.15} turn={Math.sin(t * 5.5) * 0.35 * shake} hmm={0.25 * shake} />
            <Hero position={room(-0.84, 0, -1.15)} rotationY={EAST} animation={shake > 0.4 ? "scared" : "idle"} face={t > 0.7 ? "scared" : "worried"} headPitch={0.12} time={t} />
          </>
        );
      },
    },
    {
      cue: "7.cure",
      ...cam.orbit({ on: room(0.08, 1.48, -0.45), dist: 3.65, distTo: 3.3, yaw: -4, yawTo: 14, pitch: 4, fov: 62, screenOffset: [0, 0.02] }),
      zone: "room",
      look: "warm-room",
      note: "Healer explains the cure clear of BedBox with a voxel ThoughtBubble containing a glowing GoldenApple floating cleanly above her head inside frame.",
      stage: (t) => (
        <>
          <BedBox position={room(0, 0, -1.8)} />
          <Mum position={room(0, 0.142, -1.75)} rotationY={SOUTH} pose={sleepingPose(t)} weightShift={0} face="sleepy" time={t} />
          <Healer position={room(0.48, 0, -0.35)} rotationY={WEST + 0.55} arms={{ l: -0.35, r: -1.35 + Math.sin(t * 3) * 0.12 }} lookAt={room(-0.48, 1.2, -0.35)} />
          <ThoughtBubble position={room(0.32, 2.24, -0.35)} scale={pop(t, 0.15, 0.28) * 0.78} appleRot={t * 1.4} />
          <Hero position={room(-0.48, 0, -0.35)} rotationY={EAST - 0.35} animation="talk" face="surprised" lookAt={room(0.32, 2.24, -0.35)} time={t} />
        </>
      ),
    },
    {
      cue: "7.gold",
      ...cam.crane({ on: [0, 1.1, 10.2], onTo: [1.5, 4.8, 4.0], dist: 4.5, toDist: 10.5, yaw: 8, fromPitch: 12, toPitch: -18, fov: 46, screenOffset: [0, 0.06] }),
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-rain",
      note: "Rainy jetty: Hero drops hopelessly to knees before crane rises toward the towering mountain.",
      stage: (t) => {
        const drop = ease(ramp(t, 0, 1.1));
        const vWalk = walkSegment([-0.85, 0.5, 7.6], [-0.85, 0.5, 8.2], t, 0, 1.1, { endYaw: SOUTH });
        return (
          <>
            <Hero position={[0, 0.5, 10.2]} rotationY={SOUTH} animation={drop > 0.5 ? "cower" : "shrug"} plantFeet face="frown" headPitch={-0.42 * (1 - drop) + 0.22 * drop} time={t} />
            <Villager position={vWalk.position} rotationY={vWalk.rotationY} robe={TOWN_ROBES[1]} hmm={0.4} walk={vWalk.animDistance} />
          </>
        );
      },
    },
  ],
});
