import {
  BlueLanternRoad,
  BlueRoofCottage,
  ChestGridUI,
  EnchantedCompass,
  LodestoneBlock,
  OpenBookPage,
  OpeningChest,
  PLACE,
  ServerCrowd,
  ServerPlayer,
  at,
  cam,
  ease,
  moveBetween,
  ramp,
  storyScene,
  timing,
} from "./kit";

const S = PLACE.smp;
const C = PLACE.cabin;

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Cruel Prank, Owner Discovery & Lodestone Rally",
  shots: [
    {
      cue: "4.rain",
      ...cam.front({ actor: at(S, -1.2, 0, 6.2), dist: 4.8, fov: 42, screenOffset: [0, 0.06] }),
      zone: "smp",
      look: "overworld-rain",
      note: "Cruel breaking point: rainy night as Rex creeps toward Arthur's lane with a smug grin.",
      stage: (t) => (
        <>
          <BlueRoofCottage position={at(S, 0, 0, 10.5)} roofMode="blue" />
          <ServerPlayer role="bully" nameTag="Rex" position={at(S, -1.2, 0, 6.2)} rotationY={0.3} animation="creep" face="smug" time={t} />
        </>
      ),
    },
    {
      cue: "4.break",
      ...cam.sweep({ on: at(S, 1.5, 1.1, 4.5), dist: 4.8, fromYaw: -20, toYaw: 20, pitch: 10, fov: 42 }),
      zone: "smp",
      look: "overworld-rain",
      note: "Rex smashes every wooden trail sign along Arthur's road in the rain.",
      stage: (t) => (
        <ServerPlayer role="bully" nameTag="Rex" position={at(S, 1.2, 0, 4.5)} rotationY={0.4} animation="push" face="grin" time={t} />
      ),
    },
    {
      cue: "4.cobble",
      ...cam.heroLow({ on: at(S, 0, 3.2, 10.5), dist: 7.4, yaw: -16, fov: 44 }),
      zone: "smp",
      look: "overworld-rain",
      note: "Arthur's bright blue wool roof is covered completely in plain grey cobblestone.",
      stage: (t) => (
        <>
          <BlueRoofCottage position={at(S, 0, 0, 10.5)} roofMode="cobble" />
          <ServerPlayer role="bully" nameTag="Rex" position={at(S, 2.2, 0, 7.2)} rotationY={-0.6} animation="laugh" face="smug" time={t} />
        </>
      ),
    },
    {
      cue: "4.wander",
      ...cam.track({ from: at(S, -3.5, 0, 6.8), to: at(S, 3.2, 0, 6.8), sideDist: 5.4, lead: 0.9, height: 1.6, fov: 44 }),
      zone: "smp",
      look: "overworld-rain",
      note: "Heartbreak: Arthur wanders right past his own cobble-covered cottage in the dark rain.",
      stage: (t) => {
        const w = moveBetween(at(S, -3.5, 0, 6.8), at(S, 3.2, 0, 6.8), t, 0, 1.45);
        return (
          <>
            <BlueRoofCottage position={at(S, 0, 0, 10.5)} roofMode="cobble" />
            <ServerPlayer role="friendA" hair="#d6dbe2" shirtColor="#4a6fa5" nameTag="Arthur" position={w.position} rotationY={w.rotationY} animation="walk" animDistance={w.animDistance} face="sad" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.stop",
      ...cam.front({ actor: at(S, 0, 0, 6.8), dist: 4.2, fov: 40, screenOffset: [0, 0.06] }),
      zone: "smp",
      look: "overworld-rain",
      note: "Arthur stops dead still in the rain with TearDrops falling down his face.",
      stage: (t) => (
        <>
          <BlueRoofCottage position={at(S, 0, 0, 10.5)} roofMode="cobble" />
          <ServerPlayer role="friendA" hair="#d6dbe2" shirtColor="#4a6fa5" nameTag="Arthur" position={at(S, 0, 0, 6.8)} rotationY={0} animation="idle" face="crying" tears={1} time={t} />
        </>
      ),
    },
    {
      cue: "4.sorry",
      ...cam.front({ actor: at(S, 0, 0, 6.8), dist: 4.0, fov: 40, screenOffset: [0, 0.06] }),
      zone: "smp",
      look: "overworld-rain",
      hud: {
        chat: [{ sender: "Arthur", text: "I'm sorry. I can't find Sam's house anymore.", color: "#ffffff" }],
        typing: true,
      },
      note: "Live typing chat line as Arthur apologizes in the rain.",
      stage: (t) => (
        <ServerPlayer role="friendA" hair="#d6dbe2" shirtColor="#4a6fa5" nameTag="Arthur" position={at(S, 0, 0, 6.8)} rotationY={0} animation="cower" face="crying" tears={1} time={t} />
      ),
    },
    {
      cue: "4.left",
      ...cam.sweep({ on: at(S, 0, 1.2, 6.8), dist: 5.4, fromYaw: -18, toYaw: 18, pitch: 10, fov: 44 }),
      zone: "smp",
      look: "overworld-rain",
      hud: { chat: [{ text: "Arthur left the game", color: "#ffdd57" }] },
      note: "Arthur vanishes from the empty rainy street as server chat goes dead quiet.",
      stage: () => <BlueRoofCottage position={at(S, 0, 0, 10.5)} roofMode="cobble" />,
    },
    {
      cue: "5.owner",
      ...cam.track({ from: at(C, 0, 0, 2.2), to: at(C, 0, 0, -0.8), sideDist: 2.8, lead: 0.8, height: 1.5, fov: 42 }),
      zone: "cabin",
      look: "warm-room",
      note: "2.5s emotional hush: Server Owner steps quietly inside Arthur's empty cottage.",
      stage: (t) => {
        const w = moveBetween(at(C, 0, 0, 2.2), at(C, 0, 0, -0.8), t, 0, 1.3);
        return (
          <>
            <OpeningChest position={at(C, 1.6, 0, -2.2)} open={0} contents="book" />
            <ServerPlayer role="owner" nameTag="Owner" crown position={w.position} rotationY={w.rotationY} animation="walk" animDistance={w.animDistance} face="worried" time={t} />
          </>
        );
      },
    },
    {
      cue: "5.chest",
      ...cam.sweep({ on: at(C, 1.4, 0.9, -2.0), dist: 3.6, fromYaw: -18, toYaw: 18, pitch: 12, fov: 40 }),
      zone: "cabin",
      look: "warm-room",
      note: "Owner opens the wooden chest beside Arthur's blue bed and spots a single book.",
      stage: (t) => (
        <>
          <OpeningChest position={at(C, 1.6, 0, -2.2)} open={ease(ramp(t, 0.1, 0.9))} contents="book" />
          <ServerPlayer role="owner" nameTag="Owner" crown position={at(C, 0.4, 0, -1.4)} rotationY={0.8} animation="reach" face="surprised" time={t} />
        </>
      ),
    },
    {
      cue: "5.book",
      ...cam.front({ actor: at(C, 0, 0, -0.2), dist: 3.6, fov: 38, screenOffset: [0, 0.04] }),
      zone: "cabin",
      look: "warm-room",
      note: "Centered OpenBookPage reveals Arthur's note: MY HOUSE HAS A BLUE ROOF — SAM BUILT IT.",
      stage: (t) => (
        <OpenBookPage
          header="ARTHUR'S NOTE"
          lines={["MY HOUSE HAS A", "BLUE ROOF.", "SAM BUILT IT", "FOR ME."]}
          progress={ramp(t, 0.05, 1.1)}
          position={at(C, 0, 1.35, -1.6)}
        />
      ),
    },
    {
      cue: "5.ping",
      ...cam.front({ actor: at(C, 0, 0, -1.0), dist: 4.0, fov: 40, screenOffset: [0, 0.06] }),
      zone: "cabin",
      look: "warm-room",
      hud: { chat: [{ sender: "Owner", text: "@everyone GET ONLINE NOW. WE'RE HELPING ARTHUR.", color: "#55ff55" }] },
      note: "Overhead ! badge pops over the Owner as he pings the entire server.",
      stage: (t) => (
        <ServerPlayer role="owner" nameTag="Owner" crown badge="!" badgePopStart={0.15} position={at(C, 0, 0, -1.0)} rotationY={0} animation="point" face="brave" time={t} />
      ),
    },
    {
      cue: "6.join",
      ...cam.streetOverview({ from: at(S, 0, 0, 12.0), to: at(S, 0, 0, 5.5), on: at(S, 0, 1.4, 2.0), height: 4.8, fov: 46 }),
      zone: "smp",
      look: "lantern-night",
      hud: {
        chat: [
          { text: "Maya joined the game", color: "#ffdd57" },
          { text: "Noah joined the game", color: "#ffdd57" },
          { text: "25 players online!", color: "#55ff55" },
        ],
      },
      note: "Triumphant return: twenty-five players flood into Spawn carrying wool and glowing lanterns.",
      stage: (t) => (
        <>
          <BlueRoofCottage position={at(S, 0, 0, 10.5)} roofMode="cobble" />
          <ServerPlayer role="owner" nameTag="Owner" crown position={at(S, 0, 0, 1.2)} rotationY={0} animation="cheer" face="grin" time={t} />
          <ServerCrowd
            members={[
              { role: "friendA", position: at(S, -2.4, 0, 2.5), rotationY: 0, animation: "run" },
              { role: "hero", position: at(S, 2.4, 0, 2.5), rotationY: 0, animation: "run" },
              { role: "mom", position: at(S, -1.6, 0, 4.0), rotationY: 0, animation: "run" },
              { role: "friendA", position: at(S, 1.6, 0, 4.0), rotationY: 0, animation: "run" },
            ]}
            time={t}
          />
        </>
      ),
    },
    {
      cue: "6.lode",
      ...cam.sweep({ on: at(S, 0, 0.9, 6.8), dist: 3.8, fromYaw: -20, toYaw: 20, pitch: 10, fov: 40 }),
      zone: "smp",
      look: "lantern-night",
      hud: { banner: { text: "LODESTONE", color: "#b197fc" } },
      note: "Hero reveal of the vanilla Minecraft Lodestone block with purple enchantment glint.",
      stage: (t) => (
        <>
          <LodestoneBlock position={at(S, 0, 0, 6.8)} />
          <ServerPlayer role="owner" nameTag="Owner" crown position={at(S, -1.4, 0, 6.8)} rotationY={1.2} animation="point" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "6.comp",
      ...cam.front({ actor: at(S, 0, 0, 6.2), dist: 4.0, fov: 40, screenOffset: [0, 0.06] }),
      zone: "smp",
      look: "lantern-night",
      note: "Owner taps a Compass onto the Lodestone—it turns glowing purple and locks onto home forever.",
      stage: (t) => (
        <>
          <LodestoneBlock position={at(S, 0, 0, 6.8)} />
          <ServerPlayer role="owner" nameTag="Owner" crown position={at(S, -1.2, 0, 6.2)} rotationY={0.7} animation="reach" face="grin" time={t}>
            <EnchantedCompass position={[0, 0.04, 0.24]} scale={1.15} />
          </ServerPlayer>
        </>
      ),
    },
    {
      cue: "6.roof",
      ...cam.heroLow({ on: at(S, 0, 3.4, 10.5), dist: 7.2, yaw: 16, fov: 44 }),
      zone: "smp",
      look: "lantern-night",
      note: "All night, the server rebuilds Arthur's bright glowing blue wool roof.",
      stage: (t) => (
        <>
          <BlueRoofCottage position={at(S, 0, 0, 10.5)} roofMode="glowing" />
          <ServerCrowd members={[{ role: "friendA", position: at(S, -2.5, 0, 7.6), rotationY: 0, animation: "cheer" }, { role: "mom", position: at(S, 2.5, 0, 7.6), rotationY: 0, animation: "cheer" }]} time={t} />
        </>
      ),
    },
    {
      cue: "6.road",
      ...cam.streetOverview({ from: at(S, 0, 0, -2.0), to: at(S, 0, 0, 5.0), on: at(S, 0, 1.2, 8.0), height: 4.5, fov: 46 }),
      zone: "smp",
      look: "lantern-night",
      note: "Wide crane down the glowing blue wool & sea-lantern highway leading straight to Arthur's door.",
      stage: () => (
        <>
          <BlueRoofCottage position={at(S, 0, 0, 10.5)} roofMode="glowing" />
          <BlueLanternRoad position={at(S, 0, 0, 2.5)} />
        </>
      ),
    },
    {
      cue: "6.place2",
      ...cam.sweep({ on: at(S, 1.4, 0.8, 7.6), dist: 4.0, fromYaw: 18, toYaw: -18, pitch: 10, fov: 40 }),
      zone: "smp",
      look: "lantern-night",
      note: "Owner places the Lodestone permanently right beside Arthur's front porch.",
      stage: (t) => (
        <>
          <BlueRoofCottage position={at(S, 0, 0, 10.5)} roofMode="glowing" />
          <BlueLanternRoad position={at(S, 0, 0, 2.5)} />
          <LodestoneBlock position={at(S, 1.6, 0, 7.6)} />
          <ServerPlayer role="owner" nameTag="Owner" crown position={at(S, 0, 0, 7.4)} rotationY={1.0} animation="reach" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "6.fill",
      ...cam.front({ actor: at(S, 0, 0, -2.0), dist: 4.2, fov: 40, screenOffset: [0, 0.04] }),
      zone: "smp",
      look: "lantern-night",
      note: "27-slot ChestGridUI fills slot by slot with glowing purple Enchanted Compasses named HOME.",
      stage: (t) => (
        <>
          <OpeningChest position={at(S, 0, 0, -2.0)} open={1} contents="gold" />
          <ChestGridUI
            title="HOME COMPASSES"
            filled={Math.min(27, Math.max(1, Math.ceil(ramp(t, 0.05, 1.25) * 27)))}
            itemColor="#9775fa"
            position={at(S, 0, 1.75, -2.0)}
          />
        </>
      ),
    },
  ],
});
