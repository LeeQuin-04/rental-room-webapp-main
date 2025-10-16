// backend/src/utils/slugify.js

function slugify(text) {
  if (!text) return '';
  // Chuẩn hóa Unicode, bỏ dấu, chuyển thành chữ thường, thay khoảng trắng, bỏ ký tự đặc biệt
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

module.exports = slugify;