"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Mail } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    
    if (!formData.name.trim()) newErrors.name = "name is required";
    if (!formData.message.trim()) newErrors.message = "message cannot be empty";

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "please enter a valid email address";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("failed");

      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center justify-center px-4 py-12">
      
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-6 left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:mb-8"
      >
        <Link 
          href="/" 
          className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
        >
          <span className="opacity-50 group-hover:-translate-x-1 transition-transform">/</span>
          <span className="underline underline-offset-4 decoration-dotted">return</span>
        </Link>
      </motion.div>

      <form onSubmit={handleSubmit} noValidate className="w-full max-w-md flex flex-col gap-5">

        <BotMessage delay={0.1}>
          hello. i&apos;m listening. who is this?
        </BotMessage>

        <div className="w-full flex flex-col items-end">
          <UserMessage delay={0.2}>
            <input
              type="text"
              placeholder="your name ..."
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              className="w-full bg-transparent border-none outline-none text-right placeholder:text-muted-foreground/40"
              autoComplete="off"
              disabled={isSuccess}
            />
          </UserMessage>
          {errors.name && (
            <motion.span 
              initial={{ opacity: 0, y: -5 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-[10px] text-red-400 mt-1 mr-2 font-mono"
            >
              * {errors.name}
            </motion.span>
          )}
        </div>

        <BotMessage delay={0.3}>
          where should i send my reply?
        </BotMessage>

        <div className="w-full flex flex-col items-end">
          <UserMessage delay={0.4}>
            <div className="flex items-center justify-end gap-2 w-full">
               <input
                type="email"
                placeholder="email (optional) ..."
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                className="w-full bg-transparent border-none outline-none text-right placeholder:text-muted-foreground/40"
                autoComplete="off"
                disabled={isSuccess}
              />
              <Mail className="w-3 h-3 text-muted-foreground/50 shrink-0" />
            </div>
          </UserMessage>
          {errors.email && (
            <motion.span 
              initial={{ opacity: 0, y: -5 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-[10px] text-red-400 mt-1 mr-2 font-mono"
            >
              * {errors.email}
            </motion.span>
          )}
        </div>

        <BotMessage delay={0.5}>
          alright. what&apos;s on your mind?
        </BotMessage>

        <div className="w-full flex flex-col items-end">
          <UserMessage delay={0.6} className="min-h-[100px]">
            <textarea
              placeholder="write your query ..."
              value={formData.message}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value });
                if (errors.message) setErrors({ ...errors, message: undefined });
              }}
              className="w-full h-full bg-transparent border-none outline-none text-right resize-none placeholder:text-muted-foreground/40 py-1"
              disabled={isSuccess}
            />
          </UserMessage>
          {errors.message && (
            <motion.span 
              initial={{ opacity: 0, y: -5 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-[10px] text-red-400 mt-1 mr-2 font-mono"
            >
              * {errors.message}
            </motion.span>
          )}
        </div>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <BotMessage delay={0} key="success-msg">
              <span className="text-emerald-400">message received. i&apos;ll get back to you soon.</span>
            </BotMessage>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.7 }}
              className="flex justify-end mt-2"
              key="submit-btn"
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  group relative flex items-center gap-2 pl-5 pr-4 py-3 
                  bg-primary text-primary-foreground 
                  rounded-2xl rounded-tr-sm
                  font-medium text-sm
                  hover:bg-primary/90 hover:scale-[1.02] active:scale-95
                  disabled:opacity-70 disabled:cursor-not-allowed
                  transition-all duration-300 shadow-lg shadow-primary/20
                "
              >
                {isSubmitting ? (
                  <>
                    <span>sending</span>
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    <span>send message</span>
                    <div className="bg-white/20 rounded-full p-1 group-hover:rotate-45 transition-transform duration-300">
                       <Send className="w-3 h-3" />
                    </div>
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </form>
    </div>
  );
}

function BotMessage({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 20 }}
      className="flex items-end gap-3 self-start max-w-[90%]"
    >
      <div className="w-12 h-12 shrink-0">
        <Image 
          src="/avatar/avatar.png" 
          alt="bot" 
          width={48} 
          height={48} 
          className="object-contain w-full h-full" 
        />
      </div>
      <div className="bg-card/50 border border-white/5 px-4 py-3 rounded-2xl rounded-bl-none text-sm text-foreground/90 shadow-sm">
        {children}
      </div>
    </motion.div>
  );
}

function UserMessage({ children, delay, className = "" }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 20 }}
      className="self-end max-w-[90%] w-full flex justify-end"
    >
      <div className={`
        bg-primary/5 border border-primary/20 
        px-4 py-3 rounded-2xl rounded-br-none 
        text-sm text-foreground shadow-sm w-full
        focus-within:bg-primary/10 focus-within:border-primary/40 transition-colors
        ${className}
      `}>
        {children}
      </div>
    </motion.div>
  );
}