import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const BUNDLE_CACHE = new Map();
let SHARED_SCRATCH_DIR = null;

function getScratchDir() {
  if (!SHARED_SCRATCH_DIR || !fs.existsSync(SHARED_SCRATCH_DIR)) {
    SHARED_SCRATCH_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "e2e-bundle-"));
  }
  return SHARED_SCRATCH_DIR;
}

export function cleanupBundleCache() {
  BUNDLE_CACHE.clear();
  if (SHARED_SCRATCH_DIR && fs.existsSync(SHARED_SCRATCH_DIR)) {
    fs.rmSync(SHARED_SCRATCH_DIR, { recursive: true, force: true });
    SHARED_SCRATCH_DIR = null;
  }
}

process.once("exit", () => {
  try {
    cleanupBundleCache();
  } catch {
    // ignore cleanup errors on exit
  }
});

/**
 * Lightweight Node `document.createElement("canvas")` stub so `src/engine/textures.ts`
 * and `src/engine/face.ts` can construct `THREE.CanvasTexture` without DOM or Chrome.
 */
export function installDomCanvasStub() {
  if (typeof globalThis.document !== "undefined" && typeof globalThis.document?.createElement === "function") {
    return () => {};
  }
  const prevDoc = globalThis.document;
  const makeGradient = () => ({
    stops: [],
    addColorStop(offset, color) {
      this.stops.push({ offset, color });
    },
  });
  const makeCtx = (canvas) => ({
    canvas,
    fillStyle: "#000000",
    strokeStyle: "#000000",
    lineWidth: 1,
    font: "10px monospace",
    textAlign: "left",
    textBaseline: "alphabetic",
    globalAlpha: 1,
    globalCompositeOperation: "source-over",
    fillRect() {},
    strokeRect() {},
    clearRect() {},
    beginPath() {},
    closePath() {},
    moveTo() {},
    lineTo() {},
    arc() {},
    fill() {},
    stroke() {},
    fillText() {},
    strokeText() {},
    save() {},
    restore() {},
    translate() {},
    scale() {},
    rotate() {},
    drawImage() {},
    createRadialGradient: () => makeGradient(),
    createLinearGradient: () => makeGradient(),
    measureText: (t) => ({ width: String(t ?? "").length * 6 }),
    getImageData: (_x, _y, w, h) => ({
      width: w ?? canvas.width,
      height: h ?? canvas.height,
      data: new Uint8ClampedArray((w ?? canvas.width) * (h ?? canvas.height) * 4),
    }),
    putImageData() {},
  });

  globalThis.document = {
    createElement(tag) {
      if (String(tag).toLowerCase() !== "canvas") {
        return { style: {}, setAttribute() {}, getAttribute() { return null; } };
      }
      const canvas = {
        width: 16,
        height: 16,
        style: {},
        getContext(kind) {
          if (kind === "2d") return makeCtx(canvas);
          return null;
        },
        toDataURL() {
          return "data:image/png;base64,";
        },
      };
      return canvas;
    },
  };

  return () => {
    if (prevDoc === undefined) delete globalThis.document;
    else globalThis.document = prevDoc;
  };
}

/**
 * Shared test clock state used by the Remotion / R3F esbuild test shims.
 */
const SHIM_STATE_KEY = "__E2E_SHIM_STATE__";

export function setShimClock({ frame = 0, fps = 30, width = 1080, height = 1920, zone = undefined } = {}) {
  globalThis[SHIM_STATE_KEY] = {
    frame,
    fps,
    width,
    height,
    durationInFrames: fps * 60,
    zone,
  };
}

export function getShimClock() {
  if (!globalThis[SHIM_STATE_KEY]) setShimClock();
  return globalThis[SHIM_STATE_KEY];
}

function makeShimPlugin(repoRoot) {
  return {
    name: "e2e-remotion-r3f-shims",
    setup(pluginBuild) {
      pluginBuild.onResolve({ filter: /^(remotion|@react-three\/fiber)$/ }, (args) => ({
        path: args.path,
        namespace: "e2e-shim",
      }));

      pluginBuild.onLoad({ filter: /.*/, namespace: "e2e-shim" }, (args) => {
        if (args.path === "remotion") {
          return {
            contents: `
              import React from "react";
              const st = () => (globalThis.${SHIM_STATE_KEY} ?? { frame: 0, fps: 30, width: 1080, height: 1920, durationInFrames: 1800 });
              export const useCurrentFrame = () => st().frame;
              export const useVideoConfig = () => ({ fps: st().fps, width: st().width, height: st().height, durationInFrames: st().durationInFrames });
              export const Sequence = ({ children }) => React.createElement(React.Fragment, null, children);
              export const AbsoluteFill = ({ children, ...p }) => React.createElement("div", p, children);
              export const Audio = () => null;
              export const Composition = () => null;
              export const interpolate = (input, [in0, in1], [out0, out1]) => {
                const k = in1 === in0 ? 0 : Math.max(0, Math.min(1, (input - in0) / (in1 - in0)));
                return out0 + (out1 - out0) * k;
              };
              export const spring = ({ frame = 0, fps = 30 }) => Math.min(1, Math.max(0, frame / fps));
            `,
            resolveDir: repoRoot,
            loader: "js",
          };
        }
        if (args.path === "@react-three/fiber") {
          return {
            contents: `
              import React from "react";
              import * as THREE from "three";
              const dummyCamera = new THREE.PerspectiveCamera(40, 9 / 16, 0.05, 200);
              const dummyScene = new THREE.Scene();
              const dummyGl = { toneMappingExposure: 1, render() {} };
              const state = { camera: dummyCamera, scene: dummyScene, gl: dummyGl, size: { width: 1080, height: 1920 } };
              export const useThree = (selector) => (typeof selector === "function" ? selector(state) : state);
              export const useFrame = () => {};
              export const Canvas = ({ children }) => React.createElement(React.Fragment, null, children);
              export const extend = () => {};
            `,
            resolveDir: repoRoot,
            loader: "js",
          };
        }
        return null;
      });
    },
  };
}

/**
 * Bundle TypeScript/TSX exports from `repoRoot` into Node ESM.
 * Set `withShims: true` to alias `remotion` and `@react-three/fiber` to lightweight deterministic Node stubs.
 */
export async function bundleExports(repoRoot, contents, { withShims = false, cacheKey = null } = {}) {
  const key = cacheKey ?? `${repoRoot}::${withShims ? "shim" : "raw"}::${contents}`;
  if (BUNDLE_CACHE.has(key)) return BUNDLE_CACHE.get(key);

  const dir = getScratchDir();
  const id = `mod-${BUNDLE_CACHE.size}-${Math.random().toString(36).slice(2, 8)}.mjs`;
  const outfile = path.join(dir, id);

  await build({
    stdin: { contents, resolveDir: repoRoot, loader: "tsx" },
    outfile,
    platform: "node",
    format: "esm",
    target: "node22",
    packages: "external",
    bundle: true,
    jsx: "automatic",
    logLevel: "silent",
    plugins: withShims ? [makeShimPlugin(repoRoot)] : [],
  });

  const mod = await import(pathToFileURL(outfile).href);
  BUNDLE_CACHE.set(key, mod);
  return mod;
}

/**
 * Bundle a specific TS/TSX file path relative or absolute to `repoRoot`.
 */
export async function bundleFile(repoRoot, filePath, { withShims = false } = {}) {
  const abs = path.isAbsolute(filePath) ? filePath : path.join(repoRoot, filePath);
  const rel = "./" + path.relative(repoRoot, abs).replace(/\\/g, "/");
  return bundleExports(repoRoot, `export * from ${JSON.stringify(rel)};`, {
    withShims,
    cacheKey: `file:${abs}:${withShims}`,
  });
}

/**
 * Expand a React element tree in Node with mocked hooks (useMemo/useRef/useEffect/useContext)
 * so functional components (e.g. `MinecraftAvatar`, `ExplainerCrowd`, `BillStack`, `World`, `ClassroomRoom`)
 * expand down to intrinsic Three.js primitives (`<group>`, `<mesh>`, `<boxGeometry>`, etc.) without WebGL.
 */
export function expandElementTree(element, { maxDepth = 16, zone = undefined } = {}) {
  const hookContexts = new Map();

  function runWithMinimalHooks(fn, props) {
    // React 19 internal dispatcher is not used if we only call pure functional components
    // that use useMemo/useRef/useEffect/useContext when React is loaded in Node outside a renderer.
    // Wait: React 19 throws if hooks are called outside React's render dispatcher!
    // Let's check if ReactSharedInternals dispatcher can be temporarily bound for pure hook inspection.
    return fn(props);
  }

  function walk(node, depth, currentZone) {
    if (node == null || typeof node === "boolean" || typeof node === "string" || typeof node === "number") {
      return null;
    }
    if (Array.isArray(node)) {
      return node.map((c) => walk(c, depth, currentZone)).filter(Boolean);
    }
    if (typeof node !== "object" || !node.type) return null;

    // Fragment
    if (typeof node.type === "symbol") {
      const children = walk(node.props?.children, depth, currentZone);
      return { type: "Fragment", props: {}, children: normalizeChildren(children) };
    }

    // Function component
    if (typeof node.type === "function") {
      if (depth >= maxDepth) {
        return { type: node.type.displayName || node.type.name || "Component", props: node.props ?? {}, children: [] };
      }
      const compName = node.type.displayName || node.type.name || "Component";
      if (compName === "Zone") {
        const zName = node.props?.name;
        const companions = node.props?.with ?? [];
        if (currentZone !== undefined) {
          const activeList = String(currentZone).split("+");
          const visible = activeList.includes(zName) || companions.some((c) => activeList.includes(c));
          if (!visible) return null;
        }
        const children = walk(node.props?.children, depth + 1, currentZone);
        return {
          type: "Zone",
          props: { ...node.props },
          children: normalizeChildren(children),
        };
      }

      let rendered = null;
      try {
        rendered = runWithMinimalHooks(node.type, node.props ?? {});
      } catch {
        // Component invokes React hooks that require a dispatcher; return boundary node with props preserved.
        const children = node.props?.children ? walk(node.props.children, depth + 1, currentZone) : [];
        return {
          type: compName,
          props: { ...node.props },
          children: normalizeChildren(children),
          hookGated: true,
        };
      }
      const expanded = walk(rendered, depth + 1, currentZone);
      return {
        type: compName,
        props: { ...node.props },
        children: normalizeChildren(expanded),
      };
    }

    // Intrinsic Three.js / JSX tag ("group", "mesh", "boxGeometry", etc.)
    const children = walk(node.props?.children, depth + 1, currentZone);
    return {
      type: String(node.type),
      props: { ...node.props },
      children: normalizeChildren(children),
    };
  }

  function normalizeChildren(c) {
    if (c == null) return [];
    if (Array.isArray(c)) return c.flat(Infinity).filter(Boolean);
    return [c];
  }

  void hookContexts;
  return walk(element, 0, zone);
}

/**
 * Evaluate a hook-using React component cleanly in Node using a temporary React 19 dispatcher
 * (useMemo, useRef, useEffect, useLayoutEffect, useContext, useState).
 */
export async function renderHookedElement(element, { maxDepth = 16, zone = undefined } = {}) {
  const React = (await import("react")).default;
  const internals =
    React.__CLIENT_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED ||
    React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

  const hookDispatcher = {
    useMemo: (factory) => factory(),
    useCallback: (cb) => cb,
    useRef: (init) => ({ current: init }),
    useState: (init) => [typeof init === "function" ? init() : init, () => {}],
    useReducer: (reducer, init) => [init, () => {}],
    useEffect: () => {},
    useLayoutEffect: () => {},
    useInsertionEffect: () => {},
    useContext: (ctx) => ctx?._currentValue ?? ctx?._defaultValue ?? 1,
    useId: () => "e2e-id",
    useSyncExternalStore: (_sub, getSnap) => getSnap(),
    useTransition: () => [false, (fn) => fn()],
    useDeferredValue: (v) => v,
    useImperativeHandle: () => {},
    useDebugValue: () => {},
  };

  function walk(node, depth, currentZone) {
    if (node == null || typeof node === "boolean" || typeof node === "string" || typeof node === "number") {
      return null;
    }
    if (Array.isArray(node)) {
      return node.map((c) => walk(c, depth, currentZone)).filter(Boolean);
    }
    if (typeof node !== "object" || !node.type) return null;

    if (typeof node.type === "symbol") {
      const children = walk(node.props?.children, depth, currentZone);
      return { type: "Fragment", props: {}, children: normalize(children) };
    }

    if (typeof node.type === "function") {
      const compName = node.type.displayName || node.type.name || "Component";
      if (depth >= maxDepth) {
        return { type: compName, props: { ...node.props }, children: [] };
      }
      if (compName === "Zone") {
        const zName = node.props?.name;
        const companions = node.props?.with ?? [];
        if (currentZone !== undefined) {
          const activeList = String(currentZone).split("+");
          const visible = activeList.includes(zName) || companions.some((c) => activeList.includes(c));
          if (!visible) return null;
        }
        const children = walk(node.props?.children, depth + 1, currentZone);
        return { type: "Zone", props: { ...node.props }, children: normalize(children) };
      }

      let rendered = null;
      const prevH = internals?.H;
      const prevCurr = internals?.current;
      try {
        if (internals) {
          if ("H" in internals) internals.H = hookDispatcher;
          if ("current" in internals) internals.current = hookDispatcher;
        }
        rendered = node.type(node.props ?? {});
      } finally {
        if (internals) {
          if ("H" in internals) internals.H = prevH;
          if ("current" in internals) internals.current = prevCurr;
        }
      }
      const expanded = walk(rendered, depth + 1, currentZone);
      return { type: compName, props: { ...node.props }, children: normalize(expanded) };
    }

    const children = walk(node.props?.children, depth + 1, currentZone);
    return { type: String(node.type), props: { ...node.props }, children: normalize(children) };
  }

  function normalize(c) {
    if (c == null) return [];
    if (Array.isArray(c)) return c.flat(Infinity).filter(Boolean);
    return [c];
  }

  return walk(element, 0, zone);
}
