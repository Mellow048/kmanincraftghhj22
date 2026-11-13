import { cam, around, storyScene } from "../../engine";
import { timing, cue, at, STOP, add, v, phase, smooth, route, lockerMotion, rescueMotion, rescueArrow, counterHero, manMotion, MAN_FREEZE, HERO_FREEZE, ROCK_END, ROCK_START, FIRST_WALL, FIRST_FIRE, FIRST_IMPACT, LAND } from "./kit";
import { follow, push } from "./camera";
import { Intro, SchoolDay, Lunch, ChalkLesson, LockerAction } from "./school-actions";
import { MotherStory, GlassDiscovery, TouchDemo, FeedRabbit, MotherChecks } from "./home-actions";
import { RescueAction } from "./rescue-action";
import { ChaseAction, carriedRabbit, rescuedRabbit } from "./chase-action";
import { homeHero, iceAt, rabbitAt } from "./chase-motion";

/** Beat 1: Five seconds, and nobody knows. Camera cuts do not reset the underlying performance. */
export const scene1=storyScene(timing,{
 id:"scene1",title:"Five seconds, and nobody knows",shots:[
  (()=>{const id="1.town";return {cue:"1.town",zone:"class",look:"overworld-day" as const,
    ...cam.push({on:[1.15,1.35,.65],dist:3.2,to:2.8,yaw:0,pitch:5,fov:46}),
    note:"Start inside the stopped classroom: chalk and a book hang still while the red-shirted teenager walks between them. Not a title card.",
    stage:(local:number)=><Intro t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="1.me";return {cue:"1.me",zone:"class",look:"overworld-day" as const,
    ...cam.push({on:[1.2,1.4,1.1],dist:1.9,to:1.65,yaw:5,pitch:3,fov:38}),
    note:"Move around his living eyes against the completely frozen teacher and classmates; the world clock, not just their legs, is held.",
    stage:(local:number)=><Intro t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="1.secret";return {cue:"1.secret",zone:"class",look:"overworld-day" as const,
    ...cam.push({on:[.6,1.2,1.5],dist:4.4,to:4,yaw:165,pitch:6,fov:52}),
    note:"Widen enough to show him quietly passing the suspended book and returning beside his own seat.",
    stage:(local:number)=><Intro t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="1.friend";return {cue:"1.friend",zone:"class",look:"overworld-day" as const,
    ...cam.push({on:[-2.4,1.28,1.25],dist:1.9,to:1.65,yaw:175,pitch:5,fov:38}),
    note:"His villager friend, still unaware. At precisely frame 150 the tiny idle movements return; the boy has not been seen using the power.",
    stage:(local:number)=><Intro t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
]});
