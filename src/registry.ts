import { film as theSchedule } from "./videos/the-schedule/film";
import { film as theHallway } from "./videos/the-hallway/film";
import { film as monsterEgg } from "./videos/in-this-town-monster-egg/film";
import { film as sameFace } from "./videos/in-this-town-same-face/film";

/**
 * Every film in the project, registered for Remotion.
 * `npm run new -- "My Title"` appends to this list automatically.
 */
export const FILMS = [
  theSchedule,
  theHallway,
  monsterEgg,
  sameFace,
];
