import type React from "react";
import { Block, MinecraftAvatar, getPose, gaitPose } from "../../engine";
import type { Pose, Vec3 } from "../../engine";
import { Hero, Friend, Villager, Classmate, Teacher, WorldClock, StopHalo, Bread, Book, Chalk, CLASS_HERO, CLASS_FRIEND, TABLE_HERO, TABLE_FRIEND, ROBE, TEEN, STOP, at, cue, worldTime, phase, smooth, mix, turn, v, add, route, lockerMotion, LOCKER, aimHand, handWorld, stoop, poseMix, punch, recoil, HingedBook } from "./kit";

import { lunchMotion, LUNCH_HERO, LUNCH_FRIEND, LUNCH_BOOK, BOOK_TOUCH, BOOK_END } from "./domestic-motion";

export const SchoolCrowd:React.FC<{t:number;teacher?:boolean}>=({t,teacher=true})=><WorldClock t={t}>
 {[-2.4,0,2.4].flatMap((x,col)=>[-.4,1.25,2.9].map((z,row)=>{
   if(row===1&&col<2)return null;
   return (col+row)%2?<Villager key={`${col}${row}`} position={[x,-.09,z]} scale={.86} robe={[ROBE.blue,ROBE.brown,ROBE.farmer][row]} sit rotationY={Math.PI} phase={col+row}/>:<Classmate key={`${col}${row}`} who={col+row*3} scale={.88} position={[x,-.02,z]} rotationY={Math.PI} animation="sit"/>;
 }))}
 {teacher?<Teacher position={[-.6,0,-2.9]} animation="talk" face="calm"/>:null}
</WorldClock>;
export const Intro:React.FC<{t:number}>=({t})=>{
 const h=route(t,[[0,[1.2,0,.05]],[2.8,[1.2,0,1.35]],[4.55,[.62,0,1.65]],[5.4,[.62,0,1.65]]]);
 return <>
  <SchoolCrowd t={t}/><WorldClock t={t}><Friend position={CLASS_FRIEND} sit rotationY={Math.PI}/><Book position={[.28,1.27,1.65]} rotationY={.4}/><Chalk position={[1.25,1.65,.4]} angle={.5}/><Classmate who={3} position={[2.4,0,2.9]} animation="laugh" rotationY={Math.PI}/></WorldClock>
  <Hero position={h.position} rotationY={t<2.7?0:-.7} animation={t<4.55?'walk':'idle'} animDistance={h.distance} time={t} headYaw={t<2.7?-.2:-.25} face="brave"/>
  <StopHalo t={t} position={[1.1,0,.8]} radius={1.5}/>
 </>;
};
export const SchoolDay:React.FC<{t:number;id:string}>=({t,id})=>{
 const enters=id==='3.school', answer=id==='9.help';
 const h=enters?route(t,[[cue('3.school').start,[1.2,0,3.2]],[cue('3.school').end,[1.2,0,1.25]]]):null;
 const toss=phase(t,at('3.class','threw')-.23,at('3.class','chalk')+.1);
 const tp:Partial<Pose>={armR:[mix(-2.3,-1.0,smooth(toss)),0,.16]};
 return <>
 <SchoolCrowd t={t} teacher={false}/>
 <WorldClock t={t}>
  <Friend position={CLASS_FRIEND} sit rotationY={Math.PI} turn={id==='3.seat'?.7:answer?.6:0} hmm={id==='3.seat'?.3:0}/>
  <Teacher position={[-.6,0,-2.9]} animation="talk" poseOverride={id==='3.class'?tp:undefined} face="calm"/>
  {id==='3.class'&&toss>.5&&toss<1?<Chalk position={v([-.25,1.45,-2.7],[1.8,1.2,-.2],(toss-.5)*2)} angle={toss*3}/>:null}
 </WorldClock>
 <Hero position={h?.position??CLASS_HERO} rotationY={Math.PI} animation={enters?'walk':answer?'sit':'sit'} animDistance={h?.distance} time={t} face={answer?'smile':'calm'} poseOverride={answer?{armR:[-2.75*smooth(phase(t,at('9.help','answer')-.4,at('9.help','answer')+.1)),0,.25]}:undefined} headYaw={id==='3.seat'||answer?-.55:0}/>
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
 const s=STOP.chalk, p:Vec3=[1.2,0,.9], goal:Vec3=[1.2,1.46,.5];
 const before=phase(t,s.a-.32,s.a), after=phase(t,s.b,s.b+.09);
 const chalk=t<s.a?v([-.25,1.47,-2.5],goal,before):t<s.b?goal:v(goal,[1.2,1.43,.74],after);
 const hit=t>=s.b+.08;
 const teacherPose:Partial<Pose>={armR:[mix(-2.4,-1.35,smooth(phase(Math.min(t,s.a),s.a-.48,s.a-.18))),0,.12]};
 return <>
 <SchoolCrowd t={t} teacher={false}/><WorldClock t={t}><Friend position={CLASS_FRIEND} sit rotationY={Math.PI}/><Teacher position={[-.6,0,-2.9]} poseOverride={teacherPose} time={worldTime(t)} breath={0} weightShift={0}/></WorldClock>
 <Hero position={p} rotationY={Math.PI} time={t} animation="idle" face={hit?'ouch':t<s.a?'wow':'grin'} headPitch={hit?-.13*Math.exp(-(t-s.b)*5):0} gaze={0} saccade={false}/>
 {t<s.b+.09?<Chalk position={chalk} angle={t<s.a?before*3:1.1}/>:null}
 {hit?Array.from({length:7},(_,i)=><Block key={i} position={[1.2+Math.sin(i*3)*(t-s.b)*.23,1.43-.4*(t-s.b)**2,.76+Math.cos(i*3)*(t-s.b)*.14]} size={[.027,.027,.027]} color="#ede7d4"/>):null}
 <StopHalo t={t} position={p} radius={1.1}/>
 </>;
};

/** One continuous performance for scenes 7 and 8. No state is reset at the four intervening cuts. */
export const LockerAction:React.FC<{t:number}>=({t})=>{
 const q=lockerMotion(t),s=q.s,h=q.hero.position;
 const pre=phase(t,at('7.locker','shoved')-.2,at('7.locker','locker')+.12);
 const friend=t<s?v([.17,0,-.35],LOCKER.friend,smooth(pre)):q.friend;
 let yaw=t<s+.55?Math.PI:Math.PI/2;
 const walking=t<s-.15||t>=s+1.12&&t<s+1.93||t>=s+3.6&&t<s+4.5;
 let pose:Partial<Pose>={...(walking?gaitPose('walk',q.hero.distance):getPose('idle',t)),bodyY:0,bodyPitch:0,bodyYaw:0,bodyRoll:0};
 const pulling=t>=s+.1&&t<=s+1.95;
 if(pulling){yaw=turn(Math.PI,Math.atan2(friend[0]-h[0],friend[2]-h[2]),smooth(phase(t,s-.05,s+.35)));pose.armR=v([-.1,0,.05],aimHand(h,yaw,TEEN,pose,add(friend,[-.22,1.14,.08])),smooth(phase(t,s+.1,s+.45)));pose.armL=[-.6,0,-.05];}
 const bend=smooth(phase(t,s+1.96,s+2.3))*(1-smooth(phase(t,s+2.6,s+3.05)));
 if(bend>0){pose={...pose,...stoop(bend)};yaw=Math.PI/2;pose.armR=aimHand(h,yaw,TEEN,pose,add(LOCKER.book,[0,.03,0]));}
 if(t>s+2.6&&t<s+3.6){yaw=Math.PI/2;pose.armR=aimHand(h,yaw,TEEN,pose,add(friend,[-.18,.92,.28]));}
 const drop=phase(t,at('7.book','book'),at('7.book','floor'));
 let book:Vec3=t<s?v([.0,.94,-.62],LOCKER.book,Math.min(1,drop*drop*1.25)):LOCKER.book;
 const held=handWorld(h,yaw,TEEN,pose);
 if(t>=s+2.32&&t<s+2.7)book=v(LOCKER.book,held,smooth(phase(t,s+2.32,s+2.7)));
 if(t>=s+2.7&&t<s+3.5)book=v(held,add(friend,[0,.95,.27]),smooth(phase(t,s+2.7,s+3.5)));
 if(t>=s+3.5)book=add(friend,[0,.95,.27]);
 const slam=t>=STOP.locker.b;
 return <>
  <WorldClock t={t}>
    <Friend position={friend} rotationY={0} lean={t<s?-.1*smooth(pre):0} lookAt={slam?add(h,[0,1.4,0]):undefined}/>
    <Classmate who={6} scale={.99} position={[.82,0,-.18]} rotationY={-2.45} animation={slam?'scared':'push'} time={worldTime(t)} face={slam?'wow':'frown'} poseOverride={{armR:[-1.45,0,.05]}}/>
    <Classmate who={4} scale={.94} position={[1.65,0,.0]} rotationY={-1.4} animation={slam?'lookAround':'laugh'} face={slam?'uneasy':'grin'} time={worldTime(t)}/>
    <Villager position={[-4.7,0,.1]} scale={.86} robe={ROBE.blue}/><Classmate who={1} position={[4.6,0,.6]} rotationY={Math.PI} animation="idle"/>
  </WorldClock>
  <Hero position={h} rotationY={yaw} animation={walking?'walk':'idle'} animDistance={q.hero.distance} time={t} poseOverride={pose} breath={0} weightShift={0} face={slam?'calm':'brave'} lookAt={t>s+4.5?add(friend,[0,1.4,0]):undefined}/>
  <group position={book} rotation={[t<s?.35*drop:0,0,t<s?.8*drop:0]}><Book scale={1.05} color="#4c7596"/></group>
  <StopHalo t={t} position={[-.5,0,-.1]} radius={1.65}/>
 </>;
};
