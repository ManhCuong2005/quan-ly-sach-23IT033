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
- Đã có mã kết nối Atlas và chức năng quản lý sách; chưa kiểm tra kết nối thực tế và chưa có session.
- Bước tiếp theo: phát triển Database trên `feature/database`, Session trên `feature/session`; gộp mỗi nhánh về `main` bằng `git merge --no-ff` để giữ merge node.

Không đưa `.env` hoặc mật khẩu vào Git. Khi triển khai, khai báo bí mật qua biến môi trường của nhà cung cấp cloud.

## Kết nối Atlas và chức năng Database

Điền `MONGODB_READ_PASSWORD` và `MONGODB_WRITE_PASSWORD` trong `.env` bằng mật khẩu của từng Database User. Đặt mật khẩu trong dấu nháy kép nếu có ký tự `#`; không gửi mật khẩu vào chat hoặc commit Git. Username và host đã có sẵn trong `.env.example`.

Ứng dụng dùng hai MongoClient: `find` chỉ qua user đọc và `insertOne` chỉ qua user ghi. Giá sau thuế được tính phía server rồi lưu cùng giá gốc và VAT. Giá dùng số nguyên VNĐ; giá sau thuế làm tròn tới VNĐ.

Nhánh Database đã có form thêm và danh sách sách. Kiểm tra Atlas thực tế vẫn cần mật khẩu và IP Access List hợp lệ. Session sẽ được bổ sung trên nhánh riêng.
