import { cam, storyScene } from "../../engine";
import {
  AstronautEcho,
  CoinStack,
  Echo,
  EchoBoots,
  EchoCoat,
  Friend,
  Hero,
  NORTH,
  PLACE,
  Ruby,
  SubscribeSign,
  WorkshopBike,
  Wrench,
  ease,
  ramp,
  timing,
  wordAt,
} from "./kit";

const SHOP = PLACE.shop;
const RUBY: [number, number, number] = [SHOP[0] + 1.15, 0, SHOP[2] + 0.45];
const HERO: [number, number, number] = [SHOP[0] - 0.9, 0, SHOP[2] + 0.2];
const MAX: [number, number, number] = [SHOP[0] + 0.55, 0, SHOP[2] + 0.1];
const FUTURE: [number, number, number] = [MAX[0] + 0.28, 0, MAX[2] - 0.92];
const NINE = wordAt("14.nine", "nine");
const PRICE = wordAt("14.price", "price");
const SUB = wordAt("14.sub", "subscribe");
const COINS: [number, number, number] = [MAX[0] + 0.12, 0.12, MAX[2] + 0.22];

export const scene14 = storyScene(timing, {
  id: "scene14",
  title: "A Week Later",
  shots: [
    {
      cue: "14.nine",
      ...cam.push({ on: [SHOP[0] - 0.05, 1.4, SHOP[2] + 0.15], dist: 6.0, to: 5.3, yaw: -1, pitch: 5, fov: 46 }),
      zone: "shop",
      note: "The small workshop is real: finished bicycles, a clean coat and boots behind Max, and his own bike returned.",
      stage: (t) => {
        const gains = ease(ramp(t, NINE - 0.18, NINE + 0.35));
        return (
          <>
            <Hero position={[HERO[0], 0, HERO[2] + 0.1]} rotationY={0.08} animation="idle" face="grin" />
            <Friend position={MAX} rotationY={0.25} animation="hold" arms="hold" face="smile" />
            <Echo position={FUTURE} rotationY={NORTH} scale={1.02} color="#8fd0ff" opacity={0.6} lean={0.25 * (1 - gains)} />
            <EchoCoat position={FUTURE} color="#364238" opacity={0.86} ragged={false} />
            <EchoBoots position={FUTURE} color="#49372a" opacity={0.88} />
            <WorkshopBike position={[SHOP[0] - 0.45, 0, SHOP[2] - 0.55]} frameColor="#a36d91" />
            <WorkshopBike position={[SHOP[0] + 0.62, 0, SHOP[2] - 0.58]} frameColor="#4d9991" />
            <WorkshopBike position={[SHOP[0] + 1.65, 0, SHOP[2] - 0.52]} frameColor="#d89453" />
            <CoinStack position={[COINS[0] - gains * 0.2, COINS[1], COINS[2]]} count={Math.round(1 + 5 * gains)} />
          </>
        );
      },
    },
    {
      cue: "14.ruby",
      ...cam.push({ on: [RUBY[0] - 0.1, 1.25, RUBY[2] + 0.55], dist: 4.7, to: 4.15, yaw: 0, pitch: 2, fov: 42 }),
      zone: "shop",
      note: "Ruby wheels her bike into Max's workshop; her astronaut future is offset to her shoulder so both Ruby and the suit read clearly.",
      stage: (t) => {
        const approach = Math.min(0.55, t * 0.45);
        return (
          <>
            <Hero position={HERO} rotationY={0.15} animation="idle" face="calm" />
            <Friend position={MAX} rotationY={0.2} animation="idle" face="calm" />
            <Ruby position={[RUBY[0] - approach, 0, RUBY[2]]} rotationY={0.05} animation="walk" animDistance={Math.min(0.8, t * 0.8)} face="calm" />
            <AstronautEcho position={[RUBY[0] + 0.5 - approach, 0, RUBY[2] - 0.9]} rotationY={NORTH} scale={1.0} opacity={0.58} />
            <WorkshopBike position={[RUBY[0] + 0.16 - approach, 0, RUBY[2] - 0.35]} frameColor="#a36d91" />
          </>
        );
      },
    },
    {
      cue: "14.price",
      ...cam.push({ on: [SHOP[0] + 0.72, 1.12, SHOP[2] + 0.18], dist: 4.8, to: 4.3, yaw: -3, pitch: 4, fov: 44 }),
      zone: "shop",
      note: "Max charges the full price for Ruby's bike like any other customer; his healthy future stands quietly behind him.",
      stage: (t) => {
        const repaired = ease(ramp(t, PRICE - 0.12, PRICE + 0.22));
        return (
          <>
            <Friend position={MAX} rotationY={0.25} animation="idle" arms="hold" face="calm" />
            <Ruby position={RUBY} rotationY={-0.15} animation="idle" arms="hold" face="calm" />
            <Echo position={FUTURE} rotationY={NORTH} scale={1.02} color="#8fd0ff" opacity={0.6} />
            <EchoCoat position={FUTURE} color="#364238" opacity={0.86} />
            <EchoBoots position={FUTURE} color="#49372a" opacity={0.88} />
            <WorkshopBike position={[RUBY[0] + 0.05, 0, RUBY[2] - 0.48]} rotationY={0.08} frameColor="#a36d91" chainBroken={!repaired} />
            <Wrench position={[MAX[0] + 0.48, 0.42, MAX[2] + 0.28]} rotationZ={-0.8} scale={0.68} />
            <CoinStack position={[MAX[0] + 0.3, 0.66, MAX[2] + 0.18]} count={5} />
          </>
        );
      },
    },
    {
      cue: "14.sub",
      ...cam.push({ on: [SHOP[0] + 0.02, 1.35, SHOP[2] + 0.12], dist: 6.3, to: 5.6, yaw: 0, pitch: 4, fov: 46 }),
      zone: "shop",
      note: "The teller faces the lens beside the fully readable red sign; Max's repaired future stands clearly behind him.",
      stage: (t) => {
        const shine = ease(ramp(t, SUB - 0.1, SUB + 0.28));
        return (
          <>
            <Hero position={HERO} rotationY={0.12} animation="idle" face="grin" />
            <Friend position={MAX} rotationY={0.25} animation="idle" arms="reach" face="smile" />
            <Echo position={FUTURE} rotationY={NORTH} scale={1.02} color="#8fd0ff" opacity={0.6} />
            <EchoCoat position={FUTURE} color="#364238" opacity={0.86} />
            <EchoBoots position={FUTURE} color="#49372a" opacity={0.88} />
            <SubscribeSign position={[SHOP[0] - 0.02, 2.08, SHOP[2] - 0.62]} rotationY={0} scale={0.82} tilt={0.02 * shine} />
          </>
        );
      },
    },
  ],
});
