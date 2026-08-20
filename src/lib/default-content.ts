import {
  DownloadCategoryShape,
  DownloadShape,
  MemberShape,
  PartnerShape,
  PostShape,
  SiteSettingsShape,
} from "@/types/cms";

export const defaultDownloadCategories: DownloadCategoryShape[] = [
  {
    name: "Thông báo",
    slug: "thong-bao",
    description: "Thông báo điều hành và cập nhật mới.",
    order: 1,
  },
  {
    name: "Form mẫu",
    slug: "form-mau",
    description: "Biểu mẫu và hồ sơ cần tải xuống.",
    order: 2,
  },
  {
    name: "Tài liệu hội viên",
    slug: "tai-lieu-hoi-vien",
    description: "Tài liệu chuyên đề, hướng dẫn và tài nguyên dành cho hội viên.",
    order: 3,
  },
];

export const defaultSettings: SiteSettingsShape = {
  siteName: "Hội Doanh nghiệp Xã Bình Hưng Thành phố Hồ Chí Minh",
  shortName: "BIHUBA",
  logoUrl: "/bihuba-logo-glow.png",
  wordmarkUrl: "/bihuba-wordmark.svg",
  slogan: "Đoàn kết - Đổi mới - Hội nhập - Phát triển",
  heroTitle: "Cộng đồng doanh nghiệp Bình Hưng kết nối nguồn lực và mở rộng cơ hội phát triển",
  heroSubtitle:
    "Không gian kết nối thông tin, sự kiện, hội viên, đối tác và các chương trình giao thương của cộng đồng doanh nghiệp Bình Hưng.",
  heroImage: "/bihuba-hero-generated.svg",
  heroCtaLabel: "Khám phá tin hoạt động",
  heroCtaHref: "/tin-tuc",
  introTitle: "Về BIHUBA",
  introBody:
    "BIHUBA định hướng trở thành điểm kết nối doanh nghiệp tại khu vực Bình Hưng, thúc đẩy hợp tác, đổi mới và chia sẻ cơ hội tăng trưởng.",
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
    { label: "Lịch làm việc", href: "/lich-tuan" },
    { label: "Form mẫu", href: "/form-mau" },
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
    officeImageUrl: "/contact-office-demo.png",
  },
  floatingActions: {
    zaloUrl: "https://zalo.me/0900000000",
    facebookUrl: "https://facebook.com/",
    callNumber: "0900000000",
    callLabel: "Gọi ngay",
  },
  socialLinks: {
    zalo: "https://zalo.me/0900000000",
    facebook: "https://facebook.com/",
    tiktok: "https://www.tiktok.com/",
    youtube: "https://www.youtube.com/",
  },
  featureBanners: [
    {
      eyebrow: "Sắp diễn ra",
      title: "Diễn đàn kết nối doanh nghiệp BIHUBA 2026",
      subtitle:
        "Không gian gặp gỡ hội viên, đối tác và khách mời để giới thiệu sản phẩm, dịch vụ và cơ hội hợp tác.",
      imageUrl: "/bihuba-program-1.svg",
      href: "/su-kien",
      buttonLabel: "Xem chương trình",
      eventDate: "Tháng 8 / 2026",
    },
    {
      eyebrow: "Hoạt động nổi bật",
      title: "Tuần lễ xúc tiến thương mại và sản phẩm hội viên",
      subtitle:
        "Chuỗi hoạt động trưng bày, kết nối giao thương và truyền thông cho các doanh nghiệp tại Bình Hưng.",
      imageUrl: "/bihuba-program-2.svg",
      href: "/ket-noi-giao-thuong",
      buttonLabel: "Khám phá",
      eventDate: "Quý III / 2026",
    },
  ],
  supporterCompanies: [
    {
      name: "Rex Hotel",
      logoUrl: "https://huba.vn/wp-content/uploads/2024/09/logo-rex-hotel.jpg",
      website: "",
    },
    {
      name: "An Thiên",
      logoUrl: "https://huba.vn/wp-content/uploads/2024/10/Logo-An-thien-chuan.png",
      website: "",
    },
    {
      name: "Nhựa Bình Minh",
      logoUrl: "https://huba.vn/wp-content/uploads/2023/10/nhua-binh-minh-e1701750254985.png",
      website: "",
    },
    {
      name: "Sacombank",
      logoUrl: "https://huba.vn/wp-content/uploads/2026/02/LOGO-SACOMBANK_NEN-TRANG_CEO-DUYET-MAU-27-1-2026-scaled.webp",
      website: "",
    },
    {
      name: "PepsiCo",
      logoUrl: "https://huba.vn/wp-content/uploads/2025/12/PepsiCo-Logo-scaled.webp",
      website: "",
    },
    {
      name: "Cholimex",
      logoUrl: "https://huba.vn/wp-content/uploads/2024/09/LOGO-CHOLIMEX.jpg",
      website: "",
    },
    {
      name: "Saigon Co.op",
      logoUrl: "https://huba.vn/wp-content/uploads/2025/10/saigonco.op-1-scaled-e1761189490344.webp",
      website: "",
    },
    {
      name: "Tân Quang Minh",
      logoUrl: "https://huba.vn/wp-content/uploads/2024/10/logo-tan-quang-minh.png",
      website: "",
    },
    {
      name: "SATRA",
      logoUrl: "https://huba.vn/wp-content/uploads/2024/08/logo-SATRA-scaled-e1761189302624.jpg",
      website: "",
    },
    {
      name: "Liên Thái Bình Dương",
      logoUrl: "https://huba.vn/wp-content/uploads/2023/10/Cong-Ty-TNHH-Xuat-Nhap-Khau-Lien-Thai-Binh-Duong-e1701750219596.png",
      website: "",
    },
    {
      name: "Hòa Phát",
      logoUrl: "https://huba.vn/wp-content/uploads/2025/10/HPG_LOGO-TAP-DOAN-HOA-PHAT-slogan-TV.webp",
      website: "",
    },
    {
      name: "DTR",
      logoUrl: "https://huba.vn/wp-content/uploads/2025/12/Logo-DTR-2024-scaled.webp",
      website: "",
    },
    {
      name: "New Toyo",
      logoUrl: "https://huba.vn/wp-content/uploads/2024/09/logo-new-toyo.jpg",
      website: "",
    },
    {
      name: "SASCO",
      logoUrl: "https://huba.vn/wp-content/uploads/2024/08/logo-sasco-scaled.jpg",
      website: "",
    },
    {
      name: "Hóa chất Miền Nam",
      logoUrl: "https://huba.vn/wp-content/uploads/2023/11/Cong-ty-Co-phan-Dau-nhot-va-Hoa-chat-Mien-Nam-e1701750107783.png",
      website: "",
    },
  ],
  theme: {
    primaryColor: "#0E4FAF",
    accentColor: "#56D6FF",
    surfaceColor: "#F8FAFC",
    fontFamily: "source-sans-pro",
    headingScale: "1",
    bodyScale: "1",
  },
  aiAssistant: {
    enabled: true,
    deepseekModel: "deepseek-v4-flash",
    deepseekApiToken: "",
    model: "llama-3.1-8b-instant",
    systemPrompt:
      "Bạn là Trợ Lý BIHUBA, hỗ trợ hội viên và khách truy cập về thông tin doanh nghiệp, quản trị, kết nối giao thương, thủ tục kinh doanh cơ bản, sự kiện, hội viên và tài liệu của BIHUBA. Trả lời bằng tiếng Việt, ngắn gọn, thực tế, lịch sự. Với nội dung pháp lý, thuế, tài chính hoặc y tế, hãy nhắc người hỏi kiểm tra với chuyên gia có thẩm quyền.",
  },
};

export const defaultPosts: PostShape[] = [
  {
    title: "Lịch công tác BIHUBA từ ngày 13.7.2026 đến ngày 19.7.2026",
    slug: "lich-cong-tac-huba-tu-ngay-13-7-2026-den-ngay-19-7-2026",
    type: "schedule",
    category: "Lịch tuần",
    excerpt:
      "Lịch công tác tổng hợp cho văn phòng hội, phù hợp để cập nhật lịch họp, lịch tiếp khách và kế hoạch tuần.",
    content:
      "BIHUBA cập nhật lịch điều hành, lịch tiếp đối tác và các công việc trọng tâm trong tuần để hội viên theo dõi thuận tiện.",
    featuredImage:
      "https://huba.vn/wp-content/uploads/2026/07/Lich-cong-tac-HUBA-tu-ngay-13.7.2026-den-ngay-19.7.2026.webp",
    publishedAt: "2026-07-14",
    isFeatured: true,
  },
  {
    title: "10 xu hướng chuyển đổi số sẽ thay đổi mô hình kinh doanh trong 5 năm tới",
    slug: "10-xu-huong-chuyen-doi-so-se-thay-doi-mo-hinh-kinh-doanh-trong-5-nam-toi",
    type: "news",
    category: "Tin tức",
    excerpt:
      "Bài viết chuyên đề dành cho cộng đồng doanh nghiệp, giúp khu vực tin tức luôn có chiều sâu và tính cập nhật.",
    content:
      "Chuyển đổi số đang tác động trực tiếp đến vận hành, bán hàng và quản trị doanh nghiệp. BIHUBA chia sẻ các góc nhìn thực tiễn để hội viên tham khảo và kết nối.",
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
      "Sự kiện kết nối và trưng bày sản phẩm phù hợp để giới thiệu hình ảnh hoạt động của hội trên trang chủ.",
    content:
      "Chuyên mục cập nhật các buổi gặp gỡ doanh nghiệp, giới thiệu sản phẩm, tọa đàm chuyên đề và hoạt động kết nối giao thương tại địa phương.",
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
      "Bài viết về quản trị tài chính doanh nghiệp giúp khu vực tin tức thêm phong phú và gần với nhu cầu hội viên.",
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
      "Nội dung dành cho khu vực kết nối giao thương, dùng để giới thiệu nhu cầu hợp tác và cơ hội mở rộng mạng lưới doanh nghiệp.",
    content:
      "Chuyên mục là nơi chia sẻ nhu cầu hợp tác, giới thiệu sản phẩm, tìm kiếm nhà cung cấp và thông tin kết nối theo từng lĩnh vực.",
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
      "Bài viết về diễn đàn và hội thảo chuyên đề giúp trang chủ và danh mục bài viết có nhịp nội dung phong phú hơn.",
    content:
      "Nội dung loại này phù hợp cho đối tác đồng hành, nhà tài trợ, đơn vị có gian hàng hoặc tham gia các chương trình của hội doanh nghiệp.",
    featuredImage:
      "https://huba.vn/wp-content/uploads/2026/07/Toa-dam-tai-chuong-trinh-cafe-doanh-nhan-huba-scaled.webp",
    publishedAt: "2026-07-08",
    isFeatured: false,
  },
  {
    title: "10 xu hướng chuyển đổi số sẽ thay đổi mô hình kinh doanh trong 5 năm tới",
    slug: "10-xu-huong-chuyen-doi-so-se-thay-doi-mo-hinh-kinh-doanh-trong-5-nam-toi",
    type: "news",
    category: "Tin tức",
    excerpt:
      "Bài viết tổng hợp xu hướng tự động hóa, dữ liệu và nền tảng vận hành dành cho cộng đồng doanh nghiệp.",
    content:
      "Chuyên mục tin tức của BIHUBA tập trung vào chuyển đổi số, năng lực quản trị và nâng cao hiệu quả vận hành để tạo giá trị đọc thường xuyên cho hội viên.",
    featuredImage: "https://huba.vn/wp-content/uploads/2026/07/featured-image-1.png",
    publishedAt: "2026-07-15",
    isFeatured: true,
  },
  {
    title: "Chi phí logistics tăng cao: Doanh nghiệp cần làm gì để giữ lợi nhuận?",
    slug: "chi-phi-logistics-tang-cao-doanh-nghiep-can-lam-gi-de-giu-loi-nhuan",
    type: "news",
    category: "Tin tức",
    excerpt:
      "Góc nhìn thực tiễn về chi phí vận hành, tối ưu chuỗi cung ứng và sức chịu đựng của doanh nghiệp.",
    content:
      "Đây là nhóm bài chuyên đề phù hợp để BIHUBA duy trì nhịp thông tin kinh doanh thiết thực, giúp website có chiều sâu và gắn với nhu cầu quản trị của hội viên.",
    featuredImage: "https://huba.vn/wp-content/uploads/2026/07/Toa-dam-tai-chuong-trinh-cafe-doanh-nhan-huba-scaled.webp",
    publishedAt: "2026-07-14",
    isFeatured: false,
  },
  {
    title: "Cải thiện hạ tầng pháp lý: Nền móng cho năng lực cạnh tranh doanh nghiệp",
    slug: "cai-thien-ha-tang-phap-ly-nen-mong-cho-nang-luc-canh-tranh-doanh-nghiep",
    type: "news",
    category: "Tin tức",
    excerpt:
      "Phân tích ngắn về chính sách, môi trường đầu tư và vai trò của khuôn khổ pháp lý trong phát triển doanh nghiệp.",
    content:
      "Nhóm nội dung pháp lý và chính sách giúp cộng đồng doanh nghiệp theo dõi bối cảnh vĩ mô, chuẩn bị kế hoạch tăng trưởng và thích ứng phù hợp.",
    featuredImage: "https://huba.vn/wp-content/uploads/2026/07/soket-3.webp",
    publishedAt: "2026-07-11",
    isFeatured: false,
  },
  {
    title: "Nhà ở xã hội cho thuê: Giải pháp an cư bền vững cho người lao động và động lực phát triển doanh nghiệp",
    slug: "nha-o-xa-hoi-cho-thue-giai-phap-an-cu-ben-vung-cho-nguoi-lao-dong",
    type: "news",
    category: "Tin tức",
    excerpt:
      "Thông tin chuyên đề về nhà ở, lực lượng lao động và tác động lâu dài tới sức bật của doanh nghiệp.",
    content:
      "Bài viết dạng này phù hợp để mở rộng góc nhìn của chuyên mục tin tức, không chỉ dừng ở hoạt động hội mà còn chạm tới các vấn đề phát triển bền vững của doanh nghiệp.",
    featuredImage: "https://huba.vn/wp-content/uploads/2026/07/Trien-lam-tai-chuong-trinh-cafe-huba-scaled.webp",
    publishedAt: "2026-07-10",
    isFeatured: false,
  },
  {
    title: "Chính sách kinh tế 2026: Doanh nghiệp cần chuẩn bị gì trước những thay đổi lớn?",
    slug: "chinh-sach-kinh-te-2026-doanh-nghiep-can-chuan-bi-gi",
    type: "news",
    category: "Tin tức",
    excerpt:
      "Bộ bài tổng hợp các thay đổi đáng chú ý và gợi ý chuẩn bị nguồn lực cho giai đoạn mới.",
    content:
      "Trang tin BIHUBA cập nhật xu hướng và những thay đổi chính sách đáng chú ý để hội viên có thêm thông tin tham khảo.",
    featuredImage: "https://huba.vn/wp-content/uploads/2026/07/Ra-mat-hoi-vien-tai-chuong-trinh-cafe-doanh-nhan-huba-scaled.webp",
    publishedAt: "2026-07-09",
    isFeatured: false,
  },
  {
    title: "Trung tâm tài chính quốc tế TP.HCM: Chìa khóa cho doanh nghiệp",
    slug: "trung-tam-tai-chinh-quoc-te-tp-hcm-chia-khoa-cho-doanh-nghiep",
    type: "news",
    category: "Tin tức",
    excerpt:
      "Chủ đề tài chính, đầu tư và kết nối nguồn lực được trình bày theo hướng dễ theo dõi cho doanh nghiệp.",
    content:
      "Các bài về tài chính, tín dụng, đầu tư và cơ hội thị trường sẽ là phần nội dung quan trọng giúp website có tính chuyên môn và giá trị tra cứu cao hơn.",
    featuredImage: "https://huba.vn/wp-content/uploads/2026/07/featured-image-1.png",
    publishedAt: "2026-07-08",
    isFeatured: false,
  },
  {
    title: "Xung đột Trung Đông và tác động đến doanh nghiệp TP.HCM",
    slug: "xung-dot-trung-dong-va-tac-dong-den-doanh-nghiep-tp-hcm",
    type: "news",
    category: "Tin tức",
    excerpt:
      "Bài viết góc nhìn thị trường, xuất nhập khẩu và rủi ro chuỗi cung ứng dành cho doanh nghiệp hội viên.",
    content:
      "Những chủ đề quốc tế có ảnh hưởng tới giá cả, nguồn cung và sức mua nội địa giúp chuyên mục tin tức rộng hơn và bám sát thực tế kinh doanh.",
    featuredImage: "https://huba.vn/wp-content/uploads/2026/07/Toa-dam-tai-chuong-trinh-cafe-doanh-nhan-huba-scaled.webp",
    publishedAt: "2026-07-07",
    isFeatured: false,
  },
  {
    title: "Gia Lai thu hút đầu tư 2026: Cơ hội vàng cho doanh nghiệp",
    slug: "gia-lai-thu-hut-dau-tu-2026-co-hoi-vang-cho-doanh-nghiep",
    type: "news",
    category: "Tin tức",
    excerpt:
      "Bản tin mở rộng cơ hội đầu tư, hợp tác vùng và kết nối thị trường cho cộng đồng doanh nghiệp.",
    content:
      "Thông tin về cơ hội đầu tư, kết nối tỉnh thành và xúc tiến địa phương hỗ trợ hội viên đang tìm hướng mở rộng kinh doanh.",
    featuredImage: "https://huba.vn/wp-content/uploads/2026/07/soket-3.webp",
    publishedAt: "2026-07-06",
    isFeatured: false,
  },
  {
    title: "Tiếp tục thực hiện chuỗi hoạt động Dân vận khéo về an sinh xã hội quý II năm 2026",
    slug: "tiep-tuc-thuc-hien-chuoi-hoat-dong-dan-van-kheo-quy-ii-2026",
    type: "event",
    category: "Sự kiện",
    excerpt:
      "Tin hoạt động cộng đồng và trách nhiệm xã hội, phù hợp để mở rộng chiều sâu hình ảnh của hội.",
    content:
      "Website BIHUBA nên có không gian riêng cho hoạt động cộng đồng, an sinh xã hội và các chương trình đồng hành tại địa phương nhằm tăng tính gắn kết thương hiệu hội.",
    featuredImage: "https://huba.vn/wp-content/uploads/2026/07/soket-3.webp",
    publishedAt: "2026-07-05",
    isFeatured: false,
  },
  {
    title: "HUBA tổng kết năm 2025, triển khai nhiệm vụ năm 2026",
    slug: "huba-tong-ket-nam-2025-trien-khai-nhiem-vu-nam-2026",
    type: "event",
    category: "Sự kiện",
    excerpt:
      "Thông tin tổng kết hoạt động, kỳ họp, hội nghị và kế hoạch thường niên của Hội.",
    content:
      "Nội dung tổng kết hoạt động, họp ban chấp hành và triển khai nhiệm vụ được cập nhật để hội viên thuận tiện theo dõi.",
    featuredImage: "https://huba.vn/wp-content/uploads/2026/07/soket-3.webp",
    publishedAt: "2026-07-04",
    isFeatured: true,
  },
  {
    title: "Triển lãm Quốc tế Đồ gia dụng và Quà tặng Việt Nam 2025",
    slug: "trien-lam-quoc-te-do-gia-dung-va-qua-tang-viet-nam-2025",
    type: "trade",
    category: "Kết nối giao thương",
    excerpt:
      "Thông tin hội chợ - triển lãm phục vụ nhóm doanh nghiệp sản xuất, thương mại và phân phối.",
    content:
      "Kênh kết nối giao thương cập nhật tin mời tham gia triển lãm, giới thiệu gian hàng, hoạt động xúc tiến và mở rộng đầu mối phân phối.",
    featuredImage: "https://huba.vn/wp-content/uploads/2026/07/Trien-lam-tai-chuong-trinh-cafe-huba-scaled.webp",
    publishedAt: "2026-07-03",
    isFeatured: true,
  },
  {
    title: "Triển lãm Quốc tế Sản phẩm và Đồ chơi Trẻ em Việt Nam 2025",
    slug: "trien-lam-quoc-te-san-pham-va-do-choi-tre-em-viet-nam-2025",
    type: "trade",
    category: "Kết nối giao thương",
    excerpt:
      "Bộ nội dung dành cho doanh nghiệp muốn quảng bá sản phẩm và tiếp cận nhóm khách hàng mới qua sự kiện chuyên ngành.",
    content:
      "Trang kết nối giao thương nên có thêm các tin chuyên ngành, giới thiệu triển lãm và lịch gặp gỡ doanh nghiệp để tăng khả năng chuyển đổi từ truy cập sang cơ hội hợp tác.",
    featuredImage: "https://huba.vn/wp-content/uploads/2026/07/Trien-lam-tai-chuong-trinh-cafe-huba-scaled.webp",
    publishedAt: "2026-07-02",
    isFeatured: false,
  },
  {
    title: "Triển lãm Quốc tế điện tử và Thiết bị thông minh Việt Nam 2025",
    slug: "trien-lam-quoc-te-dien-tu-va-thiet-bi-thong-minh-viet-nam-2025",
    type: "trade",
    category: "Kết nối giao thương",
    excerpt:
      "Kênh thông tin dành cho doanh nghiệp sản xuất, công nghệ và phân phối thiết bị thông minh.",
    content:
      "Các bài về xúc tiến thương mại, sự kiện chuyên ngành và hoạt động trưng bày sản phẩm sẽ giúp module này hoạt động đúng tinh thần kết nối kinh doanh.",
    featuredImage: "https://huba.vn/wp-content/uploads/2026/07/Ra-mat-hoi-vien-tai-chuong-trinh-cafe-doanh-nhan-huba-scaled.webp",
    publishedAt: "2026-07-01",
    isFeatured: false,
  },
  {
    title: "Hội nghị xúc tiến đầu tư Bình Định: Cơ hội vàng cho doanh nghiệp",
    slug: "hoi-nghi-xuc-tien-dau-tu-binh-dinh-co-hoi-vang-cho-doanh-nghiep",
    type: "trade",
    category: "Kết nối giao thương",
    excerpt:
      "Tin mời đầu tư và giao thương theo địa phương, phù hợp để hội viên cập nhật nhanh cơ hội thị trường.",
    content:
      "BIHUBA có thể mở rộng chuyên mục này thành nơi tổng hợp cơ hội xúc tiến, kết nối tỉnh thành và các điểm chạm đầu tư dành cho hội viên.",
    featuredImage: "https://huba.vn/wp-content/uploads/2026/07/Toa-dam-tai-chuong-trinh-cafe-doanh-nhan-huba-scaled.webp",
    publishedAt: "2026-06-30",
    isFeatured: false,
  },
  {
    title: "Chuyển đổi số: Đòn bẩy cho doanh nghiệp với chương trình Trăm doanh nghiệp - Vạn đơn hàng",
    slug: "chuyen-doi-so-don-bay-cho-doanh-nghiep-voi-chuong-trinh-tram-doanh-nghiep-van-don-hang",
    type: "trade",
    category: "Kết nối giao thương",
    excerpt:
      "Thông tin chương trình hỗ trợ bán hàng, tài khoản số và năng lực thương mại điện tử cho doanh nghiệp.",
    content:
      "Đây là dạng nội dung rất phù hợp để BIHUBA vừa quảng bá chương trình hỗ trợ vừa điều hướng doanh nghiệp quan tâm vào các đầu mối cụ thể.",
    featuredImage: "https://huba.vn/wp-content/uploads/2026/07/featured-image-1.png",
    publishedAt: "2026-06-29",
    isFeatured: false,
  },
  {
    title: "Lịch công tác HUBA từ ngày 06.7.2026 đến ngày 12.7.2026",
    slug: "lich-cong-tac-huba-tu-ngay-06-7-2026-den-ngay-12-7-2026",
    type: "schedule",
    category: "Lịch tuần",
    excerpt:
      "Lịch điều hành mẫu cho tuần làm việc, phù hợp để văn phòng hội cập nhật nhanh các cuộc họp và chương trình.",
    content:
      "Trang lịch tuần có thể duy trì theo tuần hoặc theo tháng, là nơi giúp ban chấp hành, hội viên và đối tác nắm lịch hoạt động công khai của BIHUBA.",
    featuredImage: "https://huba.vn/wp-content/uploads/2026/07/Lich-cong-tac-HUBA-tu-ngay-13.7.2026-den-ngay-19.7.2026.webp",
    publishedAt: "2026-06-28",
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
    coverImage: "/member-banners/manufacturing-trade.png",
    introImage: "",
    companyTagline: "Kết nối cộng đồng doanh nghiệp và mở rộng cơ hội hợp tác.",
    products: [
      {
        title: "Gói kết nối hội viên",
        imageUrl: "",
        summary: "Dịch vụ hỗ trợ kết nối giao thương, giới thiệu doanh nghiệp và xúc tiến cơ hội hợp tác.",
        price: "Liên hệ",
        link: "",
        type: "service",
      },
    ],
  },
  {
    name: "Công ty TNHH Thương mại Bình Hưng",
    slug: "cong-ty-tnhh-thuong-mai-binh-hung",
    memberType: "business",
    groupType: "Hội viên doanh nghiệp",
    description:
      "Doanh nghiệp thuộc nhóm thương mại - dịch vụ, phù hợp để hiển thị trong danh sách hội viên và trang chi tiết.",
    logo: "",
    address: "Khu dân cư Bình Hưng",
    phone: "0902 222 222",
    email: "contact@thuongmaibinhhung.vn",
    website: "https://example.vn",
    industry: "Thương mại - Dịch vụ",
    coverImage: "/member-banners/finance-partner.png",
    introImage: "",
    companyTagline: "Nhà cung cấp hàng hóa và dịch vụ thương mại cho khu vực Bình Hưng.",
    products: [
      {
        title: "Phân phối hàng tiêu dùng",
        imageUrl: "",
        summary: "Cung cấp danh mục hàng tiêu dùng, sản phẩm gia dụng và hàng tiện ích.",
        price: "Theo báo giá",
        link: "",
        type: "product",
      },
    ],
  },
  {
    name: "Công ty Cổ phần Kỹ thuật Nam Sài Gòn",
    slug: "cong-ty-co-phan-ky-thuat-nam-sai-gon",
    memberType: "business",
    groupType: "Hội viên doanh nghiệp",
    description:
      "Doanh nghiệp lĩnh vực kỹ thuật và hạ tầng, phục vụ hiển thị các nhóm hội viên đa dạng trên website.",
    logo: "",
    address: "Khu vực Nam Sài Gòn",
    phone: "0903 333 333",
    email: "hello@namsaigontech.vn",
    website: "https://example.org",
    industry: "Kỹ thuật - Hạ tầng",
    coverImage: "/member-banners/presmile-dental-center.png",
    introImage: "",
    companyTagline: "Tư vấn, thi công và bảo trì các hạng mục kỹ thuật cho doanh nghiệp.",
    products: [
      {
        title: "Dịch vụ bảo trì kỹ thuật",
        imageUrl: "",
        summary: "Bảo trì hệ thống, kiểm tra định kỳ và hỗ trợ vận hành công trình kỹ thuật.",
        price: "Liên hệ",
        link: "",
        type: "service",
      },
    ],
  },
];

export const defaultPartners: PartnerShape[] = [
  {
    name: "Đối tác chiến lược Sai Gon Connect",
    slug: "doi-tac-chien-luoc-sai-gon-connect",
    description:
      "Đối tác cho khối kết nối, truyền thông và tổ chức sự kiện của BIHUBA.",
    logo: "",
    website: "https://example.com",
    partnerType: "Đối tác chiến lược",
  },
  {
    name: "Trung tâm Hỗ trợ Chuyển đổi số",
    slug: "trung-tam-ho-tro-chuyen-doi-so",
    description:
      "Đối tác lĩnh vực chuyển đổi số, tư vấn vận hành và đào tạo hội viên doanh nghiệp.",
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
  {
    name: "Rex Hotel",
    slug: "rex-hotel",
    description: "Đơn vị đồng hành phù hợp cho các chương trình hội nghị, gặp gỡ doanh nhân và hoạt động tiếp đón đối tác.",
    logo: "https://huba.vn/wp-content/uploads/2024/09/logo-rex-hotel.jpg",
    website: "",
    partnerType: "Đối tác đồng hành",
  },
  {
    name: "Sacombank",
    slug: "sacombank",
    description: "Đối tác tài chính và ngân hàng, phù hợp cho các hoạt động kết nối dịch vụ tài chính doanh nghiệp.",
    logo: "https://huba.vn/wp-content/uploads/2026/02/LOGO-SACOMBANK_NEN-TRANG_CEO-DUYET-MAU-27-1-2026-scaled.webp",
    website: "",
    partnerType: "Đối tác tài chính",
  },
  {
    name: "SATRA",
    slug: "satra",
    description: "Đối tác trong lĩnh vực thương mại và phân phối, có thể đồng hành trong các chương trình xúc tiến hàng Việt.",
    logo: "https://huba.vn/wp-content/uploads/2024/08/logo-SATRA-scaled-e1761189302624.jpg",
    website: "",
    partnerType: "Đối tác thương mại",
  },
  {
    name: "Saigon Co.op",
    slug: "saigon-coop",
    description: "Đối tác bán lẻ và hệ thống phân phối, phù hợp với nhóm chương trình quảng bá sản phẩm hội viên.",
    logo: "https://huba.vn/wp-content/uploads/2025/10/saigonco.op-1-scaled-e1761189490344.webp",
    website: "",
    partnerType: "Đối tác bán lẻ",
  },
  {
    name: "PepsiCo",
    slug: "pepsico",
    description: "Đối tác thương hiệu tiêu dùng lớn, giúp dải đối tác trên website đa dạng và có độ nhận diện cao hơn.",
    logo: "https://huba.vn/wp-content/uploads/2025/12/PepsiCo-Logo-scaled.webp",
    website: "",
    partnerType: "Đối tác thương hiệu",
  },
  {
    name: "Cholimex",
    slug: "cholimex",
    description: "Đối tác ngành thực phẩm và thương mại, phù hợp với các chương trình giới thiệu sản phẩm doanh nghiệp địa phương.",
    logo: "https://huba.vn/wp-content/uploads/2024/09/LOGO-CHOLIMEX.jpg",
    website: "",
    partnerType: "Đối tác ngành hàng",
  },
  {
    name: "Hòa Phát",
    slug: "hoa-phat",
    description: "Đối tác công nghiệp có độ nhận diện cao, góp phần làm dày thêm mạng lưới liên kết trên website.",
    logo: "https://huba.vn/wp-content/uploads/2025/10/HPG_LOGO-TAP-DOAN-HOA-PHAT-slogan-TV.webp",
    website: "",
    partnerType: "Đối tác công nghiệp",
  },
  {
    name: "Liên Thái Bình Dương",
    slug: "lien-thai-binh-duong",
    description: "Đối tác có thể đại diện cho nhóm doanh nghiệp xuất nhập khẩu và phân phối trong mạng lưới đồng hành.",
    logo: "https://huba.vn/wp-content/uploads/2023/10/Cong-Ty-TNHH-Xuat-Nhap-Khau-Lien-Thai-Binh-Duong-e1701750219596.png",
    website: "",
    partnerType: "Đối tác chiến lược",
  },
  {
    name: "New Toyo",
    slug: "new-toyo",
    description: "Đối tác nhóm sản xuất, bao bì và công nghiệp hỗ trợ, phù hợp với dải doanh nghiệp đồng hành trên website.",
    logo: "https://huba.vn/wp-content/uploads/2024/09/logo-new-toyo.jpg",
    website: "",
    partnerType: "Đối tác sản xuất",
  },
  {
    name: "SASCO",
    slug: "sasco",
    description: "Đối tác dịch vụ, du lịch và thương mại, giúp khối đối tác có sự đa dạng ngành nghề rõ hơn.",
    logo: "https://huba.vn/wp-content/uploads/2024/08/logo-sasco-scaled.jpg",
    website: "",
    partnerType: "Đối tác dịch vụ",
  },
  {
    name: "Hóa chất Miền Nam",
    slug: "hoa-chat-mien-nam",
    description: "Đối tác công nghiệp và vật tư, dùng để hoàn thiện danh mục đối tác demo cho website.",
    logo: "https://huba.vn/wp-content/uploads/2023/11/Cong-ty-Co-phan-Dau-nhot-va-Hoa-chat-Mien-Nam-e1701750107783.png",
    website: "",
    partnerType: "Đối tác công nghiệp",
  },
  {
    name: "Tân Quang Minh",
    slug: "tan-quang-minh",
    description: "Đối tác ngành đồ uống và thương hiệu tiêu dùng, phù hợp với mục tiêu làm đầy khu vực đối tác trước bàn giao.",
    logo: "https://huba.vn/wp-content/uploads/2024/10/logo-tan-quang-minh.png",
    website: "",
    partnerType: "Đối tác thương hiệu",
  },
];

export const defaultDownloads: DownloadShape[] = [
  {
    title: "Thông báo lịch sinh hoạt và kết nối doanh nghiệp quý III",
    slug: "thong-bao-lich-sinh-hoat-va-ket-noi-doanh-nghiep-quy-iii",
    summary: "Tài liệu cho khu vực thông báo, sự kiện và điều phối hoạt động hội viên.",
    coverImage: "/bihuba-program-1.svg",
    fileUrl: "https://example.com/files/thong-bao-ket-noi-doanh-nghiep.pdf",
    documentType: "Thông báo",
    fileFormat: "pdf",
    categorySlug: "thong-bao",
    category: "thông-báo",
    publishedAt: "2026-07-12",
  },
  {
    title: "Báo cáo tổng hợp hoạt động 6 tháng đầu năm",
    slug: "bao-cao-tong-hop-hoat-dong-6-thang-dau-nam",
    summary: "Tài liệu phục vụ module báo cáo và lưu trữ văn bản điều hành.",
    coverImage: "/bihuba-program-2.svg",
    fileUrl: "https://example.com/files/bao-cao-6-thang.pdf",
    documentType: "Báo cáo",
    fileFormat: "pdf",
    categorySlug: "tai-lieu-hoi-vien",
    category: "báo-cáo",
    publishedAt: "2026-07-08",
  },
  {
    title: "Mẫu phiếu đăng ký hội viên BIHUBA",
    slug: "mau-phieu-dang-ky-hoi-vien-bihuba",
    summary: "Tệp phục vụ khu vực tải tài liệu, đơn đăng ký và form mẫu nội bộ.",
    coverImage: "/bihuba-program-3.svg",
    fileUrl: "https://example.com/files/phieu-dang-ky-hoi-vien.pdf",
    documentType: "Form mẫu",
    fileFormat: "pdf",
    categorySlug: "form-mau",
    category: "Form mẫu",
    publishedAt: "2026-07-06",
  },
];
