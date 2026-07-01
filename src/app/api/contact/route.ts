import { NextRequest, NextResponse } from "next/server";

// 简单的内存速率限制
const RATE_LIMIT = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // 输入校验
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "请填写姓名、邮箱和消息" },
        { status: 400 }
      );
    }
    if (message.length > 5000) {
      return NextResponse.json(
        { error: "消息不能超过 5000 字" },
        { status: 400 }
      );
    }

    // 速率限制：同一 IP 每分钟最多 3 条
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const lastSent = RATE_LIMIT.get(ip) || 0;
    if (Date.now() - lastSent < 60_000) {
      return NextResponse.json(
        { error: "请稍后再试" },
        { status: 429 }
      );
    }
    RATE_LIMIT.set(ip, Date.now());

    // 在实际部署中，这里用 Resend / Nodemailer 发送邮件
    // 目前先记录到控制台并返回成功
    console.log(`[Contact] ${name} <${email}>: ${subject || "(无主题)"}`);
    console.log(`[Contact] ${message.slice(0, 200)}...`);

    return NextResponse.json({
      success: true,
      message: "消息已发送！我会尽快回复 📬",
    });
  } catch {
    return NextResponse.json(
      { error: "发送失败，请稍后重试" },
      { status: 500 }
    );
  }
}
