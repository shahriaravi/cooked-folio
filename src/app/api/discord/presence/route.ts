import { NextResponse } from "next/server";

type RawStatus = "online" | "idle" | "dnd" | "offline";

export async function GET() {
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
    const status: RawStatus = raw === "online" ||
      raw === "idle" ||
      raw === "dnd" ||
      raw === "offline"
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