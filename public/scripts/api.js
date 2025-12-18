/**
 * @fileoverview API 工具函式 - 前端 HTTP 請求
 */

/**
 * API 基礎 URL
 */
const API_BASE = (() => {
  // Vercel 部署環境
  if (typeof window !== 'undefined' && window.location.hostname.includes('vercel')) {
    return window.location.origin;
  }
  // 本地開發環境
  return 'http://localhost:3000';
})();

/**
 * 執行 API 請求
 * @param {string} endpoint - API 端點 (相對路徑)
 * @param {Object} options - 請求選項 { method, body, headers }
 * @returns {Promise<Object>} API 回應
 */
export async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  // 轉換 body 為 JSON 字符串
  if (mergedOptions.body && typeof mergedOptions.body === 'object') {
    mergedOptions.body = JSON.stringify(mergedOptions.body);
  }

  try {
    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * GET 請求
 * @param {string} endpoint - API 端點
 * @returns {Promise<Object>}
 */
export function apiGet(endpoint) {
  return apiCall(endpoint, { method: 'GET' });
}

/**
 * POST 請求
 * @param {string} endpoint - API 端點
 * @param {Object} data - 請求體
 * @returns {Promise<Object>}
 */
export function apiPost(endpoint, data) {
  return apiCall(endpoint, {
    method: 'POST',
    body: data,
  });
}

export default {
  apiCall,
  apiGet,
  apiPost,
};
