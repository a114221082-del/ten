/**
 * @fileoverview 通用輔助函式
 */

/**
 * 生成成功回應
 * @param {any} data - 回應資料
 * @param {string} message - 回應訊息
 * @returns {Object} 標準化回應物件
 */
export function successResponse(data, message = 'Success') {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
}

/**
 * 生成錯誤回應
 * @param {string} message - 錯誤訊息
 * @param {string} code - 錯誤代碼
 * @returns {Object} 標準化錯誤物件
 */
export function errorResponse(message = 'Error', code = 'ERROR') {
  return {
    success: false,
    error: {
      code,
      message,
      timestamp: new Date().toISOString(),
    },
  };
}

/**
 * 異步錯誤捕捉包裝器
 * @param {Function} fn - 異步函式
 * @returns {Function} 包裝後的函式
 */
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export default {
  successResponse,
  errorResponse,
  asyncHandler,
};
