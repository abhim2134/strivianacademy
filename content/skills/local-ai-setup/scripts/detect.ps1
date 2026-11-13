# Hardware check for Windows. Prints one JSON object, changes nothing.
# Run with: powershell -ExecutionPolicy Bypass -File detect.ps1
$ErrorActionPreference = 'SilentlyContinue'

$cs = Get-CimInstance Win32_ComputerSystem
$cpu = (Get-CimInstance Win32_Processor | Select-Object -First 1).Name
$ramGb = [math]::Round($cs.TotalPhysicalMemory / 1GB, 1)

$gpu = 'none'
$vramGb = 0

# NVIDIA: nvidia-smi reports the real VRAM (MiB).
$smi = Get-Command nvidia-smi -ErrorAction SilentlyContinue
if ($smi) {
  $mib = & nvidia-smi --query-gpu=memory.total --format=csv,noheader,nounits |
    ForEach-Object { [int]$_ } | Sort-Object | Select-Object -Last 1
  if ($mib) { $gpu = 'nvidia'; $vramGb = [math]::Round($mib / 1024, 1) }
}

# Otherwise read the display driver's 64-bit memory size from the registry.
# (Win32_VideoController.AdapterRAM is capped at 4 GB, so it is not used.)
if ($gpu -eq 'none') {
  $key = 'HKLM:\SYSTEM\ControlSet001\Control\Class\{4d36e968-e325-11ce-bfc1-08002be10318}\0*'
  foreach ($k in Get-ItemProperty -Path $key) {
    $bytes = $k.'HardwareInformation.qwMemorySize'
    if (-not $bytes) { continue }
    $gb = [math]::Round([double]$bytes / 1GB, 1)
    $name = "$($k.DriverDesc)"
    # Integrated Intel/AMD graphics report a small shared pool; treat under 2 GB as no usable GPU.
    if ($gb -ge 2 -and $gb -gt $vramGb) {
      $vramGb = $gb
      if ($name -match 'AMD|Radeon') { $gpu = 'amd' }
      elseif ($name -match 'NVIDIA|GeForce|RTX') { $gpu = 'nvidia' }
      elseif ($name -match 'Intel') { $gpu = 'intel' }
      else { $gpu = 'other' }
    }
  }
}

$drive = (Get-Item $env:USERPROFILE).PSDrive
$diskGb = [math]::Round($drive.Free / 1GB, 1)

$ollama = ''
$cmd = Get-Command ollama -ErrorAction SilentlyContinue
if ($cmd) { $ollama = (& ollama --version | Select-Object -First 1) }

[ordered]@{
  os = 'windows'
  arch = $env:PROCESSOR_ARCHITECTURE
  chip = $cpu
  ram_gb = $ramGb
  gpu = $gpu
  gpu_vram_gb = $vramGb
  unified_memory = $false
  disk_free_gb = $diskGb
  ollama = "$ollama"
} | ConvertTo-Json -Compress
