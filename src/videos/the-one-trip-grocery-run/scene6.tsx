import { Block, cam, storyScene } from "../../engine";
import { Doorbell, Kid, Load, Neighbor, timing, smooth } from "./kit";
import {move} from "./kit";
import type {Vec3} from "../../engine";
const A:Vec3=[-2.5,0,1.6], B:Vec3=[.45,0,-.8];
export const scene6=storyScene(timing,{
 id: "scene6",
 title:"A real test",shots:[
 {cue:"6.neighbor",...cam.push({on:[0,1.35,-.7],dist:6,to:5.4,yaw:6,pitch:8,fov:46}),zone:"hall",look:"overworld-day",note:"A neighbour arrives at the apartment buzzer with both arms full; the button is just beyond the nearest bag.",stage:(t)=> <>
  <Neighbor position={[-1.55,0,1.5]} arms="hold" animation="idle" face="worried" time={t}/><Load sway={.03}/><Doorbell at={[1.45,1.35,-5.38]}/>
 </>},
 {cue:"6.load",...cam.orbit({on:[-.2,1.1,.7],dist:3.8,yaw:19,yawTo:-11,pitch:13,fov:42,distTo:3.55}),zone:"hall",look:"overworld-day",note:"The neighbour's groceries are an absurd combination: cans, two paper bags and a square watermelon.",stage:(t)=> <>
  <Neighbor position={[-.6,0,1.15]} face="uneasy" time={t}/><Block position={[-.55,1.05,.85]} size={[.28,.28,.28]} color="#568f49"/><Block position={[-.9,.23,.8]} size={[.18,.36,.18]} color="#b63e35"/><Block position={[-.2,.23,.8]} size={[.18,.36,.18]} color="#538054"/>
 </>},
 {cue:"6.test",...cam.push({on:[-.5,1.3,1],dist:3.4,to:3.0,yaw:-13,pitch:4,fov:40}),zone:"hall",look:"overworld-day",note:"She eyes the buzzer; he looks at the load. The whole thing is an invitation he takes literally.",stage:(t)=> <>
  <Neighbor position={[-1.3,0,1.5]} face="worried" headYaw={.25} time={t}/><Kid position={[.4,0,1.25]} face="brave" time={t}/><Doorbell at={[1.45,1.35,-5.38]}/>
 </>},
 {cue:"6.hus",...cam.truck({on:[0,1.1,.2],by:[.9,0,-1.5],dist:6.2,yaw:8,pitch:10,fov:46}),zone:"hall",look:"overworld-day",note:"He takes the complete load and carries it from the lobby to the buzzer. Each HUS breath marks a footstep; the load stays balanced.",stage:(t)=> <>
  <Kid position={move(A,B,smooth(t/1.45))} rotationY={-.55} animation="walk" arms="hold" animDistance={3*smooth(t/1.45)} time={t} face="calm"/><group position={move(A,B,smooth(t/1.45))}><Load sway={Math.sin(t*7)*.035} tidy/></group>
 </>},
 {cue:"6.bags",...cam.push({on:[-.1,1.35,-1.3],dist:4.1,to:3.55,yaw:15,pitch:8,fov:42}),zone:"hall",look:"overworld-day",note:"The full load reaches the landing. The neighbour has both hands free and is already turning toward the door.",stage:(t)=> <>
  <Kid position={[.2,0,-.3]} arms="hold" face="calm" time={t}/><Neighbor position={[-1.1,0,.35]} face="smile" time={t}/><Load tidy/>
 </>},
 {cue:"6.elbow",...cam.push({on:[1.12,1.28,-4.7],dist:2.5,to:1.95,yaw:3,pitch:4,fov:36}),zone:"hall",look:"overworld-day",note:"Close-up: his elbow presses the buzzer because his hands still hold the last bag. The button lights.",stage:(t)=> <>
  <Doorbell at={[1.45,1.35,-5.38]} lit={smooth(t/.3)>.5}/><Kid position={[.1,0,-2.2]} animation="reach" arms="hold" face="calm" time={t}/><Load/>
 </>},
 {cue:"6.door",...cam.push({on:[0,1.3,-3.8],dist:4.2,to:3.6,yaw:-10,pitch:5,fov:41}),zone:"hall",look:"overworld-day",note:"The door opens. The neighbour carries her things inside, leaving him with the very still, pleased look of a successful test.",stage:(t)=> <>
  <Neighbor position={[-.3,0,-1.7]} animation="walk" animDistance={.7*smooth(t)} plantFeet face="smile" time={t}/><Kid position={[.55,0,.3]} face="calm" time={t}/><Block position={[0,1.2,-5.59]} size={[1.76,2.12,.05]} color="#955b3e" rotation-y={-.35*smooth(t/.35)}/>
 </>}
]});
