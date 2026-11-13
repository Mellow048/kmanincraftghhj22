import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { checkStoryEnding } from "./check-story-film.mjs";

const topic = JSON.parse(fs.readFileSync(new URL("../Topics/InThisTown/topic.json", import.meta.url), "utf8"));
const check = (slug, lastLine) => checkStoryEnding({
  lastLine,
  contains: topic.film.lastLineContains,
  override: topic.endingOverrides?.[slug],
});

test("the owner-directed Freeze Bell ending is exact and logged", () => {
  const result = check("in-this-town-freeze-bell", "And I saw...");
  assert.equal(result.error, undefined);
  assert.match(result.note, /owner-requested ending/);
});

test("the override cannot silently permit an arbitrary cliffhanger or old CTA", () => {
  for (const text of ["I saw something else.", "And I saw a dragon.", "Subscribe before I get caught.", ""]) {
    assert.match(check("in-this-town-freeze-bell", text).error, /must be exactly/);
  }
});

test("other films still require their normal subscribe line", () => {
  for (const slug of ["in-this-town-same-face", "in-this-town-monster-egg", "a-new-story"]) {
    assert.match(check(slug, "And I saw...").error, /subscribe/);
    assert.equal(check(slug, "Subscribe for more.").error, undefined);
  }
});

test("an empty exception or missing owner reason is not a blanket waiver", () => {
  for (const override of [null, false, {}, { exactLine: "" }, { exactLine: "And I saw..." }, { exactLine: "And I saw...", reason: " " }]) {
    const result = checkStoryEnding({ lastLine: "And I saw...", contains: "subscribe", override });
    assert.match(result.error, /requires a nonempty exactLine/);
  }
});

test("the existing default matching remains case insensitive", () => {
  assert.deepEqual(checkStoryEnding({ lastLine: "SUBSCRIBE before I wave back.", contains: "subscribe" }), {});
});

test("the named ending exception leaves all length, pace, caption and sound rules in place", () => {
  assert.equal(topic.film.hardMaxSeconds, 180);
  assert.equal(topic.film.hardMinSeconds, 60);
  assert.equal(topic.film.hardMinWords, 250);
  assert.equal(topic.film.lastLineContains, "subscribe");
  assert.equal(topic.film.captions, true);
  assert.equal(topic.sound.required, true);
  assert.deepEqual(Object.keys(topic.endingOverrides), ["in-this-town-freeze-bell", "in-this-town-five-seconds"]);
});

test("the separately approved prince ending is exact, scoped, and not a sequel waiver", () => {
  assert.equal(check("in-this-town-five-seconds", '\"The prince of our village.\"').error, undefined);
  for (const ending of ["And I saw...", "Subscribe for part two.", "The king of our village.", ""]) {
    assert.match(check("in-this-town-five-seconds", ending).error, /must be exactly/);
  }
  assert.match(check("a-new-story", '\"The prince of our village.\"').error, /subscribe/);
});
