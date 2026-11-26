import { cam, storyScene, walkSegment } from "../../engine";
import { EAST, Friend, Gate, Healer, Hero, NORTH, WEST, ease, ramp, room, timing } from "./kit";

export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "She pointed up",
  shots: [
    {
      cue: "8.where",
      ...cam.ots({ speaker: room(-0.35, 1.1, -1.5), listener: room(0.9, 1.3, -1.3), back: 2.45, push: 0.65, fov: 48 }),
      zone: "room",
      look: "warm-room",
      note: "OTS onto Healer while Hero urgently pleads forward.",
      stage: (t) => {
        const step = ease(ramp(t, 0, 1.0));
        return (
          <>
            <Hero position={room(-0.35, 0, -1.5)} rotationY={EAST} animation="talk" face="uneasy" headPitch={-0.1} time={t} />
            <Healer position={room(0.95, 0, -1.3)} rotationY={WEST} hmm={0.3 + 0.5 * step} lookAt={room(-0.35, 1.4, -1.5)} />
          </>
        );
      },
    },
    {
      cue: "8.point",
      ...cam.push({ on: room(0.06, 1.45, -1.4), dist: 4.5, to: 3.9, yaw: 8, pitch: 4, fov: 53, screenOffset: [0, 0.04] }),
      zone: "room",
      look: "warm-room",
      note: "Inside ceiling-enclosed room, Healer smoothly tilts head upward and raises pointing arm without shiver.",
      stage: (t) => {
        const lift = ease(ramp(t, 0.1, 0.85));
        return (
          <>
            <Healer
              position={room(0.52, 0, -1.35)}
              rotationY={WEST - 0.15}
              nod={-0.55 * lift}
              turn={-0.15 * lift}
              arms={{ r: -2.85 * lift - 0.25, l: -0.22 }}
            />
            <Hero position={room(-0.4, 0, -1.45)} rotationY={EAST} animation="lookAround" headPitch={-0.45 * lift} face="wow" time={t} />
          </>
        );
      },
    },
    {
      cue: "8.decide",
      ...cam.crane({ on: [0.4, 1.4, -7.8], onTo: [0.4, 2.0, -8.6], dist: 6.4, toDist: 5.2, yaw: 56, fromPitch: 10, toPitch: -2, fov: 48, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "Side-front view in pouring rain: determined Hero marches NORTH toward the mountain gate as Friend watches from the lane.",
      stage: (t) => {
        const heroWalk = walkSegment([0, 0, -7.2], [0, 0, -8.8], t, 0, 1.4, { endYaw: NORTH });
        return (
          <>
            <Gate position={[0, 0, -10.8]} open={0} />
            <Hero {...heroWalk} face="brave" headPitch={-0.14} time={t} />
            <Friend position={[1.5, 0, -7.6]} rotationY={WEST + 0.3} animation="lookAround" face="worried" lookAt={[0, 1.1, -8.8]} time={t} />
          </>
        );
      },
    },
  ],
});
