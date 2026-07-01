import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import { Tag } from "@/components/Tag";
import { GiscusComments } from "@/components/GiscusComments";
import Link from "next/link";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const { frontmatter, readingTime, prevPost, nextPost } = post;

  return (
    <div className="min-h-screen bg-warm-bg">
      <article className="max-w-2xl mx-auto px-6 py-12">
        {/* 文章头 */}
        <header className="mb-12">
          <h1 className="font-hand text-3xl text-warm-text mb-4 leading-tight">
            {frontmatter.title}
          </h1>
          <div className="font-body text-sm text-warm-textSec flex items-center gap-3 mb-4">
            <time dateTime={frontmatter.date}>
              📅 {formatDate(frontmatter.date)}
            </time>
            <span className="text-warm-muted">&middot;</span>
            <span>⏱ {readingTime} min read</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {frontmatter.tags?.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </header>

        {/* 正文 prose */}
        <div className="prose-hand">
          {/* MDX content rendered via dangerouslySetInnerHTML as simple approach */}
          {/* For full MDX support with components, use next-mdx-remote */}
          <div
            className="font-body text-base text-warm-text leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: renderSimpleMarkdown(post.content),
            }}
          />
        </div>

        {/* 文章尾 — 上下篇导航 */}
        <footer className="mt-16 pt-8 border-t border-dashed border-warm-border">
          <nav className="flex justify-between font-decor text-primary">
            {prevPost ? (
              <Link
                href={`/posts/${prevPost.slug}`}
                className="hover:text-primary-hover transition-colors"
              >
                &larr; {prevPost.title}
              </Link>
            ) : (
              <span />
            )}
            {nextPost ? (
              <Link
                href={`/posts/${nextPost.slug}`}
                className="hover:text-primary-hover transition-colors ml-auto"
              >
                {nextPost.title} &rarr;
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </footer>

        {/* Giscus 评论区 */}
        <GiscusComments />
      </article>
    </div>
  );
}

/** 简单 Markdown 渲染（将 MDX 内容转为 HTML） */
function renderSimpleMarkdown(md: string): string {
  // 移除 frontmatter
  let text = md.replace(/^---[\s\S]*?---\n?/, "");

  // 简单渲染：代码块、标题、段落等
  // 代码块
  text = text.replace(
    /```(\w*)\n([\s\S]*?)```/g,
    (_, lang: string, code: string) => {
      const escaped = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      return `<pre class="font-mono text-sm bg-code-bg text-code-text rounded-lg p-5 my-6 overflow-x-auto border border-warm-border"><code>${escaped}</code></pre>`;
    }
  );

  // 行内代码
  text = text.replace(
    /`([^`]+)`/g,
    '<code class="font-mono text-sm bg-code-inline text-primary px-1.5 py-0.5 rounded">$1</code>'
  );

  // 标题
  text = text.replace(/^#### (.+)$/gm, '<h4 class="font-hand text-lg text-warm-text mt-6 mb-2">$1</h4>');
  text = text.replace(/^### (.+)$/gm, '<h3 class="font-hand text-xl text-warm-text mt-8 mb-3">$1</h3>');
  text = text.replace(/^## (.+)$/gm, '<h2 class="font-hand text-2xl text-warm-text mt-10 mb-4 pb-1 border-b-2 border-primary-muted">$1</h2>');
  text = text.replace(/^# (.+)$/gm, '<h1 class="font-hand text-3xl text-warm-text mt-12 mb-6">$1</h1>');

  // 粗体和斜体
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // 链接
  text = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-primary underline decoration-primary-muted underline-offset-2 hover:decoration-primary transition-colors">$1</a>'
  );

  // 图片
  text = text.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" class="rounded-lg border border-warm-border mx-auto my-8 max-w-full" />'
  );

  // 引用
  text = text.replace(
    /^> (.+)$/gm,
    '<blockquote class="border-l-4 border-primary-muted pl-5 my-6 italic text-warm-textSec bg-surface py-3 pr-4 rounded-r-lg"><p>$1</p></blockquote>'
  );

  // 分割线
  text = text.replace(/^---$/gm, '<hr class="border-dashed border-warm-border my-10" />');

  // 无序列表
  text = text.replace(/^- (.+)$/gm, '<li class="leading-relaxed">$1</li>');
  text = text.replace(/((?:<li[^>]*>.*<\/li>\n?)+)/g, '<ul class="list-disc list-outside ml-6 mb-5 space-y-2">$1</ul>');

  // 有序列表
  text = text.replace(/^\d+\. (.+)$/gm, '<li class="leading-relaxed">$1</li>');

  // 段落（剩余行）
  text = text.replace(
    /^(?!<[a-z/])(.+)$/gm,
    '<p class="mb-5 leading-relaxed">$1</p>'
  );

  return text;
}
