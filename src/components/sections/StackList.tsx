"use client";

import { Button } from "@/components/ui/Button";
import { STACK } from "@/lib/config";
import { motion } from "framer-motion";

export function StackList() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 },
  };

  return (
    <section className="mb-16 w-full">
      <h2 className="text-sm font-mono text-muted-foreground mb-6 uppercase tracking-wider pl-1 md:pl-0">
        // stack
      </h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-wrap gap-2 md:gap-2.5"
      >
        {STACK.map((tech) => (
          <TechBadge key={tech.name} item={tech} variants={item} />
        ))}
      </motion.div>
    </section>
  );
}

function TechBadge({
  item,
  variants,
}: {
  item: (typeof STACK)[0];
  variants: any;
}) {
  const Icon = item.icon;
  return (
    <motion.div variants={variants}>
      <Button
        variant="ghost"
        className="group h-auto py-2 px-3 md:px-4 bg-card/50 hover:bg-primary/5 border border-border/50 hover:border-primary/20 cursor-default gap-2.5 font-normal transition-all duration-300 shadow-sm hover:shadow-md"
      >
        <Icon
          className="h-4 w-4 md:h-4.5 md:w-4.5 transition-transform duration-300 group-hover:scale-110"
          style={{ color: item.color }}
        />
        <span className="text-xs md:text-[14px] text-muted-foreground group-hover:text-foreground transition-colors duration-300">
          {item.name}
        </span>
      </Button>
    </motion.div>
  );
}
