import { cam, storyScene } from "../../engine";
import { Boat, Dad, DockChain, DoorBoat, HatKid, Hero, Key, Mum, ease, ramp, timing, wordAt, DAY } from "./kit";

/** A door that sinks, a chain that holds, a key on the morning he turns eighteen. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "The wait",
  shots: [
    {
      cue: "2.door",
      ...cam.push({ on: [-5.4, 1.15, 6.6], dist: 4.4, to: 3.4, yaw: 24, pitch: 8, fov: 42 }),
      zone: "dock",
      look: DAY,
      note: "A standing door tips into the pond on sank. He watches his boat fail.",
      stage: (t) => {
        const sink = ease(ramp(t, wordAt("2.door", "sank") - 0.15, wordAt("2.door", "sank") + 0.7));
        return (
          <>
            <DoorBoat sink={sink} />
            <Hero position={[-4.2, 0, 4.2]} rotationY={-1.5} animation="idle" face="ouch" />
          </>
        );
      },
    },
    {
      cue: "2.laugh",
      ...cam.orbit({ on: [-4.5, 1.2, 4.1], dist: 4.8, yaw: -16, yawTo: 36, pitch: 6, fov: 44 }),
      zone: "dock",
      look: DAY,
      note: "The town laughs. Mum, dad and the straw hat lean in, and he waits in the middle.",
      stage: (t) => (
        <>
          <Hero position={[-4.4, 0, 4.5]} rotationY={0.3} animation="idle" face="frown" />
          <Mum position={[-5.7, 0, 3.5]} rotationY={0.7} lean={0.12 + Math.sin(t * 6) * 0.04} />
          <Dad position={[-3.3, 0, 3.4]} rotationY={-0.8} lean={0.1} />
          <HatKid position={[-4.6, 0, 2.9]} rotationY={0.4} lean={0.08} />
        </>
      ),
    },
    {
      cue: "2.lock",
      ...cam.push({ on: [0.15, 1.15, 2.6], dist: 4.2, to: 3.2, yaw: 172, pitch: 8, fov: 40 }),
      zone: "dock",
      look: DAY,
      note: "From behind him, his hand goes onto the chain. The boat stays on the far side.",
      stage: (t) => {
        const reach = ease(ramp(t, wordAt("2.lock", "hand"), wordAt("2.lock", "hand") + 0.4));
        return (
          <>
            <DockChain />
            <Hero position={[0.15, 0, 1.7 + reach * 0.35]} rotationY={0} animation="reach" face="frown" />
            <Boat position={[0, 0, 8.8]} />
          </>
        );
      },
    },
    {
      cue: "2.key",
      ...cam.push({ on: [0.45, 1.25, 1.45], dist: 3.1, to: 2.4, yaw: -28, pitch: 6, fov: 38 }),
      zone: "dock",
      look: DAY,
      note: "Both faces, and the key crossing from dad's sleeves into the boy's hand.",
      stage: (t) => {
        const k = ease(ramp(t, wordAt("2.key", "key"), wordAt("2.key", "hand")));
        return (
          <>
            <Dad position={[1.05, 0, 1.05]} rotationY={-1.3} lean={0.2} />
            <Hero position={[0.05, 0, 1.7]} rotationY={0.7} animation="reach" face="wow" />
            <Key position={[0.85 - k * 0.55, 1.15 - k * 0.2, 1.25 + k * 0.2]} />
          </>
        );
      },
    },
  ],
});
