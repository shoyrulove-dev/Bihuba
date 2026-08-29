import { PostCard } from "@/components/site/post-card";
import { SectionHeading } from "@/components/site/section-heading";
import { getPublicPosts as getPosts } from "@/lib/public-content";

export default async function NewsPage() {
  const posts = await getPosts("news");

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading
        eyebrow={"Tin t\u1ee9c"}
        title={"B\u1ea3n tin BIHUBA"}
        body={"Chuy\u00ean m\u1ee5c c\u1eadp nh\u1eadt c\u00e1c th\u00f4ng tin \u0111i\u1ec1u h\u00e0nh, ho\u1ea1t \u0111\u1ed9ng h\u1ed9i vi\u00ean v\u00e0 di\u1ec5n bi\u1ebfn n\u1ed5i b\u1eadt c\u1ee7a c\u1ed9ng \u0111\u1ed3ng doanh nghi\u1ec7p."}
      />
      <div className="mt-10 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
