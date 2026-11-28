import {
  Dad,
  Leo,
  PLACE,
  Player,
  WaterBucket,
  at,
  cam,
  ease,
  moveBetween,
  ramp,
  storyScene,
  timing,
} from "./kit";

const V = PLACE.village;
const H = PLACE.home;

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Bucket Boy & Dad's Planted Clues",
  shots: [
    {
      cue: "3.mock",
      ...cam.twoShot({ a: at(V, -7.8, 0, 6.2), b: at(V, -5.2, 0, 6.2), facing: 0, dist: 5.4, height: 1.5, fov: 44 }),
      zone: "village",
      hud: { chat: [{ sender: "Bully", text: "Haha look, Bucket Boy!", color: "#ffdd57" }] },
      note: "School kids point and laugh at Leo holding his blue Water Bucket outside the schoolhouse.",
      stage: (t) => (
        <>
          <Leo position={at(V, -5.2, 0, 6.2)} rotationY={-0.6} animation="idle" face="sad" time={t}>
            <WaterBucket position={[0, -0.06, 0.22]} scale={1.0} />
          </Leo>
          <Player who={1} scale={0.82} position={at(V, -7.2, 0, 6.0)} rotationY={1.1} animation="point" face="grin" time={t} />
          <Player who={3} scale={0.82} position={at(V, -8.3, 0, 6.6)} rotationY={1.0} animation="cheer" face="grin" time={t + 0.3} />
        </>
      ),
    },
    {
      cue: "3.step",
      ...cam.track({
        from: at(V, -6.9, 2.5, 2.2),
        to: at(V, -6.9, 0, 5.2),
        sideDist: 5.4,
        lead: 0.8,
        height: 1.6,
        fov: 44,
      }),
      zone: "village",
      note: "Leo walks carefully step-by-step down the wooden school stairs clutching his Water Bucket.",
      stage: (t) => {
        const s = ease(ramp(t, 0, 1.55));
        return (
          <Leo
            position={at(V, -6.9, 2.5 * (1 - s), 2.2 + s * 3.0)}
            rotationY={0}
            animation="walk"
            animDistance={s * 3.8}
            face="neutral"
            time={t}
          >
            <WaterBucket position={[0, -0.06, 0.22]} scale={1.0} />
          </Leo>
        );
      },
    },
    {
      cue: "3.dad",
      ...cam.twoShot({ a: at(H, -1.9, 1.0, 0.6), b: at(H, -0.5, 0.5, 1.2), dist: 5.0, height: 1.7, fov: 44 }),
      zone: "home",
      look: "warm-room",
      note: "Inside home, Dad walks down the wooden stairs right beside Leo with zero Totem.",
      stage: (t) => {
        const s = ease(ramp(t, 0, 1.5));
        return (
          <>
            <Leo
              position={at(H, -1.9, 1.8 * (1 - s), -0.4 + s * 2.2)}
              rotationY={0.2}
              animation="walk"
              animDistance={s * 2.6}
              face="smile"
              time={t}
            />
            <Dad
              position={at(H, -0.5, 0.9 * (1 - s), 0.2 + s * 1.8)}
              rotationY={-0.15}
              animation="walk"
              animDistance={s * 2.1}
              face="smile"
              time={t + 0.2}
            />
          </>
        );
      },
    },
    {
      cue: "3.hand",
      ...cam.front({ actor: at(H, -1.4, 0, 2.0), dist: 4.2, fov: 40, screenOffset: [0, 0.06] }),
      zone: "home",
      look: "warm-room",
      note: "Planted Clue #1: Close front shot on Dad holding up his white-bandaged left hand with no Totem.",
      stage: (t) => (
        <Dad position={at(H, -1.4, 0, 2.0)} rotationY={0.2} animation="wave" face="smile" time={t} />
      ),
    },
    {
      cue: "3.jar",
      ...cam.sweep({ on: at(H, 1.0, 2.0, -2.1), dist: 3.4, fromYaw: -22, toYaw: 20, pitch: 12, fov: 38 }),
      zone: "home",
      look: "warm-room",
      note: "Planted Clue #2: Slow parallax sweep past the glass jar on the shelf holding the cracked gold Totem wing.",
      stage: (t) => (
        <Leo
          position={at(H, 0.4, 0, -0.5)}
          rotationY={Math.PI}
          animation="idle"
          face="uneasy"
          lookAt={at(H, 1.0, 2.0, -2.1)}
          time={t}
        />
      ),
    },
    {
      cue: "3.never",
      ...cam.twoShot({ a: at(H, -1.2, 0, -0.8), b: at(H, 0.3, 0, -1.5), facing: 0, dist: 4.8, height: 1.5, fov: 42 }),
      zone: "home",
      look: "warm-room",
      note: "Dad gently walks past the shelf, patting Leo's shoulder without explaining the glass jar.",
      stage: (t) => {
        const w = moveBetween(at(H, -1.8, 0, -0.8), at(H, -0.7, 0, 1.1), t, 0, 1.4);
        return (
          <>
            <Leo position={at(H, 0.5, 0, -1.5)} rotationY={-0.8} animation="idle" face="uneasy" time={t} />
            <Dad
              position={w.position}
              rotationY={w.rotationY}
              animation="walk"
              animDistance={w.animDistance}
              face="neutral"
              time={t}
            />
          </>
        );
      },
    },
  ],
});
