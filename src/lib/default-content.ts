import {
  DownloadShape,
  MemberShape,
  PartnerShape,
  PostShape,
  SiteSettingsShape,
} from "@/types/cms";

export const defaultSettings: SiteSettingsShape = {
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
    "BIHUBA được xây dựng theo mô hình tương đương HUBA nhưng tối ưu cho quản trị nội dung tập trung. Toàn bộ banner, bài viết, hội viên, đối tác và tài liệu đều có thể cập nhật từ admin panel.",
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

export const defaultPosts: PostShape[] = [
  {
    title: "BIHUBA ra mắt cổng thông tin số cho hội viên",
    slug: "bihuba-ra-mat-cong-thong-tin-so",
    type: "news",
    category: "Tin tức",
    excerpt:
      "Cổng thông tin số mới cho phép điều hành nội dung, hội viên và sự kiện tập trung trên một nền tảng.",
    content:
      "BIHUBA triển khai nền tảng số mới để quản lý bài viết, đối tác, hội viên và tài liệu theo mô hình quản trị tập trung. Đây là bản khởi tạo sẵn để đội ngũ nội bộ cập nhật nội dung thật sau khi bàn giao.",
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
  {
    title: "Lịch tuần điều hành BIHUBA",
    slug: "lich-tuan-dieu-hanh-bihuba",
    type: "schedule",
    category: "Lịch tuần",
    excerpt:
      "Lịch công tác, họp điều hành và tiếp đối tác trong tuần làm việc hiện tại.",
    content:
      "Admin có thể cập nhật lịch tuần từng tuần từ backoffice để hiển thị công khai hoặc nội bộ theo nhu cầu.",
    featuredImage:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2026-07-14",
    isFeatured: true,
  },
  {
    title: "Chuyên đề xúc tiến thương mại cho hội viên",
    slug: "chuyen-de-xuc-tien-thuong-mai-cho-hoi-vien",
    type: "trade",
    category: "Hội chợ - xúc tiến thương mại",
    excerpt:
      "Hoạt động hỗ trợ hội viên tiếp cận đối tác và thị trường mới qua các chương trình xúc tiến thương mại.",
    content:
      "Nội dung mẫu để thay thế cho các chuyên mục tương tự trên HUBA, sẵn sàng để nhập liệu BIHUBA chính thức.",
    featuredImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2026-07-18",
    isFeatured: false,
  },
  {
    title: "Doanh nghiệp đồng hành cùng BIHUBA 2026",
    slug: "doanh-nghiep-dong-hanh-cung-bihuba-2026",
    type: "sponsor",
    category: "Đồng hành",
    excerpt:
      "Khối doanh nghiệp đồng hành được dùng cho bài quảng bá, giới thiệu thương hiệu và tài trợ hoạt động.",
    content:
      "Đây là module tương ứng nhóm advertisement/doanh nghiệp đồng hành trên HUBA.",
    featuredImage:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2026-07-12",
    isFeatured: true,
  },
];

export const defaultMembers: MemberShape[] = [
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
  {
    name: "Công ty TNHH Mẫu Bình Hưng",
    slug: "cong-ty-tnhh-mau-binh-hung",
    memberType: "business",
    groupType: "Hội viên doanh nghiệp",
    description:
      "Doanh nghiệp mẫu để hiển thị danh sách hội viên trước khi thay bằng dữ liệu thật.",
    logo: "",
    address: "Khu dân cư Bình Hưng",
    phone: "0902 222 222",
    email: "contact@example.vn",
    website: "https://example.vn",
    industry: "Thương mại - Dịch vụ",
  },
];

export const defaultPartners: PartnerShape[] = [
  {
    name: "Đối tác chiến lược A",
    slug: "doi-tac-chien-luoc-a",
    description:
      "Đối tác chiến lược mẫu cho trang giới thiệu đối tác và liên kết hợp tác.",
    logo: "",
    website: "https://example.com",
    partnerType: "Đối tác chiến lược",
  },
  {
    name: "Đối tác đào tạo B",
    slug: "doi-tac-dao-tao-b",
    description:
      "Đối tác mẫu phục vụ trình diễn danh mục đối tác tương tự HUBA.",
    logo: "",
    website: "https://example.org",
    partnerType: "Đối tác đào tạo",
  },
];

export const defaultDownloads: DownloadShape[] = [
  {
    title: "Thông báo hội phí BIHUBA 2026",
    slug: "thong-bao-hoi-phi-bihuba-2026",
    summary: "Tài liệu mẫu cho module thông báo và download.",
    fileUrl: "https://example.com/files/thong-bao-hoi-phi.pdf",
    category: "thong-bao",
    publishedAt: "2026-07-10",
  },
  {
    title: "Báo cáo hoạt động 6 tháng đầu năm",
    slug: "bao-cao-hoat-dong-6-thang-dau-nam",
    summary: "Báo cáo mẫu để kiểm tra chức năng tải file từ admin.",
    fileUrl: "https://example.com/files/bao-cao-6-thang.pdf",
    category: "bao-cao",
    publishedAt: "2026-07-08",
  },
];
