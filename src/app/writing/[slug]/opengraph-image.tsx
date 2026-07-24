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

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  const title = post?.title ?? "Shahriar Avi";
  const readingTime = post?.readingTime ?? "";

  const bgPath = path.join(process.cwd(), "public", "images", "blog.png");
  const avatarPath = path.join(
    process.cwd(),
    "public",
    "avatar",
    "avatar.png"
  );

  const bgBuffer = fs.readFileSync(bgPath);
  const avatarBuffer = fs.readFileSync(avatarPath);

  const bgBase64 = `data:image/png;base64,${bgBuffer.toString("base64")}`;
  const avatarBase64 = `data:image/png;base64,${avatarBuffer.toString(
    "base64"
  )}`;

  const fontData = await fetch(
    "https://fonts.gstatic.com/s/inter/v18/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf"
  ).then((res) => res.arrayBuffer());

  const fontDataBold = await fetch(
    "https://fonts.gstatic.com/s/inter/v18/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf"
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          backgroundImage: `url(${bgBase64})`,
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
              "linear-gradient(180deg, rgba(10,16,36,0.55) 0%, rgba(10,16,36,0.85) 100%)",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "28px",
            zIndex: 10,
          }}
        >
          <img
            src={avatarBase64}
            width={96}
            height={96}
            style={{
              borderRadius: "24px",
            }}
            alt=""
          />
          <div
            style={{
              color: "#ffffff",
              fontSize: title.length > 60 ? "56px" : "68px",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: "900px",
              display: "flex",
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            position: "relative",
            marginTop: "auto",
            display: "flex",
            zIndex: 10,
            color: "rgba(255,255,255,0.65)",
            fontSize: "22px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          {readingTime} read
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          weight: 400,
          style: "normal",
        },
        {
          name: "Inter",
          data: fontDataBold,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}