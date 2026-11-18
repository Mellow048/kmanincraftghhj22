import { Blocks, V, add, mix, cup, tub, cream, gold } from "./blocks";
export type Role = "kid" | "bea" | "usher" | "guest";
export type Pose = {
  left?: V;
  right?: V;
  tilt?: number;
  turn?: number;
  up?: number;
  mouth?: number;
  blink?: number;
  gaze?: number;
  worry?: number;
  sit?: number;
  step?: number;
  lean?: number;
  item?: "cup" | "tub";
  shade?: number;
};
const skins = [0xdda078, 0xa96e52, 0xedba86, 0xab795e, 0x865842];
const hair = [0x46313b, 0x412834, 0x81513f, 0x493347, 0x2b3444];
const jackets = [
  0x1b9399, 0xaa5269, 0x254467, 0x748c52, 0x9974ac, 0x468ad1, 0xcf7650,
  0x4aa7a4,
];
export const restL: V = [-0.455, 0.92, 0.15],
  restR: V = [0.45, 0.91, 0.16];
/** Two-link block arms; a tossed object departs from the very same palm point the rig reaches. */
function arm(
  b: Blocks,
  s: number,
  hand: V,
  y: number,
  c: number,
  skin: number,
  role: Role,
) {
  const a: V = [s * 0.337, y, 0],
    el: V = [
      s * (0.405 + Math.max(0, hand[1] - 1.05) * 0.18),
      Math.min(y - 0.19, hand[1] - 0.01),
      Math.max(-0.14, hand[2] - 0.185),
    ];
  b.beam(a, el, 0.202, 0.22, c);
  const cuff = mix(el, hand, 0.64);
  b.beam(el, cuff, 0.165, 0.184, c);
  b.beam(
    cuff,
    mix(cuff, hand, 0.53),
    0.17,
    0.184,
    role === "kid" ? cream : 0xe5afb0,
  );
  b.beam(mix(cuff, hand, 0.45), hand, 0.144, 0.155, skin);
  b.box(hand, [0.166, 0.148, 0.167], skin, [0.08, 0, s * 0.07]);
  b.box(add(hand, [-s * 0.081, 0.023, 0.041]), [0.062, 0.075, 0.085], skin);
}
export function person(
  b: Blocks,
  role: Role,
  at: V,
  t: number,
  pose: Pose = {},
  yaw = 0,
  scale = 1,
  idx = 0,
) {
  const n =
    role === "kid" ? 0 : role === "bea" ? 1 : role === "usher" ? 2 : idx % 5;
  const skin = skins[n],
    h = hair[n],
    coat = role === "guest" ? jackets[3 + (idx % 5)] : jackets[n];
  const sit = pose.sit || 0,
    step = pose.step || 0,
    bob = 0.017 * Math.sin(t * 3.3 + idx * 1.9) + 0.025 * Math.abs(step);
  b.group(
    at,
    [0, yaw, 0],
    () => {
      // Feet stay on the floor when standing; sitting sends the knees forward, not through the cushion.
      for (const side of [-1, 1]) {
        const foot: V = [
          side * 0.159,
          0.108,
          sit * 0.38 + side * step * 0.28 + 0.045,
        ];
        const hip: V = [side * 0.148, 0.85 - sit * 0.15, -sit * 0.04];
        const knee: V = [
          side * 0.151,
          0.46 + sit * 0.23,
          0.02 + sit * 0.36 + side * step * 0.17,
        ];
        b.beam(hip, knee, 0.218, 0.238, 0x303951);
        b.beam(knee, add(foot, [0, 0.045, 0]), 0.192, 0.208, 0x3f4960);
        b.box(
          foot,
          [0.217, 0.144, 0.317],
          role === "kid" ? 0xf1e1bf : 0x443b49,
        );
        b.box(add(foot, [0, -0.067, 0.018]), [0.225, 0.049, 0.321], 0x282b3a);
      }
      const dy = -sit * 0.19 + bob;
      b.group(
        [0, dy, 0],
        [pose.lean || 0, 0, pose.tilt ? pose.tilt * 0.28 : 0],
        () => {
          b.box([0, 0.877, 0], [0.51, 0.151, 0.31], 0x354054);
          b.box([0, 1.164, 0], [0.543, 0.5, 0.329], coat);
          b.box([0, 1.37, 0], [0.59, 0.18, 0.35], coat);
          b.box(
            [0, 1.02, 0.168],
            [0.162, 0.3, 0.012],
            role === "kid" ? 0xf3c169 : 0xe7a9a0,
          );
          b.box(
            [-0.092, 1.2, 0.178],
            [0.025, 0.48, 0.017],
            role === "kid" ? 0xffe2a0 : 0xe4a28d,
          );
          b.box(
            [0.116, 1.31, 0.18],
            [0.096, 0.046, 0.015],
            role === "kid" ? 0xffae65 : cream,
          );
          b.box(
            [0, 0.91, 0.001],
            [0.543, 0.08, 0.34],
            role === "kid" ? 0x286f79 : 0x794556,
          );
          b.box([0, 1.473, 0.015], [0.2, 0.153, 0.21], skin);
          if (role === "kid") {
            // stitched jacket: stand collar, angled pockets and a little cinema ticket in the breast pocket
            b.box(
              [-0.17, 1.395, 0.181],
              [0.125, 0.088, 0.034],
              0x2a757f,
              [0, 0, -0.22],
            );
            b.box(
              [0.158, 1.395, 0.18],
              [0.13, 0.086, 0.034],
              0x338994,
              [0, 0, 0.2],
            );
            for (const side of [-1, 1])
              b.box(
                [side * 0.195, 1.013, 0.177],
                [0.109, 0.029, 0.019],
                0x175c69,
                [0, 0, side * 0.26],
              );
            b.box(
              [0.165, 1.306, 0.192],
              [0.11, 0.071, 0.016],
              0xf5d09c,
              [0, 0, -0.05],
            );
            b.box([0.164, 1.28, 0.2], [0.125, 0.051, 0.022], 0x277980);
            b.box([-0.09, 1.198, 0.199], [0.043, 0.076, 0.015], 0xeeb56f);
          }
          const L =
              pose.left ||
              add(restL, [0, Math.sin(t * 3.2) * 0.018, step * 0.12]),
            R =
              pose.right ||
              (pose.item === "tub"
                ? ([0.36, 0.92, 0.293] as V)
                : pose.item === "cup"
                  ? ([0.37, 1.05, 0.227] as V)
                  : add(restR, [0, -Math.sin(t * 3.2) * 0.014, -step * 0.12]));
          arm(b, -1, L, 1.37, coat, skin, role);
          arm(b, 1, R, 1.37, coat, skin, role);
          if (pose.item === "cup") cup(b, add(R, [0.055, 0.015, 0.036]), 1.1);
          if (pose.item === "tub") tub(b, add(R, [0.045, -0.155, 0.11]), 0.94);
          b.group(
            [0, 1.769, 0.009],
            [pose.up || 0, pose.turn || 0, pose.tilt || 0],
            () => {
              b.box([0, 0, 0], [0.58, 0.552, 0.51], skin);
              b.box([0, 0.148, -0.085], [0.6, 0.313, 0.395], h);
              b.box([0, 0.257, 0.012], [0.61, 0.12, 0.53], h);
              b.box([-0.245, 0.105, 0.017], [0.116, 0.23, 0.503], h);
              b.box([0.264, 0.127, -0.025], [0.078, 0.209, 0.466], h);
              if (role === "kid") {
                b.box([0, 0.22, 0.028], [0.613, 0.071, 0.525], 0xf6a53c);
                b.box(
                  [-0.073, 0.246, 0.15],
                  [0.26, 0.13, 0.25],
                  h,
                  [0, 0, -0.05],
                );
                b.box([-0.169, 0.186, 0.271], [0.177, 0.085, 0.042], h);
                b.box([0.179, 0.286, -0.061], [0.167, 0.095, 0.207], 0x573b40);
                b.box(
                  [-0.307, 0.215, -0.124],
                  [0.08, 0.071, 0.15],
                  0xe48b35,
                  [0, 0, 0.2],
                );
              } else if (role === "bea") {
                b.box(
                  [0.146, 0.28, -0.186],
                  [0.29, 0.265, 0.249],
                  h,
                  [0.1, 0.2, 0.13],
                );
                b.box([0.157, 0.282, -0.214], [0.31, 0.065, 0.289], gold);
                b.box([0, 0.18, 0.263], [0.52, 0.09, 0.036], h);
                b.box([0.236, -0.06, -0.037], [0.13, 0.32, 0.272], h);
              } else if (role === "usher") {
                b.box([0, 0.288, 0.025], [0.624, 0.133, 0.55], 0x243752);
                b.box([0, 0.217, 0.231], [0.64, 0.059, 0.222], 0x33374c);
                b.box([0, 0.285, 0.304], [0.085, 0.07, 0.012], gold);
              }
              if (role === "guest") {
                // silhouettes break up the three rows, even before the hands move in unison
                if (idx % 3 === 0) {
                  b.box(
                    [0.151, 0.262, -0.089],
                    [0.264, 0.171, 0.248],
                    h,
                    [0.06, 0.19, -0.07],
                  );
                  b.box(
                    [-0.089, 0.174, 0.259],
                    [0.322, 0.073, 0.044],
                    h,
                    [0, 0, -0.11],
                  );
                }
                if (idx % 3 === 1) {
                  b.box([0, 0.25, -0.016], [0.608, 0.118, 0.518], coat);
                  b.box([0, 0.198, 0.206], [0.616, 0.051, 0.232], coat);
                }
                if (idx % 3 === 2) {
                  b.box(
                    [-0.215, 0.218, 0.122],
                    [0.163, 0.209, 0.234],
                    h,
                    [0.12, 0.05, -0.18],
                  );
                  b.box(
                    [0.073, 0.297, 0.035],
                    [0.267, 0.088, 0.345],
                    h,
                    [0, 0, 0.07],
                  );
                }
              }
              const eyes =
                pose.blink ??
                Math.pow(Math.max(0, Math.cos(t * 1.73 + 1.1 + idx)), 80);
              const eyeH = 0.082 * (1 - eyes * 0.91);
              const gaze = pose.gaze || 0;
              for (const s of [-1, 1]) {
                const x = s * 0.139;
                b.box([x, 0.006, 0.263], [0.139, eyeH, 0.02], 0xffead8);
                b.box(
                  [x + 0.014 * gaze, 0.005, 0.278],
                  [0.064, eyeH * 0.97, 0.017],
                  0x282838,
                );
                if (eyes < 0.5)
                  b.box(
                    [x - 0.013 + 0.013 * gaze, 0.025, 0.289],
                    [0.018, 0.02, 0.012],
                    0xfffae1,
                  );
                b.box(
                  [x, 0.096 + 0.022 * (pose.worry || 0), 0.27],
                  [0.145, 0.029, 0.023],
                  h,
                  [0, 0, s * (pose.worry || 0) * 0.24],
                );
                b.box(
                  [s * 0.24, -0.069, 0.262],
                  [0.066, 0.032, 0.009],
                  role === "bea" ? 0xaf6c58 : 0xd68e74,
                );
              }
              if (role === "bea") {
                for (const s of [-1, 1]) {
                  const x = s * 0.143;
                  for (const sy of [-1, 1])
                    b.box(
                      [x, 0.008 + sy * 0.071, 0.294],
                      [0.236, 0.021, 0.022],
                      0xf6be72,
                    );
                  for (const sx of [-1, 1])
                    b.box(
                      [x + sx * 0.111, 0.009, 0.294],
                      [0.022, 0.145, 0.024],
                      0xf6be72,
                    );
                }
                b.box([0, 0.042, 0.296], [0.055, 0.023, 0.023], 0xf6be72);
              }
              b.box(
                [0, -0.055, 0.267],
                [0.078, 0.078, 0.076],
                role === "bea" ? 0xae7054 : 0xce946e,
              );
              const m = pose.mouth ?? 0.22;
              b.box(
                [0, -0.158, 0.265],
                [0.115 + 0.065 * m, 0.032 + 0.086 * m, 0.02],
                0x51303a,
              );
              if (m > 0.46)
                b.box(
                  [0, -0.164 - 0.037 * m, 0.278],
                  [0.085, 0.022, 0.009],
                  0xd47d77,
                );
            },
          );
        },
      );
    },
    [scale, scale, scale],
  );
}
