import { cam, storyScene } from "../../engine";
import { Cow, Fill, Lantern, Mailboxes, NORTH, Rain, STAGE_Z, StageGone, StageSet, timing, tw } from "./kit";

/** 05 — They take the stage away. In the morning nobody checks the mail. */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "No more votes",
  shots: [
    {
      cue: "5.stage",
      ...cam.push({ on: [0, 2.6, STAGE_Z + 0.5], dist: 8.2, to: 8.8, yaw: 4, pitch: -2, fov: 50 }),
      zone: "town",
      look: "overworld-night",
      note: "Night, the end of the street. The stage comes apart upward, piece by piece, in a white light: the curtain, the stands, the VOTE sign, lifted into the dark by nobody. Her back, small, in front of it.",
      stage: (t, { dur }) => (
        <>
          <StageSet away={tw(t, 0.2, dur + 0.4) * 0.8} t={t} lit />
          <Cow position={[0.3, 0, STAGE_Z + 4.6]} rotationY={NORTH} t={t} nod={-0.45} />
          <Lantern position={[-2.2, 0, STAGE_Z + 4.4]} />
          <Fill at={[0, 3, STAGE_Z + 3]} power={28} reach={12} color="#dfe6ff" />
        </>
      ),
    },
    {
      cue: "5.no",
      ...cam.push({ on: [0, 1.2, STAGE_Z + 1.2], dist: 4.0, to: 3.5, yaw: -6, pitch: 3, fov: 46 }),
      zone: "town",
      look: "overworld-night",
      note: "What is left: four stumps, bare earth, and a board on a stick with one word painted on it in red. CLOSED. A lantern, and nothing else.",
      stage: () => (
        <>
          <StageGone />
          <Lantern position={[1.7, 0, STAGE_Z + 1.9]} />
          <Fill at={[-0.5, 2, STAGE_Z + 3.5]} power={24} reach={9} />
        </>
      ),
    },
    {
      cue: "5.forgot",
      ...cam.push({ on: [0.1, 1.05, STAGE_Z + 4.4], dist: 3.3, to: 2.9, yaw: 192, pitch: 2, fov: 46 }),
      zone: "town",
      look: "overworld-night",
      note: "Her face in the lantern light, looking at where it was. Ears down. Behind her the street, every window lit and nobody outside. The flower on her head has shut.",
      stage: (t) => (
        <>
          <StageGone />
          <Mailboxes />
          <Cow position={[0.1, 0, STAGE_Z + 5.4]} rotationY={NORTH} t={t} sad={1} />
          <Lantern position={[-1.5, 0, STAGE_Z + 4.6]} />
          <Fill at={[0.6, 1.6, STAGE_Z + 2.6]} power={18} reach={8} />
        </>
      ),
    },
    {
      cue: "5.dark",
      ...cam.push({ on: [0, 1.0, -3.6], dist: 12.5, to: 12.0, yaw: 0, pitch: 20, fov: 46 }),
      zone: "town",
      look: "overworld-storm",
      note: "The same view of the street as the morning drill, and it is empty. Grey, raining, every door shut, eight mailboxes and nobody at them. For the first time.",
      stage: (t) => (
        <>
          <Mailboxes />
          <StageGone />
          <Rain center={[0, 0, 0]} t={t} area={[12, 24]} count={220} />
        </>
      ),
    },
  ],
});
