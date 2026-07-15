import { NextResponse } from "next/server";

const SITE_URL = process.env.NEXT_PUBLIC_URL || "https://shahriaravi.me";

export async function GET() {
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>avi contact api</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    :root { color-scheme: dark; }
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #020617;
      color: #e5e7eb;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "SF Mono",
        ui-monospace, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
        monospace;
    }
    .wrap {
      padding: 1.75rem 2rem;
      border-radius: 1rem;
      background: rgba(15,23,42,0.9);
      border: 1px solid rgba(148,163,184,0.25);
      box-shadow: 0 18px 60px rgba(15,23,42,0.9);
      max-width: 480px;
      text-align: left;
    }
    h1 {
      margin: 0 0 0.5rem;
      font-size: 1rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #94a3b8;
    }
    p {
      margin: 0.25rem 0;
      font-size: 0.9rem;
      line-height: 1.5;
      color: #cbd5f5;
    }
    code {
      font-size: 0.78rem;
      padding: 0.15rem 0.35rem;
      border-radius: 999px;
      background: rgba(15,23,42,0.9);
      border: 1px solid rgba(148,163,184,0.35);
      color: #e5e7eb;
    }
    a {
      color: #3b82f6;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>contact api</h1>
    <p>this endpoint accepts <code>POST</code> requests from <a href="${SITE_URL}">${SITE_URL}</a> and forwards messages to discord.</p>
    <p>no data is sent on <code>GET</code>, so there&apos;s nothing interesting here for browsers. you can close this tab now 👋</p>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

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
        { status: 400 },
      );
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("DISCORD_WEBHOOK_URL is not set");
      return NextResponse.json(
        { error: "server misconfigured" },
        { status: 500 },
      );
    }

    const content = [
      `**new message!**`,
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
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("contact api error", error);
    return NextResponse.json({ error: "unexpected error" }, { status: 500 });
  }
}
