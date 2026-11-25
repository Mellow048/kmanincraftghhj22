import {
  Blaze,
  ChatToast,
  EmberDrift,
  FireLight,
  FloatingNumber,
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
} from "./kit";

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Summer Heatwave & Bakery Blaze",
  shots: [
    {
      cue: "5.heat",
      ...cam.crane({
        on: [0, 1.4, 1.5],
        dist: 4.9,
        fromPitch: 6,
        toPitch: 18,
        yaw: -14,
        fov: 42,
      }),
      zone: "town",
      note: "Dry summer heatwave over the village square with floating 42C warning.",
      stage: (t) => (
        <>
          <Hero position={[0, 0, 1.5]} rotationY={0.2} animation="idle" face="uneasy" time={t} />
          <FloatingNumber text="HEATWAVE" color="#ff8e2b" position={[0, 2.2 + ease(ramp(t, 0.1, 1.0)) * 0.2, 1.5]} height={0.6 * pop(t, 0.2)} />
        </>
      ),
    },
    {
      cue: "5.spark",
      ...cam.push({
        on: [PLACE.bakery[0] + 1.0, 0.9, PLACE.bakery[2] - 0.9],
        dist: 3.1,
        to: 2.55,
        yaw: 16,
        pitch: 10,
        fov: 38,
      }),
      zone: "bakery",
      note: "Player cranks the lit bakery furnace with sparks & embers bursting out.",
      stage: (t) => (
        <>
          <Player who={4} position={[PLACE.bakery[0] + 0.4, 0, PLACE.bakery[2] - 0.5]} rotationY={0.85} animation="press" face="grin" time={t} />
          <EmberDrift position={[PLACE.bakery[0] + 1.4, 0.7, PLACE.bakery[2] - 0.8]} area={[1.4, 1.8, 1.4]} count={18} />
        </>
      ),
    },
    {
      cue: "6.fire",
      ...cam.whip({
        from: [PLACE.bakery[0] - 2.8, 2.6, PLACE.bakery[2] + 3.4],
        on: [PLACE.bakery[0] - 0.8, 2.0, PLACE.bakery[2] - 1.5],
        onTo: [PLACE.bakery[0] + 0.6, 2.8, PLACE.bakery[2] - 2.0],
        fov: 42,
      }),
      zone: "bakery",
      note: "Whip pan onto the bakery roof exploding into Blaze flames and rising Smoke.",
      stage: (t) => (
        <>
          <Blaze position={[PLACE.bakery[0], 2.8, PLACE.bakery[2] - 2.2]} size={3.0} height={1.8} />
          <Smoke position={[PLACE.bakery[0], 4.0, PLACE.bakery[2] - 2.2]} rise={2.5} count={14} />
          <FireLight position={[PLACE.bakery[0], 2.5, PLACE.bakery[2] - 1.5]} power={2.2} />
          <ChatToast text="ROOF ON FIRE!" sender="Baker" position={[PLACE.bakery[0], 2.0, PLACE.bakery[2] + 0.2 + t * 0.001]} height={0.25 * pop(t, 0.2)} />
        </>
      ),
    },
    {
      cue: "6.trap",
      ...cam.push({
        on: [PLACE.bakery[0], 1.15, PLACE.bakery[2] + 0.4],
        dist: 3.4,
        to: 2.75,
        yaw: -10,
        pitch: 6,
        fov: 40,
      }),
      zone: "bakery",
      note: "Hero and town kids panic inside the doorway framed by flames and rising EmberDrift.",
      stage: (t) => (
        <>
          <Hero position={[PLACE.bakery[0] - 0.4, 0, PLACE.bakery[2] - 0.1]} rotationY={0.15} animation="panic" face="scared" time={t} />
          <Player who={2} scale={0.8} position={[PLACE.bakery[0] + 0.45, 0, PLACE.bakery[2] - 0.2]} rotationY={-0.2} animation="cower" face="fear" time={t} />
          <Blaze position={[PLACE.bakery[0], 2.6, PLACE.bakery[2] - 2.0]} size={2.8} height={1.6} />
          <EmberDrift position={[PLACE.bakery[0], 1.4, PLACE.bakery[2]]} area={[3, 2.5, 3]} count={20} />
        </>
      ),
    },
  ],
});
