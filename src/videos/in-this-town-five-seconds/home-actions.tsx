import type React from "react";
import { Block, gaitPose } from "../../engine";
import type { Pose, Vec3 } from "../../engine";
import { Hero, Mother, Elder, Friend, WorldClock, StopHalo, GlassCup, Book, Bowl, Carrot, Rabbit, Bread, TEEN, STOP, at, cue, worldTime, phase, smooth, mix, v, add, route, aimHand, handWorld, stoop, poseMix, punch, recoil, sleevePoint, HOME, HOME_WINDOW, HOME_BED, RABBIT_START } from "./kit";

import { curtainsMother, curtainState, washingMother, CURTAIN_PULL, CURTAIN_MEET } from "./domestic-motion";

export const MotherStory:React.FC<{t:number;id:string}>=({t,id})=>{
 const rule=id.startsWith('6.'), breakfast=id==='3.school', adopted=id==='2.adopted';
 const window=curtainsMother(t), wash=washingMother(t);
 const atWindow=(t>=cue('2.answer').start&&t<cue('3.school').end);
 const babySway=adopted?Math.sin((t-cue(id).start)*3.7)*.07:0;
 const p=rule?wash.position:atWindow?window.position:[-.9,0,-.4] as [number,number,number];
 const yaw=rule?wash.rotationY:atWindow?window.rotationY:.35;
 const arm=rule?wash.arm:atWindow?window.arm:[-.75,0,babySway*.5] as [number,number,number];
 const offset=rule?wash.offset:atWindow?window.offset:[0,0,0] as [number,number,number];
 const lean=rule?wash.lean:atWindow?window.lean:0;
 const bob=rule?wash.bob:atWindow?window.bob:Math.abs(babySway)*.12;
 const hp=breakfast?route(t,[[cue(id).start,[.8,0,.75]],[cue(id).start+.5,[.8,0,.75]],[cue(id).end,[-1.45,0,-1.5]]],true):null;
 const ask=punch(t,at('2.where','tell')-.25,.25)*(1-punch(t,at('2.where','me',1)+.05,.28));
 const tell=rule?punch(t,at('6.told','told'),.22)*(1-punch(t,at('6.told','glass')+.1,.22)):0;
 const warning=rule?punch(t,at('6.rule','see')-.22,.22)*(1-punch(t,at('6.rule','that')+.1,.2)):0;
 const baby=sleevePoint(p,yaw,.96,arm,offset,lean,bob,[.26,-.18,.15]);
 const heroPose:Partial<Pose>=breakfast?gaitPose('walk',hp!.distance):{bodyPitch:.07*ask-.045*warning,bodyRoll:.03*ask,armR:[-.12-1.05*ask-.85*tell,0,.12+.3*ask+.15*tell],armL:[-.1-.45*ask-.52*tell,0,-.14-.2*ask-.16*tell],head:[.08*ask,0,.12*ask]};
 return <>
  <WorldClock t={t}>
   <Mother position={p} rotationY={yaw} walk={rule?wash.walk:window.distance} walkAmount={rule?wash.step:atWindow?window.step:0} foldedArms={{rotation:arm,offset}} bodyBob={bob} bodyRoll={adopted?babySway:0} lean={lean}
    turn={atWindow?-Math.sin(phase(t,at('2.answer','I'),CURTAIN_PULL)*Math.PI)*.6:id==='2.where'?-.55:0}
    hmm={rule?wash.warning*.25:0} nod={rule?.06:adopted?.17:0} lookAt={rule&&t>at('6.told','glass')?[.8,1.46,.75]:undefined}/>
   {adopted?<group position={baby} rotation={[0,yaw,Math.PI/2]}><Hero scale={.42} position={[-.05,0,0]} colors={{torso:'#d9a137',arms:'skin',legs:'#314b79'}} poseOverride={{armR:[-.4,0,.6],armL:[-.7,0,-.5],kneeR:[.5,0,0],kneeL:[.35,0,0]}} face="calm"/></group>:null}
   {rule?<Bowl position={wash.bowl}/>:null}
   <Bread position={[.05,.82,.14]} scale={.6}/>
  </WorldClock>
  {!adopted?<Hero position={hp?.position??[.8,0,.75]} rotationY={hp?.yaw??(rule?-1.65:-.85)} animation={breakfast?'walk':'idle'} animDistance={hp?.distance} time={t} poseOverride={heroPose} breath={.45} weightShift={0} face={id==='6.question'?'uneasy':id==='2.where'?'uneasy':'calm'} lookAt={rule||atWindow?add(p,[0,1.46,0]):undefined}/>:null}
  {id==='6.lock'?<Block position={[-1.35+punch(t,at(id,'lock'),.14)*.08,1.13,-2.28]} size={[.2,.045,.06]} color="#a7b0ae"/>:null}
 </>;
};
export const GlassDiscovery:React.FC<{t:number}>=({t})=>{
 const s=STOP.glass, p:Vec3=[.7,0,.65], dropAt=s.a-.43;
 const elapsed=t<s.a?Math.max(0,t-dropAt):t<s.b?.43:.43+t-s.b;
 const y=Math.max(.04,1.22-4.9*elapsed*elapsed);
 const broken=t>=s.b+.13;
 const pp:Partial<Pose>={bodyY:0,bodyPitch:0,bodyYaw:0,bodyRoll:0};
 pp.armL=v(aimHand(p,-.45,TEEN,pp,[.18,1.18,.97],-1),[-.05,0,-.08],smooth(phase(t,dropAt,dropAt+.2))); 
 return <>
 <WorldClock t={t}><Mother position={[-.9,0,-.55]} rotationY={.5} nod={.12}/></WorldClock>
 <Hero position={p} rotationY={-.45} time={t} animation="idle" poseOverride={pp} breath={0} weightShift={0} face={t<s.a?'wow':broken?'fear':'wow'} lookAt={[.15,y,.95]}/>
 {!broken?<group position={[.18,y,.97]} rotation={[elapsed*1.2,0,.3+elapsed*.5]}><GlassCup water={false}/></group>:null}
 {Array.from({length:9},(_,i)=>{const a=i*2.4,dt=elapsed;return <Block key={i} position={[.18+Math.cos(a)*dt*.23,Math.max(.025,1.43-dt*dt*(4.5+i*.14)),.97+Math.sin(a)*dt*.28]} size={[.045,.05,.045]} color="#89cbe8" opacity={.85}/>;})}
 {broken?Array.from({length:12},(_,i)=>{const q=Math.min(.8,t-s.b-.13);return <Block key={i} position={[.18+Math.cos(i*2.4)*q*(1.2+i%3*.2),.035+Math.max(0,.6*q-3*q*q),.97+Math.sin(i*2.4)*q*1.5]} rotation={[.2,0,i]} size={[.05,.035,.085]} color="#c7e7ef"/>;}):null}
 <StopHalo t={t} position={[.2,0,.75]} radius={1.45}/>
 </>;
};
export const TouchDemo:React.FC<{t:number}>=({t})=>{
 const s=STOP.touch,move=smooth(phase(t,s.a+.75,s.a+2.55)),release=s.a+2.7;
 const hp:Vec3=[-.45+move*.38,0,.62];
 const theta=Math.PI*move,dx=Math.sin(theta)*.531,dz=Math.cos(theta)*.531;
 const nominal:Partial<Pose>={bodyY:0,bodyPitch:0,bodyRoll:0,bodyYaw:0};
 nominal.armR=aimHand(hp,0,TEEN,nominal,[hp[0]+6*(1.8/32)*TEEN+dx,1.0325,hp[2]+dz]);
 // The book is gripped at the END of the block hand, never through its forearm.
 const held=add(handWorld(hp,0,TEEN,nominal),[dx*.205,-.25*.205,dz*.205]);
 const pose:Partial<Pose>={...nominal,armR:v([.4,0,1.2],nominal.armR!,smooth(phase(t,s.a-.1,s.a+.35)))};
 if(t>release)pose.armR=v(nominal.armR!,[.4,0,1.2],smooth(phase(t,release,release+.4)));
 const bp:Vec3=t<s.b?held:[held[0],Math.max(.853,held[1]-4.9*(t-s.b)**2),held[2]];
 return <>
  <WorldClock t={t}><Mother position={[-1.8,0,-.9]} rotationY={.5} nod={.15}/></WorldClock>
  <Hero position={hp} rotationY={0} time={t} poseOverride={pose} breath={0} weightShift={0} face="brave" lookAt={bp}/>
  <Book position={bp} color="#4c7596"/>
  <StopHalo t={t} position={[0,0,.4]} radius={1.35}/>
 </>;
};
export const FeedRabbit:React.FC<{t:number;id:string}>=({t,id})=>{
 const n=smooth(phase(t,at('3.rabbit','fed')-.2,at('3.rabbit','rabbit')+.4));
 const r=v(RABBIT_START,[1.28,0,1.1],id==='3.ear'?smooth(phase(t,cue(id).start,cue(id).start+.6)):n*.25);
 return <>
 <WorldClock t={t}>
  <Rabbit position={r} rotationY={Math.PI} hop={id==='3.ear'?0:Math.sin(n*Math.PI)*.08}/>
  <Friend position={[.2,0,.95]} rotationY={1.2} nod={.35}/><Elder position={[0,0,-1.8]} nod={.2}/>
 </WorldClock>
 <Hero position={[1.1,0,.78]} rotationY={0} time={t} poseOverride={{...stoop(n*.55),armR:[-.5,0,.1]}} face="smile" lookAt={r}/>
 <Carrot position={v([1.44,1,.98],[1.5,.1,1.4],n)} rotationY={.5} scale={.8}/>
 {id==='3.ear'?<><Block position={[1.24,.13,1.14]} size={[.17,.025,.035]} color="#e9e3d2"/><Block position={[1.3,.14,1.15]} size={[.025,.03,.12]} color="#dedad0"/></>:null}
 </>;
};
export const MotherChecks:React.FC<{t:number;id:string}>=({t,id})=>{
 const close=id==='12.window',mp=route(t,[[cue('12.mother').start,[-5.25,0,-3.55]],[cue('12.mother').end,[-5.25,0,-3.55]],[cue('12.window').start,[-5.25,0,-3.55]],[cue('12.window').end,[-3.9,0,-2.45]]],true);
 return <>
 <WorldClock t={t}><Mother position={mp.position} rotationY={close?0:.9} walk={mp.distance} lean={.1} lookAt={[-4.55,1.4,-3.35]}/></WorldClock>
 <Hero position={[-4.55,0,-3.35]} rotationY={0} animation={id==='12.lie'?'talk':'idle'} time={t} face={id==='12.lie'?'uneasy':'calm'} poseOverride={id==='12.mother'?{armR:[-.3,0,1.2]}:undefined}/>
 </>;
};
