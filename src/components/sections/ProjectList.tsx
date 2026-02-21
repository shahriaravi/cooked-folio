"use client";

import { PROJECTS } from "@/lib/config";
import { viewport } from "@/lib/animations";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14, scale: 0.98, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 18 },
  },
};

export function ProjectList() {
  return (
    <section className="mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={viewport}
        transition={{ type: "spring", stiffness: 100, damping: 18 }}
        className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-wider pl-1 md:pl-0"
      >
        // projects
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="flex flex-col gap-1"
      >
        {PROJECTS.map((project) => (
          <motion.div
            key={project.name}
            variants={item}
            whileHover={{ x: 4, backgroundColor: "hsl(var(--primary) / 0.04)", transition: { type: "spring", stiffness: 300, damping: 20 } }}
            whileTap={{ scale: 0.98 }}
            className="
              group relative flex items-start md:items-center gap-4 py-4 px-3 -mx-3
              rounded-lg
              transition-all duration-300 ease-out
              border border-transparent hover:border-primary/10
            "
          >
            <Link
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-0 rounded-lg"
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
                <span className="font-medium text-[17px] text-foreground tracking-tight group-hover:text-primary transition-colors pointer-events-none">
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

              <p className="text-sm text-muted-foreground leading-relaxed md:line-clamp-1 group-hover:text-foreground/80 transition-colors pointer-events-none">
                {project.tagline}
              </p>
            </div>

            <div className="shrink-0 mt-2 md:mt-0 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 ease-out pointer-events-none">
              <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
