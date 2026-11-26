import { cam, storyScene } from "../../engine";
import { EAST, Healer, Hero, Mum, NORTH, SOUTH, WEST, ease, ramp, room, timing } from "./kit";

export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "She pointed up",
  shots: [
    {
      cue: "8.where",
      ...cam.ots({ speaker: room(-0.3, 1.1, -1.5), listener: room(0.9, 1.3, -1.3), back: 1.85, push: 0.78 }),
      zone: "room",
      look: "warm-room",
      note: "OTS onto Healer shaking head while Hero urgently pleads forward.",
      stage: (t) => {
        const step = ease(ramp(t, 0, 1.0));
        return (
          <>
            <Hero position={room(-0.35, 0, -1.5)} rotationY={EAST} animation="talk" face="uneasy" headPitch={-0.1} time={t} />
            <Healer position={room(0.95, 0, -1.3)} rotationY={WEST} hmm={0.3 + 0.5 * step} lookAt={room(-0.3, 1.4, -1.5)} />
          </>
        );
      },
    },
    {
      cue: "8.point",
      ...cam.push({ on: room(0.85, 1.65, -1.35), dist: 3.8, to: 2.45, yaw: 14, pitch: -8, fov: 36, screenOffset: [0, 0.08] }),
      zone: "room",
      look: "warm-room",
      note: "Healer raises hand firmly pointing directly through mountain-view window pane.",
      stage: (t) => {
        const lift = ease(ramp(t, 0.1, 0.9));
        return (
          <>
            <Healer position={room(0.9, 0, -1.3)} rotationY={WEST + lift * 0.3} strain={0.4 + lift * 0.5} lookAt={room(0, 3, -2.9)} />
            <Hero position={room(-0.2, 0, -1.45)} rotationY={EAST} animation="lookAround" lookAt={room(0, 3, -2.9)} face="wow" time={t} />
          </>
        );
      },
    },
    {
      cue: "8.decide",
      ...cam.crane({ on: [0, 1.5, -8.8], onTo: [0, 2.3, -9.8], dist: 5.4, toDist: 3.8, yaw: 72, fromPitch: 10, toPitch: -4, fov: 46, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "Side-front view in pouring rain: determined Hero turns toward Mountain Entrance Gate as Mum watches worriedly.",
      stage: (t) => {
        const step = ease(ramp(t, 0, 1.5));
        return (
          <>
            <Hero position={[0, 0, -8.2 + step * 1.1]} rotationY={SOUTH} animation="walk" animDistance={step * 1.2} face="brave" headPitch={-0.12} time={t} />
            <Mum position={[1.4, 0, -8.4]} rotationY={-0.3} animation="cower" face="crying" headPitch={0.2} time={t} />
          </>
        );
      },
    },
  ],
});
