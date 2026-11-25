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
  title: "School Frost, Sneeze Gag & Pumpkin Secret",
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
      note: "Kids laugh at frost on Hero's jacket while ChatToast pops Frost Boy.",
      stage: (t) => (
        <>
          <Hero position={[-0.4, 0, 2.0]} rotationY={0.4} animation="shrug" face="uneasy" time={t} />
          <Player who={1} position={[1.0, 0, 1.7]} rotationY={-0.9} animation="laugh" face="laugh" time={t} />
          <Player who={3} position={[1.5, 0, 2.4]} rotationY={-1.3} animation="point" face="grin" time={t} />
          <ChatToast text="Ice Biome Kid!" sender="Kid" position={[0.9, 2.05, 1.8]} height={0.22 * pop(t, 0.35)} />
        </>
      ),
    },
    {
      cue: "3.sneeze",
      ...cam.push({
        on: [0.3, 1.15, 1.4],
        dist: 3.7,
        to: 3.1,
        yaw: 12,
        pitch: 7,
        fov: 40,
      }),
      zone: "town",
      note: "Vanilla Snow Golem comedy gag: Dad sneezes and launches a flying Snowball across the fence.",
      stage: (t) => {
        const fly = Math.max(0, t - 0.55);
        return (
          <>
            <SnowGolem position={[-0.4, 0, 1.4]} rotationY={Math.PI / 2} pumpkin armThrow={fly > 0 ? -1.1 : 0} />
            {fly > 0 ? <Snowball position={[0.1 + fly * 4.5, 1.25 - fly * 0.4, 1.4]} /> : null}
          </>
        );
      },
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
      note: "Family photo framing: stiff Snow Golem Dad in his carved pumpkin beside Hero.",
      stage: (t) => (
        <>
          <SnowGolem position={[-0.45, 0, 1.3]} rotationY={0.12} pumpkin walk={t * 0.1} />
          <Hero position={[0.45, 0, 1.4]} rotationY={-0.1} animation="idle" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "4.photo",
      ...cam.push({
        on: [0, 1.5, 1.3],
        dist: 2.5,
        to: 2.0,
        yaw: 10,
        pitch: 2,
        fov: 38,
      }),
      zone: "town",
      note: "Goofy pumpkin-off reveal showing Dad's signature derpy snowman smile underneath.",
      stage: (t) => <SnowGolem position={[0, 0, 1.3]} rotationY={0.1} pumpkin={t < 0.55} walk={t * 0.15} />,
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
      note: "Mum gently refuses flint while Hero begs for a warm fire.",
      stage: (t) => (
        <>
          <SnowGolem position={room(0.7, 0, -1.8)} rotationY={-0.6} pumpkin armThrow={0.4 * Math.sin(t * 2)} />
          <Hero position={room(-0.5, 0, -1.2)} rotationY={0.8} animation="reach" face="worried" time={t} />
        </>
      ),
    },
  ],
});
