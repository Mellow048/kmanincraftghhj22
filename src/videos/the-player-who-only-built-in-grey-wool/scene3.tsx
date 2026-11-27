import { Block } from "../../engine";
import {
  ChestGridUI,
  FloatingHeart,
  OpeningChest,
  PLACE,
  ServerChatBox,
  ServerCrowd,
  ServerPlayer,
  Sign,
  SubscribeSign,
  cam,
  ease,
  on,
  pop,
  ramp,
  storyScene,
  timing,
  wordAt,
} from "./kit";
import { PaletteWall, SamHouse } from "./world";

const HOUSE = on(PLACE.server, 0, 0, -2.6);

/** Scene 3 (Beats 5–7): Owner (!) -> Community Rally -> Palette Wall Payoff + CTA (Up Happy). */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Building In Color",
  shots: [
    {
      cue: "5.dm",
      ...cam.front({ actor: on(PLACE.server, 0, 0, 1.2), facing: 0, dist: 4.8, to: 4.0, side: -16, pitch: 7, fov: 44 }),
      zone: "server",
      look: "overworld-day",
      note: "Owner whispers to Sam on screen with live typewriter chat.",
      stage: (t) => (
        <>
          <SamHouse position={HOUSE} state="pranked" />
          <ServerPlayer role="owner" nameTag="Owner" crown position={on(PLACE.server, 0, 0, 1.2)} rotationY={0} animation="talk" face="worried" time={t} />
          <ServerChatBox lines={[{ sender: "Owner", whisper: true, text: "hey sam, are you ok?" }]} typing={ramp(t, 0.1, 0.85)} position={on(PLACE.server, 0, 2.75, 1.0)} scale={0.82 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "5.told",
      ...cam.front({ actor: on(PLACE.irl, 0, 0, -0.38), facing: Math.PI, dist: 4.0, to: 3.3, side: 58, pitch: 10, fov: 44 }),
      zone: "irl",
      look: "overworld-night",
      note: "Front-side IRL cutaway: Sam cries at desk while whispering back to the Owner.",
      stage: (t) => (
        <>
          <ServerPlayer role="hero" position={on(PLACE.irl, 0, 0, -0.38)} rotationY={Math.PI} animation="sit" face="sad" tears={0.9} headPitch={0.1 + Math.sin(t * 2) * 0.05} time={t} />
          <ServerChatBox lines={[{ sender: "Sam", whisper: true, text: "im colorblind, grey is safe" }]} typing={ramp(t, 0.1, 0.85)} position={on(PLACE.irl, 0.1, 2.2, -0.5)} rotationY={Math.PI * 0.8} scale={0.78 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "5.idea",
      ...cam.front({ actor: on(PLACE.server, 0, 0, 1.2), facing: 0, dist: 4.6, to: 3.8, side: 14, pitch: 6, fov: 42 }),
      zone: "server",
      look: "overworld-day",
      note: "Owner lights up with a big (!) badge popping overhead.",
      stage: (t) => (
        <>
          <SamHouse position={HOUSE} state="pranked" />
          <ServerPlayer role="owner" nameTag="Owner" crown badge="!" badgePopStart={0.2} position={on(PLACE.server, 0, 0, 1.2)} rotationY={0} animation="cheer" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "5.texture",
      ...cam.push({ on: on(PLACE.server, 0, 1.2, 1.2), dist: 4.8, to: 3.9, yaw: 10, pitch: 10, fov: 44 }),
      zone: "server",
      look: "overworld-day",
      note: "Showcase 3 distinct Minecraft textures popping up side by side: brick, oak, glowstone.",
      stage: (t) => (
        <>
          <SamHouse position={HOUSE} state="grey" />
          <Block position={on(PLACE.server, -1.1, 0.55 * pop(t, 0.05), 1.2)} size={[0.8, 0.8, 0.8]} color="#a64336" />
          <Block position={on(PLACE.server, 0, 0.55 * pop(t, 0.25), 1.2)} size={[0.8, 0.8, 0.8]} color="#8c6138" />
          <Block position={on(PLACE.server, 1.1, 0.55 * pop(t, 0.45), 1.2)} size={[0.8, 0.8, 0.8]} color="#f2c94c" emissive="#f2c94c" emissiveIntensity={0.45} />
        </>
      ),
    },
    {
      cue: "5.brick",
      ...cam.push({ on: on(PLACE.server, 0, 1.5, -0.5), dist: 5.4, to: 4.5, yaw: -12, pitch: 8, fov: 44 }),
      zone: "server",
      look: "overworld-day",
      note: "PaletteWall rises into view showing RED=BRICK, BLUE=ICE, GOLD=GLOW, OAK=WOOD.",
      stage: (t) => (
        <>
          <SamHouse position={HOUSE} state="grey" />
          <PaletteWall position={on(PLACE.server, 0, 0, -0.5)} />
          <ServerPlayer role="owner" nameTag="Owner" crown position={on(PLACE.server, -2.2, 0, 0.8)} rotationY={0.45} animation="point" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "6.join",
      ...cam.push({ on: on(PLACE.server, 0, 1.4, 1.6), dist: 8.6, to: 7.2, yaw: 0, pitch: 22, fov: 48 }),
      zone: "server",
      look: "lantern-night",
      note: "High-angle rally: whole server spawns in holding torches with stacked join chat.",
      stage: (t) => (
        <>
          <SamHouse position={HOUSE} state="pranked" />
          <ServerCrowd
            members={[
              { role: "owner", nameTag: "Owner", position: on(PLACE.server, 0, 0, 1.4), rotationY: 0, animation: "cheer", face: "grin", torch: true },
              { role: "friendA", nameTag: "Mia", position: on(PLACE.server, -1.6, 0, 2.0), rotationY: 0, animation: "wave", face: "happy", torch: true },
              { role: "friendB", nameTag: "Leo", position: on(PLACE.server, 1.6, 0, 2.0), rotationY: 0, animation: "wave", face: "happy", torch: true },
              { role: "bully", nameTag: "Alex", position: on(PLACE.server, -2.8, 0, 3.0), rotationY: 0, animation: "cheer", face: "smile", torch: true },
              { role: "friendC", nameTag: "Zuri", position: on(PLACE.server, 2.8, 0, 3.0), rotationY: 0, animation: "cheer", face: "smile", torch: true },
            ]}
            time={t}
          />
          <ServerChatBox lines={[{ text: "Owner joined the game" }, { text: "Mia joined the game" }, { text: "Alex joined the game" }]} position={on(PLACE.server, 0, 3.4, 0.8)} scale={0.9 * pop(t, 0.15)} />
        </>
      ),
    },
    {
      cue: "6.wall",
      ...cam.twoShot({ a: on(PLACE.server, -3.2, 0, -1.2), b: on(PLACE.server, -0.5, 0, 1.0), facing: 0, dist: 6.0, to: 5.0, side: 14, pitch: 9, fov: 46 }),
      zone: "server",
      look: "lantern-night",
      note: "Server team builds the giant PaletteWall beside Sam's yard under torchlight.",
      stage: (t) => (
        <>
          <SamHouse position={HOUSE} state="rebuilt" />
          <PaletteWall position={on(PLACE.server, -3.4, 0, -1.6)} rotationY={0.35} />
          <ServerPlayer role="friendA" nameTag="Mia" position={on(PLACE.server, -2.0, 0, 0.4)} rotationY={-0.3} animation="reach" face="grin" torch time={t} />
          <ServerPlayer role="friendB" nameTag="Leo" position={on(PLACE.server, -0.5, 0, 1.0)} rotationY={-0.4} animation="press" face="happy" torch time={t} />
        </>
      ),
    },
    {
      cue: "6.labels",
      ...cam.push({ on: on(PLACE.server, -3.0, 1.5, -1.2), dist: 5.0, to: 4.1, yaw: 20, pitch: 8, fov: 44 }),
      zone: "server",
      look: "lantern-night",
      note: "Push onto PaletteWall and OpeningChest filling with labeled color blocks.",
      stage: (t) => (
        <>
          <SamHouse position={HOUSE} state="rebuilt" />
          <PaletteWall position={on(PLACE.server, -3.4, 0, -1.6)} rotationY={0.35} />
          <OpeningChest position={on(PLACE.server, -2.6, 0, 0.1)} rotationY={0.35} open={ease(ramp(t, 0.1, 0.8))} contents="books" />
          <ServerPlayer role="owner" nameTag="Owner" crown position={on(PLACE.server, -1.2, 0, 0.5)} rotationY={-0.4} animation="point" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "6.rebuild",
      ...cam.push({ on: on(PLACE.server, 0, 1.6, -1.4), dist: 6.8, to: 5.6, yaw: -12, pitch: 10, fov: 46 }),
      zone: "server",
      look: "overworld-golden",
      note: "Sunrise reveal of Sam's newly rebuilt brick, oak, glass, and lantern house.",
      stage: (t) => (
        <>
          <SamHouse position={HOUSE} state="rebuilt" />
          <PaletteWall position={on(PLACE.server, -3.4, 0, -1.6)} rotationY={0.35} />
          <ServerPlayer role="bully" nameTag="Alex" position={on(PLACE.server, 1.8, 0, 1.2)} rotationY={-0.4} animation="cheer" face="grin" time={t} />
          <ServerPlayer role="friendC" nameTag="Zuri" position={on(PLACE.server, -1.4, 0, 1.4)} rotationY={0.3} animation="wave" face="happy" time={t} />
        </>
      ),
    },
    {
      cue: "7.return",
      ...cam.front({ actor: on(PLACE.server, -1.5, 0, 1.2), facing: 0, dist: 5.2, to: 4.3, side: 18, pitch: 8, fov: 44 }),
      zone: "server",
      look: "overworld-day",
      note: "Sam logs back on and walks happily toward the PaletteWall.",
      stage: (t) => {
        const w = ease(ramp(t, 0, 0.85));
        return (
          <>
            <SamHouse position={HOUSE} state="rebuilt" />
            <PaletteWall position={on(PLACE.server, -3.4, 0, -1.6)} rotationY={0.35} />
            <ServerPlayer role="hero" nameTag="Sam" position={on(PLACE.server, -0.8 - w * 1.1, 0, 2.0 - w * 0.9)} rotationY={w < 0.9 ? Math.atan2(-1.1, -0.9) : -0.35} animation={w < 0.9 ? "walk" : "wave"} animDistance={w * 1.4} face="wow" time={t} />
            <ServerChatBox lines={[{ text: "Sam joined the game" }]} position={on(PLACE.server, -1.2, 2.6, 1.0)} scale={0.85 * pop(t, 0.1)} />
          </>
        );
      },
    },
    {
      cue: "7.chest",
      ...cam.push({ on: on(PLACE.server, -2.5, 1.5, 0.0), dist: 4.8, to: 4.0, yaw: 16, pitch: 8, fov: 44 }),
      zone: "server",
      look: "overworld-day",
      note: "OpeningChest pops open with ChestGridUI filling 27 slots of labeled color blocks!",
      stage: (t) => (
        <>
          <SamHouse position={HOUSE} state="rebuilt" />
          <PaletteWall position={on(PLACE.server, -3.4, 0, -1.6)} rotationY={0.35} />
          <OpeningChest position={on(PLACE.server, -2.6, 0, 0.1)} rotationY={0.35} open={0.95} contents="books" />
          <ChestGridUI title="Color Palette" filled={Math.round(ramp(t, 0.1, 0.9) * 27)} itemColor="#e06c3a" position={on(PLACE.server, -2.4, 2.05, 0.2)} scale={0.82 * pop(t, 0.1)} />
          <ServerPlayer role="hero" nameTag="Sam" position={on(PLACE.server, -1.2, 0, 0.8)} rotationY={-0.5} animation="reach" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "7.tears",
      ...cam.front({ actor: on(PLACE.server, -1.2, 0, 1.0), facing: 0, dist: 4.4, to: 3.6, side: -14, pitch: 6, fov: 42 }),
      zone: "server",
      look: "overworld-day",
      note: "Happy tears close push on Sam beaming with FloatingHeart burst rising.",
      stage: (t) => (
        <>
          <SamHouse position={HOUSE} state="rebuilt" />
          <PaletteWall position={on(PLACE.server, -3.4, 0, -1.6)} rotationY={0.35} />
          <ServerPlayer role="hero" nameTag="Sam" position={on(PLACE.server, -1.2, 0, 1.0)} rotationY={0} animation="cheer" face="grin" tears={0.8} time={t} />
          <FloatingHeart position={on(PLACE.server, -1.2, 2.1, 1.0)} count={8} t={t} />
        </>
      ),
    },
    {
      cue: "7.typed",
      ...cam.front({ actor: on(PLACE.server, 0, 0, 1.2), facing: 0, dist: 4.8, to: 4.0, side: 12, pitch: 7, fov: 44 }),
      zone: "server",
      look: "overworld-day",
      note: "Sam smiles typing 'now i can build in color too' in ServerChatBox.",
      stage: (t) => (
        <>
          <SamHouse position={HOUSE} state="rebuilt" />
          <PaletteWall position={on(PLACE.server, -3.4, 0, -1.6)} rotationY={0.35} />
          <ServerPlayer role="hero" nameTag="Sam" position={on(PLACE.server, 0, 0, 1.2)} rotationY={0} animation="wave" face="grin" time={t} />
          <ServerChatBox lines={[{ sender: "Sam", text: "now i can build in color too" }, { sender: "Owner", text: "welcome home sam!" }]} typing={ramp(t, 0.1, 0.85)} position={on(PLACE.server, 0, 2.6, 1.0)} scale={0.85 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "7.gallery",
      ...cam.twoShot({ a: on(PLACE.server, -1.0, 0, 1.2), b: on(PLACE.server, 1.2, 0, 1.2), facing: 0, dist: 5.0, to: 4.2, side: -10, pitch: 8, fov: 44 }),
      zone: "server",
      look: "overworld-day",
      note: "Callback payoff: BORING BOX sign pops into SAM'S GALLERY beside Sam and Owner.",
      stage: (t) => (
        <>
          <SamHouse position={HOUSE} state="rebuilt" />
          <ServerPlayer role="hero" nameTag="Sam" position={on(PLACE.server, -1.0, 0, 1.2)} rotationY={0.2} animation="cheer" face="grin" time={t} />
          <ServerPlayer role="owner" nameTag="Owner" crown position={on(PLACE.server, -2.2, 0, 1.4)} rotationY={0.35} animation="wave" face="happy" time={t} />
          <Sign title={t > wordAt("7.gallery", "Gallery") ? "SAM'S GALLERY" : "BORING BOX"} position={on(PLACE.server, 1.2, 0.95, 1.2)} rotationY={-0.15} />
        </>
      ),
    },
    {
      cue: "7.cta",
      ...cam.push({ on: on(PLACE.server, 0, 1.5, 0.8), dist: 6.4, to: 7.4, yaw: 0, pitch: 11, fov: 46 }),
      zone: "server",
      look: "overworld-golden",
      note: "Warm pull-back celebration: whole server cheering around Sam's Gallery with FloatingHeart and SubscribeSign.",
      stage: (t) => (
        <>
          <SamHouse position={HOUSE} state="rebuilt" />
          <PaletteWall position={on(PLACE.server, -3.4, 0, -1.6)} rotationY={0.35} />
          <ServerPlayer role="hero" nameTag="Sam" position={on(PLACE.server, 0, 0, 1.2)} rotationY={0} animation="cheer" face="grin" time={t} />
          <ServerCrowd
            members={[
              { role: "owner", nameTag: "Owner", position: on(PLACE.server, -1.5, 0, 1.4), rotationY: 0.15, animation: "wave", face: "grin" },
              { role: "friendA", nameTag: "Mia", position: on(PLACE.server, 1.5, 0, 1.4), rotationY: -0.15, animation: "cheer", face: "happy" },
              { role: "friendB", nameTag: "Leo", position: on(PLACE.server, -2.6, 0, 2.0), rotationY: 0.25, animation: "cheer", face: "grin" },
              { role: "bully", nameTag: "Alex", position: on(PLACE.server, 2.6, 0, 2.0), rotationY: -0.25, animation: "wave", face: "smile" },
            ]}
            time={t}
          />
          <FloatingHeart position={on(PLACE.server, 0, 2.2, 1.2)} count={10} t={t} />
          <SubscribeSign position={on(PLACE.server, 0, 1.25, 2.5)} scale={0.85 * pop(t, 0.2)} />
        </>
      ),
    },
  ],
});
