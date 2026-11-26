import { Block, cam, storyScene } from "../../engine";
import { Berries, CookedChicken, Fox, PLACE, RedFlower, SillCup, Sword, ease, jolt, ramp, timing, wordAt } from "./kit";

const B = wordAt("1.back", "buying");
const GIFT = wordAt("1.gift", "stole");
const BERRY_NIGHT = wordAt("1.night", "berries");
const DROP_TO_EAT = wordAt("2.carry", "drop");

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "My family stole things",
  shots: [
    {
      cue: "1.town",
      ...cam.truck({ on: [-31.0, 0.72, 1.0], by: [-1.8, 0, 0], dist: 4.9, yaw: 14, pitch: 10, fov: 44, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-golden",
      note: "Three foxes prowl briskly west along the twilight village lane: Dad gripping a stolen Sword, Sister carrying a whole CookedChicken, and Teller trailing empty-jawed.",
      stage: (t, { p }) => {
        const d = ease(p) * 1.9;
        return (
          <>
            <Fox who={1} position={[-30.5 - d, 0, 1.0]} rotationY={-Math.PI / 2 + 0.15} scale={0.72} animation="walk" animDistance={d * 1.2} shirt="#3a4f8a" carry={<Sword scale={0.5} rotation={[0, 0, 1.4]} />} tailUp={0.65} face="calm" time={t} />
            <Fox who={2} position={[-29.9 - d, 0, 0.92]} rotationY={-Math.PI / 2 - 0.1} scale={0.62} animation="walk" animDistance={d * 1.2 + 0.3} shirt="#7a5a2a" carry={<CookedChicken scale={0.7} />} tailUp={0.5} face="smile" time={t} />
            <Fox who={0} position={[-29.25 - d, 0, 1.05]} rotationY={-Math.PI / 2} scale={0.58} animation="walk" animDistance={d * 1.2 + 0.6} shirt="#2f6f5a" tailUp={0.25} face="uneasy" time={t} />
          </>
        );
      },
    },
    {
      cue: "1.night",
      ...cam.push({ on: [-8.78, 1.45, -4.65], dist: 3.45, to: 2.05, yaw: 16, pitch: 8, fov: 38, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-sunset",
      note: "Teller bounds up onto wall beneath the windowsill just as fresh red berries drop cleanly into the sill cup.",
      stage: (t) => {
        const drop = ease(ramp(t, 0, Math.max(0.25, BERRY_NIGHT)));
        return (
          <>
            <SillCup position={[PLACE.sill[0], PLACE.sill[1] + (1 - drop) * 0.12, PLACE.sill[2] + 0.1]} berry={drop > 0.35} t={t} />
            <Fox
              who={0}
              position={[-8.95, drop * 0.18, -3.25 - drop * 0.45]}
              rotationY={0.14}
              scale={0.62}
              animation={drop < 0.5 ? "walk" : "reachUp"}
              animDistance={drop * 0.6}
              shirt="#2f6f5a"
              tailUp={0.6}
              face={t > BERRY_NIGHT ? "smile" : "uneasy"}
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "1.back",
      ...cam.orbit({ on: [-8.78, 1.35, -4.7], dist: 3.6, distTo: 2.45, yaw: -28, yawTo: 16, pitch: 14, fov: 40, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-sunset",
      note: "Orbit past window sill showing berries traded down beside the empty dusty outline where stolen loot stood.",
      stage: (t) => {
        const swap = ease(ramp(t, 0, Math.max(0.4, B + 0.35)));
        return (
          <>
            <SillCup position={[PLACE.sill[0], PLACE.sill[1], PLACE.sill[2] + 0.12]} berry t={t} />
            <Berries position={[PLACE.sill[0] + 0.52, PLACE.sill[1] + 0.06 - swap * 0.04, PLACE.sill[2] + 0.12]} scale={1.1} count={Math.max(2, Math.round(swap * 5))} t={t} />
            <group position={[PLACE.sill[0] + 0.9, 0.02, PLACE.sill[2] - 1.1]}>
              <Block position={[0, 0.01, 0]} size={[0.34, 0.02, 0.24]} color="#5a4630" castShadow={false} />
              <Block position={[0, 0.004, 0]} size={[0.42 + swap * 0.06, 0.02, 0.32]} color="#3f3022" castShadow={false} />
            </group>
            <Fox who={0} position={[-8.95 - swap * 0.25, 0, -3.55 + swap * 0.2]} rotationY={-0.6} animation="walk" animDistance={swap * 0.45} face="calm" time={t} />
          </>
        );
      },
    },
    {
      cue: "1.gift",
      ...cam.crane({ on: [-8.85, 1.15, -4.55], onTo: [-8.78, 1.58, -4.7], dist: 3.4, toDist: 2.0, yaw: 28, fromPitch: -6, toPitch: 10, fov: 38, screenOffset: [0, 0.08] }),
      impacts: [{ at: GIFT, amp: 0.02, dur: 0.2 }],
      zone: "street",
      look: "overworld-sunset",
      note: "Crane rises with Teller as he stretches his nose straight up and snatches the bright red flower out of the sill cup.",
      stage: (t) => {
        const yank = ease(ramp(t, GIFT, GIFT + 0.28));
        return (
          <>
            <SillCup position={[PLACE.sill[0], PLACE.sill[1], PLACE.sill[2] + 0.12]} flower={yank < 0.45} />
            <Fox
              who={0}
              position={[-8.95, 0, -3.55 - yank * 0.15]}
              scale={0.66}
              animation="reachUp"
              face={t > GIFT ? "wow" : "uneasy"}
              lookAt={PLACE.sill}
              carry={yank >= 0.45 ? <RedFlower scale={0.8} rotation={[0, 0, 1.5]} /> : undefined}
              time={t}
              tailUp={0.65}
            />
          </>
        );
      },
    },
    {
      cue: "2.why",
      ...cam.top({ on: [PLACE.sill[0], PLACE.sill[1], PLACE.sill[2] + 0.1], height: 2.5, to: 1.45, spin: [-14, 14], fov: 40 }),
      zone: "street",
      look: "overworld-sunset",
      note: "Top-down spin reveals cup and spreading pile of shiny berries laid side by side on the sill counter.",
      stage: (t) => {
        const spread = ease(ramp(t, 0, 1.0));
        return (
          <>
            <SillCup position={[PLACE.sill[0] - 0.28, PLACE.sill[1], PLACE.sill[2] + 0.08]} />
            <Berries position={[PLACE.sill[0] + 0.34, PLACE.sill[1] + 0.04, PLACE.sill[2] + 0.08]} scale={1.1 + spread * 0.15} count={Math.max(2, Math.round(spread * 7))} t={t} />
          </>
        );
      },
    },
    {
      cue: "2.carry",
      ...cam.push({ on: [-8.6, 0.72, -2.9], dist: 3.75, to: 2.35, yaw: -22, pitch: 8, fov: 40, screenOffset: [0, 0.08] }),
      impacts: [{ at: DROP_TO_EAT, amp: 0.022, dur: 0.22 }],
      zone: "street",
      look: "overworld-sunset",
      note: "Fox trots along with Sword in jaw, spots berries ahead, and drops sword clattering onto cobbles to eat.",
      stage: (t) => {
        const drop = ease(ramp(t, DROP_TO_EAT - 0.08, DROP_TO_EAT + 0.25));
        const walk = ease(ramp(t, 0, 1.2));
        return (
          <>
            <Fox
              who={3}
              position={[-9.2 + walk * 0.75, 0, -2.9]}
              rotationY={Math.PI / 2 - 0.3}
              scale={0.6}
              animation={drop > 0.3 ? "leanOver" : "walk"}
              animDistance={walk * 0.9}
              shirt="#4a3f6a"
              carry={drop < 0.35 ? <Sword scale={0.48} rotation={[0, 0, 1.4]} /> : <Berries scale={0.7} count={2} />}
              tailUp={0.45}
              face={drop > 0.35 ? "grin" : "calm"}
              time={t}
            />
            {drop >= 0.35 ? (
              <Sword position={[-8.5, 0.05 + (1 - Math.min(1, drop * 1.4)) * 0.45 + jolt(t, DROP_TO_EAT, 0.18), -2.75]} scale={0.5} rotation={[0, 0.4, 1.55]} />
            ) : null}
            <Berries position={[-8.25, 0.04, -2.75]} scale={1.15} count={5} t={t} />
          </>
        );
      },
    },
    {
      cue: "2.worked",
      ...cam.orbit({ on: [-8.78, 1.55, -4.7], dist: 3.6, distTo: 2.4, yaw: -24, yawTo: 18, pitch: 10, fov: 38, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-sunset",
      note: "Orbit onto sill as berries shrink while cup refills, demonstrating the silent barter trade.",
      stage: (t) => {
        const trade = ease(ramp(t, 0, 1.2));
        return (
          <>
            <SillCup position={[PLACE.sill[0] - 0.28, PLACE.sill[1], PLACE.sill[2] + 0.08]} berry t={t} />
            <Berries position={[PLACE.sill[0] + 0.34, PLACE.sill[1] + 0.04, PLACE.sill[2] + 0.08]} scale={1.15} count={Math.max(1, Math.round(7 - trade * 4))} t={t} />
            <Sword position={[PLACE.sill[0] + 0.65, PLACE.sill[1] + 0.02, PLACE.sill[2] + 0.22]} scale={0.45} rotation={[0, 0.2, 1.5]} />
          </>
        );
      },
    },
    {
      cue: "3.dad",
      ...cam.truck({ on: [-9.8, 0.72, -2.8], by: [-1.85, 0, 0], dist: 3.7, yaw: 18, pitch: 6, fov: 40, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-sunset",
      note: "Dad and Sister strut brazenly down moonlit street carrying Sword and whole CookedChicken in their jaws.",
      stage: (t, { p }) => (
        <>
          <Fox who={1} position={[-9.6 - 1.9 * p, 0, -2.6]} rotationY={-Math.PI / 2} scale={0.72} animation="walk" animDistance={2.2 * p} shirt="#3a4f8a" carry={<Sword scale={0.5} rotation={[0, 0, 1.4]} />} tailUp={0.65} face="calm" time={t} />
          <Fox who={2} position={[-8.8 - 1.9 * p, 0, -2.35]} rotationY={-Math.PI / 2} scale={0.62} animation="walk" animDistance={2.2 * p + 0.3} shirt="#7a5a2a" carry={<CookedChicken scale={0.7} />} tailUp={0.45} face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "3.me",
      ...cam.push({ on: [-10.4, 0.68, -3.2], dist: 3.8, to: 2.1, yaw: 28, pitch: 4, fov: 40, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-sunset",
      note: "Smallest fox cub stumbles along at the rear dropping ears flat in sheepish disgrace.",
      stage: (t) => {
        const trudge = ease(ramp(t, 0, 1.3));
        return (
          <Fox
            who={0}
            position={[-10.1 - trudge * 0.55, 0, -3.2]}
            rotationY={0.55}
            scale={0.58}
            animation={trudge < 0.6 ? "stagger" : "shrug"}
            animDistance={trudge * 0.7}
            shirt="#2f6f5a"
            face="ouch"
            ears={0.85}
            tailUp={0.12}
            time={t}
          />
        );
      },
    },
    {
      cue: "3.flower",
      ...cam.push({ on: [-8.78, 1.55, -4.65], dist: 3.9, to: 1.95, yaw: 14, pitch: 8, fov: 38, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-sunset",
      note: "Push cleanly onto sill cup as Teller reaches up to seize the single bright red flower.",
      stage: (t) => {
        const grab = ease(ramp(t, 0.1, 1.15));
        return (
          <>
            <SillCup position={[PLACE.sill[0] + 0.32, PLACE.sill[1], PLACE.sill[2] + 0.1]} flower />
            <Fox who={0} position={[-8.78, 0, -3.4 - grab * 0.35]} rotationY={0.1} scale={0.62} animation="reachUp" lookAt={PLACE.sill} face="wow" tailUp={0.6} time={t} />
          </>
        );
      },
    },
  ],
});
