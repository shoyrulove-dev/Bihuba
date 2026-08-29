import { DownloadBrowser } from "@/components/site/download-browser";
import { SectionHeading } from "@/components/site/section-heading";
import { getPublicDownloadCategories as getDownloadCategories, getPublicDownloads as getDownloads } from "@/lib/public-content";

export default async function DownloadsPage() {
  const [categories, downloads] = await Promise.all([getDownloadCategories(), getDownloads()]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <SectionHeading
        eyebrow="Tài liệu"
        title="Kho tài liệu, biểu mẫu và thông báo"
        body="Danh mục tài liệu được tách riêng để thuận tiện quản lý file, hiển thị gọn theo dạng menu và danh sách một dòng."
      />
      <div className="mt-8">
        <DownloadBrowser categories={categories} items={downloads} />
      </div>
    </div>
  );
}
