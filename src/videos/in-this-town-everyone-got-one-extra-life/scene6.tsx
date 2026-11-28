import {
  Dad,
  GlassJarWing,
  Leo,
  PLACE,
  Player,
  SubscribeSign,
  TotemBurst,
  Vox,
  WaterBucket,
  at,
  cam,
  ease,
  moveBetween,
  ramp,
  storyScene,
  timing,
} from "./kit";

const H = PLACE.home;
const S = PLACE.shop;
const V = PLACE.village;

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "Dad's Secret & Water Bucket Town",
  shots: [
    {
      cue: "7.sunset",
      ...cam.twoShot({ a: at(H, -0.8, 0, 0.8), b: at(H, 1.0, 0, 0.8), dist: 4.8, height: 1.5, fov: 42 }),
      zone: "home",
      look: "overworld-sunset",
      note: "Quiet golden sunset inside home as Dad sets the glass jar with the cracked gold wing onto the table.",
      stage: (t) => (
        <>
          <Dad position={at(H, -0.9, 0, 0.8)} rotationY={1.1} animation="point" face="smile" time={t} />
          <Leo position={at(H, 1.1, 0, 0.8)} rotationY={-1.1} animation="idle" face="uneasy" time={t} />
          <GlassJarWing position={at(H, 0.1, 0.92, 0.6)} />
        </>
      ),
    },
    {
      cue: "7.band",
      ...cam.front({ actor: at(H, -0.9, 0, 0.8), dist: 4.0, fov: 38, screenOffset: [0, 0.06] }),
      zone: "home",
      look: "overworld-sunset",
      note: "Emotional close-up on Dad lifting his bandaged left hand and looking warmly at Leo.",
      stage: (t) => (
        <Dad position={at(H, -0.9, 0, 0.8)} rotationY={0.25} animation="wave" face="smile" time={t} />
      ),
    },
    {
      cue: "7.two",
      ...cam.twoShot({ a: at(H, -0.9, 0, 0.8), b: at(H, 1.0, 0, 0.8), dist: 4.6, height: 1.4, fov: 42 }),
      zone: "home",
      look: "overworld-sunset",
      note: "Leo's eyes widen as Dad reveals he was never born with zero extra lives.",
      stage: (t) => (
        <>
          <Dad position={at(H, -0.9, 0, 0.8)} rotationY={1.2} animation="idle" face="smile" time={t} />
          <Leo position={at(H, 1.0, 0, 0.8)} rotationY={-1.2} animation="panic" face="surprised" time={t} />
          <GlassJarWing position={at(H, 0.1, 0.92, 0.6)} />
        </>
      ),
    },
    {
      cue: "7.slip",
      ...cam.sweep({ on: at(H, 0, 1.1, 0.6), dist: 4.6, fromYaw: -18, toYaw: 18, pitch: 12, fov: 42 }),
      zone: "home",
      look: "overworld-sunset",
      hud: { filter: "sepia", banner: { text: "AGE 2", color: "#ffdd57" } },
      note: "Sepia flashback moment showing Dad holding tiny 2-year-old Leo safe.",
      stage: (t) => (
        <>
          <Dad position={at(H, -0.6, 0, 0.6)} rotationY={0.7} animation="hug" face="surprised" time={t} />
          <Leo scale={0.55} position={at(H, 0.45, 0, 0.6)} rotationY={-0.7} animation="hug" face="sad" time={t} />
        </>
      ),
    },
    {
      cue: "7.held",
      ...cam.front({ actor: at(H, 0, 0, 0.6), dist: 4.4, fov: 40, screenOffset: [0, 0.06] }),
      zone: "home",
      look: "overworld-sunset",
      note: "Golden Totem sparks bloom in memory as Dad and Leo hug warmly.",
      stage: (t) => {
        const p = ramp(t, 0.15, 1.3);
        return (
          <>
            <Dad position={at(H, -0.65, 0, 0.6)} rotationY={1.0} animation="hug" face="smile" time={t} />
            <Leo position={at(H, 0.65, 0, 0.6)} rotationY={-1.0} animation="hug" face="smile" time={t} />
            <TotemBurst position={at(H, 0, 1.0, 0.6)} progress={p} />
          </>
        );
      },
    },
    {
      cue: "7.board",
      ...cam.sweep({ on: at(S, 0, 1.5, -1.6), dist: 6.2, fromYaw: -20, toYaw: 20, pitch: 12, fov: 44 }),
      zone: "shop",
      look: "overworld-day",
      hud: { stamp: { text: "CLOSED", color: "#ff3b30", at: 0.25, angle: -10 } },
      note: "Next morning: Mr. Vex's Totem shop is boarded up with wooden planks and stamped CLOSED.",
      stage: () => (
        <>
          <Vox kind="planks" position={at(S, 0, 1.6, -1.55)} rotation={[0, 0, 0.14]} size={[3.0, 0.24, 0.12]} />
          <Vox kind="planks" position={at(S, 0, 1.1, -1.55)} rotation={[0, 0, -0.14]} size={[3.0, 0.24, 0.12]} />
        </>
      ),
    },
    {
      cue: "7.porch",
      ...cam.streetOverview({
        from: at(V, 0, 0, 12.0),
        to: at(V, 0, 0, 6.2),
        on: at(V, 0, 1.4, 1.5),
        height: 4.5,
        fov: 46,
      }),
      zone: "village",
      look: "overworld-day",
      note: "Callback: every kid in town leaps happily off their porches holding bright blue Water Buckets.",
      stage: (t) => {
        const hop = Math.abs(Math.sin(t * 4.5)) * 1.4;
        return (
          <>
            {[-3.2, -1.6, 0, 1.6, 3.2].map((kx, i) => (
              <Player
                key={i}
                who={[1, 3, 4, 5, 6][i % 5]}
                scale={0.82}
                position={at(V, kx, hop * (i % 2 === 0 ? 1 : 0.75), 1.5 + (i % 2) * 1.2)}
                rotationY={0}
                animation="cheer"
                face="grin"
                time={t + i * 0.18}
              >
                <WaterBucket position={[0, -0.04, 0.24]} scale={1.0} />
              </Player>
            ))}
          </>
        );
      },
    },
    {
      cue: "7.trust",
      ...cam.twoShot({ a: at(V, -0.9, 0, 3.2), b: at(V, 1.0, 0, 3.2), dist: 5.0, height: 1.5, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "Leo and Dad walk forward together grinning, Leo holding up his iron Water Bucket.",
      stage: (t) => {
        const w1 = moveBetween(at(V, -0.9, 0, 1.8), at(V, -0.9, 0, 3.3), t, 0, 1.1);
        const w2 = moveBetween(at(V, 1.0, 0, 1.8), at(V, 1.0, 0, 3.3), t, 0, 1.1);
        return (
          <>
            <Leo
              position={w1.position}
              rotationY={0}
              animation={w1.moving ? "walk" : "cheer"}
              animDistance={w1.animDistance}
              face="grin"
              time={t}
            >
              <WaterBucket position={[0, -0.04, 0.24]} scale={1.05} />
            </Leo>
            <Dad
              position={w2.position}
              rotationY={0}
              animation={w2.moving ? "walk" : "wave"}
              animDistance={w2.animDistance}
              face="grin"
              time={t + 0.15}
            />
          </>
        );
      },
    },
    {
      cue: "7.sub",
      ...cam.front({ actor: at(V, 0, 0, 3.4), dist: 5.2, fov: 42, screenOffset: [0, 0.08] }),
      zone: "village",
      look: "overworld-day",
      hud: { subscribe: true },
      note: "Story-locked CTA: Leo and Dad wave beside a SubscribeSign as the Subscribed pill pops.",
      stage: (t) => {
        const lift = ease(ramp(t, 0, 0.45));
        return (
          <>
            <SubscribeSign position={at(V, 0, 3.0 + lift * 0.25, 2.1)} />
            <Leo position={at(V, -0.95, 0, 3.4)} rotationY={0.1} animation="wave" face="grin" time={t}>
              <WaterBucket position={[0, -0.04, 0.24]} scale={1.05} />
            </Leo>
            <Dad position={at(V, 0.95, 0, 3.4)} rotationY={-0.1} animation="wave" face="grin" time={t + 0.2} />
          </>
        );
      },
    },
  ],
});
