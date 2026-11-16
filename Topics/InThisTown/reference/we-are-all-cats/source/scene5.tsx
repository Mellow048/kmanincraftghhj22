import { cam, storyScene } from "../../engine";
import { EAST, GOLEM_Z, Guard, Hero, KID_Z, Pup, Side, WEST, posed, timing, tw, w } from "./kit";

/** 05 — The next morning. No line. */
const NEAR = 2.0;
const SO = w("6.sniff", "So") - 0.05;
const ME: [number, number, number] = [0, 1.2, KID_Z];

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "No line",
  shots: [
    {
      cue: "6.morning",
      ...cam.push({ on: [0, 0.6, 5], dist: 19, to: 16, yaw: 180, pitch: 30, fov: 46 }),
      zone: "village",
      look: "overworld-sunset",
      note: "From over the roof of the well at sunrise: both sides march in from left and right as on any day. There is nothing between them but a pale stripe of grass.",
      stage: (t) => {
        const k = tw(t, 0, 1.9);
        const gap = 6 - (6 - NEAR) * k;
        return (
          <>
            <Side kind="cat" t={t} gap={gap} walk={0.01 + (6 - gap)} face="angry" />
            <Side kind="dog" t={t} gap={gap} walk={0.01 + (6 - gap)} face="angry" wag={0.6} />
          </>
        );
      },
    },
    {
      cue: "6.gone",
      ...cam.top({ on: [0, 0, 3.4], height: 12, to: 14.5, spin: [0, -6], fov: 46 }),
      zone: "village",
      look: "overworld-sunset",
      note: "Straight down: two rows of heads, and between them a pale stripe of grass that has never seen the sun. The line is gone.",
      stage: (t) => (
        <>
          <Side kind="cat" t={t} gap={NEAR} lookAt={[0, 0, 3]} face="surprised" />
          <Side kind="dog" t={t} gap={NEAR} lookAt={[0, 0, 3]} face="surprised" wag={0} />
        </>
      ),
    },
    {
      cue: "6.where",
      ...cam.pan({ from: [-1.6, 1.45, 6.4], on: [NEAR, 1.3, 6.3], onTo: [NEAR, 1.25, 2.6], fov: 42 }),
      zone: "village",
      look: "overworld-sunset",
      note: "Across the dogs: mouths shut, heads turning left and right and down. They have a bark ready and nowhere to put it.",
      stage: (t) => (
        <>
          <Side kind="dog" t={t} gap={NEAR} search={0.95} wag={0} face="worried" />
        </>
      ),
    },
    {
      cue: "6.ours",
      ...cam.push({ on: [-NEAR, 0.6, 2.25], dist: 3.5, to: 3.0, yaw: 110, pitch: -5, fov: 44 }),
      zone: "village",
      look: "overworld-sunset",
      note: "From the grass where the line was, looking up at the cats: the teller puts one foot out, taps the pale grass, and pulls it back.",
      stage: (t) => {
        const tap = tw(t, 0.3, 0.6) - tw(t, 1.2, 1.5);
        return (
          <>
            <Hero position={[-NEAR, 0, KID_Z]} rotationY={EAST} pose={posed("idle", t, { legR: [-0.75 * tap + Math.sin(t * 20) * 0.08 * tap, 0, 0], head: [0.5, 0, 0], bodyPitch: -0.05 * tap })} face="worried" tailUp={0.3} />
            <Side kind="cat" t={t} gap={NEAR} kid={false} lookAt={[-0.6, 0, 2]} face="worried" golem={false} />
          </>
        );
      },
    },
    {
      cue: "6.quiet",
      ...cam.orbit({ on: [0, 1.0, 3], dist: 12.5, yaw: -9, yawTo: 9, pitch: 23, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "Both sides, wide, and nothing happens: no back goes up and no jaw opens. Only the tails move, and the two golems look at each other.",
      stage: (t) => (
        <>
          <Side kind="cat" t={t} gap={NEAR} />
          <Side kind="dog" t={t} gap={NEAR} wag={0.1} />
        </>
      ),
    },
    {
      cue: "6.step",
      ...cam.push({ on: [0, 0.6, KID_Z], dist: 5.6, to: 3.7, yaw: 0, pitch: 2, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "Low, moving in: the teller comes into the frame from the left and the dog kid from the right, one slow step at a time, onto the grass nobody has stood on.",
      stage: (t) => {
        const s = tw(t, 0.1, 2.1) * (NEAR - 0.5);
        return (
          <>
            <Hero position={[-NEAR + s, 0, KID_Z]} rotationY={EAST} animation="creep" animDistance={s} face="uneasy" tailUp={0.4} />
            <Pup position={[NEAR - s, 0, KID_Z]} rotationY={WEST} animation="creep" animDistance={s} face="uneasy" wag={0.15} />
            <Side kind="cat" t={t} gap={NEAR - s * 0.35} walk={0.01 + s * 0.35} kid={false} golem={false} skip={[0, 6, 7]} />
            <Side kind="dog" t={t} gap={NEAR - s * 0.35} walk={0.01 + s * 0.35} kid={false} golem={false} skip={[0, 6, 7]} wag={0.2} />
          </>
        );
      },
    },
    {
      cue: "6.sniff",
      ...cam.orbit({ on: [0, 1.05, KID_Z], dist: 4.1, yaw: 12, yawTo: -8, pitch: 3, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "Nose to nose, close: the dog kid leans in and sniffs him, three quick ones. The teller blinks, then leans in and sniffs back.",
      stage: (t) => {
        const dog = tw(t, 0.1, 0.35) - tw(t, SO - 0.15, SO + 0.1);
        const cat = tw(t, SO, SO + 0.25);
        const sn = (k: number) => Math.sin(t * 26) * 0.07 * k;
        return (
          <>
            <Hero position={[-0.45, 0, KID_Z]} rotationY={EAST} pose={posed("idle", t, { bodyPitch: 0.2 * cat - 0.1 * dog, head: [-0.1 * cat + sn(cat), 0, 0] })} face={cat > 0.5 ? "smile" : "surprised"} tailUp={0.5 + 0.4 * cat} />
            <Pup position={[0.45, 0, KID_Z]} rotationY={WEST} pose={posed("idle", t, { bodyPitch: 0.2 * dog, head: [-0.1 * dog + sn(dog), 0, 0] })} face={cat > 0.5 ? "surprised" : "neutral"} wag={0.3 + 0.7 * cat} />
          </>
        );
      },
    },
    {
      cue: "6.weird",
      ...cam.push({ on: [0, 1.0, KID_Z], dist: 4.4, to: 5.4, yaw: 0, pitch: 15, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "They both stop and turn their faces to us, with both villages staring at them from either side, and the golems too.",
      stage: (t) => (
        <>
          <Hero position={[-0.5, 0, KID_Z]} rotationY={EAST} animation="idle" lookAt={[0, 1.4, 8]} face="uneasy" tailUp={0.6} />
          <Pup position={[0.5, 0, KID_Z]} rotationY={WEST} animation="idle" lookAt={[0, 1.4, 8]} face="uneasy" wag={0.2} />
          <Side kind="cat" t={t} gap={NEAR - 0.5} kid={false} lookAt={ME} face="surprised" golem={false} skip={[0, 6, 7]} />
          <Side kind="dog" t={t} gap={NEAR - 0.5} kid={false} lookAt={ME} face="surprised" golem={false} skip={[0, 6, 7]} wag={0} />
          <Guard kind="cat" position={[-1.6, 0, GOLEM_Z]} rotationY={0.5} headPitch={0.25} />
          <Guard kind="dog" position={[1.6, 0, GOLEM_Z]} rotationY={-0.5} headPitch={0.25} />
        </>
      ),
    },
  ],
});
