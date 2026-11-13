# Shooting a "What if" film

> **Provisional.** The camera is In This Town's, on the owner's word ("it has the same camera technique"), and
> that part is measured. What is this topic's own (how a power is shown, how a school is shot) is a first
> setting until a "What if" reference is measured ([`reference/`](reference/README.md)).

**Read [`../InThisTown/SHOTS.md`](../InThisTown/SHOTS.md) first.** Everything in it holds here: hard cuts, one shot
for each line, cut on the noun, the camera recipes (`cam.push`, `cam.orbit`, `cam.pan`, `cam.truck`, `cam.top`),
zones, "the frame is a slit", faces. This page is only what a story about a power adds.

## 1. The power has one look

The viewer has to see the power the way the teller does. Choose its look before the first shot is built, from
the pack ([`PACK.md`](PACK.md), `powers.tsx`) or new, and write it at the top of `film.tsx`.

| The power… | Its look | Part |
|---|---|---|
| shows him something about people: who likes whom, who lies, how long they have | A sign over a head: a heart, a skull, a clock, a number | `Overhead` |
| shows him what is coming, or what was | A see-through copy of a person, doing it early | `Echo` |
| makes him fast | Lines trailing behind him | `Streaks` |
| is switched on and off | A ring of bright cubes round him while it is on | `Aura` |
| arrives once, at the start | A spiral of cubes climbing round him | `Swirl` |
| runs out, or runs down | A number in the air, counting | `Countdown` |
| joins two people, or points at one | A line of light | `Beam` |

The rules of a look:

1. **Set it in the first shot.** The hook is the power at work: one picture that a viewer who has read nothing
   understands.
2. **Never change it.** Same part, same colour, same size, from the hook to the reveal. After ten seconds the look
   IS the power, and the film can say "I saw it over her head" and show only her head.
3. **One colour, and nobody wears it.** The power's colour is not in anybody's clothes and not on a wall.
4. **It arrives on the word.** `t={t - wordAt("3.heart", "heart")}`: every part here pops in as its `t` passes 0.
5. **Only he can see it.** Nobody else in the shot looks at the sign. They look at him, looking.
6. **The sign and the face that sees it are two shots.** A tall frame holds one of them. Cut from the sign to his
   face: the face tells the viewer what the sign meant.
7. **The reveal uses the same look, and it means something else.** That is the whole trick of the format, so plan
   the last use of the look when you choose it.

A sign faces +Z. Turn it to the lens with the camera's yaw: `rotationY={yaw * DEG}` (yaw 0, the lens on the +z
side: nothing to do; from the board, yaw 180: `rotationY={Math.PI}`).

## 2. The classroom, in a tall frame

Everybody in a classroom faces the board (north). So there are two families of shot, and a scene cuts between them:

- **From the back**: the lens stands behind the back row and looks north. Backs of heads, the teacher, the board.
  This is what the teller sees, so this is where the power's signs are shown.
- **From the board**: the lens stands at the board and looks south. Faces, and the back wall behind them.

The south wall of `Classroom` can be seen from inside only, so both work: a lens behind it looks straight through,
and a lens inside sees a wall with a map and coats on it. Keep the lens under 3.3 m high and inside the east and
west walls, or it looks through the ceiling or a side wall from outside.

**Stack by depth.** At 6 m a tall frame shows less than 3 m across: one column of desks, not three.

- The teller sits in the middle column. In the starter he is in the back row, `ME = SPOT.seat(1, 2)`, and everybody
  he can see is in front of him.
- Whoever the shot is about sits **straight ahead of him**, in the same column: `SPOT.seat(1, 0)` or `(1, 1)`. A
  sign over that head is in the middle of the frame, over the heads between.
- Somebody two desks to the side is out of the frame, and so is a sign over them. Give that person their own shot.
- **Somebody the teller must NOT see sits straight behind him.** In the first film he is at `SPOT.seat(1, 1)` and
  his best friend at `(1, 2)`: every shot of his face from the board has her, and the biggest heart in the school,
  in the frame behind his head, and he never turns round. That is a plant that costs no words.

Framings that work, measured on the starter film and on the pack's sheet (`pack.jpg`, pictures 1–3):

| The shot | Camera |
|---|---|
| The class from the back row: his back at the bottom, heads in front, the board at the top | `cam.push({ on: SPOT.at(0, 1.35, -0.4), dist: 6.4, to: 5.6, yaw: 0, pitch: 13, fov: 46 })` |
| The class from the board: faces, stacked up the frame | `cam.push({ on: SPOT.at(0, 0.9, 1.7), dist: 5.3, to: 4.9, yaw: 180, pitch: 17, fov: 48 })` |
| One seated kid's face | `cam.push({ on: SPOT.face(col, row), dist: 2.0, to: 1.6, yaw: 172, pitch: 2, fov: 36 })` |
| The teacher at the board | `cam.push({ on: SPOT.at(-0.3, 1.45, -2.6), dist: 4.6, to: 4.2, yaw: 38, pitch: 5, fov: 44 })` |
| His seated face at `(1, 1)`, and behind it the one at `(1, 2)` with a big sign over her | `cam.push({ on: SPOT.at(0, 1.26, 1.9), dist: 3.3, to: 3.1, yaw: 163, pitch: -2, fov: 46 })`. Yaw 200 when he looks at the window |
| The one behind him, alone, and the sign over her from below | `cam.push({ on: SPOT.at(0, 1.33, 2.9), dist: 2.7, to: 2.3, yaw: 153, pitch: -19, fov: 52 })` |
| Past the shoulder of the one behind, to him turning round in his chair | `cam.push({ on: SPOT.at(0, 1.2, 2.0), dist: 3.6, to: 3.3, yaw: -30, pitch: 5, fov: 46 })` |

The last three are from the first film (`scene6.tsx`), found in stills.

Sitting: `animation="sit"`, `rotationY={NORTH}`, on `SPOT.seat(col, row)`. A seated kid is 1.34 m tall, so a sign
over one is `<Overhead tall={1.34} … />`, and the face is at `SPOT.face(col, row)`. The ones who are not in the
story look down at their desks: `headPitch={0.3}`.

## 3. The hallway

`SchoolHall` runs west to east, with the lockers on its north wall. Its south wall is one-sided too.

| The shot | Camera |
|---|---|
| Two or three people against the lockers (the lens outside, looking north) | `cam.push({ on: hall(0, 1.3, -0.8), dist: 7.0, to: 6.2, yaw: 0, pitch: 6, fov: 46 })` |
| Along the hall: somebody walking at the lens, the EXIT doors far behind | `cam.push({ on: hall(2.5, 1.2, 0.1), dist: 6.0, to: 5.2, yaw: -90, pitch: 4, fov: 50 })` |
| A sign over each of two heads | `cam.push({ on: hall(0, 1.45, -0.7), dist: 5.4, to: 5.0, yaw: 0, pitch: 14, fov: 44 })` |

`hall(x, y, z)` is a point given from the middle of the hall's floor. People stand in front of the lockers at
z = −0.9, and walk the middle of the hall at z = +0.3.

**Bright things need something dark behind them.** The lockers are dark; the floor and the walls are pale. A
sign, a streak or a beam that is in front of the lockers reads; the same thing over the floor is gone. Stage the
power against the lockers, or give a `Figure` or an `Icon` its `outline`.

## 4. The one new place

A school and a bedroom are in the pack. The place where the power is used for the one big thing (the pool, the
roof, the bus, the stage) is not: it is new in every film, it is its own zone, and it is where the film's own
building work goes. Show it early and small, in daylight, so that the viewer knows it when the story comes back
to it at the edge.

## 5. What the first film found

*What If You Could See Who Had a Crush on You* has 55 shots, and it took five rounds of stills. These are the
mistakes that came back more than once. Each cost a round.

**Who is between the lens and the face.**

- **Two people in a line with the lens are one person.** A lens straight behind or straight in front of a column
  hides the far one. Stand 15–40° to one side.
- **A head half a metre from the lens is a black block**, and an arm that is raised, pointing or waving near the lens
  covers the frame. Either go back and to one side, or **do not draw the near person**: the lens is standing where
  they are. Say so in a comment in the shot.
- **Somebody standing in the middle of the frame hides what he is looking at.** Put a watcher at the bottom of the
  frame.
- **A thing held out between two people shows its back to the lens** and covers the other one's face.

**Signs.**

- **A sign changes size only when the one it is for moves.** If the rule of the power is "it grows when they come
  close", write the size as one function of the distance in the film's kit, and use it in every shot. The first
  film has `joHeart(metres)`, and no shot gives that heart a size by hand. A sign that swells on a word, with
  nobody moving, teaches the viewer the wrong rule.
- **Too close, or from below, a big sign is a slab.** From about its own size away, a 2 m heart is a flat pink
  frame; from under it, a maroon one. Leave it out of that shot and put a `pointLight` of its colour where it is.
- **`on` at the height of a sign puts the face under the caption.** Captions are at 72% of the height. Aim so that
  faces are at 60% or higher, and let the sign take the top.
- **Two signs side by side read as a mistake**, unless the line is about two.

**Words in the picture.** Painted text (`Bubble`, a board) at the size of a speech bubble is a blot on a phone.
Words that have to be read are written in cubes (`Figure`), in two short lines of three or four letters:
ASK / HER. A card holds one word: DANCE?

**Night.** `look: "overworld-night"` gives almost no light of its own.

- A face that is not turned to a lamp is black. Give a night shot its own lamp, behind the lens: a warm
  `pointLight`. It is "a street lamp"; nobody asks where it is.
- A lamp near a sign bleaches it, and the dark turns it maroon: set `steady` on an `Overhead` at night.
- Coloured party lamps turn fair hair green. Put a white light behind the head.
- In his room at night the shared `Room` fills from the south in blue: faces go purple. Add a warm light in the
  shot, on the side of the face.

**A mirror** is `Reflection`: the room and whoever stands at the glass, drawn again behind the wall. Shoot it past
his shoulder, and keep everything else out of it: a second sign in the glass is a sign next to his head.

**Work out where the lens is before rendering it.** Two lenses in the first film stood inside a wall or a house.
`on`, `dist`, `yaw` and `pitch` put the camera somewhere: check that it is in the room, and that the people the
shot is about are inside a frame that is only 9 wide for 16 high.

## 6. Before the stills are called good

- [ ] The look of the power is the same part and the same colour in every shot it is in.
- [ ] In every shot with a sign, the sign is inside the frame, and something dark is behind it.
- [ ] The teller wears one loud colour that nobody else wears, and he can be found in a full classroom.
- [ ] A new face on every cut to him. The face is the meaning of the shot before it.
- [ ] No lens over 3.3 m in the classroom or the hall, and none outside a side wall.
- [ ] Every shot has something moving in it, and a `note` that says why this picture for these words.
- [ ] Nobody's head, arm or prop is between the lens and the face the shot is about.
- [ ] Every sign that changes size does it because somebody moved, by the film's one rule.
- [ ] Every face is above the caption line, and every word in the picture can be read at phone size.
- [ ] In every night shot the face the shot is about is lit.
