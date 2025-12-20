"use client";

import { EXPERIENCE } from "@/lib/config";
import Image from "next/image";

export function ExperienceList() {
  return (
    <section className="mb-16">
      <h2 className="text-sm font-mono text-muted-foreground mb-8 uppercase tracking-wider pl-1 md:pl-0">
        // experience
      </h2>

      <div className="flex flex-col gap-6">
        {EXPERIENCE.map((job, i) => (
          <div
            key={i}
            className="group grid grid-cols-1 md:grid-cols-[100px_1fr] gap-y-2 gap-x-4 items-start"
          >
            <div className="text-xs font-mono text-muted-foreground pt-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
              {job.date}
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-foreground text-sm md:text-base flex flex-wrap items-center gap-x-2">
                <span>{job.role}</span>
                <span className="text-muted-foreground text-xs">at</span>

                <span className="inline-flex items-center gap-2 text-foreground font-semibold">
                  <div className="relative h-5 w-5 overflow-hidden rounded-sm">
                    <Image
                      src={job.logo}
                      alt={job.company}
                      fill
                      className="object-contain"
                    />
                  </div>
                  {job.company}
                </span>
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                {job.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
