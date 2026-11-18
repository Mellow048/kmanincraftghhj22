import { Block, cam, storyScene } from "../../engine";
import { EggCarton, Kid, Load, Sister, timing, smooth } from "./kit";
export const scene4=storyScene(timing,{
 id: "scene4",
 title:"The door test",shots:[
 {cue:"4.door",...cam.push({on:[0,1.35,-.1],dist:4.5,to:4.1,yaw:17,pitch:7,fov:43}),zone:"kitchen",look:"overworld-day",note:"Both hands full, he leans a foot into the kitchen door to open it without releasing a bag.",stage:(t)=> <>
  <Kid position={[-.6,0,.35]} rotationY={-.45} animation="push" arms="hold" face="calm" time={t}/><Load sway={.05}/>
  <Block position={[1.5,1.2,-1.35]} size={[1.8,2.4,.12]} color="#915b3d" rotation-y={-.5*smooth(t/.4)}/>
 </>},
 {cue:"4.hus",...cam.orbit({on:[.2,1.05,.4],dist:4.3,yaw:9,yawTo:28,pitch:13,fov:44,distTo:3.9}),zone:"kitchen",look:"overworld-day",note:"The load advances through the doorway on three breaths. The shoe nudges the door wider; the egg carton begins to flex.",stage:(t)=> <>
  <Kid position={[-.45+1.2*smooth(t/1.3),0,.2+1*smooth(t/1.3)]} rotationY={-.3} animation="walk" arms="hold" animDistance={1.6*smooth(t/1.3)} time={t} face="brave"/><Load sway={Math.sin(t*9)*.2}/>
  <Block position={[1.5,1.2,-1.35]} size={[1.8,2.4,.12]} color="#915b3d" rotation-y={-.6}/>
 </>},
 {cue:"4.open",...cam.push({on:[.2,1.25,.5],dist:3.0,to:2.45,yaw:25,pitch:14,fov:39}),zone:"kitchen",look:"overworld-day",note:"The door is open. So is the egg carton, with one pale egg rolling out like a tiny white marble.",stage:(t)=> <>
  <Kid position={[.6,0,1.1]} face="surprised" headYaw={.3} time={t}/><EggCarton at={[.2,1.25,1.0]} open={smooth(t/.5)}/><Block position={[.48,.12,1.08]} size={[.12,.12,.12]} color="#eee6cd"/>
 </>},
 {cue:"4.sis",...cam.push({on:[-.8,1.35,.75],dist:3.3,to:2.8,yaw:-19,pitch:3,fov:39}),zone:"kitchen",look:"overworld-day",note:"His sister points to the egg carton, then looks at the single egg in his shoe. Her expression is kinder than the advice.",stage:(t)=> <>
  <Sister position={[-.95,0,.75]} animation="point" face="uneasy" time={t}/><Kid position={[.35,0,.65]} face="uneasy" time={t}/><EggCarton at={[.2,.05,1.2]}/>
 </>},
 {cue:"4.shoe",...cam.push({on:[.1,.33,1.2],dist:2.1,to:1.75,yaw:12,pitch:26,fov:37}),zone:"kitchen",look:"overworld-day",note:"Next morning. The egg rolls out of one blue shoe and stops beside the other. He watches it in silence.",stage:(t)=> <>
  <Block position={[-.25,.12,1.1]} size={[.35,.18,.48]} color="#edbd36"/><Block position={[.28,.12,1.1]} size={[.35,.18,.48]} color="#edbd36"/><Block position={[.18,.11,1.4]} size={[.12,.12,.12]} color="#eee6cd"/>
 </>}
]});
