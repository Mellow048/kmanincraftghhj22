import * as T from "three";
import { clamp, clamp01, getPose, lerp, MinecraftAvatar, type FaceName, type Pose, type Timing, type Vec3 } from "../../engine";
import { StrawHat, wordClock } from "../../../Topics/InThisTown";
import voice from "./timing.json";

export const timing = voice as Timing;
export const wordAt = wordClock(timing);
const cues = new Map(timing.cues.map(c => [c.id, c]));
export const cue = (id: string) => {
  const c = cues.get(id);
  if (!c) throw new Error(`Missing dolphin cue ${id}`);
  return c;
};
export const span = (a: number, b: number, t: number) => clamp01((t-a)/(b-a));
export const smooth = (p: number) => { const u=clamp01(p); return u*u*(3-2*u); };
export const rise = (t: number, a: number, b: number) => smooth(span(a,b,t));
export const env = (t: number, a: number, b: number, c: number) => rise(t,a,b)*(1-rise(t,b,c));
export const mix = (a: Vec3, b: Vec3, t: number): Vec3 => [lerp(a[0],b[0],t),lerp(a[1],b[1],t),lerp(a[2],b[2],t)];
export const add = (a: Vec3, b: Vec3): Vec3 => [a[0]+b[0],a[1]+b[1],a[2]+b[2]];
export const yawTo = (a: Vec3,b: Vec3) => Math.atan2(b[0]-a[0],b[2]-a[2]);

export const DECK = 0.59;
export const WRECK: Vec3 = [5.8,0,30.8];
export const w = (x:number,y:number,z:number): Vec3 => [x+WRECK[0],y,z+WRECK[2]];
export const ROOF = 1.244;
export const DINGHY: Vec3 = [2.69,0.021,0.30]; // wreck-local: bow points +z, port side ties to the hull
export const HARBOR_BOAT: Vec3 = [1.68,0.01,0.01];
export const CHEST: Vec3 = [1.75,-2.19,-3.23];
export const KID = 0.82;
export const DAD = 0.99;
export const PX = 1.8/32;
const HIP=12*PX, HAND=11*PX;
const up = new T.Vector3(0,1,0);

// Times in the same cue clock as the mix sheet. A cut or scrub doesn't restart the sea or the hardware.
export const FOLEY = {
  take: 0.94, dive: 2.15, shaft: 0.29, twoFish: 0.40,
  roll: cue("5.open").start+0.28, hatch: cue("5.open").start+1.36,
};
export const bob = (s:number, seed=0) => 0.035*Math.sin(s*2.1+seed)+0.019*Math.sin(s*3.51+seed*1.3);
export const planksMove = (s:number) => rise(s,FOLEY.roll-0.25,FOLEY.roll+0.56);
export const hatchMove = (s:number) => rise(s,FOLEY.hatch-0.12,FOLEY.hatch+0.56);

export function stance(kind: "stand"|"kneel"|"sit"|"low"|"swim"="stand", t=0): Pose {
  const p=getPose("idle",0);
  p.torso=[0,0,0]; p.head=[0,0,0]; p.bodyY=0; p.bodyPitch=0; p.bodyYaw=0; p.bodyRoll=0;
  p.armL=[-0.18,0,-0.12]; p.armR=[-0.2,0,0.13];
  p.legL=[0,0,-0.04]; p.legR=[0,0,0.04]; p.kneeL=[0,0,0]; p.kneeR=[0,0,0];
  if (kind==="kneel" || kind==="low") {
    const low=kind==="low";
    p.bodyY=low ? -0.37 : -0.205;
    p.bodyPitch=low ? 0.50 : 0.33;
    p.legL=[-1.00,0,-0.07]; p.kneeL=[1.15,0,0];
    p.legR=[-0.42,0,0.07]; p.kneeR=[1.67,0,0];
    p.head=[-0.10,0,0];
  } else if (kind==="sit") {
    p.bodyY=-0.32; p.bodyPitch=0.14;
    p.legR=[-1.57,0,0.065]; p.legL=[-1.56,0,-0.065];
    p.kneeR=[1.22,0,0]; p.kneeL=[1.22,0,0];
    p.armR=[-1.18,0,0.5]; p.armL=[-1.16,0,-0.5];
  } else if (kind==="swim") {
    p.bodyPitch=1.03;
    p.legR=[-0.25+0.48*Math.sin(t*5.5),0,0.13]; p.legL=[-0.25-0.48*Math.sin(t*5.5),0,-0.13];
    p.kneeR=[0.42,0,0]; p.kneeL=[0.48,0,0];
    p.armR=[-2.2+0.63*Math.sin(t*5.5),0,0.40]; p.armL=[-2.2-0.63*Math.sin(t*5.5),0,-0.40];
    p.head=[-0.77,0,0];
  }
  return p;
}

const bodyRot = (p: Pose) => new T.Quaternion().setFromEuler(new T.Euler(p.bodyPitch,p.bodyYaw,p.bodyRoll));
function goalLocal(at: Vec3, yaw: number, scale: number, p: Pose, goal: Vec3, side: number) {
  return new T.Vector3(...goal).sub(new T.Vector3(...at)).applyAxisAngle(up,-yaw).divideScalar(scale)
    .sub(new T.Vector3(0,HIP+p.bodyY,0)).applyQuaternion(bodyRot(p).invert()).sub(new T.Vector3(side*6*PX,HIP,0));
}
/** Aim each block arm at the actual prop in world space. Hand placement is derived from the same transform. */
export function reach(p: Pose, at: Vec3, yaw: number, scale: number, side: -1|1, goal: Vec3, amount=1) {
  const d=goalLocal(at,yaw,scale,p,goal,side).normalize();
  const r=side===1 ? p.armR : p.armL;
  const aim: Vec3 = [lerp(r[0],Math.atan2(-d.z,-d.y),amount),0,lerp(r[2],Math.asin(clamp(d.x)),amount)];
  if (side===1) p.armR=aim; else p.armL=aim;
}
export function reachCeiling(p: Pose, at: Vec3, yaw:number, scale:number, side:-1|1, goal:Vec3, ceiling:number, amount=1) {
  const shoulder=new T.Vector3(side*6*PX,HIP,0).applyQuaternion(bodyRot(p)).add(new T.Vector3(0,HIP+p.bodyY,0))
    .multiplyScalar(scale).applyAxisAngle(up,yaw).add(new T.Vector3(...at));
  const dy=clamp(Math.min(goal[1],ceiling)-shoulder.y,-HAND*scale+.001,HAND*scale-.001);
  const dest=new T.Vector3(goal[0]-shoulder.x,0,goal[2]-shoulder.z).normalize()
    .multiplyScalar(Math.sqrt((HAND*scale)**2-dy**2)).add(shoulder);
  dest.y=shoulder.y+dy;
  reach(p,at,yaw,scale,side,dest.toArray(),amount);
}
export function palm(p: Pose, at: Vec3, yaw:number, scale:number, side:-1|1): Vec3 {
  return new T.Vector3(0,-HAND,0).applyEuler(new T.Euler(...(side===1?p.armR:p.armL)))
    .add(new T.Vector3(side*6*PX,HIP,0)).applyQuaternion(bodyRot(p)).add(new T.Vector3(0,HIP+p.bodyY,0))
    .multiplyScalar(scale).applyAxisAngle(up,yaw).add(new T.Vector3(...at)).toArray();
}

/** The avatar's standing `lookAt` assumes an upright head. Aim from the posed head pivot instead. */
function gazePose(at: Vec3, yaw: number, scale: number, p: Pose, look?:Vec3):Pose {
  if (!look) return p;
  const q=bodyRot(p);
  const eye=new T.Vector3(0,HIP+PX*3.4,0).applyQuaternion(q).add(new T.Vector3(0,HIP+p.bodyY,0));
  const local=new T.Vector3(...look).sub(new T.Vector3(...at)).applyAxisAngle(up,-yaw)
    .divideScalar(scale).sub(eye).applyQuaternion(q.invert());
  return {...p,head:[
    clamp(Math.atan2(-local.y,Math.hypot(local.x,local.z)),-1.04,.50)+p.head[0]*.15,
    clamp(Math.atan2(local.x,local.z),-1.20,1.20),p.head[2],
  ]};
}

type PlayerPose = { at:Vec3; yaw:number; p:Pose; t:number; face?:FaceName; look?:Vec3; hat?:boolean };
export function Kid({at,yaw,p,t,face="uneasy",look}: PlayerPose) {
  return <MinecraftAvatar position={at} rotationY={yaw} scale={KID} pose={gazePose(at,yaw,KID,p,look)} time={t} outfit="tee" face={face}
    skin="#d9a47d" hair="#422a1e" colors={{torso:"#d99936",arms:"skin",legs:"#435373"}} shoes="#494350"
    blink phase={1.3} saccade={false} breath={0} weightShift={0} />;
}
export function Dad({at,yaw,p,t,face="uneasy",look,hat=false}: PlayerPose) {
  return <MinecraftAvatar position={at} rotationY={yaw} scale={DAD} pose={gazePose(at,yaw,DAD,p,look)} time={t} outfit="tee" face={face}
    skin="#bd8c6d" hair="#413228" colors={{torso:"#327a7b",arms:"skin",legs:"#424b58"}} shoes="#3d3c44"
    blink phase={1.88} saccade={false} breath={0} weightShift={0}
    head={hat ? <StrawHat position={[0,0.207,0]} width={0.65} crown={0.24} band="#466b69" tilt={-0.07}/> : undefined}/>
}
