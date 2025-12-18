/**
 * @fileoverview 主應用程式初始化
 */

import initChat from './chat.js';
import initContactForm from './contact.js';
import { setupConnectionMonitoring, isOnline, showNotification } from './utils.js';

/**
 * 應用程式初始化
 */
function initApp() {
  console.log('🚀 初始化旅遊 AI 平台應用...');

  // 檢查網路連接
  if (!isOnline()) {
    showNotification('目前離線，某些功能可能不可用', 'warning', 5000);
  }

  // 設置連接監控
  setupConnectionMonitoring();

  // 初始化各功能模組
  initChat();
  initContactForm();

  // 設置平滑滾動
  setupSmoothScrolling();

  // 檢查伺服器健康狀態
  checkServerHealth();

  console.log('✅ 應用初始化完成');
}

/**
 * 設置平滑滾動
 */
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/**
 * 檢查伺服器健康狀態
 */
async function checkServerHealth() {
  try {
    const response = await fetch('/api/health');
    if (response.ok) {
      const data = await response.json();
      console.log('✅ 伺服器健康狀態:', data.data.status);
    }
  } catch (error) {
    console.warn('⚠️ 無法連接到伺服器:', error.message);
  }
}

/**
 * DOM 加載完成後初始化
 */
document.addEventListener('DOMContentLoaded', initApp);

// 導出以供測試使用
export { initApp };
