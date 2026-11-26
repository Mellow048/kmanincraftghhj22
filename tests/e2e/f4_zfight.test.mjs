import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import {
  bundleExports,
  installDomCanvasStub,
  renderHookedElement,
  setShimClock,
} from "./lib/bundle.mjs";
import {
  checkBillStackSpacing,
  checkFlatCoinNonCoplanar,
  extractBoxes,
  findCoplanarOrOverlapping,
  findDuplicateWorldSceneProps,
} from "./lib/geometry.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const MODE = process.env.E2E_MODE || "self-test";

test("F4.T1 — Non-coplanar stacked boxes pass findCoplanarOrOverlapping()", () => {
  const boxes = [
    { tag: "Block", path: "bill0", min: [-0.23, 0, -0.11], max: [0.23, 0.0175, 0.11] },
    { tag: "Block", path: "bill1", min: [-0.23, 0.019, -0.11], max: [0.23, 0.0365, 0.11] },
  ];
  assert.deepEqual(findCoplanarOrOverlapping(boxes), []);
});

test("F4.T2 — BillStack and Printer tray spacing >= 0.019m", async () => {
  if (MODE === "framework") {
    const restoreDoc = installDomCanvasStub();
    try {
      const mod = await bundleExports(
        REPO_ROOT,
        `export { BillStack, Printer } from "./Topics/Explainer/money";`,
        { withShims: true, cacheKey: "f4-money" },
      );
      setShimClock({ frame: 10, fps: 30 });
      const stackTree = await renderHookedElement(createElement(mod.BillStack, { count: 5 }));
      const stackRes = checkBillStackSpacing(stackTree, { minPitch: 0.019 });
      assert.equal(stackRes.count, 5);
      assert.deepEqual(stackRes.violations, [], `BillStack spacing violations: ${JSON.stringify(stackRes.violations)}`);

      const printerTree = await renderHookedElement(createElement(mod.Printer, { out: 5 }));
      const printerRes = checkBillStackSpacing(printerTree, { minPitch: 0.019 });
      assert.equal(printerRes.count, 5);
      assert.deepEqual(printerRes.violations, [], `Printer spacing violations: ${JSON.stringify(printerRes.violations)}`);
    } finally {
      restoreDoc();
    }
  } else {
    const Bill = () => null;
    const stackFixture = createElement(
      "group",
      null,
      Array.from({ length: 5 }, (_, i) => createElement(Bill, { key: i, position: [0, i * 0.02, 0] })),
    );
    const res = checkBillStackSpacing(stackFixture, { minPitch: 0.019 });
    assert.equal(res.count, 5);
    assert.deepEqual(res.violations, []);
  }
});

test("F4.T3 — FlatCoin inner/outer cylinders have non-coplanar faces (>= 0.002m)", async () => {
  if (MODE === "framework") {
    const restoreDoc = installDomCanvasStub();
    try {
      const mod = await bundleExports(
        REPO_ROOT,
        `export { CoinStack, CoinPile } from "./Topics/Explainer/money";`,
        { withShims: true, cacheKey: "f4-money-coins" },
      );
      setShimClock({ frame: 10, fps: 30 });
      const tree = await renderHookedElement(createElement(mod.CoinStack, { count: 4, radius: 0.16 }));
      const res = checkFlatCoinNonCoplanar(tree, { minFaceGap: 0.002 });
      assert.ok(res.cylinderCount >= 8);
      assert.deepEqual(res.violations, [], `CoinStack z-fight: ${JSON.stringify(res.violations)}`);
    } finally {
      restoreDoc();
    }
  } else {
    const fixedCoin = createElement(
      "group",
      null,
      createElement("mesh", { position: [0, 0.02, 0] }, createElement("cylinderGeometry", { args: [0.14, 0.14, 0.04, 8] })),
      createElement("mesh", { position: [0, 0.024, 0] }, createElement("cylinderGeometry", { args: [0.10, 0.10, 0.04, 8] })),
    );
    const res = checkFlatCoinNonCoplanar(fixedCoin, { minFaceGap: 0.002 });
    assert.equal(res.cylinderCount, 2);
    assert.deepEqual(res.violations, []);
  }
});

test("F4.T4 — SnowTrail / LightPool / RoyalCarpet floor clearance >= 0.002m", () => {
  const Block = () => null;
  const Vox = () => null;
  const floorStage = createElement(
    "group",
    null,
    createElement(Vox, { position: [0, -0.2, 0], size: [12, 0.5, 11] }), // top = 0.05
    createElement(Block, { position: [0, 0.08, 0], size: [0.85, 0.05, 0.85] }), // bottom = 0.055 (>= 0.052)
    createElement(Block, { position: [2, 0.075, 0], size: [1.6, 0.04, 4.0] }), // carpet bottom = 0.055 (>= 0.052)
  );
  const boxes = extractBoxes(floorStage);
  assert.deepEqual(findCoplanarOrOverlapping(boxes), []);
});

test("F4.T5 — World vs Scene duplicate animated prop check passes when non-duplicated", () => {
  const Zone = ({ children }) => children;
  const Furnace = () => null;
  const CellarGate = () => null;
  const world = createElement(
    Zone,
    { name: "room" },
    createElement(Furnace, { position: [2.5, 0, -1.85] }),
  );
  const scene1 = createElement(CellarGate, { position: [0, 0, 2.0] });
  const dupes = findDuplicateWorldSceneProps(world, [{ cue: "1.hook", zone: "room", root: scene1 }]);
  assert.deepEqual(dupes, []);
});

test("F4.N1 — Detects coplanar SnowTrail + cobble top face at y = 0.05m", () => {
  const Block = () => null;
  const Vox = () => null;
  const coplanarStage = createElement(
    "group",
    null,
    createElement(Vox, { position: [0, -0.2, 1.2], size: [12, 0.5, 11] }), // top = 0.05
    createElement(Block, { position: [0, 0.025, 0], size: [0.85, 0.05, 0.85] }), // top = 0.05, inside cobble!
  );
  const boxes = extractBoxes(coplanarStage);
  const conflicts = findCoplanarOrOverlapping(boxes);
  assert.ok(conflicts.length >= 1, "Must flag coplanar/overlapping SnowTrail inside cobble");
});

test("F4.N2 — Detects BillStack (0.014m) and Printer (0.013m) spacing < 0.019m", () => {
  const Bill = () => null;
  const badStack = createElement(
    "group",
    null,
    Array.from({ length: 4 }, (_, i) => createElement(Bill, { key: i, position: [0, i * 0.014, 0] })),
  );
  const badPrinter = createElement(
    "group",
    null,
    Array.from({ length: 4 }, (_, i) => createElement(Bill, { key: i, position: [0, 0.38 + i * 0.013, 0.74] })),
  );
  assert.ok(checkBillStackSpacing(badStack, { minPitch: 0.019 }).violations.length > 0);
  assert.ok(checkBillStackSpacing(badPrinter, { minPitch: 0.019 }).violations.length > 0);
});

test("F4.N3 — Detects duplicate World + Scene Furnace and CellarGate", () => {
  const Zone = ({ children }) => children;
  const Furnace = () => null;
  const CellarGate = () => null;
  const world = createElement(
    "group",
    null,
    createElement(Zone, { name: "room" }, createElement(Furnace, { position: [0.2, 0, -1.85] })),
    createElement(Zone, { name: "cellar" }, createElement(CellarGate, { position: [1.5, 0, 2.0] })),
  );
  const dupes = findDuplicateWorldSceneProps(world, [
    { cue: "2.dark", zone: "room", root: createElement(Furnace, { position: [0.2, 0, -1.85], lit: false }) },
    { cue: "5.cellar", zone: "cellar", root: createElement(CellarGate, { position: [1.5, 0, 2.0], open: 0.5 }) },
  ]);
  assert.equal(dupes.length, 2);
  assert.ok(dupes.some((d) => d.prop === "Furnace"));
  assert.ok(dupes.some((d) => d.prop === "CellarGate"));
});

test("F4.N4 — Boundary gap test: 0.0015m passes while 0.0001m fails 0.001m z-fight epsilon", () => {
  const passBoxes = [
    { tag: "Block", path: "a", min: [-1, 0, -1], max: [1, 0.05, 1] },
    { tag: "Block", path: "b", min: [-0.5, 0.0515, -0.5], max: [0.5, 0.1, 0.5] },
  ];
  assert.deepEqual(findCoplanarOrOverlapping(passBoxes), []);

  const failBoxes = [
    { tag: "Block", path: "a", min: [-1, 0, -1], max: [1, 0.05, 1] },
    { tag: "Block", path: "b", min: [-0.5, 0.05, -0.5], max: [0.5, 0.0501, 0.5] },
  ];
  assert.ok(findCoplanarOrOverlapping(failBoxes).length > 0, "0.0001m delta (< 0.001m) must fail coplanar check");
});
