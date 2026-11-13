import { cam, around, storyScene } from "../../engine";
import { timing, cue, at, STOP, add, v, phase, smooth, route, lockerMotion, rescueMotion, rescueArrow, counterHero, manMotion, MAN_FREEZE, HERO_FREEZE, ROCK_END, ROCK_START, FIRST_WALL, FIRST_FIRE, FIRST_IMPACT, LAND } from "./kit";
import { follow, push } from "./camera";
import { Intro, SchoolDay, Lunch, ChalkLesson, LockerAction } from "./school-actions";
import { MotherStory, GlassDiscovery, TouchDemo, FeedRabbit, MotherChecks } from "./home-actions";
import { RescueAction } from "./rescue-action";
import { ChaseAction, carriedRabbit, rescuedRabbit } from "./chase-action";
import { homeHero, iceAt, rabbitAt } from "./chase-motion";

/** Beat 10: The arrow left first. Camera cuts do not reset the underlying performance. */
export const scene10=storyScene(timing,{
 id:"scene10",title:"The arrow left first",shots:[
  (()=>{const id="10.night";return {cue:"10.night",zone:"street",look:"overworld-night" as const,
    ...cam.push({on:(t=>add(rescueMotion(t).hero.position,[0,1.3,0]))(cue(id).start),onTo:(t=>add(rescueMotion(t).hero.position,[0,1.3,0]))(cue(id).end-1/30),dist:3.7,to:(3.7)-.08,yaw:0,pitch:6,fov:44}), ...follow(id,t=>add(rescueMotion(t).hero.position,[0,1.3,0]),3.7,0,6,44),
    note:"Warm doorway against the blue street. He hears the shout and steps out toward the neighbor, not straight into a new danger pose.",
    stage:(local:number)=><RescueAction t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="10.neighbor";return {cue:"10.neighbor",zone:"rescue",look:"overworld-night" as const,
    ...cam.push({on:[0,.4,-.85],dist:4.6,to:4.3,yaw:35,pitch:48,fov:50}),
    note:"The old villager has fallen immediately outside the open threshold; show the small real distance to safety.",
    stage:(local:number)=><RescueAction t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="10.mobs";return {cue:"10.mobs",zone:"rescue",look:"overworld-night" as const,
    ...cam.push({on:[0,1.2,3.45],dist:4.1,to:3.7,yaw:180,pitch:5,fov:50}),
    note:"The existing two zombie models come through the gate, one a little behind the other. Their full bodies advance with distance-driven feet.",
    stage:(local:number)=><RescueAction t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="10.bow";return {cue:"10.bow",zone:"rescue",look:"overworld-night" as const,
    ...cam.push({on:[-.12,1.15,8.25],dist:3.6,to:3.35,yaw:170,pitch:5,fov:46}),
    note:"Behind them, the existing skeleton raises and draws its bow. Leave space in front of the arrowhead for the flight.",
    stage:(local:number)=><RescueAction t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
  (()=>{const id="10.arrow";return {cue:"10.arrow",zone:"rescue",look:"overworld-night" as const,
    ...({
    from:[1.4,1.9,8.0],
    to:[1.2,1.75,7.7],
    target:[0,.8,-.75],fov:44,ease:'linear' as const}),
    note:"A side-long view down the lane shows the red-shirted runner and the arrow's fast travel toward the old man's chest.",
    stage:(local:number)=><RescueAction t={Math.round((cue(id).start+local)*30)/30}/>,
  };})(),
]});
