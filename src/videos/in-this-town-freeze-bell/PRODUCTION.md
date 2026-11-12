# Freeze Bell — production record

**V2 is recorded, mixed and picture-checked; its new cloud render is next.** The old forced subscribe beat has been replaced with the owner's golem/look-up ending. Until the new render is delivered, `renders/in-this-town-freeze-bell.mp4` is still v1. Sound is measured, not listened to.

## Owner direction and scope

The owner liked the original story but said the ending forced a “HEY SUBSCRIBE” moment. A rescue-and-breakfast resolution was proposed but **not selected**. The owner instead suggested remembering the golem that always looked down, looking toward the sky, starting something like “He saw…”, then cutting. They did not want a “subscribe for part two” promise. Asked which character, they clarified **“the golem who is looking down.”**

The established first-person narrator now says:

> Then I remembered the golem. He never looked up, even when the bell was quiet. So I looked up. And I saw...

**Then black. No CTA, subscribe sign, end card or announced sequel.** What he sees is deliberately not designed or shown. The existing toy-box revelation remains; the new ending does not falsely claim the neighbor was rescued.

- Detailed direction: [ENDING-REVISION.md](ENDING-REVISION.md).
- Current complete script: [narration.md](narration.md).
- There was no golem in v1. V2 makes the owner's clue fair by adding the unchanged pack `IronGolem` to the town tour: “Our golem kept looking down, even after the second ring.” This is **not** a renamed giant boy or a modification of a reference film.
- The original plot, all 18 beats, approved cast designs, village geography, bell linkage, friend and bun remain. The discarded proposal's cuts, return home and breakfast are not used.

## Measured narration

| Measurement | V2 |
|---|---|
| Composition | 1080 × 1920, 30 fps |
| Measured duration | **171.5667 s**, about **2:51.6** |
| Frames | **5,147** |
| Spoken words | **724** |
| Shots / beats | **86 / 18** |
| Recording groups | **10**, all aligned |
| Selected voice | **`voice-00`**, unchanged |
| Speaking pace | **253.9 WPM** |
| Build tempo | **1.4064** |
| Shot lengths | **0.70–4.9667 s**, median **1.90 s** |
| Longest word gap | **0.584 s** |
| Estimated? | **No**; `timing.json` has `estimated: false` |

The build used `scripts/narration.py build in-this-town-freeze-bell` **without `--estimate`**. All 724 word intervals are positive, ordered and nonoverlapping; all 86 cue intervals are contiguous. The earlier isolated 170.6-second text estimate is not the production clock.

New recordings: `01-town-v2`, `09-truth-v2`, `10-gaze-v2`. Seven original clips (`02-question` through `08-wait`) are reused **byte for byte**, verified against the v1 source commit. All v1 raw clips remain under their original names. No voice was re-auditioned. No recording has been listened to by this agent.

Current narration-block SHA-256: `deb25d5442e0b464bd3db7048d8084c600e5093005cdd535bedd32fe834cd7ca`.

## Ending and picture improvements

- The approved iron golem occupies one physical spot, `[-3.5, 0, -2.8]`, in the village and the same village inside the case. Its lowered pose is reused in the short daylight memory. A three-quarter view makes the downward tilt readable.
- The new clue appears immediately after the market restarts. The golem does not raise his gaze; no additional bell strike is invented.
- `18.memory` stays with the kid on the shelf. `18.down` recalls the earlier town shot. `18.look` and `18.saw` return to the same shelf; his head lifts on the recorded “looked / up.” The camera holds his reaction instead of supplying a reverse shot of the answer.
- The reaching right hand and the spare left hand are distinct. `ReachWithBun` places the bun on the actual left-hand transform for the existing reach pose; it no longer disappears when the right hand approaches the glass.
- Final camera angles keep the jar rim off the face. A restrained warm fill makes his eyes readable under the hand shadow. The palm shifts to the side and stays short of contact; the image does not show a new monster or declare an outcome.
- The last aligned word ends at **171.067 s**. The engine cuts to full black at **frame 5,133 / 171.1 s**, one frame later. The last **14 frames** are black. The normal word caption disappears with the picture.
- The hand, jar and lighting remain 3D. The only screen-space transition is the engine's existing black layer, now with an optional hard-cut time.

### Continuity retained

1. People choose to freeze; the environment and camera keep moving. The baskets remain held.
2. The rope slot and the loose-board opening are separate, physically connected through the same route behind the scenery.
3. The shelf surface and town floor share y=0; jar, screw and exit stay on that surface. The same village is reused in the box reveal.
4. `17.rope` replays the first opening heard at `15.ring`. `17.second` advances to the present closure. No new strike is added for the golem memory or upward look.
5. The turquoise neighbor stays under the jar; the bun is still intended for him. Neither the new narration nor the picture claims a completed rescue.
6. The tall scenery conceals the bedroom fairly. Looking up does not add an outdoor sky inside the giant's room.

### Picture review actually performed

- **All 86 measured-clock midpoint stills**, at 270 × 480, rendered and viewed in six sheets.
- **24 final 10%/90% endpoint stills**, covering freeze/restart, golem, hay fall, packing, crawl, screw climb, lid replay/closure, remembered thought, upward look and final black. Both sheets viewed.
- Earlier v2 ending passes: 21 half-scale diagnostic frames, followed by eight half-scale refinement/cut-boundary frames, all viewed. They are diagnostic history, not a claim that the first pass was final.
- Exact cut test: frame **5,132 has picture**; **5,133 and 5,146 are pixel-black**, including the caption layer.
- These are still/endpoint reviews, not a human full-motion playback or owner approval.

## Sound

`film.tsx` plays the rebuilt `audio/in-this-town-freeze-bell/mix.mp3`. `sound.json` is authored; `sound.lock.json` and the mix are generated by the unchanged sound tool.

- **13 music sections:** 12 playing and one deliberate silence before the box reveal. The final remembered clue drops to a low drone, not a cheerful outro.
- **14 location beds** and **167 justified effects of 26 kinds**. The brief daylight memory gets village air; the upward look returns to bedroom air. There is no new monster roar, subscribe pop or final bell.
- Effects remain cue/word-aligned. The original gait contacts and noun-timed packing stay attached to the current narration clock.
- The first v2 mix had one buried breathing gust; raising it by 3 dB fixed that. The friend's reply pluck was lowered by 1 dB for additional voice headroom. No limits or measurements were fabricated.

| Final mix measurement | Result |
|---|---|
| Music below speaking voice | **18.8 dB** |
| Beds below voice | **27.8 dB** |
| Effects per minute | **58.4** |
| Longest effect gap | **3.3 s**, from 116.5 s |
| Buried effects | **0** |
| Voice over all other sound, median | **16.4 dB** |
| Voice over all other sound, worst speaking half-second | **4.1 dB** |
| Music silence | **6.6 s** |
| Loudness | **−14.7 LUFS** |
| True peak | **−2.9 dB** |
| Limiter attenuation | **0.0 dB maximum** |

All six worst voice windows were inspected in the lock: 109.7 s (`13.reply`, plink/rustle, 4.1 dB); 32.4 s (`3.home`, whoosh, 5.6); 156.5 s (`17.second`, bell/thud, 6.7); 26.2 s (`3.second`, bell/rustle/whoosh_low, 6.9); 128.9 s (`14.scrape`, scrape, 7.2); 25.0 s (`3.second`, bell, 7.9). All exceed the 3 dB minimum.

The effects/audibility report and four-track timeline were inspected. Stems exist in ignored scratch storage. **Sound was measured, never listened to.** Ask the owner for a phone-speaker listen when handing over the new MP4.

## Narrow framework changes and regression

- `FilmConfig.cutToBlackAt` is optional, defaults off, and uses the existing engine black transition. Invalid times outside the film fail. No approved film opts in.
- The topic's default `lastLineContains: "subscribe"` is preserved. `endingOverrides.in-this-town-freeze-bell` records the owner's reason and the **exact** line `And I saw...`. This is not a generic waiver; an arbitrary replacement line still fails.
- **Six automated ending-rule tests pass**: exact owner line, rejection of arbitrary replacements, unchanged defaults for other films, required nonempty owner reason, case-insensitive default matching, and unchanged duration/word/caption/sound limits.
- `npm run typecheck`, `npm run check` and `git diff --check` pass for the current measured film. Existing base-film camera warnings and Monster Egg's voice-only legacy exception are unrelated.
- Fresh before/after renders around the engine change are **pixel-identical**: Same Face frames 0/1240 and Monster Egg frames 0/4600, at scale 0.25. This is four sampled frames, not a full per-shot regression sweep.
- Existing pack model source and both model-film folders are unchanged. The new golem is a use of the pack, not a redesign.
- The owner has not approved the new pictures or promoted this film/new props to topic-model status.

## Render / delivery status

**V2 cloud render not dispatched yet.** The next action is to commit/push only the active branch, dispatch the existing full-scale workflow, then probe and review the encoded output before delivery. The current local MP4 remains v1 until the render workflow replaces it.

Active branch: `arena/90c86f33-kmanincraftghhj22`. Framework base: merged `main` at `74296927c66583a7903dc26671e1283d5df32957`. All 28 Markdown files in that studied main revision were previously read; relevant topic, sound, narration, engine and workflow guidance was refreshed for this revision.

## Previous version, retained in Git and Releases

V1: **697 words / 82 shots / 165.1333 seconds**, ending “Subscribe before I get caught.” The owner liked its story and requested the ending revision above. It is not the final requested v2.

- V1 production commit: `08c323ef677e1e16ee5036b0d233b80ebcc638cc`; delivery record commit: `518fbe4`.
- [V1 render run 21](https://github.com/Mellow048/kmanincraftghhj22/actions/runs/43203227682).
- [V1 full-HD master](https://github.com/Mellow048/kmanincraftghhj22/releases/download/render-21/in-this-town-freeze-bell.mp4).
- V1 repository copy SHA-256: `03407a4b8d759e5269f4a03ea7a0872249e27f84561b51d142030754495752d1`; 57,751,995 bytes, 720 × 1280, 4,954 frames.
- V1 release asset: 91,536,052 bytes; GitHub-reported SHA-256 `74a9e4721474113ae2dbf6e86cdf6791d5a31e1b3fee1db1a6444d98aa0a883c`.
- V1 passed full decode, audio identity/sync comparisons and encoded-frame review. Those checks do not count as v2 encoded validation.

## Reproducing checks

```sh
npm run typecheck
node --test scripts/check-story-ending.test.mjs
npm run check
PYTHONPATH="$PWD/out/film-tools" python3 scripts/sound.py check in-this-town-freeze-bell
LD_LIBRARY_PATH="$PWD/out/pelican-qa/runtime/lib:${LD_LIBRARY_PATH:-}" \
  node scripts/shots.mjs in-this-town-freeze-bell \
  --scale 0.25 --out out/freeze-bell/v2/all-midpoints --chrome /tmp/chromium
```

Scratch review frames, estimates, old mix copies and QA reports in `out/` are ignored, not deliverables. Persistent source, raw recordings, measured timing, narration, sound sheet/lock and mix live in the film and `public/audio/` folders. Runtime helpers in `out/` may need restoring in another sandbox.
