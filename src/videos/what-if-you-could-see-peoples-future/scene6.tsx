import { cam, storyScene } from "../../engine";
import {
  Echo,
  EchoBoots,
  EchoCoat,
  Friend,
  GiftBox,
  GYM,
  Hero,
  NORTH,
  Ruby,
  SPOT,
  WorkshopBike,
  Wrench,
  ease,
  ramp,
  timing,
  wordAt,
} from "./kit";

const MAX = SPOT.seat(2, 2);
const RUBY = SPOT.seat(2, 1);
const FUTURE: [number, number, number] = [MAX[0] + 0.25, 0, MAX[2] - 0.62];
const BIGGER = wordAt("6.gift", "bigger");
const LOST = wordAt("6.lost", "lost");
const BOOTS = wordAt("6.chain", "boots");
const GYM_AT = GYM.at;
const BIKE: [number, number, number] = [GYM_AT[0] - 0.75, 0, GYM_AT[2] + 0.1];
const MAX_GYM: [number, number, number] = [GYM_AT[0] + 0.35, 0, GYM_AT[2] + 0.3];
const FUTURE_GYM: [number, number, number] = [MAX_GYM[0] + 0.5, 0, MAX_GYM[2] - 0.8];

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "Eleven No's and Bigger Gifts",
  shots: [
    {
      cue: "6.asked",
      ...cam.push({ on: SPOT.at(0.2, 1.15, 0.2), dist: 5.0, to: 4.45, yaw: -4, pitch: 8, fov: 44 }),
      zone: "class",
      note: "Max approaches Ruby with another present; the teller watches from the edge while the future remains behind his friend.",
      stage: () => (
        <>
          <Hero position={SPOT.seat(1, 2)} rotationY={NORTH} animation="sit" face="uneasy" />
          <Friend position={MAX} rotationY={NORTH} animation="walk" animDistance={0.35} face="grin" />
          <Ruby position={RUBY} rotationY={NORTH} animation="idle" face="calm" />
          <GiftBox position={[MAX[0] + 0.32, 0, MAX[2] + 0.25]} scale={0.42} color="#7393bd" />
          <Echo position={FUTURE} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.5} />
          <EchoCoat position={FUTURE} color="#59636b" opacity={0.9} ragged />
        </>
      ),
    },
    {
      cue: "6.no",
      ...cam.push({ on: [RUBY[0], 1.05, RUBY[2] + 0.05], dist: 4.0, to: 3.55, yaw: 8, pitch: 5, fov: 40 }),
      zone: "class",
      note: "Ruby gives one clear, calm no; Max stops in front of her, and nobody else speaks for her.",
      stage: (t) => (
        <>
          <Ruby position={RUBY} rotationY={0.04} animation="idle" face="calm" headYaw={0.18 * Math.sin(t * 7)} />
          <Friend position={MAX} rotationY={0.08} animation="idle" face="uneasy" headPitch={0.14} />
          <Hero position={[MAX[0] - 0.95, 0, MAX[2] + 0.25]} rotationY={0.12} animation="idle" face="uneasy" />
          <Echo position={FUTURE} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.5} />
          <EchoCoat position={FUTURE} color="#59636b" opacity={0.88} ragged />
        </>
      ),
    },
    {
      cue: "6.gift",
      ...cam.push({ on: [MAX[0] + 0.2, 1.0, MAX[2] + 0.05], dist: 4.4, to: 3.95, yaw: -5, pitch: 5, fov: 40 }),
      zone: "class",
      note: "The present grows on 'bigger' while Max reaches again; Ruby turns away, and the future loses another piece behind him.",
      stage: (t) => {
        const grows = ease(ramp(t, BIGGER - 0.12, BIGGER + 0.42));
        return (
          <>
            <Hero position={[MAX[0] - 0.95, 0, MAX[2] + 0.25]} rotationY={0.12} animation="idle" face="uneasy" />
            <Friend position={MAX} rotationY={0.12} animation="reach" arms="hold" face="grin" />
            <Ruby position={RUBY} rotationY={0.4} animation="idle" face="calm" />
            <GiftBox position={[MAX[0] + 0.42, 0, MAX[2] + 0.24]} scale={0.36 + 1.0 * grows} color="#c64e59" />
            <Echo position={FUTURE} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.52} />
            <EchoCoat position={FUTURE} color="#59636b" opacity={0.9} ragged />
        </>
        );
      },
    },
    {
      cue: "6.lost",
      ...cam.push({ on: [FUTURE[0], 0.95, FUTURE[2]], dist: 4.2, to: 3.75, yaw: 175, pitch: 8, fov: 40 }),
      zone: "class",
      note: "The coat thins as the next gift is bought; keep Max in the foreground so the loss belongs to him.",
      stage: (t) => {
        const fading = ease(ramp(t, LOST - 0.16, LOST + 0.32));
        return (
          <>
            <Friend position={MAX} rotationY={NORTH} animation="hold" face="uneasy" />
            <GiftBox position={[MAX[0] + 0.42, 0, MAX[2] + 0.24]} scale={1.2} color="#7393bd" />
            <Echo position={FUTURE} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.56} />
            <EchoCoat position={FUTURE} color="#59636b" opacity={0.9 - 0.45 * fading} ragged />
            <Hero position={[MAX[0] - 0.95, 0, MAX[2] + 0.25]} rotationY={0.12} animation="idle" face="uneasy" />
          </>
        );
      },
    },
    {
      cue: "6.chain",
      ...cam.push({ on: [GYM_AT[0] - 0.05, 0.78, GYM_AT[2] + 0.1], dist: 4.2, to: 3.7, yaw: -5, pitch: 13, fov: 40 }),
      zone: "gym",
      note: "Max repairs the teller's broken chain; the future's boots come back only while his wrench is working.",
      stage: (t) => {
        const remembered = ease(ramp(t, BOOTS - 0.14, BOOTS + 0.22));
        return (
          <>
            <Hero position={[BIKE[0] - 0.62, 0, BIKE[2] + 0.4]} rotationY={0.1} animation="idle" face="wow" />
            <Friend position={MAX_GYM} rotationY={0.1} animation="crouch" arms="reach" face="calm" />
            <WorkshopBike position={BIKE} rotationY={0.08} frameColor="#356fa0" chainBroken />
            <Wrench position={[BIKE[0] + 0.56, 0.52, BIKE[2] + 0.24]} rotationZ={-0.85} scale={0.7} />
            <Echo position={FUTURE_GYM} rotationY={NORTH} scale={1.0} color="#8fd0ff" opacity={0.55} />
            <EchoCoat position={FUTURE_GYM} color="#59636b" opacity={0.88} ragged />
            <EchoBoots position={FUTURE_GYM} color="#49372a" opacity={0.12 + 0.82 * remembered} />
          </>
        );
      },
    },
    {
      cue: "6.light",
      ...cam.push({ on: [GYM_AT[0] - 0.35, 1.12, GYM_AT[2] + 0.25], dist: 3.8, to: 3.35, yaw: -8, pitch: 3, fov: 38 }),
      zone: "gym",
      note: "The teller looks away from the boots and blames the light; the blue future stays in the corner of the frame.",
      stage: () => (
        <>
          <Hero position={[BIKE[0] - 0.62, 0, BIKE[2] + 0.4]} rotationY={0.3} animation="idle" face="calm" />
          <Friend position={MAX_GYM} rotationY={0.1} animation="crouch" arms="reach" face="calm" />
          <WorkshopBike position={BIKE} rotationY={0.08} frameColor="#356fa0" chainBroken={false} />
          <Echo position={FUTURE_GYM} rotationY={NORTH} scale={1.0} color="#8fd0ff" opacity={0.48} />
          <EchoCoat position={FUTURE_GYM} color="#59636b" opacity={0.82} ragged />
          <EchoBoots position={FUTURE_GYM} color="#49372a" opacity={0.52} />
        </>
      ),
    },
  ],
});
