# Dishwasher Training Arc

Finn ducks a party to train for a dishwasher job; when double pay means mopping too, he takes the same obsessive drill through the whole house. The party comes to watch him work.

**Hook options**: A dancing Skeleton and bouncing Slime cut to solitary dish scrubbing (selected, owner's exact two-second cut); plate avalanche first (spends the escalation too early); manager's mop/emerald offer first (loses the contrast). No spoken opener or title card. Popcorn remains a separate, unchanged film.

**Clock**: 30 fps, 1080 × 1920. `edit.json` holds the global cuts, action marks, trimmed takes, and timing inputs. `captions.json` and `voice-meter.json` are generated from the mix. `scene*.tsx` own camera and frame-by-frame blocking; cuts use the same integer frame clock. All timecodes below are seconds.

| Time | Shot / performance | Dialogue & sound |
| --- | --- | --- |
| 0.00–2.00 | Already dancing under the plaza lights: tall Skeleton, little Slime, villagers behind. Low push reveals the neighborhood party, rather than explaining it. | Shared score up front, deck thump, loose bones and slime bounces. |
| 2.00–7.27 | Hard cut on f60 to a wet ceramic close-medium; after the first six reps, cut at 3.67 to Finn's face as he's still holding his sponge. His eyes flick toward the restaurant flier. | Two groups of three HUS, then the two goal clauses. |
| 7.27–11.60 | Hero frontal, wipe matching direction: two faster triplets, plate clean, straightens into a big serious brag. Bell redirects his eyes to the door after the line. | HUS twice, boast, ding-dong. |
| 11.60–16.70 | At the open home door, tall friend calls; low friend bounces up to invite. Finn declines, turns back inside. | “Hey man!” “Come with us! The neighborhood is partying!” “No. I have work to do.” |
| 16.70–18.70 | Unbroken, slightly widening medium. His sponge stays on screen left, the plates on screen right grow 2, 4, 8, 16, 32, 64 on actual wipes. | Two tight triplets; accumulating pitched ceramic clicks. |
| 18.70–20.00 | From street level, follow Finn with his sample plate across the restaurant threshold beneath the sign. | Footsteps, restaurant bell. |
| 20.00–27.63 | Finn puts the clean plate on the counter. Villager eyes the plate, then shifts attention to the mop and two emerald piles. Close on Finn's face losing confidence and dipping at the handle. | Application; the two owner-specified manager questions; sped-up “Ahh, almost, almost.” |
| 27.63–31.63 | Three action matches, following the mop from tiled kitchen to entry/hall and bedroom/lounge. The actual dirty swaths clear, and the final wide includes the bed and clean floor. | Six quick breaths, wet swishes, foot contacts. |
| 31.63–33.67 | He returns with the mop, wipes the muddy restaurant entry, then the same manager nods and hires him. | Door chime, swipes, “You're hired!” and the cloth of his new apron on the cut. |
| 33.67–35.53 | First shift: two fast washing strokes cut to mop moving the same direction across the restaurant tiles. Work apron and wet-floor sign sell the new job. | Ceramic, sponge, mop in quick succession. |
| 35.53–39.17 | Friends lead neighbors in from the street. Reverse over their shoulders to dishes moving and Finn mopping in back, then a dedicated reaction insert on the friends and the group. | Bell, crowd feet, two triplets while they watch. |
| 39.17–41.40 | Finn walks up to the pass. Slime asks; Finn looks at a smudge instead of answering. Three increasingly fast counter-cloth passes erase the smudge. No fourth wipe. Cut on contact finish, no bumper. | “How did you do it?” A pause, and HUS HUS HUS. Stop. |

**Cast and set**: Finn keeps the original yellow tee, skin, block face, and sink contact work. Apron on the job. Skeleton in the orange scarf and Slime in the straw hat; same characters at plaza, door and restaurant. Rope lights, textured pavers, party decorations, colored practicals. Reuse the house, lantern and mob pack. Home and restaurant have separate palettes and work surfaces; mop pad and face both stay readable. Voxel bowls, stains, cloth and clean trails are film-specific props. The graphic is composed in 3D with built-in captions only.

**Mix**: The original shared `Topics/InThisTown/InThisTownMusic.aac`. The exposed music lane is −9 dB, +7 dB over the usual −16 dB reference setting, with dialogue/reps ducking. High little-bone voice vs unexpectedly low slime. The edited almost and HUS play faster without raising Finn's pitch. Bells, plate contacts, cleaning, footsteps, and movement share the locked clock with picture. No music lift after the counter punch line.

**Reference transfer**: The same crowd is planted early and comes back with a new purpose; the multiplying plates fill a held composition rather than cutting to a different pile. Start on a funny physical contrast and make the changed job legible while muted. Borrow the construction, not the title, dialogue, or length of Monster Village.

## Rebuild and review

```bash
npm ci
npm run typecheck && npm run check
# Mix and sidecars are checked in; this is only needed to rebuild after an edit.
python3 src/videos/dishwasher-training-arc/compose_audio.py --ffmpeg /path/to/ffmpeg
# Render on CI, not the owner's laptop. Use the Render short workflow, scale 1.
node scripts/render-plan.mjs dishwasher-training-arc --scale 1
python3 src/videos/dishwasher-training-arc/check_export.py --video renders/dishwasher-training-arc.mp4
```

The mix builder requires NumPy. The export check requires FFmpeg, ffprobe, and NumPy, with Pillow only if saving `--sheets` to a scratch folder. Conventions: `edit.json` is the input, render-time `captions.json` and `voice-meter.json` are outputs. The media QA checks all frames and several audio boundaries, not viewer reactions. See `REVIEW.md` for the checks on the released video.
