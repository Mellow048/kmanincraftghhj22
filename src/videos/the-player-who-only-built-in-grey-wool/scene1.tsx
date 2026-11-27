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

/** Scene 1 (Beats 1–2): Hook + Server Evidence (0:00–0:17, Up Happy). */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The Grey Wool Base",
  shots: [
    {
      cue: "1.grey",
      ...cam.front({ actor: on(PLACE.server, 0, 0, 1.2), facing: 0, dist: 5.4, to: 4.5, side: 16, pitch: 8, fov: 44 }),
      zone: "server",
      note: "Front 3/4 hook: Sam places a grey wool block in front of his grey house while looking up proudly.",
      stage: (t) => (
        <>
          <SamHouse position={HOUSE} state="grey" />
          <ServerPlayer role="hero" nameTag="Sam" position={on(PLACE.server, 0, 0, 1.2)} rotationY={0} animation="reach" face="smile" headYaw={Math.sin(t * 2.5) * 0.18} time={t} />
          <Block position={on(PLACE.server, 0.75, 0.35 + Math.sin(t * 4) * 0.04, 1.4)} size={[0.7, 0.7, 0.7]} color="#8b8f96" />
        </>
      ),
    },
    {
      cue: "1.only",
      ...cam.push({ on: on(PLACE.server, 0, 1.4, -0.8), dist: 6.2, to: 5.2, yaw: 24, pitch: 9, fov: 46 }),
      zone: "server",
      note: "Front push on Sam stacking another grey block beside his plain grey wool wall.",
      stage: (t) => {
        const step = ease(ramp(t, 0, 0.7));
        return (
          <>
            <SamHouse position={HOUSE} state="grey" />
            <ServerPlayer role="hero" nameTag="Sam" position={on(PLACE.server, -0.8 + step * 0.7, 0, 1.0)} rotationY={step < 0.9 ? Math.PI / 2 : 0.2} animation={step < 0.9 ? "walk" : "press"} animDistance={step * 0.7} face="calm" time={t} />
            <Block position={on(PLACE.server, 0.9, 0.35, 0.9)} size={[0.7, 0.7, 0.7]} color="#767a82" />
            <Block position={on(PLACE.server, 0.9, 1.05 * pop(t, 0.3), 0.9)} size={[0.7, 0.7, 0.7]} color="#999da6" />
          </>
        );
      },
    },
    {
      cue: "1.ugly",
      ...cam.twoShot({ a: on(PLACE.server, -1.1, 0, 1.8), b: on(PLACE.server, 1.1, 0, 1.8), facing: 0, dist: 5.6, to: 4.8, side: -10, pitch: 8, fov: 46 }),
      zone: "server",
      note: "Front two-shot: Alex and Zuri point and laugh at Sam's grey house as chat mocks him.",
      stage: (t) => (
        <>
          <SamHouse position={HOUSE} state="grey" />
          <ServerPlayer role="bully" nameTag="Alex" position={on(PLACE.server, -1.0, 0, 1.8)} rotationY={0.2} animation="laugh" face="smug" time={t} />
          <ServerPlayer role="friendC" nameTag="Zuri" position={on(PLACE.server, 1.0, 0, 1.8)} rotationY={-0.25} animation="point" face="grin" time={t} />
          <ServerChatBox lines={[{ sender: "Alex", text: "ugliest base on server" }]} typing={ramp(t, 0.1, 0.8)} position={on(PLACE.server, 0, 2.6, 1.2)} scale={0.85 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "1.promise",
      ...cam.push({ on: on(PLACE.server, 0, 1.6, -1.0), dist: 7.4, to: 6.2, yaw: 12, pitch: 12, fov: 46 }),
      zone: "server",
      note: "Open-loop tease: Owner (!) steps forward as Sam's house flashes bright rebuilt color with hearts.",
      stage: (t) => (
        <>
          <SamHouse position={HOUSE} state="rebuilt" />
          <PaletteWall position={on(PLACE.server, -3.4, 0, -1.8)} rotationY={0.35} />
          <ServerPlayer role="owner" nameTag="Owner" crown badge="!" badgePopStart={0.15} position={on(PLACE.server, 0, 0, 1.2)} rotationY={0} animation="cheer" face="grin" time={t} />
          <FloatingHeart position={on(PLACE.server, 0, 2.3, 0.8)} count={6} t={t} />
        </>
      ),
    },
    {
      cue: "2.rainbow",
      ...cam.truck({ on: on(PLACE.server, -3.5, 1.5, -1.0), dist: 6.8, yaw: 8, pitch: 12, by: [7.0, 0, 0], fov: 46 }),
      zone: "server",
      note: "Smooth lateral truck across colorful neighbor builds with happy players waving.",
      stage: (t) => (
        <>
          <SamHouse position={HOUSE} state="grey" />
          <ServerCrowd
            members={[
              { role: "friendA", nameTag: "Mia", position: on(PLACE.server, -4.6, 0, 0.6), rotationY: 0, animation: "wave", face: "grin" },
              { role: "friendB", nameTag: "Leo", position: on(PLACE.server, 4.6, 0, 0.6), rotationY: 0, animation: "cheer", face: "happy" },
            ]}
            time={t}
          />
        </>
      ),
    },
    {
      cue: "2.box",
      ...cam.front({ actor: on(PLACE.server, 0, 0, 1.0), facing: 0, dist: 5.8, to: 4.9, side: -14, pitch: 8, fov: 46 }),
      zone: "server",
      note: "Front push contrasting Sam's plain grey wool box right between the colorful huts.",
      stage: (t) => (
        <>
          <SamHouse position={HOUSE} state="grey" />
          <ServerPlayer role="hero" nameTag="Sam" position={on(PLACE.server, 0, 0, 1.0)} rotationY={0} animation="shrug" face="uneasy" headYaw={Math.sin(t * 2) * 0.25} time={t} />
        </>
      ),
    },
    {
      cue: "2.sign",
      ...cam.twoShot({ a: on(PLACE.server, -0.9, 0, 1.2), b: on(PLACE.server, 1.2, 0, 1.2), facing: 0, dist: 5.0, to: 4.2, side: 12, pitch: 8, fov: 44 }),
      zone: "server",
      note: "Alex plants a BORING BOX sign right in front of Sam's yard on the spoken word.",
      stage: (t) => {
        const hit = wordAt("2.sign", "sign");
        return (
          <>
            <SamHouse position={HOUSE} state="grey" />
            <ServerPlayer role="bully" nameTag="Alex" position={on(PLACE.server, -0.9, 0, 1.2)} rotationY={0.45} animation="press" face="smug" time={t} />
            <Sign title="BORING BOX" position={on(PLACE.server, 1.2, 0.95 * pop(t, hit - 0.1), 1.2)} rotationY={-0.15} />
          </>
        );
      },
    },
    {
      cue: "2.laugh",
      ...cam.twoShot({ a: on(PLACE.server, -1.1, 0, 1.6), b: on(PLACE.server, 1.1, 0, 1.6), facing: 0, dist: 5.2, to: 4.4, side: -12, pitch: 7, fov: 46 }),
      zone: "server",
      note: "Alex and Zuri laugh in front of Sam as live chat pops overhead.",
      stage: (t) => (
        <>
          <SamHouse position={HOUSE} state="grey" />
          <ServerPlayer role="bully" nameTag="Alex" position={on(PLACE.server, -1.1, 0, 1.6)} rotationY={0.25} animation="laugh" face="smug" time={t} />
          <ServerPlayer role="friendC" nameTag="Zuri" position={on(PLACE.server, 1.1, 0, 1.6)} rotationY={-0.25} animation="laugh" face="grin" time={t} />
          <ServerChatBox lines={[{ sender: "Alex", text: "bro forgot colors exist" }, { sender: "Zuri", text: "HAHAHA" }]} typing={ramp(t, 0.1, 0.85)} position={on(PLACE.server, 0, 2.55, 1.2)} scale={0.82 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "2.quiet",
      ...cam.front({ actor: on(PLACE.server, 0, 0, 1.2), facing: 0, dist: 4.8, to: 4.0, side: 14, pitch: 6, fov: 44 }),
      zone: "server",
      note: "Quiet front push: Sam keeps placing grey blocks calmly without arguing back.",
      stage: (t) => (
        <>
          <SamHouse position={HOUSE} state="grey" />
          <Sign title="BORING BOX" position={on(PLACE.server, 1.5, 0.95, 1.2)} rotationY={-0.2} />
          <ServerPlayer role="hero" nameTag="Sam" position={on(PLACE.server, -0.3, 0, 1.2)} rotationY={0.15} animation="reach" face="frown" headPitch={0.2} time={t} />
        </>
      ),
    },
  ],
});
