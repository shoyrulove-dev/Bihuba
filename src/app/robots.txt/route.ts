const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bihuba.vercel.app";

export function GET() {
  return new Response(
    [
      "User-agent: *",
      "Allow: /",
      "Disallow: /admin",
      "Disallow: /api",
      `Sitemap: ${siteUrl}/sitemap.xml`,
      `Host: ${siteUrl}`,
      "",
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    }
  );
}
