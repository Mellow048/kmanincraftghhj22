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
const M = PLACE.meadow;
const S = PLACE.school;

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "The Honey Cure & The Bee That Didn't Go Home",
  shots: [
    {
      cue: "5.hall",
      ...cam.twoShot({ a: at(H, -0.9, 0, 0.6), b: at(H, 0.9, 0, 0.6), dist: 5.0, height: 1.5, fov: 44 }),
      zone: "hall",
      look: "overworld-sunset",
      note: "Mayor rushes into the sunlit Honey Hall and pulls a glowing amber jar off the shelf.",
      stage: (t) => {
        const w = moveBetween(at(H, 1.6, 0, 1.8), at(H, 0.8, 0, 0.4), t, 0, 1.1);
        return (
          <>
            <Kid position={at(H, -0.9, 0, 0.8)} rotationY={0.8} animation="crouch" face="hurt" time={t} />
            <Mayor position={w.position} rotationY={w.moving ? w.rotationY : -0.9} animation={w.moving ? "run" : "reach"} animDistance={w.animDistance} face="worried" time={t}>
              <HoneyJar position={[0, 0, 0.24]} scale={0.95} />
            </Mayor>
          </>
        );
      },
    },
    {
      cue: "5.pour",
      ...cam.front({ actor: at(H, -0.4, 0, 0.7), dist: 4.2, fov: 40, screenOffset: [0, 0.06] }),
      zone: "hall",
      look: "overworld-sunset",
      note: "Mayor pours glowing amber honey directly onto Kid's wooden spoon.",
      stage: (t) => (
        <>
          <Kid position={at(H, -0.8, 0, 0.7)} rotationY={0.9} animation="reach" face="hurt" time={t}>
            <WoodenSpoon position={[0, 0.04, 0.24]} scale={1.1} />
          </Kid>
          <Mayor position={at(H, 0.4, 0, 0.7)} rotationY={-0.9} animation="leanOver" face="calm" time={t}>
            <HoneyJar position={[0, -0.05, 0.26]} scale={1.0} />
          </Mayor>
        </>
      ),
    },
    {
      cue: "5.cure",
      ...cam.sweep({ on: at(H, -0.5, 1.2, 0.7), dist: 4.4, fromYaw: -18, toYaw: 18, pitch: 8, fov: 42 }),
      zone: "hall",
      look: "overworld-sunset",
      hud: { banner: { text: "POISON CURED!", color: "#55ff55" } },
      note: "Vanilla Minecraft mechanic: honey instantly wipes Poison II and restores health.",
      stage: (t) => (
        <>
          <Kid position={at(H, -0.8, 0, 0.7)} rotationY={0.2} animation="standUp" face="surprised" time={t} />
          <Mayor position={at(H, 0.7, 0, 0.7)} rotationY={-0.7} animation="idle" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "5.red",
      ...cam.front({ actor: at(H, -0.6, 0, 0.7), dist: 4.2, fov: 40, screenOffset: [0, 0.06] }),
      zone: "hall",
      look: "overworld-sunset",
      hud: { counter: { label: "HEARTS", from: 1, to: 10, suffix: " / 10", startAt: 0.05, dur: 1.0, color: "#ff4f42" } },
      note: "All ten hearts flash bright red as Kid gasps awake alive and healthy.",
      stage: (t) => (
        <Kid position={at(H, -0.6, 0, 0.7)} rotationY={0} animation="cheer" face="smile" time={t} />
      ),
    },
    {
      cue: "5.dusk",
      ...cam.streetOverview({
        from: at(M, 0, 0, 11.0),
        to: at(M, 0, 0, 6.2),
        on: at(M, 0, 1.8, -3.0),
        height: 4.5,
        fov: 46,
      }),
      zone: "meadow",
      look: "overworld-sunset",
      note: "Wide sunset crane across the golden meadow as dusk settles over the hives.",
      stage: (t) => {
        const f = ease(ramp(t, 0, 1.4));
        return (
          <>
            {[-4.0, -2.0, 0, 2.0, 4.0].map((bx, i) => (
              <BeeMob
                key={i}
                position={at(M, bx * (1 - f * 0.4), 2.4 - f * 0.6, 2.0 - f * 5.8)}
                rotationY={Math.PI}
                scale={1.0}
                time={t + i * 0.15}
              />
            ))}
          </>
        );
      },
    },
    {
      cue: "5.home",
      ...cam.sweep({ on: at(M, -5.4, 1.8, -4.2), dist: 5.2, fromYaw: -20, toYaw: 20, pitch: 10, fov: 44 }),
      zone: "meadow",
      look: "overworld-sunset",
      note: "Every golden bee streams safely back into the wooden hives at dusk.",
      stage: (t) => {
        const f = ease(ramp(t, 0, 1.3));
        return (
          <>
            {[-0.8, 0, 0.8].map((dx, i) => (
              <BeeMob
                key={i}
                position={at(M, -5.4 + dx * (1 - f), 1.8, -1.6 - f * 2.4)}
                rotationY={Math.PI}
                scale={1.0}
                time={t + i * 0.2}
              />
            ))}
          </>
        );
      },
    },
    {
      cue: "5.mine",
      ...cam.sweep({ on: at(S, -0.2, 1.15, -1.6), dist: 3.1, fromYaw: -20, toYaw: 16, pitch: 8, fov: 40 }),
      zone: "school",
      look: "overworld-sunset",
      note: "OTS behind Kid: he steps up to the quiet sunset windowsill and stops dead still.",
      stage: (t) => (
        <>
          <Kid position={at(S, -0.6, 0, -0.7)} rotationY={Math.PI - 0.3} animation="idle" face="sad" time={t} />
          <BeeMob position={at(S, 0, 1.06, -2.18)} rotationY={0.4} scale={1.0} still time={t} />
        </>
      ),
    },
    {
      cue: "5.still",
      ...cam.sweep({ on: at(S, 0, 1.12, -2.18), dist: 2.8, fromYaw: -16, toYaw: 16, pitch: 8, fov: 36 }),
      zone: "school",
      look: "overworld-sunset",
      note: "OTS tight quiet close-up on his little bee resting completely still on the windowsill—its wings stopped.",
      stage: (t) => (
        <>
          <BeeMob position={at(S, 0, 1.06 + Math.sin(t * 2.5) * 0.015, -2.18)} rotationY={0.4} scale={1.05} still time={t} />
          <Kid position={at(S, -0.8, 0, -0.9)} rotationY={2.5} animation="ache" face="sad" time={t} />
        </>
      ),
    },
  ],
});
