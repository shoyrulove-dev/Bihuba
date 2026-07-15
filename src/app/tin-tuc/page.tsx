import { PostCard } from "@/components/site/post-card";
import { SectionHeading } from "@/components/site/section-heading";
import { getPosts } from "@/lib/content";

export default async function NewsPage() {
  const posts = await getPosts("news");

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading
        eyebrow="Tin tức"
        title="Bản tin BIHUBA"
        body="Chuyên mục cập nhật các thông tin điều hành, hoạt động hội viên và diễn biến nổi bật của cộng đồng doanh nghiệp."
      />
      <div className="mt-10 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
