# Cast template — two leads and one reusable extra

`npm run new` copies `characters.tsx` into every new film. Change `DUO` at the
top of that file to recast the whole film.

The template gives you three people:

- **Lead A** — wants something.
- **Lead B** — wants something that gets in the way.
- **Extra** — the world around them. Same face and body, different skin, hair
  and clothes. Repeat it as often as the scene needs.

---

## 1. The duo is the story

A 20-second short cannot carry a crowd. It carries two people who want
different things and stand in each other's way.

The starter duos:

| `DUO` | Lead A | Lead B | The gap |
|---|---|---|---|
| `noobVsPro` | Has nothing. Trusts everyone. | Has everything. Trusts no one. | One wants to be picked; one wants to win. |
| `richVsPoor` | Owns the room. | Cleans the room. | One wants to be obeyed; one wants to be paid. |
| `bullyVsNerd` | Takes up space. | Makes himself small. | One wants someone to hit; one wants to be left alone. |

These are starting points, not the only duos. Copy a preset in `DUOS` and
change the six fields. Add a `tagline` a 9-year-old would understand. If you
cannot say the duo in one line, it is not a duo yet.

---

## 2. Make them contrast

Do not cast two leads who look the same. Contrast at least three:

- **Want** — one wants in, one wants out.
- **Status** — one owns the space, one is a guest.
- **Silhouette** — one is bigger, one is smaller; one is still, one moves.
- **Palette** — one warm, one cold; one dark, one light.
- **Posture** — one leans, one stands straight.

Cover the faces. If the two leads still look interchangeable, recast them.
The audience should know who is who from the first frame.

---

## 3. The extra is the world

`Extra` keeps the same face map and body as the leads. You change the paint:

```tsx
<Extra position={[0, 0, 2.4]} skin="#8d5a3b" hair="#1a1a1a" outfit="pajamas" />
<Extra position={[-1.1, 0, 3.8]} skin="#f0c9a0" hair="#c28b4a" outfit="tee" />
```

Use extras for:

- a crowd in a hallway;
- a second patient in a ward;
- students in the back of a class;
- the same background role in two scenes.

Never give an extra a want, a close-up or a line. If an extra starts to matter,
promote them to a lead and recast the duo.

---

## 4. Blocking

- Put the two leads on opposite sides of the frame, or one higher and one
  lower.
- Give the stronger character the stiller body. The weaker one moves more.
- Keep the extra behind the leads, never between the camera and their faces.
- Keep the duo in one continuous world. The camera does not teleport between
  them.
- Shoot the pair in the same light. Contrast comes from them, not from two
  different lighting setups.

---

## 5. Usage

```tsx
import { LeadA, LeadB, Extra } from "./characters";

export const Scene = () => (
  <>
    <LeadA position={[-0.6, 0, 0]} rotationY={0.4} animation="idle" face="worried" />
    <LeadB position={[0.7, 0, 0.3]} rotationY={-0.5} animation="idle" face="smug" />
    <Extra position={[0.1, 0, 2.8]} skin="#8d5a3b" hair="#1a1a1a" outfit="pajamas" />
  </>
);
```

For a one-off character, use `Character` with a custom look:

```tsx
<Character
  look={{ ...CAST.a, skin: "#6b4a33", hair: "#111111", outfit: "suit" }}
  position={[0, 0, 1]}
/>
```

---

## 6. The casting checklist

- [ ] Two leads, one story.
- [ ] The leads contrast in at least three ways.
- [ ] Each lead has a want that the other blocks.
- [ ] The extra has no want, no close-up and no line.
- [ ] The extra looks like the same world, not a different art style.
- [ ] You can describe the duo in one plain sentence.
- [ ] You can tell the leads apart with the sound off.
