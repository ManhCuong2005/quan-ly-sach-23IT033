require('dotenv').config({ quiet: true });
const { createApp } = require('./app');
const { connectDatabase } = require('./database');
const { createSession } = require('./session');
async function start() {
  const sessions = await createSession();
  let books;
  try { books = await connectDatabase(); }
  catch (error) { await sessions.close(); throw error; }
  const app = createApp(books, sessions.middleware);
  const server = app.listen(Number(process.env.PORT || 3000), () => console.log('Ứng dụng đã kết nối Atlas, lưu session trên MongoDB và đang lắng nghe.'));
  server.on('error', async error => { console.error('Lỗi máy chủ:', error.code); await Promise.allSettled([books.close(), sessions.close()]); process.exitCode = 1; });
  for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, () => {
    server.close(async () => { await Promise.allSettled([books.close(), sessions.close()]); process.exit(0); });
  });
}
start().catch(error => {
  console.error('Không khởi động được. Kiểm tra .env, tài khoản Atlas và IP Access List. Mã lỗi:', error.code || error.name);
  process.exitCode = 1;
});
