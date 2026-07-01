"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-warm-bg/80 backdrop-blur-sm border-b border-warm-border">
      <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-hand text-xl text-warm-text hover:text-primary transition-colors"
        >
          ~/jojo.blog
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-6">
          <Link
            href="/"
            className="font-hand text-base text-warm-textSec hover:text-primary transition-colors"
          >
            文章
          </Link>
          <Link
            href="/about"
            className="font-hand text-base text-warm-textSec hover:text-primary transition-colors"
          >
            关于
          </Link>
          <Link
            href="/contact"
            className="font-hand text-base text-warm-textSec hover:text-primary transition-colors"
          >
            联系
          </Link>
          <Link
            href="/rss.xml"
            className="font-hand text-base text-warm-textSec hover:text-primary transition-colors"
            title="RSS"
          >
            <RssIcon />
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 text-warm-textSec"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="菜单"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-warm-border bg-warm-bg px-6 py-4 flex flex-col gap-3">
          <Link href="/" className="font-hand text-base text-warm-textSec hover:text-primary" onClick={() => setMenuOpen(false)}>
            文章
          </Link>
          <Link href="/about" className="font-hand text-base text-warm-textSec hover:text-primary" onClick={() => setMenuOpen(false)}>
            关于
          </Link>
          <Link href="/contact" className="font-hand text-base text-warm-textSec hover:text-primary" onClick={() => setMenuOpen(false)}>
            联系
          </Link>
          <Link href="/rss.xml" className="font-hand text-base text-warm-textSec hover:text-primary" onClick={() => setMenuOpen(false)}>
            RSS
          </Link>
        </div>
      )}
    </header>
  );
}

function RssIcon() {
  return (
    <svg className="w-4 h-4 inline" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z" />
    </svg>
  );
}
