import * as THREE from "three";
import { Block, ContactShadow, MinecraftAvatar, blendPose, clamp, gaitPose, lerp } from "../../engine";
import type { FaceName, Pose, Vec3 } from "../../engine";
import { Chicken } from "../../../Topics/InThisTown/creatures";
import { Skeleton } from "../../../Topics/InThisTown/monsters";
import { Stopwatch } from "./props";
import { between, gate, time, up } from "./marks";
import coachMeter from "./coach-meter.json";

// Same pivots as the pack rigs. Coordinates are used for fingertip, lip and
// beak contacts; the camera can move freely without breaking the joins.
const PX = 1.8 / 32;
const HIP = 12 * PX;
const SHOULDER = 6 * PX;
const ARM = 11.25 * PX;
const euler = (v: Vec3) => new THREE.Euler(...v);
const vector = (v: Vec3) => new THREE.Vector3(...v);
export type Player = { at: Vec3; yaw: number; pose: Pose; face: FaceName; band?: boolean; gaze?: -1 | 0 | 1 };

export const neutral = (depth = 0): Pose => {
  const bend = Math.acos(clamp((HIP - depth) / HIP));
  return {
    bodyY: -depth, bodyPitch: 0, bodyYaw: 0, bodyRoll: 0, torso: [0, 0, 0],
    head: [0, 0, 0], armR: [-0.09, 0, 0.10], armL: [-0.10, 0, -0.10],
    legR: [-bend, 0, 0], legL: [-bend, 0, 0], kneeR: [2 * bend, 0, 0], kneeL: [2 * bend, 0, 0],
  };
};

export function poseForTool(at: Vec3, yaw: number, target: Vec3): Pose {
  const local = vector(target).sub(vector(at)).applyAxisAngle(new THREE.Vector3(0, 1, 0), -yaw);
  const reach = Math.hypot(local.x - SHOULDER, local.z);
  const down = Math.sqrt(Math.max(0, ARM * ARM - reach * reach));
  return neutral(clamp(2 * HIP - local.y - down, 0, 0.23));
}

function bodyEuler({ pose }: Player) {
  return euler([pose.bodyPitch, pose.bodyYaw, pose.bodyRoll]);
}
function worldPoint(p: Player, point: THREE.Vector3): Vec3 {
  return point.applyEuler(bodyEuler(p)).add(new THREE.Vector3(0, HIP + p.pose.bodyY, 0))
    .applyAxisAngle(new THREE.Vector3(0, 1, 0), p.yaw).add(vector(p.at)).toArray();
}
export function headPoint(p: Player, fromPivot: Vec3): Vec3 {
  return worldPoint(p, vector(fromPivot).applyEuler(euler(p.pose.head)).add(new THREE.Vector3(0, HIP, 0)));
}
export function palm(p: Player, side = 1, offset: Vec3 = [0, -ARM, 0]): Vec3 {
  return worldPoint(p, vector(offset).applyEuler(euler(side === 1 ? p.pose.armR : p.pose.armL))
    .add(new THREE.Vector3(side * SHOULDER, HIP, 0)));
}
export function aimArm(p: Player, target: Vec3, side = 1): Vec3 {
  const q = new THREE.Quaternion().setFromEuler(bodyEuler(p)).invert();
  const d = vector(target).sub(vector(p.at)).applyAxisAngle(new THREE.Vector3(0, 1, 0), -p.yaw)
    .sub(new THREE.Vector3(0, HIP + p.pose.bodyY, 0)).applyQuaternion(q)
    .sub(new THREE.Vector3(side * SHOULDER, HIP, 0)).normalize();
  return [Math.atan2(-d.z, -d.y), 0, Math.asin(clamp(d.x, -1, 1))];
}

export function walking(f: number, a: number, b: number, start: Player, end: Player): Player {
  const p = up(f, a, b);
  const cross = gate(f, a, a + 8, b - 9, b);
  const at: Vec3 = [lerp(start.at[0], end.at[0], p), 0, lerp(start.at[2], end.at[2], p) - Math.sin(Math.PI * p) * 0.045];
  const distance = Math.hypot(end.at[0] - start.at[0], end.at[2] - start.at[2]) * p;
  const pose = blendPose(blendPose(start.pose, end.pose, p), gaitPose("walk", distance), cross);
  pose.head = [0.02, lerp(pose.head[1], -0.30, cross), 0];
  return { at, yaw: lerp(lerp(start.yaw, end.yaw, p), 1.52, cross), pose, face: "brave" };
}

const Band = () => <>
  {[-1, 1].map((s) => <group key={s}>
    <Block position={[s * .230, .117, 0]} size={[.026, .070, .465]} color="#b33138" />
    <Block position={[0, .117, s * .231]} size={[.465, .070, .026]} color={s > 0 ? "#d83e3b" : "#a62a33"} />
  </group>)}
  <Block position={[.179, .122, .249]} size={[.059, .060, .015]} color="#ffbe71" />
  <Block position={[-.229, .119, -.243]} size={[.092, .084, .075]} color="#a62234" rotation={[0, 0, -.3]} />
  <Block position={[-.260, .033, -.253]} size={[.056, .165, .026]} color="#c33339" rotation={[0.16, 0, -.39]} />
  <Block position={[-.299, .079, -.231]} size={[.062, .136, .029]} color="#ec5640" rotation={[0, .13, -1.02]} />
</>;

export const Finn = ({ state, f }: { state: Player; f: number }) => <MinecraftAvatar
  position={state.at} rotationY={state.yaw} pose={state.pose} face={state.face}
  outfit="tee" colors={{ torso: "#dfa633", arms: "skin", legs: "#365b77" }}
  shoes="#4c5253" skin="#dca478" hair="#3c261f" head={state.band ? <Band /> : null}
  shadow shadowOpacity={0.35} blink time={time(f)} saccade={false} gaze={state.gaze ?? 0}
  weightShift={0} breath={0}
/>;

export function Coach({ f, offset, at, yaw, look, n, tap, travel = 0, letdown = 0 }: {
  f: number; offset: number; at: Vec3; yaw: number; look: Vec3; n: number; tap: number; travel?: number; letdown?: number;
}) {
  const t = time(f - offset);
  const phase = time(offset) * 1.3;
  const wave = .447 + .060 * tap - .10 * letdown;
  const lean = .04 + .10 * letdown;
  const gait = travel * 5.2;
  const bob = Math.abs(Math.sin(gait)) * .030 + Math.sin(t * 1.3 + phase) * .005;
  const arm = [Math.sin(gait) * .56 - wave * 2.8, 0, wave * (.25 + Math.sin(t * 9 + phase) * .3)] as Vec3;
  const held = new THREE.Vector3(0, -11.4 * PX, .036).applyEuler(euler(arm))
    .add(new THREE.Vector3(-5 * PX, 11 * PX, 0))
    .applyEuler(euler([lean, 0, Math.sin(gait) * .03]))
    .add(new THREE.Vector3(0, HIP + bob, 0))
    .applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw).add(vector(at)).toArray();
  const jaw = coachMeter[f] ?? 0;
  return <>
    <ContactShadow position={[at[0], .020, at[2]]} width={.53} depth={.45} opacity={.31} />
    <Skeleton position={at} rotationY={yaw} lookAt={look} mood={letdown > .2 ? "sad" : "calm"}
      scarf="#be6b30" walk={travel} wave={wave} lean={lean} tilt={.12 * letdown}
      jaw={jaw} phase={phase} raise={.20 + .32 * jaw} />
    <Stopwatch at={held} yaw={.18 + yaw * .42} n={n} pulse={tap} />
  </>;
}

export const BIRD_SCALE = .91;
export function beakOffset(yaw: number, tilt: number): Vec3 {
  return new THREE.Vector3(0, .10, .168).applyAxisAngle(new THREE.Vector3(1, 0, 0), tilt)
    .add(new THREE.Vector3(0, .50, .20)).multiplyScalar(BIRD_SCALE)
    .applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw).toArray();
}
export const Bird = ({ at, yaw, tilt, local }: { at: Vec3; yaw: number; tilt: number; local: number }) => <>
  <ContactShadow position={[at[0], .884, at[2]]} width={.47} depth={.36} opacity={.27} />
  <Chicken position={at} rotationY={yaw} scale={BIRD_SCALE}
    phase={Math.asin(clamp(tilt / .9) ** (1 / 6)) / 3.1 - time(local)} />
</>;

export const hop = (f: number, a: number, b: number, y: number) => y * Math.sin(Math.PI * between(f, a, b));
