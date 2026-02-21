"use client";

import { EDUCATION } from "@/lib/config";
import { staggerContainer, staggerItem, viewport } from "@/lib/animations";
import { motion } from "framer-motion";
import Image from "next/image";

export function EducationList() {
  return (
    <section className="mb-16 mt-8">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.h2
          variants={staggerItem}
          className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-wider pl-1 md:pl-0"
        >
          // education
        </motion.h2>

        <div className="flex flex-col gap-4">
          {EDUCATION.map((item, idx) => (
            <motion.div
              key={idx}
              variants={staggerItem}
              whileHover={{ x: 4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="flex items-start gap-3 md:gap-4 rounded-lg p-2 -m-2 transition-colors duration-200 hover:bg-primary/[0.03]"
            >
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
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
