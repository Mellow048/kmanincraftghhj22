#!/bin/bash
# usage: .arena/still.sh <frame> <outname>
cd /home/user/kmanincraftghhj22
LD_LIBRARY_PATH=/tmp/al/lib npx remotion still src/index.ts in-this-town-my-family-stole-things "out/preview/$2.png" --frame=$1 --browser-executable=/tmp/chromium 2>&1 | tail -2
