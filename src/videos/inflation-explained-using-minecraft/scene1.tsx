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

/** Shared Frame-0 & Final-Loop camera config (`1.hook` == `8.loop` for seamless replay). */
export const CLIMAX_HOOK_OPT = {
  on: on(PLACE.bakery, 0, 1.35, -0.5),
  dist: 3.8,
  to: 3.1,
  yaw: 14,
  pitch: 8,
  fov: 40,
};

const mineHit = wordAt("2.miles", "mine");

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Climax Opener, Paradox & Day-One Bread",
  shots: [
    {
      cue: "1.hook",
      ...cam.push(CLIMAX_HOOK_OPT),
      zone: "bakery",
      note: "Frame-0 climax: bread price flips 1->100 while Printer floods emeralds between Miles & Sterling.",
      stage: (t) => {
        const surge = ease(ramp(t, 0.12, 0.92));
        return (
          <>
            <Bread position={on(PLACE.bakery, 0, 0.96, -0.6)} scale={1.7} />
            <PriceTag
              text={surge > 0.45 ? "100" : "1"}
              position={on(PLACE.bakery, 0, 1.9, -0.5)}
              scale={1.2 + surge * 0.25}
              swing={Math.sin(t * 6) * 0.14}
            />
            <Printer position={on(PLACE.bakery, -1.2, 0, -0.8)} rotationY={0.45} running out={t * 6} sign="E" />
            <CitizenLead
              position={on(PLACE.bakery, 1.05, 0, 0.1)}
              rotationY={-0.6}
              animation="panic"
              face="wow"
              lookAt={on(PLACE.bakery, 0, 1.2, -0.6)}
              time={t}
            />
            <EliteLead
              variant="pres"
              position={on(PLACE.bakery, -1.4, 0, 0.2)}
              rotationY={0.65}
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
        on: on(PLACE.bakery, 0, 1.25, 0.2),
        dist: 4.1,
        yaw: -16,
        yawTo: 12,
        pitch: 12,
        fov: 42,
      }),
      zone: "bakery",
      note: "Paradox setup: glowing +CASH floating over eager pile of emeralds.",
      stage: (t) => (
        <>
          <CoinPile position={on(PLACE.bakery, 0, 0, 0.2)} count={18} kind="emerald" spread={0.75} />
          <FloatingNumber text="+CASH" color="#3fd46a" position={on(PLACE.bakery, 0, 1.45, 0.2)} height={0.62 * pop(t, 0.15)} />
          <CitizenLead position={on(PLACE.bakery, -1.0, 0, 0.4)} rotationY={0.65} animation="cheer" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "1.reverse",
      ...cam.push({
        on: on(PLACE.bakery, 0, 1.3, 0.2),
        dist: 3.3,
        to: 2.65,
        yaw: 12,
        pitch: 9,
        fov: 38,
      }),
      zone: "bakery",
      note: "Snap twist: Miles holds a shrinking loaf while red -BUYING POWER pops above.",
      stage: (t) => (
        <>
          <Bread position={on(PLACE.bakery, 0, 0.96, -0.6)} scale={Math.max(0.85, 1.7 - ease(ramp(t, 0.1, 1.1)) * 0.7)} />
          <CitizenLead position={on(PLACE.bakery, 0.85, 0, 0.2)} rotationY={-0.65} animation="shrug" face="worried" time={t} />
          <FloatingNumber text="-VALUE" color="#ff4f42" position={on(PLACE.bakery, -0.1, 1.9, -0.4)} height={0.58 * pop(t, 0.2)} />
        </>
      ),
    },
    {
      cue: "2.bread",
      ...cam.push({
        on: on(PLACE.bakery, 0.1, 1.25, -0.6),
        dist: 3.1,
        to: 2.55,
        yaw: -14,
        pitch: 10,
        fov: 38,
      }),
      zone: "bakery",
      note: "Anchor shot: golden Bread loaf on plinth with PriceTag 1 and spinning emerald.",
      stage: (t) => (
        <>
          <Bread position={on(PLACE.bakery, 0, 0.96, -0.6)} scale={1.8} />
          <PriceTag text="1" position={on(PLACE.bakery, 0, 1.85, -0.55)} scale={pop(t, 0.15) * 1.2} />
          <Coin position={on(PLACE.bakery, 0.72, 1.28, -0.4)} kind="emerald" spin={t * 3.5} size={0.44} />
        </>
      ),
    },
    {
      cue: "2.miles",
      ...cam.orbit({
        on: on(PLACE.mine, 0, 1.15, 0),
        dist: 3.6,
        yaw: -18,
        yawTo: 8,
        pitch: 8,
        fov: 40,
      }),
      zone: "mine",
      note: "Introduce Character 1 (Miles) mining with a wooden Pickaxe outside the shaft.",
      stage: (t) => (
        <CitizenLead nameTag="Miles" position={on(PLACE.mine, -0.1, 0, 0.2)} rotationY={-0.35} animation="press" face="calm" time={t + mineHit}>
          <Pickaxe position={[0, -0.15, 0.22]} rotation={[1.2, 0, 0]} scale={0.9} />
        </CitizenLead>
      ),
    },
    {
      cue: "2.miles",
      cut: 1.4,
      ...cam.truck({
        on: on(PLACE.bakery, -0.3, 1.1, 0.4),
        dist: 3.4,
        yaw: 12,
        pitch: 8,
        by: [1.3, 0, 0],
        fov: 40,
      }),
      zone: "bakery",
      note: "Sub-cut to Miles walking happily home holding his freshly bought Bread.",
      stage: (t) => (
        <CitizenLead position={on(PLACE.bakery, -0.4 + t * 0.9, 0, 0.4)} rotationY={0.2} animation="walk" animDistance={t * 1.4} face="smile">
          <Bread position={[0, -0.05, 0.2]} scale={0.75} />
        </CitizenLead>
      ),
    },
  ],
});
