"use client";

import { useState } from "react";
import { PROJECTS } from "@/lib/config";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Folder from "@/components/ui/Folder";

export function ProjectList() {
  const [open, setOpen] = useState(false);

  const previewLogos = PROJECTS.slice(0, 3).map((project) => (
    <div
      key={project.name}
      className="relative w-full h-full flex items-center justify-center p-2"
    >
      <Image
        src={project.image}
        alt=""
        width={40}
        height={40}
        className="object-contain drop-shadow-sm"
      />
    </div>
  ));

  return (
    <section className="mb-16">
      <h2 className="mb-4 pl-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground md:pl-0">
        projects
      </h2>

      <div className="flex flex-col items-center gap-6 py-6">
        <Folder
          color="#3B82F6"
          size={1.3}
          items={previewLogos}
          open={open}
          onToggle={setOpen}
        />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
          aria-expanded={open}
        >
          {open ? "hide projects" : "click to see ;)"}
        </button>
      </div>

      <div
        className="grid transition-all duration-500 ease-out"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-2 pt-2">
            {PROJECTS.map((project) => (
              <div
                key={project.name}
                className="
                  group relative flex items-start md:items-center gap-4 py-4 px-4
                  rounded-2xl
                  transition-all duration-300 ease-out
                  border border-border/40 hover:border-primary/30
                  hover:bg-primary/[0.04]
                "
              >
                <Link
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-0 rounded-2xl"
                  aria-label={`View ${project.name}`}
                />

                <div className="relative shrink-0 w-10 h-10 md:w-11 md:h-11 mt-1 md:mt-0 pointer-events-none">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-out drop-shadow-sm"
                  />
                </div>

                <div className="flex flex-col grow min-w-0 pr-1">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-1">
                    <span
                      className="pointer-events-none font-semibold text-foreground tracking-tight transition-colors group-hover:text-primary"
                      style={{ fontSize: "16px", lineHeight: "22px" }}
                    >
                      {project.name}
                    </span>

                    {project.repo && (
                      <Link
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          relative z-10 flex items-center justify-center
                          w-6 h-6 rounded-full
                          bg-background text-muted-foreground
                          border border-border/60
                          hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:border-primary
                          transition-all duration-300 ease-out
                          shadow-sm
                        "
                        title="View Source Code"
                      >
                        <Github className="w-3.5 h-3.5 fill-current" />
                      </Link>
                    )}
                  </div>

                  <p
                    className="pointer-events-none text-muted-foreground transition-colors md:line-clamp-1 group-hover:text-foreground/80"
                    style={{
                      fontSize: "15px",
                      lineHeight: "22px",
                      letterSpacing: "0.1px",
                    }}
                  >
                    {project.tagline}
                  </p>
                </div>

                <div className="shrink-0 mt-2 md:mt-0 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 ease-out pointer-events-none">
                  <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}