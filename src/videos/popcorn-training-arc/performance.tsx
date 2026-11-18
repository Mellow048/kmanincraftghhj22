import { Block, lerp, mulberry32, useTime, vlerp } from "../../engine";
import type { Vec3 } from "../../engine";
import edit from "./edit.json";
import { Bird, Coach, Finn, aimArm, beakOffset, headPoint, hop, neutral, palm, poseForTool, walking } from "./actors";
import type { Player } from "./actors";
import { BUCKET_X, BUCKET_Z, CUT, DESK, FPS, HOME_Z, MISS, REP, SINK, STAGE, SURFACE, TUG, WIN, between, countAt, gate, sweep, up } from "./marks";
import { Carton, Cord, DeskMouse, Dish, DrillBoard, Foam, Kernel, RepLights, Sponge } from "./props";

const MOUSE_X = DESK + .303;
const DISH_X = SINK + .268;
const TOOL_DELTA = .163;
const PAD_Y = SURFACE + .036;
const STAGE_AT: Vec3 = [STAGE, 0, HOME_Z + .025];
const CARTON: Vec3 = [BUCKET_X, PAD_Y, BUCKET_Z];
const TRIAL_CONTACTS = REP.trial.map((f) => f + edit.firstFlight);
const RETRY_CONTACTS = REP.retry.map((f) => f + edit.retryFlight);
const fMouse = (f: number) => sweep(f, REP.mouse, 6, TOOL_DELTA);
const fWipe = (f: number) => sweep(f, REP.wipe, 11, .169);
const press = (f: number, reps: number[]) => Math.max(...reps.map((r) => gate(f, r - 2, r + 1, r + 3, r + 9)));

function desk(f: number): Player {
  const at: Vec3 = [DESK - .067, 0, HOME_Z + .067];
  const yaw = .115;
  const shift = fMouse(f);
  const onMouse: Vec3 = [MOUSE_X + shift, SURFACE + .191, .647];
  const hands = poseForTool(at, yaw, onMouse);
  const lookup = gate(f, 31, 42, 72, 84);
  const p: Player = { at, yaw, pose: hands, face: f < 36 ? "brave" : "smile", gaze: lookup > .6 ? 1 : 0 };
  p.pose.head = [lerp(.28, -.035, lookup) + .09 * hop(f, 65, 78, 1), .23 * shift / TOOL_DELTA + .61 * lookup, -.05 + .065 * lookup];
  p.pose.armR = aimArm(p, onMouse);
  p.pose.armL = [-.11, 0, -.095];
  return p;
}

function wash(f: number): Player {
  const yaw = .17;
  const at: Vec3 = [SINK - .044, 0, HOME_Z + .069];
  const slide = fWipe(f);
  const front = f < REP.wipe[1] ? .651 : f < REP.wipe[2] ? .623 : .667;
  const target: Vec3 = [DISH_X + slide, SURFACE + .200, front];
  const p: Player = { at, yaw, pose: poseForTool(at, yaw, target), face: "brave" };
  p.pose.head = [.27 + .11 * press(f, REP.wipe), .28 + .37 * slide, -slide * .22];
  p.pose.armR = aimArm(p, target);
  p.pose.armL = [-.35, 0, -.16];
  return p;
}

/** One wind-up/release, not a looping throw animation. */
function catcher(f: number, retry: boolean): Player {
  const tosses = retry ? REP.retry : REP.trial;
  const contacts = retry ? RETRY_CONTACTS : TRIAL_CONTACTS;
  const windup = Math.max(...tosses.map((r) => gate(f, r - 8, r - 3, r - 2, r + 1)));
  const release = Math.max(...tosses.map((r) => gate(f, r - 2, r + 2, r + 4, r + 12)));
  const overhead = Math.max(...tosses.map((r) => gate(f, r, r + 5, r + 10, r + 17)));
  const chew = Math.max(...contacts.filter((r) => r !== MISS).map((r) => gate(f, r, r + 1, r + 2, r + 6)));
  const mouth = tosses.some((r, i) => f >= r + 6 && f <= contacts[i]);
  const flinch = retry ? 0 : gate(f, MISS, MISS + 3, MISS + 7, MISS + 19);
  const rub = retry ? 0 : gate(f, MISS + 5, MISS + 16, 325, 340);
  const toCoach = retry ? 0 : gate(f, 292, 311, 324, 339);
  const makeFist = retry ? gate(f, WIN, WIN + 9, TUG + 4, TUG + 14) : 0;
  const busted = retry ? up(f, TUG + 13, TUG + 25) : 0;
  const landing = retry ? hop(f, 568, 576, .022) : 0;
  const doubleTake = retry ? up(f, 578, 587) : 0;
  const p: Player = {
    at: [STAGE_AT[0] + busted * .14, landing, STAGE_AT[2] - .09 * flinch], yaw: .08 + .37 * busted,
    pose: neutral(.021 + .035 * windup + .057 * flinch), band: retry,
    face: (f >= MISS + 1 && !retry) ? f < 294 ? "ouch" : "uneasy"
      : busted > .3 ? "wow" : makeFist > .2 || chew > .3 ? "grin" : mouth ? "wow" : "brave",
  };
  p.pose.bodyPitch = -.105 * flinch - .06 * makeFist + .12 * busted;
  p.pose.head = [
    -.068 - .25 * overhead + .19 * flinch + .22 * busted - .06 * makeFist - .12 * doubleTake,
    .226 + .22 * windup - .60 * toCoach + .42 * busted - .55 * doubleTake,
    .035 + flinch * -.26 + .10 * Math.sin((f - MISS) * .27) * rub,
  ];
  // The +X fist is beside the trajectory, not in front of the face.
  p.pose.armR = [-.96 - .83 * release + .29 * windup, 0, .21 + .09 * release];
  p.pose.armL = [-.36 - .16 * overhead, 0, -.21];
  if (rub > 0) {
    const touch = aimArm(p, headPoint(p, [.233, .305, .219]));
    p.pose.armR = vlerp(p.pose.armR, touch, rub);
  }
  if (makeFist > 0) {
    p.pose.armR = vlerp(p.pose.armR, [-2.71, 0, .61], makeFist);
    p.pose.armL = vlerp(p.pose.armL, [-2.48, 0, -.49], makeFist);
  }
  if (busted > 0) {
    p.pose.armR = vlerp(p.pose.armR, [-.69, 0, -.16], busted);
    p.pose.armL = vlerp(p.pose.armL, [-.39, 0, -.62], busted);
  }
  return p;
}

function training(f: number): Player {
  // Load on the inhale, drive up on HUSS, settle, repeat. Knee bend matches
  // the hip drop. The kernel lift stays in camera even behind the bench.
  const loaded = Math.max(...REP.drill.map((r) => gate(f, r - 13, r - 1, r, r + 6)));
  const drive = Math.max(...REP.drill.map((r) => gate(f, r, r + 6, r + 8, r + 16)));
  const end = up(f, 422, CUT.retry);
  const p = catcher(CUT.retry, true);
  p.face = drive > .4 ? "grin" : "brave";
  p.pose = neutral(lerp(.04 + .257 * loaded, .021, end));
  p.pose.bodyPitch = loaded * .18;
  p.pose.head = [lerp(.09 + .15 * loaded - .26 * drive, -.068, end), .172 + .115 * drive, -.02 - .094 * loaded];
  p.pose.armR = [lerp(-1.02 + .23 * loaded - .98 * drive, -.96, end), 0, lerp(.18, .21, end)];
  p.pose.armL = [lerp(-.56 - .80 * drive + .12 * loaded, -.36, end), 0, -.24];
  return p;
}

function player(f: number): Player {
  if (f < 78) return desk(f);
  if (f < 114) return walking(f, 78, 114, desk(78), wash(114));
  if (f < 164) return wash(f);
  if (f < 208) return walking(f, 164, 208, wash(164), catcher(208, false));
  if (f < CUT.drills) return catcher(f, false);
  if (f < CUT.retry) return training(f);
  return catcher(f, true);
}

function cartonAndBird(f: number): { carton: Vec3; bird: Vec3; yaw: number; nod: number; cant: number } {
  const reach = up(f, TUG - 7, TUG);
  const watch = gate(f, 274, 286, 292, 316);
  const carry = up(f, TUG + 4, 571);
  const escape = up(f, 534, 579);
  const bounce = hop(f, 531, 546, .143) + hop(f, 548, 563, .123) + hop(f, 565, 578, .079);
  const yaw = lerp(-.44 - .83 * watch, -1.48 + .56 * escape, reach);
  const nod = lerp(.075 + .24 * watch, .89 - .55 * carry, reach);
  const cant = -.215 * up(f, TUG, TUG + 9) + .060 * escape;
  const off = beakOffset(yaw, nod);
  // Grip is by the small rim tab. Solve the peck mark from it, then parent the
  // whole carton to the beak's motion. The tab never leaves the beak on a hop.
  const tab: Vec3 = [.255 * Math.cos(cant) - .422 * Math.sin(cant), .255 * Math.sin(cant) + .422 * Math.cos(cant), 0];
  const gripAt: Vec3 = [CARTON[0] + tab[0], CARTON[1] + tab[1], CARTON[2]];
  const bird: Vec3 = [
    lerp(1.889 + .091 * watch, gripAt[0] - off[0] + .416 * carry, reach),
    lerp(PAD_Y + hop(f, 281, 293, .076), gripAt[1] - off[1] + .20 * carry + bounce, reach),
    lerp(.903, gripAt[2] - off[2] + .157 * escape, reach),
  ];
  const carton: Vec3 = f < TUG ? CARTON : [bird[0] + off[0] - tab[0], bird[1] + off[1] - tab[1], bird[2] + off[2] - tab[2]];
  return { carton, bird, yaw, nod, cant };
}

const Spark = ({ at, u, gold = false }: { at: Vec3; u: number; gold?: boolean }) => {
  if (u < 0 || u >= 1) return null;
  return <group position={at}>{Array.from({ length: gold ? 6 : 9 }, (_, i) => {
    const a = i * 2.39996;
    const d = (.075 + u * .22) * (1 - .13 * (i % 2));
    const s = (gold ? .049 : .079) * (1 - u * .83);
    return <Block key={i} position={[Math.cos(a) * d, Math.sin(a) * d + (gold ? u * .14 : 0), .055 + i * .008]} size={[s, s, s]}
      color={i % 2 ? "#fff3ba" : "#fdb253"} emissive="#ffab41" emissiveIntensity={.6} rotation={[u + i, .3 * i, a]} castShadow={false} />;
  })}</group>;
};

function CatchFlight({ f, retry }: { f: number; retry: boolean }) {
  const times = retry ? REP.retry : REP.trial;
  const contacts = retry ? RETRY_CONTACTS : TRIAL_CONTACTS;
  return <>{times.map((release, i) => {
    const end = contacts[i];
    const bad = end === MISS;
    // The release is at the moving hand. The destination is on the turned
    // head in *that frame*. No jumping a piece through the side of a cheek.
    const thrower = catcher(release + 1, retry);
    const source = palm(thrower, 1, [.011, -.64, .058]);
    const target = headPoint(catcher(end, retry), bad ? [.032, .335, .254] : [0, .084, .238]);
    const u = between(f, release + 1, end);
    const arc = (bad ? .594 : .480 + .037 * i) * 4 * u * (1 - u);
    const xyz = vlerp(source, target, u);
    xyz[1] += arc;
    const holding = f >= release - 7 && f <= release;
    const flying = f > release && f <= end;
    const bounce = bad && f > end && f < end + 32;
    if (holding) {
      const h = palm(catcher(f, retry), 1, [.011, -.64, .058]);
      return <Kernel key={release} at={h} scale={.87} />;
    }
    if (bounce) {
      const v = between(f, end, end + 15);
      const rebound: Vec3 = vlerp(target, [1.197, PAD_Y + .06, 1.065], v);
      rebound[1] += .39 * 4 * v * (1 - v) + hop(f, end + 15, end + 23, .096);
      return <group key={release}>
        <Kernel at={rebound} rotation={[f * .4, f * .19, 0]} />
        <Spark at={target} u={(f - end) / 11} />
      </group>;
    }
    if (flying) return <Kernel key={release} at={xyz} scale={bad ? 1.13 : .98} rotation={[u * 6, u * 8, u * 3]} />;
    return !bad && f >= end && f < end + 8 ? <Spark key={release} at={target} u={(f - end) / 8} gold /> : null;
  })}</>;
}

const Scatter = ({ f, from }: { f: number; from: Vec3 }) => {
  const rng = mulberry32(81);
  return <>{Array.from({ length: 5 }, (_, i) => {
    const delay = 533 + i * 2;
    const u = between(f, delay, delay + 17);
    const dx = -.13 - rng() * .22;
    const z = .26 * rng();
    if (f < delay || f >= delay + 17) return null;
    const base = cartonAndBird(delay).carton;
    return <Kernel key={i} at={[base[0] + dx * u, lerp(base[1] + .45, PAD_Y + .05, u) + .84 * u * (1 - u), lerp(base[2], from[2] + z, u)]}
      scale={.60 + i * .055} rotation={[i + 3 * u, i, u * 7]} />;
  })}</>;
};

export function Performance({ offset }: { offset: number }) {
  const f = offset + Math.round(useTime() * FPS);
  const p = player(f);
  const gear = cartonAndBird(f);
  const wipeX = DISH_X + fWipe(f);
  const wipeZ = f < REP.wipe[1] ? .651 : f < REP.wipe[2] ? .623 : .667;
  const mouse: Vec3 = [MOUSE_X + fMouse(f), SURFACE + .027, .749];
  const travelA = up(f, 68, 115), travelB = up(f, 164, 206);
  const coachAt: Vec3 = [lerp(-1.724, -.27, travelA) + .249 * travelB, 0, -.585 - .139 * travelA - .07 * travelB];
  const coachWalk = travelA * 1.01 + travelB * .28;
  const walkBlend = gate(f, 68, 76, 106, 115);
  const contact = f < CUT.retry ? TRIAL_CONTACTS : RETRY_CONTACTS;
  const drills = f >= CUT.drills && f < CUT.retry;
  const timing = f < CUT.sink ? REP.mouse : f < CUT.trial ? REP.wipe : drills ? REP.drill : contact;
  const showArm = f >= CUT.trial && f < CUT.drills ? gate(f, MISS + 6, 291, 329, CUT.drills) : 0;
  const activeLook: Vec3 = [p.at[0], p.at[1] + 1.49 - showArm * .16, p.at[2] + .13];
  const winCount = f < CUT.drills ? countAt(f, TRIAL_CONTACTS.slice(0, 2)) : f < CUT.retry ? countAt(f, REP.drill.map((x) => x + 6)) : countAt(f, RETRY_CONTACTS);
  return <>
    <Finn state={p} f={f} />
    <Coach f={f} offset={offset} at={coachAt} yaw={lerp(.04, 1.27, walkBlend)} look={f >= TUG + 9 ? gear.bird : activeLook}
      n={countAt(f, timing.map((n) => n + 3))} tap={press(f, timing)} travel={coachWalk} letdown={showArm} />

    <DeskMouse at={mouse} yaw={fMouse(f) * .66} />
    <Cord from={[mouse[0], mouse[1] + .028, mouse[2] - .143]} to={[MOUSE_X, SURFACE + .027, .48]} />
    <Cord from={[MOUSE_X, SURFACE + .027, .48]} to={[DESK - .42, SURFACE + .045, .59]} />
    <RepLights at={[DESK + .673, SURFACE + .015, 1.033]} scale={.76} n={countAt(f, REP.mouse.map((n) => n + 4))} />

    <Dish at={[DISH_X, SURFACE + .032, .647]} cleaned={countAt(f, REP.wipe.map((n) => n + 6))} />
    <Sponge at={[wipeX, SURFACE + .093, wipeZ]} yaw={-.06 + (wipeX - DISH_X) * .6} />
    <RepLights at={[SINK + .555, SURFACE + .010, .988]} scale={.77} n={countAt(f, REP.wipe.map((n) => n + 7))} />
    {REP.wipe.map((at) => <Foam key={at} x={wipeX} y={SURFACE + .142} z={wipeZ} progress={(f - at - 2) / 14} />)}

    <RepLights at={[BUCKET_X - .609, PAD_Y + .005, 1.042]} n={winCount} miss={f >= MISS && f < CUT.drills} />
    <Carton at={gear.carton} yaw={0} tilt={gear.cant} />
    <Bird at={gear.bird} yaw={gear.yaw} tilt={gear.nod} local={f - offset} />
    {drills && <>
      <DrillBoard at={[STAGE - .086, 2.330 - .067 * up(f, CUT.drills, CUT.drills + 7), -.032]} />
      <Kernel at={palm(p, 1, [.01, -.640, .058])} scale={lerp(1.12, .87, up(f, 423, CUT.retry))} />
    </>}
    {f >= CUT.trial && !drills ? <CatchFlight f={f} retry={f >= CUT.retry} /> : null}
    {f >= TUG ? <Scatter f={f} from={CARTON} /> : null}
  </>;
}
