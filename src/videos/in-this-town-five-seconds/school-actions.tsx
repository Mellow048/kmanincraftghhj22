import type React from "react";
import { Block, MinecraftAvatar, getPose, gaitPose } from "../../engine";
import type { Pose, Vec3 } from "../../engine";
import { Hero, Friend, Villager, Classmate, Teacher, WorldClock, StopHalo, Bread, Book, Chalk, CLASS_HERO, CLASS_FRIEND, TABLE_HERO, TABLE_FRIEND, ROBE, TEEN, STOP, at, cue, worldTime, phase, smooth, mix, turn, v, add, route, lockerMotion, LOCKER, aimHand, handWorld, stoop, poseMix, punch, recoil, HingedBook, BlockBurst } from "./kit";

import { neutral, blend, planted, locomotion, accent, bounce } from './performance';
import { lockerState, bullyState, chalkState, classChalkState, teacherThrow, CHALK_FIRE, CHALK_HIT, CLASS_CHALK_FIRE, CLASS_CHALK_LAND, TEACHER_ROOT } from './school-motion';
import { CLASSROOM_EXTRAS } from './school-layout';
import { lunchMotion, LUNCH_HERO, LUNCH_FRIEND, LUNCH_BOOK, BOOK_TOUCH, BOOK_END } from "./domestic-motion";

export const SchoolCrowd:React.FC<{t:number;teacher?:boolean}>=({t,teacher=true})=><WorldClock t={t}>
 {CLASSROOM_EXTRAS.map(({col,row,who,villager,position})=>villager?<Villager key={`${col}${row}`} position={position} scale={.86} robe={[ROBE.blue,ROBE.brown,ROBE.farmer][row]} sit rotationY={Math.PI} phase={col+row}/>:<Classmate key={`${col}${row}`} who={who} scale={.88} position={position} rotationY={Math.PI} animation="sit"/>)}
 {teacher?<Teacher position={[-.6,0,-2.9]} animation="talk" face="calm"/>:null}
</WorldClock>;
export const Intro:React.FC<{t:number}>=({t})=>{
 const h=route(t,[[0,[1.2,0,.05]],[2.8,[1.2,0,1.35]],[4.55,[.62,0,1.65]],[5.4,[.62,0,1.65]]]);
 const pose=blend(locomotion(h.distance,'walk'),{...neutral(),armR:[-.3,0,.15],head:[-.04,-.3,.04]},smooth(phase(t,4.25,4.55)));
 pose.head=[.04,-.24,.03];
 const hover=t<STOP.teaser.b?0:t-STOP.teaser.b;
 return <>
  <SchoolCrowd t={t}/><WorldClock t={t}><Friend position={CLASS_FRIEND} sit rotationY={Math.PI}/><Book position={[.28,1.27-4.9*hover*hover,1.65]} rotationY={.4}/><Chalk position={[1.25,1.65,.4-hover*5]} angle={.5}/></WorldClock>
  <Hero position={h.position} rotationY={t<2.7?0:turn(0,-.7,smooth(phase(t,2.7,3.0)))} poseOverride={pose} time={t} breath={0} weightShift={0} face="brave"/>
  <StopHalo t={t} position={[1.1,0,.8]} radius={1.5}/>
 </>;
};
export const SchoolDay:React.FC<{t:number;id:string}>=({t,id})=>{
 const answer=id==='9.help',chalk=classChalkState(t),tp=chalk.teacher;
 const call=accent(t,at('9.help','called')-.12,at('9.help','called')+.12,at('9.help','answer')-.25,at('9.help','answer'));
 const hand=smooth(phase(t,at('9.help','answer')-.4,at('9.help','answer')+.03));
 const sit={...getPose('sit',0),bodyY:-.125,bodyPitch:0,bodyRoll:0,bodyYaw:0,head:[.03,id==='3.seat'?.55:-.15,.03] as Vec3};
 if(answer){sit.armR=[-.35-2.35*hand-.14*bounce(t,at('9.help','answer'),1,.27),0,.20];sit.bodyPitch=.08*call-.03*hand;sit.head=[-.08*hand,0,-.04*hand];}
 return <>
 <SchoolCrowd t={t} teacher={false}/>
 <WorldClock t={t}>
  <Friend position={CLASS_FRIEND} sit rotationY={Math.PI} turn={id==='3.seat'?-.7:answer?-.6:0} hmm={id==='3.seat'?.22:0} lean={id==='3.seat'?.09*accent(t,cue(id).start,cue(id).start+.25,cue(id).end-.3,cue(id).end):0}/>
  <Teacher position={TEACHER_ROOT} rotationY={id==='3.class'?chalk.yaw:0} poseOverride={id==='3.class'?tp:{...neutral(),armR:[-1.3*call-.1,0,.15]}} breath={0} weightShift={0} face="calm"/>
  {!answer?<Chalk position={chalk.position} angle={t<CLASS_CHALK_FIRE?.4:(Math.min(t,CLASS_CHALK_LAND)-CLASS_CHALK_FIRE)*13}/>:null}
 </WorldClock>
 <Hero position={CLASS_HERO} rotationY={Math.PI} animation="sit" poseOverride={sit} time={t} breath={0} weightShift={0} face={answer?'smile':'calm'}/>
 </>;
};
export const Lunch:React.FC<{t:number;id:string}>=({t,id})=>{
 const first=id==='3.lunch',q=lunchMotion(t,first);
 const maths=!first&&t>=cue('9.math').start;
 const rest:Partial<Pose>={...getPose('sit',0),bodyY:-.125,bodyPitch:-.04,bodyRoll:0,bodyYaw:0,head:[0,0,0],armL:[-.4,0,-.08],armR:[-.35,0,.08]};
 let pose=poseMix(rest,{...rest,...q.receiver},q.receive);
 pose=poseMix(pose,{...rest,...q.opener},q.openReach);
 const nod=q.understand*Math.sin(phase(t,at('9.math','finally'),cue('9.math').end)*Math.PI*2.3)*.08;
 pose.head=[(maths?mix(.46,.02,q.understand):.06)+nod,maths?.38:-.55,maths?-.03:.06];
 // The real hand leaves only after the hinged cover has landed; the book stays put.
 const friendNod=maths?.22+Math.sin((t-cue('9.math').start)*11)*.035:q.retract>.1?.02: .15;
 return <>
 <WorldClock t={t}>
  <Friend position={q.position} rotationY={q.yaw} sit foldedArms={{rotation:q.arm,offset:q.offset}} bodyBob={0} bodyRoll={0} lean={q.lean}
   nod={friendNod} lookAt={maths?add(LUNCH_BOOK,[0,.15,0]):q.retract>.2?add(LUNCH_HERO,[0,1.32,0]):undefined} hmm={id==='9.why'?.24:maths?.12:0}/>
  <HingedBook position={LUNCH_BOOK} opening={q.opening} />
  <Bread position={q.bread} rotationY={q.yaw} scale={q.size}/>
  {first?<Bread position={[.73,.815,-.35]} rotationY={q.yaw} scale={.5}/>:null}
  <Classmate who={2} position={[-4.1,0,.5]} animation="sit" rotationY={Math.PI}/><Villager position={[4.2,0,.5]} scale={.86} robe={ROBE.blue} sit rotationY={Math.PI}/>
 </WorldClock>
 <Hero position={LUNCH_HERO} rotationY={Math.PI} animation="sit" time={t} poseOverride={pose} breath={0} weightShift={0}
  face={q.understand>.4?'smile':maths?'uneasy':id==='9.why'?'uneasy':'smile'} gaze={0} saccade={false}/>
 </>;
};
export const ChalkLesson:React.FC<{t:number}>=({t})=>{
 const q=chalkState(t),p:Vec3=[1.2,0,.9];
 return <>
 <SchoolCrowd t={t} teacher={false}/><WorldClock t={t}><Friend position={CLASS_FRIEND} sit rotationY={Math.PI}/><Teacher position={TEACHER_ROOT} rotationY={q.yaw} poseOverride={q.teacher} time={worldTime(t)} breath={0} weightShift={0}/></WorldClock>
 <Hero position={p} rotationY={Math.PI} time={t} poseOverride={q.pose} breath={0} weightShift={0} face={q.hit?'ouch':t<STOP.chalk.a?'wow':'grin'} gaze={0} saccade={false}/>
 {!q.hit?<Chalk position={q.position} angle={t<STOP.chalk.a?(t-CHALK_FIRE)*11:(STOP.chalk.a-CHALK_FIRE)*11}/>:null}
 <BlockBurst position={[1.2,1.46,.70]} age={t-CHALK_HIT} color="#ede7d4" power={.6} size={.025} life={.48} count={9}/>
 <StopHalo t={t} position={p} radius={1.1}/>
 </>;
};

/** The hand, sleeve, book and door share the same performance across every cut. */
export const LockerAction:React.FC<{t:number}>=({t})=>{
 const q=lockerState(t),b=bullyState(t),s=STOP.locker,slam=t>=s.b;
 const recoilAmount=accent(t,s.b,s.b+.1,s.b+.28,s.b+.5);
 const floor=at('7.book','floor'),drop=phase(t,at('7.book','book'),floor),bookTurn=t<floor?drop:t<floor+.4?Math.cos((t-floor)*18)*Math.exp(-(t-floor)*11):0;
 return <>
  <WorldClock t={t}>
   <Friend position={q.friend} rotationY={0} lean={q.friendLean-.04*recoilAmount} bodyBob={0} bodyRoll={0} walkAmount={0} lookAt={t>=cue('8.friend').start?add(q.hero.position,[0,1.4,0]):undefined}
    nod={t>=s.b&&t<cue('8.friend').start?.25:0}/>
   <Classmate who={6} scale={.99} position={b.position} rotationY={b.yaw} poseOverride={b.pose} time={worldTime(t)} breath={0} weightShift={0} face={slam?'wow':'frown'}/>
   <Classmate who={4} scale={.94} position={[1.65,0,.0]} rotationY={-1.4} animation={slam?'lookAround':'laugh'} face={slam?'uneasy':'grin'} time={worldTime(t)} poseOverride={slam?{bodyPitch:-.1*recoilAmount,armR:[-.8,0,.45],head:[.04,-.3,.1]}:undefined}/>
   <Villager position={[-4.7,0,.1]} scale={.86} robe={ROBE.blue}/><Classmate who={1} position={[4.6,0,.6]} rotationY={Math.PI} animation="idle"/>
  </WorldClock>
  <Hero position={q.hero.position} rotationY={q.yaw} time={t} poseOverride={q.pose} breath={0} weightShift={0} face={slam?'calm':'brave'}/>
  <group position={q.book} rotation={[.35*bookTurn,0,.8*bookTurn]}><Book scale={1.05} color="#4c7596"/></group>
  <BlockBurst position={LOCKER.book} age={t-at('7.book','floor')} color="#c9b994" size={.022} power={.4} life={.25} count={6}/>
  <StopHalo t={t} position={[-.5,0,-.1]} radius={1.65}/>
 </>;
};
