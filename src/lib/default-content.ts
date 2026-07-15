import {
  DownloadShape,
  MemberShape,
  PartnerShape,
  PostShape,
  SiteSettingsShape,
} from "@/types/cms";

export const defaultSettings: SiteSettingsShape = {
  siteName: "Hội Doanh nghiệp Xã Bình Hưng Thành phố Hồ Chí Minh",
  shortName: "BIHUBA",
  slogan: "Đoàn kết - Đổi mới - Hội nhập - Phát triển",
  heroTitle: "Cộng đồng doanh nghiệp Bình Hưng kết nối nguồn lực và mở rộng cơ hội phát triển",
  heroSubtitle:
    "Cổng thông tin BIHUBA được xây dựng theo hướng hiện đại, quản trị tập trung, phù hợp cho tin tức, sự kiện, hội viên, đối tác và các chương trình kết nối giao thương.",
  heroCtaLabel: "Khám phá tin hoạt động",
  heroCtaHref: "/tin-tuc",
  introTitle: "Về BIHUBA",
  introBody:
    "BIHUBA định hướng trở thành điểm kết nối doanh nghiệp tại khu vực Bình Hưng, thúc đẩy hợp tác, đổi mới và chia sẻ cơ hội tăng trưởng. Toàn bộ nội dung trên website có thể được vận hành và cập nhật từ admin panel riêng.",
  memberStats: [
    { label: "Hội viên doanh nghiệp", value: "120+" },
    { label: "Chương trình kết nối", value: "36+" },
    { label: "Đối tác đồng hành", value: "24+" },
    { label: "Tài liệu và thông báo", value: "100+" },
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
    address: "Xã Bình Hưng, Thành phố Hồ Chí Minh",
    email: "vanphong@bihuba.vn",
    phone: "0900 000 000",
    website: "https://bihuba.vercel.app",
  },
};

export const defaultPosts: PostShape[] = [
  {
    title: "Lịch công tác HUBA từ ngày 13.7.2026 đến ngày 19.7.2026",
    slug: "lich-cong-tac-huba-tu-ngay-13-7-2026-den-ngay-19-7-2026",
    type: "schedule",
    category: "Lịch tuần",
    excerpt:
      "Bản demo tổng hợp lịch công tác và điều hành theo cấu trúc HUBA, phù hợp để BIHUBA cập nhật lịch họp, lịch tiếp khách và kế hoạch tuần.",
    content:
      "Nội dung demo được đưa vào để mô phỏng chuyên mục lịch tuần. Khi vận hành thật, BIHUBA có thể thay bằng lịch điều hành, lịch tiếp đối tác và các công việc trong tuần từ admin panel.",
    featuredImage:
      "https://huba.vn/wp-content/uploads/2026/07/Lich-cong-tac-HUBA-tu-ngay-13.7.2026-den-ngay-19.7.2026.webp",
    publishedAt: "2026-07-14",
    isFeatured: true,
  },
  {
    title: "AI trong doanh nghiệp: 10 xu hướng sẽ thay đổi mô hình kinh doanh trong 5 năm tới",
    slug: "ai-trong-doanh-nghiep-10-xu-huong-se-thay-doi-mo-hinh-kinh-doanh-trong-5-nam-toi",
    type: "news",
    category: "Tin tức",
    excerpt:
      "Bài demo theo hướng bài viết chuyên đề của HUBA, giúp homepage hiển thị khối tin mới và tạo cảm giác website đã có nội dung vận hành thật.",
    content:
      "AI đang chuyển từ công cụ hỗ trợ thành nền tảng vận hành trong doanh nghiệp. BIHUBA có thể dùng nhóm bài viết chuyên đề như thế này để thu hút hội viên, chia sẻ tri thức và tạo điểm đến nội dung cho cộng đồng.",
    featuredImage:
      "https://huba.vn/wp-content/uploads/2026/07/featured-image-1.png",
    publishedAt: "2026-07-14",
    isFeatured: true,
  },
  {
    title: "Cà phê doanh nhân và không gian trưng bày sản phẩm hội viên",
    slug: "cafe-doanh-nhan-va-khong-gian-trung-bay-san-pham-hoi-vien",
    type: "event",
    category: "Sự kiện",
    excerpt:
      "Mô phỏng một sự kiện kết nối và trưng bày sản phẩm theo chất liệu HUBA, rất hợp để BIHUBA trình diễn hình ảnh hoạt động trên homepage.",
    content:
      "Chuyên mục này có thể dùng để đăng tin về các buổi gặp gỡ doanh nghiệp, giới thiệu sản phẩm, tọa đàm chuyên đề và các phiên kết nối giao thương tại địa phương.",
    featuredImage:
      "https://huba.vn/wp-content/uploads/2026/07/Trien-lam-tai-chuong-trinh-cafe-huba-scaled.webp",
    publishedAt: "2026-07-10",
    isFeatured: true,
  },
  {
    title: "Doanh nghiệp tăng doanh thu nhưng vẫn thiếu tiền: nhìn từ quản trị dòng tiền",
    slug: "doanh-nghiep-tang-doanh-thu-nhung-van-thieu-tien",
    type: "news",
    category: "Tin tức",
    excerpt:
      "Một bài demo về quản trị tài chính doanh nghiệp, giúp khu vực tin tức của BIHUBA có độ phong phú ngay từ đầu.",
    content:
      "Doanh thu tăng không đồng nghĩa với dòng tiền tăng. Nội dung dạng bài theo chủ đề quản trị, tài chính, pháp lý và chuyển đổi số sẽ rất phù hợp với đối tượng hội viên doanh nghiệp.",
    featuredImage:
      "https://huba.vn/wp-content/uploads/2026/06/featured-image-4.png",
    publishedAt: "2026-07-03",
    isFeatured: false,
  },
  {
    title: "Ra mắt hội viên và mở rộng mạng lưới kết nối doanh nghiệp",
    slug: "ra-mat-hoi-vien-va-mo-rong-mang-luoi-ket-noi-doanh-nghiep",
    type: "trade",
    category: "Kết nối giao thương",
    excerpt:
      "Khối nội dung demo cho module kết nối giao thương, sử dụng hình ảnh sự kiện doanh nghiệp để homepage sinh động hơn.",
    content:
      "BIHUBA có thể phát triển chuyên mục này thành nơi đăng nhu cầu hợp tác, giới thiệu sản phẩm, tìm kiếm nhà cung cấp và thông tin kết nối theo từng lĩnh vực.",
    featuredImage:
      "https://huba.vn/wp-content/uploads/2026/07/Ra-mat-hoi-vien-tai-chuong-trinh-cafe-doanh-nhan-huba-scaled.webp",
    publishedAt: "2026-07-09",
    isFeatured: true,
  },
  {
    title: "Diễn đàn logistics và bài toán giữ lợi nhuận cho doanh nghiệp",
    slug: "dien-dan-logistics-va-bai-toan-giu-loi-nhuan-cho-doanh-nghiep",
    type: "sponsor",
    category: "Đồng hành",
    excerpt:
      "Thêm một bài demo có hình ảnh sân khấu, nhân vật và hội thảo để tăng độ đầy cho layout trang chủ và danh mục bài viết.",
    content:
      "Nội dung loại này phù hợp cho đối tác đồng hành, nhà tài trợ, đơn vị có gian hàng hoặc tham gia các chương trình của hội doanh nghiệp.",
    featuredImage:
      "https://huba.vn/wp-content/uploads/2026/07/Toa-dam-tai-chuong-trinh-cafe-doanh-nhan-huba-scaled.webp",
    publishedAt: "2026-07-08",
    isFeatured: false,
  },
];

export const defaultMembers: MemberShape[] = [
  {
    name: "Hội Doanh nghiệp Xã Bình Hưng",
    slug: "hoi-doanh-nghiep-xa-binh-hung",
    memberType: "club",
    groupType: "Hội cơ sở",
    description:
      "Đơn vị đầu mối kết nối cộng đồng doanh nghiệp, xúc tiến giao thương và đồng hành cùng các chương trình phát triển địa phương.",
    logo: "",
    address: "Xã Bình Hưng, Thành phố Hồ Chí Minh",
    phone: "0901 111 111",
    email: "info@bihuba.vn",
    website: "https://bihuba.vercel.app",
    industry: "Hiệp hội - Tổ chức xã hội",
  },
  {
    name: "Công ty TNHH Thương mại Bình Hưng",
    slug: "cong-ty-tnhh-thuong-mai-binh-hung",
    memberType: "business",
    groupType: "Hội viên doanh nghiệp",
    description:
      "Doanh nghiệp demo cho nhóm thương mại - dịch vụ, phù hợp để trình diễn giao diện danh sách hội viên và trang chi tiết.",
    logo: "",
    address: "Khu dân cư Bình Hưng",
    phone: "0902 222 222",
    email: "contact@thuongmaibinhhung.vn",
    website: "https://example.vn",
    industry: "Thương mại - Dịch vụ",
  },
  {
    name: "Công ty Cổ phần Kỹ thuật Nam Sài Gòn",
    slug: "cong-ty-co-phan-ky-thuat-nam-sai-gon",
    memberType: "business",
    groupType: "Hội viên doanh nghiệp",
    description:
      "Doanh nghiệp demo lĩnh vực kỹ thuật và hạ tầng, phục vụ trình diễn nhiều nhóm hội viên khác nhau trên website.",
    logo: "",
    address: "Khu vực Nam Sài Gòn",
    phone: "0903 333 333",
    email: "hello@namsaigontech.vn",
    website: "https://example.org",
    industry: "Kỹ thuật - Hạ tầng",
  },
];

export const defaultPartners: PartnerShape[] = [
  {
    name: "Đối tác chiến lược Sai Gon Connect",
    slug: "doi-tac-chien-luoc-sai-gon-connect",
    description:
      "Đối tác demo cho khối kết nối, truyền thông và tổ chức sự kiện của BIHUBA.",
    logo: "",
    website: "https://example.com",
    partnerType: "Đối tác chiến lược",
  },
  {
    name: "Trung tâm Hỗ trợ Chuyển đổi số",
    slug: "trung-tam-ho-tro-chuyen-doi-so",
    description:
      "Đối tác demo lĩnh vực chuyển đổi số, tư vấn vận hành và đào tạo hội viên doanh nghiệp.",
    logo: "",
    website: "https://example.org",
    partnerType: "Đối tác chuyển đổi số",
  },
  {
    name: "Liên minh Xúc tiến thương mại địa phương",
    slug: "lien-minh-xuc-tien-thuong-mai-dia-phuong",
    description:
      "Nhóm đối tác đồng hành cho hội chợ, kết nối giao thương và các chương trình giới thiệu sản phẩm.",
    logo: "",
    website: "https://example.net",
    partnerType: "Đối tác xúc tiến thương mại",
  },
];

export const defaultDownloads: DownloadShape[] = [
  {
    title: "Thông báo lịch sinh hoạt và kết nối doanh nghiệp quý III",
    slug: "thong-bao-lich-sinh-hoat-va-ket-noi-doanh-nghiep-quy-iii",
    summary: "Tài liệu demo cho khu vực thông báo, sự kiện và điều phối hoạt động hội viên.",
    fileUrl: "https://example.com/files/thong-bao-ket-noi-doanh-nghiep.pdf",
    category: "thông-báo",
    publishedAt: "2026-07-12",
  },
  {
    title: "Báo cáo tổng hợp hoạt động 6 tháng đầu năm",
    slug: "bao-cao-tong-hop-hoat-dong-6-thang-dau-nam",
    summary: "Tài liệu demo để trình diễn module báo cáo và lưu trữ văn bản điều hành.",
    fileUrl: "https://example.com/files/bao-cao-6-thang.pdf",
    category: "báo-cáo",
    publishedAt: "2026-07-08",
  },
  {
    title: "Mẫu phiếu đăng ký hội viên BIHUBA",
    slug: "mau-phieu-dang-ky-hoi-vien-bihuba",
    summary: "Tệp demo phục vụ module download tài liệu, đơn đăng ký và biểu mẫu nội bộ.",
    fileUrl: "https://example.com/files/phieu-dang-ky-hoi-vien.pdf",
    category: "biểu-mẫu",
    publishedAt: "2026-07-06",
  },
];
