import type { FieldConfig } from "@/components/admin/collection-manager";

export const brandingFields: FieldConfig[] = [
  { name: "siteName", label: "Tên đầy đủ", section: "Nhận diện" },
  { name: "shortName", label: "Tên ngắn", section: "Nhận diện" },
  {
    name: "logoUrl",
    label: "Logo vuông",
    type: "image",
    helpText: "Gợi ý: 1200 x 1200 px, PNG nền trong.",
    section: "Nhận diện",
  },
  {
    name: "wordmarkUrl",
    label: "Logo ngang",
    type: "image",
    helpText: "Gợi ý: 1800 x 600 px, PNG nền trong.",
    section: "Nhận diện",
  },
  { name: "slogan", label: "Slogan", section: "Nhận diện" },
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
    helpText: "Dùng để giới thiệu sự kiện, chương trình và hoạt động sắp tới.",
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
    helpText: "Gợi ý logo: 800 x 800 px hoặc 1000 x 1000 px, nền trong hoặc nền trắng, bố cục vuông để hiển thị rõ trong khung tròn.",
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
