import type React from 'react';
import {Block} from '../../engine';
import {Hero,Elder,Zombie,Skeleton,Arrow,Carrot,WorldClock,StopHalo,BlockBurst,STOP,cue,worldTime,paused,add,rescueArrow,ARROW_LAUNCH} from './kit';
import {rescueState,bowState,zombiesAt} from './rescue-motion';

export const RescueAction:React.FC<{t:number;thanks?:boolean}>=({t,thanks=false})=>{
 const q=rescueState(t),s=STOP.elder,e=q.elderState,bow=bowState(t),mobs=zombiesAt(t);
 const breath=t>=s.b?Math.sin(worldTime(t)*2)*.007:0;
 return <>
 <WorldClock t={t}>
  {mobs.map((mob,i)=><Zombie key={i} position={mob.position} rotationY={Math.PI} walk={mob.distance} arms={1} mood="angry" phase={i+1} lean={mob.lean} wave={mob.wave} nod={mob.contact?.08:0}/>)}
  <Skeleton position={[0,0,8.4]} rotationY={Math.PI} bow bowRaise={bow.raise} bowDraw={bow.draw} mood="calm" nod={.07} lookAt={[0,.7,-.1]}/>
  <group position={e.position} rotation={[e.angle,0,0]}><Elder position={[0,0,0]} lean={e.lean+breath} nod={thanks?.13:0} bodyBob={0} bodyRoll={0} walkAmount={0} foldedArms={{rotation:e.arm,offset:e.offset}} hmm={thanks?.18:0}/></group>
 </WorldClock>
 {t>=ARROW_LAUNCH?<Arrow position={rescueArrow(t)}/>:t>=cue('10.bow').start?<Arrow position={bow.arrow}/>:null}
 <Hero position={q.hero.position} rotationY={q.yaw} time={t} poseOverride={q.pose} breath={0} weightShift={0} face={thanks?'smile':t>=s.b?'uneasy':'brave'}
  lookAt={thanks?add(e.position,[0,1.4,0]):t>=s.b+.9?add(e.position,[0,.3,-1.0]):undefined}/>
 {t>=cue('12.thanks').start-.2?<Carrot position={q.carrot} rotationY={.1}/>:null}
 <StopHalo t={t} position={[0,0,-1]} radius={1.6}/>
 <BlockBurst position={[0,.7,-1.91]} age={t-s.b-.13} color="#bda071" count={7} size={.025} power={.6} life={.35}/>
 {mobs[0].contact?[-1,1].flatMap((side,i)=>[-1,0,1].map(n=><Block key={`${side}-${n}`} position={[side*.25+n*.055,1.08+.07*Math.sin(worldTime(t)*10+i*2),-1.797]} size={[.018,.16,.012]} color="#b59a6b"/>)):null}
 </>;
};
