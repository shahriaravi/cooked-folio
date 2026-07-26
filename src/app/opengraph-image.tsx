import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};
export const alt = "Shahriar Avi — Design Engineer";

function loadAsset(relPath: string): Buffer | null {
  try {
    const fullPath = path.join(process.cwd(), "public", relPath);
    return fs.readFileSync(fullPath);
  } catch {
    return null;
  }
}

export default async function Image() {
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
              "linear-gradient(180deg, rgba(10,16,36,0.7) 0%, rgba(10,16,36,0.9) 100%)",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "32px",
            zIndex: 10,
          }}
        >
          {avatarBase64 && (
            <img
              src={avatarBase64}
              width={120}
              height={120}
              style={{
                borderRadius: "32px",
              }}
              alt=""
            />
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div
              style={{
                color: "#ffffff",
                fontSize: "82px",
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              Shahriar Avi
            </div>
            <div
              style={{
                color: "rgba(180, 200, 255, 0.85)",
                fontSize: "30px",
                fontWeight: 500,
                lineHeight: 1.2,
                letterSpacing: "-0.005em",
              }}
            >
              Design Engineer
            </div>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "22px",
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            Breaking things, building stuff.
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "20px",
              fontWeight: 500,
            }}
          >
            shahriaravi.me
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    }
  );
}