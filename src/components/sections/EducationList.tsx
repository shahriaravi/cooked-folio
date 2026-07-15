"use client";

import { EDUCATION } from "@/lib/config";
import Image from "next/image";

export function EducationList() {
  return (
    <section className="mb-16 mt-8">
      <h2 className="text-sm font-mono text-muted-foreground mb-8 uppercase tracking-wider pl-1 md:pl-0">
        education
      </h2>

      <div className="flex flex-col gap-6">
        {EDUCATION.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 md:gap-5"
          >
            <div className="relative h-12 w-12 md:h-14 md:w-14 flex-shrink-0">
              <Image
                src={item.logo}
                alt={item.institution}
                fill
                className="object-contain"
              />
            </div>

            <div className="flex flex-col gap-1.5 pt-1">
              <div className="font-semibold text-foreground text-base md:text-lg">
                {item.institution}
              </div>
              <div className="text-sm md:text-sm text-muted-foreground">
                {item.period}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}