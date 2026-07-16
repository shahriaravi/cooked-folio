"use client";

import { EDUCATION } from "@/lib/config";
import Image from "next/image";

export function EducationList() {
  return (
    <section className="mb-16 mt-8">
      <h2 className="mb-8 pl-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground md:pl-0">
        education
      </h2>

      <div className="flex flex-col gap-6">
        {EDUCATION.map((item, idx) => (
          <div key={idx} className="flex items-start gap-4 md:gap-5">
            <div className="relative h-12 w-12 flex-shrink-0 md:h-14 md:w-14">
              <Image
                src={item.logo}
                alt={item.institution}
                fill
                className="object-contain"
              />
            </div>

            <div className="flex flex-col gap-1.5 pt-1">
              <div
                className="font-semibold text-foreground"
                style={{ fontSize: "16px", lineHeight: "22px" }}
              >
                {item.institution}
              </div>
              <div
                className="font-mono text-muted-foreground"
                style={{
                  fontSize: "12px",
                  lineHeight: "18px",
                  letterSpacing: "0.08em",
                }}
              >
                {item.period}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}