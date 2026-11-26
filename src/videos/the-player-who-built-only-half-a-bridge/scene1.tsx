import { cam, storyScene } from "../../engine";
import { CanyonBridge, OakPlankItem, WaitSign } from "./bridge";
import {
  ChatToast,
  EAST,
  NORTH,
  OpeningChest,
  SOUTH,
  ScoreboardWall,
  ServerChatBox,
  ServerCrowd,
  ServerPlayer,
  WEST,
  ease,
  pop,
  ramp,
  timing,
  walkSegment,
  wordAt,
} from "./kit";

const CUT_STOPPED = wordAt("1.hook", "built");
const CUT_SHY = wordAt("1.stat", "shy");
const CUT_SCARED = wordAt("1.mock", "scared");
const CUT_SIGN = wordAt("1.loop", "sign");

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Half A Bridge Hook",
  shots: [
    {
      cue: "1.hook",
      ...cam.push({ on: [-1.8, 1.15, 0], dist: 6.2, to: 4.8, yaw: -16, pitch: 12, fov: 46 }),
      zone: "server",
      look: "overworld-golden",
      note: "Frame-1 bright SMP hook: wide bridge view as Toby sprints east out over the deep canyon river clutching an oak plank.",
      stage: (t) => {
        const tobyWalk = walkSegment([-3.1, 0.1, 0], [-0.95, 0.1, 0], t, 0, Math.max(0.5, CUT_STOPPED - 0.1), { gait: "run" });
        return (
          <>
            <CanyonBridge mode="half" />
            <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.45} />
            <ServerPlayer {...tobyWalk} role="hero" nameTag="Toby" face="brave" time={t}>
              <OakPlankItem position={[0, 0.15, 0.25]} />
            </ServerPlayer>
          </>
        );
      },
    },
    {
      cue: "1.hook",
      cut: CUT_STOPPED,
      ...cam.orbit({ on: [-1.0, 1.15, 0], dist: 5.0, distTo: 3.9, yaw: -16, yawTo: 22, pitch: 10, fov: 44 }),
      zone: "server",
      look: "overworld-sunset",
      note: "Toby halts abruptly at the plank edge above the open canyon, turns back, and disconnects cleanly as a gold server logoff toast pops.",
      stage: (t) => {
        const turn = ease(ramp(t, 0.15, 0.85));
        const gone = t > 1.15;
        return (
          <>
            <CanyonBridge mode="half" />
            <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.45} />
            {!gone ? (
              <ServerPlayer
                position={[-0.95, 0.1, 0]}
                rotationY={EAST - turn * Math.PI}
                role="hero"
                nameTag="Toby"
                animation="idle"
                face="calm"
                time={t}
              />
            ) : null}
            <ChatToast sender="Server" text="Toby left the game" position={[-0.95, 2.35, -0.4]} height={0.22 * pop(t, 1.05)} />
          </>
        );
      },
    },
    {
      cue: "1.stat",
      ...cam.crane({ on: [0, 0.4, 0], onTo: [0.3, -1.0, 0], dist: 6.4, toDist: 5.0, yaw: 14, fromPitch: 12, toPitch: 28, fov: 46 }),
      zone: "server",
      look: "overworld-golden",
      note: "Wide crane over the jagged west plank lip revealing the sheer drop straight down to the canyon river below.",
      stage: (t) => (
        <>
          <CanyonBridge mode="half" />
          <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.45} />
          <OpeningChest position={[-2.75, 0, -1.35]} rotationY={0.25} open={0.25 + 0.1 * Math.sin(t * 3)} contents="empty" />
        </>
      ),
    },
    {
      cue: "1.stat",
      cut: CUT_SHY,
      ...cam.push({ on: [0.1, 0.65, 0], dist: 5.0, to: 3.7, yaw: -20, pitch: 18, fov: 44 }),
      zone: "server",
      look: "overworld-golden",
      note: "Clear view across the single-block center gap just shy of midpoint while Rex walks up mocking from the cliff.",
      stage: (t) => {
        const rexWalk = walkSegment([-4.4, 0, -1.2], [-3.1, 0, -0.9], t, 0, 1.2);
        return (
          <>
            <CanyonBridge mode="half" />
            <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.45} />
            <ServerPlayer {...rexWalk} role="bully" nameTag="Rex" badge="?" badgePopStart={0.25} face="grin" time={t} />
          </>
        );
      },
    },
    {
      cue: "1.mock",
      ...cam.orbit({ on: [-6.4, 1.35, -3.2], dist: 5.8, distTo: 4.5, yaw: -14, yawTo: 16, pitch: 8, fov: 46 }),
      zone: "server",
      look: "overworld-golden",
      note: "Spawn scoreboard wall reads BRIDGES FINISHED clearly while mocking players walk past pointing and laughing.",
      stage: (t) => {
        const mockWalk = walkSegment([-8.0, 0, -1.6], [-5.4, 0, -1.8], t, 0, 1.4, { endYaw: EAST });
        return (
          <>
            <CanyonBridge mode="half" />
            <ScoreboardWall title="BRIDGES FINISHED" rows={[{ label: "TOBY", value: 0, color: "#ff5544" }, { label: "REX", value: 4, color: "#ffd84f" }]} position={[-6.4, 0, -3.6]} rotationY={0.18} />
            <ServerPlayer {...mockWalk} role="bully" nameTag="Rex" face="laugh" time={t} />
            <ServerPlayer position={[-4.9, 0, -2.5]} rotationY={WEST + 0.3} role="friendA" nameTag="Alex" animation="laugh" face="laugh" time={t} />
          </>
        );
      },
    },
    {
      cue: "1.mock",
      cut: CUT_SCARED,
      ...cam.push({ on: [-4.2, 1.35, -0.4], dist: 5.2, to: 3.9, yaw: 18, pitch: 6, fov: 44 }),
      zone: "server",
      look: "overworld-sunset",
      note: "Floating 3D ServerChatBox pops mockery lines above Rex while Toby walks quietly back down the cobble lane.",
      stage: (t) => {
        const tobyBack = walkSegment([-3.1, 0, 0.2], [-4.8, 0, 0.4], t, 0, 1.3);
        return (
          <>
            <CanyonBridge mode="half" />
            <ServerPlayer {...tobyBack} role="hero" nameTag="Toby" face="uneasy" time={t} />
            <ServerPlayer position={[-3.3, 0, -1.1]} rotationY={SOUTH - 0.3} role="bully" nameTag="Rex" animation="point" face="grin" time={t} />
            <ServerChatBox lines={[{ sender: "Rex", text: "0 finished bridges lol" }, { sender: "Alex", text: "too scared to cross" }]} position={[-4.0, 2.55, -0.8]} scale={0.95} />
          </>
        );
      },
    },
    {
      cue: "1.loop",
      ...cam.orbit({ on: [-3.0, 1.15, 0.5], dist: 5.4, distTo: 4.1, yaw: 24, yawTo: -12, pitch: 8, fov: 44 }),
      zone: "server",
      look: "overworld-golden",
      note: "Open-loop promise: the crowned Owner strides up to the cliff edge sign, badge ! popping above his crown.",
      stage: (t) => {
        const ownerWalk = walkSegment([-5.2, 0, 0.8], [-3.4, 0, 0.9], t, 0, 1.25);
        return (
          <>
            <CanyonBridge mode="half" />
            <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.45} />
            <ServerPlayer {...ownerWalk} role="owner" nameTag="Owner" crown badge="!" badgePopStart={0.45} face="wow" time={t} />
          </>
        );
      },
    },
    {
      cue: "1.loop",
      cut: CUT_SIGN,
      ...cam.truck({ on: [-4.8, 1.1, 0.2], by: [2.2, 0, 0], dist: 5.8, yaw: 14, pitch: 10, fov: 46 }),
      zone: "server",
      look: "overworld-golden",
      note: "Fast preview flash of the whole server crowd sprinting past with golden oak planks in hand.",
      stage: (t) => {
        const runD = ease(ramp(t, 0, 1.5)) * 2.2;
        return (
          <>
            <CanyonBridge mode="half" />
            <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.45} />
            <ServerCrowd
              members={[
                { role: "owner", nameTag: "Owner", position: [-5.6 + runD, 0, 0.0], rotationY: EAST, animation: "run", animDistance: runD * 1.4, face: "brave" },
                { role: "friendA", nameTag: "Alex", position: [-6.6 + runD, 0, -0.9], rotationY: EAST, animation: "run", animDistance: runD * 1.4, face: "smile" },
                { role: "friendB", nameTag: "Sam", position: [-6.8 + runD, 0, 0.95], rotationY: EAST, animation: "run", animDistance: runD * 1.4, face: "smile" },
              ]}
              time={t}
            />
          </>
        );
      },
    },
  ],
});
