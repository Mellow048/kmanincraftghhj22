import {Euler,Vector3} from 'three';
import type { Pose,Vec3 } from '../../engine';
import {at,cue,STOP,paused,worldTime} from './timeline';
import {add,aimHand,handWorld,phase,smooth,mix,v,turn,route,rescueMotion,rescueArrow,ARROW_LAUNCH,DOOR_KICK,DOOR_SHUT,sleevePoint} from './motion';
import {neutral,blend,planted,reach,accent,bounce,locomotion,stepLegs,footReach} from './performance';

export const ELDER_GRAB=STOP.elder.a+.62,ELDER_RELEASE=STOP.elder.a+2.85;
export const CARROT_PASS=at('12.thanks','carrot')+.06;
export function doorContact(t:number):Vec3{
 const angle=rescueMotion(t).door;
 return [-.65+Math.cos(angle)*.65+Math.sin(angle)*.03,.30,-1.92-Math.sin(angle)*.65+Math.cos(angle)*.03];
}
export function elderState(t:number){
 const q=rescueMotion(t),a=cue('12.thanks').start;
 const rise=smooth(phase(t,a-.15,a+.53)),position=v(q.elder,[-.1,0,-3.15],rise);
 const angle=-Math.PI/2*(1-rise);
 const lean=.20*Math.sin(rise*Math.PI)+(t>=a+.53?.04:0);
 const offer=accent(t,at('12.thanks','handed')-.28,at('12.thanks','handed')+.10,CARROT_PASS+.05,CARROT_PASS+.38);
 const arm:Vec3=[-.75-.11*offer,0,0],offset:Vec3=[0,0,.04*offer];
 const local=sleevePoint([0,0,0],0,.92,arm,offset,lean,0);
 const grip=new Vector3(...local).applyEuler(new Euler(angle,0,0)).add(new Vector3(...position)).toArray() as Vec3;
 return {position,angle,lean,arm,offset,grip,rise};
}
export function rescueState(t:number){
 const q=rescueMotion(t),s=STOP.elder,h=q.hero.position,e=elderState(t);
 const shoulder=add(q.elder,[-.06,.24,-1.22]);
 let yaw=q.hero.yaw,pose=locomotion(q.hero.distance,'run');
 const grabYaw=Math.atan2(shoulder[0]-h[0],shoulder[2]-h[2]);
 if(t>=s.a){
  yaw=turn(q.hero.yaw,grabYaw,smooth(phase(t,s.a,ELDER_GRAB-.12)));
  const grip=reach(h,grabYaw,.95,{...neutral(),bodyPitch:.86,armL:[-.55,0,-.24],head:[.12,0,0]},shoulder);
  pose=blend(locomotion(rescueMotion(s.a).hero.distance,'run'),grip,smooth(phase(t,s.a+.02,ELDER_GRAB)));
  if(t>=ELDER_GRAB){pose=grip;yaw=grabYaw;}
  if(t>=s.a+1.05&&t<=ELDER_RELEASE)pose=stepLegs(pose,q.hero.distance,'walk',.95,-1);
  if(t>=ELDER_RELEASE){
   const rest=locomotion(q.hero.distance,'walk');
   pose=blend(grip,rest,smooth(phase(t,ELDER_RELEASE,DOOR_KICK-.04)));
   yaw=turn(grabYaw,0,smooth(phase(t,ELDER_RELEASE,DOOR_KICK)));
   if(t>=DOOR_KICK-.10){
    const kick=footReach(h,0,.95,planted({...neutral(),bodyY:-.16,bodyPitch:-.06,armR:[-.60,0,.45],armL:[-.8,0,-.45],head:[.11,0,0]},0,-.08),doorContact(Math.max(t,DOOR_KICK)),1);
    pose=blend(pose,kick,smooth(phase(t,DOOR_KICK-.10,DOOR_KICK)));yaw=0;
    if(t>=DOOR_KICK&&t<=DOOR_SHUT)pose=kick;
    if(t>DOOR_SHUT){
     const finalRoot=rescueMotion(DOOR_SHUT).hero.position;
     const finalKick=footReach(finalRoot,0,.95,{...neutral(),bodyY:-.16,bodyPitch:-.06,armR:[-.60,0,.45],armL:[-.8,0,-.45]},doorContact(DOOR_SHUT));
     pose=blend(finalKick,neutral(),smooth(phase(t,DOOR_SHUT,DOOR_SHUT+.36)));
     if(t>DOOR_SHUT+.36&&t<s.b-.15)pose=blend(neutral(),locomotion(q.hero.distance,'walk'),accent(t,DOOR_SHUT+.36,DOOR_SHUT+.52,s.b-.33,s.b-.15));
    }
   }
  }
 }
 if(t>=s.b){
  const arrow=accent(t,s.b+.10,s.b+.19,s.b+.24,s.b+.4);
  pose=planted({...neutral(),bodyPitch:-.05*arrow,armR:[-.3,0,.2],armL:[-.2,0,-.16],head:[.11,0,.04]},.05,-.05);
  yaw=turn(0,Math.PI,smooth(phase(t,s.b+.55,s.b+1.15)));
 }
 if(t>=cue('11.safe').end-.55){
  yaw=Math.PI;pose=blend(pose,locomotion(q.hero.distance,'walk'),accent(t,cue('11.safe').end-.55,cue('11.safe').end-.35,cue('12.thanks').start-.02,cue('12.thanks').start+.15));
  const take=reach(h,Math.PI,.95,{...neutral(),armL:[-.28,0,-.16]},e.grip);
  pose=blend(pose,take,smooth(phase(t,at('12.thanks','handed')-.10,CARROT_PASS)));
  if(t>=CARROT_PASS){
   const contact=reach(h,Math.PI,.95,neutral(),elderState(CARROT_PASS).grip);
   pose=blend(contact,{...neutral(),armR:[-.95,0,.10],armL:[-.1,0,-.1],head:[.12,0,0]},smooth(phase(t,CARROT_PASS,CARROT_PASS+.5)));
   pose.head=[.08+.05*Math.sin((t-CARROT_PASS)*5),0,0];
  }
 }
 const carrot=t<CARROT_PASS?add(e.grip,[0,-.13,0]):add(handWorld(h,yaw,.95,pose),[0,-.13,0]);
 return {...q,yaw,pose,shoulder,elderState:e,carrot};
}
export function bowState(t:number){
 const pt=paused(t,'elder'),raise=smooth(phase(pt,at('10.bow','raised')-.18,at('10.bow','bow')+.15));
 const draw=smooth(phase(pt,at('10.bow','bow')+.12,ARROW_LAUNCH-.08))*(1-smooth(phase(pt,ARROW_LAUNCH,ARROW_LAUNCH+.09)));
 const angle=-.18-1.37*raise;
 const arrow:Vec3=[-.28125,1.29375-.646875*Math.cos(angle),8.4+.646875*Math.sin(angle)+.09+.24*draw-.325];
 return {raise,draw,arrow};
}
export function zombiesAt(t:number){
 const s=STOP.elder,pt=paused(t,'elder'),arrive=smooth(phase(pt,cue('10.mobs').start,s.a)),rush=smooth(phase(t,s.b,s.b+1.15));
 return [-1,1].map((side,i)=>{
  const start=4.5+i*.38,end=.95+i*.4,z=mix(mix(start,end,arrive),-1.27,rush);
  const distance=start-z,contact=t>=s.b+1.15;
  return {position:[side*mix(.85,.49,rush),0,z] as Vec3,distance,contact,wave:contact?.10+.09*Math.sin(worldTime(t)*10+i*2):0,lean:contact?.08:.06*arrive};
 });
}
