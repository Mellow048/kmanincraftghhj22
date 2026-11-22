import { cam, storyScene } from "../../engine";
import { BRIDGE, BRIDGE_Y, PATH_Y, PORCH_Y, ROOM_MARKS, VILLAGE } from "./marks";
import {
  ADULT,
  Bits,
  BridgePinPost,
  DadStack,
  EAST,
  GROUND_SIT,
  GrandpaSlime,
  HangingBabyCoat,
  Hero,
  LowSoupTable,
  NORTH,
  NeighborBigDad,
  PottedCactus,
  Puffs,
  ROBE,
  SOUTH,
  SlimeballProp,
  TinyDad,
  Villager,
  WEST,
  groundSitPose,
  jolt,
  pop,
  timing,
  tw,
  w,
} from "./kit";

/**
 * Clip 02 — Everyday Clues & Stakes (`02-clues`, 14 shots):
 *   Why tiny slimes are harmless, dinner chaos, the suspicious "stairs & cactus" excuses,
 *   the torn baby coat, the barred sunset bridge, and Grandpa's warning: zero splits left.
 */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Clumsy Excuses & Zero Splits",
  shots: [
    {
      cue: "2.bump",
      zone: "village",
      look: "overworld-day",
      ...cam.push({ on: [0, 0.95, 0.5], dist: 3.7, to: 3.0, yaw: 42, pitch: 10, fov: 40 }),
      note: "Street gag: a neighbour's huge two-block slime dad accidentally bumps a villager flat onto the cobbles.",
      stage: (t) => {
        const hit = w("2.bump", "knocks");
        const fall = tw(t, hit, hit + 0.45);
        return (
          <>
            <NeighborBigDad
              variant={2}
              position={[-0.75 + jolt(t, hit, 0.35), PATH_Y, 0.4]}
              rotationY={EAST}
              squash={pop(t, hit, 0.25) * 0.35}
            />
            <Villager
              position={[0.45 + fall * 0.95, PATH_Y, 0.45]}
              rotationY={WEST}
              scale={ADULT}
              robe={ROBE.smith}
              lean={-fall * 1.15}
              turn={fall * 0.4}
            />
            {t >= hit ? <Puffs position={[0.2, 0.45, 0.45]} count={6} color="#f5ebd4" /> : null}
          </>
        );
      },
    },
    {
      cue: "2.shin",
      zone: "village",
      look: "overworld-day",
      ...cam.push({ on: [0.15, 0.42, -3.2], dist: 1.95, to: 1.52, yaw: -38, pitch: 18, fov: 34 }),
      note: "Tight low shin insert: Tiny Dad #1 boings harmlessly into Hero's sneaker and squishes like jelly.",
      stage: (t) => {
        const boingAt = w("2.shin", "tiny");
        const hop = Math.abs(Math.sin((t + 0.2) * 5.2));
        const bump = jolt(t, boingAt, 0.22);
        return (
          <>
            <Hero
              position={[-0.18, PATH_Y, -3.25]}
              rotationY={0.35}
              animation="idle"
              face="smile"
              headPitch={0.34}
              headYaw={0.2 + Math.sin(t * 2) * 0.04}
            />
            <TinyDad
              which={1}
              position={[0.46 - bump * 0.55, PATH_Y, -3.12]}
              rotationY={WEST + 0.2}
              hop={hop * 0.18}
              squash={pop(t, boingAt, 0.28) * 0.45}
            />
          </>
        );
      },
    },
    {
      cue: "2.dinner",
      zone: "room",
      look: "warm-room",
      ...cam.orbit({ on: [-0.4, 0.55, -0.2], dist: 2.85, distTo: 2.35, yaw: 24, yawTo: 38, pitch: 22, fov: 38 }),
      note: "Warm cottage floor dinner: Hero sits at the ankle-high soup table while all four tiny dads lecture him in stereo.",
      stage: (t) => (
        <>
          <LowSoupTable position={ROOM_MARKS.table} t={t} />
          <Hero
            position={[-0.4, GROUND_SIT, 0.58]}
            rotationY={NORTH}
            pose={groundSitPose(t, { head: [0.18, Math.sin(t * 4.2) * 0.24, 0] })}
            face="frown"
          />
          <TinyDad which={1} position={[-1.02, 0, -0.58]} rotationY={0.45} hop={Math.abs(Math.sin(t * 6.5)) * 0.14} mood="angry" />
          <TinyDad which={2} position={[-0.58, 0, -0.82]} rotationY={0.15} hop={Math.abs(Math.sin(t * 6.5 + 1)) * 0.14} mood="angry" />
          <TinyDad which={3} position={[-0.14, 0.34, -0.45]} rotationY={-0.15} squash={Math.sin(t * 7) * 0.18} mood="happy" />
          <TinyDad which={4} position={[0.26, 0, -0.64]} rotationY={-0.45} hop={Math.abs(Math.sin(t * 6.5 + 2)) * 0.14} mood="angry" />
        </>
      ),
    },
    {
      cue: "2.soup",
      zone: "room",
      look: "warm-room",
      ...cam.push({ on: [-0.36, 0.48, -0.25], dist: 1.75, to: 1.36, yaw: -44, pitch: 28, fov: 33 }),
      note: "Close-up comedy beat: Dad #3 in the crooked blue tie slips right off the bowl rim into the green soup!",
      stage: (t) => {
        const slipAt = w("2.soup", "slipped");
        const k = tw(t, slipAt - 0.08, slipAt + 0.32);
        return (
          <>
            <LowSoupTable position={ROOM_MARKS.table} t={t} />
            <TinyDad
              which={3}
              position={[-0.22 - k * 0.16, 0.36 - k * 0.12, -0.36 + k * 0.34]}
              rotationY={0.2 + k * 0.8}
              squash={pop(t, slipAt + 0.18, 0.28) * 0.48}
              mood={k > 0.3 ? "scared" : "happy"}
            />
            <TinyDad which={1} position={[-0.86, 0, -0.42]} rotationY={EAST * 0.6} nod={-k * 0.25} mood="sad" />
            <TinyDad which={2} position={[0.22, 0, -0.44]} rotationY={-EAST * 0.6} nod={-k * 0.25} mood="scared" />
            {t >= slipAt + 0.12 ? (
              <Bits position={[-0.38, 0.52, -0.04]} t={t - (slipAt + 0.12)} color="#7aff54" count={10} power={0.8} />
            ) : null}
          </>
        );
      },
    },
    {
      cue: "2.door",
      zone: "room",
      look: "warm-room",
      ...cam.push({ on: [-1.85, 0.92, 1.25], dist: 2.65, to: 2.12, yaw: 52, pitch: -4, fov: 37 }),
      note: "Side angle at the cottage door: all four tiny dads stack on each other's heads to reach the handle.",
      stage: (t) => {
        const reach = tw(t, 0.15, w("2.door", "head") + 0.15);
        return (
          <>
            <DadStack
              position={[-2.05, 0, 1.28]}
              rotationY={WEST}
              sway={Math.sin(t * 5.2) * 0.38}
              squash={0.1 + Math.sin(t * 4) * 0.08}
              topLean={reach * 0.85}
            />
            <Hero
              position={[-0.85, 0, 0.95]}
              rotationY={WEST + 0.3}
              animation="idle"
              face="smile"
              headYaw={0.25 * reach}
            />
          </>
        );
      },
    },
    {
      cue: "2.clumsy",
      zone: "room",
      look: "warm-room",
      ...cam.push({ on: [-0.85, 1.12, 0.95], dist: 2.05, to: 1.66, yaw: -18, pitch: 8, fov: 35 }),
      note: "Reaction close-up on Hero shrugging fondly as the four-dad tower loses balance and tumbles softly behind him.",
      stage: (t) => {
        const tip = tw(t, w("2.clumsy", "clumsy") - 0.2, w("2.clumsy", "clumsy") + 0.35);
        return (
          <>
            <Hero
              position={[-0.85, 0, 0.95]}
              rotationY={SOUTH}
              animation="shrug"
              face="laugh"
              headYaw={-0.18 + tip * 0.26}
            />
            <TinyDad which={1} position={[-1.85, 0, 0.35]} rotationY={0.4} squash={tip * 0.3} />
            <TinyDad which={2} position={[-1.85 + tip * 0.42, 0.46 * (1 - tip), 0.38]} rotationY={0.8} squash={tip * 0.35} />
            <TinyDad which={3} position={[-1.85 - tip * 0.38, 0.92 * (1 - tip), 0.28]} rotationY={-0.6} mood="scared" />
            <TinyDad which={4} position={[-1.85 + tip * 0.18, 1.36 * (1 - tip), 0.52]} rotationY={0.2} mood="happy" />
          </>
        );
      },
    },
    {
      cue: "2.porch",
      zone: "village",
      look: "overworld-day",
      ...cam.push({ on: [1.35, 0.32, -11.8], dist: 2.55, to: 1.92, yaw: 36, pitch: 26, fov: 36 }),
      note: "Clue #1 planted in plain sight: two deep white craters right beside our porch stairs as Dad #1 mimes tripping.",
      stage: (t) => {
        const hop = Math.abs(Math.sin(t * 5.4)) * 0.18;
        return (
          <>
            <Hero
              position={[0.35, PORCH_Y, -12.35]}
              rotationY={0.55}
              animation="idle"
              face="calm"
              headPitch={0.35}
              headYaw={0.28 + Math.sin(t * 2.5) * 0.06}
            />
            <TinyDad which={1} position={[0.98, 0, -11.55]} rotationY={-0.5} hop={hop} nod={0.25} mood="scared" />
            <TinyDad which={2} position={[2.12, 0, -11.68]} rotationY={-0.8} squash={0.18 + Math.sin(t * 4) * 0.1} mood="calm" />
          </>
        );
      },
    },
    {
      cue: "2.cactus",
      zone: "village",
      look: "overworld-day",
      ...cam.push({ on: [1.65, 0.62, -12.65], dist: 2.25, to: 1.78, yaw: -46, pitch: 14, fov: 35 }),
      note: "Clue #2 excuse: Tiny Dad #2 & #3 bounce excitedly around a tiny potted porch cactus claiming they bumped into one.",
      stage: (t) => {
        const chomp = tw(t, w("2.cactus", "cactus") - 0.15, w("2.cactus", "cactus") + 0.25);
        return (
          <>
            <PottedCactus position={VILLAGE.cactus} bitten={chomp} />
            <TinyDad
              which={2}
              position={[1.22 + jolt(t, w("2.cactus", "walking"), 0.22), PORCH_Y, -12.55]}
              rotationY={EAST * 0.8}
              hop={Math.abs(Math.sin(t * 5.8)) * 0.16}
              mood="scared"
            />
            <TinyDad
              which={3}
              position={[1.45, PORCH_Y, -12.15]}
              rotationY={NORTH + 0.35}
              squash={0.15 + chomp * 0.25}
              mood="happy"
            />
          </>
        );
      },
    },
    {
      cue: "2.swamp",
      zone: "village",
      look: "overworld-day",
      ...cam.orbit({ on: [0, 1.15, -9.8], dist: 5.2, distTo: 4.25, yaw: 18, yawTo: -8, pitch: 16, fov: 45 }),
      note: "Wide deadpan pullback of our lush wet green swamp village: Hero spreads his arms—not a desert cactus in sight!",
      stage: (t) => (
        <>
          <Hero
            position={[0, PATH_Y, -9.8]}
            rotationY={SOUTH}
            animation="shrug"
            blendTo="lookAround"
            blend={tw(t, 0.2, 1.1)}
            face="uneasy"
            headYaw={Math.sin(t * 3.0) * 0.32}
          />
          <TinyDad which={1} position={[-0.75, PATH_Y, -10.3]} rotationY={SOUTH} squash={Math.abs(Math.sin(t * 3.4)) * 0.15} />
          <TinyDad which={4} position={[0.78, PATH_Y, -10.25]} rotationY={SOUTH} hop={Math.abs(Math.sin(t * 4.2)) * 0.14} />
        </>
      ),
    },
    {
      cue: "2.coat",
      zone: "room",
      look: "warm-room",
      ...cam.push({ on: [-2.18, 1.18, 0.35], dist: 1.85, to: 1.42, yaw: 58, pitch: 6, fov: 33 }),
      note: "Clue #3: quiet close-up on the torn blue baby coat hanging on its wall peg as Hero touches its ragged hem.",
      stage: (t) => {
        const touch = tw(t, 0.15, w("2.coat", "coat") + 0.2);
        return (
          <>
            <HangingBabyCoat position={[-2.56, 1.15, 0.35]} rotationY={EAST} sway={Math.sin(t * 2.4) * 0.05 + touch * 0.08} />
            <Hero
              position={[-1.78, 0, 0.58]}
              rotationY={WEST + 0.35}
              animation="reach"
              blendTo="idle"
              blend={1 - touch * 0.7}
              face="worried"
              headPitch={0.08}
            />
          </>
        );
      },
    },
    {
      cue: "2.bridge",
      zone: "bridge",
      look: "overworld-sunset",
      ...cam.push({ on: [0, BRIDGE_Y + 0.65, -4.1], dist: 3.8, to: 2.95, yaw: -36, pitch: 14, fov: 40 }),
      note: "Clue #4: every sunset, all four tiny dads work together to drop the heavy wooden crossbar across the old river bridge.",
      stage: (t) => {
        const dropBar = 1 - tw(t, 0.1, w("2.bridge", "barred") + 0.25);
        return (
          <>
            <BridgePinPost position={[0, BRIDGE_Y, -4.2]} barLift={dropBar * 0.65} pinOut={dropBar * 0.35} />
            <TinyDad which={1} position={[-1.35, BRIDGE_Y, -4.55]} rotationY={SOUTH} hop={Math.abs(Math.sin(t * 5)) * 0.15} mood="angry" />
            <TinyDad which={2} position={[-0.45, BRIDGE_Y, -4.6]} rotationY={SOUTH} squash={0.2 * (1 - dropBar)} mood="scared" />
            <TinyDad which={3} position={[0.48, BRIDGE_Y, -4.6]} rotationY={SOUTH} hop={Math.abs(Math.sin(t * 5 + 1)) * 0.15} mood="scared" />
            <TinyDad which={4} position={[1.45, BRIDGE_Y, -4.55]} rotationY={SOUTH} squash={0.22 * (1 - dropBar)} mood="angry" />
          </>
        );
      },
    },
    {
      cue: "2.water",
      zone: "bridge",
      look: "overworld-sunset",
      ...cam.push({ on: [1.1, 0.65, -2.2], dist: 3.4, to: 2.65, yaw: 42, pitch: 24, fov: 38 }),
      note: "High sunset angle over Hero's shoulder past the barred post down toward the dark swamp water below.",
      stage: (t) => (
        <>
          <BridgePinPost position={[0, BRIDGE_Y, -4.2]} barLift={0} pinOut={0} />
          <Hero
            position={[0.65, BRIDGE_Y, -4.85]}
            rotationY={0.28}
            animation="peek"
            face="uneasy"
            headPitch={0.32 + Math.sin(t * 2.2) * 0.05}
            headYaw={0.18}
          />
          <TinyDad which={1} position={[-0.25, BRIDGE_Y, -4.75]} rotationY={0.35} mood="scared" squash={0.12 + Math.sin(t * 3.5) * 0.08} />
        </>
      ),
    },
    {
      cue: "2.splits",
      zone: "village",
      look: "overworld-day",
      ...cam.push({ on: [-2.85, 0.92, -4.4], dist: 2.7, to: 2.15, yaw: -28, pitch: 6, fov: 36 }),
      note: "Stakes planted by the village well: elderly Grandpa Slime warns Hero seriously that tiny slimes cannot split again.",
      stage: (t) => {
        const nod = Math.sin(t * 3.4) * 0.14;
        return (
          <>
            <GrandpaSlime
              position={[-3.45, 0, -4.45]}
              rotationY={EAST - 0.15}
              squash={0.12 + Math.abs(Math.sin(t * 2.6)) * 0.1}
              nod={0.15 + nod}
              mood="sad"
            />
            <Hero
              position={[-2.05, PATH_Y, -4.3]}
              rotationY={WEST + 0.12}
              animation="idle"
              face="worried"
              headPitch={0.08}
              headYaw={-0.1 * nod}
            />
          </>
        );
      },
    },
    {
      cue: "2.ball",
      zone: "village",
      look: "overworld-day",
      ...cam.push({ on: [-3.15, 0.58, -3.55], dist: 1.75, to: 1.34, yaw: 38, pitch: 20, fov: 33 }),
      note: "Tight solemn insert: a single lone green slimeball on the stone curb while Dad #3 looks up at Hero.",
      stage: (t) => {
        const pulse = pop(t, w("2.ball", "slimeball"), 0.35);
        return (
          <>
            <SlimeballProp position={[-3.32, 0.12, -3.52]} scale={1.15} squash={pulse * 0.28} />
            <TinyDad
              which={3}
              position={[-2.86, 0, -3.62]}
              rotationY={WEST + 0.4}
              squash={0.15 + pulse * 0.2}
              mood="sad"
              nod={-0.18}
            />
            <Hero
              position={[-2.25, PATH_Y, -3.35]}
              rotationY={WEST + 0.25}
              animation="idle"
              face="sad"
              headPitch={0.34}
            />
          </>
        );
      },
    },
  ],
});
