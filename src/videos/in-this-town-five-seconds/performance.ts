import { Euler, Vector3, Quaternion } from 'three';
import { getPose, blendPose } from '../../engine/anim';
import type { Pose, Vec3 } from '../../engine';
import { aimHand, distance, handWorld, mix, phase, shoulderWorld, smooth } from './motion';

/** Film-local acting tools. Shared avatar/legacy animation defaults are deliberately untouched. */
export const neutral = ():Pose => ({...getPose('idle',0),bodyY:0,bodyPitch:0,bodyYaw:0,bodyRoll:0,torso:[0,0,0],head:[0,0,0],armR:[-.08,0,.05],armL:[-.08,0,-.05],legR:[0,0,0],legL:[0,0,0],kneeR:[0,0,0],kneeL:[0,0,0]});
export const full = (p:Partial<Pose>):Pose => ({...neutral(),...p});
export const blend = (a:Partial<Pose>,b:Partial<Pose>,k:number):Pose => blendPose(full(a),full(b),Math.min(1,Math.max(0,k)));
export const accent=(t:number,a:number,b:number,c:number,d:number)=>smooth(phase(t,a,b))*(1-smooth(phase(t,c,d)));
export const bounce=(t:number,at:number,size=.08,duration=.32)=>t<at||t>at+duration?0:size*Math.sin(Math.PI*phase(t,at,at+duration))**2;

/** Actual toe/sole transform, including the hips and knees. Used in the trip and contact tests. */
export function footWorld(root:Vec3,yaw:number,scale:number,pose:Partial<Pose>,side:1|-1=1,tip=.065):Vec3{
 const p=full(pose),q=new Vector3(0,-.3375,tip).applyEuler(new Euler(...(side===1?p.kneeR:p.kneeL)));
 q.y-=.3375;q.applyEuler(new Euler(...(side===1?p.legR:p.legL)));q.x+=side*.12375;
 q.applyEuler(new Euler(p.bodyPitch,p.bodyYaw,p.bodyRoll));q.y+=.675+p.bodyY;
 q.multiplyScalar(scale).applyEuler(new Euler(0,yaw,0)).add(new Vector3(...root));return q.toArray() as Vec3;
}
/** Two equal block segments solve a planted foot. The hips can bow/reach without the shoes sliding upward. */
function legFor(p:Pose,side:1|-1,z:number,y=.035,x=side*.12375):[Vec3,Vec3]{
 const q=new Vector3(x,y-(.675+p.bodyY),z).applyEuler(new Euler(-p.bodyPitch,-p.bodyYaw,-p.bodyRoll,'ZYX'));
 q.x-=side*.12375;
 const length=Math.min(.6749,Math.max(.08,q.length())),knee=2*Math.acos(length/.675);
 const back=q.z<0,heading=Math.atan2(back?-q.x:q.x,Math.abs(q.z)),r=Math.hypot(q.x,q.z)*(back?-1:1);
 const pitch=Math.atan2(-r,-q.y)-knee/2;
 const rotation=new Quaternion().setFromAxisAngle(new Vector3(0,1,0),heading).multiply(new Quaternion().setFromAxisAngle(new Vector3(1,0,0),pitch));
 const e=new Euler().setFromQuaternion(rotation,'XYZ');
 return [[e.x,e.y,e.z],[knee,0,0]];
}
export function planted(pose:Partial<Pose>,rightZ=.08,leftZ=-.08):Pose{
 const p=full(pose);[p.legR,p.kneeR]=legFor(p,1,rightZ);[p.legL,p.kneeL]=legFor(p,-1,leftZ);return p;
}
/** Re-solve only the stepping feet after the contact solver has set the hips. */
export function stepLegs(pose:Partial<Pose>,d:number,kind:'walk'|'run'='walk',scale=.95,direction=1):Pose{
 const p=full(pose),run=kind==='run',stride=(run?1.55:1.24)*scale;
 for(const side of [1,-1] as const){
  const f=((d/stride+(side===1?0:.5))%1+1)%1,span=run?.3875:.31;
  const z=(f<.5?mix(span,-span,f*2):mix(-span,span,smooth((f-.5)*2)))*direction;
  const y=.035+(f<.5?0:Math.sin((f-.5)*2*Math.PI)*(run?.22:.10));
  const [leg,knee]=legFor(p,side,z,y);
  if(side===1){p.legR=leg;p.kneeR=knee;}else{p.legL=leg;p.kneeL=knee;}
 }
 return p;
}
/** Distance-driven, forward-leaning run/walk with a stance phase and a lifted returning foot. */
export function locomotion(distanceMetres:number,kind:'walk'|'run'='run',scale=.95):Pose{
 const run=kind==='run',stride=(run?1.55:1.24)*scale,cycle=Math.max(0,distanceMetres)/stride*Math.PI*2;
 let p=neutral();p.bodyY=(run?-.135:-.065)+(run?.012:.009)*Math.cos(cycle*2);
 p.bodyPitch=run?.18:.035;p.bodyRoll=Math.cos(cycle)*(run?.035:.018);
 p.torso=[0,Math.sin(cycle)*.055,0];p.head=[-p.bodyPitch*.65,-Math.sin(cycle)*.025,0];
 p=stepLegs(p,distanceMetres,kind,scale);
 const swing=Math.sin(cycle)*(run?1.0:.50);
 p.armR=[-swing-(run?.18:0),0,run?.18:.07];p.armL=[swing-(run?.18:0),0,run?-.18:-.07];return p;
}
/** Put the actual toe on a door/stone contact. No leg scaling and no detached shoe. */
export function footReach(root:Vec3,yaw:number,scale:number,pose:Partial<Pose>,target:Vec3,side:1|-1=1):Pose{
 const p=full(pose),worldTarget=new Vector3(...target);let desired=worldTarget.clone();
 for(let i=0;i<6;i++){
  const q=desired.clone().sub(new Vector3(...root)).applyEuler(new Euler(0,-yaw,0)).divideScalar(scale);
  const [leg,knee]=legFor(p,side,q.z,q.y,q.x);
  if(side===1){p.legR=leg;p.kneeR=knee;}else{p.legL=leg;p.kneeL=knee;}
  const error=worldTarget.clone().sub(new Vector3(...footWorld(root,yaw,scale,p,side)));
  desired.add(error);
 }
 return p;
}
/** Exact straight-arm contact by bending at the hips, not by stretching a hand toward an unreachable prop. */
export function reach(root:Vec3,yaw:number,scale:number,pose:Partial<Pose>,target:Vec3,side:1|-1=1):Pose{
 const p=full(pose),pivot=shoulderWorld(root,yaw,scale,p,side),length=.61875*scale;
 const flat=Math.hypot(target[0]-pivot[0],target[2]-pivot[2]);
 if(flat<length){
  const desiredY=target[1]+Math.sqrt(Math.max(0,length*length-flat*flat));
  p.bodyY+=(desiredY-pivot[1])/scale;
 }
 const arm=aimHand(root,yaw,scale,p,target,side);
 if(side===1)p.armR=arm;else p.armL=arm;
 return planted(p);
}
export function palmMid(root:Vec3,yaw:number,scale:number,pose:Partial<Pose>):Vec3{
 const r=handWorld(root,yaw,scale,pose,1),l=handWorld(root,yaw,scale,pose,-1);return [(r[0]+l[0])/2,(r[1]+l[1])/2,(r[2]+l[2])/2];
}
export function palmContactError(root:Vec3,yaw:number,scale:number,pose:Partial<Pose>,target:Vec3,side:1|-1=1){return distance(handWorld(root,yaw,scale,pose,side),target);}
