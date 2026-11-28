import {
  Leo,
  MrVex,
  PLACE,
  Player,
  TotemBurst,
  TotemOfUndying,
  WaterBucket,
  WaterSplashPool,
  at,
  cam,
  ease,
  moveBetween,
  ramp,
  storyScene,
  timing,
} from "./kit";

const S = PLACE.shop;

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Mr. Vex's Fake Totem Scam",
  shots: [
    {
      cue: "4.once",
      ...cam.sweep({ on: at(S, -1.8, 1.2, 3.2), dist: 5.0, fromYaw: -20, toYaw: 18, pitch: 12, fov: 42 }),
      zone: "shop",
      note: "A villager's birth Totem bursts once into golden dust, leaving empty hands.",
      stage: (t) => {
        const p = ramp(t, 0.2, 1.3);
        return (
          <>
            <Player who={4} scale={0.92} position={at(S, -1.8, 0, 3.2)} rotationY={0.1} animation="panic" face="surprised" time={t}>
              {t < 0.35 ? <TotemOfUndying position={[0, 0, 0.24]} scale={0.95} mode="gold" /> : null}
            </Player>
            <TotemBurst position={at(S, -1.8, 1.0, 3.4)} progress={p} />
          </>
        );
      },
    },
    {
      cue: "4.shop",
      ...cam.streetOverview({ from: at(S, 0, 0, 9.5), to: at(S, 0, 0, 4.2), on: at(S, 0, 1.4, -1.5), height: 4.5, fov: 44 }),
      zone: "shop",
      note: "Wide crane into Mr. Vex's shiny purple-awning Totem shop with kids lining up eagerly.",
      stage: (t) => {
        const w1 = moveBetween(at(S, -2.5, 0, 4.8), at(S, -1.2, 0, 0.6), t, 0, 1.6);
        const w2 = moveBetween(at(S, 2.2, 0, 5.2), at(S, 1.1, 0, 0.9), t, 0, 1.6);
        return (
          <>
            <MrVex position={at(S, 0, 0, -1.1)} rotationY={0} animation="wave" face="grin" time={t}>
              <TotemOfUndying position={[0, 0.04, 0.24]} scale={1.0} mode="gold" />
            </MrVex>
            <Player who={1} scale={0.82} position={w1.position} rotationY={w1.rotationY} animation="walk" animDistance={w1.animDistance} face="grin" time={t} />
            <Player who={3} scale={0.82} position={w2.position} rotationY={w2.rotationY} animation="walk" animDistance={w2.animDistance} face="smile" time={t + 0.2} />
          </>
        );
      },
    },
    {
      cue: "4.price",
      ...cam.sweep({ on: at(S, 5.2, 2.2, -1.2), dist: 6.4, fromYaw: 22, toYaw: -18, pitch: 12, fov: 44 }),
      zone: "shop",
      hud: {
        counter: { label: "VEX VAULT", from: 1000, to: 6000, suffix: " EMERALDS", startAt: 0.1, dur: 1.3, color: "#55ff55" },
      },
      note: "Sweep across Mr. Vex's glowing emerald vault as the 6,000-emerald counter rolls up.",
      stage: (t) => (
        <MrVex position={at(S, 3.6, 0, 0.6)} rotationY={-0.3} animation="cheer" face="grin" time={t} />
      ),
    },
    {
      cue: "4.shed",
      ...cam.track({
        from: at(S, -4.2, 0, 2.5),
        to: at(S, -7.2, 0, 1.2),
        sideDist: 5.2,
        lead: 1.0,
        height: 1.7,
        fov: 44,
      }),
      zone: "shop",
      note: "Leo walks past Vex's dark back shed carrying his iron Water Bucket.",
      stage: (t) => {
        const w = moveBetween(at(S, -4.0, 0, 2.5), at(S, -7.0, 0, 1.2), t, 0, 1.45);
        return (
          <Leo position={w.position} rotationY={w.rotationY} animation="walk" animDistance={w.animDistance} face="neutral" time={t}>
            <WaterBucket position={[0, -0.06, 0.22]} scale={1.0} />
          </Leo>
        );
      },
    },
    {
      cue: "4.drop",
      ...cam.sweep({ on: at(S, -7.3, 0.4, 0.6), dist: 4.2, fromYaw: -20, toYaw: 20, pitch: 12, fov: 42 }),
      zone: "shop",
      note: "A shiny gold Totem rolls right out of Vex's back shed door into the shallow rain puddle.",
      stage: (t) => {
        const roll = ease(ramp(t, 0.1, 1.15));
        return (
          <>
            <TotemOfUndying position={at(S, -7.3, 0.14, -0.4 + roll * 1.1)} rotationY={roll * 5.2} scale={1.15} mode="gold" />
            <Leo position={at(S, -6.1, 0, 1.4)} rotationY={-1.0} animation="idle" face="surprised" time={t}>
              <WaterBucket position={[0, -0.06, 0.22]} scale={1.0} />
            </Leo>
          </>
        );
      },
    },
    {
      cue: "4.splash",
      ...cam.front({ actor: at(S, -7.2, 0, 0.9), height: 0.7, dist: 4.5, fov: 42, screenOffset: [0, 0.06] }),
      zone: "shop",
      note: "Leo tips his iron Water Bucket and splashes cold water directly onto the dropped Totem.",
      stage: (t) => {
        const sp = ramp(t, 0.35, 1.35);
        return (
          <>
            <Leo position={at(S, -6.2, 0, 1.3)} rotationY={-1.1} animation="point" face="neutral" time={t}>
              <WaterBucket position={[0, -0.04, 0.26]} scale={1.05} />
            </Leo>
            <TotemOfUndying position={at(S, -7.3, 0.14, 0.7)} scale={1.15} mode={t > 0.55 ? "peeling" : "gold"} />
            <WaterSplashPool position={at(S, -7.3, 0.04, 0.7)} progress={sp} maxRadius={2.0} />
          </>
        );
      },
    },
    {
      cue: "4.wood",
      ...cam.sweep({ on: at(S, -7.3, 0.45, 0.7), dist: 3.4, fromYaw: 24, toYaw: -22, pitch: 12, fov: 38 }),
      zone: "shop",
      note: "Close reveal: gold paint washes cleanly off the Totem, exposing carved oak wood underneath.",
      stage: (t) => (
        <>
          <TotemOfUndying position={at(S, -7.3, 0.26, 0.7)} rotationY={t * 1.4} scale={1.3} mode="wood" />
          <Leo position={at(S, -6.1, 0, 1.3)} rotationY={-1.15} animation="panic" face="surprised" time={t} />
        </>
      ),
    },
    {
      cue: "4.scam",
      ...cam.front({ actor: at(S, 0, 0, -1.2), dist: 5.2, fov: 42, screenOffset: [0, 0.08] }),
      zone: "shop",
      hud: { stamp: { text: "FAKE!", color: "#ff3b30", at: 0.25, angle: -11 } },
      note: "Slam-in red FAKE! stamp over Mr. Vex's 50-emerald Totem rack.",
      stage: (t) => (
        <MrVex position={at(S, 0, 0, -1.0)} rotationY={0} animation="wave" face="grin" time={t}>
          <TotemOfUndying position={[0, 0.04, 0.24]} scale={1.05} mode="wood" />
        </MrVex>
      ),
    },
  ],
});
