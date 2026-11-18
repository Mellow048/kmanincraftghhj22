import rawTiming from "./timing.json";
import type { Timing } from "../../engine/story";
import {
  Blocks,
  V,
  add,
  mix,
  wave,
  lerp,
  ease,
  sat,
  kernel,
  tub,
  journal,
  foldingJournal,
  seat,
  gold,
  cream,
  navy,
  cherry,
} from "./blocks";
import { person, Pose } from "./cast";
import { Room, sink, butter, clock } from "./sets";
// Imported JSON widens string literals; the strict narration build + final rehearsal validate this clock.
export const timing = rawTiming as Timing;
const cues = Object.fromEntries(timing.cues.map((c) => [c.id, c]));
let wi = 0;
const byCue = Object.fromEntries(
  timing.cues.map((c) => {
    const n = c.text.split(/\s+/).length;
    const words = timing.words.slice(wi, wi + n);
    wi += n;
    return [c.id, words];
  }),
);
export function word(id: string, w: string, occ = 0) {
  const v = byCue[id].filter(
    (a) => a.w.toLowerCase().replace(/[^a-z0-9']/g, "") === w,
  )[occ];
  if (!v) throw Error(`Missing ${id}:${w}`);
  return v.s - cues[id].start;
}
export const zoneFor = (id: string): Room =>
  id === "3.friday" ? "street" : /^[345]\./.test(id) ? "kitchen" : "cinema";
const palm: V = [-0.405, 1.425, 0.315],
  mouth: V = [0, 1.603, 0.29],
  brow: V = [-0.048, 1.959, 0.275],
  rim: V = [0.407, 1.255, 0.397];
export function arc(a: V, e: V, p: number, h: number): V {
  const f = sat(p);
  const n = mix(a, e, f);
  n[1] += 4 * f * (1 - f) * h;
  return n;
}
function spark(b: Blocks, p: V, age: number, col = gold) {
  if (age < 0 || age > 0.31) return;
  const f = age / 0.31;
  for (let i = 0; i < 5; i++) {
    const a = i * 2.399;
    b.box(
      add(p, [
        Math.cos(a) * (0.1 + f * 0.17),
        Math.sin(a) * (0.1 + f * 0.15),
        0.04,
      ]),
      [0.04 * (1 - f) + 0.006, 0.023, 0.018],
      col,
      [0, 0, a],
      0.3,
    );
  }
}
export type Flight = {
  at: number;
  end: V;
  hit?: boolean;
  len?: number;
  h?: number;
};
function drill(id: string): Flight[] {
  const s = byCue[id].map((w) => w.s - cues[id].start);
  return s.map((at, i) => ({
    at,
    end:
      id === "3.reps"
        ? [sink, butter, add(clock, [0, 0, 0.13])][i]
        : i === 2 && id === "1.trial"
          ? brow
          : mouth,
    hit: i === 2 && id === "1.trial",
    len: id === "3.reps" ? 0.39 : 0.325,
    h: id === "3.reps" ? 0.86 : 0.49,
  }));
}
const release: V = add(palm, [-0.012, 0.123, 0.035]);
function exercise(
  b: Blocks,
  t: number,
  events: Flight[],
  head = true,
  follow = false,
) {
  const followHand: V = [-0.416, 1.45, 0.338];
  let hand: V = follow ? followHand : [-0.4, 1.1, 0.28],
    open = 0.08,
    tilt = 0,
    up = 0.03,
    gaze = -0.45;
  for (const ev of events) {
    const d = t - ev.at,
      len = ev.len ?? 0.36;
    if (d >= -0.145 && d < 0)
      hand = mix(
        follow ? followHand : [-0.43, 0.98, 0.31],
        palm,
        ease((d + 0.145) / 0.145),
      );
    if (d >= 0 && d < len + 0.06) {
      const hold = 1 - ease((d - len * 0.48) / (len * 0.62));
      hand = mix(
        follow ? followHand : [-0.414, 1.018, 0.34],
        add(palm, [-0.02, 0.095 * wave(d / len), 0.018]),
        hold,
      );
      const f = sat(d / len);
      up = -0.115 * wave(f);
      gaze = -0.6 + f * 0.6;
      open = Math.max(open, 0.82 * ease((f - 0.43) / 0.47));
    }
    if (d >= 0 && d < len) {
      const pos = arc(release, ev.end, d / len, ev.h ?? 0.48);
      kernel(b, pos, 0.169, d * 9);
      if (d > 0.045) {
        const q = arc(release, ev.end, (d - 0.036) / len, ev.h ?? 0.48);
        b.box(q, [0.038, 0.042, 0.035], 0xffda86, [0, 0, d * 12], 0.16);
      }
    }
    if (ev.hit && d >= len && d < len + 0.55) {
      const age = d - len;
      kernel(
        b,
        arc(brow, rim, age / 0.33, 0.22),
        0.167,
        Math.min(0.33, age) * 11,
      );
      tilt = -0.13 * wave(age / 0.38);
      open = 0.76;
      spark(b, brow, age);
    }
    // Sample a real contact even when the acoustic impact falls between output frames.
    if (!ev.hit && head && d >= len && d < len + 0.055) {
      const q = sat((d - len) / 0.055);
      kernel(
        b,
        add(ev.end, [0, 0, 0.035 - 0.083 * q]),
        0.15 * (1 - 0.64 * q),
        d * 9,
      );
    }
    if (!ev.hit && d >= len && d < len + 0.17 && head) {
      open = 0.8 * (1 - ease((d - len) / 0.17));
    }
  }
  return { left: hand, mouth: open, tilt, up, gaze };
}
function posts(b: Blocks, raise: number) {
  for (const s of [-1, 1]) {
    b.box([s * 0.68, 0.045, 0.51], [0.22, 0.083, 0.22], 0x8b674b);
    b.box([s * 0.68, 0.43, 0.51], [0.044, 0.78, 0.044], gold);
    b.box([s * 0.68, 0.823, 0.51], [0.085, 0.081, 0.085], 0xffcf70);
  }
  for (let i = 0; i < 10; i++) {
    const pt = (j: number): V => {
      const v = j / 10;
      return [
        -0.68 + 1.36 * v,
        0.793 - 0.2 * Math.sin(Math.PI * v) + 0.52 * raise * v,
        0.51 - 0.43 * raise * v,
      ];
    };
    b.beam(pt(i), pt(i + 1), 0.045, 0.046, 0xbe4956);
  }
}
const extraColors = [0, 1, 2, 3, 4, 5, 6];
function crowd(b: Blocks, id: string, t: number, global: number, end = false) {
  for (let r = 0; r < 3; r++)
    for (const [k, col] of [-3, -1, 0, 1, 3].entries()) {
      const ix = (k + 3 * r) % 7,
        sc = 0.74 + (ix % 3) * 0.045,
        z = -1.62 - r * 1.18,
        x = col * 0.93,
        y = 0.19 + r * 0.29 + 0.112;
      const phase = global + ix * 0.57;
      const p: Pose = {
        sit: 1,
        turn: 0.07 * Math.sin(phase * 1.3),
        up: -0.035,
        mouth: 0.18 + 0.09 * Math.cos(phase * 2.1),
        shade: extraColors[ix],
      };
      if (end) {
        b.group(
          [x, y, z],
          [0, 0, 0],
          () => {
            let rep: Pose = {};
            b.group([0, -0.19, 0], [0, 0, 0], () => {
              rep = exercise(
                b,
                t,
                drill("7.echo").map((o, i) => ({
                  ...o,
                  h: 0.39,
                  ...(i === 2 && r === 0 && col === 0
                    ? { end: brow, hit: true }
                    : {}),
                })),
              );
            });
            person(
              b,
              "guest",
              [0, 0, 0],
              global,
              { ...p, ...rep, sit: 1, item: "tub" },
              0,
              1,
              ix,
            );
          },
          [sc, sc, sc],
        );
      } else {
        if (id === "6.three" && t > 1.03) {
          p.left = [-0.46, 1.7, 0.12];
          p.right = [0.47, 1.83, 0.1];
          p.mouth = 0.92;
        }
        person(b, "guest", [x, y, z], global, p, 0, sc, ix);
      }
    }
}
export function acting(id: string, t: number) {
  const b = new Blocks(),
    c = cues[id],
    g = c.start + t,
    p = sat(t / (c.end - c.start)),
    s = ease(p),
    zone = zoneFor(id);
  const K = (pose: Pose = {}, at: V = [0, 0, 0], yaw = 0) =>
    person(b, "kid", at, g, pose, yaw);
  const B = (pose: Pose = {}, at: V = [0.96, 0, -0.16], yaw = -0.2) =>
    person(b, "bea", at, g + 0.74, pose, yaw, 0.96);
  const face: Pose = {
    turn: 0.055 * Math.sin(g * 2.2),
    mouth: 0.2 + 0.1 * Math.sin(g * 4.1),
  };
  if (id === "1.trial" || id === "6.two" || id === "6.three") {
    // A rehearsal stand in the front row. Three lamps give the silent viewer the rhythm.
    const final = id !== "1.trial",
      third = id === "6.three",
      hits = third
        ? [0, 0, word(id, "down")]
        : final
          ? [0.53, 1.24, 99]
          : drill(id).map((o) => o.at + 0.325);
    b.group([0.02, 2.51, -0.72], [0, 0, 0], () => {
      b.box([0, -0.69, -0.1], [0.046, 1.3, 0.04], 0x667180);
      b.box([0, 0, 0], [1.32, 0.41, 0.075], 0x845640);
      b.box([0, 0, 0.045], [1.26, 0.361, 0.026], navy);
      b.text(
        final ? "THE FINAL" : "POPCORN DRILL",
        [0, 0.064, 0.069],
        0.016,
        cream,
        0.39,
      );
      for (let i = 0; i < 3; i++) {
        const lit = t >= hits[i];
        b.box(
          [(i - 1) * 0.26, -0.081, 0.068],
          [0.184, 0.052, 0.021],
          lit ? (i === 2 && !final ? 0xff7651 : 0x76e3b6) : 0x485b6b,
          [0, 0, 0],
          lit ? 0.38 : 0,
        );
      }
    });
  }
  if (id === "3.same") {
    b.group([0.8, 1.27, 0.34], [0, -0.09, -0.022], () => {
      b.box([0, -0.74, -0.07], [0.045, 1.36, 0.048], navy);
      b.box([0, 0, 0], [0.52, 0.84, 0.047], 0x222a38);
      b.box([0, 0, 0.031], [0.476, 0.734, 0.014], 0x335366);
      b.box([-0.164, 0.283, 0.049], [0.037, 0.036, 0.008], cherry);
      b.text("REC", [0, 0.285, 0.051], 0.015, cream);
      b.text("WHILE THEY", [0, 0.111, 0.052], 0.0076, cream);
      b.text("ARE OUT", [0, -0.002, 0.052], 0.009, cream);
      b.text("PARTYING", [0, -0.116, 0.052], 0.0085, cream);
      b.text("BTW", [0, -0.25, 0.052], 0.016, gold);
    });
  }
  if (id.startsWith("1.")) {
    if (id === "1.trial") {
      const q = exercise(b, t, drill(id));
      K({ ...q, item: "tub" });
      B({ item: "cup", turn: -0.22, worry: 0.55 }, [0.93, 0, -0.57]);
    }
    if (id === "1.two") {
      const u = t,
        hits: Flight[] = [
          { at: 0.07, end: mouth, len: 0.43 },
          { at: 0.68, end: mouth, len: 0.43 },
          { at: word(id, "one"), end: brow, hit: true, len: 0.43 },
        ];
      K({ ...exercise(b, u, hits), item: "tub" });
      B({ item: "cup", worry: 1 }, [0.93, 0, -0.57]);
    }
    if (id === "1.best") {
      K({
        ...face,
        item: "tub",
        left: [-0.23, 1.87, 0.28],
        tilt: 0.06 - 0.13 * s,
        mouth: 0.09,
      });
      kernel(b, [0.416, 1.29 + 0.02 * Math.sin(t * 9), 0.414], 0.17, 0.4);
      B({ item: "cup", turn: -0.34 }, [0.93, 0, -0.57]);
    }
    if (id === "1.drink") {
      K({ item: "tub", gaze: 1, turn: 0.18 });
      B(
        {
          item: "cup",
          right: [0.04 + 0.51 * s, 1.02 + 0.09 * wave(p), 0.33],
          turn: -0.26,
          tilt: 0.07 * s,
          worry: 0.74,
        },
        [0.93, 0, -0.42],
      );
    }
    if (id === "1.book" || id === "1.day") {
      const a = id === "1.book" ? ease((p - 0.08) / 0.65) : 1;
      K({
        left: [-0.16, 1.07 + 0.17 * a, 0.32],
        right: [0.24, 1.04 + 0.12 * a, 0.33],
        turn: 0.07,
        up: 0.09,
      });
      B({ turn: -0.48, up: 0.16, gaze: -1, worry: 0.85 });
      journal(
        b,
        [0.037, 0.91 + 0.31 * a, 0.426],
        [0.06, 0.025, -0.047],
        0.91,
        "log",
      );
    }
  }
  if (id.startsWith("2.")) {
    seat(b, 0, 0, 0, true);
    if (["2.gold", "2.win", "2.year"].includes(id)) {
      posts(b, 0);
      b.box([0, 1.51, -0.4], [0.97, 0.48, 0.05], navy);
      b.text("3 CATCHES", [0, 1.575, -0.367], 0.018, cream);
      b.text("1 YEAR", [0, 1.414, -0.366], 0.021, gold);
      K({ left: [-0.4, 1.2, 0.35], turn: -0.6 }, [1.23, 0, -0.12], -0.24);
      if (id === "2.win")
        for (let i = 0; i < 3; i++)
          kernel(
            b,
            [(i - 1) * 0.22, 0.91 + 0.07 * wave((t - i * 0.21) % 1), 0.3],
            0.118,
            i + t,
          );
    } else if (id === "2.fame")
      K(
        {
          left: [-0.44, 1.32, 0.28],
          right: [0.44, 1.37, 0.25],
          gaze: -0.8,
          turn: 0.13 * s,
        },
        [-0.3, 0, 0.98],
      );
    else {
      seat(b, 0.95, 0, 0.1, false, 0.08 + 0.87 * ease((p - 0.27) / 0.36));
      K(
        {
          sit: 0.9 - 0.36 * wave(p),
          mouth: 0.15 + 0.75 * wave(p),
          up: -0.16 * wave(p),
          left: [-0.5, 1.31 + 0.34 * wave(p), 0.16],
          right: [0.43, 1.39 + 0.35 * wave(p), 0.24],
        },
        [0.95, 0.14 * wave(p), 0.11 - s * 0.14],
      );
    }
  }
  if (id === "3.friday") {
    for (let i = 0; i < 3; i++) {
      const ph = g * 6 + i * 2;
      person(
        b,
        i === 0 ? "bea" : "guest",
        [
          (i - 1) * 0.82 + 0.18 * Math.sin(ph * 0.5),
          0.15 + 0.045 * Math.abs(Math.sin(ph)),
          -1.42 + (i % 2) * 0.28,
        ],
        g,
        {
          step: Math.sin(ph) * 0.53,
          left: [-0.47, 1.52 + 0.24 * Math.sin(ph), 0.2],
          right: [0.43, 1.52 - 0.27 * Math.sin(ph), 0.13],
          tilt: 0.08 * Math.sin(ph),
          mouth: 0.77,
        },
        0.15 * Math.sin(ph),
        0.9,
        i + 1,
      );
    }
  }
  if (zone === "kitchen") {
    if (id === "3.stay" || id === "3.same" || id === "3.ceiling") {
      K({
        item: "tub",
        left:
          id === "3.same"
            ? [-0.46 + 0.08 * s, 1.15 + 0.09 * s, 0.35]
            : [-0.45, 1.12 + 0.07 * wave(p), 0.24],
        up: id === "3.ceiling" ? -0.22 * s : 0.015,
        gaze: -0.4,
      });
      for (let i = 0; i < 3; i++)
        b.box([-0.39 + i * 0.38, 0.022, 0.33], [0.21, 0.011, 0.069], cream);
    }
    if (id === "3.ceiling" || id === "3.reps") {
      b.box([-0.31, 2.84, -0.08], [0.026, 0.49, 0.026], navy);
      b.box([-0.31, 2.56, -0.08], [0.45, 0.13, 0.37], 0x3b7374);
      b.box(
        [-0.31, 2.486, -0.08],
        [0.32, 0.031, 0.26],
        0xffdb91,
        [0, 0, 0],
        0.5,
      );
    }
    if (id === "3.reps") {
      const misses = drill(id);
      K({ ...exercise(b, t, misses, false), item: "tub", worry: 0.45 });
      for (const [i, o] of misses.entries()) {
        const age = t - o.at - 0.39;
        if (age >= 0) {
          kernel(b, add(o.end, [0, i < 2 ? 0.056 : 0, 0]), 0.147, i * 1.6);
          spark(b, o.end, age, i === 0 ? 0x91dcd8 : gold);
        }
      }
    }
    if (id === "4.sink") {
      const seq: Flight[] = [
        {
          at: word(id, "one"),
          end: add(sink, [0.045, 0.13, 0.06]),
          len: 0.53,
          h: 0.5,
        },
        {
          at: word(id, "one", 1),
          end: add(butter, [0, 0.11, 0]),
          len: 0.48,
          h: 0.55,
        },
      ];
      K({ ...exercise(b, t, seq, false), item: "tub" });
      for (const ev of seq)
        if (t > ev.at + ev.len!) {
          kernel(b, ev.end, 0.155, 1.4);
          spark(b, ev.end, t - ev.at - ev.len!, 0xa1e7dc);
        }
    }
    if (id === "4.clock" || id === "4.almost") {
      const e = add(clock, [0.025, 0.04, 0.157]);
      if (id === "4.clock") {
        kernel(
          b,
          arc([-0.53, 1.33, -0.05], e, t / 0.56, 0.41),
          0.162,
          sat(t / 0.56) * 4.7,
        );
        spark(b, e, t - 0.56);
      } else kernel(b, e, 0.162, 4.7);
      K({
        item: "tub",
        left: [-0.42, 1.44, 0.17],
        turn: 0.22 + 0.22 * s,
        tilt: 0.05 + 0.08 * s,
        mouth: id === "4.almost" ? 0.65 * wave(p) : 0.43,
        up: -0.14,
      });
      B({ turn: -0.3, tilt: -0.06 }, [1.24, 0, -0.25]);
    }
    if (id === "4.dots" || id === "4.gap") {
      const at: V = [0.03, 1.23, 0.48];
      const d = id === "4.dots" ? ease((p - 0.04) / 0.83) : 1;
      K({ right: [0.27, 1.06, 0.42], left: [-0.28, 1.04, 0.44], up: 0.13 });
      B({ left: [-0.44, 1.19, 0.39], up: 0.15, turn: -0.35 }, [0.81, 0, -0.07]);
      journal(b, at, [-0.12, 0.013, -0.015], 1, "dots", d);
      const xyz: V = [
        at[0] + lerp(-0.19, 0.222, d),
        at[1] - 0.043,
        at[2] + 0.09,
      ];
      b.beam(
        add(xyz, [0.025, 0.017, 0.006]),
        add(xyz, [0.27, 0.18, 0.023]),
        0.038,
        0.039,
        gold,
      );
      b.beam(xyz, add(xyz, [0.028, 0.019, 0.006]), 0.02, 0.02, navy);
    }
    if (["5.watch", "5.reach", "5.bucket", "5.what"].includes(id)) {
      let h: V = mix(
        palm,
        [0.356, 1.12, 0.396],
        id === "5.reach"
          ? s
          : id === "5.bucket"
            ? 1
            : id === "5.what"
              ? 1 - s
              : 0,
      );
      K({
        item: "tub",
        left: h,
        turn: 0.07 + 0.06 * s,
        up: id === "5.what" ? 0.16 * s : 0,
        worry: 0.6,
      });
      B(
        { left: [-0.58, 1.21 + 0.05 * s, 0.37], turn: -0.46, gaze: -1 },
        [0.96, 0, -0.18],
      );
      if (id === "5.reach") kernel(b, arc(palm, brow, p, 0.56), 0.17, t * 4);
      if (id === "5.bucket")
        kernel(b, arc(brow, rim, p, 0.22), 0.15, 3 + p * 2);
    }
    if (id === "5.drill") {
      K({ ...exercise(b, t, drill(id), true, true), item: "tub" });
      B(
        { left: [-0.39, 1.22, 0.3], turn: -0.38, mouth: 0.52 },
        [0.92, 0, -0.26],
      );
    }
  }
  if (id.startsWith("6.")) {
    crowd(b, id, t, g);
    if (id === "6.full" || id === "6.rope") {
      seat(b, 0, 0, 0.03, true);
      posts(b, id === "6.rope" ? s : 0);
      person(b, "usher", [0.8, 0, 0.05], g, {
        left: [-0.17, 1.01 + 0.31 * s, 0.28],
        turn: -0.33,
      });
    } else if (id === "6.pick") {
      const pos: V = [0.38, 0.76 * (1 - s) + 0.025, 0.37];
      K({
        right: [0.37, pos[1] + 0.17, 0.34],
        left: [-0.25, 1.1, 0.39],
        lean: 0.12 + 0.19 * wave(p),
        up: 0.12,
      });
      tub(b, pos, 0.93);
      for (let i = 0; i < 3; i++)
        kernel(b, [-0.33 + i * 0.076, 1.19, 0.41], 0.086, i);
    } else {
      const hits: Flight[] =
        id === "6.two"
          ? [
              { at: 0.05, end: mouth, len: 0.48 },
              { at: 0.74, end: mouth, len: 0.5 },
            ]
          : [
              {
                at: 0.2,
                end: mouth,
                len: Math.max(0.6, word(id, "down") - 0.2),
                h: 0.611,
              },
            ];
      K(exercise(b, t, hits, true, true));
      tub(b, [0.38, 0.025, 0.37], 0.93);
    }
  }
  if (id.startsWith("7.")) {
    const bpos: V = [0.96, 0, -0.05];
    const fold =
      id === "7.shut"
        ? ease((p - 0.08) / 0.51)
        : id === "7.research"
          ? 1
          : id === "7.wedge"
            ? 1 - ease((p - 0.34) / 0.52)
            : 0;
    seat(b, 0, 0, 0, true);
    seat(b, bpos[0], 0, bpos[2], false, fold);
    const sit = id === "7.mine" ? ease((p - 0.16) / 0.64) : 1;
    const book = id === "7.research" || id === "7.wedge";
    const travel = id === "7.wedge" ? ease((p - 0.24) / 0.52) : 0,
      lower = id === "7.wedge" ? 1 - ease((p - 0.81) / 0.17) : 1;
    const hand: V = book
      ? [
          0.31 + 0.19 * travel * lower,
          1.23 - 0.56 * travel * lower,
          0.36 - 0.11 * travel,
        ]
      : [0.42, 0.94, 0.17];
    K(
      {
        sit,
        right: hand,
        left: book ? [0.04, 1.1 - 0.14 * travel, 0.29] : [-0.38, 0.97, 0.17],
        turn: book ? 0.37 : id === "7.trailers" ? -0.41 * s : 0.14,
        tilt: book ? -0.09 * travel : 0,
        mouth: id === "7.mine" ? 0.65 : 0.23,
      },
      [book ? 0.08 * travel : 0, 0, 0],
    );
    if (id === "7.beside")
      B(
        {
          sit: ease((p - 0.5) / 0.44),
          step: Math.sin(p * 9) * (1 - sat(p * 1.6)),
        },
        add(bpos, [0.57 * (1 - s), 0, 0.3 * (1 - s)]),
        -0.07,
      );
    else if (id === "7.wedge") {
      const aside = ease(p / 0.32);
      B(
        {
          sit: 0.32 * (1 - aside),
          left: [-0.36, 1.31, 0.21],
          right: [0.38, 1.24, 0.24],
          turn: -0.56,
          up: 0.1,
          step: 0.29 * wave(aside),
        },
        add(bpos, [0.68 * aside, 0.03 * (1 - aside), 0.22 - 0.1 * aside]),
        -0.13,
      );
    } else if (id === "7.pair") {
      const back = ease(p / 0.54);
      B(
        {
          sit: ease((p - 0.24) / 0.52),
          turn: -0.26,
          mouth: 0.57,
          step: 0.25 * wave(back),
        },
        add(bpos, [0.68 * (1 - back), 0, 0.12 * (1 - back)]),
      );
    } else if (id === "7.shut" || id === "7.research")
      B(
        {
          sit: 1 - fold * 0.68,
          up: -0.17 * fold,
          mouth: 0.3 + 0.55 * fold,
          tilt: -0.13 * fold,
          left: [-0.35, 1.24 + 0.27 * fold, 0.17],
          right: [0.37, 1.23 + 0.31 * fold, 0.22],
        },
        add(bpos, [0, 0.03 * fold, 0.22 * fold]),
        -0.06,
      );
    else if (id !== "7.mine")
      B({ sit: 1, turn: -0.17 + 0.11 * s, mouth: 0.53 }, bpos, 0);
    if (id === "7.research")
      foldingJournal(b, [0.35, 1.09 + 0.12 * s, 0.42], [-0.26, 0.18, -0.12], 0);
    if (
      id === "7.wedge" ||
      ["7.pair", "7.trailers", "7.rows", "7.training", "7.echo"].includes(id)
    ) {
      const k = id === "7.wedge" ? travel : 1;
      foldingJournal(
        b,
        mix([0.35, 1.21, 0.42], [0.665, 0.313, 0.215], k),
        [lerp(-0.26, -1.53, k), lerp(0.18, 0.06, k), lerp(-0.12, 0, k)],
        id === "7.wedge" ? ease(p / 0.33) : 1,
      );
    }
    crowd(b, id, t, g, id === "7.echo");
  }
  return b.parts;
}
