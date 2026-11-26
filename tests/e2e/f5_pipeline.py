#!/usr/bin/env python3
"""
Direct-run Python E2E pipeline tests for narration.py alignment & sound.py lock/hash contracts.
Invoke directly: `python3 tests/e2e/f5_pipeline.py` (never `python3 -m unittest tests/...`).
"""
import hashlib
import json
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))

import narration  # noqa: E402
import sound  # noqa: E402


class F5PipelineTests(unittest.TestCase):
    def test_narration_strict_alignment_and_interpolation_gate(self):
        words = ["in", "this", "town"]
        exact = [("in", 0.0, 0.2), ("this", 0.25, 0.5), ("town", 0.55, 0.9)]
        guessed = []
        self.assertEqual(
            narration.match_spans(words, exact, 1.0, strict=True, interpolated=guessed),
            [(0.0, 0.2), (0.25, 0.5), (0.55, 0.9)],
        )
        self.assertEqual(guessed, [])

        # Missing middle word must fail strict=True and be flagged if interpolated
        partial = [exact[0], exact[2]]
        self.assertIsNone(narration.match_spans(words, partial, 1.0, strict=True))
        interp_out = []
        spans = narration.match_spans(words, partial, 1.0, strict=False, interpolated=interp_out)
        self.assertIsNotNone(spans)
        self.assertEqual(interp_out, ["this"])

    def test_sound_text_and_file_hash_normalization(self):
        with tempfile.TemporaryDirectory() as tmp:
            lf = Path(tmp, "a.json")
            crlf = Path(tmp, "b.json")
            lf.write_bytes(b'{"a": 1}\n')
            crlf.write_bytes(b'{"a": 1}\r\n  \r\n')
            self.assertEqual(sound.text_hash(str(lf)), sound.text_hash(str(crlf)))

            bin_path = Path(tmp, "audio.bin")
            payload = b"\x00\x01\x02E2E_AUDIO"
            bin_path.write_bytes(payload)
            self.assertEqual(sound.file_hash(str(bin_path)), hashlib.sha1(payload).hexdigest())

    def test_sound_topic_music_multi_track_validation(self):
        with tempfile.TemporaryDirectory() as tmp:
            t_root = Path(tmp)
            topic_dir = t_root / "Topics" / "ServerLore"
            video_dir = t_root / "src" / "videos" / "test-lore"
            topic_dir.mkdir(parents=True)
            video_dir.mkdir(parents=True)
            (video_dir / "film.tsx").write_text('export const film = { topic: "server-lore" };\n', encoding="utf-8")
            (topic_dir / "up_happy.m4a").write_bytes(b"happy")
            (topic_dir / "up_sad.m4a").write_bytes(b"sad")
            (topic_dir / "topic.json").write_text(
                json.dumps(
                    {
                        "id": "server-lore",
                        "sound": {
                            "required": True,
                            "music": {
                                "file": "Topics/ServerLore/up_happy.m4a",
                                "extraFiles": ["Topics/ServerLore/up_sad.m4a"],
                                "gain": -14,
                                "minShare": 0.8,
                            },
                        },
                    }
                ),
                encoding="utf-8",
            )

            class FakeClock:
                duration = 10.0

            p = {"video": str(video_dir)}
            with patch.object(sound, "ROOT", str(t_root)):
                valid_sheet = {
                    "music": {"track": "Topics/ServerLore/up_happy.m4a"},
                    "sections": [
                        {"t": 0.0, "mood": "warm", "track": "Topics/ServerLore/up_happy.m4a"},
                        {"t": 4.0, "mood": "hollow", "track": "Topics/ServerLore/up_sad.m4a"},
                        {"t": 7.5, "mood": "none"},
                        {"t": 8.5, "mood": "triumph", "track": "Topics/ServerLore/up_happy.m4a"},
                    ],
                }
                self.assertEqual(sound.topic_music(p, "test-lore", FakeClock(), valid_sheet), [])

                bad_share = {
                    "music": {"track": "Topics/ServerLore/up_happy.m4a"},
                    "sections": [
                        {"t": 0.0, "mood": "warm"},
                        {"t": 2.0, "mood": "none"},
                    ],
                }
                errs = sound.topic_music(p, "test-lore", FakeClock(), bad_share)
                self.assertTrue(len(errs) > 0, "Expected minShare failure when track plays < 80%")


if __name__ == "__main__":
    suite = unittest.defaultTestLoader.loadTestsFromTestCase(F5PipelineTests)
    result = unittest.TextTestRunner(verbosity=2).run(suite)
    sys.exit(0 if result.wasSuccessful() else 1)
