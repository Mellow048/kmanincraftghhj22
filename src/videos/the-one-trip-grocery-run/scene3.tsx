import { Block, cam, storyScene } from "../../engine";
import { Bread, Can, EggCarton, Fruit, Kid, Load, PaperBag, Sister, timing, move, smooth } from "./kit";
import type {Vec3} from "../../engine";
const START:Vec3=[-1.2,0,1.1], END:Vec3=[1.4,0,1.8];
export const scene3=storyScene(timing,{
 id: "scene3",
 title:"The first load",shots:[
 {cue:"3.heavy",...cam.push({on:[-.2,1.3,1.6],dist:4.8,to:4.4,yaw:17,pitch:12,fov:44}),zone:"kitchen",look:"overworld-day",note:"He stacks heavy bags on both forearms and keeps a straight face while the bread is perched absurdly on his head.",stage:(t)=> <>
  <Kid position={[-.65,0,.3]} arms="hold" face="calm" time={t}/><Load tidy/>
 </>},
 {cue:"3.bread",...cam.push({on:[-.3,1.8,.7],dist:2.8,to:2.3,yaw:-7,pitch:9,fov:37}),zone:"kitchen",look:"overworld-day",note:"Close-up: the loaf balances on the hoodie hood. He does not notice it sliding.",stage:(t)=> <>
  <Kid position={[-.25,0,.5]} face="calm" headPitch={-.1} time={t}/><Bread at={[-.25,2.12,.48]} tilt={.18+Math.sin(t*3)*.14}/>
 </>},
 {cue:"3.hus",...cam.truck({on:[0,1.15,1.2],by:[1.05,0,0],dist:5.2,yaw:12,pitch:12,fov:44}),zone:"kitchen",look:"overworld-day",note:"One complete trial run, broken into three breaths: he walks with the full load; the bags swing out of phase and the cans start to roll.",stage:(t)=> <>
  <Kid position={move(START,END,smooth(t/1.35))} rotationY={.7} animation="walk" arms="hold" animDistance={2*smooth(t/1.35)} time={t} face="brave"/><group position={move(START,END,smooth(t/1.35))}><Load sway={Math.sin(t*8)*.27}/></group>
 </>},
 {cue:"3.swing",...cam.push({on:[.15,.4,1.7],dist:2.9,to:2.4,yaw:34,pitch:26,fov:40}),zone:"kitchen",look:"overworld-day",note:"Three cans tip left; oranges tumble right. The kitchen floor becomes a very small produce avalanche.",stage:(t)=> <>
  <Can at={[-.45,.22,1.3]} tilt={-.8}/><Can at={[-.72,.2,1.65]} tilt={.6}/><Fruit at={[.5,.18,1.6]}/><Fruit at={[.85,.18,1.2]} tint="#dc4d37"/><Fruit at={[1.05,.18,1.7]} tint="#dc4d37"/>
  <Kid position={[-.1,0,.4]} face="surprised" headYaw={.5} time={t}/>
 </>},
 {cue:"3.catch",...cam.orbit({on:[.2,.7,1.4],dist:2.4,yaw:38,yawTo:-14,pitch:24,fov:40,distTo:2.2}),zone:"kitchen",look:"overworld-day",note:"He catches two oranges against the cabinet with his elbows; the cans roll past his shoes untouched.",stage:(t)=> <>
  <Kid position={[-.05,0,.45]} animation="reach" face="worried" time={t}/><Fruit at={[.2,1.0,.98]}/><Fruit at={[.43,.75,1.0]} tint="#dc4d37"/><Can at={[-.55,.2,1.4]} tilt={-.7}/>
 </>},
 {cue:"3.wire",...cam.push({on:[0,1.25,.65],dist:3.5,to:2.85,yaw:-22,pitch:2,fov:40}),zone:"kitchen",look:"overworld-day",note:"A red groove has appeared on each finger where the bag handles bite. He studies the marks as if they were useful data.",stage:(t)=> <>
  <Kid position={[0,0,.42]} animation="lookAround" face="calm" time={t}/><PaperBag at={[-.5,.8,.8]} tint="#b98252"/><PaperBag at={[.5,.8,.8]} tint="#d0a06b"/>
  <Block position={[0,1.02,1.0]} size={[.32,.055,.04]} color="#c65b51"/>
 </>}
]});
