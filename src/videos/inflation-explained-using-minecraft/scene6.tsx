import {
  Bar,
  BillStack,
  Bread,
  CitizenLead,
  CoinPile,
  EliteLead,
  ExplainerCrowd,
  FloatingNumber,
  PLACE,
  PriceTag,
  Printer,
  cam,
  ease,
  on,
  pop,
  ramp,
  storyScene,
  timing,
} from "./kit";
import { CLIMAX_HOOK_OPT } from "./scene1";

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "1971 Parallel, Cantillon Winners & Seamless Loop",
  shots: [
    {
      cue: "7.history",
      ...cam.push({
        on: on(PLACE.history, 0, 1.85, -1.0),
        dist: 5.5,
        to: 4.5,
        yaw: -8,
        pitch: 6,
        fov: 42,
        screenOffset: [0, 0.1],
      }),
      zone: "history",
      note: "History Plaza beneath massive 1971 StoneBillboard with depth-stacked top-hat citizens inside 9:16.",
      stage: (t) => (
        <ExplainerCrowd
          positions={[
            on(PLACE.history, -0.68, 0, 0.15),
            on(PLACE.history, -0.2, 0, 0.7),
            on(PLACE.history, 0.28, 0, 0.6),
            on(PLACE.history, 0.72, 0, 0.2),
          ]}
          style="historical"
          animation="walk"
          phaseStep={0.3 + t * 0.001}
          seed={9}
        />
      ),
    },
    {
      cue: "7.bills",
      ...cam.orbit({
        on: on(PLACE.history, 0, 0.9, 0.2),
        dist: 3.6,
        yaw: -14,
        yawTo: 14,
        pitch: 14,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      zone: "history",
      note: "Stacks of paper bills pile up on stone plaza stairs in front of 1971 monument.",
      stage: (t) => (
        <>
          <BillStack position={on(PLACE.history, -0.35, 0, 0.35)} count={12} />
          <BillStack position={on(PLACE.history, 0.35, 0, 0.2)} count={14} />
          <FloatingNumber text="PRINT CASH" color="#3fd46a" position={on(PLACE.history, 0, 1.6 + t * 0.06, 0.25)} height={0.5 * pop(t, 0.15)} />
        </>
      ),
    },
    {
      cue: "7.prices",
      ...cam.crane({
        on: on(PLACE.history, 0, 1.55, 0.2),
        dist: 5.0,
        fromPitch: 12,
        toPitch: 2,
        yaw: 12,
        fov: 42,
        screenOffset: [0, 0.1],
      }),
      zone: "history",
      note: "Three bold price pillars FOOD, RENT, FUEL spaced compactly inside 9:16 rising together.",
      stage: (t) => {
        const k = 0.4 + 0.6 * ease(ramp(t, 0.05, 1.2));
        return (
          <>
            <Bar position={on(PLACE.history, -0.68, 0, 0.2)} height={2.0 * k} color="#d84238" label="FOOD" />
            <Bar position={on(PLACE.history, 0, 0, 0.2)} height={2.5 * k} color="#e6842a" label="RENT" />
            <Bar position={on(PLACE.history, 0.68, 0, 0.2)} height={2.2 * k} color="#d8b22a" label="FUEL" />
          </>
        );
      },
    },
    {
      cue: "8.first",
      ...cam.ots({
        speaker: on(PLACE.hall, 0.2, 1.2, 0.2),
        listener: on(PLACE.hall, -0.5, 1.2, -1.0),
      }),
      screenOffset: [0, 0.12],
      zone: "hall",
      note: "OTS Cantillon effect: Sterling walks off rich with fresh bread and gold emerald CoinPile.",
      stage: (t) => (
        <>
          <EliteLead variant="pres" position={on(PLACE.hall, 0.2, 0, 0.2)} rotationY={-0.75} animation="idle" face="smug" time={t}>
            <Bread position={[0, -0.05, 0.2]} scale={0.8} />
          </EliteLead>
          <CoinPile position={on(PLACE.hall, -0.65, 0, -0.75)} count={20} kind="emerald" spread={0.65} />
          <CitizenLead position={on(PLACE.hall, -0.55, 0, -1.0)} rotationY={0.75} animation="idle" face="frown" time={t} />
        </>
      ),
    },
    {
      cue: "8.cheap",
      ...cam.push({
        on: on(PLACE.bakery, 0, 1.25, -0.35),
        dist: 3.1,
        to: 2.55,
        yaw: 12,
        pitch: 7,
        fov: 38,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "Sterling buys warm loaf first while PriceTag still sits low at 1.",
      stage: (t) => (
        <>
          <Bread position={on(PLACE.bakery, -0.2, 0.96, -0.55)} scale={1.5} />
          <PriceTag text="1" position={on(PLACE.bakery, -0.2, 1.85, -0.55)} scale={1.15} />
          <EliteLead variant="pres" position={on(PLACE.bakery, 0.45, 0, -0.15)} rotationY={-0.75} animation="reach" face="smug" time={t} />
        </>
      ),
    },
    {
      cue: "8.burn",
      ...cam.push({
        on: on(PLACE.bakery, 0, 1.25, -0.2),
        dist: 3.3,
        to: 2.75,
        yaw: -14,
        pitch: 8,
        fov: 38,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "Miles arrives late holding his cash stack as price rises to 50.",
      stage: (t) => (
        <>
          <PriceTag text="50" position={on(PLACE.bakery, 0.3, 1.85, -0.55)} scale={1.2} swing={Math.sin(t * 7) * 0.12} />
          <CitizenLead position={on(PLACE.bakery, -0.4, 0, 0.1)} rotationY={0.45} animation="shrug" face="worried" time={t}>
            <BillStack position={[0, -0.05, 0.2]} count={5} />
          </CitizenLead>
          <FloatingNumber text="-50% CASH" color="#ff4f42" position={on(PLACE.bakery, -0.35, 2.2, 0.1)} height={0.5 * pop(t, 0.2)} />
        </>
      ),
    },
    {
      cue: "8.final",
      ...cam.push({
        on: on(PLACE.bakery, 0, 1.3, 0.45),
        dist: 3.1,
        to: 2.55,
        yaw: -12,
        pitch: 7,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "Exhausted Miles trudges forward holding that exact same single loaf.",
      stage: (t) => (
        <CitizenLead position={on(PLACE.bakery, 0, 0, 0.45)} rotationY={0.15} animation="stagger" face="ouch" time={t}>
          <Bread position={[0, -0.05, 0.2]} scale={0.75} />
        </CitizenLead>
      ),
    },
    {
      cue: "8.loop",
      ...cam.push(CLIMAX_HOOK_OPT),
      zone: "bakery",
      note: "Exact match to Frame 0 climax shot for seamless mid-clause replay loop ('...and that's').",
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
  ],
});
