"use client";

import { PROJECTS } from "@/lib/config";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ProjectList() {
  return (
    <section className="mb-16">
      <h2 className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-wider">
        // projects
      </h2>

      <div className="flex flex-col gap-1">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="
              group relative flex items-center gap-5 py-4 px-2 -mx-2
              rounded-xl
              transition-all duration-300 ease-out
              hover:bg-white/5
            "
          >
            <Link
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-0 rounded-xl"
              aria-label={`View ${project.name}`}
            />

            <div className="relative shrink-0 w-11 h-11 pointer-events-none">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-contain opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
              />
            </div>

            <div className="flex flex-col grow min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-medium text-lg text-foreground tracking-tight group-hover:text-primary transition-colors pointer-events-none">
                  {project.name}
                </span>

                {project.repo && (
                  <Link
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      relative z-10 flex items-center justify-center 
                      w-7 h-7 rounded-full 
                      bg-zinc-800/50 text-zinc-400
                      border border-white/5
                      hover:bg-white hover:text-black hover:scale-110 hover:border-white
                      transition-all duration-300 ease-out
                      shadow-sm
                    "
                    title="View Source Code"
                  >
                    <Github className="w-4 h-4 fill-current" />
                  </Link>
                )}
              </div>

              <p className="text-sm text-muted-foreground line-clamp-1 group-hover:text-muted-foreground/80 transition-colors pointer-events-none">
                {project.tagline}
              </p>
            </div>

            <div className="shrink-0 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 ease-out pointer-events-none">
              <ArrowUpRight className="w-6 h-6" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
