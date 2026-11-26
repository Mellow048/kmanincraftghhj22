import { cam, storyScene } from "../../engine";
import { CanyonBridge, OakPlankItem, WaitSign } from "./bridge";
import {
  ChatToast,
  Clock3AM,
  EAST,
  FloatingHeart,
  NORTH,
  PLACE,
  SOUTH,
  ScoreboardWall,
  ServerCrowd,
  ServerPlayer,
  SubscribeSign,
  WEST,
  ease,
  on,
  pop,
  ramp,
  timing,
  walkSegment,
  wordAt,
} from "./kit";

const CUT_MAYA = wordAt("7.friday", "Maya");
const CUT_CRYING = wordAt("7.join", "crying");
const CUT_INTO = wordAt("7.place", "into");
const CUT_HEARTS = wordAt("7.glow", "hearts");

export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "Payoff & CTA",
  shots: [
    {
      cue: "7.friday",
      ...cam.push({ on: on(PLACE.irl, -1.9, 1.0, -1.75), dist: 2.3, to: 1.4, yaw: 16, pitch: 4, fov: 36, screenOffset: [0, 0.06] }),
      zone: "irl",
      look: "warm-room",
      note: "Tight push onto digital bedside clock ringing 6:00 PM as Friday evening arrives.",
      stage: (t) => (
        <>
          <Clock3AM text="FRI 6:00 PM" alarm={0.55 + 0.45 * Math.sin(t * 14)} color="#ffd84f" position={on(PLACE.irl, -1.9, 0.8, -1.75)} rotationY={0.28} scale={0.78} />
          <ServerPlayer position={on(PLACE.irl, -1.25, 0, -0.5)} rotationY={NORTH} headYaw={0.25 * ease(ramp(t, 0, 0.8))} role="hero" animation="idle" face="wow" time={t} />
        </>
      ),
    },
    {
      cue: "7.friday",
      cut: CUT_MAYA,
      ...cam.push({ on: [1.6, 1.25, 0], dist: 3.9, to: 2.55, yaw: -20, pitch: 6, fov: 40, screenOffset: [0, 0.08] }),
      zone: "server",
      look: "lantern-night",
      note: "Maya joins onto the newly lit East bridge half carrying her oak plank, looking joyfully across the gap.",
      stage: (t) => {
        const mayaWalk = walkSegment([2.6, 0.1, 0], [1.0, 0.1, 0], t, 0, 1.15, { yaw: WEST });
        return (
          <>
            <CanyonBridge mode="open-center" lampsLit={0.45} />
            <ServerPlayer {...mayaWalk} role="friendC" nameTag="Maya" face="happy" time={t}>
              <OakPlankItem position={[0, 0.18, 0.25]} />
            </ServerPlayer>
            <ChatToast sender="Server" text="Maya joined the game" position={[1.4, 2.45, 0]} height={0.22 * pop(t, 0.1)} />
          </>
        );
      },
    },
    {
      cue: "7.join",
      ...cam.orbit({ on: [-1.4, 1.25, 0], dist: 4.1, distTo: 2.75, yaw: 24, yawTo: -16, pitch: 6, fov: 40, screenOffset: [0, 0.08] }),
      zone: "server",
      look: "lantern-night",
      note: "Toby spawns onto the West bridge half bursting into happy tears at the sight of the glowing tribute.",
      stage: (t) => {
        const tobyWalk = walkSegment([-2.5, 0.1, 0], [-1.0, 0.1, 0], t, 0, 1.2, { yaw: EAST });
        return (
          <>
            <CanyonBridge mode="open-center" lampsLit={0.5} />
            <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.45} />
            <ServerPlayer {...tobyWalk} role="hero" nameTag="Toby" tears={0.95} face="wow" time={t}>
              <OakPlankItem position={[0, 0.18, 0.25]} />
            </ServerPlayer>
          </>
        );
      },
    },
    {
      cue: "7.join",
      cut: CUT_CRYING,
      ...cam.crane({ on: [0, 1.1, 0], onTo: [0, 1.8, 0], dist: 6.8, toDist: 5.0, yaw: -18, fromPitch: 8, toPitch: 18, fov: 46, screenOffset: [0, 0.08] }),
      zone: "server",
      look: "lantern-night",
      note: "Crane climbs past Toby and Maya facing each other as the entire server crowd watches cheering along both cliffs.",
      stage: (t) => (
        <>
          <CanyonBridge mode="open-center" lampsLit={0.55} />
          <ServerPlayer position={[-1.0, 0.1, 0]} rotationY={EAST} role="hero" nameTag="Toby" tears={0.7} animation="wave" face="happy" time={t} />
          <ServerPlayer position={[1.0, 0.1, 0]} rotationY={WEST} role="friendC" nameTag="Maya" animation="wave" face="happy" time={t} />
          <ServerCrowd
            members={[
              { role: "owner", nameTag: "Owner", position: [-3.5, 0, -1.6], rotationY: EAST + 0.4, animation: "cheer", torch: true, face: "happy" },
              { role: "friendA", nameTag: "Alex", position: [-3.6, 0, 1.8], rotationY: EAST - 0.4, animation: "cheer", face: "happy" },
              { role: "friendB", nameTag: "Sam", position: [3.5, 0, -1.6], rotationY: WEST - 0.4, animation: "cheer", torch: true, face: "happy" },
            ]}
            time={t}
          />
        </>
      ),
    },
    {
      cue: "7.place",
      ...cam.push({ on: [0, 0.9, 0], dist: 4.1, to: 2.7, yaw: 20, pitch: 10, fov: 38, screenOffset: [0, 0.08] }),
      zone: "server",
      look: "overworld-golden",
      note: "Toby and Maya step to the dead center edge together reaching forward with matching oak blocks.",
      stage: (t) => {
        const wT = walkSegment([-1.2, 0.1, 0], [-0.55, 0.1, 0], t, 0, 0.9, { yaw: EAST });
        const wM = walkSegment([1.2, 0.1, 0], [0.55, 0.1, 0], t, 0, 0.9, { yaw: WEST });
        return (
          <>
            <CanyonBridge mode="open-center" lampsLit={0.6} />
            <ServerPlayer {...wT} role="hero" nameTag="Toby" face="happy" time={t}>
              <OakPlankItem position={[0, 0.18, 0.25]} />
            </ServerPlayer>
            <ServerPlayer {...wM} role="friendC" nameTag="Maya" face="happy" time={t}>
              <OakPlankItem position={[0, 0.18, 0.25]} />
            </ServerPlayer>
          </>
        );
      },
    },
    {
      cue: "7.place",
      cut: CUT_INTO,
      ...cam.orbit({ on: [0, 0.75, 0], dist: 2.9, distTo: 1.95, yaw: 18, yawTo: -18, pitch: 12, fov: 38, screenOffset: [0, 0.08] }),
      impacts: [{ at: 0.35, amp: 0.04, dur: 0.25 }],
      zone: "server",
      look: "overworld-golden",
      note: "Tight center orbit as the keystone center oak block snaps seamlessly into place joining both halves.",
      stage: (t) => {
        const snap = ease(ramp(t, 0, 0.45));
        return (
          <>
            <CanyonBridge mode="complete" lampsLit={0.6 + snap * 0.4} centerLift={1 - snap} />
            <ServerPlayer position={[-0.6, 0.1, 0]} rotationY={EAST} role="hero" nameTag="Toby" animation="reach" face="happy" time={t} />
            <ServerPlayer position={[0.6, 0.1, 0]} rotationY={WEST} role="friendC" nameTag="Maya" animation="reach" face="happy" time={t} />
          </>
        );
      },
    },
    {
      cue: "7.glow",
      ...cam.orbit({ on: [0, 1.3, 0], dist: 5.2, distTo: 3.7, yaw: -28, yawTo: 20, pitch: 8, fov: 44, screenOffset: [0, 0.08] }),
      zone: "server",
      look: "overworld-golden",
      note: "Golden RedstoneLamps blaze from cliff to cliff as Toby and Maya step together cheering under rising voxel hearts.",
      stage: (t) => {
        const stepT = walkSegment([-0.85, 0.1, 0], [-0.45, 0.1, 0], t, 0, 0.75, { yaw: EAST });
        const stepM = walkSegment([0.85, 0.1, 0], [0.45, 0.1, 0], t, 0, 0.75, { yaw: WEST });
        return (
          <>
            <CanyonBridge mode="complete" lampsLit={1} />
            <ServerPlayer {...stepT} role="hero" nameTag="Toby" badge="heart" badgePopStart={0.1} headPitch={-0.14 * ease(ramp(t, 0.2, 0.9))} face="happy" time={t} />
            <ServerPlayer {...stepM} role="friendC" nameTag="Maya" badge="heart" badgePopStart={0.1} headPitch={-0.14 * ease(ramp(t, 0.2, 0.9))} face="happy" time={t} />
            <FloatingHeart position={[0, 1.3, 0]} count={8} t={t} />
          </>
        );
      },
    },
    {
      cue: "7.glow",
      cut: CUT_HEARTS,
      ...cam.push({ on: [-5.8, 1.45, -3.4], dist: 4.1, to: 2.55, yaw: -16, pitch: 4, fov: 38, screenOffset: [0, 0.08] }),
      zone: "server",
      look: "overworld-golden",
      note: "Callback payoff: Spawn ScoreboardWall flips TOBY from 0 straight to 1 in glowing gold as Owner walks up cheering.",
      stage: (t) => {
        const ownerStep = walkSegment([-5.55, 0, -2.0], [-4.85, 0, -2.25], t, 0, 0.95, { yaw: EAST - 0.2 });
        return (
          <>
            <CanyonBridge mode="complete" lampsLit={1} />
            <ScoreboardWall title="BRIDGES FINISHED" rows={[{ label: "ALEX", value: 7, color: "#68f08a" }, { label: "REX", value: 4, color: "#ffd84f" }, { label: "TOBY", value: 1, color: "#ffd84f" }]} position={[-6.4, 0, -3.6]} rotationY={0.22} />
            <ServerPlayer {...ownerStep} role="owner" nameTag="Owner" crown headPitch={-0.12 * Math.abs(Math.sin(t * 3))} face="happy" time={t} />
            <FloatingHeart position={[-6.1, 1.8, -3.0]} count={6} t={t} />
          </>
        );
      },
    },
    {
      cue: "7.cta",
      ...cam.push({ on: [0, 1.25, 0], dist: 4.5, to: 3.15, yaw: 14, pitch: 6, fov: 42, screenOffset: [0, 0.08] }),
      zone: "server",
      look: "overworld-golden",
      note: "Warm golden finale: Toby and Maya stand together at the glowing bridge center beside Owner & SubscribeSign.",
      stage: (t) => (
        <>
          <CanyonBridge mode="complete" lampsLit={1} />
          <WaitSign position={[-2.75, 0, 1.45]} rotationY={0.45} />
          <ServerPlayer position={[-0.45, 0.1, 0]} rotationY={SOUTH - 0.15} role="hero" nameTag="Toby" animation="wave" face="happy" time={t} />
          <ServerPlayer position={[0.45, 0.1, 0]} rotationY={SOUTH + 0.15} role="friendC" nameTag="Maya" animation="wave" face="happy" time={t} />
          <ServerPlayer position={[-2.2, 0.1, -0.5]} rotationY={SOUTH - 0.3} role="owner" nameTag="Owner" crown animation="cheer" face="happy" time={t} />
          <FloatingHeart position={[0, 1.4, 0]} count={8} t={t} />
          <SubscribeSign position={[0, 2.35, -1.6]} scale={pop(t, 0.25)} />
        </>
      ),
    },
  ],
});
