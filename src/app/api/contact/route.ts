import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body as {
      name?: string;
      email?: string;
      message?: string;
    };

    if (!message || !name) {
      return NextResponse.json(
        { error: "name and message are required" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("DISCORD_WEBHOOK_URL is not set");
      return NextResponse.json(
        { error: "server misconfigured" },
        { status: 500 }
      );
    }

    const content = [
      `**new message from portfolio**`,
      `**name:** ${name}`,
      email ? `**email:** ${email}` : `**email:** (not provided)`,
      "",
      `**message:**`,
      message,
    ].join("\n");

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!res.ok) {
      console.error("discord webhook error", await res.text());
      return NextResponse.json(
        { error: "failed to send message" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("contact api error", error);
    return NextResponse.json(
      { error: "unexpected error" },
      { status: 500 }
    );
  }
}