import type React from "react";
import { Block, getPose, gaitPose } from "../../engine";
import type { Pose, Vec3 } from "../../engine";
import { Hero, Stranger, Mother, WorldClock, StopHalo, Rabbit, IceCube, Rock, TEEN, STOP, at, cue, worldTime, paused, phase, smooth, mix, turn, v, add, ahead, beside, distance, route, aimHand, handWorld, stoop, kneel, poseMix, HOME, HOME_WINDOW, HOME_BED, MAN_START, RABBIT_START, RUN_START, HERO_RUN, MAN_FREEZE, HERO_FREEZE, HERO_SIDE, ROCK_START, ROCK_END, HIT, LAND, counterHero, manMotion, FIRST_FIRE, FIRST_FROM, FIRST_WALL, FIRST_IMPACT, SECOND_FIRE, THIRD_FIRE, SECOND_HOLD, THIRD_HOLD } from "./kit";

const LIFT_START=at('13.dinner','picked')-.12;
const LIFT_END=at('13.dinner','up')+.45;
const RECOVER=at('17.rabbit','lifted');
export function strangerPose(t:number):Partial<Pose>{
 const q=manMotion(t),wt=worldTime(t),s=STOP.counter;
 let p:Partial<Pose>={...getPose('idle',wt),bodyYaw:0,bodyRoll:0};
 const crouch=smooth(phase(t,at('13.kneel','knelt')-.25,at('13.kneel','rabbit')))*(1-smooth(phase(t,LIFT_START,LIFT_END)));
 p={...p,...kneel(crouch),bodyPitch:.75*crouch,armR:[mix(-.1,-1.0,crouch),0,.12],armL:[-.86,0,.2]};
 if(crouch>0){
   p.armR=aimHand(q.position,q.yaw,1,p,add(RABBIT_START,[.2,.22,.04]));
   const contact=aimHand(q.position,q.yaw,1,p,add(RABBIT_START,[0,.12,0]),-1);
   p.armL=v([-.86,0,.2],contact,crouch);
 }
 if(t>=RUN_START){p={...gaitPose('run',q.travel),armL:[-.86,0,.2]};}
 // A clearly visible backward wind-up; the supporting arm never abandons the rabbit.
 const cast=(a:number,b:number,c:number)=>smooth(phase(t,a,b))*(1-smooth(phase(t,b,c)));
 const throwPose=cast(at('15.hand','threw')-.3,FIRST_FIRE-.08,FIRST_FIRE+.3)+cast(s.a-1.8,s.a-.13,s.b+.1);
 if(throwPose>0)p.armR=[mix(-.2,1.6,Math.min(1,throwPose)),0,.4];
 if(t>=s.a&&t<s.b){const frozen=strangerPose(s.a-1/10000);return frozen;}
 if(t>=s.b){
   p={...getPose('idle',wt),bodyY:0,bodyPitch:0,bodyRoll:0,bodyYaw:0,armL:[-.86,0,.2]};
   const brake=smooth(phase(t,s.b,s.b+.25));
   p.legR=[-.5*(1-brake),0,.07];p.legL=[.45*(1-brake),0,-.07];
   p.armR=[-.4,0,.2];
   const step=smooth(phase(t,HIT-.42,HIT-.12));
   if(step>0){p.legR=[-.7*step,0,.12];p.kneeR=[.7*step,0,0];}
   if(t>=HIT-.12){
     p.bodyPitch=.33*Math.sin(q.trip*Math.PI)*(1-q.fall)-Math.PI/2*q.fall;
     p.bodyRoll=.2*Math.sin(q.trip*Math.PI)*(1-q.fall);
     p.bodyY=-.52*q.fall;
     p.legR=[mix(-.7,.05,q.fall),0,.12];p.legL=[mix(.4,.05,q.fall),0,-.12];
     p.kneeR=[.7*(1-q.fall),0,0];p.kneeL=[.25*(1-q.fall),0,0];
     p.armR=[mix(-1.4,.0,q.fall),0,.35];
   }
   if(t>=cue('18.look').start){
     const up=smooth(phase(t,at('18.look','then'),cue('18.look').end-.12));
     p=poseMix(p,{...kneel(1),armL:[-.2,0,-.1],armR:[-.4,0,.1],bodyRoll:0,bodyYaw:0},up);
     const rub=Math.sin(phase(t,cue('18.look').start,at('18.look','then'))*Math.PI);
     if(rub>0)p.armR=[-2.7*rub,0,.16];
   }
 }
 return p;
}
export function carriedRabbit(t:number):Vec3{
 const q=manMotion(t),p=strangerPose(t);
 return add(handWorld(q.position,q.yaw,1,p,-1),[0,-.055,0]);
}
export function heroState(t:number){
 const s=STOP.counter, h=counterHero(t);
 let yaw=h.yaw,p:Partial<Pose>={...gaitPose('run',h.distance)};
 if(t>=s.a){
   p={bodyY:0,bodyPitch:0,bodyYaw:0,bodyRoll:0,armR:[-.25,0,.1],armL:[-.1,0,-.1],legR:[0,0,.04],legL:[0,0,-.04],kneeR:[0,0,0],kneeL:[0,0,0]};
   const pick=smooth(phase(t,s.a+.32,s.a+.76))*(1-smooth(phase(t,s.a+1.03,s.a+1.32)));
   const set=smooth(phase(t,s.a+2.7,s.a+3.1))*(1-smooth(phase(t,s.a+3.56,s.a+3.9)));
   yaw=turn(Math.PI/2,Math.PI,smooth(phase(t,s.a+.02,s.a+.45)));
   if(t>s.a+1.03)yaw=turn(Math.PI,Math.PI/2,smooth(phase(t,s.a+1.03,s.a+1.35)));
   if(pick>0){p={...p,...stoop(pick)};p.armR=aimHand(h.position,yaw,TEEN,p,add(ROCK_START,[0,.13,0]));}
   if(t>=s.a+1.25&&t<s.a+2.85){p={...gaitPose('run',h.distance),armR:[-.9,0,.1]};yaw=turn(Math.PI,Math.PI/2,smooth(phase(t,s.a+1.03,s.a+1.35)));}
   if(set>0){p={...p,...stoop(set)};yaw=turn(Math.PI/2,.7,smooth(phase(t,s.a+2.65,s.a+3.05)));p.armR=aimHand(h.position,yaw,TEEN,p,add(ROCK_END,[0,.13,0]));}
   if(t>=s.a+3.85&&t<s.a+4.65){p={...gaitPose('walk',h.distance),armR:[-.2,0,.12]};yaw=h.yaw;}
   if(t>=s.a+4.4){yaw=turn(Math.atan2(HERO_SIDE[0]-(MAN_FREEZE[0]+.4),HERO_SIDE[2]-.52),-Math.PI/2,smooth(phase(t,s.a+4.4,s.a+4.85)));}
   if(t>=s.a+4.65){p={...p,head:[.14,0,0]};}
   if(t>=RECOVER-.5){
      const down=smooth(phase(t,RECOVER-.5,RECOVER+.05))*(1-smooth(phase(t,RECOVER+.4,RECOVER+1.15)));
      p={...p,...stoop(down)};yaw=turn(-Math.PI/2,Math.atan2(manMotion(t).position[0]-h.position[0],manMotion(t).position[2]-h.position[2]),smooth(phase(t,RECOVER-.5,RECOVER+.05))); 
      const goal=t<RECOVER+.55?carriedRabbit(Math.min(t,RECOVER+.1)):ahead(h.position,yaw,.32,.69);
      p.armR=aimHand(h.position,yaw,TEEN,p,beside(goal,yaw,.12,0,0),1);p.armL=aimHand(h.position,yaw,TEEN,p,beside(goal,yaw,-.12,0,0),-1);
   }
 }
 return {...h,yaw,pose:p};
}
/** Exact prop trajectory during touch, flight, release and pickup. Camera changes never reset these positions. */
export function rockAt(t:number):Vec3{
 const s=STOP.counter.a,h=heroState(t),hand=add(handWorld(h.position,h.yaw,TEEN,h.pose),[0,-.1,0]);
 if(t<s+.78)return ROCK_START;
 if(t<s+1.12)return v(ROCK_START,hand,smooth(phase(t,s+.78,s+1.12)));
 if(t<s+3.18)return hand;
 if(t<s+3.56)return v(hand,ROCK_END,smooth(phase(t,s+3.18,s+3.56)));
 return ROCK_END;
}
const IceDebris:React.FC<{at:Vec3;elapsed:number;stone?:boolean}>=({at:p,elapsed:e,stone=false})=>e<0||e>2?null:<>
 {Array.from({length:11},(_,i)=>{const a=i*2.4,q=Math.min(e,1.2);return <Block key={i} position={[p[0]+Math.cos(a)*q*(.6+i%3*.25),Math.max(.045,p[1]+q*(.6+i%2*.2)-3.7*q*q),p[2]+Math.sin(a)*q*1.1]} rotation={[q*3,i,q*2]} size={[.07+i%3*.04,.08,.09]} color={stone&&i%2?'#838e96':'#b6e7f1'}/>;})}
</>;
export const ChaseAction:React.FC<{t:number;id:string}>=({t,id})=>{
 const q=manMotion(t),pose=strangerPose(t),s=STOP.counter,h=heroState(t);
 const frost=smooth(phase(t,at('13.frost','Ice'),at('13.frost','legs')));
 const lift=smooth(phase(t,LIFT_START,LIFT_END));
 let rabbit=v(RABBIT_START,carriedRabbit(t),lift);
 const transfer=smooth(phase(t,RECOVER+.12,RECOVER+1.05));
 if(t>=RECOVER+.12)rabbit=v(carriedRabbit(Math.min(t,RECOVER+.12)),ahead(h.position,h.yaw,.32,.55),transfer);
 const heroFromBed=route(t,[[cue('13.sound').start,[-5.5,0,-4.45]],[cue('13.white').start,[-4.2,0,-2.8]],[cue('14.out').start,[-4.2,0,-2.8]],[cue('14.out').start+.35,[-5,0,-2.55]],[cue('14.out').start+.85,[-5,0,-1.35]],[cue('14.out').end,[-3.75,0,-.15]],[HERO_RUN,[-3.75,0,-.15]]]);
 const activeHero=t<HERO_RUN?heroFromBed:h;
 const face=t>=cue('18.found').start?'wow':t>=RECOVER?'calm':t<cue('14.out').start?'uneasy':t<s.a?'brave':'brave';
 const startPose=t<cue('13.white').start?poseMix({bodyPitch:-Math.PI/2,bodyY:-.125},{bodyPitch:0,bodyY:0},smooth(phase(t,cue('13.sound').start,cue('13.sound').end))):undefined;
 const looking=t<cue('14.out').start?q.position:t<s.a?add(q.position,[0,1.4,0]):undefined;
 const firstP=v(FIRST_FROM,FIRST_WALL,phase(t,FIRST_FIRE,FIRST_IMPACT));
 const iceFlight=(fire:number,hold:Vec3,side:number):Vec3=>{
    const from:Vec3=[manMotion(fire).position[0]-.45,1.27,1.2];
    if(t<s.a)return v(from,hold,phase(t,fire,s.a));
    if(t<s.b)return hold;
    return v(hold,[HERO_FREEZE[0]-.55+side*.2,.13,1.2],phase(t,s.b,s.b+.23+side*.09));
 };
 return <>
  <WorldClock t={t}>
    <Stranger position={q.position} rotationY={q.yaw} time={worldTime(t)} poseOverride={pose} breath={0} weightShift={0} headYaw={t>=s.b&&t<HIT?-1.1:0} lookAt={t>=cue('18.power').start?add(h.position,[0,1.4,0]):undefined}/>
    {t<RECOVER+.12?<Rabbit position={rabbit} rotationY={q.yaw} scale={mix(1,.74,lift)} frost={frost*(1-transfer)}/>:null}
    {t>=cue('18.home').start?<Mother position={[-5,0,-1.82]} rotationY={1.15} nod={-.08} lookAt={add(h.position,[0,1.4,0])}/>:null}
  </WorldClock>
  {t>=RECOVER+.12?<Rabbit position={rabbit} rotationY={mix(q.yaw,Math.PI/2,transfer)} scale={.74} frost={.6*(1-transfer)}/>:null}
  <Hero position={activeHero.position} rotationY={t<HERO_RUN?(t<cue('14.out').start?.5:heroFromBed.yaw):h.yaw} time={t} animation={t<HERO_RUN?(t>=cue('14.out').start?'run':'idle'):'run'} animDistance={activeHero.distance} poseOverride={t<HERO_RUN?startPose:h.pose} breath={0} weightShift={0} face={face} lookAt={looking}/>
  <Rock position={rockAt(t)} scale={.9}/>
  {t>=FIRST_FIRE&&t<FIRST_IMPACT?<IceCube position={firstP} rotationY={t*5} size={.42}/>:null}
  {t>=SECOND_FIRE&&t<s.b+.23?<IceCube position={iceFlight(SECOND_FIRE,SECOND_HOLD,0)} rotationY={t<s.a?t*4:s.a*4} size={.34}/>:null}
  {t>=THIRD_FIRE&&t<s.b+.32?<IceCube position={iceFlight(THIRD_FIRE,THIRD_HOLD,1)} rotationY={.7} size={.28}/>:null}
  {t>=cue('15.hand').start&&t<FIRST_FIRE?<IceCube position={handWorld(q.position,q.yaw,1,pose)} scale={smooth(phase(t,cue('15.hand').start,FIRST_FIRE))} size={.4}/>:null}
  {t>=cue('15.close').start&&t<SECOND_FIRE?<IceCube position={handWorld(q.position,q.yaw,1,pose)} scale={smooth(phase(t,cue('15.close').start,SECOND_FIRE))} size={.34}/>:null}
  <IceDebris at={FIRST_WALL} elapsed={paused(t,'counter')-FIRST_IMPACT} stone/>
  <IceDebris at={[HERO_FREEZE[0]-.55,.13,1.2]} elapsed={t-s.b-.23}/><IceDebris at={[HERO_FREEZE[0]-.35,.13,1.2]} elapsed={t-s.b-.32}/>
  {t>=LAND&&t<LAND+.5?<IceDebris at={add(q.position,[0,.04,0])} elapsed={t-LAND} stone/>:null}
  <StopHalo t={t} position={HERO_FREEZE} radius={1.8}/>
 </>;
};

export function rescuedRabbit(t:number):Vec3{const h=heroState(t);return ahead(h.position,h.yaw,.32,.55);}
