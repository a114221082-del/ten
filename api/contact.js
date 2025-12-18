/**
 * @fileoverview Vercel Serverless Function - 聯絡表單
 * API 端點: POST /api/contact
 */

import { handleCors } from './_middleware/cors.js';

/**
 * 驗證電子郵件
 * @param {string} email - 電子郵件
 * @returns {boolean}
 */
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * 聯絡表單端點
 * @param {Object} request - Vercel 請求
 * @param {Object} response - Vercel 回應
 */
export default function handler(request, response) {
  // 處理 CORS
  if (handleCors(request, response)) return;

  // POST 請求
  if (request.method === 'POST') {
    const { name, email, phone, message } = request.body;
    const errors = [];

    // 驗證
    if (!name || name.trim().length < 2) {
      errors.push('姓名至少需 2 個字元');
    }

    if (!validateEmail(email)) {
      errors.push('電子郵件格式無效');
    }

    if (!phone || phone.replace(/\D/g, '').length < 8) {
      errors.push('電話號碼無效');
    }

    if (!message || message.trim().length < 5) {
      errors.push('訊息至少需 5 個字元');
    }

    // 驗證失敗
    if (errors.length > 0) {
      return response.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: errors.join(', '),
        },
      });
    }

    // 生成聯絡 ID
    const contactId = `contact_${Date.now()}`;

    console.log('📧 新聯絡表單:', { contactId, name, email, phone });

    return response.status(200).json({
      success: true,
      data: {
        id: contactId,
        timestamp: new Date().toISOString(),
      },
      message: '感謝您的聯絡，我們將盡快回覆',
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
