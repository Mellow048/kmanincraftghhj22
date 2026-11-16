import { cam, storyScene } from "../../engine";
import { Banner, Bearer, EAST, Gate, Hero, Lantern, NORTH, O, Pillager, Ravager, SOUTH, WEST, Word, posed, timing, tw, w } from "./kit";

/** 05 — Caught under the window, and promoted. */
const IT = w("9.rule", "It") - 0.12;
const HRM = w("9.grunt", "best");
const OWN = w("9.lead", "On") - 0.1;
const CAP = O(0.3, 0, -2.5);
const ME = O(0.1, 0, -3.8);
const Light = () => (
  <>
    <Lantern position={O(0.9, 6.3, -8.2)} light={1.4} reach={6} />
    <pointLight position={O(1.8, 2.6, -2.2)} color="#ffcf98" intensity={14} distance={8} decay={1.5} />
    <pointLight position={O(-2.2, 2.2, -3)} color="#9db8ff" intensity={8} distance={8} decay={1.5} />
  </>
);

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "The banner",
  shots: [
    {
      cue: "9.captain",
      ...cam.push({ on: O(0.1, 1.9, -4.0), dist: 5.4, to: 4.8, yaw: 6, pitch: 42, fov: 46 }),
      zone: "outpost",
      look: "overworld-night",
      note: "Down past his own hanging boots: the captain, right below, arms folded, gold band on his hat, looking straight up at him.",
      stage: (t) => (
        <>
          <Light />
          <Hero coat ash={1} position={O(0, 2.62 + Math.sin(t * 5) * 0.02, -4.66)} rotationY={NORTH} pose={posed("reachUp", t, { legR: [Math.sin(t * 6) * 0.3, 0, 0], legL: [-Math.sin(t * 6) * 0.3, 0, 0] })} shadow={false} />
          <Pillager chief position={CAP} rotationY={NORTH} nod={-0.6} />
          <Banner position={O(1.1, 0, -2.5)} t={t} rotation={[0, Math.PI, 0]} />
        </>
      ),
    },
    {
      cue: "9.done",
      ...cam.push({ on: [ME[0], 0.8, ME[2]], dist: 2.3, to: 1.9, yaw: 62, pitch: -4, fov: 38 }),
      zone: "outpost",
      look: "overworld-night",
      note: "He lands on his seat at the captain's boots and looks up, grey face, eyes as big as plates.",
      stage: (t) => (
        <>
          <Light />
          <Hero coat ash={1} position={[ME[0], -0.42 + 0.5 * (1 - tw(t, 0, 0.14)), ME[2]]} rotationY={SOUTH} pose={posed("sit", t, {})} face="fear" headPitch={-0.45} />
          <Pillager chief position={CAP} rotationY={NORTH} nod={0.5} />
        </>
      ),
    },
    {
      cue: "9.banner",
      ...cam.push({ on: O(0.2, 1.3, -3.15), dist: 4.8, to: 4.1, yaw: 90, pitch: 2, fov: 40 }),
      zone: "outpost",
      look: "overworld-night",
      note: "From the side: the captain holds the banner out at arm's length, and the boy's two hands close on the pole.",
      stage: (t) => (
        <>
          <Light />
          <Pillager chief position={CAP} rotationY={NORTH} armR={-1.5} nod={0.3} />
          <Banner position={O(0.15, 0.3, -3.3)} t={t} rotation={[0, Math.PI / 2, 0]} />
          <Hero coat ash={1} position={ME} rotationY={SOUTH} pose={posed("idle", t, { armR: [-1.3 * tw(t, 0.2, 0.5), 0, -0.2], armL: [-1.3 * tw(t, 0.2, 0.5), 0, 0.2] })} face="surprised" headPitch={-0.3} />
        </>
      ),
    },
    {
      cue: "9.rule",
      ...cam.truck({ on: O(-4.4, 1.3, 2.5), dist: 6.2, yaw: 56, pitch: 10, fov: 42, by: [1.5 * IT, 0, 0] }),
      zone: "outpost",
      look: "overworld-night",
      note: "He walks a few steps with it to see. Five pillagers get up from the fire and walk after it. He stops; they stop. He goes left; they go left.",
      stage: (t) => {
        const x = -4 + t * 1.5;
        return (
          <>
            <Bearer at={O(x, 0, 2.5)} h={EAST} t={t} walk={t * 1.5} face="surprised" headYaw={0.9} />
            {[0, 1, 2, 3, 4].map((i) => (
              <Pillager key={i} position={O(x - 1.5 - i * 1.15, 0, 2.5 + (i % 2) * 0.5 - 0.25)} rotationY={EAST} walk={t * 1.5 + i} n={i} phase={i} />
            ))}
            <pointLight position={O(x + 2, 3, 5)} color="#ffd9a0" intensity={30} distance={12} decay={1.4} />
            <pointLight position={O(x - 4, 3, 5.5)} color="#9db8ff" intensity={12} distance={10} decay={1.5} />
          </>
        );
      },
    },
    {
      cue: "9.rule",
      cut: IT,
      ...cam.push({ on: O(2.15, 1.75, 2.35), dist: 3.0, to: 2.5, yaw: 78, pitch: -22, fov: 44 }),
      zone: "outpost",
      look: "overworld-night",
      note: "From down by his boots, up the pole: the grey cloth with the pillager's face on it against the stars, and his face under it, working it out.",
      stage: (t) => (
        <>
          <Bearer at={O(2, 0, 2.5)} h={EAST} t={t} face="grin" headPitch={-0.5} />
          <pointLight position={O(4.2, 1.2, 3.2)} color="#ffd9a0" intensity={16} distance={7} decay={1.5} />
        </>
      ),
    },
    {
      cue: "9.grunt",
      ...cam.push({ on: O(1.15, 1.5, 2.5), dist: 3.6, to: 3.0, yaw: -62, pitch: 2, fov: 40 }),
      zone: "outpost",
      look: "overworld-night",
      note: "Over the boy's shoulder: the captain bends down, puts one big hand flat on top of his head, and grunts. The boy grunts back, a little one.",
      stage: (t) => (
        <>
          <Bearer at={O(0.5, 0, 2.5)} h={EAST} t={t} face="smug" />
          <Pillager chief position={O(1.75, 0, 2.5)} rotationY={WEST} armL={-1.75} lean={0.3} nod={0.3} />
          <Word at={O(1.45, 2.42, 2.35)} t={t} from={0.25} text="HRM." yaw={-62} height={0.18} />
          <Word at={O(0.5, 1.75, 2.3)} t={t} from={HRM} text="hrm." yaw={-62} height={0.11} color="#ffe9a8" />
          <pointLight position={O(-0.6, 2.2, 4.4)} color="#ffd9a0" intensity={16} distance={7} decay={1.5} />
        </>
      ),
    },
    {
      cue: "9.lead",
      ...cam.push({ on: O(0, 1.5, 15.5), dist: 5.2, to: 9.5, yaw: 0, pitch: 7, fov: 44 }),
      zone: "outpost",
      look: "overworld-night",
      note: "Pulling back out through the gate: him in front with the banner, and behind him, two by two under the torches, all of them, and the beast.",
      stage: (t) => (
        <>
          <Gate open={1} />
          <Bearer at={O(0, 0, 15.5)} h={SOUTH} t={t} face={t < OWN ? "uneasy" : "fear"} headYaw={t < OWN ? Math.sin(t * 3) * 0.3 : 0} />
          {Array.from({ length: 16 }, (_, i) => (
            <Pillager key={i} position={O((i % 2 ? 0.6 : -0.6), 0, 14 - Math.floor(i / 2) * 1.35 - (i > 9 ? 3 : 0))} rotationY={SOUTH} n={i} chief={i === 0} crossbow={i % 3 === 1} armR={i % 3 === 1 ? -0.4 : undefined} phase={i} />
          ))}
          <Ravager position={O(0, 0, 5.6)} rotationY={SOUTH} jaw={0.3 + 0.3 * Math.sin(t * 3)} />
          <pointLight position={O(0, 3, 18.5)} color="#ffd9a0" intensity={18} distance={10} decay={1.5} />
          <pointLight position={O(0, 4, 9)} color="#ffb070" intensity={30} distance={14} decay={1.5} />
        </>
      ),
    },
  ],
});
