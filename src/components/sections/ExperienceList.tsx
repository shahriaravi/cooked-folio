"use client";
import { EXPERIENCE } from "@/lib/config";
import Image from "next/image";

export function ExperienceList() {
  return (
    <section className="mb-16">
      <h2 className="text-sm font-mono text-muted-foreground mb-8 uppercase tracking-wider pl-1 md:pl-0">
        experience
      </h2>
      <div className="flex flex-col gap-8">
        {EXPERIENCE.map((job, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-[110px_1fr] gap-y-2 gap-x-8 items-start"
          >
            <div className="text-sm font-mono text-muted-foreground pt-1.5">
              {job.date}
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-foreground text-base md:text-lg flex flex-wrap items-center gap-x-2">
                <span>{job.role}</span>
                <span className="text-muted-foreground text-sm">at</span>
                <span className="inline-flex items-center gap-2 text-foreground font-semibold">
                  <div className="relative h-6 w-6 overflow-hidden shrink-0">
                    <Image
                      src={job.logo}
                      alt={job.company}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {job.company}
                </span>
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                {job.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}