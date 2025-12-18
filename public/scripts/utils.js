/**
 * @fileoverview 前端工具函式
 */

/**
 * 顯示通知訊息
 * @param {string} message - 訊息內容
 * @param {string} type - 訊息類型 ('success', 'error', 'info', 'warning')
 * @param {number} duration - 顯示時長 (毫秒)
 */
export function showNotification(message, type = 'info', duration = 3000) {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    background: ${getNotificationBg(type)};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    animation: slideInRight 0.3s ease-out;
    max-width: 400px;
    word-break: break-word;
  `;

  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideInLeft 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

/**
 * 獲取通知背景顏色
 * @param {string} type - 訊息類型
 * @returns {string} CSS 顏色值
 */
function getNotificationBg(type) {
  const colors = {
    success: 'linear-gradient(135deg, #00B894, #00A67E)',
    error: 'linear-gradient(135deg, #D63031, #E84118)',
    info: 'linear-gradient(135deg, #6C5CE7, #5F3DC4)',
    warning: 'linear-gradient(135deg, #FDCB6E, #F9A825)',
  };
  return colors[type] || colors.info;
}

/**
 * 防抖函式
 * @param {Function} func - 要執行的函式
 * @param {number} delay - 延遲時間 (毫秒)
 * @returns {Function} 防抖後的函式
 */
export function debounce(func, delay = 300) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * 節流函式
 * @param {Function} func - 要執行的函式
 * @param {number} limit - 限制時間 (毫秒)
 * @returns {Function} 節流後的函式
 */
export function throttle(func, limit = 300) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * 監測網絡連接狀態
 * @returns {boolean} 是否連接
 */
export function isOnline() {
  return typeof navigator !== 'undefined' && navigator.onLine;
}

/**
 * 監聽線上/離線事件
 */
export function setupConnectionMonitoring() {
  if (typeof window !== 'undefined') {
    window.addEventListener('online', () => {
      showNotification('已連接網路', 'success');
    });

    window.addEventListener('offline', () => {
      showNotification('網路已斷開連接', 'warning', 5000);
    });
  }
}

/**
 * 平滑滾動到元素
 * @param {string} elementId - 元素 ID
 */
export function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

export default {
  showNotification,
  debounce,
  throttle,
  isOnline,
  setupConnectionMonitoring,
  scrollToElement,
};
