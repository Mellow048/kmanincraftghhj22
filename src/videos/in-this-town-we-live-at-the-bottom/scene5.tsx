import { cam, storyScene, walkSegment } from "../../engine";
import { EAST, Hero, Jar, Mum, NORTH, SOUTH, TOWN_ROBES, Villager, WEST, ease, ramp, rich, room, timing } from "./kit";

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Not for one person",
  shots: [
    {
      cue: "5.mum",
      ...cam.push({ on: room(-1.35, 1.35, -1.9), dist: 4.5, to: 3.8, yaw: 40, pitch: 6, fov: 50, screenOffset: [0, 0.06] }),
      zone: "room",
      look: "warm-room",
      note: "Inside enclosed bedroom: Mum sets savings jar cleanly onto timber shelf as Hero watches from side-front 3/4.",
      stage: (t) => {
        const back = ease(ramp(t, 0.2, 1.15));
        const mumWalk = walkSegment(room(-2.4, 0, -1.9), room(-1.95, 0, -1.95), t, 0.2, 1.1, { endYaw: EAST - 0.35 });
        return (
          <>
            <Mum {...mumWalk} animation={t < 0.2 ? "hold" : mumWalk.animation} face="worried" lookAt={room(-1.8, 1.75, -2.65)} time={t} />
            <Hero position={room(-0.75, 0, -1.85)} rotationY={WEST + 0.85} animation={back < 0.6 ? "reach" : "shrug"} face="frown" headPitch={0.1} time={t} />
            <Jar position={room(-1.1 - back * 0.7, 1.15 + back * 0.42, -1.85 - back * 0.8)} fill={0.45} />
          </>
        );
      },
    },
    {
      cue: "5.old",
      ...cam.orbit({ on: [0.1, 1.55, 9.3], dist: 5.4, distTo: 4.4, yaw: -10, yawTo: 18, pitch: 4, fov: 50, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Elder fisherman in plum robe shakes wide-hatted head on wooden jetty while Hero listens beside water.",
      stage: (t) => (
        <>
          <Villager position={[0.6, 0.5, 9.0]} rotationY={SOUTH} robe={TOWN_ROBES[2]} hmm={0.5 + 0.5 * Math.sin(t * 4)} walk={0} hat="wide" />
          <Hero position={[-0.3, 0.5, 9.8]} rotationY={EAST - 0.3} animation="talk" face="uneasy" time={t} />
        </>
      ),
    },
    {
      cue: "5.two",
      ...cam.orbit({ on: rich(0, 1.25, 2.4), dist: 11.6, distTo: 10.2, yaw: -16, yawTo: 16, pitch: -2, fov: 56 }),
      zone: "bottom",
      look: "overworld-golden",
      note: "High atop the golden Quartz Mansion balcony (y=62m): two wealthy families stroll and wave condescendingly downward.",
      stage: (t) => {
        const wave = Math.sin(t * 4.5);
        const w1 = walkSegment(rich(-2.5, 0, 3.0), rich(-1.6, 0, 3.0), t, 0, 2.2);
        const w2 = walkSegment(rich(2.0, 0, 2.9), rich(1.1, 0, 2.9), t, 0, 2.2);
        return (
          <>
            <Villager position={w1.position} rotationY={w1.rotationY} hat="straw" walk={w1.animDistance} hmm={0.2 * wave} lookAt={rich(0, -18, 18)} robe="#f2f2ee" />
            <Villager position={rich(-0.3, 0, 3.3)} rotationY={SOUTH} arms={{ r: -2.4 + wave * 0.35, l: -0.2 }} kid robe="#e8dfc8" />
            <Villager position={w2.position} rotationY={w2.rotationY} walk={w2.animDistance} lookAt={rich(0, -18, 18)} robe="#3c5070" />
            <Villager position={rich(2.5, 0, 3.3)} rotationY={SOUTH} arms={{ r: -2.3 - wave * 0.35, l: -0.2 }} kid robe="#7a5a44" />
          </>
        );
      },
    },
    {
      cue: "5.more",
      ...cam.push({ on: [0, 1.65, 9.8], dist: 3.8, to: 2.25, yaw: -20, pitch: 2, fov: 36, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Frontal 3/4 push as Hero steps forward on the jetty setting jaw hard with determined expression.",
      stage: (t) => {
        const walk = walkSegment([0, 0.5, 9.4], [0, 0.5, 10.0], t, 0, 0.9, { endYaw: SOUTH });
        return (
          <Hero {...walk} face="brave" headPitch={-0.16} time={t} />
        );
      },
    },
  ],
});
