/**
 * @fileoverview AI 客服聊天路由
 */

import { Router } from 'express';
import { generateAIResponse, validateMessage } from '../utils/aiMock.js';
import { successResponse, errorResponse, asyncHandler } from '../utils/helpers.js';

const router = Router();

/**
 * POST /chat - 發送聊天訊息
 * @request { message: string }
 * @response { success: boolean, data: { response: string } }
 */
router.post('/', asyncHandler(async (req, res) => {
  const { message } = req.body;

  // 驗證訊息
  if (!validateMessage(message)) {
    return res.status(400).json(errorResponse(
      '訊息無效或為空',
      'INVALID_MESSAGE'
    ));
  }

  // 生成 AI 回應
  const aiResponse = await generateAIResponse(message);

  res.json(successResponse(
    { response: aiResponse, userMessage: message },
    '回應已生成'
  ));
}));

export default router;
