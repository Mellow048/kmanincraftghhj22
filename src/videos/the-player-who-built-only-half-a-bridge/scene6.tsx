import { cam, storyScene } from "../../engine";
import { CanyonBridge, OakPlankItem, WaitSign } from "./bridge";
import {
  ChatToast,
  EAST,
  NORTH,
  SOUTH,
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

const CUT_SPRINT = wordAt("6.flood", "sprinting");
const CUT_REDSTONE = wordAt("6.build", "redstone");
const CUT_LEFT = wordAt("6.gap", "left");

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "Server Rally & Craft",
  shots: [
    {
      cue: "6.ping",
      ...cam.push({ on: [-3.8, 1.35, 0.3], dist: 4.8, to: 3.5, yaw: -22, pitch: 6, fov: 44 }),
      zone: "server",
      look: "overworld-day",
      note: "Bright morning sunlight breaks as Owner types an urgent everyone ping in 3D ServerChatBox.",
      stage: (t) => (
        <>
          <CanyonBridge mode="crater" />
          <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.45} />
          <ServerPlayer position={[-3.8, 0, 0.3]} rotationY={WEST + 0.3} role="owner" nameTag="Owner" crown badge="!" badgePopStart={0.05} animation="point" face="brave" time={t} />
          <ServerChatBox lines={[{ sender: "Owner", text: "@everyone READ TOBY'S SIGN. JOIN NOW.", color: "#ffd84f" }]} position={[-3.8, 2.55, 0.3]} scale={pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "6.flood",
      ...cam.orbit({ on: [-7.2, 1.4, -1.5], dist: 6.4, distTo: 4.8, yaw: -26, yawTo: 18, pitch: 10, fov: 46 }),
      zone: "server",
      look: "overworld-day",
      note: "Flood of joined the game toasts pops across Spawn as players pour out of huts together.",
      stage: (t) => {
        const d = ease(ramp(t, 0, 1.45)) * 1.9;
        return (
          <>
            <CanyonBridge mode="crater" />
            <ServerCrowd
              members={[
                { role: "friendA", nameTag: "Alex", position: [-9.2 + d, 0, -2.0], rotationY: EAST, animation: "run", animDistance: d * 1.4, torch: true, face: "brave" },
                { role: "friendB", nameTag: "Sam", position: [-8.6 + d, 0, -0.5], rotationY: EAST, animation: "run", animDistance: d * 1.4, face: "smile" },
                { role: "friendC", nameTag: "Kai", position: [-9.8 + d, 0, 0.8], rotationY: EAST, animation: "run", animDistance: d * 1.4, torch: true, face: "grin" },
              ]}
              time={t}
            />
            <ServerChatBox
              lines={[
                { text: "Alex joined the game", color: "#ffeb5c" },
                { text: "Sam joined the game", color: "#ffeb5c" },
                { text: "Kai joined the game", color: "#ffeb5c" },
              ]}
              position={[-7.0, 2.6, -1.5]}
              scale={pop(t, 0.08)}
            />
          </>
        );
      },
    },
    {
      cue: "6.flood",
      cut: CUT_SPRINT,
      ...cam.truck({ on: [-5.4, 1.1, 0.2], by: [2.4, 0, 0], dist: 5.8, yaw: 12, pitch: 10, fov: 46 }),
      zone: "server",
      look: "overworld-day",
      note: "Linear lateral track beside sprinting friends carrying golden lamps & oak planks toward the canyon edge.",
      stage: (t) => {
        const runD = ease(ramp(t, 0, 1.6)) * 2.6;
        return (
          <>
            <CanyonBridge mode="crater" />
            <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.45} />
            <ServerCrowd
              members={[
                { role: "owner", nameTag: "Owner", position: [-5.8 + runD, 0, 0.0], rotationY: EAST, animation: "run", animDistance: runD * 1.5, face: "brave" },
                { role: "friendA", nameTag: "Alex", position: [-6.6 + runD, 0, -0.95], rotationY: EAST, animation: "run", animDistance: runD * 1.5, torch: true, face: "smile" },
                { role: "friendB", nameTag: "Sam", position: [-6.7 + runD, 0, 0.95], rotationY: EAST, animation: "run", animDistance: runD * 1.5, torch: true, face: "smile" },
                { role: "friendC", nameTag: "Kai", position: [-7.5 + runD, 0, -0.35], rotationY: EAST, animation: "run", animDistance: runD * 1.4, face: "grin" },
              ]}
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "6.build",
      ...cam.orbit({ on: [0, 1.0, 0], dist: 7.4, distTo: 5.6, yaw: -28, yawTo: 24, pitch: 16, fov: 48 }),
      zone: "server",
      look: "overworld-day",
      note: "Wide sweeping orbit over both canyon cliffs as builders lock both oak bridge halves into place.",
      stage: (t) => {
        const w1 = walkSegment([-3.6, 0, -0.6], [-1.5, 0.1, -0.5], t, 0, 1.4);
        const w2 = walkSegment([3.6, 0, 0.5], [1.5, 0.1, 0.5], t, 0, 1.4);
        return (
          <>
            <CanyonBridge mode="open-center" lampsLit={0} />
            <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.45} />
            <ServerPlayer {...w1} role="friendA" nameTag="Alex" face="smile" time={t}>
              <OakPlankItem position={[0, 0.18, 0.25]} />
            </ServerPlayer>
            <ServerPlayer {...w2} role="friendB" nameTag="Sam" face="smile" time={t}>
              <OakPlankItem position={[0, 0.18, 0.25]} />
            </ServerPlayer>
          </>
        );
      },
    },
    {
      cue: "6.build",
      cut: CUT_REDSTONE,
      ...cam.truck({ on: [-1.4, 0.95, -0.7], by: [2.6, 0, 0], dist: 4.8, yaw: 16, pitch: 18, fov: 44 }),
      zone: "server",
      look: "overworld-golden",
      note: "Bridge rail track as Owner wires glowing crimson redstone dust lines cleanly into each bridge lamp.",
      stage: (t) => {
        const ownerWalk = walkSegment([-2.5, 0.1, -0.5], [-0.8, 0.1, -0.5], t, 0, 1.4);
        return (
          <>
            <CanyonBridge mode="open-center" lampsLit={ease(ramp(t, 0.4, 1.4)) * 0.4} />
            <ServerPlayer {...ownerWalk} role="owner" nameTag="Owner" crown face="happy" time={t} />
          </>
        );
      },
    },
    {
      cue: "6.gap",
      ...cam.push({ on: [0, 1.0, 0], dist: 5.8, to: 4.2, yaw: -22, pitch: 12, fov: 46 }),
      zone: "server",
      look: "overworld-golden",
      note: "Readable two-cliff shot as Owner and friends halt cleanly opposite the empty single center block.",
      stage: (t) => (
        <>
          <CanyonBridge mode="open-center" lampsLit={0.35} />
          <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.45} />
          <ServerPlayer position={[-1.0, 0.1, 0.4]} rotationY={EAST} role="owner" nameTag="Owner" crown animation="point" face="smile" time={t} />
          <ServerPlayer position={[1.1, 0.1, -0.4]} rotationY={WEST} role="friendA" nameTag="Alex" animation="idle" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "6.gap",
      cut: CUT_LEFT,
      ...cam.orbit({ on: [0, 0.5, 0], dist: 3.9, distTo: 2.8, yaw: -16, yawTo: 24, pitch: 22, fov: 42 }),
      zone: "server",
      look: "overworld-golden",
      note: "Crisp tight orbit right above the single open block gap overlooking the river below.",
      stage: (t) => (
        <>
          <CanyonBridge mode="open-center" lampsLit={0.35} />
          <ChatToast sender="Owner" text="Save the middle block for Toby & Maya" position={[0, 1.85, 0]} height={0.22 * pop(t, 0.15)} />
        </>
      ),
    },
  ],
});
