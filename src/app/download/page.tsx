import { DownloadBrowser } from "@/components/site/download-browser";
import { SectionHeading } from "@/components/site/section-heading";
import { getDownloads } from "@/lib/content";

export default async function DownloadsPage() {
  const downloads = await getDownloads();

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <SectionHeading
        eyebrow="Tài liệu"
        title="Kho tài liệu, biểu mẫu và thông báo"
        body="Khu vực tài liệu được chia theo cây danh mục và danh sách chi tiết để thuận tiện quản lý khi số lượng file tăng lên."
      />
      <div className="mt-10">
        <DownloadBrowser items={downloads} />
      </div>
    </div>
  );
}
