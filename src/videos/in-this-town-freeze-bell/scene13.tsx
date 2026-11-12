import { cam, storyScene } from "../../engine";
import { Backpack, Friend, Hero, NORTH, PACK_SPOT, room, timing } from "./kit";
/** Beat 13: A friend at the door. The recorded words, not hand-set seconds, own every cut. */
export const scene13 = storyScene(timing, {
  id: "scene13",
  title: "A friend at the door",
  shots: [
    {
      cue: "13.friend",
      ...cam.push({ on: [0.5,1.12,81], dist: 4.0, to: 3.45, yaw: 5, pitch: 10, fov: 40 }),
      zone: "room",
      look: "overworld-day",
      note: "Morning light replaces the torch. The friend stands further back in the room, catching him with the open bag between them.",
      stage: (t, { p, dur }) => (<>
        <Hero position={room(0.35,0,1.4)} rotationY={-0.2} animation="hold" face="uneasy" time={t + 0.8} /><Friend position={room(0.9,0,0.15)} animation="talk" face="uneasy" time={t + 0.8} /><Backpack position={PACK_SPOT} scale={1.8} open />
      </>),
    },
    {
      cue: "13.ask",
      ...cam.push({ on: [0.9,1.18,80.15], dist: 2.5, to: 2.05, yaw: -14, pitch: 5, fov: 38 }),
      zone: "room",
      look: "overworld-day",
      note: "The friend gets a real question, not a lecture. Put the near shoulder at the edge so his worried face remains unobscured.",
      stage: (t, { p, dur }) => (<>
        <Friend position={room(0.9,0,0.15)} animation="talk" face="uneasy" time={t + 0.8} /><Hero position={room(-0.2,0,1.35)} rotationY={NORTH} animation="idle" face="uneasy" time={0.8} />
      </>),
    },
    {
      cue: "13.reply",
      ...cam.push({ on: [0.35,1.2,81.4], dist: 2.4, to: 1.95, yaw: 12, pitch: 4, fov: 38 }),
      zone: "room",
      look: "overworld-day",
      note: "The answer is small and personal: keep a bun for me. A modest smile, not a grand speech about courage.",
      stage: (t, { p, dur }) => (<>
        <Hero position={room(0.35,0,1.4)} animation="talk" face="smile" time={t + 0.8} />
      </>),
    },
    {
      cue: "13.stay",
      ...cam.push({ on: [0.9,1.18,80.15], dist: 2.25, to: 1.9, yaw: 4, pitch: 4, fov: 36 }),
      zone: "room",
      look: "overworld-day",
      note: "Match the friend close-up from the joke but take away his laugh. Keep just enough motion in the lens to feel the silence between them.",
      stage: (t, { p, dur }) => (<>
        <Friend position={room(0.9,0,0.15)} animation="idle" face="uneasy" time={0.8} gaze={0} />
      </>),
    },
  ],
});
