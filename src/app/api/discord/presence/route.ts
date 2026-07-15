import { NextRequest, NextResponse } from "next/server";

const SITE_URL = process.env.NEXT_PUBLIC_URL || "https://shahriaravi.me";

type RawStatus = "online" | "idle" | "dnd" | "offline";

export async function GET(request: NextRequest) {
  const accept = request.headers.get("accept") || "";
  const dest = request.headers.get("sec-fetch-dest") || "";
  const wantsHtml = dest === "document" || accept.includes("text/html");

  if (wantsHtml) {
    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>avi discord presence api</title>
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
    <h1>discord presence api</h1>
    <p>this endpoint returns <code>{ status }</code> for <a href="${SITE_URL}">${SITE_URL}</a> using lanyard.</p>
    <p>it&apos;s meant to be called by the site, not opened directly. to avoid unnecessary requests, no discord data is fetched on this page.</p>
    <p>you can close this tab now 👋</p>
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

  try {
    const userId = process.env.NEXT_PUBLIC_DISCORD_USER_ID;
    if (!userId) {
      console.error("Discord presence: NEXT_PUBLIC_DISCORD_USER_ID missing");
      return NextResponse.json({ status: "offline" });
    }

    const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Discord presence: lanyard error", res.status);
      return NextResponse.json({ status: "offline" });
    }

    const json = await res.json();

    const raw: RawStatus | undefined = json?.data?.discord_status;
    const status: RawStatus =
      raw === "online" || raw === "idle" || raw === "dnd" || raw === "offline"
        ? raw
        : "offline";

    if (process.env.NODE_ENV === "development") {
      console.log("discord_status from lanyard:", raw);
    }

    return NextResponse.json({ status });
  } catch (error) {
    console.error("Discord presence: error", error);
    return NextResponse.json({ status: "offline" });
  }
}
