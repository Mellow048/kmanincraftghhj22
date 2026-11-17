import type React from "react";
import type { Vec3 } from "../../engine";
import { BALCONY, BALCONY_FLOOR, Cloak, FlyingHat, Folk, GATE_X, GREY, Gavel, LeaderHat, Medals, No, NoBits, ROBES, SHARED, STOPS, clock, ease, flightScene, headTop, mixAngle, ramp, strike, thrown, timing, useNow, walk } from "./kit";
import { CROWD_UNDER } from "./scene4";

/**
 * BEAT 3 — MEET HIM. The other village: the same square in grey stone, and one man on a balcony over it.
 *
 * This exhibit is THE MAN, for the whole film, and the first NO that is said to him. He is ONE villager. Where the
 * script goes back to how he got there ("he may even win a fair vote first") he is moved to the vote box while
 * the camera is on the gate, and from then on he walks: up to the judge's chair, out through the door behind it,
 * and on to the balcony again, with the hammer.
 */

/** Moments on the film's clock. */
const T = {
  hates: clock.at("3.hates", "hates"),
  no: clock.at("3.hates", "no"),
  army: clock.at("4.army"),
  vote: clock.at("4.won", "vote"),
  first: clock.at("4.won", "first"),
  locks: clock.at("4.jail", "locks"),
  wrong: clock.at("4.jail", "wrong"),
  name: clock.at("4.name"),
  now: clock.at("5.now"),
  last: clock.at("6.answer", "no"),
};

/** The hat comes down on him as it did on the leader at home: on the word 'vote'. */
export const HIS_HAT = T.vote + 0.26;
/** He is off the balcony and at the box once the camera has come to rest on the gate, and the balcony is over the top of the frame. */
const AT_BOX = T.army + 1.0;
/** Up the steps when he has the hat; into the chair when the judge is out of it; the hammer; out by the door. */
const CLIMB = T.first + 0.33;
const TO_CHAIR = CLIMB + 1.57;
export const HAMMER = SHARED.hammerTaken;
const LEAVES = T.wrong - 0.28;
/** He comes out on the balcony again as the camera turns back to it. */
export const OUT = T.name + 0.03;
/** The blow he gives the last NO himself. */
export const LAST_BLOW = T.last + 0.1;

/** The first NO: it leaves a head in the crowd, floats up to the rail, and he butts it to bits. */
const SAID = T.hates - 0.2;
const BUTTED = T.no + 0.1;
const NO_FROM: Vec3 = [CROWD_UNDER[2][0], CROWD_UNDER[2][1] + 2.3, CROWD_UNDER[2][2]];
const NO_TO: Vec3 = [BALCONY[0] + 0.05, BALCONY_FLOOR + 1.2, BALCONY[2] + 0.62];

export const Exhibit3: React.FC = () => {
  const now = useNow();

  // ---- where he is
  const climb = walk([GREY.spotA, ...GREY.stairs], now, CLIMB, 2.1);
  const sit = walk([GREY.stairs[4], GREY.p(-1.05, 1, -2.45), GREY.judge], now, TO_CHAIR, 2.3);
  const leave = walk([GREY.judge, GREY.p(-1.25, 1, -2.95), GREY.p(-1.25, 1, -4.2)], now, LEAVES, 1.7);
  const emerge = walk([[BALCONY[0], BALCONY[1], BALCONY[2] - 1.0], BALCONY], now, OUT, 1.9);
  let at: Vec3 = BALCONY;
  let facing = 0;
  let hidden = false;
  if (now < AT_BOX) {
    at = BALCONY;
  } else if (now < CLIMB) {
    at = GREY.spotA;
    facing = 0.3;
  } else if (now < TO_CHAIR) {
    at = climb.p;
    // At the top of the steps he waits, and watches the judge go.
    facing = climb.done ? mixAngle(climb.rot, 2.3, ease(ramp(now, climb.end, climb.end + 0.2))) : mixAngle(0.3, climb.rot, ease(ramp(now, CLIMB, CLIMB + 0.2)));
  } else if (now < LEAVES) {
    at = sit.p;
    // He turns to the square as he comes round the desk: by the time he is behind it he is facing everyone.
    facing = mixAngle(sit.rot, 0, ease(ramp(now, sit.end - 0.42, sit.end - 0.05)));
  } else if (now < OUT) {
    at = leave.p;
    facing = mixAngle(0, leave.rot, ease(ramp(now, LEAVES, LEAVES + 0.2)));
    hidden = leave.done;
  } else {
    at = emerge.p;
  }
  const walked = climb.walked + sit.walked + leave.walked + emerge.walked;

  // ---- what he has
  const hasHat = now < AT_BOX || now >= HIS_HAT;
  const hatFalls = thrown(now, HIS_HAT - 0.3, 0.3, [GREY.spotA[0], GREY.spotA[1] + 4.4, GREY.spotA[2]], headTop(GREY.spotA), 0);
  const hasHammer = now >= HAMMER;
  const hasCloak = now >= T.now - 1;
  // The hammer: one blow from the judge's chair, and one from the balcony at the very end. Between the two he
  // carries it at his side, laid back on the shoulder.
  const carried = ease(ramp(now, LEAVES - 0.15, LEAVES + 0.15)) * (1 - ease(ramp(now, LAST_BLOW - 0.5, LAST_BLOW - 0.26)));
  const swing = now < LEAVES ? strike(now, T.locks, 0.95) : strike(now, LAST_BLOW, 0.95);

  // ---- the first NO
  const rising = thrown(now, SAID, BUTTED - SAID, NO_FROM, NO_TO, 0.25);
  const butt = now > BUTTED - 0.16 && now < BUTTED + 0.3 ? Math.sin(((now - (BUTTED - 0.16)) / 0.46) * Math.PI) : 0;
  // A man who has just been told no, and at the end a man nobody can tell it to: the chin comes up.
  const chin = ease(ramp(now, LAST_BLOW + 0.15, LAST_BLOW + 0.45));

  return (
    <>
      {hidden ? null : (
        <Folk
          position={at}
          rotationY={facing}
          robe={ROBES.man}
          walk={walked}
          lean={0.62 * butt}
          nod={now < AT_BOX ? 0.2 - 0.1 * butt : -0.16 * chin}
          lookAt={now < BUTTED - 0.16 && rising ? rising : undefined}
          phase={0.7}
          head={hasHat ? <LeaderHat /> : undefined}
          body={
            <>
              <Medals />
              {hasCloak ? <Cloak /> : null}
            </>
          }
          hands={hasHammer ? <Gavel swing={swing} carried={carried} /> : undefined}
        />
      )}
      {hatFalls ? <FlyingHat at={hatFalls} /> : null}

      {rising ? <No position={rising} scale={0.5 + 0.2 * ramp(now, SAID, BUTTED)} rotationY={0.05} /> : null}
      <NoBits position={NO_TO} t={now - BUTTED} seed={3} toward={[0, 0.2, 1.4]} power={1.3} />
    </>
  );
};
void GATE_X;

export const scene3 = flightScene(timing, {
  id: "scene3",
  title: "The other village",
  from: STOPS.again,
  shots: [
    {
      cue: "3.hates",
      to: STOPS.hates,
      note: "Across the open sky to the other village: the same square in grey stone. One man in the same purple hat stands on a balcony over the gate, the people small under him. A little NO floats up out of the crowd to the rail, and he butts it to bits with his head.",
    },
  ],
});
