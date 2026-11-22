import { Vox, cam, storyScene } from "../../engine";
import { Bits, GATE, Hero, MumChicken, PATH_TOP, SOUTH, ZombieKid, ease, jolt, ramp, timing, wordAt } from "./kit";

const sneezeAt = wordAt("3.normal", "sneezed");
const brokeAt = wordAt("3.broke", "broke");

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Trying to Walk Alone",
  shots: [
    {
      cue: "3.normal",
      ...cam.push({ on: [9.8, 0.75, -1.6], dist: 2.4, to: 1.95, yaw: 18, pitch: 8, fov: 38 }),
      look: "overworld-night",
      zone: "village",
      note: "By the front step: Hero frowns while his chicken mum sneezes and involuntarily flaps half a metre into the air.",
      stage: (t) => {
        const sn = t >= sneezeAt;
        const hop = sn ? Math.max(0, Math.sin(ramp(t, sneezeAt, sneezeAt + 0.65) * Math.PI)) * 0.45 : 0;
        const flap = sn && t < sneezeAt + 0.7 ? 1 : 0;
        return (
          <>
            <Hero position={[9.3, PATH_TOP, -1.5]} rotationY={0.3} mood="sad" lookAt={[10.1, 0.7, -1.6]} />
            <MumChicken
              position={[10.1, PATH_TOP + hop, -1.6]}
              rotationY={-0.3}
              flap={flap}
              headPitch={sn && t < sneezeAt + 0.25 ? -0.45 : 0}
            />
          </>
        );
      },
    },
    {
      cue: "3.walk",
      ...cam.truck({ on: [-3.0, 0.65, 1.8], by: [2.2, 0, 0], dist: 2.8, yaw: 12, pitch: 12, fov: 38 }),
      look: "overworld-night",
      zone: "village",
      note: "Low travelling shot along the street: Hero trudges alone on tiny legs while bigger kids pass behind him.",
      stage: (t, { p }) => (
        <>
          <Hero position={[-3.0 + p * 2.2, PATH_TOP, 1.8]} rotationY={Math.PI / 2} walk={t * 1.4} mood="angry" />
          <ZombieKid position={[-1.0 + p * 3.1, PATH_TOP, 0.8]} rotationY={Math.PI / 2} walk={t * 2.0} shirt="#3a7d8c" />
        </>
      ),
    },
    {
      cue: "3.short",
      ...cam.push({ on: [-0.2, 0.55, -0.3], dist: 1.9, to: 1.5, yaw: -30, pitch: -4, fov: 36 }),
      look: "overworld-night",
      zone: "village",
      note: "Worm's-eye angle by a stone step twice the height of his knees, struggling to climb up alone.",
      stage: (t) => (
        <>
          <Vox kind="cobble" position={[-0.2, 0.28, -0.7]} size={[1.6, 0.48, 0.7]} />
          <Hero position={[-0.2, PATH_TOP, -0.15]} rotationY={Math.PI} walk={t * 2.2} mood="sad" lean={0.18} />
        </>
      ),
    },
    {
      cue: "3.crates",
      ...cam.push({ on: [0.0, 1.55, 0.8], dist: 3.4, to: 2.75, yaw: -22, pitch: 10, fov: 40 }),
      look: "overworld-night",
      zone: "village",
      note: "Hero wobbles on top of two stacked wooden crates trying to look tall enough to walk through the gate.",
      stage: (t) => (
        <>
          <Vox kind="planks" tint="#9e6d3f" position={[0, PATH_TOP + 0.35, 0.8]} size={[0.72, 0.7, 0.72]} />
          <Vox kind="planks" tint="#b5804c" position={[0.02, PATH_TOP + 1.05, 0.8]} rotation={[0, 0.1, Math.sin(t * 9) * 0.08]} size={[0.68, 0.7, 0.68]} />
          <Hero
            position={[0.02, PATH_TOP + 1.4, 0.8]}
            rotationY={SOUTH}
            mood="happy"
            tilt={Math.sin(t * 9) * 0.14}
            armPitch={[-0.4, -0.4]}
          />
        </>
      ),
    },
    {
      cue: "3.broke",
      ...cam.push({ on: [0.0, 1.05, 0.8], dist: 2.5, to: 2.9, yaw: 24, pitch: 18, fov: 42 }),
      look: "overworld-night",
      zone: "village",
      note: "Action fall: the crates shatter into splinters on broke and the baby zombie plummets toward the stones.",
      stage: (t) => {
        const fall = t < brokeAt ? 0 : ease(ramp(t, brokeAt, brokeAt + 0.45));
        const y = PATH_TOP + 1.4 - fall * 0.88;
        return (
          <>
            {t < brokeAt ? (
              <>
                <Vox kind="planks" tint="#9e6d3f" position={[0, PATH_TOP + 0.35, 0.8]} size={[0.72, 0.7, 0.72]} />
                <Vox kind="planks" tint="#b5804c" position={[0, PATH_TOP + 1.05, 0.8]} size={[0.68, 0.7, 0.68]} />
              </>
            ) : (
              <Bits position={[0, PATH_TOP + 0.75, 0.8]} t={t - brokeAt} color="#a87542" count={16} power={3.8} />
            )}
            <Hero position={[0, y, 0.8]} rotationY={SOUTH} mood="scared" armPitch={[-2.5, -2.5]} />
          </>
        );
      },
    },
    {
      cue: "3.caught",
      ...cam.orbit({ on: [0.0, 0.55, 0.8], dist: 2.1, distTo: 1.7, yaw: 28, yawTo: -10, pitch: -4, fov: 36 }),
      look: "overworld-night",
      zone: "village",
      note: "Low ground reveal: he landed squarely on his chicken mum's back—she was already waiting underneath him.",
      stage: (t) => {
        const squash = jolt(t, 0.05, 0.25);
        return (
          <MumChicken position={[0, PATH_TOP, 0.8]} rotationY={0.2} crouch={Math.abs(squash)} flap={t < 0.4 ? 0.8 : 0} lookAt={[0, 1.2, 0.8]}>
            <Hero position={[0, 0, 0]} mood="scared" tilt={squash} />
          </MumChicken>
        );
      },
    },
  ],
});
