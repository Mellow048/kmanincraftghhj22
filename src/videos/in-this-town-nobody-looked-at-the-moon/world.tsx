import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone, useActiveShot, useFilmTime } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Bell,
  Fence,
  ForestEdge,
  Hut,
  IronGolem,
  Lantern,
  LanternLine,
  LanternPost,
  Moonlight,
  Pine,
  Scarecrow,
  Stall,
  Stars,
  StrawHat,
  Well,
  WellLid,
  Wheat,
} from "../../../Topics/InThisTown";
import { AT_DOOR, CROWS, LID_TOP, LOOSE_HAT, MARCHERS, MoonEye, PLACE, PoleDown, RuleSign, SIGN_FACING, Tally, WellWater, atDoor, leaderAt, marcher, skyAt } from "./kit";
import type { Sky } from "./kit";

/**
 * THE TOWN AT NIGHT, in two zones. A shot names the zone it plays in.
 *
 *   village  The town, and everything you can see from it: the fields up the lane, the forest, the sky.
 *   fields   Only the wheat, the forest and the sky: for shots out there that never look back at the houses.
 *
 * It all lies on one line, north to south (see PLACE in kit.tsx): forest, wheat, fence, lane, square and well,
 * his door; and the moon over his roof, in the south. The street crosses the square west–east.
 *
 * THE LIGHT TELLS THE STORY. The town is warm: lanterns, windows, open doors. The moonlight is cold, and it is
 * a STARE: it lies on one place at a time, the place the moon is looking at. `skyAt()` in kit.tsx decides that
 * for every shot (and the doors, the lid of the well, and where the scarecrows have got to); this file draws it.
 * Parts come from the pack (Topics/InThisTown). 1 unit = 1 metre. Ground is y = 0.
 */

const SHIRTS = ["#5b4a3c", "#4a4f5c", "#5c3f3a", "#4c5540", "#57493f"];
const TILTS = [0.14, -0.1, 0.08, -0.16, 0.1, -0.06, 0.12, -0.12, 0.05, -0.09];

/** 0 while the stare is out on the wheat, 1 when it has come all the way into town. */
const inTown = (sky: Sky) => Math.max(0, Math.min(1, (sky.stare[2] + 16) / 14));

/** The moon, the stars, the ground, and the cold light on whatever the moon is looking at. In every shot. */
const Night: React.FC<{ sky: Sky }> = ({ sky }) => (
  <>
    <Vox kind="grass" tint="#4a7a3c" position={[0, -0.5, 0]} size={[150, 1, 150]} />
    <Stars center={[0, -6, 0]} radius={150} count={170} seed={2} size={4.5} />
    <Stars center={[0, -6, 0]} radius={150} count={26} seed={9} size={7.5} color="#ffffff" />
    <MoonEye position={sky.moon} radius={sky.radius} facing={[0, 2, 0]} eye={sky.eye} look={sky.look} lid={sky.lid} droop={sky.droop} pupil={sky.pupil} />
    {/*
      The light comes from the south, like the moon, but from steeper than the moon hangs: at the moon's own angle
      his house would throw its shadow right across the well. In town it is stronger: it has lanterns to beat.
    */}
    <Moonlight on={sky.stare} from={[sky.stare[0], sky.stare[1] + 85, sky.stare[2] + 53]} radius={sky.reach} power={sky.power} strength={2.4 + 1.1 * inTown(sky)} />
    <LightPool position={[sky.stare[0], 0.11, sky.stare[2]]} width={sky.reach * 2.1} depth={sky.reach * 2.3} color="#b4c8ff" opacity={(0.26 + 0.12 * inTown(sky)) * sky.power} />
    {sky.beam > 0 ? <GodRay position={[sky.stare[0], 16, sky.stare[2]]} width={sky.reach * 0.8} height={32} color="#bcd0ff" opacity={0.3 * sky.beam * sky.power} /> : null}
  </>
);

/** North side: fronts face south, at the usual camera. The lane to the fields runs between the two in the middle. */
const NORTH_ROW: Array<{ at: Vec3; w: number; h: number; d?: number; wall?: "cobble"; tint?: string; roof: string; door: number; windows: number[] }> = [
  { at: [-28.5, 0, -5], w: 6, h: 3.6, tint: "#d8c49a", roof: "#3d5f9a", door: 1.2, windows: [-1.6] },
  { at: [-18.5, 0, -5.5], w: 7, h: 3.8, roof: "#5a4a6a", door: -1.6, windows: [1.6] },
  { at: [-7, 0, -5], w: 9, h: 4.4, d: 7, roof: "#8a3b2a", door: -2.2, windows: [1.9] },
  { at: [7, 0, -5], w: 9, h: 4.2, d: 7, wall: "cobble", roof: "#3d5f9a", door: 2.2, windows: [-1.9] },
  { at: [18.5, 0, -5.5], w: 7, h: 3.8, tint: "#caa268", roof: "#8a3b2a", door: 1.6, windows: [-1.6] },
  { at: [28.5, 0, -5], w: 6, h: 3.6, tint: "#d8c49a", roof: "#5a4a6a", door: -1.2, windows: [1.6] },
];
/** South side: fronts face north, onto the street. The teller's is the one in the middle, and is drawn apart. */
const SOUTH_ROW: Array<{ at: Vec3; w: number; h: number; wall?: "cobble"; tint?: string; roof: string; door: number; windows: number[] }> = [
  { at: [-21, 0, 9.5], w: 6.5, h: 3.8, tint: "#caa268", roof: "#5a4a6a", door: 1.3, windows: [-1.6] },
  { at: [-10.5, 0, 10], w: 7, h: 3.8, tint: "#d8c49a", roof: "#8a3b2a", door: -1.6, windows: [1.7] },
  { at: [10.5, 0, 10], w: 7, h: 3.6, wall: "cobble", roof: "#3d5f9a", door: 1.6, windows: [-1.7] },
  { at: [21, 0, 9.5], w: 6.5, h: 3.8, tint: "#d8c49a", roof: "#8a3b2a", door: -1.3, windows: [1.6] },
];

const Village: React.FC<{ sky: Sky }> = ({ sky }) => (
  <>
    {/* Trodden earth, darker than straw: from above, the hats have to stand out against it. */}
    <Vox kind="path" tint="#9c8468" position={[0, 0.02, 2]} size={[66, 0.06, 4.6]} />
    <Vox kind="path" tint="#9c8468" position={[0, 0.021, 2.25]} size={[13.4, 0.06, 13.8]} />
    <Vox kind="path" tint="#9c8468" position={[0, 0.022, -8.8]} size={[3.4, 0.06, 8.6]} />

    {NORTH_ROW.map((h, i) => (
      <Hut key={`n${i}`} at={h.at} w={h.w} d={h.d ?? 6} h={h.h} wall={h.wall ?? "planks"} tint={h.tint} roof={h.roof} door={h.door} windows={h.windows} lit open={sky.doors} />
    ))}
    {SOUTH_ROW.map((h, i) => (
      <Hut key={`s${i}`} at={h.at} w={h.w} h={h.h} wall={h.wall ?? "planks"} tint={h.tint} roof={h.roof} door={h.door} windows={h.windows} turn={Math.PI} lit open={sky.doors} />
    ))}
    {/* His house: the door in the middle, on the axis, and a lantern by it. */}
    <Hut at={PLACE.home} w={6.5} d={6} h={3.8} tint="#caa268" roof="#3f6b3a" door={0} windows={[-2.15, 2.15]} turn={Math.PI} lit open={sky.home} />
    <Block position={[1.05, 2.78, 9.34]} size={[0.1, 0.1, 0.34]} color="#3a2817" />
    <Lantern position={[1.05, 2.74, 9.22]} chain={0.2} light={16} reach={9} seed={21} sway={0.04} />

    <Well position={PLACE.well} roof={false} />
    <WellWater position={PLACE.well} />
    <WellLid position={PLACE.well} slide={sky.slab} />
    {sky.looseHat ? <StrawHat position={[0.5, LID_TOP + 0.005, PLACE.well[2] + sky.slab + 0.35]} rotation={[0, 0.4, 0]} width={LOOSE_HAT} crown={0.4} /> : null}
    <Tally position={PLACE.well} count={sky.tally} />
    {sky.pole ? <PoleDown position={[1.75, 0.04, 0.5]} rotationY={0.5} /> : null}
    {/* The bench under his window. */}
    <Vox kind="planks" position={[PLACE.bench[0], 0.39, PLACE.bench[2]]} size={[1.7, 0.1, 0.42]} />
    {[-1, 1].map((s) => (
      <Vox key={s} kind="log" position={[PLACE.bench[0] + s * 0.65, 0.17, PLACE.bench[2]]} size={[0.16, 0.34, 0.34]} />
    ))}
    <Bell position={PLACE.bell} />
    <Stall position={PLACE.stall} />
    <Lantern position={[PLACE.stall[0], 2.62, PLACE.stall[2] + 0.55]} chain={0.2} seed={17} sway={0.05} />
    <RuleSign position={PLACE.sign} rotationY={SIGN_FACING} wobble={sky.signWobble} />
    {/*
      Lanterns that stand on things: the corners of the well, the bell's step, the ground. In a town that
      never looks up the light is kept low, and it is the only light that gets in under a brim: these are
      what light the faces.
    */}
    <Lantern position={[1.14, 1.13, 0.86]} chain={0.05} scale={0.8} light={6} reach={6} seed={31} />
    <Lantern position={[-1.14, 1.13, 0.86]} chain={0.05} scale={0.8} light={6} reach={6} seed={32} />
    <Lantern position={[-3.62, 0.97, -1.0]} chain={0.06} light={7} reach={6} seed={33} />
    <Lantern position={[4.3, 0.47, 5.7]} chain={0.06} light={8} reach={7} seed={34} />
    <Lantern position={[-2.25, 0.47, -4.7]} chain={0.06} light={8} reach={7} seed={35} />

    {/* Lanterns strung across the square, from four tall posts, and over the mouth of the lane. */}
    {[-1, 1].map((sx) =>
      [-2.2, 6.2].map((z) => <Vox key={`${sx}${z}`} kind="log" position={[sx * 6.6, 2.3, z]} size={[0.22, 4.6, 0.22]} />),
    )}
    {/* An even number on each line: nothing hangs on the axis, where the moon and the lane are. */}
    <LanternLine from={[-6.6, 4.55, -2.2]} to={[6.6, 4.55, -2.2]} count={6} sag={1.0} lit={[1, 4]} light={26} seed={3} />
    <LanternLine from={[-6.6, 4.55, 6.2]} to={[6.6, 4.55, 6.2]} count={6} sag={1.0} lit={[1, 4]} light={26} seed={9} />
    <LanternLine from={[-2.5, 4.1, -5.15]} to={[2.5, 4.1, -5.15]} count={2} sag={0.45} lit={[0]} light={20} seed={14} />
    <LanternPost position={[-13.5, 0, -0.9]} light={20} seed={5} />
    <LanternPost position={[13.5, 0, -0.9]} seed={6} />
    <LanternPost position={[-20, 0, 4.9]} turn={Math.PI} seed={7} />
    <LanternPost position={[20, 0, 4.9]} turn={Math.PI} seed={8} />

    {(
      [
        [-14.5, -13.2, 4.2],
        [14, -12.8, 4.6],
        [-24, -11.5, 4],
        [25, -12, 4.4],
        [-16, 17.5, 4.4],
        [15.5, 18, 4],
        [-5.5, 19, 4.6],
        [6.5, 19.5, 4.2],
        [-33.5, 2, 4.8],
        [33, 3, 4.4],
      ] as Array<[number, number, number]>
    ).map(([x, z, height], i) => (
      <Tree key={i} position={[x, 0, z]} height={height} leaf={i % 2 ? "#33682a" : "#3c7630"} />
    ))}
    <Vox kind="hay" position={[-3.3, 0.4, -3.9]} size={[0.8, 0.8, 0.8]} />
    <Vox kind="hay" position={[4.4, 0.4, 7.6]} rotationY={0.3} size={[0.8, 0.8, 0.8]} />

    {/* Atmosphere: warm pools under the lanterns, light in the air round them, motes in it. */}
    <LightPool position={[0, 0.08, 2]} width={15} depth={13} color="#ffb869" opacity={0.2} />
    <LightPool position={[-13.5, 0.08, 0.2]} width={6} depth={6} color="#ffb869" opacity={0.22} />
    <LightPool position={[13.5, 0.08, 0.2]} width={6} depth={6} color="#ffb869" opacity={0.22} />
    <LightPool position={[0, 0.08, -8.5]} width={4.5} depth={8} color="#ffb869" opacity={0.14} />
    <Glow position={[0, 3.4, -2.2]} size={7} color="#ffb060" opacity={0.12} />
    <Glow position={[0, 3.4, 6.2]} size={7} color="#ffb060" opacity={0.12} />
    <Dust position={[0, 2.3, 2]} area={[22, 4, 15]} count={70} size={0.05} color="#ffd9a0" opacity={0.7} seed={3} speed={0.22} />
  </>
);

/** The scarecrows, wherever the film has them by now. */
const Crows: React.FC<{ sky: Sky }> = ({ sky }) => {
  const mode = sky.crows;
  if (mode.kind === "none") return null;
  if (mode.kind === "stand")
    return (
      <>
        {CROWS.map(([x, z, facing], i) => (
          <Scarecrow key={i} position={[x, 0, z]} rotationY={facing} scale={0.94 + (i % 3) * 0.04} shirt={SHIRTS[i % SHIRTS.length]} headTilt={TILTS[i + 1]} />
        ))}
        <Scarecrow position={leaderAt(mode.lead)} rotationY={0.08} shirt={SHIRTS[2]} headTilt={TILTS[0]} />
      </>
    );
  if (mode.kind === "march")
    return (
      <>
        {Array.from({ length: MARCHERS }, (_, i) => {
          const m = marcher(i, mode.film);
          return (
            <Scarecrow
              key={i}
              position={m.position}
              rotationY={m.rotationY}
              scale={i === 0 ? 1 : 0.94 + ((i - 1) % 3) * 0.04}
              shirt={i === 0 ? SHIRTS[2] : SHIRTS[(i - 1) % SHIRTS.length]}
              walk={m.walked}
              lean={m.moving ? 0.12 : 0.05}
              headTilt={TILTS[i]}
              eyes={1 - sky.wheat}
            />
          );
        })}
      </>
    );
  return (
    <>
      {AT_DOOR.map((_, i) => {
        const whole = Math.floor(mode.steps);
        const part = mode.steps - whole;
        const m = atDoor(i, mode.steps);
        return (
          <Scarecrow
            key={i}
            position={m.position}
            rotationY={m.rotationY}
            scale={i === 0 ? 1 : 0.94 + ((i - 1) % 3) * 0.04}
            shirt={i === 0 ? SHIRTS[2] : SHIRTS[(i - 1) % SHIRTS.length]}
            walk={(whole + part) * 0.75}
            lean={0.06 + 0.1 * Math.sin(part * Math.PI)}
            headTilt={i === 0 ? TILTS[0] - sky.crowLooks : TILTS[i]}
            eyes={Math.max(1 - sky.power, i === 0 ? sky.crowLooks / 0.6 : 0)}
          />
        );
      })}
    </>
  );
};

/** North of the fence: the strip the golem walks, the wheat, the track through it, and the trees nothing ever came out of. */
const Fields: React.FC<{ sky: Sky }> = ({ sky }) => {
  const t = useFilmTime();
  // The iron golem walks its rounds between the fence and the wheat.
  const lap = 22;
  const along = ((t * 0.85 + 14.7) % (lap * 2)) - lap;
  const golemX = Math.abs(along) - lap / 2;
  return (
    <>
      <Fence from={[-41, 0, -13]} to={[-2.4, 0, -13]} />
      <Fence from={[2.4, 0, -13]} to={[41, 0, -13]} />
      {/* Bare earth from the fence to the trees, so no grass shows between the wheat and the track. */}
      <Block position={[0, 0.006, -30.2]} size={[84, 0.012, 35.2]} color="#3b2f20" castShadow={false} />
      <Vox kind="path" tint="#9a7a52" position={[0, 0.02, -30.2]} size={[3, 0.06, 34.4]} />
      <Wheat position={[-21.2, 0, -30.7]} size={[39.2, 29.4]} glow={sky.wheat} seed={1} />
      <Wheat position={[21.2, 0, -30.7]} size={[39.2, 29.4]} glow={sky.wheat} seed={2} />

      <Crows sky={sky} />
      {sky.patrol ? <IronGolem position={[golemX, 0, -14.5]} rotationY={along > 0 ? Math.PI / 2 : -Math.PI / 2} walk={t * 0.85} hat /> : null}

      <ForestEdge from={[-47, 0, -47]} to={[47, 0, -47]} depth={10} count={48} seed={3} />
      <ForestEdge from={[-43.5, 0, -47]} to={[-43.5, 0, -8]} back={[-1, 0, 0]} depth={8} count={18} seed={5} />
      <ForestEdge from={[43.5, 0, -47]} to={[43.5, 0, -8]} back={[1, 0, 0]} depth={8} count={18} seed={6} />
      <Pine position={[-5.5, 0, -46.2]} height={10.5} />
      <Pine position={[5, 0, -46.6]} height={11.5} />

      <Dust position={[0, 1.7, -27]} area={[52, 2.6, 28]} count={90} size={0.055} color="#dfe8ff" opacity={0.75 * (0.25 + 0.75 * sky.wheat)} seed={11} speed={0.16} />
    </>
  );
};

export const World: React.FC = () => {
  const active = useActiveShot();
  const sky = skyAt(active?.shot.cue ?? "1.wake", active?.t ?? 0);
  return (
    <>
      <Zone name="night" with={["village", "fields"]}>
        <Night sky={sky} />
      </Zone>
      <Zone name="village">
        <Village sky={sky} />
      </Zone>
      <Zone name="fields" with={["village"]}>
        <Fields sky={sky} />
      </Zone>
    </>
  );
};
