import { cam, storyScene } from "../../engine";
import {
  BikeRack,
  Echo,
  EchoBoots,
  Friend,
  GYM,
  Hero,
  NORTH,
  ToolBox,
  Wrench,
  WorkshopBike,
  ease,
  ramp,
  timing,
  wordAt,
} from "./kit";

const BOOTS = wordAt("12.boots", "boots");
const CHAIN = wordAt("12.chain", "chain");
const BASE = GYM.at;
const MAX_POS: [number, number, number] = [BASE[0] + 0.35, 0, BASE[2] + 0.28];
const TELLER: [number, number, number] = [BASE[0] - 0.78, 0, BASE[2] + 0.42];
const FUTURE: [number, number, number] = [MAX_POS[0] + 0.48, 0, MAX_POS[2] - 0.82];
const BIKE_POS: [number, number, number] = [BASE[0] - 0.9, 0, BASE[2] - 0.28];

export const scene12 = storyScene(timing, {
  id: "scene12",
  title: "The Empty Rack, The Chain, The Boots",
  shots: [
    {
      cue: "12.rack",
      ...cam.push({ on: [BASE[0], 0.92, BASE[2] + 0.1], dist: 4.8, to: 4.3, yaw: 0, pitch: 3, fov: 42 }),
      zone: "gym",
      note: "The rack is empty and Max has sat where his bike was; the teller arrives from the far end of the frame.",
      stage: () => (
        <>
          <BikeRack position={[BASE[0] + 0.55, 0, BASE[2] - 0.55]} />
          <Friend position={MAX_POS} rotationY={0} animation="sit" face="uneasy" headPitch={0.25} />
          <Hero position={TELLER} rotationY={0.1} animation="walk" animDistance={0.6} face="uneasy" />
          <Echo position={FUTURE} rotationY={NORTH} scale={0.9} color="#8fd0ff" opacity={0.58} lean={0.35} />
          <ToolBox position={[BASE[0] + 1.25, 0, BASE[2] - 0.55]} scale={0.86} />
        </>
      ),
    },
    {
      cue: "12.same",
      ...cam.push({ on: [BASE[0] + 0.45, 0.86, BASE[2] + 0.1], dist: 4.5, to: 4.0, yaw: -5, pitch: 2, fov: 40 }),
      zone: "gym",
      note: "Max and his future sit shoulder to shoulder at the same height in the frame; let the empty rack stay behind them.",
      stage: () => (
        <>
          <BikeRack position={[BASE[0] + 0.55, 0, BASE[2] - 0.55]} />
          <Friend position={MAX_POS} rotationY={0.05} animation="sit" face="uneasy" headPitch={0.2} />
          <Echo position={[MAX_POS[0] + 0.62, 0, MAX_POS[2] - 0.42]} rotationY={NORTH} scale={0.82} color="#8fd0ff" opacity={0.62} lean={0.45} />
          <Hero position={TELLER} rotationY={0.1} animation="idle" face="uneasy" />
        </>
      ),
    },
    {
      cue: "12.boots",
      ...cam.push({ on: [BASE[0] + 0.35, 0.62, BASE[2] - 0.1], dist: 3.6, to: 3.1, yaw: -7, pitch: 1, fov: 36 }),
      zone: "gym",
      note: "The boots return in the low foreground as the teller remembers the one time the future had them.",
      stage: (t) => {
        const remembered = ease(ramp(t, BOOTS - 0.12, BOOTS + 0.18));
        return (
          <>
            <Friend position={MAX_POS} rotationY={0.1} animation="sit" face="uneasy" />
            <Echo position={FUTURE} rotationY={NORTH} scale={0.9} color="#8fd0ff" opacity={0.58} />
            <EchoBoots position={[FUTURE[0], 0, FUTURE[2]]} color="#49372a" opacity={0.28 + 0.67 * remembered} />
            <Hero position={TELLER} rotationY={0.2} animation="crouch" face="wow" headPitch={-0.25 * remembered} />
          </>
        );
      },
    },
    {
      cue: "12.chain",
      ...cam.push({ on: [BASE[0] - 0.15, 0.95, BASE[2] + 0.05], dist: 4.5, to: 4.0, yaw: 4, pitch: 3, fov: 40 }),
      zone: "gym",
      note: "The teller wheels in his own broken bicycle and lays the wrench beside Max; the offer is a thing to fix, not money.",
      stage: (t) => {
        const offer = ease(ramp(t, CHAIN - 0.12, CHAIN + 0.45));
        return (
          <>
            <Hero position={[TELLER[0] + 0.58 * offer, 0, TELLER[2] - 0.12 * offer]} rotationY={0.1} animation="walk" animDistance={0.55 * offer} arms="hold" face="calm" />
            <Friend position={MAX_POS} rotationY={-0.22} animation="reach" arms="reach" face="uneasy" />
            <WorkshopBike position={BIKE_POS} rotationY={-0.12} chainBroken />
            <Wrench position={[BIKE_POS[0] + 0.65, 0, BIKE_POS[2] + 0.24]} rotationY={0.2} rotationZ={-0.8} scale={0.78} />
            <Echo position={FUTURE} rotationY={NORTH} scale={0.92} color="#8fd0ff" opacity={0.54 + 0.12 * offer} />
            <EchoBoots position={FUTURE} color="#49372a" opacity={0.78} />
          </>
        );
      },
    },
  ],
});
