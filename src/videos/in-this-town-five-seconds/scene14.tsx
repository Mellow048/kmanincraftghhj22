import { cam, storyScene } from "../../engine";
import { timing, cue, at, STOP, add, v, phase, smooth, route, lockerMotion, rescueMotion, rescueArrow, counterHero, manMotion, MAN_FREEZE, HERO_FREEZE, ROCK_END, ROCK_START, FIRST_WALL } from "./kit";
import { follow, push } from "./camera";
import { Intro, SchoolDay, Lunch, ChalkLesson, LockerAction } from "./school-actions";
import { MotherStory, GlassDiscovery, TouchDemo, FeedRabbit, MotherChecks } from "./home-actions";
import { RescueAction } from "./rescue-action";
import { ChaseAction, carriedRabbit, rescuedRabbit } from "./chase-action";

/** Beat 14: I could not leave it. Camera cuts do not reset the underlying performance. */
export const scene14=storyScene(timing,{
 id:"scene14",title:"I could not leave it",shots:[
  (()=>{const id="14.ear";return {cue:"14.ear",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:(t=>add(carriedRabbit(t),[0,.38,.15]))(cue(id).start),onTo:(t=>add(carriedRabbit(t),[0,.38,.15]))(cue(id).end-1/30),dist:1.7,to:(1.7)-.08,yaw:10,pitch:7,fov:39}), ...follow(id,t=>add(carriedRabbit(t),[0,.38,.15]),1.7,10,7,39),
    note:"A close look at the same black ear and twitching nose, held above the man's supporting forearm.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="14.out";return {cue:"14.out",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:[-4.5,1.05,-1.3],dist:5.7,to:5,yaw:15,pitch:9,fov:48}),
    note:"Keep the real doorway and path together: he runs across the room, through the opening and down onto the street before calling out.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="14.saw";return {cue:"14.saw",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:[2.1,1.55,1.2],dist:1.9,to:1.65,yaw:-25,pitch:3,fov:38}),
    note:"The bearded man turns his eyes toward the shout. Recognition is withheld; he chooses to run.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="14.run";return {cue:"14.run",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:(t=>add(manMotion(t).position,[0,1.05,0]))(cue(id).start),onTo:(t=>add(manMotion(t).position,[0,1.05,0]))(cue(id).end-1/30),dist:3.8,to:(3.8)-.08,yaw:65,pitch:7,fov:46}), ...follow(id,t=>add(manMotion(t).position,[0,1.05,0]),3.8,65,7,46),
    note:"The rabbit stays cradled under one arm as the man plants his first step and accelerates east.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="14.follow";return {cue:"14.follow",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:(t=>add(v(counterHero(t).position,manMotion(t).position,.55),[0,1,0]))(cue(id).start),onTo:(t=>add(v(counterHero(t).position,manMotion(t).position,.55),[0,1,0]))(cue(id).end-1/30),dist:6.5,to:(6.5)-.08,yaw:60,pitch:9,fov:50}), ...follow(id,t=>add(v(counterHero(t).position,manMotion(t).position,.55),[0,1,0]),6.5,60,9,50),
    note:"Both runners pass the same gateposts in one geography. Their actual traveled distance drives the strides.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="14.secret";return {cue:"14.secret",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:(t=>add(counterHero(t).position,[0,1.46,0]))(cue(id).start),onTo:(t=>add(counterHero(t).position,[0,1.46,0]))(cue(id).end-1/30),dist:2.0,to:(2.0)-.08,yaw:100,pitch:4,fov:40}), ...follow(id,t=>add(counterHero(t).position,[0,1.46,0]),2.0,100,4,40),
    note:"Track beside his face while he runs. The worry is being discovered, not an invented cooldown.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
  (()=>{const id="14.stay";return {cue:"14.stay",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:(t=>add(carriedRabbit(t),[0,.36,.12]))(cue(id).start),onTo:(t=>add(carriedRabbit(t),[0,.36,.12]))(cue(id).end-1/30),dist:1.85,to:(1.85)-.08,yaw:80,pitch:5,fov:40}), ...follow(id,t=>add(carriedRabbit(t),[0,.36,.12]),1.85,80,5,40),
    note:"The small living nose under the white arm supplies his answer. Keep the chase moving behind it.",
    stage:(local:number)=><ChaseAction t={Math.round((cue(id).start+local)*30)/30} id={id}/>,
  };})(),
]});
