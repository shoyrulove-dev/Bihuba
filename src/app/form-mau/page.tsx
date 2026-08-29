import { DownloadCard } from "@/components/site/download-card";
import { SectionHeading } from "@/components/site/section-heading";
import { getPublicDownloads as getDownloads } from "@/lib/public-content";

function isFormDownload(item: { category?: string; categorySlug?: string; documentType?: string }) {
  const values = [item.category, item.categorySlug, item.documentType].map((value) =>
    String(value || "").toLowerCase()
  );

  return values.some(
    (value) =>
      value.includes("form") ||
      value.includes("bieu-mau") ||
      value.includes("biểu mẫu") ||
      value.includes("mẫu")
  );
}

export default async function FormsPage() {
  const downloads = (await getDownloads()).filter(isFormDownload);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading
        eyebrow="Download"
        title="Form mẫu"
        body="Các biểu mẫu, hồ sơ và file tải về được quản lý trong mục Tài liệu/Download."
      />
      <div className="mt-8 grid gap-4">
        {downloads.length ? (
          downloads.map((item) => <DownloadCard key={item.slug} item={item} />)
        ) : (
          <div className="rounded-[1.3rem] border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
            Chưa có file trong hạng mục Form mẫu.
          </div>
        )}
      </div>
    </div>
  );
}
