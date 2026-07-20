import { PostCard } from "@/components/site/post-card";
import { SectionHeading } from "@/components/site/section-heading";
import { getPosts } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function FormsPage() {
  const posts = await getPosts("form");

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading
        eyebrow="Form mẫu"
        title="Biểu mẫu và hồ sơ cần dùng"
        body="Các mẫu thông báo, biểu mẫu đăng ký, hồ sơ hội viên và tài liệu thao tác nhanh của BIHUBA."
      />
      <div className="mt-10 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
