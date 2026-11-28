import {
  Leo,
  MrVex,
  PLACE,
  Player,
  TotemOfUndying,
  WaterBucket,
  WaterSplashPool,
  at,
  cam,
  ease,
  ramp,
  storyScene,
  timing,
} from "./kit";

const C = PLACE.canyon;
const SAFE_XS = [-4.2, -2.8, -1.4, 0, 1.4, 2.8, 4.2];

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "MLG Water Bucket Clutch & Vex Karma",
  shots: [
    {
      cue: "6.dive",
      ...cam.track({
        from: at(C, -2.0, 19.5, -6.5),
        to: at(C, 0, 12.0, -2.0),
        sideDist: 5.8,
        lead: 0.9,
        height: 1.0,
        fov: 46,
      }),
      zone: "canyon",
      look: "overworld-golden",
      note: "Leo dives headfirst off the cliff past the falling kids, gripping his iron Water Bucket.",
      stage: (t) => {
        const f = ease(ramp(t, 0, 1.35));
        return (
          <>
            <Leo
              position={at(C, -2.0 * (1 - f), 19.5 - f * 7.8, -6.5 + f * 4.5)}
              rotationY={0}
              animation="cheer"
              face="brave"
              time={t}
            >
              <WaterBucket position={[0, -0.04, 0.26]} scale={1.1} />
            </Leo>
            {[-2.4, 2.4].map((kx, i) => (
              <Player
                key={i}
                who={[1, 3, 4, 5, 6][i % 5]}
                scale={0.82}
                position={at(C, kx, 16.5 - f * 4.0, -3.5 + f * 1.2)}
                rotationY={0}
                animation="panic"
                face="surprised"
                time={t}
              />
            ))}
          </>
        );
      },
    },
    {
      cue: "6.fall",
      ...cam.track({
        from: at(C, 0, 11.5, -1.5),
        to: at(C, 0, 4.5, -0.4),
        sideDist: 5.4,
        lead: 0.7,
        height: 0.5,
        fov: 46,
      }),
      zone: "canyon",
      look: "overworld-golden",
      note: "High-speed vertical drop tracking Leo as canyon stone rushes up below.",
      stage: (t) => {
        const f = ramp(t, 0, 1.35);
        return (
          <Leo
            position={at(C, 0, 11.5 - f * 7.0, -1.5 + f * 1.1)}
            rotationY={0}
            animation="cheer"
            face="brave"
            time={t}
          >
            <WaterBucket position={[0, -0.06, 0.28]} scale={1.15} />
          </Leo>
        );
      },
    },
    {
      cue: "6.blocks",
      ...cam.heroLow({ on: at(C, 0, 2.4, 0), dist: 5.6, yaw: -14, fov: 44 }),
      zone: "canyon",
      look: "overworld-golden",
      hud: {
        counter: { label: "HEIGHT", from: 25, to: 1, suffix: " BLOCKS", startAt: 0.05, dur: 1.25, color: "#ff4f42" },
      },
      note: "Rolling red height counter whips 25 -> 1 blocks as Leo aims the Water Bucket straight at the stone.",
      stage: (t) => {
        const f = ramp(t, 0, 1.25);
        return (
          <Leo
            position={at(C, 0, 4.8 - f * 4.3, 0)}
            rotationY={0}
            animation="point"
            face="brave"
            time={t}
          >
            <WaterBucket position={[0, -0.1, 0.28]} scale={1.15} />
          </Leo>
        );
      },
    },
    {
      cue: "6.splash",
      ...cam.sweep({ on: at(C, 0, 0.9, 0), dist: 6.2, fromYaw: -22, toYaw: 20, pitch: 12, fov: 46 }),
      zone: "canyon",
      look: "overworld-golden",
      hud: { banner: { text: "MLG CLUTCH!", color: "#38b6ff" } },
      note: "Impact frame: Leo slams the Water Bucket onto the canyon stone and a huge blue splash bursts outward.",
      stage: (t) => {
        const p = ramp(t, 0.08, 1.25);
        return (
          <>
            <WaterSplashPool position={at(C, 0, 0, 0)} progress={p} maxRadius={6.8} />
            <Leo position={at(C, 0, 0.06, 0)} rotationY={0} animation="cheer" face="grin" time={t}>
              <WaterBucket position={[0, -0.04, 0.24]} scale={1.05} />
            </Leo>
          </>
        );
      },
    },
    {
      cue: "6.pool",
      ...cam.streetOverview({
        from: at(C, 0, 0, 11.5),
        to: at(C, 0, 0, 7.2),
        on: at(C, 0, 0.8, 0),
        height: 5.5,
        fov: 46,
      }),
      zone: "canyon",
      look: "overworld-golden",
      note: "Wide crane over the glowing blue water pool spreading wide across the canyon floor.",
      stage: (t) => {
        const f = ease(ramp(t, 0, 1.2));
        return (
          <>
            <WaterSplashPool position={at(C, 0, 0, 0)} progress={1} maxRadius={7.0} />
            <Leo position={at(C, 0, 0.06, 1.8)} rotationY={0} animation="cheer" face="grin" time={t} />
            {SAFE_XS.map((kx, i) => (
              <Player
                key={i}
                who={[1, 3, 4, 5, 6][i % 5]}
                scale={0.82}
                position={at(C, kx, Math.max(0.08, (1 - f) * (4.5 + (i % 3) * 1.1)), -1.4 + (i % 2) * 1.4)}
                rotationY={0}
                animation="cheer"
                face="grin"
                time={t + i * 0.1}
              />
            ))}
          </>
        );
      },
    },
    {
      cue: "6.safe",
      ...cam.twoShot({ a: at(C, -1.5, 0, 0.4), b: at(C, 1.5, 0, 0.4), dist: 6.0, height: 1.5, fov: 44 }),
      zone: "canyon",
      look: "overworld-golden",
      note: "All thirty kids stand up splashing and cheering safely around Leo in the blue pool.",
      stage: (t) => (
        <>
          <WaterSplashPool position={at(C, 0, 0, 0)} progress={1} maxRadius={7.0} />
          <Leo position={at(C, 0, 0.08, 0.6)} rotationY={0} animation="cheer" face="grin" time={t}>
            <WaterBucket position={[0, -0.04, 0.24]} scale={1.0} />
          </Leo>
          {[-2.4, -1.2, 1.2, 2.4].map((kx, i) => (
            <Player
              key={i}
              who={[1, 3, 4, 5, 6][i % 5]}
              scale={0.82}
              position={at(C, kx, 0.08, -0.6 + (i % 2) * 0.9)}
              rotationY={kx < 0 ? 0.4 : -0.4}
              animation="cheer"
              face="grin"
              time={t + i * 0.15}
            />
          ))}
        </>
      ),
    },
    {
      cue: "6.sticks",
      ...cam.sweep({ on: at(C, 0, 0.3, 2.2), dist: 4.8, fromYaw: 20, toYaw: -20, pitch: 12, fov: 42 }),
      zone: "canyon",
      look: "overworld-golden",
      note: "Close sweep across carved oak fake Totems bobbing harmlessly on the blue water.",
      stage: (t) => (
        <>
          <WaterSplashPool position={at(C, 0, 0, 0)} progress={1} maxRadius={7.0} />
          {[-2.0, -0.9, 0.2, 1.3, 2.4].map((sx, i) => (
            <TotemOfUndying
              key={i}
              position={at(C, sx, 0.12 + Math.sin(t * 4 + i) * 0.04, 2.0 + (i % 2) * 0.7)}
              rotationY={i * 0.9 + t * 0.5}
              scale={1.0}
              mode="wood"
            />
          ))}
        </>
      ),
    },
    {
      cue: "6.karma",
      ...cam.front({ actor: at(C, 8.0, 20.0, -6.8), dist: 5.0, fov: 42, screenOffset: [0, 0.06] }),
      zone: "canyon",
      look: "overworld-golden",
      hud: { chat: [{ sender: "Mr. Vex", text: "Mine is real!!", color: "#d580ff" }] },
      note: "Cornered on the cliff edge, Mr. Vex grabs a Totem off his own rack and leaps.",
      stage: (t) => {
        const leap = ease(ramp(t, 0.65, 1.4));
        return (
          <MrVex
            position={at(C, 8.0, 20.0 - leap * 4.2, -7.2 + leap * 3.5)}
            rotationY={0}
            animation="cheer"
            face="grin"
            time={t}
          >
            <TotemOfUndying position={[0, 0.04, 0.24]} scale={1.0} mode="gold" />
          </MrVex>
        );
      },
    },
    {
      cue: "6.pig",
      ...cam.sweep({ on: at(C, 8.0, 0.8, 2.5), dist: 6.2, fromYaw: -22, toYaw: 18, pitch: 12, fov: 44 }),
      zone: "canyon",
      look: "overworld-golden",
      note: "Mr. Vex slams face-first into the muddy pig pen surrounded by three pink pigs.",
      stage: (t) => {
        const fall = ease(ramp(t, 0, 0.6));
        return (
          <MrVex
            position={at(C, 8.0, 8.0 * (1 - fall) + 0.08, 2.5)}
            rotationY={0}
            animation={fall >= 0.95 ? "fall" : "panic"}
            face="surprised"
            time={t}
          />
        );
      },
    },
    {
      cue: "6.bin",
      ...cam.front({ actor: at(C, 8.0, 0, 2.5), height: 2.0, dist: 5.0, fov: 44, screenOffset: [0, 0.08] }),
      zone: "canyon",
      look: "overworld-golden",
      note: "Mr. Vex sprawls in the mud beside a plain wooden Totem while pigs stare at him.",
      stage: (t) => (
        <>
          <MrVex position={at(C, 8.0, 0.08, 2.5)} rotationY={0.2} animation="fall" face="sad" time={t} />
          <TotemOfUndying position={at(C, 7.2, 0.14, 3.2)} rotationY={0.7} scale={1.1} mode="wood" />
        </>
      ),
    },
  ],
});
