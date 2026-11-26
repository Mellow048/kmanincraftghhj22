import {
  ChatToast,
  Hero,
  Player,
  SnowGolem,
  Snowball,
  Vox,
  Wisps,
  cam,
  ease,
  pop,
  ramp,
  room,
  storyScene,
  timing,
  wordAt,
} from "./kit";

const shakeWord = wordAt("3.chill", "shakes");
const sneezeWord = wordAt("3.sneeze", "sneezes");
const grinWord = wordAt("4.photo", "grin");
const lockWord = wordAt("4.lock", "locks");

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "School Frost, Sneeze Gag & Pumpkin Grin",
  shots: [
    {
      cue: "3.school",
      ...cam.orbit({
        on: [-3.25, 1.15, 0.2],
        dist: 4.6,
        distTo: 3.3,
        yaw: -30,
        yawTo: 22,
        pitch: 9,
        fov: 40,
        screenOffset: [0, 0.08],
      }),
      zone: "town",
      note: "Hero walks nervously past pointing, laughing classmates on open west path while Ice Kid chat alert pops overhead.",
      stage: (t) => {
        const walk = ease(ramp(t, 0, 1.4));
        return (
          <>
            <Hero
              position={[-3.85 + walk * 0.85, 0, 1.35 - walk * 0.35]}
              rotationY={0.45 - walk * 0.25}
              animation={walk < 0.7 ? "walk" : "crouch"}
              animDistance={walk * 1.1}
              face="uneasy"
              time={t}
            />
            <Player who={1} position={[-2.55 - walk * 0.2, 0, -0.15 + walk * 0.15]} rotationY={-0.45} animation="laugh" face="laugh" time={t} />
            <Player who={3} position={[-3.8 + walk * 0.15, 0, -0.4 + walk * 0.2]} rotationY={0.35} animation="point" face="grin" time={t} />
            <ChatToast text="Ice Kid!" sender="Kid" position={[-3.2, 2.08 + walk * 0.15, 0.4]} height={0.13 * pop(t, 0.2)} />
          </>
        );
      },
    },
    {
      cue: "3.chill",
      ...cam.push({
        on: [-3.25, 1.15, 1.0],
        dist: 3.0,
        to: 1.85,
        yaw: 18,
        pitch: 5,
        fov: 38,
        screenOffset: [0, 0.1],
      }),
      impacts: [{ at: shakeWord, amp: 0.02, dur: 0.28 }],
      zone: "town",
      note: "Hero steps back shaking frost off his sleeves as white wisps burst around his shoulders.",
      stage: (t) => {
        const flinch = ease(ramp(t, shakeWord - 0.1, shakeWord + 0.35));
        return (
          <>
            <Hero
              position={[-3.25 - flinch * 0.25, 0, 1.0 + flinch * 0.25]}
              rotationY={0.25 + Math.sin(t * 24) * 0.1}
              animation={flinch > 0.2 ? "panic" : "cower"}
              face="ouch"
              time={t * 1.4}
            />
            <Wisps position={[-3.25, 1.25, 1.05]} t={t} reach={1.3} count={18} color="#eef8ff" />
          </>
        );
      },
    },
    {
      cue: "3.sneeze",
      ...cam.push({
        on: [-0.2, 1.25, 1.4],
        dist: 3.9,
        to: 2.35,
        yaw: -18,
        pitch: 6,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      impacts: [{ at: sneezeWord, amp: 0.032, dur: 0.28 }],
      zone: "town",
      note: "Dad winds backward deeply then violently jerks forward sneezing white puff across square.",
      stage: (t) => {
        const wind = ease(ramp(t, 0, Math.max(0.25, sneezeWord - 0.05)));
        const blast = ease(ramp(t, sneezeWord, sneezeWord + 0.25));
        return (
          <>
            <SnowGolem
              position={[-0.2 - wind * 0.15 + blast * 0.3, blast * 0.08, 1.4]}
              rotationY={0.75 + blast * 0.25}
              pumpkin
              armThrow={0.55 * wind - 1.5 * blast}
            />
            {blast > 0.1 ? <Wisps position={[0.25, 1.45, 1.75]} t={Math.max(0, t - sneezeWord)} reach={1.4} count={20} color="#ffffff" /> : null}
          </>
        );
      },
    },
    {
      cue: "3.ball",
      ...cam.pan({
        from: [0.3, 1.35, 4.6],
        on: [-0.35, 1.2, 1.4],
        onTo: [2.2, 0.95, 1.35],
        fov: 42,
        screenOffset: [0, 0.08],
      }),
      impacts: [{ at: 0.85, amp: 0.02, dur: 0.2 }],
      zone: "town",
      note: "Fast whip-pan follows launched Snowball zipping past neighbor who dives into cover.",
      stage: (t) => {
        const fly = t * 4.8;
        const duck = ease(ramp(t, 0.25, 0.75));
        return (
          <>
            <SnowGolem position={[-0.35, 0, 1.4]} rotationY={Math.PI / 2} pumpkin armThrow={-1.2 + Math.min(0.6, t)} />
            <Snowball position={[0.15 + fly, 1.38 - t * 0.35, 1.4]} scale={1.25} />
            <Player
              who={6}
              position={[1.45 + duck * 0.45, 0, 1.0]}
              rotationY={-0.8}
              animation={duck > 0.3 ? "crouch" : "panic"}
              face="wow"
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "4.dad",
      ...cam.push({
        on: [0, 1.2, -3.1],
        dist: 4.3,
        to: 2.75,
        yaw: -16,
        pitch: 6,
        fov: 40,
        screenOffset: [0, 0.1],
      }),
      zone: "town",
      note: "Dad & Hero walk eagerly together to doorstep photo mark while neighboring villager waves.",
      stage: (t) => {
        const walk = ease(ramp(t, 0, 1.2));
        return (
          <>
            <SnowGolem position={[-0.45 + walk * 0.15, 0, -3.9 + walk * 0.75]} rotationY={0.14} pumpkin walk={walk * 2.2} />
            <Hero
              position={[0.45 - walk * 0.1, 0, -3.6 + walk * 0.6]}
              rotationY={-0.12}
              animation={walk < 0.75 ? "walk" : "wave"}
              animDistance={walk * 0.9}
              face="smile"
              time={t}
            />
            <Player who={2} position={[2.0, 0, -3.2]} rotationY={-0.4} animation="wave" face="grin" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.mask",
      ...cam.orbit({
        on: [0, 1.45, 1.3],
        dist: 3.3,
        distTo: 2.1,
        yaw: -18,
        yawTo: 24,
        pitch: 4,
        fov: 38,
        screenOffset: [0, 0.12],
      }),
      zone: "town",
      note: "Dad turns proudly from side to front showing carved orange pumpkin before patting his mask.",
      stage: (t) => {
        const spin = ease(ramp(t, 0, 1.35));
        return (
          <SnowGolem
            position={[0, 0, 1.3]}
            rotationY={-0.5 + spin * 0.8}
            pumpkin
            armThrow={-0.3 - Math.sin(t * 5) * 0.45}
          />
        );
      },
    },
    {
      cue: "4.photo",
      ...cam.orbit({
        on: [0.1, 1.35, 1.35],
        dist: 3.3,
        distTo: 2.2,
        yaw: -22,
        yawTo: 18,
        pitch: 5,
        fov: 38,
        screenOffset: [0, 0.12],
      }),
      zone: "town",
      note: "On grin, Dad pops pumpkin mask off revealing goofy snowman grin while Hero bursts into jumping laugh.",
      stage: (t) => {
        const maskOff = t >= grinWord;
        return (
          <>
            <SnowGolem position={[-0.25, 0, 1.3]} rotationY={0.18} pumpkin={!maskOff} armThrow={maskOff ? -0.9 : 0} />
            <Hero
              position={[0.45, 0, 1.55]}
              rotationY={-0.25}
              animation={maskOff ? "jump" : "laugh"}
              face="laugh"
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "4.mum",
      ...cam.push({
        on: room(-0.1, 1.05, -0.7),
        dist: 4.0,
        to: 2.55,
        yaw: 20,
        pitch: 8,
        fov: 40,
        screenOffset: [0, 0.1],
      }),
      zone: "room",
      note: "Hero runs forward inside plank house tugging pleadingly while Mum backs away slowly.",
      stage: (t) => {
        const run = ease(ramp(t, 0, 1.1));
        return (
          <>
            <SnowGolem position={room(0.35 + run * 0.25, 0, -1.05 - run * 0.25)} rotationY={-0.55} pumpkin armThrow={0.45 * Math.sin(t * 4)} walk={run * 0.35} />
            <Hero
              position={room(-0.95 + run * 0.55, 0, -0.25 - run * 0.35)}
              rotationY={0.75}
              animation={run < 0.6 ? "walk" : "reach"}
              animDistance={run * 0.85}
              face="frown"
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "4.lock",
      ...cam.push({
        on: room(0.35, 1.1, -1.05),
        dist: 2.95,
        to: 1.75,
        yaw: -14,
        pitch: 10,
        fov: 38,
        screenOffset: [0, 0.1],
      }),
      impacts: [{ at: lockWord, amp: 0.024, dur: 0.22 }],
      zone: "room",
      note: "Mum slams the dark flint chest shut with her arms and shakes her pumpkin head firmly NO.",
      stage: (t) => {
        const shut = ease(ramp(t, Math.max(0.1, lockWord - 0.25), lockWord + 0.12));
        return (
          <>
            <Vox kind="darkPlanks" position={room(-0.15, 0.28, -1.1)} size={[0.55, 0.52, 0.45]} />
            <group position={room(-0.15, 0.56 + (1 - shut) * 0.16, -1.1)} rotation={[-(1 - shut) * 0.85, 0, 0]}>
              <Vox kind="darkPlanks" size={[0.58, 0.14, 0.48]} />
            </group>
            <SnowGolem position={room(0.45, 0, -1.05)} rotationY={-0.45 + Math.sin(t * 9) * 0.28} pumpkin armThrow={-0.85 * (1 - shut)} />
          </>
        );
      },
    },
  ],
});
