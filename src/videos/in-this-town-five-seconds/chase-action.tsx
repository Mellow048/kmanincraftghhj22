import type React from 'react';
import {Block} from '../../engine';
import { Hero, Stranger, Mother, WorldClock, StopHalo, Rabbit, IceCube, Rock, BlockBurst, STOP, at, cue, worldTime, paused, phase, smooth, mix, add, handWorld, manMotion, HERO_RUN, HERO_FREEZE, LAND, FIRST_FIRE, FIRST_WALL, FIRST_IMPACT, SECOND_FIRE, THIRD_FIRE } from './kit';
import { strangerPose, carriedRabbit, heroState, rockAt, rescuedRabbit, rabbitAt, homeHero, iceAt, RABBIT_SCALE, LIFT_START, LIFT_END, RECOVER, TAKE_RABBIT, motherGazeTarget } from './chase-motion';
export {strangerPose,carriedRabbit,heroState,rockAt,rescuedRabbit} from './chase-motion';

/** One authored performance from the bedroom to recognition; cuts never restart a path or pose. */
export const ChaseAction:React.FC<{t:number;id:string}>=({t})=>{
 const q=manMotion(t),pose=strangerPose(t),s=STOP.counter,h=t<HERO_RUN?homeHero(t):heroState(t);
 const frost=smooth(phase(t,at('13.frost','Ice'),at('13.frost','legs')))*(1-smooth(phase(t,TAKE_RABBIT,RECOVER+1.05)));
 const rabbit=rabbitAt(t),take=smooth(phase(t,TAKE_RABBIT,RECOVER+.8));
 const yaw=t<TAKE_RABBIT?q.yaw:mix(q.yaw,h.yaw,take);
 const face=t>=cue('18.found').start?'wow':t>=RECOVER?'calm':t<cue('14.out').start?'uneasy':'brave';
 const noseTarget=t>=TAKE_RABBIT&&t<cue('18.look').start?add(rabbit,[0,.35,0]):undefined;
 return <>
  <WorldClock t={t}>
   <Stranger position={q.position} rotationY={q.yaw} time={worldTime(t)} poseOverride={pose} breath={0} weightShift={0}
    gaze={0} saccade={false} lookAt={t>=cue('18.power').start?add(h.position,[0,1.4-pose.bodyY,0]):undefined}/>
   {t>=at('13.frost','Ice')?[0,1,2,3,4].map(i=>{const k=smooth(phase(t,at('13.frost','Ice')+i*.07,at('13.frost','legs')+.03));return k>0?<Block key={i} position={[2.39-i*.13,.055*k,1.68]} size={[.15,.10*k,.15]} rotation={[0,i*.45,0]} color="#9be3f2" opacity={.75}/>:null;}):null}
   {t<TAKE_RABBIT?<Rabbit position={rabbit} rotationY={yaw} scale={RABBIT_SCALE} frost={frost}/>:null}
   {t>=cue('14.follow').start?<Mother position={[-5,0,-1.82]} rotationY={1.15} nod={-.08} walkAmount={0}
    lean={t>=cue('18.home').start?.04:0} lookAt={motherGazeTarget(t)}/>:null}
  </WorldClock>
  {t>=TAKE_RABBIT?<Rabbit position={rabbit} rotationY={yaw} scale={RABBIT_SCALE} frost={frost}/>:null}
  <Hero position={h.position} rotationY={h.yaw} time={t} poseOverride={h.pose} breath={0} weightShift={0} face={face}
   gaze={0} saccade={false} lookAt={noseTarget}/>
  <Rock position={rockAt(t)} scale={.9}/>
  {t>=FIRST_FIRE&&t<FIRST_IMPACT?<IceCube position={iceAt(t,0)} rotationY={(t-FIRST_FIRE)*12} size={.42}/>:null}
  {t>=SECOND_FIRE&&t<s.b+.23?<IceCube position={iceAt(t,1)} rotationY={(paused(t,'counter')-SECOND_FIRE)*10} size={.34}/>:null}
  {t>=THIRD_FIRE&&t<s.b+.32?<IceCube position={iceAt(t,2)} rotationY={.7+(paused(t,'counter')-THIRD_FIRE)*9} size={.28}/>:null}
  {t>=cue('15.hand').start&&t<FIRST_FIRE?<IceCube position={handWorld(q.position,q.yaw,1,pose)} scale={smooth(phase(t,cue('15.hand').start,FIRST_FIRE-.08))} size={.4}/>:null}
  {t>=cue('15.close').start&&t<SECOND_FIRE?<IceCube position={handWorld(q.position,q.yaw,1,pose)} scale={smooth(phase(t,cue('15.close').start,SECOND_FIRE))} size={.34}/>:null}
  <BlockBurst position={FIRST_WALL} age={paused(t,'counter')-FIRST_IMPACT} color="#b6e7f1" power={2.8} count={18} life={1.5} size={.10}/>
  <BlockBurst position={FIRST_WALL} age={paused(t,'counter')-FIRST_IMPACT} color="#838e96" power={2} count={13} life={1.6} size={.13}/>
  <BlockBurst position={[HERO_FREEZE[0]-.55,.1,1.2]} age={t-s.b-.23} color="#b6e7f1" power={2.4} life={1.7}/>
  <BlockBurst position={[HERO_FREEZE[0]-.35,.1,1.2]} age={t-s.b-.32} color="#b6e7f1" power={2.3} life={1.7}/>
  <BlockBurst position={add(q.position,[0,.045,0])} age={t-LAND} color="#c6b597" count={17} power={1.7} life={.48} size={.06}/>
  <StopHalo t={t} position={HERO_FREEZE} radius={1.8}/>
 </>;
};
