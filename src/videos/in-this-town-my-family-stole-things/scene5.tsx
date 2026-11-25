import { Block, cam, storyScene } from "../../engine";
import { Berries, Dad, den, PLACE, RedFlower, SillCup, Sister, Sword, Teller, timing, wordAt } from "./kit";

const GOT = wordAt("11.given", "got");
const TRADE = wordAt("12.trade", "paying");
const SECOND = wordAt("12.second", "second");

/** The pile: everything the family ever took, with one berry under each thing. Built once, used in four shots. */
const Pile: React.FC<{ reveal?: number }> = ({ reveal = 0 }) => (
  <group>
    {/* the thing… */}
    <Sword position={den(-2.6, 0.02, -1.2)} scale={0.8} rotation={[0, 0, 1.5]} />
    <Block position={den(-1.7, 0.35, -1.0)} size={[0.5, 0.5, 0.5]} color="#8a3b2a" />
    <RedFlower position={den(-0.8, 0.1, -0.7)} scale={0.9} rotation={[0, 0, 1.4]} wilt={0.6} />
    <Block position={den(0.2, 0.25, -1.1)} size={[0.7, 0.5, 0.4]} color="#7a6a4a" />
    <Block position={den(1.2, 0.18, -0.9)} size={[0.5, 0.36, 0.5]} color="#c9a15a" />
    {/* …and the berry under it, which is the thing nobody in the family ever looked at */}
    {[
      [-2.6, -1.2],
      [-1.7, -1.0],
      [-0.8, -0.7],
      [0.2, -1.1],
      [1.2, -0.9],
    ].map(([x, z], i) => (
      <group key={i} visible={reveal > i / 5}>
        <Berries position={den(x + 0.28, 0.01, z + 0.22)} scale={0.7} count={1} />
      </group>
    ))}
  </group>
);

/**
 * Scene 5 — THE TRADE. The film's turn.
 *
 * He looks in the den properly for the first time in his life and sees a berry under everything. Then he does the one
 * thing a thief never does: he works out what the boy has been doing for years. And in the morning there is a new
 * flower, and a second cup.
 */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "He was trading",
  shots: [
    {
      cue: "10.next",
      ...cam.push({ on: [-9.1, 1.5, -4.85], dist: 2.1, to: 1.75, yaw: 6, pitch: 6, fov: 40 }),
      zone: "street",
      look: "overworld-sunset",
      note: "'Next night, more berries than ever': the sill heaped, and the flower he dropped still lying beside them, wilted, untouched. The berries get moved and the flower does not. Nobody says anything.",
      stage: (t) => (
        <>
          <Berries position={[PLACE.sill[0] - 0.1, PLACE.sill[1] + 0.04, PLACE.sill[2] + 0.1]} scale={1.4} count={14} t={t} />
          <RedFlower position={[PLACE.sill[0] + 0.55, PLACE.sill[1] + 0.08, PLACE.sill[2] + 0.32]} scale={0.8} rotation={[0, 0, 2.7]} wilt={0.8} />
        </>
      ),
    },
    {
      cue: "10.told",
      ...cam.push({ on: [-10.4, 0.95, 0.7], dist: 2.2, to: 1.85, yaw: -30, pitch: 0, fov: 38 }),
      zone: "street",
      look: "overworld-sunset",
      note: "'He is not scared of us. He is waiting': her face over his shoulder, mountain-calm. This is the line that reframes the whole film, so hold on her eyes and let him stay out of focus.",
      stage: (t) => (
        <>
          <Teller position={[PLACE.hedge[0], 0, PLACE.hedge[2]]} rotationY={-0.874} animation="idle" face="uneasy" tailUp={0.2} time={t} />
          <Sister position={[PLACE.hedge[0] - 0.9, 0, PLACE.hedge[2] + 0.3]} rotationY={-0.874} animation="talk" face="calm" time={t} tailUp={0.45} headPitch={0.04} />
        </>
      ),
    },
    {
      cue: "11.corner",
      ...cam.push({ on: [-1.4, 0.5, 60.0], dist: 6.0, to: 5.0, yaw: -22, pitch: 18, fov: 46 }),
      zone: "den",
      look: "overworld-sunset",
      note: "'So I looked in our den': the camera cranes over the pile for the first time in the film. We have heard about these things since the first line; this is the shot where the audience sees the hoard, and the last thing the crane finds is the floor under it.",
      stage: (t) => (
        <>
          <Pile />
          <Teller position={den(2.2, 0, 0.6)} rotationY={-0.734} animation="creep" face="wow" lookAt={den(0, 0.3, -1)} tailUp={0.2} time={t} />
        </>
      ),
    },
    {
      cue: "11.count",
      ...cam.push({ on: [-1.6, 0.25, 59.0], dist: 2.6, to: 2.2, yaw: 24, pitch: 30, fov: 38 }),
      zone: "den",
      look: "overworld-sunset",
      note: "'One berry under every single thing we ever took': track along the floor while the things pass in the top of the frame, and the berries pass underneath. One movement, one line, five berries, and the arithmetic is done for the audience.",
      stage: (t) => <Pile reveal={Math.min(1, Math.max(0.05, t / 1.6))} />,
    },
    {
      cue: "11.every",
      ...cam.push({ on: [-1.0, 0.2, 59.4], dist: 1.3, to: 1.05, yaw: 8, pitch: 24, fov: 30 }),
      zone: "den",
      look: "overworld-sunset",
      note: "'Every one. He counted every one': down on one berry, so close that the dirt around it is a landscape. This is the smallest shot in the film and the largest idea in it.",
      stage: () => <Berries position={den(-1.0, 0.02, -0.62)} scale={1.5} count={1} />,
    },
    {
      cue: "11.gift",
      ...cam.push({ on: [-1.9, 0.85, 60.4], dist: 2.6, to: 2.2, yaw: 10, pitch: 2, fov: 38 }),
      zone: "den",
      look: "overworld-sunset",
      note: "'Then I looked at the cup, and the golem, and the flower': he does not look at the hoard. He stares at nothing, and the orbit goes round his face because the thinking is the action. Three things, in that order, behind his eyes.",
      stage: (t) => <Teller position={den(1.9, 0, 0.4)} rotationY={-0.175} animation="idle" face={t > GOT ? "wow" : "calm"} tailUp={0.35} time={t} headPitch={0.12} />,
    },
    {
      cue: "11.given",
      ...cam.push({ on: [-1.9, 1.05, 60.4], dist: 1.7, to: 1.45, yaw: -14, pitch: 0, fov: 32 }),
      zone: "den",
      look: "overworld-sunset",
      note: "On 'given': his eyes, and the face swap lands on the word. A fox that has just understood something is not a smart face — it is a stunned one.",
      stage: (t) => <Teller position={den(1.9, 0, 0.4)} rotationY={-0.594} animation="idle" face={t > GOT * 0.55 ? "wow" : "calm"} tailUp={0.3} time={t} headPitch={0.05} />,
    },
    {
      cue: "12.none",
      ...cam.push({ on: [-0.6, 0.45, 59.1], dist: 3.4, to: 2.8, yaw: -20, pitch: 8, fov: 42 }),
      zone: "den",
      look: "overworld-sunset",
      note: "'So he couldn't buy it back': back on the pile, wide, and the family's things look like a hoard again — which is exactly what it is. Let the audience count.",
      stage: () => <Pile reveal={1} />,
    },
    {
      cue: "12.trade",
      ...cam.push({ on: [-1.4, 0.6, 59.0], dist: 3.8, to: 3.2, yaw: 16, pitch: 10, fov: 44 }),
      zone: "den",
      look: "overworld-sunset",
      note: "'He was paying us back, one thing a night': the same pile, now lit warmer, because the meaning has changed and the picture should change with it. Dad and the cub asleep behind it, so the family is in the frame when its economy is explained.",
      stage: (t) => (
        <>
          <Pile reveal={1} />
          <Dad position={den(-3.4, 0, -0.2)} rotationY={-0.071} animation="sleep" face="calm" tailUp={0} time={t} />
          <Sister position={den(-2.2, 0, 0.4)} rotationY={-0.071} animation="sleep" face="calm" tailUp={0} time={t} />
        </>
      ),
    },
    {
      cue: "12.want",
      ...cam.push({ on: [-9.1, 1.5, -4.85], dist: 2.6, to: 2.2, yaw: -6, pitch: 8, fov: 38 }),
      zone: "street",
      look: "overworld-sunset",
      note: "'The one thing he wanted was the one thing we never sold': dawn coming up on the sill, the wilted flower and the berries still there together. The line is about the flower, so the flower is the last thing in focus.",
      stage: (t) => (
        <>
          <Berries position={[PLACE.sill[0] - 0.1, PLACE.sill[1] + 0.04, PLACE.sill[2] + 0.1]} scale={1.3} count={12} t={t} />
          <RedFlower position={[PLACE.sill[0] + 0.55, PLACE.sill[1] + 0.08, PLACE.sill[2] + 0.32]} scale={0.85} rotation={[0, 0, 2.7]} wilt={0.85} />
        </>
      ),
    },
    {
      cue: "12.flower",
      ...cam.push({ on: [-9.1, 1.55, -4.8], dist: 1.6, to: 1.3, yaw: 10, pitch: 8, fov: 34 }),
      zone: "street",
      look: "overworld-day",
      note: "'And in the cup that morning, a new flower': the cup is back, and there is a flower in it — a fresh one, upright. The berries are gone. Do not explain who put it there. The audience will do it themselves, and that is the feeling you want.",
      stage: () => <SillCup position={[PLACE.sill[0] + 0.32, PLACE.sill[1], PLACE.sill[2] + 0.1]} flower />,
    },
    {
      cue: "12.second",
      ...cam.push({ on: [-8.5, 1.55, -4.6], dist: 2.2, to: 2.0, yaw: 0, pitch: 8, fov: 38 }),
      zone: "street",
      look: "overworld-day",
      note: "On 'second cup': the lens slides from the flower to the empty cup beside it. Empty is the last word of the story, so empty is the last thing on screen. Hold it long enough to be a question.",
      stage: (t) => (
        <>
          <SillCup position={[PLACE.sill[0] + 0.32, PLACE.sill[1], PLACE.sill[2] + 0.1]} flower />
          <SillCup position={[PLACE.sill[0] + 1.05, PLACE.sill[1], PLACE.sill[2] + 0.12]} />
        </>
      ),
    },
  ],
});
