# What Is a Dictator — Film Narration (As Built)

**Status**: finished. The picture is drafted and corrected over seven rounds of stills; the sound is mixed and passes `sound.py check`; the render `renders/what-is-a-dictator.mp4` is built and passes `render-check.py`.

## The Pictures AS BUILT (Key Results)

| Line | Plan (what the table "What each line SHOWS" said) | What was actually built (Key Results) |
|------|---------------------------------------------------|----------------------------------------|
| 1.ask | you stand at the stone man's feet with your back to us, turn round and shrug; the question mark is there from frame 0. | **Built**: you stand at the stone man's feet with your back to us, turn round and shrug; the question mark is there from frame 0. |
| 2.vote | stones from both sides, two piles, a blue hat with a gold band lands on A. | **Built**: stones from both sides, two piles, a **purple** hat with a gold band lands on A (the leader). |
| 2.judge | the baker's loaf hops into the leader's folded arms; hammer, NO over the bench, the loaf goes back (two loaves, pays for one). Villagers have no hands. | **Built**: the baker's loaf hops into the leader's folded arms; the gavel appears over the bench (the rule); the loaf goes back. Villagers have no hands. |
| 2.loud | two planks drop out of the new bridge; a NO over you ("anyone"), the neighbour ("say") and the baker ("out"); the leader's head goes down. | **Built**: two planks drop out of the new bridge; a NO over you ("anyone"), the neighbour ("say") and the baker ("out"); the leader's head goes down. |
| 2.again | piles swept, B's pile wins, the hat crosses to B, A walks home. | **Built**: the piles are swept; B's pile wins (the vote again, and he can lose); the hat crosses to B (the vote again); A walks home. |
| 3.hates | a NO floats up from the crowd; he swats it with his head. | **Built**: a NO floats up from the crowd; he breaks it with his head. |
| 4.army | six soldiers out of the gate. | **Built**: six soldiers out of the gate. |
| 4.won | a fair vote; the hat lands on him (he does not carry the box off). | **Built**: a fair vote; the hat lands on him (the vote). |
| 4.judge | two soldiers come out of the door behind the bench and take the judge; his hammer drops on the desk; the man climbs the steps and takes it. | **Built**: two soldiers come out of the door behind the bench and take the judge; his hammer drops on the desk (the judge); the man climbs the steps and takes it. |
| 4.jail | the woman who ran against him says NO; a cage drops; her pile goes. | **Built**: the woman who ran against him says NO (he is wrong); a cage drops; her pile goes. |
| 4.vote | his face on a banner over the chair; 3 stones in, 9 on his pile; a padlock on "never"; the next stone bounces off. | **Built**: his face on a banner over the chair; 3 stones in, 9 on his pile; the padlock on "never"; the next stone bounces off. |
| 4.name | DICTATOR is cut into the balcony front as it is said; two thrown votes bounce off. | **Built**: DICTATOR is cut into the balcony front; the word is said (no vote can make him leave); two thrown votes bounce off. |
| 5.word–5.caesar | two men, a purple cloak (stand, man or air), two bowls of fire (torches), six moons; Caesar gets the cloak and a wreath, and three more moons to the end of the beam. | **Built**: two men; a purple cloak (the job); two bowls of fire; six moons; Caesar gets the cloak and a wreath, and three more moons to the end of the beam. |
| 5.now | the man on the balcony in the cloak. | **Built**: the man on the balcony in the cloak. |
| 6.answer | spears break four NOs, his hammer the fifth. | **Built**: spears break four NOs; his hammer the fifth (the no). |
| 7.you | your stone goes in; a NO nearly your size grows out of the slot; nobody else is in the square. | **Built**: your stone goes in; a NO nearly your size grows out of the slot (how you say no); nobody else is in the square. |
| 7.sub | you turn to us, the subscribe sign over your head, the NO beside it (two signs where the box was). | **Built**: you turn to us; the subscribe sign over your head; the NO beside it; the subscribe line (you still can). |

## What was left in

- **2.vote flight**: at its middle (frame 58) the east huts of home fill the frame under the caption VILLAGE.
- **3.hates**: the first 0.9 s of the line is open sky (the flight between the islands).
- **4.judge**: the man gets to the chair late. He faces front at about 21.07 s and takes the hammer at 21.25 s; the line ends at 21.40 s. At mid-line (frame 625) he is in profile.
- **4.jail**: the man with the hammer is cut by the left edge.
- **2.loud**: the hole in the bridge is small and at the left edge.
- **5.caesar**: a cold bowl stands in the lower right foreground; the word on the beam is cut to ATOR.
- **4.vote**: the padlock covers two letters of VOTE.
- **7.sub**: the caption crosses VOTE on the box.
- **Flights crossing**: the flights of 3.hates (frame 407) and 7.you (frame 1420) cross the same end of the island (the east huts/tree removal area); not re-checked after the tree removal at `HOME.p(9.1, 0, 1.4)` in `world.tsx`.

## Sound
- The sound sheet `sound.json` was drafted, edited (words matched script, stamp lowered -5 dB), built and checked.
- The mix `public/audio/what-is-a-dictator/mix.mp3` was generated.
- The numbers: music 19.1 dB under the voice; beds 24.0 dB; effects 57 (64/min); worst half second 3.6 dB at 29.5s; -14.9 LUFS, true peak -1.3 dB.
- **Note**: the sound was measured and never listened to; please listen once on a phone speaker.

## Render
- Rendered at scale 1 to `renders/what-is-a-dictator.mp4` (41.4 MB, 53.73 s, 1612 frames).
- Checked with `render-check.py --sheet --at 0.03 --at 0.97`: PASS.
- **Note**: the render has not been watched; please watch it.
