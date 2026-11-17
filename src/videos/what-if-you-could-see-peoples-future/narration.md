# Narration — What If You Could See People's Future

**Status: SCRIPT APPROVED, VOICE RECORDED. The picture is being built.** The owner approved this script on
2026-11-13 ("yes both go", to the two scripts that were put to him together). The six clips are recorded with
`voice-00` (`public/audio/what-if-you-could-see-peoples-future/raw/`) and the film's clock is measured from them
(`timing.json`): 115.7 seconds, 254 words a minute. Changing a word now means recording that clip again and
rebuilding the timing.

Topic: `Topics/WhatIf`. Read `Topics/WhatIf/SCRIPT.md` before changing a word. The reference film, to build like
and never to retell: `Topics/WhatIf/reference/crush/`.

**Where the story came from.** The owner gave the title and the story (2026-11-13): "What if you can see people's
future?", and "the story to be saving your best friend on becoming poor because she liked this girl who have been
rejecting him over and over and over, but he is determined. u try to help your bro get over her because you see
what he will turn into". The friend is a boy ("him", "your bro"). The script below is that story; what it adds is
how he is saved.

**The premise, in four sentences.** What if I could see who everybody was going to be: a grown-up standing behind
each of them, thirty years older. I used it to save my best friend Max, whose grown-up had a coat full of holes and
no shoes, by getting him over Ruby, who had told him no eleven times. It worked for exactly one day: everything I
tried made that man poorer, until Max sold his bike for a necklace and she said no in front of the whole school.
What the power had really been showing me was not the money he spent but what he sold to get it: that man only
ever had shoes when Max had a wrench in his hand.

**One sentence:** A kid who can see everybody's future tries everything to talk his best friend out of a girl who
keeps saying no, and saves him in the end without a word, by handing him something broken to fix.

**The rule of the power, in one line a viewer could repeat:** Behind every kid stands the grown-up they are going
to be, and it changes when they do. **It shows who, never why.**

**The price.** To save Max he lies to him. It costs him Max's trust ("you were supposed to be on my side"), and it
gives Max his hope back: the next thing he sells is his bike.

- One teller, first person, past tense. Fast and plain: about 255 words a minute, no gaps.
- Each `[cue]` line is **one shot**: the words heard while that picture is on screen. Cut on the noun. 5–12 words.
- Each `# clip` is one recording. Record it to `public/audio/what-if-you-could-see-peoples-future/raw/<clip>.mp3`,
  then run `python3 scripts/narration.py build what-if-you-could-see-peoples-future`.
- The first line is the question, and it starts "What if". The last line is the subscribe line.
- Two other people speak: Max (7.faster, 8.side, 10.lucky) and Ruby (8.what, 9.ruby, 11.no). Nobody explains the
  power, and nobody says what Max should learn.
- The power has ONE look in the whole film: a see-through grown-up standing behind a kid.
- Ruby is not the villain of this. She says no, clearly, every time, and she is right to. What is wrong is that he
  does not hear it.

**Length.** 488 words in 57 lines: about 1:55 at the pace of the reference film, which is 479 words and 1:54 (the
limits are 60–118 seconds and 250–520 words).

What is planted, and where it pays off:

| Planted | Pays off |
|---|---|
| "It showed me who. It never told me why" (3.why) | He guesses why (Ruby, the presents, the money), and guesses wrong: "It was never the money" (13.money) |
| "Behind the boy who slept through math, a man slept at a desk" (3.sleep): a future is today, grown up | "That man only had shoes when Max had a wrench in his hand" (13.hand) |
| "Max built his own bike from three broken ones" (5.bike) | He sells it (10.bike); he mends the teller's (13.stood); he buys his own back (14.nine) |
| "Once, while Max fixed my bike chain, that man had boots. I blamed the light" (6.chain, 6.light) | "Then I remembered the boots" (12.boots); "Boots. A clean coat." (13.coat) |
| "He sold his tools, and bought a bear" (7.bear) | "It was what he sold to get it" (13.sold) |
| "That man even got a pair of shoes" (8.shoes): the teller thinks his lie did it | In the picture Max spends that day mending a locker door. Nobody says so until 13.hand |
| "Eleven times" (6.asked), "That made twelve" (7.twelve), "thirteen was his lucky number" (10.lucky) | "No, Max. Please stop." (11.no) |
| "Behind her stood a woman in a space suit" (9.suit) | She was never waiting for him: she comes back as a customer (14.ruby), the space suit still behind her |
| "That man sat on the ground with a cup" (10.cup) | Max, on the ground at the bike rack, "sitting where his bike used to be" (12.rack): "He and that man finally looked the same" (12.same) |
| "A grown-up stood behind every kid" (2.hall) | "The one standing behind you already has" (14.sub) |

Planted in the picture only, never in the words:

- **The first picture of the film** (1.what) is Max in the hall with a bunch of flowers, grinning, and behind him a
  thin see-through man with no shoes. The whole story is on screen in the first second.
- **One wrench stays in Max's back pocket in every shot.** He sells the box of tools, never that one. It is in his
  hand twice before the end: at the bike chain (6.chain) and at the locker door (8.day).
- **Ruby says no the same way every time**: she shakes her head once and goes back to what she was doing, which is
  always a book about the moon or a model rocket.
- **The man behind Max changes only when Max does something**: sells a thing, or picks up the wrench. Never on a
  word. The film's `kit.tsx` will have one function for it, the way the reference film has `joHeart`.

**The man behind Max, shot by shot:**

| When | What Max has just done | The man behind him |
|---|---|---|
| 1.what, 5.rags | Eleven presents | Thin. A coat full of holes. No shoes |
| 6.chain | Fixes a bike chain | The same coat, and boots, for as long as the wrench is in his hand |
| 7.coat | Sold his tools for a bear | No coat |
| 8.shoes | A day with nothing to buy: he mends a locker door | Shoes |
| 10.cup | Sold his bike for a necklace | Sitting on the ground, a cup held out |
| 12.same | Sits on the ground at the empty bike rack | The same, and now the two are one picture |
| 13.stood, 13.coat, 13.shop | Kneels down and mends the chain | Stands up. Boots, a clean coat, a shop with MAX over the door |
| 14.nine, 14.price | Mends bikes for coins | The shop, and he is whistling |

**What is put to the owner with this draft:**

1. **The ending.** The story is yours; the way Max is saved is mine. He is not talked out of Ruby: he is handed a
   broken bike, and he gets over her by going back to the thing he is good at. A week later he is earning money
   and she is one of his customers. Say so if you would rather it ended another way (two others are one line each
   at the bottom of this page).
2. **Ruby.** She is never mean. She says no thirteen times and means it every time, and behind her stands an
   astronaut: she has somewhere to be. If you want her to be the bad one of the story, say so; I would advise
   against it.
3. **The names**: Max and Ruby. The teller has no name, as in the first film.
4. **The title**: *What If You Could See People's Future?* ("could", as in the first film's title; you wrote "can").
5. **The voice**: `voice-00`, the same narrator as every film so far.

**What has to be built for it** (the places are all in the pack: the hall, the classroom, the lunch room and the
yard):

- The look of the power: a see-through grown-up who stands behind a kid, in ten outfits (a painter, a man asleep
  at a desk, a pirate, a football star, a man who can carry a cow, the thin man in his five states, an astronaut, a
  man with a shop). The pack's `Echo` is a see-through person in one colour: this is that, dressed.
- A bike rack, a bike that can lose its chain, a wrench, a box of tools, a bunch of flowers, a bear the size of a door, a gold
  necklace, a cow, a locker door that hangs crooked, and a shop front with MAX over it.

```narration
# clip 01-hook
[1.what]      What if you could see people's future?
[1.me]        One morning, I could.
[2.hall]      At school, a grown-up stood behind every kid.
[2.older]     It was them, thirty years older.
[3.painter]   Behind the boy who drew on every desk stood a painter.
[3.sleep]     Behind the boy who slept through math, a man slept at a desk.
[3.pirate]    And behind the quietest girl in class stood a pirate.
[3.why]       It showed me who. It never told me why.

# clip 02-max
[4.star]      I got a football star to sign my shirt, thirty years early.
[4.small]     I was very nice to the smallest kid in school.
[4.cow]       His grown-up could carry a cow.
[5.max]       Then I looked behind my best friend, Max.
[5.rags]      A thin man. A coat full of holes. No shoes.
[5.sense]     It made no sense.
[5.bike]      Max built his own bike from three broken ones.
[5.ruby]      I had one guess. Her name was Ruby.

# clip 03-ruby
[6.asked]     Max had asked her out eleven times.
[6.no]        She had said no eleven times.
[6.gift]      After every no, he bought a bigger present.
[6.lost]      After every present, the man behind him lost something.
[6.chain]     Once, while Max fixed my bike chain, that man had boots.
[6.light]     I blamed the light.
[7.told]      So I told him. Max, your future has no shoes.
[7.faster]    He said, then I had better ask her faster.
[7.bear]      He sold his tools, and bought a bear the size of a door.
[7.twelve]    Ruby said no. That made twelve.
[7.coat]      The man behind him lost his coat.

# clip 04-lie
[8.lie]       So I lied. I said Ruby had a boyfriend.
[8.day]       It worked for one whole day.
[8.shoes]     That man even got a pair of shoes.
[8.what]      Then Max asked Ruby. She said, what boyfriend?
[8.side]      He said I was supposed to be on his side.
[9.ruby]      Ruby found me. She said, I told him no. Make him hear it.
[9.suit]      Behind her stood a woman in a space suit.
[9.moon]      Ruby was going to the moon. She had no time for bears.

# clip 05-edge
[10.bike]     On Friday, Max sold his bike and bought a gold necklace.
[10.lunch]    He was going to ask her at lunch, in front of everybody.
[10.cup]      Behind him, that man sat on the ground with a cup.
[10.lucky]    He said thirteen was his lucky number.
[10.table]    He climbed onto a table and held up the necklace.
[11.no]       Ruby said, no, Max. Please stop.
[11.worse]    Nobody laughed. That was worse.
[12.rack]     I found him sitting where his bike used to be.
[12.same]     He and that man finally looked the same.
[12.boots]    Then I remembered the boots.
[12.chain]    So I pulled the chain off my bike, and wheeled it over.

# clip 06-reveal
[13.look]     He looked at it for a long time.
[13.stood]    Then he knelt down. And behind him, the man stood up.
[13.coat]     Boots. A clean coat.
[13.shop]     A shop with his name over the door.
[13.money]    It was never the money.
[13.sold]     It was what he sold to get it.
[13.hand]     That man only had shoes when Max had a wrench in his hand.
[14.nine]     A week later, Max had fixed nine bikes and bought his own back.
[14.ruby]     Then Ruby wheeled hers in.
[14.price]    He fixed it, and charged her full price.
[14.sub]      Subscribe. The one standing behind you already has.
```

## Two endings that were not written

- **He causes it.** Everything the teller does to pull Max away from Ruby is what makes him poor: the future he
  saw was the one he was about to make. True to the power, and a sad film.
- **She says yes.** On the thirteenth try Ruby gives in, and the man behind Max gets worse, not better: he had
  never wanted her, only the yes. Clever, and unfair to Ruby.
