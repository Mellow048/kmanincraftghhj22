import {
  Dad,
  DeskSetup,
  EmberDrift,
  PLACE,
  Son,
  StarterHouse,
  cam,
  on,
  storyScene,
  timing,
  walkSegment,
} from "./kit";

/**
 * Scene 3 — Heartbreak & Son Enters Bedroom (Crossfade -> `Up Sad`):
 *   Crater reveal -> Sam walks through IRL bedroom door -> stares shocked at monitor!
 */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Broken House Shock",
  shots: [
    {
      cue: "3.house",
      ...cam.crane({
        on: on(PLACE.server, -0.2, 1.4, -0.8),
        dist: 6.4,
        toDist: 5.0,
        fromPitch: 18,
        toPitch: 10,
        yaw: -22,
        fov: 46,
        screenOffset: [0, 0.04],
      }),
      zone: "server",
      note: "High-to-low reveal over blasted crater tearing open Sam's cozy oak house.",
      stage: (t) => (
        <>
          <StarterHouse position={on(PLACE.server, 0, 0, -2.0)} state="crater" />
          <EmberDrift position={on(PLACE.server, -0.4, 0.7, -0.4)} area={[3.4, 2.4, 2.8]} count={24} seed={31} />
          <Dad position={on(PLACE.server, 0.65, 0, 1.85)} rotationY={Math.PI + 0.35} animation="cower" face="crying" tears={0.5} time={t} />
        </>
      ),
    },
    {
      cue: "3.enter",
      ...cam.orbit({
        on: on(PLACE.irl, -0.8, 1.2, 0.2),
        dist: 5.2,
        distTo: 4.5,
        yaw: 22,
        yawTo: -12,
        pitch: 13,
        fov: 45,
        screenOffset: [0, 0.05],
      }),
      zone: "irl",
      note: "Sam walks through bedroom doorway facing PC desk where Dad nervously stands.",
      stage: (t) => {
        const samWalk = walkSegment(on(PLACE.irl, -2.9, 0, 0.3), on(PLACE.irl, -1.15, 0, 0.15), t, 0, 0.85, {
          gait: "walk",
          endYaw: Math.PI * 0.72,
        });
        return (
          <>
            <DeskSetup position={on(PLACE.irl, 0, 0, -1.25)} screenText="HOUSE GONE" screenColor="#ff5d4d" clockText="4:18 PM" lampOn={false} />
            <Dad position={on(PLACE.irl, 0.65, 0, -0.25)} rotationY={-0.65} animation="cower" face="frown" time={t} />
            <Son {...samWalk} face="wow" badge="!" badgePopStart={0.55} />
          </>
        );
      },
    },
    {
      cue: "3.monitor",
      ...cam.push({
        on: on(PLACE.irl, -0.1, 1.25, -0.55),
        dist: 4.8,
        to: 3.9,
        yaw: 24,
        pitch: 12,
        fov: 43,
        screenOffset: [0, 0.05],
      }),
      zone: "irl",
      note: "Sam steps closer staring wide-eyed at glowing red CRATER alert on PC monitor.",
      stage: (t) => (
        <>
          <DeskSetup position={on(PLACE.irl, 0, 0, -1.25)} screenText="CREEPER BLAST" screenColor="#ff4d4d" clockText="4:18 PM" lampOn={false} />
          <Son position={on(PLACE.irl, -0.75, 0, -0.1)} rotationY={Math.PI - 0.35} animation="scared" face="wow" time={t} />
          <Dad position={on(PLACE.irl, 0.75, 0, -0.2)} rotationY={-0.8} animation="shrug" face="crying" tears={0.4} time={t} />
        </>
      ),
    },
    {
      cue: "3.torn",
      ...cam.orbit({
        on: on(PLACE.server, -0.35, 1.3, -1.1),
        dist: 5.8,
        distTo: 4.7,
        yaw: 22,
        yawTo: -26,
        pitch: 14,
        fov: 45,
        screenOffset: [0, 0.05],
      }),
      zone: "server",
      note: "Orbit showing torn oak planks, blown-open front wall, and scorched crater floor.",
      stage: (t) => (
        <>
          <StarterHouse position={on(PLACE.server, 0, 0, -2.0)} state="crater" />
          <EmberDrift position={on(PLACE.server, -0.5, 0.6, -0.5)} area={[3.0, 2.2, 2.6]} count={22} seed={39} />
        </>
      ),
    },
  ],
});
