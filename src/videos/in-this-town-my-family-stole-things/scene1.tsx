import { cam, storyScene, walkSegment } from "../../engine";
import { Berries, Boy, CookedChicken, EAST, Fox, PLACE, RedFlower, SOUTH, SillCup, Sword, Villager, WEST, ease, jolt, ramp, timing, wordAt } from "./kit";

const BUY_BACK = wordAt("1.back", "buying");
const GIFT = wordAt("1.gift", "stole");
const BERRY_NIGHT = wordAt("1.night", "berries");
const DROP_TO_EAT = wordAt("2.carry", "drop");
const SILL_Z = PLACE.sill[2] + 0.26; // z = -4.54, cleanly outside boyHouse wall (z = -4.8)

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "My family stole things",
  shots: [
    {
      cue: "1.town",
      ...cam.push({ on: [6.25, 1.0, 1.4], dist: 5.2, to: 6.4, yaw: 0, pitch: 12, fov: 54, ease: "linear", screenOffset: [0, 0.06] }),
      zone: "street",
      look: "overworld-golden",
      note: "Frame-one theft chase in one readable frame: Dad fox bolts south toward the lens with the stolen Sword across his mouth, Sister runs beside him with a whole CookedChicken, Teller trails on the right, and the robbed Villager pounds after them on the left with an arm raised — the lit market Stall, crates and hay fill the street behind.",
      stage: (t, { p }) => {
        const d = ease(p) * 2.2;
        return (
          <>
            <Fox who={1} position={[6.5, 0, 1.2 + d]} rotationY={SOUTH + 0.08} scale={0.78} animation="run" animDistance={d + 0.15} shirt="#3a4f8a" carry={<Sword scale={1.0} rotation={[0, 0, 1.4]} />} tailUp={0.8} face="calm" time={t * 1.3} />
            <Fox who={2} position={[5.7, 0, 1.35 + d]} rotationY={SOUTH - 0.06} scale={0.66} animation="run" animDistance={d + 0.05} shirt="#7a5a2a" carry={<CookedChicken scale={1.35} />} tailUp={0.65} face="grin" time={t * 1.3} />
            <Fox who={0} position={[7.25, 0, 0.1 + d]} rotationY={SOUTH + 0.15} scale={0.58} animation="run" animDistance={d + 0.1} shirt="#2f6f5a" tailUp={0.25} face="uneasy" time={t * 1.2} />
            <Villager position={[5.2, 0, -0.5 + d * 0.95]} rotationY={SOUTH - 0.05} walk={d * 0.95} arms={{ l: -2.2, r: -1.4 }} strain={0.9} robe="#8a4b2a" hat="straw" />
          </>
        );
      },
    },
    {
      cue: "1.night",
      ...cam.orbit({ on: [-9.5, 1.15, -4.05], dist: 4.3, distTo: 2.65, yaw: 34, yawTo: -18, pitch: 8, fov: 40, screenOffset: [0, 0.06] }),
      zone: "street",
      look: "overworld-sunset",
      note: "Boy walks cleanly up his lit front porch placing shiny red berries into exterior windowsill cup while Teller watches eagerly from foreground path.",
      stage: (t) => {
        const place = ease(ramp(t, 0, Math.max(0.35, BERRY_NIGHT + 0.2)));
        return (
          <>
            <SillCup position={[PLACE.sill[0], PLACE.sill[1] - 0.08, SILL_Z]} berry={place > 0.55} t={t} />
            <Boy position={[-11.3 + place * 1.65, 0, -3.75]} rotationY={place < 0.7 ? EAST : Math.PI} walk={place * 1.8} lookAt={[PLACE.sill[0], PLACE.sill[1], SILL_Z]} carry={place <= 0.55 ? <Berries scale={0.9} count={4} t={t} /> : undefined} />
            <Fox
              who={0}
              position={[-8.3 - place * 0.55, 0, -2.5 - place * 0.65]}
              rotationY={Math.PI - 0.25}
              scale={0.62}
              animation={place < 0.6 ? "creep" : "peek"}
              animDistance={place * 0.9}
              shirt="#2f6f5a"
              tailUp={0.6}
              face={t > BERRY_NIGHT ? "wow" : "smile"}
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "1.back",
      ...cam.push({ on: [-9.5, 1.0, -3.9], dist: 4.3, to: 2.45, yaw: -22, pitch: 12, fov: 40, screenOffset: [0, 0.06] }),
      zone: "street",
      look: "overworld-sunset",
      note: "Live porch barter outside boyHouse: Dad trots to stone step, drops stolen Sword onto front step in exchange for SillCup berries, and darts away while Boy grabs his Sword.",
      stage: (t) => {
        const endSwap = Math.max(0.45, BUY_BACK + 0.4);
        const swap = ease(ramp(t, 0, endSwap));
        const dadWalk = walkSegment([-8.4, 0, -2.6], [-9.5, 0, -3.2], t, 0, endSwap, { gait: swap < 0.55 ? "walk" : "run" });
        return (
          <>
            <SillCup position={[PLACE.sill[0], PLACE.sill[1] - 0.08, SILL_Z]} berry={swap < 0.55} t={t} />
            <Fox
              who={1}
              {...dadWalk}
              rotationY={swap < 0.55 ? Math.PI - 0.2 : WEST}
              scale={0.72}
              shirt="#3a4f8a"
              carry={swap < 0.5 ? <Sword scale={0.54} rotation={[0, 0, 1.4]} /> : <Berries scale={0.9} count={4} t={t} />}
              tailUp={0.55}
              face="calm"
              time={t}
            />
            {swap >= 0.45 ? (
              <Sword position={[-9.55, 0.14 + (1 - Math.min(1, swap * 1.3)) * 0.35, -3.45]} scale={0.58} rotation={[0, 0.4, 1.55]} />
            ) : null}
            <Boy position={[-11.2 + swap * 1.25, 0, -3.7]} rotationY={EAST - 0.2} walk={swap * 1.3} lean={swap > 0.55 ? 0.35 : 0.05} />
          </>
        );
      },
    },
    {
      cue: "1.gift",
      ...cam.crane({ on: [-9.3, 1.05, -4.05], onTo: [-9.45, 1.45, -4.4], dist: 3.65, toDist: 1.95, yaw: 24, fromPitch: -4, toPitch: 12, fov: 38, screenOffset: [0, 0.06] }),
      impacts: [{ at: GIFT, amp: 0.025, dur: 0.22 }],
      zone: "street",
      look: "overworld-golden",
      note: "Dramatic hook payoff: Teller bounds onto front step reaching straight up to snatch the glowing red poppy right out of Boy's windowsill cup.",
      stage: (t) => {
        const yank = ease(ramp(t, Math.max(0.05, GIFT - 0.12), GIFT + 0.25));
        const jump = ease(ramp(t, 0, GIFT + 0.15));
        return (
          <>
            <SillCup position={[PLACE.sill[0], PLACE.sill[1] - 0.08, SILL_Z]} flower={yank < 0.45} />
            <Fox
              who={0}
              position={[-9.45, Math.sin(jump * Math.PI) * 0.24, -2.95 - jump * 0.85]}
              rotationY={Math.PI + 0.12}
              scale={0.64}
              animation={jump < 0.45 ? "walk" : "reachUp"}
              animDistance={jump * 1.0}
              face={t > GIFT ? "wow" : "brave"}
              lookAt={[PLACE.sill[0], PLACE.sill[1], SILL_Z]}
              carry={yank >= 0.45 ? <RedFlower scale={0.88} rotation={[0, 0, 1.5]} /> : undefined}
              time={t}
              tailUp={0.75}
            />
          </>
        );
      },
    },
    {
      cue: "2.why",
      ...cam.top({ on: [PLACE.sill[0], PLACE.sill[1] - 0.04, SILL_Z], height: 2.35, to: 1.35, spin: [-16, 16], fov: 42 }),
      zone: "street",
      look: "overworld-sunset",
      note: "Top-down spin directly onto exterior windowsill ledge showing cup and growing pile of bright berries side by side.",
      stage: (t) => {
        const spread = ease(ramp(t, 0, 0.8));
        return (
          <>
            <SillCup position={[PLACE.sill[0] - 0.28, PLACE.sill[1] - 0.08, SILL_Z]} />
            <Berries position={[PLACE.sill[0] + 0.3, PLACE.sill[1] - 0.04, SILL_Z]} scale={1.15 + spread * 0.2} count={Math.max(3, Math.round(spread * 7))} t={t} />
          </>
        );
      },
    },
    {
      cue: "2.carry",
      ...cam.truck({ on: [-9.2, 0.72, -2.8], by: [1.6, 0, 0], dist: 3.6, yaw: 18, pitch: 10, fov: 40, screenOffset: [0, 0.08] }),
      impacts: [{ at: DROP_TO_EAT, amp: 0.024, dur: 0.22 }],
      zone: "street",
      look: "overworld-sunset",
      note: "Fox trots briskly east down lane with iron Sword in jaw, spots heap of red Berries ahead, drops Sword clattering onto cobbles, and lunges to eat.",
      stage: (t) => {
        const drop = ease(ramp(t, DROP_TO_EAT - 0.1, DROP_TO_EAT + 0.25));
        const walk = ease(ramp(t, 0, Math.max(0.5, DROP_TO_EAT)));
        return (
          <>
            <Fox
              who={3}
              position={[-10.4 + walk * 1.9, 0, -2.75]}
              rotationY={EAST - 0.25}
              scale={0.62}
              animation={drop > 0.3 ? "leanOver" : "walk"}
              animDistance={walk * 2.0}
              shirt="#4a3f6a"
              carry={drop < 0.35 ? <Sword scale={0.54} rotation={[0, 0, 1.4]} /> : <Berries scale={0.85} count={3} />}
              tailUp={0.55}
              face={drop > 0.35 ? "grin" : "calm"}
              time={t}
            />
            {drop >= 0.35 ? (
              <Sword position={[-8.55, 0.05 + (1 - Math.min(1, drop * 1.4)) * 0.45 + jolt(t, DROP_TO_EAT, 0.18), -2.65]} scale={0.54} rotation={[0, 0.4, 1.55]} />
            ) : null}
            <Berries position={[-8.1, 0.05, -2.75]} scale={1.25} count={6} t={t} />
          </>
        );
      },
    },
    {
      cue: "2.worked",
      ...cam.orbit({ on: [-9.2, 1.45, SILL_Z], dist: 3.7, distTo: 2.35, yaw: -24, yawTo: 22, pitch: 10, fov: 38, screenOffset: [0, 0.06] }),
      zone: "street",
      look: "overworld-sunset",
      note: "Boy peeks excitedly from porch as Dad fox leaves gleaming Sword beside Berries on exterior sill and darts off into shadow.",
      stage: (t) => {
        const trade = ease(ramp(t, 0, 1.25));
        const dadRun = walkSegment([-9.0, 0, -3.4], [-10.45, 0, -3.0], t, 0, 1.25, { gait: "run", yaw: WEST });
        return (
          <>
            <SillCup position={[PLACE.sill[0] - 0.28, PLACE.sill[1] - 0.08, SILL_Z]} berry t={t} />
            <Berries position={[PLACE.sill[0] + 0.25, PLACE.sill[1] - 0.04, SILL_Z]} scale={1.2} count={Math.max(1, Math.round(7 - trade * 5))} t={t} />
            <Sword position={[PLACE.sill[0] + 0.62, PLACE.sill[1] - 0.04, SILL_Z + 0.05]} scale={0.48} rotation={[0, 0.2, 1.5]} />
            <Fox who={1} {...dadRun} scale={0.7} carry={<Berries scale={0.8} count={3} />} tailUp={0.65} face="smile" time={t} />
          </>
        );
      },
    },
    {
      cue: "3.dad",
      ...cam.truck({ on: [-9.6, 0.72, -2.5], by: [-2.4, 0, 0], dist: 3.8, yaw: 18, pitch: 6, fov: 40, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-sunset",
      note: "Dad and Sister strut brazenly down lantern-lit village street carrying Sword and whole CookedChicken in their jaws.",
      stage: (t, { p }) => (
        <>
          <Fox who={1} position={[-9.2 - 2.6 * p, 0, -2.4]} rotationY={WEST} scale={0.72} animation="walk" animDistance={2.8 * p} shirt="#3a4f8a" carry={<Sword scale={0.54} rotation={[0, 0, 1.4]} />} tailUp={0.65} face="calm" time={t} />
          <Fox who={2} position={[-8.3 - 2.6 * p, 0, -2.15]} rotationY={WEST} scale={0.62} animation="walk" animDistance={2.8 * p + 0.3} shirt="#7a5a2a" carry={<CookedChicken scale={0.78} />} tailUp={0.5} face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "3.me",
      ...cam.push({ on: [-10.4, 0.68, -2.8], dist: 3.9, to: 2.1, yaw: 28, pitch: 4, fov: 40, screenOffset: [0, 0.08] }),
      zone: "street",
      look: "overworld-sunset",
      note: "Smallest fox cub stumbles clumsily along behind dropping his ears flat and shrugging in self-deprecating disgrace.",
      stage: (t) => {
        const trudge = ease(ramp(t, 0, 1.3));
        return (
          <Fox
            who={0}
            position={[-9.7 - trudge * 1.35, 0, -2.85]}
            rotationY={WEST + 0.35}
            scale={0.58}
            animation={trudge < 0.6 ? "stagger" : "shrug"}
            animDistance={trudge * 1.4}
            shirt="#2f6f5a"
            face="ouch"
            ears={0.88}
            tailUp={0.12}
            time={t}
          />
        );
      },
    },
    {
      cue: "3.flower",
      ...cam.push({ on: [-9.2, 1.42, SILL_Z], dist: 3.9, to: 1.9, yaw: 14, pitch: 8, fov: 38, screenOffset: [0, 0.06] }),
      zone: "street",
      look: "overworld-sunset",
      note: "Push cleanly onto glowing exterior sill cup as Teller dashes up and reaches high to seize the bright red flower.",
      stage: (t) => {
        const grab = ease(ramp(t, 0.05, 1.25));
        return (
          <>
            <SillCup position={[PLACE.sill[0] + 0.28, PLACE.sill[1] - 0.08, SILL_Z]} flower />
            <Fox who={0} position={[-9.1, 0, -2.85 - grab * 0.95]} rotationY={Math.PI + 0.1} scale={0.62} animation={grab < 0.5 ? "walk" : "reachUp"} animDistance={grab * 1.1} lookAt={[PLACE.sill[0], PLACE.sill[1], SILL_Z]} face="wow" tailUp={0.68} time={t} />
          </>
        );
      },
    },
  ],
});
