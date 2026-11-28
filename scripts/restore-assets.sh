#!/usr/bin/env bash
# Restore media excluded from this code-only mirror.
#
#   bash scripts/restore-assets.sh                 # audio only
#   bash scripts/restore-assets.sh --with-references
#   bash scripts/restore-assets.sh --force         # refresh existing audio
#
# Assets come from the public source repository. Nothing is deleted locally.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="${ASSET_REPO:-https://github.com/Mellow048/kmanincraftghhj22.git}"
BRANCH="${ASSET_BRANCH:-main}"

WITH_REFERENCES=0
FORCE=0
for arg in "$@"; do
  case "$arg" in
    --with-references) WITH_REFERENCES=1 ;;
    --force) FORCE=1 ;;
    *) echo "Unknown option: $arg" >&2; exit 2 ;;
  esac
done

if [[ "$FORCE" -eq 0 ]]; then
  existing="$(find "$ROOT/public/audio" -type f \( -name '*.mp3' -o -name '*.wav' -o -name '*.m4a' \) -print -quit 2>/dev/null || true)"
  if [[ -n "$existing" ]]; then
    echo "Audio already present in public/audio; use --force to refresh."
    exit 0
  fi
fi

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "Cloning media from $SRC ($BRANCH)..."
git clone --depth 1 --filter=blob:none --sparse --branch "$BRANCH" "$SRC" "$TMP/assets"

SPARSE_PATHS=(public/audio)
if [[ "$WITH_REFERENCES" -eq 1 ]]; then
  SPARSE_PATHS+=(
    Topics/InThisTown/reference
    Topics/ServerLore/reference
    Topics/Explainer/reference
  )
fi

git -C "$TMP/assets" sparse-checkout set "${SPARSE_PATHS[@]}"

mkdir -p "$ROOT/public"
rsync -a --ignore-existing "$TMP/assets/public/audio/" "$ROOT/public/audio/"

# Topic-level music lives outside public/audio. Fetch just these blobs instead of
# checking out the whole Topics tree (which also contains reference films).
restore_file() {
  local rel="$1"
  if [[ -f "$ROOT/$rel" && "$FORCE" -eq 0 ]]; then
    return
  fi
  mkdir -p "$ROOT/$(dirname "$rel")"
  git -C "$TMP/assets" show "HEAD:$rel" > "$ROOT/$rel"
}
restore_file Topics/InThisTown/InThisTownMusic.aac
restore_file Topics/ServerLore/up_happy.m4a
restore_file Topics/ServerLore/up_sad.m4a
restore_file Topics/Explainer/explainer_bgm_loop.wav

if [[ "$WITH_REFERENCES" -eq 1 ]]; then
  for topic in InThisTown ServerLore Explainer; do
    if [[ -d "$TMP/assets/Topics/$topic/reference" ]]; then
      mkdir -p "$ROOT/Topics/$topic/reference"
      rsync -a --ignore-existing "$TMP/assets/Topics/$topic/reference/" "$ROOT/Topics/$topic/reference/"
    fi
  done
fi

echo "Restored audio: $(du -sh "$ROOT/public/audio" | cut -f1)"
if [[ "$WITH_REFERENCES" -eq 1 ]]; then
  echo "Restored reference films for InThisTown, ServerLore, and Explainer."
fi
