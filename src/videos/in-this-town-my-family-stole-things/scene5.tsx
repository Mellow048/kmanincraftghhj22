import { Block, cam, storyScene } from "../../engine";
import { Berries, Dad, den, PLACE, RedFlower, SillCup, Sister, Sword, Teller, ease, ramp, timing, wordAt } from "./kit";

const GOT = wordAt("11.given", "got");
const TRADE = wordAt("12.trade", "paying");
const SECOND = wordAt("12.second", "second");

/** The pile: everything the family ever took, with one berry under each thing. */
const Pile: React.FC<{ reveal?: number }> = ({ reveal = 0 }) => (
  <group>
    <Sword position={den(-2.6, 0.02, -1.2)} scale={0.8} rotation={[0, 0, 1.5]} />
    <Block position={den(-1.7, 0.35, -1.0)} size={[0.5, 0.5, 0.5]} color="#8a3b2a" />
    <RedFlower position={den(-0.8, 0.1, -0.7)} scale={0.9} rotation={[0, 0, 1.4]} wilt={0.6} />
    <Block position={den(0.2, 0.25, -1.1)} size={[0.7, 0.5, 0.4]} color="#7a6a4a" />
    <Block position={den(1.2, 0.18, -0.9)} size={[0.5, 0.36, 0.5]} color="#c9a15a" />
    {[
      [-2.6, -1.2],
      [-1.7, -1.0],
      [-0.8, -0.7],
      [0.2, -1.1],
      [1.2, -0.9],
    ].map(([x, z], i) => (
      <group key={i} visible={reveal > i / 5}>
        <Berries position={den(x + 0.24, 0.01, z + 0.52)} scale={1.3} count={1} />
      </group>
    ))}
  </group>
);

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "He was trading",
  shots: [
    {
      cue: "10.next",
      ...cam.orbit({ on: [-8.78, 1.55, -4.65], dist: 3.4, distTo: 2.15, yaw: -22, yawTo: 20, pitch: 10, fov: 38, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-sunset",
      note: "Next night: berry pile on sill grows steadily larger beside untouched wilted flower.",
      stage: (t) => {
        const pile = ease(ramp(t, 0, 1.2));
        return (
          <>
            <Berries position={[PLACE.sill[0] - 0.1, PLACE.sill[1] + 0.04, PLACE.sill[2] + 0.1]} scale={1.25 + pile * 0.2} count={Math.max(4, Math.round(6 + pile * 8))} t={t} />
            <RedFlower position={[PLACE.sill[0] + 0.55, PLACE.sill[1] + 0.08, PLACE.sill[2] + 0.32]} scale={0.8} rotation={[0, 0, 2.7]} wilt={0.8} />
          </>
        );
      },
    },
    {
      cue: "10.told",
      ...cam.ots({ speaker: [-10.2, 0.68, 0.5], listener: [-11.1, 0.68, 0.9], back: 1.85, push: 0.78 }),
      zone: "street",
      look: "overworld-sunset",
      note: "OTS onto calm Sister stepping in closer saying He is waiting as Teller turns sharply.",
      stage: (t) => {
        const lean = ease(ramp(t, 0, 1.1));
        return (
          <>
            <Teller position={[-10.2, 0, 0.5]} rotationY={-0.52 - lean * 0.2} animation="lookAround" face="uneasy" tailUp={0.2} time={t} />
            <Sister position={[-11.1 + lean * 0.25, 0, 0.85]} rotationY={-0.8} animation="talk" animDistance={lean * 0.3} face="calm" time={t * 1.3} tailUp={0.45} headPitch={0.04} />
          </>
        );
      },
    },
    {
      cue: "11.corner",
      ...cam.crane({ on: [1.5, 0.65, 60.4], onTo: [-0.2, 0.95, 59.4], dist: 5.4, toDist: 3.9, yaw: 24, fromPitch: 4, toPitch: 18, fov: 44, screenOffset: [0, 0.08] }),
      zone: "den",
      look: "overworld-sunset",
      note: "Teller creeps inside root den peeking behind hoard pile as hidden berries glint underneath.",
      stage: (t) => {
        const creep = ease(ramp(t, 0, 1.4));
        return (
          <>
            <Pile reveal={0.2 + creep * 0.8} />
            <Teller position={den(2.4 - creep * 0.65, 0, 0.7 - creep * 0.35)} rotationY={-0.85} animation="creep" animDistance={creep * 0.8} face="wow" lookAt={den(0, 0.3, -1)} tailUp={0.25} time={t} />
          </>
        );
      },
    },
    {
      cue: "11.count",
      ...cam.truck({ on: [-2.35, 0.22, 58.85], by: [3.6, 0, 0.05], dist: 2.9, yaw: 0, pitch: 18, fov: 46, screenOffset: [0, 0.14] }),
      zone: "den",
      look: "overworld-sunset",
      note: "Low linear track along hoard floor as one bright berry illuminates beneath each stolen treasure.",
      stage: (t) => <Pile reveal={Math.min(1, Math.max(0.05, t / 1.5))} />,
    },
    {
      cue: "11.every",
      ...cam.push({ on: [0.9, 0.12, 60.35], dist: 1.55, to: 0.75, yaw: 14, pitch: 38, fov: 36, screenOffset: [0, 0.06] }),
      zone: "den",
      look: "overworld-sunset",
      note: "Macro push onto single berry beside Teller's sniffing paw resting on dirt floor.",
      stage: (t) => {
        const sniff = ease(ramp(t, 0, 1.1));
        return (
          <>
            <Berries position={den(0.9, 0.03, 0.35)} scale={1.5 + sniff * 0.12} count={1} t={t} />
            <Teller position={den(1.65 - sniff * 0.25, 0, 0.55)} rotationY={-1.2} animation="leanOver" face="wow" time={t} tailUp={0.2} />
          </>
        );
      },
    },
    {
      cue: "11.gift",
      ...cam.orbit({ on: [1.9, 0.68, 60.4], dist: 3.4, distTo: 2.15, yaw: -22, yawTo: 28, pitch: 6, fov: 40, screenOffset: [0, 0.08] }),
      zone: "den",
      look: "overworld-sunset",
      note: "Orbit sweeps round Teller's wide eyes as realization hits inside dark root den.",
      stage: (t) => {
        const turn = ease(ramp(t, 0, 1.2));
        return <Teller position={den(1.9, 0, 0.4)} rotationY={0.18 + turn * 0.45} animation="lookAround" face={t > GOT * 0.5 ? "wow" : "calm"} tailUp={0.35 + turn * 0.25} time={t} headPitch={0.12} />;
      },
    },
    {
      cue: "11.given",
      ...cam.dollyZoom({ on: [1.9, 0.72, 60.4], dist: 3.4, to: 2.0, yaw: -16, pitch: 4, fov: 36, screenOffset: [0, 0.08] }),
      zone: "den",
      look: "overworld-sunset",
      note: "Dolly-zoom realization onto Teller stepping back stunned on Given.",
      stage: (t) => {
        const gasp = ease(ramp(t, Math.max(0.05, GOT * 0.45), GOT * 0.85 + 0.35));
        return (
          <Teller position={den(1.9 + gasp * 0.2, 0, 0.4 + gasp * 0.15)} rotationY={-0.25} animation={gasp > 0.3 ? "scared" : "idle"} face={t > GOT * 0.55 ? "wow" : "calm"} tailUp={0.35} time={t} headPitch={0.05} />
        );
      },
    },
    {
      cue: "12.none",
      ...cam.orbit({ on: [-0.7, 0.45, 59.3], dist: 5.5, distTo: 3.9, yaw: -26, yawTo: 18, pitch: 12, fov: 44, screenOffset: [0, 0.08] }),
      zone: "den",
      look: "overworld-sunset",
      note: "Wide orbit sweeps back over full revealed hoard while Teller steps forward trembling.",
      stage: (t) => {
        const step = ease(ramp(t, 0, 1.2));
        return (
          <>
            <Pile reveal={1} />
            <Teller position={den(1.8 - step * 0.45, 0, 0.2)} rotationY={-0.9} animation="shrug" animDistance={step * 0.4} face="ouch" time={t} />
          </>
        );
      },
    },
    {
      cue: "12.trade",
      ...cam.push({ on: [-3.2, 0.68, 59.8], dist: 5.4, to: 3.75, yaw: 18, pitch: 10, fov: 44, screenOffset: [0, 0.08] }),
      zone: "den",
      look: "overworld-sunset",
      note: "Push across whole sleeping fox family beside counted berry hoard as Teller paces slowly behind.",
      stage: (t) => {
        const walk = ease(ramp(t, 0, 1.3));
        return (
          <>
            <Pile reveal={1} />
            <Dad position={den(-3.4, 0, -0.2)} rotationY={0.244} animation="sleep" face="calm" tailUp={0} time={t} />
            <Sister position={den(-2.2, 0, 0.4)} rotationY={-0.036} animation="sleep" face="calm" tailUp={0} time={t} />
            <Teller position={den(-1.2 - walk * 0.5, 0, 0.7)} rotationY={-1.1} animation="walk" animDistance={walk * 0.55} face={t > TRADE ? "wow" : "calm"} time={t} />
          </>
        );
      },
    },
    {
      cue: "12.want",
      ...cam.push({ on: [-8.78, 1.55, -4.65], dist: 3.3, to: 2.05, yaw: -12, pitch: 8, fov: 38, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-sunset",
      note: "Dawn light creeps over sill as Teller gently nudges wilted red flower beside shrinking berry heap.",
      stage: (t) => {
        const nudge = ease(ramp(t, 0, 1.2));
        return (
          <>
            <Berries position={[PLACE.sill[0] - 0.1, PLACE.sill[1] + 0.04, PLACE.sill[2] + 0.1]} scale={1.3} count={12} t={t} />
            <RedFlower position={[PLACE.sill[0] + 0.55 - nudge * 0.08, PLACE.sill[1] + 0.08, PLACE.sill[2] + 0.32]} scale={0.85} rotation={[0, 0, 2.7]} wilt={0.85} />
            <Teller position={[-8.4, 0, -3.55 - nudge * 0.15]} rotationY={-0.3} animation="reachUp" lookAt={PLACE.sill} face="frown" time={t} />
          </>
        );
      },
    },
    {
      cue: "12.flower",
      ...cam.orbit({ on: [-8.78, 1.55, -4.65], dist: 3.1, distTo: 2.0, yaw: -14, yawTo: 18, pitch: 8, fov: 38, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-day",
      note: "Morning sun gleams onto fresh upright red flower in sill cup while Teller gazes up in awe.",
      stage: (t) => {
        const rise = ease(ramp(t, 0, 1.1));
        return (
          <>
            <SillCup position={[PLACE.sill[0] + 0.32, PLACE.sill[1], PLACE.sill[2] + 0.1]} flower />
            <Teller position={[-8.6, 0, -3.5 - rise * 0.25]} rotationY={-0.1} animation="lookAround" lookAt={PLACE.sill} face="wow" time={t} tailUp={0.45} />
          </>
        );
      },
    },
    {
      cue: "12.second",
      ...cam.pan({ from: [-8.55, 1.85, -2.5], on: [PLACE.sill[0] + 0.32, PLACE.sill[1] + 0.08, PLACE.sill[2] + 0.1], onTo: [PLACE.sill[0] + 1.05, PLACE.sill[1] + 0.08, PLACE.sill[2] + 0.12], fov: 36, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-day",
      note: "Pan slides cleanly from flower cup onto the brand-new SECOND empty cup set deliberately beside it.",
      stage: (t) => {
        const slide = ease(ramp(t, Math.max(0.05, SECOND - 0.15), SECOND + 0.35));
        return (
          <>
            <SillCup position={[PLACE.sill[0] + 0.32, PLACE.sill[1], PLACE.sill[2] + 0.1]} flower />
            <SillCup position={[PLACE.sill[0] + 1.05, PLACE.sill[1] + (1 - slide) * 0.08, PLACE.sill[2] + 0.12]} />
          </>
        );
      },
    },
  ],
});
