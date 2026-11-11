# In This Town — Minecraft underdog shorts

**One sentence:** In a town with one easy-to-understand rule, the kid who starts last discovers a strength nobody expected; the people who rejected them end up wanting to stand beside them.

This is a **topic kit inside ZackCraft Films**, not a second renderer. Films still use the root Remotion registry, `defineFilm`, one mounted 3D world, `defineScene`, and the director's contract in `AGENTS.md`. Everything in this topic is original Minecraft-shaped 3D geometry; do not import Roblox characters or assets.

## The formula

1. **Rule:** Name it in one ordinary sentence, and show it as a physical object or sign. Examples: a rank on a school board, a numbered egg, a key above a door.
2. **Underdog:** Put the weak lead and the strong leads *in the same frame*. A visual comparison is worth more than exposition.
3. **Rejection:** Make one person reject them. Do not spend the whole film humiliating a child.
4. **Discovery:** Their weakness does something specific and useful. Show what triggers it.
5. **Progression:** At least two distinct, visible steps between 1 and the final rank. Each step should cause a new action or solve a harder problem; changing a number alone is not a story.
6. **Reversal:** The people from step 3 now choose to help or stand beside the lead. It is about belonging, not merely winning.
7. **Button:** End on one image that pays off the first image. Do not explain the lesson.

For a 20-second film, compress these into **4–7 beats, at most five shots**, with one simple power mechanism and no tournament subplot. For a longer story, add challenges *between* discovery and reversal rather than adding new rules. Never jump from a powerless character straight to infinity.

## Visual grammar for this topic

- **Recurring geography:** a lived-in neighborhood street connects to a school entrance, hall and classroom. Keep it one physical world; do not teleport to a new map between scenes.
- **Ranks are diegetic:** numbers and labels belong on 3D signs, egg stands, a school scoreboard, or the creature itself. No HTML captions or fake 2D HUD.
- **Casting:** the hero and one contrasting rival/friend are leads; the sister and background students can be supporting silhouettes. If an extra starts talking, promote them to a lead.
- **Progression has a visual language:** small and dull → warm spark → visible size change → protective action → bright, unmistakable final form. Preserve the creature's face/colours so it reads as the *same* companion.
- **Performances stay grounded:** characters have feet on the floor and poses driven by scene time. Show the former rival turning toward the hero at the end instead of only changing a scoreboard.
- **Voice:** one first-person teller, one tense, 3–10 plain words per line. A muted viewer must still follow the egg, the rejection, the power, and the change of heart. See `docs/NARRATION-RULES.md`.
- **Production:** write a beat sheet before code, build the map once, copy exact camera end/target/FOV into the next scene, run `npm run typecheck && npm run check`, and review a few stills before the MP4. Rendering requires the user's permission; the reference MP4 was expressly requested.

## Reusable kit

- [`maps/`](maps/README.md): neighborhood with houses/cars; one connected school entrance, hall, classroom **and bathroom**. The bathroom module is also exported separately for other layouts. Use the named coordinates; do not redraw buildings in scene files.
- `creatures.tsx`: topic-specific, reusable egg, worm, dragon, phoenix, rank board and fire effect. It is shared by future InThisTown films, **not** duplicated inside one film folder.
- [`reference#1/`](reference%231/README.md): the worked example **In This Town, Everyone Gets a Monster Egg. Mine Was Broken.** It includes a beat sheet, a frozen copy of the source, audio, and the finished MP4. Its live implementation is registered at `src/videos/in-this-town-monster-egg/`.

## Start the next InThisTown short

1. Write a premise of the form: “In this town, X decides Y. Mine is Z.” Name one mechanism for the underdog's strength.
2. Copy the camera/beat discipline from `reference#1`, **not** its characters or script verbatim.
3. Scaffold via `npm run new -- "Your Title"`; replace the hospital template world with `NeighborhoodMap` and `SchoolMap` from `maps/`. The connected `SchoolMap` already mounts its restroom; use `RestroomMap` alone only in a new layout with a matching doorway.
4. Keep architecture in `world.tsx`/map components and performances in `sceneN.tsx`. The sample map is a starting place, not a license to leave an empty set.
5. Use `film.audioCues` for precisely timed, diegetic narration/SFX, or a single `film.audio` for a mixed track. Keep the video intelligible muted.
6. Run the checks. Render only when you have approval. Store a reference MP4 in your *own* reference folder when one is approved; do not commit `out/` or temporary stills.

The topic is intentionally independent of future folders such as `Topics/RichVsPoor`. Share the film engine; do not force every topic to share the same neighborhood or monsters.
