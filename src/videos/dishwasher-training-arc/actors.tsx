import * as T from "three";
import { Block, ContactShadow, MinecraftAvatar, blendPose, clamp, clamp01, gaitPose, getPose, lerp } from "../../engine";
import type { FaceName, Pose, Vec3 } from "../../engine";
import { Creeper, Skeleton, Slime, Zombie } from "../../../Topics/InThisTown/monsters";
import { Villager } from "../../../Topics/InThisTown/villagers";
import { mixVec, rise, sec, unit } from "./marks";
import { Cubes } from "./props";
import { finnDialogue } from "./dialogue";
import type { Cube } from "./props";
import meter from "./voice-meter.json";

const UNIT = 1.8/32, HIP=12*UNIT, SHOULDER=6*UNIT, ARM=11.25*UNIT;
const Y = new T.Vector3(0,1,0);
export const voice = (f: number, who: keyof typeof meter) => meter[who][Math.round(f)] ?? 0;

export function idle(depth = 0): Pose {
  const p=getPose("idle",0);
  const crouch=Math.acos(clamp((HIP-depth)/HIP));
  p.bodyY=-depth; p.bodyPitch=0; p.bodyRoll=0; p.bodyYaw=0;
  p.head=[0,0,0]; p.torso=[0,0,0];
  p.armR=[-.045,0,.082]; p.armL=[-.05,0,-.092];
  p.legR=[-crouch,0,0];p.legL=[-crouch,0,0];
  p.kneeR=[crouch*2,0,0];p.kneeL=[crouch*2,0,0];
  return p;
}

export type State = { at: Vec3; yaw: number; pose: Pose; face: FaceName; gaze?: -1 | 0 | 1 };
export const facing = (a: Vec3,b: Vec3) => Math.atan2(b[0]-a[0],b[2]-a[2]);
export function around(at: Vec3, yaw: number, offset: Vec3): Vec3 {
  return new T.Vector3(...offset).applyAxisAngle(Y,yaw).add(new T.Vector3(...at)).toArray();
}

const bodyRotation = (pose: Pose) => new T.Euler(pose.bodyPitch,pose.bodyYaw,pose.bodyRoll);
export function grip(state: State, side=1): Vec3 {
  const p=state.pose;
  const v=new T.Vector3(0,-ARM,0).applyEuler(new T.Euler(...(side>0?p.armR:p.armL)))
    .add(new T.Vector3(side*SHOULDER,HIP,0)).applyEuler(bodyRotation(p)).add(new T.Vector3(0,HIP+p.bodyY,0));
  return around(state.at,state.yaw,v.toArray());
}
export function aim(state: State, target: Vec3, side=1): Vec3 {
  const p=state.pose;
  const q = new T.Quaternion().setFromEuler(bodyRotation(p)).invert();
  const d = new T.Vector3(...target).sub(new T.Vector3(...state.at)).applyAxisAngle(Y,-state.yaw)
    .sub(new T.Vector3(0,HIP+p.bodyY,0)).applyQuaternion(q).sub(new T.Vector3(side*SHOULDER,HIP,0)).normalize();
  return [Math.atan2(-d.z,-d.y),0,Math.asin(clamp(d.x,-1,1))];
}
export function crouchForGrip(at: Vec3,yaw: number,target: Vec3) {
  const r=new T.Vector3(...target).sub(new T.Vector3(...at)).applyAxisAngle(Y,-yaw);
  const reach=Math.hypot(r.x-SHOULDER,r.z);
  return idle(clamp(2*HIP-r.y-Math.sqrt(Math.max(0,ARM**2-reach**2)),0,.241));
}

export function walk(f:number,a:number,b:number,from:Vec3,to:Vec3,face:FaceName="neutral",yaw?:number): State {
  const u=unit(f,a,b), p=rise(f,a,b);
  const pos=mixVec(from,to,p);
  const distance=Math.hypot(to[0]-from[0],to[2]-from[2])*p;
  const k=clamp01(Math.min(u,1-u)*7);
  return {at:pos,yaw:yaw??facing(from,to),pose:blendPose(idle(),gaitPose("walk",distance),k),face};
}

/** The closed lip is already on the 8×8 face. Extend its middle down a
 * fraction of a pixel, on the head itself, without replacing any eye pixels. */
function FinnMouth({ open }: { open: number }) {
  const h = (1 + .65 * open) * UNIT;
  const w = (2 + .55 * open) * UNIT;
  const lip = new T.Color("#7a4038").lerp(new T.Color("#311a1c"), open);
  return (
    <mesh position={[0, -2 * UNIT - h / 2, 4 * UNIT + .0005]} scale={[w, h, 1]} receiveShadow>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial color={lip} roughness={1} metalness={0} />
    </mesh>
  );
}

export function Finn({ f, state, apron = false, talk = true }: { f:number; state:State; apron?:boolean; talk?:boolean }) {
  const p=state.pose;
  const speech = talk ? finnDialogue(f) : null;
  return <>
    <MinecraftAvatar position={state.at} rotationY={state.yaw} pose={p} face={speech?.face ?? state.face}
      outfit="tee" colors={{torso:"#dfa633",arms:"skin",legs:"#365b77"}} shoes="#4c5253" skin="#dca478" hair="#3c261f"
      shadow shadowOpacity={.34} blink time={sec(f)} saccade={false} gaze={speech?.gaze ?? state.gaze ?? 0}
      head={speech && speech.mouth > 0 ? <FinnMouth open={speech.mouth} /> : null}
      weightShift={0} breath={0} />
    {apron && <group position={state.at} rotation-y={state.yaw}>
      <group position={[0,HIP+p.bodyY,0]} rotation={bodyRotation(p)}>
        <Block position={[0,.223,.126]} size={[.407,.479,.033]} color="#2f7d79" />
        <Block position={[0,.009,.128]} size={[.434,.071,.038]} color="#1f504d" />
        <Block position={[0,.305,.148]} size={[.254,.12,.028]} color="#498f85" />
        <Block position={[.083,.424,.154]} size={[.097,.054,.018]} color="#ffdaa1" />
        {[-1,1].map(s=><Block key={s} position={[s*.143,.55,.13]} size={[.056,.26,.030]} color="#28635e" rotation={[0,0,-s*.09]} />)}
      </group>
    </group>}
  </>;
}

export function Bones({ f, at, yaw=0, look, dance=0, moved=0, atDoor=0, awe=0 }: {
  f:number; at:Vec3; yaw?:number; look?:Vec3; dance?:number; moved?:number; atDoor?:number; awe?:number;
}) {
  const t=sec(f), d=Math.sin(t*10.8), jaw=voice(f,"skeleton");
  const p:Vec3=[at[0]+dance*.115*d,at[1]+dance*Math.max(0,Math.sin(t*14+.47))*.105,at[2]];
  return <>
    <ContactShadow position={[p[0],.013,p[2]]} width={.76} depth={.54} opacity={.36} />
    <Skeleton position={p} rotationY={yaw+d*.25*dance} scale={.97} lookAt={look} mood={awe>.4?"scared":"happy"}
      scarf="#d78037" wave={dance*(.66+.28*d) + atDoor*.64 + awe*.25} raise={.19+dance*(.33-.15*d)}
      walk={moved+(.26+.24*d)*dance} tilt={-.18*d*dance+(jaw-.25)*-.13} jaw={Math.max(jaw*.79,awe*.65)}
      lean={dance*.10*Math.cos(t*10.8)+atDoor*.076} phase={2.31} rattle={dance*.19} />
  </>;
}

export function Jelly({f, at, yaw=0, jumping=.5, scale=1, look, awe=0}: {f:number;at:Vec3;yaw?:number;jumping?:number;scale?:number;look?:Vec3;awe?:number}) {
  const t=sec(f), jaw=voice(f,"slime");
  const hop=Math.abs(Math.sin(7.88*t+.45));
  return <>
    <ContactShadow position={[at[0],.015,at[2]]} width={.93*scale} depth={.75*scale} opacity={.42-hop*.18*jumping} />
    <Slime position={[at[0],at[1]+jumping*.48*hop,at[2]]} size={.79} scale={scale} rotationY={yaw} lookAt={look}
      squash={jumping*(.72-1.38*hop)+.28*jaw+.1*awe} hat="straw" mood={awe>.5?"scared":"happy"} phase={2} color="#6eae56" />
  </>;
}

export const BOSS_COUNTER: Vec3 = [-.13,0,.81];
export function Manager({ f, at=BOSS_COUNTER, yaw=-.63, look, nod=0, point=0 }: { f:number; at?:Vec3; yaw?:number; look?:Vec3; nod?:number; point?:number }) {
  return <>
    <ContactShadow position={[at[0],.015,at[2]]} width={.67} depth={.55} opacity={.26} />
    <Villager position={at} rotationY={yaw} scale={.97} lookAt={look} robe="#994d42" phase={1.18}
      hmm={voice(f,"manager")*.78+nod*.39} lean={.04 + .05*nod} arms={point>.05?{r:-.3-point*1.25,l:-.22}:undefined}
      headwear={<>
        <Block position={[0,.539,0]} size={[.48,.135,.454]} color="#672f36" />
        <Block position={[0,.604,0]} size={[.403,.030,.375]} color="#ac6250" />
        <Block position={[.035,.55,.236]} size={[.154,.054,.028]} color="#dcb272" />
      </>} />
  </>;
}

const NEIGHBORS: [number,Vec3,string,number][] = [
  [0,[-1.15,0,-.93],"#7676a0",.88], [1,[.89,0,-1.21],"#459a68",.81],
  [2,[-.64,0,-1.77],"#996050",.91], [0,[.46,0,-2.02],"#aa6571",1],
  [2,[1.63,0,-2.28],"#a68456",.88], [1,[-1.48,0,-2.51],"#51996a",.87],
  [0,[-.22,0,-2.69],"#76a9ae",1.05],
];
export function Neighbor({i,at,yaw,distance=0,dance=0,awe=0}: {i:number;at:Vec3;yaw:number;distance?:number;dance?:number;awe?:number}) {
  const [kind,,outfit,scale]=NEIGHBORS[i%NEIGHBORS.length];
  const p={position:at,rotationY:yaw,walk:distance,phase:i*.52,scale};
  if (kind===0) return <Zombie {...p} shirt={outfit} scarf={i%2?"#e5a953":"#7fc3bd"} mood={awe>.5?"scared":"happy"} />;
  if (kind===1) return <Creeper {...p} color={outfit} mood={awe>.5?"scared":"happy"} />;
  return <Villager {...p} robe={outfit} hat={i%3===0?"straw":"none"} hmm={dance*.29+awe*.26} lean={awe*.06} />;
}

export function Party({ f }: { f:number }) {
  const t=sec(f);
  const bits:Cube[]=Array.from({length:52},(_,i)=>{
    const d=(.107*i+t*(.39+(i%3)*.06))%1;
    const x=(i%13-6)*.268+Math.sin(i*4.2+t*2)*.055;
    return {p:[x,2.94-d*2.92,-.6-(i%5)*.24+Math.cos(i*2.82+t*.8)*.24],s:[.058,.027,.036],c:["#e3ac4e","#ca76b9","#65cfcb","#fdc189"][i%4],r:[d*5.5,i,d*3.9]};
  });
  return <>
    <Bones f={f} at={[-.41,.022,-.13]} yaw={.13} dance={1} />
    <Jelly f={f} at={[.49,.022,.24]} yaw={-.19} scale={1.0} jumping={.95} />
    {NEIGHBORS.map(([,pos,,],i)=>{
      const bob=Math.abs(Math.sin(t*(7.4+(i%3)*1.17)+i));
      return <Neighbor key={i} i={i} at={[pos[0]+.105*Math.sin(t*7+i),.089*bob,pos[2]]} yaw={-.21*Math.sign(pos[0])+.23*Math.sin(t*7+i)} distance={bob*.32} dance={1} />;
    })}
    <Cubes parts={bits} emissive="#f8ca91" />
  </>;
}
