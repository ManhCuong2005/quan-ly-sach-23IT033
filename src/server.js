require('dotenv').config();
const { createApp } = require('./app');
const { connectDatabase } = require('./database');
async function start() {
  const books = await connectDatabase();
  const app = createApp(books);
  const server = app.listen(Number(process.env.PORT || 3000), () => console.log('Ứng dụng đã kết nối Atlas và đang lắng nghe.'));
  for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, () => {
    server.close(async () => { await books.close(); process.exit(0); });
  });
}
start().catch(error => {
  console.error('Không khởi động được. Kiểm tra cấu hình .env, tài khoản Atlas và IP Access List. Mã lỗi:', error.code || error.name);
  process.exitCode = 1;
});
