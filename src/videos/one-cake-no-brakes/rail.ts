import * as T from "three";
import { clamp01, lerp, type Vec3 } from "../../engine/math";
import edit from "./edit.json";

export const { fps: FPS, frames: FRAMES, marks: MARK } = edit;
export const sec = (f: number) => f / FPS;
export const ease = (x: number) => { const u = clamp01(x); return u*u*(3-2*u); };
export const rise = (f: number, a: number, b: number) => ease((f-a)/(b-a));
export const pulse = (f: number, a: number, b: number, c: number) => rise(f,a,b)*(1-rise(f,b,c));
const {start,speed,acceleration} = edit.route;
export const zAt = (f: number) => start + speed*sec(f) + .5*acceleration*sec(f)**2;
export const xAt = (z: number) => 1.65*rise(z,-17,-8)-2.68*rise(z,-8,1)+1.03*rise(z,1,12);
export const hill = (z: number) => 3.95*(1-rise(z,-23,12));
export const yAt = (z: number) => .142+hill(z)+.324*Math.exp(-(((z+.16)/1.32)**2));
export const terrainAt = (z: number) => Math.max(0, .42*Math.floor((hill(z)-.62)/.42));
export const railPoint = (z: number): Vec3 => [xAt(z),yAt(z),z];
const UP = new T.Vector3(0,1,0);

export function railFrame(z: number) {
  const origin = new T.Vector3(...railPoint(z));
  const forward = new T.Vector3(...railPoint(z+.018)).sub(new T.Vector3(...railPoint(z-.018))).normalize();
  const right = new T.Vector3().crossVectors(UP,forward).normalize();
  const up = new T.Vector3().crossVectors(forward,right);
  const rotation = new T.Quaternion().setFromRotationMatrix(new T.Matrix4().makeBasis(right,up,forward));
  const inverse = rotation.clone().invert();
  return {
    origin, rotation,
    world: (v: Vec3) => new T.Vector3(...v).applyQuaternion(rotation).add(origin).toArray() as Vec3,
    local: (v: Vec3) => new T.Vector3(...v).sub(origin).applyQuaternion(inverse).toArray() as Vec3,
  };
}

export const FLOOR = .334;
export const LAND: Vec3 = [1.31,1.304,zAt(MARK.land)+.290];
export const TIP_AT: Vec3 = [1.097,.018,zAt(MARK.drop)+.365];
export const SLIME_AT: Vec3 = [1.55,.016,LAND[2]-1.21];
export const RAIL_GAUGE = .95;

// Two recoveries that use the same tray, followed by a transfer in world space.
// While the cart moves by the table, only the final few frames arrest its z travel.
export function cakeAt(f: number, rail=railFrame(zAt(f))) {
  const slide = (.35+.106*rise(f,0,7))*(1-rise(f,7,29)) + .50*pulse(f,49,MARK.catch,117);
  const lift = pulse(f,174,MARK.steady-5,218);
  const level = rise(f,MARK.steady,MARK.steady+13);
  const serve = rise(f,489,MARK.land);
  const x = lerp(-slide+.17*lift, LAND[0], serve);
  const y = lerp(1.069 + .165*lift+.015*Math.sin(f*.41)*(1-serve), LAND[1]-.142+.06*(1-serve), serve);
  const z = .468+.121*slide-.035*lift;
  const roll = (-.32*slide + .32*lift*(1-level))*(1-serve);
  const pitch = (.035+.21*lift*(1-level))*(1-serve);
  const localQ = new T.Quaternion().setFromEuler(new T.Euler(pitch,0,roll));
  const worldQ = rail.rotation.clone().multiply(localQ).slerp(new T.Quaternion(),serve);
  const w = new T.Vector3(...rail.world([x,y,z]));
  if (f >= MARK.land) w.set(...LAND);
  else if (serve > 0) {
    // Minimum lift clears the rim of the porcelain stand until the land frame.
    w.y = lerp(w.y, LAND[1]+.072*Math.sin(Math.PI*serve), serve);
    w.z = lerp(w.z,LAND[2],rise(f,MARK.land-5,MARK.land));
  }
  return {pos:w.toArray() as Vec3, rot:worldQ, serve, slide, lift};
}

export const TIP_PHASE = 2.4;
export const TIP_YAW = -1.595;
export const tipRaise = (f: number) => .52 + .47*rise(f,527,MARK.drop) - .64*rise(f,MARK.drop+1,MARK.drop+10);
export const tipLean = (f: number) => .09 + .06*pulse(f,528,MARK.drop,568);

// Same shoulder, bob and arm rotations as the pack Skeleton's +X arm (no gait).
export function tipPalm(f: number): Vec3 {
  const u = 1.8/32;
  return new T.Vector3(0,-11.6*u,0).applyEuler(new T.Euler(-1.4*tipRaise(f),0,0))
    .add(new T.Vector3(5*u,11*u,0)).applyEuler(new T.Euler(tipLean(f),0,0))
    .add(new T.Vector3(0,12*u+Math.sin(sec(f)*1.3+TIP_PHASE)*.005,0))
    .applyAxisAngle(UP,TIP_YAW).add(new T.Vector3(...TIP_AT)).toArray();
}

export function emeraldAt(f: number): Vec3 {
  if (f < MARK.drop) return tipPalm(f);
  const a = tipPalm(MARK.drop);
  const localHit: Vec3 = [.391,FLOOR+.077,-.521];
  if (f >= MARK.clink) {
    const t = f-MARK.clink;
    return railFrame(zAt(f)).world([localHit[0]-.09*rise(t,0,8),localHit[1]+.052*pulse(t,0,2,5),localHit[2]+.06*rise(t,0,13)]);
  }
  const b = railFrame(zAt(MARK.clink)).world(localHit);
  const u = (f-MARK.drop)/(MARK.clink-MARK.drop);
  return [lerp(a[0],b[0],u),lerp(a[1],b[1],u*u),lerp(a[2],b[2],u)];
}
