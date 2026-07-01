import { getAllPosts } from "@/lib/posts";

const SITE_URL = "https://jojo.blog";
const SITE_TITLE = "Jojo's Blog";
const SITE_DESCRIPTION = "个人技术博客 — 前端/CS/编程";

export function generateRSS(): string {
  const posts = getAllPosts().slice(0, 20);

  const items = posts
    .map(
      (p) => `
    <item>
      <title><![CDATA[${p.frontmatter.title}]]></title>
      <link>${SITE_URL}/posts/${p.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/posts/${p.slug}</guid>
      <description><![CDATA[${p.frontmatter.description}]]></description>
      <pubDate>${new Date(p.frontmatter.date).toUTCString()}</pubDate>
      ${(p.frontmatter.tags ?? [])
        .map((t) => `<category>${t}</category>`)
        .join("\n      ")}
    </item>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;
}
