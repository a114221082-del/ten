/**
 * @fileoverview Vercel Serverless Function - 健康檢查
 * API 端點: GET /api/health
 */

import { handleCors } from './_middleware/cors.js';

/**
 * 健康檢查端點
 * @param {Object} request - Vercel 請求
 * @param {Object} response - Vercel 回應
 */
export default function handler(request, response) {
  // 處理 CORS
  if (handleCors(request, response)) return;

  // GET 請求
  if (request.method === 'GET') {
    return response.status(200).json({
      success: true,
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.VERCEL_ENV || 'development',
      },
      message: '伺服器運行正常',
    });
  }

  // 不支援的方法
  response.status(405).json({
    success: false,
    error: {
      code: 'METHOD_NOT_ALLOWED',
      message: '不支援的 HTTP 方法',
    },
  });
}
