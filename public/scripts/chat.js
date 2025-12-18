/**
 * @fileoverview 聊天功能 - AI 客服互動
 */

import { apiPost } from './api.js';
import { showNotification } from './utils.js';

/**
 * 初始化聊天功能
 */
export function initChat() {
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');

  if (chatForm) {
    chatForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const message = chatInput.value.trim();
      if (!message) return;

      // 添加使用者訊息到聊天窗口
      addMessageToChat(message, 'user');
      chatInput.value = '';
      chatInput.focus();

      try {
        // 發送訊息到 AI 端點
        const response = await apiPost('/api/chat', { message });

        if (response.success) {
          // 添加 AI 回應到聊天窗口
          addMessageToChat(response.data.response, 'bot');
        } else {
          showNotification('出錯：' + response.error.message, 'error');
          addMessageToChat('抱歉，目前無法處理您的請求。', 'bot');
        }
      } catch (error) {
        console.error('Chat Error:', error);
        showNotification('聊天出錯，請重試', 'error');
        addMessageToChat('抱歉，通信出現問題，請稍後重試。', 'bot');
      }
    });
  }
}

/**
 * 添加訊息到聊天窗口
 * @param {string} message - 訊息內容
 * @param {string} type - 訊息類型 ('user' 或 'bot')
 */
function addMessageToChat(message, type) {
  const chatMessages = document.getElementById('chatMessages');
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type === 'user' ? 'user-message' : 'bot-message'}`;
  
  const avatar = type === 'user' ? '👤' : '🤖';
  messageDiv.innerHTML = `
    <span class="message-avatar">${avatar}</span>
    <div class="message-content">
      <p>${escapeHtml(message)}</p>
    </div>
  `;

  chatMessages.appendChild(messageDiv);
  
  // 自動滾動到最新訊息
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * 轉義 HTML 特殊字符
 * @param {string} text - 文本
 * @returns {string} 轉義後的文本
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export default initChat;
