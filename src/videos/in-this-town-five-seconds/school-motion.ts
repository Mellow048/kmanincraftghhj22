import type { Pose,Vec3 } from '../../engine';
import {at,cue,STOP,paused} from './timeline';
import {add,aimHand,handWorld,phase,smooth,mix,v,turn,route,lockerMotion,LOCKER,LOCKER_HOLD,LOCKER_OPEN_START,LOCKER_OPEN_END,LOCKER_GRAB,sleevePoint} from './motion';
import {neutral,blend,planted,reach,accent,bounce,locomotion,stepLegs} from './performance';

export const LOCKER_PICK=STOP.locker.a+2.32,LOCKER_PLACE=STOP.locker.a+3.48;
const sleeve:Vec3=[-.75,0,0];
export function lockerDoorContact(t:number):Vec3{
 const door=lockerMotion(t).door;return [-.52+Math.cos(door)*.12+Math.sin(door)*.04,.80,-.66-Math.sin(door)*.12+Math.cos(door)*.04];
}
export function lockerState(t:number){
 const q=lockerMotion(t),s=STOP.locker,pre=smooth(phase(t,at('7.locker','shoved')-.12,at('7.locker','locker')+.12));
 const friend=t<s.a?v([.17,0,-.35],LOCKER.friend,pre):q.friend;
 const friendLean=t<s.a?-.14*pre*(1-smooth(phase(t,at('7.locker','locker')+.12,at('7.book','book')-.12))):0;
 const target=sleevePoint(friend,0,.88,sleeve,[0,0,0],friendLean,0,[0,-.225,.13]);
 const bookRest=add(sleevePoint(friend,0,.88,sleeve,[0,0,0],friendLean,0),[0,.04,0]);
 const h=q.hero.position;
 let yaw=t<s.a-.15?q.hero.yaw:Math.PI;
 let pose=locomotion(q.hero.distance,'walk');
 if(t>=s.a-.15){
  pose=blend(pose,neutral(),smooth(phase(t,s.a-.15,s.a+.1)));
  yaw=turn(Math.PI,Math.atan2(friend[0]-h[0],friend[2]-h[2]),smooth(phase(t,s.a-.05,s.a+.35)));
 }
 if(t>=s.a+.06&&t<s.a+.80){
  const doorYaw=Math.atan2(LOCKER.friend[0]-h[0],LOCKER.friend[2]-h[2]);
  yaw=turn(Math.PI,doorYaw,smooth(phase(t,s.a-.05,s.a+.34)));
  const opening=reach(h,doorYaw,.95,{...neutral(),bodyPitch:.12,armL:[-.4,0,-.16]},lockerDoorContact(t));
  pose=blend(pose,opening,smooth(phase(t,s.a+.06,LOCKER_OPEN_START)));
 }
 if(t>=s.a+.73&&t<LOCKER_GRAB){
  const walk=locomotion(q.hero.distance,'walk');
  pose=blend(pose,walk,accent(t,s.a+.73,s.a+.83,s.a+1.02,LOCKER_GRAB));
  yaw=turn(yaw,q.hero.yaw,smooth(phase(t,s.a+.73,s.a+.90)));
 }
 if(t>=s.a+.98&&t<s.a+1.98){
  const grabYaw=Math.atan2(friend[0]-h[0],friend[2]-h[2]);
  const grip=reach(h,grabYaw,.95,{...neutral(),bodyPitch:.10,armL:[-.6,0,-.22]},target);
  const pullPose=t>=LOCKER_GRAB?stepLegs(grip,q.hero.distance,'walk',.95,-1):grip;
  pose=blend(pose,pullPose,smooth(phase(t,s.a+.98,LOCKER_GRAB)));
  yaw=turn(yaw,grabYaw,smooth(phase(t,s.a+.98,LOCKER_GRAB)));
 }

 if(t>=s.a+1.95){
  yaw=turn(Math.atan2(friend[0]-h[0],friend[2]-h[2]),Math.PI/2,smooth(phase(t,s.a+1.95,s.a+2.12)));
  const down=reach(h,Math.PI/2,.95,{...neutral(),bodyPitch:.93,armL:[-.6,0,-.2]},add(LOCKER.book,[0,-.055,0]));
  pose=blend(pose,down,smooth(phase(t,s.a+1.95,LOCKER_PICK-.04)));
  if(t>=LOCKER_PICK){
   const receive=reach(h,Math.PI/2,.95,{...neutral(),armL:[-.25,0,-.14]},add(bookRest,[0,-.055,0]));
   pose=blend(down,receive,smooth(phase(t,LOCKER_PICK+.06,s.a+3.30)));yaw=Math.PI/2;
  }
  if(t>=LOCKER_PLACE){
   const retract=smooth(phase(t,LOCKER_PLACE,LOCKER_PLACE+.17));
   const rest={...neutral(),head:[.03,.25,0] as Vec3,armR:[-.22,0,.18] as Vec3};pose=blend(pose,rest,retract);
   if(t>=s.a+3.65&&t<s.a+4.5){pose=blend(rest,locomotion(q.hero.distance,'walk'),accent(t,s.a+3.60,s.a+3.78,s.a+4.29,s.a+4.50));yaw=q.hero.yaw;}
   yaw=turn(yaw,0,smooth(phase(t,s.a+4.30,s.a+4.65)));
  }
 }
 if(t>=s.b){
  const bang=accent(t,s.b,s.b+.11,s.b+.26,s.b+.47);
  pose=planted({...neutral(),bodyPitch:-.055*bang,armR:[-.22,0,.18],armL:[-.1,0,-.1],head:[0,.55*smooth(phase(t,cue('8.friend').start,cue('8.friend').start+.3)),.035]},.06,-.06);yaw=0;
  const shrug=accent(t,cue('8.secret').start,cue('8.secret').start+.16,cue('8.secret').end-.24,cue('8.secret').end);
  pose.armR=[-.22-.30*shrug,0,.18+.28*shrug];pose.head=[-.06*shrug,.55-.35*shrug,.1*shrug];
 }
 const drop=phase(t,at('7.book','book'),at('7.book','floor'));
 let book=t<at('7.book','book')?bookRest:v([0,.99,-.62],LOCKER.book,drop);
 if(drop>0&&drop<1)book[1]=mix(.99,.08,drop*drop);
 if(t>=s.a)book=LOCKER.book;
 if(t>=LOCKER_PICK&&t<LOCKER_PLACE)book=add(handWorld(h,yaw,.95,pose),[0,.055,0]);
 if(t>=LOCKER_PLACE)book=bookRest;
 return {...q,friend,friendLean,target,bookRest,book,yaw,pose};
}
export function bullyState(t:number){
 const s=STOP.locker,pt=paused(t,'locker'),door=t>=s.a&&t<s.b?LOCKER_HOLD:lockerMotion(t).door;
 const doorStart=at('7.door','swung'),touch=doorStart-.13;
 const hinge:Vec3=[-.52,0,-.66];
 const handle:Vec3=[hinge[0]+Math.cos(door)*.87+Math.sin(door)*.056,1.05,hinge[2]-Math.sin(door)*.87+Math.cos(door)*.056];
 const destination=add(handle,[.4,0,.5]);destination[1]=0;
 const moving=smooth(phase(pt,cue('7.book').start+.55,touch));
 let position=v([.82,0,-.18],destination,moving),yaw=turn(-2.45,Math.PI,moving);
 const push=accent(pt,at('7.locker','shoved')-.32,at('7.locker','shoved'),at('7.locker','locker')+.12,at('7.locker','locker')+.42);
 let pose=planted({...neutral(),bodyPitch:.16*push,bodyYaw:-.12*push,armR:[-1.30*push-.1,0,.10],armL:[-.7*push-.1,0,-.1]},.12,-.1);
 if(moving>0&&moving<1)pose=locomotion(moving*1.3,'walk',.99);
 if(pt>=touch){
  const contact=reach(position,yaw,.99,{...neutral(),bodyPitch:.06,armL:[-.4,0,-.24]},handle);
  pose=blend(pose,contact,smooth(phase(pt,touch,doorStart)));
 }
 if(t>=s.b+.18){
  const recoil=smooth(phase(t,s.b+.18,s.b+.48));position=add(position,[.24*recoil,0,.2*recoil]);
  pose=blend(pose,planted({...neutral(),bodyPitch:-.17,head:[.08,-.65,.14],armR:[-1.0,0,.6],armL:[-.65,0,-.4]},.14,-.10),recoil);
  pose=blend(pose,{...neutral(),armR:[-.6,0,.55],armL:[-.3,0,-.2],head:[.1,-.8,.15]},smooth(phase(t,s.b+.8,s.b+1.4)));
 }
 return {position,yaw,pose,handle};
}
export const CHALK_FIRE=STOP.chalk.a-.32,CHALK_HIT=STOP.chalk.b+.09,CHALK_GOAL:Vec3=[1.2,1.46,.50],TEACHER_ROOT:Vec3=[-.6,0,-2.9];
export function teacherThrow(t:number,fire=CHALK_FIRE){
 const wind=accent(t,fire-.5,fire-.23,fire-.16,fire+.05),release=smooth(phase(t,fire-.18,fire));
 let pose=planted({...neutral(),bodyPitch:-.10*wind+.14*release,bodyYaw:-.15*wind+.12*release,armR:[mix(-2.6,-1.25,release)*Math.max(wind,release),0,.18],armL:[-.35,0,-.12]},.12,-.12);
 pose=blend(pose,neutral(),smooth(phase(t,fire+.18,fire+.53)));
 return pose;
}
export function chalkState(t:number){
 const s=STOP.chalk,pt=paused(t,'chalk'),teacher=teacherThrow(pt),from=handWorld(TEACHER_ROOT,0,1,teacherThrow(CHALK_FIRE));
 const position=t<CHALK_FIRE?handWorld(TEACHER_ROOT,0,1,teacher):t<s.a?v(from,CHALK_GOAL,phase(t,CHALK_FIRE,s.a)):t<s.b?CHALK_GOAL:v(CHALK_GOAL,[1.2,1.46,.70],phase(t,s.b,CHALK_HIT));
 const pride=accent(t,s.a+.35,s.a+.72,s.b-.3,s.b),flinch=accent(t,CHALK_HIT,CHALK_HIT+.08,CHALK_HIT+.16,CHALK_HIT+.35);
 const rub=accent(t,CHALK_HIT+.20,CHALK_HIT+.42,CHALK_HIT+.75,cue('5.bonk').end);
 const pose=planted({...neutral(),bodyPitch:-.07*pride-.09*flinch,bodyRoll:-.025*pride,head:[-.07*pride-.21*flinch,.10*pride,.08*flinch],armR:[-.22-.20*pride-2.1*rub,0,.22-.60*rub],armL:[-.2-.1*pride,0,-.22]},.05,-.05);
 return {position,teacher,pose,hit:t>=CHALK_HIT};
}
