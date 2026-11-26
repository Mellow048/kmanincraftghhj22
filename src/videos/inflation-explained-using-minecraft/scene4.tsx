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
        dist: 3.8,
        to: 2.55,
        yaw: -16,
        pitch: 9,
        fov: 38,
        screenOffset: [0, 0.12],
      }),
      impacts: [{ at: slapWord, amp: 0.025, dur: 0.22 }],
      zone: "bakery",
      note: "Miles strides forward and slams thick 10-bill stack squarely onto the stone bakery plinth.",
      stage: (t) => {
        const slap = ease(ramp(t, 0, Math.max(0.25, slapWord)));
        return (
          <>
            <BillStack position={on(PLACE.bakery, 0.12, 0.96 + (1 - slap) * 0.45, -0.55)} count={Math.max(2, Math.round(slap * 10))} />
            <CitizenLead
              position={on(PLACE.bakery, -0.82 + slap * 0.32, 0, -0.15)}
              rotationY={0.85}
              animation={slap < 0.7 ? "walk" : "press"}
              animDistance={slap * 0.45}
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
        on: on(PLACE.bakery, -0.45, 1.32, -0.15),
        dist: 2.95,
        to: 1.75,
        yaw: 16,
        pitch: 4,
        fov: 38,
        screenOffset: [0, 0.14],
      }),
      zone: "bakery",
      note: "Miles pumps fists jumping happily before turning head nervously as trouble builds.",
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
        on: on(PLACE.bakery, 0, 1.0, 0.3),
        dist: 5.1,
        distTo: 3.9,
        yaw: -14,
        yawTo: 14,
        pitch: 14,
        fov: 42,
        screenOffset: [0, 0.06],
      }),
      zone: "bakery",
      note: "Sweeping orbit across YESTERDAY vs TODAY chests while Miles points urgently between identical loaves.",
      stage: (t) => {
        const point = ease(ramp(t, 0, 1.3));
        return (
          <>
            <CompareChestPair position={on(PLACE.bakery, 0, 0, 0.3)} leftLabel="YESTERDAY" rightLabel="TODAY" leftCount={4} rightCount={4} />
            <CitizenLead position={on(PLACE.bakery, -0.35 + point * 0.65, 0, 1.15)} rotationY={Math.PI - 0.3} animation="point" animDistance={point * 0.5} face="wow" time={t} />
            <FloatingNumber text="SAME 4 LOAVES" color="#ffd84d" position={on(PLACE.bakery, 0, 2.05 + point * 0.2, 0.25)} height={0.28 * pop(t, 0.2)} />
          </>
        );
      },
    },
    {
      cue: "6.ovens",
      ...cam.orbit({
        on: on(PLACE.bakery, 0, 1.2, -1.1),
        dist: 4.1,
        distTo: 2.95,
        yaw: -24,
        yawTo: 24,
        pitch: 9,
        fov: 40,
        screenOffset: [0, 0.06],
      }),
      zone: "bakery",
      note: "Orbit sweeps across BreadShelf while Miles leans forward counting all 4 warm loaves.",
      stage: (t) => {
        const count = ease(ramp(t, 0, 1.3));
        return (
          <>
            <BreadShelf position={on(PLACE.bakery, 0, 0, -1.15)} count={4} />
            <CitizenLead position={on(PLACE.bakery, -0.55 + count * 0.25, 0, -0.45)} rotationY={0.95} animation="leanOver" face="frown" time={t} />
            <FloatingNumber text="STILL 4" color="#ffd84d" position={on(PLACE.bakery, 0, 2.0 + count * 0.18, -1.0)} height={0.3 * pop(t, 0.2)} />
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
