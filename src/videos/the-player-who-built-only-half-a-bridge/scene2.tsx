import { cam, storyScene } from "../../engine";
import { CanyonBridge, OakPlankItem, WaitSign } from "./bridge";
import {
  EAST,
  NORTH,
  OpeningChest,
  SOUTH,
  ScoreboardWall,
  ServerChatBox,
  ServerPlayer,
  WEST,
  ease,
  ramp,
  timing,
  walkSegment,
  wordAt,
} from "./kit";

const CUT_STUCK = wordAt("2.board", "stuck");
const CUT_BACKED = wordAt("2.chat", "backed");
const CUT_WAIT = wordAt("2.sign", "Wait");
const CUT_TWO = wordAt("2.chest", "two");

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "SMP Evidence",
  shots: [
    {
      cue: "2.board",
      ...cam.crane({ on: [-6.3, 1.35, -3.4], onTo: [-6.3, 1.75, -3.4], dist: 7.4, toDist: 6.2, yaw: -8, fromPitch: 10, toPitch: 2, fov: 48 }),
      zone: "server",
      look: "overworld-golden",
      note: "Crane rises cleanly before the open Spawn ScoreboardWall while Rex walks past pointing at Toby's zero rank.",
      stage: (t) => {
        const rexWalk = walkSegment([-7.8, 0, -2.1], [-5.3, 0, -2.1], t, 0, 1.3);
        return (
          <>
            <CanyonBridge mode="half" />
            <ScoreboardWall title="BRIDGES FINISHED" rows={[{ label: "ALEX", value: 7, color: "#68f08a" }, { label: "REX", value: 4, color: "#ffd84f" }, { label: "TOBY", value: 0, color: "#ff4e42" }]} position={[-6.4, 0, -3.6]} rotationY={0.18} />
            <ServerPlayer {...rexWalk} role="bully" nameTag="Rex" face="grin" time={t} />
          </>
        );
      },
    },
    {
      cue: "2.board",
      cut: CUT_STUCK,
      ...cam.push({ on: [-6.1, 1.35, -3.2], dist: 6.8, to: 5.8, yaw: 10, pitch: 4, fov: 46 }),
      zone: "server",
      look: "overworld-sunset",
      note: "Readable shot of TOBY: 0 on ScoreboardWall beside Toby shrugging helplessly in the foreground.",
      stage: (t) => (
        <>
          <CanyonBridge mode="half" />
          <ScoreboardWall title="BRIDGES FINISHED" rows={[{ label: "ALEX", value: 7, color: "#68f08a" }, { label: "REX", value: 4, color: "#ffd84f" }, { label: "TOBY", value: 0, color: "#ff4e42" }]} position={[-6.4, 0, -3.6]} rotationY={0.18} />
          <ServerPlayer position={[-5.1, 0, -2.5]} rotationY={WEST + 0.3} role="hero" nameTag="Toby" animation="shrug" face="uneasy" time={t} />
        </>
      ),
    },
    {
      cue: "2.chat",
      ...cam.orbit({ on: [-3.4, 1.35, 0], dist: 5.5, distTo: 4.2, yaw: 24, yawTo: -16, pitch: 8, fov: 44 }),
      zone: "server",
      look: "overworld-sunset",
      note: "Wide plaza shot as ServerChatBox pops mockery lines overhead while Alex walks up to jeer beside Rex.",
      stage: (t) => {
        const alexWalk = walkSegment([-5.4, 0, -1.2], [-3.8, 0, -0.9], t, 0, 1.1);
        return (
          <>
            <CanyonBridge mode="half" />
            <ServerPlayer {...alexWalk} role="friendA" nameTag="Alex" face="laugh" time={t} />
            <ServerPlayer position={[-3.2, 0, 1.1]} rotationY={NORTH + 0.3} role="bully" nameTag="Rex" animation="laugh" face="laugh" time={t} />
            <ServerChatBox lines={[{ sender: "Rex", text: "still stuck on half?" }, { sender: "Sam", text: "1 block away lmao" }]} position={[-3.3, 2.55, -0.2]} scale={0.95} />
          </>
        );
      },
    },
    {
      cue: "2.chat",
      cut: CUT_BACKED,
      ...cam.truck({ on: [-3.2, 1.05, 0.2], by: [-1.8, 0, 0], dist: 4.9, yaw: 18, pitch: 8, fov: 44 }),
      zone: "server",
      look: "overworld-sunset",
      note: "Camera tracks Toby walking quietly back along the stone lane from the canyon edge.",
      stage: (t) => {
        const backWalk = walkSegment([-1.6, 0.1, 0], [-3.9, 0, 0.2], t, 0, 1.35);
        return (
          <>
            <CanyonBridge mode="half" />
            <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.45} />
            <ServerPlayer {...backWalk} role="hero" nameTag="Toby" face="frown" headPitch={0.22} time={t} />
          </>
        );
      },
    },
    {
      cue: "2.sign",
      ...cam.push({ on: [-3.1, 1.0, 1.4], dist: 4.5, to: 3.3, yaw: -24, pitch: 8, fov: 42 }),
      zone: "server",
      look: "overworld-sunset",
      note: "Toby walks forward beside the lone oak sign perched by the open cliffside drop.",
      stage: (t) => {
        const tobyStep = walkSegment([-4.6, 0, 1.05], [-3.55, 0, 1.25], t, 0, 1.1);
        return (
          <>
            <CanyonBridge mode="half" />
            <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.45} scale={0.85} />
            <ServerPlayer {...tobyStep} role="hero" nameTag="Toby" headPitch={0.18 * ease(ramp(t, 0.3, 1.0))} face="uneasy" time={t} />
          </>
        );
      },
    },
    {
      cue: "2.sign",
      cut: CUT_WAIT,
      ...cam.orbit({ on: [-2.75, 0.8, 1.45], dist: 3.2, distTo: 2.35, yaw: 16, yawTo: -16, pitch: 6, fov: 40 }),
      zone: "server",
      look: "overworld-golden",
      note: "Clean unobstructed close orbit reading WAIT FOR ME / HALF A BRIDGE on the oak sign.",
      stage: (t) => (
        <>
          <CanyonBridge mode="half" />
          <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.25} scale={0.9} />
          <ServerPlayer position={[-3.65, 0, 1.15]} rotationY={EAST} role="hero" nameTag="Toby" animation="lookAround" face="uneasy" time={t} />
        </>
      ),
    },
    {
      cue: "2.chest",
      ...cam.push({ on: [-2.85, 0.85, -1.35], dist: 4.3, to: 3.1, yaw: -22, pitch: 18, fov: 42 }),
      zone: "server",
      look: "overworld-sunset",
      note: "Toby walks up to his oak chest and lifts the lid neatly beside the canyon rail.",
      stage: (t) => {
        const open = ease(ramp(t, 0.1, 1.0));
        const walk = walkSegment([-4.4, 0, -1.35], [-3.5, 0, -1.35], t, 0, 0.9);
        return (
          <>
            <CanyonBridge mode="half" />
            <OpeningChest position={[-2.85, 0, -1.35]} rotationY={-0.35} open={open} contents="empty" />
            <ServerPlayer {...walk} role="hero" nameTag="Toby" face="calm" time={t} />
          </>
        );
      },
    },
    {
      cue: "2.chest",
      cut: CUT_TWO,
      ...cam.orbit({ on: [-2.85, 0.65, -1.35], dist: 2.9, distTo: 2.2, yaw: -16, yawTo: 20, pitch: 26, fov: 40 }),
      zone: "server",
      look: "overworld-sunset",
      note: "Close high-angle reveal inside open oak chest showing exactly two matched oak planks saved inside.",
      stage: (t) => (
        <>
          <CanyonBridge mode="half" />
          <OpeningChest position={[-2.85, 0, -1.35]} rotationY={-0.35} open={1} contents="empty" />
          <OakPlankItem position={[-2.98, 0.56 + 0.02 * Math.sin(t * 4), -1.32]} scale={0.28} />
          <OakPlankItem position={[-2.72, 0.56 + 0.02 * Math.cos(t * 4), -1.38]} scale={0.28} />
        </>
      ),
    },
  ],
});
