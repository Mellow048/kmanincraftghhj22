import {
  ChatToast,
  Hero,
  Player,
  SnowGolem,
  cam,
  pop,
  room,
  storyScene,
  timing,
} from "./kit";

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "School Frost & Locked Flint",
  shots: [
    {
      cue: "3.school",
      ...cam.orbit({
        on: [0, 1.1, 2.0],
        dist: 3.9,
        yaw: -14,
        yawTo: 14,
        pitch: 6,
        fov: 40,
      }),
      zone: "town",
      note: "Classmates point and laugh at frost on Hero's sleeves while ChatToast pops Frost Kid.",
      stage: (t) => (
        <>
          <Hero position={[-0.4, 0, 2.0]} rotationY={0.4} animation="shrug" face="uneasy" time={t} />
          <Player who={1} position={[1.0, 0, 1.7]} rotationY={-0.9} animation="laugh" face="laugh" time={t} />
          <Player who={3} position={[1.5, 0, 2.4]} rotationY={-1.3} animation="point" face="grin" time={t} />
          <ChatToast text="Frost Boy!" sender="Kid" position={[0.9, 2.05, 1.8]} height={0.22 * pop(t, 0.35)} />
        </>
      ),
    },
    {
      cue: "3.why",
      ...cam.push({
        on: room(0, 1.1, -1.3),
        dist: 3.1,
        to: 2.55,
        yaw: 12,
        pitch: 6,
        fov: 38,
      }),
      zone: "room",
      note: "Close reaction on Hero glancing sideways at the cold unlit Furnace.",
      stage: (t) => (
        <Hero position={room(0, 0, -1.3)} rotationY={0.25} animation="lookAround" face="sad" lookAt={room(1.8, 0.5, -3.2)} time={t} />
      ),
    },
    {
      cue: "4.dad",
      ...cam.push({
        on: [0, 1.35, 1.3],
        dist: 3.3,
        to: 2.75,
        yaw: -12,
        pitch: 4,
        fov: 40,
      }),
      zone: "town",
      note: "Medium-low shot on Snow Golem Dad standing silent in his carved Pumpkin head.",
      stage: (t) => (
        <SnowGolem position={[0, 0, 1.3]} rotationY={0.15} pumpkin walk={t * 0.15} />
      ),
    },
    {
      cue: "4.mum",
      ...cam.push({
        on: room(0.2, 1.15, -1.4),
        dist: 3.4,
        to: 2.8,
        yaw: 18,
        pitch: 8,
        fov: 40,
      }),
      zone: "room",
      note: "Snow Golem Mum reaches out calmly to keep flint away from Hero.",
      stage: (t) => (
        <>
          <SnowGolem position={room(0.7, 0, -1.8)} rotationY={-0.6} pumpkin armThrow={0.4 * Math.sin(t * 2)} />
          <Hero position={room(-0.5, 0, -1.2)} rotationY={0.8} animation="reach" face="worried" time={t} />
        </>
      ),
    },
  ],
});
