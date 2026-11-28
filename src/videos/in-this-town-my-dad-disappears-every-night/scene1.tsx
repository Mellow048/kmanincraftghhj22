import {
  Bubble,
  DEG,
  EAST,
  FloatingNumber,
  Hero,
  NORTH,
  Player,
  PotionBottle,
  PotionSwirl,
  Puffs,
  RichMerchant,
  SCHOOL_POS,
  SOUTH,
  Sign,
  TraderDad,
  TraderLlama,
  Vox,
  WEST,
  cam,
  ease,
  on,
  pop,
  ramp,
  storyScene,
  timing,
  w,
  walkSegment,
} from "./kit";

/** Scene 1 — Hook: Wandering Trader Dad, goofy llamas, terrible trades, and vanishing at sunset. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "My dad disappears every night",
  shots: [
    {
      cue: "1.dad",
      ...cam.sweep({ on: [0, 1.3, 6.2], dist: 6.4, distTo: 5.1, fromYaw: -22, toYaw: 16, pitch: 7, fov: 44 }),
      zone: "town",
      look: "overworld-day",
      note: "Bright daylight Frame-1 hook: kid waves beside blue-hooded Wandering Trader Dad and llamas; on 'disappears' Dad shimmers into blue potion swirls.",
      stage: (t) => {
        const poofAt = w("1.dad", "disappears");
        const vanish = ramp(t, poofAt, poofAt + 0.55);
        return (
          <>
            <Hero position={[-1.05, 0, 6.4]} rotationY={12 * DEG} animation="wave" face={t > poofAt ? "surprised" : "grin"} />
            <TraderDad position={[0.75, 0, 5.8]} rotationY={-10 * DEG} animation="wave" face="grin" vanish={vanish} holdingPotion />
            <TraderLlama position={[-2.35, 0, 4.4]} rotationY={24 * DEG} />
            <TraderLlama position={[2.25, 0, 3.6]} rotationY={-28 * DEG} coat="#c99f72" />
            <Player who={1} position={[-2.2, 0, -2.0]} rotationY={SOUTH} animation="idle" face="wow" />
            <Player who={2} position={[2.1, 0, -4.5]} rotationY={SOUTH} animation="idle" face="wow" />
          </>
        );
      },
    },
    {
      cue: "1.trader",
      ...cam.track({ from: [0.3, 0, 9.2], to: [0.3, 0, 6.2], sideDist: 5.8, side: 1, height: 1.7, lead: 1.5, fov: 44 }),
      zone: "town",
      look: "overworld-day",
      note: "Tracking along the street as Dad strides proudly in his royal blue hood toward his market stall, leading both llamas.",
      stage: (t, { dur }) => {
        const walk = walkSegment([0.3, 0, 9.2], [0.3, 0, 6.2], t, 0, dur, { gait: "walk", endYaw: NORTH });
        return (
          <>
            <TraderDad {...walk} animDistance={walk.animDistance} face="grin" />
            <TraderLlama position={[-1.4, 0, walk.position[2] + 1.5]} rotationY={NORTH} walk={walk.animDistance * 1.1} />
            <TraderLlama position={[1.7, 0, walk.position[2] + 1.9]} rotationY={NORTH} coat="#c99f72" walk={walk.animDistance * 1.1} />
            <Hero position={[-2.1, 0, 5.4]} rotationY={55 * DEG} animation="point" face="grin" />
          </>
        );
      },
    },
    {
      cue: "1.llamas",
      ...cam.frameDuo({ a: [-1.4, 0, 6.2], b: [1.45, 0, 6.2], fromYaw: -20, toYaw: 14, pitch: 8 }),
      zone: "town",
      look: "overworld-day",
      note: "9:16-safe two-shot of both llamas turning and spitting right at a laughing merchant on 'spit'.",
      stage: (t) => {
        const spitAt = w("1.llamas", "spit");
        const spit = ramp(t, spitAt, spitAt + 0.55);
        return (
          <>
            <TraderLlama position={[-1.4, 0, 5.6]} rotationY={EAST} spit={spit} />
            <TraderLlama position={[-1.2, 0, 7.2]} rotationY={EAST - 0.15} coat="#c99f72" spit={ramp(t, spitAt + 0.12, spitAt + 0.65)} />
            <RichMerchant position={[1.45, 0, 6.2]} rotationY={WEST} animation={t > spitAt + 0.35 ? "scared" : "laugh"} face={t > spitAt + 0.35 ? "surprised" : "grin"} />
          </>
        );
      },
    },
    {
      cue: "1.bush",
      ...cam.front({ actor: [0.9, 0, 5.2], facing: WEST, dist: 7.2, to: 5.9, side: 20, pitch: 8, fov: 45 }),
      zone: "town",
      look: "overworld-day",
      hud: { banner: { text: "5 EMERALDS?!", color: "#ffdd57", sub: "FOR A DEAD BUSH" } },
      note: "East-to-West angle on Dad's stall: Dad proudly presents the tiny Dead Bush while a crisp '5 EMERALDS?!' banner pops on 'five'.",
      stage: (t) => {
        const fiveAt = w("1.bush", "five");
        return (
          <>
            <TraderDad position={[0.9, 0, 5.2]} rotationY={WEST} animation="reach" face="grin" />
            <Player who={3} position={[-1.1, 0, 5.2]} rotationY={EAST} animation={t > fiveAt ? "shrug" : "idle"} face="uneasy" />
            {t >= fiveAt ? <FloatingNumber text="5 EM" position={[1.4, 2.85, 5.2]} color="#ffd84d" height={0.48} /> : null}
          </>
        );
      },
    },
    {
      cue: "1.sand",
      ...cam.sweep({ on: [0.1, 1.35, 5.2], dist: 6.4, distTo: 5.2, fromYaw: -112, toYaw: -76, pitch: 9, fov: 44 }),
      zone: "town",
      look: "overworld-day",
      hud: { banner: { text: "3 EMERALDS", color: "#5ce075", sub: "BUCKET OF SAND" } },
      note: "Front-3/4 sweep facing Dad behind his stall as the puzzled villager (exact continuous start at [-1.1, 0, 5.2]) shakes his head and walks away.",
      stage: (t, { dur }) => {
        const sandAt = w("1.sand", "sand");
        const threeAt = w("1.sand", "three");
        const leave = walkSegment([-1.1, 0, 5.2], [-2.5, 0, 2.6], t, sandAt, dur, { gait: "walk" });
        return (
          <>
            <TraderDad position={[0.9, 0, 5.2]} rotationY={WEST} animation="wave" face="grin" />
            <Player who={3} {...leave} animDistance={leave.animDistance} face="frown" />
            {t >= threeAt ? <FloatingNumber text="3 EM" position={[1.3, 2.85, 5.2]} color="#5ce075" height={0.48} /> : null}
          </>
        );
      },
    },
    {
      cue: "1.sunset",
      ...cam.heroLow({ on: [0, 0, 2.0], dist: 6.0, yaw: -16, fov: 45 }),
      zone: "town",
      look: "overworld-golden",
      hud: { clock: "6:00 PM · SUNSET" },
      note: "Warm golden sunset hero-low shot: Dad tilts up the glowing cyan Invisibility Potion bottle on 'drinks'.",
      stage: (t) => {
        const drinkAt = w("1.sunset", "drinks");
        return (
          <>
            <TraderDad position={[0, 0, 2.0]} rotationY={SOUTH} animation={t > drinkAt ? "reachUp" : "idle"} face="calm" holdingPotion />
            <PotionBottle position={[0.1, 1.45 + ease(ramp(t, drinkAt, drinkAt + 0.45)) * 0.25, 2.42]} scale={1.15} />
            <Hero position={[-1.7, 0, 3.2]} rotationY={40 * DEG} animation="idle" face="uneasy" />
          </>
        );
      },
    },
    {
      cue: "1.poof",
      ...cam.sweep({ on: [0, 1.2, 2.0], dist: 6.2, distTo: 4.8, fromYaw: 14, toYaw: -22, pitch: 9, fov: 44 }),
      zone: "town",
      look: "overworld-golden",
      hud: { clock: "6:01 PM", banner: { text: "VANISHED!", color: "#7ce8ff" } },
      note: "Reverse sweep as blue swirls explode on 'poof' and Dad vanishes completely into thin air, leaving the kid locked at [-1.7, 0, 3.2].",
      stage: (t) => {
        const poofAt = w("1.poof", "poof");
        const vanish = ramp(t, poofAt, poofAt + 0.42);
        return (
          <>
            <TraderDad position={[0, 0, 2.0]} rotationY={SOUTH} animation="idle" vanish={vanish} />
            <PotionSwirl position={[0, 1.0, 2.0]} t={t} intensity={1} />
            {t >= poofAt ? <Puffs position={[0, 1.1, 2.0]} color="#9beeff" /> : null}
            <Hero position={[-1.7, 0, 3.2]} rotationY={40 * DEG} animation={t > poofAt ? "panic" : "idle"} face={t > poofAt ? "surprised" : "uneasy"} />
          </>
        );
      },
    },
    {
      cue: "2.rich",
      ...cam.frameDuo({ a: [-1.4, 0, -2.5], b: [1.5, 0, -2.5], fromYaw: -18, toYaw: 20, pitch: 8 }),
      zone: "town",
      look: "overworld-day",
      hud: { chat: [{ sender: "Rich Merchant", text: "HAHAHAHA! Look at those trades!", color: "#ffdd57" }] },
      note: "9:16-safe two-shot on daytime street: two emerald-vest rich merchants point and laugh right in Dad's face with crisp HUD taunt.",
      stage: (t) => {
        const laughAt = w("2.rich", "laugh");
        return (
          <>
            <TraderDad position={[-1.4, 0, -2.5]} rotationY={EAST} animation="idle" face="frown" />
            <RichMerchant variant={0} position={[0.7, 0, -2.4]} rotationY={WEST} animation={t > laughAt ? "point" : "laugh"} face="laugh" />
            <RichMerchant variant={1} position={[1.8, 0, -3.1]} rotationY={WEST} animation="laugh" face="laugh" />
          </>
        );
      },
    },
    {
      cue: "2.sign",
      ...cam.front({ actor: [0.0, 0.4, -6.5], facing: SOUTH, dist: 7.2, to: 5.9, side: -16, pitch: 6, fov: 45 }),
      zone: "town",
      look: "overworld-day",
      hud: { chat: [{ sender: "Merchant", text: "worst trader alive lol", color: "#ff8c82" }], typing: true },
      note: "Raised chest-high wooden signpost staked cleanly ABOVE ground: WORST TRADER, while a merchant struts off and taunts in HUD chat.",
      stage: (t, { dur }) => {
        const strut = walkSegment([1.0, 0, -6.5], [2.4, 0, -9.0], t, 0.2, dur, { gait: "walk" });
        return (
          <>
            <Vox kind="planks" tint="#6e4a26" position={[0.0, 0.56, -6.54]} size={[0.14, 1.12, 0.14]} />
            <Sign title="WORST TRADER" subtitle="ALIVE" position={[0.0, 1.48, -6.5]} width={1.26} height={0.96} />
            <RichMerchant variant={0} {...strut} animDistance={strut.animDistance} face="laugh" />
            <Hero position={[-1.5, 0, -6.2]} rotationY={60 * DEG} animation="idle" face="frown" />
          </>
        );
      },
    },
    {
      cue: "2.school",
      ...cam.sweep({ on: on(SCHOOL_POS, 0, 1.1, 0.5), dist: 6.8, distTo: 5.5, fromYaw: -20, toYaw: 18, pitch: 9, fov: 45 }),
      zone: "school",
      look: "overworld-day",
      note: "Cut to sunlit schoolyard: two kid classmates point and tease our hero about his dad selling dirt.",
      stage: (t) => {
        const dirtAt = w("2.school", "dirt");
        return (
          <group position={SCHOOL_POS}>
            <Hero position={[-1.1, 0, 0.8]} rotationY={40 * DEG} animation="idle" face="sad" />
            <Player who={4} position={[0.9, 0, 0.4]} scale={0.78} rotationY={-55 * DEG} animation={t > dirtAt ? "point" : "laugh"} face="grin" />
            <Player who={5} position={[1.95, 0, 1.0]} scale={0.78} rotationY={-70 * DEG} animation="laugh" face="grin" />
            <Bubble text="SOLD DIRT?" position={[1.1, 2.1, 0.4]} scale={pop(t, dirtAt) * 0.68} />
          </group>
        );
      },
    },
  ],
});
