"use client";

import PixelBlast from "@/components/ui/PixelBlast";
import { CAL_URL } from "@/lib/config";
import { getCalApi } from "@calcom/embed-react";
import { Check, Copy, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SiGithub } from "react-icons/si";
import { play } from "cuelume";

export function Footer() {
  const [isCalLoading, setIsCalLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const email = "hi@shahriaravi.me";

const copyEmail = async () => {
  await navigator.clipboard.writeText(email);
  setCopied(true);
  play("success");
  setTimeout(() => setCopied(false), 2000);
};

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: true,
        layout: "month_view",
      });

      cal("on", {
        action: "linkReady",
        callback: () => {
          setTimeout(() => setIsCalLoading(false), 800);
        },
      });
    })();
  }, []);

  const calLink = CAL_URL.replace(/^https?:\/\/(www\.)?cal\.com\//, "");

  useEffect(() => {
    if (isCalLoading) {
      const timer = setTimeout(() => setIsCalLoading(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [isCalLoading]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
          isCalLoading
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative h-14 w-14 animate-spin">
          <Image
            src="/avatar/avatar.png"
            alt="loading..."
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <footer className="relative mt-14 overflow-hidden pb-8 pt-8">
        <div className="pointer-events-none absolute inset-0 -z-0 opacity-30">
          <PixelBlast
            variant="square"
            pixelSize={4}
            color="#31d65b"
            patternScale={3}
            patternDensity={0.9}
            pixelSizeJitter={0.3}
            enableRipples
            rippleSpeed={0.45}
            rippleThickness={0.1}
            rippleIntensityScale={0.8}
            speed={0.45}
            edgeFade={0.4}
            transparent
          />
        </div>

        <div className="relative z-10 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h3
              className="font-semibold text-foreground"
              style={{
                fontSize: "17px",
                lineHeight: "22px",
                letterSpacing: "-0.01em",
              }}
            >
              Have a project in mind?
            </h3>

            <p
              className="max-w-[480px] text-muted-foreground"
              style={{
                fontSize: "14px",
                lineHeight: "22px",
                letterSpacing: "0.1px",
              }}
            >
              I&apos;m always open to discussing new opportunities, crazy ideas,
              or just chatting about tech over coffee.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
            <button
              onClick={() => setIsCalLoading(true)}
              data-cal-link={calLink}
              data-cal-config='{"layout":"month_view","hideEventTypeDetails":true}'
              data-cuelume-hover
              data-cuelume-press
              data-cuelume-release
              className="
                group relative flex items-center overflow-hidden
                h-10 w-fit pl-1.5 pr-4
                rounded-lg
                border border-border/60 bg-card/80 hover:bg-primary/5 hover:border-primary/40
                shadow-sm
                cursor-pointer
                transition-all duration-300
                active:scale-[0.97]
              "
            >
              <div className="relative mr-2.5 h-7 w-7 shrink-0 overflow-hidden rounded-md">
                <Image
                  src="/avatar/avatar.png"
                  alt="avi"
                  width={60}
                  height={60}
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                />
                <Image
                  src="/avatar/avatar-fill.png"
                  alt="avi"
                  width={60}
                  height={60}
                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                />
              </div>

              <div className="flex items-center">
                <div
                  className="
                    flex items-center gap-1 overflow-hidden whitespace-nowrap
                    w-0 opacity-0 mr-0
                    group-hover:w-auto group-hover:opacity-100 group-hover:mr-1.5
                    transition-all duration-300 ease-out
                  "
                >
                  <Plus className="h-3 w-3 text-primary" />
                  <div className="flex h-4 items-center justify-center rounded-sm border border-border bg-background px-1">
                    <span
                      className="font-mono uppercase tracking-[0.08em] text-foreground"
                      style={{ fontSize: "9px", lineHeight: "1" }}
                    >
                      You
                    </span>
                  </div>
                </div>
                <span
                  className="font-semibold text-foreground transition-colors group-hover:text-primary"
                  style={{ fontSize: "13px", lineHeight: "18px" }}
                >
                  Book a call
                </span>
              </div>
            </button>

            <Link
              href="https://github.com/shahriaravi/cooked-folio"
              target="_blank"
              rel="noopener noreferrer"
              data-cuelume-hover="tick"
              data-cuelume-press
              className="group inline-flex flex-wrap items-center gap-1.5 text-muted-foreground transition-colors duration-300 hover:text-foreground"
              style={{
                fontSize: "13px",
                lineHeight: "18px",
                letterSpacing: "0.1px",
              }}
            >
              <span className="leading-none">liked my portfolio?</span>
              <span className="font-semibold leading-none text-foreground/80 transition-colors duration-300 group-hover:text-primary">
                leave a star
              </span>
              <SiGithub className="h-[14px] w-[14px] shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-primary" />
            </Link>
          </div>

          <div
            className="flex items-center text-muted-foreground"
            style={{
              fontSize: "14px",
              lineHeight: "22px",
              letterSpacing: "0.1px",
            }}
          >
            <span>email me at&nbsp;</span>
            <button
              onClick={copyEmail}
              className="group inline-flex cursor-pointer items-center gap-0 transition-transform active:scale-[0.97]"
            >
              <span
                className={`inline-flex items-center overflow-hidden transition-all duration-300 ease-out ${
                  copied
                    ? "mr-1.5 w-3.5"
                    : "mr-0 w-0 group-hover:mr-1.5 group-hover:w-3.5"
                }`}
              >
                {copied ? (
                  <Check className="h-[12px] w-[12px] shrink-0 text-emerald-400" />
                ) : (
                  <Copy className="h-[12px] w-[12px] shrink-0 text-primary" />
                )}
              </span>
              <span className="font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
                {email}
              </span>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
