/**
 * @fileoverview 聯絡表單路由
 */

import { Router } from 'express';
import { validateContactForm } from '../utils/validators.js';
import { successResponse, errorResponse, asyncHandler } from '../utils/helpers.js';

const router = Router();

/**
 * POST /contact - 提交聯絡表單
 * @request { name: string, email: string, phone: string, message: string }
 * @response { success: boolean, data: { id: string } }
 */
router.post('/', asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;

  // 驗證表單資料
  const validation = validateContactForm({ name, email, phone, message });
  
  if (!validation.isValid) {
    return res.status(400).json(errorResponse(
      validation.errors.join(', '),
      'VALIDATION_ERROR'
    ));
  }

  // 模擬儲存到資料庫 (實際應寫入資料庫或發送郵件)
  const contactId = `contact_${Date.now()}`;
  
  console.log('📧 新的聯絡表單提交:', {
    id: contactId,
    name,
    email,
    phone,
    message,
    timestamp: new Date().toISOString(),
  });

  res.json(successResponse(
    { id: contactId, timestamp: new Date().toISOString() },
    '感謝您的聯絡，我們將盡快回覆'
  ));
}));

export default router;
