import { PostCard } from "@/components/site/post-card";
import { SectionHeading } from "@/components/site/section-heading";
import { getPosts } from "@/lib/content";

export default async function EventsPage() {
  const posts = await getPosts("event");

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading
        eyebrow="Sự kiện"
        title="Chuỗi sự kiện và hoạt động kết nối"
        body="Module này thay thế các chuyên mục sự kiện của HUBA như cà phê doanh nhân, hội nghị, tọa đàm và hoạt động giao lưu."
      />
      <div className="mt-10 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
