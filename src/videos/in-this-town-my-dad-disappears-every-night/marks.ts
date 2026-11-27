import { blockedRoute } from '../../engine';
import type { SetSolid, Vec3 } from '../../engine';

// Feet on the top of the market paving. One coordinate sheet for the built set, the actors and the lens.
// LongTable's top is 1.30 wide, .79 high; Hut.at is the middle of its FRONT wall.
export const pathTop = .051;
export const tableAt: Vec3 = [0, pathTop, 0];
export const tableLength = 1.9;
export const hallFront: Vec3 = [0, 0, -7];
export const hallWidth = 9, hallDepth = 7, hallHeight = 4.6;
export const tabletop = tableAt[1] + 0.79;
const occupied: SetSolid[] = [
  { name: 'market table', position: [tableAt[0], tableAt[1] + .395, tableAt[2]], size: [1.3, .79, tableLength] },
  { name: 'market hall', position: [hallFront[0], hallFront[1] + hallHeight / 2, hallFront[2] - hallDepth / 2], size: [hallWidth, hallHeight, hallDepth] },
];
export const route = blockedRoute('1.around / teller', [
  [-1.08, pathTop, 0], [-1.08, pathTop, 1.18], [-.85, pathTop, 1.45], [.85, pathTop, 1.45], [1.08, pathTop, 1.18], [1.08, pathTop, 0],
], occupied, { radius: .32, height: 1.44 });
