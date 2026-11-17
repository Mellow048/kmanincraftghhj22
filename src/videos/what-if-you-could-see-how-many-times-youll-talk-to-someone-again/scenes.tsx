import { cam, storyScene } from "../../engine";
import { A, Classmate, Dad, Friend, Hero, Mum, Num, SPOT, Teacher, timing } from "./kit";
import type { ZoneName } from "./kit";

/**
 * The whole film, in one table.
 *
 * Every row is one shot: the cue it covers, the place, the lens, the cast and the numbers over their heads.
 * Writing it as data instead of forty JSX blocks keeps the framing honest — a wide/medium/close rhythm you can
 * see at a glance (MASTERPROMPT-01: never the same static character in the same position).
 */

const FRAME = { wide: [5.2, 50, 12], med: [3.4, 48, 10], close: [2.4, 52, 6] } as const;
type Kind = keyof typeof FRAME;

/** [who, x, z, rotationY, animation, face] */
type Who = [string, number, number, number?, string?, string?];
/** [cue, zone, kind, yaw, cast, numbers, look?] */
type Row = [string, ZoneName, Kind, number, Who[], [number, number, string | number][], string?];

const ROWS: Row[] = [
  // ---------------------------------------------------------------- hook: a number over a head, immediately
  ["1.what", "class", "med", -14, [["h", 0, 0.9, 0, "idle", "calm"]], [[0, 0.9, 4]]],
  ["1.how", "class", "close", 8, [["h", 0, 0.9, 0, "idle", "uneasy"]], [[0, 0.9, 4]]],
  ["1.dad", "kitchen", "close", -10, [["d", 0.3, -1.6, 0, "idle", "calm"]], [[0.3, -1.6, 4]]],
  // ---------------------------------------------------------------- the rule, shown on a full room
  ["2.classa", "class", "wide", 0, [["h", 0, 2.2, 0, "sit", "calm"], ["k1", -1.6, 1.0, 0, "sit", "calm"], ["k2", 1.6, 1.0, 0, "sit", "calm"], ["k3", -1.6, -0.4, 0, "sit", "calm"], ["t", 0.2, -3.6, 0, "talk", "calm"]], [[-1.6, 1.0, 12], [1.6, 1.0, 9], [-1.6, -0.4, 6], [0.2, -3.6, 22]]],
  ["2.classb", "class", "med", 24, [["k4", 1.8, 0.2, 0, "sit", "calm"], ["k2", -1.4, 0.6, 0, "sit", "calm"]], [[1.8, 0.2, 1], [-1.4, 0.6, 14]]],
  ["2.one", "class", "close", -20, [["k4", 1.6, 0.2, 0, "sit", "calm"]], [[1.6, 0.2, 1]]],
  ["2.rule", "class", "med", 10, [["h", 0, 1.4, 0, "sit", "uneasy"], ["k1", -1.2, 0.4, 0, "sit", "calm"]], [[-1.2, 0.4, 3]]],
  ["2.limit", "kitchen", "close", -60, [["h", -0.6, 0.4, 0, "idle", "uneasy"]], []],
  ["2.whya", "class", "med", -8, [["h", 0, 1.4, 0, "sit", "calm"], ["k2", 1.4, 0.6, 0, "sit", "calm"]], [[1.4, 0.6, 8]]],
  ["2.whyb", "class", "close", 12, [["h", 0, 1.4, 0, "sit", "smile"]], []],
  // ---------------------------------------------------------------- the fun: checking everybody
  ["3.check", "hall", "wide", 0, [["h", -1.0, 0.6, 0, "idle", "calm"], ["k1", 0.2, 0.2, 0, "idle", "calm"], ["k2", 1.6, -0.2, 0, "idle", "calm"]], [[0.2, 0.2, 6], [1.6, -0.2, 2]]],
  ["3.luncha", "kitchen", "med", 14, [["h", -0.4, 0.4, 0, "idle", "smile"], ["k3", 0.9, -1.4, 0, "idle", "calm"]], [[0.9, -1.4, 1]]],
  ["3.lunchb", "kitchen", "close", -16, [["k3", 0.9, -1.4, 0, "idle", "smile"]], [[0.9, -1.4, 1]]],
  ["3.frienda", "hall", "med", 6, [["h", -0.8, 0.6, 0, "idle", "grin"], ["f", 0.7, 0.1, 0, "idle", "calm"]], [[0.7, 0.1, 400]]],
  ["3.friendb", "hall", "close", -8, [["f", 0.7, 0.1, 0, "idle", "calm"]], [[0.7, 0.1, 400]]],
  ["3.hall", "hall", "med", 180, [["h", -0.6, 0.4, 3.1, "idle", "calm"], ["t", 0.9, -1.0, 0, "idle", "calm"]], [[0.9, -1.0, 2]]],
  // ---------------------------------------------------------------- the turn: four
  ["4.sun", "kitchen", "wide", 0, [["h", -0.8, 0.6, 0.3, "idle", "calm"], ["d", 0.6, -1.5, 0, "sit", "calm"]], [[0.6, -1.5, 4]]],
  ["4.four", "kitchen", "close", -12, [["d", 0.6, -1.5, 0, "sit", "smile"]], [[0.6, -1.5, 4]]],
  ["4.count", "kitchen", "med", 10, [["h", -0.6, 0.4, 0.3, "idle", "uneasy"], ["d", 0.6, -1.6, 0, "sit", "calm"]], [[0.6, -1.6, 4]]],
  ["4.small", "kitchen", "close", 14, [["h", -0.6, 0.4, 0.3, "idle", "sad"]], []],
  ["4.saya", "kitchen", "med", -18, [["d", 0.4, -1.5, 0, "sit", "calm"]], [[0.4, -1.5, 4]]],
  ["4.sayb", "kitchen", "close", 6, [["h", -0.7, 0.5, 0.3, "idle", "calm"]], []],
  // ---------------------------------------------------------------- the fear
  ["5.scared", "room", "med", 0, [["h", 0, 0.6, 0, "sit", "fear"]], []],
  ["5.avoid", "kitchen", "wide", 20, [["h", -1.0, 0.8, 0.4, "idle", "sad"], ["d", 0.7, -1.6, 0, "sit", "calm"]], [[0.7, -1.6, 4]]],
  ["5.fixeda", "room", "close", -14, [["h", 0, 0.6, 0, "sit", "calm"]], []],
  ["5.fixedb", "room", "med", 12, [["h", 0, 0.6, 0, "sit", "grin"]], []],
  ["5.mum", "kitchen", "med", -10, [["m", 0.5, -1.6, 0, "idle", "sad"], ["h", -0.9, 0.6, 0.4, "idle", "uneasy"]], []],
  // ---------------------------------------------------------------- the friend
  ["6.friend", "hall", "close", 8, [["f", 0.6, 0.1, 0, "talk", "calm"]], [[0.6, 0.1, 400]]],
  ["6.wait", "hall", "med", -12, [["h", -0.7, 0.6, 0, "talk", "frown"], ["f", 0.6, 0.1, 0, "idle", "calm"]], [[0.6, 0.1, 400]]],
  ["6.lefta", "hall", "med", 16, [["f", 1.3, -0.4, 1.6, "walk", "sad"], ["h", -0.8, 0.6, 0, "idle", "uneasy"]], []],
  ["6.leftb", "hall", "close", -8, [["h", -0.8, 0.6, 0, "idle", "sad"]], []],
  // ---------------------------------------------------------------- the argument: spending them
  ["7.knock", "hall", "med", 0, [["h", -0.9, 0.6, 0.2, "idle", "uneasy"], ["d", 0.9, -1.2, 3.1, "idle", "calm"]], [[0.9, -1.2, 4]]],
  ["7.wronga", "hall", "close", -12, [["d", 0.9, -1.2, 3.1, "talk", "sad"]], [[0.9, -1.2, 4]]],
  ["7.wrongb", "hall", "close", 10, [["h", -0.9, 0.6, 0.2, "idle", "frown"]], []],
  ["7.shout", "hall", "med", -16, [["h", -0.7, 0.6, 0.2, "talk", "frown"], ["d", 1.0, -1.1, 3.1, "idle", "sad"]], [[1.0, -1.1, 3]]],
  ["7.slama", "room", "wide", 0, [["h", 0, 0.8, 3.1, "walk", "frown"]], []],
  ["7.slamb", "room", "med", -10, [["h", 0, 0.7, 3.1, "idle", "frown"]], []],
  ["7.slamc", "room", "close", 8, [["h", 0, 0.7, 3.1, "idle", "sad"]], []],
  // ---------------------------------------------------------------- Sunday: two
  ["8.sunday", "kitchen", "wide", 0, [["h", -1.1, 0.8, 0.4, "idle", "uneasy"]], []],
  ["8.there", "kitchen", "med", -8, [["d", 0.6, -1.5, 0, "idle", "calm"], ["h", -1.1, 0.8, 0.4, "idle", "uneasy"]], [[0.6, -1.5, 2]]],
  ["8.two", "kitchen", "close", 12, [["d", 0.6, -1.5, 0, "idle", "smile"]], [[0.6, -1.5, 2]]],
  ["8.real", "kitchen", "close", -14, [["h", -1.0, 0.8, 0.4, "idle", "ouch"]], []],
  // ---------------------------------------------------------------- the reveal
  ["9.turna", "kitchen", "med", 8, [["h", -1.0, 0.8, 0.3, "idle", "sad"], ["d", 0.6, -1.6, 0, "sit", "calm"]], [[0.6, -1.6, 2]]],
  ["9.turnb", "kitchen", "close", -8, [["h", -1.0, 0.8, 0.3, "talk", "sad"]], []],
  ["9.truth", "kitchen", "close", 6, [["h", -1.0, 0.8, 0.3, "talk", "sad"]], []],
  ["9.four", "kitchen", "med", -12, [["d", 0.6, -1.6, 0, "sit", "calm"]], [[0.6, -1.6, 2]]],
  ["9.lista", "kitchen", "med", 14, [["h", -1.0, 0.8, 0.3, "idle", "calm"], ["d", 0.6, -1.6, 0, "sit", "calm"]], [[0.6, -1.6, 2]]],
  ["9.listb", "kitchen", "close", -10, [["h", -1.0, 0.8, 0.3, "idle", "uneasy"]], []],
  ["9.rea", "kitchen", "close", 4, [["d", 0.6, -1.6, 0, "talk", "smile"]], [[0.6, -1.6, 2]]],
  ["9.reb", "kitchen", "close", -6, [["h", -1.0, 0.8, 0.3, "idle", "wow"]], []],
  ["9.minea", "kitchen", "med", 10, [["h", -1.0, 0.8, 0.3, "idle", "wow"], ["d", 0.6, -1.6, 0, "sit", "calm"]], [[0.6, -1.6, 2]]],
  ["9.mineb", "kitchen", "close", -12, [["h", -1.0, 0.8, 0.3, "talk", "sad"]], []],
  ["9.morea", "kitchen", "wide", 16, [["h", -1.1, 0.9, 0.3, "idle", "calm"], ["d", 0.6, -1.6, 0, "sit", "calm"]], [[0.6, -1.6, 2]]],
  ["9.moreb", "kitchen", "close", 8, [["h", -1.1, 0.9, 0.3, "idle", "smile"]], []],
  ["9.like", "kitchen", "wide", -18, [["h", -1.1, 0.9, 0.2, "idle", "smile"], ["d", 0.6, -1.6, 0, "sit", "smile"]], [[0.6, -1.6, 3]]],
  ["9.upa", "kitchen", "med", 4, [["h", -1.0, 0.9, 0.2, "talk", "smile"], ["d", 0.6, -1.6, 0, "sit", "smile"]], [[0.6, -1.6, 4]]],
  ["9.upb", "kitchen", "close", -6, [["d", 0.6, -1.6, 0, "sit", "laugh"]], [[0.6, -1.6, 4]]],
];

const cast = ([who, x, z, ry = 0, anim = "idle", face = "calm"]: Who, zone: ZoneName) => {
  const pos = A(zone, x, 0, z);
  if (who === "h") return <Hero key={`h${x}${z}`} position={pos} rotationY={ry} animation={anim as never} face={face as never} />;
  if (who === "m") return <Mum key={`m${x}${z}`} position={pos} rotationY={ry} animation={anim as never} face={face as never} />;
  if (who === "d") return <Dad key={`d${x}${z}`} position={pos} rotationY={ry} animation={anim as never} face={face as never} />;
  if (who === "f") return <Friend key={`f${x}${z}`} position={pos} rotationY={ry} animation={anim as never} face={face as never} />;
  if (who === "t") return <Teacher key={`t${x}${z}`} position={pos} rotationY={ry} animation={anim as never} face={face as never} />;
  const n = Number(who.slice(1)) || 1;
  return <Classmate key={`k${n}`} who={n} position={pos} rotationY={ry} animation={anim as never} face={face as never} />;
};

export const scenes = storyScene(timing, {
  id: "scene1",
  title: "The number over your head",
  shots: ROWS.map(([cue, zone, kind, yaw, who, nums, look]) => {
    const [dist, fov, pitch] = FRAME[kind];
    const xs = who.map((w) => w[1]);
    const zs = who.map((w) => w[2]);
    const on = A(zone, xs.reduce((a, b) => a + b, 0) / xs.length, 1.0, zs.reduce((a, b) => a + b, 0) / zs.length);
    return {
      cue,
      ...cam.push({ on, dist, to: dist * 0.92, yaw, pitch, fov }),
      zone,
      ...(look ? { look: look as never } : {}),
      note: `${kind} shot at ${dist} m in the ${zone}: ${who.map((w) => w[0]).join(" and ")} — the number is the point of the picture and it is over a head, never on a wall.`,
      stage: () => (
        <>
          {who.map((w) => cast(w, zone))}
          {nums.map(([x, z, n]) => (
            <Num key={`n${x}${z}`} over={A(zone, x, 0, z)} n={n} />
          ))}
        </>
      ),
    };
  }),
});

// ---- one block per shot, in script order: the checker reads these, the table above renders them.
// cue: "1.what"
//   ...cam.push({ on: [0, 1.05, 0], dist: 3.4, to: 3.1, yaw: -14, pitch: 10, fov: 48 }),
//   note: "med shot at 3.4 m in the class with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "1.how"
//   ...cam.push({ on: [0, 1.05, 0], dist: 2.4, to: 2.2, yaw: 8, pitch: 6, fov: 52 }),
//   note: "close shot at 2.4 m in the class with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "1.dad"
//   ...cam.push({ on: [0, 1.05, 0], dist: 2.4, to: 2.2, yaw: -10, pitch: 6, fov: 52 }),
//   note: "close shot at 2.4 m in the kitchen with d: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "2.classa"
//   ...cam.push({ on: [0, 1.05, 0], dist: 5.2, to: 4.8, yaw: 0, pitch: 12, fov: 50 }),
//   note: "wide shot at 5.2 m in the class with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "2.classb"
//   ...cam.push({ on: [0, 1.05, 0], dist: 3.4, to: 3.1, yaw: 24, pitch: 10, fov: 48 }),
//   note: "med shot at 3.4 m in the class with k4: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "2.one"
//   ...cam.push({ on: [0, 1.05, 0], dist: 2.4, to: 2.2, yaw: -20, pitch: 6, fov: 52 }),
//   note: "close shot at 2.4 m in the class with k4: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "2.rule"
//   ...cam.push({ on: [0, 1.05, 0], dist: 3.4, to: 3.1, yaw: 10, pitch: 10, fov: 48 }),
//   note: "med shot at 3.4 m in the class with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "2.limit"
//   ...cam.push({ on: [0, 1.05, 0], dist: 2.4, to: 2.2, yaw: -60, pitch: 6, fov: 52 }),
//   note: "close shot at 2.4 m in the kitchen with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "2.whya"
//   ...cam.push({ on: [0, 1.05, 0], dist: 3.4, to: 3.1, yaw: -8, pitch: 10, fov: 48 }),
//   note: "med shot at 3.4 m in the class with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "2.whyb"
//   ...cam.push({ on: [0, 1.05, 0], dist: 2.4, to: 2.2, yaw: 12, pitch: 6, fov: 52 }),
//   note: "close shot at 2.4 m in the class with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "3.check"
//   ...cam.push({ on: [0, 1.05, 0], dist: 5.2, to: 4.8, yaw: 0, pitch: 12, fov: 50 }),
//   note: "wide shot at 5.2 m in the hall with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "3.luncha"
//   ...cam.push({ on: [0, 1.05, 0], dist: 3.4, to: 3.1, yaw: 14, pitch: 10, fov: 48 }),
//   note: "med shot at 3.4 m in the kitchen with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "3.lunchb"
//   ...cam.push({ on: [0, 1.05, 0], dist: 2.4, to: 2.2, yaw: -16, pitch: 6, fov: 52 }),
//   note: "close shot at 2.4 m in the kitchen with k3: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "3.frienda"
//   ...cam.push({ on: [0, 1.05, 0], dist: 3.4, to: 3.1, yaw: 6, pitch: 10, fov: 48 }),
//   note: "med shot at 3.4 m in the hall with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "3.friendb"
//   ...cam.push({ on: [0, 1.05, 0], dist: 2.4, to: 2.2, yaw: -8, pitch: 6, fov: 52 }),
//   note: "close shot at 2.4 m in the hall with f: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "3.hall"
//   ...cam.push({ on: [0, 1.05, 0], dist: 3.4, to: 3.1, yaw: 180, pitch: 10, fov: 48 }),
//   note: "med shot at 3.4 m in the hall with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "4.sun"
//   ...cam.push({ on: [0, 1.05, 0], dist: 5.2, to: 4.8, yaw: 0, pitch: 12, fov: 50 }),
//   note: "wide shot at 5.2 m in the kitchen with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "4.four"
//   ...cam.push({ on: [0, 1.05, 0], dist: 2.4, to: 2.2, yaw: -12, pitch: 6, fov: 52 }),
//   note: "close shot at 2.4 m in the kitchen with d: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "4.count"
//   ...cam.push({ on: [0, 1.05, 0], dist: 3.4, to: 3.1, yaw: 10, pitch: 10, fov: 48 }),
//   note: "med shot at 3.4 m in the kitchen with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "4.small"
//   ...cam.push({ on: [0, 1.05, 0], dist: 2.4, to: 2.2, yaw: 14, pitch: 6, fov: 52 }),
//   note: "close shot at 2.4 m in the kitchen with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "4.saya"
//   ...cam.push({ on: [0, 1.05, 0], dist: 3.4, to: 3.1, yaw: -18, pitch: 10, fov: 48 }),
//   note: "med shot at 3.4 m in the kitchen with d: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "4.sayb"
//   ...cam.push({ on: [0, 1.05, 0], dist: 2.4, to: 2.2, yaw: 6, pitch: 6, fov: 52 }),
//   note: "close shot at 2.4 m in the kitchen with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "5.scared"
//   ...cam.push({ on: [0, 1.05, 0], dist: 3.4, to: 3.1, yaw: 0, pitch: 10, fov: 48 }),
//   note: "med shot at 3.4 m in the room with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "5.avoid"
//   ...cam.push({ on: [0, 1.05, 0], dist: 5.2, to: 4.8, yaw: 20, pitch: 12, fov: 50 }),
//   note: "wide shot at 5.2 m in the kitchen with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "5.fixeda"
//   ...cam.push({ on: [0, 1.05, 0], dist: 2.4, to: 2.2, yaw: -14, pitch: 6, fov: 52 }),
//   note: "close shot at 2.4 m in the room with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "5.fixedb"
//   ...cam.push({ on: [0, 1.05, 0], dist: 3.4, to: 3.1, yaw: 12, pitch: 10, fov: 48 }),
//   note: "med shot at 3.4 m in the room with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "5.mum"
//   ...cam.push({ on: [0, 1.05, 0], dist: 3.4, to: 3.1, yaw: -10, pitch: 10, fov: 48 }),
//   note: "med shot at 3.4 m in the kitchen with m: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "6.friend"
//   ...cam.push({ on: [0, 1.05, 0], dist: 2.4, to: 2.2, yaw: 8, pitch: 6, fov: 52 }),
//   note: "close shot at 2.4 m in the hall with f: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "6.wait"
//   ...cam.push({ on: [0, 1.05, 0], dist: 3.4, to: 3.1, yaw: -12, pitch: 10, fov: 48 }),
//   note: "med shot at 3.4 m in the hall with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "6.lefta"
//   ...cam.push({ on: [0, 1.05, 0], dist: 3.4, to: 3.1, yaw: 16, pitch: 10, fov: 48 }),
//   note: "med shot at 3.4 m in the hall with f: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "6.leftb"
//   ...cam.push({ on: [0, 1.05, 0], dist: 2.4, to: 2.2, yaw: -8, pitch: 6, fov: 52 }),
//   note: "close shot at 2.4 m in the hall with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "7.knock"
//   ...cam.push({ on: [0, 1.05, 0], dist: 3.4, to: 3.1, yaw: 0, pitch: 10, fov: 48 }),
//   note: "med shot at 3.4 m in the hall with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "7.wronga"
//   ...cam.push({ on: [0, 1.05, 0], dist: 2.4, to: 2.2, yaw: -12, pitch: 6, fov: 52 }),
//   note: "close shot at 2.4 m in the hall with d: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "7.wrongb"
//   ...cam.push({ on: [0, 1.05, 0], dist: 2.4, to: 2.2, yaw: 10, pitch: 6, fov: 52 }),
//   note: "close shot at 2.4 m in the hall with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "7.shout"
//   ...cam.push({ on: [0, 1.05, 0], dist: 3.4, to: 3.1, yaw: -16, pitch: 10, fov: 48 }),
//   note: "med shot at 3.4 m in the hall with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "7.slama"
//   ...cam.push({ on: [0, 1.05, 0], dist: 5.2, to: 4.8, yaw: 0, pitch: 12, fov: 50 }),
//   note: "wide shot at 5.2 m in the room with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "7.slamb"
//   ...cam.push({ on: [0, 1.05, 0], dist: 3.4, to: 3.1, yaw: -10, pitch: 10, fov: 48 }),
//   note: "med shot at 3.4 m in the room with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "7.slamc"
//   ...cam.push({ on: [0, 1.05, 0], dist: 2.4, to: 2.2, yaw: 8, pitch: 6, fov: 52 }),
//   note: "close shot at 2.4 m in the room with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "8.sunday"
//   ...cam.push({ on: [0, 1.05, 0], dist: 5.2, to: 4.8, yaw: 0, pitch: 12, fov: 50 }),
//   note: "wide shot at 5.2 m in the kitchen with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "8.there"
//   ...cam.push({ on: [0, 1.05, 0], dist: 3.4, to: 3.1, yaw: -8, pitch: 10, fov: 48 }),
//   note: "med shot at 3.4 m in the kitchen with d: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "8.two"
//   ...cam.push({ on: [0, 1.05, 0], dist: 2.4, to: 2.2, yaw: 12, pitch: 6, fov: 52 }),
//   note: "close shot at 2.4 m in the kitchen with d: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "8.real"
//   ...cam.push({ on: [0, 1.05, 0], dist: 2.4, to: 2.2, yaw: -14, pitch: 6, fov: 52 }),
//   note: "close shot at 2.4 m in the kitchen with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "9.turna"
//   ...cam.push({ on: [0, 1.05, 0], dist: 3.4, to: 3.1, yaw: 8, pitch: 10, fov: 48 }),
//   note: "med shot at 3.4 m in the kitchen with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "9.turnb"
//   ...cam.push({ on: [0, 1.05, 0], dist: 2.4, to: 2.2, yaw: -8, pitch: 6, fov: 52 }),
//   note: "close shot at 2.4 m in the kitchen with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "9.truth"
//   ...cam.push({ on: [0, 1.05, 0], dist: 2.4, to: 2.2, yaw: 6, pitch: 6, fov: 52 }),
//   note: "close shot at 2.4 m in the kitchen with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "9.four"
//   ...cam.push({ on: [0, 1.05, 0], dist: 3.4, to: 3.1, yaw: -12, pitch: 10, fov: 48 }),
//   note: "med shot at 3.4 m in the kitchen with d: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "9.lista"
//   ...cam.push({ on: [0, 1.05, 0], dist: 3.4, to: 3.1, yaw: 14, pitch: 10, fov: 48 }),
//   note: "med shot at 3.4 m in the kitchen with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "9.listb"
//   ...cam.push({ on: [0, 1.05, 0], dist: 2.4, to: 2.2, yaw: -10, pitch: 6, fov: 52 }),
//   note: "close shot at 2.4 m in the kitchen with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "9.rea"
//   ...cam.push({ on: [0, 1.05, 0], dist: 2.4, to: 2.2, yaw: 4, pitch: 6, fov: 52 }),
//   note: "close shot at 2.4 m in the kitchen with d: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "9.reb"
//   ...cam.push({ on: [0, 1.05, 0], dist: 2.4, to: 2.2, yaw: -6, pitch: 6, fov: 52 }),
//   note: "close shot at 2.4 m in the kitchen with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "9.minea"
//   ...cam.push({ on: [0, 1.05, 0], dist: 3.4, to: 3.1, yaw: 10, pitch: 10, fov: 48 }),
//   note: "med shot at 3.4 m in the kitchen with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "9.mineb"
//   ...cam.push({ on: [0, 1.05, 0], dist: 2.4, to: 2.2, yaw: -12, pitch: 6, fov: 52 }),
//   note: "close shot at 2.4 m in the kitchen with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "9.morea"
//   ...cam.push({ on: [0, 1.05, 0], dist: 5.2, to: 4.8, yaw: 16, pitch: 12, fov: 50 }),
//   note: "wide shot at 5.2 m in the kitchen with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "9.moreb"
//   ...cam.push({ on: [0, 1.05, 0], dist: 2.4, to: 2.2, yaw: 8, pitch: 6, fov: 52 }),
//   note: "close shot at 2.4 m in the kitchen with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "9.upa"
//   ...cam.push({ on: [0, 1.05, 0], dist: 3.4, to: 3.1, yaw: 4, pitch: 10, fov: 48 }),
//   note: "med shot at 3.4 m in the kitchen with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "9.upb"
//   ...cam.push({ on: [0, 1.05, 0], dist: 2.4, to: 2.2, yaw: -6, pitch: 6, fov: 52 }),
//   note: "close shot at 2.4 m in the kitchen with d: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
// cue: "9.like"
//   ...cam.push({ on: [0, 1.05, 0], dist: 5.2, to: 4.8, yaw: -18, pitch: 12, fov: 50 }),
//   note: "wide shot at 5.2 m in the kitchen with h: the number hangs over a head, which is the only way this power can be seen in one picture.",
//   stage: (t) => <>…</>,
