import {
  BadgePop,
  ChatToast,
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
 * SERVER LORE STARTER SCENE — 5 kinetic beats showing the full 50k SMP template:
 *   1.hook  : Tight night/golden bridge proof + Noah stopping + ServerChatBox
 *   2.mock  : Orbit past ScoreboardWall & bullies mocking + Owner (?) open loop
 *   3.irl   : Hard cutaway to IRL DeskSetup + TearDrops (triggers Up Sad theme)
 *   4.rally : Owner (!) + ServerCrowd placing SculkSensor & RedstoneLamp trail (triggers Up Happy 0:02+)
 *   5.cta   : Glowing redstone trail payoff + FloatingHeart + SubscribeSign
 */

const ownerSpotWord = wordAt("2.mock", "Owner");
const rallyLitWord = wordAt("4.rally", "lamps");

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The Unlit Trail Mystery",
  shots: [
    {
      cue: "1.hook",
      ...cam.push({
        on: on(PLACE.server, 0, 1.35, -0.5),
        onTo: on(PLACE.server, 0, 1.4, -2.0),
        dist: 4.5,
        to: 3.1,
        yaw: -14,
        pitch: 7,
        fov: 42,
        screenOffset: [0, 0.06],
      }),
      zone: "server",
      note: "Noah walks onto the bridge then stops suddenly ahead of dark unlit edge as ServerChatBox logs arrival.",
      stage: (t) => {
        const walk = ease(ramp(t, 0, 0.55));
        const pos = on(PLACE.server, 0, 0, 1.2 - walk * 1.4);
        return (
          <>
            <ServerPlayer
              role="hero"
              nameTag="Noah"
              position={pos}
              rotationY={Math.PI}
              animation="walk"
              blendTo="scared"
              blend={1 - ease(ramp(t, 0.45, 0.72))}
              animDistance={walk * 1.4}
              face={walk > 0.75 ? "worried" : "neutral"}
              time={t}
            />
            <RedstoneLamp position={on(PLACE.server, -1.2, 0.45, -3.5)} lit={0} />
            <RedstoneLamp position={on(PLACE.server, 1.2, 0.45, -3.5)} lit={0} />
            <ServerChatBox
              lines={[{ text: "Noah joined the game" }, { sender: "Alex", text: "why did he stop lol" }]}
              position={on(PLACE.server, -1.5, 2.3, -1.2)}
              rotationY={0.25}
              scale={pop(t, 0.2)}
            />
          </>
        );
      },
    },
    {
      cue: "2.mock",
      ...cam.orbit({
        on: on(PLACE.server, -0.4, 1.35, -0.8),
        dist: 4.8,
        distTo: 3.6,
        yaw: -26,
        yawTo: 24,
        pitch: 9,
        fov: 42,
        screenOffset: [0, 0.06],
      }),
      zone: "server",
      note: "Orbit past snickering bullies while Server Owner enters behind with (?) open-loop reaction.",
      stage: (t) => {
        const ownerStep = ease(ramp(t, ownerSpotWord - 0.15, ownerSpotWord + 0.6));
        return (
          <>
            <ServerPlayer
              role="hero"
              nameTag="Noah"
              position={on(PLACE.server, 0, 0, -0.2)}
              rotationY={Math.PI}
              animation="cower"
              face="sad"
              time={t}
            />
            <ServerPlayer
              role="bully"
              nameTag="Alex"
              position={on(PLACE.server, 1.4, 0, 0.6)}
              rotationY={-2.5}
              animation="laugh"
              face="smug"
              time={t}
            />
            <ServerPlayer
              role="owner"
              nameTag="Owner"
              crown
              badge={t >= ownerSpotWord ? "?" : undefined}
              badgePopStart={ownerSpotWord}
              position={on(PLACE.server, -1.9 + ownerStep * 0.9, 0, -1.8 + ownerStep * 0.6)}
              rotationY={0.85}
              animation="walk"
              blendTo="idle"
              blend={1 - ownerStep}
              animDistance={ownerStep * 1.1}
              lookAt={on(PLACE.server, 0, 1.4, -0.2)}
              face="worried"
              time={t}
            />
            <Sign title="COWARD" position={on(PLACE.server, 1.3, 1.1, -1.6)} rotationY={-0.35} />
          </>
        );
      },
    },
    {
      cue: "3.irl",
      ...cam.push({
        on: on(PLACE.irl, 0, 1.25, -0.9),
        dist: 3.6,
        to: 2.35,
        yaw: 18,
        yawTo: 8,
        pitch: 8,
        fov: 38,
        screenOffset: [0, 0.05],
      }),
      zone: "irl",
      look: "overworld-night",
      note: "Hard cutaway to IRL DeskSetup showing Noah quietly hurting in chair under screen glow (Sad Up section).",
      stage: (t) => {
        const lean = ease(ramp(t, 0, 1.0));
        return (
          <>
            <DeskSetup position={on(PLACE.irl, 0, 0, -1.2)} screenText="CANNOT REACH KEYS" screenColor="#ff5f52" lampOn={false} />
            <ServerPlayer
              role="hero"
              position={on(PLACE.irl, 0.05 * lean, 0.05, -0.45)}
              rotationY={Math.PI}
              animation="sit"
              face="sad"
              tears={0.95}
              lookAt={on(PLACE.irl, 0, 1.2, -1.4)}
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "4.rally",
      ...cam.truck({
        on: on(PLACE.server, 0, 1.25, 1.4),
        dist: 5.2,
        yaw: 34,
        pitch: 12,
        by: [0, 0, -3.6],
        fov: 42,
        screenOffset: [0, 0.05],
      }),
      zone: "server",
      note: "Community sprint down the walkway wiring glowing SculkSensor & RedstoneLamps cleanly together (Happy Up 0:02+).",
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
              position={on(PLACE.server, -1.1, 0, 1.5 - sprint * 3.8)}
              rotationY={Math.PI}
              animation="run"
              animDistance={sprint * 3.8}
              torch
              light={1.5}
              time={t}
            />
            <ServerCrowd
              members={[
                { role: "friendA", nameTag: "Mia", position: on(PLACE.server, 1.3, 0, 2.0 - sprint * 3.6), rotationY: Math.PI, animation: "run", animDistance: sprint * 3.6, torch: true },
                { role: "friendB", nameTag: "Leo", position: on(PLACE.server, -2.0, 0, 2.6 - sprint * 3.4), rotationY: Math.PI, animation: "run", animDistance: sprint * 3.4, torch: true },
                { role: "friendC", nameTag: "Zuri", position: on(PLACE.server, 2.1, 0, 2.9 - sprint * 3.5), rotationY: Math.PI, animation: "run", animDistance: sprint * 3.5, torch: true },
              ]}
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "5.cta",
      ...cam.orbit({
        on: on(PLACE.server, 0, 1.45, -3.2),
        dist: 4.3,
        distTo: 3.1,
        yaw: 22,
        yawTo: -16,
        pitch: 7,
        fov: 40,
        screenOffset: [0, 0.06],
      }),
      zone: "server",
      note: "Noah walks joyfully across the glowing RedstoneLamp bridge surrounded by friends, FloatingHeart burst & SubscribeSign.",
      stage: (t) => {
        const stride = ease(ramp(t, 0, 1.4));
        const signPop = pop(t, Math.max(0.2, timing.cues[4].end - timing.cues[4].start - 1.6));
        return (
          <>
            <SculkSensor position={on(PLACE.server, 0, 0, -1.5)} active={1} />
            <RedstoneLamp position={on(PLACE.server, -1.2, 0.45, -3.5)} lit={1} />
            <RedstoneLamp position={on(PLACE.server, 1.2, 0.45, -3.5)} lit={1} />
            <OpeningChest position={on(PLACE.server, -0.9, 0, -4.4)} rotationY={0.4} open={0.85} contents="books" />
            <ServerPlayer
              role="hero"
              nameTag="Noah"
              position={on(PLACE.server, 0, 0, -1.6 - stride * 1.9)}
              rotationY={Math.PI}
              animation="walk"
              animDistance={stride * 1.9}
              face="happy"
              time={t}
            />
            <ServerPlayer
              role="owner"
              nameTag="Owner"
              crown
              position={on(PLACE.server, 1.35, 0, -3.4)}
              rotationY={-1.1}
              animation="cheer"
              face="happy"
              time={t}
            />
            <BadgePop kind="heart" position={on(PLACE.server, 0, 2.75, -3.5)} scale={1.1} t={t} />
            <FloatingHeart position={on(PLACE.server, 0, 1.8, -3.2)} count={8} t={t} />
            <ChatToast text="<Noah> thank you guys" position={on(PLACE.server, -1.4, 2.35, -3.3)} rotationY={0.15} height={0.22 * pop(t, 0.45)} />
            {signPop > 0.02 ? (
              <SubscribeSign position={on(PLACE.server, 0, 2.35, -5.0)} rotationY={0.1} scale={0.75 * signPop} />
            ) : null}
          </>
        );
      },
    },
  ],
});
