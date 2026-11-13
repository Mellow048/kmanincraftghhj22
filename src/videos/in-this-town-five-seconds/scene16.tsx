import { cam, storyScene } from "../../engine";
import { timing, cue, at, STOP, add, v, phase, smooth, route, lockerMotion, rescueMotion, rescueArrow, counterHero, manMotion, MAN_FREEZE, HERO_FREEZE, ROCK_END, ROCK_START, FIRST_WALL, FIRST_FIRE, FIRST_IMPACT } from "./kit";
import { follow, push } from "./camera";
import { Intro, SchoolDay, Lunch, ChalkLesson, LockerAction } from "./school-actions";
import { MotherStory, GlassDiscovery, TouchDemo, FeedRabbit, MotherChecks } from "./home-actions";
import { RescueAction } from "./rescue-action";
import { ChaseAction, carriedRabbit, rescuedRabbit } from "./chase-action";
import { homeHero, iceAt } from "./chase-motion";

/** Beat 16: Five seconds to move. Camera cuts do not reset the underlying performance. */
export const scene16=storyScene(timing,{
 id:"scene16",title:"Five seconds to move",shots:[
  (()=>{const id="16.stop";return {cue:"16.stop",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:add(ROCK_START,[0,.45,0]),dist:3.6,to:3.3,yaw:-145,pitch:28,fov:50}),
    note:"Show him bend, make contact with the rock and lift it. The bearded man, rabbit, projectiles and drifting dust remain absolutely frozen.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="16.front";return {cue:"16.front",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:(t=>add(v(counterHero(t).position,MAN_FREEZE,.4),[0,1,0]))(cue(id).start),onTo:(t=>add(v(counterHero(t).position,MAN_FREEZE,.4),[0,1,0]))(cue(id).end-1/30),dist:5.2,to:(5.2)-.08,yaw:100,pitch:16,fov:50}), ...follow(id,t=>add(v(counterHero(t).position,MAN_FREEZE,.4),[0,1,0]),5.2,100,16,50),
    note:"Track the full run around the frozen man's side. The path passes outside his body; no cut substitutes for getting in front.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="16.throw";return {cue:"16.throw",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:add(ROCK_END,[0,.46,0]),dist:3.15,to:2.85,yaw:35,pitch:23,fov:49}),
    note:"Despite the historic cue name, this is the approved placement: hand lowers the rock into the path, releases it and visibly withdraws. Nothing is thrown at a face.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="16.side";return {cue:"16.side",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:add(MAN_FREEZE,[.6,1,0.6]),dist:5.4,to:5,yaw:25,pitch:10,fov:50}),
    note:"Keep the frozen man and old projectile lane in frame while the hero takes the entire sidestep out of it.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
]});
