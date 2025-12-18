/**
 * @fileoverview Express 應用初始化
 */

import express from 'express';
import cors from 'cors';
import { errorHandler, AppError } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/requestLogger.js';
import { corsOptions } from './middleware/corsHandler.js';
import healthRoutes from './routes/health.js';
import chatRoutes from './routes/chat.js';
import contactRoutes from './routes/contact.js';

const app = express();

// ============ 中介層設定 ============
// 請求解析
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));

// CORS
app.use(cors(corsOptions));

// 請求日誌
app.use(requestLogger);

// 靜態檔案 (前端)
app.use(express.static('public'));

// ============ 路由設定 ============
app.use('/health', healthRoutes);
app.use('/chat', chatRoutes);
app.use('/contact', contactRoutes);

/**
 * 根路由 - 靜態頁面
 */
app.get('/', (req, res) => {
  res.sendFile(new URL('../public/index.html', import.meta.url).pathname);
});

/**
 * 404 錯誤處理
 */
app.use((req, res, next) => {
  throw new AppError(`路由未找到: ${req.method} ${req.path}`, 404, 'NOT_FOUND');
});

// ============ 錯誤處理 ============
app.use(errorHandler);

export default app;
