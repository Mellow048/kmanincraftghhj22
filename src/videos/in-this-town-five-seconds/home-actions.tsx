import type React from "react";
import { Block } from "../../engine";
import type { Pose, Vec3 } from "../../engine";
import { Hero, Mother, Elder, Friend, WorldClock, StopHalo, GlassCup, Book, Bowl, Carrot, Rabbit, Bread, TEEN, STOP, at, cue, worldTime, phase, smooth, mix, v, add, route, aimHand, handWorld, stoop, poseMix, HOME, HOME_WINDOW, HOME_BED, RABBIT_START } from "./kit";

export const MotherStory:React.FC<{t:number;id:string}>=({t,id})=>{
 const closes=id==='2.curtains', rule=id.startsWith('6.'), breakfast=id==='3.school';
 const m=closes?route(t,[[cue(id).start,[-.9,0,-.4]],[cue(id).start+.8,[1.05,0,-1.85]],[cue(id).end,[1.05,0,-1.85]]],true):rule?route(t,[[cue('6.told').start,[-1.72,0,-.65]],[cue('6.rule').start,[-1.4,0,-.5]],[cue('6.lock').start,[-1.4,0,-.5]],[cue('6.lock').end-.2,[-1.75,0,-1.8]]],true):{position:[-.9,0,-.4] as Vec3,distance:0,yaw:.3};
 const hp=breakfast?route(t,[[cue(id).start,[.75,0,.7]],[cue(id).end,[-1.45,0,-1.5]]],true):null;
 const adopted=id==='2.adopted';
 const put=smooth(phase(t,at('6.hands','put'),at('6.hands','bowl')+.12));
 return <>
  <WorldClock t={t}>
   <Mother position={m.position} rotationY={closes||id==='6.lock'?Math.PI:.35} walk={m.distance} hmm={id==='6.rule'?.6:0} nod={id==='2.answer'?.2:0} turn={id==='2.where'?-.8:0} lean={closes?.1:0}/>
   {adopted?<group position={[-.57,1.16,.01]} rotation={[0,0,Math.PI/2]}><Hero scale={.42} position={[0,0,0]} colors={{torso:'#d9a137',arms:'skin',legs:'#314b79'}} animation="idle" face="calm"/></group>:null}
   {rule&&t<cue('6.rule').start?<Bowl position={v([-1.7,1.04,-.2],[-2.1,.97,-1.3],put)}/>:null}
   <Bread position={[.05,.82,.14]} scale={.6}/>
  </WorldClock>
  {!adopted?<Hero position={hp?.position??[.8,0,.75]} rotationY={hp?.yaw??-.85} animation={breakfast?'walk':'talk'} animDistance={hp?.distance} time={t} face={id==='6.question'?'uneasy':'calm'} headYaw={closes?-.4:0}/>:null}
  {breakfast?<Book position={[.73,1,.8]} color="#4c7596"/>:null}
  {id==='6.lock'?<Block position={[-1.35+smooth(phase(t,at(id,'checked'),at(id,'lock')+.15))*.08,1.13,-2.28]} size={[.2,.045,.06]} color="#a7b0ae"/>:null}
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
