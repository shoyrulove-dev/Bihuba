export const settings = {
  siteName: "Hội Doanh Nghiệp Xã Bình Hưng Thành phố Hồ Chí Minh",
  shortName: "BIHUBA",
  slogan: "Đoàn kết - Đổi mới - Hội nhập - Phát triển",
  heroTitle: "Cộng đồng doanh nghiệp BIHUBA kết nối và phát triển bền vững",
  heroSubtitle:
    "Nền tảng số cho tin tức, sự kiện, hội viên, đối tác và điều hành nội dung tập trung.",
  heroCtaLabel: "Đăng ký hội viên",
  heroCtaHref: "/hoi-vien",
  introTitle: "Về BIHUBA",
  introBody:
    "BIHUBA được xây dựng theo mô hình tương đương HUBA nhưng tối ưu cho quản trị nội dung tập trung.",
  memberStats: [
    { label: "Hội viên doanh nghiệp", value: "120+" },
    { label: "Đối tác chiến lược", value: "25+" },
    { label: "Sự kiện thường niên", value: "40+" },
    { label: "Tài liệu & thông báo", value: "100+" },
  ],
  nav: [
    { label: "Trang chủ", href: "/" },
    { label: "Tin tức", href: "/tin-tuc" },
    { label: "Sự kiện", href: "/su-kien" },
    { label: "Kết nối giao thương", href: "/ket-noi-giao-thuong" },
    { label: "Hội viên", href: "/hoi-vien" },
    { label: "Đối tác", href: "/doi-tac" },
    { label: "Download", href: "/download" },
    { label: "Liên hệ", href: "/lien-he" },
  ],
  contact: {
    address: "Bình Hưng, TP. Hồ Chí Minh",
    email: "vanphong@bihuba.vn",
    phone: "0900 000 000",
    website: "https://bihuba.vn",
  },
};

export const posts = [
  {
    title: "BIHUBA ra mắt cổng thông tin số cho hội viên",
    slug: "bihuba-ra-mat-cong-thong-tin-so",
    type: "news",
    category: "Tin tức",
    excerpt:
      "Cổng thông tin số mới cho phép điều hành nội dung, hội viên và sự kiện tập trung trên một nền tảng.",
    content:
      "BIHUBA triển khai nền tảng số mới để quản lý bài viết, đối tác, hội viên và tài liệu theo mô hình quản trị tập trung.",
    featuredImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2026-07-16",
    isFeatured: true,
  },
  {
    title: "Chương trình kết nối doanh nghiệp quý III",
    slug: "chuong-trinh-ket-noi-doanh-nghiep-quy-iii",
    type: "event",
    category: "Kết nối doanh nghiệp",
    excerpt:
      "Sự kiện kết nối giữa hội viên, đối tác và các đơn vị đồng hành trong khu vực.",
    content:
      "Sự kiện tập trung vào kết nối giao thương, giới thiệu sản phẩm và mở rộng mạng lưới doanh nghiệp hội viên.",
    featuredImage:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2026-07-21",
    isFeatured: true,
  },
];

export const members = [
  {
    name: "Hội Doanh Nghiệp Xã Bình Hưng",
    slug: "hoi-doanh-nghiep-xa-binh-hung",
    memberType: "club",
    groupType: "Hội cơ sở",
    description:
      "Đơn vị đầu mối đại diện kết nối doanh nghiệp trong khu vực Bình Hưng.",
    logo: "",
    address: "Bình Hưng, TP. Hồ Chí Minh",
    phone: "0901 111 111",
    email: "info@bihuba.vn",
    website: "https://bihuba.vn",
    industry: "Hiệp hội - Tổ chức xã hội",
  },
];

export const partners = [
  {
    name: "Đối tác chiến lược A",
    slug: "doi-tac-chien-luoc-a",
    description:
      "Đối tác chiến lược mẫu cho trang giới thiệu đối tác và liên kết hợp tác.",
    logo: "",
    website: "https://example.com",
    partnerType: "Đối tác chiến lược",
  },
];

export const downloads = [
  {
    title: "Thông báo hội phí BIHUBA 2026",
    slug: "thong-bao-hoi-phi-bihuba-2026",
    summary: "Tài liệu mẫu cho module thông báo và download.",
    fileUrl: "https://example.com/files/thong-bao-hoi-phi.pdf",
    category: "thong-bao",
    publishedAt: "2026-07-10",
  },
];
