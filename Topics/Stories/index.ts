/**
 * THE EXPLAINER PACK — everything a film of this topic is built from.
 * PACK.md is the catalogue, with a picture of each part.
 *
 *   import { Island, Coin, BarChart, flightScene, stop } from "../../../Topics/Explainer";
 *
 * A film's kit.tsx imports from here and passes the names on, so its scenes import only from "./kit".
 */
export * from "./flight";
export * from "./stage";
export * from "./money";
export * from "./charts";
export * from "./goods";
// Shared with the other topics: the film's clock, numbers and icons in cubes, twelve people, the villagers
// and their houses, a speech bubble, and the red sign every film ends on. See Topics/Shared/index.ts.
export * from "../Shared";
