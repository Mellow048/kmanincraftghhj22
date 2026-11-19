import { memo, useLayoutEffect, useRef } from "react";
import * as T from "three";
import { Block, Vox, type Vec3 } from "../../engine";
import { Fish } from "../../../Topics/InThisTown";
import { mix, span } from "./kit";

export type Piece={at:Vec3; size:Vec3; color:string; turn?:Vec3};
const cube=new T.BoxGeometry(1,1,1);
export const Parts=memo(({ pieces, shadow=true }: { pieces:readonly Piece[]; shadow?:boolean })=>{
  const ref=useRef<T.InstancedMesh>(null);
  useLayoutEffect(()=>{
    const ob=new T.Object3D(), c=new T.Color(), m=ref.current;
    if(!m) return;
    pieces.forEach((p,i)=>{
      ob.position.set(...p.at); ob.scale.set(...p.size); ob.rotation.set(...(p.turn??[0,0,0])); ob.updateMatrix();
      m.setMatrixAt(i,ob.matrix);m.setColorAt(i,c.set(p.color));
    });
    m.instanceMatrix.needsUpdate=true;
    if(m.instanceColor) m.instanceColor.needsUpdate=true;
    m.computeBoundingSphere();
  },[pieces]);
  return <instancedMesh args={[cube,undefined,pieces.length]} ref={ref} castShadow={shadow} receiveShadow>
    <meshStandardMaterial roughness={0.87}/>
  </instancedMesh>;
});

export const bar=(a:Vec3,b:Vec3,width:number,height:number,color:string):Piece=>{
  const d=new T.Vector3(...b).sub(new T.Vector3(...a));
  const rot=new T.Euler().setFromQuaternion(new T.Quaternion().setFromUnitVectors(new T.Vector3(0,0,1),d.clone().normalize()));
  return {at:mix(a,b,0.5),size:[width,height,d.length()+0.004],color,turn:[rot.x,rot.y,rot.z]};
};

const BOAT:Piece[]=[
  {at:[0,-0.091,0],size:[0.93,0.16,1.84],color:"#624234"},
  {at:[0,0.035,0],size:[1.08,0.13,2.17],color:"#976346"},
  {at:[0,0.222,-0.427],size:[1.04,0.106,0.245],color:"#bb8b5a"},
  {at:[0,0.224,0.425],size:[1.04,0.107,0.265],color:"#bf915d"},
  {at:[0,0.10,0.92],size:[0.80,0.31,0.24],color:"#855538"},
  {at:[0,0.203,1.01],size:[0.74,0.107,0.27],color:"#c08b59"},
  {at:[0,0.153,-0.993],size:[0.86,0.302,0.16],color:"#936345"},
];
for(let i=0;i<6;i++) BOAT.push({at:[(i-2.5)*0.151,0.104,0],size:[0.145,0.023,1.71],color:["#a77652","#b28055","#aa7c55"][i%3]});
for(const s of [-1,1]) {
  BOAT.push(
    {at:[s*0.544,0.182,-0.11],size:[0.139,0.258,1.66],color:"#9c6d4e"},
    {at:[s*0.564,0.254,-0.10],size:[0.145,0.066,1.71],color:"#668080"},
    {at:[s*0.559,0.328,-0.10],size:[0.158,0.061,1.73],color:"#d4a371"},
    bar([s*0.556,0.197,0.69],[s*0.349,0.264,1.06],0.144,0.242,"#a47351"),
    bar([s*0.557,0.330,0.68],[s*0.346,0.407,1.12],0.152,0.065,"#d1a170"),
    {at:[s*0.651,0.302,0.12],size:[0.079,0.141,0.090],color:"#3d4d4f"},
  );
}
export function Dinghy({ at, yaw=0, tilt=0, roll=0, scale=1 }: { at:Vec3; yaw?:number; tilt?:number; roll?:number; scale?:number }) {
  return <group position={at} rotation={[tilt,yaw,roll,"YXZ"]} scale={scale}><Parts pieces={BOAT}/></group>;
}

// Oar halves are built from the same seam. If the two origin seams meet,
// the crooked white mark becomes a single diagonal across the red wood.
export function PaintedOar({ seam, to, piece, roll=0, intact=false }: { seam:Vec3; to:Vec3; piece:"blade"|"handle"|"plain"; roll?:number; intact?:boolean }) {
  const delta=new T.Vector3(...to).sub(new T.Vector3(...seam));
  const len=delta.length();
  const q=new T.Quaternion().setFromUnitVectors(new T.Vector3(0,0,1),delta.normalize());
  const red=piece!=="plain", blade=piece!=="handle";
  return <group position={seam} quaternion={q}>
    <group rotation-z={roll}>
      <Block position={[0,0,len/2]} size={[0.116,0.105,len]} color={red?"#b24841":"#b3885d"} />
      {blade && <>
        <Block position={[0,0,len*0.775]} size={[0.227,0.085,len*0.43]} color={red?"#cf5a4a":"#b89167"} />
        <Block position={[0,0,len*0.984]} size={[0.187,0.081,0.056]} color={red?"#a94d42":"#9a6b46"} />
      </>}
      {red && <>
        <Block position={[0,0,len-0.042]} size={[blade?0.223:0.153,0.111,0.081]} color="#77483c" />
        {!intact&&<>
          <Block position={[0,0,0.031]} size={[0.118,0.108,0.066]} color="#d8aa78" />
          <Block position={[0.021,0.028,-0.037]} size={[0.044,0.038,0.076]} color="#c39768" />
        </>}
        {[0,1,2,3].map(i=><Block key={i} position={[(i-1.5)*0.029,0.055,0.108+i*0.025]}
          size={[0.032,0.008,0.079]} color="#fff1cd" />)}
        <Block position={[0.060,0,0.174]} size={[0.011,0.109,0.079]} color="#ead9b9" />
        <Block position={[-0.060,0,0.123]} size={[0.011,0.109,0.076]} color="#ead9b9" />
      </>}
    </group>
  </group>;
}

const body:Piece[]=[
  {at:[0,0,-0.056],size:[0.483,0.448,0.915],color:"#718797"},
  {at:[0,0.057,0.460],size:[0.449,0.361,0.508],color:"#8197a5"},
  {at:[0,0.194,0.089],size:[0.431,0.129,0.835],color:"#657887"},
  {at:[0,-0.162,0.066],size:[0.448,0.148,1.088],color:"#becbcd"},
  {at:[0,-0.005,0.703],size:[0.315,0.143,0.298],color:"#879aa6"},
  {at:[0,-0.090,0.699],size:[0.301,0.051,0.282],color:"#c0c9cc"},
  {at:[0,0.304,-0.149],size:[0.123,0.193,0.32],color:"#647987",turn:[-0.20,0,0]},
  {at:[0,0.419,-0.207],size:[0.106,0.122,0.191],color:"#687d8b",turn:[-0.27,0,0]},
];
for(const s of [-1,1]) body.push(
  {at:[s*0.226,0.092,0.536],size:[0.021,0.097,0.099],color:"#d5e2df"},
  {at:[s*0.239,0.087,0.556],size:[0.011,0.071,0.058],color:"#1c2735"},
  {at:[s*0.246,0.110,0.571],size:[0.007,0.022,0.022],color:"#f4f3e2"},
);
const SNOUT = new T.Vector3(0,-0.030,0.866);
/** `nose` is a contact point, so the two fish takes land on the mouth, not the body centre. */
export function Dolphin({ nose, yaw, pitch=0, bank=0, t, bite=0 }: {nose:Vec3;yaw:number;pitch?:number;bank?:number;t:number;bite?:number}) {
  const rot: T.EulerTuple=[pitch,yaw,bank,"YXZ"];
  const at=new T.Vector3(...nose).sub(SNOUT.clone().applyEuler(new T.Euler(...rot))).toArray();
  const wag=Math.sin(t*9.3);
  return <group position={at} rotation={rot}>
    <Parts pieces={body}/>
    <group position={[0,-0.064,0.573]} rotation-x={bite*0.38}>
      <Block position={[0,-0.067,0.148]} size={[0.284,0.059,0.29]} color="#b9c9cd" />
    </group>
    {[-1,1].map(s=><group key={s} position={[s*0.185,-0.108,0.268]} rotation={[0.08, s*0.31,-s*(0.51+0.13*wag)]}>
      <Block position={[s*0.164,-0.02,-0.048]} size={[0.388,0.074,0.209]} color="#5c737e"/>
      <Block position={[s*0.341,-0.02,-0.087]} size={[0.166,0.054,0.153]} color="#697f8c"/>
    </group>)}
    <group position={[0,-0.036,-0.377]} rotation={[0.24*wag,0.12*Math.sin(t*5.5),0]}>
      <Block position={[0,-0.019,-0.189]} size={[0.308,0.279,0.428]} color="#6c8493" />
      <group position={[0,-0.029,-0.366]} rotation-x={0.21*Math.sin(t*9.3-0.45)}>
        <Block position={[0,0,-0.147]} size={[0.188,0.155,0.32]} color="#627787" />
        {[-1,1].map(s=><Block key={s} position={[s*0.213,0,-0.284]} rotation-y={s*0.23} size={[0.438,0.073,0.246]} color="#596f80"/>)}
        <Block position={[0,-0.012,-0.273]} size={[0.239,0.069,0.304]} color="#738b96"/>
      </group>
    </group>
  </group>;
}

export function Splash({ at, t, start, size=1, velocity=0, seed=0 }: {at:Vec3;t:number;start:number;size?:number;velocity?:number;seed?:number}) {
  const sec=t-start;
  if(sec<0 || sec>0.91) return null;
  const u=span(0,0.91,sec);
  return <group position={at}>
    {Array.from({length:20},(_,i)=>{
      const a=i*2.39996+seed;
      const k=0.45+0.58*((i*17)%19)/19;
      const r=(0.13+u*k)*size;
      const y=size*(0.03+Math.max(0,3.2*k*sec-4.2*sec*sec));
      const d=(0.026+0.047*(i%3)/2)*(1-u*0.79)*size;
      if(y<0.041 && sec>0.47) return null;
      return <Block key={i} position={[Math.cos(a)*r,y,Math.sin(a)*r+sec*velocity]} size={[d,d*1.25,d]}
        color={i%3?"#a9e3e4":"#dcf4ed"} castShadow={false} receiveShadow={false}/>;
    })}
    {u<0.77 && Array.from({length:12},(_,i)=>{
      const a=i*Math.PI/6+0.11, r=(0.18+u*0.96)*size;
      return <Block key={i} position={[Math.cos(a)*r,0.019+i*0.0005,Math.sin(a)*r]} rotation-y={-a}
        size={[0.046*size,0.016,(0.11+u*0.14)*size]} color={i%2?"#def3ec":"#79c6ca"} castShadow={false} receiveShadow={false}/>;
    })}
  </group>;
}

export function Bubbles({ at, t, size=1, seed=0 }: {at:Vec3;t:number;size?:number;seed?:number}) {
  return <group position={at}>
    {Array.from({length:11},(_,i)=>{
      const q=(t*0.55+i*0.156)%1, d=(0.024+(i%4)*0.013)*size;
      return <mesh key={i} position={[Math.sin(i*2.7+q*4+seed)*0.25*size,q*1.55*size,Math.cos(i*3.9+q*5)*0.25*size]} scale={d}>
        <boxGeometry args={[1,1,1]}/><meshBasicMaterial color="#d2fbf7" transparent opacity={0.65*Math.sin(q*Math.PI)} depthWrite={false}/>
      </mesh>;
    })}
  </group>;
}

export function FishBox({ at, lid=0, fish=3 }: { at:Vec3; lid?:number; fish?:number }) {
  return <group position={at}>
    <Vox kind="planks" tint="#b28b63" position={[0,0.052,0]} size={[0.77,0.105,0.52]}/>
    {[-1,1].map(s=><group key={s}>
      <Vox kind="planks" tint="#af875c" position={[s*0.362,0.187,0]} size={[0.087,0.25,0.526]}/>
      <Vox kind="planks" tint="#99714d" position={[0,0.184,s*0.244]} size={[0.715,0.248,0.074]}/>
      {[0.115,0.278].map(y=><Block key={y} position={[s*0.406,y,0]} size={[0.025,0.046,0.572]} color="#595d57"/>)}
    </group>)}
    <group position={[0,0.319,-0.274]} rotation-x={-lid}>
      <Vox kind="planks" tint="#c09464" position={[0,0.014,0.274]} size={[0.820,0.105,0.563]}/>
      <Block position={[0,0.005,0.560]} size={[0.129,0.097,0.037]} color="#555b57"/>
    </group>
    {Array.from({length:fish},(_,i)=><Fish key={i} position={[0.18*(i-1),0.128+(i%2)*0.071,0.025*(i-1)]}
      scale={0.91} rotation={[0,1.31+i*0.36,0.095]}/>)}
  </group>;
}

export function Treasure({ at, rock=0 }: { at:Vec3; rock?:number }) {
  return <group position={at} rotation-y={0.76}>
    <Vox kind="darkPlanks" tint="#8c683c" position={[0,0.071,0]} size={[0.87,0.142,0.64]}/>
    {[-1,1].map(s=><group key={s}>
      <Vox kind="planks" tint="#a57c42" position={[s*0.395,0.21,0]} size={[0.109,0.38,0.645]}/>
      <Vox kind="planks" tint="#af7a3a" position={[0,0.216,s*0.283]} size={[0.745,0.366,0.095]}/>
      <Block position={[s*0.298,0.218,0.337]} size={[0.069,0.365,0.047]} color="#b89050"/>
    </group>)}
    <group position={[0,0.393,-0.323]} rotation-x={-1.08-rock}>
      <Vox kind="darkPlanks" tint="#ad8750" position={[0,0.066,0.328]} size={[0.914,0.131,0.664]}/>
      <Block position={[0,0.017,0.657]} size={[0.127,0.149,0.068]} color="#c7a76e"/>
    </group>
    {Array.from({length:9},(_,i)=><Block key={i} position={[0.21*Math.sin(i*7.4),0.218+Math.floor(i/2)*0.037,0.164*Math.cos(i*5.7)]}
      rotation-y={i*0.95} size={[0.156,0.036,0.103]} color={i%2?"#f7ce74":"#db9a31"} emissive="#e2a644" emissiveIntensity={0.09}/>)}
  </group>;
}

export function Wake({ at,t, spread=1 }: {at:Vec3;t:number;spread?:number}) {
  return <group position={at}>
    {Array.from({length:18},(_,i)=>{
      const f=(i/18+t*0.57)%1, s=i%2?1:-1;
      return <Block key={i} position={[s*spread*(0.16+f*0.55),0.008+(i%4)*0.0035,-f*2.7*spread]} rotation-y={-s*0.32}
        size={[(0.018+f*0.043)*spread,0.011,(0.14+f*0.12)*spread]} color={i%3?"#89c8cb":"#bde1da"} castShadow={false} receiveShadow={false}/>;
    })}
  </group>;
}
