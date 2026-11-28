import {
  BeeMob,
  Kid,
  Mayor,
  PLACE,
  WoodenSpoon,
  at,
  cam,
  moveBetween,
  storyScene,
  timing,
} from "./kit";

const V = PLACE.village;

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The Swat & Poison Heart Countdown",
  shots: [
    {
      cue: "4.golden",
      ...cam.track({
        from: at(V, -1.8, 0, -0.5),
        to: at(V, -4.4, 0, -1.2),
        sideDist: 5.0,
        lead: 0.9,
        height: 1.6,
        fov: 42,
      }),
      zone: "village",
      look: "overworld-golden",
      note: "Golden-hour creep back to the wooden hive with his wooden spoon.",
      stage: (t) => {
        const w = moveBetween(at(V, -1.8, 0, -0.5), at(V, -4.4, 0, -1.2), t, 0, 1.4);
        return (
          <Kid position={w.position} rotationY={w.rotationY} animation="creep" animDistance={w.animDistance} face="uneasy" time={t}>
            <WoodenSpoon position={[0, 0, 0.24]} scale={1.1} />
          </Kid>
        );
      },
    },
    {
      cue: "4.land",
      ...cam.front({ actor: at(V, -4.4, 0, -1.2), dist: 4.0, fov: 40, screenOffset: [0, 0.06] }),
      zone: "village",
      look: "overworld-golden",
      note: "His friendly little bee lands right on the wooden spoon near his face.",
      stage: (t) => (
        <>
          <Kid position={at(V, -4.4, 0, -1.2)} rotationY={0.1} animation="reach" face="surprised" time={t}>
            <WoodenSpoon position={[0, 0.04, 0.26]} scale={1.1} />
          </Kid>
          <BeeMob position={at(V, -4.2, 1.35, -0.75)} rotationY={-0.6} scale={1.0} time={t} />
        </>
      ),
    },
    {
      cue: "4.panic",
      ...cam.sweep({ on: at(V, -4.4, 1.3, -1.0), dist: 3.8, fromYaw: -18, toYaw: 18, pitch: 8, fov: 40 }),
      zone: "village",
      look: "overworld-golden",
      note: "The bee buzzes close to his nose and Kid flinches in sudden panic.",
      stage: (t) => (
        <>
          <Kid position={at(V, -4.4, 0, -1.2)} rotationY={0.1} animation="panic" face="scared" time={t} />
          <BeeMob position={at(V, -4.3 + Math.sin(t * 14) * 0.2, 1.45, -0.8)} rotationY={-0.4} scale={1.05} time={t} />
        </>
      ),
    },
    {
      cue: "4.swat",
      ...cam.front({ actor: at(V, -4.4, 0, -1.2), dist: 4.2, fov: 42, screenOffset: [0, 0.06] }),
      zone: "village",
      look: "overworld-golden",
      hud: { stamp: { text: "STUNG!", color: "#ff3b30", at: 0.3, angle: -10 } },
      note: "One panicked swat—the bee stings his hand and red-green poison sparks flash.",
      stage: (t) => (
        <>
          <Kid position={at(V, -4.4, 0, -1.2)} rotationY={0.1} animation="ache" face="ouch" time={t} />
          <BeeMob position={at(V, -3.9, 1.25, -0.8)} rotationY={-1.0} scale={1.0} angry time={t} />
        </>
      ),
    },
    {
      cue: "4.poison",
      ...cam.sweep({ on: at(V, -3.5, 1.1, -0.4), dist: 4.8, fromYaw: 18, toYaw: -18, pitch: 10, fov: 42 }),
      zone: "village",
      look: "overworld-golden",
      hud: { banner: { text: "POISON II", color: "#82c91e" } },
      note: "Kid staggers backward clutching his stung hand as green Poison II flashes.",
      stage: (t) => {
        const w = moveBetween(at(V, -4.4, 0, -1.1), at(V, -2.8, 0, 0.2), t, 0, 1.4);
        return <Kid position={w.position} rotationY={w.rotationY} animation="stagger" animDistance={w.animDistance} face="hurt" time={t} />;
      },
    },
    {
      cue: "4.ticks",
      ...cam.front({ actor: at(V, -2.2, 0, 0.8), dist: 4.4, fov: 42, screenOffset: [0, 0.06] }),
      zone: "village",
      look: "overworld-golden",
      hud: {
        counter: { label: "HEARTS", from: 10, to: 1, suffix: " / 10", startAt: 0.08, dur: 1.35, color: "#ff4f42" },
      },
      note: "Ticking-clock heart countdown drops rapidly 10 -> 7 -> 4 -> 1 as Kid drops to one knee.",
      stage: (t) => (
        <Kid position={at(V, -2.2, 0, 0.8)} rotationY={0} animation="crouch" face="hurt" time={t} />
      ),
    },
    {
      cue: "4.sprint",
      ...cam.track({
        from: at(V, 4.5, 0, 1.0),
        to: at(V, -1.2, 0, 0.9),
        sideDist: 5.4,
        lead: 1.1,
        height: 1.7,
        fov: 44,
      }),
      zone: "village",
      look: "overworld-golden",
      note: "The Mayor spots Kid collapsing and sprints 6+ meters across the square to reach him.",
      stage: (t) => {
        const w = moveBetween(at(V, 4.5, 0, 1.0), at(V, -1.1, 0, 0.9), t, 0, 1.35);
        return (
          <>
            <Mayor position={w.position} rotationY={w.rotationY} animation="run" animDistance={w.animDistance} face="worried" time={t} />
            <Kid position={at(V, -2.2, 0, 0.8)} rotationY={1.2} animation="crouch" face="hurt" time={t} />
          </>
        );
      },
    },
  ],
});
