import type { FieldConfig } from "@/components/admin/collection-manager";

export const brandingFields: FieldConfig[] = [
  { name: "siteName", label: "Tên đầy đủ" },
  { name: "shortName", label: "Tên ngắn" },
  {
    name: "logoUrl",
    label: "Logo website",
    type: "image",
    helpText: "Logo vuông: 1200 x 1200 PNG nền trong. Logo ngang: 1800 x 600 PNG nền trong.",
  },
  { name: "slogan", label: "Slogan" },
];

export const homepageFields: FieldConfig[] = [
  { name: "heroTitle", label: "Tiêu đề hero" },
  { name: "heroSubtitle", label: "Mô tả hero", type: "textarea" },
  {
    name: "heroImage",
    label: "Ảnh hero",
    type: "image",
    helpText: "Gợi ý: 1920 x 1080 hoặc 1600 x 900, dung lượng nên dưới 1.5MB.",
  },
  { name: "heroCtaLabel", label: "Nhãn CTA" },
  { name: "heroCtaHref", label: "Link CTA" },
  { name: "introTitle", label: "Tiêu đề giới thiệu" },
  { name: "introBody", label: "Nội dung giới thiệu", type: "textarea" },
  {
    name: "memberStats",
    label: "Thống kê trang chủ",
    type: "stats",
    helpText: "Thêm nhãn và con số cần hiển thị.",
  },
];

export const contactFields: FieldConfig[] = [
  {
    name: "nav",
    label: "Menu điều hướng",
    type: "nav",
    helpText: "Sắp xếp menu đang hiển thị ngoài website.",
  },
  {
    name: "contact",
    label: "Thông tin liên hệ",
    type: "contact",
  },
  {
    name: "floatingActions",
    label: "Nút nổi bên phải",
    type: "social",
    helpText: "Zalo, Facebook và số gọi nhanh.",
  },
];

export const supporterFields: FieldConfig[] = [
  {
    name: "supporterCompanies",
    label: "Doanh nghiệp đồng hành",
    type: "supporters",
    helpText: "Logo chạy ngang dưới footer.",
  },
];

export const themeFields: FieldConfig[] = [
  {
    name: "theme",
    label: "Giao diện website",
    type: "theme",
    helpText: "Màu sắc và cỡ chữ chính.",
  },
];
