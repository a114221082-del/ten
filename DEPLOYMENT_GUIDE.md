# 🚀 部署指南

## 本地開發

### 安裝與啟動
```bash
# 1. 安裝依賴
npm install

# 2. 啟動伺服器
npm start          # 基本啟動
npm run dev        # 開發模式 (自動重啟)

# 3. 訪問應用
http://localhost:3000
```

### 測試 API
```bash
# 健康檢查
curl http://localhost:3000/api/health

# AI 聊天
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"推薦台灣景點"}'

# 聯絡表單
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John",
    "email":"john@example.com",
    "phone":"0912345678",
    "message":"Test message"
  }'
```

---

## Vercel 部署

### 方式 1: GitHub 自動部署 (推薦)

1. **推送代碼到 GitHub**
```bash
git add .
git commit -m "feat: 完成旅遊 AI 平台"
git push origin main
```

2. **在 Vercel 連接倉庫**
   - 訪問 https://vercel.com
   - 點擊 "Import Project"
   - 選擇 GitHub 倉庫
   - 設定環境變數

3. **配置環境變數**
   - Project Settings → Environment Variables
   - 添加：
     ```
     CORS_ORIGIN=https://your-domain.vercel.app
     NODE_ENV=production
     ```

4. **自動部署完成**
   - Vercel 自動建構和部署
   - 檢測 vercel.json 配置
   - /api/* 自動成為 Serverless Functions

### 方式 2: Vercel CLI 部署

1. **安裝 Vercel CLI**
```bash
npm install -g vercel
```

2. **部署**
```bash
vercel
```

3. **按提示回答**
   - 選擇 Scope
   - 新建或選擇已有項目
   - 配置設定

---

## 🔍 驗證部署

### 檢查功能
1. 訪問首頁 - 檢查樣式和佈局
2. 測試聊天 - 與 AI 交互
3. 提交表單 - 確認提交功能
4. 檢查控制台 - 查看錯誤

### 性能檢查
- Lighthouse 評分
- Core Web Vitals
- 加載時間

---

## 📊 Vercel 配置說明

### vercel.json
```json
{
  "buildCommand": "echo 'Ready for deployment'",
  "framework": "static",
  "cleanUrls": true,
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    }
  ]
}
```

**說明**:
- `buildCommand`: 無需構建（靜態 + Serverless）
- `framework`: 識別為靜態網站
- `cleanUrls`: 移除 .html 副檔名
- `rewrites`: /api/* 路由到 Serverless Functions

---

## 🔧 故障排除

### 問題 1: 404 錯誤
**原因**: 靜態檔案路由問題
**解決**: 確認 public/ 資料夾存在和 vercel.json 配置正確

### 問題 2: CORS 錯誤
**原因**: CORS_ORIGIN 環境變數未設定
**解決**: 在 Vercel Project Settings 添加環境變數

### 問題 3: API 超時
**原因**: Serverless Function 執行時間過長
**解決**: 優化代碼，減少執行時間

### 問題 4: 環境變數未生效
**原因**: 環境變數未正確配置
**解決**: 確認在 Vercel Project Settings 設定，重新部署

---

## 📈 優化建議

### 性能
- [ ] 啟用 GZIP 壓縮
- [ ] 使用 CDN 快取
- [ ] 圖片最佳化
- [ ] 減少 JavaScript 大小

### 安全
- [ ] 添加速率限制
- [ ] 驗證用戶輸入
- [ ] 使用 HTTPS
- [ ] 配置 CSP 標頭

### 監控
- [ ] 啟用 Vercel Analytics
- [ ] 設定 error tracking (Sentry)
- [ ] 配置告警

---

## 📚 相關資源

- [Vercel 官方文檔](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Express.js 指南](https://expressjs.com/)
- [Next Steps](#)

---

**🎉 部署完成！**
