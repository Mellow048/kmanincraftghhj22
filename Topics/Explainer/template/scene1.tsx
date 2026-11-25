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
  dist: 3.4,
  to: 2.75,
  yaw: 12,
  pitch: 5,
  fov: 40,
});

const ClimaxCoronation: React.FC<{ t: number }> = ({ t }) => {
  const lift = ease(ramp(t, 0.15, 0.85));
  return (
    <>
      <Official
        role="mod"
        position={on(PLACE.hall, -0.95, 0.32, -2.55)}
        rotationY={0.85}
        animation="hold"
        lookAt={on(PLACE.hall, 0.1, 1.65, -2.55)}
      >
        <CrownCushion position={[0, 0.14, 0.25]} showCrown={false} />
      </Official>
      <EliteLead
        variant="general"
        nameTag={t < 0.8 ? undefined : "Sterling"}
        position={on(PLACE.hall, 0.05, 0.32, -2.55)}
        rotationY={0.1}
        animation="reachUp"
        blendTo="cheer"
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
      note: "Frame-0 cold climax hook: Sterling raises the gold crown over the throne carpet, matching the final loop shot.",
      stage: (t) => <ClimaxCoronation t={t} />,
    },
    {
      cue: "2.problem",
      ...cam.orbit({
        on: on(PLACE.square, 0, 1.25, 0.6),
        dist: 4.1,
        yaw: -14,
        yawTo: 12,
        pitch: 10,
        fov: 42,
      }),
      zone: "square",
      note: "Introduce Character 1 (CitizenLead Miles) beside crooked chaos rules and an open empty chest in the courtyard.",
      stage: (t) => (
        <>
          <RuleBoard position={on(PLACE.square, -0.9, 1.9, -1.6)} rotationY={0.25} mode="chaos" />
          <Chest position={on(PLACE.square, 1.1, 0, 0.2)} rotationY={-0.35} open={ease(ramp(t, 0.1, problemLook + 0.2))} gold={0} kind="emerald" />
          <CitizenLead
            nameTag="Miles"
            nameTagYaw={0.12}
            position={on(PLACE.square, -0.45, 0, 0.9)}
            rotationY={0.22}
            animation="shrug"
            face="frown"
            lookAt={on(PLACE.square, 1.1, 0.4, 0.2)}
            time={t}
          />
        </>
      ),
    },
    {
      cue: "3.leader",
      ...cam.push({
        on: on(PLACE.hall, 1.1, 1.35, 1.0),
        dist: 3.9,
        to: 3.1,
        yaw: -22,
        pitch: 7,
        fov: 40,
      }),
      zone: "hall",
      note: "Introduce Character 2 (EliteLead Sterling) imposing order beside the BallotBox and crisp vote toast.",
      stage: (t) => (
        <>
          <RuleBoard position={on(PLACE.hall, 0.2, 2.0, -1.6)} rotationY={-0.15} mode="order" />
          <CouncilTable position={on(PLACE.hall, 1.2, 0, 1.1)} messy={false} />
          <BallotBox position={on(PLACE.hall, 1.2, 0.81, 1.1)} />
          <EliteLead
            variant="pres"
            nameTag="Sterling"
            crown={t >= crownWord}
            position={on(PLACE.hall, 0.15, 0, 1.3)}
            rotationY={0.18}
            animation="point"
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
      ),
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
