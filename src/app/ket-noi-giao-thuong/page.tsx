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
        body="Đây là module dành cho hội chợ, kết nối doanh nghiệp, xúc tiến sản phẩm và các hoạt động thương mại."
      />
      <div className="mt-10 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
