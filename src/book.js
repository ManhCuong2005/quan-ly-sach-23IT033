const student = require('./config/student');
function prepareBook(input) {
  const code = typeof input.code === 'string' ? input.code.trim() : '';
  const title = typeof input.title === 'string' ? input.title.trim() : '';
  const priceText = typeof input.price === 'string' ? input.price.trim() : '';
  if (!code.startsWith(student.bookCodePrefix) || code.length > 64) throw new Error('Mã sách phải bắt đầu bằng 033 và không quá 64 ký tự.');
  if (!title || title.length > 200) throw new Error('Tên sách phải có từ 1 đến 200 ký tự.');
  if (!/^\d+$/.test(priceText)) throw new Error('Giá sách phải là số nguyên không âm (VNĐ).');
  const price = Number(priceText);
  if (!Number.isSafeInteger(price) || price > 1000000000) throw new Error('Giá sách không được vượt quá 1 tỷ VNĐ.');
  return { code, title, price, vatPercent: student.vatPercent,
    priceAfterTax: Math.round(price * (100 + student.vatPercent) / 100), createdAt: new Date() };
}
module.exports = { prepareBook };
