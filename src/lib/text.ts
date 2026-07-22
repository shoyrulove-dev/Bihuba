const UTF8_AS_LATIN1_PATTERN =
  /(\u00c3[\u0080-\u00bf]|\u00c2[\u0080-\u00bf]|\u00c4[\u0080-\u00bf]|\u00c6[\u0080-\u00bf]|\u00e1[\u0080-\u00bf]{1,2}|\u00c4\u0091|\u00c4\u0090)/;

const QUESTION_MARK_REPAIRS: Array<[RegExp, string]> = [
  [/10 xu h\?\?ng chuy\?n \?\?i s\? s\? thay \?\?i m\? h\?nh kinh doanh trong 5 n\?m t\?i/g, "10 xu hướng chuyển đổi số sẽ thay đổi mô hình kinh doanh trong 5 năm tới"],
  [/B\?i vi\?t t\?ng h\?p xu h\?\?ng t\? \?\?ng h\?a, d\? li\?u v\? n\?n t\?ng v\?n h\?nh d\?nh cho c\?ng \?\?ng doanh nghi\?p\./g, "Bài viết tổng hợp xu hướng tự động hóa, dữ liệu và nền tảng vận hành dành cho cộng đồng doanh nghiệp."],
  [/C\?ng th\?ng tin BIHUBA .*?k\?t n\.\.\./g, "Cổng thông tin BIHUBA được xây dựng theo hướng hiện đại, quản trị tập trung, phù hợp cho tin tức, sự kiện, hội viên, đối tác và các chương trình kết nối."],
  [/B\?i vi\?t chuy\?n \?\? d\?nh cho c\?ng \?\?ng doanh nghi\?p, gi\?p khu v\?c tin t\?c lu\?n c\? chi\?u s\?u v\? t\?nh c\?p nh\?t\./g, "Bài viết chuyên đề dành cho cộng đồng doanh nghiệp, giúp khu vực tin tức luôn có chiều sâu và tính cập nhật."],
  [/T\?i li\?u m\?u d\?\?c t\?o tr\?c ti\?p t\? admin d\? ki\?m tra \?nh b\?a, preview PDF v\? t\?i file\./g, "Tài liệu mẫu được tạo trực tiếp từ admin để kiểm tra ảnh bìa, preview PDF và tải file."],
  [/Th\?ng b\?o/g, "Thông báo"],
  [/Bi\?u m\?u/g, "Biểu mẫu"],
  [/T\?i li\?u/g, "Tài liệu"],
  [/M\?u phi\?u/g, "Mẫu phiếu"],
  [/ng\?y/g, "ngày"],
  [/h\?i vi\?n/g, "hội viên"],
  [/doanh nghi\?p/g, "doanh nghiệp"],
];

const replacementCharacter = "\uFFFD";
const REPLACEMENT_CHAR_REPAIRS: Array<[RegExp, string]> = [
  [new RegExp(`H${replacementCharacter}nh tr${replacementCharacter}nh li${replacementCharacter}n k${replacementCharacter}t`, "g"), "Hành trình liên kết"],
  [new RegExp(`${replacementCharacter}${replacementCharacter}ng h${replacementCharacter}nh ph${replacementCharacter}t tri${replacementCharacter}n`, "g"), "đồng hành phát triển"],
  [new RegExp(`c${replacementCharacter}a H${replacementCharacter}i Doanh Nghi${replacementCharacter}p`, "g"), "của Hội Doanh Nghiệp"],
  [new RegExp(`x${replacementCharacter} B${replacementCharacter}nh H${replacementCharacter}ng`, "g"), "xã Bình Hưng"],
  [new RegExp(`c${replacementCharacter}c Doanh nghi${replacementCharacter}p h${replacementCharacter}i vi${replacementCharacter}n`, "g"), "các Doanh nghiệp hội viên"],
  [new RegExp(`c${replacementCharacter}ng Tr${replacementCharacter}${replacementCharacter}ng ${replacementCharacter}?i h${replacementCharacter}?c V?n Hi?n`, "g"), "cùng Trường Đại học Văn Hiến"],
  [new RegExp(`${replacementCharacter}ng Nguy?n V?n C${replacementCharacter}m`, "g"), "Ông Nguyễn Văn Cẩm"],
  [new RegExp(`ch${replacementCharacter} t${replacementCharacter}?ch H${replacementCharacter}i Doanh Nghi${replacementCharacter}p`, "g"), "chủ tịch Hội Doanh Nghiệp"],
  [new RegExp(`gi${replacementCharacter}m ${replacementCharacter}${replacementCharacter}c C${replacementCharacter}ng ty`, "g"), "giám đốc Công ty"],
  [new RegExp(`B${replacementCharacter} Nguy?n Th?y D${replacementCharacter}${replacementCharacter}ng`, "g"), "Bà Nguyễn Thùy Dương"],
  [new RegExp(`${replacementCharacter}ng V${replacementCharacter} Quang Ph${replacementCharacter}c`, "g"), "Ông Võ Quang Phúc"],
  [new RegExp(`t${replacementCharacter}ng gi${replacementCharacter}m ${replacementCharacter}${replacementCharacter}c`, "g"), "tổng giám đốc"],
  [new RegExp(`c${replacementCharacter} ph${replacementCharacter}n ph${replacementCharacter}t tri${replacementCharacter}n th${replacementCharacter}${replacementCharacter}ng`, "g"), "cổ phần phát triển thương"],
  [new RegExp(`${replacementCharacter}ng Nguy?n V?n M${replacementCharacter}t`, "g"), "Ông Nguyễn Văn Một"],
  [new RegExp(`th${replacementCharacter}c ph${replacementCharacter}m`, "g"), "thực phẩm"],
  [new RegExp(`${replacementCharacter}ng Tr?n Thanh Vi`, "g"), "Ông Trần Thanh Vi"],
  [new RegExp(`du l${replacementCharacter}?ch Qu${replacementCharacter}?c T${replacementCharacter}?`, "g"), "du lịch Quốc Tế"],
  [new RegExp(`L${replacementCharacter}? K${replacementCharacter}? K${replacementCharacter}?T & TRI ${replacementCharacter}?N DOANH NGHI${replacementCharacter}?P`, "g"), "LỄ KÝ KẾT & TRI ÂN DOANH NGHIỆP"],
  [new RegExp(`M${replacementCharacter}? R${replacementCharacter}?NG H${replacementCharacter}?P T${replacementCharacter}?C DOANH NGHI${replacementCharacter}?P`, "g"), "MỞ RỘNG HỢP TÁC DOANH NGHIỆP"],
  [new RegExp(`N${replacementCharacter}NG T${replacementCharacter}?M C${replacementCharacter} H${replacementCharacter}?I NGH${replacementCharacter}? NGHI${replacementCharacter}?P`, "g"), "NÂNG TẦM CƠ HỘI NGHỀ NGHIỆP"],
];

function repairString(value: string) {
  let repaired = value;

  if (UTF8_AS_LATIN1_PATTERN.test(repaired)) {
    try {
      repaired = Buffer.from(repaired, "latin1").toString("utf8");
    } catch {
      repaired = value;
    }
  }

  if (repaired.includes("?")) {
    QUESTION_MARK_REPAIRS.forEach(([pattern, replacement]) => {
      repaired = repaired.replace(pattern, replacement);
    });
  }

  if (repaired.includes(replacementCharacter)) {
    REPLACEMENT_CHAR_REPAIRS.forEach(([pattern, replacement]) => {
      repaired = repaired.replace(pattern, replacement);
    });
  }

  return repaired.normalize("NFC");
}

export function repairDeepText<T>(value: T): T {
  if (typeof value === "string") {
    return repairString(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => repairDeepText(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [key, repairDeepText(item)])
    ) as T;
  }

  return value;
}
