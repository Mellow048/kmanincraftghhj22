import { cam, storyScene } from "../../engine";
import { Bits, Bush, Cow, Crab, Flower, HOME, Hider, IceThrower, Lost, Mailbox, Mailboxes, Neighbours, Penguin, SOUTH, StageGone, Stone, WEST, pop, timing, tw, w } from "./kit";

/** 02 — The neighbours, one at a time, and the mail they all check. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "The neighbours",
  shots: [
    {
      cue: "2.ice",
      ...cam.push({ on: [-0.3, 1.45, -1.5], dist: 6.3, to: 5.8, yaw: 6, pitch: 4, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "She walks us up the street. First door: the man in the blue hood, holding a block of ice over his head, ready to throw it at nobody. On 'the same squid' he looks at her and she looks at him.",
      stage: (t) => {
        const same = tw(t, w("2.ice", "same") - 0.15, w("2.ice", "same") + 0.2);
        return (
          <>
            <Mailboxes />
            <Neighbours t={t} skip={["ice"]} />
            <IceThrower position={HOME.ice.at} rotationY={0.35} t={t} turn={0.7 * same} />
            <Cow position={[0.4, 0, -2.2]} rotationY={SOUTH - 0.3} t={t} look={-0.9 * same} />
          </>
        );
      },
    },
    {
      cue: "2.talk",
      ...cam.push({ on: [-0.15, 1.15, -1.0], dist: 4.2, to: 3.8, yaw: -6, pitch: 3, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "Close on her, flat. Behind her the man in the hood drops his ice. It breaks on the path, and he turns his back on the word 'squid'.",
      stage: (t) => {
        const drop = tw(t, 0.25, 0.5);
        const away = tw(t, w("2.talk", "squid") - 0.25, w("2.talk", "squid") + 0.15);
        return (
          <>
            <Mailboxes />
            <IceThrower position={[-0.6, 0, -2.3]} rotationY={0.35 + away * 2.6} t={t} ice={drop > 0.9 ? 0 : 1} nod={0.3 * drop} />
            {drop > 0.9 ? <Bits position={[-0.5, 0.3, -1.7]} t={t - 0.5} color="#bfe6ff" count={12} power={1.2} /> : null}
            <Cow position={[0.5, 0, -1.3]} rotationY={SOUTH - 0.2} t={t} />
          </>
        );
      },
    },
    {
      cue: "2.bush",
      ...cam.push({ on: [0.35, 1.25, -3.9], dist: 4.8, to: 4.3, yaw: -6, pitch: 4, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The bush: a floating lump of leaves with two cross eyes, glaring at his mailbox. She stands next to him. He glares at her. He glares at us.",
      stage: (t) => {
        const us = tw(t, w("2.bush", "before") - 0.2, w("2.bush", "before") + 0.15);
        return (
          <>
            <Mailboxes />
            <Neighbours t={t} skip={["bush"]} />
            <Bush position={HOME.bush.at} rotationY={-0.3} t={t} look={-0.8 * (1 - us)} />
            <Cow position={[-0.55, 0, -4.3]} rotationY={SOUTH + 0.3} t={t} look={0.8 * (1 - us)} />
          </>
        );
      },
    },
    {
      cue: "2.hide",
      ...cam.push({ on: [-0.7, 0.95, -6.4], dist: 5.0, to: 4.6, yaw: 8, pitch: 8, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "A barrel, and a mailbox so full that letters stick out of it. She looks at us. Behind her two eyes come up over the barrel. She turns round on 'since'. They are gone.",
      stage: (t) => {
        const turn = tw(t, w("2.hide", "since") - 0.25, w("2.hide", "since"));
        const up = tw(t, w("2.hide", "Nobody") - 0.4, w("2.hide", "Nobody") - 0.1) * (1 - tw(t, w("2.hide", "since") - 0.3, w("2.hide", "since") - 0.15));
        return (
          <>
            <Mailboxes />
            <Neighbours t={t} skip={["hide"]} />
            <Hider position={HOME.hide.at} t={t} up={up} look={0.5} />
            <Cow position={[0.25, 0, -6.3]} rotationY={SOUTH + 0.2} t={t} look={-1.3 * turn} />
          </>
        );
      },
    },
    {
      cue: "2.stone",
      ...cam.push({ on: [0.5, 0.85, -8.9], dist: 4.2, to: 3.7, yaw: -4, pitch: 6, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "A small grey block with a red cloak and two arms held out, holding a buttercup as if it were glass. She is next to him with one flower fewer on her back, looking at the gap.",
      stage: (t) => {
        const mine = tw(t, w("2.stone", "my") - 0.2, w("2.stone", "my") + 0.15);
        return (
          <>
            <Mailboxes />
            <Neighbours t={t} skip={["stone"]} />
            <Stone position={HOME.stone.at} rotationY={-0.35} t={t} happy={mine}>
              <Flower position={[0, 0, 0]} scale={2.0} />
            </Stone>
            <Cow position={[-0.35, 0, -9.7]} rotationY={SOUTH + 0.3} t={t} flowers={2} look={0.9 * mine} nod={0.25 * mine} />
          </>
        );
      },
    },
    {
      cue: "2.new",
      ...cam.push({ on: [0, 0.6, -11.6], dist: 5.4, to: 4.9, yaw: 0, pitch: 7, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The two newest, side by side at the end of the street: a blue crab with one big claw, waving, and a penguin. The red LOST plates over them are still shiny. On 'armadillo' both look down.",
      stage: (t) => {
        const arm = tw(t, w("2.new", "armadillo") - 0.2, w("2.new", "armadillo") + 0.2);
        return (
          <>
            <Mailboxes />
            <StageGone />
            <Crab position={[-0.65, 0, -11.5]} rotationY={0.15} t={t} wave={1 - arm} sad={arm} />
            <Penguin position={[0.65, 0, -11.7]} rotationY={-0.15} t={t} flap={0.4 * (1 - arm)} sad={arm} />
            <Lost position={[-0.65, 1.45, -11.5]} scale={0.85 * pop(t, 0.2, 0.2)} />
            <Lost position={[0.65, 1.95, -11.7]} scale={0.85 * pop(t, 0.35, 0.2)} />
          </>
        );
      },
    },
    {
      cue: "2.mail",
      ...cam.push({ on: [0, 1.0, -3.6], dist: 12.5, to: 11.8, yaw: 0, pitch: 20, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The whole street from above the gate, early. Every one of them has turned to face his own mailbox, all at once, like a drill. Every flag is down.",
      stage: (t) => (
        <>
          <Mailboxes />
          <StageGone />
          <Neighbours t={t} mail />
          <Cow position={[-0.55, 0, 3.4]} rotationY={WEST} t={t} />
        </>
      ),
    },
    {
      cue: "2.all",
      ...cam.push({ on: [-1.5, 1.2, 3.4], dist: 3.3, to: 2.9, yaw: -15, pitch: 4, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "Her at her own box, nose almost in it. The flag is down. She looks in anyway, then turns her head to us: so does everybody.",
      stage: (t) => {
        const us = tw(t, w("2.all", "everybody") - 0.3, w("2.all", "everybody"));
        return (
          <>
            <Mailboxes skip={["cow"]} />
            <Mailbox position={HOME.cow.box} side={-1} tint={HOME.cow.tint} />
            <Cow position={[-0.3, 0, 3.4]} rotationY={WEST} t={t} nod={0.2 * (1 - us)} look={1.2 * us} />
          </>
        );
      },
    },
    {
      cue: "3.why",
      ...cam.push({ on: [1.8, 1.3, 1.5], dist: 2.9, to: 2.5, yaw: -28, pitch: 4, fov: 46 }),
      zone: "town",
      look: "overworld-sunset",
      note: "Another mailbox, another morning, a long time ago. Its red flag swings up by itself and stands there, glowing. One time, a letter came.",
      stage: (t) => (
        <>
          <Mailboxes skip={["golem"]} />
          <Mailbox position={HOME.golem.box} side={1} tint={HOME.golem.tint} flag={tw(t, w("3.why", "letter") - 0.35, w("3.why", "letter") - 0.05)} letter={t > w("3.why", "letter") - 0.2} />
        </>
      ),
    },
  ],
});
