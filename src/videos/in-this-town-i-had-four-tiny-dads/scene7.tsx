import { cam, storyScene } from "../../engine";
import { PATH_Y } from "./marks";
import {
  CHILD,
  EAST,
  GROUND_SIT,
  Hero,
  NeighborBigDad,
  PixelHeart,
  ROBE,
  SOUTH,
  SlimeBlockProp,
  SubscribeSign,
  TinyDad,
  Villager,
  WEST,
  Wheelbarrow,
  groundSitPose,
  openArmsPose,
  pop,
  timing,
  tw,
  w,
} from "./kit";

/**
 * Clips 07 & 08 — Emotional Payoff & Subscribe CTA (`07-payoff` + `08-sub`, 5 shots):
 *   Why being small was a gift all along (all four can hug him at once without hurting him),
 *   bouncing past the school bell tower next Friday, rolling proudly through the front school gate,
 *   and Dad #3 slipping one last time on the Subscribe sign!
 */
export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "All Four At Once",
  shots: [
    {
      cue: "7.hug",
      zone: "bridge",
      look: "overworld-night",
      ...cam.push({ on: [0, 0.72, -7.8], dist: 2.35, to: 1.82, yaw: -36, pitch: 14, fov: 35 }),
      note: "Quiet emotional breath on the mossy bank: Hero sits on the ground and opens his arms wide to all four tiny dads.",
      stage: (t) => {
        const inLap = tw(t, 0.15, w("7.hug", "hug") + 0.45);
        return (
          <>
            <Hero
              position={[0, 0.12 + GROUND_SIT, -7.85]}
              rotationY={SOUTH}
              pose={{ ...groundSitPose(t), ...openArmsPose(t, 1 - inLap * 0.45), kneeR: [0, 0, 0], kneeL: [0, 0, 0] }}
              face="smile"
              headPitch={0.18}
            />
            <TinyDad which={1} position={[-0.78 * (1 - inLap) - 0.18, 0.12, -7.15 - inLap * 0.42]} rotationY={Math.PI} hop={Math.sin(inLap * Math.PI) * 0.24} />
            <TinyDad which={2} position={[0.78 * (1 - inLap) + 0.18, 0.12, -7.15 - inLap * 0.42]} rotationY={Math.PI} hop={Math.sin(inLap * Math.PI) * 0.24} />
            <TinyDad which={3} position={[-0.45 * (1 - inLap) - 0.12, 0.12 + inLap * 0.32, -6.95 - inLap * 0.62]} rotationY={Math.PI} hop={Math.sin(inLap * Math.PI) * 0.28} />
            <TinyDad which={4} position={[0.45 * (1 - inLap) + 0.12, 0.12 + inLap * 0.32, -6.95 - inLap * 0.62]} rotationY={Math.PI} hop={Math.sin(inLap * Math.PI) * 0.28} />
          </>
        );
      },
    },
    {
      cue: "7.hold",
      zone: "bridge",
      look: "overworld-night",
      ...cam.orbit({ on: [0, 0.78, -7.75], dist: 1.85, distTo: 1.44, yaw: 24, yawTo: 8, pitch: 8, fov: 33 }),
      note: "Payoff close-up: because they are tiny and deal zero damage, all four dads hug Hero's lap and cheeks at once!",
      stage: (t) => {
        const rise = tw(t, 0.1, 1.4);
        return (
          <>
            <Hero
              position={[0, 0.12 + GROUND_SIT, -7.85]}
              rotationY={SOUTH}
              pose={{ ...groundSitPose(t), armR: [-0.95, -0.35, 0.2], armL: [-0.95, 0.35, -0.2] }}
              face="laugh"
              headPitch={0.12}
            />
            <TinyDad which={1} position={[-0.22, 0.22, -7.52]} rotationY={Math.PI - 0.3} scale={0.78} squash={0.18 + Math.sin(t * 4) * 0.08} />
            <TinyDad which={2} position={[0.22, 0.22, -7.52]} rotationY={Math.PI + 0.3} scale={0.78} squash={0.18 + Math.cos(t * 4) * 0.08} />
            <TinyDad which={3} position={[-0.28, 0.62, -7.68]} rotationY={EAST * 0.7} scale={0.72} squash={0.2} />
            <TinyDad which={4} position={[0.28, 0.62, -7.68]} rotationY={WEST * 0.7} scale={0.72} squash={0.2} />
            <PixelHeart position={[-0.28, 1.15 + rise * 0.42, -7.65]} scale={0.75} />
            <PixelHeart position={[0.26, 1.02 + rise * 0.48, -7.62]} scale={0.62} />
          </>
        );
      },
    },
    {
      cue: "7.roof",
      zone: "village",
      look: "overworld-day",
      ...cam.push({ on: [5.9, 4.4, 6.2], dist: 5.9, to: 4.55, yaw: -54, pitch: -14, fov: 45 }),
      note: "Next Friday in the sunny schoolyard: Hero bounces off their Slime Block high past the school bell tower!",
      stage: (t) => {
        const soar = tw(t, 0, w("7.roof", "tower") + 0.35);
        const y = 2.6 + Math.sin(soar * Math.PI * 0.78) * 4.45;
        return (
          <>
            <SlimeBlockProp position={[5.2, PATH_Y, 5.8]} scale={1.08} squash={pop(t, 0.08, 0.28) * 0.45} />
            <Hero
              position={[5.2 + soar * 0.45, y, 5.8 + soar * 0.55]}
              rotationY={WEST}
              animation="cheer"
              face="laugh"
            />
            <TinyDad which={1} position={[4.35, PATH_Y, 5.45]} rotationY={EAST} hop={Math.abs(Math.sin(t * 6)) * 0.22} />
            <TinyDad which={2} position={[4.35, PATH_Y, 6.15]} rotationY={EAST} hop={Math.abs(Math.sin(t * 6 + 1)) * 0.22} />
            <NeighborBigDad variant={0} position={[3.6, PATH_Y, 3.8]} rotationY={EAST} mood="happy" />
            <Villager position={[4.3, PATH_Y, 4.35]} rotationY={EAST} scale={CHILD} robe={ROBE.farmer} nod={-0.38} />
          </>
        );
      },
    },
    {
      cue: "7.gate",
      zone: "village",
      look: "overworld-day",
      ...cam.truck({
        on: [2.1, 0.92, 3.5],
        dist: 3.3,
        yaw: -72,
        pitch: 12,
        by: [1.55, 0, 0],
        fov: 38,
      }),
      note: "Reversal of 3.corner: Hero proudly rolls all four tiny dads straight through the front school gate!",
      stage: (t, { p }) => {
        const x = 1.15 + p * 1.85;
        return (
          <>
            <Hero
              position={[x - 0.68, PATH_Y, 3.5]}
              rotationY={EAST}
              animation="walk"
              arms="hold"
              animDistance={p * 1.85}
              plantFeet
              face="grin"
            />
            <Wheelbarrow
              position={[x + 0.28, PATH_Y, 3.5]}
              rotationY={EAST}
              tilt={-0.08}
              wheelSpin={p * 7.2}
              withDads
              dadBounce={t * 6.5}
            />
            <Villager position={[3.55, PATH_Y, 2.35]} rotationY={SOUTH} scale={CHILD} robe={ROBE.white} nod={Math.sin(t * 6) * 0.14} />
          </>
        );
      },
    },
    {
      cue: "8.sub",
      zone: "village",
      look: "overworld-day",
      ...cam.push({ on: [0, 1.05, -5.2], dist: 3.15, to: 2.45, yaw: -14, pitch: 6, fov: 37 }),
      note: "Closing Subscribe CTA: Dad #3 in the crooked blue tie slips sideways out of the four-dad tower right on 'slips'!",
      stage: (t) => {
        const slipAt = w("8.sub", "slips");
        const slip = tw(t, slipAt - 0.08, slipAt + 0.35);
        return (
          <>
            <Hero
              position={[-0.62, PATH_Y, -5.25]}
              rotationY={0.18}
              animation="wave"
              face="laugh"
              headYaw={0.18 * slip}
            />
            <SubscribeSign position={[0, PATH_Y, -5.85]} rotationY={0} scale={1.08} tilt={Math.sin(t * 3.5) * 0.04} />
            {/* Four-dad stack beside the Subscribe sign—until #3 slips out! */}
            <TinyDad which={1} position={[0.68, PATH_Y, -5.18]} rotationY={-0.2} squash={0.12} />
            <TinyDad which={2} position={[0.68, PATH_Y + 0.46, -5.18]} rotationY={-0.2} squash={0.1} />
            <TinyDad
              which={3}
              position={[0.68 + slip * 0.58, PATH_Y + 0.92 * (1 - slip), -5.08 + slip * 0.25]}
              rotationY={-0.2 + slip * 1.1}
              squash={pop(t, slipAt + 0.25, 0.25) * 0.42}
              mood={slip > 0.25 ? "scared" : "happy"}
            />
            <TinyDad
              which={4}
              position={[0.68, PATH_Y + 1.38 - slip * 0.46, -5.18]}
              rotationY={-0.2}
              squash={pop(t, slipAt + 0.22, 0.25) * 0.3}
            />
          </>
        );
      },
    },
  ],
});
