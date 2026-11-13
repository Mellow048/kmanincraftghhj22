import { cam, storyScene } from "../../engine";
import { timing, cue, at, STOP, add, v, phase, smooth, route, lockerMotion, rescueMotion, rescueArrow, counterHero, manMotion, MAN_FREEZE, HERO_FREEZE, ROCK_END, ROCK_START, FIRST_WALL, FIRST_FIRE, FIRST_IMPACT } from "./kit";
import { follow, push } from "./camera";
import { Intro, SchoolDay, Lunch, ChalkLesson, LockerAction } from "./school-actions";
import { MotherStory, GlassDiscovery, TouchDemo, FeedRabbit, MotherChecks } from "./home-actions";
import { RescueAction } from "./rescue-action";
import { ChaseAction, carriedRabbit, rescuedRabbit } from "./chase-action";
import { homeHero, iceAt } from "./chase-motion";

/** Beat 15: Remember the chalk. Camera cuts do not reset the underlying performance. */
export const scene15=storyScene(timing,{
 id:"scene15",title:"Remember the chalk",shots:[
  (()=>{const id="15.hand";return {cue:"15.hand",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:(t=>add(manMotion(t).position,[0,1.25,0]))(cue(id).start),onTo:(t=>add(manMotion(t).position,[0,1.25,0]))(cue(id).end-1/30),dist:3.1,to:(3.1)-.08,yaw:125,pitch:7,fov:44}), ...follow(id,t=>add(manMotion(t).position,[0,1.25,0]),3.1,125,7,44),
    note:"Side/rear three-quarter: see the free arm wind up while the other continues to support the rabbit.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="15.blocks";return {cue:"15.blocks",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:(t=>t<FIRST_FIRE?add(manMotion(t).position,[0,1.05,0]):t<FIRST_IMPACT?iceAt(t,0):FIRST_WALL)(cue(id).start),onTo:(t=>t<FIRST_FIRE?add(manMotion(t).position,[0,1.05,0]):t<FIRST_IMPACT?iceAt(t,0):FIRST_WALL)(cue(id).end-1/30),dist:4.6,to:(4.6)-.08,yaw:35,pitch:12,fov:51}), ...follow(id,t=>t<FIRST_FIRE?add(manMotion(t).position,[0,1.05,0]):t<FIRST_IMPACT?iceAt(t,0):FIRST_WALL,4.6,35,12,51),
    note:"The first ice block crosses the path at speed, with the white arm, red pursuer and stone wall all spatially connected.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="15.wall";return {cue:"15.wall",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:FIRST_WALL,dist:3.7,to:3.3,yaw:18,pitch:10,fov:46}),
    note:"Reveal the real hole punched through the wall, with stone and ice fragments still dropping. Do not merely hide the intact wall.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="15.close";return {cue:"15.close",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:(t=>add(counterHero(t).position,[.4,1.25,0]))(cue(id).start),onTo:(t=>add(counterHero(t).position,[.4,1.25,0]))(cue(id).end-1/30),dist:3.2,to:(3.2)-.08,yaw:35,pitch:13,fov:48}), ...follow(id,t=>add(counterHero(t).position,[.4,1.25,0]),3.2,35,13,48),
    note:"Come close to the approaching second ice block and the hero; the loose rock is already on the ground beside his route.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="15.chalk";return {cue:"15.chalk",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:(t=>add(counterHero(t).position,[.1,1.46,0]))(cue(id).start),onTo:(t=>add(counterHero(t).position,[.1,1.46,0]))(cue(id).end-1/30),dist:1.9,to:(1.9)-.08,yaw:65,pitch:3,fov:40}), ...follow(id,t=>add(counterHero(t).position,[.1,1.46,0]),1.9,65,3,40),
    note:"Match the earlier nose-and-chalk framing with ice. He remembers before acting; the second and third blocks freeze on the shared clock, not in slow motion.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
]});
