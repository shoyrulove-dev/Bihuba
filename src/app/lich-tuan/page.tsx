import { PostCard } from "@/components/site/post-card";
import { SectionHeading } from "@/components/site/section-heading";
import { getPosts } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function SchedulePage() {
  const posts = await getPosts("schedule");

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading
        eyebrow={"L\u1ecbch tu\u1ea7n"}
        title={"L\u1ecbch \u0111i\u1ec1u h\u00e0nh v\u00e0 l\u1ecbch c\u00f4ng t\u00e1c"}
        body={"L\u1ecbch \u0111i\u1ec1u h\u00e0nh, l\u1ecbch h\u1ecdp v\u00e0 k\u1ebf ho\u1ea1ch c\u00f4ng t\u00e1c \u0111\u01b0\u1ee3c c\u1eadp nh\u1eadt t\u1eadp trung \u0111\u1ec3 ban \u0111i\u1ec1u h\u00e0nh v\u00e0 h\u1ed9i vi\u00ean ti\u1ec7n theo d\u00f5i."}
      />
      <div className="mt-10 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
