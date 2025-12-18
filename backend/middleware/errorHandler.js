/**
 * @fileoverview 全域錯誤處理中介層
 */

/**
 * 統一錯誤處理中介層
 * @param {Error} err - 錯誤物件
 * @param {Object} req - Express 請求物件
 * @param {Object} res - Express 回應物件
 * @param {Function} next - Express next 函式
 */
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || '內部伺服器錯誤';
  
  console.error(`[ERROR] ${statusCode}: ${message}`, {
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method,
  });

  res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message,
      timestamp: new Date().toISOString(),
    },
  });
};

/**
 * 自訂錯誤類別
 */
export class AppError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

export default errorHandler;
