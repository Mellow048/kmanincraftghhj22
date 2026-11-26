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
      ...cam.truck({ on: [-4.6, 1.15, 0.4], by: [1.8, 0, 0], dist: 4.2, yaw: -20, pitch: 8, fov: 42, screenOffset: [0, 0.08] }),
      zone: "server",
      look: "lantern-night",
      note: "Quiet dawn hush: crowned Owner walks slowly alone down the lane toward the wrecked bridge head.",
      stage: (t) => {
        const ownerWalk = walkSegment([-5.6, 0, 0.4], [-3.8, 0, 0.4], t, 0, 1.45, { yaw: EAST });
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
      ...cam.orbit({ on: [-3.4, 1.05, 0.3], dist: 3.6, distTo: 2.45, yaw: -22, yawTo: 18, pitch: 8, fov: 40, screenOffset: [0, 0.08] }),
      zone: "server",
      look: "lantern-night",
      note: "Owner steps beside the smoking crater, bowing his gaze onto the unbroken oak sign sticking out of the ash.",
      stage: (t) => {
        const ownerStep = walkSegment([-3.8, 0, 0.4], [-3.4, 0, 0.55], t, 0, 0.95, { yaw: EAST - 0.35 });
        return (
          <>
            <CanyonBridge mode="crater" />
            <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.55} />
            <ServerPlayer {...ownerStep} role="owner" nameTag="Owner" crown headPitch={0.25 * ease(ramp(t, 0.2, 0.9))} face="frown" time={t} />
          </>
        );
      },
    },
    {
      cue: "5.clue",
      ...cam.push({ on: [-2.75, 0.72, 1.45], dist: 2.8, to: 1.75, yaw: 24, pitch: 6, fov: 36, screenOffset: [0, 0.06] }),
      zone: "server",
      look: "lantern-night",
      note: "Tight push straight into the dusty oak sign under morning embers as Owner leans in beside it.",
      stage: (t) => {
        const leanStep = walkSegment([-3.4, 0, 0.55], [-3.15, 0, 0.92], t, 0, 0.85, { yaw: EAST - 0.25 });
        return (
          <>
            <CanyonBridge mode="crater" />
            <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.35} scale={0.9} />
            <ServerPlayer {...leanStep} role="owner" nameTag="Owner" crown headPitch={0.22} face="frown" time={t} />
          </>
        );
      },
    },
    {
      cue: "5.clue",
      cut: CUT_WAIT,
      ...cam.orbit({ on: [-3.1, 1.3, 0.9], dist: 3.1, distTo: 2.1, yaw: 28, yawTo: -16, pitch: 2, fov: 38, screenOffset: [0, 0.08] }),
      zone: "server",
      look: "overworld-golden",
      note: "Golden light hits Owner's face as ! badge pops sharply above his crown when he understands.",
      stage: (t) => {
        const react = ease(ramp(t, 0, 0.8));
        return (
          <>
            <CanyonBridge mode="crater" />
            <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.35} />
            <ServerPlayer
              position={[-3.35, 0, 0.72]}
              rotationY={EAST - 0.45 + 0.35 * react}
              role="owner"
              nameTag="Owner"
              crown
              badge="!"
              badgePopStart={0.05}
              headPitch={-0.18 * react}
              face="wow"
              time={t}
            />
          </>
        );
      },
    },
  ],
});
