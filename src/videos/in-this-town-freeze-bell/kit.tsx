import type React from "react";
import { useMemo } from "react";
import { Object3D } from "three";
import { Freeze } from "remotion";
import { Block, Door, MinecraftAvatar, Torch, Vox, getPose } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { Backpack, Bread, Basket, IronGolem, KID, Player, ROBE, RopeCoil, Villager, WaterBottle, ahead, pop, ramp, wordClock } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

/** Film-owned cast and map. Approved pack models are reused, never restyled or forked. */
export { Backpack, Basket, BedBox, Bread, GlassJar, Player, ROBE, RopeCoil, RopeLine, Screw, Stool, SubscribeSign, Villager, WaterBottle, KID, EAST, NORTH, SOUTH, WEST, ahead, beside, faceOf, chestOf, jolt, pop, ramp } from "../../../Topics/InThisTown";
export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

/** One metre per block in the village. In the reveal this same village is on a 32× child's shelf. */
export const PLACE = {
  square: [0, 0, 4.2] as Vec3,
  golem: [-3.5, 0, -2.8] as Vec3,
  stall: [6, 0, -1.6] as Vec3,
  baker: [6, 0, -2.65] as Vec3,
  customer: [6.1, 0, 0.25] as Vec3,
  stool: [3.2, 0, -0.9] as Vec3,
  neighborHome: [-12, 0, -5] as Vec3,
  elderHome: [-20, 0, -5] as Vec3,
  porch: [-20, 0.5, -4.1] as Vec3,
  porchFoot: [-20, 0, -2.3] as Vec3,
  home: [13, 0, -5] as Vec3,
  school: [11, 0, 6] as Vec3,
  lessonHero: [10.5, 0, 6.8] as Vec3,
  lessonFriend: [11.65, 0, 5.8] as Vec3,
  bell: [0, 3.5, -8.8] as Vec3,
  gap: [4, 0, -16.7] as Vec3,
  gapFoot: [4, 0, -14.75] as Vec3,
  hay: [7, 0, -14.3] as Vec3,
  room: [0, 0, 80] as Vec3,
  passage: [0, 0, 130] as Vec3,
  shelfExit: [4, 0, -19.2] as Vec3,
  screw: [4, 0, -20.8] as Vec3,
  jar: [7.2, 0, -23.5] as Vec3,
  jarHero: [7.2, 0, -21.2] as Vec3,
  giant: [41, -27, -6] as Vec3,
};
export const room = (x: number, y: number, z: number): Vec3 => [x, y, PLACE.room[2] + z];
export const tunnel = (x: number, y: number, z: number): Vec3 => [x, y, PLACE.passage[2] + z];
export const IN_BED = room(-1.15, 0.24, -0.6);
export const BED = room(-1.15, 0, -0.55);
export const PACK_SPOT = room(0.6, 0.08, 0.5);

type A = Partial<MinecraftAvatarProps>;
export const Hero: React.FC<A & { pack?: boolean }> = ({ pack = false, position = [0, 0, 0], rotationY = 0, ...p }) => (
  <>
    <MinecraftAvatar position={position} rotationY={rotationY} scale={KID} outfit="tee" skin="#dba47c" hair="#3b2319" colors={{ torso: "#f1ad26", arms: "skin", legs: "#314b79" }} blink gaze={0} {...p} />
    {pack ? <Backpack position={ahead(position, rotationY, -0.13, 0.47 - (p.animation === "crouch" ? 0.208 : p.blendTo === "crouch" ? 0.208 * (1 - (p.blend ?? 1)) : 0))} rotationY={rotationY} scale={KID} /> : null}
  </>
);
export const Friend: React.FC<A> = (p) => <Player who={4} scale={0.77} face="grin" {...p} />;
/** Turquoise clothes, dark face, dark hair. This exact approved look must remain recognizable under the jar. */
export const Neighbor: React.FC<A> = (p) => <Player who={3} face="smile" {...p} />;
export const Baker: React.FC<A> = (p) => <Player who={9} face="smile" {...p} />;
export const Elder: React.FC<A> = (p) => <Player who={5} scale={0.95} face="uneasy" {...p} />;
export const Giant: React.FC<A> = (p) => <><Player who={8} position={PLACE.giant} scale={32} rotationY={-Math.PI / 2} animation="reachUp" blendTo="reach" blend={0.6} time={1.2} face="smile" headPitch={0.2} blink={false} breath={0} weightShift={0} {...p} /><pointLight position={[8,35,15]} intensity={2000} distance={100} decay={2} color="#ffdfb6" /><pointLight position={[70,30,-24]} intensity={1500} distance={100} decay={2} color="#a9c9ff" /></>;

/** Freeze ONLY the performer. The camera, dust, loose objects and light do not stop. */
export const Still: React.FC<{ children: React.ReactNode; active?: boolean }> = ({ children, active = true }) => <Freeze frame={24} active={active}>{children}</Freeze>;

/** This clue belongs to this film: the approved iron golem never raises its gaze, even after the market restarts. */
export const DownwardGolem: React.FC = () => <Still><IronGolem position={PLACE.golem} rotationY={0.08} headPitch={0.85} walk={0} /></Still>;

/** Keep the gift in the spare hand while the right reaches for the jar. These are the real avatar pivots, not a floating prop. */
export const ReachWithBun: React.FC<{ position: Vec3; rotationY?: number; face?: MinecraftAvatarProps["face"]; headPitch?: number; headYaw?: number }> = ({ position, rotationY = -2.46, face = "fear", headPitch = 0, headYaw = 0 }) => {
  const pose = getPose("reach", 0.8);
  const px = 1.8 / 32;
  return <>
    <Hero position={position} rotationY={rotationY} animation="reach" time={0.8} face={face} headPitch={headPitch} headYaw={headYaw} blink={false} saccade={false} breath={0} weightShift={0} pack />
    <group position={position} rotation-y={rotationY} scale={KID}>
      <group position={[0, 12 * px + pose.bodyY, 0]} rotation={[pose.bodyPitch, pose.bodyYaw, pose.bodyRoll]}>
        <group position={[-6 * px, 12 * px, 0]} rotation={pose.armL}>
          <group position={[0, -11 * px, 0]}><Bread position={[0, -0.28, 0.08]} bun scale={1.15 / KID} /></group>
        </group>
      </group>
    </group>
  </>;
};

export const TownPeople: React.FC<{ t?: number; frozen?: boolean; compact?: boolean }> = ({ t = 0, frozen = false, compact = false }) => {
  const run = frozen ? 0 : t;
  const cast = compact
    ? [[-0.65, 2.8, ROBE.blue], [0.75, 2.3, ROBE.white], [-0.5, 1.1, ROBE.red], [0.55, 0.4, ROBE.farmer]] as Array<[number, number, string]>
    : [[-3.2, 1.3, ROBE.blue], [1.6, -1.7, ROBE.white], [-5.5, 4.7, ROBE.red], [8.6, 2, ROBE.farmer], [14, 3.5, ROBE.smith], [-8, -0.5, ROBE.brown]] as Array<[number, number, string]>;
  return <Still active={frozen}>{cast.map(([x, z, robe], i) => <Villager key={i} position={[x + (compact ? 0 : Math.sin(i + run * 0.2) * 0.35), 0, z]} robe={robe} rotationY={i % 2 ? -0.3 : 0.35} nod={frozen ? 0.35 : 0.08} walk={run * (0.4 + i * 0.02)} phase={i * 1.37 + 0.4} />)}</Still>;
};

export const Loaves: React.FC = () => <>{[-0.75, 0, 0.75].map((x, i) => <group key={x} position={[PLACE.stall[0] + x, 1.02, PLACE.stall[2]]}><Bread /><Bread position={[0, 0.27, -0.015]} scale={i === 1 ? 0.9 : 0.75} bun={i !== 1} /></group>)}</>;

export const CarryBun: React.FC<{ who?: "hero" | "friend" | "neighbor" | "baker"; position: Vec3; rotationY?: number; t?: number; face?: MinecraftAvatarProps["face"]; pack?: boolean; lift?: boolean; headYaw?: number }> = ({ who = "hero", position, rotationY = 0, t = 0.8, face = "smile", pack = false, lift = false, headYaw = 0 }) => {
  const Actor = who === "friend" ? Friend : who === "neighbor" ? Neighbor : who === "baker" ? Baker : Hero;
  const scale = who === "hero" ? KID : who === "friend" ? 0.77 : 1;
  const at = ahead(position, rotationY, (lift ? 0.1 : 0.42) * scale, (lift ? 1.92 : 0.76) * scale);
  return <><Actor position={position} rotationY={rotationY} animation={lift ? "lift" : "hold"} time={t} face={face} headYaw={headYaw} gaze={0} /><Bread position={at} rotationY={rotationY} scale={1.15} bun />{pack ? <Backpack position={ahead(position, rotationY, -0.13, 0.47)} rotationY={rotationY} scale={KID} /> : null}</>;
};

export const CarryBasket: React.FC<{ position: Vec3; rotationY?: number; t?: number; frozen?: boolean }> = ({ position, rotationY = 0, t = 0, frozen = false }) => <Still active={frozen}><Player who={11} position={position} rotationY={rotationY} animation="hold" time={frozen ? 0.8 : t + 0.8} face="smile" /><Basket position={ahead(position, rotationY, 0.43, 0.72)} rotationY={rotationY} filled /></Still>;

/** Several stacked cubes, with deterministic falling positions for the funny failed lookout. */
export const HayTower: React.FC<{ levels?: number; fall?: number }> = ({ levels = 7, fall = 0 }) => <>{Array.from({ length: levels }, (_, i) => {
  const k = ramp(fall, i * 0.025, 0.65 + i * 0.025);
  return <Vox key={i} kind="hay" position={[7 + Math.sin(i * 2) * k * 1.5, Math.max(0.45, 0.45 + i * 0.9 - k * (i * 0.9)), -14.3 + Math.cos(i * 1.3) * k * 1.2]} rotation={[k * (i % 2 ? 0.8 : -0.5), i * 0.05 + k * i, k * 0.3]} size={[1.2, 0.9, 1]} />;
})}</>;

/** A shadow lies on the real ground; it is not a screen overlay. Its source is withheld until the reveal. */
export const PassingShadow: React.FC<{ position?: Vec3; progress: number; width?: number }> = ({ position = [0, 0.09, 4], progress, width = 11 }) => <mesh position={[position[0] - width + progress * width * 2, position[1], position[2]]} rotation={[-Math.PI / 2, 0, -0.3]} renderOrder={2}><planeGeometry args={[width, 3.6]} /><meshBasicMaterial color="#171827" transparent opacity={0.35 * Math.sin(Math.PI * Math.min(1, Math.max(0, progress)))} depthWrite={false} /></mesh>;

/** The child's block hand enters a close frame from overhead; its sleeve matches the approved red Player. */
export const ReachingHand: React.FC<{ progress: number }> = ({ progress }) => <group position={[2 + 5.8 * ramp(progress,0.3,0.65), 6.4 - progress * 4.3, -22.1]} rotation={[0.12, 0, 0.1]}>
  <Block position={[0, 10, -0.3]} size={[6.6, 19, 6.6]} color="#c8362e" />
  <Block position={[0, 0, 0.15]} size={[6.6, 1.5, 6.6]} color="#f0c8a4" emissive="#b98259" emissiveIntensity={0.12} />
  <Block position={[3.35, -0.15, 1.2]} size={[0.6, 1, 1.8]} color="#e9b68f" emissive="#b98259" emissiveIntensity={0.12} />
</group>;

export const NightTorch: React.FC = () => <Torch position={room(-2.05, 0, 0.1)} light={6} seed={19} />;

/** The captive is present in every shelf view, even before a close shot identifies him. */
export const JarNeighbor: React.FC<{ t?: number; alive?: boolean }> = ({ t = 0.8, alive = false }) => <Neighbor position={[7.2, 0, -22.77]} rotationY={0} animation={alive ? "reach" : "idle"} face={alive ? "wow" : "uneasy"} time={alive ? t + 0.8 : 0.8} headPitch={0.12} gaze={0} />;

/** The house facade remains the approved Hut; the working hinged door is the engine's detailed Door. */
export const ClosingDoor: React.FC<{ p: number }> = ({ p }) => <>
  <Block position={[-20, 1.08, -4.81]} size={[1.13, 2.16, 0.03]} color="#09080b" />
  <Door position={[-20.55, 0, -4.73]} width={1.1} height={2.15} open={-1.35 * (1 - ramp(p, 0.1, 0.85))} color="#5c4231" />
</>;

/** Each named item lands inside the open backpack on its own word. */
export const PackedBag: React.FC<{ t: number }> = ({ t }) => {
  const names = ["water", "torch", "rope", "bread", "bun"];
  const s = names.map((w) => pop(t, wordAt("12.pack", w)));
  return <>
    <Backpack position={PACK_SPOT} scale={1.8} open />
    <WaterBottle position={room(0.4, 0.16, 0.18)} scale={s[0]} />
    <group position={room(0.82, 0.17, 0.13)} rotation={[0.5, 0, 0]} scale={s[1] * 0.35}><Torch position={[0, 0, 0]} light={0} /></group>
    <RopeCoil position={room(0.4, 0.17, 0.58)} scale={s[2] * 0.62} />
    <Bread position={room(0.79, 0.17, 0.56)} scale={s[3] * 0.55} />
    <group position={room(0.58, 0.17, 0.84)} scale={s[4]}><Vox kind="wool" tint="#f2e6cf" size={[0.38, 0.025, 0.31]} /><Bread position={[0, 0.025, 0]} bun scale={0.95} /></group>
  </>;
};

/** A local shadow-casting key for the last hand insert. It never changes the shared Look presets. */
export const ShadowKey: React.FC = () => {
  const target = useMemo(() => { const o = new Object3D(); o.position.set(7.6, 1.02, -22.2); return o; }, []);
  return <><primitive object={target} /><directionalLight position={[7.6, 10, -22.2]} target={target} intensity={5} color="#ffe4bc" castShadow shadow-mapSize={[1024,1024]} shadow-camera-left={-5} shadow-camera-right={5} shadow-camera-top={5} shadow-camera-bottom={-5} shadow-camera-near={0.1} shadow-camera-far={25} shadow-bias={-0.0004} /></>;
};

/** One continuous little failure; the falling tower does not hide a cut or start ahead of the spoken cause. */
export const HayFailure: React.FC<{ t: number; dur: number }> = ({ t, dur }) => {
  const lean = 0.2 * ramp(t, wordAt("9.lean", "whole"), wordAt("9.lean", "leaned"));
  const fall = ramp(t, wordAt("9.lean", "leaned"), Math.max(wordAt("9.lean", "leaned") + 0.1, dur - 0.04));
  return <>
    <group position={[7,0,-14.3]} rotation-z={-lean * (1 - fall)}><group position={[-7,0,14.3]}><HayTower levels={8} fall={fall} /></group></group>
    <group position={[7 + Math.sin(lean) * 7.2 + fall * 0.8, 7.2 * Math.cos(lean) * (1 - fall) + 0.02, -14.3]} rotation-z={-lean - fall * 1.3}><Hero animation={fall > 0 ? "fall" : "idle"} face="wow" time={0.8} /></group>
  </>;
};
