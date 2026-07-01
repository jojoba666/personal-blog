export function Footer() {
  return (
    <footer className="border-t border-dashed border-warm-border mt-20">
      <div className="max-w-2xl mx-auto px-6 py-8 text-center">
        <p className="font-body text-sm text-warm-muted mb-2">
          Built with Next.js · MDX · Tailwind CSS
        </p>
        <p className="font-body text-xs text-warm-muted">
          &copy; {new Date().getFullYear()} Joey. 用 &hearts; 和 &#9749; 搭建。
        </p>
        <p className="font-body text-xs text-warm-muted mt-1">
          没有 AI 味的字体，只有手工的温度。
        </p>
      </div>
    </footer>
  );
}
