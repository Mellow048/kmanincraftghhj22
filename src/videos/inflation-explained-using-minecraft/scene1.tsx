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
  dist: 5.4,
  to: 4.4,
  yaw: 12,
  pitch: 10,
  fov: 46,
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
        on: on(PLACE.history, 0, 1.2, 0.25),
        dist: 5.8,
        distTo: 4.8,
        yaw: -24,
        yawTo: 20,
        pitch: 12,
        fov: 46,
        screenOffset: [0, 0.06],
      }),
      zone: "history",
      note: "Wide sunlit Plaza: emerald CoinPile + cheering crowd beside +CASH while Miles runs along left flank.",
      stage: (t) => {
        const rush = ease(ramp(t, 0, Math.max(0.5, paradoxRich)));
        const step = Math.min(1, rush / 0.7);
        return (
          <>
            <CoinPile position={on(PLACE.history, 0.15, 0, 0.2)} count={14 + Math.round(rush * 8)} kind="emerald" spread={0.75} />
            <Coin position={on(PLACE.history, 0.15, 1.2 + Math.sin(t * 7) * 0.25, 0.2)} kind="emerald" spin={t * 6} size={0.35} />
            <FloatingNumber text="+CASH" color="#3fd46a" position={on(PLACE.history, 0, 2.0 + rush * 0.2, 0.2)} height={0.22 * pop(t, 0.15)} />
            <CitizenLead
              position={on(PLACE.history, -1.45 + step * 0.45, 0, 0.45 + step * 0.2)}
              rotationY={rush < 0.7 ? Math.atan2(0.45, 0.2) : 0.55}
              animation={rush < 0.7 ? "run" : "jump"}
              animDistance={step * 0.8}
              face="grin"
              time={t}
            />
            <ExplainerCrowd
              positions={[on(PLACE.history, 1.15 - rush * 0.2, 0, -0.15)]}
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
        on: on(PLACE.bakery, 0, 1.25, -0.15),
        dist: 5.2,
        to: 4.3,
        yaw: 14,
        pitch: 10,
        fov: 46,
        screenOffset: [0, 0.05],
      }),
      impacts: [{ at: affordLess, amp: 0.02, dur: 0.2 }],
      zone: "bakery",
      note: "Loaf shrinks cleanly on plinth under unobstructed -VALUE while Miles stands clear to the right.",
      stage: (t) => {
        const shrink = ease(ramp(t, 0.1, 1.25));
        return (
          <>
            <Bread position={on(PLACE.bakery, -0.35, 0.96, -0.5)} scale={Math.max(0.62, 1.3 - shrink * 0.68)} />
            <CitizenLead
              position={on(PLACE.bakery, 1.05, 0, 0.35)}
              rotationY={-0.65}
              animation={shrink < 0.6 ? "reach" : "shrug"}
              face={t > affordLess ? "ouch" : "worried"}
              time={t}
            />
            <FloatingNumber text="-VALUE" color="#ff4f42" position={on(PLACE.bakery, -0.35, 2.05 - shrink * 0.1, -0.45)} height={0.2 * pop(t, 0.2)} />
          </>
        );
      },
    },
    {
      cue: "2.bread",
      ...cam.orbit({
        on: on(PLACE.bakery, 0, 1.3, -0.45),
        dist: 5.0,
        distTo: 4.2,
        yaw: -22,
        yawTo: 16,
        pitch: 10,
        fov: 45,
        screenOffset: [0, 0.05],
      }),
      zone: "bakery",
      note: "Golden loaf and crisp PriceTag 1 sit cleanly in open frame with emerald Coin and Miles on left.",
      stage: (t) => {
        const pay = ease(ramp(t, 0.1, 1.2));
        return (
          <>
            <Bread position={on(PLACE.bakery, 0.05, 0.96, -0.55)} scale={1.35} />
            <PriceTag text="1" position={on(PLACE.bakery, 0.05, 2.2, -0.55)} scale={pop(t, 0.15)} />
            <Coin position={on(PLACE.bakery, 0.85 - pay * 0.2, 1.25 + Math.sin(t * 4) * 0.08, -0.25)} kind="emerald" spin={t * 4.5} size={0.42} />
            <CitizenLead position={on(PLACE.bakery, -1.15, 0, 0.15)} rotationY={0.85} animation="reach" face="smile" time={t} />
          </>
        );
      },
    },
    {
      cue: "2.miles",
      ...cam.orbit({
        on: on(PLACE.mine, 0, 1.15, 0.1),
        dist: 5.2,
        distTo: 4.2,
        yaw: -24,
        yawTo: 20,
        pitch: 10,
        fov: 45,
        screenOffset: [0, 0.08],
      }),
      impacts: [{ at: mineHit, amp: 0.022, dur: 0.2 }],
      zone: "mine",
      note: "Wide mine shot: Miles steps forward swinging Pickaxe right into emerald ore shaft.",
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
            <Coin position={on(PLACE.mine, -0.3, 0.8 + Math.max(0, Math.sin(t * 7)) * 0.4, -0.2)} kind="emerald" spin={t * 5} size={0.32} />
          </>
        );
      },
    },
    {
      cue: "2.happy",
      ...cam.truck({
        on: on(PLACE.history, -0.45, 1.2, 0.35),
        by: [1.55, 0, 0],
        dist: 5.2,
        yaw: 14,
        pitch: 10,
        fov: 46,
        screenOffset: [0, 0.06],
      }),
      zone: "history",
      note: "Wide tracking shot across sunny Town Plaza as Miles walks happily home cradling his loaf.",
      stage: (t) => (
        <CitizenLead position={on(PLACE.history, -0.75 + t * 1.35, 0, 0.25 + t * 0.45)} rotationY={Math.atan2(1.35, 0.45)} animation="walk" animDistance={t * 2.1} face="smile">
          <Bread position={[0, -0.05, 0.2]} scale={0.78} />
        </CitizenLead>
      ),
    },
  ],
});
