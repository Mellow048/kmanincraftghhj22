import {
  ChatToast,
  Hero,
  Player,
  SnowGolem,
  Snowball,
  cam,
  pop,
  room,
  storyScene,
  timing,
} from "./kit";

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "School Frost, Sneeze Gag & Pumpkin Grin",
  shots: [
    {
      cue: "3.school",
      ...cam.orbit({
        on: [-3.2, 1.15, 0.2],
        dist: 4.4,
        yaw: -14,
        yawTo: 10,
        pitch: 7,
        fov: 40,
        screenOffset: [0, 0.08],
      }),
      zone: "town",
      note: "Unobstructed west village path beside cobble Hut, Well & Fence: Hero teased by classmates with zero pillar occlusion.",
      stage: (t) => (
        <>
          <Hero position={[-3.25, 0, 1.05]} rotationY={0.22} animation="shrug" face="uneasy" time={t} />
          <Player who={1} position={[-2.65, 0, -0.15]} rotationY={-0.35} animation="laugh" face="laugh" time={t} />
          <Player who={3} position={[-3.75, 0, -0.35]} rotationY={0.3} animation="point" face="grin" time={t} />
          <ChatToast text="Ice Kid!" sender="Kid" position={[-3.2, 2.08, 0.4]} height={0.12 * pop(t, 0.2)} />
        </>
      ),
    },
    {
      cue: "3.chill",
      ...cam.push({
        on: [-3.25, 1.15, 1.05],
        dist: 2.35,
        to: 1.85,
        yaw: 14,
        pitch: 4,
        fov: 38,
        screenOffset: [0, 0.1],
      }),
      zone: "town",
      note: "Close reaction push on Hero shivering beside village Fence and cobble cottage.",
      stage: (t) => (
        <Hero position={[-3.25, 0, 1.05]} rotationY={0.25} animation="cower" face="ouch" time={t} />
      ),
    },
    {
      cue: "3.sneeze",
      ...cam.push({
        on: [-0.2, 1.25, 1.4],
        dist: 3.4,
        to: 2.8,
        yaw: -14,
        pitch: 5,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      zone: "town",
      note: "Snow Golem Dad winds up violently before letting out a massive sneeze.",
      stage: (t) => (
        <SnowGolem position={[-0.2, 0, 1.4]} rotationY={0.75} pumpkin armThrow={-0.35 - Math.sin(t * 7) * 0.25} walk={t * 0.2} />
      ),
    },
    {
      cue: "3.ball",
      ...cam.pan({
        from: [0.2, 1.35, 4.4],
        on: [-0.1, 1.2, 1.4],
        onTo: [1.5, 1.0, 1.4],
        fov: 40,
        screenOffset: [0, 0.1],
      }),
      zone: "town",
      note: "Pan across the cobblestone yard following Dad's launched Snowball past a ducking neighbor.",
      stage: (t) => {
        const fly = t * 4.4;
        return (
          <>
            <SnowGolem position={[-0.35, 0, 1.4]} rotationY={Math.PI / 2} pumpkin armThrow={-1.1} />
            <Snowball position={[0.15 + fly, 1.35 - t * 0.35, 1.4]} scale={1.15} />
            <Player who={6} position={[1.45, 0, 1.0]} rotationY={-0.8} animation="crouch" face="wow" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.dad",
      ...cam.push({
        on: [0, 1.2, -3.2],
        dist: 3.7,
        to: 3.1,
        yaw: -14,
        pitch: 5,
        fov: 40,
        screenOffset: [0, 0.1],
      }),
      zone: "town",
      note: "Doorstep family portrait right in front of Hero's blue-roof Hut and Bell.",
      stage: (t) => (
        <>
          <SnowGolem position={[-0.36, 0, -3.3]} rotationY={0.12} pumpkin walk={t * 0.12} />
          <Hero position={[0.36, 0, -3.1]} rotationY={-0.1} animation="idle" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "4.mask",
      ...cam.push({
        on: [0, 1.45, 1.3],
        dist: 2.6,
        to: 2.1,
        yaw: 10,
        pitch: 3,
        fov: 38,
        screenOffset: [0, 0.12],
      }),
      zone: "town",
      note: "Tight push onto Dad's carved orange pumpkin head right before the reveal.",
      stage: (t) => (
        <SnowGolem position={[0, 0, 1.3]} rotationY={0.1 + Math.sin(t * 2) * 0.08} pumpkin walk={t * 0.2} />
      ),
    },
    {
      cue: "4.photo",
      ...cam.push({
        on: [0.1, 1.35, 1.3],
        dist: 2.8,
        to: 2.25,
        yaw: -8,
        pitch: 4,
        fov: 38,
        screenOffset: [0, 0.12],
      }),
      zone: "town",
      note: "Pumpkin-off reveal showing Dad's goofy derpy snowman grin beside laughing Hero.",
      stage: (t) => (
        <>
          <SnowGolem position={[-0.22, 0, 1.3]} rotationY={0.15} pumpkin={false} walk={t * 0.18} />
          <Hero position={[0.45, 0, 1.55]} rotationY={-0.25} animation="laugh" face="laugh" time={t} />
        </>
      ),
    },
    {
      cue: "4.mum",
      ...cam.push({
        on: room(-0.1, 1.05, -0.7),
        dist: 3.3,
        to: 2.8,
        yaw: 18,
        pitch: 8,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      zone: "room",
      note: "Inside the cool plank house: Hero reaches out begging Mum for a warm fire.",
      stage: (t) => (
        <>
          <SnowGolem position={room(0.4, 0, -1.1)} rotationY={-0.55} pumpkin armThrow={0.35 * Math.sin(t * 2.5)} />
          <Hero position={room(-0.45, 0, -0.45)} rotationY={0.75} animation="reach" face="frown" time={t} />
        </>
      ),
    },
    {
      cue: "4.lock",
      ...cam.push({
        on: room(0.35, 1.25, -1.1),
        dist: 2.35,
        to: 1.9,
        yaw: -12,
        pitch: 4,
        fov: 38,
        screenOffset: [0, 0.12],
      }),
      zone: "room",
      note: "Close shot of Snow Golem Mum firmly shaking her carved pumpkin head NO.",
      stage: (t) => (
        <SnowGolem position={room(0.35, 0, -1.1)} rotationY={-0.35 + Math.sin(t * 7) * 0.26} pumpkin armThrow={-0.4} />
      ),
    },
  ],
});
