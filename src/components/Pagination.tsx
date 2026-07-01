import Link from "next/link";

export function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-center gap-1 mt-16 font-hand text-base">
      {hasPrev && (
        <Link
          href={`/?page=${currentPage - 1}`}
          className="px-3 py-2 text-warm-textSec hover:text-primary transition-colors"
        >
          &larr; 上一页
        </Link>
      )}
      {pages.map((page) => (
        <Link
          key={page}
          href={`/?page=${page}`}
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
            page === currentPage
              ? "bg-primary text-white"
              : "text-warm-textSec hover:bg-surface hover:text-primary"
          }`}
        >
          {page}
        </Link>
      ))}
      {hasNext && (
        <Link
          href={`/?page=${currentPage + 1}`}
          className="px-3 py-2 text-warm-textSec hover:text-primary transition-colors"
        >
          下一页 &rarr;
        </Link>
      )}
    </div>
  );
}
