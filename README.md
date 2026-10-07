# Quản lý sách — 23IT033

Bài kiểm tra giữa kỳ môn Điện toán đám mây của Nguyễn Mạnh Cường.

## Chạy tại máy cá nhân

1. Cài Node.js 22 trở lên.
2. Chạy `npm ci`.
3. Sao chép `.env.example` thành `.env`.
4. Chạy `npm start`, mở http://localhost:3000.

## Thông tin cá nhân hóa

- Database: `DB_23IT033`
- Tiền tố mã sách: `033` (giữ nguyên số 0 đầu)
- VAT: `(3 + 4)% = 7%`

## Tiến độ

- Đã có Express, Handlebars, footer cá nhân hóa và cấu hình môi trường mẫu.
- Chưa kết nối Atlas, chưa có chức năng quản lý sách hoặc session.
- Bước tiếp theo: phát triển Database trên `feature/database`, Session trên `feature/session`; gộp mỗi nhánh về `main` bằng `git merge --no-ff` để giữ merge node.

Không đưa `.env` hoặc mật khẩu vào Git. Khi triển khai, khai báo bí mật qua biến môi trường của nhà cung cấp cloud.
