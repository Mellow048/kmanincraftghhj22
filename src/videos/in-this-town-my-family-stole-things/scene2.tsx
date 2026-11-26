import { cam, storyScene } from "../../engine";
import { Dad as DadFox, PLACE, RedFlower, SillCup, Teller, ease, ramp, timing, wordAt } from "./kit";

const FlowerInMouth: React.FC = () => <RedFlower scale={0.8} rotation={[0, 0, 1.5]} />;

const SILL_Z = PLACE.sill[2] + 0.26;

const RULE = wordAt("4.one", "One");
const REACH = wordAt("5.climb", "climb");
const TOOK = wordAt("5.easy", "flower");

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "One thing, nothing anybody is holding",
  shots: [
    {
      cue: "4.night",
      ...cam.ots({ speaker: [-10.4, 0.68, -2.0], listener: [-10.4, 0.9, -2.9], back: 1.85, push: 0.8 }),
      zone: "street",
      look: "overworld-sunset",
      note: "OTS over Teller as Dad gestures earnestly explaining the family stealing code with the boy's lit window behind.",
      stage: (t) => {
        const step = ease(ramp(t, 0, 1.1));
        return (
          <>
            <Teller position={[-10.4, 0, -2.0 - step * 0.15]} rotationY={Math.PI - 0.3} animation="lookAround" face="brave" tailUp={0.5} time={t} />
            <DadFox position={[-10.4, 0, -2.9]} rotationY={0.1} animation="talk" face="calm" tailUp={0.35} time={t} headPitch={0.18} />
          </>
        );
      },
    },
    {
      cue: "4.one",
      ...cam.push({ on: [-10.4, 0.85, -2.6], dist: 3.2, to: 1.9, yaw: 24, pitch: 4, fov: 38, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-sunset",
      note: "Tight push into Dad stepping forward jabbing one firm warning paw on One.",
      stage: (t) => {
        const jab = ease(ramp(t, Math.max(0.05, RULE - 0.15), RULE + 0.25));
        return (
          <DadFox
            position={[-10.4, 0, -2.7 + jab * 0.22]}
            rotationY={0.3}
            animation={jab > 0.2 ? "point" : "talk"}
            face="calm"
            tailUp={0.3}
            time={t * 1.3}
            headPitch={-0.05}
          />
        );
      },
    },
    {
      cue: "4.window",
      ...cam.crane({ on: [-9.2, 0.9, -3.2], onTo: [-8.78, 1.55, -4.65], dist: 3.8, toDist: 2.45, yaw: -16, fromPitch: -8, toPitch: 12, fov: 40, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-sunset",
      note: "Crane climbs cleanly from Teller sneaking across path up onto open windowsill holding one bright red flower.",
      stage: (t) => {
        const sneak = ease(ramp(t, 0, 1.3));
        return (
          <>
            <SillCup position={[PLACE.sill[0], PLACE.sill[1] - 0.08, SILL_Z]} flower />
            <Teller position={[-9.8 + sneak * 0.65, 0, -2.0 - sneak * 1.35]} rotationY={-0.25} animation="creep" animDistance={sneak * 1.5} face="wow" lookAt={PLACE.sill} tailUp={0.55} time={t} />
          </>
        );
      },
    },
    {
      cue: "4.width",
      ...cam.orbit({ on: [-9.2, 1.48, SILL_Z], dist: 3.2, distTo: 2.05, yaw: -28, yawTo: 18, pitch: 8, fov: 38, screenOffset: [0, 0.06] }),
      zone: "street",
      look: "overworld-sunset",
      note: "Orbit outside cracked narrow window gap as Teller creeps below exterior windowsill flower cup.",
      stage: (t) => {
        const peek = ease(ramp(t, 0, 1.2));
        return (
          <>
            <SillCup position={[PLACE.sill[0] + 0.28, PLACE.sill[1] - 0.08, SILL_Z]} flower />
            <Teller position={[-9.15, peek * 0.14, -3.55 - peek * 0.25]} rotationY={Math.PI} animation="peek" face="wow" lookAt={PLACE.sill} time={t} tailUp={0.45} />
          </>
        );
      },
    },
    {
      cue: "4.cup",
      ...cam.push({ on: [-9.1, 1.48, SILL_Z], dist: 2.95, to: 1.7, yaw: 14, pitch: 8, fov: 36, screenOffset: [0, 0.06] }),
      zone: "street",
      look: "overworld-sunset",
      note: "Macro push straight toward glowing red flower inside cup while Teller reaches boldly upward over sill rim.",
      stage: (t) => {
        const rise = ease(ramp(t, 0, 1.2));
        return (
          <>
            <SillCup position={[PLACE.sill[0] + 0.28, PLACE.sill[1] - 0.08, SILL_Z]} flower />
            <Teller position={[-9.1, rise * 0.24, -3.65]} rotationY={0.1} animation="reachUp" face="wow" lookAt={PLACE.sill} time={t} tailUp={0.65} />
          </>
        );
      },
    },
    {
      cue: "5.climb",
      ...cam.crane({ on: [-9.2, 0.65, -3.45], onTo: [-9.1, 1.32, SILL_Z], dist: 3.4, toDist: 2.2, yaw: 24, fromPitch: -6, toPitch: 10, fov: 40, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-sunset",
      note: "Teller bounds smoothly up onto stone step reaching effortlessly toward exterior windowsill flower.",
      stage: (t) => {
        const hop = ease(ramp(t, 0, Math.max(0.3, REACH + 0.25)));
        return (
          <>
            <SillCup position={[PLACE.sill[0] + 0.28, PLACE.sill[1] - 0.08, SILL_Z]} flower />
            <Teller position={[-9.4 + hop * 0.3, Math.sin(hop * Math.PI) * 0.36, -2.95 - hop * 0.85]} rotationY={0.35} animation="reachUp" face={t > REACH ? "smile" : "uneasy"} lookAt={PLACE.sill} tailUp={0.75} time={t} />
          </>
        );
      },
    },
    {
      cue: "5.easy",
      ...cam.orbit({ on: [-8.9, 1.15, -3.8], dist: 3.5, distTo: 2.4, yaw: -22, yawTo: 20, pitch: 8, fov: 40, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-sunset",
      note: "Red flower lifts right out of sill cup into Teller's smiling jaws as he spins casually back to street.",
      stage: (t) => {
        const take = ease(ramp(t, 0.1, Math.max(0.4, TOOK + 0.25)));
        return (
          <>
            <SillCup position={[PLACE.sill[0] + 0.32, PLACE.sill[1], PLACE.sill[2] + 0.26]} flower={take < 0.45} />
            <Teller
              position={[-8.9 + take * 0.2, 0, -3.65 + take * 0.3]}
              rotationY={0.2 - take * 0.9}
              animation={take > 0.5 ? "walk" : "reachUp"}
              animDistance={take * 0.45}
              face="grin"
              carry={take >= 0.45 ? <FlowerInMouth /> : undefined}
              tailUp={0.7}
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "5.thought",
      ...cam.orbit({ on: [-8.85, 0.72, -3.4], dist: 3.3, distTo: 2.25, yaw: -38, yawTo: 12, pitch: 4, fov: 40, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-sunset",
      note: "Orbit sweeps around Teller proudly admiring bright red flower across his jaw under darkening sky.",
      stage: (t) => {
        const strut = ease(ramp(t, 0, 1.3));
        return (
          <Teller position={[-8.85 - strut * 0.35, 0, -3.4]} rotationY={-0.6 - strut * 0.5} animation="walk" animDistance={strut * 0.6} face="calm" carry={<FlowerInMouth />} tailUp={0.65} time={t} headPitch={0.1} />
        );
      },
    },
    {
      cue: "5.home",
      ...cam.truck({ on: [-7.6, 0.75, -3.4], by: [-2.4, 0, 0], dist: 3.2, yaw: 68, pitch: 4, fov: 40, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-sunset",
      note: "Tracking camera runs alongside Teller trotting proudly home under streetlamp with flower held high.",
      stage: (t, { p }) => (
        <Teller position={[-7.6 - 2.5 * p, 0, -3.4]} rotationY={-1.571} animation="walk" animDistance={3.0 * p} face="grin" carry={<FlowerInMouth />} tailUp={0.8} time={t} />
      ),
    },
  ],
});
