import { cam, storyScene } from "../../engine";
import {
  Classmate,
  Cup,
  Echo,
  Friend,
  GoldNecklace,
  Hero,
  LUNCH,
  NORTH,
  Overhead,
  Ruby,
  WorkshopBike,
  ease,
  ramp,
  timing,
  wordAt,
} from "./kit";

const BASE = LUNCH.at;
const MAX: [number, number, number] = [BASE[0] + 0.22, 0, BASE[2] + 0.28];
const TELLER: [number, number, number] = [BASE[0] - 0.95, 0, BASE[2] + 0.36];
const RUBY_POS: [number, number, number] = [BASE[0] + 1.55, 0, BASE[2] - 0.15];
const FUTURE: [number, number, number] = [MAX[0] + 0.62, 0, MAX[2] - 0.85];
const SOLD = wordAt("10.bike", "sold");
const TABLE = wordAt("10.table", "table");

export const scene10 = storyScene(timing, {
  id: "scene10",
  title: "The Bike, The Necklace, The Table",
  shots: [
    {
      cue: "10.bike",
      ...cam.push({ on: [BASE[0], 1.0, BASE[2] + 0.05], dist: 4.9, to: 4.4, yaw: -4, pitch: 3, fov: 42 }),
      zone: "lunch",
      note: "The bike is left behind as Max puts the gold necklace first; his future has already fallen to the floor behind him.",
      stage: (t) => {
        const sold = ease(ramp(t, SOLD - 0.15, SOLD + 0.3));
        return (
          <>
            <Hero position={TELLER} rotationY={0.1} animation="idle" face="uneasy" />
            <Friend position={MAX} rotationY={0.05} animation="reach" arms="hold" face="grin" />
            <WorkshopBike position={[BASE[0] - 0.92, 0, BASE[2] + 0.15]} rotationY={0.1} frameColor="#356fa0" />
            <GoldNecklace position={[MAX[0] + 0.52, 0.98, MAX[2] + 0.16]} scale={0.9 + 0.18 * sold} />
            <Echo position={FUTURE} rotationY={NORTH} scale={0.95} color="#8fd0ff" opacity={0.48 + 0.16 * sold} lean={0.28} />
            <Cup position={[FUTURE[0], 0, FUTURE[2] + 0.24]} />
          </>
        );
      },
    },
    {
      cue: "10.lunch",
      ...cam.push({ on: [BASE[0] + 0.25, 1.08, BASE[2]], dist: 4.8, to: 4.25, yaw: 4, pitch: 3, fov: 40 }),
      zone: "lunch",
      note: "Max lines himself up in front of everyone, and Ruby is already visible across the table before he asks.",
      stage: () => (
        <>
          <Hero position={TELLER} rotationY={0.12} animation="idle" face="uneasy" />
          <Friend position={[MAX[0] + 0.08, 0.55, MAX[2] + 0.12]} rotationY={0.05} animation="idle" arms="hold" face="grin" />
          <Ruby position={RUBY_POS} rotationY={0.2} animation="idle" face="calm" />
          <Classmate who={2} position={[BASE[0] - 0.48, 0, BASE[2] - 0.65]} rotationY={0} animation="sit" face="calm" />
          <Classmate who={5} position={[BASE[0] + 0.55, 0, BASE[2] - 0.62]} rotationY={0} animation="sit" face="calm" />
          <WorkshopBike position={[BASE[0] - 0.96, 0, BASE[2] + 0.22]} rotationY={0.1} frameColor="#356fa0" />
          <GoldNecklace position={[MAX[0] + 0.3, 1.0, MAX[2] + 0.28]} />
        </>
      ),
    },
    {
      cue: "10.cup",
      ...cam.push({ on: [BASE[0] + 0.55, 0.8, BASE[2] - 0.08], dist: 3.9, to: 3.4, yaw: -3, pitch: 2, fov: 38 }),
      zone: "lunch",
      note: "The future sits on the lunchroom floor with a cup, not beside the necklace; keep the gold up in Max's hand.",
      stage: () => (
        <>
          <Friend position={MAX} rotationY={0.12} animation="hold" face="uneasy" />
          <GoldNecklace position={[MAX[0] + 0.4, 1.0, MAX[2] + 0.18]} />
          <Echo position={FUTURE} rotationY={NORTH} scale={0.9} color="#8fd0ff" opacity={0.7} lean={0.7} reach={0.15} />
          <Cup position={[FUTURE[0], 0, FUTURE[2] + 0.23]} />
          <Hero position={TELLER} rotationY={0.12} animation="idle" face="uneasy" />
        </>
      ),
    },
    {
      cue: "10.lucky",
      ...cam.push({ on: [BASE[0] + 0.34, 1.1, BASE[2] + 0.08], dist: 4.3, to: 3.9, yaw: 0, pitch: 3, fov: 40 }),
      zone: "lunch",
      note: "A small gold thirteen hangs over Max as he calls the number lucky; the Echo stays low, still holding the cup.",
      stage: () => (
        <>
          <Hero position={TELLER} rotationY={0.1} animation="idle" face="uneasy" />
          <Friend position={MAX} rotationY={0.05} animation="point" arms="hold" face="grin" />
          <Overhead over={MAX} text="13" t={0.4} size={0.42} color="#e8bb45" />
          <GoldNecklace position={[MAX[0] + 0.45, 1.0, MAX[2] + 0.16]} />
          <Echo position={FUTURE} rotationY={NORTH} scale={0.9} color="#8fd0ff" opacity={0.66} lean={0.7} />
          <Cup position={[FUTURE[0], 0, FUTURE[2] + 0.23]} />
        </>
      ),
    },
    {
      cue: "10.table",
      ...cam.push({ on: [BASE[0] + 0.35, 1.35, BASE[2] + 0.12], dist: 4.5, to: 4.0, yaw: 2, pitch: 1, fov: 40 }),
      zone: "lunch",
      note: "Max climbs onto the lunch table to hold up the necklace; Ruby faces him from the floor, not the crowd.",
      stage: (t) => {
        const rise = ease(ramp(t, TABLE - 0.18, TABLE + 0.28));
        return (
          <>
            <Hero position={TELLER} rotationY={0.12} animation="idle" face="uneasy" />
            <Friend position={[MAX[0], 0.42 + 0.28 * rise, MAX[2] + 0.12]} rotationY={0.05} animation="cheer" arms="hold" face="grin" />
            <Ruby position={RUBY_POS} rotationY={0.18} animation="idle" face="uneasy" />
            <GoldNecklace position={[MAX[0] + 0.46, 1.3 + 0.26 * rise, MAX[2] + 0.2]} />
            <Echo position={FUTURE} rotationY={NORTH} scale={0.92} color="#8fd0ff" opacity={0.65} lean={0.7} />
            <Cup position={[FUTURE[0], 0, FUTURE[2] + 0.23]} />
          </>
        );
      },
    },
  ],
});
