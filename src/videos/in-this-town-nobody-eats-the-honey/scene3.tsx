import {
  BeeMob,
  Block,
  Kid,
  PLACE,
  PoppyFlower,
  WoodenSpoon,
  at,
  cam,
  ease,
  moveBetween,
  ramp,
  storyScene,
  timing,
} from "./kit";

const V = PLACE.village;

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The Bucket Fail, Swarm Chase & Poppy Truce",
  shots: [
    {
      cue: "3.try",
      ...cam.sweep({ on: at(V, -4.8, 1.0, -0.5), dist: 4.5, fromYaw: 40, toYaw: 70, pitch: 10, fov: 42 }),
      zone: "village",
      note: "OTS: Kid sneaks up to the unsmoked bee hive wearing an upside-down iron bucket on his head.",
      stage: (t) => {
        const w = moveBetween(at(V, -4.8, 0, 0.2), at(V, -4.8, 0, -0.8), t, 0, 1.2);
        return (
          <Kid
            position={w.position}
            rotationY={w.rotationY}
            animation={w.moving ? "creep" : "idle"}
            animDistance={w.animDistance}
            face="grin"
            time={t}
            head={<Block position={[0, 0.16, 0]} size={[0.56, 0.44, 0.56]} color="#9ea8b4" />}
          >
            <WoodenSpoon position={[0, 0, 0.24]} scale={1.05} />
          </Kid>
        );
      },
    },
    {
      cue: "3.reach",
      ...cam.sweep({ on: at(V, -4.8, 1.4, -1.6), dist: 4.6, fromYaw: -20, toYaw: 20, pitch: 10, fov: 42 }),
      zone: "village",
      note: "OTS behind Kid: with zero campfire smoke, Kid reaches his wooden spoon straight into the wooden hive slot.",
      stage: (t) => (
        <Kid
          position={at(V, -4.8, 0, -1.1)}
          rotationY={Math.PI}
          animation="reach"
          face="smile"
          time={t}
          head={<Block position={[0, 0.16, 0]} size={[0.56, 0.44, 0.56]} color="#9ea8b4" />}
        >
          <WoodenSpoon position={[0, 0.1, 0.28]} scale={1.1} />
        </Kid>
      ),
    },
    {
      cue: "3.swarm",
      ...cam.heroLow({ on: at(V, -4.8, 1.8, -1.5), dist: 5.4, yaw: 18, fov: 44 }),
      zone: "village",
      note: "Ten angry red-eyed bees burst roaring out of the hive right toward Kid!",
      stage: (t) => {
        const p = ease(ramp(t, 0, 1.2));
        return (
          <>
            <Kid position={at(V, -4.8, 0, -0.8 + p * 1.4)} rotationY={0} animation="panic" face="scared" time={t} />
            {[-1.2, -0.6, 0, 0.6, 1.2, -0.9, 0.9].map((dx, i) => (
              <BeeMob
                key={i}
                position={at(V, -4.8 + dx * p * 1.4, 1.6 + (i % 3) * 0.45, -2.0 + p * 2.2)}
                rotationY={0}
                scale={1.05}
                angry
                time={t + i * 0.12}
              />
            ))}
          </>
        );
      },
    },
    {
      cue: "3.chase",
      ...cam.track({
        from: at(V, -4.5, 0, 1.2),
        to: at(V, 3.8, 0, 2.8),
        sideDist: 5.8,
        lead: 1.2,
        height: 1.8,
        fov: 46,
      }),
      zone: "village",
      note: "Full-speed comedic chase across 8+ meters of the sunny market square with angry bees hot on his heels.",
      stage: (t) => {
        const w = moveBetween(at(V, -4.5, 0, 1.2), at(V, 3.8, 0, 2.8), t, 0, 1.5);
        return (
          <>
            <Kid position={w.position} rotationY={w.rotationY} animation={w.moving ? "run" : "idle"} animDistance={w.animDistance} face="scared" time={t} />
            {[1, 2, 3, 4, 5].map((n) => (
              <BeeMob
                key={n}
                position={[w.position[0] - n * 0.75, 1.45 + (n % 2) * 0.35, w.position[2] - n * 0.14]}
                rotationY={w.rotationY}
                scale={1.0}
                angry
                time={t + n * 0.15}
              />
            ))}
          </>
        );
      },
    },
    {
      cue: "3.well",
      ...cam.sweep({ on: at(V, 5.6, 1.2, 3.2), dist: 5.6, fromYaw: -22, toYaw: 20, pitch: 16, fov: 44 }),
      zone: "village",
      note: "Kid sprints up and leaps headfirst into the stone town well to escape the angry swarm.",
      stage: (t) => {
        const j = ease(ramp(t, 0, 1.1));
        return (
          <>
            <Kid
              position={at(V, 3.6 + j * 2.0, Math.sin(j * Math.PI) * 1.9, 3.2)}
              rotationY={Math.PI / 2}
              animation="jump"
              face="scared"
              time={t}
            />
            {[0, 1, 2].map((i) => (
              <BeeMob key={i} position={at(V, 4.4 + i * 0.6, 2.3 + (i % 2) * 0.3, 3.2 + (i - 1) * 0.6)} rotationY={0} angry time={t + i * 0.2} />
            ))}
          </>
        );
      },
    },
    {
      cue: "3.truce",
      ...cam.front({ actor: at(V, 5.6, 0, 3.2), dist: 4.4, fov: 42, screenOffset: [0, 0.06] }),
      zone: "village",
      note: "Peeking out of the well, Kid pulls Dad's bright red poppy from his pocket and holds it up.",
      stage: (t) => (
        <>
          <Kid position={at(V, 5.6, 0.2, 3.2)} rotationY={0} animation="reachUp" face="surprised" time={t}>
            <PoppyFlower position={[0, 0.1, 0.2]} scale={1.15} />
          </Kid>
          {[-0.9, 0.9].map((dx, i) => (
            <BeeMob key={i} position={at(V, 5.6 + dx, 2.1, 3.4)} rotationY={dx < 0 ? 0.6 : -0.6} angry={t < 0.5} time={t + i * 0.2} />
          ))}
        </>
      ),
    },
    {
      cue: "3.soft",
      ...cam.sweep({ on: at(V, 5.6, 1.5, 3.2), dist: 4.8, fromYaw: 20, toYaw: -20, pitch: 12, fov: 42 }),
      zone: "village",
      note: "Every bee's red eyes soften back to calm dark eyes as they drift gently toward the red poppy.",
      stage: (t) => (
        <>
          <Kid position={at(V, 5.6, 0.2, 3.2)} rotationY={0} animation="reachUp" face="smile" time={t}>
            <PoppyFlower position={[0, 0.1, 0.2]} scale={1.15} />
          </Kid>
          {[-1.1, -0.4, 0.5, 1.1].map((dx, i) => (
            <BeeMob
              key={i}
              position={at(V, 5.6 + dx * 0.85, 1.85 + (i % 2) * 0.3, 3.5 + (i % 2) * 0.25)}
              rotationY={dx < 0 ? 0.4 : -0.4}
              angry={false}
              time={t + i * 0.25}
            />
          ))}
        </>
      ),
    },
    {
      cue: "3.mine",
      ...cam.front({ actor: at(V, 4.2, 0, 4.2), dist: 4.2, fov: 40, screenOffset: [0, 0.06] }),
      zone: "village",
      note: "One friendly little bee stays behind, hovering happily right beside Kid's shoulder.",
      stage: (t) => {
        const w = moveBetween(at(V, 5.2, 0, 3.8), at(V, 3.8, 0, 4.6), t, 0, 1.2);
        return (
          <>
            <Kid position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "idle"} animDistance={w.animDistance} face="grin" time={t} />
            <BeeMob position={[w.position[0] + 0.65, 1.5, w.position[2] + 0.2]} rotationY={-0.3} scale={1.05} time={t} />
          </>
        );
      },
    },
  ],
});
