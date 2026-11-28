import {
  Creeper,
  Leo,
  PLACE,
  Player,
  TotemBurst,
  TotemOfUndying,
  WaterBucket,
  at,
  cam,
  ease,
  moveBetween,
  ramp,
  storyScene,
  timing,
  wordAt,
} from "./kit";

const V = PLACE.village;

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Clocktower Hook & Totem Gags",
  shots: [
    {
      cue: "1.tower",
      ...cam.heroLow({ on: at(V, 0, 11.4, -8.4), dist: 7.4, yaw: 14, fov: 44 }),
      zone: "village",
      note: "Bright daylight heroLow up at the sunlit clocktower as three kids sprint toward the ledge holding glowing Totems.",
      stage: (t) => {
        const s = ease(ramp(t, 0, 1.9));
        return (
          <>
            {[-1.1, 0, 1.1].map((kx, i) => (
              <Player
                key={i}
                who={[1, 3, 4, 5, 6][i % 5]}
                scale={0.82}
                position={at(V, kx, 11.0, -8.8 + s * 1.4)}
                rotationY={0}
                animation={s < 0.99 ? "run" : "idle"}
                animDistance={s * 1.5}
                face="grin"
                time={t + i * 0.15}
              >
                <TotemOfUndying position={[0, -0.1, 0.22]} scale={0.95} mode="gold" />
              </Player>
            ))}
          </>
        );
      },
    },
    {
      cue: "1.burst",
      ...cam.track({
        from: at(V, 0, 10.5, -8.2),
        to: at(V, 0, 2.2, -5.8),
        sideDist: 7.4,
        lead: 0.8,
        height: 1.4,
        fov: 44,
      }),
      zone: "village",
      note: "Camera tracks downward with the three laughing kids plunging off the clocktower into the sunny square.",
      stage: (t) => {
        const fall = ease(ramp(t, 0, 1.35));
        const y = 11.0 - fall * 10.2;
        return (
          <>
            {[-1.3, 0, 1.3].map((kx, i) => (
              <Player
                key={i}
                who={[1, 3, 4, 5, 6][i % 5]}
                scale={0.82}
                position={at(V, kx, Math.max(0.2, y + i * 0.4), -8.6 + fall * 2.8)}
                rotationY={0}
                animation="cheer"
                face="grin"
                time={t + i * 0.2}
              >
                <TotemOfUndying position={[0, 0.05, 0.24]} scale={1.0} mode="gold" />
              </Player>
            ))}
          </>
        );
      },
    },
    {
      cue: "1.pop",
      ...cam.sweep({ on: at(V, 0, 1.3, -5.6), dist: 6.2, fromYaw: -22, toYaw: 20, pitch: 12, fov: 44 }),
      zone: "village",
      note: "Golden Totems burst into green-and-gold sparks as all three kids bounce up grinning.",
      stage: (t) => {
        const popAt = wordAt("1.pop", "burst");
        const p = ramp(t, Math.max(0.05, popAt - 0.1), popAt + 0.95);
        const bounce = Math.sin(Math.min(1, p) * Math.PI) * 1.1;
        return (
          <>
            <TotemBurst position={at(V, -1.4, 0.5, -5.6)} progress={p} />
            <TotemBurst position={at(V, 0, 0.5, -5.4)} progress={p} />
            <TotemBurst position={at(V, 1.4, 0.5, -5.6)} progress={p} />
            {[-1.4, 0, 1.4].map((kx, i) => (
              <Player
                key={i}
                who={[1, 3, 4, 5, 6][i % 5]}
                scale={0.82}
                position={at(V, kx, bounce, -5.6)}
                rotationY={0}
                animation="cheer"
                face="grin"
                time={t + i * 0.15}
              />
            ))}
          </>
        );
      },
    },
    {
      cue: "1.zero",
      ...cam.front({ actor: at(V, 0, 0, 2.2), dist: 4.6, fov: 40, screenOffset: [0, 0.06] }),
      zone: "village",
      hud: { banner: { text: "0 EXTRA LIVES", color: "#ff4f42" } },
      note: "Tight front cut to Leo stepping forward with empty hands as 'zero' lands.",
      stage: (t) => {
        const w = moveBetween(at(V, 0, 0, 1.0), at(V, 0, 0, 2.3), t, 0, 0.9);
        return (
          <Leo
            position={w.position}
            rotationY={0}
            animation={w.moving ? "walk" : "idle"}
            animDistance={w.animDistance}
            face="uneasy"
            time={t}
          />
        );
      },
    },
    {
      cue: "1.bucket",
      ...cam.sweep({ on: at(V, 0, 1.1, 2.3), dist: 4.5, fromYaw: 52, toYaw: 22, pitch: 12, fov: 40 }),
      zone: "village",
      note: "Leo lifts his plain iron Water Bucket with bright blue water in front of camera.",
      stage: (t) => (
        <Leo position={at(V, 0, 0, 2.3)} rotationY={0.45} animation="point" face="neutral" time={t}>
          <WaterBucket position={[0, -0.06, 0.24]} scale={1.05} />
        </Leo>
      ),
    },
    {
      cue: "2.stairs",
      ...cam.sweep({ on: at(V, -10.5, 2.4, 5.2), dist: 6.4, fromYaw: -52, toYaw: -26, pitch: 12, fov: 44 }),
      zone: "village",
      note: "Visual-verbal gag #1: a kid leaps straight out of the 2nd-story school window and pops a Totem instead of using stairs.",
      stage: (t) => {
        const f = ease(ramp(t, 0.05, 0.85));
        const popP = ramp(t, 0.78, 1.65);
        return (
          <>
            <Player
              who={4}
              scale={0.82}
              position={at(V, -10.5, 4.0 * (1 - f), 5.3 + f * 1.4)}
              rotationY={0}
              animation={f < 0.95 ? "cheer" : "wave"}
              face="grin"
              time={t}
            >
              {f < 0.9 ? <TotemOfUndying position={[0, 0, 0.22]} scale={0.95} mode="gold" /> : null}
            </Player>
            <TotemBurst position={at(V, -10.5, 0.5, 6.7)} progress={popP} />
          </>
        );
      },
    },
    {
      cue: "2.mail",
      ...cam.track({
        from: at(V, 5.2, 0, 3.6),
        to: at(V, 9.6, 0, 3.6),
        sideDist: 5.4,
        lead: 1.0,
        height: 2.0,
        fov: 44,
      }),
      zone: "village",
      note: "Visual-verbal gag #2: mailman strolls straight through the glowing Lava Fountain, popping a Totem casually.",
      stage: (t) => {
        const w = moveBetween(at(V, 5.2, 0, 3.6), at(V, 9.6, 0, 3.6), t, 0, 1.5);
        const popP = ramp(t, 0.55, 1.45);
        return (
          <>
            <Player
              who={5}
              scale={0.95}
              position={w.position}
              rotationY={w.rotationY}
              animation={w.moving ? "walk" : "idle"}
              animDistance={w.animDistance}
              face="grin"
              time={t}
            />
            <TotemBurst position={at(V, 7.6, 0.9, 3.6)} progress={popP} />
          </>
        );
      },
    },
    {
      cue: "2.baker",
      ...cam.twoShot({ a: at(V, -1.8, 0, 6.5), b: at(V, 1.2, 0, 6.5), dist: 5.4, height: 1.5, fov: 44 }),
      zone: "village",
      note: "Visual-verbal gag #3: baker casually walks up and pokes a Creeper, triggering a green-gold Totem burst.",
      stage: (t) => {
        const w = moveBetween(at(V, -2.0, 0, 6.5), at(V, 0.0, 0, 6.5), t, 0, 0.95);
        const popP = ramp(t, 0.92, 1.8);
        return (
          <>
            <Player
              who={6}
              scale={0.95}
              position={w.position}
              rotationY={Math.PI / 2}
              animation={w.moving ? "walk" : "point"}
              animDistance={w.animDistance}
              face="grin"
              time={t}
            />
            <Creeper position={at(V, 1.3, 0, 6.5)} rotationY={-Math.PI / 2} />
            <TotemBurst position={at(V, 0.6, 0.7, 6.5)} progress={popP} />
          </>
        );
      },
    },
  ],
});
