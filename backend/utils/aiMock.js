/**
 * @fileoverview AI 客服模擬工具 - Mock AI 回應
 * 實際部署時可替換為真實 AI API (OpenAI, Anthropic 等)
 */

/**
 * AI 旅遊建議資料庫
 */
const travelDatabase = {
  recommendations: {
    '台灣': ['台北101', '九份老街', '阿里山', '日月潭', '蘭嶼'],
    '日本': ['東京', '京都', '大阪', '奈良', '富士山'],
    '韓國': ['首爾', '釜山', '濟州島', '南山塔', '北村韓屋村'],
    '泰國': ['曼谷', '普吉島', '清邁', '芭提雅', '大象營'],
  },
  faqs: {
    '最佳旅遊季節': '台灣秋冬最佳（10-12月），日本春秋兩季，泰國11-2月。',
    '簽證要求': '台灣護照可免簽入境 190+ 國家，具體查詢官方公告。',
    '預算規劃': '亞洲旅遊預算：平價 800-1200 USD/週，中等 1500-2500 USD/週。',
    '行程天數': '3-5 天適合快速體驗，7-10 天適合深度探索。',
  },
};

/**
 * 生成 AI 客服回應
 * @param {string} userMessage - 使用者訊息
 * @returns {Promise<string>} AI 回應
 */
export async function generateAIResponse(userMessage) {
  try {
    // 模擬處理延遲
    await new Promise(resolve => setTimeout(resolve, 500));

    const message = userMessage.toLowerCase().trim();

    // 檢查常見問題
    for (const [key, value] of Object.entries(travelDatabase.faqs)) {
      if (message.includes(key.toLowerCase())) {
        return `💡 ${key}\n\n${value}`;
      }
    }

    // 檢查目的地建議
    for (const [destination, places] of Object.entries(travelDatabase.recommendations)) {
      if (message.includes(destination)) {
        return `🌍 ${destination} 推薦景點：\n\n${places.join('\n✈️ ')}`;
      }
    }

    // 預設回應
    return `感謝您的查詢！我是旅遊 AI 助手。👋\n\n我可以幫助您：\n✈️ 推薦旅遊目的地\n📍 提供景點介紹\n⏰ 規劃行程時間\n💰 預估旅遊預算\n\n請告訴我您感興趣的目的地或旅遊需求！`;
  } catch (error) {
    console.error('AI Response Error:', error);
    return '抱歉，目前無法處理您的請求。請稍後重試。';
  }
}

/**
 * 驗證使用者訊息
 * @param {string} message - 使用者訊息
 * @returns {boolean} 是否有效
 */
export function validateMessage(message) {
  if (!message || typeof message !== 'string') return false;
  if (message.trim().length === 0 || message.trim().length > 1000) return false;
  return true;
}

export default {
  generateAIResponse,
  validateMessage,
};
