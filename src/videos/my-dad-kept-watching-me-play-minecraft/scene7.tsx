import {
  Dad,
  FloatingHeart,
  PLACE,
  ServerChatBox,
  Son,
  StarterHouse,
  SubscribeSign,
  WoodenShield,
  cam,
  on,
  pop,
  storyScene,
  timing,
  wordAt,
} from "./kit";

const chatWord = wordAt("7.hearts", "typed");

/**
 * Scene 7 — Rebuilt Cozy Twin-Bed Base & Story CTA (`Up Happy 0:02+`):
 *   Brand-new sunlit StarterHouse -> warm twin beds & lanterns -> <Dad> best game -> SubscribeSign!
 */
export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "Best Game We Ever Played",
  shots: [
    {
      cue: "7.rebuild",
      ...cam.crane({
        on: on(PLACE.server, 0, 1.4, -0.4),
        dist: 7.4,
        toDist: 5.8,
        fromPitch: 22,
        toPitch: 11,
        yaw: -24,
        fov: 46,
        screenOffset: [0, 0.04],
      }),
      zone: "server",
      note: "Sweeping crane over rebuilt sunlit oak StarterHouse with golden lanterns as Dad and Sam cheer outside.",
      stage: (t) => (
        <>
          <StarterHouse position={on(PLACE.server, 0, 0, -2.0)} state="rebuilt" />
          <Dad position={on(PLACE.server, -0.85, 0, 1.25)} rotationY={0.35} animation="cheer" face="grin" time={t}>
            <WoodenShield position={[-0.18, 0.05, 0.36]} scale={0.82} glowing />
          </Dad>
          <Son position={on(PLACE.server, 0.85, 0, 1.25)} rotationY={-0.35} animation="jump" face="happy" time={t} />
        </>
      ),
    },
    {
      cue: "7.cozy",
      ...cam.push({
        on: on(PLACE.server, 0, 1.45, -1.6),
        dist: 5.4,
        to: 4.3,
        yaw: 16,
        pitch: 12,
        fov: 44,
        screenOffset: [0, 0.04],
      }),
      zone: "server",
      note: "Warm view into rebuilt open doorway & twin red+blue oak beds lit by hanging golden lanterns.",
      stage: (t) => (
        <>
          <StarterHouse position={on(PLACE.server, 0, 0, -2.0)} state="rebuilt" />
          <FloatingHeart position={on(PLACE.server, 0, 2.2, 0.3)} count={6} spread={2.2} t={t} seed={72} />
        </>
      ),
    },
    {
      cue: "7.hearts",
      ...cam.orbit({
        on: on(PLACE.server, 0, 1.4, 0.8),
        dist: 5.6,
        distTo: 4.6,
        yaw: -20,
        yawTo: 18,
        pitch: 13,
        fov: 45,
        screenOffset: [0, 0.05],
      }),
      zone: "server",
      note: "Rising FloatingHearts around Dad & Sam while 3D ServerChatBox shows Dad's wholesome message.",
      stage: (t) => (
        <>
          <StarterHouse position={on(PLACE.server, 0, 0, -2.0)} state="rebuilt" />
          <Dad position={on(PLACE.server, -0.75, 0, 1.3)} rotationY={0.45} animation="wave" face="happy" badge="heart" badgePopStart={0.2} time={t}>
            <WoodenShield position={[-0.18, 0.05, 0.36]} scale={0.82} />
          </Dad>
          <Son position={on(PLACE.server, 0.75, 0, 1.3)} rotationY={-0.45} animation="cheer" face="laugh" badge="heart" badgePopStart={0.3} time={t} />
          <FloatingHeart position={on(PLACE.server, 0, 2.1, 1.2)} count={10} spread={2.6} t={t} seed={77} />
          <ServerChatBox
            position={on(PLACE.server, 0, 2.85, 0.5)}
            scale={0.62 * pop(t, Math.max(0.15, chatWord - 0.1))}
            lines={[
              { sender: "Dad", text: "best game", color: "#ffe074" },
              { text: "we ever played", color: "#ffe074" },
            ]}
          />
        </>
      ),
    },
    {
      cue: "7.cta",
      ...cam.push({
        on: on(PLACE.server, 0, 1.35, 1.2),
        dist: 6.2,
        to: 5.2,
        yaw: 14,
        pitch: 12,
        fov: 46,
        screenOffset: [0, 0.05],
      }),
      zone: "server",
      note: "Final golden wide shot: Dad waving proudly with Shield alongside Sam beside wooden SUBSCRIBE sign.",
      stage: (t) => (
        <>
          <StarterHouse position={on(PLACE.server, 0, 0, -2.0)} state="rebuilt" />
          <Dad position={on(PLACE.server, -1.05, 0, 1.4)} rotationY={0.25} animation="wave" face="happy" time={t}>
            <WoodenShield position={[-0.18, 0.05, 0.36]} scale={0.84} glowing />
          </Dad>
          <Son position={on(PLACE.server, 1.05, 0, 1.4)} rotationY={-0.25} animation="wave" face="grin" time={t} />
          <SubscribeSign position={on(PLACE.server, 0, 0.78, 1.35)} />
          <FloatingHeart position={on(PLACE.server, 0, 2.2, 1.3)} count={8} spread={2.6} t={t} seed={79} />
        </>
      ),
    },
  ],
});
