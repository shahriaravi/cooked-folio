import { NextRequest, NextResponse } from "next/server";

const SITE_URL = process.env.NEXT_PUBLIC_URL || "https://shahriaravi.me";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const accept = request.headers.get("accept") || "";
  const dest = request.headers.get("sec-fetch-dest") || "";
  const wantsHtml = dest === "document" || accept.includes("text/html");

  if (wantsHtml) {
    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>avi discord activity api</title>
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
    <h1>discord activity api</h1>
    <p>this endpoint returns live presence data from discord for <a href="${SITE_URL}">${SITE_URL}</a> as JSON.</p>
    <p>it&apos;s meant to be called by the site, not directly in the browser. to avoid rate limits, no external data is fetched on this page load.</p>
    <p>you can safely close this tab now 👋</p>
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

  const userId = process.env.NEXT_PUBLIC_DISCORD_USER_ID;
  if (!userId) {
    return NextResponse.json(
      { error: "Discord user ID not configured" },
      { status: 500 },
    );
  }

  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`Lanyard API error: ${res.status}`);

    const lanyardData = await res.json();
    const { activities } = lanyardData.data || {};
    if (!activities) return NextResponse.json({ isActive: false });

    const primaryActivity = activities.find((a: any) => a.type === 0);

    if (primaryActivity) {
      const { name, details, state, assets, timestamps, application_id } =
        primaryActivity;

      let workspace: string | null = null;
      if (typeof state === "string") {
        const match = state.match(/workspace:\s*(.+)/i);
        if (match && match[1]) workspace = match[1].trim();
      }

      const largeImage =
        assets?.large_image && application_id
          ? assets.large_image.startsWith("mp:")
            ? `https://media.discordapp.net/${assets.large_image.replace(
                "mp:",
                "",
              )}`
            : `https://cdn.discordapp.com/app-assets/${application_id}/${assets.large_image}.png`
          : null;

      const smallImage =
        assets?.small_image && application_id
          ? assets.small_image.startsWith("mp:")
            ? `https://media.discordapp.net/${assets.small_image.replace(
                "mp:",
                "",
              )}`
            : `https://cdn.discordapp.com/app-assets/${application_id}/${assets.small_image}.png`
          : null;

      return NextResponse.json({
        isActive: true,
        activityType: "PLAYING",
        data: {
          name,
          details,
          state,
          largeImage,
          smallImage,
          startTimestamp: timestamps?.start || null,
          workspace,
        },
      });
    }

    return NextResponse.json({ isActive: false });
  } catch (error) {
    console.error("Error fetching current activity:", error);
    return NextResponse.json({ isActive: false });
  }
}
