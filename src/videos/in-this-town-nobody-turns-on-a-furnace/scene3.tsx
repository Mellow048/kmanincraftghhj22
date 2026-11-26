import {
  EmberDrift,
  FloatingNumber,
  Hero,
  Smoke,
  SnowGolem,
  cam,
  ease,
  pop,
  ramp,
  storyScene,
  timing,
  wordAt,
} from "./kit";

const hissWord = wordAt("5.hurt", "hissed");
const jumpWord = wordAt("5.jump", "jumped");

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Blacksmith Furnace & Summer Heatwave",
  shots: [
    {
      cue: "5.forge",
      ...cam.truck({
        on: [3.25, 1.05, 1.55],
        by: [1.15, 0, -0.05],
        dist: 3.9,
        yaw: -34,
        pitch: 9,
        fov: 40,
        screenOffset: [0, 0.1],
      }),
      zone: "town",
      note: "Camera tracks briskly beside Dad walking right toward roaring blacksmith furnace beside stone smithy Hut.",
      stage: (t) => {
        const d = ease(ramp(t, 0, 1.5)) * 1.2;
        return <SnowGolem position={[2.75 + d, 0, 1.6]} rotationY={Math.PI / 2} pumpkin walk={d} />;
      },
    },
    {
      cue: "5.near",
      ...cam.push({
        on: [4.2, 0.78, 1.55],
        dist: 2.9,
        to: 1.72,
        yaw: -42,
        pitch: 8,
        fov: 38,
        screenOffset: [0, 0.08],
      }),
      zone: "town",
      note: "Dad steps inches too close to glowing coals as hot embers and white steam spiral up his lower snow block.",
      stage: (t) => {
        const creep = ease(ramp(t, 0, 1.2)) * 0.45;
        return (
          <>
            <SnowGolem position={[3.35 + creep, 0, 1.55]} rotationY={Math.PI / 2} pumpkin walk={creep} melt={creep * 0.12} />
            <EmberDrift position={[4.1, 0.5, 1.55]} area={[1.0, 1.0, 1.0]} count={18} />
            <Smoke position={[3.85, 0.8 + t * 0.35, 1.55]} rise={1.2} count={8} opacity={0.45} />
          </>
        );
      },
    },
    {
      cue: "5.hurt",
      ...cam.orbit({
        on: [3.55, 1.1, 1.6],
        dist: 3.8,
        distTo: 2.75,
        yaw: -32,
        yawTo: 22,
        pitch: 8,
        fov: 38,
        screenOffset: [0, 0.12],
      }),
      impacts: [{ at: hissWord, amp: 0.025, dur: 0.25 }],
      look: "overworld-golden",
      zone: "town",
      note: "Furnace blasts steam as Dad jerks backward shedding mist with bright red -1 HP popping.",
      stage: (t) => {
        const recoil = ease(ramp(t, Math.max(0.15, hissWord - 0.1), hissWord + 0.55));
        const hop = Math.sin(recoil * Math.PI) * 0.28;
        return (
          <>
            <SnowGolem
              position={[3.85 - recoil * 0.95, hop, 1.6]}
              rotationY={Math.PI / 2}
              pumpkin
              melt={0.14 + recoil * 0.12}
              armThrow={-1.1 * recoil}
              walk={recoil * 0.95}
            />
            <Smoke position={[3.6, 1.1 + t * 0.4, 1.6]} rise={1.5} count={10} opacity={0.5} />
            <FloatingNumber text="-1 HP" color="#ff4f42" position={[3.5, 1.95 + recoil * 0.2, 1.6]} height={0.32 * pop(t, hissWord)} />
          </>
        );
      },
    },
    {
      cue: "5.jump",
      ...cam.push({
        on: [2.3, 1.15, 1.9],
        dist: 3.1,
        to: 1.85,
        yaw: 18,
        pitch: 4,
        fov: 38,
        screenOffset: [0, 0.12],
      }),
      impacts: [{ at: jumpWord, amp: 0.022, dur: 0.22 }],
      look: "overworld-golden",
      zone: "town",
      note: "Hero lunges back in shock watching Dad hop hastily clear of the glowing forge behind him.",
      stage: (t) => {
        const leap = ease(ramp(t, 0.1, 1.15));
        return (
          <>
            <Hero
              position={[2.55 - leap * 0.55, Math.sin(leap * Math.PI) * 0.18, 2.0 + leap * 0.25]}
              rotationY={0.55}
              animation={leap < 0.65 ? "panic" : "cower"}
              face="wow"
              time={t * 1.4}
            />
            <SnowGolem position={[3.1 - leap * 0.75, Math.sin(leap * Math.PI) * 0.32, 1.55]} rotationY={-Math.PI / 2} pumpkin walk={leap * 0.75} />
          </>
        );
      },
    },
    {
      cue: "5.heat",
      ...cam.crane({
        on: [-0.2, 1.2, 1.5],
        onTo: [0.45, 1.3, 1.5],
        dist: 4.9,
        toDist: 3.45,
        fromPitch: 4,
        toPitch: 22,
        yaw: -18,
        fov: 42,
        screenOffset: [0, 0.12],
      }),
      look: "overworld-golden",
      zone: "town",
      note: "Hero wipes his forehead walking across scorching cobbles as golden HEATWAVE surges overhead.",
      stage: (t) => {
        const walk = ease(ramp(t, 0, 1.4));
        return (
          <>
            <Hero position={[-0.45 + walk * 0.9, 0, 1.5]} rotationY={0.35} animation="stagger" animDistance={walk * 1.1} face="ouch" time={t} />
            <FloatingNumber text="HEATWAVE" color="#ff8e2b" position={[0.1, 2.0 + walk * 0.35, 1.5]} height={0.32 * pop(t, 0.15)} />
            <EmberDrift position={[0, 1.6, 1.5]} area={[4, 2.5, 4]} count={18} />
          </>
        );
      },
    },
    {
      cue: "5.dry",
      ...cam.push({
        on: [0.1, 1.3, 1.5],
        dist: 3.2,
        to: 1.9,
        yaw: 18,
        pitch: 4,
        fov: 38,
        screenOffset: [0, 0.12],
      }),
      look: "overworld-golden",
      zone: "town",
      note: "Hero whips around glaring nervously at crackling dry leaves overhead before snapping back toward bakery.",
      stage: (t) => {
        const turn = ease(ramp(t, 0.2, 1.0));
        return (
          <>
            <Hero
              position={[0.25 - turn * 0.35, 0, 1.5]}
              rotationY={0.4 - turn * 1.1}
              animation={turn > 0.5 ? "point" : "lookAround"}
              face={turn > 0.45 ? "fear" : "ouch"}
              time={t}
            />
            <EmberDrift position={[0, 2.2, 1.4]} area={[2.4, 1.6, 2.4]} count={14} />
          </>
        );
      },
    },
  ],
});
