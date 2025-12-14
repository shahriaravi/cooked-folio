import { NextResponse } from "next/server";

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

export async function GET() {
  try {
    const username = process.env.GITHUB_USERNAME;
    const token = process.env.GITHUB_TOKEN;

    if (!username || !token) {
      console.error("github env vars missing");
      return NextResponse.json(
        { error: "github credentials not configured" },
        { status: 500 }
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
        { status: 500 }
      );
    }

    const calendar =
      json?.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      return NextResponse.json(
        { error: "no contribution data" },
        { status: 500 }
      );
    }

    return NextResponse.json(calendar);
  } catch (error) {
    console.error("github contributions route error", error);
    return NextResponse.json(
      { error: "unexpected error" },
      { status: 500 }
    );
  }
}