import { NextRequest, NextResponse } from "next/server";

const SITE_URL = process.env.NEXT_PUBLIC_URL || "https://shahriaravi.me";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";

const getAccessToken = async () => {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN!,
    }),
  });
  return response.json();
};

export async function GET(request: NextRequest) {
  const accept = request.headers.get("accept") || "";
  const dest = request.headers.get("sec-fetch-dest") || "";
  const wantsHtml = dest === "document" || accept.includes("text/html");

  if (wantsHtml) {
    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>avi spotify now playing api</title>
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
    <h1>spotify now-playing api</h1>
    <p>this endpoint returns the current track from spotify as <code>{ isPlaying, title, artist, albumImageUrl, songUrl }</code> for <a href="${SITE_URL}">${SITE_URL}</a>.</p>
    <p>it&apos;s intended for the site to poll, not to be opened directly in the browser. to avoid rate limits, no spotify request is made on this page.</p>
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

  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return NextResponse.json(
      {
        isPlaying: false,
        error: "Spotify environment variables not configured on the server.",
      },
      { status: 500 },
    );
  }

  try {
    const { access_token } = await getAccessToken();
    if (!access_token) {
      throw new Error("Failed to get access token");
    }

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status === 204 || response.status > 400) {
      return NextResponse.json({ isPlaying: false });
    }

    const song = await response.json();
    if (song === null || !song.is_playing) {
      return NextResponse.json({ isPlaying: false });
    }

    return NextResponse.json({
      isPlaying: true,
      title: song.item.name,
      artist: song.item.artists.map((a: any) => a.name).join(", "),
      albumImageUrl: song.item.album.images[0]?.url,
      songUrl: song.item.external_urls.spotify,
    });
  } catch (error) {
    console.error("Spotify API Error:", error);
    return NextResponse.json({ isPlaying: false });
  }
}

export const revalidate = 0;
