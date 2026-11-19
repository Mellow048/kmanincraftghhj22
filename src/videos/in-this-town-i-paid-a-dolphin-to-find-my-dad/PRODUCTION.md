# In This Town, I Paid a Dolphin to Find My Dad

A fisher’s kid gives a dolphin one fish and follows it to a shipwreck, where a stripe he painted gives him a better clue than the treasure does.

- **Master:** [download MP4](https://github.com/Mellow048/kmanincraftghhj22/releases/download/render-243/in-this-town-i-paid-a-dolphin-to-find-my-dad.mp4) · 74.90 s, 1080×1920, 30 fps · [export checks and remaining weaknesses](REVIEW.md).
- **Script:** [the approved narration](narration.md), recorded as six Finn clips, with Dad quoted by the same narrator. No line was added after approval.
- **Hook options:** [fish payment, empty berth, and underwater chest fake-out](../../../Topics/InThisTown/outlines/ideas-2026-11-18.md). The payment wins: the trade is visible in the first second, without first explaining the storm or spoiling the chest.
- **Picture:** [measured storyboard](STORYBOARD.md), 36 shots, median 2.00 seconds. Opening cool harbor → brief warm memory → clear day at the reef → submerged turquoise → dry, shadowed cabin → warm dock. No cold open of scenery alone.
- **Captions:** [the measured word track](timing.json) renders the uppercase pixel captions you see. [captions.srt](captions.srt) is the sentence-sized companion for upload or accessibility, not a second burn-in.
- **Sound:** [cue sheet](sound.json) and [measured lock](sound.lock.json). The owner’s `Topics/InThisTown/InThisTownMusic.aac` runs on the film clock and steps back for the dive, the slot and the pressure on the beam. Ten beds/overlays establish open harbor, submerged water, dry wood and air. The reveal is a real scrape, not a magic sting. One mouth pop early; two distinct bites 0.23 seconds apart at the end. The rolling beam, landing and hinge have separate events.

## Cast, sets and assets

| Asset | Source and role |
| --- | --- |
| Fisher’s kid | `MinecraftAvatar`, amber shirt, blue trousers; stays the same kid in the flashback, water, rescue and payoff. Posed hands, eyes, knees and strokes in `kit.tsx` and the beat files. |
| Dad | Same avatar rig, teal shirt, charcoal trousers, warmer skin. Pack `StrawHat` in the brief past-tense memory; the face and shirt in the dark slot and at home identify him. |
| Searchers | Two distinct recolored adult avatar rigs in `voyage.tsx`, separated in depth. They row out; they’re not additional story characters. |
| Dolphin and cod | Articulated voxel dolphin in `props.tsx`: hinged jaw, pivoted fins, peduncle and flukes. Contact is measured at the nose. The three paid fish use the topic pack’s `Fish` mesh. |
| Harbor | New boardwalk, empty berth, rope, fish box and rocks built out of blocks. Reuses topic `Hut`, `Fence`, `LanternPost`, and engine `Vox`, `Tree`, light pools, dust and glows. |
| Open water and reef | `sea.tsx` paints a moving voxel-scale water surface and an illuminated underside. `world.tsx` uses instanced strakes, ribs, sand, ledges, sea grass and a dry upper compartment; pack-style blocks and texture atlas. |
| Boats and wreck hardware | Skiff with seats, tied cleat and rowlocks; separate broken green strake for Dad’s fishing boat; hinged hatch and displaced beam on the main wreck. |
| Clue and rescue tool | Two pieces from the same red `PaintedOar` profile with the same pixel stair-step stripe and exposed wood, plus an intact flashback version. A fixed pivot links the motion of the lever tip and grip; the hatch only moves after the beam clears. |
| False prize | Open chest, warm ingots and a supporting timber on the sea floor. Returns at departure without a hand ever taking the gold. |
| Finish | Topic starter, `storyScene`, `wordClock`, shader sky/bloom/grade and `CaptionWord` track. No downloaded picture assets. |

## Reproduce the mix and check the film

```sh
python3 scripts/narration.py build in-this-town-i-paid-a-dolphin-to-find-my-dad --wpm 240 --tail .43
python3 scripts/sound.py build in-this-town-i-paid-a-dolphin-to-find-my-dad
npm run typecheck && npm run check
```

For a repeatable rebuild, keep the six `public/audio/.../raw` recordings and use the PocketSphinx aligner, NumPy and FFmpeg. The narration command uses 80 ms clip gaps and a 60 ms cue lead (its defaults). The measured timing and voice/mix shipped with the film are the locked production files. Use the **Render short** workflow at scale `1` on the production branch, not the owner’s laptop. See [the export review](REVIEW.md) for what was checked and the limits of those checks.
