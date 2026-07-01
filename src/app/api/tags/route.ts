import { NextResponse } from "next/server";
import { getAllTags } from "@/lib/posts";

export async function GET() {
  return NextResponse.json(getAllTags());
}
