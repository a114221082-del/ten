# Vercel 部署與 Node.js 啟動說明

此檔案說明如何以 Node.js + Vercel 將本專案部署為 Serverless/靜態站點，並提供 CLI 自動化腳本。

## 前提
- 已安裝 Node.js (16+)
- 已安裝 npm
- 本專案已包含 `api/`（Serverless functions）與 `public/`（靜態檔案）

## 本地測試
1. 安裝依賴
```bash
npm install
```
2. 本地啟動（Express 本機伺服器）
```bash
npm start
# 或使用腳本
./scripts/start-local.sh
```
3. 使用 Vercel 模擬環境（建議）
```bash
npm i -g vercel
vercel dev
```

## Vercel 部署步驟（手動）
1. 安裝並登入 Vercel CLI
```bash
npm i -g vercel
vercel login
```
2. 在專案目錄初始化或連結專案
```bash
vercel link   # 第一次會提示建立或選擇專案
```
3. 設定環境變數（在 Vercel Project Settings）
- `CORS_ORIGIN`
- `NODE_ENV` = production
- `AI_API_KEY`（若需）

4. 部署（production）
```bash
vercel --prod
```

## 自動化腳本
- `./scripts/deploy_vercel.sh`：自動執行 login/link/deploy（需互動式授權）
- `./scripts/start-local.sh`：在容器或本機啟動 Express 伺服器

## 注意事項
- 建議在 Vercel Project Settings 透過 UI 新增 secrets / Environment Variables，而不是在 `vercel.json` 中硬編。
- 若使用真實 AI 服務（OpenAI、Anthropic 等），請在 Vercel 中新增 `AI_API_KEY`。不要在 repo 中提交秘密。

---

需要我替您執行 `vercel --prod` 部署嗎？（需您在主機/帳戶中完成登入授權）
