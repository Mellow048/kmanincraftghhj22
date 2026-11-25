import {
  Bread,
  CitizenLead,
  CoinPile,
  EliteLead,
  PLACE,
  cam,
  on,
  storyScene,
  timing,
} from "./kit";
import { CLIMAX_HOOK_OPT, InflationLoopStage } from "./scene1";

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Cantillon Twist & Seamless Loop",
  shots: [
    {
      cue: "8.end",
      ...cam.ots({
        speaker: on(PLACE.hall, 0.2, 1.2, 0.2),
        listener: on(PLACE.hall, -0.8, 1.2, -1.0),
      }),
      zone: "hall",
      note: "OTS framing: Sterling holds fresh bread beside overflowing emerald CoinPile while prices were still cheap.",
      stage: (t) => (
        <>
          <EliteLead
            variant="pres"
            position={on(PLACE.hall, 0.2, 0, 0.2)}
            rotationY={-0.75}
            animation="idle"
            face="smug"
            time={t}
          >
            <Bread position={[0, -0.05, 0.2]} scale={0.8} />
          </EliteLead>
          <CoinPile position={on(PLACE.hall, -0.9, 0, -0.8)} count={20} kind="emerald" spread={0.7} />
          <CitizenLead
            position={on(PLACE.hall, -0.8, 0, -1.0)}
            rotationY={0.75}
            animation="idle"
            face="frown"
            time={t}
          />
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
      note: "Miles slumps exhausted holding a single loaf before cutting into the loop climax.",
      stage: (t) => (
        <CitizenLead
          position={on(PLACE.bakery, 0, 0, 0.5)}
          rotationY={0.15}
          animation="stagger"
          face="ouch"
          time={t}
        >
          <Bread position={[0, -0.05, 0.2]} scale={0.75} />
        </CitizenLead>
      ),
    },
    {
      cue: "8.loop",
      cut: 1.4,
      ...cam.push(CLIMAX_HOOK_OPT),
      zone: "bakery",
      note: "Seamless loop shot matching Frame 0 identically ('...for the exact same loaf, and that's').",
      stage: (t) => <InflationLoopStage t={t} />,
    },
  ],
});
