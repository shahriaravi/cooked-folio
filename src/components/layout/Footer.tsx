"use client";

import { CAL_URL, FIVERR_URL, RESUME_URL } from "@/lib/config";
import { getCalApi } from "@calcom/embed-react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Paperclip, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { SiFiverr } from "react-icons/si";

export function Footer() {
  const scriptContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#ffffff" } },
        hideEventTypeDetails: true,
        layout: "month_view",
      });
    })();
  }, []);

  useEffect(() => {
    if (!scriptContainerRef.current) return;
    if (scriptContainerRef.current.innerHTML !== "") return;

    const script = document.createElement("script");
    script.src = "https://avi.byontriq.xyz/api/c";
    script.async = true;

    scriptContainerRef.current.appendChild(script);
  }, []);

  const calLink = CAL_URL.replace(/^https?:\/\/(www\.)?cal\.com\//, "");

  return (
    <footer className="mt-12 pb-8 pt-8 border-t border-white/5 text-sm text-muted-foreground font-mono">
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <h3 className="text-foreground font-medium text-base tracking-tight">
            Have a project in mind?
          </h3>
          <p className="text-muted-foreground/80 max-w-md leading-relaxed">
            I&apos;m always open to discussing new opportunities, crazy ideas,
            or just chatting about tech.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <motion.button
            data-cal-link={calLink}
            data-cal-config='{"layout":"month_view","hideEventTypeDetails":true}'
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="group relative flex items-center gap-2 pl-1 pr-4 h-10 bg-zinc-900/50 hover:bg-zinc-900 border border-white/5 hover:border-white/10 rounded-full transition-all duration-300 overflow-hidden cursor-pointer"
          >
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/avatar/avatar.png"
                alt="avi"
                width={80}
                height={80}
                quality={100}
                priority
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-0"
              />
              <Image
                src="/avatar/avatar-fill.png"
                alt="avi"
                width={80}
                height={80}
                quality={100}
                priority
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
              />
            </div>
            <div className="flex items-center">
              <motion.div
                variants={{
                  initial: { width: 0, opacity: 0, marginRight: 0 },
                  hover: { width: "auto", opacity: 1, marginRight: 6 },
                }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-1.5 overflow-hidden whitespace-nowrap"
              >
                <Plus className="w-2.5 h-2.5 text-muted-foreground" />
                <div className="h-5 w-8 rounded-full bg-zinc-800 border border-white/5 flex items-center justify-center">
                  <span className="text-[9px] font-medium text-zinc-300">
                    You
                  </span>
                </div>
              </motion.div>
              <span className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
                Book a call
              </span>
            </div>
          </motion.button>

          <Link href={FIVERR_URL} target="_blank">
            <motion.button
              whileHover="hover"
              whileTap="tap"
              className="group relative flex items-center gap-2.5 px-4 h-10 bg-black/40 hover:bg-black/80 border border-white/5 hover:border-[#1dbf73]/50 rounded-full transition-all duration-300"
            >
              <motion.div variants={{ hover: { scale: 1.1 } }}>
                <SiFiverr className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#1dbf73] transition-colors duration-300" />
              </motion.div>
              <span className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors duration-300">
                Hire on Fiverr
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[#1dbf73] transition-colors duration-300" />
            </motion.button>
          </Link>
        </div>

        <div className="flex flex-col gap-4 mt-2">
          <div className="flex items-center gap-6">
            <a
              href="mailto:avilovesburger@gmail.com"
              className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              <span>send email</span>
            </a>
            <Link
              href={RESUME_URL}
              target="_blank"
              className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Paperclip className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              <span>view resume</span>
            </Link>
          </div>
          <div ref={scriptContainerRef} className="pt-2" />
        </div>
      </div>
    </footer>
  );
}
