# Narration — In This Town, the New Kid Never Took Off His Helmet (part 1)

**Status: APPROVED by the owner 2026-11-14 ("yes go"), draft 2.** A horror short. His outline is kept word for word in
`Topics/Stories/outlines/helmet-kid.md`. Added by the agent, not in his outline: the missing kids are all ones who
were mean to the new kid; his helmet comes back wet; he is scared of what is under the helmet, not of the bullies; the
stick that snaps. Cut on his word: the note "Do not follow me" (the new kid must not know he is watched until the
stick snaps).

**Three lines differ from the draft he approved** (4.thick, 4.scream, 4.swallow): the voice service refused to speak
"They grabbed all three kids", "Nobody screamed" and "And it swallowed", so the words are milder and the PICTURE shows
the swallowing. Tell him; he has not agreed to this wording.

Topic: `Topics/Stories`. Read `Topics/Stories/OWNER.md` and `SCRIPT.md` before changing a word.

**One sentence:** kids go missing, the teller suspects the new kid in the helmet, follows him into the woods at night,
and sees what comes out when three bullies pull the helmet off. Then it hears him.

- One teller, first person, past tense. Fast and plain, but this one has silences: the `wait` on a clip is on purpose.
- Each `[cue]` line is **one shot**. Each `# clip` is one recording, saved to
  `public/audio/in-this-town-the-new-kid-never-took-off-his-helmet/raw/<clip>.mp3`; then
  `python3 scripts/narration.py build in-this-town-the-new-kid-never-took-off-his-helmet`.
- The teller wears GREEN. The new kid wears grey and an iron helmet that covers his whole head.

What is planted, and where it pays off:

| Planted | Pays off |
|---|---|
| He never takes it off, not even in the pool (1.not) | The helmet came off (4.off) |
| Every missing kid had been mean to him (2.mean) | The last three bullies in town (4.circle) |
| His helmet was a little wet (3.wet) | Something inside it moved (4.hole) |
| He was scared, but not of them (4.scared) | Part two: he is its cage, not its master |
| I stayed far back (3.far) | A stick snapped (5.stick) |

```narration
# clip 01-hook
[1.town]     In this town, the new kid never took off his helmet.
[1.not]      Not in class. Not at lunch. Not even in the pool.
[1.teacher]  The teacher asked him once. He just shook his head.
[1.face]     Nobody knew his face. Nobody knew where he lived.
[1.back]     He sat at the back, next to me. He never said a word.
[1.shy]      I thought he was just shy.

# clip 02-missing wait 0.4
[2.first]    Then the first kid went missing.
[2.desk]     His desk was empty on Monday. His bag was still under it.
[2.ran]      The adults said he ran away.
[2.more]     On Wednesday, another desk was empty. On Friday, two more.
[2.posters]  Posters went up on every wall. Nobody played outside anymore.

# clip 03-mean
[2.noticed]  And I noticed something.
[2.mean]     Every kid who went missing had been mean to him.
[2.three]    One threw his lunch. One knocked on his helmet. One tried to pull it off.
[2.mom]      I told my mom. She said, "Do not blame the new kid."
[2.sit]      I told the teacher. He said, "Sit down."

# clip 04-watch
[3.watch]    So I watched him myself.
[3.woods]    Every day after school, he walked into the woods. Alone.
[3.wet]      Every morning, he came back. And his helmet was a little wet.
[3.know]     I had to know what was in those woods.
[3.follow]   So one night, I followed him.
[3.far]      I stayed far back. He never turned around.
[3.hid]      At the edge of the woods, I hid behind a tree.

# clip 05-bullies wait 0.5
[4.lamp]     He was standing under the old lamp. He was not alone.
[4.circle]   Three big kids had him in a circle. The last three bullies in town.
[4.push]     They pushed him. He did not push back.
[4.take]     "Take it off," one said. "Show us your face."
[4.held]     He held his helmet with both hands. He was shaking all over.
[4.scared]   He was not angry. He was scared. But not of them.
[4.pull]     Two of them held his arms. The third one pulled.

# clip 06a-off wait 0.7
[4.off]      The helmet came off.

# clip 06b-noface wait 1.7
[4.noface]   There was no face.

# clip 06c-hole wait 1.4
[4.hole]     There was a hole.

# clip 06d-moved wait 1.1
[4.moved]    And something inside it moved.

# clip 06e-tent wait 2.0
[4.tent]     One tentacle came out. Then five. Then too many to count.
[4.thick]    They were as thick as trees. They wrapped around all three of them.
[4.scream]   Nobody made a sound. There was no time.
[4.swallow]  It pulled them in. All three. And then they were gone.

# clip 07-heard wait 1.0
[5.quiet]    Then it was quiet.
[5.pick]     The kid picked up his helmet. His hands were still shaking.
[5.step]     I took one step back.
[5.stick]    A stick snapped under my foot.
[5.stop]     He stopped.
[5.turn]     One tentacle turned around. Slowly. It pointed at my tree.
[5.breath]   I held my breath. I did not move.
[5.closer]   It came closer. It touched the bark, right next to my face.

# clip 08-sub wait 1.0
[9.sub]      Like and subscribe for part two.
```
