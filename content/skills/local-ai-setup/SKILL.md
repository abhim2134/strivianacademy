---
name: local-ai-setup
description: Check this computer (macOS, Windows or Linux), pick the best local AI model it can run, and set it up with Ollama end to end - install, download, context length, speed test, and optionally Claude Code on the local model. Use when the user wants to run AI locally, set up Ollama, find out which model their computer can run, or use Claude Code with a local model.
---

# Local AI setup

Get the user from "nothing installed" to a local model that is tested and ready, in this order. Keep messages short and plain; the user may not be technical.

**Ask before you change anything.** Steps 1-2 only read. Before step 3, show what you will install and download (sizes included) and wait for a yes.

## 1. Check the computer

Run the detector from this skill's folder. It prints one JSON line and changes nothing.

- macOS / Linux: `sh scripts/detect.sh`
- Windows (PowerShell): `powershell -ExecutionPolicy Bypass -File scripts\detect.ps1`

If a value comes back empty or 0 when it shouldn't (for example a gaming PC reporting no GPU), check by hand (`nvidia-smi`, Task Manager → Performance → GPU) before you pick.

## 2. Pick the model

Work out the **memory budget**, the memory the model can use:

| Detected | Budget |
|---|---|
| `unified_memory: true` (Apple Silicon Mac) | `ram_gb × 0.67` up to 36 GB of RAM, `ram_gb × 0.75` above that (macOS keeps the rest for the system) |
| `gpu` is `nvidia` or `amd`, `gpu_vram_gb` ≥ 4 | `gpu_vram_gb` |
| anything else (Intel Mac, integrated graphics, no GPU) | CPU only: use the `cpu_only` list by `ram_gb` |

Then read `models.json` and take the **first** tier whose `min_budget_gb` ≤ budget. Also check `disk_free_gb` ≥ `size_gb` + 5; if not, drop a tier or tell the user how much space to free.

Tell the user, in 3-4 lines: what their computer has, the budget, the pick and its download size, what it is good for, and one alternative (the next tier down: faster, less capable). If the user wants to use Claude Code or another coding agent, the pick must be in `agent_ready`; if their budget can't fit one, say so plainly and suggest chat and automations instead.

## 3. Install Ollama (skip if `ollama` is already set)

Official installers only:

- **macOS / Linux:** `curl -fsSL https://ollama.com/install.sh | sh`
- **Windows (PowerShell, no admin needed):** `irm https://ollama.com/install.ps1 | iex`

Notes:
- **macOS:** the script puts `Ollama.app` in /Applications, then links the `ollama` command into `/usr/local/bin`. If that folder needs a password (`test -w /usr/local/bin` fails) and you can't enter one, the script stops at the link step after the app is already installed. Then start it with `open -a Ollama --args hidden`. On first launch the app shows its own prompt to install the command-line tool; tell the user to accept it and enter their Mac password, and `ollama` works from then on. Until then (or if they decline), use the full path `/Applications/Ollama.app/Contents/Resources/ollama`.
- **Linux:** the script uses `sudo` and sets up a systemd service. If you can't enter a password, give the user the command to run in their own terminal and wait.
- Needs macOS 14+, Windows 10 22H2+ (NVIDIA driver 551.61+), or a recent Linux with current GPU drivers.

Wait until the server answers: `curl -s http://localhost:11434/api/version` (Windows: `irm http://localhost:11434/api/version`).

## 4. Download the model

`ollama pull <model>`. Large downloads take a while: run it in the background, and give the user the size and a rough progress update instead of waiting silently.

## 5. Set the context length

Ollama's default context is small (4k below 24 GB of GPU memory), which makes agents look broken. Make a copy of the model with the tier's `context` built in. This works the same on every OS, survives restarts and needs no settings change:

```
FROM <model>
PARAMETER num_ctx <context>
```

Save that as a file named `Modelfile` in a temp folder, then `ollama create <name> -f Modelfile`, where `<name>` is the model with `:` replaced by `-` plus the context, e.g. `devstral-small-2-64k`, `qwen3.5-9b-32k`.

## 6. Test it

1. `ollama run <name> "In one sentence, what is 17 x 23?" --verbose` and read `eval rate` (tokens per second).
2. `ollama ps` while it is loaded: `PROCESSOR` should say `100% GPU` on GPU machines and `CONTEXT` should match. A CPU/GPU split means it doesn't fit: drop one tier, or halve the context, and test again.

Rough guide for the user: 20+ tokens/s feels quick, 8-20 is usable, under 5 is slow.

Context costs memory on top of the download: `ollama ps` SIZE is the real number. Qwen models add a few GB for 64k; others (Devstral, for example) can add ~10 GB. `models.json` → `measured` has real results from a 32 GB M1 Pro.

## 7. Optional: Claude Code on the local model

Only for `agent_ready` models with 64k context. Warn the user that the **first** reply is slow: Claude Code sends about 27k tokens of instructions up front (3 minutes with Qwen3.5 9B on a 32 GB M1 Pro). Later replies reuse that and come much faster.

- Easiest, interactive (the user runs it): `ollama launch claude`, then pick `<name>`.
- One-off check you can run yourself:
  `ANTHROPIC_AUTH_TOKEN=ollama ANTHROPIC_BASE_URL=http://localhost:11434 ANTHROPIC_API_KEY="" claude -p "Reply with OK" --model <name>`
  (PowerShell: set `$env:ANTHROPIC_AUTH_TOKEN="ollama"`, `$env:ANTHROPIC_BASE_URL="http://localhost:11434"`, `$env:ANTHROPIC_API_KEY=""` first.)

Claude Code's built-in web search runs on Anthropic's servers, so it won't work on a local model. For web search, Ollama has an MCP server (free Ollama account): https://docs.ollama.com/capabilities/web-search

## 8. Report

End with a short card: computer, model + size, context, measured speed, GPU fit, and the two commands they'll use most (`ollama run <name>`, and `ollama launch claude` if set up). Add one line on removing it (below).

## Removing it

- **macOS:** quit Ollama, then delete `/Applications/Ollama.app`, `/usr/local/bin/ollama` (if linked), `~/.ollama` (models), `~/Library/Application Support/Ollama`, `~/Library/Saved Application State/com.electron.ollama.savedState`, `~/Library/Caches/com.electron.ollama`, `~/Library/Caches/ollama`, `~/Library/WebKit/com.electron.ollama`.
- **Windows:** Settings → Apps → Ollama → Uninstall; models are in `%USERPROFILE%\.ollama`.
- **Linux:** see https://docs.ollama.com/linux#uninstall
- Just one model: `ollama rm <name>`.
