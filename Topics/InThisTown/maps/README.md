# InThisTown map kit

All positions are **metres**, with ground at `y=0`. The neighborhood street follows `+Z` into the school. No map component owns the camera or an actor. Import only what the film needs and mount it **once** in `world.tsx`.

```tsx
import { NeighborhoodMap, SchoolMap, RestroomMap, MARKS, TOWN } from "../../../Topics/InThisTown/maps";

export const World = () => (
  <group>
    <NeighborhoodMap />
    <SchoolMap />
    {/* <RestroomMap position={[...]} /> only after adding a real hall doorway */}
    {/* Add film-specific key/practical/rim lights + GodRay, LightPool, Glow, Dust here. */}
  </group>
);
```

- `NeighborhoodMap`: two rows of individual houses, windows and porches, hedges/trees, sidewalk, road stripes, two detailed cars, lampposts, egg-day sign. `House` and `TownCar` are also exported so future shorts can add neighbors without duplicating geometry.
- `SchoolMap`: connected entrance at **z=3.55**, hall **z=3.55–8.65**, classroom beyond the second doorway at **z=8.65–16.25**. Lockers, signs, clock, ceiling tiles, classroom desks/chairs, blackboard, windows and light fixtures are part of the same world. `ClassDesk` is exported for rearranging a classroom.
- `RestroomMap`: optional small school bathroom with stalls, sink, mirror, sign and light. It is **not** mounted in reference #1: a camera may only enter after you place it next to a hall and build a real doorway. Never cut through a wall.
- `MARKS` / `TOWN` in `marks.ts`: named positions for the egg, leads, creatures, two thresholds and final rank board. Copy literal camera `to`/`targetTo`/`fovTo` into the next scene's `from`/`target`/`fov`; the linter currently parses literal arrays.

For a new story, copy these maps into your *world layout*, not into each scene. Recolour or extend them for the specific premise. Keep the school shell split around its openings, hide world edges, leave the central classroom aisle clear for a reveal, and check that the camera physically passes through each threshold.
