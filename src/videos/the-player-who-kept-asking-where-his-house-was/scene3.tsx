import {
  BlueLanternRoad,
  BlueRoofCottage,
  EnchantedCompass,
  FloatingHeart,
  LodestoneBlock,
  OpeningChest,
  PLACE,
  ServerCrowd,
  ServerPlayer,
  at,
  cam,
  moveBetween,
  storyScene,
  timing,
} from "./kit";

const S = PLACE.smp;
const I = PLACE.irl;

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Arthur Returns, Sam Reunion & Story CTA",
  shots: [
    {
      cue: "7.back",
      ...cam.front({ actor: at(S, 0, 0, -2.2), dist: 4.6, fov: 42, screenOffset: [0, 0.06] }),
      zone: "smp",
      look: "overworld-sunset",
      hud: { chat: [{ text: "Arthur joined the game", color: "#ffdd57" }] },
      note: "Next evening: Arthur joins the game at Spawn and spots the glowing chest waiting for him.",
      stage: (t) => (
        <>
          <BlueLanternRoad position={at(S, 0, 0, 2.5)} />
          <BlueRoofCottage position={at(S, 0, 0, 10.5)} roofMode="glowing" />
          <OpeningChest position={at(S, 0, 0, -1.0)} open={0} contents="gold" />
          <ServerPlayer role="friendA" hair="#d6dbe2" shirtColor="#4a6fa5" nameTag="Arthur" position={at(S, 0, 0, -2.2)} rotationY={0} animation="idle" face="surprised" time={t} />
        </>
      ),
    },
    {
      cue: "7.open",
      ...cam.sweep({ on: at(S, 0, 1.1, -1.5), dist: 4.0, fromYaw: -18, toYaw: 18, pitch: 10, fov: 40 }),
      zone: "smp",
      look: "overworld-sunset",
      note: "Arthur opens the spawn chest and lifts a glowing purple Enchanted Compass named HOME.",
      stage: (t) => (
        <>
          <BlueLanternRoad position={at(S, 0, 0, 2.5)} />
          <OpeningChest position={at(S, 0, 0, -1.0)} open={1} contents="gold" />
          <ServerPlayer role="friendA" hair="#d6dbe2" shirtColor="#4a6fa5" nameTag="Arthur" position={at(S, 0, 0, -2.2)} rotationY={0} animation="reachUp" face="smile" time={t}>
            <EnchantedCompass position={[0, 0.06, 0.24]} scale={1.2} />
          </ServerPlayer>
        </>
      ),
    },
    {
      cue: "7.snap",
      ...cam.front({ actor: at(S, 0, 0, -1.6), dist: 3.8, fov: 40, screenOffset: [0, 0.06] }),
      zone: "smp",
      look: "overworld-sunset",
      hud: { banner: { text: "LOCKED TO HOME", color: "#b197fc" } },
      note: "The purple compass needle snaps straight down the glowing blue lantern highway.",
      stage: (t) => (
        <>
          <BlueLanternRoad position={at(S, 0, 0, 2.5)} />
          <ServerPlayer role="friendA" hair="#d6dbe2" shirtColor="#4a6fa5" nameTag="Arthur" position={at(S, 0, 0, -1.6)} rotationY={0} animation="point" face="grin" time={t}>
            <EnchantedCompass position={[0, 0.06, 0.26]} scale={1.25} />
          </ServerPlayer>
        </>
      ),
    },
    {
      cue: "7.walk",
      ...cam.track({ from: at(S, 0, 0, 0.0), to: at(S, 0, 0, 6.2), sideDist: 5.2, lead: 1.0, height: 1.7, fov: 44 }),
      zone: "smp",
      look: "overworld-sunset",
      note: "Arthur walks joyfully down the glowing blue lantern road straight to his shining blue porch.",
      stage: (t) => {
        const w = moveBetween(at(S, 0, 0, 0.0), at(S, 0, 0, 6.2), t, 0, 1.45);
        return (
          <>
            <BlueLanternRoad position={at(S, 0, 0, 2.5)} />
            <BlueRoofCottage position={at(S, 0, 0, 10.5)} roofMode="glowing" />
            <LodestoneBlock position={at(S, 1.6, 0, 7.6)} />
            <ServerPlayer role="friendA" hair="#d6dbe2" shirtColor="#4a6fa5" nameTag="Arthur" position={w.position} rotationY={w.rotationY} animation="walk" animDistance={w.animDistance} face="grin" time={t}>
              <EnchantedCompass position={[0, 0.04, 0.24]} scale={1.1} />
            </ServerPlayer>
          </>
        );
      },
    },
    {
      cue: "7.cheer",
      ...cam.sweep({ on: at(S, 0, 1.5, 7.2), dist: 6.4, fromYaw: -22, toYaw: 20, pitch: 12, fov: 44 }),
      zone: "smp",
      look: "overworld-sunset",
      note: "Twenty-five cheering players welcome Arthur with floating hearts—even Rex apologizes.",
      stage: (t) => (
        <>
          <BlueLanternRoad position={at(S, 0, 0, 2.5)} />
          <BlueRoofCottage position={at(S, 0, 0, 10.5)} roofMode="glowing" />
          <LodestoneBlock position={at(S, 1.6, 0, 7.6)} />
          <FloatingHeart position={at(S, 0, 2.2, 7.2)} count={8} t={t} />
          <ServerPlayer role="friendA" hair="#d6dbe2" shirtColor="#4a6fa5" nameTag="Arthur" position={at(S, 0, 0, 6.6)} rotationY={0} animation="cheer" face="grin" time={t} />
          <ServerPlayer role="owner" nameTag="Owner" crown position={at(S, -1.8, 0, 7.0)} rotationY={0.5} animation="cheer" face="grin" time={t} />
          <ServerPlayer role="bully" nameTag="Rex" position={at(S, 1.8, 0, 6.8)} rotationY={-0.6} animation="wave" face="smile" time={t} />
          <ServerCrowd members={[{ role: "friendA", position: at(S, -3.0, 0, 5.8), rotationY: 0.2, animation: "cheer" }, { role: "mom", position: at(S, 3.0, 0, 5.8), rotationY: -0.2, animation: "cheer" }]} time={t} />
        </>
      ),
    },
    {
      cue: "7.sam2",
      ...cam.front({ actor: at(S, 0, 0, 7.8), facing: Math.PI, dist: 4.6, fov: 42, screenOffset: [0, 0.06] }),
      zone: "smp",
      look: "overworld-sunset",
      hud: { chat: [{ text: "Sam joined the game", color: "#55ff55" }] },
      note: "Final surprise: chat pings that grandson Sam joined the game!",
      stage: (t) => (
        <>
          <BlueRoofCottage position={at(S, 0, 0, 10.5)} roofMode="glowing" />
          <ServerPlayer role="friendA" hair="#d6dbe2" shirtColor="#4a6fa5" nameTag="Arthur" position={at(S, -0.9, 0, 6.8)} rotationY={0.4} animation="idle" face="surprised" badge="heart" time={t} />
          <ServerPlayer role="hero" nameTag="Sam" position={at(S, 0.4, 0, 7.9)} rotationY={Math.PI} animation="wave" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "7.door",
      ...cam.twoShot({ a: at(S, -0.7, 0, 7.0), b: at(S, 0.7, 0, 7.0), dist: 4.8, height: 1.5, fov: 42 }),
      zone: "smp",
      look: "overworld-sunset",
      note: "Grandson Sam steps out the front door and hugs Arthur under the glowing blue roof.",
      stage: (t) => (
        <>
          <BlueRoofCottage position={at(S, 0, 0, 10.5)} roofMode="glowing" />
          <FloatingHeart position={at(S, 0, 2.3, 7.0)} count={8} t={t} />
          <ServerPlayer role="friendA" hair="#d6dbe2" shirtColor="#4a6fa5" nameTag="Arthur" position={at(S, -0.65, 0, 7.0)} rotationY={1.0} animation="hug" face="grin" time={t} />
          <ServerPlayer role="hero" nameTag="Sam" position={at(S, 0.65, 0, 7.0)} rotationY={-1.0} animation="hug" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "7.found",
      ...cam.sweep({ on: at(I, 0, 1.2, -1.9), dist: 2.9, fromYaw: -50, toYaw: -32, pitch: 8, fov: 40 }),
      zone: "irl",
      look: "warm-room",
      hud: {
        chat: [{ sender: "Arthur", text: "I found it.", color: "#55ff55" }],
        typing: true,
      },
      note: "Warm IRL cutaway: 72-year-old Arthur smiles at his monitor and types 'I found it.'",
      stage: (t) => (
        <ServerPlayer role="friendA" hair="#d6dbe2" shirtColor="#4a6fa5" position={at(I, 0, 0, -1.6)} rotationY={Math.PI} animation="press" face="grin" time={t} />
      ),
    },
    {
      cue: "7.sub",
      ...cam.front({ actor: at(S, 0, 0, 7.0), dist: 5.2, fov: 44, screenOffset: [0, 0.08] }),
      zone: "smp",
      look: "overworld-sunset",
      hud: { subscribe: true },
      note: "Story-locked CTA: Arthur, Sam, and the Owner wave together on the glowing blue porch as Subscribed pops.",
      stage: (t) => (
        <>
          <BlueLanternRoad position={at(S, 0, 0, 2.5)} />
          <BlueRoofCottage position={at(S, 0, 0, 10.5)} roofMode="glowing" />
          <FloatingHeart position={at(S, 0, 2.4, 7.0)} count={8} t={t} />
          <ServerPlayer role="friendA" hair="#d6dbe2" shirtColor="#4a6fa5" nameTag="Arthur" position={at(S, -1.1, 0, 7.0)} rotationY={0.1} animation="wave" face="grin" time={t} />
          <ServerPlayer role="hero" nameTag="Sam" position={at(S, 0.3, 0, 7.0)} rotationY={0} animation="wave" face="grin" time={t + 0.15} />
          <ServerPlayer role="owner" nameTag="Owner" crown position={at(S, 1.6, 0, 7.0)} rotationY={-0.1} animation="wave" face="grin" time={t + 0.3} />
        </>
      ),
    },
  ],
});
