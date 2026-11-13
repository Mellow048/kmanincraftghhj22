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
export const LOCKER_HOLD=-.24;
export const LOCKER_CLEAR=-3.05;
export const LOCKER_OPEN_START=STOP.locker.a+.35,LOCKER_OPEN_END=STOP.locker.a+.72;
export const LOCKER_GRAB=STOP.locker.a+1.12;
export function lockerMotion(t:number){
  const s=STOP.locker.a, pull=smooth(phase(t,LOCKER_GRAB,s+1.93));
  // First out through the opening, then around the open panel's tip, then left to safety.
  // A diagonal straight through the side wall is not a rescue trajectory.
  const friend=route(t,[[LOCKER_GRAB,LOCKER.friend],[s+1.59,[0,0,.64]],[s+1.83,[-.95,0,.64]],[s+1.93,LOCKER.safe]],true).position;
  let hero=route(t,[[cue('7.locker').start,[-2.4,0,.5]],[s-.15,[-.70,0,-.48]],[s+.73,[-.70,0,-.48]],[s+1.03,[.30,0,-.18]],[LOCKER_GRAB,[.30,0,-.18]],[s+1.59,[.30,0,1.34]],[s+1.83,[-.65,0,1.34]],[s+1.93,[-.65,0,.86]],[s+2.28,[-1.12,0,.55]],[s+3.05,[-1.45,0,.65]],[s+3.65,[-1.45,0,.65]],[s+4.5,[-1.86,0,.16]],[cue('8.secret').end,[-1.86,0,.16]]]);
  if(t>=LOCKER_GRAB&&t<=s+1.93)hero={...hero,position:add(friend,[.30,0,.70])};
  // Only the touched door moves. Once his hand releases it, the open panel waits for time.
  const door=t<s?mix(-1.65,LOCKER_HOLD,smooth(phase(t,at('7.door','swung'),s))):t<STOP.locker.b?mix(LOCKER_HOLD,LOCKER_CLEAR,smooth(phase(t,LOCKER_OPEN_START,LOCKER_OPEN_END))):mix(LOCKER_CLEAR,0,smooth(phase(t,STOP.locker.b,STOP.locker.b+.28)));
  return {s,friend,hero,door,pull};
}

export const RESCUE={elder:[0,.34,-.1] as Vec3, inside:[0,.34,-2.8] as Vec3, door:[0,0,-2] as Vec3, arrow:[0,.7,-.9] as Vec3};
export const DOOR_KICK=at('11.door','kicked')+.12, DOOR_SHUT=DOOR_KICK+.55;
export function rescueMotion(t:number){
 const s=STOP.elder.a, drag=smooth(phase(t,s+1.05,s+2.85));
 const elder=v(RESCUE.elder,RESCUE.inside,drag);
 let hero=route(t,[[cue('10.night').start,[-5,0,-1.2]],[cue('10.bow').start,[-3.4,0,.0]],[s,[-.48,0,-1.55]],[s+1.05,[-.48,0,-1.55]],[s+2.85,[-.48,0,-4.25]],[DOOR_KICK,[-.5,0,-3.05]],[DOOR_SHUT,[-.3,0,-2.45]],[s+4.85,[-.48,0,-2.5]],[cue('11.safe').end-.55,[-.48,0,-2.5]],[cue('12.thanks').start+.15,[.1,0,-2.3]],[cue('12.rabbit').end,[.1,0,-2.3]]]);
 if(t>=s+1.05&&t<=s+2.85)hero={...hero,position:[elder[0]-.48,0,elder[2]-1.45]};
 const shut=smooth(phase(t,DOOR_KICK,DOOR_SHUT));
 return {s,drag,elder,hero,door:1.7*(1-shut)};
}

export const MAN_START:Vec3=[1.3,0,1.2];
export const RABBIT_START:Vec3=[1.78,0,1.66];
export const RUN_START=at('14.run','ran')-.2;
export const HERO_RUN=at('14.follow','chased')-.6;
export const MAN_RUN_ORIGIN:Vec3=[2.1,0,1.2];
export const RUN_SPEED=4.1,RUN_ACCEL=.24;
export const runTravel=(elapsed:number)=>elapsed<=0?0:elapsed<RUN_ACCEL?RUN_SPEED*elapsed*elapsed/(2*RUN_ACCEL):RUN_SPEED*(elapsed-RUN_ACCEL/2);
export const MAN_FREEZE:Vec3=[MAN_RUN_ORIGIN[0]+runTravel(STOP.counter.a-RUN_START),0,1.2];
export const HERO_FREEZE:Vec3=[MAN_FREEZE[0]-2.05,0,1.2];
export const ROCK_START:Vec3=[HERO_FREEZE[0]-.1,0,.78];
export const ROCK_END:Vec3=[MAN_FREEZE[0]+1.18,0,.95];
export const HERO_SIDE:Vec3=[MAN_FREEZE[0]+1.05,0,2.48];
export const HIT=at('17.hit','caught');
export const SPIN_START=at('17.fall','spun')-.08,SPIN_END=at('17.fall','around')+.24;
export const LAND=at('17.fall','landed')+.05,FALL_START=LAND-.52;
export const FALL_ROOT:Vec3=[MAN_FREEZE[0]+3.85,0,1.22];
export const SCOOP_ROOT:Vec3=[MAN_FREEZE[0]+4.12,0,1.74];
export const SAFE_RABBIT_ROOT:Vec3=[MAN_FREEZE[0]+4.02,0,2.72];
export function counterHero(t:number){
 const s=STOP.counter.a;
 const start:Vec3=[-3.75,0,-.15];
 if(t<s){
   // Reach the open middle of the established gate BEFORE crossing its fence at x=2.7.
   const through:Vec3=[-1,0,1.2],first=distance(start,through),total=first+distance(through,HERO_FREEZE);
   const travelled=total*Math.min(1,runTravel(t-HERO_RUN)/runTravel(s-HERO_RUN));
   const position=travelled<first?v(start,through,travelled/first):v(through,HERO_FREEZE,(travelled-first)/(total-first));
   const yaw=travelled<first?Math.atan2(through[0]-start[0],through[2]-start[2]):Math.PI/2;
   return {position,distance:travelled,yaw};
 }
 const pickup=at('16.stop','grabbed'), place=at('16.throw','path')+.04;
 const routed=route(t,[[s,HERO_FREEZE],[pickup+.10,HERO_FREEZE],[cue('16.front').start-.02,[HERO_FREEZE[0],0,.52]],[at('16.throw','Set')-.2,[MAN_FREEZE[0]+.95,0,.52]],[place+.25,[MAN_FREEZE[0]+.95,0,.52]],[at('16.side','aside')+.42,HERO_SIDE],[HIT+.15,HERO_SIDE],[LAND+.24,[SCOOP_ROOT[0]-.3,0,2.48]],[at('17.rabbit','lifted')+.1,SCOOP_ROOT],[at('17.rabbit','lifted')+1.10,SCOOP_ROOT],[at('17.rabbit','lifted')+1.90,SAFE_RABBIT_ROOT],[cue('18.prince').end,SAFE_RABBIT_ROOT]]);
 return {...routed,distance:distance(start,HERO_FREEZE)+routed.distance};
}
export function manMotion(t:number){
 const s=STOP.counter;
 if(t<s.a){const travel=runTravel(t-RUN_START),step=smooth(phase(t,at('13.kneel','knelt')-.25,at('13.kneel','rabbit')));return {position:[mix(MAN_START[0],MAN_RUN_ORIGIN[0],step)+travel,0,1.2] as Vec3,yaw:mix(0,Math.PI/2,smooth(phase(t,RUN_START-.25,RUN_START+.2))),travel,trip:0,fall:0};}
 if(t<s.b)return {position:MAN_FREEZE,yaw:Math.PI/2,travel:runTravel(s.a-RUN_START),trip:0,fall:0};
 const brake=.50*(1-(1-phase(t,s.b,s.b+.35))**3),trip=phase(t,HIT-.08,HIT+.24);
 const path=route(t,[[s.b+.35,[.5,0,0]],[HIT-.48,[.5,0,.08]],[HIT,[.86,0,0]],[HIT+.27,[1.18,0,0]],[HIT+.70,[1.82,0,.12]],[SPIN_START,[2.40,0,-.04]],[SPIN_END,[3.15,0,-.05]],[LAND,[3.63,0,.02]],[LAND+.24,[3.85,0,.02]]]);
 const offset=t<s.b+.35?[brake,0,0] as Vec3:path.position;
 const spin=smooth(phase(t,SPIN_START,SPIN_END)),fall=phase(t,FALL_START,LAND)**2;
 const yaw=turn(Math.PI/2+Math.PI*spin,Math.atan2(SAFE_RABBIT_ROOT[0]-FALL_ROOT[0],SAFE_RABBIT_ROOT[2]-FALL_ROOT[2]),smooth(phase(t,at('18.look','then'),cue('18.look').end-.18)));
 return {position:add(MAN_FREEZE,offset),yaw,travel:runTravel(s.a-RUN_START)+(t<s.b+.35?brake:.5+path.distance),trip,fall};
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
export function rescueArrow(t:number):Vec3{const s=STOP.elder;return t<s.a?v([-.28125,1.2803,7.7583],RESCUE.arrow,phase(t,ARROW_LAUNCH,s.a)):t<s.b?RESCUE.arrow:v(RESCUE.arrow,[0,.7,-1.55],phase(t,s.b,s.b+.13));}

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

/** Translate the joined sleeve pivot by the small offset needed for a world-space rail/prop contact. */
export function sleeveOffset(root:Vec3,yaw:number,scale:number,arm:Vec3,target:Vec3,lean=0,bob=0,point:Vec3=[0,-.225,.13]):Vec3{
 const existing=sleevePoint(root,yaw,scale,arm,[0,0,0],lean,bob,point);
 const q=new Vector3(...target).sub(new Vector3(...existing)).applyEuler(new Euler(0,-yaw,0)).divideScalar(scale).applyEuler(new Euler(-lean,0,0));return q.toArray() as Vec3;
}
