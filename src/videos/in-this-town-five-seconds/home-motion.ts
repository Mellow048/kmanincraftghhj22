import type { Pose,Vec3 } from '../../engine';
import { at,cue,STOP } from './timeline';
import { add,aimHand,handWorld,phase,smooth,mix,v,turn,route,sleevePoint,sleeveOffset,RABBIT_START } from './motion';
import { neutral,blend,planted,reach,accent,bounce,footWorld,locomotion } from './performance';

export const GLASS_ROOT:Vec3=[.7,0,.65], GLASS_YAW=-.45, GLASS_DROP=STOP.glass.a-.32;
const heldGlass=():Pose=>({...neutral(),armL:[-1.38,0,-.05],armR:[-.14,0,.12]});
export const GLASS_RELEASE=add(handWorld(GLASS_ROOT,GLASS_YAW,.95,heldGlass(),-1),[0,-.14,0]);
export const GLASS_HIT=STOP.glass.b+Math.sqrt((GLASS_RELEASE[1]-.025)/4.9)-.32;
export function glassState(t:number){
 const s=STOP.glass,up=smooth(phase(t,cue('4.first').start+.08,cue('4.first').start+.7));
 let pose=blend(neutral(),heldGlass(),up);
 if(t>=GLASS_DROP){
  const alarm={...neutral(),bodyPitch:-.09,armL:[-.8,0,-.5] as Vec3,armR:[-1.05,0,.3] as Vec3,head:[.1,0,-.1] as Vec3};
  pose=blend(heldGlass(),alarm,smooth(phase(t,GLASS_DROP,GLASS_DROP+.25)));
  if(t>=s.a+.2){
   const examine=accent(t,s.a+.2,s.a+.7,s.b-.8,s.b-.5);
   pose.bodyPitch+=.21*examine;pose.head=[.14*examine,0,.12*examine];pose.armR=[-1.05+.5*examine,0,.3];
  }
  const flinch=accent(t,GLASS_HIT-.02,GLASS_HIT+.10,GLASS_HIT+.20,GLASS_HIT+.48);
  pose.bodyPitch-=.1*flinch;pose.armR=[pose.armR[0]-.6*flinch,0,.3+.2*flinch];
 }
 pose=planted(pose,.05,-.06);
 const elapsed=t<GLASS_DROP?0:t<s.a?t-GLASS_DROP:t<s.b?.32:.32+t-s.b;
 const cup=t<GLASS_DROP?add(handWorld(GLASS_ROOT,GLASS_YAW,.95,pose,-1),[0,-.14,0]):[GLASS_RELEASE[0],Math.max(.025,GLASS_RELEASE[1]-4.9*elapsed*elapsed),GLASS_RELEASE[2]] as Vec3;
 return {pose,cup,elapsed,broken:t>=GLASS_HIT};
}

export const BOOK_TOUCH=STOP.touch.a+.55, BOOK_RELEASE=STOP.touch.a+2.7;
function bookCarry(t:number){
 const s=STOP.touch,move=smooth(phase(t,s.a+.75,s.a+2.55)),position:Vec3=[-.45+move*.38,0,.62],theta=Math.PI*move;
 const pose=planted({...neutral(),bodyPitch:.025,head:[.1,0,.04]},.07,-.07);
 pose.armR=aimHand(position,0,.95,pose,[position[0]+.320625+Math.sin(theta)*.531,1.0325,position[2]+Math.cos(theta)*.531]);
 pose.armL=[-.3,0,-.22];
 return {position,pose,book:add(handWorld(position,0,.95,pose),[0,-.055,0])};
}
export function touchState(t:number){
 const s=STOP.touch,q=bookCarry(t),initial=bookCarry(BOOK_TOUCH).book,placed=bookCarry(BOOK_RELEASE).book;
 const take=smooth(phase(t,s.a-.05,BOOK_TOUCH));
 let pose=blend({...neutral(),armR:[.2,0,.9]},q.pose,take);
 if(t>=BOOK_RELEASE)pose=blend(q.pose,{...neutral(),armR:[-.1,0,.55],armL:[-.1,0,-.2],head:[.13,0,-.08]},smooth(phase(t,BOOK_RELEASE,BOOK_RELEASE+.33)));
 const drop=t>=s.b?Math.min(placed[1]-.853,4.9*(t-s.b)**2):0;
 const book=t<BOOK_TOUCH?initial:t<BOOK_RELEASE?q.book:add(placed,[0,-drop,0]);
 return {...q,pose,book,angle:t>=s.b?-.05*Math.sin(phase(t,s.b,s.b+.3)*Math.PI):0};
}

export const FEED_ROOT:Vec3=[1.1,0,.78],CARROT_SET=at('3.rabbit','rabbit')+.07,CARROT_GROUND:Vec3=[1.48,.10,1.39];
export function feeding(t:number){
 const target=add(CARROT_GROUND,[0,.13,0]),down=reach(FEED_ROOT,0,.95,{...neutral(),bodyPitch:.94,armL:[-.5,0,-.2]},target);
 const lower=smooth(phase(t,at('3.rabbit','fed')-.25,CARROT_SET-.04));
 let pose=blend({...neutral(),armR:[-1.03,0,.08]},down,lower);
 if(t>=CARROT_SET)pose=blend(down,{...neutral(),armR:[-.4,0,.2],armL:[-.3,0,-.15]},smooth(phase(t,CARROT_SET+.08,CARROT_SET+.6)));
 const bite=accent(t,at('3.ear','bit')-.35,at('3.ear','bit'),at('3.ear','shoelaces')+.03,cue('3.ear').end-.05);
 if(bite>0){pose.legR=[-.9*bite,0,.04];pose.kneeR=[1.2*bite,0,0];pose.bodyRoll=-.04*bite;pose.armR[0]-=.35*bite;pose.head=[.13+.12*bite,0,-.1*bite];}
 const carrot=t<CARROT_SET?add(handWorld(FEED_ROOT,0,.95,pose),[0,-.13,0]):CARROT_GROUND;
 const nibbleFoot=footWorld(FEED_ROOT,0,.95,{...neutral(),legR:[-.9,0,.04],kneeR:[1.2,0,0]},1,.08);
 const approach=smooth(phase(t,CARROT_SET+.05,at('3.ear','bit')-.1));
 const rabbit=v(RABBIT_START,[nibbleFoot[0],0,nibbleFoot[2]+.29],approach);
 const hop=Math.sin(phase(t,CARROT_SET+.05,at('3.ear','bit')-.1)*Math.PI*2)**2*.10*(1-approach);
 const foot=footWorld(FEED_ROOT,0,.95,pose,1,.08);
 return {pose,carrot,rabbit,hop,bite,foot};
}

export const SASH_DOWN=at('12.window','shut'),SASH_CLOSED=at('12.window','window')+.18;
export function windowState(t:number){
 const amount=smooth(phase(t,SASH_DOWN,SASH_CLOSED));
 return {open:1-amount,handle:[-3.5,1.125+.36*(1-amount),-2.125] as Vec3};
}
export function motherCheck(t:number){
 const leave=cue('12.lie').start+.47,arrival=cue('12.window').start+.03;
 const routeQ=route(t,[[cue('12.mother').start,[-5.25,0,-3.0]],[leave,[-5.25,0,-3.0]],[leave+.40,[-4.9,0,-2.55]],[arrival,[-3.5,0,-2.49]],[cue('12.window').end,[-3.5,0,-2.49]]],true);
 const checking=accent(t,cue('12.mother').start,cue('12.mother').start+.25,cue('12.lie').start,leave-.1);
 const hero={...neutral(),armL:[-.35,0,-1.03*checking] as Vec3,armR:[-.1,0,.12] as Vec3,head:[.05,-.5*(1-checking),.03] as Vec3};
 const windowReach=accent(t,arrival-.12,SASH_DOWN,SASH_CLOSED+.08,cue('12.window').end-.04);
 const close=smooth(phase(t,SASH_DOWN,SASH_CLOSED));
 const walkYaw=turn(2.7,1.50,smooth(phase(t,leave-.1,leave+.35)));
 const yaw=turn(walkYaw,0,smooth(phase(t,arrival-.3,arrival+.08))),lean=.15*checking+mix(.02,-.035,close)*windowReach;
 const arm:Vec3=[mix(-.75-.25*checking,mix(-2.08,-.86,close),windowReach),0,0];let offset:Vec3=[0,0,0];
 const checkTarget=add(handWorld([-4.55,0,-3.35],0,.95,hero,-1),[.22,.05,-.02]);
 if(t<leave)offset=v([0,0,0],sleeveOffset(routeQ.position,yaw,.96,arm,checkTarget,lean,0,[.2,-.225,.13]),checking);
 const cuff:Vec3=[0,-.225,.13],hold=accent(t,arrival-.12,SASH_DOWN,SASH_CLOSED+.08,cue('12.window').end-.04);
 if(t>=leave)offset=v([0,0,0],sleeveOffset(routeQ.position,yaw,.96,arm,windowState(t).handle,lean,0,cuff),hold);
 const step=t>leave&&t<arrival?Math.sin(phase(t,leave,arrival)*Math.PI)**.4:0;
 return {...routeQ,yaw,lean,arm,offset,step,checking,hero};
}
