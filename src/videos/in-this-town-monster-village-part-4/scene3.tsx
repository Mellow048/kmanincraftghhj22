import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AimSword, BUSH, Bubble, Bush, CLASH, Dad, EAST, Fill, Flat, Folk, HOLE, Hero, Hiss, IronGolem, IronHelmet, Key, LOCK, ME, Mum, NIGHT4, NORTH, OUTDOOR, Postman, Puffs,
  Raider, Ravager, TopCard, VGuard, WEST, Web, Z, dur, ease, f, faceOf, manFace, o, ramp, timing,
} from "./kit";
import type { Kind } from "./kit";
import { DAD_BUSH, GUARD_DOWN } from "./scene1";
import { Battle, G, T2, Yard, bump, clamp, up, w } from "./shared";

/** The golem and the ravager, still at it in the middle of the yard behind everything else. */
const Duel: React.FC<{ t: number }> = ({ t }) => (
  <>
    <IronGolem position={[CLASH[0] - 2 + Math.sin(t * 1.4) * 0.4, 0, CLASH[2] - 4.5]} rotationY={EAST} scale={G} armR={-1.5 - bump(t % 1.6, 0.2, 0.6)} armL={-1.5} walk={t} />
    <Ravager position={[CLASH[0] + 2.6 + Math.sin(t * 1.4) * 0.5, 0, CLASH[2] - 4.5]} rotationY={WEST} walk={t * 2} jaw={0.5 + 0.5 * Math.sin(t * 5)} scale={1.35} />
  </>
);
/** Everybody who came through the hole, in the order he names them: [who, x behind the front, z]. */
const LINE: Array<[Kind | "mum" | "dad" | "hiss", number, number]> = [
  ["mum", 0, -3.4], ["dad", 0.2, -2.2], ["hiss", 0, -1.1], ["zombie", 0.3, 0.1], ["zombie", 0.1, 1.1], ["skeleton", 0.3, 2.3], ["skeleton", 0, 3.3], ["spider", 0.4, 4.9], ["spider", 0.2, 6.9],
  ["zombie", 2.2, -2.8], ["creeper", 2.4, -0.6], ["enderman", 2.6, 1.6], ["skeleton", 2.3, 4.0], ["slime", 2.5, 5.8], ["zombie", 4.4, -1.6], ["spider", 4.8, 1.0], ["creeper", 4.5, 3.2],
];
const Friends: React.FC<{ t: number; x: number; z0?: number }> = ({ t, x, z0 = HOLE[2] + 1.6 }) => (
  <>
    {LINE.map(([who, back, z], i) => {
      const p: Vec3 = [x + back, 0, z0 + z * (who === "mum" || who === "dad" || who === "hiss" || back === 0 || i < 9 ? 1 : 1)];
      const walk = t * 1.6 + i;
      if (who === "mum") return <Mum key={i} position={p} rotationY={WEST} walk={walk} mood="angry" />;
      if (who === "dad") return <Dad key={i} position={p} rotationY={WEST} walk={walk} mood="angry" />;
      if (who === "hiss") return <Hiss key={i} position={p} rotationY={WEST} walk={walk} mood="angry" />;
      return <Folk key={i} kind={who} n={i} position={p} rotationY={WEST} walk={walk} mood="angry" />;
    })}
  </>
);
/** A sword somebody has bent: two halves at a right angle. */
const BentSword: React.FC<{ position: Vec3; k: number }> = ({ position, k }) => (
  <group position={position}>
    <Block position={[0, 0, 0]} size={[0.3, 0.07, 0.07]} color="#5c3f24" />
    <Block position={[0, 0.3, 0]} size={[0.08, 0.6, 0.04]} color="#dfe6ee" emissive="#8fa0b4" emissiveIntensity={0.3} />
    <group position={[0, 0.6, 0]} rotation={[0, 0, -1.9 * k]}>
      <Block position={[0, 0.25, 0]} size={[0.08, 0.5, 0.04]} color="#dfe6ee" emissive="#8fa0b4" emissiveIntensity={0.3} />
    </group>
  </group>
);

/** THE KEY, THE JOKE, AND THE FIGHT. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Friends",
  shots: [
    {
      cue: "6.pop",
      ...cam.push({ on: f(-4.7, 1.7, 1.3), dist: 5.4, to: 4.6, yaw: 52, pitch: 4 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "The boy's cage from the corner. Pop: purple sparks, and an enderman three metres tall in a yellow scarf is standing at the bars, bent over, where nobody was. The boy jumps back.",
      stage: (t) => {
        const p = w("6.pop", "pop", 0.5);
        const k = ease(ramp(t, p, p + 0.12));
        return (
          <>
            <Yard t={t} smoke hero="stand" heroLook={up(T2, 2.6)} heroFace={t > p ? "wow" : "uneasy"} />
            <Duel t={t} />
            {t > p ? <Postman position={T2} rotationY={NORTH} scale={0.3 + 0.7 * k} nod={0.5} shake={0.3} /> : null}
            {t > p - 0.05 && t < p + 1.2 ? <Puffs position={up(T2, 1.4)} color="#b060ff" count={12} rise={1.6} spread={0.9} size={0.2} /> : null}
            <Fill on={up(ME, 0.9)} yaw={52} power={6} />
            <Fill on={up(T2, 2.6)} yaw={52} power={8} d={2.5} />
          </>
        );
      },
    },
    {
      cue: "6.key",
      ...cam.push({ on: LOCK, dist: 1.9, to: 1.5, yaw: 44, pitch: 12 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "The lock on the cage door, very close: a gold key in the end of a long black arm, tapping all round the keyhole and missing it. The key will not hold still.",
      stage: (t) => {
        const sh = Math.sin(t * 31) * 0.035 + Math.sin(t * 17) * 0.025;
        return (
          <>
            <Yard t={t} smoke hero="stand" heroLook={LOCK} />
            <Postman position={T2} rotationY={NORTH} nod={0.7} shake={1} carry={1} />
            <Key position={[LOCK[0] + 0.1 + sh, LOCK[1] + Math.cos(t * 23) * 0.03, LOCK[2] + 0.22 + 0.04 * Math.sin(t * 9)]} rotation={[0, Math.PI, sh * 4]} scale={0.9} />
            <Block position={[LOCK[0] + 0.1, LOCK[1] + 0.02, LOCK[2] + 0.62]} size={[0.07, 0.07, 0.6]} color="#0c0c10" />
            <pointLight position={[LOCK[0] + 0.8, LOCK[1] + 0.4, LOCK[2] + 1]} color="#fff0d0" intensity={4} distance={4} decay={2} />
          </>
        );
      },
    },
    {
      cue: "6.where",
      ...cam.push({ on: f(-5, 1.05, 0.45), dist: 2.6, to: 2.3, yaw: -16, pitch: 2 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "The boy through the bars, close, looking up and to one side at the teacher, one eyebrow up, a bubble: WHERE?",
      stage: (t) => (
        <>
          <Yard t={t} smoke hero="none" />
          <Hero position={f(-5, 0.08, 0.45)} animation="talk" face="uneasy" lookAt={up(T2, 2.6)} />
          <Bubble text="WHERE?" position={f(-5.5, 1.95, 0.9)} rotationY={-0.28} scale={0.42} />
          <Fill on={f(-5, 1.1, 0.45)} yaw={-16} power={7} />
        </>
      ),
    },
    {
      cue: "6.ask",
      ...cam.push({ on: up(T2, 2.55), dist: 3.2, to: 2.9, yaw: 196, pitch: -22 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "From inside the cage, looking up at the enderman's face against the stars. His purple eyes slide away to one side. DO NOT ASK.",
      stage: (t) => (
        <>
          <Yard t={t} smoke hero="none" />
          <Postman position={T2} rotationY={NORTH} turn={0.7 * ease(ramp(t, 0.1, 0.5))} nod={0.2} shake={0.4} />
          <Bubble text="DO NOT ASK" position={[T2[0] - 0.2, 3.5, T2[2] - 0.6]} rotationY={Math.PI + 0.25} scale={0.42} tail={1} />
          <Fill on={up(T2, 2.6)} yaw={196} power={8} d={2.2} />
        </>
      ),
    },
    {
      cue: "6.earlier",
      ...cam.push({ on: o(1.7, 1.6, 2.8), dist: 11, to: 10.4, yaw: 22, pitch: 11 }),
      zone: Z.out,
      look: NIGHT4,
      note: "THE JOKE. No voice, a silly march. White words at the top: 4 MINUTES EARLIER. Outside the wall, three guards lie in a neat row behind the bush with their feet sticking out, and dad the skeleton stands over them dusting his hands. The enderman walks away from them to the castle door, in step with the music, with a gold key held up in front of him.",
      stage: (t) => {
        const k = ramp(t, 0.2, dur("6.earlier") - 0.3);
        const tp: Vec3 = [o(2.2, 0, 4.4)[0] + (OUTDOOR[0] - o(2.2, 0, 4.4)[0]) * k, Math.abs(Math.sin(t * 6.3)) * 0.12, o(0, 0, 4.4)[2] + (OUTDOOR[2] + 0.9 - o(0, 0, 4.4)[2]) * k];
        return (
          <>
            <Bush position={BUSH} />
            {[0, 1, 2].map((i) => (
              <Flat key={i} position={[GUARD_DOWN[0] + 0.9 + i * 0.75, 0, GUARD_DOWN[2] + 1.5]} rotationY={0}>
                <Raider who={[2, 1, 3][i]} sword={false} animation="idle" face="dizzy" blink={false} />
              </Flat>
            ))}
            <Dad position={[DAD_BUSH[0] - 1.5, 0, DAD_BUSH[2] + 0.3]} rotationY={0.5} wave={t * 5} lookAt={up(tp, 2.5)} mood="happy" />
            <Postman position={tp} rotationY={NORTH - 0.5 * (1 - k)} walk={t * 2} carry={1} />
            <Key position={[tp[0] + 0.3, tp[1] + 2.0, tp[2] - 0.55]} rotation={[-1.2, 0, 0]} scale={2.2} />
            <TopCard text="4 MINUTES EARLIER" position={o(1.7, 4.55, 2.8)} yaw={(22 * Math.PI) / 180} height={0.4} width={3.3} />
            <pointLight position={o(2, 3, 6)} color="#e6ecff" intensity={40} distance={12} decay={2} />
          </>
        );
      },
    },
    {
      cue: "7.hole",
      ...cam.push({ on: [HOLE[0] - 3, 1.7, HOLE[2]], dist: 10, to: 7, yaw: -88, pitch: 5 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "The hole in the wall again, and the smoke. Out of it, walking at us in a line as wide as the hole: mum with her bow, dad, Hiss, and a whole village of monsters behind them.",
      stage: (t) => (
        <>
          <Yard t={t} smoke hero="none" />
          <Friends t={t} x={HOLE[0] + 1.5 - t * 1.4} z0={HOLE[2] + 1.1} />
          <pointLight position={[HOLE[0] - 5, 3, HOLE[2]]} color="#e6ecff" intensity={80} distance={16} decay={2} />
        </>
      ),
    },
    {
      cue: "7.all",
      ...cam.push({ on: f(-5.9, 1.35, 6.5), onTo: f(4.4, 1.0, 6.5), dist: 3.6, to: 3.6, yaw: 0, pitch: 2 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "Close, sliding down the front row as he names them: mum's face, dad's skull, Hiss, two zombies, two skeletons with bows, two spiders. Every one of them is frowning.",
      stage: (t) => (
        <>
          <Yard t={t} smoke hero="none" />
          <group position={f(-2.5, 0, 6.5)} rotation={[0, Math.PI / 2, 0]}>
            <Friends t={t} x={0} z0={0} />
          </group>
          <pointLight position={f(-5 + t * 2.4, 2, 9.5)} color="#e6ecff" intensity={30} distance={10} decay={2} />
        </>
      ),
    },
    {
      cue: "7.armour",
      ...cam.push({ on: f(-3.2, 1.5, -5.4), dist: 6.6, to: 5.6, yaw: 58, pitch: 6 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "The other side: players and villagers in a row. Iron helmets drop onto their heads one after another down the line, clank, clank, clank. The last man gets three, one on top of the other.",
      stage: (t) => (
        <>
          <Yard t={t} smoke hero="none" />
          {[0, 1, 2, 3, 4].map((i) => {
            const p = f(-3, 0, -8 + i * 1.25);
            const d = clamp((t - 0.5 - i * 0.42) / 0.18);
            const villager = i === 1 || i === 3;
            const head = villager ? 1.95 : 1.74;
            return (
              <group key={i}>
                {villager ? <VGuard position={p} rotationY={EAST} n={i} /> : <Raider who={i + 1} position={p} rotationY={EAST} animation="guard" face="worried" />}
                {t > 0.5 + i * 0.42 - 0.05 ? <IronHelmet position={[p[0], head + 1.5 * (1 - d), p[2]]} rotation={[0, EAST, 0]} scale={villager ? 1.1 : 1} /> : null}
                {i === 4
                  ? [1, 2].map((n) => {
                      const dd = clamp((t - 2.2 - n * 0.3) / 0.18);
                      return t > 2.2 + n * 0.3 - 0.05 ? <IronHelmet key={n} position={[p[0], head + n * 0.3 + 1.5 * (1 - dd), p[2]]} rotation={[0, EAST, 0]} /> : null;
                    })
                  : null}
              </group>
            );
          })}
          <pointLight position={f(0, 2.5, -4)} color="#e6ecff" intensity={45} distance={12} decay={2} />
        </>
      ),
    },
    {
      cue: "7.help",
      ...cam.top({ on: f(3, 0, -5), height: 21, to: 20 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "Straight down, one look: the short row in helmets on the left, the wide dark crowd of monsters on the right, nearly on them.",
      stage: (t) => (
        <>
          <Yard t={t} smoke hero="stand" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <group key={i}>
              <Raider who={i} position={f(-3, 0, -9 + i * 1.25)} rotationY={EAST} animation="guard" />
              <IronHelmet position={f(-3, 1.74, -9 + i * 1.25)} rotation={[0, EAST, 0]} />
            </group>
          ))}
          <Friends t={t} x={f(1.5, 0, 0)[0] - t} z0={f(0, 0, -7)[2]} />
          <pointLight position={f(0, 8, -5)} color="#e6ecff" intensity={160} distance={24} decay={2} />
        </>
      ),
    },
    {
      cue: "7.zombie",
      ...cam.push({ on: f(-0.4, 1.35, 6), dist: 4.0, to: 3.6, yaw: 6, pitch: 3 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "A player and a zombie, face to face. The zombie takes the sword out of his hand like taking a spoon off a baby, bends the blade over double, and gives it back. The player looks at it.",
      stage: (t) => {
        const took = w("7.zombie", "sword", 0.8);
        const bent = ease(ramp(t, w("7.zombie", "bent", 1.4) - 0.25, w("7.zombie", "bent", 1.4) + 0.05));
        const give = ease(ramp(t, dur("7.zombie") - 0.35, dur("7.zombie")));
        const zp = f(0.25, 0, 6);
        const rp = f(-1.05, 0, 6);
        return (
          <>
            <Yard t={t} smoke hero="none" />
            <Folk kind="zombie" n={3} position={zp} rotationY={WEST} arms={1} mood="calm" />
            <Raider who={4} sword={t < took - 0.15} position={rp} rotationY={EAST} animation={t < took ? "guard" : "idle"} face={t < took ? "angry" : "surprised"} lookAt={[zp[0] - 0.6, 1.4, zp[2]]} />
            <IronHelmet position={[rp[0], 1.74, rp[2]]} rotation={[0, EAST, 0]} />
            {t >= took - 0.15 ? <BentSword position={[zp[0] - 0.55 - 0.45 * give, 1.15, zp[2] + 0.12]} k={bent} /> : null}
            <Fill on={manFace(rp)} yaw={6} power={7} d={2.6} />
            <Fill on={up(zp, 1.6)} yaw={6} power={6} d={2.6} />
          </>
        );
      },
    },
    {
      cue: "7.skel",
      ...cam.push({ on: f(3.9, 1.75, 7), dist: 5.4, to: 4.8, yaw: -58, pitch: 3 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "A player wearing two helmets, and a skeleton with a bow a few steps off. Twang: the top helmet spins off. Twang: the one under it. The player feels the top of his bare head.",
      stage: (t) => {
        const a = w("7.skel", "off", 1.2);
        const b = w("7.skel", "under", 2.2);
        const rp = f(4.4, 0, 7);
        const fly = (at: number, y: number) => {
          const k = t - at;
          return k < 0 ? <IronHelmet position={[rp[0], y, rp[2]]} rotation={[0, WEST, 0]} /> : k < 1.2 ? <IronHelmet position={[rp[0] + k * 4, y + k * 3 - 4 * k * k, rp[2] - k]} rotation={[k * 9, WEST, k * 7]} /> : null;
        };
        return (
          <>
            <Yard t={t} smoke hero="none" />
            <Folk kind="skeleton" n={5} position={f(2.2, 0, 7)} rotationY={EAST} mood="calm" />
            {[a, b].map((at, i) =>
              t > at - 0.12 && t < at + 0.02 ? <Block key={i} position={[f(2.2, 0, 0)[0] + 0.5 + ((t - at + 0.12) / 0.12) * 2, i ? 1.76 : 2.06, rp[2]]} size={[0.5, 0.03, 0.03]} color="#e8e6dc" castShadow={false} /> : null,
            )}
            <Raider who={2} sword={false} position={rp} rotationY={WEST} animation={t > b + 0.1 ? "reachUp" : "scared"} face={t > b ? "surprised" : "worried"} />
            {fly(b, 1.74)}
            {fly(a, 2.04)}
            <Fill on={manFace(rp)} yaw={-58} power={7} d={2.6} />
          </>
        );
      },
    },
    {
      cue: "7.spider",
      ...cam.orbit({ on: f(-6, 0.9, 4.6), dist: 6.2, yaw: -30, yawTo: 40, pitch: 38 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "From above, swinging round: three players back to back, and a spider running round and round them. White web goes on in bands from their knees to their chins until only three heads stick out of a white parcel.",
      stage: (t) => {
        const mid = f(-6, 0, 4.6);
        const a = t * 7;
        return (
          <>
            <Yard t={t} smoke hero="none" door={0} />
            {[0, 1, 2].map((i) => (
              <Raider key={i} who={i + 1} sword={false} position={[mid[0] + Math.sin(i * 2.09) * 0.36, 0, mid[2] + Math.cos(i * 2.09) * 0.36]} rotationY={i * 2.09} animation="scared" face="scared" />
            ))}
            <Web position={mid} k={clamp(t / (dur("7.spider") - 0.3))} />
            <Folk kind="spider" n={2} position={[mid[0] + Math.sin(a) * 1.9, 0, mid[2] + Math.cos(a) * 1.9]} rotationY={a + Math.PI / 2} walk={t * 6} />
            <pointLight position={up(mid, 5)} color="#e6ecff" intensity={70} distance={12} decay={2} />
          </>
        );
      },
    },
    {
      cue: "7.mum",
      ...cam.push({ on: f(8.8, 1.5, 5.6), onTo: f(3.5, 1.5, 5.6), dist: 4.6, to: 4.2, yaw: -68, pitch: 4 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "Mum, walking towards us through the middle of the fight with her arms down, turning her head left and right, looking into every corner. The camera backs away in front of her. Players with swords step out of her way and look at their feet.",
      stage: (t) => {
        const x = f(8.8, 0, 0)[0] - (5.3 * t) / dur("7.mum");
        return (
          <>
            <Yard t={t} smoke hero="none" />
            <Duel t={t} />
            <Battle t={t} />
            <Mum position={[x, 0, f(0, 0, 5.6)[2]]} rotationY={WEST} walk={t * 1.5} turn={Math.sin(t * 2.2) * 0.8} mood="sad" />
            {[0, 1, 2, 3].map((i) => {
              const px = f(6.9 - i * 1.5, 0, 0)[0];
              const side = i % 2 ? 1 : -1;
              const away = ease(ramp(x - px, 2.6, 1.2));
              return <Raider key={i} who={i + 2} position={[px, 0, f(0, 0, 5.6)[2] + side * (0.5 + 1.2 * away)]} rotationY={side > 0 ? NORTH : 0} animation="idle" face="worried" headPitch={0.5 * away} />;
            })}
            <Fill on={[x, 1.6, f(0, 0, 5.6)[2]]} yaw={-68} power={8} d={2.6} />
          </>
        );
      },
    },
    {
      cue: "7.hiss",
      ...cam.push({ on: f(1.2, 1.0, 6.4), dist: 11, to: 10, yaw: 6, pitch: 24 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "From above and to one side: a small green creeper walks, not fast, at four big players with swords. They look at him, look at each other, drop the swords and run off the left of the picture with their arms in the air.",
      stage: (t) => {
        const go = w("7.hiss", "ran", 1.8) - 0.5;
        const run = Math.max(0, t - go);
        return (
          <>
            <Yard t={t} smoke hero="none" />
            <Hiss position={f(4.4 - t * 1.1, 0, 6.4)} rotationY={WEST} walk={t * 1.6} mood="happy" />
            {[0, 1, 2, 3].map((i) => (
              <group key={i}>
                <Raider who={i} sword={run <= 0} position={f(0.4 - (i % 2) * 0.9 - run * (5 + i * 0.6), 0, 5.2 + i * 0.8)} rotationY={run > 0 ? WEST : EAST} animation={run > 0 ? "panic" : "guard"} face={run > 0 ? "scared" : "worried"} />
                {run > 0 ? <AimSword position={f(0.8 - (i % 2) * 0.9, 0.06, 5.2 + i * 0.8)} yaw={i} pitch={0} /> : null}
              </group>
            ))}
            <pointLight position={f(1, 5, 8)} color="#e6ecff" intensity={80} distance={14} decay={2} />
          </>
        );
      },
    },
  ],
});
void faceOf;
