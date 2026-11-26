import {
  BadgePop,
  ChatToast,
  Creeper,
  Dad,
  DeathPuff,
  EmberDrift,
  FloatingNumber,
  Glow,
  PLACE,
  StarterHouse,
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

const boomWord = wordAt("2.boom", "Boom");

/**
 * Scene 2 — Clumsy Controls & Creeper Disaster (`0:11–0:26`, Up Happy 0:02+):
 *   Fails to punch tree -> bumps fence -> Creeper hiss -> BOOM death -> walks back & freezes!
 */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "First Try Disaster",
  shots: [
    {
      cue: "2.controls",
      ...cam.push({
        on: on(PLACE.server, 0, 1.2, 1.4),
        dist: 5.2,
        to: 4.3,
        yaw: 18,
        pitch: 12,
        fov: 44,
        screenOffset: [0, 0.06],
      }),
      zone: "server",
      note: "Dad stands stiffly punching air confused with floating ? badge overhead.",
      stage: (t) => (
        <>
          <StarterHouse position={on(PLACE.server, 0, 0, -2.0)} state="intact" />
          <Dad position={on(PLACE.server, 0, 0, 1.5)} rotationY={0.35} animation="shrug" badge="?" badgePopStart={0.1} face="wow" time={t} />
        </>
      ),
    },
    {
      cue: "2.tree",
      ...cam.orbit({
        on: on(PLACE.server, 2.35, 1.35, 1.45),
        dist: 5.2,
        distTo: 4.4,
        yaw: -24,
        yawTo: 18,
        pitch: 13,
        fov: 44,
        screenOffset: [0, 0.05],
      }),
      zone: "server",
      note: "Dad faces straight into oak Tree trunk swinging his fist against the bark.",
      stage: (t) => (
        <>
          <StarterHouse position={on(PLACE.server, 0, 0, -2.0)} state="intact" />
          <Dad position={on(PLACE.server, 2.15, 0, 1.5)} rotationY={Math.PI / 2} animation="press" face="ouch" badge="?" badgePopStart={0.2} time={t * 1.4} />
          <FloatingNumber text="0 WOOD" color="#ffd84d" position={on(PLACE.server, 2.0, 2.55 + ease(ramp(t, 0.2, 1.1)) * 0.2, 1.5)} height={0.2 * pop(t, 0.25)} />
        </>
      ),
    },
    {
      cue: "2.fence",
      ...cam.truck({
        on: on(PLACE.server, -2.2, 1.2, 1.2),
        by: [-0.8, 0, 0],
        dist: 5.0,
        yaw: 20,
        pitch: 13,
        fov: 44,
        screenOffset: [0, 0.06],
      }),
      zone: "server",
      note: "Dad walks right into outer wooden fence, bouncing back sheepishly.",
      stage: (t) => {
        const bump = walkSegment(on(PLACE.server, -1.6, 0, 1.3), on(PLACE.server, -3.25, 0, 1.0), t, 0, 0.72, {
          gait: "walk",
          endYaw: -Math.PI / 2,
        });
        return (
          <>
            <StarterHouse position={on(PLACE.server, 0, 0, -2.0)} state="intact" />
            <Dad {...bump} face="dizzy" />
            <BadgePop kind="?" position={on(PLACE.server, -3.1, 2.75, 1.0)} popStart={0.72} t={t} />
          </>
        );
      },
    },
    {
      cue: "2.creeper",
      ...cam.orbit({
        on: on(PLACE.server, -0.55, 1.15, 0.8),
        dist: 5.8,
        distTo: 4.7,
        yaw: 16,
        yawTo: -18,
        pitch: 13,
        fov: 45,
        screenOffset: [0, 0.05],
      }),
      zone: "server",
      note: "Green Creeper creeps in smoothly from left side sneaking right behind Dad before hissing.",
      stage: (t) => {
        const creep = ease(ramp(t, 0, 0.85));
        const cx = -3.1 + creep * 2.45;
        const fuse = ease(ramp(t, 0.5, 1.3));
        return (
          <>
            <StarterHouse position={on(PLACE.server, 0, 0, -2.0)} state="intact" />
            <Dad position={on(PLACE.server, 0.15, 0, 1.15)} rotationY={0.2} animation="lookAround" face="fear" badge="!" badgePopStart={0.65} time={t} />
            <Creeper position={on(PLACE.server, cx, 0, 0.45)} rotationY={Math.PI * 0.45} fuse={fuse * 0.85} />
          </>
        );
      },
    },
    {
      cue: "2.boom",
      ...cam.push({
        on: on(PLACE.server, -0.4, 1.25, 0.6),
        dist: 6.4,
        to: 5.2,
        yaw: -14,
        pitch: 15,
        fov: 48,
        screenOffset: [0, 0.04],
      }),
      impacts: [{ at: boomWord, amp: 0.045, dur: 0.35 }],
      zone: "server",
      note: "Creeper explodes: Dad disappears into white Minecraft death smoke puffs as crater opens StarterHouse.",
      stage: (t) => {
        const blown = t >= boomWord;
        return (
          <>
            <StarterHouse position={on(PLACE.server, 0, 0, -2.0)} state={blown ? "crater" : "intact"} />
            {!blown ? (
              <>
                <Creeper position={on(PLACE.server, -0.6, 0, 0.45)} rotationY={Math.PI * 0.45} fuse={1} />
                <Dad position={on(PLACE.server, 0.45, 0, 1.25)} rotationY={0.25} animation="panic" face="fear" time={t} />
              </>
            ) : (
              <>
                <DeathPuff position={on(PLACE.server, 0.45, 0, 1.25)} age={t - boomWord} />
                <Glow position={on(PLACE.server, -0.6, 1.2, 0.2)} size={3.4} color="#ff8e3b" opacity={0.45 * (1 - ramp(t, boomWord, boomWord + 0.6))} />
                <EmberDrift position={on(PLACE.server, -0.5, 0.6, 0.2)} area={[3.4, 2.5, 3.0]} count={26} seed={22} />
                <ChatToast text="Dad blew up by Creeper" position={on(PLACE.server, 0, 2.55, 0.8)} height={0.095 * pop(t, boomWord)} />
              </>
            )}
          </>
        );
      },
    },
    {
      cue: "2.respawn",
      ...cam.truck({
        on: on(PLACE.server, 0, 1.25, 3.4),
        by: [0, 0, -1.6],
        dist: 5.4,
        yaw: 18,
        pitch: 13,
        fov: 45,
        screenOffset: [0, 0.05],
      }),
      zone: "server",
      note: "Respawned Dad walks forward from Spawn path toward Sam's starter lot.",
      stage: (t) => {
        const walk = walkSegment(on(PLACE.server, 0, 0, 5.2), on(PLACE.server, 0.15, 0, 2.2), t, 0, 0.9, {
          gait: "walk",
          endYaw: Math.PI,
        });
        return (
          <>
            <StarterHouse position={on(PLACE.server, 0, 0, -2.0)} state="crater" />
            <Dad {...walk} face="uneasy" />
          </>
        );
      },
    },
    {
      cue: "2.froze",
      ...cam.push({
        on: on(PLACE.server, 0, 1.3, 0.9),
        dist: 5.6,
        to: 4.5,
        yaw: -22,
        pitch: 12,
        fov: 44,
        screenOffset: [0, 0.05],
      }),
      zone: "server",
      note: "Dad stops dead staring in horror at smoking crater where front porch stood.",
      stage: (t) => (
        <>
          <StarterHouse position={on(PLACE.server, 0, 0, -2.0)} state="crater" />
          <Dad position={on(PLACE.server, 0.15, 0, 2.1)} rotationY={Math.PI - 0.15} animation="scared" face="wow" badge="broken" badgePopStart={0.15} time={t} />
          <EmberDrift position={on(PLACE.server, -0.5, 0.5, -0.2)} area={[2.8, 2.0, 2.4]} count={18} seed={27} />
        </>
      ),
    },
  ],
});
