import { cam, storyScene } from "../../engine";
import { Boat, Dad, DockChain, DoorBoat, HatKid, Hero, Key, Mum, ease, ramp, timing, DAY } from "./kit";

/** A door that sinks, a chain that holds, a key on the morning he turns eighteen. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "The wait",
  shots: [
    {
      cue: "2.door",
      ...cam.push({ on: [-6.2, 0.7, 5.2], dist: 4.2, to: 3.1, yaw: 28, pitch: 18, fov: 40 }),
      zone: "dock",
      look: DAY,
      note: "The door he called a boat tips and sinks in the pond. A cheap failure.",
      stage: (t) => (
        <>
          <DoorBoat sink={ease(ramp(t, 0.25, 1.1))} />
          <Hero position={[-4.3, 0, 4.4]} rotationY={-1.4} animation="shrug" face="ouch" />
        </>
      ),
    },
    {
      cue: "2.laugh",
      ...cam.orbit({ on: [-4.6, 1.1, 4.2], dist: 5.2, yaw: -20, yawTo: 40, pitch: 8, fov: 44 }),
      zone: "dock",
      look: DAY,
      note: "The town laughs. Mum, dad and the straw hat lean in, and he waits.",
      stage: (t) => (
        <>
          <Hero position={[-4.3, 0, 4.6]} rotationY={0.4} animation="idle" face="frown" />
          <Mum position={[-5.4, 0, 3.4]} rotationY={0.8} lean={0.15 + Math.sin(t * 6) * 0.04} />
          <Dad position={[-3.5, 0, 3.3]} rotationY={-0.9} lean={0.12} />
          <HatKid position={[-4.8, 0, 2.8]} rotationY={0.5} lean={0.1} />
        </>
      ),
    },
    {
      cue: "2.lock",
      ...cam.push({ on: [0.1, 0.9, 3.1], dist: 3.2, to: 2.1, yaw: 8, pitch: 16, fov: 36 }),
      zone: "dock",
      look: DAY,
      note: "His hand goes onto the chain. The boat stays on the far side of it.",
      stage: (t) => (
        <>
          <DockChain />
          <Hero position={[0.15, 0, 2.2 + ease(ramp(t, 0, 0.5)) * 0.2]} rotationY={0} animation="reach" face="frown" />
          <Boat position={[0, 0, 6.4]} />
        </>
      ),
    },
    {
      cue: "2.key",
      ...cam.push({ on: [0.45, 1.15, 1.3], dist: 2.4, to: 1.6, yaw: -24, pitch: 6, fov: 36 }),
      zone: "dock",
      look: DAY,
      note: "The key leaves dad's sleeves and lands in the boy's open hand.",
      stage: (t) => {
        const k = ease(ramp(t, 0.2, 0.9));
        return (
          <>
            <Dad position={[0.85, 0, 1.05]} rotationY={-1.2} lean={0.25} />
            <Hero position={[0.1, 0, 1.55]} rotationY={0.6} animation="reach" face="wow" />
            <Key position={[0.7 - k * 0.45, 1.05 - k * 0.15, 1.2 + k * 0.15]} />
          </>
        );
      },
    },
  ],
});
