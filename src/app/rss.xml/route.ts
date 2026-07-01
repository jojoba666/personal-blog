import { generateRSS } from "@/lib/rss";

export async function GET() {
  return new Response(generateRSS(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
