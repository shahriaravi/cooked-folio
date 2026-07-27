"use client";

import PixelBlast from "@/components/ui/PixelBlast";
import { CAL_URL } from "@/lib/config";
import { getCalApi } from "@calcom/embed-react";
import { play } from "cuelume";
import { Check, Copy, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function HomeFooter() {
  const [isCalLoading, setIsCalLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const email = "hi@shahriaravi.me";

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    play("press");
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
        role="status"
        aria-live="polite"
        aria-hidden={!isCalLoading}
        className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none ${
          isCalLoading
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative h-14 w-14 animate-spin motion-reduce:animate-none">
          <Image
            src="/avatar/avatar.png"
            alt="Loading Cal.com booking widget"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <footer className="relative mt-14 overflow-hidden pb-8 pt-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-0 opacity-30"
        >
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
              className="text-balance font-semibold text-foreground"
              style={{
                fontSize: "17px",
                lineHeight: "22px",
                letterSpacing: "-0.01em",
              }}
            >
              Have a project in mind?
            </h3>

            <p
              className="max-w-[480px] text-pretty text-muted-foreground"
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
              type="button"
              onClick={() => setIsCalLoading(true)}
              data-cal-link={calLink}
              data-cal-config='{"layout":"month_view","hideEventTypeDetails":true}'
              data-cuelume-hover
              data-cuelume-press
              data-cuelume-release
              aria-label="Book a call with Avi"
              className="group/book relative flex h-10 w-fit shrink-0 items-center overflow-hidden rounded-xl border border-border/60 bg-card/80 pl-1.5 pr-4 shadow-sm outline-none transition-[background-color,border-color,transform] duration-300 ease-out hover:border-primary/40 hover:bg-primary/[0.05] focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
            >
              <span className="relative mr-2.5 block h-7 w-7 shrink-0 overflow-hidden rounded-[10px]">
                <Image
                  src="/avatar/avatar.png"
                  alt=""
                  width={60}
                  height={60}
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-in-out group-hover/book:opacity-0 motion-reduce:transition-none"
                />
                <Image
                  src="/avatar/avatar-fill.png"
                  alt=""
                  width={60}
                  height={60}
                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 ease-in-out group-hover/book:opacity-100 motion-reduce:transition-none"
                />
              </span>

              <span className="flex items-center">
                <span
                  aria-hidden="true"
                  className="mr-0 flex w-0 items-center gap-1 overflow-hidden whitespace-nowrap opacity-0 transition-[width,opacity,margin] duration-300 ease-out group-hover/book:mr-1.5 group-hover/book:w-auto group-hover/book:opacity-100 motion-reduce:transition-none"
                >
                  <Plus
                    className="h-3 w-3 text-primary transition-transform duration-500 ease-out group-hover/book:rotate-90 motion-reduce:transition-none motion-reduce:group-hover/book:rotate-0"
                    strokeWidth={2.5}
                  />
                  <span className="flex h-4 items-center justify-center rounded-[4px] border border-border bg-background px-1">
                    <span
                      className="font-mono uppercase tracking-[0.08em] text-foreground"
                      style={{ fontSize: "9px", lineHeight: "1" }}
                    >
                      You
                    </span>
                  </span>
                </span>
                <span
                  className="whitespace-nowrap font-semibold text-foreground transition-colors duration-200 group-hover/book:text-primary motion-reduce:transition-none"
                  style={{ fontSize: "13px", lineHeight: "18px" }}
                >
                  Book a call
                </span>
              </span>
            </button>
          </div>

          <div
            className="flex flex-wrap items-center text-muted-foreground"
            style={{
              fontSize: "14px",
              lineHeight: "22px",
              letterSpacing: "0.1px",
            }}
          >
            <span className="whitespace-nowrap">email me at&nbsp;</span>
            <button
              type="button"
              onClick={copyEmail}
              data-cuelume-hover="tick"
              aria-label={
                copied ? `${email} copied to clipboard` : `Copy ${email}`
              }
              className="group/email inline-flex cursor-pointer items-center gap-0 rounded-[6px] outline-none transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
            >
              <span
                aria-hidden="true"
                className={`relative inline-flex items-center justify-center overflow-hidden transition-[width,margin] duration-300 ease-out motion-reduce:transition-none ${
                  copied
                    ? "mr-1.5 h-3.5 w-3.5"
                    : "mr-0 h-0 w-0 group-hover/email:mr-1.5 group-hover/email:h-3.5 group-hover/email:w-3.5"
                }`}
              >
                <Copy
                  className={`absolute inset-0 h-full w-full text-primary transition-[opacity,transform,filter] duration-300 ease-out motion-reduce:transition-none ${
                    copied
                      ? "scale-50 opacity-0 blur-sm"
                      : "scale-100 opacity-100 blur-0"
                  }`}
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
                <Check
                  className={`absolute inset-0 h-full w-full text-emerald-400 transition-[opacity,transform,filter] duration-300 ease-out motion-reduce:transition-none ${
                    copied
                      ? "scale-100 opacity-100 blur-0"
                      : "scale-50 opacity-0 blur-sm"
                  }`}
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </span>
              <span className="whitespace-nowrap font-semibold text-foreground transition-colors duration-200 group-hover/email:text-primary motion-reduce:transition-none">
                {email}
              </span>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}