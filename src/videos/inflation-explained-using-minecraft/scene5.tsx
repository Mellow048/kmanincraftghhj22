import {
  Balance,
  BarChart,
  Bread,
  CitizenLead,
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
} from "./kit";

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Overtime Grind, Chart & Value Halved",
  shots: [
    {
      cue: "7.work",
      ...cam.push({
        on: on(PLACE.mine, 0, 1.15, 0.2),
        dist: 3.4,
        to: 2.75,
        yaw: 16,
        pitch: 10,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      look: "overworld-night",
      zone: "mine",
      note: "Miles mines late into night under torches at emerald shaft beside glowing OVERTIME tag.",
      stage: (t) => (
        <>
          <CitizenLead position={on(PLACE.mine, -0.05, 0, 0.2)} rotationY={-0.3} animation="press" face="worried" time={t * 1.4}>
            <Pickaxe position={[0, -0.15, 0.22]} rotation={[1.2, 0, 0]} scale={0.9} />
          </CitizenLead>
          <FloatingNumber text="OVERTIME" color="#ff8e2b" position={on(PLACE.mine, 0, 2.1, 0.2)} height={0.28 * pop(t, 0.2)} />
        </>
      ),
    },
    {
      cue: "7.chart",
      ...cam.push({
        on: on(PLACE.bakery, 0, 1.45, -0.05),
        dist: 5.5,
        to: 4.8,
        yaw: 10,
        pitch: 6,
        fov: 42,
        screenOffset: [0, 0.04],
      }),
      zone: "bakery",
      note: "Compact BarChart with full BREAD & CASH labels cleanly visible beside Miles inside 9:16.",
      stage: (t) => (
        <>
          <BarChart position={on(PLACE.bakery, 0.35, 0, -0.35)} width={0.46} gap={0.22} labelHeight={0.22} values={[0.9, 2.8]} labels={["BREAD", "CASH"]} grow={[1, 0.35 + 0.65 * ease(ramp(t, 0.1, 1.1))]} />
          <CitizenLead position={on(PLACE.bakery, -0.52, 0, 0.5)} rotationY={0.5} animation="lookAround" face="uneasy" time={t} />
        </>
      ),
    },
    {
      cue: "7.flat",
      ...cam.push({
        on: on(PLACE.bakery, -0.1, 1.15, 0.1),
        dist: 4.0,
        to: 3.4,
        yaw: -12,
        pitch: 7,
        fov: 40,
        screenOffset: [0, 0.05],
      }),
      zone: "bakery",
      note: "Close comparison of stunted low BREAD bar beside shrugging Miles.",
      stage: (t) => (
        <>
          <BarChart position={on(PLACE.bakery, 0.32, 0, -0.35)} width={0.46} gap={0.22} labelHeight={0.22} values={[0.9, 2.8]} labels={["BREAD", "CASH"]} grow={[1, 1]} />
          <CitizenLead position={on(PLACE.bakery, -0.5, 0, 0.45)} rotationY={0.45} animation="shrug" face="frown" time={t} />
          <FloatingNumber text="STILL 1" color="#ff8e2b" position={on(PLACE.bakery, -0.1, 1.65, -0.1)} height={0.28 * pop(t, 0.2)} />
        </>
      ),
    },
    {
      cue: "7.value",
      ...cam.orbit({
        on: on(PLACE.bakery, 0, 1.2, 0),
        dist: 4.6,
        yaw: -14,
        yawTo: 14,
        pitch: 8,
        fov: 42,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "Golden Balance scale cleanly framed inside 9:16 weighting 1 Bread against 10 emerald coins.",
      stage: (t) => (
        <Balance position={on(PLACE.bakery, 0, 0, 0)} tilt={-0.65 * ease(ramp(t, 0.1, 0.9))} left={<Bread scale={1.1} />} right={<CoinStack count={10} kind="emerald" />} />
      ),
    },
    {
      cue: "7.half",
      ...cam.push({
        on: on(PLACE.bakery, 0, 1.35, 0),
        dist: 3.7,
        to: 3.1,
        yaw: 12,
        pitch: 6,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "Red -50% VALUE warning pulses above the heavily tilted emerald side of scale.",
      stage: (t) => (
        <>
          <Balance position={on(PLACE.bakery, 0, 0, 0)} tilt={-0.65 - Math.sin(t * 4) * 0.05} left={<Bread scale={1.1} />} right={<CoinStack count={10} kind="emerald" />} />
          <FloatingNumber text="-50% VALUE" color="#ff4f42" position={on(PLACE.bakery, 0.3, 2.05, 0.1)} height={0.28 * pop(t, 0.15)} />
        </>
      ),
    },
  ],
});
