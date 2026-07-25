import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  try {
    const res = await fetch(
      "https://api.github.com/repos/shahriaravi/cooked-folio",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) throw new Error("failed");

    const data = await res.json();
    return NextResponse.json(
      { stars: data.stargazers_count ?? 0 },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch {
    return NextResponse.json({ stars: 0 });
  }
}