import {
  Balance,
  BarChart,
  Bread,
  CitizenLead,
  Coin,
  CoinStack,
  FloatingNumber,
  PLACE,
  Pickaxe,
  cam,
  ease,
  on,
  pop,
  ramp,
  storyScene,
  timing,
  wordAt,
} from "./kit";

const dropScale = wordAt("7.half", "half");

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Overtime Grind, Chart & Value Halved",
  shots: [
    {
      cue: "7.work",
      ...cam.push({
        on: on(PLACE.mine, 0, 1.15, 0.2),
        dist: 3.9,
        to: 2.45,
        yaw: 18,
        pitch: 10,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      impacts: [{ at: 0.45, amp: 0.02, dur: 0.18 }, { at: 0.95, amp: 0.02, dur: 0.18 }],
      look: "overworld-night",
      zone: "mine",
      note: "Miles hacks furiously into emerald vein under flickering torches as flying chips pop outward.",
      stage: (t) => {
        const dig = ease(ramp(t, 0, 1.4));
        return (
          <>
            <CitizenLead position={on(PLACE.mine, -0.15 + dig * 0.18, 0, 0.45 - dig * 0.35)} rotationY={-0.3} animation="press" face="worried" time={t * 1.8}>
              <Pickaxe position={[0, -0.15, 0.22]} rotation={[1.2, 0, 0]} scale={0.95} />
            </CitizenLead>
            <Coin position={on(PLACE.mine, 0.15, 0.95 + Math.abs(Math.sin(t * 7)) * 0.35, -0.1)} kind="emerald" spin={t * 6} size={0.3} />
            <FloatingNumber text="OVERTIME" color="#ff8e2b" position={on(PLACE.mine, 0, 2.0 + dig * 0.22, 0.2)} height={0.28 * pop(t, 0.2)} />
          </>
        );
      },
    },
    {
      cue: "7.chart",
      ...cam.crane({
        on: on(PLACE.bakery, -0.05, 1.25, -0.05),
        onTo: on(PLACE.bakery, -0.05, 1.65, -0.05),
        dist: 5.9,
        toDist: 4.5,
        yaw: 14,
        fromPitch: 12,
        toPitch: 2,
        fov: 42,
        screenOffset: [0, 0.04],
      }),
      zone: "bakery",
      note: "Crane rises beside shooting emerald CASH pillar while Miles craned neck stares upward in disbelief.",
      stage: (t) => {
        const shoot = ease(ramp(t, 0.08, 1.25));
        return (
          <>
            <BarChart position={on(PLACE.bakery, 0.48, 0, 0.55)} width={0.44} gap={0.22} labelHeight={0.18} values={[0.65, 2.25]} labels={["BREAD", "CASH"]} grow={[1, 0.28 + 0.72 * shoot]} />
            <CitizenLead
              position={on(PLACE.bakery, -0.65, 0, 0.72)}
              rotationY={0.65}
              animation={shoot > 0.6 ? "panic" : "lookAround"}
              face={shoot > 0.6 ? "wow" : "uneasy"}
              lookAt={on(PLACE.bakery, 0.48, 0.8 + shoot * 1.6, 0.55)}
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "7.flat",
      ...cam.push({
        on: on(PLACE.bakery, -0.05, 1.25, 0.6),
        dist: 5.0,
        to: 3.9,
        yaw: -14,
        pitch: 8,
        fov: 42,
        screenOffset: [0, 0.05],
      }),
      zone: "bakery",
      note: "Miles leans closely beside stagnant low BREAD pillar tapping top flatly in frustration.",
      stage: (t) => {
        const tap = ease(ramp(t, 0, 1.2));
        return (
          <>
            <BarChart position={on(PLACE.bakery, 0.48, 0, 0.55)} width={0.44} gap={0.22} labelHeight={0.18} values={[0.65, 2.25]} labels={["BREAD", "CASH"]} grow={[1, 1]} />
            <CitizenLead position={on(PLACE.bakery, -0.65, 0, 0.72)} rotationY={0.65} animation={tap < 0.55 ? "point" : "shrug"} face="frown" time={t} />
            <FloatingNumber text="STILL 1" color="#ff8e2b" position={on(PLACE.bakery, 0.05, 1.65 + tap * 0.2, 0.6)} height={0.28 * pop(t, 0.2)} />
          </>
        );
      },
    },
    {
      cue: "7.value",
      ...cam.orbit({
        on: on(PLACE.bakery, 0, 1.2, 0),
        dist: 4.9,
        distTo: 3.6,
        yaw: -28,
        yawTo: 24,
        pitch: 8,
        fov: 42,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "Dynamic wide-to-close orbit as golden Balance tips sharply downward under heavy 10 emerald coin stack.",
      stage: (t) => {
        const tip = ease(ramp(t, 0.05, 1.1));
        return (
          <>
            <Balance position={on(PLACE.bakery, 0, 0, 0)} tilt={-0.75 * tip} left={<Bread scale={1.1} />} right={<CoinStack count={Math.max(2, Math.round(tip * 10))} kind="emerald" />} />
            <CitizenLead position={on(PLACE.bakery, -0.95, 0, 0.6)} rotationY={0.8} animation="lookAround" face="worried" time={t} />
          </>
        );
      },
    },
    {
      cue: "7.half",
      ...cam.push({
        on: on(PLACE.bakery, 0, 1.35, 0),
        dist: 4.1,
        to: 2.75,
        yaw: 16,
        pitch: 6,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      impacts: [{ at: Math.min(0.65, dropScale), amp: 0.025, dur: 0.24 }],
      zone: "bakery",
      note: "Scale crashes sharply onto heavy emerald side blasting -50% VALUE warning upward.",
      stage: (t) => {
        const fall = ease(ramp(t, 0.05, 0.95));
        return (
          <>
            <Balance position={on(PLACE.bakery, 0, 0, 0)} tilt={-0.45 - fall * 0.45 - Math.sin(t * 7) * 0.05} left={<Bread scale={1.1} />} right={<CoinStack count={10} kind="emerald" />} />
            <FloatingNumber text="-50% VALUE" color="#ff4f42" position={on(PLACE.bakery, 0.3, 1.9 + fall * 0.28, 0.1)} height={0.3 * pop(t, 0.15)} />
          </>
        );
      },
    },
  ],
});
