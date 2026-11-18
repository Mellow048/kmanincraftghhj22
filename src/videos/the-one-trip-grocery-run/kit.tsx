import type React from "react";
import { Block, MinecraftAvatar } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { wordClock } from "../../../Topics/Recreation";
import json from "./timing.json";

export const timing = json as Timing;
export const w = wordClock(timing);
export const clamp = (n: number) => Math.max(0, Math.min(1, n));
export const smooth = (n: number) => { const q = clamp(n); return q*q*(3-2*q); };
export const mix = (a: number, b: number, q: number) => a + (b-a)*q;
export const move = (a: Vec3, b: Vec3, q: number): Vec3 => [mix(a[0],b[0],q),mix(a[1],b[1],q),mix(a[2],b[2],q)];

type ActorProps = Partial<MinecraftAvatarProps>;
export const Kid: React.FC<ActorProps> = (props) => <MinecraftAvatar scale={1} outfit="hoodie" skin="#d79b76" hair="#38251c" colors={{torso:"#2469d8",arms:"#2469d8",legs:"#34445f"}} shoes="#edbd36" blink {...props} />;
export const Sister: React.FC<ActorProps> = (props) => <MinecraftAvatar scale={1} outfit="tee" skin="#d9a77f" hair="#55301f" colors={{torso:"#df6a8f",arms:"#df6a8f",legs:"#34445f"}} shoes="#654b3a" blink {...props} />;
export const Neighbor: React.FC<ActorProps> = (props) => <MinecraftAvatar scale={1} outfit="hoodie" skin="#a96f4e" hair="#211d1b" colors={{torso:"#37a28b",arms:"#37a28b",legs:"#443d4e"}} shoes="#34363c" blink {...props} />;

/** Plain grocery sack, built from block geometry. No photo or oversized-ear gag props in this film. */
export const PaperBag: React.FC<{at:Vec3; tint?:string; sway?:number; scale?:number}> = ({at,tint="#b78755",sway=0,scale=1}) => <group position={at} rotation-y={sway} scale={scale}>
  <Block position={[0,.28,0]} size={[.38,.56,.28]} color={tint}/>
  <Block position={[-.09,.64,0]} size={[.045,.18,.045]} color="#725035"/>
  <Block position={[.09,.64,0]} size={[.045,.18,.045]} color="#725035"/>
  <Block position={[0,.54,.151]} size={[.15,.06,.012]} color="#e5d0aa" castShadow={false}/>
</group>;
export const Tote: React.FC<{at:Vec3; tint?:string; sway?:number; scale?:number}> = ({at,tint="#d26d46",sway=0,scale=1}) => <group position={at} rotation-y={sway} scale={scale}>
  <Block position={[0,.27,0]} size={[.49,.52,.32]} color={tint}/>
  <Block position={[-.13,.57,0]} size={[.04,.16,.04]} color="#303943"/>
  <Block position={[.13,.57,0]} size={[.04,.16,.04]} color="#303943"/>
</group>;
export const EggCarton: React.FC<{at:Vec3; open?:number}> = ({at,open=0}) => <group position={at}>
  <Block position={[0,.08,0]} size={[.46,.16,.34]} color="#d7d2bd"/>
  <Block position={[0,.19,-.13]} size={[.46,.09,.07]} color="#aeb9a5" rotation={[open*.75,0,0]}/>
  {[-.13,0,.13].map((x)=>[-.08,.08].map((z)=><Block key={`${x}-${z}`} position={[x,.19,z]} size={[.075,.09,.075]} color="#eee6cd"/>))}
</group>;
export const Can: React.FC<{at:Vec3; tint?:string; tilt?:number}> = ({at,tint="#b83f37",tilt=0}) => <group position={at} rotation-z={tilt}>
  <Block position={[0,.19,0]} size={[.19,.38,.19]} color={tint}/>
  <Block position={[0,.39,0]} size={[.2,.035,.2]} color="#c7c9bd"/>
  <Block position={[0,.2,.101]} size={[.09,.14,.008]} color="#e8d29c" castShadow={false}/>
</group>;
export const Fruit: React.FC<{at:Vec3; tint?:string; size?:number}> = ({at,tint="#e77b27",size=.22}) => <Block position={at} size={[size,size,size]} color={tint}/>;
export const Bread: React.FC<{at:Vec3; tilt?:number}> = ({at,tilt=0}) => <group position={at} rotation-z={tilt}>
  <Block position={[0,.08,0]} size={[.56,.22,.24]} color="#b66d32"/>
  <Block position={[0,.205,0]} size={[.45,.06,.2]} color="#dfad62"/>
</group>;
export const Load: React.FC<{sway?:number; eggs?:boolean; tidy?:boolean}> = ({sway=0,eggs=true,tidy=false}) => <group>
  <PaperBag at={[-.51,1.01,0]} sway={sway} tint="#b98252"/>
  <PaperBag at={[.51,1.01,.02]} sway={-sway*.8} tint="#d0a06b"/>
  <Tote at={[-.48,1.03,.3]} sway={sway*.6}/>
  <Tote at={[.49,1.03,.3]} tint="#4e7690" sway={-sway*.7}/>
  <Bread at={[0,1.5,.22]} tilt={sway*.12}/>
  <Can at={[-.25,1.47,-.08]} tint="#b63e35" tilt={sway*.7}/>
  <Can at={[.25,1.46,-.08]} tint="#538054" tilt={-sway*.7}/>
  {eggs && <EggCarton at={[0,1.46,.56]} open={tidy?0:.04}/>}
</group>;

/** A recognisable compact family car, rear hatch open. Potato remains visible in the trunk from the hook. */
export const Car: React.FC<{potato?:boolean}> = ({potato=true}) => <group>
  <Block position={[0,.68,0]} size={[4.1,.92,2.05]} color="#526b83"/>
  <Block position={[0,1.25,-.1]} size={[2.45,.82,1.65]} color="#465e75"/>
  <Block position={[-.64,1.3,.75]} size={[.9,.52,.035]} color="#a9d0dc" opacity={.82} transparent/>
  <Block position={[.64,1.3,.75]} size={[.9,.52,.035]} color="#a9d0dc" opacity={.82} transparent/>
  {[-1,1].map((x)=>[-.63,.63].map((z)=><group key={`${x}-${z}`} position={[x*1.48,.31,z*1.17]}>
    <Block size={[.72,.55,.18]} color="#252a30"/><Block position={[0,0,.1]} size={[.22,.22,.02]} color="#7d8790"/>
  </group>))}
  <Block position={[0,1.25,1.13]} size={[1.8,.11,.06]} color="#374552"/>
  {potato && <Block position={[1.2,.94,.28]} size={[.2,.12,.15]} color="#987047"/>}
  <Block position={[0,.5,1.23]} size={[2.7,.76,.09]} color="#293644"/>
  <Block position={[0,1.13,1.16]} size={[2.7,.09,.12]} color="#33495b"/>
</group>;

export const Doorbell: React.FC<{at?:Vec3; lit?:boolean}> = ({at=[1.45,1.2,-2.9],lit=false}) => <group position={at}>
  <Block size={[.18,.42,.12]} color="#363b3e"/><Block position={[0,.02,.07]} size={[.095,.095,.025]} color={lit?"#f4d35e":"#d6d3c8"} emissive={lit?"#f4d35e":undefined} emissiveIntensity={lit?1:0}/>
</group>;
