#!/bin/sh
# Call the local model through Ollama's API, the same way an app or automation would.
# Usage: sh api-demo.sh <model> ["prompt"]
set -eu
MODEL=${1:?usage: api-demo.sh <model> [prompt]}
PROMPT=${2:-"Write a one-line subject for an email reminding a client their invoice is 7 days overdue."}
# Escape backslashes and double quotes for JSON.
P=$(printf '%s' "$PROMPT" | sed 's/\\/\\\\/g; s/"/\\"/g')
curl -s http://localhost:11434/api/chat -d "{
  \"model\": \"$MODEL\",
  \"messages\": [{\"role\": \"user\", \"content\": \"$P\"}],
  \"stream\": false,
  \"think\": false
}"
echo
