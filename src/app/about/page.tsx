import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于 — Jojo's Blog",
  description: "关于我，一个 CS 学生",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-warm-bg">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="font-hand text-3xl text-warm-text mb-8">关于我</h1>

        <div className="prose-hand">
          <p>
            Hi，我是 Jojo，一名计算机科学学生。我对前端开发、系统编程和开源技术充满热情。
          </p>

          <h2>技术栈</h2>
          <ul>
            <li><strong>前端</strong>: React, Next.js, TypeScript, Tailwind CSS</li>
            <li><strong>后端</strong>: Node.js, Python, Rust (学习中)</li>
            <li><strong>工具</strong>: Linux, Git, Docker, Neovim</li>
            <li><strong>感兴趣</strong>: 编译器、操作系统、性能优化</li>
          </ul>

          <h2>关于本站</h2>
          <p>
            这个博客使用 Next.js 14 搭建，文章用 MDX 编写，部署在 Vercel 上。
            采用暖橙色调和手写字体风格，希望能给读者带来温暖亲切的阅读体验。
          </p>
          <p>
            拒绝冷冰冰的几何字体，拥抱不完美的手绘笔触。就像在纸上写字一样。
          </p>

          <h2>联系我</h2>
          <p>
            如果你有任何想法、建议或者只是想打声招呼，欢迎通过
            <a href="/contact">联系页面</a>给我发消息，或者直接发邮件到
            jojo@example.com。
          </p>
        </div>
      </div>
    </div>
  );
}
