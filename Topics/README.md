# Topics

A topic is one **kind of video** this framework knows how to make. Each topic is a folder here with its own rules,
its own references and its own kit. The engine in `src/engine/` is shared by all of them. The rules are not.

| Topic | Folder | What it makes | State |
|---|---|---|---|
| In This Town | [`InThisTown/`](InThisTown/README.md) | A 2–3 minute first-person Minecraft story: "In this town, …", a rule nobody explains, and a twist | Rules written. First film built: `in-this-town-monster-egg` |

More topics are planned by the owner (money lessons, what inflation is). Do not write rules for a topic until the
owner supplies a reference for it.

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
| `topic.json` | The numbers the lint enforces: length, cut rate, voice pace |
| Playbooks (`SCRIPT.md`, `SHOTS.md`, …) | How to write it and how to shoot it |
| `reference/<name>/` | The video or script the topic is modelled on, and the evidence taken from it: contact sheets, a shot log, the transcript |
| Kit code | Maps, creatures and props shared by that topic's films. Films themselves stay in `src/videos/` |

## Adding a topic

1. Start from a real reference the owner chose. Put it in `reference/<name>/` and measure it before writing any rule:
   length, words, cuts, what is on screen. A rule with no number behind it is a guess.
2. Write the README's table of changes and `topic.json`.
3. If the topic is narrated and cut to the voice, use the story-film pipeline in `docs/STORY-FILMS.md`
   (script → voice → timing → shots → captions). It is engine code and works for any topic.
4. Add a lint profile only if the topic needs a check that the `story` profile does not have.
