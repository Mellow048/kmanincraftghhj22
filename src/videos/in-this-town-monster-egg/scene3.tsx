import type React from "react";
import { cam, lerp, storyScene, stride } from "../../engine";
import { Dragon, Fire, Golem, Phoenix, RankSign } from "../../../Topics/InThisTown/creatures";
import {
  Adult,
  Bread,
  EAST,
  Friend,
  Hero,
  Kid,
  NORTH,
  PLACE,
  Sister,
  WEST,
  ahead,
  dragonMouth,
  timing,
} from "./kit";

/** Where the best friend's red dragon stands in the tour. */
const FRIEND_DRAGON: [number, number, number] = [-3, 0, 1.6];

/** The dragon that lights the bakery oven. It is in three scenes, so it lives here. */
export const OvenDragon: React.FC<{ fire?: number; headYaw?: number; bow?: number }> = ({ fire = 1, headYaw = 0, bow = 0 }) => {
  const at: [number, number, number] = [3.1, 0, 0.0];
  return (
    <>
      <Dragon position={at} rotationY={NORTH} scale={0.5} color="#e8792a" belly="#f6d38a" mouth={fire} fold={1} headYaw={headYaw} bow={bow} rank="52,000" />
      <Fire from={dragonMouth(at, NORTH, 0.5)} to={PLACE.oven} power={fire} width={0.16} count={18} />
    </>
  );
};

/** THE TOUR. One thing named, one picture. Then the two monsters that matter. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The tour",
  shots: [
    {
      cue: "3.town",
      ...cam.push({ on: [4, 1.2, 0.6], dist: 27, to: 21, yaw: -64, pitch: 21, fov: 50 }),
      zone: "town",
      look: "overworld-day",
      note: "The one wide of act one: the whole street from above, with a monster doing a job in every part of it.",
      stage: (t, { p }) => (
        <>
          <OvenDragon />
          <Adult who={0} position={[4.2, 0, -1.0]} rotationY={-0.6} animation="talk" />
          <Golem position={[2 - t * 1.2, 0, 1.6]} rotationY={WEST} walk={t * 1.2} carry={1} />
          <Dragon position={[lerp(13, 5, p), 5.2, 2.6]} rotationY={WEST} scale={1.1} color="#3f7fd8" belly="#cfe0ff" fly />
          <Phoenix position={[lerp(-5, 2, p), 4, -0.8]} rotationY={EAST} scale={0.9} letter />
          <Dragon position={[8.4, 0, 0.2]} rotationY={-0.9} scale={0.8} rank="250,000" />
          <Kid who={1} {...stride([10, 0, 2.6], [7.6, 0, 2.2], p)} animation="run" face="smile" />
          <Adult who={1} position={[-2.6, 0, 2.6]} rotationY={0.8} animation="wave" face="smile" />
          <Adult who={3} position={[12.5, 0, -0.4]} rotationY={-1.2} animation="idle" />
        </>
      ),
    },
    {
      cue: "3.bakery",
      ...cam.push({ on: [3.35, 0.9, -1.1], dist: 4.3, to: 3.4, yaw: 6, pitch: 27 }),
      zone: "town",
      look: "overworld-day",
      note: "The word is 'bakery': from above the little dragon's back as it breathes fire into the oven, the baker beside it with a loaf.",
      stage: () => (
        <>
          <OvenDragon />
          <Adult who={0} position={[3.95, 0, -1.2]} rotationY={-0.5} animation="reach" face="smile">
            <Bread position={[0, -0.06, 0.02]} rotationY={Math.PI / 2} scale={0.8} />
          </Adult>
        </>
      ),
    },
    {
      cue: "3.mail",
      ...cam.push({ on: [-9.5, 2.55, -1.7], dist: 3.7, to: 2.9, yaw: 4, pitch: -9 }),
      zone: "town",
      look: "overworld-day",
      note: "The word is 'mail': a phoenix flies straight at us with a letter in its claws, under the MAIL sign it has just left.",
      stage: (t, { p }) => (
        <Phoenix position={[-9.5, lerp(1.9, 1.5, p), lerp(-2.4, -1.2, p)]} rotationY={0} scale={0.7} letter />
      ),
    },
    {
      cue: "3.golem",
      ...cam.truck({ on: [-10.5, 2.0, 1.2], dist: 5.6, yaw: -72, pitch: -7, by: [-2.4, 0, 0], fov: 42 }),
      zone: "town",
      look: "overworld-day",
      note: "The word is 'golems': walk backwards in front of one as it carries a kid, fast asleep, towards school.",
      stage: (t) => (
        <>
          <Golem position={[-10 - t * 1.3, 0, 1.2]} rotationY={WEST} walk={t * 1.3} carry={1}>
            <Kid who={0} position={[0, -0.18, 0.05]} rotationY={Math.PI / 2} animation="sleep" face="sleepy" />
          </Golem>
          <Kid who={2} {...stride([-7.6, 0, 2.3], [-10.4, 0, 2.3], t / 2.33)} animation="walk" face="sleepy" />
        </>
      ),
    },
    {
      cue: "3.rank",
      ...cam.push({ on: [8.4, 0.72, 1.9], dist: 3.3, to: 1.5, yaw: 0, pitch: 2 }),
      zone: "town",
      look: "overworld-day",
      note: "The word is 'sign': push from a whole dragon down to the wooden board on its chest until the number fills the frame.",
      stage: () => <Dragon position={[8.4, 0, 1.2]} rotationY={0} scale={0.8} fold={0.7} rank="250,000" />,
    },
    {
      cue: "3.loved",
      ...cam.push({ on: [17, 2.0, 5.2], dist: 7.2, to: 6.0, yaw: 180, pitch: 3 }),
      zone: "town",
      look: "overworld-day",
      note: "'The more the town loved you': a top-rank dragon up on the well, seen between the raised arms of kids cheering for it.",
      stage: () => (
        <>
          <Dragon position={[17, 0.9, 6]} rotationY={NORTH} scale={1.0} color="#d8a21e" belly="#fff0b0" fold={0.35} rank="900,000" gold />
          {(
            [
              [16.2, 3.7],
              [17.8, 3.7],
              [16.42, 2.6],
              [17.6, 2.7],
            ] as Array<[number, number]>
          ).map(([x, z], i) => (
            <Kid key={i} who={i} position={[x, 0, z]} rotationY={0} animation="cheer" face="grin" />
          ))}
        </>
      ),
    },
    {
      cue: "3.friend",
      ...cam.push({ on: [-2.72, 1.3, 2.2], dist: 5.0, to: 4.2, yaw: 72, pitch: 4 }),
      zone: "town",
      look: "overworld-day",
      note: "The best friend, riding the red dragon he hatched. Kid on top, dragon's head below: it stacks in a tall frame.",
      stage: () => (
        <>
          <Dragon position={FRIEND_DRAGON} rotationY={0.5} scale={0.95} bow={0.35} fold={0.75} rank="1,000,000" gold />
          <Friend position={ahead(FRIEND_DRAGON, 0.5, 0.1, 0.72)} rotationY={0.5} animation="sit" arms="wave" face="grin" />
        </>
      ),
    },
    {
      cue: "3.million",
      ...cam.push({ on: [-2.61, 0.72, 2.32], dist: 2.9, to: 2.05, yaw: 28.6, pitch: 2, fov: 36 }),
      zone: "town",
      look: "overworld-day",
      note: "'Rank one million': punch in on the gold sign so the number is the whole picture.",
      stage: () => <Dragon position={FRIEND_DRAGON} rotationY={0.5} scale={0.95} bow={0.05} fold={0.75} rank="1,000,000" gold />,
    },
    {
      cue: "3.sister",
      ...cam.push({ on: [-8, 1.5, 2.6], dist: 3.5, to: 2.9, yaw: -8, pitch: -5 }),
      zone: "town",
      look: "overworld-day",
      note: "The sister, and the phoenix that hovers over her shoulder. Same push as the friend, so the two compare.",
      stage: () => (
        <>
          <Sister position={[-8, 0, 2.6]} animation="idle" face="smile" />
          <Phoenix position={[-7.7, 1.75, 2.45]} rotationY={0.1} scale={0.6} rank="10,000" />
        </>
      ),
    },
    {
      cue: "3.thousand",
      ...cam.push({ on: [-7.675, 1.93, 2.7], dist: 1.9, to: 1.3, yaw: 6, pitch: 0, fov: 36 }),
      zone: "town",
      look: "overworld-day",
      note: "'Rank ten thousand': the same punch-in on the phoenix's sign. Two numbers the hero's egg will be measured against.",
      stage: () => <Phoenix position={[-7.7, 1.75, 2.45]} rotationY={0.1} scale={0.6} rank="10,000" />,
    },
    {
      cue: "3.good",
      ...cam.truck({ on: [9, 1.0, 1.2], dist: 2.3, yaw: -90, pitch: -3, by: [-2.7, 0, 0] }),
      zone: "town",
      look: "overworld-day",
      note: "Back to the teller, happy, walking through his town. The last warm picture before the problem.",
      stage: (t, { p }) => (
        <>
          <Hero {...stride([9, 0, 1.2], [6.2, 0, 1.2], p)} animation="walk" arms="wave" face="smile" />
          <Adult who={1} position={[11.6, 0, 2.2]} rotationY={-1.9} animation="wave" face="smile" />
          <Kid who={2} position={[13.2, 0, 0.3]} rotationY={-1.3} animation="wave" face="smile" />
          <Golem position={[17 - t * 0.8, 0, 2.4]} rotationY={WEST} walk={t * 0.8} />
          <RankSign position={[12.4, 0.95, -0.6]} rotationY={-1.2} rank="88,000" scale={0.5} post />
        </>
      ),
    },
  ],
});
