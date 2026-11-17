import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { DEG, Him, Lead, Llama, Llamas, NORTH, Player, Post, SOUTH, SPOT, Shop, Square, Sword, hop, posed, timing, tw, w } from "./kit";

/** 04 — A real customer. The sun is going down, and so is the stock. */
const STOP: Vec3 = [0.5, 0, 5.6];
const ARM = (t: number) => posed("idle", t, { armR: [-1.1, 0, -0.1] });

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "A customer",
  shots: [
    {
      cue: "4.player",
      ...cam.push({ on: [0.4, 1.15, 4.3], dist: 6.6, to: 6.0, yaw: 62, pitch: 5, fov: 46 }),
      zone: "town",
      look: "overworld-sunset",
      note: "Sunset. A player in an orange shirt walks up the road to the shop, and the trader jumps twice on the spot. On 'he had a sword' the sword comes up into the low sun.",
      stage: (t, { dur }) => {
        const k = tw(t, 0, dur * 0.7);
        const z = 9.2 - k * 3.6;
        return (
          <>
            <Square t={t} folk={2} />
            <Llamas t={t} look={[0.3, 0.1]} />
            <Shop />
            <Him cue="4.player" t={t} rotationY={SOUTH} face={62 * DEG} rise={hop(t, 0.5, 0.3, 0.3) + hop(t, 0.9, 0.3, 0.3)} />
            <Player position={[STOP[0], 0, z]} rotationY={NORTH} animation={k < 1 ? "walk" : "idle"} pose={k < 1 ? undefined : ARM(t)}>
              <Sword />
            </Player>
          </>
        );
      },
    },
    {
      cue: "4.looked",
      ...cam.push({ on: [STOP[0], 1.5, STOP[2]], dist: 2.5, to: 2.2, yaw: 168, pitch: 1, fov: 46 }),
      zone: "town",
      look: "overworld-sunset",
      note: "The player's face, from the shop's side. His eyes go to the shop: nothing. Then they go past it to the llamas, and he starts to grin.",
      stage: (t) => {
        const second = t > w("4.looked", "llamas") - 0.45;
        return (
          <>
            <Square t={t} folk={0} vendors={false} />
            <Player position={STOP} rotationY={NORTH} headYaw={second ? 0.3 : -0.4} face={second ? "grin" : "neutral"} pose={ARM(t)}>
              <Sword />
            </Player>
          </>
        );
      },
    },
    {
      cue: "4.took",
      ...cam.push({ on: [0.3, 1.1, 5.4], dist: 7.6, to: 7.2, yaw: 30, pitch: 17, fov: 46 }),
      zone: "town",
      look: "overworld-sunset",
      note: "He already has both leads in one hand and is walking off down the road, a llama on each side. The trader has not moved.",
      stage: (t) => {
        const z = 6.0 + t * 2.4;
        return (
          <>
            <Square t={t} folk={2} />
            <Post cut />
            <Shop />
            <Him cue="4.took" t={t} rotationY={SOUTH} face={30 * DEG} />
            <Player position={[0.4, 0, z]} rotationY={SOUTH} animation="walk" />
            <Llama position={[-0.7, 0, z - 1.3]} rotationY={SOUTH} walk={t * 2.4} t={t} />
            <Llama position={[1.5, 0, z - 1.6]} rotationY={SOUTH} walk={t * 2.4 + 1} coat="#9a7a56" t={t} />
            <Lead a={[0.15, 0.95, z]} b={[-0.7, 1.5, z - 0.85]} />
            <Lead a={[0.65, 0.95, z]} b={[1.5, 1.5, z - 1.15]} />
          </>
        );
      },
    },
    {
      cue: "4.pay",
      ...cam.push({ on: [0, 1.25, 3.0], dist: 2.9, to: 2.5, yaw: 12, pitch: 0, fov: 46 }),
      zone: "town",
      look: "overworld-sunset",
      note: "His face, close. He holds his sleeves out for the money and looks down into them. Nothing in them. On 'I think he forgot' his head tips to one side.",
      stage: (t) => (
        <>
          <Square t={t} folk={0} />
          <Post cut />
          <Him cue="4.pay" t={t} rotationY={SOUTH + 0.2} face={12 * DEG} strain={1} nod={0.5 * tw(t, 0.2, 0.5) * (1 - tw(t, w("4.pay", "forgot") - 0.4, w("4.pay", "forgot") - 0.2))} tilt={0.3 * tw(t, w("4.pay", "forgot") - 0.3, w("4.pay", "forgot"))} clockScale={0.5} />
        </>
      ),
    },
    {
      cue: "4.gone",
      ...cam.push({ on: [0.2, 1.2, 8.0], dist: 10.2, to: 9.6, yaw: 186, pitch: 15, fov: 46 }),
      zone: "town",
      look: "overworld-sunset",
      note: "Over his shoulder, down the road, into the sunset: the two llamas walking away behind the player, getting small. Neither head turns. He lifts one sleeve to wave. Nobody sees it.",
      stage: (t) => {
        const z = 7.6 + t * 1.6;
        return (
          <>
            <Square t={t} folk={0} vendors={false} />
            <Him cue="4.gone" t={t} rotationY={SOUTH} face={186 * DEG} strain={tw(t, 0.7, 1.1)} clockScale={0.5} />
            <Player position={[-0.6, 0, z]} rotationY={SOUTH} animation="walk" />
            <Llama position={[-1.6, 0, z - 1.3]} rotationY={SOUTH} walk={t * 1.6} t={t} />
            <Llama position={[0.4, 0, z - 1.6]} rotationY={SOUTH} walk={t * 1.6 + 1} coat="#9a7a56" t={t} />
            <Lead a={[-0.85, 0.95, z]} b={[-1.6, 1.5, z - 0.85]} />
            <Lead a={[-0.35, 0.95, z]} b={[0.4, 1.5, z - 1.15]} />
          </>
        );
      },
    },
  ],
});
void SPOT;
