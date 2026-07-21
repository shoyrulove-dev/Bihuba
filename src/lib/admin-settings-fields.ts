import type { FieldConfig } from "@/components/admin/collection-manager";

export const brandingFields: FieldConfig[] = [
  {
    name: "siteName",
    label: "Tên đầy đủ",
    helpText: "Header tự tách thành 2 hàng: Hội Doanh nghiệp Xã Bình Hưng / Thành phố Hồ Chí Minh.",
    section: "Nhận diện",
  },
  {
    name: "shortName",
    label: "Tên ngắn",
    helpText: "Hàng 1 trên header, ví dụ: BIHUBA.",
    section: "Nhận diện",
  },
  {
    name: "logoUrl",
    label: "Logo BIHUBA",
    type: "image",
    helpText:
      "Logo header đang dùng bản BIHUBA glow rõ nét. Nếu cần thay, upload logo vuông 1024 x 1024 px, tỷ lệ 1:1, PNG/WebP.",
    section: "Nhận diện",
  },
  {
    name: "slogan",
    label: "Slogan",
    helpText: "Hàng 4 trên header, ví dụ: Đoàn kết - Đổi mới - Hội nhập - Phát triển.",
    section: "Nhận diện",
  },
];

export const homepageFields: FieldConfig[] = [
  { name: "heroTitle", label: "Tiêu đề hero", fullWidth: true, section: "Khối mở đầu" },
  {
    name: "heroSubtitle",
    label: "Mô tả hero",
    type: "textarea",
    fullWidth: true,
    section: "Khối mở đầu",
  },
  {
    name: "heroImage",
    label: "Ảnh hero",
    type: "image",
    helpText: "Gợi ý: 1920 x 1080 px hoặc 1600 x 900 px.",
    fullWidth: true,
    section: "Khối mở đầu",
  },
  { name: "heroCtaLabel", label: "Nút CTA", section: "Khối mở đầu" },
  { name: "heroCtaHref", label: "Link CTA", section: "Khối mở đầu" },
  { name: "introTitle", label: "Tiêu đề giới thiệu", fullWidth: true, section: "Giới thiệu" },
  {
    name: "introBody",
    label: "Nội dung giới thiệu",
    type: "textarea",
    fullWidth: true,
    section: "Giới thiệu",
  },
  {
    name: "featureBanners",
    label: "Banner nổi bật",
    type: "banners",
    fullWidth: true,
    helpText: "Dùng để giới thiệu sự kiện, chương trình và hoạt động sắp tới. Gợi ý ảnh: 1920 x 780 px.",
    section: "Banner hoạt động",
  },
  {
    name: "memberStats",
    label: "Thống kê",
    type: "stats",
    fullWidth: true,
    section: "Thống kê",
  },
];

export const contactFields: FieldConfig[] = [
  {
    name: "nav",
    label: "Menu điều hướng",
    type: "nav",
    fullWidth: true,
    section: "Menu",
  },
  {
    name: "contact",
    label: "Thông tin liên hệ",
    type: "contact",
    fullWidth: true,
    helpText: "Có thể thêm banner văn phòng 1600 x 720 px và link nhúng Google Map.",
    section: "Liên hệ",
  },
  {
    name: "floatingActions",
    label: "Nút nổi bên phải",
    type: "social",
    fullWidth: true,
    section: "Nút nổi",
  },
  {
    name: "socialLinks",
    label: "Kênh liên kết",
    type: "links",
    fullWidth: true,
    helpText: "Zalo, Fanpage, TikTok, YouTube.",
    section: "Kênh mạng xã hội",
  },
];

export const supporterFields: FieldConfig[] = [
  {
    name: "supporterCompanies",
    label: "Doanh nghiệp đồng hành",
    type: "supporters",
    fullWidth: true,
    helpText:
      "Logo hiển thị dạng tròn ngoài website. Upload ảnh vuông 1000 x 1000 px hoặc 800 x 800 px, tỷ lệ 1:1, PNG/WebP nền trong hoặc nền trắng, logo nằm giữa và chừa vùng an toàn 12-15%.",
    section: "Logo đồng hành",
  },
];

export const themeFields: FieldConfig[] = [
  {
    name: "theme",
    label: "Giao diện website",
    type: "theme",
    fullWidth: true,
    helpText: "Màu sắc và cỡ chữ chính của website.",
    section: "Màu sắc",
  },
];

export const aiFields: FieldConfig[] = [
  {
    name: "aiAssistant",
    label: "Trợ Lý BIHUBA",
    type: "ai",
    fullWidth: true,
    helpText: "Có thể nhập token Groq tại đây hoặc dùng biến môi trường GROQ_API_KEY trên Vercel/server.",
    section: "AI",
  },
];
