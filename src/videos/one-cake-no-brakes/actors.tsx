import * as T from "three";
import { ContactShadow, Glow, MinecraftAvatar, Vox } from "../../engine";
import type { FaceName, Vec3 } from "../../engine";
import { lerp } from "../../engine/math";
import { Skeleton, Slime } from "../../../Topics/InThisTown/monsters";
import { BirthdayCake, Emerald, Minecart } from "./props";
import { LAND, MARK, SLIME_AT, TIP_AT, TIP_PHASE, TIP_YAW, cakeAt, emeraldAt, pulse, railFrame, rise, sec, terrainAt, tipLean, tipRaise, zAt } from "./rail";
import { PIXEL, riderAt } from "./rider";
import meter from "./mouth.json";

function Mouth({ f }: { f: number }) {
  const amount = meter[f] ?? 0;
  if (!amount) return null;
  const h = (1+.71*amount)*PIXEL;
  return <mesh position={[0,-2*PIXEL-h/2,4*PIXEL+.0005]} scale={[(2+.56*amount)*PIXEL,h,1]} receiveShadow>
    <planeGeometry args={[1,1]} />
    <meshStandardMaterial color={new T.Color("#7a4038").lerp(new T.Color("#351d20"),amount)} roughness={1} />
  </mesh>;
}

function PartyGuests({ f, cart }: { f: number; cart: Vec3 }) {
  const t = sec(f);
  const excitement = rise(f,342,441);
  const jump = Math.abs(Math.sin(7.44*t+.4));
  const hop = (.095+.23*excitement)*jump;
  const at: Vec3 = [SLIME_AT[0],.595+hop,SLIME_AT[2]];
  const squash=(.32+.41*excitement)*(.75-1.42*jump);
  const waiting = Math.atan2(cart[0]-.1-at[0],cart[2]-at[2]);
  // Turn to the table in anticipation of the tray landing on our right.
  const guestYaw = lerp(waiting,.22,rise(f,492,MARK.land-5));
  return <>
    <Vox kind="planks" tint="#c0956d" position={[at[0],.305,at[2]]} size={[.904,.585,.793]} />
    <Vox kind="darkPlanks" tint="#8d7659" position={[at[0],.125,at[2]]} size={[.960,.066,.838]} />
    <Vox kind="log" tint="#8b6d56" position={[at[0],.548,at[2]]} size={[.978,.081,.840]} />
    <ContactShadow position={[at[0],.597,at[2]]} width={.85} depth={.83} opacity={.26-hop*.4} />
    <Slime position={at} scale={.98} size={.88} rotationY={guestYaw} color="#71b853" hat="bow" mood="happy" phase={1} squash={squash} />
    <ContactShadow position={[TIP_AT[0],.038,TIP_AT[2]]} width={.79} depth={.76} opacity={.42} />
    <Skeleton position={TIP_AT} rotationY={TIP_YAW} phase={TIP_PHASE} raise={tipRaise(f)} lean={tipLean(f)}
      scarf="#e79d53" lookAt={[-.70,1.47,TIP_AT[2]+.10+1.55*rise(f,MARK.clink,573)]} mood="calm" />
    <group position={emeraldAt(f)} rotation={[
      f<MARK.drop ? -.14 : f<MARK.clink ? -.14+(f-MARK.drop)*.124 : 1.56 + .24*pulse(f,MARK.clink,MARK.clink+2,MARK.clink+6),
      f<MARK.drop ? .44 : (f-MARK.drop)*.27, .17,
    ]}>
      <Emerald />
      {f<MARK.clink && f>MARK.drop-3 && <Glow size={.32} color="#6defa5" opacity={.31} />}
    </group>
  </>;
}

export function Ride({ f }: { f: number }) {
  const z = zAt(f);
  const rail = railFrame(z);
  const cake = cakeAt(f,rail);
  const rider = riderAt(f,rail,cake);
  const face: FaceName = f<54 ? "smug" : f<222 ? "uneasy" : f<MARK.land+3 ? "brave" : "smile";
  return <>
    <ContactShadow position={[rail.origin.x,terrainAt(z+.54)+.043,z]} width={1.39} depth={1.85} opacity={.34} />
    <group position={rail.origin} quaternion={rail.rotation}>
      <Minecart distance={z+18} />
      <MinecraftAvatar position={rider.at} rotationY={rider.yaw} pose={rider.p} face={face} head={<Mouth f={f} />}
        colors={{torso:"#dfa633",arms:"skin",legs:"#365b77"}} outfit="tee" shoes="#4c5253"
        skin="#dca478" hair="#3c261f" blink time={sec(f)} gaze={f<54 ? 0 : f<222 ? -1 : f<MARK.land ? 1 : 0} saccade={false} breath={0} weightShift={0} />
    </group>
    <group position={cake.pos} quaternion={cake.rot}>
      <BirthdayCake lit={false} />
    </group>
    <PartyGuests f={f} cart={rail.origin.toArray()} />
    {f>MARK.land-2 && <ContactShadow position={[LAND[0],LAND[1]+.002,LAND[2]]} width={1.06} depth={.897} opacity={.19*rise(f,MARK.land-2,MARK.land+1)} />}
  </>;
}
