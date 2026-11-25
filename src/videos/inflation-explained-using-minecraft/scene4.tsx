import {
  Balance,
  Bar,
  BarChart,
  Bread,
  CitizenLead,
  CoinStack,
  ExplainerCrowd,
  FloatingNumber,
  PLACE,
  cam,
  ease,
  on,
  pop,
  ramp,
  storyScene,
  timing,
} from "./kit";

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Purchasing Power & Real-World Proof",
  shots: [
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
      note: "BarChart: BREAD bar stays flat while CASH bar shoots past Miles's head.",
      stage: (t) => (
        <>
          <BarChart
            position={on(PLACE.bakery, 0.25, 0, -0.2)}
            values={[0.9, 2.8]}
            labels={["BREAD", "CASH"]}
            grow={[1, 0.35 + 0.65 * ease(ramp(t, 0.1, 1.2))]}
          />
          <CitizenLead
            position={on(PLACE.bakery, -1.25, 0, 0.35)}
            rotationY={0.65}
            animation="lookAround"
            face="uneasy"
            time={t}
          />
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
      note: "Balance scales tip heavily as 10 emeralds buy only the exact same single Bread loaf.",
      stage: (t) => (
        <>
          <Balance
            position={on(PLACE.bakery, 0, 0, 0)}
            tilt={-0.65 * ease(ramp(t, 0.1, 0.9))}
            left={<Bread scale={1.1} />}
            right={<CoinStack count={10} kind="emerald" />}
          />
          <FloatingNumber text="-90% VALUE" color="#ff4f42" position={on(PLACE.bakery, 0.9, 2.1, 0)} height={0.55 * pop(t, 0.35)} />
        </>
      ),
    },
    {
      cue: "7.history",
      ...cam.push({
        on: on(PLACE.history, 0, 1.85, -1.0),
        dist: 5.5,
        to: 4.4,
        yaw: -10,
        pitch: 6,
        fov: 42,
      }),
      zone: "history",
      note: "Real-world parallel in History Plaza under the 1971 StoneBillboard with top-hat crowd.",
      stage: (t) => (
        <ExplainerCrowd
          positions={[
            on(PLACE.history, -1.6, 0, 0.2),
            on(PLACE.history, -0.5, 0, 0.6),
            on(PLACE.history, 0.6, 0, 0.5),
            on(PLACE.history, 1.7, 0, 0.2),
          ]}
          style="historical"
          animation="walk"
          phaseStep={0.3 + t * 0.001}
          seed={9}
        />
      ),
    },
    {
      cue: "7.prices",
      ...cam.crane({
        on: on(PLACE.history, 0, 1.6, 0.2),
        dist: 4.4,
        fromPitch: 12,
        toPitch: 2,
        yaw: 15,
        fov: 42,
      }),
      zone: "history",
      note: "Three rising red/gold bars (FOOD, RENT, GAS) climbing together alongside cash.",
      stage: (t) => {
        const k = 0.4 + 0.6 * ease(ramp(t, 0.05, 1.2));
        return (
          <>
            <Bar position={on(PLACE.history, -1.0, 0, 0.2)} height={2.0 * k} color="#d84238" label="FOOD" />
            <Bar position={on(PLACE.history, 0, 0, 0.2)} height={2.5 * k} color="#e6842a" label="RENT" />
            <Bar position={on(PLACE.history, 1.0, 0, 0.2)} height={2.2 * k} color="#d8b22a" label="GAS" />
          </>
        );
      },
    },
  ],
});
