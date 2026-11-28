import {
  BeeMob,
  HoneyJar,
  Kid,
  Mayor,
  PLACE,
  WoodenSpoon,
  at,
  cam,
  ease,
  moveBetween,
  ramp,
  storyScene,
  timing,
} from "./kit";

const H = PLACE.hall;

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "400 Named Honey Jars Hook",
  shots: [
    {
      cue: "1.town",
      ...cam.front({ actor: at(H, 0, 0, 0.8), dist: 4.8, fov: 44, screenOffset: [0, 0.06] }),
      zone: "hall",
      note: "Bright Frame-1 hook: Kid faces lens holding his wooden spoon up while a fuzzy bee hovers between him and 400 glowing honey jars.",
      stage: (t) => {
        const s = ease(ramp(t, 0, 1.2));
        return (
          <>
            <Kid position={at(H, 0, 0, 0.8)} rotationY={0} animation="point" face="smile" time={t}>
              <WoodenSpoon position={[0, -0.02, 0.24]} scale={1.1} />
            </Kid>
            <BeeMob position={at(H, -1.0 + s * 1.4, 1.55, 1.4)} rotationY={0.4} scale={1.1} time={t} />
          </>
        );
      },
    },
    {
      cue: "1.names",
      ...cam.truck({ on: at(H, -2.0, 2.0, -2.0), by: [4.0, 0, 0], dist: 4.2, yaw: 0, pitch: 4, fov: 42 }),
      zone: "hall",
      hud: { counter: { label: "HONEY JARS", from: 1, to: 400, startAt: 0.05, dur: 1.2, color: "#ffdd57" } },
      note: "Crisp lateral truck along the sunlit wall of glowing amber honey jars as the 400 counter rolls up.",
      stage: (t) => (
        <BeeMob position={at(H, -2.0 + t * 2.2, 2.2, -1.5)} rotationY={Math.PI / 2} scale={1.0} time={t} />
      ),
    },
    {
      cue: "1.tag",
      ...cam.sweep({ on: at(H, 0, 2.2, -2.0), dist: 3.6, fromYaw: -20, toYaw: 20, pitch: 6, fov: 40 }),
      zone: "hall",
      hud: { banner: { text: "EVERY JAR HAS A NAME", color: "#ffdd57" } },
      note: "Close sweep across the labeled jars showing a name tag on every single jar.",
      stage: (t) => (
        <BeeMob position={at(H, 0.6, 2.35, -1.6)} rotationY={-0.6} scale={1.05} time={t} />
      ),
    },
    {
      cue: "1.first",
      ...cam.sweep({ on: at(H, 0, 3.2, -2.0), dist: 3.2, fromYaw: 18, toYaw: -18, pitch: 4, fov: 38 }),
      zone: "hall",
      hud: { banner: { text: "FIRST", color: "#f5c63b", sub: "OLDEST JAR ON THE WALL" } },
      note: "Planted clue: the dusty top jar labeled FIRST glints in the sunbeam.",
      stage: (t) => (
        <HoneyJar position={at(H, 0, 3.0, -2.1)} scale={1.15} glow={0.35 + Math.sin(t * 4) * 0.08} />
      ),
    },
    {
      cue: "1.want",
      ...cam.front({ actor: at(H, 0, 0, 0.7), dist: 4.2, fov: 40, screenOffset: [0, 0.06] }),
      zone: "hall",
      note: "Kid steps forward staring longingly at the jars, raising his wooden spoon as the bee watches.",
      stage: (t) => {
        const w = moveBetween(at(H, 0, 0, 1.3), at(H, 0, 0, 0.5), t, 0, 1.1);
        return (
          <>
            <Kid position={w.position} rotationY={0} animation={w.moving ? "walk" : "reach"} animDistance={w.animDistance} face="smile" time={t}>
              <WoodenSpoon position={[0, 0, 0.24]} scale={1.1} />
            </Kid>
            <BeeMob position={at(H, 0.85, 1.45, 0.9)} rotationY={-0.9} scale={1.05} time={t} />
          </>
        );
      },
    },
    {
      cue: "1.misread",
      ...cam.twoShot({ a: at(H, -1.4, 0, 0.8), b: at(H, 1.3, 0, 0.8), dist: 5.2, height: 1.5, fov: 44 }),
      zone: "hall",
      note: "The Mayor walks past checking the shelves while Kid squints suspiciously, assuming he's hoarding them to sell.",
      stage: (t) => {
        const w = moveBetween(at(H, 2.4, 0, 0.4), at(H, 1.1, 0, 0.8), t, 0, 1.3);
        return (
          <>
            <Kid position={at(H, -1.4, 0, 0.8)} rotationY={0.7} animation="idle" face="frown" time={t} />
            <Mayor position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "idle"} animDistance={w.animDistance} face="calm" time={t} />
          </>
        );
      },
    },
  ],
});
