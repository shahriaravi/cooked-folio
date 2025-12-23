"use client";

import Return from "@/components/ui/Return";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ThankYouContent() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mx-auto"
        >
          <Image
            src="/avatar/avatar.png"
            alt="avi"
            width={120}
            height={120}
            className="mx-auto"
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl md:text-3xl font-medium tracking-tight text-foreground"
        >
          thanks for joining the meeting
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-muted-foreground/60 text-sm leading-relaxed"
        >
          (if i promised to send you something, ping me if i forget.)
        </motion.p>

        <Return className="pt-4 flex justify-center" />
      </div>
    </div>
  );
}
