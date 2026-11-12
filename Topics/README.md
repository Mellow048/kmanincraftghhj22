# Topics

A topic is one **kind of video** this framework knows how to make. Each topic is a folder here with its own rules,
its own references and its own kit. The engine in `src/engine/` is shared by all of them. The rules are not.

| Topic | Folder | What it makes | State |
|---|---|---|---|
| In This Town | [`InThisTown/`](InThisTown/README.md) | A 2–3 minute first-person Minecraft story: "In this town, …", a rule nobody explains, and a twist. Also has a 1–2 minute short cut | Rules, pack, starter and sound in place. Reference film: `in-this-town-same-face` (short cut, with sound). Also finished: `in-this-town-monster-egg` (voice only) |

More topics are planned by the owner (money lessons, what inflation is). Do not write rules for a topic until the
owner supplies a reference for it.

## Starting a film of a topic

```bash
npm run new -- "In This Town, Nobody Rang the Bell" --topic in-this-town
```

The film is made from the topic's own starter, not from the 20-second template, and it says `topic: "<id>"` from its
first commit. `npm run new` refuses a title that opens the way a topic opens if `--topic` is missing, and
`npm run check` fails a film that opens that way and does not declare the topic. The reason is in
[`InThisTown/reference/moon-20-seconds/`](InThisTown/reference/moon-20-seconds/README.md).

## How the rules stack

1. `AGENTS.md` and `docs/` are the base: the 20-second cinematic short.
2. A film that says `topic: "<id>"` in `defineFilm` follows that topic's `README.md`. Where the topic's table of
   changes disagrees with the base, **the topic wins, for that film only**.
3. A film with no `topic` follows the base rules unchanged. Nothing in this folder applies to it.

`npm run check` reads the same field: it lints a topic film against `Topics/<Folder>/topic.json` and every other film
against the base contract.

## What a topic folder holds

| | |
|---|---|
| `README.md` | Start here. One page: what the format is, what changes from the base, the work order |
| `topic.json` | The numbers the lint enforces: length, cut rate, voice pace, and the limits of the sound. `hardMinSeconds` and `hardMinWords` are the floor: under it a film is not a film of this topic. `cuts.<name>` holds other lengths of the same format; a film picks one with `cut: "<name>"`. `reference` names the topic's reference film, the finished film of ours that the owner chose to build like, and `models` lists every finished film. `film.opensWith` is the opening that belongs to the topic |
| Playbooks (`SCRIPT.md`, `SHOTS.md`, `SOUND.md`, …) | How to write it, how to shoot it, how it sounds |
| `reference/<name>/` | The video or script the format came from, and the evidence taken from it: contact sheets, a shot log, the transcript. Once the owner approves a film of ours as the reference, its page is here too. Rejected attempts are kept here as well, one page each |
| The pack (`index.ts` and the files it passes on, `PACK.md`) | People, places, things and helpers shared by that topic's films, taken from films the owner approved. Films themselves stay in `src/videos/` |
| `template/` | The starter film `npm run new -- … --topic <id>` copies. It is left out of the type check, because its imports only resolve once it sits in `src/videos/`. Test it by scaffolding a film from it |

## Adding a topic

1. Start from a real reference the owner chose. Put it in `reference/<name>/` and measure it before writing any rule:
   length, words, cuts, what is on screen. A rule with no number behind it is a guess.
2. Write the README's table of changes and `topic.json`.
3. If the topic is narrated and cut to the voice, use the story-film pipeline in `docs/STORY-FILMS.md`
   (script → voice → timing → shots → captions → sound). It is engine code and works for any topic.
4. Add a lint profile only if the topic needs a check that the `story` profile does not have.
5. When the owner approves a film of the topic, move what the next film can reuse out of the film and into the
   topic's pack, name the film in `models`, and make a `template/` from it. When the owner makes a film the
   topic's reference, give it a page in `reference/` and name it in `reference`. Prove with stills that the approved
   film did not change (`scripts/compare-stills.py`).
