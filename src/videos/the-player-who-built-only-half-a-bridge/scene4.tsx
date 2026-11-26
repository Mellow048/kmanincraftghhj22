import { cam, storyScene } from "../../engine";
import { CanyonBridge, WaitSign } from "./bridge";
import {
  Bits,
  Block,
  ChatToast,
  EAST,
  EmberDrift,
  NORTH,
  SOUTH,
  ServerChatBox,
  ServerPlayer,
  WEST,
  ease,
  pop,
  ramp,
  timing,
  walkSegment,
  wordAt,
} from "./kit";

const CUT_TNT = wordAt("4.tnt", "TNT");
const CUT_LEAVING = wordAt("4.blast", "leaving");
const CUT_SHELL = wordAt("4.cry", "she'll");

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Cruel Breaking Point",
  shots: [
    {
      cue: "4.tnt",
      ...cam.orbit({ on: [-2.2, 1.15, 0], dist: 5.2, distTo: 3.9, yaw: -24, yawTo: 16, pitch: 10, fov: 44 }),
      zone: "server",
      look: "lantern-night",
      note: "Thursday night: Rex creeps onto Toby's dark torchlit bridge holding red TNT block.",
      stage: (t) => {
        const rexWalk = walkSegment([-3.6, 0, -0.2], [-1.7, 0.1, 0], t, 0, 1.2, { gait: "creep" });
        return (
          <>
            <CanyonBridge mode="half" />
            <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.45} />
            <ServerPlayer {...rexWalk} role="bully" nameTag="Rex" face="grin" time={t}>
              <Block position={[0, 0.2, 0.25]} size={[0.38, 0.38, 0.38]} color="#d92b24" />
            </ServerPlayer>
          </>
        );
      },
    },
    {
      cue: "4.tnt",
      cut: CUT_TNT,
      ...cam.push({ on: [-2.0, 1.0, 0], dist: 4.5, to: 3.2, yaw: 20, pitch: 14, fov: 42 }),
      zone: "server",
      look: "lantern-night",
      note: "Rex sets down white-flashing lit TNT onto the oak planks and runs back down the lane.",
      stage: (t) => {
        const flash = Math.sin(t * 28) > 0;
        const fleeWalk = walkSegment([-1.7, 0.1, 0], [-4.1, 0, -0.3], t, 0.15, 1.35, { gait: "run" });
        return (
          <>
            <CanyonBridge mode="half" />
            <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.45} />
            <Block position={[-1.4, 0.42, 0]} size={[0.62, 0.62, 0.62]} color={flash ? "#ffffff" : "#d92b24"} emissive={flash ? "#ffffff" : "#ff5522"} emissiveIntensity={flash ? 1.1 : 0.4} />
            <EmberDrift position={[-1.4, 0.8, 0]} area={[0.8, 0.8, 0.8]} count={14} color="#ffaa44" />
            <ServerPlayer {...fleeWalk} role="bully" nameTag="Rex" face="laugh" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.blast",
      ...cam.push({ on: [-1.8, 1.1, 0], dist: 6.0, to: 4.5, yaw: -16, pitch: 12, fov: 48 }),
      impacts: [{ at: 0.15, amp: 0.14, dur: 0.55 }],
      zone: "server",
      look: "lantern-night",
      note: "Violent TNT detonation blasts oak planks and splinters high above the canyon river.",
      stage: (t) => (
        <>
          <CanyonBridge mode="crater" />
          <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.55} />
          <Bits position={[-1.5, 0.35, 0]} t={t} color="#9a6d40" count={24} power={2.2} />
          <Bits position={[-1.5, 0.45, 0]} t={t} color="#ff8e2b" count={16} power={1.8} />
        </>
      ),
    },
    {
      cue: "4.blast",
      cut: CUT_LEAVING,
      ...cam.crane({ on: [-2.6, 0.9, 0], onTo: [-2.9, 1.35, 0], dist: 5.2, toDist: 3.9, yaw: 24, fromPitch: 16, toPitch: 6, fov: 44 }),
      zone: "server",
      look: "overworld-night",
      note: "Smoke clears over jagged black scorched stone at the canyon lip as Toby arrives horrified.",
      stage: (t) => {
        const tobyStep = walkSegment([-4.8, 0, 0.1], [-3.4, 0, 0.1], t, 0.1, 1.2);
        return (
          <>
            <CanyonBridge mode="crater" />
            <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.55} />
            <ServerPlayer {...tobyStep} role="hero" nameTag="Toby" badge="broken" badgePopStart={0.4} tears={0.9} face="scared" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.cry",
      ...cam.push({ on: [-3.3, 1.15, 0.1], dist: 4.2, to: 3.0, yaw: -22, pitch: 8, fov: 42 }),
      zone: "server",
      look: "overworld-night",
      note: "Toby trembles and cries beside the smoking canyon crater.",
      stage: (t) => (
        <>
          <CanyonBridge mode="crater" />
          <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.55} />
          <ServerPlayer position={[-3.3, 0, 0.1]} rotationY={EAST} role="hero" animation="cower" tears={1} face="crying" time={t} />
        </>
      ),
    },
    {
      cue: "4.cry",
      cut: CUT_SHELL,
      ...cam.orbit({ on: [-3.3, 1.4, 0.1], dist: 4.5, distTo: 3.3, yaw: -16, yawTo: 18, pitch: 6, fov: 42 }),
      zone: "server",
      look: "overworld-night",
      note: "Heartbreaking ServerChatBox message pops overhead: she'll think I quit.",
      stage: (t) => (
        <>
          <CanyonBridge mode="crater" />
          <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.55} />
          <ServerPlayer position={[-3.3, 0, 0.1]} rotationY={EAST} role="hero" nameTag="Toby" animation="cower" tears={1} face="crying" time={t} />
          <ServerChatBox lines={[{ sender: "Toby", text: "she'll think I quit", color: "#99c2ff" }]} position={[-3.3, 2.55, 0.1]} scale={pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "4.quit",
      ...cam.push({ on: [-3.1, 1.2, 0.2], dist: 3.8, to: 5.2, yaw: 14, pitch: 10, fov: 44, screenOffset: [0, 0.08] }),
      zone: "server",
      look: "overworld-night",
      note: "Slow lonely pull-out as Toby vanishes leaving only the empty scorched cliff edge and Toby left the game.",
      stage: (t) => (
        <>
          <CanyonBridge mode="crater" />
          <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.55} />
          {t < 0.55 ? (
            <ServerPlayer position={[-3.3, 0, 0.1]} rotationY={WEST} role="hero" nameTag="Toby" animation="cower" tears={1} face="crying" time={t} />
          ) : null}
          <ChatToast sender="Server" text="Toby left the game" position={[-3.1, 2.45, 0.2]} height={0.22 * pop(t, 0.55)} />
        </>
      ),
    },
  ],
});
