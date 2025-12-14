import { NextResponse } from "next/server";

export async function GET() {
  const js = `(() => {
    try {
      const script = document.currentScript;
      if (!script) return;

      if (!document.querySelector("style[data-avi-badge]")) {
        const style = document.createElement("style");
        style.setAttribute("data-avi-badge", "true");
        style.textContent = \`
          .avi-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
            font-family: system-ui, -apple-system, BlinkMacSystemFont,
              "SF Mono", ui-monospace, Menlo, Monaco, Consolas,
              "Liberation Mono", "Courier New", monospace;
            font-size: 13px; /* Increased from 11px */
            line-height: 1;
            opacity: 0.75;
            color: #9ca3af;
            text-decoration: none;
            transition: opacity 150ms ease-out, color 150ms ease-out;
          }
          .avi-badge:hover {
            opacity: 1;
            color: #e5e7eb;
          }
          .avi-badge__emoji {
            font-size: 20px; /* Increased */
            transform: translateY(1px);
          }
          .avi-badge__text-strong {
            position: relative;
            display: inline-block;
            color: #e5e7eb;
            font-weight: 500;
          }
          .avi-badge__text-strong::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: -3px;
            height: 4px;
            background-image:
              radial-gradient(circle at 0 100%, #3b82f6 2px, transparent 2px),
              radial-gradient(circle at 4px 100%, transparent 2px, #3b82f6 2px, transparent 4px);
            background-size: 8px 4px;
            background-repeat: repeat-x;
            animation: avi-wavy-snake 0.9s linear infinite;
          }
          @keyframes avi-wavy-snake {
            0% { background-position-x: 0; }
            100% { background-position-x: 8px; }
          }
          .avi-badge__avatar {
            position: relative;
            width: 28px; /* Increased from 24px */
            height: 28px;
            border-radius: 9999px;
            overflow: hidden;
            flex-shrink: 0;
            border: 1px solid rgba(255,255,255,0.1);
          }
          .avi-badge__avatar img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: opacity 150ms ease-out;
          }
          .avi-badge__avatar img:nth-child(2) {
            opacity: 0;
          }
          .avi-badge:hover .avi-badge__avatar img:nth-child(1) {
            opacity: 0;
          }
          .avi-badge:hover .avi-badge__avatar img:nth-child(2) {
            opacity: 1;
          }
        \`;
        document.head.appendChild(style);
      }

      const link = document.createElement("a");
      link.href = "https://avi.byontriq.xyz";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.className = "avi-badge";

      const emoji = document.createElement("span");
      emoji.className = "avi-badge__emoji";
      emoji.textContent = "🍳";

      const text = document.createElement("span");
      text.innerHTML = 'Cooked by <span class="avi-badge__text-strong">Avi</span>';

      const avatar = document.createElement("span");
      avatar.className = "avi-badge__avatar";

      const img1 = document.createElement("img");
      img1.src = "https://avi.byontriq.xyz/avatar/avatar.png";
      img1.alt = "Avi";
      const img2 = document.createElement("img");
      img2.src = "https://avi.byontriq.xyz/avatar/avatar-fill.png";
      img2.alt = "Avi";

      avatar.appendChild(img1);
      avatar.appendChild(img2);

      link.appendChild(emoji);
      link.appendChild(text);
      link.appendChild(avatar);

      script.parentNode?.insertBefore(link, script);
    } catch (e) {
      console.error("avi badge failed to load", e);
    }
  })();`;

  return new NextResponse(js, {
    status: 200,
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}