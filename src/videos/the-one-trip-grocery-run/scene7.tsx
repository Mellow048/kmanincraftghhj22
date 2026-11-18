import { Block, cam, storyScene } from "../../engine";
import { Car, Kid, Load, PaperBag, Sister, timing, smooth, move } from "./kit";
import type {Vec3} from "../../engine";
const FROM:Vec3=[-1.7,0,1.7], TO:Vec3=[1.1,0,2.8];
export const scene7=storyScene(timing,{
 id: "scene7",
 title:"One left",shots:[
 {cue:"7.ours",...cam.push({on:[0,1.25,2.1],dist:6.3,to:5.6,yaw:7,pitch:8,fov:45}),zone:"driveway",look:"overworld-sunset",note:"Match the opening: the kid brings the family groceries to the kitchen in one complete carry, still composed.",stage:(t)=> <>
  <Kid position={move(FROM,TO,smooth(t/1.15))} rotationY={-.15} animation="walk" arms="hold" animDistance={2*smooth(t/1.15)} face="calm" time={t}/><group position={move(FROM,TO,smooth(t/1.15))}><Load tidy sway={.025}/></group>
 </>},
 {cue:"7.trunk",...cam.truck({on:[0,1.1,-.2],by:[1.1,0,0],dist:5.8,yaw:-12,pitch:9,fov:44}),zone:"driveway",look:"overworld-sunset",note:"His sister checks the trunk. All the bags are gone, and the blue car looks empty.",stage:(t)=> <>
  <Car potato={false}/><Sister position={[-1.6,0,1.2]} animation="reach" face="calm" time={t}/>
 </>},
 {cue:"7.empty",...cam.push({on:[1.1,1.12,.35],dist:2.8,to:2.2,yaw:22,pitch:18,fov:37}),zone:"driveway",look:"overworld-sunset",note:"She lifts the dark trunk blanket. The potato appears at the back corner; repeat the opening's trunk angle.",stage:(t)=> <>
  <Block position={[1.2,.92,.25]} size={[.95,.05,.58]} color="#313e49" rotation-x={-.65*smooth(t/.35)}/><Block position={[1.05,.88,.55]} size={[.2,.12,.15]} color="#987047"/>
 </>},
 {cue:"7.potato",...cam.orbit({on:[1.1,1.0,.45],dist:2.2,yaw:25,yawTo:-5,pitch:11,fov:37,distTo:1.9}),zone:"driveway",look:"overworld-sunset",note:"A small potato, alone in a cavern of empty trunk. His sister points. He looks at it as if it were a missed deadline.",stage:(t)=> <>
  <Block position={[1.05,.9,.5]} size={[.22,.13,.18]} color="#987047"/><Sister position={[-.5,0,1.15]} animation="point" face="uneasy" time={t}/><Kid position={[.7,0,1.3]} face="uneasy" time={t}/>
 </>},
 {cue:"7.back",...cam.push({on:[.5,1.2,1.5],dist:4,to:3.4,yaw:9,pitch:5,fov:42}),zone:"driveway",look:"overworld-sunset",note:"He turns back toward the trunk. The blue hoodie disappears from the house door side; one item means one more trip.",stage:(t)=> <>
  <Kid position={[.65,0,1.2]} rotationY={Math.PI} animation="walk" animDistance={.45*smooth(t/.4)} time={t} face="calm"/><Sister position={[-.4,0,1.5]} face="calm" time={t}/>
 </>},
 {cue:"7.hus",...cam.truck({on:[0,1.1,1.3],by:[.55,0,.35],dist:5.3,yaw:3,pitch:9,fov:43}),zone:"driveway",look:"overworld-sunset",note:"Final button, not a montage: he brings one potato in both hands as solemnly as the whole grocery mountain, breathing HUS on each step. Cut on the carry.",stage:(t)=> <>
  <Kid position={[-.4+1.1*smooth(t/1.15),0,1.3+.4*smooth(t/1.15)]} animation="walk" arms="hold" animDistance={1.2*smooth(t/1.15)} face="calm" time={t}/><Block position={[-.1+1.1*smooth(t/1.15),1.02,1.57]} size={[.2,.12,.16]} color="#987047"/>
 </>}
]});
