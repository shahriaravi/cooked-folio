import { NextRequest, NextResponse } from "next/server";

const SITE_URL = process.env.NEXT_PUBLIC_URL || "https://shahriaravi.me";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

const query = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;

export async function GET(request: NextRequest) {
  const accept = request.headers.get("accept") || "";
  const dest = request.headers.get("sec-fetch-dest") || "";
  const wantsHtml = dest === "document" || accept.includes("text/html");

  if (wantsHtml) {
    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>avi github contributions api</title>
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
      max-width: 520px;
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
    <h1>github contributions api</h1>
    <p>this endpoint fetches contribution data from github&apos;s graphql api for <a href="${SITE_URL}">${SITE_URL}</a>.</p>
    <p>it returns a contribution calendar as <code>JSON</code> and is meant to be consumed by the site, not opened directly.</p>
    <p>to avoid rate limiting, no github request is made for this page view. you can close this tab now 👋</p>
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
    const username = process.env.GITHUB_USERNAME;
    const token = process.env.GITHUB_TOKEN;

    if (!username || !token) {
      console.error("github env vars missing");
      return NextResponse.json(
        { error: "github credentials not configured" },
        { status: 500 },
      );
    }

    const res = await fetch(GITHUB_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: { login: username },
      }),
      cache: "no-store",
    });

    const json = await res.json();

    if (!res.ok || json.errors) {
      console.error("github graphql error", json.errors || json);
      return NextResponse.json(
        { error: "failed to fetch contributions" },
        { status: 500 },
      );
    }

    const calendar =
      json?.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      return NextResponse.json(
        { error: "no contribution data" },
        { status: 500 },
      );
    }

    return NextResponse.json(calendar);
  } catch (error) {
    console.error("github contributions route error", error);
    return NextResponse.json({ error: "unexpected error" }, { status: 500 });
  }
}
