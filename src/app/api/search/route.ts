import { NextRequest, NextResponse } from "next/server";
import { searchPosts } from "@/lib/posts";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  if (!q || q.length < 2) {
    return NextResponse.json(
      { error: "搜索关键词至少 2 个字符" },
      { status: 400 }
    );
  }

  const results = searchPosts(q).slice(0, 20);
  return NextResponse.json({ results, total: results.length });
}
