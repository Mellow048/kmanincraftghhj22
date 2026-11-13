import type React from "react";
import { Block, gaitPose } from "../../engine";
import type { Pose, Vec3 } from "../../engine";
import { Hero, Elder, Zombie, Skeleton, Arrow, Carrot, WorldClock, StopHalo, TEEN, STOP, at, cue, worldTime, paused, phase, smooth, mix, v, add, route, rescueMotion, rescueArrow, ARROW_LAUNCH, RESCUE, aimHand, stoop, kneel, RopeLine } from "./kit";

export const RescueAction:React.FC<{t:number;thanks?:boolean}>=({t,thanks=false})=>{
 const q=rescueMotion(t),s=q.s,after=STOP.elder.b,h=q.hero.position;
 const pausedT=paused(t,'elder');
 const walk=phase(pausedT,cue('10.mobs').start,s);
 const rush=smooth(phase(t,after,after+1.6));
 const breathing=t>=after?Math.sin(worldTime(t)*2)*.009:0;
 const rise=thanks?smooth(phase(t,cue('12.thanks').start,cue('12.thanks').start+.75)):0;
 const oldP=v(q.elder,[0,.02,-3.15],rise);
 const bend=smooth(phase(t,s+.1,s+.75))*(1-smooth(phase(t,s+3.05,s+3.35)));
 const gait=gaitPose('walk',q.hero.distance);
 let pose:Partial<Pose>={...stoop(bend),legR:[-1.15*bend+gait.legR[0]*.3,0,.07],legL:[-1.15*bend+gait.legL[0]*.3,0,-.07]};
 let yaw=mix(Math.PI/2,0,smooth(phase(t,s+3.05,s+3.35)));
 const shoulder=add(q.elder,[-.06,.24,-1.22]);
 if(t>=s+.2&&t<s+3.15){pose.armR=aimHand(h,yaw,TEEN,pose,shoulder);pose.armL=[-.45,0,-.1];}
 const kick=Math.sin(phase(t,s+3.25,s+4.1)*Math.PI);
 if(kick>0){pose={...pose,legR:[-1.35*kick,0,.12],kneeR:[.25*kick,0,0],armL:[-.7*kick,0,-.25],bodyPitch:-.15*kick};}
 const launch=ARROW_LAUNCH;
 const a=rescueArrow(t);
 const scratching=t>after+1.6;
 return <>
 <WorldClock t={t}>
   {[-1,1].map((side,i)=><Zombie key={side} position={[side*mix(.85,.56,rush),0,mix(mix(4.1+i*.4,2.5+i*.35,walk),-1.36,rush)]} rotationY={Math.PI} walk={1.8*walk+4*rush} arms={1} mood="angry" phase={i+1} lean={scratching?.12:0} wave={scratching?.15:0}/>)}
   <Skeleton position={[0,0,8.4]} rotationY={Math.PI} bow wave={.1*smooth(phase(pausedT,cue('10.bow').start,cue('10.bow').start+.8))} mood="calm"/>
   <group position={oldP} rotation={[mix(-Math.PI/2,0,rise),0,0]}><Elder position={[0,0,0]} sit={rise>.95} lean={breathing} nod={thanks?.16:0} hmm={thanks?.4:0}/></group>
 </WorldClock>
 {t>=launch?<Arrow position={a}/>:null}
 {t<launch&&t>=cue('10.bow').start?<RopeLine from={[.28,.82,7.74]} to={[.28,1.25,7.95+.24*smooth(phase(t,cue('10.bow').start,launch))]} radius={.008} color="#d3cdbb"/>:null}
 <Hero position={thanks?[-.48,0,-2.5]:h} rotationY={thanks?Math.PI:yaw} animation={t<s?'run':'idle'} animDistance={q.hero.distance} time={t} poseOverride={pose} breath={t>after?1:0} weightShift={0} face={thanks?'smile':t>after?'uneasy':'brave'} lookAt={thanks?[0,1.25,-3.15]:undefined}/>
 {thanks?<Carrot position={v([.08,1.02,-2.85],[-.32,1.05,-2.65],smooth(phase(t,at('12.thanks','handed'),at('12.thanks','carrot')+.15)))} rotationY={.1}/>:null}
 <StopHalo t={t} position={[0,0,-1]} radius={1.6}/>
 {scratching?[-1,1].map(side=><Block key={side} position={[side*.38,1.05+.1*Math.sin(worldTime(t)*8),-1.79]} size={[.025,.15,.015]} color="#b59a6b"/>):null}
 </>;
};
