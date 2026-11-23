import { Vox, cam, storyScene } from "../../engine";
import { BRIDGE_Y, PATH_Y, PORCH_Y, ROOM_MARKS, VILLAGE, WATER_Y } from "./marks";
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
  openArmsPose,
  pop,
  posed,
  sceneImpact,
  slimeBounce,
  slimeHopTo,
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
      ...cam.push({
        on: [-0.25, 0.92, 0.4],
        onTo: [0.55, 0.78, 0.45],
        dist: 5.2,
        to: 4.2,
        yaw: -30,
        pitch: 11,
        fov: 45,
        fovTo: 41,
      }),
      impacts: [sceneImpact("2.bump", "2.bump", "knocks", 0.052, 0.34)],
      ease: "outCubic",
      note: "Whip-follow impact: a big neighbour slime hops into a villager and knocks him flat off his feet!",
      stage: (t) => {
        const hit = w("2.bump", "knocks");
        const hopIn = slimeHopTo([-1.55, PATH_Y, 0.35], [-0.65, PATH_Y, 0.35], tw(t, 0, hit), 1, 0.36);
        const fall = tw(t, hit, hit + 0.42);
        return (
          <>
            <NeighborBigDad
              variant={2}
              position={[hopIn.position[0] + jolt(t, hit, 0.12), hopIn.position[1] + hopIn.hop, hopIn.position[2]]}
              rotationY={0.55}
              squash={hopIn.squash + pop(t, hit, 0.24) * 0.3}
            />
            <Villager
              position={[0.48 + fall * 1.15, PATH_Y + Math.sin(fall * Math.PI) * 0.28, 0.45]}
              rotationY={-0.55}
              scale={ADULT}
              robe={ROBE.smith}
              lean={-fall * 1.28}
              turn={fall * 0.4}
            />
            {t >= hit ? <Puffs position={[0.25, 0.45, 0.45]} count={7} color="#f5ebd4" /> : null}
          </>
        );
      },
    },
    {
      cue: "2.shin",
      zone: "village",
      look: "overworld-day",
      ...cam.orbit({
        on: [0.05, 0.42, -3.2],
        onTo: [-0.15, 0.34, -3.2],
        dist: 3.15,
        distTo: 2.45,
        yaw: 34,
        yawTo: 14,
        pitch: 10,
        pitchTo: 4,
        fov: 38,
      }),
      handheld: 0.012,
      note: "Sneaker-level worm's-eye arc: Tiny Dad #1 hops twice straight into Hero's shoe and squishes harmlessly.",
      stage: (t) => {
        const boingAt = w("2.shin", "tiny") + 0.22;
        const hop = slimeHopTo([0.78, PATH_Y, -3.08], [0.02, PATH_Y, -3.14], tw(t, 0, boingAt), 2, 0.24);
        const rebound = tw(t, boingAt, boingAt + 0.35);
        return (
          <>
            <Hero
              position={[-0.48, PATH_Y, -3.25]}
              rotationY={0.35}
              pose={posed("idle", t, { bodyPitch: 0.1, head: [0.34, 0.22, 0] })}
              face="grin"
            />
            <TinyDad
              which={1}
              position={[hop.position[0] + rebound * 0.24, hop.position[1] + hop.hop, hop.position[2]]}
              rotationY={-0.48}
              squash={hop.squash + pop(t, boingAt, 0.28) * 0.42}
            />
          </>
        );
      },
    },
    {
      cue: "2.dinner",
      zone: "room",
      look: "overworld-day",
      ...cam.orbit({
        on: [-0.32, 0.56, 0.12],
        dist: 4.85,
        distTo: 3.95,
        yaw: -18,
        yawTo: 12,
        pitch: 26,
        pitchTo: 18,
        fov: 44,
      }),
      handheld: 0.012,
      note: "Sweeping orbit around the low soup table: Hero sulks over his bowl while all four tiny dads bounce lecturing him.",
      stage: (t) => {
        const b1 = slimeBounce(t, 2.2, 0.14, 0.0);
        const b2 = slimeBounce(t, 2.3, 0.14, 0.3);
        const b3 = slimeBounce(t, 2.1, 0.14, 0.6);
        const b4 = slimeBounce(t, 2.4, 0.14, 0.85);
        return (
          <>
            <LowSoupTable position={ROOM_MARKS.table} t={t} />
            <Hero
              position={[-1.32, GROUND_SIT, -0.06]}
              rotationY={0.72}
              pose={groundSitPose(t, {
                head: [0.2, Math.sin(t * 4.2) * 0.24, 0],
                armR: [-0.95 + Math.sin(t * 6) * 0.12, -0.2, 0],
              })}
              face="frown"
            />
            <TinyDad which={1} position={[-0.78, 0, -0.58]} rotationY={0.2} hop={b1.hop} squash={b1.squash} mood="angry" />
            <TinyDad which={2} position={[-0.22, 0, -0.66]} rotationY={0.05} hop={b2.hop} squash={b2.squash} mood="angry" />
            <TinyDad which={3} position={[0.32, 0, -0.58]} rotationY={-0.15} hop={b3.hop} squash={b3.squash} mood="happy" />
            <TinyDad which={4} position={[0.76, 0, 0.12]} rotationY={-0.55} hop={b4.hop} squash={b4.squash} mood="angry" />
          </>
        );
      },
    },
    {
      cue: "2.soup",
      zone: "room",
      look: "overworld-day",
      ...cam.top({
        on: [-0.25, 0.36, 0.15],
        height: 2.75,
        to: 2.05,
        spin: [-9, 7],
        fov: 41,
      }),
      impacts: [sceneImpact("2.bump", "2.soup", "slipped", 0.035, 0.28)],
      note: "Signature top-down spin (`cam.top`) onto the soup table: Dad #3 skids and plops dead-centre into the green soup pot!",
      stage: (t) => {
        const slipAt = w("2.soup", "slipped");
        const k = tw(t, slipAt - 0.12, slipAt + 0.28);
        return (
          <>
            <LowSoupTable position={ROOM_MARKS.table} t={t} />
            <TinyDad
              which={3}
              position={[0.24 - k * 0.49, 0.36 + k * 0.2 + Math.sin(k * Math.PI) * 0.26, 0.38 - k * 0.23]}
              rotationY={-0.25 + k * 1.35}
              squash={pop(t, slipAt + 0.16, 0.28) * 0.48}
              mood={k > 0.25 ? "scared" : "happy"}
            />
            <TinyDad which={1} position={[-0.86, 0, -0.56]} rotationY={0.55} lookAt={[-0.25, 0.45, 0.15]} mood="sad" />
            <TinyDad which={2} position={[0.52, 0, -0.56]} rotationY={-0.55} lookAt={[-0.25, 0.45, 0.15]} mood="scared" />
            <TinyDad which={4} position={[-0.25, 0, 0.84]} rotationY={3.14} lookAt={[-0.25, 0.45, 0.15]} mood="scared" />
            {t >= slipAt + 0.1 ? (
              <Bits position={[-0.25, 0.58, 0.15]} t={t - (slipAt + 0.1)} color="#7aff54" count={12} power={0.9} />
            ) : null}
          </>
        );
      },
    },
    {
      cue: "2.door",
      zone: "room",
      look: "overworld-day",
      ...cam.push({
        on: [-0.88, 0.52, -1.72],
        onTo: [-0.88, 1.12, -1.72],
        dist: 4.45,
        to: 3.5,
        yaw: -14,
        pitch: 14,
        fov: 43,
        fovTo: 39,
      }),
      note: "Rising crane tilt up the four-dad tower as they hop-stack on each other's heads to click open the brass door handle!",
      stage: (t) => {
        const build = tw(t, 0, 0.55);
        const reach = tw(t, 0.35, w("2.door", "head") + 0.2);
        return (
          <>
            <DadStack
              position={[-1.18, 0, -1.82]}
              rotationY={0.25}
              assemble={0.35 + build * 0.65}
              sway={Math.sin(t * 5.4) * 0.34}
              squash={0.08 + Math.sin(t * 4) * 0.06}
              topLean={reach * 0.75}
            />
            <Hero
              position={[0.25, 0, -1.35]}
              rotationY={-0.42}
              animation="idle"
              face="smile"
              lookAt={[-1.18, 0.4 + build * 0.9, -1.82]}
            />
          </>
        );
      },
    },
    {
      cue: "2.clumsy",
      zone: "room",
      look: "overworld-day",
      ...cam.orbit({
        on: [0.05, 0.92, -1.15],
        dist: 3.65,
        distTo: 2.95,
        yaw: 20,
        yawTo: 4,
        pitch: 6,
        fov: 39,
      }),
      handheld: 0.014,
      note: "Close reaction on Hero shrugging to the lens while the four-dad stack behind him wobbles and tumbles apart!",
      stage: (t) => {
        const tipAt = w("2.clumsy", "clumsy") - 0.15;
        const tip = tw(t, tipAt, tipAt + 0.42);
        return (
          <>
            <Hero
              position={[0.42, 0, -0.92]}
              rotationY={-0.12}
              animation="shrug"
              face="grin"
              gaze={0}
              headYaw={-0.1 + tip * 0.24}
            />
            <TinyDad which={1} position={[-0.95, 0, -1.65]} rotationY={0.2} squash={tip * 0.32} />
            <TinyDad which={2} position={[-0.95 + tip * 0.48, 0.37 * (1 - tip) + Math.sin(tip * Math.PI) * 0.18, -1.6]} rotationY={0.55} squash={tip * 0.34} />
            <TinyDad which={3} position={[-0.95 - tip * 0.46, 0.74 * (1 - tip) + Math.sin(tip * Math.PI) * 0.22, -1.55]} rotationY={-0.45} mood="scared" />
            <TinyDad which={4} position={[-0.95 + tip * 0.14, 1.11 * (1 - tip) + Math.sin(tip * Math.PI) * 0.26, -1.45 + tip * 0.34]} rotationY={0.18} mood="happy" />
          </>
        );
      },
    },
    {
      cue: "2.porch",
      zone: "village",
      look: "overworld-day",
      ...cam.push({
        on: [0.95, 0.62, -11.75],
        onTo: [1.35, 0.28, -11.55],
        dist: 4.35,
        to: 3.25,
        yaw: -26,
        pitch: 28,
        fov: 42,
        fovTo: 38,
      }),
      note: "Clue #1 tilt-down: Tiny Dad #1 dramatically mimes tumbling down the porch steps right beside the twin white craters.",
      stage: (t) => {
        const tumble = slimeHopTo([0.65, PORCH_Y, -12.15], [0.82, 0, -11.45], tw(t, 0.05, 0.65), 2, 0.26);
        const b2 = slimeBounce(t, 1.8, 0.14, 0.4);
        return (
          <>
            <Hero
              position={[0.02, PORCH_Y, -12.35]}
              rotationY={0.35}
              animation="idle"
              face="uneasy"
              lookAt={[1.35, 0.1, -11.55]}
            />
            <TinyDad
              which={1}
              position={[tumble.position[0], tumble.position[1] + tumble.hop, tumble.position[2]]}
              rotationY={-0.25 + tw(t, 0.1, 0.6) * 0.4}
              squash={tumble.squash}
              mood="scared"
            />
            <TinyDad which={2} position={[2.12, 0, -11.55]} rotationY={-0.45} hop={b2.hop} squash={b2.squash} mood="calm" />
          </>
        );
      },
    },
    {
      cue: "2.cactus",
      zone: "village",
      look: "overworld-day",
      ...cam.orbit({
        on: [1.35, 0.56, -12.55],
        dist: 3.45,
        distTo: 2.7,
        yaw: 36,
        yawTo: 16,
        pitch: 14,
        fov: 39,
      }),
      impacts: [sceneImpact("2.bump", "2.cactus", "cactus", 0.032, 0.24)],
      note: "Side-arc gag: Tiny Dad #2 hops headfirst into the tiny porch cactus and bounces back squinting!",
      stage: (t) => {
        const hitAt = w("2.cactus", "cactus") - 0.1;
        const hopIn = slimeHopTo([0.85, PORCH_Y, -12.48], [1.28, PORCH_Y, -12.55], tw(t, 0, hitAt), 1, 0.22);
        const recoil = tw(t, hitAt, hitAt + 0.35);
        const b3 = slimeBounce(t, 2.2, 0.15, 0.2);
        return (
          <>
            <PottedCactus position={VILLAGE.cactus} bitten={recoil} />
            <TinyDad
              which={2}
              position={[hopIn.position[0] - recoil * 0.32 + jolt(t, hitAt, 0.18), hopIn.position[1] + hopIn.hop, hopIn.position[2]]}
              rotationY={0.48}
              squash={hopIn.squash + pop(t, hitAt, 0.24) * 0.36}
              mood="scared"
            />
            <TinyDad which={3} position={[0.55, PORCH_Y, -12.3]} rotationY={0.28} hop={b3.hop} squash={b3.squash} mood="happy" />
          </>
        );
      },
    },
    {
      cue: "2.swamp",
      zone: "village",
      look: "overworld-day",
      ...cam.push({
        on: [0, 0.95, -9.2],
        onTo: [0, 1.35, -9.8],
        dist: 4.6,
        to: 8.4,
        yaw: -14,
        pitch: 19,
        fov: 42,
        fovTo: 50,
      }),
      arc: 0.45,
      note: "Dramatic PULL-OUT environment reveal: starts on Hero spreading his arms deadpan, pulls wide to reveal our wet green swamp village!",
      stage: (t) => {
        const b1 = slimeBounce(t, 1.6, 0.14, 0.1);
        const b4 = slimeBounce(t, 1.6, 0.14, 0.6);
        return (
          <>
            <Hero
              position={[0, PATH_Y, -9.2]}
              rotationY={SOUTH}
              pose={openArmsPose(t)}
              face="frown"
              gaze={0}
              headYaw={Math.sin(t * 3.2) * 0.26}
            />
            <TinyDad which={1} position={[-0.78, PATH_Y, -9.45]} rotationY={SOUTH} hop={b1.hop} squash={b1.squash} />
            <TinyDad which={4} position={[0.78, PATH_Y, -9.45]} rotationY={SOUTH} hop={b4.hop} squash={b4.squash} />
          </>
        );
      },
    },
    {
      cue: "2.coat",
      zone: "room",
      look: "overworld-day",
      ...cam.pan({
        from: [-0.95, 1.3, 0.42],
        on: [-0.92, 1.12, -1.78],
        onTo: [-0.32, 1.18, -2.32],
        fov: 38,
        fovTo: 34,
      }),
      handheld: 0.01,
      note: "Intimate `cam.pan` from Hero's reaching hand across onto the torn blue baby coat and dried green slime fleck.",
      stage: (t) => {
        const touch = tw(t, 0.1, w("2.coat", "coat") + 0.25);
        return (
          <Hero
            position={[-1.06, 0, -1.82]}
            rotationY={0.72}
            pose={posed("idle", t, {
              armL: [-1.15 * touch - 0.25, 0.22, -0.12],
              head: [-0.08, -0.18 * touch, 0],
            })}
            face="uneasy"
          />
        );
      },
    },
    {
      cue: "2.bridge",
      zone: "bridge",
      look: "overworld-sunset",
      ...cam.truck({
        on: [-0.42, BRIDGE_Y + 0.55, -4.15],
        dist: 4.85,
        yaw: 26,
        pitch: 13,
        by: [0.84, -0.1, 0],
        fov: 43,
      }),
      impacts: [sceneImpact("2.bump", "2.bridge", "barred", 0.038, 0.28)],
      note: "Lateral sunset `cam.truck` across the bridge post as all four tiny dads hop in unison to slam the crossbar shut.",
      stage: (t) => {
        const dropBar = 1 - tw(t, 0.1, w("2.bridge", "barred") + 0.2);
        const b = (ph: number) => slimeBounce(t, 2.1, 0.18 * dropBar + 0.05, ph);
        return (
          <>
            <BridgePinPost position={[0, BRIDGE_Y, -4.2]} barLift={dropBar * 0.72} pinOut={dropBar * 0.35} />
            <TinyDad which={1} position={[-1.12, BRIDGE_Y, -3.65]} rotationY={0.2} hop={b(0).hop} squash={b(0).squash} mood="angry" />
            <TinyDad which={2} position={[-0.38, BRIDGE_Y, -3.55]} rotationY={0.1} hop={b(0.25).hop} squash={b(0.25).squash} mood="scared" />
            <TinyDad which={3} position={[0.38, BRIDGE_Y, -3.55]} rotationY={-0.1} hop={b(0.5).hop} squash={b(0.5).squash} mood="scared" />
            <TinyDad which={4} position={[1.12, BRIDGE_Y, -3.65]} rotationY={-0.2} hop={b(0.75).hop} squash={b(0.75).squash} mood="angry" />
          </>
        );
      },
    },
    {
      cue: "2.water",
      zone: "bridge",
      look: "overworld-sunset",
      ...cam.orbit({
        on: [0.85, BRIDGE_Y + 0.55, -3.15],
        onTo: [2.05, -0.75, -2.05],
        dist: 5.2,
        distTo: 4.95,
        yaw: -32,
        yawTo: -54,
        pitch: 20,
        pitchTo: 36,
        fov: 45,
      }),
      note: "High tilt-and-orbit over Hero's shoulder as he leans across the open bridge rail peering into the deep sunset river gorge.",
      stage: (t) => {
        const b1 = slimeBounce(t, 1.5, 0.1, 0.2);
        return (
          <>
            <BridgePinPost position={[0, BRIDGE_Y, -4.2]} barLift={0} pinOut={0} />
            <Hero
              position={[0.92, BRIDGE_Y, -3.2]}
              rotationY={0.62}
              animation="leanOver"
              face="uneasy"
              lookAt={[2.6, -1.6, -1.8]}
            />
            <TinyDad which={1} position={[0.08, BRIDGE_Y, -3.35]} rotationY={0.45} hop={b1.hop} squash={b1.squash} mood="scared" />
          </>
        );
      },
    },
    {
      cue: "2.splits",
      zone: "village",
      look: "overworld-day",
      ...cam.orbit({
        on: [-0.85, 0.78, -5.6],
        onTo: [-1.05, 0.72, -5.62],
        dist: 4.45,
        distTo: 3.45,
        yaw: 24,
        yawTo: 6,
        pitch: 10,
        pitchTo: 5,
        fov: 41,
      }),
      handheld: 0.012,
      note: "Orbiting in from two-shot profile onto wise white-browed Grandpa Slime as he warns Hero about zero splits left.",
      stage: (t) => {
        const b = slimeBounce(t, 1.25, 0.12, 0.15);
        return (
          <>
            <GrandpaSlime
              position={[-1.45, PATH_Y + b.hop, -5.65]}
              rotationY={0.42}
              squash={b.squash}
              nod={0.14 + Math.sin(t * 3.6) * 0.1}
              mood="sad"
            />
            <Hero
              position={[-0.18, PATH_Y, -5.55]}
              rotationY={-0.42}
              animation="idle"
              face="uneasy"
              lookAt={[-1.45, 0.65, -5.65]}
            />
          </>
        );
      },
    },
    {
      cue: "2.ball",
      zone: "village",
      look: "overworld-day",
      ...cam.push({
        on: [-0.85, 0.44, -5.45],
        dist: 3.05,
        to: 2.22,
        yaw: -24,
        pitch: 23,
        fov: 37,
        fovTo: 34,
      }),
      handheld: 0.01,
      note: "Tight macro push onto a lone glowing green slimeball pulsing between sad Tiny Dad #3 and downcast Hero.",
      stage: (t) => {
        const pulse = pop(t, w("2.ball", "slimeball"), 0.35);
        return (
          <>
            <Vox kind="planks" position={[-0.85, 0.14, -5.45]} size={[0.42, 0.28, 0.42]} />
            <SlimeballProp position={[-0.85, 0.28, -5.45]} scale={1.15} squash={pulse * 0.28} />
            <TinyDad
              which={3}
              position={[-1.42, PATH_Y, -5.52]}
              rotationY={0.35}
              squash={0.14 + pulse * 0.2}
              mood="sad"
              nod={0.18}
            />
            <Hero
              position={[-0.18, PATH_Y, -5.48]}
              rotationY={-0.42}
              animation="idle"
              face="frown"
              lookAt={[-0.85, 0.35, -5.45]}
            />
          </>
        );
      },
    },
  ],
});
