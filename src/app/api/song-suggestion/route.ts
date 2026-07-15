import { NextResponse } from "next/server";

const SITE_URL = process.env.NEXT_PUBLIC_URL || "https://shahriaravi.me";

export async function GET() {
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>avi api endpoint</title>
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
      max-width: 420px;
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
    <h1>api endpoint</h1>
    <p>this route is for <code>POST</code> requests from <a href="${SITE_URL}">${SITE_URL}</a>.</p>
    <p>no data is sent on <code>GET</code>, so nothing to see here. you can close this tab now 👋</p>
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

export async function POST(request: Request) {
  try {
    const { song } = await request.json();

    if (!song || typeof song !== "string" || !song.trim()) {
      return NextResponse.json(
        { error: "song name is required" },
        { status: 400 },
      );
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("DISCORD_WEBHOOK_URL not configured");
      return NextResponse.json(
        { error: "webhook not configured" },
        { status: 500 },
      );
    }

    const content = `🎵 **new song suggestion:** ${song.trim()}`;

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!res.ok) {
      throw new Error(`discord webhook failed: ${res.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("song suggestion error:", error);
    return NextResponse.json(
      { error: "failed to submit song" },
      { status: 500 },
    );
  }
}
