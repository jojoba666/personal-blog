"use client";

import { useEffect, useRef } from "react";

export function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "your-username/your-blog-repo");
    script.setAttribute("data-repo-id", "R_kgxxxxxxxx");
    script.setAttribute("data-category", "Blog Comments");
    script.setAttribute("data-category-id", "DIC_kwxxxxxxxx");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "zh-CN");
    script.crossOrigin = "anonymous";
    script.async = true;

    ref.current.appendChild(script);
  }, []);

  return (
    <div className="mt-16 pt-8 border-t border-dashed border-warm-border">
      <h3 className="font-hand text-xl text-warm-text mb-6">评论</h3>
      <div ref={ref} />
    </div>
  );
}
