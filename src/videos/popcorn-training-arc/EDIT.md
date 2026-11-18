# Popcorn Training Arc

**Premise:** A kid and his skeleton coach treat three popcorn catches before movie night like a championship. The chicken watching them has a much simpler strategy.

This is the standalone, 19.6-second training meme the owner okayed, not an episode of the longer In This Town format. The [BloxScenes reference](https://www.youtube.com/watch?v=QaCQe8XnHa0) establishes that a HUSS is an audible *rep*. Its basketball match, party reversal, narration, and audio are not used.

## Read the reference, then transfer one decision at a time

I checked frames decoded from the delivered [Monster Village Part 1 archive](../../../Topics/InThisTown/reference/monster-village/in-this-town-monster-village.mp4), its contact sheet, and its locked script, shot log and sound sheet. The archived cut is about 2:55 (74 shots), not the historical 3:41 cut. These are directing observations, not a fresh start-to-finish playback or an analytics attribution.

| Checked in Monster Village Part 1 | Transfer to this film |
| --- | --- |
| **0.12 / 0.63 / 1.40 / 2.43 s:** the first camera hasn't cut, but a boy becomes a boy and his zombie/skeleton family, then a group. The sound sheet places pops on the arrivals. | Start with Finn's hand on the mouse and Coach holding a real stopwatch. Three flicks, three breaths, three ticks: the same image changes before the first line. |
| **5.87 s:** the basket is already in the picture and leaves a question. **54.68 / 64.33 s:** the outside bar and the monsters facing out make an apparent punishment read as protection. | The first two catches teach the third-beat expectation. On the third, the hit, red lamp and physical recoil give the answer before Coach speaks. Cut the score at the bonk and wait a beat. |
| **~6.8 s → ~2:15:** Hiss wanting a hug goes from a throwaway joke to a solution. Mo handling bread at **34.75 s** is also meaningful later. | Treat the chicken as background at the catch station, not an ending cameo. Leave it next to the same carton on the miss, then let it take the whole thing while Finn celebrates. End on the held carton and his reaction, without a recap. |

These are visible additions, clear consequences and paid-off details, not a mandate to cut faster or use the same plot.

| Hook candidate | Frame one / line | What makes you look again |
| --- | --- | --- |
| **Selected: a skeleton coaches a mouse flick** | Boy mid-drill, three rep lamps, a bony hand with a stopwatch; three breaths, then “Three catches, then we watch.” | An ordinary desk is being treated like a gym before the film tells you why. The first shot adds three visible steps before it moves away. |
| The miss up front | Kernel rebounds off a boy's forehead; “Ahhh, almost, almost.” | Immediate slapstick, but spends the broken third beat before setting a pattern. |
| The chicken up front | Chicken on the counter beside the carton; “Three catches, then we watch.” | A likely rival; putting the bird center frame would give away where to look at the end. |

## Script / board (30 fps)

Spoken by Coach: **“Three catches, then we watch.”** / **“Ahhh, almost, almost.”** No narrator reading the pictures, no outro. Finn's sharp **HUSS** exhales are timed separately, for one training movement each. Sign lettering is part of the set, not transcribed speech.

| Frames / seconds | Beat, staging and shot | Voice, caption and sound |
| --- | --- | --- |
| 0–86 / 0.00–2.90 | Warm-up opening. Finn flicks his mouse under Coach's watch while three lamps count. Low front quarter then pull toward the next station. | HUSS x3 on the flicks, mouse taps, rising three-note drill beat. Coach sets the test over his watch. Aligned pixel words. |
| 87–174 / 2.90–5.83 | Slide along the same workbench; high angle finds plate, sponge and three streaks. Brisk sidestep stays behind the counter. | HUSS x3, one wet wipe per breath and the stains clear by contact. No explanation. |
| 175–340 / 5.83–11.37 | Follow from sink to catch station. Two kernels reach his mouth; the third hits his forehead. The chicken perks up beside the miss. Let Finn and Coach look at it, then hold on the embarrassment. | HUSS x3 on coached tosses; two catches, dry bonk, music drops. “Ahhh, almost, almost.” Only room tone under the line. |
| 341–441 / 11.37–14.73 | Earned smash cut. The same station gets a DAY 1: POPCORN TRAINING board. Finn has a red headband and balances a practice kernel while doing three squat reps. Widen down to the rematch mark. | HUSS x3 on the drives, board/stopwatch clicks, determined little synth groove. |
| 442–587 / 14.73–19.60 | Three clean catches complete his objective. While he celebrates, the chicken snags the entire carton and hops away. Camera follows the theft, leaving Finn's empty hand behind it. | HUSS x3 on the tosses, three counted catches. Victory chirp cut short by the scrape and clucks. No speech over the reveal. |

**Cast and assets:** Finn (engine player rig, amber tee, blue joggers, red headband after the miss); Coach (pack skeleton, ochre scarf, real jaw and a stopwatch attached to his hand); pack chicken. An oak counter separates the workstation, sink and catch station. The same striped carton stays at the catch station until the chicken takes it. Only film-local set pieces; no changes to shared presets, captions, mobs or approved renders.

**Timing source:** `edit.json` ties actions and sound to integer frames. The recordings are original performances using the owner's selected voice. `compose_audio.py` trims air from them, uses measured word spans for the words and sample starts for breaths, and makes the score, foley and `captions.json`. No audio sampled from either reference.

## Rebuild

The score, breath takes and dialogue are separate lanes in `compose_audio.py`. It writes the track and both caption and jaw sidecars from `edit.json`. The mix stays under the coach lines, drops on the miss, restarts at the headband cut, and stops on the steal. The breaths are non-dialogue foley; the eight spoken words are all captioned.

```sh
# numpy and FFmpeg are only needed if rebuilding the shipped mix.
python3 src/videos/popcorn-training-arc/compose_audio.py
npm run typecheck && npm run check
npm run render -- popcorn-training-arc renders/popcorn-training-arc.mp4 --gl=swangle --color-space=bt709 --crf=17 --jpeg-quality=95 --audio-bitrate=192k
```

## What to look for after upload

The reported ~18k views and 83% stayed-to-watch for *Monster Village Part 1*, versus ~1.4–1.5k views lately, don't establish a distribution ceiling. Stayed-to-watch is the view/swipe split, not the percent who finished. Compare Shorts-feed exposures at similar ages and use the retention curve to locate the problem before changing the whole format.

| Signal | First thing to test |
| --- | --- |
| Weak stayed-to-watch or drop before 1.2 s | Test first-frame object legibility: keep the skeleton, watch and mouse in one closer shot, and leave the rest of the edit fixed. |
| Strong start, sag at 2.9–5.8 s | Tighten the move to the sink. Keep three real wipes; lose transit before the first wipe rather than making every shot faster. |
| Drop after the 9.27 s miss or through 11.37–14.73 s | Check if the visual reset is clear. Test a shorter reaction or quicker headband reveal, one change at a time. |
| Holds up to 17.4 s, loses the last beat | Give the bird and carton more screen space; check the fraction still watching at the last half-second and any replay bump. |

Use comparable Shorts-feed samples/windows. Check both the swipe split and the shape after the first second; don't compare percent watched on a 19.6 s gag directly to a 175 s story as if they were the same test.
