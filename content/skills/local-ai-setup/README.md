# Local AI setup (free Claude skill)

Checks your computer (Mac, Windows or Linux), picks the best local AI model it can run, and sets it up with Ollama: install, download, context length, a speed test, and optionally Claude Code running on the local model.

## Install

Copy this `local-ai-setup` folder into your Claude skills folder:

- Claude Code: `~/.claude/skills/` (Windows: `%USERPROFILE%\.claude\skills\`)

Then ask Claude: "Set up local AI on my computer."

## What it does

1. Reads your hardware (RAM, GPU memory, free disk). Changes nothing.
2. Picks a model from `models.json` and tells you why.
3. Asks before installing anything, then installs Ollama with the official installer.
4. Downloads the model and sets the context length agents need.
5. Tests speed and checks the model fits fully in GPU memory.
6. Optional: connects Claude Code to the local model.

Models and sizes were checked on the date in `models.json`. New models come out often; edit that file to change the picks.
