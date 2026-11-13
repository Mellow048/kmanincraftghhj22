import { cam, storyScene } from "../../engine";
import { timing, cue, at, STOP, add, v, phase, smooth, route, lockerMotion, rescueMotion, rescueArrow, counterHero, manMotion, MAN_FREEZE, HERO_FREEZE, ROCK_END, ROCK_START, FIRST_WALL } from "./kit";
import { follow, push } from "./camera";
import { Intro, SchoolDay, Lunch, ChalkLesson, LockerAction } from "./school-actions";
import { MotherStory, GlassDiscovery, TouchDemo, FeedRabbit, MotherChecks } from "./home-actions";
import { RescueAction } from "./rescue-action";
import { ChaseAction, carriedRabbit, rescuedRabbit } from "./chase-action";

/** Beat 18: The prince of our village. Camera cuts do not reset the underlying performance. */
export const scene18=storyScene(timing,{
 id:"scene18",title:"The prince of our village",shots:[
  (()=>{const id="18.look";return {cue:"18.look",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:(t=>add(manMotion(t).position,[0,.85,0]))(cue(id).start),onTo:(t=>add(manMotion(t).position,[0,.85,0]))(cue(id).end-1/30),dist:3.5,to:(3.5)-.08,yaw:-90,pitch:15,fov:48}), ...follow(id,t=>add(manMotion(t).position,[0,.85,0]),3.5,-90,15,48),
    note:"The man rubs his head, then raises his body from his back onto one knee. Keep the whole recovery in view before the recognition close-up.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="18.home";return {cue:"18.home",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:[-5,1.47,-1.82],dist:2.7,to:2.35,yaw:65,pitch:4,fov:41}),
    note:"Mother is still in their own warm doorway, watching down the same road. Her reaction pays off the curtains and lock.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="18.power";return {cue:"18.power",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:(t=>add(manMotion(t).position,[0,1.1,0]))(cue(id).start),onTo:(t=>add(manMotion(t).position,[0,1.1,0]))(cue(id).end-1/30),dist:2.45,to:(2.45)-.08,yaw:18,pitch:4,fov:39}), ...follow(id,t=>add(manMotion(t).position,[0,1.1,0]),2.45,18,4,39),
    note:"Now kneeling toward the boy, the beard is clear as he recognizes a time-stop ability. No new magic is added.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="18.found";return {cue:"18.found",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:(t=>add(counterHero(t).position,[0,1.46,0]))(cue(id).start),onTo:(t=>add(counterHero(t).position,[0,1.46,0]))(cue(id).end-1/30),dist:2.05,to:(2.05)-.08,yaw:100,pitch:4,fov:39}), ...follow(id,t=>add(counterHero(t).position,[0,1.46,0]),2.05,100,4,39),
    note:"The child's eyes register that he has been sought, with the rescued rabbit still in his hands.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="18.prince";return {cue:"18.prince",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:(t=>add(counterHero(t).position,[0,1.37,.08]))(cue(id).start),onTo:(t=>add(counterHero(t).position,[0,1.37,.08]))(cue(id).end-1/30),dist:2.25,to:(2.25)-.08,yaw:100,pitch:4,fov:40}), ...follow(id,t=>add(counterHero(t).position,[0,1.37,.08]),2.25,100,4,40),
    note:"The prince line lands on the boy's stunned face. Hold the small reaction, then hard black; no subscribe sign, sequel promise or added spoken line.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
]});
