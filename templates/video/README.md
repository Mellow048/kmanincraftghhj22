# Video template

`npm run new -- "The Title"` copies every `.tsx` file in this folder into
`src/videos/the-title/` and replaces:

| Token | Replaced with |
|---|---|
| `__TITLE__` | the human title |
| `__ID__` | the kebab-case slug |
| `__SLUG__` | the kebab-case slug |
| `__CAMEL__` | the registry import alias |

The template is a working night-ward set, not a blockout. Keep the structure:

- `world.tsx` — the set, lights, atmosphere and the `MARKS` registry. Put every
  actor position and camera target on a named mark so scenes never retype
  coordinates.
- `actors.tsx` — shared cast defaults.
- `scene1.tsx` — one beat, one shot list, one performance.
- `film.tsx` — metadata and scene order.

Then read `AGENTS.md`, `docs/CAMERA-BIBLE.md`, `docs/STYLE.md` and
`docs/SCENE-CONTRACT.md` before adding scenes.

Do not render on the user's laptop without explicit permission.
