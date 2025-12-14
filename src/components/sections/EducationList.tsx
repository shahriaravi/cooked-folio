"use client";

import { EDUCATION } from "@/lib/config";
import Image from "next/image";

export function EducationList() {
  return (
    <section className="mb-16 mt-8">
      <h2 className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-wider pl-1 md:pl-0">
        // education
      </h2>

      <div className="flex flex-col gap-4">
        {EDUCATION.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3 md:gap-4 rounded-lg">
            <div className="relative h-10 w-10 md:h-12 md:w-12 flex-shrink-0">
              <Image
                src={item.logo}
                alt={item.institution}
                fill
                className="object-contain"
              />
            </div>

            <div>
              <div className="font-semibold text-foreground text-sm md:text-base">
                {item.institution}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                {item.degree}
              </div>
              <div className="text-[11px] md:text-xs text-muted-foreground mt-1">
                {item.period}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
