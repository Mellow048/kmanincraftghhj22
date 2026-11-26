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
        dist: 5.0,
        to: 4.0,
        yaw: 18,
        pitch: 10,
        fov: 45,
        screenOffset: [0, 0.06],
      }),
      impacts: [{ at: 0.45, amp: 0.02, dur: 0.18 }, { at: 0.95, amp: 0.02, dur: 0.18 }],
      look: "overworld-night",
      zone: "mine",
      note: "Miles hacks furiously into emerald vein under flickering torches as OVERTIME pops cleanly.",
      stage: (t) => {
        const dig = ease(ramp(t, 0, 1.4));
        return (
          <>
            <CitizenLead position={on(PLACE.mine, -0.15 + dig * 0.18, 0, 0.45 - dig * 0.35)} rotationY={-0.3} animation="press" face="worried" time={t * 1.8}>
              <Pickaxe position={[0, -0.15, 0.22]} rotation={[1.2, 0, 0]} scale={0.95} />
            </CitizenLead>
            <Coin position={on(PLACE.mine, 0.15, 0.95 + Math.abs(Math.sin(t * 7)) * 0.35, -0.1)} kind="emerald" spin={t * 6} size={0.3} />
            <FloatingNumber text="OVERTIME" color="#ff8e2b" position={on(PLACE.mine, 0, 2.05 + dig * 0.15, 0.2)} height={0.2 * pop(t, 0.2)} />
          </>
        );
      },
    },
    {
      cue: "7.chart",
      ...cam.crane({
        on: on(PLACE.history, 0, 1.35, 0.35),
        onTo: on(PLACE.history, 0, 1.75, 0.35),
        dist: 6.2,
        toDist: 5.0,
        yaw: 14,
        fromPitch: 12,
        toPitch: 4,
        fov: 46,
        screenOffset: [0, 0.05],
      }),
      zone: "history",
      note: "Wide Plaza BarChart: green CASH tower shoots upward while Miles stands cleanly to left.",
      stage: (t) => {
        const shoot = ease(ramp(t, 0.08, 1.25));
        return (
          <>
            <BarChart position={on(PLACE.history, 0.42, 0, 0.35)} width={0.44} gap={0.22} labelHeight={0.18} values={[0.65, 2.25]} labels={["BREAD", "CASH"]} grow={[1, 0.28 + 0.72 * shoot]} />
            <CitizenLead
              position={on(PLACE.history, -1.0, 0, 0.55)}
              rotationY={0.65}
              animation={shoot > 0.6 ? "panic" : "lookAround"}
              face={shoot > 0.6 ? "wow" : "uneasy"}
              lookAt={on(PLACE.history, 0.42, 0.8 + shoot * 1.6, 0.35)}
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "7.flat",
      ...cam.push({
        on: on(PLACE.history, 0, 1.25, 0.35),
        dist: 5.6,
        to: 4.6,
        yaw: -14,
        pitch: 9,
        fov: 46,
        screenOffset: [0, 0.05],
      }),
      zone: "history",
      note: "Wide Plaza BarChart beside Miles shrugging beside flat low BREAD pillar.",
      stage: (t) => {
        const tap = ease(ramp(t, 0, 1.2));
        return (
          <>
            <BarChart position={on(PLACE.history, 0.42, 0, 0.35)} width={0.44} gap={0.22} labelHeight={0.18} values={[0.65, 2.25]} labels={["BREAD", "CASH"]} grow={[1, 1]} />
            <CitizenLead position={on(PLACE.history, -1.0, 0, 0.55)} rotationY={0.65} animation={tap < 0.55 ? "point" : "shrug"} face="frown" time={t} />
            <FloatingNumber text="STILL 1" color="#ff8e2b" position={on(PLACE.history, 0, 1.9 + tap * 0.15, 0.45)} height={0.2 * pop(t, 0.2)} />
          </>
        );
      },
    },
    {
      cue: "7.value",
      ...cam.orbit({
        on: on(PLACE.history, 0, 1.2, 0.15),
        dist: 5.6,
        distTo: 4.6,
        yaw: -24,
        yawTo: 22,
        pitch: 10,
        fov: 46,
        screenOffset: [0, 0.06],
      }),
      zone: "history",
      note: "Unobstructed golden Balance scale in Plaza tipping sharply under heavy 10 emerald coin stack.",
      stage: (t) => {
        const tip = ease(ramp(t, 0.05, 1.1));
        return <Balance position={on(PLACE.history, 0, 0, 0.15)} tilt={-0.75 * tip} left={<Bread scale={1.1} />} right={<CoinStack count={Math.max(2, Math.round(tip * 10))} kind="emerald" />} />;
      },
    },
    {
      cue: "7.half",
      ...cam.push({
        on: on(PLACE.history, 0, 1.3, 0.15),
        dist: 5.2,
        to: 4.2,
        yaw: 16,
        pitch: 9,
        fov: 45,
        screenOffset: [0, 0.06],
      }),
      impacts: [{ at: Math.min(0.65, dropScale), amp: 0.025, dur: 0.24 }],
      zone: "history",
      note: "Scale crashes cleanly onto heavy emerald side with -50% VALUE readable in center.",
      stage: (t) => {
        const fall = ease(ramp(t, 0.05, 0.95));
        return (
          <>
            <Balance position={on(PLACE.history, 0, 0, 0.15)} tilt={-0.45 - fall * 0.45 - Math.sin(t * 7) * 0.05} left={<Bread scale={1.1} />} right={<CoinStack count={10} kind="emerald" />} />
            <FloatingNumber text="-50% VALUE" color="#ff4f42" position={on(PLACE.history, 0, 2.05 + fall * 0.2, 0.15)} height={0.2 * pop(t, 0.15)} />
          </>
        );
      },
    },
  ],
});
