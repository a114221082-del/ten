#!/usr/bin/env bash
set -euo pipefail

# 自動化部署到 Vercel（需安裝 vercel CLI 且已登入）
# 使用方式: ./scripts/deploy_vercel.sh

if ! command -v vercel >/dev/null 2>&1; then
  echo "vercel CLI 未安裝，請先執行: npm i -g vercel"
  exit 1
fi

echo "開始 Vercel 部署流程..."

# 建議先登入（若還未登入）
if ! vercel whoami >/dev/null 2>&1; then
  echo "請先登入 Vercel： vercel login"
  vercel login
fi

# 嘗試 link 專案（如果尚未 link）
set +e
vercel link --yes
set -e

# 執行正式部署
vercel --prod

echo "部署完成。請在 Vercel 控制台確認部署狀態。"
