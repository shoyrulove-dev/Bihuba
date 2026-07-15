# BIHUBA Site

Website BIHUBA dựng bằng `Next.js 16 + MongoDB + Vercel`, mô phỏng cấu trúc nội dung của `huba.vn` nhưng tối ưu để quản trị tập trung từ admin panel.

## Stack

- `Next.js 16`
- `React 19`
- `MongoDB Atlas`
- `Mongoose`
- `Tailwind CSS 4`
- Deploy target: `Vercel`

## Module đã có

- Trang chủ BIHUBA
- Tin tức
- Sự kiện
- Lịch tuần
- Kết nối giao thương
- Hội viên
- Đối tác
- Download
- Liên hệ
- Admin dashboard
- CRUD admin cho:
  - bài viết
  - hội viên
  - đối tác
  - tài liệu
  - site settings

## Admin routes

- `/admin`
- `/admin/posts`
- `/admin/members`
- `/admin/partners`
- `/admin/downloads`
- `/admin/settings`

## Public routes

- `/`
- `/tin-tuc`
- `/su-kien`
- `/lich-tuan`
- `/ket-noi-giao-thuong`
- `/hoi-vien`
- `/doi-tac`
- `/download`
- `/lien-he`

## Environment variables

Tạo env như sau:

```bash
MONGODB_URI=your-mongodb-uri
MONGODB_DB=bihuba
```

File mẫu đã có sẵn ở `.env.example`.

## Run local

```bash
npm install
npm run dev
```

## Seed dữ liệu mẫu

```bash
npm run seed
```

Lưu ý:

- Script seed đang đọc `.env.local`.
- Nếu MongoDB Atlas chưa mở quyền truy cập mạng hoặc URI chưa đúng, seed sẽ fail.

## Build production

```bash
npm run build
```

## Ghi chú MongoDB Atlas

Trong quá trình build từ máy hiện tại, app đang fallback sang dữ liệu mẫu vì MongoDB Atlas trả lỗi DNS/SRV:

```text
querySrv ECONNREFUSED _mongodb._tcp.bihuba.wjq9cxx.mongodb.net
```

Để dùng DB thật, cần kiểm tra:

1. `Network Access` trên MongoDB Atlas
2. IP allowlist hoặc bật tạm `0.0.0.0/0`
3. URI connection string có còn đúng không
4. Cluster có đang hoạt động không

App đã được code để:

- Nếu MongoDB kết nối được: dùng dữ liệu thật từ DB
- Nếu MongoDB chưa kết nối được: vẫn build/deploy bằng dữ liệu mẫu

## Deploy Vercel

1. Push repo lên GitHub
2. Import project vào Vercel
3. Add env vars:
   - `MONGODB_URI`
   - `MONGODB_DB`
4. Deploy

## Gợi ý trước khi public chính thức

- Thêm auth cho `/admin`
- Thay nội dung mẫu bằng dữ liệu BIHUBA thật
- Cập nhật logo/banner chính thức
- Cấu hình domain thật
- Mở MongoDB Atlas network access đúng chuẩn production
