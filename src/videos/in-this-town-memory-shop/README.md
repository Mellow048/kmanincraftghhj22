# In This Town, Memories Were Money

The Memory Shop: a boy trades away his memories of his sister, then chooses her life over getting them back. The words in `narration.md` are the script the owner asked to hear and make into a film.

- **Cut:** 112.2 seconds, 61 shots, 14 scenes; 1080 × 1920 at 30 fps.
- **Voice:** the narrator selected in the session. The original six recordings are in `public/audio/in-this-town-memory-shop/raw/`; `narration.mp3` is their assembled, paced voice-only track. `timing.json` was aligned to all six clips.
- **Sound:** `sound.json` uses the owner's `Topics/InThisTown/InThisTownMusic.aac`, place-specific beds and 87 effects. `mix.mp3` is what the film plays. Sound was measured, not listened to by the agent.
- **Visual review:** all 61 shots were reviewed as stills, with additional early/late frames for the action and the two boats. The shop, river, family and factory are this film's own zones; shared approved assets and films were not changed.

The film is registered in `src/registry.ts`. `npm run typecheck && npm run check` verifies the story, timing, captions and sound. The `Render short` GitHub workflow renders the MP4 on GitHub machines rather than the owner's computer.
