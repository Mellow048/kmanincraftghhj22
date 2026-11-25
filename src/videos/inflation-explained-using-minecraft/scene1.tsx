import {
  Bread,
  CitizenLead,
  Coin,
  CoinPile,
  EliteLead,
  FloatingNumber,
  PLACE,
  Pickaxe,
  PriceTag,
  Printer,
  cam,
  ease,
  on,
  pop,
  ramp,
  storyScene,
  timing,
  wordAt,
} from "./kit";

/** Shared Frame-0 & Final-Loop depth-stacked 9:16 composition (`1.hook` == `8.loop`). */
export const CLIMAX_HOOK_OPT = {
  on: on(PLACE.bakery, 0, 1.25, -0.35),
  dist: 4.4,
  to: 3.65,
  yaw: 10,
  pitch: 8,
  fov: 42,
  screenOffset: [0, 0.12] as [number, number],
};

const mineHit = wordAt("2.miles", "pickaxe");

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Climax Opener, Paradox & Day-One Bread",
  shots: [
    {
      cue: "1.hook",
      ...cam.push(CLIMAX_HOOK_OPT),
      zone: "bakery",
      note: "Frame-0 climax inside 9:16 bounds: price explodes 1->100 on Plinth while Miles panics left & Sterling cheers by Printer right.",
      stage: (t) => {
        const surge = ease(ramp(t, 0.12, 0.92));
        return (
          <>
            <Bread position={on(PLACE.bakery, 0, 0.96, -0.55)} scale={1.7} />
            <PriceTag
              text={surge > 0.45 ? "100" : "1"}
              position={on(PLACE.bakery, 0, 1.9, -0.5)}
              scale={1.2 + surge * 0.25}
              swing={Math.sin(t * 6) * 0.14}
            />
            <Printer position={on(PLACE.bakery, -0.1, 0, -1.35)} rotationY={0.15} running out={t * 6} sign="E" />
            <CitizenLead
              position={on(PLACE.bakery, -0.52, 0, 0.45)}
              rotationY={0.45}
              animation="panic"
              face="wow"
              lookAt={on(PLACE.bakery, 0, 1.2, -0.55)}
              time={t}
            />
            <EliteLead
              variant="pres"
              position={on(PLACE.bakery, 0.52, 0, -0.85)}
              rotationY={-0.35}
              animation="cheer"
              face="smug"
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "1.paradox",
      ...cam.orbit({
        on: on(PLACE.bakery, 0, 1.15, 0.25),
        dist: 3.9,
        yaw: -14,
        yawTo: 12,
        pitch: 12,
        fov: 42,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "Miles cheers excitedly beside glowing green +CASH popup over CoinPile.",
      stage: (t) => (
        <>
          <CoinPile position={on(PLACE.bakery, 0.2, 0, 0.2)} count={18} kind="emerald" spread={0.65} />
          <FloatingNumber text="+CASH" color="#3fd46a" position={on(PLACE.bakery, 0.15, 1.45, 0.2)} height={0.58 * pop(t, 0.15)} />
          <CitizenLead position={on(PLACE.bakery, -0.45, 0, 0.45)} rotationY={0.5} animation="cheer" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "1.reverse",
      ...cam.push({
        on: on(PLACE.bakery, 0, 1.25, 0.1),
        dist: 3.5,
        to: 2.8,
        yaw: 12,
        pitch: 9,
        fov: 38,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "Miles shrugs in dismay as the bread loaf shrinks beneath red -VALUE.",
      stage: (t) => (
        <>
          <Bread position={on(PLACE.bakery, -0.25, 0.96, -0.45)} scale={Math.max(0.85, 1.7 - ease(ramp(t, 0.1, 1.0)) * 0.75)} />
          <CitizenLead position={on(PLACE.bakery, 0.42, 0, 0.3)} rotationY={-0.5} animation="shrug" face="worried" time={t} />
          <FloatingNumber text="-VALUE" color="#ff4f42" position={on(PLACE.bakery, -0.2, 1.9, -0.4)} height={0.56 * pop(t, 0.2)} />
        </>
      ),
    },
    {
      cue: "2.bread",
      ...cam.push({
        on: on(PLACE.bakery, 0.05, 1.25, -0.55),
        dist: 3.1,
        to: 2.55,
        yaw: -14,
        pitch: 10,
        fov: 38,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "Day-one baseline: warm golden Bread loaf on Plinth with PriceTag 1 and spinning emerald.",
      stage: (t) => (
        <>
          <Bread position={on(PLACE.bakery, 0, 0.96, -0.55)} scale={1.8} />
          <PriceTag text="1" position={on(PLACE.bakery, 0, 1.85, -0.55)} scale={pop(t, 0.15) * 1.2} />
          <Coin position={on(PLACE.bakery, 0.55, 1.28, -0.4)} kind="emerald" spin={t * 3.5} size={0.44} />
        </>
      ),
    },
    {
      cue: "2.miles",
      ...cam.orbit({
        on: on(PLACE.mine, 0, 1.15, 0.1),
        dist: 3.5,
        yaw: -16,
        yawTo: 10,
        pitch: 8,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      zone: "mine",
      note: "Introduce Character 1 (Miles) swinging Pickaxe beside the emerald mine shaft.",
      stage: (t) => (
        <CitizenLead nameTag="Miles" position={on(PLACE.mine, 0, 0, 0.15)} rotationY={-0.3} animation="press" face="calm" time={t + mineHit}>
          <Pickaxe position={[0, -0.15, 0.22]} rotation={[1.2, 0, 0]} scale={0.9} />
        </CitizenLead>
      ),
    },
    {
      cue: "2.happy",
      ...cam.truck({
        on: on(PLACE.bakery, -0.15, 1.15, 0.4),
        dist: 3.3,
        yaw: 12,
        pitch: 8,
        by: [0.85, 0, 0],
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "Miles walks happily home across the square cradling one warm loaf of bread.",
      stage: (t) => (
        <CitizenLead position={on(PLACE.bakery, -0.3 + t * 0.75, 0, 0.4)} rotationY={0.2} animation="walk" animDistance={t * 1.4} face="smile">
          <Bread position={[0, -0.05, 0.2]} scale={0.75} />
        </CitizenLead>
      ),
    },
  ],
});
