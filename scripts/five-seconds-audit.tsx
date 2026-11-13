/** Isolated runtime QA entry. Rendered by five-seconds-audit.mjs, never by src/registry.ts. */
import React from 'react';
import {registerRoot,Composition,Sequence,useCurrentFrame,AbsoluteFill} from 'remotion';
import type {Vec3} from '../src/engine';
import {film} from '../src/videos/in-this-town-five-seconds/film';
import {WorldClock,STOPS,STOP,worldFrame,activeStop,timing,cue} from '../src/videos/in-this-town-five-seconds/kit';
import {handWorld,lockerMotion,rescueMotion,counterHero,manMotion,rescueArrow,ROCK_END,HIT,LAND,HERO_RUN,distance,add,DOOR_KICK,DOOR_SHUT,LOCKER_GRAB,LOCKER_OPEN_START,LOCKER_OPEN_END,sleevePoint} from '../src/videos/in-this-town-five-seconds/motion';
import {heroState,strangerPose,rockAt,carriedRabbit,rescuedRabbit,homeHero,iceAt,rabbitAt,PICK_ROCK,PLACE_ROCK,LIFT_START,TAKE_RABBIT,motherGazeTarget} from '../src/videos/in-this-town-five-seconds/chase-motion';
import {lockerState,bullyState,lockerDoorContact,LOCKER_PICK,LOCKER_PLACE} from '../src/videos/in-this-town-five-seconds/school-motion';
import {rescueState,doorContact,bowState,zombiesAt,ELDER_GRAB,ELDER_RELEASE,CARROT_PASS} from '../src/videos/in-this-town-five-seconds/rescue-motion';
import {glassState,touchState,motherCheck,windowState,GLASS_DROP,GLASS_ROOT,GLASS_YAW,BOOK_TOUCH,BOOK_RELEASE,SASH_DOWN,SASH_CLOSED} from '../src/videos/in-this-town-five-seconds/home-motion';
import {footWorld,palmMid} from '../src/videos/in-this-town-five-seconds/performance';

const samples=(a:number,b:number)=>Array.from({length:Math.max(0,Math.floor(b*30)-Math.ceil(a*30)+1)},(_,i)=>(Math.ceil(a*30)+i)/30);
function audit(){
 const stops=STOPS.map(s=>{
  const fs=Array.from({length:s.end-s.start},(_,i)=>s.start+i);
  if(fs.length!==150||!fs.every(f=>activeStop(f/30)?.id===s.id))throw Error('Stop length '+s.id);
  if(new Set(fs.map(worldFrame)).size!==1)throw Error('Background clock moves '+s.id);
  return {...s,seconds:5,worldFrame:worldFrame(s.start),renderedCutFrames:timing.cues.map(c=>Math.round(c.start*30)).filter(f=>f>s.start&&f<s.end)};
 });
 const held=(id:keyof typeof STOP,name:string,fn:(t:number)=>unknown,a=STOP[id].a,b=STOP[id].b-1/30)=>{
  const s=STOP[id],states=new Set(samples(a,b).map(t=>JSON.stringify(fn(t)))).size;
  if(states!==1)throw Error(`Untouched ${name} moves during ${id}`);
  return {stop:id,name,states};
 };
 const untouched=[held('counter','stranger root',manMotion),held('counter','stranger pose',strangerPose),held('counter','rabbit',carriedRabbit),held('counter','witness gaze',motherGazeTarget),held('counter','second ice',t=>iceAt(t,1)),held('counter','third ice',t=>iceAt(t,2)),held('elder','arrow',rescueArrow),held('elder','bow',bowState),held('elder','zombies',zombiesAt),held('locker','untouched closed door',t=>lockerMotion(t).door,STOP.locker.a,LOCKER_OPEN_START),held('locker','released open door',t=>lockerMotion(t).door,LOCKER_OPEN_END,STOP.locker.b-1/30),held('locker','bully',bullyState),held('glass','cup',t=>glassState(t).cup)];
 const trajectories=[
  ['locker bully',(t:number)=>bullyState(t).position,cue('7.locker').start,cue('8.secret').end],
  ['locker hero',(t:number)=>lockerMotion(t).hero.position,cue('7.locker').start,cue('8.secret').end],
  ['pulled friend',(t:number)=>lockerMotion(t).friend,STOP.locker.a,STOP.locker.b],
  ['rescue hero',(t:number)=>rescueMotion(t).hero.position,cue('10.night').start,cue('12.rabbit').end],
  ['dragged elder',(t:number)=>rescueMotion(t).elder,STOP.elder.a,STOP.elder.b],
  ['bedroom hero',(t:number)=>homeHero(t).position,cue('13.sound').start,HERO_RUN],
  ['stranger',(t:number)=>manMotion(t).position,cue('13.sound').start,cue('18.prince').end],
  ['chase hero',(t:number)=>counterHero(t).position,HERO_RUN,cue('18.prince').end],
 ] as const;
 const paths=trajectories.map(([id,fn,a,b])=>{let max=0,when=0;for(const t of samples(a+1/30,b)){const d=distance(fn(t),fn(t-1/30));if(d>max){max=d;when=Math.round(t*30);}}return {id,maxFrameStep:max,maxMetresPerSecond:max*30,atFrame:when};});
 if(paths.some(p=>p.maxMetresPerSecond>7.5))throw Error('Root speed/teleport '+JSON.stringify(paths));
 const contact=(id:string,a:number,b:number,fn:(t:number)=>[Vec3,Vec3],limit=.012)=>{
  let max=0,when=0;const times=samples(a,b);
  for(const t of times){const points=fn(t),error=distance(...points);if(error>max){max=error;when=Math.round(t*30);}}
  if(max>limit)throw Error(`Lost contact ${id}: ${max} at ${when}`);
  return {id,samples:times.length,maxErrorMetres:max,atFrame:when,limit};
 };
 const contacts=[
  contact('glass in left hand',cue('4.first').start,GLASS_DROP-1/30,t=>{const q=glassState(t);return [q.cup,add(handWorld(GLASS_ROOT,GLASS_YAW,.95,q.pose,-1),[0,-.14,0])];}),
  contact('touch book',BOOK_TOUCH,BOOK_RELEASE-1/30,t=>{const q=touchState(t);return [q.book,add(handWorld(q.position,0,.95,q.pose),[0,-.055,0])];}),
  contact('locker sleeve grip',LOCKER_GRAB,STOP.locker.a+1.93,t=>{const q=lockerState(t);return [handWorld(q.hero.position,q.yaw,.95,q.pose),q.target];}),
  contact('touched door hand',LOCKER_OPEN_START,LOCKER_OPEN_END,t=>{const q=lockerState(t);return [handWorld(q.hero.position,q.yaw,.95,q.pose),lockerDoorContact(t)];}),
  contact('locker book',LOCKER_PICK,LOCKER_PLACE-1/30,t=>{const q=lockerState(t);return [q.book,add(handWorld(q.hero.position,q.yaw,.95,q.pose),[0,.055,0])];}),
  contact('elder collar',ELDER_GRAB,ELDER_RELEASE,t=>{const q=rescueState(t);return [handWorld(q.hero.position,q.yaw,.95,q.pose),q.shoulder];}),
  contact('door toe',DOOR_KICK,DOOR_SHUT,t=>{const q=rescueState(t);return [footWorld(q.hero.position,q.yaw,.95,q.pose),doorContact(t)];}),
  contact('thank-you carrot',CARROT_PASS,cue('12.rabbit').end,t=>{const q=rescueState(t);return [q.carrot,add(handWorld(q.hero.position,q.yaw,.95,q.pose),[0,-.13,0])];}),
  contact('sash sleeves',SASH_DOWN,SASH_CLOSED+.07,t=>{const q=motherCheck(t);return [sleevePoint(q.position,q.yaw,.96,q.arm,q.offset,q.lean,0),windowState(t).handle];}),
  contact('rock carry',PICK_ROCK,PLACE_ROCK-1/30,t=>{const h=heroState(t);return [rockAt(t),add(handWorld(h.position,h.yaw,.95,h.pose),[0,-.29,0])];}),
  contact('stranger rabbit support',LIFT_START,TAKE_RABBIT-1/30,t=>{const q=manMotion(t);return [rabbitAt(t),add(handWorld(q.position,q.yaw,1,strangerPose(t),-1),[0,-.18,0])];}),
  contact('hero rabbit support',TAKE_RABBIT,cue('18.prince').end,t=>{const q=heroState(t);return [rescuedRabbit(t),add(palmMid(q.position,q.yaw,.95,q.pose),[0,-.18,0])];}),
 ];
 const toe=samples(HIT-.18,HIT+.10).map(t=>{const q=manMotion(t);return {t,foot:footWorld(q.position,q.yaw,1,strangerPose(t)),rock:ROCK_END};});
 if(!toe.some(q=>Math.abs(q.foot[0]-ROCK_END[0])<.126&&q.foot[1]>=0&&q.foot[1]<.25&&Math.abs(q.foot[2]-ROCK_END[2])<.108))throw Error('Toe misses placed rock');
 console.log('MODEL_AUDIT '+JSON.stringify({revision:'full-motion-v2',stops,paths,untouched,contacts,toe,land:{t:LAND,man:manMotion(LAND),rabbit:carriedRabbit(LAND)},black:film.cutToBlackAt,frames:film.durationInFrames,limitations:'State/contact and frame-clock assertions; not a claim of entertaining performance or subjective playback.'}));
}
const Probe:React.FC<{expected:number;where:string}>=({expected,where})=>{const observed=useCurrentFrame();if(observed!==expected)throw Error(`Freeze clock ${where}: observed ${observed}, expected ${expected}`);return null;};
let cursor=0;const seqs=film.scenes.map(s=>{const r={scene:s,from:cursor,duration:Math.round(s.duration*30)};cursor+=r.duration;return r;});
const Local:React.FC<{from:number;scene:typeof film.scenes[number]}>=({from,scene})=>{const f=useCurrentFrame(),t=(f+from)/30;let shot=scene.shots[0];for(const x of scene.shots)if(x.at<=f/30+1e-6)shot=x;const c=cue(shot.cue!);const fromClosure=Math.round((c.start+(f/30-shot.at))*30)/30;if(Math.abs(fromClosure-t)>1e-6)throw Error('Cut resets global time');return <React.Fragment key={shot.cue}><WorldClock t={fromClosure}><Probe where={'stage '+shot.cue} expected={worldFrame(f+from)}/></WorldClock></React.Fragment>;};
const ClockFilm:React.FC=()=>{const f=useCurrentFrame();return <AbsoluteFill style={{backgroundColor:'#15252d'}}><WorldClock t={f/30}><Probe where='world' expected={worldFrame(f)}/></WorldClock>{seqs.map(q=><Sequence layout='none' key={q.scene.id} from={q.from} durationInFrames={q.duration}><Local scene={q.scene} from={q.from}/></Sequence>)}</AbsoluteFill>;};
const MathFilm:React.FC=()=>{audit();return <AbsoluteFill style={{backgroundColor:'black'}}/>;};
registerRoot(()=> <><Composition id='five-seconds-clocks' component={ClockFilm} durationInFrames={film.durationInFrames} fps={30} width={128} height={128}/><Composition id='five-seconds-math' component={MathFilm} durationInFrames={1} fps={30} width={128} height={128}/></>);
