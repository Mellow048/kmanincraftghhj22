import { blockedRoute } from "../../engine";
import type { SetSolid, Vec3 } from "../../engine";

export const PATH_Y = 0.04;
export const PORCH_Y = 0.12;
export const BRIDGE_Y = 1.15;
export const WATER_Y = -0.15;
export const RIVERBED_Y = 0;

export const VILLAGE = {
  home: [0, 0, -14.5] as Vec3,
  porch: [0, PORCH_Y, -13.1] as Vec3,
  cactus: [1.75, PORCH_Y, -12.65] as Vec3,
  shed: [-5.4, 0, -13.6] as Vec3,
  well: [-4.2, 0, -4.5] as Vec3,
  square: [0, PATH_Y, -2.0] as Vec3,
  school: [8.6, 0, 3.5] as Vec3,
  schoolYard: [4.2, PATH_Y, 3.5] as Vec3,
  gate: [0, PATH_Y, 16.5] as Vec3,
  gateSign: [-2.45, 0, 15.1] as Vec3,
};

export const ROOM_MARKS = {
  center: [0, 0, 0.5] as Vec3,
  table: [-0.25, 0, 0.15] as Vec3,
  backDoor: [-1.45, 0, -2.36] as Vec3,
  coatHook: [-0.28, 1.32, -2.36] as Vec3,
  chest: [1.85, 0, -1.55] as Vec3,
  bed: [-1.75, 0, 1.25] as Vec3,
};

export const BRIDGE = {
  northBank: [0, 0.12, -8.8] as Vec3,
  deckNorth: [0, BRIDGE_Y, -4.2] as Vec3,
  center: [0, BRIDGE_Y, 0] as Vec3,
  deckSouth: [0, BRIDGE_Y, 4.2] as Vec3,
  ruinPillar: [-2.7, 0, -5.4] as Vec3,
  craterStone: [-1.05, BRIDGE_Y, 0.8] as Vec3,
};

const villageSolids: SetSolid[] = [
  { name: "slime cottage", position: [0, 2.2, -17.3], size: [6.6, 4.4, 5.6] },
  { name: "side shed", position: [-5.4, 1.5, -15.1], size: [3.0, 3.0, 3.0] },
  { name: "village well", position: [-4.2, 1.2, -4.5], size: [2.2, 2.4, 2.2] },
  { name: "schoolhouse", position: [11.6, 2.4, 3.5], size: [6.0, 4.8, 7.6] },
];

const bridgeSolids: SetSolid[] = [
  { name: "west rail", position: [-2.08, BRIDGE_Y + 0.4, 0], size: [0.3, 0.8, 8.8] },
  { name: "east north rail", position: [2.08, BRIDGE_Y + 0.4, -2.8], size: [0.3, 0.8, 3.2] },
  { name: "east south rail", position: [2.08, BRIDGE_Y + 0.4, 3.1], size: [0.3, 0.8, 2.6] },
];

const kidClearance = { radius: 0.28, height: 1.28 };

export const villageWalkRoute = blockedRoute(
  "village / street stroll",
  [
    [0, PATH_Y, -9.2],
    [0, PATH_Y, -3.5],
    [0.15, PATH_Y, 2.5],
  ],
  villageSolids,
  kidClearance,
);

export const bridgePushRoute = blockedRoute(
  "bridge / wheelbarrow roll onto span",
  [
    [0, BRIDGE_Y, -3.9],
    [-0.08, BRIDGE_Y, -1.4],
    [0, BRIDGE_Y, 0.1],
  ],
  bridgeSolids,
  kidClearance,
);
