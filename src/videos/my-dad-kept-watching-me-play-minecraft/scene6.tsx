import {
  BadgePop,
  Creeper,
  Dad,
  DeskSetup,
  EmberDrift,
  FloatingNumber,
  Glow,
  IronAxe,
  Laptop,
  LaptopSideTable,
  OakLogDrop,
  OpeningChest,
  PLACE,
  Son,
  StarterHouse,
  WoodenShield,
  cam,
  ease,
  on,
  pop,
  ramp,
  storyScene,
  timing,
  walkSegment,
  wordAt,
} from "./kit";

const blockWord = wordAt("6.block", "blocked");
const shieldGiveWord = wordAt("6.shield", "shield");

/**
 * Scene 6 — Side-by-Side Co-Op, Wood Breaking & First Shield (`Up Happy 0:02+`):
 *   Dual IRL PC+Laptop -> Dad breaks oak log with IronAxe -> Sam gifts Shield -> Creeper blocked 0 DMG!
 */
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "Teaching Dad Wood & Shield",
  shots: [
    {
      cue: "6.dual",
      ...cam.orbit({
        on: on(PLACE.irl, 0.45, 1.25, -0.45),
        dist: 5.4,
        distTo: 4.5,
        yaw: -22,
        yawTo: 22,
        pitch: 14,
        fov: 45,
        screenOffset: [0, 0.05],
      }),
      zone: "irl",
      note: "Dad at PC DeskSetup side by side with Sam on small side table running Laptop co-op LAN.",
      stage: (t) => (
        <>
          <DeskSetup position={on(PLACE.irl, -0.35, 0, -1.25)} screenText="DAD ONLINE" screenColor="#4be08a" clockText="4:25 PM" lampOn />
          <LaptopSideTable position={on(PLACE.irl, 1.45, 0, -1.0)} />
          <Laptop position={on(PLACE.irl, 1.45, 0.76, -1.0)} rotationY={-0.18} screenText="2P CO-OP" screenColor="#5de8a0" scale={0.92} />
          <Dad position={on(PLACE.irl, -0.35, 0.08, -0.43)} rotationY={Math.PI} animation="sit" face="grin" time={t} />
          <Son position={on(PLACE.irl, 1.45, 0.08, -0.25)} rotationY={Math.PI - 0.12} animation="sit" face="happy" badge="heart" badgePopStart={0.25} time={t} />
        </>
      ),
    },
    {
      cue: "6.teach",
      ...cam.orbit({
        on: on(PLACE.server, 0, 1.25, 1.2),
        dist: 5.4,
        distTo: 4.6,
        yaw: 20,
        yawTo: -16,
        pitch: 13,
        fov: 44,
        screenOffset: [0, 0.05],
      }),
      zone: "server",
      note: "Sam points toward sunlit Oak Tree beside Dad showing survival movement controls.",
      stage: (t) => (
        <>
          <StarterHouse position={on(PLACE.server, 0, 0, -2.0)} state="crater" />
          <Son position={on(PLACE.server, -0.4, 0, 1.35)} rotationY={1.15} animation="point" face="smile" time={t} />
          <Dad position={on(PLACE.server, 0.65, 0, 1.4)} rotationY={0.75} animation="lookAround" face="bearded" time={t} />
        </>
      ),
    },
    {
      cue: "6.wood",
      ...cam.push({
        on: on(PLACE.server, 2.2, 1.35, 1.45),
        dist: 5.0,
        to: 4.1,
        yaw: -24,
        pitch: 12,
        fov: 44,
        screenOffset: [0, 0.05],
      }),
      impacts: [{ at: 0.45, amp: 0.025, dur: 0.22 }],
      zone: "server",
      note: "Dad swings IronAxe cleanly against Oak Tree knocking glowing OakLogDrop free with +OAK WOOD.",
      stage: (t) => (
        <>
          <Dad position={on(PLACE.server, 1.9, 0, 1.65)} rotationY={Math.PI * 0.45} animation="press" face="grin" time={t * 1.6}>
            <IronAxe position={[0, -0.08, 0.2]} rotation={[0.9, 0, 0]} scale={0.95} />
          </Dad>
          <OakLogDrop position={on(PLACE.server, 2.45, 0.95 + Math.abs(Math.sin(t * 5)) * 0.25, 2.1)} spin={t * 4} />
          <FloatingNumber text="+OAK WOOD" color="#ffcf54" position={on(PLACE.server, 2.4, 2.15 + ramp(t, 0.2, 1.1) * 0.25, 1.8)} height={0.28 * pop(t, 0.25)} />
          <Son position={on(PLACE.server, 0.95, 0, 2.0)} rotationY={Math.PI * 0.35} animation="cheer" face="happy" time={t} />
        </>
      ),
    },
    {
      cue: "6.chest",
      ...cam.push({
        on: on(PLACE.server, -0.5, 1.1, 1.45),
        dist: 4.7,
        to: 3.9,
        yaw: 18,
        pitch: 13,
        fov: 43,
        screenOffset: [0, 0.05],
      }),
      zone: "server",
      note: "OpeningChest hinges wide open beside porch revealing Dad's gleaming new oak WoodenShield.",
      stage: (t) => {
        const open = ease(ramp(t, 0.05, 0.85));
        return (
          <>
            <StarterHouse position={on(PLACE.server, 0, 0, -2.0)} state="crater" />
            <OpeningChest position={on(PLACE.server, -0.85, 0, 1.45)} open={open} contents="gold" />
            <WoodenShield position={on(PLACE.server, -0.85, 0.72 + open * 0.42, 1.52)} rotation={[0, Math.sin(t * 2) * 0.2, 0]} scale={0.62 * open} glowing />
            <Son position={on(PLACE.server, -0.15, 0, 1.65)} rotationY={-0.75} animation="reach" face="smile" time={t} />
          </>
        );
      },
    },
    {
      cue: "6.shield",
      ...cam.orbit({
        on: on(PLACE.server, 0, 1.25, 1.45),
        dist: 4.8,
        distTo: 4.0,
        yaw: -22,
        yawTo: 18,
        pitch: 12,
        fov: 43,
        screenOffset: [0, 0.05],
      }),
      zone: "server",
      note: "Sam steps smoothly forward handing crafted WoodenShield straight into Dad's arm.",
      stage: (t) => {
        const handed = t >= shieldGiveWord;
        const step = walkSegment(on(PLACE.server, -0.95, 0, 1.65), on(PLACE.server, -0.25, 0, 1.5), t, 0, Math.max(0.35, shieldGiveWord), {
          gait: "walk",
          endYaw: Math.PI / 2,
        });
        return (
          <>
            <StarterHouse position={on(PLACE.server, 0, 0, -2.0)} state="crater" />
            <Son {...step} animation={handed ? "reach" : step.animation} face="happy">
              {!handed ? <WoodenShield position={[0, -0.1, 0.34]} scale={0.75} glowing /> : null}
            </Son>
            <Dad position={on(PLACE.server, 0.7, 0, 1.5)} rotationY={-Math.PI / 2} animation={handed ? "guard" : "reach"} face="grin" time={t}>
              {handed ? <WoodenShield position={[-0.2, 0.05, 0.38]} scale={0.85} glowing /> : null}
            </Dad>
          </>
        );
      },
    },
    {
      cue: "6.creeper2",
      ...cam.orbit({
        on: on(PLACE.server, 0.1, 1.2, 1.15),
        dist: 5.5,
        distTo: 4.6,
        yaw: 24,
        yawTo: -20,
        pitch: 12,
        fov: 44,
        screenOffset: [0, 0.05],
      }),
      zone: "server",
      note: "A sneaky second Creeper puffs near fence line while calm Dad raises his wooden shield ready.",
      stage: (t) => (
        <>
          <StarterHouse position={on(PLACE.server, 0, 0, -2.0)} state="crater" />
          <Creeper position={on(PLACE.server, -0.95, 0, 0.9)} rotationY={Math.PI * 0.4} fuse={ease(ramp(t, 0.1, 1.2)) * 0.75} />
          <Dad position={on(PLACE.server, 0.35, 0, 1.3)} rotationY={-Math.PI * 0.38} animation="guard" face="brave" time={t}>
            <WoodenShield position={[-0.15, 0.05, 0.4]} scale={0.88} glowing />
          </Dad>
          <BadgePop kind="!" position={on(PLACE.server, 0.35, 2.75, 1.3)} popStart={0.2} t={t} />
        </>
      ),
    },
    {
      cue: "6.block",
      ...cam.push({
        on: on(PLACE.server, 0.05, 1.25, 1.25),
        dist: 5.2,
        to: 4.2,
        yaw: -18,
        pitch: 12,
        fov: 44,
        screenOffset: [0, 0.05],
      }),
      impacts: [{ at: blockWord, amp: 0.035, dur: 0.25 }],
      zone: "server",
      note: "Creeper detonates into cyan spark shield deflection; Dad stands solid holding BLOCKED 0 DMG.",
      stage: (t) => {
        const hit = t >= blockWord;
        return (
          <>
            <StarterHouse position={on(PLACE.server, 0, 0, -2.0)} state="crater" />
            {!hit ? (
              <Creeper position={on(PLACE.server, -0.85, 0, 0.95)} rotationY={Math.PI * 0.42} fuse={1} />
            ) : (
              <>
                <Glow position={on(PLACE.server, -0.25, 1.15, 1.15)} size={2.6} color="#63d8ff" opacity={0.55 * (1 - ramp(t, blockWord, blockWord + 0.7))} />
                <EmberDrift position={on(PLACE.server, -0.5, 0.9, 1.0)} area={[2.4, 2.0, 2.2]} count={22} seed={68} />
                <FloatingNumber text="BLOCKED 0" color="#5ce8ff" position={on(PLACE.server, 0.15, 2.4, 1.3)} height={0.22 * pop(t, blockWord)} />
              </>
            )}
            <Dad position={on(PLACE.server, 0.4, 0, 1.3)} rotationY={-Math.PI * 0.4} animation="guard" face="happy" time={t}>
              <WoodenShield position={[-0.15, 0.05, 0.4]} scale={0.9} glowing />
            </Dad>
            <Son position={on(PLACE.server, 1.45, 0, 1.75)} rotationY={-0.65} animation={hit ? "cheer" : "peek"} face="grin" time={t} />
          </>
        );
      },
    },
  ],
});
