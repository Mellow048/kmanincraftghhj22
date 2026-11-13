import { Euler, Vector3 } from "three";
import type { Pose, Vec3 } from "../../engine";
import { at, cue, STOP } from "./timeline";
export const sat=(x:number)=>Math.min(1,Math.max(0,x));
export const phase=(t:number,a:number,b:number)=>sat((t-a)/(b-a));
export const smooth=(x:number)=>{const k=sat(x);return k*k*(3-2*k);};
export const mix=(a:number,b:number,k:number)=>a+(b-a)*sat(k);
export const turn=(a:number,b:number,k:number)=>a+Math.atan2(Math.sin(b-a),Math.cos(b-a))*sat(k);
export const v=(a:Vec3,b:Vec3,k:number):Vec3=>[mix(a[0],b[0],k),mix(a[1],b[1],k),mix(a[2],b[2],k)];
export const add=(a:Vec3,b:Vec3):Vec3=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]];
export const distance=(a:Vec3,b:Vec3)=>Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]);
export type Key = [number,Vec3];
/** Piecewise continuous A→B motion, with distance-driven gait. The exact same function is used across camera cuts. */
export function route(t:number, keys:Key[], ease=false) {
  let d=0;
  if(t<=keys[0][0])return {position:keys[0][1],distance:0,yaw:Math.atan2(keys[1][1][0]-keys[0][1][0],keys[1][1][2]-keys[0][1][2])};
  for(let i=1;i<keys.length;i++){
    const [a,p]=keys[i-1], [b,q]=keys[i], length=distance(p,q);
    if(t<=b){const k=phase(t,a,b),e=ease?smooth(k):k;return {position:v(p,q,e),distance:d+length*e,yaw:length>1e-5?Math.atan2(q[0]-p[0],q[2]-p[2]):0};}
    d+=length;
  }
  const p=keys.at(-1)![1], q=keys.at(-2)![1];
  return {position:p,distance:d,yaw:Math.atan2(p[0]-q[0],p[2]-q[2])};
}
/** The stock rig's hand transform, without secondary sway. Contact performances set breath/weightShift to zero. */
export function handWorld(p:Vec3,yaw:number,scale:number,pose:Partial<Pose>,side:1|-1=1):Vec3 {
  const arm=side===1?pose.armR:pose.armL;
  const h=new Vector3(0,-11*1.8/32,0).applyEuler(new Euler(...(arm??[0,0,0])));
  h.add(new Vector3(side*6*1.8/32,12*1.8/32,0));
  h.applyEuler(new Euler(pose.bodyPitch??0,pose.bodyYaw??0,pose.bodyRoll??0));
  h.y+=12*1.8/32+(pose.bodyY??0);
  h.multiplyScalar(scale).applyEuler(new Euler(0,yaw,0)).add(new Vector3(...p));
  return [h.x,h.y,h.z];
}
/** Aim a straight Minecraft arm at a contact. Actors are staged within reach rather than stretching limbs. */
export function aimHand(p:Vec3,yaw:number,scale:number,pose:Partial<Pose>,target:Vec3,side:1|-1=1):Vec3 {
  return armAngle(p,yaw,scale,pose,target,side);
}
function armAngle(p:Vec3,yaw:number,scale:number,pose:Partial<Pose>,target:Vec3,side:1|-1):Vec3 {
  const q=new Vector3(...target).sub(new Vector3(...p)).applyEuler(new Euler(0,-yaw,0)).divideScalar(scale);
  q.y-=12*1.8/32+(pose.bodyY??0);
  // Inverse XYZ body rotation: reverse order and sign.
  q.applyEuler(new Euler(-(pose.bodyPitch??0),-(pose.bodyYaw??0),-(pose.bodyRoll??0),"ZYX"));
  q.sub(new Vector3(side*6*1.8/32,12*1.8/32,0));
  const len=q.length()||1;
  return [Math.atan2(-q.z,-q.y),0,Math.asin(Math.max(-.99,Math.min(.99,q.x/len)))];
}
export const stoop=(amount:number):Partial<Pose>=>({bodyY:-.4*amount,bodyPitch:.82*amount,legR:[-1.15*amount,0,.07],legL:[-1.15*amount,0,-.07],kneeR:[2.1*amount,0,0],kneeL:[2.1*amount,0,0],head:[.08,0,0]});
export const kneel=(amount:number):Partial<Pose>=>({bodyY:-.43*amount,bodyPitch:.12*amount,legR:[-1.4*amount,0,.1],legL:[.2*amount,0,-.1],kneeR:[1.8*amount,0,0],kneeL:[1.9*amount,0,0]});

export const LOCKER={friend:[0,0,-.88] as Vec3, safe:[-.95,0,.16] as Vec3, book:[-.74,.08,.54] as Vec3};
export function lockerMotion(t:number){
  const s=STOP.locker.a, pull=smooth(phase(t,s+1.12,s+1.93));
  const friend=v(LOCKER.friend,LOCKER.safe,pull);
  let hero=route(t,[[cue('7.locker').start,[-2.4,0,.5]],[s-.15,[-.6,0,-.48]],[s+1.12,[-.6,0,-.48]],[s+1.93,[-1.55,0,.56]],[s+2.28,[-1.12,0,.55]],[s+3.25,[-1.45,0,.65]],[s+4.5,[-1.86,0,.16]],[cue('8.secret').end,[-1.86,0,.16]]]);
  if(t>=s+1.12&&t<=s+1.93)hero={...hero,position:add(friend,[-.6,0,.4])};
  const door=t<s?mix(-1.65,-.18,smooth(phase(t,at('7.door','swung'),s))):t<STOP.locker.b?-.18:mix(-.18,0,smooth(phase(t,STOP.locker.b,STOP.locker.b+.18)));
  return {s,friend,hero,door,pull};
}

export const RESCUE={elder:[0,.34,-.1] as Vec3, inside:[0,.34,-2.2] as Vec3, door:[0,0,-2] as Vec3, arrow:[0,.7,-.9] as Vec3};
export function rescueMotion(t:number){
 const s=STOP.elder.a, drag=smooth(phase(t,s+1.05,s+3.05));
 const elder=v(RESCUE.elder,RESCUE.inside,drag);
 let hero=route(t,[[cue('10.night').start,[-5,0,-1.2]],[cue('10.bow').start,[-3.4,0,.0]],[s,[-.48,0,-1.55]],[s+1.05,[-.48,0,-1.55]],[s+3.05,[-.48,0,-3.65]],[s+4.25,[-.48,0,-2.5]],[cue('11.safe').end,[-.48,0,-2.5]]]);
 if(t>=s+1.05&&t<=s+3.05)hero={...hero,position:[elder[0]-.48,0,elder[2]-1.45]};
 const shut=smooth(phase(t,s+3.2,s+4.15));
 return {s,drag,elder,hero,door:-1.7*(1-shut)};
}

export const MAN_START:Vec3=[1.3,0,1.2];
export const RABBIT_START:Vec3=[1.78,0,1.66];
export const RUN_START=at('14.run','ran')-.2;
export const HERO_RUN=at('14.follow','chased')-.6;
export const MAN_RUN_ORIGIN:Vec3=[2.1,0,1.2];
export const MAN_FREEZE:Vec3=[MAN_RUN_ORIGIN[0]+3*(STOP.counter.a-RUN_START),0,1.2];
export const HERO_FREEZE:Vec3=[MAN_FREEZE[0]-2.05,0,1.2];
export const ROCK_START:Vec3=[HERO_FREEZE[0]-.1,0,.78];
export const ROCK_END:Vec3=[MAN_FREEZE[0]+.64,0,.95];
export const HERO_SIDE:Vec3=[MAN_FREEZE[0]+1.05,0,2.48];
export const HIT=at('17.hit','caught');
export const LAND=at('17.fall','back')-.04;
export function counterHero(t:number){
 const s=STOP.counter.a;
 const start:Vec3=[-3.75,0,-.15];
 if(t<s){
   const k=phase(t,HERO_RUN,s); return {position:v(start,HERO_FREEZE,k),distance:distance(start,HERO_FREEZE)*k,yaw:Math.PI/2};
 }
 return route(t,[[s,HERO_FREEZE],[s+.6,HERO_FREEZE],[s+1.25,[HERO_FREEZE[0],0,.52]],[s+2.85,[MAN_FREEZE[0]+.4,0,.52]],[s+3.65,[MAN_FREEZE[0]+.4,0,.52]],[s+4.65,HERO_SIDE],[at('17.rabbit','lifted')-.5,HERO_SIDE],[at('17.rabbit','lifted')+.1,[MAN_FREEZE[0]+1.12,0,1.9]],[cue('18.prince').end,[MAN_FREEZE[0]+1.12,0,1.9]]]);
}
export function manMotion(t:number){
 const s=STOP.counter, resumed=Math.max(0,t-s.b);
 if(t<s.a){const k=Math.max(0,t-RUN_START),step=smooth(phase(t,at('13.kneel','knelt')-.25,at('13.kneel','rabbit')));return {position:[mix(MAN_START[0],MAN_RUN_ORIGIN[0],step)+3*k,0,1.2] as Vec3,yaw:mix(0,Math.PI/2,smooth(phase(t,RUN_START-.25,RUN_START+.2))),travel:3*k,trip:0,fall:0};}
 if(t<s.b)return {position:MAN_FREEZE,yaw:Math.PI/2,travel:3*(s.a-RUN_START),trip:0,fall:0};
 const brake=.38*smooth(phase(resumed,0,.25));
 const trip=phase(t,HIT-.12,HIT+.24),spin=smooth(phase(t,HIT+.25,LAND-.45)),fall=smooth(phase(t,LAND-1.05,LAND));
 const x=MAN_FREEZE[0]+brake+.42*smooth(trip)+.85*spin;
 return {position:[x,0,1.2+.13*Math.sin(spin*Math.PI)] as Vec3,yaw:Math.PI/2+Math.PI*2*spin-2.2*smooth(phase(t,cue("18.look").start,cue("18.look").end)),travel:3*(s.a-RUN_START)+brake+.42*trip,trip,fall};
}

export const FIRST_FIRE=at('15.blocks','shot');
export const FIRST_FROM:Vec3=[manMotion(FIRST_FIRE).position[0]-.45,1.27,.87];
export const FIRST_WALL:Vec3=[FIRST_FROM[0]-3.1,1.05,3.42];
export const FIRST_IMPACT=FIRST_FIRE+.36;
export const SECOND_FIRE=STOP.counter.a-.13;
export const THIRD_FIRE=STOP.counter.a-.067;
export const SECOND_HOLD:Vec3=[HERO_FREEZE[0]+.52,1.46,1.2];
export const THIRD_HOLD:Vec3=[HERO_FREEZE[0]+1.05,1.25,1.2];

export const ARROW_LAUNCH=STOP.elder.a-1.2;
export function rescueArrow(t:number):Vec3{const s=STOP.elder;return t<s.a?v([.28,1.26,7.78],RESCUE.arrow,phase(t,ARROW_LAUNCH,s.a)):t<s.b?RESCUE.arrow:v(RESCUE.arrow,[0,.7,-1.91],phase(t,s.b,s.b+.13));}

/** The joined villager sleeves can reach/bow without turning a villager into a player model. */
export function sleevePoint(p:Vec3,yaw:number,scale:number,arm:Vec3,offset:Vec3=[0,0,0],lean=0,bob=0,point:Vec3=[0,-.225,.13]):Vec3{
 const q=new Vector3(...point).applyEuler(new Euler(...arm));
 q.add(new Vector3(offset[0],.50625+offset[1],.05625+offset[2])).applyEuler(new Euler(lean,0,0));
 q.y+=.675+bob;q.multiplyScalar(scale).applyEuler(new Euler(0,yaw,0)).add(new Vector3(...p));return [q.x,q.y,q.z];
}
/** A decisive act followed by a small recovery, instead of a constant-speed pose interpolation. */
export const punch=(t:number,start:number,dur:number)=>{const p=phase(t,start,start+dur);return p*p*(3-2*p);};
export const recoil=(t:number,hit:number,amount=.08)=>t<hit?0:amount*Math.sin((t-hit)*21)*Math.exp(-(t-hit)*7);

/** Actual shoulder pivot used by the straight-arm rig, for a reach with no scaling/stretching. */
export function shoulderWorld(p:Vec3,yaw:number,scale:number,pose:Partial<Pose>,side:1|-1=1):Vec3 {
 const q=new Vector3(side*.3375,.675,0).applyEuler(new Euler(pose.bodyPitch??0,pose.bodyYaw??0,pose.bodyRoll??0));
 q.y+=.675+(pose.bodyY??0);q.multiplyScalar(scale).applyEuler(new Euler(0,yaw,0)).add(new Vector3(...p));return [q.x,q.y,q.z];
}
