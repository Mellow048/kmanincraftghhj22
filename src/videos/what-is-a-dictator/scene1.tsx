import type React from "react";
import { BRIDGE_LEADER, BRIDGE_YOU, HOME, Icon, KID, No, SHARED, STATUE, STATUE_BASE, STATUE_SCALE, STATUE_YOU, STOPS, VoteStone, You, clock, ease, flightScene, mixAngle, pop, ramp, thrown, timing, useNow } from "./kit";
import type { Vec3 } from "../../engine";

/**
 * BEAT 1 — THE QUESTION. One kid, small, at the feet of a stone man four times his size.
 *
 * A scene file holds two things:
 *   ExhibitN   what the beat SHOWS. world.tsx mounts it for the whole film, because a camera that flies away from
 *              a thing still sees it. It is driven by the film's clock: it waits in its first state until its
 *              word is said, and keeps its last state afterwards.
 *   sceneN     where the camera GOES: one stop for each line of narration.md, flown to as the line begins.
 *
 * This exhibit is YOU, for the whole film: at the statue for the question, at the bridge to say what you think of
 * it, and at the vote box at the end. You are moved from one to the next while the camera is somewhere else.
 */

/** When you are where. Moments on the film's clock. */
const AT = {
  /** The camera has left the statue: you are at home from here on. */
  home: clock.at("2.vote") + 1.5,
  anyone: clock.at("2.loud", "anyone"),
  /** Your own vote. */
  throwIt: clock.at("7.you", "how") - 0.14,
  rise: clock.at("7.you", "say") - 0.05,
  subscribe: clock.at("7.sub", "subscribe"),
  or: clock.at("7.sub", "or"),
  here: clock.at("7.sub", "here"),
  still: clock.at("7.sub", "still"),
};

/** Where you stand to vote: behind the corner of the box, so that you face the slot and the lens sees your face. */
export const VOTER: Vec3 = HOME.p(-0.95, 0, -0.42);
/** Which way that is: towards the slot. */
const TO_SLOT = Math.atan2(HOME.slot[0] - VOTER[0], HOME.slot[2] - VOTER[2]);
/** Where you are for the last two lines: the same place, and one hop of joy on 'subscribe'. */
export const lastSpot = (now: number): Vec3 => {
  const k = ramp(now - AT.subscribe, -0.12, 0.2);
  return [VOTER[0], VOTER[1] + Math.sin(k * Math.PI) * 0.16, VOTER[2]];
};
/** The hand your vote leaves from: half an arm towards the slot. */
const HAND: Vec3 = [VOTER[0] + Math.sin(TO_SLOT) * 0.45, VOTER[1] + 1.0, VOTER[2] + Math.cos(TO_SLOT) * 0.45];

export const Exhibit1: React.FC = () => {
  const now = useNow();

  // ---- at the statue: the question
  if (now < AT.home) {
    // The film opens on your back: you are looking up at him. Then you turn round to whoever is watching, and shrug.
    const turned = ease(ramp(now, 0.26, 0.6));
    const shrugged = ease(ramp(now, 0.48, 0.78));
    void [STATUE, STATUE_BASE, STATUE_SCALE];
    return (
      <>
        <You
          position={STATUE_YOU}
          rotationY={mixAngle(Math.PI - 0.3, 0.26, turned)}
          animation="idle"
          blendTo="shrug"
          blend={1 - shrugged}
          face={now > 0.5 ? "uneasy" : "wow"}
          saccade={false}
          gaze={0}
          headPitch={-0.62 * (1 - turned)}
        />
        {/* The question mark is there on the first frame: that frame is the film's poster. */}
        <Icon kind="question" position={[STATUE_YOU[0], STATUE_YOU[1] + 1.92 + Math.sin(now * 5) * 0.03, STATUE_YOU[2]]} rotationY={0.2} height={0.46} color="#ffd24a" outline glow={0.25} scale={1 + 0.25 * Math.max(0, 1 - now / 0.25)} />
      </>
    );
  }

  // ---- at the new bridge: anyone can say so out loud
  if (now < SHARED.tidied) {
    const startled = now - SHARED.planks;
    const said = now - AT.anyone;
    // You are looking at the bridge when the planks go. Then you turn on the leader, who has just walked up, and say it.
    const round = ease(ramp(said, -0.22, 0.02));
    const pointing = ease(ramp(said, -0.1, 0.14));
    const hop = startled > 0 && startled < 0.3 ? Math.sin((startled / 0.3) * Math.PI) * 0.13 : 0;
    return (
      <>
        <You
          position={[BRIDGE_YOU[0], BRIDGE_YOU[1] + hop, BRIDGE_YOU[2]]}
          rotationY={mixAngle(-Math.PI / 2 + 0.4, Math.PI / 2 - 0.42, round)}
          animation="idle"
          blendTo="point"
          blend={1 - pointing}
          face={said > 0 ? "frown" : startled > 0 ? "wow" : "calm"}
          saccade={false}
          gaze={0}
          lookAt={said > 0.1 ? [BRIDGE_LEADER[0], BRIDGE_LEADER[1] + 1.5, BRIDGE_LEADER[2]] : undefined}
        />
        <No position={[BRIDGE_YOU[0] - 0.05, BRIDGE_YOU[1] + 1.56 * KID + 0.66, BRIDGE_YOU[2]]} scale={0.74 * pop(said, 0, 0.2)} tail={1} />
      </>
    );
  }

  // ---- at the vote box: it is how you say no
  const thrownAt = now - AT.throwIt;
  const up = now - AT.rise;
  const sub = now - AT.subscribe;
  const spot = lastSpot(now);
  // You face the slot to vote; on 'subscribe' you turn to whoever is watching.
  const facing = mixAngle(TO_SLOT, -0.1, ease(ramp(sub, -0.2, 0.15)));
  const stone = thrown(now, AT.throwIt, 0.3, HAND, HOME.slot, 0.32);
  // Before it is thrown the stone is in your hand; then it is in the air; then it is in the box.
  const holding = thrownAt < 0;
  const lift = ease(ramp(sub, -0.05, 0.22));
  // The last line: you look at the NO, up at the sign, and then at whoever is watching.
  const toNo = ease(ramp(now - AT.or, 0, 0.25)) * (1 - ease(ramp(now - AT.here, 0, 0.25)));
  const toSign = ease(ramp(now - AT.here, 0.05, 0.3)) * (1 - ease(ramp(now - AT.still, -0.05, 0.2)));
  return (
    <>
      <You
        position={spot}
        rotationY={facing}
        animation={sub > -0.2 ? "idle" : holding ? "reach" : "idle"}
        blendTo={sub > -0.05 ? "lift" : undefined}
        blend={sub > -0.05 ? 1 - lift : undefined}
        face={sub > 0 ? "grin" : up > 0.1 ? "wow" : thrownAt > 0 ? "brave" : "calm"}
        saccade={false}
        gaze={0}
        headYaw={sub > 0 ? 0.7 * toNo : 0}
        headPitch={sub > 0 ? -0.4 * toSign : 0}
        lookAt={sub < -0.2 && up > 0 ? [HOME.slot[0], HOME.slot[1] + 0.7, HOME.slot[2]] : undefined}
      >
        {holding ? <VoteStone position={[0, -0.1, 0.03]} /> : null}
      </You>
      {stone ? <VoteStone position={stone} spin={thrownAt * 9} /> : null}
    </>
  );
};

export const scene1 = flightScene(timing, {
  id: "scene1",
  title: "The question",
  // Scene 1 opens the film: `from` is where the first frame is.
  from: STOPS.open,
  shots: [
    {
      cue: "1.ask",
      to: STOPS.you,
      travel: 0.7,
      note: "The question, asked where it is hardest to answer: the first frame is a stone man four times the size of the kid who stands at his feet, looking up at him. Then in to the kid, who turns round to us and shrugs, with the question over his head.",
    },
  ],
});
