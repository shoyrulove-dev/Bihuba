import { PostCard } from "@/components/site/post-card";
import { SectionHeading } from "@/components/site/section-heading";
import { getPosts } from "@/lib/content";

export default async function SchedulePage() {
  const posts = await getPosts("schedule");

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading
        eyebrow="Lịch tuần"
        title="Lịch điều hành và lịch công tác"
        body="Bên BIHUBA có thể cập nhật theo tuần trực tiếp từ admin mà không cần sửa code."
      />
      <div className="mt-10 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
