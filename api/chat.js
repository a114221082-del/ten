/**
 * @fileoverview Vercel Serverless Function - AI 聊天
 * API 端點: POST /api/chat
 */

import { handleCors } from './_middleware/cors.js';

/**
 * AI 旅遊建議資料庫 (簡化版)
 */
const travelDatabase = {
  recommendations: {
    '台灣': ['台北101', '九份老街', '阿里山', '日月潭'],
    '日本': ['東京', '京都', '大阪', '奈良'],
    '韓國': ['首爾', '釜山', '濟州島'],
  },
  faqs: {
    '季節': '台灣秋冬最佳（10-12月），日本春秋兩季，泰國11-2月。',
    '預算': '亞洲旅遊預算：平價 800-1200 USD/週。',
  },
};

/**
 * 生成 AI 回應
 * @param {string} message - 使用者訊息
 * @returns {string} AI 回應
 */
function generateResponse(message) {
  const msg = message.toLowerCase();

  // 檢查常見問題
  for (const [key, value] of Object.entries(travelDatabase.faqs)) {
    if (msg.includes(key.toLowerCase())) {
      return `💡 ${key}\n\n${value}`;
    }
  }

  // 檢查目的地
  for (const [destination, places] of Object.entries(travelDatabase.recommendations)) {
    if (msg.includes(destination)) {
      return `🌍 ${destination} 推薦景點：\n${places.join('\n')}`;
    }
  }

  return '感謝您的查詢！請告訴我您感興趣的旅遊目的地或需求。';
}

/**
 * 聊天端點
 * @param {Object} request - Vercel 請求
 * @param {Object} response - Vercel 回應
 */
export default function handler(request, response) {
  // 處理 CORS
  if (handleCors(request, response)) return;

  // POST 請求
  if (request.method === 'POST') {
    const { message } = request.body;

    // 驗證
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return response.status(400).json({
        success: false,
        error: {
          code: 'INVALID_MESSAGE',
          message: '訊息無效或為空',
        },
      });
    }

    // 生成回應
    const aiResponse = generateResponse(message);

    return response.status(200).json({
      success: true,
      data: {
        response: aiResponse,
        userMessage: message,
        timestamp: new Date().toISOString(),
      },
      message: '回應已生成',
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
