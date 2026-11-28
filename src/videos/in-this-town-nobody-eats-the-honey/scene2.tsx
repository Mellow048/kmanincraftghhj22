import {
  BeeHiveBox,
  BeeMob,
  Dad,
  Kid,
  Mayor,
  PLACE,
  Player,
  PoppyFlower,
  at,
  cam,
  moveBetween,
  storyScene,
  timing,
} from "./kit";

const V = PLACE.village;
const S = PLACE.school;

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Flower Bus, Campfire Smoke & Classroom Sorry",
  shots: [
    {
      cue: "2.poppy",
      ...cam.track({ from: at(V, -4.0, 0, 2.5), to: at(V, 1.5, 0, 2.5), sideDist: 5.4, lead: 1.0, height: 1.7, fov: 44 }),
      zone: "village",
      note: "Dad walks happily to work down the sunny street holding a bright red poppy.",
      stage: (t) => {
        const w = moveBetween(at(V, -4.0, 0, 2.5), at(V, 1.5, 0, 2.5), t, 0, 1.5);
        return (
          <Dad position={w.position} rotationY={w.rotationY} animation="walk" animDistance={w.animDistance} face="smile" time={t}>
            <PoppyFlower position={[0, -0.02, 0.24]} scale={1.1} />
          </Dad>
        );
      },
    },
    {
      cue: "2.bus",
      ...cam.sweep({ on: at(V, -0.5, 1.4, 2.5), dist: 6.2, fromYaw: -22, toYaw: 20, pitch: 12, fov: 44 }),
      zone: "village",
      note: "Six fuzzy Minecraft bees float in a cheerful conga line right behind Dad's poppy.",
      stage: (t) => {
        const w = moveBetween(at(V, -1.5, 0, 2.5), at(V, 2.5, 0, 2.5), t, 0, 1.5);
        return (
          <>
            <Dad position={w.position} rotationY={w.rotationY} animation="walk" animDistance={w.animDistance} face="grin" time={t}>
              <PoppyFlower position={[0, -0.02, 0.24]} scale={1.1} />
            </Dad>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <BeeMob
                key={n}
                position={[w.position[0] - n * 0.85, 1.35 + (n % 2) * 0.22, 2.5 + (n % 3 - 1) * 0.35]}
                rotationY={Math.PI / 2}
                scale={0.95}
                time={t + n * 0.2}
              />
            ))}
          </>
        );
      },
    },
    {
      cue: "2.smoke",
      ...cam.sweep({ on: at(V, -3.8, 1.4, -2.0), dist: 5.4, fromYaw: 20, toYaw: -20, pitch: 12, fov: 44 }),
      zone: "village",
      note: "Harvest day: calm campfires burn underneath the wooden bee hives.",
      stage: (t) => (
        <>
          <BeeHiveBox position={at(V, -4.8, 0, -2.2)} smoke time={t} />
          <BeeHiveBox position={at(V, -2.8, 0, -2.2)} smoke time={t + 0.4} />
          <Mayor position={at(V, -3.8, 0, -0.4)} rotationY={Math.PI} animation="reach" face="calm" time={t} />
        </>
      ),
    },
    {
      cue: "2.calm",
      ...cam.front({ actor: at(V, -3.8, 0, -0.4), facing: 0, dist: 4.8, fov: 42, screenOffset: [0, 0.06] }),
      zone: "village",
      note: "White smoke curls peacefully around calm golden bees while villagers harvest safely.",
      stage: (t) => (
        <>
          <BeeHiveBox position={at(V, -4.8, 0, -2.2)} smoke time={t} />
          <Mayor position={at(V, -3.8, 0, -0.4)} rotationY={0.2} animation="wave" face="smile" time={t} />
          <BeeMob position={at(V, -4.6, 2.2, -1.1)} rotationY={0.5} scale={1.0} time={t} />
          <BeeMob position={at(V, -2.9, 2.0, -1.2)} rotationY={-0.4} scale={1.0} time={t + 0.3} />
        </>
      ),
    },
    {
      cue: "2.class",
      ...cam.twoShot({ a: at(S, -1.2, 0, 0.2), b: at(S, 1.2, 0, 0.2), dist: 5.0, height: 1.5, fov: 44 }),
      zone: "school",
      look: "warm-room",
      note: "Planted gag: the whole classroom stands facing one tiny bee sitting on the sunlit windowsill.",
      stage: (t) => (
        <>
          <BeeMob position={at(S, 0, 1.25, -2.1)} rotationY={0} scale={1.05} time={t} />
          <Kid position={at(S, -1.1, 0, 0.4)} rotationY={Math.PI} animation="idle" face="uneasy" time={t} />
          <Player who={1} scale={0.82} position={at(S, 0, 0, 0.5)} rotationY={Math.PI} animation="idle" face="calm" time={t} />
          <Player who={3} scale={0.82} position={at(S, 1.1, 0, 0.4)} rotationY={Math.PI} animation="idle" face="calm" time={t} />
        </>
      ),
    },
    {
      cue: "2.sorry",
      ...cam.front({ actor: at(S, 0, 0, 0.4), dist: 4.8, fov: 42, screenOffset: [0, 0.06] }),
      zone: "school",
      look: "warm-room",
      hud: { banner: { text: '"SORRY!"', color: "#ffdd57" } },
      note: "The kids bow and say sorry in unison while Kid mouths it unconvinced.",
      stage: (t) => (
        <>
          <Kid position={at(S, -1.1, 0, 0.4)} rotationY={0} animation="shrug" face="uneasy" time={t} />
          <Player who={1} scale={0.82} position={at(S, 0.1, 0, 0.4)} rotationY={0} animation="wave" face="smile" time={t} />
          <Player who={3} scale={0.82} position={at(S, 1.2, 0, 0.4)} rotationY={0} animation="wave" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "2.mayor",
      ...cam.twoShot({ a: at(V, -0.9, 0, 2.2), b: at(V, 1.1, 0, 2.2), dist: 5.0, height: 1.5, fov: 42 }),
      zone: "village",
      hud: { chat: [{ sender: "Mayor", text: "Not for eating.", color: "#ffdd57" }] },
      note: "Kid asks the Mayor for one taste; the Mayor gently refuses and walks away without explaining.",
      stage: (t) => {
        const w = moveBetween(at(V, 1.0, 0, 2.2), at(V, 2.6, 0, 2.2), t, 0.7, 1.5);
        return (
          <>
            <Kid position={at(V, -0.9, 0, 2.2)} rotationY={1.1} animation="reach" face="frown" time={t} />
            <Mayor position={w.position} rotationY={w.moving ? w.rotationY : -1.1} animation={w.moving ? "walk" : "idle"} animDistance={w.animDistance} face="calm" time={t} />
          </>
        );
      },
    },
  ],
});
