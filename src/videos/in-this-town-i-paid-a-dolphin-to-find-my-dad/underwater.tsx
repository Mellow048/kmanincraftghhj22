import { type Vec3 } from "../../engine";
import { add, bob, CHEST, cue, Kid, KID, mix, reach, rise, span, stance, w } from "./kit";
import { Bubbles, Dinghy, Dolphin, Treasure } from "./props";
import { TiedBoat } from "./voyage";

const HOPE = cue("3.hope").start, CHEST_CUE=cue("3.chest").start, GOLD=cue("3.gold").start, LEAVE=cue("3.leave").start;
const path=(s:number):Vec3=>{
  if(s<CHEST_CUE) return mix(w(3.17,-1.70,.61),w(2.60,-2.17,-2.29),span(HOPE,CHEST_CUE,s));
  if(s<GOLD) return mix(w(2.60,-2.17,-2.29),w(2.37,-2.12,-3.82),rise(s,CHEST_CUE,GOLD));
  if(s<LEAVE) return w(2.37,-2.12+bob(s,1)*.47,-3.82);
  return mix(w(2.37,-2.12,-3.82),w(2.89,-.60,-.78),rise(s,LEAVE+.33,LEAVE+1.69));
};

export function Below({s}: {s:number}) {
  const intend=rise(s,LEAVE+.08,LEAVE+.48);
  const yaw=-2.86+1.90*rise(s,HOPE,GOLD-.09)+1.61*intend;
  const k=path(s); const p=stance("swim",s);
  const slow=rise(s,CHEST_CUE,GOLD-.15)*(1-rise(s,LEAVE+.16,LEAVE+.74));
  p.bodyPitch=1.22-.48*slow-.41*intend;
  p.bodyY=-.07*slow;
  p.legL=[.18+.24*Math.sin(s*6)*(1-slow),0,-.03]; p.legR=[.09-.24*Math.sin(s*6)*(1-slow),0,.034];
  const interest=rise(s,GOLD+.55,GOLD+1.72)*(1-rise(s,LEAVE+.16,LEAVE+.60));
  p.armR=[-1.77+.81*slow+.08*Math.sin(s*5),0,.19+.15*slow]; p.armL=[-1.27+.57*slow,0,-.29];
  reach(p,k,yaw,KID,1,w(1.65,-1.83,-3.20),interest*.85);
  const g=rise(s,CHEST_CUE,CHEST_CUE+.61), turn=rise(s,CHEST_CUE+.8,GOLD+.15);
  const snout=s<CHEST_CUE ? mix(w(2.13,-.48,-.82),w(1.83,-1.54,-3.16),span(HOPE,CHEST_CUE,s))
    : w(1.83-turn*1.43,-1.54+bob(s,6)+turn*.43,-3.16+g*.04+turn*.87);
  return <>
    <TiedBoat s={s}/>
    <Treasure at={w(...CHEST)} rock={.044*Math.sin(s*1.48)}/>
    {s<GOLD+.03&&<Dolphin nose={snout} yaw={-2.76+g*.19+turn*1.36} pitch={.22-.25*g-.24*turn} bank={-.12-.24*turn} t={s}/>}
    <Kid at={k} yaw={yaw} p={p} t={s} look={intend>.55?w(2.89,.45,-.78):w(1.71,-1.73,-3.13)}
      face={s<CHEST_CUE?"brave":s<LEAVE?"wow":"worried"}/>
    <Bubbles at={add(k,[-.20,.45,-.14])} t={s} size={.67}/>
    <Bubbles at={add(snout,[.11,-.13,0])} t={s+.68} seed={8} size={.57}/>
  </>;
}

export function LeaveGold({t}: {t:number}) {
  const s=cue("6.chest").start+t;
  const b=w(2.92+t*1.14,.032,1.52+t*3.57);
  return <>
    <Treasure at={w(...CHEST)}/>
    <Dinghy at={b} yaw={.34}/>
    <Dolphin nose={w(2.23+t*1.07,-1.02+.36*t,-2.43+t*3.48)} yaw={.31} pitch={-.123} t={s}/>
    <Bubbles at={w(2.49,-2.10,-2.91)} t={s} size={.54}/>
  </>;
}
