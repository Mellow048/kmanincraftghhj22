#!/usr/bin/env python3
"""Regression tests for supplied-track locks and ambience-only stop gates.

Uses temporary fixtures and in-memory signals; never rebuilds a delivered mix.
Run: python3 -m unittest discover -s scripts -p 'test_sound_inputs.py' -v
"""
from copy import deepcopy
import hashlib
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

import numpy as np

spec = importlib.util.spec_from_file_location("sound_inputs_test_subject", Path(__file__).with_name("sound.py"))
sound = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sound)


class TrackLocks(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.root_patch = patch.object(sound, "ROOT", str(self.root))
        self.root_patch.start()
        self.addCleanup(self.root_patch.stop)
        self.p = sound.paths("fixture")
        Path(self.p["video"]).mkdir(parents=True)
        Path(self.p["voice"]).parent.mkdir(parents=True)
        self.raw = {"music": {"track": "score.aac"}}
        self.track = self.root / "score.aac"
        self.track.write_bytes(b"original supplied bytes")
        Path(self.p["timing"]).write_text('{"duration": 6}\n')
        Path(self.p["sheet"]).write_text(json.dumps(self.raw))
        Path(self.p["voice"]).write_bytes(b"approved original narration")
        Path(self.p["mix"]).write_bytes(b"approved mixed audio")
        self.lock = {
            "tool": "scripts/sound.py v2",
            "built_from": {
                "timing.json": sound.text_hash(self.p["timing"]),
                "sound.json": sound.text_hash(self.p["sheet"]),
                "narration.mp3": sound.file_hash(self.p["voice"]),
            },
            "music_track": sound.track_fingerprint(self.raw),
            "mix_sha1": sound.file_hash(self.p["mix"]),
        }
        self.write_lock()

    def write_lock(self):
        Path(self.p["lock"]).write_text(json.dumps(self.lock))

    def test_unchanged_inputs_are_current(self):
        self.assertEqual(sound.stale(self.p), [])
        self.assertEqual(self.lock["music_track"], {
            "path": "score.aac",
            "sha256": hashlib.sha256(self.track.read_bytes()).hexdigest(),
        })

    def test_same_path_changed_bytes_are_stale(self):
        self.track.write_bytes(b"a different score at the same path")
        self.assertTrue(any("music.track bytes changed" in x for x in sound.stale(self.p)))

    def test_missing_input_fails_instead_of_substituting_music(self):
        self.track.unlink()
        with self.assertRaisesRegex(ValueError, "no file"):
            sound.track_fingerprint(self.raw)
        self.assertTrue(any("music.track: no file" in x for x in sound.stale(self.p)))

    def test_v2_cannot_omit_digest(self):
        del self.lock["music_track"]
        self.write_lock()
        self.assertTrue(any("not hashed" in x for x in sound.stale(self.p)))

    def test_legacy_v1_is_preserved_not_recertified(self):
        self.lock["tool"] = "scripts/sound.py v1"
        del self.lock["music_track"]
        self.write_lock()
        self.track.write_bytes(b"legacy track was never fingerprinted")
        self.assertEqual(sound.stale(self.p), [])
        # If a v1 lock does supply a digest, it must be respected.
        self.lock["music_track"] = {"path": "score.aac", "sha256": "wrong"}
        self.write_lock()
        self.assertTrue(any("music.track bytes changed" in x for x in sound.stale(self.p)))

    def test_procedural_music_has_no_file_fingerprint(self):
        self.assertIsNone(sound.track_fingerprint({"music": {"gain": -18}}))

    def test_changed_mix_or_narration_is_stale(self):
        Path(self.p["mix"]).write_bytes(b"wrong mix")
        Path(self.p["voice"]).write_bytes(b"wrong narrator")
        issues = sound.stale(self.p)
        self.assertTrue(any("mix.mp3 is not" in x for x in issues))
        self.assertTrue(any("narration.mp3 changed" in x for x in issues))


class AmbienceStops(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.clock = sound.Clock({
            "cues": [{"id": "1.open", "start": 0, "end": 6, "text": "A six second fixture."}],
            "words": [], "duration": 6,
        })
        cls.sheet = {
            "music": {"track": "fixture.aac", "gain": -18, "duck": 0},
            "sections": [{"from": "1.open", "mood": "town", "t": 0}],
            "beds": [{"bed": "room", "t": 0, "end": 6}],
            "sfx": [{"sfx": "tick", "cue": "1.open", "t": 2, "i": 0, "n": 0}],
            "raw": {},
        }
        cls.vox = {"level": 0.05, "peak": 0.5, "speaking": np.ones(300, dtype=bool)}
        t = np.arange(sound.n_of(6)) / sound.SR
        cls.recorded = np.stack([np.sin(2*np.pi*330*t), np.sin(2*np.pi*440*t)], axis=1) * 0.005

    def render(self, mutes=None):
        sheet = deepcopy(self.sheet)
        if mutes is not None:
            sheet["raw"]["bedMutes"] = mutes
        # The track renderer's output is deterministic. A procedural mood being
        # evaluated at all is a regression, even if its output is later replaced.
        with patch.object(sound, "track_music", return_value=self.recorded.copy()) as track, \
             patch.dict(sound.MOODS["town"], {"fn": unittest.mock.Mock(side_effect=AssertionError("procedural substitution"))}):
            result = sound.render("stop-fixture", self.clock, sheet, self.vox)
            track.assert_called_once()
            return result

    def test_exact_five_second_gate_only_changes_ambience(self):
        music, beds, effects, placed = self.render()
        m, b, e, p = self.render([{"cue": "1.open", "at": 0.5, "dur": 5}])
        a, z = round(0.5 * sound.SR), round(5.5 * sound.SR)
        fade = round(0.008 * sound.SR)
        self.assertEqual(z - a, 5 * sound.SR)
        self.assertTrue(np.any(beds[a:z] != 0))
        self.assertTrue(np.all(b[a:z] == 0))
        np.testing.assert_array_equal(m, music)
        np.testing.assert_array_equal(e, effects)
        self.assertEqual(p, placed)
        self.assertGreater(np.abs(e[a:z]).max(), 0)
        np.testing.assert_array_equal(b[:a-fade], beds[:a-fade])
        np.testing.assert_array_equal(b[z+fade:], beds[z+fade:])
        np.testing.assert_allclose(b[a-fade:a], beds[a-fade:a] * np.linspace(1, 0, fade)[:, None])
        np.testing.assert_allclose(b[z:z+fade], beds[z:z+fade] * np.linspace(0, 1, fade)[:, None])

    def test_invalid_durations_are_rejected(self):
        for duration in (0, -1, float("nan"), float("inf")):
            with self.subTest(duration=duration), self.assertRaisesRegex(sound.SheetError, "positive seconds"):
                self.render([{"cue": "1.open", "at": 0.5, "dur": duration}])

    def test_nonintersecting_gate_is_rejected(self):
        for start in (-2, 7):
            with self.subTest(start=start), self.assertRaisesRegex(sound.SheetError, "intersect the film"):
                self.render([{"cue": "1.open", "at": start, "dur": 1}])

    def test_partial_intersection_is_clipped_without_wrapping(self):
        _, baseline, _, _ = self.render()
        _, b, _, _ = self.render([{"cue": "1.open", "at": -0.5, "dur": 1}])
        self.assertTrue(np.all(b[:round(0.5*sound.SR)] == 0))
        np.testing.assert_array_equal(b[sound.SR:], baseline[sound.SR:])


if __name__ == "__main__":
    unittest.main()
