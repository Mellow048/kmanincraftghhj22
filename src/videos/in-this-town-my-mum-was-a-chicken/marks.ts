import type { Vec3 } from "../../engine";

// Shared coordinates for the three zones:
//   village (z ~ 0)      school gate, zombie street, tall house roof nest, climbing oak
//   school  (z ~ 45)     lantern-lit classroom with window on the north wall
//   cliff   (z ~ 95)     mountain cliff ledge (y = 4.5), broken bridge, safe valley floor (y = 0)

export const PATH_TOP = 0.05;

export const GATE = {
  center: [0, PATH_TOP, -1.2] as Vec3,
  corner: [-4.8, PATH_TOP, 1.8] as Vec3,
  doorHouse: [-6.5, 0, -5] as Vec3,
  climbTree: [-9.2, 0, -3.5] as Vec3,
  tallHouse: [8.8, 0, -5] as Vec3,
  roofTopY: 5.4,
  nest: [8.8, 5.4, -5.0] as Vec3,
  cratesAt: [0.0, PATH_TOP, 0.8] as Vec3,
};

export const SCHOOL = {
  origin: [0, 0, 45] as Vec3,
  heroDesk: [-0.9, 0, 44.2] as Vec3,
  teacherAt: [1.5, 0, 43.0] as Vec3,
  windowSill: [-0.9, 1.05, 41.35] as Vec3,
  windowOutside: [-0.9, 0, 40.3] as Vec3,
};

export const CLIFF = {
  origin: [0, 0, 95] as Vec3,
  ledgeY: 4.5,
  ledgeEdge: [-1.4, 4.5, 95] as Vec3,
  bridgeStart: [-1.4, 4.5, 95] as Vec3,
  bridgeEnd: [4.6, 4.5, 95] as Vec3,
  farLedge: [6.8, 4.5, 95] as Vec3,
  valleyFloor: [2.2, 0.05, 95] as Vec3,
};
