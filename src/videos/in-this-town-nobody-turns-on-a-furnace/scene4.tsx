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
  pop,
  storyScene,
  timing,
} from "./kit";

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Bakery Overheat & Four Kids Trapped",
  shots: [
    {
      cue: "6.cake",
      ...cam.push({
        on: [PLACE.bakery[0] + 1.1, 1.0, PLACE.bakery[2] - 0.8],
        dist: 3.3,
        to: 2.7,
        yaw: 16,
        pitch: 10,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      look: "overworld-golden",
      zone: "bakery",
      note: "Passing Player excitedly presses both glowing bakery furnaces.",
      stage: (t) => (
        <>
          <Player who={4} position={[PLACE.bakery[0] + 0.65, 0, PLACE.bakery[2] - 0.5]} rotationY={0.85} animation="press" face="grin" time={t} />
          <EmberDrift position={[PLACE.bakery[0] + 1.65, 0.8, PLACE.bakery[2] - 0.9]} area={[1.4, 1.6, 1.4]} count={16} />
        </>
      ),
    },
    {
      cue: "6.over",
      ...cam.push({
        on: [PLACE.bakery[0] + 1.85, 0.7, PLACE.bakery[2] - 1.1],
        dist: 2.1,
        to: 1.65,
        yaw: -14,
        pitch: 6,
        fov: 38,
        screenOffset: [0, 0.1],
      }),
      look: "overworld-golden",
      zone: "bakery",
      note: "Close insert on twin roaring furnaces spitting rising sparks and pulsing FireLight.",
      stage: (t) => (
        <>
          <EmberDrift position={[PLACE.bakery[0] + 1.85, 0.8 + t * 0.25, PLACE.bakery[2] - 0.95]} area={[1.6, 1.8, 1.4]} count={26} />
          <FireLight position={[PLACE.bakery[0] + 1.8, 0.9, PLACE.bakery[2] - 0.8]} power={2.1 + Math.sin(t * 14) * 0.3} />
        </>
      ),
    },
    {
      cue: "6.spark",
      ...cam.push({
        on: [PLACE.bakery[0] + 0.3, 1.5, PLACE.bakery[2] - 0.8],
        dist: 3.4,
        to: 2.8,
        yaw: -12,
        pitch: -5,
        fov: 40,
        screenOffset: [0, 0.1],
      }),
      look: "overworld-golden",
      zone: "bakery",
      note: "Upward shot tracking embers past centered Baker STOP TOO HOT chat alert.",
      stage: (t) => (
        <>
          <EmberDrift position={[PLACE.bakery[0] + 1.0, 1.7 + t * 0.2, PLACE.bakery[2] - 1.3]} area={[1.8, 2.2, 1.8]} count={28} />
          <ChatToast text="STOP! TOO HOT!" sender="Baker" position={[PLACE.bakery[0] + 0.25, 2.05, PLACE.bakery[2] - 0.6]} height={0.2 * pop(t, 0.2)} />
        </>
      ),
    },
    {
      cue: "6.roof",
      ...cam.push({
        on: [PLACE.bakery[0], 2.3, PLACE.bakery[2] - 2.0],
        dist: 3.6,
        to: 2.9,
        yaw: 12,
        pitch: -4,
        fov: 40,
        screenOffset: [0, 0.08],
      }),
      look: "overworld-sunset",
      zone: "bakery",
      note: "Roof eaves ignite as dry oak beams catch expanding orange flame.",
      stage: (t) => (
        <>
          <Blaze position={[PLACE.bakery[0] + 0.4, 2.7, PLACE.bakery[2] - 2.1]} size={1.4 + t * 0.65} height={1.1 + t * 0.35} />
          <EmberDrift position={[PLACE.bakery[0] + 0.3, 2.4, PLACE.bakery[2] - 1.9]} area={[2.2, 2.0, 2.0]} count={24} />
          <FireLight position={[PLACE.bakery[0], 2.3, PLACE.bakery[2] - 1.6]} power={2.2} />
        </>
      ),
    },
    {
      cue: "6.fire",
      ...cam.whip({
        from: [PLACE.bakery[0] - 2.4, 2.4, PLACE.bakery[2] + 3.2],
        on: [PLACE.bakery[0] - 0.5, 2.1, PLACE.bakery[2] - 1.6],
        onTo: [PLACE.bakery[0] + 0.5, 2.6, PLACE.bakery[2] - 2.0],
        fov: 42,
      }),
      screenOffset: [0, 0.08],
      look: "overworld-sunset",
      zone: "bakery",
      note: "Dramatic whip pan onto the timber bakery roof exploding in roaring Blaze and rising Smoke.",
      stage: (t) => (
        <>
          <Blaze position={[PLACE.bakery[0], 2.8, PLACE.bakery[2] - 2.2]} size={3.0 + t * 0.25} height={1.85} />
          <Smoke position={[PLACE.bakery[0], 4.0 + t * 0.4, PLACE.bakery[2] - 2.2]} rise={2.5} count={14} />
          <FireLight position={[PLACE.bakery[0], 2.5, PLACE.bakery[2] - 1.5]} power={2.4} />
        </>
      ),
    },
    {
      cue: "6.trap",
      ...cam.push({
        on: [PLACE.bakery[0], 1.15, PLACE.bakery[2] + 0.1],
        dist: 3.8,
        to: 3.15,
        yaw: -8,
        pitch: 9,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      look: "overworld-sunset",
      zone: "bakery",
      note: "Exact 4-kid continuity: Hero and 3 other kids crouch behind the counter inside burning bakery.",
      stage: (t) => (
        <>
          <Hero position={[PLACE.bakery[0] - 0.34, 0, PLACE.bakery[2] + 0.05]} rotationY={0.2} animation="panic" face="fear" time={t} />
          <Player who={2} scale={0.8} position={[PLACE.bakery[0] + 0.34, 0, PLACE.bakery[2] + 0.0]} rotationY={-0.25} animation="cower" face="fear" time={t} />
          <Player who={1} scale={0.8} position={[PLACE.bakery[0] - 0.18, 0, PLACE.bakery[2] - 0.6]} rotationY={0.12} animation="panic" face="wow" time={t} />
          <Player who={3} scale={0.8} position={[PLACE.bakery[0] + 0.28, 0, PLACE.bakery[2] - 0.65]} rotationY={-0.15} animation="cower" face="uneasy" time={t} />
          <Blaze position={[PLACE.bakery[0], 2.6, PLACE.bakery[2] - 2.0]} size={2.8} height={1.6} />
          <EmberDrift position={[PLACE.bakery[0], 1.4, PLACE.bakery[2]]} area={[2.6, 2.4, 2.6]} count={22} />
        </>
      ),
    },
    {
      cue: "6.smoke",
      ...cam.push({
        on: [PLACE.bakery[0] - 0.34, 1.15, PLACE.bakery[2] + 0.05],
        dist: 2.2,
        to: 1.75,
        yaw: 12,
        pitch: 4,
        fov: 38,
        screenOffset: [0, 0.14],
      }),
      look: "overworld-sunset",
      zone: "bakery",
      note: "Tight close-up on Hero's terrified face framed by falling sparks.",
      stage: (t) => (
        <>
          <Hero position={[PLACE.bakery[0] - 0.34, 0, PLACE.bakery[2] + 0.05]} rotationY={0.18} animation="cower" face="fear" time={t} />
          <FireLight position={[PLACE.bakery[0], 1.8, PLACE.bakery[2] - 1.2]} power={2.2} />
        </>
      ),
    },
  ],
});
