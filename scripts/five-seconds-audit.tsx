/** Isolated runtime QA entry. Rendered by five-seconds-audit.mjs, never by src/registry.ts. */
import React from 'react';
import {registerRoot,Composition,Sequence,useCurrentFrame,AbsoluteFill} from 'remotion';
import {Euler,Vector3} from 'three';
import {getPose} from '../src/engine/anim';
import {film} from '../src/videos/in-this-town-five-seconds/film';
import {WorldClock,TEEN,STOPS,STOP,worldFrame,activeStop,timing,cue,at} from '../src/videos/in-this-town-five-seconds/kit';
import {handWorld,lockerMotion,rescueMotion,counterHero,manMotion,rescueArrow,ROCK_START,ROCK_END,HIT,LAND,RUN_START,HERO_RUN,MAN_FREEZE,distance,add,aimHand,stoop} from '../src/videos/in-this-town-five-seconds/motion';
import {heroState,strangerPose,rockAt,carriedRabbit,rescuedRabbit} from '../src/videos/in-this-town-five-seconds/chase-action';
function foot(t:number,side:1|-1){const q=manMotion(t),p={...getPose('idle',t),...strangerPose(t)},px=1.8/32;
 const f=new Vector3(0,-6*px,1.5*px).applyEuler(new Euler(...(side===1?p.kneeR:p.kneeL)));
 f.y-=6*px;f.applyEuler(new Euler(...(side===1?p.legR:p.legL)));f.x+=side*2.2*px;
 f.applyEuler(new Euler(p.bodyPitch,p.bodyYaw,p.bodyRoll));f.y+=12*px+p.bodyY;f.applyEuler(new Euler(0,q.yaw,0)).add(new Vector3(...q.position));return [f.x,f.y,f.z] as [number,number,number];}
function audit(){
 const stops=STOPS.map(s=>{const fs=Array.from({length:s.end-s.start},(_,i)=>s.start+i);if(fs.length!==150||!fs.every(f=>activeStop(f/30)?.id===s.id))throw Error('Stop length '+s.id);if(new Set(fs.map(worldFrame)).size!==1)throw Error('Background clock moves '+s.id);return {...s,seconds:5,worldFrame:worldFrame(s.start),renderedCutFrames:timing.cues.map(c=>Math.round(c.start*30)).filter(f=>f>s.start&&f<s.end)};});
 const freeze=Array.from({length:150},(_,i)=>(STOP.counter.start+i)/30);
 const same=(fn:(t:number)=>unknown)=>new Set(freeze.map(t=>JSON.stringify(fn(t)))).size;
 if(same(manMotion)!==1||same(strangerPose)!==1||same(carriedRabbit)!==1)throw Error('Untouched stranger/rabbit moves during stop');
 for(let f=STOP.elder.start;f<STOP.elder.end;f++)if(distance(rescueArrow(f/30),rescueArrow(STOP.elder.a))>1e-9)throw Error('Arrow moves');
 for(let f=STOP.locker.start;f<STOP.locker.end;f++)if(lockerMotion(f/30).door!==lockerMotion(STOP.locker.a).door)throw Error('Locker door moves');
 const trajectories=[['locker hero',(t:number)=>lockerMotion(t).hero.position,cue('7.locker').start,cue('8.secret').end],['pulled friend',(t:number)=>lockerMotion(t).friend,STOP.locker.a,STOP.locker.b],['rescue hero',(t:number)=>rescueMotion(t).hero.position,cue('10.night').start,cue('11.safe').end],['dragged elder',(t:number)=>rescueMotion(t).elder,STOP.elder.a,STOP.elder.b],['stranger',(t:number)=>manMotion(t).position,cue('13.sound').start,cue('18.prince').end],['chase hero',(t:number)=>counterHero(t).position,HERO_RUN,cue('18.prince').end]] as const;
 const paths=trajectories.map(([id,fn,a,b])=>{let max=0,when=0;for(let f=Math.ceil(a*30)+1;f<Math.floor(b*30);f++){const d=distance(fn(f/30),fn((f-1)/30));if(d>max){max=d;when=f;}}return {id,maxFrameStep:max,maxMetresPerSecond:max*30,atFrame:when};});
 if(paths.some(p=>p.maxMetresPerSecond>7.5))throw Error('Root speed/teleport '+JSON.stringify(paths));
 const contacts=[];
 for(const off of [.76,.9,1.1,2.85,3.18,3.56]){const t=STOP.counter.a+off,h=heroState(t);contacts.push({action:'rock',off,hero:h.position,hand:handWorld(h.position,h.yaw,TEEN,h.pose),rock:rockAt(t),distance:distance(handWorld(h.position,h.yaw,TEEN,h.pose),add(rockAt(t),[0,.1,0]))});}
 for(const off of [.3,.6,1,1.5,2]){const t=STOP.locker.a+off,q=lockerMotion(t),h=q.hero.position,target=add(q.friend,[-.22,1.14,.08]),yaw=Math.atan2(q.friend[0]-h[0],q.friend[2]-h[2]);const pose={bodyY:0,bodyPitch:0,bodyYaw:0,bodyRoll:0};const arm=aimHand(h,yaw,TEEN,pose,target);contacts.push({action:'sleeve',off,distance:distance(handWorld(h,yaw,TEEN,{...pose,armR:arm}),target)});}
 const toe=Array.from({length:24},(_,i)=>{const t=HIT-.3+i/30;return {t,foot:foot(t,1),rock:ROCK_END,distance:distance(foot(t,1),add(ROCK_END,[0,.13,0]))};});
 console.log('MODEL_AUDIT '+JSON.stringify({stops,paths,untouchedCounterStates:{man:same(manMotion),pose:same(strangerPose),rabbit:same(carriedRabbit)},contacts,toe,land:{t:LAND,man:manMotion(LAND),rabbit:carriedRabbit(LAND)},black:film.cutToBlackAt,frames:film.durationInFrames}));
}
const Probe:React.FC<{expected:number;where:string}>=({expected,where})=>{const observed=useCurrentFrame();if(observed!==expected)throw Error(`Freeze clock ${where}: observed ${observed}, expected ${expected}`);return null;};
let cursor=0;const seqs=film.scenes.map(s=>{const r={scene:s,from:cursor,duration:Math.round(s.duration*30)};cursor+=r.duration;return r;});
const Local:React.FC<{from:number;scene:typeof film.scenes[number]}>=({from,scene})=>{const f=useCurrentFrame(),t=(f+from)/30;let shot=scene.shots[0];for(const x of scene.shots)if(x.at<=f/30+1e-6)shot=x;const c=cue(shot.cue!);const fromClosure=Math.round((c.start+(f/30-shot.at))*30)/30;if(Math.abs(fromClosure-t)>1e-6)throw Error('Cut resets global time');return <React.Fragment key={shot.cue}><WorldClock t={fromClosure}><Probe where={'stage '+shot.cue} expected={worldFrame(f+from)}/></WorldClock></React.Fragment>;};
const ClockFilm:React.FC=()=>{const f=useCurrentFrame();return <AbsoluteFill style={{backgroundColor:'#15252d'}}><WorldClock t={f/30}><Probe where='world' expected={worldFrame(f)}/></WorldClock>{seqs.map(q=><Sequence layout='none' key={q.scene.id} from={q.from} durationInFrames={q.duration}><Local scene={q.scene} from={q.from}/></Sequence>)}</AbsoluteFill>;};
const MathFilm:React.FC=()=>{audit();return <AbsoluteFill style={{backgroundColor:'black'}}/>;};
registerRoot(()=> <><Composition id='five-seconds-clocks' component={ClockFilm} durationInFrames={film.durationInFrames} fps={30} width={128} height={128}/><Composition id='five-seconds-math' component={MathFilm} durationInFrames={1} fps={30} width={128} height={128}/></>);
