import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, Torch, Tree, Vox, Zone, useActiveShot } from "../../engine";
import { Bell, BedBox, GlassJar, Hut, LampPost, Room, RopeLine, Screw, Stall, Stool, Well } from "../../../Topics/InThisTown";
import { BED, DownwardGolem, Loaves, PLACE, ramp, room, tunnel, wordAt } from "./kit";

/**
 * MAP — the same 52 × 36 m miniature town is used in the opening and inside the final toy box.
 * +Z is south (house fronts / our usual lens), +X is east, y=0 is the town floor AND the shelf.
 *
 * village : x -26…26, z -17…19. Market east, empty house west. The bell is north.
 * room    : the kid's room, origin z=80; south wall absent for filming (approved Room).
 * passage : the space behind the north scenery, re-based to z=130 for its close-up coverage.
 * shelf   : the actual outside of that north wall, z<-17. Jar and exit are on the SAME shelf.
 * bedroom : the scale reveal. Shares Village, Shelf and Case with no alternate miniature model.
 *
 * A giant Player is 32 times the town scale. Its room is built from the unchanged pack Room/BedBox.
 */

const bellWords: Record<string, string> = {
  "1.freeze": "bell", "3.baskets": "froze", "3.second": "ring", "6.shadow": "bell",
  "15.ring": "ring", "17.rope": "bell", "17.second": "shut",
};

/** The rope / striker is film-owned; the bell itself is the approved pack Bell. */
export const BellRig: React.FC = () => {
  const active = useActiveShot();
  const cue = active?.shot.cue ?? "";
  const t = active?.t ?? 0;
  const at = bellWords[cue] ? wordAt(cue, bellWords[cue]) : cue === "6.twitch" ? wordAt(cue, "twitch") : 10000;
  const x = Math.max(0, t - at);
  const hit = x > 0 ? Math.exp(-x * 5.5) * Math.sin(x * 24) : 0;
  return <>
    <RopeLine from={[0, 5.6, -8.8]} to={[0, 6.05 + hit * 0.14, -11.5]} radius={0.06} />
    <RopeLine from={[0, 6.05 + hit * 0.14, -11.5]} to={[0, 6.08, -17.5]} radius={0.06} />
    <mesh position={[0, 5.5, -8.8]} rotation-z={hit * 0.38}><boxGeometry args={[0.07, 0.6, 0.07]} /><meshStandardMaterial color="#6d4e29" /></mesh>
    <Block position={[hit * 0.14, 5.2, -8.8]} size={[0.14, 0.16, 0.14]} color="#b99043" metalness={0.6} />
    <Block position={[0, 6.08, -16.71]} size={[0.64, 0.65, 0.06]} color="#1a1719" />
    <RopeLine from={[0, 6.08, -17.5]} to={[0, 6.08, -16.6]} radius={0.07} />
  </>;
};

const Tower: React.FC = () => <>
  <Vox kind="cobble" position={[0, 1.75, -8.8]} size={[3.8, 3.5, 3.4]} />
  <Vox kind="stone" position={[0, 3.55, -8.8]} size={[4.3, 0.2, 3.9]} />
  <Bell position={PLACE.bell} />
  {[-1, 1].flatMap((x) => [-1, 1].map((z) => <Vox key={`${x}${z}`} kind="log" position={[x * 1.8, 5.25, -8.8 + z * 1.5]} size={[0.3, 3.4, 0.3]} />))}
  <Vox kind="darkPlanks" tint="#354b77" position={[0, 7.05, -8.8]} size={[4.6, 0.4, 4.3]} />
  <Vox kind="darkPlanks" tint="#425b8a" position={[0, 7.5, -8.8]} size={[3.5, 0.5, 3.1]} />
  <Vox kind="darkPlanks" tint="#4c669b" position={[0, 7.95, -8.8]} size={[2.3, 0.4, 2]} />
  {Array.from({ length: 7 }, (_, i) => <Vox key={i} kind="stone" position={[2.65, (i + 1) * 0.25, -5.5 - i * 0.5]} size={[1.35, (i + 1) * 0.5, 0.5]} />)}
  <Torch position={[-1.2, 1.8, -6.95]} light={2} seed={12} />
  <Torch position={[1.2, 1.8, -6.95]} light={2} seed={13} />
  <BellRig />
</>;

/** North scenery has two genuine apertures: a rope slot high up and a loose-board gap at kid height. */
const SceneryWall: React.FC = () => {
  const a = useActiveShot();
  const cue = a?.shot.cue ?? "";
  const dur = a?.shot.dur ?? 1;
  const p = (a?.t ?? 0) / dur;
  const beat = Number(cue.split(".")[0]);
  const shakeAt = cue === "15.ring" ? wordAt(cue, "ring") : 1000;
  const d = Math.max(0, (a?.t ?? 0) - shakeAt);
  const shake = d > 0 ? Math.sin(d * 44) * Math.exp(-d * 6) * 0.035 : 0;
  const open = cue === "10.boards" ? ramp(p, 0.2, 0.8) * 0.5 : cue === "10.wedge" ? ramp(p, 0, 0.85) : beat >= 11 || cue === "10.fit" ? 1 : 0;
  return <>
    <Vox kind="cobble" position={[-11.35, 0.85, -17]} size={[29.3, 1.7, 0.55]} />
    <Vox kind="cobble" position={[15.35, 0.85, -17]} size={[21.3, 1.7, 0.55]} />
    <Vox kind="cobble" position={[0, 3.775, -17]} size={[52, 4.15, 0.55]} />
    <Vox kind="cobble" position={[-13.15, 6.1, -17]} size={[25.7, 0.5, 0.55]} />
    <Vox kind="cobble" position={[13.15, 6.1, -17]} size={[25.7, 0.5, 0.55]} />
    <Vox kind="planks" tint="#84afe0" position={[0, 8.175, -17]} size={[52, 3.65, 0.55]} />
    {[-1, 1].map((s) => <group key={s}>
      <Vox kind="cobble" position={[s * 26, 3.1, 1]} size={[0.5, 6.2, 36]} />
      <Vox kind="planks" tint="#84afe0" position={[s * 26, 8.1, 1]} size={[0.5, 3.8, 36]} />
    </group>)}
    <Vox kind="cobble" position={[0, 3.1, 19]} size={[52, 6.2, 0.5]} />
    <Vox kind="planks" tint="#84afe0" position={[0, 8.1, 19]} size={[52, 3.8, 0.5]} />
    {/* White cutouts against blue boards: clouds from inside, scenery from behind. */}
    {[-18, -8, 7, 18].map((x, i) => <group key={x} position={[x, 8.5 + (i % 2) * 0.45, -16.69]}>
      <Block size={[4.4, 0.72, 0.04]} color="#f4fbff" castShadow={false} />
      <Block position={[-0.6, 0.52, 0]} size={[2.1, 0.5, 0.04]} color="#f4fbff" castShadow={false} />
    </group>)}
    {/* A real dark pocket behind the loose boards, not a black card with sky around its edges. */}
    <Vox kind="darkPlanks" position={[4, -0.08, -17.9]} size={[2.1, 0.16, 2.6]} />
    {[-1,1].map((side) => <Vox key={side} kind="planks" tint="#604b3d" position={[4 + side * 1.05, 0.9, -17.9]} size={[0.15, 1.8, 2.6]} />)}
    <Vox kind="darkPlanks" position={[4, 1.86, -17.9]} size={[2.2, 0.12, 2.6]} />
    {a?.shot.zone === "village" ? <Block position={[4, 0.9, -19.25]} size={[2.1, 1.8, 0.06]} color="#05070e" castShadow={false} /> : null}
    {[-1, 0, 1].map((s) => <group key={s} position={[4 + shake + s * 0.46 + (s <= 0 ? -1 : 1) * open * (s === 0 ? 1.05 : 0.6), 0.88, -16.61]} rotation={[0, s * open * 0.45, s * 0.015]}>
      <Vox kind="darkPlanks" position={[0, 0, 0]} size={[0.44, 1.82, 0.13]} />
      {[-0.65, 0.65].map((y) => <Block key={y} position={[0.1, y, 0.074]} size={[0.045, 0.045, 0.02]} color="#9da8ad" metalness={0.6} />)}
    </group>)}
    {[2.9, 5.1].map((x) => <Vox key={x} kind="log" position={[x, 0.95, -16.57]} size={[0.15, 1.9, 0.18]} />)}
  </>;
};

/** The inhabited model. This component is NOT rebuilt at another scale for the reveal. */
const Village: React.FC = () => <>
  <Vox kind="grass" position={[0, -0.45, 1]} size={[52, 0.9, 36]} />
  <Vox kind="path" position={[0, 0.025, 3.4]} size={[48, 0.05, 4]} />
  <Vox kind="path" position={[0, 0.027, -1.6]} size={[10, 0.055, 14]} />
  <Vox kind="path" position={[5.9, 0.028, -0.3]} size={[7, 0.06, 5]} />
  <Hut at={PLACE.neighborHome} w={6.5} d={5.5} h={3.8} windows={[-1.8, 1.8]} roof="#38629a" />
  <Hut at={PLACE.elderHome} w={5.5} d={5.5} h={3.6} windows={[-1.7, 1.7]} roof="#735273" wall="cobble" />
  <Hut at={PLACE.home} w={6.5} d={5.5} h={3.8} windows={[-1.8, 1.8]} roof="#a65335" />
  <Hut at={[21, 0, -4.8]} w={5} d={5} h={3.7} windows={[1.2]} roof="#3c775b" door={-1.2} />
  <Hut at={[-14, 0, 11]} w={7} d={5.5} h={3.8} windows={[-2, 2]} roof="#9a4138" turn={Math.PI} />
  <Hut at={[1, 0, 11.6]} w={7} d={5.5} h={3.9} windows={[-2, 2]} roof="#416693" turn={Math.PI} />
  <Hut at={[19.3, 0, 11.2]} w={6} d={5} h={3.6} windows={[-1.6, 1.6]} roof="#566e3f" turn={Math.PI} />
  <Vox kind="cobble" position={[-20, 0.25, -4.1]} size={[2.6, 0.5, 1.7]} />
  <Vox kind="wool" tint="#845644" position={[-20, 0.51, -3.9]} size={[1.3, 0.035, 0.8]} />
  <Vox kind="wool" tint="#38629a" position={[-12, 0.075, -4.3]} size={[1.3, 0.04, 0.8]} />
  <Tower />
  <Stall position={PLACE.stall} />
  <Loaves />
  <Stool position={PLACE.stool} />
  <DownwardGolem />
  <Well position={[-6.7, 0, 7]} />
  {/* Outdoor school bench: the lesson is standing still, so the benches sit behind the pupils. */}
  {[10.3, 12.8].map((x) => <group key={x}>
    <Vox kind="planks" position={[x, 0.48, 5.1]} size={[1.8, 0.16, 0.55]} />
    {[-0.65, 0.65].map((dx) => <Vox key={dx} kind="log" position={[x + dx, 0.22, 5.1]} size={[0.14, 0.44, 0.45]} />)}
  </group>)}
  {[-4.7, 8.6, 16, -17].map((x, i) => <LampPost key={x} position={[x, 0, i % 2 ? 5.6 : -2]} seed={3 + i} />)}
  {([[-23, 8], [-9, -12.5], [9, -12.7], [23, 6], [-4, 13], [7, 13]] as Array<[number, number]>).map(([x, z], i) => <Tree key={i} position={[x, 0, z]} height={3.8 + (i % 2) * 0.5} leaf={i % 2 ? "#4e9137" : "#3c8032"} />)}
  {[-16, -9, -4, -1.3, 10, 18].map((x, i) => <group key={x} position={[x, 0, -0.8]}>
    <Vox kind="leaves" position={[0, 0.18, 0]} size={[1.2, 0.36, 0.55]} />
    <Block position={[-0.3, 0.4, 0.1]} size={[0.15, 0.15, 0.15]} color={i % 2 ? "#e46856" : "#ffd55f"} />
    <Block position={[0.25, 0.39, 0]} size={[0.13, 0.13, 0.13]} color="#f9e9d4" />
  </group>)}
  <SceneryWall />
  <GodRay position={[-2, 5.5, 1]} rotation={[0, 0, 0.35]} width={5} height={10} color="#fff0c7" opacity={0.045} />
  <LightPool position={[0, 0.065, 4]} width={10} depth={8} color="#fff1c6" opacity={0.12} />
  <Glow position={[0, 5.6, -8.7]} size={1.2} color="#ffe9a3" opacity={0.16} />
  <Dust position={[0, 2, 2]} area={[35, 4, 18]} count={55} size={0.035} color="#fff4da" opacity={0.65} speed={0.18} seed={7} />
</>;

const Passage: React.FC = () => {
  const active = useActiveShot();
  const t = active?.t ?? 0;
  const pull = active?.shot.cue === "15.rope" ? 0.18 * ramp(t, wordAt("15.rope", "rope"), wordAt("15.rope", "rope") + 0.25) : 0;
  return <>
  <Vox kind="darkPlanks" position={tunnel(0, -0.1, -1)} size={[2, 0.2, 8]} />
  {[-1, 1].map((s) => <Vox key={s} kind="planks" tint={s < 0 ? "#546b8d" : "#7c6249"} position={tunnel(s * 1.05, 1, -1)} size={[0.15, 2, 8]} castShadow={false} />)}
  {[-1, 1].map((s) => <Vox key={s} kind="planks" position={tunnel(s * 0.625, 2.1, -1)} size={[0.95, 0.15, 8]} castShadow={false} />)}
  {[-3.4, -1.6, 0.2].map((z) => <group key={z}>
    <Vox kind="log" position={tunnel(0, 1.88, z)} size={[2.2, 0.18, 0.18]} />
    <RopeLine from={tunnel(0.7, 1.6 + pull, z - 1.8)} to={tunnel(0.7, 1.6 + pull, z)} radius={0.06} />
    <Block position={tunnel(-0.94, 1.2, z)} size={[0.05, 0.08, 0.08]} color="#a7b4be" metalness={0.65} />
  </group>)}

  <pointLight position={tunnel(0, 1.5, 2.5)} color="#afcfff" intensity={7} distance={9} />
  <pointLight position={tunnel(0.5, 1.7, -3.5)} color="#ffd3a0" intensity={4} distance={8} />
  <RopeLine from={tunnel(0.7,0.3 + pull,-0.2)} to={tunnel(0.7,1.95 + pull,-0.2)} radius={0.045} />
  <GodRay position={tunnel(0.4, 1.2, -1.4)} rotation={[0.2, 0, 0.3]} width={0.25} height={2.5} color="#afcfff" opacity={0.22} />
  <LightPool position={tunnel(0.2, 0.025, -0.7)} width={1.3} depth={2.5} color="#8bbdff" opacity={0.35} />
  <Glow position={tunnel(0.7, 1.6, -2.4)} size={0.5} color="#cfe6ff" opacity={0.3} />
  <Dust position={tunnel(0, 1, -1)} area={[1.7, 1.7, 5]} count={30} size={0.026} color="#d1dbec" opacity={0.6} seed={8} />
</>;
};

/** The moving lid is shared by the reveal, the explanation replay and the final closure. */
export const Case: React.FC = () => {
  const a = useActiveShot();
  const cue = a?.shot.cue ?? "";
  const t = a?.t ?? 0;
  const dur = a?.shot.dur ?? 1;
  let open = 0.55;
  if (cue === "17.rope") open = 0.55 * ramp(t, 0, Math.max(0.3, wordAt(cue, "bell") + 0.15));
  else if (cue === "17.second") open = 0.55 * (1 - ramp(t, 0, Math.max(0.3, wordAt(cue, "shut"))));
  else if (["17.toys", "17.jar", "17.alive", "17.bun", "17.reach", "17.shadow", "18.memory", "18.down", "18.look", "18.saw"].includes(cue)) open = 0;
  else if (cue === "15.light") open = 0.55 * ramp(t / dur, 0, 0.9);
  return <>
    <Vox kind="darkPlanks" position={[0, -0.7, 1]} size={[54, 1.3, 38]} />
    {[-1, 1].map((s) => <group key={s}>
      <Vox kind="darkPlanks" position={[s * 26.7, 5.25, 1]} size={[0.8, 11.4, 38.7]} />
      {s > 0 ? <Vox kind="darkPlanks" position={[0, 0.4, 19.7]} size={[54, 0.8, 0.8]} /> : <><Vox kind="darkPlanks" position={[-11.85, 0.4, -17.7]} size={[30.3, 0.8, 0.8]} /><Vox kind="darkPlanks" position={[15.85, 0.4, -17.7]} size={[22.3, 0.8, 0.8]} /></>}
      <Vox kind="darkPlanks" position={[0, 10.6, 1 + s * 18.7]} size={[54, 0.65, 0.8]} />
      {[-1, 1].map((z) => <Block key={z} position={[s * 26.9, 0.85, 1 + z * 18.4]} size={[0.2, 1.7, 1.3]} color="#b89a4d" metalness={0.6} />)}
    </group>)}
    {/* Bare back of the blue scenery, with its framing and rope route exposed. */}
    {[-1,1].map((side) => <Vox key={side} kind="planks" position={[side * 13.15,6,-17.5]} size={[25.7,8,0.2]} />)}
    <Vox kind="planks" position={[0,3.925,-17.5]} size={[0.6,3.85,0.2]} />
    <Vox kind="planks" position={[0,8.175,-17.5]} size={[0.6,3.65,0.2]} />
    {[-22, -11, -1.2, 11, 22].map((x) => <Vox key={x} kind="log" position={[x, 5.6, -17.7]} size={[0.4, 10.4, 0.3]} />)}
    <group position={[0, 10.85, -17.7]} rotation-x={-open}>
      <mesh position={[0,0,18.7]} renderOrder={3}><boxGeometry args={[52.4,0.08,37.2]} /><meshStandardMaterial color="#a1cbdf" transparent opacity={0.1} roughness={0.12} depthWrite={false} side={2} /></mesh>
      {/* The rope is visibly fastened to this eye bolt, not to an invisible point in space. */}
      <Block position={[4.7,0.03,5]} size={[0.7,0.14,0.7]} color="#c7a65c" metalness={0.6} roughness={0.4} />
      <mesh position={[4.7,-0.16,5]} rotation-y={Math.PI / 2}><torusGeometry args={[0.15,0.045,6,12]} /><meshStandardMaterial color="#d6b46c" metalness={0.65} roughness={0.4} /></mesh>
      {[-18,18].map((x) => <group key={x}>
        <Block position={[x,0.12,1.1]} size={[2.5,0.16,2.5]} color="#c1a05a" metalness={0.55} roughness={0.4} />
        {[-0.72,0.72].map((dx) => <Block key={dx} position={[x + dx,0.212,1.7]} size={[0.22,0.03,0.22]} color="#665630" metalness={0.6} />)}
      </group>)}
      {[-1, 1].map((s) => <group key={s}>
        <Vox kind="darkPlanks" position={[s * 26.6, 0, 18.7]} size={[0.85, 0.8, 38.5]} />
        <Vox kind="darkPlanks" position={[0, 0, 18.7 + s * 18.9]} size={[54, 0.8, 0.85]} />
      </group>)}
      <Block position={[0, 0.15, 37.7]} size={[4.2, 0.35, 0.3]} color="#d5b264" metalness={0.7} />
    </group>
    {[-18, 18].map((x) => <group key={x}>
      <Block position={[x, 10.7, -18.1]} size={[2.7, 0.16, 1.3]} color="#a58a4d" metalness={0.6} />
      <mesh position={[x, 10.84, -17.7]} rotation-z={Math.PI / 2}><cylinderGeometry args={[0.22, 0.22, 3, 10]} /><meshStandardMaterial color="#c3a95e" metalness={0.65} roughness={0.45} /></mesh>
    </group>)}
    {/* The real return loop drops to the crawl gap, runs beside his face, then climbs to the lid. */}
    <RopeLine from={[0,6.08,-17.5]} to={[0,6.08,-17.95]} radius={0.07} />
    <RopeLine from={[0,6.08,-17.95]} to={[4.7,1.6,-17.95]} radius={0.07} />
    <RopeLine from={[4.7,1.6,-17.95]} to={[4.7,10.5,-17.95]} radius={0.07} />
    <RopeLine from={[4.7,10.5,-17.95]} to={[4.7,10.85 + Math.sin(open) * 5,-17.7 + Math.cos(open) * 5]} radius={0.07} />
    {([[0,6.08,-17.92],[4.7,1.6,-17.92],[4.7,10.5,-17.92]] as [number,number,number][]).map((v,i) => <group key={i} position={v}>
      <mesh rotation-x={Math.PI / 2}><cylinderGeometry args={[0.19,0.19,0.16,10]} /><meshStandardMaterial color="#b79a60" metalness={0.65} roughness={0.4} /></mesh>
      <Block position={[0,0,-0.04]} size={[0.1,0.1,0.3]} color="#675333" />
    </group>)}
  </>;
};

const Shelf: React.FC = () => <>
  <Vox kind="planks" tint="#bb8652" position={[0, -0.75, -1]} size={[72, 1.5, 62]} />
  <Vox kind="darkPlanks" position={[0, -3.2, 29.6]} size={[72, 3, 0.6]} />
  {[-1, 1].map((s) => <Vox key={s} kind="log" position={[s * 30, -14, 21]} size={[3.2, 26, 3.2]} />)}
  {[-18, 18].map((x) => <group key={x}>
    <Vox kind="planks" tint="#a16b3d" position={[x, -6.2, 29.7]} size={[33, 4.4, 0.5]} />
    <Block position={[x, -6.2, 30.2]} size={[6, 0.45, 0.45]} color="#d4b45a" metalness={0.65} />
  </group>)}
  <Screw position={PLACE.screw} height={2.4} />
  <GlassJar position={PLACE.jar} radius={1.45} height={3.2} />
  <RopeLine from={[3.6, 0.08, -19]} to={[3.8, 2.48, -20.8]} radius={0.025} />
  <LightPool position={[7, 0.025, -23]} width={10} depth={9} color="#edac69" opacity={0.26} />
  <Glow position={[7.4, 3.1, -23.6]} size={0.6} color="#ccecff" opacity={0.25} />
  <Dust position={[6, 2.2, -21]} area={[12, 5, 7]} count={45} size={0.04} color="#e4d4b6" opacity={0.45} seed={31} speed={0.12} />
</>;

const Bedroom: React.FC = () => <>
  <group position={[0, -27, -52]} scale={36}><Room at={[0, 0, 0]} night /></group>
  <group position={[-58, -27, 31]} scale={20}><BedBox position={[0, 0, 0]} /></group>
  {/* A bedside lamp motivates the amber light on the shelf. */}
  <Vox kind="darkPlanks" position={[-52, -15, -22]} size={[14, 24, 14]} />
  <Block position={[-52, 3, -22]} size={[1.2, 15, 1.2]} color="#a48a53" metalness={0.6} />
  <Block position={[-52, -4.1, -22]} size={[8, 0.8, 8]} color="#b89a5b" metalness={0.5} />
  <mesh position={[-52, 14, -22]}><cylinderGeometry args={[5, 8, 9, 8, 1, true]} /><meshStandardMaterial color="#d57445" side={2} roughness={1} /></mesh>
  <Block position={[-52, 10, -22]} size={[2, 2.2, 2]} color="#ffe3ae" emissive="#ffbc63" emissiveIntensity={2} />
  <Glow position={[-52, 11, -22]} size={12} color="#ffc77b" opacity={0.18} />
  <pointLight position={[-45, 13, -18]} color="#ffc081" intensity={1500} distance={130} decay={2} />
  <pointLight position={[-27, 28, -30]} color="#9bbfff" intensity={1200} distance={120} decay={2} />
  <hemisphereLight color="#d3c7bb" groundColor="#453027" intensity={0.42} />
  <directionalLight position={[30, 55, 55]} color="#ffdab3" intensity={1.25} />
  <GodRay position={[25, 25, -20]} rotation={[0.15, 0.3, -0.45]} width={10} height={45} color="#eec28f" opacity={0.035} />
  {/* Ordinary toy blocks and books become furniture-sized at the narrator's scale. */}
  {([[-48, -23.5, 16, "#bb4d42"], [-44, -16.5, 15, "#e7bc58"], [-46, -9.5, 16, "#4a8caf"]] as Array<[number, number, number, string]>).map(([x, y, z, c], i) => <Vox key={i} kind="wool" tint={c} position={[x, y, z]} size={[8, 7, 8]} rotationY={i * 0.12} />)}
  {[0, 1, 2].map((i) => <group key={i} position={[27 + i * 4.2, -20, -76]} rotation-z={i === 2 ? -0.12 : 0}>
    <Block size={[3.7, 14 + i * 2, 12]} color={["#a84c49", "#3b6d95", "#d7ad56"][i]} />
    <Block position={[0, 0, 6.06]} size={[2.7, 10 + i * 2, 0.08]} color="#e8dfc7" />
  </group>)}
</>;

export const World: React.FC = () => {
  const a = useActiveShot();
  const night = a?.shot.look === "overworld-night";
  const focus = a?.shot.target ?? [0, 1, 4];
  const lens = a?.shot.from ?? [focus[0], focus[1], focus[2] + 3];
  const lensDist = Math.max(1, Math.hypot(lens[0] - focus[0], lens[2] - focus[2]));
  const faceKey: [number, number, number] = [focus[0] + (lens[0] - focus[0]) / lensDist * 3, focus[1] + 2, focus[2] + (lens[2] - focus[2]) / lensDist * 3];
  const handShadow = a?.shot.cue === "17.shadow" ? ramp((a?.t ?? 0) / (a?.shot.dur ?? 1),0.15,0.8) : ["18.memory", "18.look", "18.saw"].includes(a?.shot.cue ?? "") ? 1 : 0;
  return <>
    <Zone name="village" with={["shelf", "bedroom"]}><Village /></Zone>
    <Zone name="village"><pointLight position={[focus[0] + 1, focus[1] + 2.6, focus[2] + 3]} color={night ? "#b5cbff" : "#fff3db"} intensity={night ? 24 : 5} distance={9} decay={2} /></Zone>
    <Zone name="room"><Room at={PLACE.room} night={night} /><BedBox position={BED} /></Zone>
    <Zone name="passage"><Passage /></Zone>
    <Zone name="shelf" with={["bedroom"]}><Case /><Shelf /><Bedroom />{handShadow > 0 ? <pointLight position={[12,0.4,-19]} color="#ffd9ab" intensity={4} distance={11} decay={2} /> : null}<pointLight position={faceKey} color="#ffdcad" intensity={26 * (1 - handShadow)} distance={9} decay={2} />{["18.memory", "18.look", "18.saw"].includes(a?.shot.cue ?? "") ? <pointLight position={[9.8, 2.4, -25]} color="#ffddc0" intensity={3.5} distance={6} decay={2} /> : null}</Zone>
  </>;
};
