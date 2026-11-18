/**
 * THE DEADPAN PACK — for films where an everyday rule is literal law and everybody plays it straight.
 *
 * There is nothing new to model, and that is deliberate: the blocky people, monsters, towns and monsters-as-family
 * from the Stories pack are exactly the cast a deadpan short needs, and they were approved by the owner. This file
 * re-exports that pack so a Deadpan film imports from one place, and so a later film can add its own parts here
 * without touching the Stories topic.
 *
 *   import { Hero, Villager, Pillager, Mansion } from "../../../Topics/Deadpan";
 *
 * The camera grammar, the six beats and the sound rules are this topic's own: README.md, SCRIPT.md, SHOTS.md,
 * SOUND.md.
 */
export * from "../Stories";
