import { memo, useLayoutEffect, useRef } from "react";
import * as T from "three";
import { Block, ContactShadow, Vox, clamp01, lerp, pixelTex } from "../../engine";
import type { Vec3 } from "../../engine";
import { rise, unit } from "./marks";

export const PALETTE = {
  oak: "#be9163", gold: "#e1ac64", dark: "#43332c", porcelain: "#eaf3eb", band: "#76a6ad",
  brass: "#c29148", sage: "#668f80", teal: "#356154", slate: "#324845", red: "#913f38", cream: "#e8cfaa",
};

/** Batch repeated little cubes. Much cheaper than a separate renderer draw for each plate rim/speck. */
export type Cube = { p: Vec3; s: Vec3; c: string; r?: Vec3 };
const unitCube = new T.BoxGeometry(1, 1, 1);
export function Cubes({ parts, max, shadow = false, emissive }: { parts: Cube[]; max?: number; shadow?: boolean; emissive?: string }) {
  const ref = useRef<T.InstancedMesh>(null);
  const slots = max ?? parts.length;
  useLayoutEffect(() => {
    if (!ref.current) return;
    const obj = new T.Object3D();
    const color = new T.Color();
    ref.current.count = parts.length;
    for (const [i, { p,s,c,r }] of parts.entries()) {
      obj.position.set(...p);
      obj.scale.set(...s);
      obj.rotation.set(...(r ?? [0,0,0]));
      obj.updateMatrix();
      ref.current.setMatrixAt(i,obj.matrix);
      ref.current.setColorAt(i,color.set(c));
    }
    ref.current.instanceMatrix.needsUpdate = true;
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
  }, [parts,slots]);
  return <instancedMesh ref={ref} args={[unitCube,undefined,slots]} receiveShadow castShadow={shadow} frustumCulled={false}>
    <meshStandardMaterial roughness={.82} emissive={emissive} emissiveIntensity={emissive ? .20 : 0} />
  </instancedMesh>;
}

export const Plate = memo(({ at = [0,0,0], rotation, size = 1, dirty = 0 }: { at?: Vec3; rotation?: Vec3; size?: number; dirty?: number }) => <group position={at} rotation={rotation} scale={size}>
  <Block position={[0, .004, 0]} size={[.381,.026,.324]} color="#c2d2cf" />
  <Block position={[0, .023, 0]} size={[.458,.020,.396]} color={PALETTE.porcelain} />
  <Block position={[0,.035,0]} size={[.401,.013,.338]} color="#83abb2" />
  <Block position={[0,.043,0]} size={[.364,.013,.301]} color="#e0eee9" />
  <Cubes max={7} parts={Array.from({length: Math.min(7, dirty)}, (_,i): Cube => ({
    p:[.039*(i-3),.052,(-1)**i*.043+(i%3)*.015], s:[.054+(i%2)*.01,.005,.048+(i%3)*.023],
    c:i%2 ? "#a27b3e" : "#775131", r:[0,i*.24,0],
  }))} />
</group>);

export function PlateStack({ at, n, f = 0, newest = 0, touched = -10 }: { at: Vec3; n: number; f?: number; newest?: number; touched?: number }) {
  const layers = [Math.min(n, n > 29 ? 30 : n > 14 ? 15 : n), Math.max(0, Math.min(n - (n > 29 ? 30 : 15), n > 29 ? 21 : 7)), Math.max(0, n-51)];
  const fac = [1,.90,.86];
  let index = 0;
  const pieces: Cube[] = [];
  for (const [col,count] of layers.entries()) {
    for (let i = 0; i < count; i++, index++) {
      const r = (Math.sin(i*2.9 + col)*.118) + col*.11;
      const x = at[0]+[0,.33,.41][col]+Math.sin(i*1.96)*.017;
      const instAt: Vec3 = [x,at[1]+.020+i*.035+(index>=n-newest ? .091*(1-rise(f,touched,touched+5)):0),at[2]+[0,.271,-.173][col]+Math.cos(i*6.1)*.015];
      const scale=fac[col];
      pieces.push({p:instAt, s:[.455*scale,.024,.394*scale], c:i%3 ? "#e5eee6" : "#cadfd9",r:[0,r,0]});
      pieces.push({p:[x, instAt[1]-.014,instAt[2]],s:[.386*scale,.008,.319*scale],c:i%2 ? "#6f8c91" : "#9bb5b0",r:[0,r,0]});
    }
  }
  return <><Cubes parts={pieces} max={128} shadow />
    {layers.map((count,col) => count>0 ? <Plate key={col} at={[at[0]+[0,.33,.41][col],at[1]+count*.035-.024,at[2]+[0,.271,-.173][col]]} size={fac[col]} dirty={4+(col%2)} /> : null)}
  </>;
}

export function Cloth({ at, yaw, kind = "sponge", squash = 0 }: { at: Vec3; yaw: number; kind?: "sponge" | "cloth"; squash?: number }) {
  const sponge = kind === "sponge";
  return <group position={at} rotation-y={yaw} scale={[1+.07*squash,1-.16*squash,1+.07*squash]}>
    <Block position={[0,-.006,0]} size={sponge ? [.183,.023,.132]:[.258,.028,.196]} map={pixelTex(sponge ? "#478369" : "#299477",[2,2])} />
    <Block position={[0,.015,0]} size={sponge ? [.181,.023,.133]:[.244,.018,.188]} map={pixelTex(sponge ? "#eed16b" : "#61bd98",[2,2])} />
  </group>;
}

/** Working yarn-block mop. Its visible pole is built between the actual floor pivot and the grip. */
export function Mop({ floor, top, yaw }: { floor: Vec3; top: Vec3; yaw: number }) {
  const a = new T.Vector3(...floor).add(new T.Vector3(0,.074,0));
  const b = new T.Vector3(...top);
  const q = new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0), b.clone().sub(a).normalize());
  return <>
    <group position={floor} rotation-y={yaw}>
      <Block position={[0,.048,0]} size={[.304,.074,.218]} color="#e5d8ad" />
      {[-2,-1,0,1,2].map((i) => <Block key={i} position={[i*.067,.023,(i%2)*.021]} size={[.054,.045,.245]} color={i%2 ? "#b9b39c" : "#d6d1be"} />)}
      <Block position={[0,.088,0]} size={[.242,.040,.139]} color="#447b7b" />
      <ContactShadow position={[0,.013,0]} width={.46} depth={.34} opacity={.34} />
    </group>
    <group position={a.toArray()} quaternion={q}>
      <Block position={[0,a.distanceTo(b)/2,0]} size={[.049,a.distanceTo(b),.049]} map={pixelTex("#a56b4f",[1,6])} />
      <Block position={[0,a.distanceTo(b)*.926,0]} size={[.066,a.distanceTo(b)*.142,.066]} color="#339086" />
      <Block position={[0,a.distanceTo(b)*.7,0]} size={[.064,.11,.064]} color="#567c73" />
    </group>
  </>;
}

export function Suds({ center, f, reps, kind = "suds" }: { center: Vec3; f: number; reps: readonly number[]; kind?: "suds" | "water" | "buff" }) {
  const j = reps.reduce((best, a, i) => a <= f ? i : best, -1);
  if (j<0 || f-reps[j]>11) return null;
  const t=unit(f,reps[j],reps[j]+11);
  const c = kind==="water" ? ["#9edfe6","#5daaa8"] : kind==="buff" ? ["#ffe6a1","#fdf9d3"] : ["#f4fbff","#b7e4e7"];
  return <Cubes parts={Array.from({length:8},(_,i):Cube=>{
    const angle=i*2.39996+j*.667, s=.029*(1-t)+.010;
    const rad=(.06+(i%4)*.047)*(.35+t*.8);
    return {p:[center[0]+Math.cos(angle)*rad,center[1]+.03+t*(1-t)*(.44+i*.04),center[2]+Math.sin(angle)*rad],s:[s,s,s],c:c[i%2],r:[t*1.3,i,.3*t]};
  })} />;
}

/** Dirty chips/shiny patches live on the swept surface, not on the camera. */
export function Scuffs({ at, cleared, extent = [1.20,1.84], tint = "#654532", salt = 0 }: { at: Vec3; cleared: number; extent?: [number,number]; tint?: string; salt?: number }) {
  const parts = Array.from({length:45},(_,i): Cube | null => {
    const phase = (i * .38196601125 + salt*1.31) % 1;
    const width = Math.sin(i*2.43+salt)*.49 + .032;
    const z=extent[1]*(phase-.5);
    const clean = clamp01((cleared-phase)*13);
    if (clean>=.98) return null;
    const a=1-clean;
    return {p:[at[0]+width*extent[0],at[1],at[2]+z],s:[(.060+.083*(i%3))*a,.006,(.072+.093*(i%4))*a],c:i%4 ? tint : "#956a46",r:[0,i*.62,0]};
  }).filter((p):p is Cube=>p!==null);
  return parts.length>0 ? <Cubes parts={parts} max={45} /> : null;
}

export function WetTrail({ at, progress, length = 1.8, width = 1.0 }: { at: Vec3; progress: number; length?: number; width?: number }) {
  if (progress < .015) return null;
  return <group position={at}>
    {[0,1,2,3,4,5].map((i) => {
      const p=clamp01(progress*(1.24 - i*.052));
      return <Block key={i} position={[width*(i-2.5)*.161,.006,length*(p*.5-.5)]}
        size={[width*(.149+i%2*.028),.003,length*p]} color={i%2 ? "#b9dbcc" : "#d2d5bc"} roughness={.25} opacity={.086+i*.009} transparent castShadow={false} />;
    })}
  </group>;
}

export function EmeraldPiles({ at, second }: { at: Vec3; second: number }) {
  return <group position={at}>
    {[0,1].map(k => k===1 && second<=0 ? null : <group key={k} position={[k*.27, k ? .125*(1-second) : 0,0]} scale={k ? Math.max(.02,second) : 1}>
      {[0,1,2].map(i=><group key={i} position={[(i%2)*.026,.028+i*.039,0]} rotation-y={.24*i-k*.16}>
        <Block size={[.140,.032,.115]} color="#1e8156" metalness={.22} />
        <Block position={[0,.018,0]} size={[.110,.010,.081]} color="#68e096" emissive="#238554" emissiveIntensity={.19} />
      </group>)}
    </group>)}
  </group>;
}

export const Bench = memo(({ x, z, width, surface, chest, wood = PALETTE.oak, front = PALETTE.teal, steel = false }: {
  x:number; z:number; width:number; surface:number; chest:number; wood?:string; front?:string; steel?:boolean;
}) => <group position={[x,0,z]}>
  <Vox kind="planks" tint={front} position={[0,.44,0]} size={[width-.09,.75,chest-.1]} />
  <Vox kind="log" tint="#453a34" position={[0,.044,0]} size={[width-.14,.08,chest-.13]} />
  <Block position={[0,surface-.047,0]} size={[width,.094,chest]} map={pixelTex(wood,[6,2],{jitter:.12})} metalness={steel?.27:0} roughness={steel?.49:.87} />
  {Array.from({length:Math.ceil(width/.65)},(_,i)=>{
    const w=width/Math.ceil(width/.65), x=(i+.5)*w-width/2;
    return <group key={i} position={[x,0,chest*.5]}>
      <Block position={[0,.428,-.023]} size={[w-.040,.622,.075]} color={front} />
      <Vox kind="planks" tint={front} position={[0,.442,.018]} size={[w-.102,.486,.032]} />
      <Block position={[0,.635,.048]} size={[.170,.035,.070]} color={steel ? "#b8c1b7" : PALETTE.gold} metalness={.31} />
    </group>;
  })}
</group>);

export const SinkFittings = memo(({ x,z,y }: {x:number;z:number;y:number}) => <group position={[x,y,z]}>
  <Block position={[-.344,.016,.007]} size={[.448,.037,.462]} color="#a0b5bd" metalness={.3} roughness={.42} />
  <Block position={[-.344,.035,-.002]} size={[.353,.016,.37]} color="#4c6a79" />
  <Block position={[-.344,.047,-.006]} size={[.305,.006,.321]} color="#73b2b7" roughness={.32} metalness={.2} />
  <Block position={[-.345,.052,-.026]} size={[.087,.007,.096]} color="#3d5762" />
  <Block position={[-.344,.137,.203]} size={[.076,.237,.075]} color="#bcceca" metalness={.34} />
  <Block position={[-.344,.249,.119]} size={[.078,.065,.224]} color="#c8d4cc" metalness={.34} />
  <Block position={[-.344,.213,.022]} size={[.065,.106,.068]} color="#b1c8c4" metalness={.34} />
  {[-1,1].map(s=><group key={s} position={[-.344+.149*s,.063,.184]}>
    <Block size={[.050,.090,.054]} color="#a6b7b7" metalness={.34} />
    <Block position={[0,.035,0]} size={[.097,.035,.060]} color={s<0?"#cc7752":"#6a9bb6"} />
  </group>)}
  <Block position={[.01,.024,.01]} size={[.533,.039,.433]} color="#6c888e" />
  <Block position={[.24,.101,.248]} size={[.113,.203,.084]} color="#4c9079" />
  <Block position={[.24,.215,.248]} size={[.074,.042,.067]} color="#d2dfc4" />
</group>);
