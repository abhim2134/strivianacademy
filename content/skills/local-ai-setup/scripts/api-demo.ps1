# Call the local model through Ollama's API, the same way an app or automation would (Windows).
# Usage: powershell -ExecutionPolicy Bypass -File api-demo.ps1 <model> ["prompt"]
param(
  [Parameter(Mandatory = $true)][string]$Model,
  [string]$Prompt = 'Write a one-line subject for an email reminding a client their invoice is 7 days overdue.'
)
$ErrorActionPreference = 'Stop'
$body = @{
  model = $Model
  messages = @(@{ role = 'user'; content = $Prompt })
  stream = $false
  think = $false
} | ConvertTo-Json -Depth 5 -Compress
$bytes = [System.Text.Encoding]::UTF8.GetBytes($body)
$r = Invoke-RestMethod -Uri 'http://localhost:11434/api/chat' -Method Post -ContentType 'application/json; charset=utf-8' -Body $bytes -TimeoutSec 300
$r | ConvertTo-Json -Depth 5
