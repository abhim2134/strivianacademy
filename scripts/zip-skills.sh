#!/bin/sh
# Rebuild content/skills/<name>.zip from each skill folder. Run after editing a skill: npm run zip-skills
set -eu
cd "$(dirname "$0")/../content/skills"
for d in */; do
  name=${d%/}
  rm -f "$name.zip"
  zip -qr -X "$name.zip" "$name" -x "*.DS_Store"
  echo "built $name.zip"
done
