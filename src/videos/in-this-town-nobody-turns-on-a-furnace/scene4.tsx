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
  title: "Bakery Overheat & Fire Trap",
  shots: [
    {
      cue: "6.cake",
      ...cam.push({
        on: [PLACE.bakery[0] + 1.2, 0.9, PLACE.bakery[2] - 0.9],
        dist: 3.1,
        to: 2.55,
        yaw: 16,
        pitch: 10,
        fov: 38,
      }),
      zone: "bakery",
      note: "Passing Player cranks the bakery double-furnace to bake stacked cakes in hot dry air.",
      stage: (t) => (
        <>
          <Player who={4} position={[PLACE.bakery[0] + 0.5, 0, PLACE.bakery[2] - 0.5]} rotationY={0.85} animation="press" face="grin" time={t} />
          <EmberDrift position={[PLACE.bakery[0] + 1.6, 0.7, PLACE.bakery[2] - 0.8]} area={[1.4, 1.6, 1.4]} count={14} />
        </>
      ),
    },
    {
      cue: "6.spark",
      ...cam.push({
        on: [PLACE.bakery[0] + 1.3, 1.4, PLACE.bakery[2] - 1.2],
        dist: 3.2,
        to: 2.6,
        yaw: -14,
        pitch: -6,
        fov: 40,
      }),
      zone: "bakery",
      note: "Glowing sparks fly upward toward dry oak beams beside NO FIRE warning chat.",
      stage: (t) => (
        <>
          <EmberDrift position={[PLACE.bakery[0] + 1.4, 1.6, PLACE.bakery[2] - 1.4]} area={[1.8, 2.2, 1.8]} count={26} />
          <ChatToast text="STOP! TOO HOT!" sender="Baker" position={[PLACE.bakery[0] + 0.3, 1.85, PLACE.bakery[2] - 0.6]} height={0.22 * pop(t, 0.25)} />
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
      note: "Whip pan onto the bakery roof exploding into Blaze flames and thick rising Smoke.",
      stage: (t) => (
        <>
          <Blaze position={[PLACE.bakery[0], 2.8, PLACE.bakery[2] - 2.2]} size={3.2} height={1.9} />
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
      note: "Hero and three kids huddle trapped behind the burning wooden counter.",
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
