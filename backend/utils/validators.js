/**
 * @fileoverview 資料驗證工具
 */

/**
 * 驗證電子郵件格式
 * @param {string} email - 電子郵件
 * @returns {boolean} 是否有效
 */
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 驗證電話號碼
 * @param {string} phone - 電話號碼
 * @returns {boolean} 是否有效
 */
export function validatePhone(phone) {
  // 簡單驗證：至少 8 個數字
  const phoneRegex = /^\d{8,}$/;
  return phoneRegex.test(phone.replace(/[\D]/g, ''));
}

/**
 * 驗證表單資料
 * @param {Object} data - 表單資料
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
export function validateContactForm(data) {
  const errors = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('姓名至少需 2 個字元');
  }

  if (!validateEmail(data.email)) {
    errors.push('電子郵件格式無效');
  }

  if (!validatePhone(data.phone)) {
    errors.push('電話號碼無效');
  }

  if (!data.message || data.message.trim().length < 5) {
    errors.push('訊息至少需 5 個字元');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export default {
  validateEmail,
  validatePhone,
  validateContactForm,
};
