import { cam, storyScene, walkSegment } from "../../engine";
import {
  BedBox, Bucket, EAST, FishPile, FishingVillager, Friend, GoldenApple, Hero, Jar, JETTY_CROWD, Mum, NORTH, SOUTH,
  SubscribeSign, TOWN_ROBES, WEST, room, tw, timing,
} from "./kit";
import { Boat } from "./kit";

export const scene18 = storyScene(timing, {
  id: "scene18",
  title: "The label came off",
  shots: [
    {
      cue: "18.ate",
      ...cam.orbit({ on: room(-0.35, 1.05, -0.65), dist: 3.6, distTo: 3.25, yaw: 18, yawTo: 34, pitch: 6, fov: 60, screenOffset: [0, 0.06] }),
      zone: "room",
      look: "warm-room",
      note: "Mum sits flush on BedBox foot edge (shins clear) holding GoldenApple cleanly in hand while Hero walks up beside bed uncropped.",
      stage: (t) => {
        const heroWalk = walkSegment(room(-1.12, 0, -0.5), room(-0.92, 0, -0.5), t, 0, 0.85, { endYaw: EAST + 0.15 });
        return (
          <>
            <BedBox position={room(0, 0, -1.8)} />
            <Mum position={room(0.25, 0.14, -0.72)} rotationY={SOUTH - 0.25} animation="sit" face={t > 1.0 ? "smile" : "sleepy"} time={t}>
              <GoldenApple position={[0, -0.02, 0.08]} scale={t < 0.7 ? 0.9 : 0.45} rotationY={t * 1.4} />
            </Mum>
            <Hero {...heroWalk} animation={t < 0.85 ? heroWalk.animation : "cheer"} face="smile" time={t} />
          </>
        );
      },
    },
    {
      cue: "18.ate",
      cut: 1.5,
      ...cam.orbit({ on: room(-0.35, 1.05, -0.65), dist: 3.55, distTo: 3.2, yaw: 32, yawTo: 16, pitch: 4, fov: 60, screenOffset: [0, 0.06] }),
      zone: "room",
      look: "warm-room",
      note: "BedBox preserved in frame: recovered Mum sits cleanly on foot edge talking/cheering with uncropped Hero clear of BedBox.",
      stage: (t) => (
        <>
          <BedBox position={room(0, 0, -1.8)} />
          <Mum position={room(0.25, 0.14, -0.72)} rotationY={SOUTH - 0.25} animation="sit" arms="talk" face="smile" headPitch={0.05} time={t * 1.3} />
          <Hero position={room(-0.92, 0, -0.5)} rotationY={EAST + 0.15} animation="laugh" face="laugh" time={t} />
        </>
      ),
    },
    {
      cue: "18.jar",
      ...cam.orbit({ on: room(-1.05, 1.25, -1.65), dist: 4.3, distTo: 3.5, yaw: 34, yawTo: 44, pitch: 4, fov: 52, screenOffset: [0, 0.04] }),
      zone: "room",
      look: "warm-room",
      note: "Side-front 3/4 view inside room: full emerald jar rests flush on shelf while Hero and seated Mum smile toward it.",
      stage: (t) => (
        <>
          <BedBox position={room(0, 0, -1.8)} />
          <Mum position={room(-0.15, 0.14, -0.72)} rotationY={SOUTH - 0.35} animation="sit" face="smile" time={t} />
          <Jar position={room(-1.75, 1.57, -2.65)} fill={1} label={1} />
          <Hero position={room(-2.22, 0, -1.98)} rotationY={EAST - 0.35} animation="lookAround" lookAt={room(-1.75, 1.78, -2.65)} face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "18.label",
      ...cam.orbit({ on: room(-2.0, 1.48, -2.35), dist: 4.0, distTo: 3.4, yaw: 24, yawTo: 42, pitch: 4, fov: 50, screenOffset: [0, 0.06] }),
      zone: "room",
      look: "warm-room",
      note: "Side-front 3/4 view: Hero reaches right beside shelf peeling the cohesive paper+text label cleanly off the jar.",
      stage: (t) => (
        <>
          <Jar position={room(-1.75, 1.57, -2.65)} fill={1} label={1 - tw(t, 0.35, 1.25)} />
          <Hero position={room(-2.22, 0, -2.05)} rotationY={EAST - 0.3} animation="reach" lookAt={room(-1.75, 1.78, -2.65)} face="calm" time={t} />
        </>
      ),
    },
    {
      cue: "18.sub",
      ...cam.crane({ on: [1.8, 1.9, 11.6], onTo: [1.5, 2.35, 9.6], dist: 14.4, toDist: 16.0, yaw: 4, fromPitch: 4, toPitch: 14, fov: 58, screenOffset: [0, 0.02] }),
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-golden",
      note: "Prominent unobstructed SubscribeSign floating cleanly above waving Hero & cheering Mum without overlap, backed by morning fishing crowd.",
      stage: (t) => (
        <>
          <Hero position={[-0.52, 0.5, 11.4]} rotationY={SOUTH} animation="wave" face="grin" time={t * 1.3} />
          <Mum position={[0.58, 0.5, 11.6]} rotationY={SOUTH} animation="cheer" face="smile" time={t * 1.2} />
          <SubscribeSign position={[0.05, 3.58 + Math.sin(t * 3) * 0.04, 11.5]} scale={0.76} />
          <Friend position={[0.15, 0.5, 9.0]} rotationY={SOUTH + 0.25} animation="cheer" face="grin" time={t * 1.3} />
          {JETTY_CROWD.slice(0, 4).map(([x, z], i) => (
            <FishingVillager
              key={i}
              position={[x, 0.5, z]}
              rotationY={x < 0 ? WEST + 0.15 : EAST - 0.15}
              robe={TOWN_ROBES[i % TOWN_ROBES.length]}
              kid={i % 3 === 0}
              bend={0.3 + Math.sin(t * 4 + i) * 0.1}
              phase={i * 0.6}
            />
          ))}
          <Boat position={[3.7, Math.sin(t * 3) * 0.04, 12.2]} bail={0.1} hole={false} />
          <FishPile position={[0.2, 0.52, 10.1]} n={8} seed={4} />
          <Bucket position={[-0.75, 1.0, 10.2]} />
        </>
      ),
    },
  ],
});
