import { EXPERIENCE } from "@/lib/config";
import Image from "next/image";

export function ExperienceList() {
  return (
    <section className="mb-16">
      <h2 className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        experience
      </h2>

      <p
        className="mb-10 text-muted-foreground"
        style={{
          fontSize: "16px",
          lineHeight: "24px",
          letterSpacing: "0.2px",
        }}
      >
        A few of the places I&apos;ve broken things, shipped things, and
        occasionally done both in the same commit. From tiny side quests to
        production work touching real users here&apos;s the rundown.
      </p>

      <div className="flex flex-col gap-9">
        {EXPERIENCE.map((job, i) => (
          <div
            key={i}
            className="grid grid-cols-1 gap-y-1.5 gap-x-8 md:grid-cols-[110px_1fr]"
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground/80 md:pt-[3px]">
              {job.date}
            </div>

            <div className="flex flex-col gap-1.5">
              <h3
                className="flex flex-wrap items-center gap-x-2 gap-y-1 font-semibold text-foreground"
                style={{ fontSize: "16px", lineHeight: "22px" }}
              >
                <span>{job.role}</span>
                <span className="font-normal text-muted-foreground">at</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="relative inline-block h-[18px] w-[18px] overflow-hidden rounded-[4px] ring-1 ring-border/40">
                    <Image
                      src={job.logo}
                      alt={job.company}
                      fill
                      className="object-cover"
                    />
                  </span>
                  <span>{job.company}</span>
                </span>
              </h3>

              <p
                className="text-muted-foreground"
                style={{
                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "0.2px",
                }}
              >
                {job.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}