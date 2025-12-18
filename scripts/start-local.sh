#!/usr/bin/env bash
set -euo pipefail

# 啟動本地 Express 伺服器（背景執行）
# 使用方式: ./scripts/start-local.sh

PORT=${PORT:-3000}

echo "啟動伺服器 on http://localhost:${PORT} ..."
# 若需要保留 PID，可寫入 .server.pid
nohup node backend/server.js > ./server.log 2>&1 &
PID=$!
echo $PID > .server.pid
sleep 1
if kill -0 $PID >/dev/null 2>&1; then
  echo "伺服器已啟動 (PID=$PID)。日誌: ./server.log"
else
  echo "伺服器啟動失敗，檢查 ./server.log" >&2
  exit 1
fi
