"use client";

import { STACK } from "@/lib/config";
import { motion } from "framer-motion";

export function TechStack() {
  return (
    <section className="mb-16 w-full overflow-hidden">
      <h2 className="text-sm font-mono text-muted-foreground mb-6 uppercase tracking-wider pl-1 md:pl-0">
        // stack
      </h2>

      <div
        className="relative flex w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <motion.div
          className="flex min-w-full shrink-0 items-center justify-around gap-10 pr-10"
          animate={{ x: "-100%" }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {STACK.map((item) => (
            <TechItem key={item.name} item={item} />
          ))}
        </motion.div>

        <motion.div
          className="flex min-w-full shrink-0 items-center justify-around gap-10 pr-10"
          aria-hidden="true"
          animate={{ x: "-100%" }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {STACK.map((item) => (
            <TechItem key={`${item.name}-duplicate`} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TechItem({ item }: { item: (typeof STACK)[0] }) {
  const Icon = item.icon;
  return (
    <div className="flex flex-col items-center gap-3">
      <Icon className="h-10 w-10" style={{ color: item.color }} />
      <span className="text-sm font-medium text-muted-foreground/80 capitalize">
        {item.name}
      </span>
    </div>
  );
}
