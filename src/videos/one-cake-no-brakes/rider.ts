import * as T from "three";
import { getPose, type Pose } from "../../engine/anim";
import { clamp, lerp, type Vec3 } from "../../engine/math";
import { FLOOR, MARK, cakeAt, pulse, railFrame, rise, zAt } from "./rail";

export const PIXEL = 1.8/32;
const HIP = 12*PIXEL, SHOULDER = 6*PIXEL, ARM = 11.3*PIXEL;
const Y = new T.Vector3(0,1,0);

/** Rigid block arms aimed at the tray rims. During the transfer Finn pivots
 * both palms under the near edge; the cake then stops in world space. */
export function riderAt(f: number, rail = railFrame(zAt(f)), cake = cakeAt(f,rail)) {
  const p: Pose = getPose("idle",0);
  const forward = pulse(f,480,MARK.land-1,MARK.land+25);
  const take = rise(f,485,MARK.land-1);
  const drop = rise(f,MARK.land,MARK.land+14);
  const side = take*(1-drop);
  const dip = pulse(f,180,MARK.steady,217);
  const turning = pulse(f,222,257,293);
  const yaw = .052 + 1.39*side + .47*turning + .44*pulse(f,541,554,575);
  const at: Vec3 = [-.291*cake.slide+.224*side, FLOOR+.011, -.063+.332*side+.126*cake.slide];
  p.bodyPitch = .112+.355*forward+.081*dip;
  p.bodyRoll = .43*cake.slide - .057*dip;
  p.bodyYaw = 0;
  p.bodyY = -.035-.037*dip-.096*cake.slide;
  p.torso = [0,0,0];
  const bend = .27+.18*dip+.08*cake.slide;
  p.legR = [-bend-p.bodyPitch,0,-p.bodyRoll+.052];
  p.legL = [-bend-p.bodyPitch,0,-p.bodyRoll-.052];
  p.kneeR = [2*bend,0,0];
  p.kneeL = [2*bend,0,0];
  p.head = [.087+.133*cake.slide-.18*turning-.198*side, -.21*cake.slide+.57*turning+.30*pulse(f,500,524,544), -.068*cake.slide+.067*dip];
  const body = new T.Euler(p.bodyPitch,p.bodyYaw,p.bodyRoll);
  const bodyQ = new T.Quaternion().setFromEuler(body);
  const toCart = (v:T.Vector3) => v.applyQuaternion(bodyQ).add(new T.Vector3(0,HIP+p.bodyY,0)).applyAxisAngle(Y,yaw).add(new T.Vector3(...at));
  const toTrayQ = cake.rot.clone().invert();

  const distances: number[] = [];
  for (const s of [-1,1]) {
    const socket = new T.Vector3(s*SHOULDER,HIP,0);
    const shoulder = rail.world(toCart(socket.clone()).toArray());
    const relative = new T.Vector3(...shoulder).sub(new T.Vector3(...cake.pos)).applyQuaternion(toTrayQ);
    let edge = lerp(s*.466,-.456,take);
    const height = .023;
    const d = Math.hypot(relative.x-edge,relative.y-height);
    const length = Math.sqrt(Math.max(0,ARM**2-d**2));
    const normalZ = clamp(relative.z + length,-.331,.275);
    const transferZ = s>0 ? clamp(relative.z + length,-.315,-.095) : clamp(relative.z - length,.076,.313);
    const z = lerp(normalZ,transferZ,take);
    if (take > 0) {
      // When the body leans close to the tray, let the palm travel UNDER it
      // instead of running a rigid forearm through its near edge.
      const span = Math.sqrt(Math.max(0,ARM**2-(relative.y-height)**2-(relative.z-z)**2));
      const best = relative.x + Math.sign(edge-relative.x || 1)*span;
      if (Math.abs(edge-relative.x)<span) edge=lerp(edge,clamp(best,-.481,.348),rise(take,.16,.56));
    }
    const goal = new T.Vector3(edge,height,z).applyQuaternion(cake.rot).add(new T.Vector3(...cake.pos));
    const pal = rail.local(goal.toArray());
    const hand = new T.Vector3(...pal).sub(new T.Vector3(...at)).applyAxisAngle(Y,-yaw)
      .sub(new T.Vector3(0,HIP+p.bodyY,0)).applyQuaternion(bodyQ.clone().invert()).sub(socket);
    distances.push(hand.length());
    hand.normalize();
    const salute = pulse(f,MARK.clink-1,MARK.clink+5,MARK.clink+23);
    const keep = 1-rise(f,MARK.land,MARK.land+7);
    const aim: Vec3 = [lerp(s===1?-.61-.84*salute:-.40,Math.atan2(-hand.z,-hand.y),keep),0,lerp(s*.25,Math.asin(clamp(hand.x)),keep)];
    if (s>0) p.armR=aim;
    else p.armL=aim;
  }
  return {at,yaw,p,distances};
}
