import {
  ChatToast,
  Chest,
  CitizenLead,
  Creeper,
  EliteLead,
  FloatingNumber,
  GoldStatue,
  Official,
  PLACE,
  StoneBillboard,
  Torch,
  Vox,
  cam,
  on,
  pop,
  storyScene,
  timing,
} from "./kit";
import { LOOP_CAM, LoopTaxStage } from "./scene1";

/** Scene 3 (Beats 6–7): Real-World Bridge + Comment Debate + Seamless Loop back to 1.hook. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Real World & Debate",
  shots: [
    {
      cue: "6.real",
      ...cam.front({ actor: on(PLACE.history, 0, 0.4, 0), facing: 0, dist: 6.7, to: 5.6, side: 14, pitch: 8, fov: 44 }),
      zone: "history",
      note: "Real-world bridge: Town Chest stands beside a crisp GOVERNMENT StoneBillboard.",
      stage: (t) => (
        <>
          <StoneBillboard text="TOWN CHEST = GOVT" position={on(PLACE.history, 0, 0, -0.8)} />
          <Chest position={on(PLACE.history, 0, 0, 0.8)} open={0.85} />
        </>
      ),
    },
    {
      cue: "6.good",
      ...cam.front({ actor: on(PLACE.history, 0, 0, 0.8), facing: 0, dist: 6.5, to: 5.4, side: -14, pitch: 8, fov: 44 }),
      zone: "history",
      note: "Good taxes: clean roads, schools, and bright streetlights keep everyone smiling.",
      stage: (t) => (
        <>
          <Official position={on(PLACE.history, -0.8, 0, 0.8)} rotationY={0.25} animation="cheer" face="grin" time={t} />
          <CitizenLead nameTag="Leo" position={on(PLACE.history, 0.8, 0, 0.8)} rotationY={-0.25} animation="wave" face="grin" time={t} />
          <Torch position={on(PLACE.history, 0, 0.6, 0.2)} light={2.2} />
          <ChatToast text="ROADS + SCHOOLS + WATER" position={on(PLACE.history, 0, 2.7, 0.5)} height={0.26 * pop(t, 0.12)} color="#4be08a" />
        </>
      ),
    },
    {
      cue: "6.bad",
      ...cam.front({ actor: on(PLACE.history, 0, 0.5, 0.6), facing: 0, dist: 6.9, to: 5.8, side: 14, pitch: 8, fov: 44 }),
      zone: "history",
      note: "Bad taxes: Greedy Mod laughs beside his miniature gold statue.",
      stage: (t) => (
        <>
          <EliteLead nameTag="Greedy Mod" position={on(PLACE.history, -0.9, 0, 0.8)} rotationY={0.25} animation="laugh" face="smug" time={t} />
          <GoldStatue position={on(PLACE.history, 1.0, 0, 0.2)} scale={0.55} />
          <ChatToast text="WASTED ON THE BOSS" position={on(PLACE.history, 0, 2.75, 0.6)} height={0.26 * pop(t, 0.12)} color="#ff4f42" />
        </>
      ),
    },
    {
      cue: "6.same",
      ...cam.twoShot({ a: on(PLACE.history, -1.2, 0, 0.8), b: on(PLACE.history, 1.2, 0, 0.8), facing: 0, dist: 6.9, to: 5.8, side: -10, pitch: 8, fov: 45 }),
      zone: "history",
      note: "Side-by-side split: same diamonds, same players, totally different worlds.",
      stage: (t) => (
        <>
          <CitizenLead nameTag="Leo" position={on(PLACE.history, -1.2, 0, 0.8)} rotationY={0.25} animation="point" face="calm" time={t} />
          <EliteLead nameTag="Greedy Mod" position={on(PLACE.history, 1.2, 0, 0.8)} rotationY={-0.25} animation="shrug" face="smug" time={t} />
          <FloatingNumber text="GOOD vs BAD" color="#ffd84d" position={on(PLACE.history, 0, 2.75, 0.8)} height={0.62 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "7.ask",
      ...cam.front({ actor: on(PLACE.square, 0, 0, 0.8), facing: 0, dist: 6.2, to: 5.0, side: 12, pitch: 7, fov: 42 }),
      zone: "square",
      note: "Comment-bait debate question: Leo looks straight into camera pointing at the viewer.",
      stage: (t) => (
        <>
          <CitizenLead nameTag="Leo" position={on(PLACE.square, 0, 0, 0.8)} rotationY={0} animation="point" face="smile" time={t} />
          <FloatingNumber text="WHICH SERVER?" color="#ffd84d" position={on(PLACE.square, 0, 2.65, 0.8)} height={0.62 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "7.free",
      ...cam.twoShot({ a: on(PLACE.square, -0.9, 0, 0.8), b: on(PLACE.square, 0.9, 0, 0.8), facing: 0, dist: 6.5, to: 5.4, side: -12, pitch: 8, fov: 44 }),
      zone: "square",
      look: "overworld-night",
      note: "Option A: 0% tax with a hungry green Creeper right outside your door.",
      stage: (t) => (
        <>
          <CitizenLead nameTag="Leo" position={on(PLACE.square, -0.9, 0, 0.8)} rotationY={0.25} animation="cower" face="fear" time={t} />
          <Creeper position={on(PLACE.square, 0.9, 0, 0.8)} rotationY={-0.3} swell={0.45} />
          <FloatingNumber text="0% + CREEPERS" color="#ff4f42" position={on(PLACE.square, 0, 2.7, 0.8)} height={0.58 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "7.pay",
      ...cam.front({ actor: on(PLACE.square, 0, 0, 0.8), facing: 0, dist: 6.5, to: 5.4, side: 14, pitch: 8, fov: 44 }),
      zone: "square",
      note: "Option B: 2 diamonds a day for bright torches and safe stone walls.",
      stage: (t) => (
        <>
          <Vox kind="stoneBrick" position={on(PLACE.square, 0, 1.3, -1.2)} size={[5.8, 2.6, 0.6]} />
          <Torch position={on(PLACE.square, -1.6, 2.7, -1.2)} light={2.2} />
          <Torch position={on(PLACE.square, 1.6, 2.7, -1.2)} light={2.2} />
          <CitizenLead nameTag="Leo" position={on(PLACE.square, 0, 0, 0.8)} rotationY={0} animation="cheer" face="grin" time={t} />
          <FloatingNumber text="2/DAY + SAFE" color="#4be08a" position={on(PLACE.square, 0, 2.75, 0.8)} height={0.58 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "7.loop",
      ...LOOP_CAM,
      zone: "square",
      note: "Seamless loop back to Frame-0 camera & stage: 'And that's— [Taxes explained using Minecraft!]'",
      stage: (t) => <LoopTaxStage t={t} />,
    },
  ],
});
