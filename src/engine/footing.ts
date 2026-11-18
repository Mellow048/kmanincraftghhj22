import { Euler, Matrix4 } from 'three';
import type { Pose } from './anim';
import type { Vec3 } from './math';

export const PX = 1.8 / 32;

// Pixel boxes below the knee, in the same local coordinates used by the avatar mesh.
export const shin = { center: [0, -3, 0], size: [3.6, 6, 4] } as const;
export const trainer = { center: [0, -5.1, .5], size: [4.1, 2, 5.4] } as const;
export const sole = { center: [0, -5.9, .5], size: [4.2, .6, 5.5] } as const;
type PixelBox = { center: readonly [number, number, number]; size: readonly [number, number, number] };
export const metres = (xyz: readonly [number, number, number]): Vec3 => [xyz[0] * PX, xyz[1] * PX, xyz[2] * PX];
const rotate = (xyz: Vec3) => new Matrix4().makeRotationFromEuler(new Euler(...xyz));

// Project the turned box onto the vertical axis. Its lower edge is its centre minus
// the projections of its three half-edges; the foot need not be flat on the floor.
function bottom(m: Matrix4, { center, size }: PixelBox) {
  const e = m.elements, [x, y, z] = center, [w, h, d] = size;
  return e[13] + e[1]*x + e[5]*y + e[9]*z - (Math.abs(e[1])*w + Math.abs(e[5])*h + Math.abs(e[9])*d)/2;
}

/** Hip height (before avatar scale) that puts the lowest shin/shoe corner on
 * the actor's local y=0. Opt in for grounded steps; NOT for a jump or a seat. */
export function groundedHip(p: Pose, bodyRotation: Vec3, shoes: boolean) {
  const body = rotate(bodyRotation);
  let low = Infinity;
  for (const right of [true, false]) {
    const knee = body.clone().multiply(new Matrix4().makeTranslation(right ? 2.2 : -2.2, 0, 0))
      .multiply(rotate(right ? p.legR : p.legL)).multiply(new Matrix4().makeTranslation(0, -6, 0))
      .multiply(rotate(right ? p.kneeR : p.kneeL));
    low = Math.min(low, bottom(knee, shin));
    if (shoes) low = Math.min(low, bottom(knee, trainer), bottom(knee, sole));
  }
  return -low * PX;
}
