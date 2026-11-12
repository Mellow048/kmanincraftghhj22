import { Vox, cam, storyScene } from "../../engine";
import { CarryBun, Hero, NightTorch, PackedBag, room, timing } from "./kit";
/** Beat 12: One more bun. The recorded words, not hand-set seconds, own every cut. */
export const scene12 = storyScene(timing, {
  id: "scene12",
  title: "One more bun",
  shots: [
    {
      cue: "12.pack",
      ...cam.top({ on: [0.6,0.3,80.5], height: 3.7, to: 3.2, spin: [-3,5], fov: 44 }),
      zone: "room",
      look: "overworld-night",
      note: "One moving overhead shot: water, torch, rope and bread land on their spoken words. The extra bun, wrapped in clean cloth, is the last and most deliberate addition.",
      stage: (t, { p, dur }) => (<>
        <PackedBag t={t} /><Hero position={room(-0.25,0,1.15)} rotationY={-0.8} animation="crouch" face="brave" time={t + 0.8} /><NightTorch />
      </>),
    },
    {
      cue: "12.neighbor",
      ...cam.push({ on: [0.6,1.12,81.2], dist: 2.6, to: 2.15, yaw: 8, pitch: 8, fov: 38 }),
      zone: "room",
      look: "overworld-night",
      note: "His face sits above the bun and its clean cloth. Do not bring the neighbor back into the room: this is the teller remembering a kindness.",
      stage: (t, { p, dur }) => (<>
        <CarryBun position={room(0.6,0,1.2)} t={t + 0.8} face="uneasy" /><Vox kind="wool" tint="#f2e6cf" position={room(0.6,0.61,1.54)} size={[0.4,0.025,0.34]} /><NightTorch />
      </>),
    },
  ],
});
