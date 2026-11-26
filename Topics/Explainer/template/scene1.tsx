import {
  BallotBox,
  ChatToast,
  Chest,
  CitizenLead,
  CouncilTable,
  CrownCushion,
  EliteLead,
  Official,
  PLACE,
  RuleBoard,
  cam,
  ease,
  on,
  pop,
  ramp,
  storyScene,
  timing,
  wordAt,
} from "./kit";

/**
 * STARTER SCENE — Demonstrates the Remastered Explainer Loop Pattern:
 *   - Shot 1 (`1.hook`) & Shot 4 (`4.loop`) share the exact climax throne-room framing -> infinite loop!
 *   - Shot 2 (`2.problem`) stages CitizenLead ("Miles") in the chaotic council plaza with composite props.
 *   - Shot 3 (`3.leader`) introduces EliteLead ("Sterling") fixing rules & winning the vote.
 *
 * Expand to 8 full beats (25–45 fast story shots, 1.1–1.9s median cut). Never use static empty-box sets.
 */

const CLIMAX_CAM = cam.push({
  on: on(PLACE.hall, 0, 1.45, -2.5),
  dist: 4.0,
  to: 2.9,
  yaw: 12,
  pitch: 5,
  fov: 40,
  screenOffset: [0, 0.06],
});

const ClimaxCoronation: React.FC<{ t: number }> = ({ t }) => {
  const lift = ease(ramp(t, 0.12, 0.88));
  const modStep = ease(ramp(t, 0.0, 0.65));
  return (
    <>
      <Official
        role="mod"
        position={on(PLACE.hall, -1.1 + modStep * 0.28, 0, -2.45)}
        rotationY={0.85}
        animation="walk"
        blendTo="hold"
        blend={1 - ease(ramp(t, 0.45, 0.78))}
        animDistance={modStep * 0.45}
        lookAt={on(PLACE.hall, 0.1, 1.65, -2.55)}
        time={t}
      >
        <CrownCushion position={[0, 0.14, 0.25]} showCrown={false} />
      </Official>
      <EliteLead
        variant="general"
        nameTag={t < 0.75 ? undefined : "Sterling"}
        position={on(PLACE.hall, 0.05, 0.32 + Math.sin(lift * Math.PI) * 0.08, -2.55)}
        rotationY={0.1 - lift * 0.14}
        animation="cheer"
        blendTo="reachUp"
        blend={lift}
        face="smug"
        crown
        time={t}
      />
    </>
  );
};

const problemLook = wordAt("2.problem", "empty");
const crownWord = wordAt("3.leader", "crowns");

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Cold Climax & Two-Lead Hook",
  shots: [
    {
      cue: "1.hook",
      ...CLIMAX_CAM,
      zone: "hall",
      note: "Frame-0 cold climax hook: Official steps forward presenting cushion while Sterling raises the gold crown onto his head.",
      stage: (t) => <ClimaxCoronation t={t} />,
    },
    {
      cue: "2.problem",
      ...cam.orbit({
        on: on(PLACE.square, 0, 1.25, 0.6),
        dist: 4.5,
        distTo: 3.6,
        yaw: -24,
        yawTo: 18,
        pitch: 10,
        fov: 42,
        screenOffset: [0, 0.08],
      }),
      zone: "square",
      note: "Introduce CitizenLead Miles walking up to the open empty chest and gesturing in dismay at chaotic rules.",
      stage: (t) => {
        const walk = ease(ramp(t, 0, 0.65));
        const openChest = ease(ramp(t, 0.15, problemLook + 0.2));
        return (
          <>
            <RuleBoard position={on(PLACE.square, -0.9, 1.9, -1.6)} rotationY={0.25 + Math.sin(t * 2) * 0.04} mode="chaos" />
            <Chest position={on(PLACE.square, 1.1, 0, 0.2)} rotationY={-0.35} open={openChest} gold={0} kind="emerald" />
            <CitizenLead
              nameTag="Miles"
              nameTagYaw={0.12}
              position={on(PLACE.square, -0.95 + walk * 0.65, 0, 1.25 - walk * 0.45)}
              rotationY={0.35 - walk * 0.15}
              animation="shrug"
              blendTo="walk"
              blend={ease(ramp(t, 0.55, 0.85))}
              animDistance={walk * 0.9}
              face={openChest > 0.5 ? "wow" : "frown"}
              lookAt={on(PLACE.square, 1.1, 0.4, 0.2)}
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "3.leader",
      ...cam.push({
        on: on(PLACE.hall, 0.7, 1.35, 1.1),
        dist: 4.3,
        to: 3.1,
        yaw: -26,
        pitch: 7,
        fov: 40,
        screenOffset: [0, 0.06],
      }),
      zone: "hall",
      note: "Introduce EliteLead Sterling striding beside BallotBox as the crown settles and YES poll bursts upward.",
      stage: (t) => {
        const step = ease(ramp(t, 0, 0.7));
        const crowned = ramp(t, Math.max(0.2, crownWord - 0.15), crownWord + 0.15);
        return (
          <>
            <RuleBoard position={on(PLACE.hall, 0.2, 2.0, -1.6)} rotationY={-0.15} mode="order" />
            <CouncilTable position={on(PLACE.hall, 1.2, 0, 1.1)} messy={false} />
            <BallotBox position={on(PLACE.hall, 1.2, 0.81 + crowned * 0.04, 1.1)} />
            <EliteLead
              variant="pres"
              nameTag="Sterling"
              crown={t >= crownWord}
              position={on(PLACE.hall, -0.45 + step * 0.65, 0, 1.55 - step * 0.3)}
              rotationY={0.28}
              animation={crowned > 0.6 ? "cheer" : "point"}
              blendTo="walk"
              blend={ease(ramp(t, 0.55, 0.85))}
              animDistance={step * 0.85}
              face="smile"
              time={t}
            />
            <ChatToast
              text="[Vote] YES: 99%"
              position={on(PLACE.hall, 1.45, 1.85, 1.15)}
              rotationY={-0.25}
              height={0.26 * pop(t, 0.35)}
            />
          </>
        );
      },
    },
    {
      cue: "4.loop",
      ...CLIMAX_CAM,
      zone: "hall",
      note: "Seamless loop payoff returning to the exact Frame-0 coronation pose mid-clause ('...and that's').",
      stage: (t) => <ClimaxCoronation t={t} />,
    },
  ],
});
