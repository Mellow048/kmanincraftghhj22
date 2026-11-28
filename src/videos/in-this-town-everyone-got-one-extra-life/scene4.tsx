import {
  Block,
  Leo,
  MrVex,
  PLACE,
  Player,
  TotemOfUndying,
  WaterBucket,
  at,
  cam,
  ease,
  moveBetween,
  ramp,
  storyScene,
  timing,
} from "./kit";

const C = PLACE.canyon;
const KID_XS = [-6.5, -5.2, -3.9, -2.6, -1.3, 0, 1.3, 2.6, 3.9, 5.2, 6.5];

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Annual 40-Block Cliff Jump",
  shots: [
    {
      cue: "5.annual",
      ...cam.streetOverview({
        from: at(C, 0, 22.0, 9.0),
        to: at(C, 0, 21.5, 2.5),
        on: at(C, 0, 20.6, -7.2),
        height: 4.5,
        fov: 46,
      }),
      zone: "canyon",
      look: "overworld-golden",
      note: "Sweeping golden-hour crane revealing the towering 40-block canyon cliff and crowd of kids along the edge.",
      stage: (t) => (
        <>
          {KID_XS.map((kx, i) => (
            <Player
              key={i}
              who={[1, 3, 4, 5, 6][i % 5]}
              scale={0.82}
              position={at(C, kx, 20.0, -7.0)}
              rotationY={0}
              animation="cheer"
              face="grin"
              time={t + i * 0.14}
            >
              <TotemOfUndying position={[0, 0.04, 0.22]} scale={0.9} mode="gold" />
            </Player>
          ))}
        </>
      ),
    },
    {
      cue: "5.line",
      ...cam.truck({
        on: at(C, -3.0, 21.0, -7.0),
        by: [6.0, 0, 0],
        dist: 5.6,
        yaw: 35,
        pitch: 8,
        fov: 44,
      }),
      zone: "canyon",
      look: "overworld-golden",
      note: "Lateral truck along the row of thirty cheering kids waving shiny painted Totems.",
      stage: (t) => (
        <>
          {KID_XS.map((kx, i) => (
            <Player
              key={i}
              who={[1, 3, 4, 5, 6][i % 5]}
              scale={0.82}
              position={at(C, kx, 20.0, -7.0)}
              rotationY={0}
              animation="wave"
              face="grin"
              time={t + i * 0.16}
            >
              <TotemOfUndying position={[0, 0.05, 0.22]} scale={0.95} mode="gold" />
            </Player>
          ))}
        </>
      ),
    },
    {
      cue: "5.count",
      ...cam.heroLow({ on: at(C, 0, 20.8, -7.0), dist: 7.4, yaw: -16, fov: 44 }),
      zone: "canyon",
      look: "overworld-golden",
      hud: {
        counter: { label: "COUNTDOWN", from: 3, to: 1, startAt: 0.15, dur: 1.4, color: "#ff4f42" },
      },
      note: "Dramatic countdown 3... 2... 1... as kids bounce excitedly on the cliff edge.",
      stage: (t) => (
        <>
          {KID_XS.slice(2, 9).map((kx, i) => (
            <Player
              key={i}
              who={[1, 3, 4, 5, 6][i % 5]}
              scale={0.82}
              position={at(C, kx, 20.0, -7.0)}
              rotationY={0}
              animation="cheer"
              face="grin"
              time={t + i * 0.12}
            >
              <TotemOfUndying position={[0, 0.05, 0.22]} scale={0.95} mode="gold" />
            </Player>
          ))}
        </>
      ),
    },
    {
      cue: "5.yell",
      ...cam.track({
        from: at(C, -11.5, 20.0, -8.8),
        to: at(C, -5.5, 20.0, -7.8),
        sideDist: 5.4,
        lead: 1.1,
        height: 1.8,
        fov: 44,
      }),
      zone: "canyon",
      look: "overworld-golden",
      hud: { banner: { text: "THEY'RE WOOD!", color: "#ff4f42" } },
      note: "Leo sprints onto the ridge waving his bucket and yelling that the Totems are carved wood.",
      stage: (t) => {
        const w = moveBetween(at(C, -11.5, 20.0, -8.8), at(C, -5.5, 20.0, -7.8), t, 0, 1.35);
        return (
          <Leo
            position={w.position}
            rotationY={w.rotationY}
            animation={w.moving ? "run" : "idle"}
            animDistance={w.animDistance}
            face="surprised"
            time={t}
          >
            <WaterBucket position={[0, -0.04, 0.22]} scale={1.0} />
          </Leo>
        );
      },
    },
    {
      cue: "5.vex",
      ...cam.front({ actor: at(C, 8.2, 20.0, -7.4), dist: 4.8, facing: -0.66, fov: 42, screenOffset: [0, 0.06] }),
      zone: "canyon",
      look: "overworld-golden",
      hud: { chat: [{ sender: "Mr. Vex", text: "Hahaha! Jump anyway!", color: "#d580ff" }] },
      note: "Mr. Vex laughs arrogantly from the right ridge and waves the kids forward.",
      stage: (t) => (
        <MrVex position={at(C, 8.2, 20.0, -7.4)} rotationY={-0.35} animation="cheer" face="grin" time={t} />
      ),
    },
    {
      cue: "5.leap",
      ...cam.sweep({ on: at(C, 0, 18.5, -4.5), dist: 10.5, fromYaw: 25, toYaw: 60, pitch: 12, fov: 46 }),
      zone: "canyon",
      look: "overworld-golden",
      note: "All thirty kids step off the 40-block cliff ledge into open canyon air.",
      stage: (t) => {
        const f = ease(ramp(t, 0, 1.45));
        return (
          <>
            {KID_XS.map((kx, i) => (
              <Player
                key={i}
                who={[1, 3, 4, 5, 6][i % 5]}
                scale={0.82}
                position={at(C, kx, 20.0 - f * 5.8 - (i % 3) * 0.4, -7.0 + f * 3.8)}
                rotationY={0}
                animation="cheer"
                face="grin"
                time={t + i * 0.1}
              >
                <TotemOfUndying position={[0, 0.04, 0.22]} scale={0.95} mode="peeling" />
              </Player>
            ))}
          </>
        );
      },
    },
    {
      cue: "5.peel",
      ...cam.track({
        from: at(C, 0, 14.0, -3.2),
        to: at(C, 0, 9.5, -2.0),
        sideDist: 5.4,
        lead: 0.6,
        height: 0.6,
        fov: 42,
      }),
      zone: "canyon",
      look: "overworld-golden",
      note: "Mid-air close tracking: brown oak wood chips peel off the fake Totems in the wind as kids panic.",
      stage: (t) => {
        const f = ramp(t, 0, 1.5);
        const y = 14.0 - f * 4.5;
        return (
          <>
            {[-2.2, 0, 2.2].map((kx, i) => (
              <Player
                key={i}
                who={[1, 3, 4, 5, 6][i % 5]}
                scale={0.82}
                position={at(C, kx, y + i * 0.35, -3.2 + f * 1.2)}
                rotationY={0}
                animation="panic"
                face="surprised"
                time={t + i * 0.12}
              >
                <TotemOfUndying position={[0, 0.04, 0.24]} scale={1.0} mode="wood" />
              </Player>
            ))}
            {/* Peeling gold/wood flakes whipping upward */}
            {[-1.5, -0.5, 0.5, 1.5].map((fx, i) => (
              <Block
                key={i}
                position={at(C, fx, y + 1.2 + f * 2.4 + (i % 2) * 0.4, -2.8)}
                size={[0.16, 0.1, 0.06]}
                color={i % 2 === 0 ? "#f2c636" : "#8b6036"}
                castShadow={false}
              />
            ))}
          </>
        );
      },
    },
    {
      cue: "5.nothing",
      ...cam.heroLow({ on: at(C, 0, 9.0, -1.8), dist: 7.2, yaw: 18, fov: 44 }),
      zone: "canyon",
      look: "overworld-golden",
      note: "Low angle looking up at the falling kids—zero golden sparks appear in the sky.",
      stage: (t) => {
        const f = ramp(t, 0, 1.4);
        return (
          <>
            {[-3.2, -1.6, 0, 1.6, 3.2].map((kx, i) => (
              <Player
                key={i}
                who={[1, 3, 4, 5, 6][i % 5]}
                scale={0.82}
                position={at(C, kx, 10.5 - f * 3.4 - (i % 2) * 0.5, -1.8)}
                rotationY={0}
                animation="panic"
                face="surprised"
                time={t + i * 0.1}
              >
                <TotemOfUndying position={[0, 0, 0.22]} scale={0.9} mode="wood" />
              </Player>
            ))}
          </>
        );
      },
    },
  ],
});
