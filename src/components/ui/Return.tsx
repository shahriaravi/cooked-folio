"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ReturnProps {
  href?: string;
  label?: string;
  className?: string;
  animate?: boolean;
}

export default function Return({ 
  href = "/", 
  label = "return",
  className = "",
  animate = true
}: ReturnProps) {
  const content = (
    <Link 
      href={href} 
      className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
    >
      <span className="opacity-50 group-hover:-translate-x-1 transition-transform">/</span>
      <span className="underline underline-offset-4 decoration-dotted">{label}</span>
    </Link>
  );

  if (!animate) {
    return <div className={className}>{content}</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      {content}
    </motion.div>
  );
}