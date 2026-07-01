"use client";

import { useState } from "react";

export function CodeBlock({
  language,
  code,
}: {
  language?: string;
  code: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-6 rounded-lg border border-warm-border overflow-hidden">
      {/* 顶部栏 */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1e1a14] border-b border-warm-border">
        <span className="font-mono text-xs text-warm-muted">
          {language || "plaintext"}
        </span>
        <button
          onClick={handleCopy}
          className="text-xs text-warm-muted hover:text-code-text transition-colors"
        >
          {copied ? "已复制 ✓" : "复制"}
        </button>
      </div>
      {/* 代码内容 */}
      <pre className="!mt-0 !rounded-t-none font-mono text-sm bg-code-bg text-code-text p-5 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}
