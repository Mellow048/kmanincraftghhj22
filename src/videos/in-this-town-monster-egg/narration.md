# Narration — In This Town, Everyone Gets a Monster Egg. Mine Was Broken.

Topic: `Topics/InThisTown`. Read `Topics/InThisTown/SCRIPT.md` before changing a word.

**One sentence:** A kid refuses to throw away his cracked monster egg, hatches it in the forbidden lava lake, and learns too late why the town never keeps one.

- One teller, first person, past tense. Fast and plain: about 255 words a minute, no gaps.
- Each `[cue]` line is **one shot**: the words heard while that picture is on screen. Cut on the noun.
- Each `# clip` is one recording. Record it to `public/audio/in-this-town-monster-egg/raw/<clip>.mp3`,
  then run `python3 scripts/narration.py build in-this-town-monster-egg`.

What is planted, and where it pays off:

| Planted | Pays off |
|---|---|
| Nobody has seen who leaves the eggs (2.night) | The golems steal them (17.steal) |
| Golems carry things (3.golem) | …including eggs |
| "Throw it in the well, like all the others" (5.well) | Cracked eggs are silenced on purpose (17.baby) |
| The tapping that stops in the light (6.*) | It is a baby calling (17.baby) |
| "Never keep one" (7.told) | The rule finally makes sense (17.why) |
| The egg drinks fire (10.drank) | It drinks the whole lake (15.dark) |
| The blanket (12.blanket) | He carries the worm home in it (16.home) |
| Rank signs (3.rank) | "A worm. Rank one." (15.rank) |

```narration
# clip 01-hook
[1.me]       In this town,
[1.eggs]     every kid got a monster egg on their tenth birthday.
[2.shrug]    You see, nobody knew where the eggs came from.
[2.nest]     Every spring, they just appeared in the old stone nest at the edge of town,
[2.count]    one for every child,
[2.night]    and the weird part was that nobody had ever seen who left them there.

# clip 02-tour
[3.town]     Our whole town ran on monsters.
[3.bakery]   Dragons lit the ovens at the bakery,
[3.mail]     a phoenix carried the mail,
[3.golem]    and big stone golems carried sleepy kids to school.
[3.rank]     Every monster wore its rank on a wooden sign,
[3.loved]    and the higher the rank, the more the town loved you.
[3.friend]   My best friend hatched a dragon.
[3.million]  Rank one million.
[3.sister]   My sister hatched a phoenix.
[3.thousand] Rank ten thousand.
[3.good]     It was actually a pretty good place to grow up,
[4.but]      but there was one problem I could not stop thinking about.
[4.broken]   My egg was broken.
[4.crack]    It was grey and cold, with a big crack down the middle.

# clip 03-adults
[5.show]     When I showed the adults,
[5.dead]     they told me a cracked egg was a dead egg.
[5.well]     They said I should throw it in the old well, like all the others.
[5.hold]     But that only made me hold it tighter.
[6.bed]      Sometimes, late at night, I would hear a soft tapping from inside the shell.
[6.tap]      Tap. Tap. Tap.
[6.torch]    But every time I lit a torch to look,
[6.gone]     it stopped before I could see what was making it.

# clip 04-elder
[7.ask]      One day, I asked the oldest woman in town if a cracked egg had ever hatched.
[7.stare]    She stared at my egg for a long time before whispering,
[7.told]     "I forgot the reason. I only remember the rule. Never keep one."
[7.away]     Then she walked away.
[8.awake]    That night, I couldn't sleep.
[8.why]      Why would a whole town be afraid of one broken egg,
[8.alive]    unless something was still alive inside it?
[8.decide]   So, I decided to hatch it myself.

# clip 05-attempts
[9.warm]     First, I tried keeping it warm.
[9.wrap]     I wrapped it in blankets
[9.sit]      and sat on it like a chicken for three whole days.
[9.back]     Nothing hatched, and the only thing that cracked was my back.
[9.laugh]    The whole town laughed at me,
[9.not]      but I was not done.
[10.hotter]  If blankets wouldn't work, I needed something hotter.
[10.bag]     So every day, I hid the egg in my backpack
[10.close]   and sat as close to my best friend's dragon as I could.
[10.sneeze]  After weeks of waiting, the dragon finally sneezed.
[10.hit]     The fire hit my egg,
[10.drank]   and the egg drank it. Every last spark.
[10.glow]    Then the crack started to glow.

# clip 06-price
[11.catch]   But there was a catch. One sneeze was not enough.
[11.more]    My egg needed more fire than every dragon in town could make,
[11.place]   and there was only one place with that much fire:
[11.lake]    the lava lake outside the wall,
[11.never]   where no kid had ever been allowed to go.
[12.pack]    So I filled my backpack: bread, water, a rope, and a torch.
[12.blanket] And one more thing: my blanket,
[12.cold]    in case the thing inside was cold when it came out.

# clip 07-edge
[13.beg]     My best friend caught me at the gate and begged me to stay.
[13.what]    "What if something bad comes out?" he asked.
[13.alone]   "Then at least it won't hatch alone," I said.
[14.climb]   The next morning, I climbed over the wall
[14.edge]    and walked to the edge of the lava.
[14.heat]    The heat was so strong, the soles of my shoes began to smoke.
[14.look]    I turned around for one last look at home.
[14.ovens]   Dragons were lighting the ovens,
[14.kids]    golems were carrying kids to school,
[14.phoenix] and somewhere, my sister's phoenix was delivering the mail.
[14.nobody]  Not one of them knew what I was holding.
[14.breath]  I hugged my egg, took a deep breath,
[14.drop]    and let it go.

# clip 08-lake
[15.sure]    For a second, I was sure I had destroyed it.
[15.sank]    The egg sank without a sound.
[15.dark]    Then the whole lake went dark,
[15.swallow] as if something had swallowed all the fire.
[15.shake]   The ground began to shake,
[15.split]   the shell split open,
[15.worm]    and out crawled the smallest monster I had ever seen.
[15.rank]    A worm. Rank one.
[16.home]    I carried it home in my blanket, and the whole town laughed,
[16.sound]   until the worm made one tiny sound.
[16.stop]    Every dragon stopped.
[16.landed]  Every phoenix landed.
[16.turn]    And one by one, every monster in town turned to the wall,
[16.bow]     and bowed.

# clip 09-mother
[17.sky]     Then the sky went dark,
[17.land]    and something bigger than our whole town landed on the wall.
[17.why]     And that was when I finally understood the rule.
[17.gifts]   The eggs in the stone nest were never gifts.
[17.steal]   Our golems had been stealing them.
[17.baby]    A cracked egg is not broken.
[17.call]    It is a baby, calling for its mother.
[17.home]    And mine had just called her home.
[18.sub]     Subscribe before she finds me.
```
