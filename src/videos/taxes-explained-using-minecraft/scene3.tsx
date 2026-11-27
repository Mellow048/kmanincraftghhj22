import {
  ChatToast,
  Chest,
  CitizenLead,
  Creeper,
  EliteLead,
  FloatingNumber,
  GoldStatue,
  MoneyPrinter,
  Official,
  PLACE,
  StoneBillboard,
  Torch,
  Vox,
  cam,
  moveBetween,
  on,
  pop,
  storyScene,
  timing,
} from "./kit";
import { LOOP_CAM, LoopTaxStage } from "./scene1";

/** Scene 3 (Beats 6–7): Real-World Bridge with MoneyPrinter -> Comment Debate -> Seamless Loop. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Real World & Debate",
  shots: [
    {
      cue: "6.real",
      ...cam.sweep({ on: on(PLACE.real, 0, 1.5, 0), dist: 6.8, fromYaw: -22, toYaw: 18, pitch: 9 }),
      zone: "real",
      note: "Real-world Civic Plaza: Town Chest stands beside the GOVERNMENT StoneBillboard & MoneyPrinter!",
      stage: (t) => (
        <>
          <StoneBillboard text="TOWN CHEST = GOVT" position={on(PLACE.real, 0, 0, -2.0)} />
          <Chest position={on(PLACE.real, -1.2, 0, 0.8)} open={0.85} />
          <MoneyPrinter position={on(PLACE.real, 1.4, 0, 0.6)} rotationY={-0.25} t={t} />
        </>
      ),
    },
    {
      cue: "6.good",
      ...cam.track({ from: on(PLACE.real, -2.5, 0, 3), to: on(PLACE.real, 2.2, 0, 3), sideDist: 6.0, side: 1, lead: 1.0 }),
      zone: "real",
      note: "Good taxes: citizens stroll past bright lights, clean roads, and the brick civic school!",
      stage: (t) => {
        const w = moveBetween(on(PLACE.real, -2.5, 0, 3), on(PLACE.real, 2.2, 0, 3), t, 0, 1.8);
        return (
          <>
            <Official position={on(PLACE.real, -1.8, 0, 0.5)} rotationY={0.25} animation="cheer" face="grin" time={t} />
            <CitizenLead variant="maya" nameTag="Maya" position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "wave"} animDistance={w.animDistance} face="grin" time={t} />
            <Torch position={on(PLACE.real, 0, 0.6, 0.5)} light={2.2} />
            <ChatToast text="ROADS + SCHOOLS + WATER" position={on(PLACE.real, 0, 2.8, 0.5)} height={0.24 * pop(t, 0.12)} color="#4be08a" />
          </>
        );
      },
    },
    {
      cue: "6.bad",
      ...cam.heroLow({ on: on(PLACE.real, 0, 0.6, 0), dist: 6.6, yaw: 18 }),
      zone: "real",
      note: "Bad taxes: Greedy Mod laughs beside his gold statue and roaring MoneyPrinter!",
      stage: (t) => (
        <>
          <EliteLead nameTag="Greedy Mod" position={on(PLACE.real, -1.4, 0, 0.8)} rotationY={0.25} animation="laugh" face="smug" time={t} />
          <GoldStatue position={on(PLACE.real, 1.3, 0, -0.4)} scale={0.62} />
          <ChatToast text="WASTED ON THE BOSS" position={on(PLACE.real, 0, 2.85, 0.4)} height={0.24 * pop(t, 0.12)} color="#ff4f42" />
        </>
      ),
    },
    {
      cue: "6.same",
      ...cam.sweep({ on: on(PLACE.real, 0, 1.3, 0.8), dist: 6.8, fromYaw: 20, toYaw: -20, pitch: 9 }),
      zone: "real",
      note: "Side-by-side split: same diamonds, same players, totally different worlds.",
      stage: (t) => (
        <>
          <CitizenLead variant="leo" nameTag="Leo" position={on(PLACE.real, -1.6, 0, 0.8)} rotationY={0.25} animation="point" face="calm" time={t} />
          <EliteLead nameTag="Greedy Mod" position={on(PLACE.real, 1.6, 0, 0.8)} rotationY={-0.25} animation="shrug" face="smug" time={t} />
          <FloatingNumber text="GOOD vs BAD" color="#ffd84d" position={on(PLACE.real, 0, 2.8, 0.8)} height={0.58 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "7.ask",
      ...cam.sweep({ on: on(PLACE.street, 0, 1.3, 1), dist: 6.2, fromYaw: -18, toYaw: 16, pitch: 8 }),
      zone: "street",
      note: "Comment-bait debate question: Leo looks straight into camera pointing at the viewer.",
      stage: (t) => (
        <>
          <CitizenLead variant="leo" nameTag="Leo" position={on(PLACE.street, 0, 0, 1)} rotationY={0} animation="point" face="smile" time={t} />
          <FloatingNumber text="WHICH SERVER?" color="#ffd84d" position={on(PLACE.street, 0, 2.65, 1)} height={0.58 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "7.free",
      ...cam.heroLow({ on: on(PLACE.street, 0, 0.3, 1), dist: 6.4, yaw: 72 }),
      zone: "street",
      look: "overworld-night",
      note: "Option A: 0% tax with a hungry green Creeper right outside Leo's door.",
      stage: (t) => (
        <>
          <CitizenLead variant="leo" nameTag="Leo" position={on(PLACE.street, -1.0, 0, 1.0)} rotationY={0.35} animation="cower" face="fear" time={t} />
          <Creeper position={on(PLACE.street, 1.0, 0, 1.0)} rotationY={-0.35} swell={0.48} />
          <FloatingNumber text="0% + CREEPERS" color="#ff4f42" position={on(PLACE.street, 0, 2.75, 1.0)} height={0.56 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "7.pay",
      ...cam.sweep({ on: on(PLACE.street, 0, 1.4, -2), dist: 6.8, fromYaw: -20, toYaw: 20, pitch: 8 }),
      zone: "street",
      note: "Option B: 2 diamonds a day for bright torches and safe stone walls with Leo & Sam cheering.",
      stage: (t) => (
        <>
          <Vox kind="stoneBrick" position={on(PLACE.street, 0, 1.3, -4.5)} size={[7.6, 2.6, 0.6]} />
          <Torch position={on(PLACE.street, -2.0, 2.7, -4.5)} light={2.2} />
          <Torch position={on(PLACE.street, 2.0, 2.7, -4.5)} light={2.2} />
          <CitizenLead variant="leo" nameTag="Leo" position={on(PLACE.street, -1.1, 0, -1.5)} rotationY={0.15} animation="cheer" face="grin" time={t} />
          <CitizenLead variant="sam" nameTag="Sam" position={on(PLACE.street, 1.1, 0, -1.5)} rotationY={-0.15} animation="cheer" face="grin" time={t} />
          <FloatingNumber text="2/DAY + SAFE" color="#4be08a" position={on(PLACE.street, 0, 2.85, -1.5)} height={0.56 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "7.loop",
      ...LOOP_CAM,
      zone: "street",
      note: "Seamless loop back to Frame-0 street crane & stage: 'And that's— [Taxes explained using Minecraft!]'",
      stage: (t) => <LoopTaxStage t={t} />,
    },
  ],
});
