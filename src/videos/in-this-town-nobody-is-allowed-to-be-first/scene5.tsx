import {
  Elder,
  FounderCrest,
  PLACE,
  Player,
  Sam,
  SubscribeSign,
  Teller,
  at,
  cam,
  moveBetween,
  storyScene,
  timing,
} from "./kit";

const V = PLACE.village;
const B = PLACE.bridge;

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Sam's Truth & Crossing Together",
  shots: [
    {
      cue: "6.run",
      ...cam.track({ from: at(V, 0, 0, -11.0), to: at(V, 0, 0, -4.5), sideDist: 5.2, lead: 1.0, height: 1.6, fov: 44 }),
      zone: "village",
      look: "overworld-golden",
      note: "Teller sprints back out of the dark oak woods into golden light holding the founder's gold crest.",
      stage: (t) => {
        const w = moveBetween(at(V, 0, 0, -11.0), at(V, 0, 0, -4.5), t, 0, 1.35);
        return (
          <Teller position={w.position} rotationY={w.rotationY} animation="run" animDistance={w.animDistance} face="brave" time={t}>
            <FounderCrest position={[0, 0.02, 0.24]} scale={1.1} />
          </Teller>
        );
      },
    },
    {
      cue: "6.sam",
      ...cam.twoShot({ a: at(V, -0.9, 0, -4.2), b: at(V, 1.0, 0, -4.2), dist: 4.8, height: 1.5, fov: 42 }),
      zone: "village",
      look: "overworld-golden",
      note: "Sam stands waiting anxiously right at the edge of the trees, relieved to see Teller alive.",
      stage: (t) => (
        <>
          <Teller position={at(V, -0.9, 0, -4.2)} rotationY={1.1} animation="idle" face="smile" time={t}>
            <FounderCrest position={[0, 0.02, 0.24]} scale={1.1} />
          </Teller>
          <Sam position={at(V, 1.0, 0, -4.2)} rotationY={-1.1} animation="wave" face="surprised" time={t} />
        </>
      ),
    },
    {
      cue: "6.list",
      ...cam.front({ actor: at(V, 1.0, 0, -4.2), dist: 4.2, fov: 40, screenOffset: [0, 0.06] }),
      zone: "village",
      look: "overworld-golden",
      hud: {
        checklist: {
          title: "WHY SAM WENT SECOND",
          rows: [
            { text: "Standing Behind", at: 0.05, done: true, doneAt: 0.25 },
            { text: "Sitting Second", at: 0.45, done: true, doneAt: 0.65 },
            { text: "Crossing Second", at: 0.85, done: true, doneAt: 1.05 },
          ],
        },
      },
      note: "List payoff: every planted Sam clue clicks into place on screen.",
      stage: (t) => <Sam position={at(V, 1.0, 0, -4.2)} rotationY={0} animation="idle" face="worried" time={t} />,
    },
    {
      cue: "6.scared",
      ...cam.twoShot({ a: at(V, -0.7, 0, -4.2), b: at(V, 0.7, 0, -4.2), dist: 4.6, height: 1.4, fov: 42 }),
      zone: "village",
      look: "overworld-golden",
      note: "Emotional flip: Sam wasn't shy—he was scared too, staying right behind Teller to protect him.",
      stage: (t) => (
        <>
          <Teller position={at(V, -0.65, 0, -4.2)} rotationY={1.0} animation="hug" face="smile" time={t} />
          <Sam position={at(V, 0.65, 0, -4.2)} rotationY={-1.0} animation="hug" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "6.tell",
      ...cam.twoShot({ a: at(V, -1.1, 0, 1.5), b: at(V, 1.1, 0, 1.5), dist: 5.2, height: 1.5, fov: 44 }),
      zone: "village",
      look: "overworld-golden",
      note: "Teller holds up the golden Founder Crest to the Oldest Man and explains the truth to the crowd.",
      stage: (t) => (
        <>
          <Teller position={at(V, -1.1, 0, 1.5)} rotationY={1.1} animation="reachUp" face="brave" time={t}>
            <FounderCrest position={[0, 0.08, 0.24]} scale={1.15} />
          </Teller>
          <Elder position={at(V, 1.1, 0, 1.5)} rotationY={-1.1} animation="idle" time={t} />
          <Player who={1} scale={0.88} position={at(V, -2.5, 0, 0.5)} rotationY={0.5} animation="idle" face="surprised" time={t} />
          <Player who={3} scale={0.88} position={at(V, 2.5, 0, 0.5)} rotationY={-0.5} animation="idle" face="surprised" time={t} />
        </>
      ),
    },
    {
      cue: "6.bridge2",
      ...cam.streetOverview({ from: at(B, 0, 0, 11.5), to: at(B, 0, 0, 6.2), on: at(B, 0, 1.2, 0), height: 4.8, fov: 46 }),
      zone: "bridge",
      look: "overworld-day",
      note: "Bright morning crane over the wooden river bridge as the entire dark-oak village gathers.",
      stage: (t) => (
        <>
          <Teller position={at(B, -4.8, 0.25, -0.5)} rotationY={Math.PI / 2} animation="idle" face="smile" time={t} />
          <Sam position={at(B, -4.8, 0.25, 0.6)} rotationY={Math.PI / 2} animation="idle" face="smile" time={t} />
          <Elder position={at(B, -6.2, 0, 0)} rotationY={Math.PI / 2} animation="idle" time={t} />
          <Player who={1} scale={0.88} position={at(B, -7.2, 0, -1.0)} rotationY={Math.PI / 2} animation="idle" face="smile" time={t} />
          <Player who={4} scale={0.88} position={at(B, -7.2, 0, 1.0)} rotationY={Math.PI / 2} animation="idle" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "6.first",
      ...cam.track({ from: at(B, -4.8, 0.25, -0.5), to: at(B, 0.2, 0.25, -0.5), sideDist: 5.2, lead: 1.0, height: 1.7, fov: 44 }),
      zone: "bridge",
      look: "overworld-day",
      note: "Nobody shoves, nobody hides—Teller proudly takes the very first step onto the sunlit bridge.",
      stage: (t) => {
        const w = moveBetween(at(B, -4.8, 0.25, -0.5), at(B, 0.2, 0.25, -0.5), t, 0, 1.4);
        return <Teller position={w.position} rotationY={w.rotationY} animation="walk" animDistance={w.animDistance} face="grin" time={t} />;
      },
    },
    {
      cue: "6.sam2",
      ...cam.twoShot({ a: at(B, 0.5, 0.25, -0.6), b: at(B, 0.5, 0.25, 0.6), facing: Math.PI / 2, dist: 5.0, height: 1.5, fov: 42 }),
      zone: "bridge",
      look: "overworld-day",
      note: "Sam steps right beside Teller—not second anymore, walking side by side across the water.",
      stage: (t) => {
        const w1 = moveBetween(at(B, -1.2, 0.25, -0.6), at(B, 2.2, 0.25, -0.6), t, 0, 1.4);
        const w2 = moveBetween(at(B, -1.2, 0.25, 0.6), at(B, 2.2, 0.25, 0.6), t, 0, 1.4);
        return (
          <>
            <Teller position={w1.position} rotationY={w1.rotationY} animation="walk" animDistance={w1.animDistance} face="grin" time={t} />
            <Sam position={w2.position} rotationY={w2.rotationY} animation="walk" animDistance={w2.animDistance} face="grin" time={t + 0.15} />
          </>
        );
      },
    },
    {
      cue: "6.crowd",
      ...cam.sweep({ on: at(B, 0.5, 1.2, 0), dist: 7.2, fromYaw: -22, toYaw: 20, pitch: 14, fov: 46 }),
      zone: "bridge",
      look: "overworld-day",
      note: "One by one, the entire village crosses the bridge laughing into the sunshine.",
      stage: (t) => {
        const w1 = moveBetween(at(B, -4.5, 0.25, -0.5), at(B, 1.5, 0.25, -0.5), t, 0, 1.5);
        const w2 = moveBetween(at(B, -5.5, 0.25, 0.6), at(B, 0.5, 0.25, 0.6), t, 0, 1.5);
        return (
          <>
            <Player who={1} scale={0.88} position={w1.position} rotationY={w1.rotationY} animation="walk" animDistance={w1.animDistance} face="grin" time={t} />
            <Player who={3} scale={0.88} position={w2.position} rotationY={w2.rotationY} animation="walk" animDistance={w2.animDistance} face="grin" time={t + 0.2} />
            <Player who={4} scale={0.88} position={at(B, 2.8, 0.25, 0)} rotationY={Math.PI / 2} animation="cheer" face="grin" time={t} />
          </>
        );
      },
    },
    {
      cue: "6.old2",
      ...cam.front({ actor: at(B, 1.4, 0.25, 0), dist: 4.4, fov: 42, screenOffset: [0, 0.06] }),
      zone: "bridge",
      look: "overworld-day",
      note: "Even the silver-haired Oldest Man smiles and walks near the front of the town.",
      stage: (t) => {
        const w = moveBetween(at(B, 0.2, 0.25, 0), at(B, 2.4, 0.25, 0), t, 0, 1.3);
        return <Elder position={w.position} rotationY={w.rotationY} animation="walk" animDistance={w.animDistance} time={t} />;
      },
    },
    {
      cue: "6.free",
      ...cam.twoShot({ a: at(V, -0.9, 0, -1.2), b: at(V, 0.9, 0, -1.2), dist: 5.0, height: 1.5, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "Back at the sunlit doorway arch, Teller and Sam step forward together smiling.",
      stage: (t) => {
        const w1 = moveBetween(at(V, -0.9, 0, -2.2), at(V, -0.9, 0, -0.8), t, 0, 1.1);
        const w2 = moveBetween(at(V, 0.9, 0, -2.2), at(V, 0.9, 0, -0.8), t, 0, 1.1);
        return (
          <>
            <Teller position={w1.position} rotationY={0} animation={w1.moving ? "walk" : "cheer"} animDistance={w1.animDistance} face="grin" time={t} />
            <Sam position={w2.position} rotationY={0} animation={w2.moving ? "walk" : "cheer"} animDistance={w2.animDistance} face="grin" time={t + 0.15} />
          </>
        );
      },
    },
    {
      cue: "6.sub",
      ...cam.front({ actor: at(V, 0, 0, -1.2), dist: 4.8, fov: 44, screenOffset: [0, 0.06] }),
      zone: "village",
      look: "overworld-day",
      hud: { subscribe: true },
      note: "Seamless Frame-0 loop + story-locked CTA: Teller and Sam wave beside SubscribeSign at the doorway.",
      stage: (t) => (
        <>
          <SubscribeSign position={at(V, 0, 3.8, -1.5)} />
          <Teller position={at(V, -0.85, 0, -1.2)} rotationY={0.1} animation="wave" face="grin" time={t} />
          <Sam position={at(V, 0.85, 0, -1.2)} rotationY={-0.1} animation="wave" face="grin" time={t + 0.2} />
        </>
      ),
    },
  ],
});
