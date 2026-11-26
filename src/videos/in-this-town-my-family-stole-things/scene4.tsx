import { cam, storyScene } from "../../engine";
import { Berries, DogVillager, IronGolem, PLACE, RedFlower, SillCup, Teller, ease, jolt, ramp, timing, wordAt } from "./kit";

const TURN = wordAt("8.turn", "turned");
const RAN = wordAt("8.ran", "ran");
const DROP = wordAt("9.drop", "dropped");
const ATE = wordAt("9.ate", "ate");

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "A fox in a village at noon",
  shots: [
    {
      cue: "8.walk",
      ...cam.truck({ on: [-7.9, 0.75, -2.0], by: [-1.8, 0, 0], dist: 3.4, yaw: 68, pitch: 6, fov: 40, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-day",
      note: "Broad noon daylight tracking alongside Teller slinking exposed down center cobblestone street holding red flower.",
      stage: (t, { p }) => (
        <Teller position={[PLACE.path[0] + 2.6 - 1.9 * p, 0, PLACE.path[2] + 0.4]} rotationY={-1.571} animation="creep" animDistance={1.9 * p} face="brave" ears={0.75} carry={<RedFlower scale={0.8} rotation={[0, 0, 1.5]} />} tailUp={0.12} time={t} />
      ),
    },
    {
      cue: "8.dogs",
      ...cam.whip({ from: [-8.2, 0.85, 0.6], on: [PLACE.path[0] + 2.1, 0.6, PLACE.path[2] - 0.1], onTo: [PLACE.path[0] + 3.4, 0.65, PLACE.path[2] + 1.3], fov: 40 }),
      zone: "street",
      look: "overworld-day",
      note: "Whip pan onto snarling town dogs bounding up aggressively as Teller flinches backward in terror.",
      stage: (t) => {
        const lunge = ease(ramp(t, 0, 0.9));
        return (
          <>
            <DogVillager who={1} position={[PLACE.path[0] + 3.6 - lunge * 0.55, 0, PLACE.path[2] + 1.6 - lunge * 0.45]} rotationY={-0.45} scale={0.84} walk={lunge * 1.4} bark={1} tailUp={0.2} lookAt={[PLACE.path[0] + 2.2, 0.5, PLACE.path[2] - 0.2]} />
            <DogVillager who={2} position={[PLACE.path[0] + 4.3 - lunge * 0.45, 0, PLACE.path[2] + 0.8]} rotationY={-0.8} scale={0.78} walk={lunge * 1.3} bark={1} tailUp={0.25} lookAt={[PLACE.path[0] + 2.2, 0.5, PLACE.path[2] - 0.2]} />
            <Teller position={[PLACE.path[0] + 2.2 + lunge * 0.25, 0, PLACE.path[2] - 0.2]} rotationY={-0.6} animation="panic" face="fear" ears={1} tailUp={0} time={t} />
          </>
        );
      },
    },
    {
      cue: "8.turn",
      ...cam.dollyZoom({ on: [-10.0, 1.25, -2.2], dist: 5.5, to: 3.4, yaw: 44, pitch: 10, fov: 36, screenOffset: [0, 0.06] }),
      impacts: [{ at: TURN, amp: 0.025, dur: 0.22 }],
      zone: "street",
      look: "overworld-day",
      note: "Hitchcock dolly-zoom as Iron Golem spins round sharply onto Teller freezing him mid-step.",
      stage: (t) => {
        const pivot = ease(ramp(t, Math.max(0.05, TURN - 0.15), TURN + 0.25));
        return (
          <>
            <IronGolem position={[PLACE.path[0] - 0.2, 0, PLACE.path[2] - 1.6]} rotationY={0.15 + pivot * 0.85} armR={-0.5 - pivot * 0.5} armL={-0.4} headPitch={0.35} walk={pivot * 0.6} />
            <Teller position={[PLACE.path[0] + 1.5 - pivot * 0.25, 0, PLACE.path[2] + 0.6]} rotationY={0.52} animation={pivot > 0.35 ? "scared" : "creep"} face={t > TURN ? "fear" : "brave"} ears={t > TURN ? 1 : 0.5} carry={<RedFlower scale={0.8} rotation={[0, 0, 1.5]} />} tailUp={0.05} time={t} />
          </>
        );
      },
    },
    {
      cue: "8.ran",
      ...cam.truck({ on: [-7.5, 0.72, -1.2], by: [-3.1, 0, 0], dist: 3.4, yaw: 82, pitch: 5, fov: 42, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-day",
      note: "Full-speed chase track as Teller bolts west down lane ears pinned back with flower and Dog lunging behind.",
      stage: (t, { p }) => (
        <>
          <Teller position={[PLACE.path[0] + 4.4 - 3.2 * p, 0, PLACE.path[2] + 1.4]} rotationY={-1.571} animation="run" animDistance={3.2 * p} face={t > RAN ? "fear" : "fear"} ears={1} carry={<RedFlower scale={0.8} rotation={[0, 0, 1.5]} />} tailUp={0.85} time={t} />
          <DogVillager who={1} position={[PLACE.path[0] + 5.7 - 3.1 * p, 0, PLACE.path[2] + 1.3]} rotationY={-1.571} scale={0.82} walk={2.8 * p} bark={1} tailUp={0.4} />
        </>
      ),
    },
    {
      cue: "9.night",
      ...cam.crane({ on: [-8.85, 1.35, -4.65], dist: 3.3, toDist: 2.15, yaw: 16, fromPitch: -6, toPitch: 12, fov: 38, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-sunset",
      note: "Teller creeps eagerly up beneath moonlit sill smelling fresh glowing heap of red berries.",
      stage: (t) => {
        const sneak = ease(ramp(t, 0, 1.2));
        return (
          <>
            <SillCup position={[PLACE.sill[0] + 0.32, PLACE.sill[1], PLACE.sill[2] + 0.1]} />
            <Berries position={[PLACE.sill[0] - 0.1, PLACE.sill[1] + 0.04, PLACE.sill[2] + 0.08]} scale={1.25} count={9} t={t} />
            <Teller position={[-9.2, 0, -3.55 - sneak * 0.25]} rotationY={0.15} animation="reachUp" lookAt={PLACE.sill} carry={<RedFlower scale={0.8} rotation={[0, 0, 1.5]} />} face="wow" time={t} />
          </>
        );
      },
    },
    {
      cue: "9.drop",
      ...cam.push({ on: [-8.78, 1.55, -4.65], dist: 3.1, to: 1.9, yaw: -16, pitch: 8, fov: 38, screenOffset: [0, 0.08] }),
      impacts: [{ at: DROP, amp: 0.02, dur: 0.2 }],
      zone: "street",
      look: "overworld-sunset",
      note: "On dropped: flower falls cleanly out of Teller's jaw onto sill wood right beside tempting red berries.",
      stage: (t) => {
        const k = Math.min(1, Math.max(0, (t - DROP + 0.12) / 0.32));
        return (
          <>
            <Berries position={[PLACE.sill[0] - 0.28, PLACE.sill[1] + 0.04, PLACE.sill[2] + 0.08]} scale={1.2} count={9} t={t} />
            <RedFlower position={[PLACE.sill[0] + 0.16, PLACE.sill[1] + 0.14 - 0.12 * k + jolt(t, DROP, 0.15), PLACE.sill[2] + 0.24 + 0.1 * k]} scale={0.8} rotation={[0, 0, 1.5 + 1.2 * k]} />
            <Teller position={[PLACE.sill[0] + 0.4, 0, PLACE.sill[2] + 1.05 - k * 0.1]} rotationY={-0.21} animation={k < 0.8 ? "reachUp" : "leanOver"} face="smile" tailUp={0.55} time={t} />
          </>
        );
      },
    },
    {
      cue: "9.ate",
      ...cam.orbit({ on: [-9.1, 1.4, -4.85], dist: 3.2, distTo: 2.05, yaw: 20, yawTo: -16, pitch: 6, fov: 40, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-sunset",
      note: "Teller gobbles berries eagerly off the sill while wilted red flower lies abandoned behind his nose.",
      stage: (t) => {
        const chomp = ease(ramp(t, 0, Math.max(0.4, ATE + 0.4)));
        return (
          <>
            <Berries position={[PLACE.sill[0] - 0.2, PLACE.sill[1] + 0.04, PLACE.sill[2] + 0.1]} scale={1.1} count={Math.max(1, Math.round(7 - chomp * 5))} t={t} />
            <RedFlower position={[PLACE.sill[0] + 0.5, PLACE.sill[1] + 0.1, PLACE.sill[2] + 0.3]} scale={0.8} rotation={[0, 0, 2.6]} wilt={0.4 + chomp * 0.2} />
            <Teller position={[PLACE.sill[0] - 0.2, chomp * 0.05, PLACE.sill[2] + 1.0]} rotationY={0.28 + Math.sin(t * 9) * 0.14} animation="leanOver" face="laugh" carry={<Berries scale={0.8} count={Math.max(1, Math.round(3 - chomp * 2))} t={t} />} tailUp={0.65} time={t} />
          </>
        );
      },
    },
    {
      cue: "9.nothing",
      ...cam.push({ on: [-9.3, 0.9, -3.9], dist: 4.1, to: 2.65, yaw: 34, pitch: 8, fov: 40, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-sunset",
      note: "Teller trudges away west empty-mouthed with drooping tail while abandoned flower stays on empty sill.",
      stage: (t, { p }) => (
        <>
          <SillCup position={[PLACE.sill[0] + 0.32, PLACE.sill[1], PLACE.sill[2] + 0.1]} />
          <RedFlower position={[PLACE.sill[0] + 0.5, PLACE.sill[1] + 0.1, PLACE.sill[2] + 0.3]} scale={0.8} rotation={[0, 0, 2.6]} wilt={0.55} />
          <Teller position={[PLACE.sill[0] - 0.1 - 1.9 * ease(p), 0, PLACE.sill[2] + 1.1]} rotationY={-1.571} animation="stagger" animDistance={2.2 * p} face="frown" tailUp={0.05} time={t} />
        </>
      ),
    },
  ],
});
