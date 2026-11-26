import {
  Bill,
  BillStack,
  Bread,
  BreadShelf,
  CitizenLead,
  CompareChestPair,
  ExplainerCrowd,
  FloatingNumber,
  PLACE,
  PriceTag,
  cam,
  ease,
  jolt,
  on,
  pop,
  ramp,
  storyScene,
  timing,
  wordAt,
} from "./kit";

const slapWord = wordAt("6.same", "slaps");
const jumpWord = wordAt("6.jump", "jumps");

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Ten Times Money, Same Four Loaves",
  shots: [
    {
      cue: "6.same",
      ...cam.push({
        on: on(PLACE.bakery, -0.05, 1.25, -0.3),
        dist: 5.0,
        to: 4.1,
        yaw: -14,
        pitch: 10,
        fov: 45,
        screenOffset: [0, 0.06],
      }),
      impacts: [{ at: slapWord, amp: 0.025, dur: 0.22 }],
      zone: "bakery",
      note: "Miles slams thick 10-bill stack cleanly onto the bakery plinth from the left.",
      stage: (t) => {
        const slap = ease(ramp(t, 0, Math.max(0.25, slapWord)));
        return (
          <>
            <BillStack position={on(PLACE.bakery, 0.12, 0.96 + (1 - slap) * 0.45, -0.55)} count={Math.max(2, Math.round(slap * 10))} />
            <CitizenLead
              position={on(PLACE.bakery, -0.95 + slap * 0.25, 0, -0.15)}
              rotationY={0.85}
              animation={slap < 0.7 ? "walk" : "press"}
              animDistance={slap * 0.4}
              face="grin"
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "6.smile",
      ...cam.push({
        on: on(PLACE.bakery, -0.35, 1.32, -0.15),
        dist: 4.6,
        to: 3.8,
        yaw: 16,
        pitch: 6,
        fov: 44,
        screenOffset: [0, 0.06],
      }),
      zone: "bakery",
      note: "Miles celebrates happily in wide bakery courtyard before trouble hits.",
      stage: (t) => {
        const cheer = ease(ramp(t, 0, 1.2));
        return (
          <CitizenLead
            position={on(PLACE.bakery, -0.45, Math.sin(cheer * Math.PI) * 0.18, -0.15)}
            rotationY={0.25 - cheer * 0.35}
            animation={cheer < 0.65 ? "jump" : "cheer"}
            face="grin"
            time={t * 1.4}
          />
        );
      },
    },
    {
      cue: "6.problem",
      ...cam.orbit({
        on: on(PLACE.history, 0, 1.05, 0.25),
        dist: 5.6,
        distTo: 4.7,
        yaw: -14,
        yawTo: 14,
        pitch: 14,
        fov: 46,
        screenOffset: [0, 0.06],
      }),
      zone: "history",
      note: "Unobstructed YESTERDAY vs TODAY CompareChestPair in Plaza with SAME 4 LOAVES above.",
      stage: (t) => {
        const point = ease(ramp(t, 0, 1.3));
        return (
          <>
            <CompareChestPair position={on(PLACE.history, 0, 0, 0.25)} leftLabel="YESTERDAY" rightLabel="TODAY" leftCount={4} rightCount={4} />
            <FloatingNumber text="SAME 4 LOAVES" color="#ffd84d" position={on(PLACE.history, 0, 2.05 + point * 0.15, 0.25)} height={0.2 * pop(t, 0.2)} />
          </>
        );
      },
    },
    {
      cue: "6.ovens",
      ...cam.orbit({
        on: on(PLACE.bakery, 0, 1.2, -1.15),
        dist: 4.8,
        distTo: 4.0,
        yaw: -20,
        yawTo: 20,
        pitch: 10,
        fov: 45,
        screenOffset: [0, 0.06],
      }),
      zone: "bakery",
      note: "Clear BreadShelf close-up showing exact same 4 warm loaves under STILL 4 with zero character blocking.",
      stage: (t) => {
        const count = ease(ramp(t, 0, 1.3));
        return (
          <>
            <BreadShelf position={on(PLACE.bakery, 0, 0, -1.15)} count={4} />
            <FloatingNumber text="STILL 4" color="#ffd84d" position={on(PLACE.bakery, 0, 2.05 + count * 0.12, -1.0)} height={0.22 * pop(t, 0.2)} />
          </>
        );
      },
    },
    {
      cue: "6.bid",
      ...cam.whip({
        from: on(PLACE.bakery, -1.9, 1.6, 3.4),
        on: on(PLACE.bakery, -0.45, 1.25, -0.3),
        onTo: on(PLACE.bakery, 0.45, 1.25, -0.45),
        fov: 42,
        ease: "inOutSine",
      }),
      screenOffset: [0, 0.12],
      zone: "bakery",
      note: "Fast whip-pan across competing buyers lunging inward waving bills for 1 bread loaf.",
      stage: (t) => {
        const surge = ease(ramp(t, 0, 1.2));
        return (
          <>
            <Bread position={on(PLACE.bakery, 0, 0.96, -0.55)} scale={1.7} />
            <ExplainerCrowd
              positions={[
                on(PLACE.bakery, -0.78 + surge * 0.2, 0, 0.35 - surge * 0.25),
                on(PLACE.bakery, 0.78 - surge * 0.2, 0, 0.4 - surge * 0.25),
                on(PLACE.bakery, -0.45, 0, 1.05 - surge * 0.2),
                on(PLACE.bakery, 0.45, 0, 1.05 - surge * 0.2),
              ]}
              rotationY={Math.PI}
              animation="reachUp"
              seed={8}
            />
            <Bill position={on(PLACE.bakery, -0.35, 1.45 + Math.sin(t * 9) * 0.14, -0.1)} rotation={[0.4, 0.2, 0]} />
            <Bill position={on(PLACE.bakery, 0.38, 1.45 + Math.cos(t * 9) * 0.14, -0.1)} rotation={[0.4, -0.2, 0]} />
          </>
        );
      },
    },
    {
      cue: "6.jump",
      ...cam.push({
        on: on(PLACE.bakery, 0.05, 1.45, -0.35),
        dist: 3.9,
        to: 2.65,
        yaw: 28,
        pitch: -3,
        fov: 40,
        screenOffset: [0, 0.04],
      }),
      impacts: [{ at: jumpWord, amp: 0.028, dur: 0.25 }],
      zone: "bakery",
      note: "PriceTag slams 1->10 with screen impact while shocked Miles steps backward under red 10x!",
      stage: (t) => {
        const flipped = t >= Math.min(0.95, jumpWord);
        const step = ease(ramp(t, Math.min(0.95, jumpWord), 1.55));
        return (
          <>
            <Bread position={on(PLACE.bakery, -0.15, 0.96, -0.55)} scale={1.25} />
            <PriceTag text={flipped ? "10" : "1"} position={on(PLACE.bakery, -0.15, 2.25 + jolt(t, Math.min(0.95, jumpWord), 0.18), -0.5)} scale={1.15 + (flipped ? 0.15 : 0)} swing={Math.sin(t * 10) * 0.15} />
            <CitizenLead position={on(PLACE.bakery, 0.45 + step * 0.25, 0, 0.25 + step * 0.2)} rotationY={-0.55} animation={flipped ? "panic" : "lookAround"} face="wow" time={t * 1.3} />
            <FloatingNumber text="10x!" color="#ff4f42" position={on(PLACE.bakery, -0.35, 2.1, -0.2)} height={0.32 * pop(t, Math.min(0.95, jumpWord))} />
          </>
        );
      },
    },
  ],
});
