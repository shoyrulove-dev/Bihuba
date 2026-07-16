# BIHUBA Handover

Tài liệu này dùng để bàn giao nhanh cho đội vận hành BIHUBA sau khi tiếp nhận website.

## Đăng nhập quản trị

- Đường dẫn: `/admin/login`
- Sau khi đăng nhập, toàn bộ nội dung chính của website được quản lý trong các mục:
  - `Bài viết`
  - `Hội viên`
  - `Đối tác`
  - `Tài liệu`
  - `Nội dung và giao diện`

## Sửa trang chủ

Vào `Cấu hình website`, sau đó chọn từng mục nhỏ:

- `Nhận diện website`
  - Tên đầy đủ
  - Tên ngắn
  - Logo website
  - Slogan
- `Nội dung trang chủ`
  - Tiêu đề hero
  - Mô tả hero
  - Nút CTA
  - Tiêu đề giới thiệu
  - Nội dung giới thiệu
  - Thống kê trang chủ

## Sửa menu và liên hệ

Vào `Cấu hình website` > `Menu và liên hệ`:

- `Menu điều hướng`
  - Thêm, sửa, sắp xếp thứ tự menu trên đầu trang
- `Thông tin liên hệ`
  - Địa chỉ
  - Điện thoại
  - Email
  - Website
- `Nút nổi bên phải`
  - Zalo
  - Facebook
  - Số điện thoại gọi nhanh

## Sửa dải doanh nghiệp đồng hành

Vào `Cấu hình website` > `Doanh nghiệp đồng hành`:

- Thêm logo mới
- Sửa tên doanh nghiệp
- Gắn link website nếu cần
- Sắp xếp thứ tự chạy ngang dưới footer

## Sửa giao diện

Vào `Cấu hình website` > `Giao diện`:

- Màu chính
- Màu nhấn
- Màu nền
- Cỡ chữ tiêu đề
- Cỡ chữ nội dung

## Quản lý bài viết

Vào `Bài viết`:

- `Thêm mới` để tạo bài
- `Sửa` để cập nhật bài
- `Xóa` để gỡ bài

Trường cần chú ý:

- Ảnh đại diện
- Danh mục
- Nội dung bài viết
- Ngày đăng
- Đánh dấu nổi bật nếu muốn hiện mạnh hơn ngoài trang chủ

## Quản lý hội viên

Vào `Hội viên`:

- Cập nhật logo doanh nghiệp
- Ảnh bìa
- Ảnh giới thiệu
- Thông tin liên hệ
- Hồ sơ doanh nghiệp
- Sản phẩm / dịch vụ

## Quản lý đối tác

Vào `Đối tác`:

- Logo đối tác
- Tên đối tác
- Nhóm đối tác
- Mô tả ngắn
- Link website

## Quản lý tài liệu

Vào `Tài liệu`:

- Tiêu đề tài liệu
- Tóm tắt ngắn
- File tải về
- Danh mục tài liệu
- Ngày phát hành

## Upload ảnh và file

- Ảnh và file tải từ admin sẽ đi qua ImageKit
- Không lưu blob media trực tiếp trong MongoDB
- Nên dùng kích thước gợi ý:
  - Logo website hoặc logo doanh nghiệp: `1200 x 1200`
  - Ảnh bìa hoặc ảnh bài viết: `1600 x 900`
  - Ảnh giới thiệu doanh nghiệp: `1200 x 900`
  - Ảnh sản phẩm / dịch vụ: `1200 x 900`

## Gợi ý vận hành sau bàn giao

- Bước 1: thay logo, số điện thoại, email và link mạng xã hội thật
- Bước 2: thay bài demo bằng bài hoạt động chính thức của BIHUBA
- Bước 3: cập nhật danh sách hội viên, đối tác và doanh nghiệp đồng hành chính thức
- Bước 4: đổi lại mật khẩu quản trị trên Vercel nếu cần
