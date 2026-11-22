import { Vox, cam, storyScene } from "../../engine";
import { BRIDGE_Y, PATH_Y, PORCH_Y, ROOM_MARKS, VILLAGE } from "./marks";
import {
  ADULT,
  Bits,
  BridgePinPost,
  DadStack,
  GROUND_SIT,
  GrandpaSlime,
  Hero,
  LowSoupTable,
  NeighborBigDad,
  PottedCactus,
  Puffs,
  ROBE,
  SOUTH,
  SlimeballProp,
  TinyDad,
  Villager,
  groundSitPose,
  jolt,
  pop,
  timing,
  tw,
  w,
} from "./kit";

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Clumsy Excuses & Zero Splits",
  shots: [
    {
      cue: "2.bump",
      zone: "village",
      look: "overworld-day",
      ...cam.push({ on: [0, 0.95, 0.4], dist: 5.4, to: 4.3, yaw: -28, pitch: 12, fov: 44 }),
      note: "A neighbour's big slime dad accidentally bumps a villager flat off his feet on the street.",
      stage: (t) => {
        const hit = w("2.bump", "knocks");
        const fall = tw(t, hit, hit + 0.45);
        return (
          <>
            <NeighborBigDad
              variant={2}
              position={[-0.85 + jolt(t, hit, 0.35), PATH_Y, 0.35]}
              rotationY={0.55}
              squash={pop(t, hit, 0.25) * 0.3}
            />
            <Villager
              position={[0.55 + fall * 0.95, PATH_Y, 0.45]}
              rotationY={-0.55}
              scale={ADULT}
              robe={ROBE.smith}
              lean={-fall * 1.1}
              turn={fall * 0.35}
            />
            {t >= hit ? <Puffs position={[0.25, 0.45, 0.45]} count={6} color="#f5ebd4" /> : null}
          </>
        );
      },
    },
    {
      cue: "2.shin",
      zone: "village",
      look: "overworld-day",
      ...cam.push({ on: [0.05, 0.55, -3.2], dist: 3.55, to: 2.75, yaw: 26, pitch: 18, fov: 40 }),
      note: "Clear shin shot: knee-high Tiny Dad #1 boings harmlessly into Hero's sneaker and squishes.",
      stage: (t) => {
        const boingAt = w("2.shin", "tiny");
        const hop = Math.abs(Math.sin((t + 0.2) * 5.2));
        const bump = jolt(t, boingAt, 0.22);
        return (
          <>
            <Hero
              position={[-0.48, PATH_Y, -3.25]}
              rotationY={0.35}
              animation="idle"
              face="smile"
              headPitch={0.28}
              headYaw={0.2 + Math.sin(t * 2) * 0.04}
            />
            <TinyDad
              which={1}
              position={[0.42 - bump * 0.42, PATH_Y, -3.12]}
              rotationY={-0.45}
              hop={hop * 0.18}
              squash={pop(t, boingAt, 0.28) * 0.4}
            />
          </>
        );
      },
    },
    {
      cue: "2.dinner",
      zone: "room",
      look: "overworld-day",
      ...cam.orbit({ on: [-0.25, 0.58, 0.15], dist: 4.5, distTo: 3.75, yaw: -16, yawTo: 6, pitch: 24, fov: 43 }),
      note: "Around the ankle-high soup table: Hero sits on the left while all four tiny dads lecture him about his carrots.",
      stage: (t) => (
        <>
          <LowSoupTable position={ROOM_MARKS.table} t={t} />
          <Hero
            position={[-1.35, GROUND_SIT, 0.35]}
            rotationY={0.85}
            pose={groundSitPose(t, { head: [0.16, Math.sin(t * 4.2) * 0.2, 0] })}
            face="frown"
          />
          <TinyDad which={1} position={[-0.78, 0, -0.58]} rotationY={0.2} hop={Math.abs(Math.sin(t * 6.5)) * 0.12} mood="angry" />
          <TinyDad which={2} position={[-0.22, 0, -0.66]} rotationY={0.05} hop={Math.abs(Math.sin(t * 6.5 + 1)) * 0.12} mood="angry" />
          <TinyDad which={3} position={[0.32, 0, -0.58]} rotationY={-0.15} hop={Math.abs(Math.sin(t * 6.5 + 2)) * 0.12} mood="happy" />
          <TinyDad which={4} position={[0.68, 0, 0.08]} rotationY={-0.65} hop={Math.abs(Math.sin(t * 6.5 + 3)) * 0.12} mood="angry" />
        </>
      ),
    },
    {
      cue: "2.soup",
      zone: "room",
      look: "overworld-day",
      ...cam.push({ on: [-0.22, 0.5, 0.15], dist: 3.4, to: 2.65, yaw: 18, pitch: 28, fov: 40 }),
      note: "Comedy insert: Dad #3 in the crooked blue tie slips off the table edge straight into the green soup pot!",
      stage: (t) => {
        const slipAt = w("2.soup", "slipped");
        const k = tw(t, slipAt - 0.08, slipAt + 0.32);
        return (
          <>
            <LowSoupTable position={ROOM_MARKS.table} t={t} />
            <TinyDad
              which={3}
              position={[0.12 - k * 0.34, 0.36 + Math.sin(k * Math.PI) * 0.22 - k * 0.06, -0.18 + k * 0.32]}
              rotationY={-0.25 + k * 0.9}
              squash={pop(t, slipAt + 0.18, 0.28) * 0.45}
              mood={k > 0.3 ? "scared" : "happy"}
            />
            <TinyDad which={1} position={[-0.85, 0, -0.45]} rotationY={0.35} nod={-k * 0.25} mood="sad" />
            <TinyDad which={2} position={[0.62, 0, -0.42]} rotationY={-0.4} nod={-k * 0.25} mood="scared" />
            {t >= slipAt + 0.12 ? (
              <Bits position={[-0.25, 0.58, 0.15]} t={t - (slipAt + 0.12)} color="#7aff54" count={10} power={0.8} />
            ) : null}
          </>
        );
      },
    },
    {
      cue: "2.door",
      zone: "room",
      look: "overworld-day",
      ...cam.push({ on: [-0.75, 0.9, -1.65], dist: 4.5, to: 3.6, yaw: -14, pitch: 9, fov: 43 }),
      note: "At the back cottage door: all four tiny dads stack on each other's heads to reach the brass handle.",
      stage: (t) => {
        const reach = tw(t, 0.15, w("2.door", "head") + 0.15);
        return (
          <>
            <DadStack
              position={[-1.18, 0, -1.82]}
              rotationY={0.25}
              sway={Math.sin(t * 5.2) * 0.32}
              squash={0.08 + Math.sin(t * 4) * 0.06}
              topLean={reach * 0.65}
            />
            <Hero
              position={[0.25, 0, -1.35]}
              rotationY={-0.42}
              animation="idle"
              face="smile"
              headYaw={0.22 * reach}
            />
          </>
        );
      },
    },
    {
      cue: "2.clumsy",
      zone: "room",
      look: "overworld-day",
      ...cam.push({ on: [-0.25, 0.92, -1.25], dist: 3.85, to: 3.05, yaw: 16, pitch: 8, fov: 41 }),
      note: "Hero grins and shrugs fondly toward the lens while the four-dad tower tumbles softly behind him.",
      stage: (t) => {
        const tip = tw(t, w("2.clumsy", "clumsy") - 0.2, w("2.clumsy", "clumsy") + 0.35);
        return (
          <>
            <Hero
              position={[0.42, 0, -0.95]}
              rotationY={-0.15}
              animation="shrug"
              face="grin"
              headYaw={-0.14 + tip * 0.22}
            />
            <TinyDad which={1} position={[-0.95, 0, -1.65]} rotationY={0.2} squash={tip * 0.28} />
            <TinyDad which={2} position={[-0.95 + tip * 0.44, 0.37 * (1 - tip), -1.62]} rotationY={0.5} squash={tip * 0.32} />
            <TinyDad which={3} position={[-0.95 - tip * 0.42, 0.74 * (1 - tip), -1.58]} rotationY={-0.4} mood="scared" />
            <TinyDad which={4} position={[-0.95 + tip * 0.16, 1.11 * (1 - tip), -1.48]} rotationY={0.15} mood="happy" />
          </>
        );
      },
    },
    {
      cue: "2.porch",
      zone: "village",
      look: "overworld-day",
      ...cam.push({ on: [0.95, 0.55, -11.75], dist: 4.35, to: 3.4, yaw: -24, pitch: 24, fov: 42 }),
      note: "Clue #1: twin white craters beside our front porch steps as Tiny Dad #1 & #2 mime tripping down the stairs.",
      stage: (t) => {
        const hop = Math.abs(Math.sin(t * 5.4)) * 0.16;
        return (
          <>
            <Hero
              position={[0.05, PORCH_Y, -12.35]}
              rotationY={0.35}
              animation="idle"
              face="calm"
              headPitch={0.28}
              headYaw={0.22 + Math.sin(t * 2.5) * 0.06}
            />
            <TinyDad which={1} position={[0.78, 0, -11.45]} rotationY={-0.25} hop={hop} nod={0.22} mood="scared" />
            <TinyDad which={2} position={[2.12, 0, -11.55]} rotationY={-0.45} squash={0.14 + Math.sin(t * 4) * 0.08} mood="calm" />
          </>
        );
      },
    },
    {
      cue: "2.cactus",
      zone: "village",
      look: "overworld-day",
      ...cam.push({ on: [1.35, 0.58, -12.55], dist: 3.65, to: 2.85, yaw: 28, pitch: 16, fov: 40 }),
      note: "Clue #2 excuse: Tiny Dad #2 & #3 bounce beside a tiny potted cactus miming bumping into one.",
      stage: (t) => {
        const chomp = tw(t, w("2.cactus", "cactus") - 0.15, w("2.cactus", "cactus") + 0.25);
        return (
          <>
            <PottedCactus position={VILLAGE.cactus} bitten={chomp} />
            <TinyDad
              which={2}
              position={[1.05 + jolt(t, w("2.cactus", "walking"), 0.22), PORCH_Y, -12.55]}
              rotationY={0.45}
              hop={Math.abs(Math.sin(t * 5.8)) * 0.15}
              mood="scared"
            />
            <TinyDad
              which={3}
              position={[0.62, PORCH_Y, -12.35]}
              rotationY={0.25}
              squash={0.12 + chomp * 0.22}
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
      ...cam.orbit({ on: [0, 1.15, -9.5], dist: 7.6, distTo: 6.2, yaw: -18, yawTo: 10, pitch: 18, fov: 47 }),
      note: "Wide pullback showing our lush wet swamp village & lilypad puddles: Hero shrugs deadpan—zero desert cacti here!",
      stage: (t) => (
        <>
          <Hero
            position={[0, PATH_Y, -9.2]}
            rotationY={SOUTH}
            animation="shrug"
            blendTo="lookAround"
            blend={tw(t, 0.2, 1.1)}
            face="uneasy"
            headYaw={Math.sin(t * 3.0) * 0.28}
          />
          <TinyDad which={1} position={[-0.78, PATH_Y, -9.5]} rotationY={SOUTH} squash={Math.abs(Math.sin(t * 3.4)) * 0.14} />
          <TinyDad which={4} position={[0.78, PATH_Y, -9.5]} rotationY={SOUTH} hop={Math.abs(Math.sin(t * 4.2)) * 0.14} />
        </>
      ),
    },
    {
      cue: "2.coat",
      zone: "room",
      look: "overworld-day",
      ...cam.push({ on: [-0.55, 1.05, -2.1], dist: 3.45, to: 2.68, yaw: -14, pitch: 6, fov: 39 }),
      note: "Clue #3: Hero stands clearly to the left reaching gently toward his torn blue baby coat hanging on the back wall.",
      stage: (t) => {
        const touch = tw(t, 0.15, w("2.coat", "coat") + 0.2);
        return (
          <>
            <Hero
              position={[-1.08, 0, -1.82]}
              rotationY={0.72}
              animation="reach"
              blendTo="idle"
              blend={1 - touch * 0.65}
              face="worried"
              headPitch={-0.06}
              headYaw={-0.18 * touch}
            />
          </>
        );
      },
    },
    {
      cue: "2.bridge",
      zone: "bridge",
      look: "overworld-sunset",
      ...cam.push({ on: [0, BRIDGE_Y + 0.55, -4.15], dist: 5.1, to: 4.05, yaw: 24, pitch: 14, fov: 44 }),
      note: "Clue #4: every sunset, all four tiny dads gather at the river bridge post to drop the heavy wooden crossbar.",
      stage: (t) => {
        const dropBar = 1 - tw(t, 0.1, w("2.bridge", "barred") + 0.25);
        return (
          <>
            <BridgePinPost position={[0, BRIDGE_Y, -4.2]} barLift={dropBar * 0.65} pinOut={dropBar * 0.35} />
            <TinyDad which={1} position={[-1.25, BRIDGE_Y, -3.65]} rotationY={0.2} hop={Math.abs(Math.sin(t * 5)) * 0.14} mood="angry" />
            <TinyDad which={2} position={[-0.42, BRIDGE_Y, -3.55]} rotationY={0.1} squash={0.18 * (1 - dropBar)} mood="scared" />
            <TinyDad which={3} position={[0.42, BRIDGE_Y, -3.55]} rotationY={-0.1} hop={Math.abs(Math.sin(t * 5 + 1)) * 0.14} mood="scared" />
            <TinyDad which={4} position={[1.25, BRIDGE_Y, -3.65]} rotationY={-0.2} squash={0.2 * (1 - dropBar)} mood="angry" />
          </>
        );
      },
    },
    {
      cue: "2.water",
      zone: "bridge",
      look: "overworld-sunset",
      ...cam.push({ on: [0.6, BRIDGE_Y + 0.2, -2.4], dist: 5.8, to: 4.65, yaw: -32, pitch: 26, fov: 45 }),
      note: "Elevated sunset view over the open wooden bridge rail down into the dark swamp river and lilypads.",
      stage: (t) => (
        <>
          <BridgePinPost position={[0, BRIDGE_Y, -4.2]} barLift={0} pinOut={0} />
          <Hero
            position={[0.85, BRIDGE_Y, -3.25]}
            rotationY={0.45}
            animation="peek"
            face="uneasy"
            headPitch={0.28 + Math.sin(t * 2.2) * 0.05}
            headYaw={0.18}
          />
          <TinyDad which={1} position={[0.05, BRIDGE_Y, -3.35]} rotationY={0.35} mood="scared" squash={0.12 + Math.sin(t * 3.5) * 0.08} />
        </>
      ),
    },
    {
      cue: "2.splits",
      zone: "village",
      look: "overworld-day",
      ...cam.push({ on: [-0.85, 0.78, -5.6], dist: 4.5, to: 3.6, yaw: 18, pitch: 10, fov: 42 }),
      note: "On the open village lane: wise white-browed Grandpa Slime warns Hero that tiny slimes have zero splits left.",
      stage: (t) => {
        const nod = Math.sin(t * 3.4) * 0.12;
        return (
          <>
            <GrandpaSlime
              position={[-1.45, PATH_Y, -5.65]}
              rotationY={0.42}
              squash={0.1 + Math.abs(Math.sin(t * 2.6)) * 0.08}
              nod={0.12 + nod}
              mood="sad"
            />
            <Hero
              position={[-0.18, PATH_Y, -5.55]}
              rotationY={-0.42}
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
      ...cam.push({ on: [-0.82, 0.52, -5.5], dist: 3.35, to: 2.55, yaw: -22, pitch: 22, fov: 40 }),
      note: "Solemn close-up: a lone green slimeball on a low wooden block between tiny Dad #3 and worried Hero.",
      stage: (t) => {
        const pulse = pop(t, w("2.ball", "slimeball"), 0.35);
        return (
          <>
            <Vox kind="planks" position={[-0.85, 0.14, -5.45]} size={[0.42, 0.28, 0.42]} />
            <SlimeballProp position={[-0.85, 0.28, -5.45]} scale={1.15} squash={pulse * 0.26} />
            <TinyDad
              which={3}
              position={[-1.42, PATH_Y, -5.52]}
              rotationY={0.35}
              squash={0.14 + pulse * 0.18}
              mood="sad"
              nod={0.15}
            />
            <Hero
              position={[-0.18, PATH_Y, -5.48]}
              rotationY={-0.42}
              animation="idle"
              face="sad"
              headPitch={0.28}
            />
          </>
        );
      },
    },
  ],
});
