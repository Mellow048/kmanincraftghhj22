import {
  BerryPlate,
  Block,
  EmberDrift,
  FloatingNumber,
  Hero,
  Player,
  SnowGolem,
  SnowTrail,
  Snowball,
  cam,
  ease,
  jolt,
  pop,
  ramp,
  room,
  storyScene,
  timing,
  wordAt,
} from "./kit";

const coldSlap = wordAt("2.cold", "zero");
const trailSlip = wordAt("1.snow", "trails");

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Snow Trails & Freezing House",
  shots: [
    {
      cue: "1.town",
      ...cam.truck({
        on: [0.1, 1.15, 0.0],
        by: [0, 0, 2.25],
        dist: 3.9,
        yaw: 16,
        pitch: 8,
        fov: 40,
        screenOffset: [0, 0.08],
      }),
      zone: "town",
      note: "Hero walks briskly toward camera down the snow-dusted square while shaking his head over unlit houses and walking Snow Golem parents.",
      stage: (t) => {
        const stop = ease(ramp(t, 0.0, 1.35));
        const shake = wordAt("1.town", "nobody");
        return (
          <>
            <Hero
              position={[0.1, 0, -0.15 + stop * 2.05]}
              rotationY={0.12}
              animation="walk"
              blendTo="point"
              blend={1 - ease(ramp(t, shake - 0.1, shake + 0.35))}
              animDistance={stop * 2.15}
              face={t > shake ? "frown" : "uneasy"}
              headYaw={t > shake ? Math.sin((t - shake) * 14) * 0.42 : 0}
              time={t}
            />
            <SnowGolem position={[-1.05 + t * 0.35, 0, -1.25 + t * 0.5]} rotationY={0.35} pumpkin walk={t * 1.4} />
            <SnowGolem position={[1.15 - t * 0.28, 0, -1.55 + t * 0.45]} rotationY={-0.3} pumpkin walk={t * 1.35 + 0.4} />
            <Player who={2} scale={0.8} position={[-2.9 + t * 0.9, 0, 0.6]} rotationY={Math.PI / 2} animation="walk" animDistance={t * 1.4} face="neutral" />
          </>
        );
      },
    },
    {
      cue: "1.trail",
      ...cam.orbit({
        on: [0, 1.05, -2.0],
        onTo: [0, 1.05, -0.5],
        dist: 4.9,
        distTo: 3.4,
        yaw: -32,
        yawTo: 24,
        pitch: 12,
        fov: 42,
        screenOffset: [0, 0.1],
      }),
      zone: "town",
      note: "Both Snow Golem parents stride side-by-side from their doorway across the square while Hero jogs beside them.",
      stage: (t) => {
        const d = ease(ramp(t, 0, 1.65));
        const trail = [
          [-0.65, 0.06, -2.1] as [number, number, number],
          [-0.65, 0.06, -1.2] as [number, number, number],
          [0.65, 0.06, -2.0] as [number, number, number],
          [0.65, 0.06, -1.1] as [number, number, number],
        ].slice(0, Math.max(1, Math.ceil(d * 4)));
        return (
          <>
            <SnowTrail points={trail} />
            <SnowGolem position={[-0.65, 0, -2.2 + d * 1.7]} rotationY={0} pumpkin walk={t * 2.2} />
            <SnowGolem position={[0.65, 0, -2.4 + d * 1.65]} rotationY={0} pumpkin walk={t * 2.1 + 0.5} />
            <Hero position={[-1.45 + d * 0.3, 0, -2.0 + d * 1.5]} rotationY={0.45} animation="run" animDistance={d * 1.8} face="grin" lookAt={[0, 1.3, -1.2 + d * 1.6]} />
          </>
        );
      },
    },
    {
      cue: "1.snow",
      ...cam.truck({
        on: [-0.9, 0.55, 1.25],
        by: [2.2, 0, 0.15],
        dist: 3.6,
        yaw: 16,
        pitch: 18,
        fov: 42,
        screenOffset: [0, 0.08],
      }),
      impacts: [{ at: trailSlip, amp: 0.02, dur: 0.25 }],
      zone: "town",
      note: "Low tracking shot beside Dad & Hero running across lawn as crisp white SnowTrail patches stamp live beneath Dad's steps and Hero slips.",
      stage: (t) => {
        const prog = ease(ramp(t, 0, 1.6));
        const x = -1.35 + prog * 2.6;
        const slip = jolt(t, trailSlip, 0.22);
        const stamped = (
          [
            [-1.3, 0.06, 1.3],
            [-0.45, 0.06, 1.3],
            [0.4, 0.06, 1.3],
            [1.25, 0.06, 1.3],
          ] as Array<[number, number, number]>
        ).filter((_, i) => prog * 3.8 >= i);
        return (
          <>
            <SnowTrail points={stamped} />
            <SnowGolem position={[x, 0, 1.25]} rotationY={Math.PI / 2} pumpkin walk={t * 2.4} />
            <Hero
              position={[x - 0.85, slip * 0.5, 1.6]}
              rotationY={Math.PI / 2}
              animation={t > trailSlip && t < trailSlip + 0.45 ? "fall" : "walk"}
              animDistance={prog * 2.4}
              face={t > trailSlip ? "wow" : "uneasy"}
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "2.cold",
      ...cam.push({
        on: room(-0.1, 1.0, -1.3),
        dist: 4.4,
        to: 2.65,
        yaw: 22,
        pitch: 10,
        fov: 40,
        screenOffset: [0, 0.06],
      }),
      impacts: [{ at: coldSlap, amp: 0.022, dur: 0.24 }],
      zone: "room",
      note: "Hero marches up to the dark unlit kitchen furnace, slams his fist onto cold stone with 0 HEAT rising, and shivers violently.",
      stage: (t) => {
        const reach = ease(ramp(t, 0, Math.max(0.25, coldSlap)));
        return (
          <>
            <Hero
              position={room(-0.75 + reach * 0.4, 0, -0.55 - reach * 0.55)}
              rotationY={0.75}
              animation={t < coldSlap ? "walk" : t < coldSlap + 0.45 ? "press" : "cower"}
              animDistance={reach * 0.85}
              face={t < coldSlap ? "uneasy" : "ouch"}
              time={t}
            />
            <FloatingNumber
              text="0 HEAT"
              color="#66c8ff"
              position={room(0.2, 1.48 + Math.max(0, t - coldSlap) * 0.3, -1.7)}
              height={0.24 * pop(t, coldSlap)}
            />
          </>
        );
      },
    },
    {
      cue: "2.dark",
      ...cam.whip({
        from: room(0.3, 1.35, 1.8),
        on: room(-1.4, 1.05, -1.5),
        onTo: room(0.45, 0.9, -1.75),
        fov: 42,
        ease: "inOutSine",
      }),
      screenOffset: [0, 0.08],
      zone: "room",
      note: "Fast whip-pan from dark unlit wall sconces to cold stone furnace as Hero paces across checking empty dark corners.",
      stage: (t) => {
        const pace = ease(ramp(t, 0.05, 1.6));
        return (
          <>
            <Hero
              position={room(-1.1 + pace * 0.85, 0, -0.8 - Math.sin(pace * Math.PI) * 0.35)}
              rotationY={1.35}
              animation={pace < 0.7 ? "walk" : "reach"}
              animDistance={pace * 1.1}
              face="ouch"
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "2.potato",
      ...cam.orbit({
        on: [4.45, 1.05, -0.85],
        dist: 4.3,
        distTo: 2.95,
        yaw: -34,
        yawTo: 18,
        pitch: 10,
        fov: 40,
        screenOffset: [0, 0.1],
      }),
      zone: "town",
      note: "Two excited kids dash up to the red market stall waving golden baked potatoes while warm steam puffs rise.",
      stage: (t) => {
        const dash = ease(ramp(t, 0, 0.85));
        return (
          <>
            <Player who={6} scale={0.8} position={[3.65 + dash * 0.5, 0, -0.35 - dash * 0.35]} rotationY={0.35} animation={dash < 0.85 ? "run" : "cheer"} animDistance={dash * 0.9} face="grin" time={t}>
              <Block position={[0, -0.04, 0.16]} size={[0.18, 0.12, 0.14]} color="#d8943a" />
            </Player>
            <Player who={1} scale={0.8} position={[5.25 - dash * 0.45, 0, -0.55 - dash * 0.4]} rotationY={-0.35} animation={dash < 0.85 ? "walk" : "jump"} animDistance={dash * 0.85} face="smile" time={t}>
              <Block position={[0, -0.04, 0.16]} size={[0.18, 0.12, 0.14]} color="#e09e42" />
            </Player>
            <EmberDrift position={[4.45, 1.15, -0.9]} area={[1.4, 1.1, 1.2]} count={14} />
          </>
        );
      },
    },
    {
      cue: "2.food",
      ...cam.top({
        on: room(1.3, 0.85, 0.5),
        height: 2.85,
        to: 1.55,
        spin: [-22, 18],
        fov: 40,
      }),
      impacts: [{ at: wordAt("2.food", "frozen"), amp: 0.02, dur: 0.22 }],
      zone: "room",
      note: "Top-down spin diving into plank table as Hero shoves his cold plate aside and Snowball slams beside frozen berries.",
      stage: (t) => {
        const push = ease(ramp(t, 0.1, 1.3));
        return (
          <>
            <Hero position={room(0.45 + push * 0.2, 0, 0.45)} rotationY={1.4} animation={push < 0.6 ? "reach" : "shrug"} face="frown" time={t} />
            <BerryPlate position={room(1.0 + push * 0.45, 0.8, 0.52)} />
            <Snowball position={room(1.45, 0.92 + jolt(t, wordAt("2.food", "frozen"), 0.25), 0.45)} scale={0.78 + push * 0.12} />
          </>
        );
      },
    },
  ],
});
