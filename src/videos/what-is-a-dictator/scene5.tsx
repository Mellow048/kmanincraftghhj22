import type React from "react";
import type { Vec3 } from "../../engine";
import { Glow } from "../../engine";
import { BOWLS, Brazier, CAESAR, Cloak, FIRST, Folk, Icon, LooseCloak, Moon, ROBES, SENATORS, STAND, STOPS, Stripe, Wreath, clock, ease, flightScene, hop, moonHook, pop, ramp, thrown, timing, useNow } from "./kit";

/**
 * BEAT 5 — THE SURPRISE. The word is two thousand years old, and it used to be a job with an end.
 *
 * This exhibit is Rome: the men on the temple floor, the purple cloak that IS the job, and the six moons that are
 * its six months. The cloak is one thing, and it is always somewhere: on its stand, on a man, or in the air between.
 */

/** Moments on the film's clock. */
const T = {
  job: clock.at("5.word", "job"),
  danger: clock.at("5.rome", "danger"),
  gave: clock.at("5.rome", "gave"),
  power: clock.at("5.rome", "power"),
  six: clock.at("5.six", "six"),
  give: clock.at("5.six", "give"),
  back: clock.at("5.six", "back"),
  julius: clock.at("5.caesar", "julius"),
  caesar: clock.at("5.caesar", "caesar"),
  made: clock.at("5.caesar", "made"),
  life: clock.at("5.caesar", "life"),
};

/** The cloak's three flights: to the first man, back to the stand, and to Caesar. Each takes `PASS` seconds. */
const PASS = 0.34;
const TO_FIRST = T.gave - 0.02;
const TO_STAND = T.give - 0.12;
const TO_CAESAR = T.julius - 0.08;
/** The cloak on its stand: where its wearer's feet would be. */
const ON_STAND: Vec3 = [STAND[0], STAND[1] + 0.17, STAND[2] - 0.04];
/** The wreath comes down on Caesar on his name. */
const WREATHED = T.caesar + 0.2;
/** The moons: six for the first man, one after another; put out when he gives it back; lit again for Caesar, and then more, and more. */
const monthLit = (i: number, now: number): number => {
  const first = ease(ramp(now, T.six + i * 0.11, T.six + i * 0.11 + 0.1)) * (1 - ease(ramp(now, T.back, T.back + 0.25)));
  const second = ease(ramp(now, T.made + i * 0.06, T.made + i * 0.06 + 0.08));
  return Math.max(first, second);
};
const EXTRA = 9;
const extraAt = (j: number): number => T.life - 0.3 + j * 0.12;

export const Exhibit5: React.FC = () => {
  const now = useNow();

  // ---- the cloak
  const toFirst = thrown(now, TO_FIRST, PASS, ON_STAND, FIRST, 0.55);
  const toStand = thrown(now, TO_STAND, PASS, FIRST, ON_STAND, 0.55);
  const toCaesar = thrown(now, TO_CAESAR, PASS, ON_STAND, CAESAR, 0.55);
  const flying = toFirst ?? toStand ?? toCaesar;
  const onFirst = now >= TO_FIRST + PASS && now < TO_STAND;
  const onCaesar = now >= TO_CAESAR + PASS;
  const onStand = !flying && !onFirst && !onCaesar;
  // On 'a job' the empty cloak is the thing to look at: it lifts on its stand, with light behind it.
  const shown = now - T.job;
  const lifted = shown > -0.1 && shown < 0.6 ? Math.sin(((shown + 0.1) / 0.7) * Math.PI) * 0.12 : 0;

  // ---- the danger: fire in the two bowls, and it is out again when he gives the cloak back
  const fire = ease(ramp(now, T.danger - 0.1, T.danger + 0.12)) * (1 - ease(ramp(now, T.give, T.give + 0.7)));
  const alarm = pop(now, T.danger - 0.02, 0.2) * (1 - ease(ramp(now, T.gave + 0.25, T.gave + 0.5)));

  const wearer: Vec3 | undefined = onCaesar ? CAESAR : onFirst ? FIRST : undefined;
  const gotIt = now - (TO_FIRST + PASS);
  const gaveIt = now - TO_STAND;
  const caesarGot = now - (TO_CAESAR + PASS);

  return (
    <>
      {/* The first man: the cloak for six months, and then he takes it off. */}
      <Folk
        position={[FIRST[0], FIRST[1] + hop(gotIt, 0.12, 0.26), FIRST[2]]}
        rotationY={0.08}
        robe={ROBES.toga}
        nod={onFirst ? -0.14 : gaveIt > 0 && gaveIt < 0.9 ? 0.3 : 0.05}
        lookAt={onCaesar ? [CAESAR[0], CAESAR[1] + 1.6, CAESAR[2]] : undefined}
        phase={0.5}
        body={onFirst ? <Cloak /> : undefined}
      />
      {/* Caesar: the cloak, a wreath, and no end. */}
      <Folk
        position={[CAESAR[0], CAESAR[1] + hop(caesarGot, 0.12, 0.26), CAESAR[2]]}
        rotationY={-0.1}
        scale={1.0}
        robe={ROBES.toga}
        nod={onCaesar ? -0.18 : 0.04}
        lookAt={onFirst ? [FIRST[0], FIRST[1] + 1.6, FIRST[2]] : undefined}
        phase={1.9}
        head={now >= WREATHED ? <Wreath /> : undefined}
        body={
          <>
            <Stripe color="#8f2a24" />
            {onCaesar ? <Cloak /> : null}
          </>
        }
      />
      {now >= WREATHED - 0.22 && now < WREATHED ? (
        <group position={[CAESAR[0], CAESAR[1] + 34 * (1.8 / 32) + 1.5 * ((WREATHED - now) / 0.22), CAESAR[2]]}>
          <group position={[0, -10 * (1.8 / 32), 0]}>
            <Wreath />
          </group>
        </group>
      ) : null}

      {/* The three who give it. They jump at the danger, and they watch whoever has the cloak. */}
      {SENATORS.map((p, i) => (
        <group key={i}>
          <Folk
            position={[p[0], p[1] + hop(now - T.danger + 0.03 - i * 0.04, 0.14, 0.26), p[2]]}
            rotationY={p[0] < FIRST[0] ? 0.45 : -0.45}
            robe={ROBES.toga}
            lookAt={wearer ? [wearer[0], wearer[1] + 1.5, wearer[2]] : undefined}
            phase={i * 1.4 + 0.2}
            body={<Stripe />}
          />
          <Icon kind="bang" position={[p[0], p[1] + 2.22, p[2]]} height={0.32} outline glow={0.3} scale={alarm} />
        </group>
      ))}

      {/* The cloak, when nobody has it on. */}
      {onStand ? <LooseCloak at={[ON_STAND[0], ON_STAND[1] + lifted, ON_STAND[2]]} /> : null}
      {flying ? <LooseCloak at={flying} flutter={Math.sin(now * 23) * 0.5} /> : null}
      {onStand && shown > -0.1 && shown < 0.7 ? <Glow position={[STAND[0], STAND[1] + 1.0, STAND[2] + 0.3]} size={2.6} color="#c98aff" opacity={0.5 * Math.sin(((shown + 0.1) / 0.8) * Math.PI)} /> : null}

      {/* The six months, and the months after them that have no number. */}
      {Array.from({ length: 6 }, (_, i) => (
        <Moon key={i} position={moonHook(i)} lit={monthLit(i, now)} />
      ))}
      {Array.from({ length: EXTRA }, (_, j) => (
        <Moon key={`x${j}`} position={moonHook(6 + j)} lit={1} scale={pop(now, extraAt(j), 0.16)} />
      ))}

      {/* The danger. */}
      {BOWLS.map((p, i) => (
        <Brazier key={i} position={p} fire={fire} seed={i + 1} />
      ))}
    </>
  );
};
void T.power;

export const scene5 = flightScene(timing, {
  id: "scene5",
  title: "Rome",
  from: STOPS.name,
  shots: [
    {
      cue: "5.word",
      to: STOPS.word,
      travel: 1.9,
      lift: 0,
      note: "Two thousand years is a long way down: off the balcony, past the edge of the island, through the cloud and far below it, to white columns with the same word cut over them. On 'a job' the thing to look at is a purple cloak on a stand, with nobody in it.",
    },
    {
      cue: "5.rome",
      to: STOPS.rome,
      note: "In to the men on the temple floor. On 'danger' the two bowls burst into fire and all of them jump; on 'gave one man' the cloak leaves its stand and lands on the shoulders of one of them.",
    },
    {
      cue: "5.six",
      to: STOPS.six,
      note: "Closer, to him and the six moons that hang over him: they light one after another on 'six months', and that is all there are. On 'give it back' the cloak leaves his shoulders for the stand, the moons go dark and the fires go out.",
    },
    {
      cue: "5.caesar",
      to: STOPS.caesar,
      note: "Across to the other man. The cloak comes to him and a gold wreath after it; the six moons light again, and then a seventh, an eighth, a ninth, in a row that runs off the edge of the frame. This is the one name in the film.",
    },
  ],
});
