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
        body="Chuyên mục này thay thế nhóm download/download-category bên HUBA, phục vụ báo cáo, thông báo và tài liệu hội viên."
      />
      <div className="mt-10 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {downloads.map((item) => (
          <DownloadCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
