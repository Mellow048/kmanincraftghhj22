/**
 * THE "WHAT IF" PACK — everything a film of this topic is built from.
 * PACK.md is the catalogue, with a picture of each part.
 *
 *   import { Classroom, Overhead, Echo, Classmate, wordClock } from "../../../Topics/WhatIf";
 *
 * A film's kit.tsx imports from here and passes the names on, so its scenes import only from "./kit".
 */
export * from "./school";
export * from "./powers";
export * from "./cast";
// Shared with the other topics: when a word is said, how a thing pops in, numbers and icons in cubes,
// a kid's bedroom, a village street, a speech bubble, and the red sign every film ends on.
// See Topics/Shared/index.ts.
export * from "../Shared";
