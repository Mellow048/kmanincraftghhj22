import { blockedRoute } from "../../engine";
import type { SetSolid, Vec3 } from "../../engine";

/**
 * Coordinate sheet & collision-checked blocking routes across all 4 zones:
 *   - "village"  : Slime family cottage, shed, village street, schoolhouse & yard, swamp gate
 *   - "room"     : Cozy low-built interior of the slime cottage (tiny door, low table, coat chest)
 *   - "bridge"   : Cracked stone swamp bridge spanning the dark river, ruins & mossy pillars
 *   - "riverbed" : Deep underwater swamp floor where the kid sinks and lands on the slime block
 */

export const PATH_Y = 0.04;
export const PORCH_Y = 0.12;
export const BRIDGE_Y = 1.6;
export const WATER_Y = -0.15;
export const RIVERBED_Y = 0;

export const VILLAGE = {
  home: [0, 0, -14.5] as Vec3,
  porch: [0, PORCH_Y, -13.1] as Vec3,
  cactus: [1.85, PORCH_Y, -12.7] as Vec3,
  shed: [-5.4, 0, -13.6] as Vec3,
  shedFront: [-5.4, 0, -11.4] as Vec3,
  well: [-4.2, 0, -4.5] as Vec3,
  square: [0, PATH_Y, -2.0] as Vec3,
  school: [8.4, 0, 3.5] as Vec3,
  schoolYard: [3.8, 0, 3.5] as Vec3,
  plankWall: [5.05, 0, 0.8] as Vec3,
  gate: [0, PATH_Y, 16.5] as Vec3,
  gateSign: [-2.45, 0, 15.1] as Vec3,
  golemPost: [1.55, 0, 14.8] as Vec3,
};

export const ROOM_MARKS = {
  center: [0, 0, 0.4] as Vec3,
  table: [-0.4, 0, -0.2] as Vec3,
  lowDoor: [-2.58, 0, 1.35] as Vec3,
  chest: [1.85, 0, -1.55] as Vec3,
  bed: [-1.55, 0, -1.35] as Vec3,
};

export const BRIDGE = {
  northBank: [0, 0, -9.5] as Vec3,
  northRamp: [0, 0.8, -6.4] as Vec3,
  deckNorth: [0, BRIDGE_Y, -4.2] as Vec3,
  center: [0, BRIDGE_Y, 0] as Vec3,
  railingGap: [1.75, BRIDGE_Y, 0.4] as Vec3,
  deckSouth: [0, BRIDGE_Y, 4.2] as Vec3,
  ruinPillar: [-2.8, 0, -5.2] as Vec3,
  craterStone: [-1.15, BRIDGE_Y, 1.2] as Vec3,
  waterBelow: [1.65, WATER_Y, 0.4] as Vec3,
};

export const RIVERBED = {
  dropSpot: [0, RIVERBED_Y, 0] as Vec3,
  reedPatch: [-1.8, RIVERBED_Y, -1.4] as Vec3,
};

const villageSolids: SetSolid[] = [
  { name: "slime cottage", position: [0, 2.2, -17.3], size: [6.6, 4.4, 5.6] },
  { name: "side shed", position: [-5.4, 1.5, -15.1], size: [3.0, 3.0, 3.0] },
  { name: "village well", position: [-4.2, 1.2, -4.5], size: [2.2, 2.4, 2.2] },
  { name: "schoolhouse", position: [11.4, 2.4, 3.5], size: [6.0, 4.8, 7.6] },
  { name: "west gate pillar", position: [-2.5, 2.0, 16.5], size: [1.1, 4.0, 1.1] },
  { name: "east gate pillar", position: [2.5, 2.0, 16.5], size: [1.1, 4.0, 1.1] },
];

const bridgeSolids: SetSolid[] = [
  { name: "west parapet", position: [-2.15, BRIDGE_Y + 0.55, 0], size: [0.45, 1.1, 9.2] },
  { name: "east north parapet", position: [2.15, BRIDGE_Y + 0.55, -2.6], size: [0.45, 1.1, 3.6] },
  { name: "east south parapet", position: [2.15, BRIDGE_Y + 0.55, 3.0], size: [0.45, 1.1, 3.0] },
];

const kidClearance = { radius: 0.28, height: 1.28 };

export const villageWalkRoute = blockedRoute(
  "village / street stroll",
  [
    [0, PATH_Y, -9.5],
    [0, PATH_Y, -3.5],
    [0.2, PATH_Y, 3.0],
  ],
  villageSolids,
  kidClearance,
);

export const gateSneakRoute = blockedRoute(
  "village / sunset sneak through gate",
  [
    [-0.5, PATH_Y, 12.2],
    [-0.35, PATH_Y, 15.8],
    [0, PATH_Y, 19.2],
  ],
  villageSolids,
  kidClearance,
);

export const bridgePushRoute = blockedRoute(
  "bridge / wheelbarrow roll onto span",
  [
    [0, BRIDGE_Y, -4.1],
    [-0.1, BRIDGE_Y, -1.2],
    [0, BRIDGE_Y, 0.2],
  ],
  bridgeSolids,
  kidClearance,
);
