import {
  Bill,
  Bread,
  CitizenLead,
  Coin,
  CoinPile,
  EliteLead,
  ExplainerCrowd,
  FloatingNumber,
  PLACE,
  Pickaxe,
  PriceTag,
  Printer,
  cam,
  ease,
  jolt,
  on,
  pop,
  ramp,
  storyScene,
  timing,
  wordAt,
} from "./kit";

/** Shared Frame-0 & Final-Loop depth-stacked 9:16 composition (`1.hook` == `8.loop`). */
export const CLIMAX_HOOK_OPT = {
  on: on(PLACE.bakery, 0, 1.32, -0.4),
  dist: 5.1,
  to: 3.65,
  yaw: 12,
  pitch: 8,
  fov: 42,
  screenOffset: [0, 0.05] as [number, number],
};

const hookPriceHit = wordAt("1.hook", "Minecraft");
const paradoxRich = wordAt("1.paradox", "rich");
const affordLess = wordAt("1.reverse", "less");
const mineHit = wordAt("2.miles", "pickaxe");

export const renderClimaxLoop = (t: number) => {
  const surge = ease(ramp(t, 0.1, 0.92));
  const billFly = (t * 2.1) % 1;
  return (
    <>
      <Bread position={on(PLACE.bakery, 0, 0.96, -0.55)} scale={1.25} />
      <PriceTag
        text={surge > 0.45 ? "100" : "1"}
        position={on(PLACE.bakery, 0, 2.28 + jolt(t, Math.min(0.65, hookPriceHit), 0.2), -0.5)}
        scale={1.1 + surge * 0.22}
        swing={Math.sin(t * 7) * 0.14}
      />
      <Printer position={on(PLACE.bakery, -0.42, 0, -1.45)} rotationY={0.22} running out={t * 8} sign="E" />
      <Bill position={on(PLACE.bakery, -0.42, 1.05 + billFly * 1.1, -1.1)} rotation={[0.4, billFly * 2, 0.2]} />
      <Bill position={on(PLACE.bakery, -0.15, 1.2 + ((billFly + 0.5) % 1) * 1.1, -1.0)} rotation={[-0.3, billFly * 2.2, -0.2]} />
      <CitizenLead
        position={on(PLACE.bakery, -0.78 + surge * 0.25, 0, 0.72 - surge * 0.28)}
        rotationY={0.45}
        animation={surge < 0.45 ? "reach" : "scared"}
        blendTo="run"
        blend={ease(ramp(t, 0.2, 0.65))}
        animDistance={surge * 0.6}
        face="wow"
        lookAt={on(PLACE.bakery, 0, 1.6, -0.5)}
        time={t}
      />
      <EliteLead
        variant="pres"
        position={on(PLACE.bakery, 0.75 - surge * 0.2, 0, -0.9 + surge * 0.15)}
        rotationY={-0.38}
        animation={surge > 0.4 ? "cheer" : "press"}
        face="smug"
        time={t * 1.3}
      />
    </>
  );
};

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Climax Opener, Paradox & Day-One Bread",
  shots: [
    {
      cue: "1.hook",
      ...cam.push(CLIMAX_HOOK_OPT),
      impacts: [{ at: Math.min(0.65, hookPriceHit), amp: 0.024, dur: 0.24 }],
      zone: "bakery",
      note: "Frame-0 climax: Printer showers flying bills as PriceTag slams 1->100 above Bread while Miles lunges forward and Sterling cheers.",
      stage: (t) => renderClimaxLoop(t),
    },
    {
      cue: "1.paradox",
      ...cam.orbit({
        on: on(PLACE.bakery, 0, 1.15, 0.25),
        dist: 4.5,
        distTo: 3.2,
        yaw: -28,
        yawTo: 24,
        pitch: 12,
        fov: 42,
        screenOffset: [0, 0.08],
      }),
      zone: "bakery",
      note: "Miles runs excitedly up beside overflowing CoinPile tossing shiny green coins as citizens rush in.",
      stage: (t) => {
        const rush = ease(ramp(t, 0, Math.max(0.5, paradoxRich)));
        return (
          <>
            <CoinPile position={on(PLACE.bakery, 0.22, 0, 0.2)} count={14 + Math.round(rush * 8)} kind="emerald" spread={0.65} />
            <Coin position={on(PLACE.bakery, 0.2, 1.2 + Math.sin(t * 7) * 0.25, 0.2)} kind="emerald" spin={t * 6} size={0.35} />
            <FloatingNumber text="+CASH" color="#3fd46a" position={on(PLACE.bakery, 0.15, 1.45 + rush * 0.3, 0.2)} height={0.3 * pop(t, 0.15)} />
            <CitizenLead
              position={on(PLACE.bakery, -0.95 + rush * 0.5, 0, 0.65 - rush * 0.2)}
              rotationY={0.5}
              animation={rush < 0.7 ? "run" : "jump"}
              animDistance={rush * 0.9}
              face="grin"
              time={t}
            />
            <ExplainerCrowd
              positions={[on(PLACE.bakery, 0.95 - rush * 0.25, 0, -0.15)]}
              rotationY={-0.6}
              animation="cheer"
              seed={1}
            />
          </>
        );
      },
    },
    {
      cue: "1.reverse",
      ...cam.push({
        on: on(PLACE.bakery, 0, 1.25, 0.1),
        dist: 4.1,
        to: 2.65,
        yaw: 16,
        pitch: 9,
        fov: 38,
        screenOffset: [0, 0.08],
      }),
      impacts: [{ at: affordLess, amp: 0.02, dur: 0.2 }],
      zone: "bakery",
      note: "Loaf visibly shrinks block by block as Miles lunges forward grabbing at thin air while -VALUE slams downward.",
      stage: (t) => {
        const shrink = ease(ramp(t, 0.1, 1.25));
        return (
          <>
            <Bread position={on(PLACE.bakery, -0.25, 0.96, -0.45)} scale={Math.max(0.62, 1.3 - shrink * 0.68)} />
            <CitizenLead
              position={on(PLACE.bakery, 0.65 - shrink * 0.3, 0, 0.45 - shrink * 0.15)}
              rotationY={-0.55}
              animation={shrink < 0.6 ? "reach" : "shrug"}
              animDistance={shrink * 0.45}
              face={t > affordLess ? "ouch" : "worried"}
              time={t}
            />
            <FloatingNumber text="-VALUE" color="#ff4f42" position={on(PLACE.bakery, -0.2, 1.85 - shrink * 0.15, -0.4)} height={0.32 * pop(t, 0.2)} />
          </>
        );
      },
    },
    {
      cue: "2.bread",
      ...cam.orbit({
        on: on(PLACE.bakery, 0.05, 1.35, -0.55),
        dist: 3.8,
        distTo: 2.65,
        yaw: -26,
        yawTo: 18,
        pitch: 9,
        fov: 38,
        screenOffset: [0, 0.06],
      }),
      zone: "bakery",
      note: "Miles slides one crisp emerald Coin onto plinth beside warm golden loaf as PriceTag 1 pops cleanly.",
      stage: (t) => {
        const pay = ease(ramp(t, 0.1, 1.2));
        return (
          <>
            <Bread position={on(PLACE.bakery, 0, 0.96, -0.55)} scale={1.35} />
            <PriceTag text="1" position={on(PLACE.bakery, 0, 2.25, -0.55)} scale={pop(t, 0.15) * 1.15} />
            <Coin position={on(PLACE.bakery, 0.75 - pay * 0.22, 1.25 + Math.sin(t * 4) * 0.08, -0.25 - pay * 0.15)} kind="emerald" spin={t * 4.5} size={0.44} />
            <CitizenLead position={on(PLACE.bakery, -0.65 + pay * 0.2, 0, -0.05)} rotationY={0.85} animation="reach" face="smile" time={t} />
          </>
        );
      },
    },
    {
      cue: "2.miles",
      ...cam.orbit({
        on: on(PLACE.mine, 0, 1.15, 0.1),
        dist: 4.1,
        distTo: 2.85,
        yaw: -28,
        yawTo: 22,
        pitch: 8,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      impacts: [{ at: mineHit, amp: 0.022, dur: 0.2 }],
      zone: "mine",
      note: "Miles steps forward swinging Pickaxe right into emerald ore shaft as bright green gems pop free.",
      stage: (t) => {
        const swing = ease(ramp(t, 0, 1.3));
        return (
          <>
            <CitizenLead
              nameTag="Miles"
              position={on(PLACE.mine, 0, 0, 0.55 - swing * 0.45)}
              rotationY={-0.25}
              animation={swing < 0.35 ? "walk" : "press"}
              animDistance={swing * 0.6}
              face="calm"
              time={t * 1.6 + mineHit}
            >
              <Pickaxe position={[0, -0.15, 0.22]} rotation={[1.2, 0, 0]} scale={0.95} />
            </CitizenLead>
            <Coin position={on(PLACE.mine, -0.25, 0.8 + Math.max(0, Math.sin(t * 7)) * 0.4, -0.2)} kind="emerald" spin={t * 5} size={0.32} />
          </>
        );
      },
    },
    {
      cue: "2.happy",
      ...cam.truck({
        on: on(PLACE.bakery, -0.5, 1.15, 0.4),
        by: [1.65, 0, 0],
        dist: 3.6,
        yaw: 14,
        pitch: 8,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "Linear tracking camera follows Miles walking cheerfully right across the market cradling his warm loaf.",
      stage: (t) => (
        <CitizenLead position={on(PLACE.bakery, -0.75 + t * 1.35, 0, 0.4)} rotationY={0.35} animation="walk" animDistance={t * 2.1} face="smile">
          <Bread position={[0, -0.05, 0.2]} scale={0.78} />
        </CitizenLead>
      ),
    },
  ],
});
