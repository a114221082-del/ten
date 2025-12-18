/**
 * @fileoverview 日誌中介層 - 記錄所有 HTTP 請求
 */

/**
 * 請求日誌中介層
 * @param {Object} req - Express 請求物件
 * @param {Object} res - Express 回應物件
 * @param {Function} next - Express next 函式
 */
export const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const { method, path, query, body } = req;
  
  console.log(`[${timestamp}] ${method} ${path}`, {
    query: Object.keys(query).length > 0 ? query : undefined,
    body: method !== 'GET' ? (body ? Object.keys(body) : undefined) : undefined,
  });

  next();
};

export default requestLogger;
