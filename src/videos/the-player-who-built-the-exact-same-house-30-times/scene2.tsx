import {
  DEG,
  EAST,
  EmberDrift,
  Grandpa,
  IRL_POS,
  LavaBucket,
  NORTH,
  OakCottage,
  Puffs,
  SOUTH,
  ServerPlayer,
  WOODS_POS,
  YellowFlower,
  cam,
  on,
  pop,
  ramp,
  storyScene,
  timing,
  w,
  walkSegment,
} from "./kit";

/** Scene 2 — Sad Up shift: Real-world Grandpa truth -> Lost in woods -> Rex burns all 30 -> Grandpa logs off heartbroken. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Grandpa's memory and the night the huts burned",
  shots: [
    {
      cue: "3.not",
      ...cam.front({ actor: [0, 0, 1.5], facing: SOUTH, dist: 5.8, to: 4.5, side: -16, pitch: 6 }),
      zone: "smp",
      look: "overworld-golden",
      note: "Gentle turn: Sam stands peacefully beside an oak hut shaking his head softly — he was never a griefer.",
      stage: (t) => {
        const notAt = w("3.not", "not");
        return (
          <>
            <OakCottage position={[0, 0, -2.0]} flower />
            <ServerPlayer role="hero" nameTag="Sam" position={[0, 0, 1.5]} rotationY={SOUTH} animation={t > notAt ? "talk" : "idle"} face="calm" />
          </>
        );
      },
    },
    {
      cue: "3.gpa",
      ...cam.frameDuo({ a: [-1.05, 0, 1.4], b: [1.05, 0, 1.4], fromYaw: -18, toYaw: 18, pitch: 8 }),
      zone: "smp",
      look: "overworld-golden",
      note: "9:16-safe heartwarming two-shot: Sam and his silver-haired Grandpa smiling and waving beside their cozy cottage!",
      stage: (t) => {
        const gpaAt = w("3.gpa", "grandpa");
        return (
          <>
            <OakCottage position={[0, 0, -2.0]} flower />
            <ServerPlayer role="hero" nameTag="Sam" position={[-1.05, 0, 1.4]} rotationY={18 * DEG} animation="wave" face="grin" />
            <Grandpa nameTag="Grandpa" position={[1.05, 0, 1.4]} rotationY={-18 * DEG} animation={t > gpaAt ? "wave" : "idle"} face="smile" />
          </>
        );
      },
    },
    {
      cue: "3.age",
      ...cam.front({ actor: on(IRL_POS, 0.8, 0, 1.2), facing: SOUTH, dist: 5.6, to: 4.4, side: -18, pitch: 6 }),
      zone: "irl",
      look: "overworld-golden",
      hud: { clock: "9:45 PM · IRL" },
      note: "IRL Cutaway inside fully enclosed bedroom: Grandpa sits kindly at his desk PC glowing softly in warm lamp light.",
      stage: (t) => {
        const ageAt = w("3.age", "five");
        return (
          <group position={IRL_POS}>
            <Grandpa position={[1.3, 0, 0.2]} rotationY={-28 * DEG} animation={t > ageAt ? "talk" : "idle"} face="calm" />
          </group>
        );
      },
    },
    {
      cue: "3.irl",
      ...cam.sweep({ on: on(IRL_POS, -1.6, 1.15, -0.8), dist: 6.2, distTo: 4.9, fromYaw: 16, toYaw: -18, pitch: 9, fov: 45 }),
      zone: "irl",
      look: "overworld-night",
      hud: { clock: "9:45 PM · IRL" },
      note: "IRL Part 1: Grandpa sits quietly beside his cozy bed staring softly ahead as memories fade.",
      stage: (t) => (
        <group position={IRL_POS}>
          <Grandpa position={[-1.3, 0, -0.4]} rotationY={SOUTH} animation={t > 0.5 ? "ache" : "sit"} face="sad" headPitch={0.18 + t * 0.1} />
        </group>
      ),
    },
    {
      cue: "3.irl",
      cut: 1.2,
      ...cam.front({ actor: on(IRL_POS, 1.6, 0.4, -0.2), facing: SOUTH, dist: 5.4, to: 4.2, side: 16, pitch: 7 }),
      zone: "irl",
      look: "overworld-night",
      hud: { clock: "9:45 PM · IRL" },
      note: "IRL Part 2 (cut): Front-side view of Grandpa pausing confused in front of his glowing PC monitor.",
      stage: (t) => (
        <group position={IRL_POS}>
          <Grandpa position={[1.6, 0, 0.1]} rotationY={SOUTH} animation={t > 0.4 ? "shrug" : "idle"} face="uneasy" />
        </group>
      ),
    },
    {
      cue: "3.lost",
      ...cam.track({ from: on(WOODS_POS, -0.8, 0, 5.2), to: on(WOODS_POS, 0.6, 0, 1.2), sideDist: 5.8, side: 1, height: 1.55, lead: 1.5, fov: 44 }),
      zone: "woods",
      look: "overworld-golden",
      note: "Tracking Grandpa wandering slowly down the wooded dirt path turning left and right trying to recognize a tree.",
      stage: (t, { dur }) => {
        const walk = walkSegment([-0.8, 0, 5.2], [0.6, 0, 1.2], t, 0, dur, { gait: "walk", endYaw: NORTH });
        return (
          <group position={WOODS_POS}>
            <Grandpa nameTag="Grandpa" {...walk} animDistance={walk.animDistance} face="worried" />
          </group>
        );
      },
    },
    {
      cue: "3.bend",
      ...cam.track({ from: [0.8, 0, 4.5], to: [0.8, 0, 0.6], sideDist: 6.0, side: -1, height: 1.6, lead: 1.6, fov: 44 }),
      zone: "smp",
      look: "overworld-day",
      note: "Sweet sunlit track: Sam hurries down the path lovingly placing identical cozy OakCottages around every bend!",
      stage: (t, { dur }) => {
        const walk = walkSegment([0.8, 0, 4.5], [0.8, 0, 0.6], t, 0, dur, { gait: "walk", endYaw: NORTH });
        const bendAt = w("3.bend", "house");
        const popK = pop(t, bendAt);
        return (
          <>
            <ServerPlayer role="hero" nameTag="Sam" {...walk} animDistance={walk.animDistance} face="grin" />
            {popK > 0.02 ? <OakCottage position={[-2.2, 0, 0.8]} rotationY={EAST} scale={popK} flower /> : null}
          </>
        );
      },
    },
    {
      cue: "3.safe",
      ...cam.frameDuo({ a: [-1.1, 0, 1.2], b: [1.1, 0, 1.2], fromYaw: -18, toYaw: 18, pitch: 8 }),
      zone: "smp",
      look: "overworld-day",
      note: "9:16-safe touching relief beat: Grandpa spots the glowing yellow Dandelion outside the door and smiles warmly beside Sam.",
      stage: (t) => {
        const safeAt = w("3.safe", "safe");
        return (
          <>
            <OakCottage position={[0, 0, -2.0]} flower />
            <YellowFlower position={[0, 0.05, 1.6]} scale={1.35} glow={0.65} />
            <Grandpa nameTag="Grandpa" position={[-1.1, 0, 1.2]} rotationY={24 * DEG} animation={t > safeAt ? "cheer" : "idle"} face="grin" />
            <ServerPlayer role="hero" nameTag="Sam" position={[1.1, 0, 1.2]} rotationY={-24 * DEG} animation="wave" face="grin" />
          </>
        );
      },
    },
    {
      cue: "4.night",
      ...cam.track({ from: on(WOODS_POS, 2.2, 0, 5.2), to: on(WOODS_POS, 0.4, 0, 1.4), sideDist: 5.8, side: -1, height: 1.55, lead: 1.5, fov: 44 }),
      zone: "woods",
      look: "lantern-night",
      hud: { clock: "2:15 AM" },
      note: "Dark night turn: Rex stalks forward carrying a glowing molten Lava Bucket toward the quiet oak cottage.",
      stage: (t, { dur }) => {
        const walk = walkSegment([2.2, 0, 5.2], [0.4, 0, 1.4], t, 0, dur, { gait: "walk", endYaw: NORTH });
        return (
          <group position={WOODS_POS}>
            <ServerPlayer role="griefer" nameTag="Rex" {...walk} animDistance={walk.animDistance} face="angry" />
            <LavaBucket position={[walk.position[0] + 0.34, 0.85, walk.position[2] - 0.16]} scale={1.15} />
            <OakCottage position={[0, 0, -2.5]} flower />
          </group>
        );
      },
    },
    {
      cue: "4.lava",
      ...cam.heroLow({ on: on(WOODS_POS, 0, 0.6, -1.5), dist: 6.8, yaw: -18, fov: 45 }),
      zone: "woods",
      look: "lantern-night",
      hud: { clock: "2:18 AM" },
      note: "Devastating low angle: Rex pours glowing orange lava across the tiny oak cottage as embers and charred ruins erupt on 'burned'!",
      stage: (t) => {
        const burnAt = w("4.lava", "burned");
        const pour = ramp(t, 0.05, burnAt + 0.4);
        return (
          <group position={WOODS_POS}>
            <OakCottage position={[0, 0, -2.5]} burned={t > burnAt} />
            <ServerPlayer role="griefer" nameTag="Rex" position={[-1.9, 0, 0.2]} rotationY={55 * DEG} animation="reach" face="angry" />
            <LavaBucket position={[-1.3, 1.15, -0.2]} rotation={[0.7 * pour, 0.7, 0]} pouring={pour} scale={1.25} />
            <EmberDrift position={[0, 1.4, -2.4]} count={28} />
            {t >= burnAt ? <Puffs position={[0, 1.5, -2.4]} color="#ff6a1a" /> : null}
          </group>
        );
      },
    },
    {
      cue: "4.laugh",
      ...cam.front({ actor: on(WOODS_POS, -1.4, 0, 1.0), facing: SOUTH, dist: 5.8, to: 4.5, side: 18, pitch: 6 }),
      zone: "woods",
      look: "lantern-night",
      hud: { clock: "2:20 AM" },
      note: "Part 1: Rex cackles smugly in the orange firelight.",
      stage: (t) => (
        <group position={WOODS_POS}>
          <ServerPlayer role="griefer" nameTag="Rex" position={[-1.4, 0, 1.0]} rotationY={SOUTH} animation={t > 0.4 ? "laugh" : "point"} face="smug" />
          <EmberDrift position={[0.4, 1.2, -1.2]} count={18} />
        </group>
      ),
    },
    {
      cue: "4.laugh",
      cut: 1.3,
      ...cam.sweep({ on: on(WOODS_POS, 0, 1.5, -0.5), dist: 6.4, distTo: 5.1, fromYaw: 18, toYaw: -18, pitch: 8, fov: 44 }),
      zone: "woods",
      look: "lantern-night",
      hud: {
        clock: "2:20 AM",
        chat: [{ sender: "Rex", text: "Cleaned up the mess haha", color: "#ff7a66" }],
        typing: true,
      },
      note: "Part 2 (cut): Cruel HUD chat 'Cleaned up the mess haha' pops in over the smoldering charred cottage.",
      stage: () => (
        <group position={WOODS_POS}>
          <OakCottage position={[0, 0, -2.4]} burned />
          <EmberDrift position={[0, 1.2, -2.2]} count={20} />
        </group>
      ),
    },
    {
      cue: "4.dark",
      ...cam.track({ from: on(WOODS_POS, 0, 0, 5.5), to: on(WOODS_POS, 0, 0, 1.8), sideDist: 6.0, side: 1, height: 1.55, lead: 1.5, fov: 44 }),
      zone: "woods",
      look: "overworld-night",
      hud: { clock: "2:45 AM" },
      note: "Part 1: Heartbreaking slow night track — Grandpa walks completely alone through the dark empty forest.",
      stage: (t, { dur }) => {
        const walk = walkSegment([0, 0, 5.5], [0, 0, 1.8], t, 0, dur, { gait: "walk", endYaw: NORTH });
        return (
          <group position={WOODS_POS}>
            <Grandpa nameTag="Grandpa" {...walk} animDistance={walk.animDistance} face="sad" headPitch={0.18} />
          </group>
        );
      },
    },
    {
      cue: "4.dark",
      cut: 1.35,
      ...cam.front({ actor: on(WOODS_POS, 0, 0, 1.8), facing: SOUTH, dist: 5.6, to: 4.3, side: -16, pitch: 6 }),
      zone: "woods",
      look: "overworld-night",
      hud: { clock: "2:45 AM" },
      note: "Part 2 (cut): Front angle on Grandpa stopping timidly, looking anxiously left and right in the dark trees.",
      stage: (t) => (
        <group position={WOODS_POS}>
          <Grandpa nameTag="Grandpa" position={[0, 0, 1.8]} rotationY={SOUTH} animation="lookAround" face="worried" headYaw={Math.sin(t * 3) * 0.4} />
        </group>
      ),
    },
    {
      cue: "4.look",
      ...cam.sweep({ on: on(WOODS_POS, 0, 1.1, 0.4), dist: 6.6, distTo: 5.3, fromYaw: -22, toYaw: 22, pitch: 10, fov: 45 }),
      zone: "woods",
      look: "overworld-night",
      hud: { clock: "2:46 AM" },
      note: "Sweeping past dark empty grass & smoking charred ashes where a yellow flower used to stand.",
      stage: (t, { dur }) => {
        const search = walkSegment([-1.4, 0, 1.4], [0.8, 0, 0.2], t, 0, dur, { gait: "walk", endYaw: SOUTH });
        return (
          <group position={WOODS_POS}>
            <Grandpa nameTag="Grandpa" {...search} animDistance={search.animDistance} face="sad" tears={0.5} />
            <OakCottage position={[0, 0, -3.2]} burned />
          </group>
        );
      },
    },
    {
      cue: "4.msg",
      ...cam.front({ actor: on(WOODS_POS, 0, 0, 1.4), facing: SOUTH, dist: 5.6, to: 4.3, side: 16, pitch: 5 }),
      zone: "woods",
      look: "overworld-night",
      hud: { clock: "2:47 AM" },
      note: "Part 1: Grandpa halts in the dark woods, tears glistening on his cheeks as he begins to type.",
      stage: (t) => (
        <group position={WOODS_POS}>
          <Grandpa nameTag="Grandpa" position={[0, 0, 1.4]} rotationY={SOUTH} animation={t > 0.5 ? "ache" : "idle"} face="crying" tears={1} />
        </group>
      ),
    },
    {
      cue: "4.msg",
      cut: 1.5,
      ...cam.sweep({ on: on(WOODS_POS, 0, 1.55, 0.8), dist: 5.8, distTo: 4.6, fromYaw: -14, toYaw: 16, pitch: 7, fov: 44 }),
      zone: "woods",
      look: "overworld-night",
      hud: {
        clock: "2:47 AM",
        chat: [{ sender: "Grandpa", text: "Sam, I cannot find home.", color: "#ffdd57" }],
        typing: true,
      },
      note: "Part 2 (cut): Gut-punch Minecraft HUD chat types out: 'Sam, I cannot find home.'",
      stage: (t) => (
        <group position={WOODS_POS}>
          <Grandpa nameTag="Grandpa" position={[0, 0, 1.4]} rotationY={SOUTH} animation="ache" face="crying" tears={1} headPitch={0.14 + t * 0.14} />
        </group>
      ),
    },
    {
      cue: "4.quit",
      ...cam.sweep({ on: on(WOODS_POS, 0, 1.35, 1.0), dist: 6.2, distTo: 7.4, fromYaw: 12, toYaw: -16, pitch: 8, fov: 44 }),
      zone: "woods",
      look: "overworld-night",
      hud: {
        clock: "2:48 AM",
        chat: [{ text: "Grandpa left the game", color: "#ffe978" }],
      },
      note: "Pulling slowly back as Grandpa fades offline ('Grandpa left the game') leaving the dark woods totally empty.",
      stage: (t) => {
        const goneAt = w("4.quit", "logged");
        return (
          <group position={WOODS_POS}>
            {t < goneAt + 0.35 ? <Grandpa position={[0, 0, 1.4]} rotationY={SOUTH} animation="idle" face="sad" tears={1} /> : null}
            {t >= goneAt ? <Puffs position={[0, 1.0, 1.4]} color="#b8c6d8" /> : null}
          </group>
        );
      },
    },
  ],
});
