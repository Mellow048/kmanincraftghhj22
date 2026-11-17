import { cam, storyScene } from "../../engine";
import {
  CoinStack,
  Echo,
  EchoBoots,
  EchoCoat,
  Friend,
  GYM,
  Hero,
  NORTH,
  PLACE,
  ToolBox,
  Wrench,
  WorkshopBike,
  ease,
  ramp,
  timing,
  wordAt,
} from "./kit";

const STOOD = wordAt("13.stood", "stood");
const KNEEL = wordAt("13.stood", "knelt");
const NEVER = wordAt("13.money", "never");
const WRENCH_WORD = wordAt("13.hand", "wrench");
const GYM_AT = GYM.at;
const SHOP_AT = PLACE.shop;
const MAX_AT: [number, number, number] = [SHOP_AT[0] + 0.4, 0, SHOP_AT[2] + 0.45];
const HERO_AT: [number, number, number] = [SHOP_AT[0] - 1.05, 0, SHOP_AT[2] + 0.5];
const FUTURE: [number, number, number] = [MAX_AT[0] + 0.3, 0, MAX_AT[2] - 0.95];
const BIKE: [number, number, number] = [SHOP_AT[0] - 0.9, 0, SHOP_AT[2] - 0.12];

export const scene13 = storyScene(timing, {
  id: "scene13",
  title: "The Wrench Was the Answer",
  shots: [
    {
      cue: "13.look",
      ...cam.push({ on: [GYM_AT[0] + 0.15, 0.9, GYM_AT[2] + 0.15], dist: 4.5, to: 4.0, yaw: -3, pitch: 3, fov: 40 }),
      zone: "gym",
      note: "Max looks at the broken chain while his friend leaves space for him to choose; the old future waits behind.",
      stage: () => (
        <>
          <Hero position={[GYM_AT[0] - 0.85, 0, GYM_AT[2] + 0.45]} rotationY={0.15} animation="crouch" face="calm" />
          <Friend position={[GYM_AT[0] + 0.5, 0, GYM_AT[2] + 0.35]} rotationY={0.05} animation="crouch" face="uneasy" headPitch={0.25} />
          <WorkshopBike position={[GYM_AT[0] - 0.25, 0, GYM_AT[2] - 0.12]} rotationY={0.05} chainBroken />
          <Echo position={[GYM_AT[0] + 0.88, 0, GYM_AT[2] - 0.65]} rotationY={NORTH} scale={0.96} color="#8fd0ff" opacity={0.56} lean={0.25} />
          <EchoCoat position={[GYM_AT[0] + 0.88, 0, GYM_AT[2] - 0.65]} color="#59636b" opacity={0.84} ragged />
        </>
      ),
    },
    {
      cue: "13.stood",
      ...cam.push({ on: [GYM_AT[0] + 0.2, 0.98, GYM_AT[2] + 0.05], dist: 5.2, to: 4.7, yaw: -4, pitch: 8, fov: 46 }),
      zone: "gym",
      note: "When Max kneels, the translucent man rises behind him; animate the height on the spoken word, not the cut.",
      stage: (t) => {
        const rises = ease(ramp(t, STOOD - 0.32, STOOD + 0.12));
        const kneels = ease(ramp(t, KNEEL - 0.1, KNEEL + 0.18));
        return (
          <>
            <Friend position={[GYM_AT[0] + 0.35, 0, GYM_AT[2] + 0.48]} rotationY={0.12} animation={kneels > 0.5 ? "crouch" : "idle"} arms="reach" face="calm" />
            <WorkshopBike position={[GYM_AT[0] - 0.3, 0, GYM_AT[2] - 0.15]} chainBroken />
            <Wrench position={[GYM_AT[0] - 0.45, 0.12, GYM_AT[2] + 0.32]} rotationZ={-0.8} scale={0.72} />
            <Echo position={[GYM_AT[0] + 0.78, 0, GYM_AT[2] - 0.72]} rotationY={NORTH} scale={0.74 + 0.29 * rises} color="#8fd0ff" opacity={0.62} lean={0.42 * (1 - rises)} />
            <EchoCoat position={[GYM_AT[0] + 0.78, 0, GYM_AT[2] - 0.72]} color="#59636b" opacity={0.82} ragged />
          </>
        );
      },
    },
    {
      cue: "13.coat",
      ...cam.push({ on: [SHOP_AT[0], 1.15, SHOP_AT[2] + 0.1], dist: 5.0, to: 4.45, yaw: 0, pitch: 3, fov: 42 }),
      zone: "shop",
      note: "The future now stands in boots and a clean coat inside the shop; hold on the changed silhouette, not on cash.",
      stage: () => (
        <>
          <Friend position={MAX_AT} rotationY={0.05} animation="idle" face="wow" />
          <Echo position={FUTURE} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.72} />
          <EchoCoat position={FUTURE} color="#38634d" opacity={0.96} ragged={false} />
          <EchoBoots position={FUTURE} color="#49372a" opacity={0.96} />
          <WorkshopBike position={BIKE} frameColor="#357f75" />
        </>
      ),
    },
    {
      cue: "13.shop",
      ...cam.push({ on: [SHOP_AT[0], 1.85, SHOP_AT[2] + 0.7], dist: 5.8, to: 5.1, yaw: -2, pitch: 1, fov: 46 }),
      zone: "shop",
      note: "The name MAX is already built over the open workshop door, with a repaired bike underneath it.",
      stage: () => (
        <>
          <Friend position={MAX_AT} rotationY={0.05} animation="idle" face="smile" />
          <Echo position={FUTURE} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.72} />
          <EchoCoat position={FUTURE} color="#38634d" opacity={0.96} ragged={false} />
          <EchoBoots position={FUTURE} color="#49372a" opacity={0.96} />
          <WorkshopBike position={[SHOP_AT[0] - 1.0, 0, SHOP_AT[2] + 0.25]} frameColor="#357f75" />
        </>
      ),
    },
    {
      cue: "13.money",
      ...cam.push({ on: [SHOP_AT[0] + 0.45, 1.0, SHOP_AT[2] - 0.25], dist: 3.8, to: 3.3, yaw: -4, pitch: 2, fov: 36 }),
      zone: "shop",
      note: "Coins rest on the workbench, but the repaired bike and wrench remain in the sharp foreground.",
      stage: (t) => {
        const moneyLeaves = ease(ramp(t, NEVER - 0.12, NEVER + 0.18));
        return (
          <>
            <CoinStack position={[SHOP_AT[0] + 1.0, 0.62, SHOP_AT[2] - 0.55]} count={9} scale={1 - 0.75 * moneyLeaves} />
            <WorkshopBike position={BIKE} frameColor="#357f75" />
            <Wrench position={[SHOP_AT[0] - 0.05, 0.63, SHOP_AT[2] - 0.48]} rotationZ={-0.8} scale={0.9} />
            <Friend position={MAX_AT} rotationY={0.1} animation="idle" face="uneasy" />
            <Echo position={FUTURE} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.72} />
            <EchoCoat position={FUTURE} color="#38634d" opacity={0.96} ragged={false} />
            <EchoBoots position={FUTURE} color="#49372a" opacity={0.96} />
          </>
        );
      },
    },
    {
      cue: "13.sold",
      ...cam.push({ on: [SHOP_AT[0] - 0.35, 0.95, SHOP_AT[2] + 0.1], dist: 4.1, to: 3.65, yaw: 4, pitch: 3, fov: 38 }),
      zone: "shop",
      note: "An empty toolbox sits beside the work: the things Max sold are gone, but the hands that repair the bike remain.",
      stage: () => (
        <>
          <ToolBox position={[SHOP_AT[0] - 1.7, 0, SHOP_AT[2] + 0.42]} scale={0.8} />
          <Friend position={MAX_AT} rotationY={0.05} animation="reach" arms="reach" face="calm" />
          <WorkshopBike position={BIKE} frameColor="#357f75" chainBroken />
          <Wrench position={[BIKE[0] + 0.7, 0, BIKE[2] + 0.2]} rotationZ={-0.8} scale={0.78} />
          <Echo position={FUTURE} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.72} />
          <EchoCoat position={FUTURE} color="#38634d" opacity={0.96} ragged={false} />
          <EchoBoots position={FUTURE} color="#49372a" opacity={0.96} />
        </>
      ),
    },
    {
      cue: "13.hand",
      ...cam.push({ on: [SHOP_AT[0] + 0.05, 1.1, SHOP_AT[2] + 0.2], dist: 3.8, to: 3.3, yaw: 0, pitch: 1, fov: 36 }),
      zone: "shop",
      note: "Max's hand brings the wrench to the chain; the repaired future stands behind him in boots and the same clean coat.",
      stage: (t) => {
        const repairs = ease(ramp(t, WRENCH_WORD - 0.12, WRENCH_WORD + 0.24));
        return (
          <>
            <Friend position={MAX_AT} rotationY={0.05} animation="crouch" arms="reach" face="calm" />
            <Hero position={[MAX_AT[0] - 0.78, 0, MAX_AT[2] + 0.1]} rotationY={0.08} animation="reach" face="smile" />
            <WorkshopBike position={BIKE} frameColor="#357f75" chainBroken={repairs < 0.5} />
            <Wrench position={[BIKE[0] + 0.62, 0.45, BIKE[2] + 0.22]} rotationZ={-0.95} scale={0.72 + 0.16 * repairs} />
            <Echo position={FUTURE} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.72} />
            <EchoCoat position={FUTURE} color="#38634d" opacity={0.96} ragged={false} />
            <EchoBoots position={FUTURE} color="#49372a" opacity={0.96} />
          </>
        );
      },
    },
  ],
});
