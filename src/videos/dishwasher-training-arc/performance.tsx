import { Block, lerp, useTime } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bones, Finn, Jelly, Manager, Neighbor, aim, around, crouchForGrip, grip, idle, voice, walk } from "./actors";
import type { State } from "./actors";
import { CUT, FOLEY, FPS, HOME, MARK, PASS, REP, SHOP, mixVec, rise, sec, sweep, unit, window } from "./marks";
import { Cloth, EmeraldPiles, Mop, Plate, PlateStack, Scuffs, Suds, WetTrail } from "./props";

export const useFrameAt = (offset: number) => offset + Math.round(useTime()*FPS);
const END_FRONT:Vec3=[1.98,0,-.87];
const PLATE_COUNTER:Vec3=[-.96,PASS.surface+.014,1.405];
const OFFICE:Vec3=[-.97,0,2.03];
const JELLY_COUNTER:Vec3=[.166,.019,1.94];
const REACT:Vec3=[-.70,1.40,-1.03];
const latest = (f: number, hits: readonly number[]) => hits.reduce((n,v)=>v<=f?v:n,-Infinity);
const count = (f: number, hits: readonly number[], late=0) => hits.filter(at=>at+late<=f).length;

/** One start, one physical hand-to-sponge contact, one dirt segment per HUS. */
export function Washing({ f, take }: { f:number; take:"sink"|"proud"|"stack"|"shift"|"watch" }) {
  const job = take==="shift" || take==="watch";
  const set = job ? SHOP : HOME;
  const center = set.plate;
  const reps = take==="shift" ? FOLEY.jobWash : take==="watch" ? REP.watchWash : REP[take];
  const n = count(f,reps);
  const clean = count(f,reps,4.1);
  const atWash:Vec3 = [set.feet[0],0,set.feet[2]];
  const posing = take==="proud" ? rise(f,268,278) : 0;
  const startled = take==="proud" ? rise(f,MARK.bell,MARK.bell+4) : 0;
  const leaving = take==="proud" ? rise(f,MARK.bell+4,CUT.door) : 0;
  const goal = take==="sink" ? window(f,109,122,210,218):0;
  const x = sweep(f,reps,.144,5.7);
  // The sponge starts planted, including on the cut back from the door.
  const stroke=latest(f,reps);
  const cz=center[2]-.085+(Number.isFinite(stroke) ? .026*Math.sin((f-stroke)*.30) : 0);
  const target:Vec3=[center[0]+x,center[1]+.097,cz];
  const pose=crouchForGrip(atWash,0,target);
  const accent=Number.isFinite(latest(f,reps)) ? Math.sin(Math.PI*unit(f,latest(f,reps),latest(f,reps)+6)) : 0;
  pose.head=[.172+.035*accent-goal*.16-posing*.21+startled*.06,
              (goal>.5 ? -.20+.26*rise(f,161,180) : -.08)+startled*.66,
              .040*Math.sin(sec(f)*8)-posing*.070];
  pose.bodyY=lerp(pose.bodyY,-.012,goal*.65+posing*.86);
  const move=walk(f,MARK.bell+4,CUT.door,[atWash[0],0,atWash[2]],[.15,0,-.13],"surprised",2.21);
  const state:State = {at:mixVec(atWash,move.at,leaving),yaw:lerp(0,move.yaw,leaving),pose,
    face:startled>.5?"surprised":posing>.4?"smug":goal>.4?"smile":n===reps.length?"brave":"neutral",gaze:startled>.4?1:goal>.4?-1:0};
  pose.armR=aim(state,[target[0],target[1]+posing*.12+goal*.029,target[2]-posing*.107]);
  pose.armL=aim(state,[center[0]-.252,set.surface+.069,center[2]-.109],-1);
  pose.armL=[pose.armL[0]+posing*.91,0,pose.armL[2]-posing*.14];
  if (leaving>.02) state.pose=move.pose;
  const clothAt:Vec3=[target[0],center[1]+.060,cz];
  const palm=grip(state);
  const tower=take==="stack"?2**n:job?(take==="shift"?8:13)+n:take==="proud"?4+n:2+Math.floor(n/2);
  const right:Vec3=job?[.045,SHOP.surface+.021,-.47]:[take==="stack"?.381:.52,HOME.surface+.017,.714];
  return <>
    <Finn f={f} state={state} apron={job} talk={goal>.1||posing>.1} />
    <Plate at={center} dirty={Math.max(0,reps.length-clean+(job&&clean<3?2:0))} />
    {leaving>.25?<Cloth at={[center[0]+.29,center[1]+.037,center[2]-.158]} yaw={.23} />:
      <Cloth at={mixVec(clothAt,[palm[0],palm[1]-.036,palm[2]+.021],Math.max(goal*.52,posing))} yaw={-.09+x*.96} squash={accent} />}
    <Suds center={clothAt} f={f} reps={reps} />
    <PlateStack at={right} n={tower} f={f} newest={take==="stack"?tower/2:1} touched={latest(f,reps)} />
    {job && <PlateStack at={[-1.828,SHOP.surface+.018,-.386]} n={take==="shift"?4+n:8+n} />}
  </>;
}

export function DoorFriends({ f }: { f:number }) {
  const door=rise(f,MARK.doorOpens,364);
  const greet=window(f,359,365,376,391), invite=window(f,381,390,444,453);
  const refusal=window(f,452,460,488,494);
  const leave=rise(f,488,501);
  const waiting=walk(f,348,361,[1.86,0,-.44],END_FRONT,"neutral",-2.36);
  const state:State={...waiting,at:mixVec(waiting.at,[2.04,0,-.214],leave),yaw:lerp(-2.36,-.38,leave),face:refusal>.4?"frown":"neutral"};
  state.pose.head=[.052+.18*invite,.132-.26*invite,.07*refusal];
  state.pose.armR=aim(state,[1.42,1.02,-1.72+.65*door]);
  state.pose.armR=state.pose.armR.map((v,i)=>lerp(v,idle().armR[i],door)) as Vec3;
  if (refusal>.08) state.pose.armL=[-.70*refusal,0,-.44*refusal];
  return <>
    <Finn f={f} state={state} />
    <Bones f={f} at={[.66+.03*door,.016,-2.535+.13*greet]} yaw={.36} look={[1.48,1.41,-.61]} atDoor={greet+.19*(1-leave)} awe={refusal*.32} />
    <Jelly f={f} at={[1.54,.016,-2.697+.23*invite]} yaw={.02} scale={.92} jumping={.20+.75*invite} look={[1.68,1.42,-.69]} awe={refusal*.21} />
  </>;
}

export function Enter({ f }: { f: number }) {
  const state=walk(f,561,599,[1.51,0,-1.16],[2.06,0,-3.651],"brave",2.93);
  const p=around(state.at,state.yaw,[.16,.94,.46]);
  state.pose.armR=aim(state,p);
  state.pose.armL=aim(state,around(state.at,state.yaw,[-.20,.91,.42]),-1);
  return <><Finn f={f} state={state} />
    <Plate at={[p[0]-.13,p[1]+.025,p[2]]} rotation={[.20,state.yaw,.06]} />
  </>;
}

export function Interview({ f }: { f:number }) {
  const dry=window(f,652,658,699,714);
  const down=rise(f,768,792);
  const mop=rise(f,MARK.mopOffer,MARK.mopOffer+8);
  const pair=rise(f,MARK.double,MARK.double+5);
  const shift=window(f,602,608,631,644);
  const pose=idle(.026*down);
  pose.head=[.01+.29*down,lerp(-.06,-.18,down),-.045+.112*down];
  pose.bodyPitch=.12*down;
  const state:State={at:OFFICE,yaw:2.65,pose,face:down>.55?"uneasy":"smile",gaze:down>.4?-1:0};
  pose.armR=aim(state,mixVec(around(OFFICE,state.yaw,[.41,.755,.088]), [-.91,1.070,1.56],shift));
  pose.armL=[-.096-.43*shift,0,-.102];
  const mark=[.67,.012,1.521] satisfies Vec3, top=[.46,1.445,1.93] satisfies Vec3;
  return <>
    <Finn f={f} state={state} />
    <Manager f={f} look={dry>.13?[-.89,1.05,1.429]:pair>.8?[-.22,1.19,1.36]:[-.92,1.46,2.01]} point={mop*(.76-.42*pair)} />
    <Plate at={mixVec([-.98,1.06,1.586],PLATE_COUNTER,rise(f,600,604))} rotation={[0,-.16,0]} />
    <Mop floor={mixVec([.62,.005,.68],mark,mop)} top={mixVec([.62,1.41,.94],top,mop)} yaw={-.26} />
    {mop>.10&&<EmeraldPiles at={[-.185,PASS.surface+.012,1.536]} second={pair} />}
  </>;
}

type SweepPlan = { from:Vec3; to:Vec3; start:number; end:number; reps:readonly number[]; yaw?:number; reach?:number };
/** Floor puck plus a physical handle anchored to Finn's wrist. Body gait is driven by metres covered. */
function MopAction({ f, plan, apron=false }: {f:number;plan:SweepPlan;apron?:boolean}) {
  const yaw=plan.yaw??Math.atan2(plan.to[0]-plan.from[0],plan.to[2]-plan.from[2]);
  const s=walk(f,plan.start,plan.end,plan.from,plan.to,"brave",yaw);
  const p=s.pose;
  const x=sweep(f,plan.reps,plan.reach??.34,plan.reps[1]-plan.reps[0]>10?8.9:6.05);
  const push=Number.isFinite(latest(f,plan.reps))?Math.sin(Math.PI*unit(f,latest(f,plan.reps),latest(f,plan.reps)+8)):0;
  p.bodyY-=.075+.026*push;
  p.bodyPitch=.113+.061*push;
  p.head=[.235+.095*push, .31*x, -.10*x];
  const floor=around(s.at,yaw,[.14+x,0,.731+.102*push]);
  p.armR=aim(s,around(s.at,yaw,[.22+x*.49,1.061,.549+push*.05]));
  p.armL=[-.51-.20*push,0,-.219+x*.37];
  const hand=grip(s);
  const top:Vec3=[hand[0]+.156*(hand[0]-floor[0]),hand[1]+.156*(hand[1]-floor[1]),hand[2]+.156*(hand[2]-floor[2])];
  return <>
    <Finn f={f} state={s} talk={false} apron={apron} />
    <Mop floor={floor} top={top} yaw={yaw+.48*x} />
    <Suds center={floor} f={f} reps={plan.reps} kind="water" />
  </>;
}

const TRAINING: SweepPlan[] = [
  {from:[-.61,0,1.196],to:[-.43,0,2.109],start:829,end:865,reps:REP.homeMop.slice(0,2),yaw:.18},
  {from:[-4.82,0,.405],to:[-3.69,0,1.38],start:869,end:905,reps:REP.homeMop.slice(2,4),yaw:.708},
  {from:[-7.77,0,.458],to:[-7.10,0,1.702],start:908,end:945,reps:REP.homeMop.slice(4),yaw:.355},
];
export function HomeMop({ f }: {f:number}) {
  const i=f>=CUT.mopBedroom?2:f>=CUT.mopHall?1:0;
  const plan=TRAINING[i];
  const focus=around(mixVec(plan.from,plan.to,.52),plan.yaw??0,[.13,.014,.773]);
  const clear=.47*rise(f,plan.reps[0]+1,plan.reps[0]+12)+.63*rise(f,plan.reps[1]+1,plan.reps[1]+14);
  return <>
    <Scuffs at={focus} cleared={clear} extent={i===0?[1.26,1.17]:[1.31,1.44]} salt={i+1} />
    <WetTrail at={[focus[0],.008,focus[2]]} progress={clear} length={i===0?1.49:1.58} width={.95} />
    <MopAction f={f} plan={plan} />
  </>;
}

export function Retry({ f }: {f:number}) {
  const yes=rise(f,MARK.hireNod,MARK.hireNod+5);
  const plan: SweepPlan={from:[1.18,0,4.73],to:[1.06,0,3.43],start:950,end:985,reps:FOLEY.retry,yaw:Math.PI+.09,reach:.30};
  const clear=.52*rise(f,964,974)+.56*rise(f,975,985);
  const boss:Vec3=[-.172,0,3.587];
  return <>
    <Manager f={f} at={boss} yaw={2.4} look={f<981?[1.01,.13,3.10]:[1.08,1.40,3.65]} nod={yes} point={1-rise(f,970,980)} />
    <MopAction f={f} plan={plan} />
    <Scuffs at={[.935,.009,3.161]} cleared={clear} extent={[.95,1.417]} salt={21}/>
    <WetTrail at={[.9,.009,3.19]} progress={clear} length={1.47} width={.72} />
  </>;
}

export function JobMop({ f, watch=false }: { f:number; watch?:boolean }) {
  const reps=watch?REP.watchMop:FOLEY.jobMop;
  const plan: SweepPlan={from:[.95,0,-.627],to:[.995,0,.647],start:watch?1132:1038,end:watch?1158:1065,reps,yaw:.033,reach:.381};
  const clear=rise(f,reps[0]+2,reps[reps.length-1]+6);
  return <>
    <Scuffs at={[1.097,.012,.55]} cleared={clear*1.09} extent={[1.15,1.53]} salt={15}/>
    <WetTrail at={[1.12,.008,.56]} progress={clear} length={1.75} width={1.14} />
    <MopAction f={f} plan={plan} apron />
    <PlateStack at={[.007,SHOP.surface+.014,-.456]} n={9} />
  </>;
}

export function Arrivals({ f }: { f:number }) {
  const skel=walk(f,1064,1103,[.664,0,5.53],[.66,0,3.04],"happy");
  const slime=walk(f,1065,1106,[1.355,.02,5.58],[1.30,.02,3.17],"happy");
  return <>
    <Bones f={f} at={skel.at} yaw={Math.PI} moved={5.53-skel.at[2]} awe={rise(f,1084,1104)*.66} />
    <Jelly f={f} at={slime.at} yaw={Math.PI+.08} scale={.92} jumping={.72} />
    {Array.from({length:7},(_,i)=>{
      const x = 1.04 + (i%2===0?-.55:.50) + ((i%3)-1)*.12;
      const p=walk(f,1064+i*4,1108+i*4,[x+(i%3-1)*.24,0,6.26+(i>>1)*.63],[x,0,3.7+(i>>1)*.55]);
      return <Neighbor key={i} i={i} at={p.at} yaw={p.yaw} distance={6.26+(i>>1)*.63-p.at[2]} />;
    })}
  </>;
}

export function Watching({ f }: { f:number }) {
  const awe=rise(f,1108,1149);
  return <>
    <Bones f={f} at={f<CUT.watchMop?[-1.23,0,1.996]:[-.07,0,2.108]} yaw={Math.PI-.32} look={f<CUT.watchMop?REACT:[1.0,.68,.50]} awe={.22+.77*awe} />
    <Jelly f={f} at={[.051,.005,2.02]} yaw={-2.84} look={f<CUT.watchMop?REACT:[1.0,.68,.50]} scale={.93} jumping={.08+awe*.35} awe={awe} />
    <Neighbor i={1} at={[1.09,0,2.98]} yaw={-2.80} awe={awe} />
    <Neighbor i={0} at={[1.55,0,3.31]} yaw={-2.78} awe={awe} />
  </>;
}

export function Impressed({ f }: { f:number }) {
  const j=rise(f,CUT.impressed,CUT.impressed+9);
  return <>
    <Bones f={f} at={[.49,0,3.185]} yaw={-2.84} look={[-.76,1.34,1.7]} awe={.75+.24*j} />
    <Jelly f={f} at={[1.29,.014,3.07]} yaw={-2.69} scale={.92} jumping={.11+j*.61} awe={.69+.24*j} />
    <Neighbor i={0} at={[-.10,0,3.91]} yaw={-2.80} awe={.92} />
    <Neighbor i={1} at={[1.45,0,3.89]} yaw={-2.89} awe={.88} />
    <Neighbor i={2} at={[.91,0,4.26]} yaw={-2.96} awe={.91} />
  </>;
}

export function Counter({ f }: {f:number}) {
  const moving=walk(f,1163,1184,[1.055,0,.633],PASS.feet,"calm");
  const ready=rise(f,1177,1184);
  const attention=rise(f,1206,1218);
  const x=sweep(f,REP.counter,.193,5.86);
  const heap=PASS.surface+.014;
  const clothAt:Vec3=[PASS.x+x,heap+.02,PASS.z+.082];
  const desired:Vec3=[clothAt[0],clothAt[1]+.036,clothAt[2]-.082];
  const task=crouchForGrip(PASS.feet,0,desired);
  task.head=[.01+.33*attention,.24*(1-attention),.04*(1-attention)];
  const state:State={...moving,yaw:lerp(moving.yaw,0,ready),pose:ready>.995?task:moving.pose,face:attention>.3?"brave":"calm",gaze:attention>.4?0:1};
  if (ready>.9) {
    state.pose.armR=aim(state,mixVec(around(state.at,0,[.355,.766,.137]),desired,attention));
    state.pose.armL=aim(state,[PASS.x-.275,PASS.surface+.085,PASS.z-.11],-1);
  }
  const ask=window(f,1184,1189,1209,1216);
  const cleaned=count(f,REP.counter,4.1);
  return <>
    <Finn f={f} state={state} apron talk={false} />
    <Jelly f={f} at={JELLY_COUNTER} yaw={-1.43-.21*ask} scale={.84} jumping={.12+.51*ask} />
    <PlateStack at={[-1.32,PASS.surface+.02,1.387]} n={4} />
    {[0,1,2].map(i=>cleaned>i?null:<Block key={i} position={[-.85+i*.215,heap,PASS.z+.054]} size={[.119,.007,.099]} color={i%2?"#704739":"#8f5942"} rotation={[0,i*.65+.7,0]} castShadow={false}/>)}
    <Cloth at={attention>.23?mixVec([PASS.x-.285,heap+.017,PASS.z-.076],clothAt,attention):[PASS.x-.285,heap+.017,PASS.z-.076]} yaw={.098+x} kind="cloth" />
    <Suds center={clothAt} f={f} reps={REP.counter} kind="buff" />
  </>;
}
