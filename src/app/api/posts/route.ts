import { NextRequest, NextResponse } from "next/server";
import { queryPosts } from "@/lib/posts";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const result = queryPosts({
    tag: searchParams.get("tag") ?? undefined,
    category: searchParams.get("category") ?? undefined,
    page: Number(searchParams.get("page")) || 1,
    pageSize: Math.min(Number(searchParams.get("pageSize")) || 10, 50),
  });

  return NextResponse.json(result);
}
