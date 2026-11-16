import { cam, storyScene } from "../../engine";
import { EAST, Folk, Guard, Hero, KID, LINE_BLOCKS, Lantern, Line, LineBlock, Pal, WEST, cueLen, lineZ, timing } from "./kit";

/** 04 — That night. The cats take the line away. */
const HUDDLE: [number, number, number] = [-6, 0, 4];
/** `5.took`: the blocks near the lens, by index (block 0 is the south end), who lifts each one, and when. */
const TAKERS: Array<[number, number, boolean, number]> = [[15, 1, false, 0.25], [17, 5, true, 0.85], [19, 3, false, 1.45]];
/** Already on their way home with a block when the shot starts: [block, who, metres gone]. */
const CARRIERS: Array<[number, number, number]> = [[14, 2, 1.6], [16, 4, 0.9], [18, 1, 0.4], [11, 3, 2.6]];
const STEP = 1.1;
const HELD: [number, number, number] = [-0.12, -0.1, 0.1];
const CREEP = 1.25;

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "That night",
  shots: [
    {
      cue: "5.night",
      ...cam.push({ on: [-6, 0.6, 4], dist: 7.2, to: 5.6, yaw: 22, pitch: 48, fov: 42 }),
      zone: "village",
      look: "overworld-night",
      note: "From above, at night: the cats in a ring round one lantern, heads together, ears touching. The teller is the one in red.",
      stage: (t) => (
        <>
          <Line />
          <Lantern position={[HUDDLE[0], 0.42, HUDDLE[2]]} chain={0} light={1.6} reach={7} />
          {Array.from({ length: 7 }, (_, i) => {
            const a = (i / 7) * Math.PI * 2 + 0.3;
            const p: [number, number, number] = [HUDDLE[0] + Math.sin(a) * 1.35, 0, HUDDLE[2] + Math.cos(a) * 1.35];
            const rot = a + Math.PI;
            const nod = 0.25 + Math.sin(t * 5 + i) * 0.06;
            if (i === 0) return <Hero key={i} position={p} rotationY={rot} animation="talk" headPitch={nod} face="brave" tailUp={0.6} />;
            return i % 3 === 1 ? (
              <Folk key={i} kind="cat" who={i} position={p} rotationY={rot} lean={0.22} nod={nod} tailUp={0.5} phase={i} />
            ) : (
              <Pal key={i} kind="cat" who={i} scale={i === 5 ? KID : 1} position={p} rotationY={rot} animation="idle" headPitch={nod} tailUp={0.5} />
            );
          })}
        </>
      ),
    },
    {
      cue: "5.tiptoe",
      ...cam.truck({ on: [-3.3, 0.95, 3], dist: 4.6, yaw: 52, pitch: 4, fov: 42, by: [CREEP * cueLen("5.tiptoe"), 0, 0] }),
      ease: "linear",
      zone: "village",
      look: "overworld-night",
      note: "From the line, backing off as they come: a file of cats creeps towards us on its toes, tails low, the teller first and the golem last, also on its toes.",
      stage: (t) => {
        const s = t * CREEP;
        return (
          <>
            <Line />
            <Hero position={[-3.3 + s, 0, 3]} rotationY={EAST} animation="creep" animDistance={s} face="uneasy" tailUp={0.1} />
            <Pal kind="cat" who={2} position={[-4.3 + s, 0, 3.3]} rotationY={EAST} animation="creep" animDistance={s + 0.4} tailUp={0.1} />
            <Folk kind="cat" who={2} position={[-5.3 + s, 0, 2.75]} rotationY={EAST} walk={s * 0.6} lean={0.2} tailUp={0.1} />
            <Pal kind="cat" who={5} scale={KID} position={[-6.2 + s, 0, 3.2]} rotationY={EAST} animation="creep" animDistance={s + 0.9} tailUp={0.1} />
            <Guard kind="cat" position={[-7.7 + s, 0, 3]} rotationY={EAST} walk={s * 0.8} bow={0.25} armR={-0.5} armL={-0.5} tailUp={0.2} />
          </>
        );
      },
    },
    {
      cue: "5.took",
      ...cam.push({ on: [-0.35, 0.55, 7.3], dist: 4.7, to: 4.0, yaw: 38, pitch: 15, fov: 44 }),
      zone: "village",
      look: "overworld-night",
      note: "Close on the line, which already has gaps in it: one cat after another bends, lifts a white block out and walks off west with it. Further up, the line is still whole.",
      stage: (t) => (
        <>
          <Line gone={(i) => i < 14 || CARRIERS.some(([b]) => b === i) || TAKERS.some(([b, , , at]) => b === i && t > at)} />
          {TAKERS.map(([b, who, kid, at], i) => {
            const d = Math.max(0, t - at - 0.2);
            const has = t > at;
            const s = d * STEP;
            return (
              <Pal key={i} kind="cat" who={who} scale={kid ? KID : 1} position={[-0.7 - s, 0, lineZ(b)]} rotationY={d > 0 ? WEST : EAST} animation={has ? "walk" : "crouch"} arms={has ? "hold" : undefined} animDistance={s} tailUp={has ? 0.8 : 0.2} face={has ? "smile" : "uneasy"}>
                {has ? <LineBlock position={HELD} /> : null}
              </Pal>
            );
          })}
          {CARRIERS.map(([b, who, gone], i) => {
            const s = gone + t * STEP;
            return (
              <Pal key={`c${i}`} kind="cat" who={who} position={[-0.7 - s, 0, lineZ(b) + i * 0.2]} rotationY={WEST} animation="walk" arms="hold" animDistance={s} tailUp={0.7}>
                <LineBlock position={HELD} />
              </Pal>
            );
          })}
        </>
      ),
    },
    {
      cue: "5.last",
      ...cam.truck({ on: [-2.6, 0.95, 2], dist: 3.6, yaw: -82, pitch: 3, fov: 42, by: [-1.15 * cueLen("5.last"), 0, 0] }),
      ease: "linear",
      zone: "village",
      look: "overworld-night",
      note: "In front of him, backing away as he comes: the teller walks home with the last block in his paws, and behind him there is only grass where the line was.",
      stage: (t) => {
        const s = t * 1.15;
        return (
          <>
            <Line gone={(i) => i < LINE_BLOCKS} />
            <Hero position={[-2.5 - s, 0, 2]} rotationY={WEST} animation="walk" arms="hold" animDistance={s} headPitch={0.2} face="smile" tailUp={0.9}>
              <LineBlock position={HELD} />
            </Hero>
            <Pal kind="cat" who={3} position={[-1.0 - s * 0.9, 0, 3.6]} rotationY={WEST} animation="walk" arms="hold" animDistance={s}>
              <LineBlock position={HELD} />
            </Pal>
          </>
        );
      },
    },
  ],
});
