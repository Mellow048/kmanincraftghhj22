import {
  Dad,
  DeskSetup,
  PLACE,
  Son,
  SpeechCard,
  cam,
  on,
  pop,
  storyScene,
  timing,
  wordAt,
} from "./kit";

const sorryWord = wordAt("4.sorry", "sorry");

/**
 * Scene 4 — Dad Feels Terrible ("Ah, Sorry, Son", `Up Sad`):
 *   Heartfelt guilt, teardrops, quiet two-second held breath before Sam speaks!
 */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Ah Sorry Son",
  shots: [
    {
      cue: "4.guilt",
      ...cam.orbit({
        on: on(PLACE.irl, 0, 1.2, -0.25),
        dist: 4.8,
        distTo: 4.2,
        yaw: -18,
        yawTo: 16,
        pitch: 12,
        fov: 43,
        screenOffset: [0, 0.05],
      }),
      zone: "irl",
      note: "Two-shot in dimmed bedroom: Dad slumped guiltily with head down across from Sam.",
      stage: (t) => (
        <>
          <DeskSetup position={on(PLACE.irl, 0, 0, -1.25)} screenText="HOUSE GONE" screenColor="#ff5d4d" clockText="4:19 PM" lampOn={false} />
          <Dad position={on(PLACE.irl, 0.65, 0, -0.1)} rotationY={-0.75} animation="cower" face="crying" tears={0.6} time={t} />
          <Son position={on(PLACE.irl, -0.75, 0, -0.05)} rotationY={0.75} animation="standUp" face="uneasy" time={t} />
        </>
      ),
    },
    {
      cue: "4.scared",
      ...cam.push({
        on: on(PLACE.irl, 0.4, 1.3, -0.1),
        dist: 4.6,
        to: 3.7,
        yaw: -20,
        pitch: 10,
        fov: 42,
        screenOffset: [0, 0.05],
      }),
      zone: "irl",
      note: "Close dramatic push toward Dad nervously bracing himself for Sam's reaction.",
      stage: (t) => (
        <>
          <DeskSetup position={on(PLACE.irl, 0, 0, -1.25)} screenText="HOUSE GONE" screenColor="#ff5d4d" clockText="4:19 PM" lampOn={false} />
          <Dad position={on(PLACE.irl, 0.55, 0, -0.1)} rotationY={-0.6} animation="shrug" face="fear" tears={0.8} time={t} />
          <Son position={on(PLACE.irl, -0.85, 0, 0.05)} rotationY={0.85} animation="lookAround" face="calm" time={t} />
        </>
      ),
    },
    {
      cue: "4.sorry",
      ...cam.push({
        on: on(PLACE.irl, 0.55, 1.32, -0.1),
        dist: 4.4,
        to: 3.55,
        yaw: 14,
        pitch: 9,
        fov: 42,
        screenOffset: [0, 0.04],
      }),
      zone: "irl",
      note: "Dad softly whispers 'Ah, sorry, son' as SpeechCard appears cleanly overhead.",
      stage: (t) => (
        <>
          <DeskSetup position={on(PLACE.irl, 0, 0, -1.25)} screenText="HOUSE GONE" screenColor="#ff5d4d" clockText="4:19 PM" lampOn={false} />
          <Dad position={on(PLACE.irl, 0.55, 0, -0.1)} rotationY={-0.55} animation="cower" face="crying" tears={1} time={t} />
          <SpeechCard text="Ah, sorry, son..." position={on(PLACE.irl, 0.55, 2.55, -0.1)} scale={pop(t, Math.max(0.15, sorryWord - 0.1))} color="#8ce2ff" />
        </>
      ),
    },
    {
      cue: "4.silence",
      ...cam.crane({
        on: on(PLACE.irl, -0.1, 1.25, -0.05),
        dist: 5.0,
        toDist: 4.3,
        fromPitch: 16,
        toPitch: 10,
        yaw: 12,
        fov: 43,
        screenOffset: [0, 0.05],
      }),
      zone: "irl",
      note: "Tense two-second silent pause between Sam and slumped Dad before wholesome turnaround.",
      stage: (t) => (
        <>
          <DeskSetup position={on(PLACE.irl, 0, 0, -1.25)} screenText="HOUSE GONE" screenColor="#ff5d4d" clockText="4:19 PM" lampOn={false} />
          <Dad position={on(PLACE.irl, 0.65, 0, -0.1)} rotationY={-0.75} animation="cower" face="frown" tears={0.9} time={t} />
          <Son position={on(PLACE.irl, -0.75, 0, -0.05)} rotationY={0.75} animation="peek" face="calm" time={t} />
        </>
      ),
    },
  ],
});
