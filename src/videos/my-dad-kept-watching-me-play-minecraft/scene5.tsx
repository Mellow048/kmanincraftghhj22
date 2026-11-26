import {
  Creeper,
  Dad,
  DeskSetup,
  Laptop,
  PLACE,
  Son,
  SpeechCard,
  cam,
  ease,
  on,
  pop,
  ramp,
  storyScene,
  timing,
  walkSegment,
  wordAt,
} from "./kit";

const askWord = wordAt("5.ask", "creeper");
const grabWord = wordAt("5.laptop", "grabbed");

/**
 * Scene 5 — Wholesome Flip & Grabbing the Laptop (`Up Happy 0:02+` returns cleanly!):
 *   Sam bursts out laughing -> "Did you die by a creeper?" -> sprints downstairs -> grabs spare Laptop!
 */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Burst Out Laughing & Grabbing Laptop",
  shots: [
    {
      cue: "5.laugh",
      ...cam.orbit({
        on: on(PLACE.irl, -0.35, 1.3, 0.05),
        dist: 5.6,
        distTo: 4.3,
        yaw: -44,
        yawTo: 16,
        pitch: 8,
        fov: 46,
        screenOffset: [0, 0.05],
      }),
      zone: "irl",
      note: "Sam bends over laughing joyfully while stunned Dad lifts his head in relief as warm lamp clicks on.",
      stage: (t) => (
        <>
          <DeskSetup position={on(PLACE.irl, 0, 0, -1.25)} screenText="LOL CREEPER" screenColor="#5ce89e" clockText="4:20 PM" lampOn />
          <Son position={on(PLACE.irl, -0.75, 0, -0.05)} rotationY={0.75} animation="laugh" face="laugh" badge="heart" badgePopStart={0.2} time={t * 1.2} />
          <Dad position={on(PLACE.irl, 0.65, 0, -0.1)} rotationY={-0.75} animation="lookAround" face="wow" time={t} />
        </>
      ),
    },
    {
      cue: "5.ask",
      ...cam.push({
        on: on(PLACE.irl, -0.5, 1.35, -0.05),
        dist: 4.5,
        to: 3.7,
        yaw: -18,
        pitch: 10,
        fov: 42,
        screenOffset: [0, 0.05],
      }),
      zone: "irl",
      note: "Sam points cheering at Dad asking if he just died to a Creeper beside 3D SpeechCard.",
      stage: (t) => (
        <>
          <DeskSetup position={on(PLACE.irl, 0, 0, -1.25)} screenText="CREEPER?!" screenColor="#ffd84d" clockText="4:20 PM" lampOn />
          <Son position={on(PLACE.irl, -0.65, 0, -0.05)} rotationY={0.68} animation="point" face="grin" time={t} />
          <Dad position={on(PLACE.irl, 0.65, 0, -0.1)} rotationY={-0.75} animation="shrug" face="smile" time={t} />
          <SpeechCard text="Did you die by a creeper?" position={on(PLACE.irl, 0, 2.45, -0.05)} scale={0.9 * pop(t, Math.max(0.15, askWord - 0.5))} color="#ffd84d" />
          <Creeper position={on(PLACE.irl, 1.55, 0, -0.8)} rotationY={-0.65} scale={0.55} />
        </>
      ),
    },
    {
      cue: "5.relief",
      ...cam.orbit({
        on: on(PLACE.irl, 0.1, 1.25, -0.1),
        dist: 4.6,
        distTo: 3.9,
        yaw: -20,
        yawTo: 20,
        pitch: 12,
        fov: 43,
        screenOffset: [0, 0.05],
      }),
      zone: "irl",
      note: "Both Dad and Sam share big warm laughs and heart badge pops cleanly above Dad.",
      stage: (t) => (
        <>
          <DeskSetup position={on(PLACE.irl, 0, 0, -1.25)} screenText="LET'S PLAY!" screenColor="#4be08a" clockText="4:21 PM" lampOn />
          <Dad position={on(PLACE.irl, 0.65, 0, -0.1)} rotationY={-0.75} animation="laugh" face="happy" badge="heart" badgePopStart={0.25} time={t} />
          <Son position={on(PLACE.irl, -0.75, 0, -0.05)} rotationY={0.75} animation="cheer" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "5.stairs",
      ...cam.crane({
        on: on(PLACE.stairs, -0.1, 1.35, -0.1),
        dist: 6.4,
        toDist: 5.0,
        fromPitch: 18,
        toPitch: 11,
        yaw: 26,
        fov: 46,
        screenOffset: [0, 0.05],
      }),
      zone: "stairs",
      note: "Sam sprints smoothly down wooden hallway staircase toward downstairs console table with Laptop.",
      stage: (t) => {
        const dropT = ease(ramp(t, 0, 1));
        const downWalk = walkSegment(on(PLACE.stairs, -0.7, 1.8, -1.9), on(PLACE.stairs, -0.45, 0, 0.85), t, 0, 1, {
          gait: "run",
          endYaw: Math.atan2(0.25, 2.75),
        });
        return (
          <>
            <Son {...downWalk} position={[downWalk.position[0], (1 - dropT) * 1.8, downWalk.position[2]]} face="grin" />
            <Laptop position={on(PLACE.stairs, 1.35, 0.78, 1.15)} rotationY={-0.35} screenText="MC READY" screenColor="#5de8a0" scale={0.95} />
          </>
        );
      },
    },
    {
      cue: "5.laptop",
      ...cam.push({
        on: on(PLACE.stairs, 0.85, 1.2, 1.15),
        dist: 4.8,
        to: 3.9,
        yaw: -24,
        pitch: 12,
        fov: 43,
        screenOffset: [0, 0.05],
      }),
      zone: "stairs",
      note: "Sam steps right up to console table and lifts glowing silver Laptop into his hands.",
      stage: (t) => {
        const picked = t >= grabWord;
        const approach = walkSegment(on(PLACE.stairs, -0.25, 0, 1.05), on(PLACE.stairs, 0.55, 0, 1.15), t, 0, Math.max(0.4, grabWord), {
          gait: "walk",
          endYaw: Math.PI / 2,
        });
        return (
          <>
            {!picked ? <Laptop position={on(PLACE.stairs, 1.35, 0.78, 1.15)} rotationY={-0.35} screenText="MC READY" screenColor="#5de8a0" scale={0.95} /> : null}
            <Son {...approach} animation={picked ? "hold" : approach.animation} face="happy">
              {picked ? <Laptop position={[0, -0.1, 0.34]} scale={0.75} screenText="JOINING!" screenColor="#5de8a0" /> : null}
            </Son>
          </>
        );
      },
    },
  ],
});
