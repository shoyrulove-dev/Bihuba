import { DownloadCard } from "@/components/site/download-card";
import { SectionHeading } from "@/components/site/section-heading";
import { getDownloads } from "@/lib/content";

export default async function DownloadsPage() {
  const downloads = await getDownloads();

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading
        eyebrow="Tài liệu"
        title="Download và thông báo"
        body="Khu vực lưu trữ thông báo, biểu mẫu, báo cáo và các tài liệu cần gửi tới hội viên, đối tác và ban điều hành."
      />
      <div className="mt-10 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {downloads.map((item) => (
          <DownloadCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
