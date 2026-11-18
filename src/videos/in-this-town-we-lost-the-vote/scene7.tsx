import { cam, storyScene } from "../../engine";
import { Cow, Glow, HOME, Heap, Mailbox, Mailboxes, Neighbours, SOUTH, StageGone, SubscribeSign, WEST, hop, pop, timing, tw, w } from "./kit";

/** 07 — Morning. Like every morning. Her flag is up. */
export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "The flag",
  shots: [
    {
      cue: "7.morning",
      ...cam.push({ on: [0.35, 1.05, 1.9], dist: 3.7, to: 3.3, yaw: 16, pitch: 3, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "Morning, and the sun is out. Slips of paper all over the street. She walks down it toward us the way she does every day, not hurrying, not looking at anything.",
      stage: (t, { dur }) => {
        const k = t / dur;
        return (
          <>
            <Mailboxes skip={["cow"]} />
            <Neighbours t={t} mail />
            <Heap position={[0.9, 0, 0.2]} n={30} r={1.2} h={0.05} />
            <Heap position={[-0.6, 0, -2.2]} n={30} r={1.3} h={0.05} />
            <Cow position={[0.35, 0, 0.6 + k * 1.3]} rotationY={SOUTH} t={t} walk={k * 1.3} />
          </>
        );
      },
    },
    {
      cue: "7.flag",
      ...cam.push({ on: [-1.5, 1.25, 3.4], dist: 3.1, to: 2.8, yaw: -15, pitch: 3, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "Her mailbox with the yellow stripe. The red flag is standing straight up. Her face next to it, eyes as wide as they go.",
      stage: (t) => (
        <>
          <Mailbox position={HOME.cow.box} side={-1} tint={HOME.cow.tint} flag={1} letter flower={1} />
          <Glow position={[HOME.cow.box[0] + 0.1, 1.55, HOME.cow.box[2] + 0.3]} size={1.4} color="#ff6a5a" opacity={0.35} />
          <Cow position={[-0.3, hop(t, 0.1, 0.12, 0.25), 3.4]} rotationY={WEST} t={t} wide />
        </>
      ),
    },
    {
      cue: "7.sub",
      ...cam.push({ on: [-1.25, 1.45, 3.7], dist: 5.3, to: 4.8, yaw: 0, pitch: 5, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "She has sat down in front of it. The flag is up, the corner of a letter sticks out of the door, and she is just looking at it. Up the street behind her every one of them has stopped to watch. A subscribe sign over her.",
      stage: (t) => {
        const s = w("7.sub", "subscribe");
        return (
          <>
            <Mailboxes skip={["cow"]} />
            <Mailbox position={HOME.cow.box} side={-1} tint={HOME.cow.tint} flag={1} letter flower={1} />
            <StageGone />
            <Neighbours t={t} turn={0} happy={1} soft={1} />
            <Heap position={[0.9, 0, 0.2]} n={30} r={1.2} h={0.05} />
            <Cow position={[-0.95, 0, 3.9]} rotationY={SOUTH + 0.15} t={t} wide={t > w("7.sub", "opened")} look={-1.0 * (1 - tw(t, w("7.sub", "I") - 0.2, w("7.sub", "I") + 0.1))} />
            <SubscribeSign position={[-1.25, 2.7 + Math.sin(t * 8) * 0.05, 3.6]} rotationY={0} scale={0.9 * pop(t, s - 0.2, 0.2)} tilt={Math.sin(t * 5) * 0.05} />
          </>
        );
      },
    },
  ],
});
