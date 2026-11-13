import { Euler, Vector3 } from 'three';
import type { Pose, Vec3 } from '../../engine';
import { at, cue, STOP, worldTime } from './timeline';
import { add, aimHand, distance, handWorld, mix, phase, smooth, turn, v, route, manMotion, counterHero, MAN_START, RABBIT_START, RUN_START, HERO_RUN, MAN_FREEZE, HERO_FREEZE, HERO_SIDE, ROCK_START, ROCK_END, HIT, LAND, SPIN_START, SPIN_END, FALL_START, FIRST_FIRE, FIRST_WALL, FIRST_IMPACT, SECOND_FIRE, THIRD_FIRE, SECOND_HOLD, THIRD_HOLD } from './motion';
import { neutral, full, blend, accent, bounce, planted, locomotion, reach, palmMid, stepLegs, footReach, footWorld } from './performance';

export const RABBIT_SCALE=.82;
export const LIFT_START=at('13.dinner','picked')+.02;
export const LIFT_END=at('13.dinner','up')+.45;
export const RECOVER=at('17.rabbit','lifted');
export const TAKE_RABBIT=RECOVER+.12;
export const PICK_ROCK=at('16.stop','grabbed');
export const PLACE_ROCK=at('16.throw','path')+.04;
export const SIDE_END=at('16.side','aside')+.42;
const FRONT:Vec3=[MAN_FREEZE[0]+.95,0,.52];
const RABBIT_SUPPORT:Vec3=[0,.18,0];
const CARRY_ARM:Vec3=[-.86,0,.2];
const standingCarry=()=>({...neutral(),armL:CARRY_ARM});
const fallen=():Pose=>({...neutral(),bodyY:-.43,bodyPitch:-Math.PI/2,armL:CARRY_ARM,armR:[-.1,0,.35],legR:[.08,0,.13],legL:[.1,0,-.13],kneeR:[.12,0,0],kneeL:[.18,0,0],head:[-.06,0,0]});

function rigPoint(root:Vec3,yaw:number,pose:Pose,point:Vec3):Vec3{
 const q=new Vector3(...point).applyEuler(new Euler(pose.bodyPitch,pose.bodyYaw,pose.bodyRoll));q.y+=.675+pose.bodyY;q.applyEuler(new Euler(0,yaw,0)).add(new Vector3(...root));return q.toArray() as Vec3;
}
function kneeling():Pose{
 const p=planted({...neutral(),bodyY:-.31,bodyPitch:.06,armR:[-.5,0,.12],armL:[-.38,0,-.1],head:[-.04,0,0]},.32,-.32);
 p.legL=[-.06,0,-.025];p.kneeL=[Math.PI/2,0,0];return p;
}
/** Only the untouched man's performance clock is held. Released projectiles use the same stop below. */
export function strangerPose(t:number):Pose{
 const s=STOP.counter;if(t>=s.a&&t<s.b)return strangerPose(s.a-1e-7);
 const q=manMotion(t);
 let p=standingCarry();
 if(t<RUN_START){
  const down=smooth(phase(t,at('13.kneel','knelt')-.20,at('13.kneel','rabbit')+.05));
  const castTarget:Vec3=[q.position[0]+.30,.15,1.67];
  const crouched=reach(q.position,0,1,{...neutral(),bodyPitch:.82,armL:[-.55,0,-.14]},castTarget,1);
  p=blend({...neutral(),armL:[-.2,0,-.1]},crouched,down);
  const leftReach=smooth(phase(t,at('13.frost','legs')-.4,LIFT_START));
  const scoop=reach(q.position,0,1,{...crouched,bodyPitch:.75},add(RABBIT_START,RABBIT_SUPPORT),-1);
  scoop.armR=aimHand(q.position,0,1,scoop,castTarget,1);
  p=blend(p,scoop,leftReach);
  if(t>=LIFT_START)p=blend(scoop,standingCarry(),smooth(phase(t,LIFT_START,LIFT_END)));
  p.head=[t<LIFT_END?.18*(1-smooth(phase(t,LIFT_START,LIFT_END))):.03,0,0];
  // A look toward the shout, then the first planted running step, not a pose-name switch.
  const heard=accent(t,at('14.saw','looked')-.12,at('14.saw','looked')+.12,RUN_START-.22,RUN_START+.1);
  p.head=[p.head[0],-.85*heard,.07*heard];p.bodyYaw=-.10*heard;
 }
 if(t>=RUN_START&&t<s.b){
  p=blend(standingCarry(),{...locomotion(q.travel,'run',1),armL:CARRY_ARM},smooth(phase(t,RUN_START,RUN_START+.3)));
  const jab=(start:number,fire:number)=>{
   const wind=accent(t,start-.25,start-.06,start+.02,start+.22);
   const extend=smooth(phase(t,start-.02,start+.22))*(1-smooth(phase(t,fire+.16,fire+.52)));
   return {wind,extend};
  };
  const first=jab(at('15.hand','threw'),FIRST_FIRE),last=jab(cue('15.close').start+.12,THIRD_FIRE);
  const k=Math.max(first.extend,last.extend),wind=Math.max(first.wind,last.wind);
  p.bodyYaw=-.16*k+.08*wind;p.torso=[.02,-.15*k,0];
  p.armR=v(p.armR,[1.50-.20*bounce(t,FIRST_FIRE,1,.20),-.10,.24],k);
  p.armR[0]-=.55*wind;
  p.head=[-.08,-.7*k,.05*Math.sin(q.travel*3)];
  p.armL=[-.86-.035*Math.sin(q.travel*4),0,.2];
 }
 if(t>=s.b){
  const braking=smooth(phase(t,s.b,s.b+.3));
  p=blend(strangerPose(s.a-1e-7),planted({...standingCarry(),bodyY:-.10,bodyPitch:-.18,armR:[-.75,0,.35]},.22,-.18),braking);
  const glance=accent(t,s.b+.25,s.b+.48,HIT-.45,HIT-.13);
  p.head=[.03,-1.05*glance,.13*glance];
  p.bodyPitch+=.06*Math.sin(phase(t,s.b+.3,HIT-.42)*Math.PI);
  const step=smooth(phase(t,HIT-.42,HIT-.12));
  if(step>0){
   const walk={...standingCarry(),legR:[-.7*step,0,.12] as Vec3,kneeR:[.7*step,0,0] as Vec3,legL:[0,0,-.07] as Vec3};
   p=blend(p,walk,step);
  }
  if(t>=HIT-.12){
   const catchPose=planted({...standingCarry(),bodyY:-.12,bodyPitch:.12,head:[-.1,0,0],armR:[-.8,0,.35]},.30,-.22);
   p=blend(p,catchPose,smooth(phase(t,HIT-.12,HIT-.03)));
   if(t<=HIT+.18){
    const topple=smooth(phase(t,HIT-.03,HIT+.18));p.bodyPitch+=.36*topple;p.bodyY-=.06*topple;p.armR=[-1.2*topple-.8,0,.45];
    p=footReach(q.position,q.yaw,1,p,add(ROCK_END,[0,.07,0]));
   }else{
    // Weight keeps travelling east. Each recovery foot lands and pushes again, instead of an upright pirouette.
    const stride=stepLegs({...standingCarry(),bodyY:-.17,bodyPitch:.44,bodyRoll:.12*Math.sin((t-HIT)*9),armR:[-1.6+.65*Math.sin((t-HIT)*10),0,.65],head:[-.18,-.15,0]},q.travel,'run',1);
    p=blend(footReach(manMotion(HIT+.18).position,Math.PI/2,1,{...catchPose,bodyPitch:.48,bodyY:-.18,armR:[-2,0,.45]},add(ROCK_END,[0,.07,0])),stride,smooth(phase(t,HIT+.18,HIT+.30)));
   }
   if(t>=SPIN_START){
    const spin=phase(t,SPIN_START,SPIN_END),twist=planted({...standingCarry(),bodyY:-.18,bodyPitch:.30*(1-spin),bodyRoll:.16*(1-spin),armR:[-.9,0,1.0],armL:[-1.03,0,.13],head:[-.1,-.25,0]},.24,-.23);
    p=blend(p,twist,smooth(phase(t,SPIN_START,SPIN_START+.14)));
   }
   if(t>=FALL_START){
    const falling={...fallen(),legR:[-.28,0,.12] as Vec3,legL:[-.18,0,-.15] as Vec3,kneeR:[.7,0,0] as Vec3,kneeL:[.5,0,0] as Vec3,armR:[-.25,0,.70] as Vec3,head:[.10,0,0] as Vec3};
    p=blend(p,falling,q.fall);
   }
   if(t>=LAND){
    const settle=smooth(phase(t,LAND,LAND+.24));p=blend({...fallen(),legR:[-.28,0,.12],legL:[-.18,0,-.15],kneeR:[.7,0,0],kneeL:[.5,0,0],armR:[-.25,0,.70],head:[.10,0,0]},fallen(),settle);
    p.bodyY+=bounce(t,LAND,.035,.18);
   }
  }
  if(t>=cue('18.look').start){
   const then=at('18.look','then'),end=cue('18.look').end-.18;
   const rub=accent(t,cue('18.look').start,cue('18.look').start+.16,then-.12,then+.12);
   const touch=rigPoint(q.position,q.yaw,p,[-.18,.95,.23]);
   p.armR=v(p.armR,aimHand(q.position,q.yaw,1,p,touch),rub);
   const roll=planted({...neutral(),bodyY:-.34,bodyPitch:-.72,bodyRoll:.38,armR:[-1.05,0,.35],armL:[-.45,0,-.25]},.2,-.24);
   const sit=smooth(phase(t,then-.03,then+.38));p=blend(p,roll,sit);
   p=blend(p,kneeling(),smooth(phase(t,then+.32,end)));
   if(t>=end){
    p=kneeling();const recognition=accent(t,at('18.power','ability')-.2,at('18.power','ability')+.1,cue('18.found').start,cue('18.found').start+.25);
    const found=accent(t,at('18.found','found')-.1,at('18.found','found')+.12,cue('18.prince').start,cue('18.prince').start+.2);
    p.bodyPitch+=.10*recognition+.07*found;p.head=[-.06+.08*found,0,-.06*recognition];p.armR=[-.5-.20*found,0,.12];
   }
  }
 }
 // Angle blending is not ground contact: re-solve a shoe if its toe OR heel crosses the path.
 if(t>=HIT-.12&&t<cue('18.look').start){
  for(let pass=0;pass<3;pass++)for(const side of [1,-1] as const){
   const toe=footWorld(q.position,q.yaw,1,p,side),heel=footWorld(q.position,q.yaw,1,p,side,-.065),low=Math.min(toe[1],heel[1]);
   if(low<.025)p=footReach(q.position,q.yaw,1,p,[toe[0],toe[1]+.025-low,toe[2]],side);
  }
 }
 return p;
}
export function carriedRabbit(t:number):Vec3{
 const q=manMotion(t);return add(handWorld(q.position,q.yaw,1,strangerPose(t),-1),[0,-.18,0]);
}
export function homeHero(t:number){
 const a=cue('13.sound').start,stand=a+.66;
 const h=route(t,[[a,[-5.5,.10,-4.45]],[a+.36,[-5.5,.10,-4.45]],[stand,[-4.6,0,-4.45]],[cue('13.white').start,[-3.85,0,-2.55]],[cue('14.out').start,[-3.85,0,-2.55]],[cue('14.out').start+.35,[-5,0,-2.55]],[cue('14.out').start+.85,[-5,0,-1.35]],[cue('14.out').end,[-3.75,0,-.15]],[HERO_RUN,[-3.75,0,-.15]]]);
 let pose=neutral(),yaw=.5;
 if(t<stand){
  const sit={...neutral(),bodyY:-.125,legR:[-Math.PI/2,0,.05] as Vec3,legL:[-Math.PI/2,0,-.05] as Vec3,kneeR:[Math.PI/2,0,0] as Vec3,kneeL:[Math.PI/2,0,0] as Vec3,armR:[-.6,0,.2] as Vec3,armL:[-.6,0,-.2] as Vec3};
  pose=blend({...fallen(),bodyY:-.125,armL:[-.1,0,-.1],armR:[-.1,0,.1]},sit,smooth(phase(t,a+.08,a+.34)));
  pose=blend(pose,neutral(),smooth(phase(t,a+.35,stand)));yaw=turn(0,Math.PI/2,smooth(phase(t,a+.3,stand)));
 }else if(t<cue('13.white').start){pose=blend(neutral(),locomotion(h.distance,'walk'),smooth(phase(t,stand,stand+.16)));yaw=turn(Math.PI/2,h.yaw,smooth(phase(t,stand,stand+.22)));}
 else if(t<cue('14.out').start){pose={...neutral(),bodyPitch:.08,armR:[-.88,0,.15],armL:[-.55,0,-.12],head:[.0,0,.04]};yaw=.92;}
 else{pose=locomotion(h.distance,'run');yaw=h.yaw;const shout=accent(t,at('14.out',"That's")-.12,at('14.out',"That's")+.12,cue('14.saw').start,cue('14.saw').start+.2);pose.armR=v(pose.armR,[-1.5,0,.12],shout);}
 return {...h,yaw,pose};
}
export function heroState(t:number){
 const s=STOP.counter,h=counterHero(t);let yaw=h.yaw,p=locomotion(h.distance,'run');
 if(t>=s.a){
  const stopPose=planted({...neutral(),bodyY:-.06,bodyPitch:.08,armR:[-.35,0,.25],armL:[-.45,0,-.25]},.13,-.13);
  p=blend(locomotion(counterHero(s.a).distance,'run'),stopPose,smooth(phase(t,s.a,s.a+.2)));
  yaw=turn(Math.PI/2,Math.PI,smooth(phase(t,s.a+.15,PICK_ROCK-.35)));
  const grab=reach(HERO_FREEZE,Math.PI,.95,{...neutral(),bodyPitch:.80,armL:[-.65,0,-.2]},add(ROCK_START,[0,.29,0]));
  const down=smooth(phase(t,PICK_ROCK-.55,PICK_ROCK-.06));p=blend(p,grab,down);
  const carry={...neutral(),armR:[-.95,0,.10] as Vec3,armL:[-.25,0,-.12] as Vec3,head:[-.03,0,0] as Vec3};
  if(t>=PICK_ROCK+.06){
   const rise=smooth(phase(t,PICK_ROCK+.06,PICK_ROCK+.40));p=blend(grab,carry,rise);
   yaw=turn(Math.PI,Math.PI/2,smooth(phase(t,PICK_ROCK+.15,cue('16.front').start+.22)));
   p=blend(p,{...locomotion(h.distance,'run'),armR:carry.armR},smooth(phase(t,PICK_ROCK+.30,PICK_ROCK+.62)));
  }
  const plant=at('16.throw','Set')-.20;
  if(t>=plant){
   const set=reach(FRONT,.70,.95,{...neutral(),bodyPitch:.84,armL:[-.55,0,-.3]},add(ROCK_END,[0,.29,0]));
   const lowering=smooth(phase(t,plant,PLACE_ROCK-.08));p=blend(p,set,lowering);yaw=turn(Math.PI/2,.70,lowering);
   if(t>=PLACE_ROCK){
    const up=smooth(phase(t,PLACE_ROCK+.05,PLACE_ROCK+.30));p=blend(set,stopPose,up);
    if(t>=PLACE_ROCK+.25&&t<SIDE_END){
     const k=smooth(phase(t,PLACE_ROCK+.25,PLACE_ROCK+.45))*(1-smooth(phase(t,SIDE_END-.18,SIDE_END)));
     const side={...locomotion(h.distance,'walk'),armR:[-.5,0,.45] as Vec3,armL:[-.65,0,-.4] as Vec3};p=blend(stopPose,side,k);
     yaw=turn(.70,h.yaw,smooth(phase(t,PLACE_ROCK+.25,PLACE_ROCK+.43)));
    }
    yaw=turn(yaw,-Math.PI/2,smooth(phase(t,SIDE_END-.18,SIDE_END+.08)));
   }
  }
  if(t>=SIDE_END){
   p=planted({...neutral(),bodyY:-.025,bodyPitch:-.035,armR:[-.45,0,.24],armL:[-.38,0,-.18]},.12,-.12);yaw=-Math.PI/2;
   const startle=accent(t,HIT-.05,HIT+.2,LAND-.2,LAND+.1);
   p.armR=[-.45-.35*startle,0,.24];p.armL=[-.38-.30*startle,0,-.18];p.head=[-.06*startle,.22*startle,-.10*startle];
   if(t>=HIT+.15&&t<RECOVER-.30){p=blend(p,{...locomotion(h.distance,'walk'),armR:p.armR,armL:p.armL,head:[.08,-.3,0]},accent(t,HIT+.15,HIT+.29,RECOVER-.48,RECOVER-.30));yaw=h.yaw;}
  }
  if(t>=RECOVER-.5){
   const rabbit=carriedRabbit(TAKE_RABBIT),face=Math.atan2(rabbit[0]-h.position[0],rabbit[2]-h.position[2]);
   yaw=turn(-Math.PI/2,face,smooth(phase(t,RECOVER-.5,RECOVER-.05)));
   const targetR=add(rabbit,[Math.cos(face)*.14,.18,-Math.sin(face)*.14]);
   const targetL=add(rabbit,[-Math.cos(face)*.14,.18,Math.sin(face)*.14]);
   const scoop=reach(h.position,face,.95,{...neutral(),bodyPitch:.55},targetR);
   scoop.armL=aimHand(h.position,face,.95,scoop,targetL,-1);
   p=blend(p,scoop,smooth(phase(t,RECOVER-.35,TAKE_RABBIT)));
   if(t>=TAKE_RABBIT){
    const held={...neutral(),bodyPitch:.02,armR:[-.95,0,-.34] as Vec3,armL:[-.95,0,.34] as Vec3,head:[.14,0,0] as Vec3};
    p=blend(scoop,held,smooth(phase(t,TAKE_RABBIT,RECOVER+1.08)));yaw=face;
    if(t>=RECOVER+1.10&&t<RECOVER+1.90){const step=accent(t,RECOVER+1.10,RECOVER+1.25,RECOVER+1.70,RECOVER+1.90);p.bodyY-=.055*step;p=blend(p,stepLegs(p,h.distance,'walk',.95,-1),step);}
    if(t>=cue('18.look').start){
     const prince=smooth(phase(t,at('18.prince','prince')-.08,at('18.prince','prince')+.24));
     p.bodyPitch=mix(.02,-.055,prince);p.head=[mix(.05,-.08,prince),0,.055*prince];
     p.armR=[mix(-.95,-1.03,prince),0,-.34];p.armL=[mix(-.95,-1.03,prince),0,.34];
    }
   }
  }
 }
 return {...h,yaw,pose:p};
}
export function rockAt(t:number):Vec3{
 if(t<PICK_ROCK)return ROCK_START;if(t>=PLACE_ROCK)return ROCK_END;
 const h=heroState(t);return add(handWorld(h.position,h.yaw,.95,h.pose),[0,-.29,0]);
}
export function rescuedRabbit(t:number):Vec3{const h=heroState(t);return add(palmMid(h.position,h.yaw,.95,h.pose),[0,-.18,0]);}
export function rabbitAt(t:number):Vec3{return t<LIFT_START?RABBIT_START:t<TAKE_RABBIT?carriedRabbit(t):rescuedRabbit(t);}
export function iceAt(t:number,index:0|1|2):Vec3{
 const fire=[FIRST_FIRE,SECOND_FIRE,THIRD_FIRE][index],q=manMotion(fire),from=handWorld(q.position,q.yaw,1,strangerPose(fire));
 if(index===0)return v(from,FIRST_WALL,phase(t,FIRST_FIRE,FIRST_IMPACT));
 const s=STOP.counter,hold=index===1?SECOND_HOLD:THIRD_HOLD;
 if(t<s.a)return v(from,hold,phase(t,fire,s.a));if(t<s.b)return hold;
 return v(hold,[HERO_FREEZE[0]-.55+(index-1)*.2,.13,1.2],phase(t,s.b,s.b+.23+(index-1)*.09));
}

/** A frozen witness cannot track the moving hero with a live lookAt prop. */
export function motherGazeTarget(t:number):Vec3{
 const s=STOP.counter,held=t>=s.a&&t<s.b?s.a:t;
 return add(counterHero(held).position,[0,1.4,0]);
}
