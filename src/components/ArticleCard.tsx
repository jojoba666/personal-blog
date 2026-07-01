import Link from "next/link";
import { Post } from "@/types/post";
import { Tag } from "./Tag";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ArticleCard({ post }: { post: Post }) {
  const { slug, frontmatter, readingTime } = post;

  return (
    <div className="group mb-10 pb-10 border-b border-dashed border-warm-border last:border-b-0">
      {/* 元信息行 */}
      <div className="flex items-center gap-3 mb-3 font-body text-sm text-warm-textSec">
        <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
        <span className="text-warm-muted">&middot;</span>
        <span>{readingTime} min read</span>
      </div>

      {/* 标题 */}
      <h3 className="font-hand text-xl text-warm-text group-hover:text-primary transition-colors mb-3">
        <Link href={`/posts/${slug}`}>{frontmatter.title}</Link>
      </h3>

      {/* 摘要 */}
      <p className="font-body text-base text-warm-textSec leading-relaxed mb-4 line-clamp-2">
        {frontmatter.description}
      </p>

      {/* 标签 + 阅读更多 */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex flex-wrap gap-2">
          {frontmatter.tags?.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <Link
          href={`/posts/${slug}`}
          className="font-decor text-sm text-primary hover:text-primary-hover transition-colors"
        >
          阅读更多 &rarr;
        </Link>
      </div>
    </div>
  );
}
