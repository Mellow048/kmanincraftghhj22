"""Contract tests for the voice clock. No speech service, ffmpeg or Python packages needed."""
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
import narration as n


class Alignment(unittest.TestCase):
    words = ['a', 'red', 'flower']
    found = [('a', 0, .1), ('red', .2, .45), ('flower', .55, .9)]

    def test_exact(self):
        guessed = []
        self.assertEqual(n.match_spans(self.words, self.found, 1, strict=True, interpolated=guessed),
                         [(0, .1), (.2, .45), (.55, .9)])
        self.assertEqual(guessed, [])

    def test_missing_word_is_not_aligned(self):
        gap = [self.found[0], self.found[2]]
        self.assertIsNone(n.match_spans(self.words, gap, 1, strict=True))
        guessed = []
        spans = n.match_spans(self.words, gap, 1, interpolated=guessed)
        self.assertEqual(spans, [(0, .1), (.1, .55), (.55, .9)])
        self.assertEqual(guessed, ['red'])
        self.assertIsNone(n.match_spans(self.words, [], 1))
        self.assertIsNone(n.match_spans(['one'], [], 1))  # no neighbours: all guesswork

    def test_no_nonpositive_or_impossible_spans(self):
        for found in ([('a', 0, -.1)], [('a', .2, .2)], [('a', 0, .3), ('flower', .3, .7)],
                      [('a', .4, .5), ('red', .35, .42), ('flower', .6, .8)]):
            self.assertIsNone(n.match_spans(self.words, found, 1))

    def test_assembled_chant_clock(self):
        with tempfile.TemporaryDirectory() as tmp:
            raw = str(Path(tmp, 'chant.wav'))
            clock = Path(tmp, 'chant.words.json')
            clock.write_text('[[0.25, 0.5], [0.75, 1.0]]')
            self.assertEqual(n.assembled_spans(raw, 2, 1.25), [(.25, .5), (.75, 1.)])
            self.assertIsNone(n.assembled_spans(raw, 3, 1.25))
            self.assertIsNone(n.assembled_spans(raw, 2, .875))
            clock.write_text('[[0, 0.2], [0.1, 0.3]]')
            self.assertIsNone(n.assembled_spans(raw, 2, 1))

    def test_strict_refusal_leaves_both_outputs_alone(self):
        with tempfile.TemporaryDirectory() as tmp, patch.object(n, 'ROOT', tmp):
            film = Path(tmp, 'src/videos/test'); film.mkdir(parents=True)
            audio = Path(tmp, 'public/audio/test'); (audio / 'raw').mkdir(parents=True)
            (film / 'narration.md').write_text('```narration\n# clip hook\n[1.me] A red flower.\n```')
            (audio / 'raw/hook.wav').touch()
            outputs = [film / 'timing.json', audio / 'narration.mp3']
            for p in outputs:
                p.write_bytes(b'previous delivery')
            # Only the external decoding/aligner is stubbed; exercise the actual build's failure path.
            with patch.object(n, 'np', object()), patch.object(n, 'decode', return_value=[0] * 100), \
                 patch.object(n, 'speech_span', return_value=(0, 100)), patch.object(n, 'align', return_value=None) as align:
                with self.assertRaisesRegex(SystemExit, 'hook: words could not all be aligned'):
                    n.build('test', 255, '1', .08, False, 30, .5, .06, require_alignment=True)
                self.assertTrue(align.call_args.kwargs['strict'])
            with self.assertRaisesRegex(SystemExit, '--estimate is a draft'):
                n.build('test', 255, '1', .08, True, 30, .5, .06, require_alignment=True)
            for p in outputs:
                self.assertEqual(p.read_bytes(), b'previous delivery')


if __name__ == '__main__':
    unittest.main()
