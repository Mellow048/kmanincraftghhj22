import {
  ChestGridUI,
  DeskSetup,
  FloatingHeart,
  OpeningChest,
  PLACE,
  RedstoneLamp,
  RedstoneLine,
  SculkSensor,
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

/**
 * SERVER LORE STARTER SCENE (Remaster v3.5) — 5 kinetic front-facing beats:
 *   1.hook  : Front-facing bridge reveal + Noah stopping + live typewriter ServerChatBox
 *   2.mock  : Auto-fitted two-shot of bullies mocking + Owner (?) open loop
 *   3.irl   : Front-side IRL DeskSetup cutaway (monitor + Noah's tearing face clearly visible, zero chair phasing)
 *   4.rally : Front-angle tracking shot of Owner (!) + ServerCrowd sprinting TOWARD camera with torches
 *   5.cta   : Glowing redstone trail + OpeningChest + ChestGridUI payoff + FloatingHeart + SubscribeSign
 */

const ownerSpotWord = wordAt("2.mock", "Owner");
const rallyLitWord = wordAt("4.rally", "lamps");

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The Unlit Trail Mystery",
  shots: [
    {
      cue: "1.hook",
      ...cam.front({
        actor: on(PLACE.server, 0, 0, -0.2),
        facing: 0,
        dist: 5.2,
        to: 4.3,
        side: -16,
        pitch: 7,
        fov: 44,
      }),
      zone: "server",
      note: "Front 3/4 push: Noah walks forward toward camera, stops ahead of unlit redstone lamps, and live typewriter ServerChatBox logs arrival.",
      stage: (t) => {
        const walk = ease(ramp(t, 0, 0.55));
        const pos = on(PLACE.server, 0, 0, -1.5 + walk * 1.3);
        return (
          <>
            <ServerPlayer
              role="hero"
              nameTag="Noah"
              position={pos}
              rotationY={0}
              animation="walk"
              blendTo="scared"
              blend={1 - ease(ramp(t, 0.45, 0.72))}
              animDistance={walk * 1.3}
              face={walk > 0.75 ? "worried" : "neutral"}
              headYaw={walk > 0.7 ? Math.sin(t * 6) * 0.25 : 0}
              time={t}
            />
            <RedstoneLamp position={on(PLACE.server, -1.2, 0.45, -2.8)} lit={0} />
            <RedstoneLamp position={on(PLACE.server, 1.2, 0.45, -2.8)} lit={0} />
            <ServerChatBox
              lines={[{ text: "Noah joined the game" }, { sender: "Alex", text: "why did he stop lol" }]}
              typing={ramp(t, 0.15, 0.9)}
              position={on(PLACE.server, -0.85, 2.5, -1.0)}
              scale={0.85 * pop(t, 0.15)}
            />
          </>
        );
      },
    },
    {
      cue: "2.mock",
      ...cam.twoShot({
        a: on(PLACE.server, -0.8, 0, -0.2),
        b: on(PLACE.server, 1.3, 0, 0.2),
        facing: 0,
        dist: 5.6,
        to: 4.8,
        side: 12,
        pitch: 8,
        fov: 46,
      }),
      zone: "server",
      note: "Clean 9:16 front two-shot: Alex mocks cowering Noah while Server Owner steps in from left with (?) open-loop reaction.",
      stage: (t) => {
        const ownerStep = ease(ramp(t, ownerSpotWord - 0.15, ownerSpotWord + 0.6));
        return (
          <>
            <ServerPlayer
              role="hero"
              nameTag="Noah"
              position={on(PLACE.server, 0, 0, -0.2)}
              rotationY={0.25}
              animation="cower"
              face="sad"
              time={t}
            />
            <ServerPlayer
              role="bully"
              nameTag="Alex"
              position={on(PLACE.server, 1.3, 0, 0.2)}
              rotationY={-0.75}
              animation="laugh"
              face="smug"
              lookAt={on(PLACE.server, 0, 1.3, -0.2)}
              time={t}
            />
            <ServerPlayer
              role="owner"
              nameTag="Owner"
              crown
              badge={t >= ownerSpotWord ? "?" : undefined}
              badgePopStart={ownerSpotWord}
              position={on(PLACE.server, -2.1 + ownerStep * 0.9, 0, -0.9 + ownerStep * 0.5)}
              rotationY={0.65}
              animation="walk"
              blendTo="idle"
              blend={1 - ownerStep}
              animDistance={ownerStep * 1.05}
              lookAt={on(PLACE.server, 0, 1.4, -0.2)}
              face="worried"
              time={t}
            />
            <Sign title="COWARD" position={on(PLACE.server, 1.3, 1.1, -1.4)} rotationY={-0.25} />
          </>
        );
      },
    },
    {
      cue: "3.irl",
      ...cam.front({
        actor: on(PLACE.irl, 0, 0, -0.38),
        facing: Math.PI,
        dist: 4.4,
        to: 3.6,
        side: 38,
        pitch: 10,
        fov: 44,
      }),
      zone: "irl",
      look: "overworld-night",
      note: "Front-side IRL DeskSetup cutaway: shows Noah's crying face clearly past the glowing monitor (Sad Up section, zero chair phasing).",
      stage: (t) => (
        <>
          <DeskSetup position={on(PLACE.irl, 0, 0, -1.2)} screenText="CANNOT REACH KEYS" screenColor="#ff5f52" lampOn={false} />
          <ServerPlayer
            role="hero"
            position={on(PLACE.irl, 0, 0, -0.38)}
            rotationY={Math.PI}
            animation="sit"
            face="sad"
            tears={0.95}
            headPitch={0.12 + Math.sin(t * 2.5) * 0.06}
            lookAt={on(PLACE.irl, 0, 1.24, -1.4)}
            time={t}
          />
        </>
      ),
    },
    {
      cue: "4.rally",
      ...cam.truck({
        on: on(PLACE.server, 0, 1.25, -1.8),
        dist: 5.8,
        yaw: 18,
        pitch: 12,
        by: [0, 0, 3.2],
        fov: 46,
      }),
      zone: "server",
      note: "Front-angle tracking shot: Owner (!) and ServerCrowd sprint TOWARD camera with torches lighting SculkSensor & RedstoneLamps (Happy Up 0:02+).",
      stage: (t) => {
        const sprint = ease(ramp(t, 0, 1.2));
        const wired = t >= rallyLitWord ? ease(ramp(t, rallyLitWord, rallyLitWord + 0.5)) : 0;
        return (
          <>
            <SculkSensor position={on(PLACE.server, 0, 0, -1.5)} active={wired} />
            <RedstoneLine from={on(PLACE.server, 0, 0, -1.5)} to={on(PLACE.server, -1.2, 0, -3.5)} lit={wired} />
            <RedstoneLine from={on(PLACE.server, 0, 0, -1.5)} to={on(PLACE.server, 1.2, 0, -3.5)} lit={wired} />
            <RedstoneLamp position={on(PLACE.server, -1.2, 0.45, -3.5)} lit={wired} />
            <RedstoneLamp position={on(PLACE.server, 1.2, 0.45, -3.5)} lit={wired} />
            <ServerPlayer
              role="owner"
              nameTag="Owner"
              crown
              badge="!"
              position={on(PLACE.server, -0.8, 0, -3.2 + sprint * 3.4)}
              rotationY={0}
              animation="run"
              animDistance={sprint * 3.4}
              torch
              light={1.5}
              time={t}
            />
            <ServerCrowd
              members={[
                { role: "friendA", nameTag: "Mia", position: on(PLACE.server, 1.1, 0, -3.5 + sprint * 3.2), rotationY: 0, animation: "run", animDistance: sprint * 3.2, torch: true },
                { role: "friendB", nameTag: "Leo", position: on(PLACE.server, -1.9, 0, -4.1 + sprint * 3.1), rotationY: 0, animation: "run", animDistance: sprint * 3.1, torch: true },
                { role: "friendC", nameTag: "Zuri", position: on(PLACE.server, 2.0, 0, -4.3 + sprint * 3.0), rotationY: 0, animation: "run", animDistance: sprint * 3.0, torch: true },
              ]}
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "5.cta",
      ...cam.front({
        actor: on(PLACE.server, 0, 0, -1.8),
        facing: 0,
        dist: 5.4,
        to: 4.6,
        side: 14,
        pitch: 9,
        fov: 46,
      }),
      zone: "server",
      note: "Front payoff push: Noah beams beside OpeningChest & filling ChestGridUI surrounded by FloatingHeart burst and SubscribeSign.",
      stage: (t) => {
        const stride = ease(ramp(t, 0, 1.1));
        const signPop = pop(t, Math.max(0.2, timing.cues[4].end - timing.cues[4].start - 1.6));
        return (
          <>
            <SculkSensor position={on(PLACE.server, 0, 0, -1.5)} active={1} />
            <RedstoneLamp position={on(PLACE.server, -1.2, 0.45, -3.5)} lit={1} />
            <RedstoneLamp position={on(PLACE.server, 1.2, 0.45, -3.5)} lit={1} />
            <OpeningChest position={on(PLACE.server, -1.0, 0, -2.2)} rotationY={0.35} open={ease(ramp(t, 0.1, 0.7))} contents="books" />
            <ChestGridUI filled={Math.round(ramp(t, 0.25, 1.2) * 27)} position={on(PLACE.server, -1.0, 2.05, -2.2)} scale={0.75 * pop(t, 0.2)} />
            <ServerPlayer
              role="hero"
              nameTag="Noah"
              position={on(PLACE.server, 0.3, 0, -3.0 + stride * 1.4)}
              rotationY={0}
              animation={stride < 0.95 ? "walk" : "cheer"}
              animDistance={stride * 1.4}
              face="grin"
              time={t}
            />
            <FloatingHeart position={on(PLACE.server, 0.3, 2.0, -1.6)} count={8} t={t} />
            <SubscribeSign position={on(PLACE.server, 1.35, 1.2, -1.4)} rotationY={-0.2} scale={0.9 * signPop} />
          </>
        );
      },
    },
  ],
});
