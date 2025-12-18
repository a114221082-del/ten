/**
 * @fileoverview 聯絡表單功能
 */

import { apiPost } from './api.js';
import { showNotification } from './utils.js';

/**
 * 初始化聯絡表單
 */
export function initContactForm() {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        message: document.getElementById('message').value.trim(),
      };

      try {
        // 發送表單到 API
        const response = await apiPost('/api/contact', formData);

        if (response.success) {
          showNotification(response.message, 'success');
          contactForm.reset();
          document.getElementById('name').focus();
        } else {
          showNotification('表單提交失敗：' + response.error.message, 'error');
        }
      } catch (error) {
        console.error('Contact Form Error:', error);
        showNotification('表單提交失敗，請檢查網絡連接', 'error');
      }
    });
  }
}

export default initContactForm;
