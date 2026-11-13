import type React from "react";
import { Quaternion, Vector3 } from "three";
import { Block, Vox, PixelText, useFilmTime } from "../../src/engine";
import type { Vec3 } from "../../src/engine";

/** Additive, reusable parts introduced by Five Seconds. Existing pack parts are untouched. */
type Prop = { position?: Vec3; rotationY?: number; scale?: number };

/** A small Minecraft rabbit. Feet at the origin, nose toward +Z. The black ear is a silhouette, not a decal. */
export const Rabbit: React.FC<Prop & { blackEar?: boolean; hop?: number; frost?: number; twitch?: boolean }> = ({ position = [0,0,0], rotationY = 0, scale = 1, blackEar = true, hop = 0, frost = 0, twitch = true }) => {
  const t = useFilmTime();
  const sniff = twitch ? Math.sin(t * 17) * 0.009 : 0;
  return <group position={position} rotation={[0,rotationY,0]} scale={scale}>
    <group position={[0,hop,0]}>
      <Block position={[0,0.24,-0.05]} size={[0.34,0.32,0.48]} color="#e6dfd2" />
      <Block position={[0,0.4,0.2]} size={[0.29,0.29,0.28]} color="#f1eadb" />
      <Block position={[0,0.31,0.355+sniff]} size={[0.07,0.06,0.045]} color="#bc8380" />
      {[-1,1].map(s => <group key={s}>
        <Block position={[s*0.103,0.44,0.345]} size={[0.055,0.07,0.018]} color="#241c1c" />
        <Block position={[s*0.116,0.46,0.356]} size={[0.018,0.021,0.008]} color="#ffffff" castShadow={false}/>
        <group position={[s*0.088,0.54,0.15]} rotation={[-0.1+(twitch?Math.sin(t*2+s)*0.035:0),0,s*0.14]}>
          <Block position={[0,0.18,0]} size={[0.095,0.38,0.1]} color={blackEar&&s===-1?"#29272e":"#e6dfd2"}/>
          <Block position={[0,0.19,0.054]} size={[0.04,0.26,0.015]} color={blackEar&&s===-1?"#55505c":"#c79c96"}/>
        </group>
        <Block position={[s*0.145,0.07,-0.16]} size={[0.14,0.14,0.29]} color="#ddd4c6"/>
        <Block position={[s*0.1,0.06,0.19]} size={[0.09,0.12,0.17]} color="#eee5d6"/>
      </group>)}
      <Block position={[0,0.3,-0.32]} size={[0.16,0.17,0.14]} color="#f6efe1" />
    </group>
    {frost>0 ? <group scale={[1,frost,1]}>
      <Block position={[0,0.08,0.0]} size={[0.48,0.15,0.56]} color="#81d6ed" opacity={0.72}/>
      {[-1,1].map(s=><Block key={s} position={[s*0.22,0.12,0.04]} size={[0.1,0.24,0.16]} rotation={[0,0,s*0.25]} color="#c2f3ff" opacity={0.85}/>)}
    </group> : null}
  </group>;
};

export const Book: React.FC<Prop & { open?: boolean; color?: string }> = ({position=[0,0,0],rotationY=0,scale=1,open=false,color="#a5643d"}) => <group position={position} rotation={[0,rotationY,0]} scale={scale}>
  <Block size={[open?0.56:0.3,0.065,0.34]} color="#eee8d4"/>
  {[-1,1].map(s=><Block key={s} position={[0,s*0.039,0]} size={[open?0.59:0.33,0.018,0.37]} color={color}/>)}
  <Block position={[open?0:-0.16,0,0]} size={[0.035,0.09,0.37]} color="#7c4b35"/>
  {open ? [-1,1].flatMap(s=>[0,1,2].map(i=><Block key={`${s}-${i}`} position={[s*0.15,0.05,-0.08+i*0.07]} size={[0.17,0.008,0.013]} color="#656151" castShadow={false}/>)) : <Block position={[0,0.052,0]} size={[0.12,0.008,0.17]} color="#d8be7c" castShadow={false}/>}
</group>;

export const Rock: React.FC<Prop> = ({position=[0,0,0],rotationY=0,scale=1}) => <group position={position} rotation={[0,rotationY,0]} scale={scale}>
  <Vox kind="stone" position={[0,0.1,0]} size={[0.28,0.2,0.24]}/>
  <Vox kind="stone" tint="#8a9295" position={[0.035,0.22,0.01]} size={[0.2,0.08,0.18]}/>
  <Block position={[-0.06,0.27,0.02]} size={[0.06,0.02,0.1]} color="#b2b9ba"/>
</group>;
export const IceCube: React.FC<Prop & { size?: number }> = ({position=[0,0,0],rotationY=0,scale=1,size=0.38}) => <group position={position} rotation={[0,rotationY,0]} scale={scale}>
  <Block size={[size,size,size]} color="#74bedb" opacity={0.86} roughness={0.2} />
  <Block position={[0,0,size*0.505]} size={[size*.76,size*.78,0.012]} color="#b4f0ff" opacity={0.6} />
  <Block position={[-size*.13,size*.1,size*.53]} size={[size*.1,size*.59,0.01]} rotation={[0,0,-0.6]} color="#e2fbff" />
  <Block position={[size*.1,-size*.05,size*.53]} size={[size*.4,size*.08,0.01]} rotation={[0,0,-0.55]} color="#d1f6ff" />
</group>;
export const GlassCup: React.FC<Prop & { water?: boolean }> = ({position=[0,0,0],rotationY=0,scale=1,water=true}) => <group position={position} rotation={[0,rotationY,0]} scale={scale}>
  <Block position={[0,0.02,0]} size={[0.21,0.04,0.21]} color="#d3edf6" opacity={0.55}/>
  {[-1,1].map(s=><group key={s}>
    <Block position={[s*.11,.16,0]} size={[.022,.3,.23]} color="#c1e5ed" opacity={0.4}/>
    <Block position={[0,.16,s*.11]} size={[.23,.3,.022]} color="#c1e5ed" opacity={0.4}/>
  </group>)}
  {water?<Block position={[0,.14,0]} size={[.19,.22,.19]} color="#589fcc" opacity={0.7}/>:null}
</group>;
export const Bowl: React.FC<Prop> = ({position=[0,0,0],rotationY=0,scale=1}) => <group position={position} rotation={[0,rotationY,0]} scale={scale}>
  <Block position={[0,.02,0]} size={[.36,.06,.36]} color="#8cb9be"/>
  {[-1,1].map(s=><group key={s}><Block position={[s*.2,.1,0]} size={[.05,.2,.45]} color="#bed3cc"/><Block position={[0,.1,s*.2]} size={[.45,.2,.05]} color="#bed3cc"/></group>)}
</group>;
/** Arrow points along -Z (from the gate toward a north-facing doorway). */
export const Arrow: React.FC<Prop> = ({position=[0,0,0],rotationY=0,scale=1}) => <group position={position} rotation={[0,rotationY,0]} scale={scale}>
  <Block size={[.035,.035,.65]} color="#c5a16c"/>
  <Block position={[0,0,-.36]} size={[.10,.08,.13]} rotation={[0,0,Math.PI/4]} color="#cbd4d6"/>
  {[-1,1].map(s=><Block key={s} position={[s*.045,0,.25]} rotation={[0,s*.35,0]} size={[.09,.02,.17]} color="#e1d5bd"/>)}
</group>;

/** A genuinely hollow, opening locker. The ordinary Locker is still used for the hallway's other lockers. */
export const HingedLocker: React.FC<Prop & { open?: number }> = ({position=[0,0,0],rotationY=0,scale=1,open=-1.6}) => <group position={position} rotation={[0,rotationY,0]} scale={scale}>
  <Block position={[0,1,-.42]} size={[1.02,2,.06]} color="#273e51"/>
  {[-1,1].map(s=><Block key={s} position={[s*.52,1,-.2]} size={[.06,2,.5]} color="#547b9a"/>)}
  {[.035,1.98].map(y=><Block key={y} position={[0,y,-.2]} size={[1.06,.07,.5]} color="#7398ae"/>)}
  <Block position={[0,1.78,-.2]} size={[.98,.045,.46]} color="#7894a0"/>
  <group position={[-.52,0,.06]} rotation={[0,open,0]}>
    <Block position={[.51,1,0]} size={[1.02,1.98,.06]} color="#416c91"/>
    <Block position={[.87,1.05,.056]} size={[.06,.16,.045]} color="#cad4d5"/>
    {[0,1,2,3].map(i=><Block key={i} position={[.51,1.68-i*.075,.036]} size={[.65,.024,.01]} color="#18364b"/>)}
    <Block position={[.5,1.22,.04]} size={[.18,.11,.012]} color="#d6d6c7"/>
  </group>
</group>;

/** Taut cord between actual contacts. Useful for curtain pulls; no screen-space line. */
export const Cord:React.FC<{from:Vec3;to:Vec3;radius?:number;color?:string}>=({from,to,radius=.009,color='#d2c39c'})=>{
 const direction=new Vector3(...to).sub(new Vector3(...from));
 const length=direction.length();if(length<.001)return null;
 const q=new Quaternion().setFromUnitVectors(new Vector3(0,1,0),direction.normalize());
 return <mesh position={[(from[0]+to[0])/2,(from[1]+to[1])/2,(from[2]+to[2])/2]} quaternion={q} castShadow><cylinderGeometry args={[radius,radius,length,5]}/><meshStandardMaterial color={color} roughness={.9}/></mesh>;
};
/** The cover hinges through space instead of swapping a closed box for an open box on a cut. */
export const HingedBook:React.FC<Prop&{opening:number;color?:string}>=({position=[0,0,0],rotationY=0,scale=1,opening,color='#4e789a'})=><group position={position} rotation={[0,rotationY,0]} scale={scale}>
 <Block position={[.15,0,0]} size={[.34,.02,.4]} color={color}/><Block position={[.15,.026,0]} size={[.3,.04,.36]} color='#eee5d0'/>
 <Block position={[0,.03,0]} size={[.025,.08,.4]} color='#426278'/>
 <PixelText text="56" height={.09} position={[.15,.05,.04]} rotation={[-Math.PI/2,0,0]} color='#365975'/>
 <group position={[0,.055,0]} rotation={[0,0,Math.PI*Math.min(1,Math.max(0,opening))]}>
  <Block position={[.15,0,0]} size={[.34,.022,.4]} color={color}/><Block position={[.15,-.014,0]} size={[.29,.008,.35]} color='#f0e7d1'/>
  <PixelText text="8 X 7" height={.045} position={[.15,-.021,.02]} rotation={[Math.PI/2,0,0]} color='#365975'/>
  <Block position={[.15,.016,0]} size={[.13,.008,.18]} color='#d7be7a'/>
 </group>
</group>;

/** A double-hung cottage window. The lower sash lifts into the upper one, not through the wall. */
export const SashWindow:React.FC<Prop&{open?:number;width?:number;height?:number;night?:boolean}>=({position=[0,0,0],rotationY=0,scale=1,open=0,width=1.4,height=1.2,night=true})=><group position={position} rotation={[0,rotationY,0]} scale={scale}>
 {[-1,1].map(s=><Block key={s} position={[s*width/2,0,0]} size={[.065,height+.12,.09]} color="#755233"/>)}
 {[-1,1].map(s=><Block key={s} position={[0,s*height/2,0]} size={[width+.12,.065,.09]} color="#755233"/>)}
 <Block position={[0,height*.25,.012]} size={[width-.06,height*.5-.06,.02]} color={night?'#9dbbd7':'#bde0e7'} opacity={.10} castShadow={false}/>
 <Block position={[0,height*.25,.03]} size={[.045,height*.5,.045]} color="#755233"/>
 <group position={[0,-height/2+Math.max(0,Math.min(1,open))*.36,-.055]}>
  <Block position={[0,height*.25,0]} size={[width-.07,height*.5-.07,.024]} color={night?'#9dbbd7':'#bde0e7'} opacity={.12} castShadow={false}/>
  {[0,height*.5].map(y=><Block key={y} position={[0,y,-.015]} size={[width,.05,.065]} color="#8d6b45"/>)}
  {[-1,1].map(s=><Block key={s} position={[s*(width/2-.02),height*.25,-.015]} size={[.045,height*.5,.06]} color="#8d6b45"/>)}
  <Block position={[0,.075,-.07]} size={[.24,.045,.07]} color="#b1b6a2"/>
 </group>
 <Block position={[0,-height/2-.065,.03]} size={[width+.23,.085,.32]} color="#896842"/>
</group>;
/** Small physical debris, with an explicit age so time-stop scenes can freeze every fragment. */
export const BlockBurst:React.FC<{position:Vec3;age:number;color?:string;count?:number;power?:number;life?:number;size?:number}>=({position,age,color='#b6a385',count=12,power=1,life=.65,size=.075})=>{
 if(age<0||age>life)return null;
 return <group position={position}>{Array.from({length:count},(_,i)=>{
  const angle=i*2.399963,velocity=power*(.48+(i%4)*.17),fall=Math.max(.025,age*(.7+(i%3)*.3)-3.6*age*age);
  return <Block key={i} position={[Math.cos(angle)*age*velocity,fall,Math.sin(angle)*age*velocity]} rotation={[i,age*3,i*.8]} size={[size*(1+i%3*.22),size,size]} color={color} opacity={Math.min(1,(life-age)*6)} castShadow={false}/>;
 })}</group>;
};
