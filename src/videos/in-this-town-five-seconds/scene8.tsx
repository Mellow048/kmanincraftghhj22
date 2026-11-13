import { cam, storyScene } from "../../engine";
import { timing, cue, at, STOP, add, v, phase, smooth, route, lockerMotion, rescueMotion, rescueArrow, counterHero, manMotion, MAN_FREEZE, HERO_FREEZE, ROCK_END, ROCK_START, FIRST_WALL } from "./kit";
import { follow, push } from "./camera";
import { Intro, SchoolDay, Lunch, ChalkLesson, LockerAction } from "./school-actions";
import { MotherStory, GlassDiscovery, TouchDemo, FeedRabbit, MotherChecks } from "./home-actions";
import { RescueAction } from "./rescue-action";
import { ChaseAction, carriedRabbit, rescuedRabbit } from "./chase-action";

/** Beat 8: An empty locker. Camera cuts do not reset the underlying performance. */
export const scene8=storyScene(timing,{
 id:"scene8",title:"An empty locker",shots:[
  (()=>{const id="8.clear";return {cue:"8.clear",zone:"hall",look:"overworld-day" as const,
    ...cam.push({on:(t=>add(lockerMotion(t).friend,[-.4,.95,.2]))(cue(id).start),onTo:(t=>add(lockerMotion(t).friend,[-.4,.95,.2]))(cue(id).end-1/30),dist:4.8,to:(4.8)-.08,yaw:8,pitch:10,fov:50}), ...follow(id,t=>add(lockerMotion(t).friend,[-.4,.95,.2]),4.8,8,10,50),
    note:"Do not cut past the rescue: his hand reaches the sleeve and he pulls the friend's whole frozen body into the aisle.",
    stage:(local:number)=><LockerAction t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="8.book";return {cue:"8.book",zone:"hall",look:"overworld-day" as const,
    ...cam.push({on:[-1.1,.8,.52],dist:3.4,to:3.05,yaw:20,pitch:18,fov:47}),
    note:"Knees bend and the hand goes down to the established blue book, then raises it into the friend's folded arms.",
    stage:(local:number)=><LockerAction t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="8.beside";return {cue:"8.beside",zone:"hall",look:"overworld-day" as const,
    ...cam.push({on:(t=>add(lockerMotion(t).hero.position,[.35,1.1,0]))(cue(id).start),onTo:(t=>add(lockerMotion(t).hero.position,[.35,1.1,0]))(cue(id).end-1/30),dist:4.5,to:(4.5)-.08,yaw:10,pitch:8,fov:48}), ...follow(id,t=>add(lockerMotion(t).hero.position,[.35,1.1,0]),4.5,10,8,48),
    note:"The book is released and stays with the frozen friend. Show the hero actually taking his last two steps back beside him.",
    stage:(local:number)=><LockerAction t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="8.bang";return {cue:"8.bang",zone:"hall",look:"overworld-day" as const,
    ...cam.push({on:[-.15,1.05,-.5],dist:5.7,to:5.2,yaw:8,pitch:8,fov:50}),
    note:"At frame 150 time returns: the door travels its last few degrees and bangs shut on an empty locker. Both rescued figures are still beside it.",
    stage:(local:number)=><LockerAction t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="8.friend";return {cue:"8.friend",zone:"hall",look:"overworld-day" as const,
    ...cam.push({on:[-.95,1.42,.16],dist:2,to:1.8,yaw:-45,pitch:4,fov:38}),
    note:"The friend's puzzled glance moves from the blue book to the red sleeve. He has a reasonable, wrong explanation.",
    stage:(local:number)=><LockerAction t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="8.secret";return {cue:"8.secret",zone:"hall",look:"overworld-day" as const,
    ...cam.push({on:[-1.86,1.46,.16],dist:2,to:1.8,yaw:60,pitch:3,fov:38}),
    note:"A tiny look away from the hero: he accepts the ordinary explanation instead of bragging.",
    stage:(local:number)=><LockerAction t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
]});
