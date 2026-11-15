---
name: local-ai-setup
description: Set up and tour local AI on this computer (macOS, Windows or Linux) with Ollama, end to end. Checks the hardware, picks the best model it can run, installs and tests it, then shows what it can do - Claude Code on the local model, free web search through MCP (Exa by default, or any service with your own key), the desktop app, reading images, the local API for automations, and private file search. Use when the user wants to run AI locally, set up Ollama, find out which model their computer can run, or use Claude Code with a local model.
---

# Local AI setup

Take the user from nothing installed to a tested local model, then tour what it can do. Part A sets it up. Part B shows it off, one feature at a time. Keep messages short and plain; the user may not be technical, so say what each step does in one line before you run it.

## Ground rules

- **Ask before you change anything.** Reading the hardware is fine. Before installing software, downloading a model or changing settings, say what and how big, and wait for a yes.
- **Never open, read or index the user's own files.** Every demo uses the sample files that ship with this skill (`assets/`, `demo-notes/`). Only touch a folder of theirs if they name it and ask.
- **Never handle passwords.** If a step needs one, tell the user where to enter it themselves.
- **API keys only for web search, and only the user's own.** Prefer that they set the key as an environment variable themselves (B2). If they paste one into the chat, use it only in the setup command; never repeat it, print it, or write it into a file of your own.
- **This skill's folder** is `SKILL_DIR` below: the folder containing this file (usually `~/.claude/skills/local-ai-setup`).

## Platform notes

- **Windows:** Claude Code runs commands in Git Bash. Run `.ps1` files with `powershell.exe -NoProfile -ExecutionPolicy Bypass -File <path>`. Right after installing, `ollama` may not be on PATH in this session; use `"$LOCALAPPDATA/Programs/Ollama/ollama.exe"` until Claude Code restarts. To hand a Git Bash path to a Windows program, convert it with `cygpath -w <path>`.
- **macOS / Linux:** plain `sh` and `python3`.
- Below, `ollama` means the command, or that full path when it isn't on PATH yet.

---

## Part A: set it up

### A1. Check the computer

`sh "$SKILL_DIR/scripts/detect.sh"` on every OS (on Windows it hands off to `detect.ps1` itself). It prints one JSON line and changes nothing. If a value looks wrong (for example a gaming PC with no GPU), check by hand (`nvidia-smi`, Task Manager → Performance → GPU) before picking.

### A2. Pick the model

Memory budget, the memory the model can use:

| Detected | Budget |
|---|---|
| `unified_memory: true` (Apple Silicon) | `ram_gb × 0.67` up to 36 GB of RAM, `ram_gb × 0.75` above that |
| `gpu` is `nvidia` or `amd`, `gpu_vram_gb` ≥ 4 | `gpu_vram_gb` |
| anything else (Intel Mac, integrated graphics, no GPU) | CPU only: the `cpu_only` list by `ram_gb` |

Take the **first** tier in `models.json` whose `min_budget_gb` ≤ budget (that number already includes room for context). Check `disk_free_gb` ≥ `size_gb` + 5. Tell the user in 3-4 lines: what their computer has, the pick and its download size, what it's good for, and one alternative.

### A3. Install Ollama (skip if `ollama --version` works)

- **macOS / Linux:** `curl -fsSL https://ollama.com/install.sh | sh`
- **Windows:** `powershell.exe -NoProfile -Command "irm https://ollama.com/install.ps1 | iex"` (no admin needed; installs silently)

Then:
- **macOS:** the script installs the app, then tries to link the `ollama` command into `/usr/local/bin`, which can need a password. If it stops there, start the app with `open /Applications/Ollama.app --args hidden` (the full path: `open -a Ollama` can fail right after install, before macOS has registered the app). The app shows its own prompt to install the command-line tool: tell the user to accept it and enter their Mac password. Until then use `/Applications/Ollama.app/Contents/Resources/ollama`.
- **Linux:** the script needs `sudo`. If you can't enter a password, give the user the command to run in their own terminal and wait.
- **Windows:** if the server doesn't answer within a minute, start it with `"$LOCALAPPDATA/Programs/Ollama/ollama app.exe" &`.

Wait until `curl -s http://localhost:11434/api/version` answers.

### A4. Download the model

`ollama pull <model>`. Run it in the background for big downloads and give the user the size and rough progress.

### A5. Set the context length

Ollama's default context is small (4k below 24 GB of GPU memory), which makes agents look broken. Make a copy with the tier's context built in; this works the same on every OS and survives restarts:

```sh
printf 'FROM <model>\nPARAMETER num_ctx <context>\n' > Modelfile
ollama create <name> -f Modelfile && rm Modelfile
```

`<name>` = the model with `:` replaced by `-`, plus the context: `qwen3.5-9b-64k`, `qwen3.8-27b-64k`. Use this name from here on.

### A6. Test it

1. `ollama run <name> "In one sentence, what is 17 x 23?" --verbose --think=false` and read `eval rate` (tokens per second).
2. `ollama ps`: `PROCESSOR` should say `100% GPU` on GPU machines and `CONTEXT` should match. A CPU/GPU split means it doesn't fit: drop a tier or halve the context and test again.

Guide: 20+ tokens/s feels quick, 8-20 is usable, under 5 is slow. `ollama ps` SIZE is the real memory use; context can add a lot on some models (`models.json` → `measured`).

Then offer Part B: list B1-B6 in one line each and ask which to do (default: all, in order).

---

## Part B: what it can do

### B1. Claude Code on the local model

Only for `agent_ready` models with 64k context.

- Quick check you can run yourself: `ollama launch claude --model <name> --yes -- -p "Reply with just the word OK."`
- Warn first: the **first** reply is slow, because Claude Code sends about 27k tokens of instructions up front (about 2-3 minutes with Qwen3.5 9B on a 32 GB M1 Pro test machine). Later replies reuse them and are much faster.
- To use it for real, the user opens a new terminal and runs `ollama launch claude --model <name>`. That starts an interactive Claude Code session whose brain is the local model.

### B2. Give it hands

The model is the brain; tools let it act. Explain in one line each:

1. **Files and terminal:** built into Claude Code. Nothing to set up.
2. **Web search:** Claude Code's built-in web search runs on Anthropic's servers, so it doesn't work on a local model. A search service connected as an MCP server does. Tell the user plainly: the model stays on their computer, but **search queries go to the search service.**

   **Default: Exa, free, no account, no key.** Offer this first:
   ```sh
   claude mcp add --transport http --scope user exa https://mcp.exa.ai/mcp
   ```
   It gives the model `web_search_exa` (search) and `web_fetch_exa` (read a page). The keyless tier has a free rate limit Exa doesn't publish; fine for normal use. It needs an IPv4 connection: if searches fail with 403, add a free Exa key (below).

   **Bring your own key** (higher limits, or a service the user prefers). Ask which service, then get the key in one of two ways and let the user choose:
   - **Recommended: they set it themselves**, so it never appears in the chat. macOS/Linux: they add `export <VAR>=<key>` to their shell profile (`~/.zshrc` or `~/.bashrc`) and restart Claude Code. Windows: they run `setx <VAR> "<key>"` in their own terminal and restart Claude Code. Then the commands below read it with `$<VAR>`.
   - **Or they paste it here.** Say first that it will stay in this chat's history and be saved in Claude Code's MCP settings on this computer. Put it straight into the command; never repeat it back, print it, or save it anywhere else.

   | Service | Variable | Command |
   |---|---|---|
   | Exa (free key: $10/month credits, no card) | `EXA_API_KEY` | `claude mcp add --transport http --scope user exa https://mcp.exa.ai/mcp --header "x-api-key: $EXA_API_KEY"` |
   | Tavily (1,000 free credits/month, no card) | `TAVILY_API_KEY` | `claude mcp add --transport http --scope user tavily "https://mcp.tavily.com/mcp/?tavilyApiKey=$TAVILY_API_KEY"` |
   | Firecrawl (1,000 free credits/month; best for reading whole sites) | `FIRECRAWL_API_KEY` | `claude mcp add --transport http --scope user firecrawl https://mcp.firecrawl.dev/v2/mcp --header "Authorization: Bearer $FIRECRAWL_API_KEY"` |
   | Brave Search (needs a card; needs Node.js) | `BRAVE_API_KEY` | `claude mcp add --scope user brave-search -e BRAVE_API_KEY="$BRAVE_API_KEY" -- npx -y @brave/brave-search-mcp-server` |
   | Ollama web search (free Ollama account; needs `uv`) | `OLLAMA_API_KEY` | `claude mcp add --scope user ollama-web-search -e OLLAMA_API_KEY="$OLLAMA_API_KEY" -- uv run "$HOME/.local-ai-setup/web-search-mcp.py"`, after downloading the script with `mkdir -p ~/.local-ai-setup && curl -fsSL https://raw.githubusercontent.com/ollama/ollama-python/main/examples/web-search-mcp.py -o ~/.local-ai-setup/web-search-mcp.py` (Windows: pass the path through `cygpath -w`) |

   **Any other service** (Perplexity, SerpAPI, Jina...): ask the user for the link to its MCP setup page, read it, and add it the same way: an HTTP URL with a key header, or a local command with `-e <VAR>=...`.

   Replacing a server: `claude mcp remove <name> --scope user` first. Check it with `claude mcp get <name>` (should say Connected), then test: the user runs `ollama launch claude --model <name>` in a new terminal and asks something current, like "Search the web for this week's top AI news and summarize it."
3. **Other MCP servers** (GitHub, Notion, Google Sheets...) plug in the same way with `claude mcp add`. `claude mcp list` shows what's connected.

### B3. Desktop app

- **macOS:** `open /Applications/Ollama.app`. **Windows:** `"$LOCALAPPDATA/Programs/Ollama/ollama app.exe" &`. Both open Ollama's chat window: pick `<name>` in the model menu and chat like ChatGPT, fully offline. Its settings also have a context-length slider.
- **Linux:** Ollama has no desktop app; say so, and skip unless the user wants a browser UI (Open WebUI, which needs Docker).

### B4. Show it an image

Models in `models.json` read images. Use the sample chart, never a screenshot of the user's screen:

`ollama run <name> "$SKILL_DIR/assets/sample-chart.png" "What does this chart show, and which month stands out?" --think=false`

(On Windows pass the path through `cygpath -w`.) The chart shows coffee-shop sales rising from 820 cups in January to 1,420 in June, with June highlighted, so you can check the answer.

### B5. The local API (for apps and automations)

Ollama serves an API at `http://localhost:11434` that scripts, n8n, Zapier-style tools and your own apps can call like any AI API, for free.

- macOS / Linux: `sh "$SKILL_DIR/scripts/api-demo.sh" <name>`
- Windows: `powershell.exe -NoProfile -ExecutionPolicy Bypass -File "$(cygpath -w "$SKILL_DIR/scripts/api-demo.ps1")" <name>`

Point out the answer in the JSON's `message.content`. There's also an OpenAI-compatible endpoint at `http://localhost:11434/v1` for tools that expect OpenAI's format.

### B6. Private file search

Search notes by meaning, fully offline. **Demo on the sample notes only.**

1. `ollama pull embeddinggemma` (622 MB).
2. Copy the samples into a fresh folder in the current directory: `cp -R "$SKILL_DIR/demo-notes" ./local-ai-demo`
3. Search:
   - macOS / Linux: `python3 "$SKILL_DIR/scripts/search.py" ./local-ai-demo "Which client was worried about customers missing pickups?"`
   - Windows: `powershell.exe -NoProfile -ExecutionPolicy Bypass -File "$(cygpath -w "$SKILL_DIR/scripts/search.ps1")" "$(cygpath -w ./local-ai-demo)" "Which client was worried about customers missing pickups?"`

The bakery note should rank first even though it never says "worried" or "missing". Then mention they can point the same script at a folder of their own notes whenever they choose. Don't do it for them unless they name the folder.

---

## Report

End with a short card: computer, model + size, context, measured speed, GPU fit, which Part B steps are set up, and the commands they'll use most (`ollama run <name>`, `ollama launch claude --model <name>`). Add one line on removing it.

## Removing it

- **macOS:** quit Ollama, then delete `/Applications/Ollama.app`, `~/.ollama` (models), `~/Library/Application Support/Ollama`, `~/Library/Saved Application State/com.electron.ollama.savedState`, `~/Library/Caches/com.electron.ollama`, `~/Library/Caches/ollama`, `~/Library/WebKit/com.electron.ollama`. The user removes `/usr/local/bin/ollama` with `sudo rm` (it's owned by the system).
- **Windows:** Settings → Apps → Ollama → Uninstall; models are in `%USERPROFILE%\.ollama`.
- **Linux:** see https://docs.ollama.com/linux#uninstall
- Web search: `claude mcp remove <name> --scope user` (for example `exa`); if Ollama search was set up, also delete `~/.local-ai-setup`.
- One model: `ollama rm <name>`.
