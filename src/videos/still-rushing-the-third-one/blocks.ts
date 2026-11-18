import { Matrix4, Quaternion, Euler, Vector3 } from "three";
import { wordBitmap } from "../../engine/pixelfont";

// Both the production renderer and the Remotion composition consume these *same* world-space instances.
export type V = [number, number, number];
export const add = (a: V, b: V): V => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
export const mix = (a: V, b: V, p: number): V =>
  a.map((x, i) => lerp(x, b[i], p)) as V;
export const sat = (n: number) => Math.min(1, Math.max(0, n));
export const ease = (x: number) => {
  const p = sat(x);
  return p * p * (3 - 2 * p);
};
export const wave = (t: number) => Math.sin(Math.PI * sat(t));
const z: V = [0, 0, 0],
  one: V = [1, 1, 1];
export type Cube = { matrix: Matrix4; rgb: number; glow: number };
const bitmap = new Map<string, ReturnType<typeof wordBitmap>>();
export class Blocks {
  parts: Cube[] = [];
  private transform = new Matrix4();
  private mat(p: V, r: V, s: V) {
    return new Matrix4().compose(
      new Vector3(...p),
      new Quaternion().setFromEuler(new Euler(...r, "YXZ")),
      new Vector3(...s),
    );
  }
  group(p: V, r: V, fn: () => void, s: V = one) {
    const old = this.transform;
    this.transform = old.clone().multiply(this.mat(p, r, s));
    try {
      fn();
    } finally {
      this.transform = old;
    }
  }
  box(p: V, s: V, rgb: number, r: V = z, glow = 0) {
    this.parts.push({
      matrix: this.transform.clone().multiply(this.mat(p, r, s)),
      rgb,
      glow,
    });
  }
  beam(a: V, b: V, w: number, d: number, c: number) {
    let v = new Vector3(...b).sub(new Vector3(...a));
    let len = v.length();
    if (len < 0.001) return;
    const q = new Quaternion().setFromUnitVectors(
      new Vector3(0, 1, 0),
      v.normalize(),
    );
    this.parts.push({
      matrix: this.transform
        .clone()
        .multiply(
          new Matrix4().compose(
            new Vector3(...mix(a, b, 0.5)),
            q,
            new Vector3(w, len, d),
          ),
        ),
      rgb: c,
      glow: 0,
    });
  }
  text(txt: string, p: V, px: number, c: number, glow = 0.16) {
    let g = bitmap.get(txt);
    if (!g) {
      g = wordBitmap(txt);
      bitmap.set(txt, g);
    }
    const { rows, width } = g;
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < width; x++) {
        if (!rows[y][x]) continue;
        let j = x + 1;
        while (j < width && rows[y][j]) j++;
        this.box(
          [p[0] + ((x + j) / 2 - width / 2) * px, p[1] + (3 - y) * px, p[2]],
          [(j - x) * px, px, 0.004],
          c,
          z,
          glow,
        );
        x = j - 1;
      }
    }
  }
}
export const gold = 0xffbb46,
  cream = 0xffedc2,
  navy = 0x18263e,
  aqua = 0x71dcd8,
  cherry = 0xc8364e;
export function kernel(b: Blocks, p: V, size = 0.15, spin = 0) {
  b.group(
    p,
    [0.27 + spin, spin * 0.7, 0.25 + spin],
    () => {
      b.box([0, -0.12, 0], [0.52, 0.48, 0.46], 0xcc8a45);
      // Stepped cauliflower silhouette: separate cream lobes and a toasted centre, not a butter cube.
      const puff = (
        x: number,
        y: number,
        z: number,
        w: number,
        c: number,
        r: number,
      ) =>
        b.group([x, y, z], [r * 0.32, r, r * 0.47], () => {
          b.box([0, 0, 0], [w, w * 0.6, w * 0.84], c);
          b.box([0, 0.015, 0], [w * 0.7, w * 0.9, w * 0.67], c);
          b.box([0, -0.01, 0], [w * 0.69, w * 0.53, w], c);
        });
      puff(-0.31, 0.03, 0.05, 0.62, 0xfff0c9, -0.52);
      puff(0.27, -0.13, 0.1, 0.63, 0xffe5ad, 0.51);
      puff(0.12, 0.32, -0.04, 0.64, 0xfff4d5, 0.22);
      puff(-0.045, -0.08, 0.31, 0.46, 0xf8d798, -0.34);
      b.box(
        [0.052, 0.065, 0.393],
        [0.107, 0.104, 0.047],
        0xaf6e38,
        [0, 0, 0.49],
      );
    },
    [size, size, size],
  );
}
export function tub(b: Blocks, p: V, s = 1, fill = true) {
  b.group(
    p,
    [0, -0.09, 0.035],
    () => {
      for (let i = 0; i < 5; i++) {
        const w = 0.41 + i * 0.028;
        b.box([0, 0.05 + i * 0.087, 0], [w, 0.09, w * 0.82], 0xffe9cb);
        for (const k of [-1, 0, 1]) {
          b.box(
            [(k * w) / 3, 0.05 + i * 0.087, w * 0.411],
            [w * 0.163, 0.09, 0.008],
            cherry,
          );
          b.box(
            [w * 0.501, 0.05 + i * 0.087, k * w * 0.27],
            [0.009, 0.09, w * 0.13],
            cherry,
          );
        }
      }
      b.box([0, 0.465, 0], [0.56, 0.055, 0.456], cream);
      b.box([0, 0.495, 0], [0.49, 0.009, 0.393], 0x794927);
      if (fill)
        for (let i = 0; i < 12; i++)
          kernel(
            b,
            [
              ((i % 4) - 1.5) * 0.113,
              0.51 + 0.022 * Math.sin(i * 3),
              (Math.floor(i / 4) - 1) * 0.117,
            ],
            0.134,
            i * 1.9,
          );
      b.box([0, 0.255, 0.212], [0.27, 0.136, 0.012], 0xb52a42);
      b.text("POP", [0, 0.256, 0.223], 0.012, cream);
    },
    [s, s, s],
  );
}
export function cup(b: Blocks, p: V, s = 1) {
  b.group(
    p,
    [0, 0.09, -0.03],
    () => {
      b.box([0, 0.13, 0], [0.19, 0.26, 0.17], 0x28a89f);
      b.box([0, 0.273, 0], [0.214, 0.039, 0.193], cream);
      b.box([0.019, 0.387, 0], [0.024, 0.21, 0.024], 0xf5736c, [0, 0, -0.16]);
      b.box([0, 0.13, 0.089], [0.16, 0.029, 0.008], cream);
    },
    [s, s, s],
  );
}
export function journal(
  b: Blocks,
  p: V,
  rot: V,
  s = 1,
  page = "cover",
  draw = 1,
) {
  b.group(
    p,
    rot,
    () => {
      b.box([0, 0, 0], [0.79, 1.03, 0.079], 0x127680);
      b.box(
        [0.015, 0, 0.047],
        [0.73, 0.977, 0.025],
        page === "cover" ? 0x258e93 : 0xffeac4,
      );
      b.box([-0.37, 0, 0.069], [0.044, 1, 0.019], 0x1a3844);
      for (let i = 0; i < 6; i++)
        b.box([-0.34, 0.4 - i * 0.157, 0.085], [0.113, 0.025, 0.024], 0xd5bb81);
      if (page === "cover") {
        b.text("FIELD", [0, 0.16, 0.066], 0.019, cream);
        b.text("NOTES", [0, -0.05, 0.066], 0.0185, cream);
        b.box([0.075, -0.31, 0.071], [0.32, 0.026, 0.011], gold);
      } else {
        b.text("DAY 47", [0.02, 0.345, 0.069], 0.015, 0x253a52, 0);
        b.box([0.03, 0.218, 0.071], [0.56, 0.014, 0.008], 0xd0936a);
        if (page === "log") {
          b.text("STILL", [0.02, 0.106, 0.071], 0.014, 0x34334c, 0);
          b.text("RUSHING", [0.02, -0.016, 0.071], 0.014, 0x34334c, 0);
          b.text("THE THIRD", [0.02, -0.142, 0.071], 0.012, 0x34334c, 0);
          b.text("ONE", [0.02, -0.273, 0.071], 0.014, 0xb24a45, 0);
          b.box(
            [0.019, -0.357, 0.071],
            [0.22, 0.011, 0.006],
            0xb24a45,
            [0, 0, 0.035],
          );
        } else {
          b.text("THIRD TOSS", [0.02, 0.11, 0.069], 0.009, 0x51465e, 0);
          for (let j = 0; j < 3; j++)
            b.box(
              [0.04, -0.075 - j * 0.132, 0.068],
              [0.54, 0.009, 0.005],
              0x85a7a5,
            );
        }
        if (page === "dots") {
          [-0.18, -0.075, 0.221].forEach((x, i) => {
            if (draw > (i + 0.2) / 3)
              b.box(
                [x, -0.046, 0.079],
                [0.054, 0.052, 0.018],
                i === 2 ? 0xc7464c : 0x285778,
              );
          });
        }
      }
    },
    [s, s, s],
  );
}
export function seat(
  b: Blocks,
  x: number,
  y: number,
  z: number,
  prize = false,
  fold = 0,
) {
  b.group([x, y, z], [0, 0, 0], () => {
    const velvet = prize ? 0xe5a43b : 0x9e324e,
      pad = prize ? 0xffce68 : 0xc75063,
      trim = prize ? 0xbf792b : 0x62243b;
    b.box([0, 0.26, -0.05], [0.23, 0.49, 0.24], 0x273044);
    b.box([0, 0.043, -0.02], [0.61, 0.079, 0.49], 0x323747);
    b.box([0, 0.73, -0.26], [0.75, 0.84, 0.15], trim, [-0.065, 0, 0]);
    b.box([0, 0.77, -0.17], [0.68, 0.66, 0.095], velvet, [-0.065, 0, 0]);
    b.box([0, 1.03, -0.125], [0.58, 0.15, 0.055], pad);
    for (let i = 0; i < 3; i++)
      b.box([(i - 1) * 0.177, 0.787, -0.106], [0.024, 0.24, 0.014], trim);
    b.group([0, 0.5, -0.16], [-fold * 1.18, 0, 0], () => {
      b.box([0, 0, 0.235], [0.67, 0.147, 0.54], velvet);
      b.box([0, 0.071, 0.245], [0.65, 0.032, 0.51], pad);
    });
    for (const side of [-1, 1]) {
      b.box([side * 0.389, 0.46, -0.085], [0.086, 0.38, 0.11], trim);
      b.box([side * 0.389, 0.66, 0.058], [0.115, 0.093, 0.46], 0x383342);
      b.box(
        [side * 0.389, 0.707, 0.055],
        [0.104, 0.022, 0.41],
        prize ? gold : 0xb77756,
      );
    }
    b.box([-0.307, 0.266, 0.14], [0.17, 0.054, 0.32], 0xb18454);
    b.box([-0.278, 0.177, 0.041], [0.073, 0.17, 0.066], 0x5c4a49);
    b.box([-0.204, 0.122, 0.034], [0.214, 0.057, 0.071], 0x775953);
    if (prize) b.text("A1", [0, 1.04, -0.068], 0.015, 0x6b402b, 0);
  });
}

/** Two stiff covers on a real hinge: rotating the top leaf closes the book; it does not shrink. */
export function foldingJournal(b: Blocks, p: V, rot: V, fold: number) {
  b.group(
    p,
    rot,
    () => {
      for (const k of [-1, 1]) {
        const a = k === 1 ? fold * 3.0 : 0;
        b.group(
          [0, 0.075 * Math.sin(a), 0.075 * (1 - Math.cos(a))],
          [a, 0, 0],
          () => {
            b.box([0, k * 0.242, 0], [0.74, 0.48, 0.067], 0x18737e);
            b.box([0.004, k * 0.241, 0.054], [0.718, 0.473, 0.061], 0xffe6bb);
            b.box([0.004, k * 0.241, 0.052], [0.721, 0.474, 0.008], 0xbc957a);
            b.box([-0.33, k * 0.24, 0.088], [0.035, 0.445, 0.016], 0xd0a164);
            if (k === 1)
              b.text("DAY 47", [0, 0.243, 0.091], 0.016, 0x283e52, 0);
            else
              for (let i = 0; i < 3; i++)
                b.box(
                  [-0.19 + i * 0.16, -0.22, 0.091],
                  [0.045, 0.048, 0.018],
                  0xa95453,
                );
          },
        );
      }
    },
    [0.585, 0.585, 0.585],
  );
}
