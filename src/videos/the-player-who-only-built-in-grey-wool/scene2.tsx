import { Block } from "../../engine";
import {
  PLACE,
  ServerChatBox,
  ServerPlayer,
  Sign,
  cam,
  ease,
  on,
  pop,
  ramp,
  storyScene,
  timing,
  wordAt,
} from "./kit";
import { SamHouse } from "./world";

const HOUSE = on(PLACE.server, 0, 0, -2.6);

/** Scene 2 (Beats 3–4): IRL Colorblind Truth + Cruel Prank Breaking Point (Up Sad). */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Colorblind Truth & The Prank",
  shots: [
    {
      cue: "3.lazy",
      ...cam.front({ actor: on(PLACE.irl, 0, 0, -0.38), facing: Math.PI, dist: 4.1, to: 3.4, side: 58, pitch: 10, fov: 44 }),
      zone: "irl",
      look: "overworld-night",
      note: "Front-side IRL cutaway: Sam sits at his PC desk looking sad at the screen.",
      stage: (t) => (
        <ServerPlayer role="hero" position={on(PLACE.irl, 0, 0, -0.38)} rotationY={Math.PI} animation="sit" face="frown" headPitch={0.1 + Math.sin(t * 2) * 0.06} lookAt={on(PLACE.irl, 0, 1.24, -1.4)} time={t} />
      ),
    },
    {
      cue: "3.blind",
      ...cam.front({ actor: on(PLACE.irl, 0, 0, -0.38), facing: Math.PI, dist: 3.9, to: 3.2, side: -58, pitch: 8, fov: 42 }),
      zone: "irl",
      look: "overworld-night",
      note: "Closer front-side angle on Sam's eyes squinting at his monitor with subtle tears.",
      stage: (t) => (
        <ServerPlayer role="hero" position={on(PLACE.irl, 0, 0, -0.38)} rotationY={Math.PI} animation="sit" face="uneasy" tears={0.45} headYaw={Math.sin(t * 3) * 0.16} time={t} />
      ),
    },
    {
      cue: "3.shades",
      ...cam.push({ on: on(PLACE.server, 0, 1.1, 1.0), dist: 5.0, to: 4.2, yaw: 8, pitch: 12, fov: 44 }),
      zone: "server",
      look: "overworld-day",
      note: "Visual proof: three wool blocks (red, green, brown) desaturate into identical grey right in front of Sam.",
      stage: (t) => {
        const grey = t > wordAt("3.shades", "grey");
        return (
          <>
            <SamHouse position={HOUSE} state="grey" />
            <ServerPlayer role="hero" nameTag="Sam" position={on(PLACE.server, 0, 0, 0.2)} rotationY={0} animation="shrug" face="uneasy" time={t} />
            <Block position={on(PLACE.server, -1.1, 0.4, 1.5)} size={[0.7, 0.7, 0.7]} color={grey ? "#85888f" : "#cc3333"} />
            <Block position={on(PLACE.server, 0, 0.4, 1.5)} size={[0.7, 0.7, 0.7]} color={grey ? "#888b92" : "#38a84b"} />
            <Block position={on(PLACE.server, 1.1, 0.4, 1.5)} size={[0.7, 0.7, 0.7]} color={grey ? "#80838a" : "#7d5232"} />
          </>
        );
      },
    },
    {
      cue: "3.desk",
      ...cam.front({ actor: on(PLACE.irl, 0, 0, -0.38), facing: Math.PI, dist: 4.3, to: 3.6, side: 42, pitch: 10, fov: 44 }),
      zone: "irl",
      look: "overworld-night",
      note: "Front-side IRL desk shot: Sam reaches nervously over his keyboard trying to pick blocks.",
      stage: (t) => (
        <ServerPlayer role="hero" position={on(PLACE.irl, 0, 0, -0.38)} rotationY={Math.PI} animation="press" face="uneasy" headYaw={Math.sin(t * 4) * 0.22} time={t} />
      ),
    },
    {
      cue: "3.school",
      ...cam.twoShot({ a: on(PLACE.cave, -1.1, 0, 1.2), b: on(PLACE.cave, 1.1, 0, 1.2), facing: 0, dist: 5.4, to: 4.6, side: 10, pitch: 10, fov: 46 }),
      zone: "cave",
      look: "overworld-day",
      note: "IRL Classroom cutaway: classmates laugh at Sam holding a green-sky drawing while he shrinks back.",
      stage: (t) => (
        <>
          <ServerPlayer role="hero" nameTag="Sam" position={on(PLACE.cave, 0, 0, 1.2)} rotationY={0} animation="cower" face="sad" badge="?" badgePopStart={0.2} time={t} />
          <ServerPlayer role="bully" position={on(PLACE.cave, -1.6, 0, 1.2)} rotationY={0.45} animation="laugh" face="smug" time={t} />
          <ServerPlayer role="friendC" position={on(PLACE.cave, 1.6, 0, 1.2)} rotationY={-0.45} animation="laugh" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "3.here",
      ...cam.front({ actor: on(PLACE.server, 0, 0, 1.2), facing: 0, dist: 5.0, to: 4.2, side: -14, pitch: 7, fov: 44 }),
      zone: "server",
      look: "overworld-golden",
      note: "Warm golden front push: Sam smiles quietly beside his safe grey wool wall.",
      stage: (t) => (
        <>
          <SamHouse position={HOUSE} state="grey" />
          <ServerPlayer role="hero" nameTag="Sam" position={on(PLACE.server, 0, 0, 1.2)} rotationY={0} animation="wave" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "4.prank",
      ...cam.front({ actor: on(PLACE.server, -0.6, 0, 1.4), facing: 0.4, dist: 5.4, to: 4.5, side: 18, pitch: 9, fov: 46 }),
      zone: "server",
      look: "lantern-night",
      note: "Night sneak: griefer creeps up to Sam's grey house holding bright pink wool.",
      stage: (t) => {
        const creep = ease(ramp(t, 0, 0.85));
        return (
          <>
            <SamHouse position={HOUSE} state="grey" />
            <ServerPlayer role="griefer" nameTag="Efe" position={on(PLACE.server, -1.8 + creep * 1.4, 0, 1.6 - creep * 0.6)} rotationY={creep < 0.96 ? Math.atan2(1.4, -0.6) : 0.3} animation={creep < 0.96 ? "creep" : "laugh"} animDistance={creep * 1.5} face="smug" time={t}>
              <Block position={[0, -0.1, 0.15]} size={[0.35, 0.35, 0.35]} color="#f24cb4" />
            </ServerPlayer>
          </>
        );
      },
    },
    {
      cue: "4.swap",
      ...cam.push({ on: on(PLACE.server, 0, 1.5, -1.2), dist: 6.4, to: 5.2, yaw: -16, pitch: 10, fov: 46 }),
      zone: "server",
      look: "lantern-night",
      note: "House flips to neon pink and lime wool as Efe jumps cheering in front of it.",
      stage: (t) => (
        <>
          <SamHouse position={HOUSE} state={t > wordAt("4.swap", "pink") ? "pranked" : "grey"} />
          <ServerPlayer role="griefer" nameTag="Efe" position={on(PLACE.server, 1.1, 0, 1.2)} rotationY={-0.3} animation="jump" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "4.chat",
      ...cam.front({ actor: on(PLACE.server, 0.6, 0, 1.4), facing: 0, dist: 4.8, to: 4.0, side: 16, pitch: 7, fov: 44 }),
      zone: "server",
      look: "lantern-night",
      note: "Front push on Efe laughing while typewriter chat prints 'fixed ur ugly house'.",
      stage: (t) => (
        <>
          <SamHouse position={HOUSE} state="pranked" />
          <ServerPlayer role="griefer" nameTag="Efe" position={on(PLACE.server, 0.6, 0, 1.4)} rotationY={0} animation="laugh" face="smug" time={t} />
          <ServerChatBox lines={[{ sender: "Efe", text: "fixed ur ugly house lol" }]} typing={ramp(t, 0.1, 0.85)} position={on(PLACE.server, -0.3, 2.55, 1.2)} scale={0.85 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "4.stare",
      ...cam.front({ actor: on(PLACE.server, 0, 0, 1.2), facing: 0, dist: 5.2, to: 4.3, side: -14, pitch: 8, fov: 44 }),
      zone: "server",
      look: "overworld-day",
      note: "Morning reveal: Sam stands frozen in front of the pranked neon house, confused.",
      stage: (t) => (
        <>
          <SamHouse position={HOUSE} state="pranked" />
          <ServerPlayer role="hero" nameTag="Sam" position={on(PLACE.server, 0, 0, 1.2)} rotationY={0} animation="shrug" face="uneasy" headYaw={Math.sin(t * 2.2) * 0.25} time={t} />
        </>
      ),
    },
    {
      cue: "4.cant",
      ...cam.front({ actor: on(PLACE.server, 0, 0, 1.2), facing: 0, dist: 4.4, to: 3.6, side: 12, pitch: 6, fov: 42 }),
      zone: "server",
      look: "overworld-day",
      note: "Heartbreak close push: Sam cries with TearDrops as typewriter chat says 'i cant tell what u did'.",
      stage: (t) => (
        <>
          <SamHouse position={HOUSE} state="pranked" />
          <ServerPlayer role="hero" nameTag="Sam" position={on(PLACE.server, 0, 0, 1.2)} rotationY={0} animation="cower" face="sad" tears={1} time={t} />
          <ServerChatBox lines={[{ sender: "Sam", text: "i cant tell what u did" }]} typing={ramp(t, 0.1, 0.85)} position={on(PLACE.server, 0, 2.55, 1.0)} scale={0.85 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "4.quiet2",
      ...cam.twoShot({ a: on(PLACE.server, -1.2, 0, 1.6), b: on(PLACE.server, 1.2, 0, 1.6), facing: 0, dist: 5.4, to: 4.6, side: 8, pitch: 8, fov: 46 }),
      zone: "server",
      look: "overworld-day",
      note: "Whole server goes quiet: Alex and Zuri drop their grins and stare down in guilt.",
      stage: (t) => (
        <>
          <SamHouse position={HOUSE} state="pranked" />
          <ServerPlayer role="bully" nameTag="Alex" position={on(PLACE.server, -1.2, 0, 1.6)} rotationY={0} animation="shrug" face="worried" headPitch={0.3} time={t} />
          <ServerPlayer role="friendC" nameTag="Zuri" position={on(PLACE.server, 1.2, 0, 1.6)} rotationY={0} animation="shrug" face="sad" headPitch={0.3} time={t} />
          <Sign title="BORING BOX" position={on(PLACE.server, 0, 0.95, 1.0)} />
        </>
      ),
    },
    {
      cue: "4.left",
      ...cam.push({ on: on(PLACE.server, 0, 1.4, 0.5), dist: 5.6, to: 6.4, yaw: 0, pitch: 8, fov: 46 }),
      zone: "server",
      look: "overworld-golden",
      note: "Pull back on empty yard as yellow 'Sam left the game' chat toast lingers.",
      stage: (t) => (
        <>
          <SamHouse position={HOUSE} state="pranked" />
          <ServerChatBox lines={[{ text: "Sam left the game" }]} position={on(PLACE.server, 0, 2.2, 1.2)} scale={0.9 * pop(t, 0.1)} />
        </>
      ),
    },
  ],
});
