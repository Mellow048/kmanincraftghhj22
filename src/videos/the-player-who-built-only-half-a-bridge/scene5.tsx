import { cam, storyScene } from "../../engine";
import { CanyonBridge, WaitSign } from "./bridge";
import { EAST, NORTH, ServerPlayer, ease, ramp, timing, walkSegment, wordAt } from "./kit";

const CUT_SMOKY = wordAt("5.owner", "smoky");
const CUT_WAIT = wordAt("5.clue", "Wait");

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Owner Investigates",
  shots: [
    {
      cue: "5.owner",
      ...cam.truck({ on: [-4.6, 1.2, 0.4], by: [1.8, 0, 0], dist: 5.4, yaw: -18, pitch: 10, fov: 44 }),
      zone: "server",
      look: "lantern-night",
      note: "Quiet dawn hush: crowned Owner walks slowly alone down the lane toward the wrecked bridge head.",
      stage: (t) => {
        const ownerWalk = walkSegment([-5.6, 0, 0.4], [-3.8, 0, 0.4], t, 0, 1.45);
        return (
          <>
            <CanyonBridge mode="crater" />
            <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.55} />
            <ServerPlayer {...ownerWalk} role="owner" nameTag="Owner" crown face="uneasy" time={t} />
          </>
        );
      },
    },
    {
      cue: "5.owner",
      cut: CUT_SMOKY,
      ...cam.orbit({ on: [-3.4, 1.15, 0.4], dist: 4.8, distTo: 3.6, yaw: -22, yawTo: 18, pitch: 8, fov: 44 }),
      zone: "server",
      look: "lantern-night",
      note: "Owner stands beside the smoking crater looking down at the unbroken oak sign in the ash.",
      stage: (t) => (
        <>
          <CanyonBridge mode="crater" />
          <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.55} />
          <ServerPlayer position={[-3.6, 0, 0.4]} rotationY={EAST - 0.35} role="owner" nameTag="Owner" crown animation="lookAround" lookAt={[-2.75, 0.6, 1.45]} face="frown" time={t} />
        </>
      ),
    },
    {
      cue: "5.clue",
      ...cam.push({ on: [-2.75, 0.85, 1.45], dist: 3.5, to: 2.5, yaw: 18, pitch: 8, fov: 42 }),
      zone: "server",
      look: "lantern-night",
      note: "Clear unobstructed push onto the unbroken oak sign under morning embers as Owner points beside it.",
      stage: (t) => (
        <>
          <CanyonBridge mode="crater" />
          <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.35} scale={0.9} />
          <ServerPlayer position={[-3.7, 0, 0.8]} rotationY={EAST - 0.25} role="owner" nameTag="Owner" crown animation="point" face="frown" time={t} />
        </>
      ),
    },
    {
      cue: "5.clue",
      cut: CUT_WAIT,
      ...cam.orbit({ on: [-3.2, 1.35, 0.9], dist: 4.3, distTo: 3.1, yaw: 24, yawTo: -16, pitch: 6, fov: 42 }),
      zone: "server",
      look: "overworld-golden",
      note: "Golden light hits Owner's face as ! badge pops sharply above his crown when he understands.",
      stage: (t) => (
        <>
          <CanyonBridge mode="crater" />
          <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.35} />
          <ServerPlayer
            position={[-3.5, 0, 0.7]}
            rotationY={EAST - 0.2}
            role="owner"
            nameTag="Owner"
            crown
            badge="!"
            badgePopStart={0.05}
            animation="cheer"
            face="wow"
            time={t}
          />
        </>
      ),
    },
  ],
});
