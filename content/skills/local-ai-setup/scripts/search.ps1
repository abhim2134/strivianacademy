# Private file search with a local embedding model (Windows).
# Usage: powershell -ExecutionPolicy Bypass -File search.ps1 <folder> "<question>" [embedding_model]
# Embeds every .md/.txt file in <folder> with Ollama, then ranks them against the
# question. Nothing leaves the computer. Built-in PowerShell only.
param(
  [Parameter(Mandatory = $true)][string]$Folder,
  [Parameter(Mandatory = $true)][string]$Question,
  [string]$Model = 'embeddinggemma'
)
$ErrorActionPreference = 'Stop'
$api = 'http://localhost:11434/api/embed'

function Get-Embeddings([string[]]$Texts) {
  $body = @{ model = $Model; input = $Texts } | ConvertTo-Json -Depth 4 -Compress
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($body)
  $r = Invoke-RestMethod -Uri $api -Method Post -ContentType 'application/json; charset=utf-8' -Body $bytes -TimeoutSec 300
  # The leading comma stops PowerShell from unrolling a one-item list of
  # vectors into the vector itself.
  return , $r.embeddings
}

$files = Get-ChildItem -Path $Folder -File |
  Where-Object { $_.Extension -in '.md', '.txt' -and $_.Name -ne 'README.md' } |
  Sort-Object Name
if (-not $files) { throw "no .md or .txt files in $Folder" }

$texts = @($files | ForEach-Object { [System.IO.File]::ReadAllText($_.FullName) })
$docVecs = Get-Embeddings $texts
$qVec = (Get-Embeddings @($Question))[0]

# Ollama returns unit-length vectors, so a dot product is the cosine similarity.
$results = for ($i = 0; $i -lt $files.Count; $i++) {
  $v = $docVecs[$i]; $s = 0.0
  for ($j = 0; $j -lt $qVec.Count; $j++) { $s += [double]$qVec[$j] * [double]$v[$j] }
  [pscustomobject]@{ Score = $s; File = $files[$i].Name }
}

"Question: $Question`n"
$results | Sort-Object Score -Descending | Select-Object -First 3 |
  ForEach-Object { '{0:N3}  {1}' -f $_.Score, $_.File }
