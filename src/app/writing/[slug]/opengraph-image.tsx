import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/writing";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};
export const alt = "Shahriar Avi";

function loadAsset(relPath: string): Buffer | null {
  try {
    const fullPath = path.join(process.cwd(), "public", relPath);
    return fs.readFileSync(fullPath);
  } catch {
    return null;
  }
}

function formatReadingTime(readingTime: string): string {
  if (!readingTime) return "";
  const match = readingTime.match(/(\d+)\s*m/i);
  if (!match) return readingTime;
  const minutes = parseInt(match[1], 10);
  return `${minutes} min read`;
}

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  const title = post?.title ?? "Shahriar Avi";
  const readingTime = post?.readingTime ?? "";
  const formattedReadingTime = formatReadingTime(readingTime);

  const bgBuffer = loadAsset("images/og-bg.png");
  const avatarBuffer = loadAsset("avatar/avatar.png");
  const fontRegular = loadAsset("fonts/Inter-Regular.ttf");
  const fontBold = loadAsset("fonts/Inter-Bold.ttf");

  const bgBase64 = bgBuffer
    ? `data:image/png;base64,${bgBuffer.toString("base64")}`
    : "";
  const avatarBase64 = avatarBuffer
    ? `data:image/png;base64,${avatarBuffer.toString("base64")}`
    : "";

  const fonts = [];
  if (fontRegular) {
    fonts.push({
      name: "Inter",
      data: fontRegular,
      weight: 400 as const,
      style: "normal" as const,
    });
  }
  if (fontBold) {
    fonts.push({
      name: "Inter",
      data: fontBold,
      weight: 700 as const,
      style: "normal" as const,
    });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundImage: bgBase64 ? `url(${bgBase64})` : undefined,
          backgroundColor: "#0a1024",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,16,36,0.65) 0%, rgba(10,16,36,0.85) 100%)",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            zIndex: 10,
            color: "#ffffff",
            fontSize: title.length > 60 ? "60px" : "76px",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: "1040px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {avatarBase64 && (
              <img
                src={avatarBase64}
                width={72}
                height={72}
                style={{
                  borderRadius: "18px",
                }}
                alt=""
              />
            )}
            <div
              style={{
                color: "#ffffff",
                fontSize: "32px",
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              Shahriar Avi
            </div>
          </div>

          {formattedReadingTime && (
            <div
              style={{
                display: "flex",
                color: "rgba(255,255,255,0.55)",
                fontSize: "22px",
                fontWeight: 400,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              {formattedReadingTime}
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    }
  );
}