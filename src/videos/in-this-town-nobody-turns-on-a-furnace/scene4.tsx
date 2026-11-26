import {
  Blaze,
  ChatToast,
  EmberDrift,
  FireLight,
  Hero,
  PLACE,
  Player,
  Smoke,
  cam,
  ease,
  pop,
  ramp,
  storyScene,
  timing,
  wordAt,
} from "./kit";

const sparkWord = wordAt("6.spark", "warning");
const boomWord = wordAt("6.fire", "explodes");

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Bakery Overheat & Four Kids Trapped",
  shots: [
    {
      cue: "6.cake",
      ...cam.push({
        on: [PLACE.bakery[0] + 1.1, 1.05, PLACE.bakery[2] - 0.8],
        dist: 3.9,
        to: 2.55,
        yaw: 18,
        pitch: 10,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      impacts: [{ at: 0.65, amp: 0.02, dur: 0.22 }],
      look: "overworld-golden",
      zone: "bakery",
      note: "Player dashes briskly up to bakery ovens and slams cranking arm down as sparks erupt.",
      stage: (t) => {
        const dash = ease(ramp(t, 0, 0.65));
        return (
          <>
            <Player
              who={4}
              position={[PLACE.bakery[0] + 0.15 + dash * 0.55, 0, PLACE.bakery[2] - 0.35 - dash * 0.2]}
              rotationY={0.85}
              animation={dash < 0.7 ? "run" : "press"}
              animDistance={dash * 0.8}
              face="grin"
              time={t * 1.3}
            />
            <EmberDrift position={[PLACE.bakery[0] + 1.65, 0.8 + dash * 0.4, PLACE.bakery[2] - 0.9]} area={[1.4, 1.6, 1.4]} count={20} />
          </>
        );
      },
    },
    {
      cue: "6.over",
      ...cam.push({
        on: [PLACE.bakery[0] + 1.85, 0.72, PLACE.bakery[2] - 1.1],
        dist: 2.75,
        to: 1.62,
        yaw: -16,
        pitch: 6,
        fov: 38,
        screenOffset: [0, 0.1],
      }),
      look: "overworld-golden",
      zone: "bakery",
      note: "Aggressive push into roaring furnace belly as Player ducks clear and embers blow upward.",
      stage: (t) => {
        const surge = ease(ramp(t, 0, 1.4));
        return (
          <>
            <Player
              who={4}
              position={[PLACE.bakery[0] + 1.05 - surge * 0.25, 0, PLACE.bakery[2] - 0.55]}
              rotationY={0.95}
              animation="press"
              face={surge > 0.5 ? "wow" : "grin"}
              time={t * 1.6}
            />
            <EmberDrift position={[PLACE.bakery[0] + 1.85, 0.8 + t * 0.35, PLACE.bakery[2] - 0.95]} area={[1.6, 1.8, 1.4]} count={28} />
            <FireLight position={[PLACE.bakery[0] + 1.8, 0.9, PLACE.bakery[2] - 0.8]} power={2.1 + Math.sin(t * 14) * 0.4} />
          </>
        );
      },
    },
    {
      cue: "6.spark",
      ...cam.crane({
        on: [PLACE.bakery[0] + 0.3, 1.25, PLACE.bakery[2] - 0.8],
        onTo: [PLACE.bakery[0] + 0.3, 2.2, PLACE.bakery[2] - 1.4],
        dist: 3.9,
        toDist: 2.8,
        yaw: -14,
        fromPitch: 8,
        toPitch: -22,
        fov: 40,
        screenOffset: [0, 0.1],
      }),
      look: "overworld-golden",
      zone: "bakery",
      note: "Crane tracks bright orange spark shooting upward from oven past STOP TOO HOT chat alert.",
      stage: (t) => {
        const fly = ease(ramp(t, 0.1, 1.45));
        return (
          <>
            <EmberDrift position={[PLACE.bakery[0] + 0.9, 1.4 + fly * 1.4, PLACE.bakery[2] - 1.0 - fly * 0.8]} area={[1.8, 2.2, 1.8]} count={30} />
            <ChatToast
              text="STOP! TOO HOT!"
              sender="Baker"
              position={[PLACE.bakery[0] + 0.15, 2.05, PLACE.bakery[2] - 0.6]}
              height={0.13 * pop(t, Math.min(0.25, sparkWord))}
            />
          </>
        );
      },
    },
    {
      cue: "6.roof",
      ...cam.orbit({
        on: [PLACE.bakery[0], 2.4, PLACE.bakery[2] - 2.0],
        dist: 4.1,
        distTo: 2.85,
        yaw: -24,
        yawTo: 22,
        pitch: -4,
        fov: 40,
        screenOffset: [0, 0.08],
      }),
      look: "overworld-sunset",
      zone: "bakery",
      note: "Roof rafters ignite violently across both eaves as smoke and flames expand.",
      stage: (t) => {
        const grow = ease(ramp(t, 0, 1.4));
        return (
          <>
            <Blaze position={[PLACE.bakery[0] + 0.4, 3.2, PLACE.bakery[2] - 2.3]} size={0.55 + grow * 0.45} height={1.0 + grow * 0.65} count={22} />
            <Blaze position={[PLACE.bakery[0] - 0.45, 3.25, PLACE.bakery[2] - 2.3]} size={0.35 + grow * 0.4} height={0.8 + grow * 0.6} count={18} seed={3} />
            <EmberDrift position={[PLACE.bakery[0] + 0.2, 2.5, PLACE.bakery[2] - 1.9]} area={[2.4, 2.0, 2.0]} count={26} />
            <FireLight position={[PLACE.bakery[0], 2.3, PLACE.bakery[2] - 1.6]} power={2.0 + grow * 0.6} />
          </>
        );
      },
    },
    {
      cue: "6.fire",
      ...cam.whip({
        from: [PLACE.bakery[0] - 2.4, 2.4, PLACE.bakery[2] + 3.2],
        on: [PLACE.bakery[0] - 0.6, 2.4, PLACE.bakery[2] - 2.0],
        onTo: [PLACE.bakery[0] + 0.6, 3.0, PLACE.bakery[2] - 2.3],
        fov: 42,
        ease: "inOutSine",
      }),
      impacts: [{ at: boomWord, amp: 0.035, dur: 0.3 }],
      screenOffset: [0, 0.08],
      look: "overworld-sunset",
      zone: "bakery",
      note: "Snap whip-pan with blast impact across roaring twin Blaze towers and rising black smoke plume.",
      stage: (t) => (
        <>
          <Blaze position={[PLACE.bakery[0] - 0.6, 3.3, PLACE.bakery[2] - 2.3]} size={0.8 + t * 0.2} height={1.7 + t * 0.3} count={22} seed={1} />
          <Blaze position={[PLACE.bakery[0] + 0.6, 3.3, PLACE.bakery[2] - 2.3]} size={0.8 + t * 0.2} height={1.7 + t * 0.3} count={22} seed={2} />
          <Smoke position={[PLACE.bakery[0], 4.2 + t * 0.55, PLACE.bakery[2] - 2.3]} rise={2.5} count={14} />
          <FireLight position={[PLACE.bakery[0], 2.5, PLACE.bakery[2] - 1.5]} power={2.5} />
        </>
      ),
    },
    {
      cue: "6.trap",
      ...cam.orbit({
        on: [PLACE.bakery[0], 1.1, PLACE.bakery[2] - 0.1],
        dist: 4.7,
        distTo: 3.4,
        yaw: -20,
        yawTo: 24,
        pitch: 12,
        fov: 42,
        screenOffset: [0, 0.05],
      }),
      look: "overworld-sunset",
      zone: "bakery",
      note: "All 4 kids duck & scramble anxiously behind wooden bakery counter beneath blazing roof beams.",
      stage: (t) => {
        const duck = ease(ramp(t, 0, 1.1));
        return (
          <>
            <Hero position={[PLACE.bakery[0] - 0.45 + duck * 0.12, 0, PLACE.bakery[2] + 0.25 - duck * 0.2]} rotationY={0.2} animation={duck < 0.6 ? "panic" : "cower"} face="fear" time={t * 1.4} />
            <Player who={2} scale={0.8} position={[PLACE.bakery[0] + 0.42 - duck * 0.1, 0, PLACE.bakery[2] + 0.2 - duck * 0.2]} rotationY={-0.25} animation={duck < 0.6 ? "scared" : "crouch"} face="fear" time={t * 1.3} />
            <Player who={1} scale={0.8} position={[PLACE.bakery[0] - 0.25, 0, PLACE.bakery[2] - 0.45 - duck * 0.15]} rotationY={0.12} animation="panic" face="wow" time={t * 1.5} />
            <Player who={3} scale={0.8} position={[PLACE.bakery[0] + 0.28, 0, PLACE.bakery[2] - 0.5 - duck * 0.15]} rotationY={-0.15} animation="scared" face="uneasy" time={t * 1.4} />
            <Blaze position={[PLACE.bakery[0] - 0.7, 3.0, PLACE.bakery[2] - 2.3]} size={0.75 + t * 0.1} height={1.5} count={18} seed={3} />
            <Blaze position={[PLACE.bakery[0] + 0.7, 3.0, PLACE.bakery[2] - 2.3]} size={0.75 + t * 0.1} height={1.5} count={18} seed={4} />
            <EmberDrift position={[PLACE.bakery[0], 1.4, PLACE.bakery[2]]} area={[2.4, 2.2, 2.4]} count={24} />
          </>
        );
      },
    },
    {
      cue: "6.smoke",
      ...cam.push({
        on: [PLACE.bakery[0] - 0.34, 1.05, PLACE.bakery[2] + 0.05],
        dist: 2.9,
        to: 1.72,
        yaw: 16,
        pitch: 5,
        fov: 38,
        screenOffset: [0, 0.12],
      }),
      look: "overworld-sunset",
      zone: "bakery",
      note: "Hero shrinks downward coughing & shielding eyes as embers swirl past lens.",
      stage: (t) => {
        const drop = ease(ramp(t, 0, 1.2));
        return (
          <>
            <Hero
              position={[PLACE.bakery[0] - 0.34 - drop * 0.1, 0, PLACE.bakery[2] + 0.05 + drop * 0.15]}
              rotationY={0.18 + Math.sin(t * 9) * 0.14}
              animation={drop > 0.45 ? "cower" : "panic"}
              face="fear"
              time={t * 1.5}
            />
            <EmberDrift position={[PLACE.bakery[0] - 0.34, 1.2 + drop * 0.2, PLACE.bakery[2] + 0.2]} area={[1.6, 1.6, 1.6]} count={20} />
            <FireLight position={[PLACE.bakery[0], 1.8, PLACE.bakery[2] - 1.2]} power={2.2 + Math.sin(t * 16) * 0.3} />
          </>
        );
      },
    },
  ],
});
