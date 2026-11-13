#!/bin/sh
# Hardware check for macOS and Linux. Prints one JSON object, changes nothing.
# Fields: os, arch, chip, ram_gb, gpu, gpu_vram_gb, unified_memory, disk_free_gb, ollama
set -u

OS=$(uname -s)
ARCH=$(uname -m)
CHIP=""
RAM_GB=0
GPU="none"
VRAM_GB=0
UNIFIED=false

gb() { awk -v b="$1" 'BEGIN { printf "%.1f", b / 1073741824 }'; }

if [ "$OS" = "Darwin" ]; then
  OSNAME="macos"
  RAM_GB=$(gb "$(sysctl -n hw.memsize)")
  CHIP=$(sysctl -n machdep.cpu.brand_string 2>/dev/null)
  if [ "$ARCH" = "arm64" ]; then
    # Apple Silicon: the GPU shares the same memory as the CPU.
    GPU="apple"
    UNIFIED=true
  fi
  DISK_KB=$(df -k "$HOME" | awk 'NR==2 {print $4}')
else
  OSNAME="linux"
  RAM_GB=$(awk '/MemTotal/ { printf "%.1f", $2 / 1048576 }' /proc/meminfo)
  CHIP=$(awk -F': ' '/model name/ { print $2; exit }' /proc/cpuinfo 2>/dev/null)
  if [ -z "$CHIP" ] && command -v lscpu >/dev/null 2>&1; then
    CHIP=$(lscpu | awk -F': *' '/Model name/ { print $2; exit }')
  fi
  [ -n "$CHIP" ] && [ "$CHIP" != "-" ] || CHIP="$ARCH CPU"
  if command -v nvidia-smi >/dev/null 2>&1; then
    # Largest NVIDIA card, in MiB.
    MIB=$(nvidia-smi --query-gpu=memory.total --format=csv,noheader,nounits 2>/dev/null | sort -n | tail -1)
    if [ -n "$MIB" ]; then
      GPU="nvidia"
      VRAM_GB=$(awk -v m="$MIB" 'BEGIN { printf "%.1f", m / 1024 }')
    fi
  fi
  if [ "$GPU" = "none" ]; then
    # AMD cards report VRAM in sysfs (bytes).
    for f in /sys/class/drm/card*/device/mem_info_vram_total; do
      [ -r "$f" ] || continue
      B=$(cat "$f")
      V=$(gb "$B")
      if awk -v a="$V" -v b="$VRAM_GB" 'BEGIN { exit !(a > b) }'; then
        GPU="amd"
        VRAM_GB=$V
      fi
    done
  fi
  DISK_KB=$(df -k "$HOME" | awk 'NR==2 {print $4}')
fi

DISK_GB=$(awk -v k="$DISK_KB" 'BEGIN { printf "%.1f", k / 1048576 }')

OLLAMA=""
if command -v ollama >/dev/null 2>&1; then
  OLLAMA=$(ollama --version 2>/dev/null | head -1)
elif [ -x /Applications/Ollama.app/Contents/Resources/ollama ]; then
  OLLAMA="app installed, CLI not on PATH"
fi

# Escape double quotes in free-text fields.
esc() { printf '%s' "$1" | sed 's/"/\\"/g'; }

printf '{"os":"%s","arch":"%s","chip":"%s","ram_gb":%s,"gpu":"%s","gpu_vram_gb":%s,"unified_memory":%s,"disk_free_gb":%s,"ollama":"%s"}\n' \
  "$OSNAME" "$ARCH" "$(esc "$CHIP")" "$RAM_GB" "$GPU" "$VRAM_GB" "$UNIFIED" "$DISK_GB" "$(esc "$OLLAMA")"
