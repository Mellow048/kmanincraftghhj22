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
  on,
  pop,
  storyScene,
  timing,
} from "./kit";

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Same Four Loaves, Ten Times Cash",
  shots: [
    {
      cue: "6.same",
      ...cam.push({
        on: on(PLACE.bakery, -0.2, 1.25, 0.8),
        dist: 3.7,
        to: 3.0,
        yaw: 16,
        pitch: 8,
        fov: 40,
      }),
      zone: "bakery",
      note: "Miles runs back into the bakery square carrying a thick BillStack of ten emeralds.",
      stage: (t) => (
        <CitizenLead
          position={on(PLACE.bakery, -0.8 + t * 0.85, 0, 1.1)}
          rotationY={0.45}
          animation="run"
          animDistance={t * 2.2}
          face="happy"
        >
          <BillStack position={[0, -0.05, 0.2]} count={10} />
        </CitizenLead>
      ),
    },
    {
      cue: "6.problem",
      ...cam.orbit({
        on: on(PLACE.bakery, 0, 1.0, 0.3),
        dist: 4.5,
        yaw: -14,
        yawTo: 14,
        pitch: 12,
        fov: 42,
      }),
      zone: "bakery",
      note: "Twin CompareChestPair (YESTERDAY vs TODAY) + BreadShelf proving output stayed flat at 4 loaves.",
      stage: (t) => (
        <>
          <CompareChestPair
            position={on(PLACE.bakery, 0, 0, 0.3)}
            leftLabel="YESTERDAY"
            rightLabel="TODAY"
            leftCount={4}
            rightCount={4}
          />
          <BreadShelf position={on(PLACE.bakery, 0, 0, -1.2)} count={4} />
          <FloatingNumber text="SAME 4 LOAVES" color="#ffd84d" position={on(PLACE.bakery, 0, 2.35, -0.4 + t * 0.01)} height={0.52 * pop(t, 0.25)} />
        </>
      ),
    },
    {
      cue: "6.bid",
      ...cam.whip({
        from: on(PLACE.bakery, -2.5, 1.6, 3.3),
        on: on(PLACE.bakery, -0.8, 1.25, -0.4),
        onTo: on(PLACE.bakery, 0.4, 1.25, -0.5),
        fov: 42,
      }),
      zone: "bakery",
      note: "Whip pan across rich players waving banknotes and crowding around the single loaf on the plinth.",
      stage: (t) => (
        <>
          <Bread position={on(PLACE.bakery, 0, 0.96, -0.6)} scale={1.7} />
          <ExplainerCrowd
            positions={[
              on(PLACE.bakery, -1.2, 0, 0.2),
              on(PLACE.bakery, 1.25, 0, 0.25),
              on(PLACE.bakery, -0.7, 0, 1.0),
              on(PLACE.bakery, 0.75, 0, 1.05),
            ]}
            rotationY={Math.PI}
            animation="reachUp"
            seed={8}
          />
          <Bill position={on(PLACE.bakery, -0.45, 1.35 + Math.sin(t * 7) * 0.06, -0.1)} rotation={[0.4, 0.2, 0]} />
          <Bill position={on(PLACE.bakery, 0.5, 1.35 + Math.cos(t * 7) * 0.06, -0.1)} rotation={[0.4, -0.2, 0]} />
        </>
      ),
    },
    {
      cue: "6.jump",
      ...cam.push({
        on: on(PLACE.bakery, 0, 1.4, -0.55),
        dist: 3.3,
        to: 2.6,
        yaw: -10,
        pitch: 8,
        fov: 38,
      }),
      zone: "bakery",
      note: "PriceTag flips from 1 to 10 in red-gold shock as Miles watches his wallet shrink.",
      stage: (t) => (
        <>
          <Bread position={on(PLACE.bakery, 0, 0.96, -0.6)} scale={1.7} />
          <PriceTag
            text={t > 0.85 ? "10" : "1"}
            position={on(PLACE.bakery, 0, 1.9, -0.55)}
            scale={1.25}
            swing={Math.sin(t * 9) * 0.16}
          />
          <CitizenLead
            position={on(PLACE.bakery, 1.0, 0, 0.25)}
            rotationY={-0.75}
            animation="scared"
            face="wow"
            time={t}
          />
          <FloatingNumber text="10x PRICE" color="#ff4f42" position={on(PLACE.bakery, -0.8, 1.8, -0.4)} height={0.6 * pop(t, 0.85)} />
        </>
      ),
    },
  ],
});
