import {
  Bar,
  Bread,
  CitizenLead,
  CoinPile,
  EliteLead,
  ExplainerCrowd,
  PLACE,
  PriceTag,
  Printer,
  cam,
  ease,
  on,
  ramp,
  storyScene,
  timing,
} from "./kit";
import { CLIMAX_HOOK_OPT } from "./scene1";

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "1971 Parallel, Cantillon Advantage & Loop",
  shots: [
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
      note: "Real-world History Plaza under the 1971 StoneBillboard with top-hat citizens.",
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
      note: "Three red/gold bars (FOOD, RENT, FUEL) climbing together beside cash.",
      stage: (t) => {
        const k = 0.4 + 0.6 * ease(ramp(t, 0.05, 1.2));
        return (
          <>
            <Bar position={on(PLACE.history, -1.0, 0, 0.2)} height={2.0 * k} color="#d84238" label="FOOD" />
            <Bar position={on(PLACE.history, 0, 0, 0.2)} height={2.5 * k} color="#e6842a" label="RENT" />
            <Bar position={on(PLACE.history, 1.0, 0, 0.2)} height={2.2 * k} color="#d8b22a" label="FUEL" />
          </>
        );
      },
    },
    {
      cue: "8.first",
      ...cam.ots({
        speaker: on(PLACE.hall, 0.2, 1.2, 0.2),
        listener: on(PLACE.hall, -0.8, 1.2, -1.0),
      }),
      zone: "hall",
      note: "OTS framing: Sterling holds fresh bread beside overflowing emerald CoinPile.",
      stage: (t) => (
        <>
          <EliteLead variant="pres" position={on(PLACE.hall, 0.2, 0, 0.2)} rotationY={-0.75} animation="idle" face="smug" time={t}>
            <Bread position={[0, -0.05, 0.2]} scale={0.8} />
          </EliteLead>
          <CoinPile position={on(PLACE.hall, -0.9, 0, -0.8)} count={20} kind="emerald" spread={0.7} />
          <CitizenLead position={on(PLACE.hall, -0.8, 0, -1.0)} rotationY={0.75} animation="idle" face="frown" time={t} />
        </>
      ),
    },
    {
      cue: "8.loop",
      ...cam.push({
        on: on(PLACE.bakery, 0, 1.3, 0.5),
        dist: 3.1,
        to: 2.55,
        yaw: -14,
        pitch: 7,
        fov: 40,
      }),
      zone: "bakery",
      note: "Miles trudges holding one loaf before cutting straight into Frame-0 loop.",
      stage: (t) => (
        <CitizenLead position={on(PLACE.bakery, 0, 0, 0.5)} rotationY={0.15} animation="stagger" face="ouch" time={t}>
          <Bread position={[0, -0.05, 0.2]} scale={0.75} />
        </CitizenLead>
      ),
    },
    {
      cue: "8.loop",
      cut: 1.4,
      ...cam.push(CLIMAX_HOOK_OPT),
      zone: "bakery",
      note: "Exact match to Frame 0 climax shot for seamless mid-sentence loop ('...and that's').",
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
  ],
});
