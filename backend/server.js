/**
 * @fileoverview 伺服器啟動檔案
 */

import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
  console.log(`\n🚀 旅遊 AI 平台伺服器啟動成功！`);
  console.log(`   📍 地址: http://localhost:${PORT}`);
  console.log(`   🌍 環境: ${process.env.NODE_ENV || 'development'}`);
  console.log(`\n   可用路由:`);
  console.log(`   ✅ GET  /health - 健康檢查`);
  console.log(`   ✅ POST /chat - AI 聊天`);
  console.log(`   ✅ POST /contact - 聯絡表單\n`);
});

// 優雅關閉
process.on('SIGTERM', () => {
  console.log('\n📴 接收到 SIGTERM 信號，正在關閉伺服器...');
  server.close(() => {
    console.log('✅ 伺服器已關閉');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n📴 接收到 SIGINT 信號，正在關閉伺服器...');
  server.close(() => {
    console.log('✅ 伺服器已關閉');
    process.exit(0);
  });
});

export default server;
