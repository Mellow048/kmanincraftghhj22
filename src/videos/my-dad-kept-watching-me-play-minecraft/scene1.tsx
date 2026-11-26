import {
  BadgePop,
  ChatToast,
  Creeper,
  Dad,
  DeskSetup,
  PLACE,
  Son,
  StarterHouse,
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

const dadSatWord = wordAt("1.sat", "sat");
const heartWord = wordAt("1.loop", "heart");

/**
 * Scene 1 — Hook & Open Loop (`0:00–0:11`, Up Happy 0:02+):
 *   Dad quietly watching behind Sam's PC chair -> sits at PC himself -> launches survival world -> warning hook!
 */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Watching Over My Shoulder",
  shots: [
    {
      cue: "1.hook",
      ...cam.orbit({
        on: on(PLACE.irl, -0.85, 1.38, -0.35),
        dist: 3.5,
        distTo: 3.05,
        yaw: 146,
        yawTo: 128,
        pitch: 6,
        fov: 48,
        screenOffset: [0, 0.04],
      }),
      zone: "irl",
      note: "Front-side hook: Sam smiles happily gaming at PC (desk lamp off so zero glare, tags hidden for clean framing) while Dad peeks curiously around the left doorway.",
      stage: (t) => (
        <>
          <DeskSetup position={on(PLACE.irl, 0, 0, -1.25)} screenText="MINECRAFT" screenColor="#4be08a" clockText="9:45 PM" lampOn={false} />
          <Son position={on(PLACE.irl, 0, 0.08, -0.43)} rotationY={Math.PI} animation="sit" face="happy" nameTag="" time={t} />
          <Dad position={on(PLACE.irl, -2.55, 0, -0.15)} rotationY={Math.PI * 0.48} animation="peek" headYaw={0.2} face="wow" nameTag="" time={t} />
        </>
      ),
    },
    {
      cue: "1.watch",
      ...cam.push({
        on: on(PLACE.irl, -0.45, 1.32, -0.30),
        dist: 4.7,
        to: 3.9,
        yaw: -18,
        pitch: 10,
        fov: 46,
        screenOffset: [0, 0.05],
      }),
      zone: "irl",
      note: "Over-shoulder angle cleanly framing BOTH Dad beaming warmly beside the chair and Sam mining blocks on screen.",
      stage: (t) => (
        <>
          <DeskSetup position={on(PLACE.irl, 0, 0, -1.25)} screenText="SURVIVAL" screenColor="#4be08a" clockText="10:15 PM" lampOn={false} />
          <Son position={on(PLACE.irl, 0, 0.08, -0.43)} rotationY={Math.PI} animation="sit" face="smile" time={t} />
          <Dad position={on(PLACE.irl, -0.82, 0, -0.15)} rotationY={Math.PI - 0.35} animation="lookAround" face="bearded" badge="heart" badgePopStart={0.2} time={t} />
        </>
      ),
    },
    {
      cue: "1.sat",
      ...cam.orbit({
        on: on(PLACE.irl, 0, 1.2, -0.4),
        dist: 4.9,
        distTo: 4.2,
        yaw: -22,
        yawTo: 20,
        pitch: 14,
        fov: 44,
        screenOffset: [0, 0.06],
      }),
      zone: "irl",
      note: "Sam steps out; Dad walks eagerly toward PC chair and sits down carefully.",
      stage: (t) => {
        const sat = t >= dadSatWord;
        const dadWalk = walkSegment(on(PLACE.irl, -0.95, 0, 0.55), on(PLACE.irl, 0, 0, -0.3), t, 0, Math.max(0.45, dadSatWord), {
          gait: "walk",
          endYaw: Math.PI,
        });
        return (
          <>
            <DeskSetup position={on(PLACE.irl, 0, 0, -1.25)} screenText="JOIN WORLD?" screenColor="#ffd84d" clockText="4:10 PM" />
            {sat ? (
              <Dad position={on(PLACE.irl, 0, 0.08, -0.43)} rotationY={Math.PI} animation="sit" face="wow" badge="!" badgePopStart={dadSatWord} time={t} />
            ) : (
              <Dad {...dadWalk} face="smile" />
            )}
          </>
        );
      },
    },
    {
      cue: "1.pc",
      ...cam.push({
        on: on(PLACE.irl, 0, 1.25, -0.55),
        dist: 4.5,
        to: 3.7,
        yaw: 18,
        pitch: 12,
        fov: 42,
        screenOffset: [0, 0.05],
      }),
      zone: "irl",
      note: "Dad sits leaning forward reaching clumsily for keyboard as monitor loads Sam's starter house.",
      stage: (t) => (
        <>
          <DeskSetup position={on(PLACE.irl, 0, 0, -1.25)} screenText="LOADING SMP" screenColor="#5cc8ff" clockText="4:11 PM" />
          <Dad position={on(PLACE.irl, 0, 0.08, -0.43)} rotationY={Math.PI} animation="sit" face="calm" time={t} />
          <ChatToast text="Dad joined the game" position={on(PLACE.irl, 0, 2.25, -0.9)} height={0.1 * pop(t, 0.25)} />
        </>
      ),
    },
    {
      cue: "1.loop",
      ...cam.orbit({
        on: on(PLACE.server, 0, 1.25, 0.9),
        dist: 6.4,
        distTo: 5.2,
        yaw: -24,
        yawTo: 18,
        pitch: 14,
        fov: 45,
        screenOffset: [0, 0.04],
      }),
      zone: "server",
      note: "Wide ominous SMP reveal: Dad outside Sam's cozy StarterHouse unaware of green Creeper sneaking up.",
      stage: (t) => (
        <>
          <StarterHouse position={on(PLACE.server, 0, 0, -2.0)} state="intact" />
          <Dad position={on(PLACE.server, 0.2, 0, 1.2)} rotationY={Math.PI * 0.2} animation="lookAround" face="uneasy" time={t} />
          <Creeper position={on(PLACE.server, -0.7, 0, 0.3)} rotationY={0.45} fuse={ease(ramp(t, 0.3, 1.2)) * 0.35} />
          <BadgePop kind="broken" position={on(PLACE.server, 0.2, 2.75, 1.2)} popStart={Math.max(0.2, heartWord)} t={t} />
        </>
      ),
    },
  ],
});
