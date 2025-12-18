/**
 * @fileoverview 健康檢查路由
 */

import { Router } from 'express';
import { successResponse } from '../utils/helpers.js';

const router = Router();

/**
 * GET /health - 檢查伺服器健康狀態
 */
router.get('/', (req, res) => {
  res.json(successResponse(
    {
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
    '伺服器運行正常'
  ));
});

export default router;
