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
  title: "Overtime Mining, Chart & Purchasing Power",
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
      }),
      zone: "mine",
      note: "Miles hacks late at night outside the torchlit mine entrance for overtime pay.",
      stage: (t) => (
        <>
          <CitizenLead position={on(PLACE.mine, -0.1, 0, 0.2)} rotationY={-0.35} animation="press" face="worried" time={t * 1.4}>
            <Pickaxe position={[0, -0.15, 0.22]} rotation={[1.2, 0, 0]} scale={0.9} />
          </CitizenLead>
          <FloatingNumber text="OVERTIME" color="#ff8e2b" position={on(PLACE.mine, 0, 2.1, 0.2)} height={0.5 * pop(t, 0.2)} />
        </>
      ),
    },
    {
      cue: "7.chart",
      ...cam.push({
        on: on(PLACE.bakery, 0, 1.55, 0),
        dist: 4.8,
        to: 4.1,
        yaw: 12,
        pitch: 5,
        fov: 42,
      }),
      zone: "bakery",
      note: "BarChart: BREAD bar stays low while CASH shoots right past Miles's head.",
      stage: (t) => (
        <>
          <BarChart position={on(PLACE.bakery, 0.25, 0, -0.2)} values={[0.9, 2.8]} labels={["BREAD", "CASH"]} grow={[1, 0.35 + 0.65 * ease(ramp(t, 0.1, 1.2))]} />
          <CitizenLead position={on(PLACE.bakery, -1.25, 0, 0.35)} rotationY={0.65} animation="lookAround" face="uneasy" time={t} />
        </>
      ),
    },
    {
      cue: "7.value",
      ...cam.orbit({
        on: on(PLACE.bakery, 0, 1.25, 0),
        dist: 4.5,
        yaw: -16,
        yawTo: 16,
        pitch: 8,
        fov: 40,
      }),
      zone: "bakery",
      note: "Balance scales tip dramatically as 10 emeralds equal only 1 loaf.",
      stage: (t) => (
        <>
          <Balance position={on(PLACE.bakery, 0, 0, 0)} tilt={-0.65 * ease(ramp(t, 0.1, 0.9))} left={<Bread scale={1.1} />} right={<CoinStack count={10} kind="emerald" />} />
          <FloatingNumber text="-50% VALUE" color="#ff4f42" position={on(PLACE.bakery, 0.9, 2.1, 0)} height={0.56 * pop(t, 0.3)} />
        </>
      ),
    },
  ],
});
