"use client";

import { Button } from "@/components/ui/Button";
import { STACK } from "@/lib/config";
import { viewport } from "@/lib/animations";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03 },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.9, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 120, damping: 16 },
  },
};

export function StackList() {
  return (
    <section className="mb-16 w-full">
      <motion.h2
        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={viewport}
        transition={{ type: "spring", stiffness: 100, damping: 18 }}
        className="text-sm font-mono text-muted-foreground mb-6 uppercase tracking-wider pl-1 md:pl-0"
      >
        // stack
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="flex flex-wrap gap-2 md:gap-2.5"
      >
        {STACK.map((tech) => (
          <TechBadge key={tech.name} item={tech} />
        ))}
      </motion.div>
    </section>
  );
}

function TechBadge({ item: tech }: { item: (typeof STACK)[0] }) {
  const Icon = tech.icon;
  return (
    <motion.div
      variants={item}
      whileTap={{ scale: 0.92 }}
      whileHover={{ y: -2, transition: { type: "spring", stiffness: 300, damping: 15 } }}
    >
      <Button
        variant="ghost"
        className="group h-auto py-2 px-3 md:px-4 bg-card/50 hover:bg-primary/5 border border-border/50 hover:border-primary/20 cursor-default gap-2.5 font-normal transition-all duration-300 shadow-sm hover:shadow-md"
      >
        <Icon
          className="h-4 w-4 md:h-4.5 md:w-4.5 transition-transform duration-300 group-hover:scale-110"
          style={{ color: tech.color }}
        />
        <span className="text-xs md:text-[14px] text-muted-foreground group-hover:text-foreground transition-colors duration-300">
          {tech.name}
        </span>
      </Button>
    </motion.div>
  );
}
