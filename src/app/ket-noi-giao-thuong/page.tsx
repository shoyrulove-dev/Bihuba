import { PostCard } from "@/components/site/post-card";
import { SectionHeading } from "@/components/site/section-heading";
import { getPosts } from "@/lib/content";

export default async function TradePage() {
  const posts = await getPosts("trade");

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading
        eyebrow="Kết nối giao thương"
        title="Xúc tiến thương mại và cơ hội hợp tác"
        body="Không gian dành cho hội chợ, kết nối doanh nghiệp, giới thiệu sản phẩm, xúc tiến thương mại và mở rộng cơ hội hợp tác."
      />
      <div className="mt-10 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
