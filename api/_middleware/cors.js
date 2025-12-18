/**
 * @fileoverview Vercel Serverless Function - CORS 中介層
 */

/**
 * 設定 CORS 標頭
 * @param {Object} response - Vercel 回應物件
 */
export function setCorsHeaders(response) {
  const allowedOrigins = process.env.VERCEL_URL
    ? [`https://${process.env.VERCEL_URL}`, 'http://localhost:3000']
    : ['http://localhost:3000'];

  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
}

/**
 * 處理 OPTIONS 預檢請求
 * @param {Object} request - Vercel 請求物件
 * @param {Object} response - Vercel 回應物件
 */
export function handleCors(request, response) {
  if (request.method === 'OPTIONS') {
    setCorsHeaders(response);
    response.status(200).end();
    return true;
  }
  setCorsHeaders(response);
  return false;
}

export default handleCors;
