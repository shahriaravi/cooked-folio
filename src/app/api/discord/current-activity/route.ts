import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const userId = process.env.NEXT_PUBLIC_DISCORD_USER_ID;
  if (!userId) {
    return NextResponse.json(
      { error: "Discord user ID not configured" },
      { status: 500 }
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
                ""
              )}`
            : `https://cdn.discordapp.com/app-assets/${application_id}/${assets.large_image}.png`
          : null;

      const smallImage =
        assets?.small_image && application_id
          ? assets.small_image.startsWith("mp:")
            ? `https://media.discordapp.net/${assets.small_image.replace(
                "mp:",
                ""
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