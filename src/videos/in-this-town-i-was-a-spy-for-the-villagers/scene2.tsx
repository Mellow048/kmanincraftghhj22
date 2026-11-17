import { cam, storyScene } from "../../engine";
import { Bits, Bush, Coat, FireLight, Gate, Hero, NORTH, O, Pillager, SOUTH, WEST, Word, cueLen, posed, timing, tw, w } from "./kit";

/** 02 — In at night: the sleeping guard, the washing line, the ash. */
const GRAB = w("4.clothes", "grabbed");
const ASHCUT = w("5.ash", "ash") + 0.25;
const GUARD = O(1.9, 0, 15.3);
const Guard = ({ t }: { t: number }) => (
  <>
    <Pillager position={GUARD} rotationY={SOUTH} crossbow armR={-0.3} nod={0.55 + Math.sin(t * 1.6) * 0.06} tilt={Math.sin(t * 0.8) * 0.12} mad={0} />
    <Word at={[GUARD[0] + 0.35, 2.0, GUARD[2] + 0.2]} t={t % 1.1} text="Z" yaw={20} height={0.2} life={1.0} />
  </>
);

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Inside",
  shots: [
    {
      cue: "4.outpost",
      ...cam.push({ on: O(0.4, 3.4, 8), dist: 20, to: 16.5, yaw: 4, pitch: -2, fov: 44 }),
      zone: "outpost",
      look: "overworld-night",
      note: "Up the forest track at night to the log gate with its two torches and the tower behind it. In the near corner, a bush with a boy in it.",
      stage: (t) => (
        <>
          <Gate />
          <Guard t={t} />
          <Bush position={O(1.5, 0, 22.4)} shake={Math.sin(t * 9) * 0.5} />
          <Hero position={O(1.6, 0, 23.1)} rotationY={NORTH} animation="crouch" />
          <pointLight position={O(1, 2.5, 25)} color="#9db8ff" intensity={8} distance={8} decay={1.5} />
        </>
      ),
    },
    {
      cue: "4.guard",
      ...cam.push({ on: [GUARD[0] - 0.45, 1.25, GUARD[2] + 0.3], dist: 4.4, to: 3.7, yaw: 40, pitch: 2, fov: 40 }),
      zone: "outpost",
      look: "overworld-night",
      note: "The guard, asleep on his feet with his crossbow, nodding. Behind his back a small shape tiptoes through the gap of the gate.",
      stage: (t) => (
        <>
          <Gate open={0.4} />
          <Guard t={t} />
          <Hero position={O(0.2, 0, 17.2 - t * 1.7)} rotationY={NORTH} animation="creep" animDistance={t * 1.7} face="fear" headYaw={-0.8} />
        </>
      ),
    },
    {
      cue: "4.start",
      ...cam.truck({ on: O(6, 0.9, 11), dist: 3.8, yaw: 38, pitch: 8, fov: 42, by: [0, 0, -1.8 * cueLen("4.start")] }),
      zone: "outpost",
      look: "overworld-night",
      note: "Inside, travelling with him along the tents on tiptoe, past a pillager snoring against a crate.",
      stage: (t) => (
        <>
          <Hero position={O(6, 0, 11 - t * 1.8)} rotationY={NORTH} animation="creep" animDistance={t * 1.8} face="uneasy" headYaw={Math.sin(t * 4) * 0.5} />
          <Pillager position={O(4.4, -0.55, 10.0)} rotationY={SOUTH + 1.2} sit nod={0.6} n={2} mad={0} />
          <pointLight position={O(7.5, 2.2, 10)} color="#9db8ff" intensity={8} distance={8} decay={1.5} />
        </>
      ),
    },
    {
      cue: "4.clothes",
      ...cam.push({ on: O(8, 1.45, 3), dist: 3.5, to: 2.7, yaw: 14, pitch: -4, fov: 40 }),
      zone: "outpost",
      look: "overworld-night",
      note: "The washing line: three coats. Two hands come up behind the middle one, and on 'grabbed' it comes down and there he is, wearing it.",
      stage: (t) => {
        const down = tw(t, GRAB, GRAB + 0.3);
        const worn = t > GRAB + 0.45;
        return (
          <>
            <Hero coat={worn} position={O(8, 0, 2.5)} rotationY={SOUTH} pose={worn ? posed("idle", t, {}) : posed("reachUp", t, {})} face={worn ? "grin" : "uneasy"} />
            {worn ? null : <Coat position={O(8, 1.9 - down * 0.55, 3 - down * 0.25)} rotation={[down * 0.5, 0, 0]} />}
            <pointLight position={O(8, 2.4, 5.5)} color="#b4c8ff" intensity={10} distance={7} decay={1.5} />
          </>
        );
      },
    },
    {
      cue: "5.grey",
      ...cam.push({ on: O(-7.1, 1.0, 5.6), dist: 3.0, to: 2.4, yaw: -8, pitch: 2, fov: 40 }),
      zone: "outpost",
      look: "overworld-night",
      note: "By the fire, two faces side by side: a sleeping pillager's, grey as a stone, and the boy's, pink as ham. He looks from one to the other.",
      stage: (t) => (
        <>
          <Pillager position={O(-7.38, -0.55, 5.35)} rotationY={SOUTH} sit nod={0.35} n={0} mad={0} />
          <Hero coat position={O(-6.84, -0.42, 5.9)} rotationY={SOUTH} pose={posed("sit", t, {})} face={t < 0.9 ? "neutral" : "worried"} headYaw={t < 0.9 ? -0.9 : 0} headPitch={t < 0.9 ? 0 : 0.35} />
          <FireLight position={O(-7, 0.8, 4.4)} power={1.1} reach={7} />
          <pointLight position={O(-7.1, 1.6, 7.6)} color="#ffc890" intensity={6} distance={6} decay={1.5} />
        </>
      ),
    },
    {
      cue: "5.ash",
      ...cam.top({ on: O(-5.3, 0.1, 4.5), height: 3.6, to: 2.9, spin: [0, 24], fov: 44 }),
      zone: "outpost",
      look: "overworld-night",
      note: "Straight down on the grey heap beside the fire: he is rolling in it like a dog, and a cloud of grey comes up.",
      stage: (t) => {
        const roll = Math.sin(t * 7);
        return (
          <>
            <Hero coat ash={tw(t, 0.2, 1.4)} position={O(-5.3 + roll * 0.35, 0.12, 4.5)} rotationY={1.2 + roll * 0.9} pose={posed("lie", t, { armR: [-1.2 + roll, 0, 0.5], armL: [-1.2 - roll, 0, -0.5] })} face="grin" shadow={false} />
            {[0, 1, 2].map((i) => (
              <Bits key={i} position={O(-5.3 + (i - 1) * 0.5, 0.2, 4.5)} t={(t * 1.4 + i * 0.3) % 0.9} color="#a8acae" count={10} seed={i + 2} power={0.8} />
            ))}
            <FireLight position={O(-7, 0.8, 4)} power={1.2} reach={8} />
            <pointLight position={O(-5.3, 3, 4.5)} color="#ffd0a0" intensity={8} distance={6} decay={1.5} />
          </>
        );
      },
    },
    {
      cue: "5.ash",
      cut: ASHCUT,
      ...cam.push({ on: O(-5.3, 0.82, 4.5), dist: 2.0, to: 1.5, yaw: 20, pitch: 4, fov: 38 }),
      zone: "outpost",
      look: "overworld-night",
      note: "He sits up out of the ash, close: the same face, grey now from hair to chin, and very pleased with itself.",
      stage: (t) => (
        <>
          <Hero coat ash={1} position={O(-5.3, -0.42, 4.5)} rotationY={SOUTH + 0.2} pose={posed("sit", t, {})} face="grin" />
          <Bits position={O(-5.3, 0.9, 4.6)} t={t + 0.05} color="#a8acae" count={12} seed={7} power={0.6} />
          <FireLight position={O(-7, 0.8, 4)} power={1.2} reach={8} />
          <pointLight position={O(-4.6, 1.6, 6.4)} color="#ffd0a0" intensity={7} distance={6} decay={1.5} />
          <Pillager position={O(-7.65, -0.55, 5.6)} rotationY={SOUTH + 0.6} sit nod={0.35} n={0} mad={0} />
        </>
      ),
    },
  ],
});
