# That’s Me. The Elbow.

A kid races Grandma’s three-second self-timer for one birthday picture that proves he was there. The first thing that makes it into the frame is his elbow. Eventually, making it into the frame becomes the problem.

**[Movie](../../../renders/thats-me-the-elbow.mp4) · [Frame sheet](../../../renders/thats-me-the-elbow-shots.jpg) · [Script](narration.md) · [Timed storyboard](STORYBOARD.md) · [Captions](captions.srt) · [Sound sheet](sound.json) · [Review](REVIEW.md)**

## Choosing the opening

| Opening | First sound and picture | What it makes you ask |
|---|---|---|
| **Party → bad print (selected)** | Two arms go up, friends squeeze in, flash. “That’s me on the left. Not him. The elbow.” | You can see the accident before you know why it matters. How does he keep missing? |
| Six magnets | Start on the fridge. “Grandma says I’m in four of these.” Push in on four bits of blue. | Where is he? Clear evidence, but the party happens too late. |
| Race start | Brass button, yellow trainers. “Three seconds. I had a route.” Cut to the far side of the couch. | What is the race for? Fast, but no one to care about yet. |

The difficulty changes halfway through. Going **faster** gets him a great picture of himself and four ears. Practising **where to stand** lets Grandma keep everybody. The couple give him a third problem that doesn't call for either skill. Nobody explains it over the last print.

## Players and practicals

- **Kid:** the engine’s `MinecraftAvatar`, with a cobalt hoodie and yellow trainers. **Gran:** square glasses and plum cardigan. **Uncle:** tall, rust shirt and a broad straw hat. The two friends wear green and pink. The couple wear teal and coral and join their inside hands. The supporting cast is the topic’s [`Player`](../../../Topics/InThisTown/players.tsx); there is no replacement rig.
- **Yard:** the Town hut, fence, trees and plank table, with birthday bunting and a three-candle cake. **Living room:** the Recreation model’s `LivingShell` and `Sofa`, a wind-up instant camera, tape and two dressed dining chairs. **Kitchen:** mint refrigerator, five little year prints and the larger magnet spot.
- **The prints are photographs of this cast.** [negatives.tsx](negatives.tsx) is a *Remotion still entry point*, not an alternative movie renderer. It shoots the parties and practice tests in the same 3D sets. The film loads those eleven [exposures](../../../public/prints/thats-me-the-elbow/) onto actual paper meshes. The two stacked pairs of ears belong to the volunteers themselves.
- **Sound:** one selected synthetic storyteller, including the direct question. The recorded breath takes were cut into **eight timed triples**; the “almost” take is sped up 1.54× without changing the rest of the reading. Newly written framework music switches between the birthday beat, training percussion, quieter domestic passages and the dropped music at the four-ear reveal. No reference-video audio. [The takes](takes.json), [word clock](timing.json), [mix measurements](sound.lock.json), and [master audio](../../../public/audio/thats-me-the-elbow/mix.mp3) are included.

## Rebuilding

Use the repository's pinned dependencies (`npm ci`). The story is `storyScene` → `defineFilm` → the registered `thats-me-the-elbow` composition. It uses the real shader chain and the engine's on-beat pixel captions. The `.srt` groups words by line for reading; `timing.json` supplies the per-word burn-in.

```sh
# Optional, only if changing the voice or mix. See scripts/narration.py for the Python audio dependencies.
python3 scripts/split-takes.py thats-me-the-elbow
python3 scripts/narration.py build thats-me-the-elbow --require-alignment --tempo 1 --gap .09 --tail 1.05
python3 scripts/sound.py build thats-me-the-elbow

# Optional: reshoot one printed photo after moving its subjects.
npx remotion still src/videos/thats-me-the-elbow/negatives.tsx print-four \
  public/prints/thats-me-the-elbow/four.jpg --frame=1 --jpeg-quality=92 --gl=swangle

npm run typecheck && npm run check && npm run test:direction
npm run rehearse -- thats-me-the-elbow --final
```

The release movie is rendered by the repository’s **Render short** workflow at scale 1, not by a custom renderer or on the owner's computer.
