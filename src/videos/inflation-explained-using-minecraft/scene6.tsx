import { walkSegment } from "../../engine";
import {
  Bar,
  Bill,
  BillStack,
  Bread,
  CitizenLead,
  CoinPile,
  EliteLead,
  ExplainerCrowd,
  FloatingNumber,
  PLACE,
  PriceTag,
  cam,
  ease,
  on,
  pop,
  ramp,
  storyScene,
  timing,
} from "./kit";
import { CLIMAX_HOOK_OPT, renderClimaxLoop } from "./scene1";

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "1971 Parallel, Cantillon Winners & Seamless Loop",
  shots: [
    {
      cue: "7.history",
      ...cam.push({
        on: on(PLACE.history, 0, 1.85, -1.0),
        dist: 5.8,
        to: 4.0,
        yaw: -14,
        pitch: 7,
        fov: 42,
        screenOffset: [0, 0.1],
      }),
      zone: "history",
      note: "Top-hat citizens march boldly forward through 1971 Plaza as stone gates loom behind.",
      stage: (t) => (
        <ExplainerCrowd
          positions={[
            on(PLACE.history, -0.72, 0, -0.35 + t * 0.9),
            on(PLACE.history, -0.22, 0, 0.25 + t * 0.9),
            on(PLACE.history, 0.28, 0, 0.15 + t * 0.9),
            on(PLACE.history, 0.72, 0, -0.25 + t * 0.9),
          ]}
          style="historical"
          animation="walk"
          animDistance={t * 0.9}
          phaseStep={0.3 + t * 1.4}
          seed={9}
        />
      ),
    },
    {
      cue: "7.bills",
      ...cam.orbit({
        on: on(PLACE.history, 0, 0.9, 0.2),
        dist: 4.1,
        distTo: 2.85,
        yaw: -26,
        yawTo: 24,
        pitch: 14,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      zone: "history",
      note: "Bill stacks grow block by block in the plaza while swirling green notes rain down around PRINT CASH.",
      stage: (t) => {
        const pour = ease(ramp(t, 0, 1.3));
        const drop = (t * 2.2) % 1;
        return (
          <>
            <BillStack position={on(PLACE.history, -0.35, 0, 0.35)} count={4 + Math.round(pour * 10)} />
            <BillStack position={on(PLACE.history, 0.35, 0, 0.2)} count={5 + Math.round(pour * 11)} />
            <Bill position={on(PLACE.history, -0.2, 2.0 - drop * 1.2, 0.35)} rotation={[0.4, drop * 3, 0.2]} />
            <Bill position={on(PLACE.history, 0.25, 2.1 - ((drop + 0.5) % 1) * 1.2, 0.2)} rotation={[-0.3, drop * 2, -0.2]} />
            <FloatingNumber text="PRINT CASH" color="#3fd46a" position={on(PLACE.history, 0, 1.6 + pour * 0.25, 0.25)} height={0.3 * pop(t, 0.15)} />
          </>
        );
      },
    },
    {
      cue: "7.prices",
      ...cam.crane({
        on: on(PLACE.history, 0, 1.45, 0.2),
        dist: 6.4,
        toDist: 5.2,
        fromPitch: 14,
        toPitch: 4,
        yaw: 14,
        fov: 46,
        screenOffset: [0, 0.05],
      }),
      zone: "history",
      note: "Crane rises with surging FOOD, RENT, and FUEL price pillars shooting into sky.",
      stage: (t) => {
        const k = 0.25 + 0.75 * ease(ramp(t, 0.05, 1.25));
        return (
          <>
            <Bar position={on(PLACE.history, -0.68, 0, 0.2)} height={2.1 * k} color="#d84238" label="FOOD" />
            <Bar position={on(PLACE.history, 0, 0, 0.2)} height={2.6 * k} color="#e6842a" label="RENT" />
            <Bar position={on(PLACE.history, 0.68, 0, 0.2)} height={2.3 * k} color="#d8b22a" label="FUEL" />
          </>
        );
      },
    },
    {
      cue: "8.first",
      ...cam.ots({
        speaker: on(PLACE.hall, 0.2, 1.2, 0.35),
        listener: on(PLACE.hall, -0.55, 1.2, -1.0),
      }),
      screenOffset: [0, 0.12],
      zone: "hall",
      note: "OTS shot: smug Sterling struts past clutching loaf and wealth while Miles lunges empty-handed.",
      stage: (t) => {
        const strut = ease(ramp(t, 0, 1.3));
        const eliteWalk = walkSegment(on(PLACE.hall, 0.45, 0, -0.15), on(PLACE.hall, 0.05, 0, 0.85), t, 0, 1.3, { yaw: -0.65 });
        return (
          <>
            <EliteLead
              variant="pres"
              {...eliteWalk}
              face="smug"
            >
              <Bread position={[0, -0.05, 0.2]} scale={0.85} />
            </EliteLead>
            <CoinPile position={on(PLACE.hall, -0.65, 0, -0.75)} count={20} kind="emerald" spread={0.65} />
            <CitizenLead position={on(PLACE.hall, -0.55, 0, -1.0)} rotationY={0.6} animation="reach" face="frown" time={t} />
          </>
        );
      },
    },
    {
      cue: "8.cheap",
      ...cam.push({
        on: on(PLACE.bakery, 0, 1.25, -0.35),
        dist: 5.0,
        to: 4.2,
        yaw: 16,
        pitch: 10,
        fov: 45,
        screenOffset: [0, 0.05],
      }),
      zone: "bakery",
      note: "Sterling snatches low-price PriceTag 1 loaf cleanly off stone plinth.",
      stage: (t) => {
        const grab = ease(ramp(t, 0, 1.2));
        return (
          <>
            <Bread position={on(PLACE.bakery, -0.2 + grab * 0.25, 0.96 + Math.max(0, grab - 0.5) * 0.35, -0.55 + grab * 0.15)} scale={1.25} />
            <PriceTag text="1" position={on(PLACE.bakery, -0.2, 2.2, -0.55)} scale={1.0} swing={Math.sin(t * 5) * 0.08} />
            <EliteLead
              variant="pres"
              position={on(PLACE.bakery, 0.85 - grab * 0.25, 0, 0.15 - grab * 0.25)}
              rotationY={-0.75}
              animation={grab < 0.55 ? "walk" : "reach"}
              animDistance={grab * 0.45}
              face="smug"
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "8.burn",
      ...cam.push({
        on: on(PLACE.bakery, 0, 1.25, -0.2),
        dist: 5.2,
        to: 4.3,
        yaw: -14,
        pitch: 10,
        fov: 46,
        screenOffset: [0, 0.05],
      }),
      zone: "bakery",
      note: "Miles runs up too late as PriceTag jumps to 50 and -50% fits cleanly above.",
      stage: (t) => {
        const arrive = ease(ramp(t, 0, 1.2));
        return (
          <>
            <PriceTag text={arrive > 0.35 ? "50" : "10"} position={on(PLACE.bakery, 0.35, 2.2, -0.55)} scale={1.0} swing={Math.sin(t * 8) * 0.14} />
            <CitizenLead
              position={on(PLACE.bakery, -0.95 + arrive * 0.3, 0, 0.5 - arrive * 0.3)}
              rotationY={0.45}
              animation={arrive < 0.5 ? "run" : "shrug"}
              animDistance={arrive * 0.55}
              face="worried"
              time={t}
            >
              <BillStack position={[0, -0.05, 0.2]} count={Math.max(2, Math.round(8 - arrive * 5))} />
            </CitizenLead>
            <FloatingNumber text="-50%" color="#ff4f42" position={on(PLACE.bakery, -0.45, 2.15 + arrive * 0.12, 0.1)} height={0.2 * pop(t, 0.2)} />
          </>
        );
      },
    },
    {
      cue: "8.final",
      ...cam.truck({
        on: on(PLACE.history, 0, 1.3, 0.15),
        by: [0, 0, 1.1],
        dist: 4.8,
        yaw: -14,
        pitch: 10,
        fov: 45,
        screenOffset: [0, 0.06],
      }),
      zone: "history",
      note: "Tracking shot ahead of exhausted Miles trudging through Plaza gripping single loaf.",
      stage: (t) => (
        <CitizenLead position={on(PLACE.history, 0, 0, -0.05 + t * 0.95)} rotationY={0.12} animation="stagger" animDistance={t * 1.1} face="ouch">
          <Bread position={[0, -0.05, 0.2]} scale={0.75} />
        </CitizenLead>
      ),
    },
    {
      cue: "8.loop",
      ...cam.push(CLIMAX_HOOK_OPT),
      zone: "bakery",
      note: "Exact match to Frame 0 climax shot for seamless mid-clause replay loop ('...and that's').",
      stage: (t) => renderClimaxLoop(t),
    },
  ],
});
