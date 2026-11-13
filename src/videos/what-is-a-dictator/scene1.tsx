import type React from "react";
import { BRIDGE_YOU, HOME, Icon, KID, No, STATUE, STATUE_BASE, STATUE_SCALE, STATUE_YOU, STOPS, VoteStone, You, clock, ease, flightScene, pop, ramp, thrown, timing, useNow } from "./kit";
import type { Vec3 } from "../../engine";

/**
 * BEAT 1 — THE QUESTION. One kid, small, at the foot of a stone man four times his size.
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
  /** The plank falls out of the new bridge, and you say what you think of it. */
  plank: clock.at("2.loud", "job") + 0.1,
  anyone: clock.at("2.loud", "anyone"),
  /** The camera is over the other village: you walk to the vote box. */
  box: clock.at("3.hates") + 1.6,
  /** Your own vote. */
  throwIt: clock.at("7.you", "how") - 0.14,
  rise: clock.at("7.you", "say") - 0.05,
  subscribe: clock.at("7.sub", "subscribe"),
  or: clock.at("7.sub", "or"),
  here: clock.at("7.sub", "here"),
  still: clock.at("7.sub", "still"),
};

/** Where you stand to vote, and where you step back to with the sign: clear of the big NO on the box. */
export const VOTER: Vec3 = HOME.p(-1.05, 0, 0.45);
export const SIGNER: Vec3 = HOME.p(-1.42, 0, 0.8);
/** Where you are for the last two lines: one hop back from the box, on 'subscribe'. */
export const lastSpot = (now: number): Vec3 => {
  const k = ease(ramp(now - AT.subscribe, -0.2, 0.12));
  return [VOTER[0] + (SIGNER[0] - VOTER[0]) * k, VOTER[1] + Math.sin(k * Math.PI) * 0.2, VOTER[2] + (SIGNER[2] - VOTER[2]) * k];
};
/** The hand your vote leaves from. */
const HAND: Vec3 = [VOTER[0] + 0.52, VOTER[1] + 1.05, VOTER[2] + 0.2];

export const Exhibit1: React.FC = () => {
  const now = useNow();

  // ---- at the statue: the question
  if (now < AT.home) {
    const face: Vec3 = [STATUE[0], STATUE[1] + STATUE_BASE + 29 * (1.8 / 32) * STATUE_SCALE, STATUE[2] + 0.4];
    const turned = ease(ramp(now, 0.38, 0.7));
    return (
      <>
        <You
          position={STATUE_YOU}
          rotationY={0.3}
          animation="idle"
          blendTo="shrug"
          blend={1 - turned}
          face={now > 0.45 ? "uneasy" : "wow"}
          saccade={false}
          gaze={0}
          lookAt={now < 0.42 ? face : undefined}
        />
        {/* The question mark is there on the first frame: that frame is the film's poster. */}
        <Icon kind="question" position={[STATUE_YOU[0], STATUE_YOU[1] + 1.92 + Math.sin(now * 5) * 0.03, STATUE_YOU[2]]} rotationY={0.25} height={0.46} color="#ffd24a" outline glow={0.25} scale={1 + 0.25 * Math.max(0, 1 - now / 0.25)} />
      </>
    );
  }

  // ---- at the new bridge: anyone can say so out loud
  if (now < AT.box) {
    const startled = now - AT.plank;
    const said = now - AT.anyone;
    const pointing = ease(ramp(said, -0.12, 0.12));
    const hop = startled > 0 && startled < 0.3 ? Math.sin((startled / 0.3) * Math.PI) * 0.12 : 0;
    return (
      <>
        <You
          position={[BRIDGE_YOU[0], BRIDGE_YOU[1] + hop, BRIDGE_YOU[2]]}
          rotationY={-Math.PI / 2 + 0.42}
          animation="idle"
          blendTo="point"
          blend={1 - pointing}
          face={said > 0 ? "frown" : startled > 0 ? "wow" : "calm"}
          saccade={false}
          gaze={0}
          headYaw={said > 0.5 ? 0.5 * ease(ramp(said, 0.5, 0.9)) : 0}
        />
        <No position={[BRIDGE_YOU[0], BRIDGE_YOU[1] + 1.56 * KID + 0.62, BRIDGE_YOU[2]]} scale={0.74 * pop(said, 0, 0.2)} />
      </>
    );
  }

  // ---- at the vote box: it is how you say no
  const thrownAt = now - AT.throwIt;
  const up = now - AT.rise;
  const sub = now - AT.subscribe;
  const spot = lastSpot(now);
  const facing = 1.75 - 1.5 * ease(ramp(sub, -0.2, 0.15));
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
        headYaw={sub > 0 ? -0.75 * toNo : 0}
        headPitch={sub > 0 ? -0.45 * toSign : 0}
        lookAt={sub < -0.2 && up > 0 ? [HOME.slot[0], HOME.slot[1] + 0.9, HOME.slot[2]] : undefined}
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
      note: "The question, asked where it is hardest to answer: the first frame is a stone man four times the size of the kid standing on his plinth. Then in to the kid, who looks up at him, turns to us and shrugs, with the question over his head.",
    },
  ],
});
