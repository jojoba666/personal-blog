import { getAllPosts, queryPosts } from "@/lib/posts";
import { AuthorBio } from "@/components/AuthorBio";
import { ArticleCard } from "@/components/ArticleCard";
import { Pagination } from "@/components/Pagination";

export default function HomePage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const allPosts = getAllPosts();
  const page = parseInt(searchParams.page ?? "1", 10) || 1;
  const pageSize = 10;
  const totalPages = Math.ceil(allPosts.length / pageSize);
  const start = (page - 1) * pageSize;
  const posts = allPosts.slice(start, start + pageSize);

  return (
    <div className="min-h-screen bg-warm-bg">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* 作者简介 */}
        <section className="mb-16">
          <AuthorBio />
        </section>

        {/* 文章列表 */}
        <section>
          <h2 className="font-hand text-2xl text-warm-text mb-8 border-b-2 border-primary-muted pb-2 inline-block">
            📝 最近文章
          </h2>
          {posts.length === 0 ? (
            <p className="font-body text-warm-textSec py-12 text-center">
              还没有文章，快去写第一篇吧 ✍️
            </p>
          ) : (
            posts.map((post) => <ArticleCard key={post.slug} post={post} />)
          )}
          <Pagination currentPage={page} totalPages={totalPages} />
        </section>
      </div>
    </div>
  );
}
