"use client";

import { EXPERIENCE } from "@/lib/config";

export function ExperienceList() {
  return (
    <section className="mb-16">
      <h2 className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-wider pl-1 md:pl-0">
        // experience
      </h2>

      <div className="flex flex-col gap-8">
        {EXPERIENCE.map((job, i) => (
          <div key={i} className="flex gap-4 md:gap-8 group">
            <div className="hidden md:block w-32 flex-shrink-0 text-xs font-mono text-muted-foreground pt-1">
              {job.date}
            </div>

            <div className="flex-1">
              <div className="md:hidden text-xs font-mono text-muted-foreground mb-1">
                {job.date}
              </div>

              <h3 className="font-semibold text-foreground text-sm md:text-base mb-1">
                {job.role} <span className="text-muted-foreground">at</span>{" "}
                <span className="text-foreground">{job.company}</span>
              </h3>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {job.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
