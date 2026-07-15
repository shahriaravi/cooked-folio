"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, Loader2, Phone, Send, AlertTriangle } from "lucide-react";
import Return from "@/components/ui/Return";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SiWise } from "react-icons/si";

const BKASH_NUMBER = "01701076982";

const WISE_DETAILS = [
  { label: "Email", value: "avilovesburger@gmail.com" },
  { label: "Full Name", value: "SHAHRIAR AVI" },
  { label: "Wallet Provider", value: "bKash" },
  { label: "E-wallet Number", value: "+8801701076982" },
  { label: "Country", value: "Bangladesh" },
  { label: "City", value: "Dhaka" },
  { label: "Address", value: "Gulshan, Dhaka" },
  { label: "Post Code", value: "1212" },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 18 },
  },
};

const expandVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { type: "spring", stiffness: 100, damping: 20, opacity: { duration: 0.2 } },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2, opacity: { duration: 0.1 } },
  },
};

export default function DonateContent() {
  const router = useRouter();
  const [method, setMethod] = useState<"wise" | "bkash" | null>(null);
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const copyText = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = async () => {
    if (!email.trim() || !amount.trim() || !method) return;

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, amount, method }),
      });

      if (!res.ok) throw new Error("failed");
      router.push("/donate/thanks");
    } catch {
      setError("something went wrong. try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center justify-center px-4 py-12">
      <Return href="/" label="return" className="mb-10" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg flex flex-col gap-6"
      >
        <motion.div variants={staggerItem} className="text-center mb-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
            support my work
          </h1>
          <p className="text-sm text-muted-foreground">
            your contribution keeps me caffeinated and shipping
          </p>
        </motion.div>

        <motion.div variants={staggerItem}>
          <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 block">
            Email
          </label>
          <Input
            type="email"
            placeholder="your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
          />
        </motion.div>

        <motion.div variants={staggerItem}>
          <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 block">
            Amount (USD/BDT)
          </label>
          <Input
            type="number"
            placeholder="10.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isSubmitting}
            min="1"
          />
        </motion.div>

        <motion.div variants={staggerItem}>
          <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4 block">
            Payment Method
          </label>
          <div className="flex flex-col gap-3">
            {/* Wise */}
            <motion.button
              onClick={() => !isSubmitting && setMethod("wise")}
              whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
              className={`
                w-full text-left rounded-lg border p-4 transition-all duration-200 cursor-pointer
                ${method === "wise"
                  ? "border-primary/50 bg-primary/5 shadow-sm"
                  : "border-border/50 bg-card/50 hover:border-primary/20 hover:bg-primary/[0.02]"
                }
                ${isSubmitting ? "pointer-events-none opacity-60" : ""}
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 ${method === "wise" ? "bg-primary/10" : "bg-muted/30"}`}>
                  <SiWise className={`w-5 h-5 transition-colors duration-200 ${method === "wise" ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <div className="font-medium text-sm text-foreground">Wise</div>
                  <div className="text-xs text-muted-foreground">bank transfer via bKash</div>
                </div>
                <div className={`ml-auto w-4 h-4 rounded-full border-2 transition-all duration-200 ${method === "wise" ? "border-primary bg-primary" : "border-muted-foreground/30"}`}>
                  {method === "wise" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      className="w-full h-full rounded-full flex items-center justify-center"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                    </motion.div>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {method === "wise" && (
                  <motion.div
                    variants={expandVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-border/30 space-y-3">
                      <a
                        href="https://www.youtube.com/watch?v=gwD7VsqcHsY"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="group/video flex items-center gap-3 rounded-lg bg-primary/[0.06] border border-primary/15 px-3.5 py-2.5 hover:bg-primary/10 hover:border-primary/25 transition-all duration-200"
                      >
                        <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0 group-hover/video:bg-primary/25 transition-colors">
                          <svg className="w-3 h-3 fill-primary text-primary ml-0.5" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-primary">watch instruction video</div>
                          <div className="text-[10px] text-muted-foreground">step-by-step guide for Wise transfer</div>
                        </div>
                      </a>

                      <div className="rounded-lg border border-border/40 bg-card/30 divide-y divide-border/30 overflow-hidden">
                        {WISE_DETAILS.map((item) => (
                          <CopyRow
                            key={item.label}
                            label={item.label}
                            value={item.value}
                            copyKey={`wise-${item.label}`}
                            copiedKey={copiedKey}
                            onCopy={copyText}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* bKash */}
            <motion.button
              onClick={() => !isSubmitting && setMethod("bkash")}
              whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
              className={`
                w-full text-left rounded-lg border p-4 transition-all duration-200 cursor-pointer
                ${method === "bkash"
                  ? "border-primary/50 bg-primary/5 shadow-sm"
                  : "border-border/50 bg-card/50 hover:border-primary/20 hover:bg-primary/[0.02]"
                }
                ${isSubmitting ? "pointer-events-none opacity-60" : ""}
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 ${method === "bkash" ? "bg-primary/10" : "bg-muted/30"}`}>
                  <Phone className={`w-5 h-5 transition-colors duration-200 ${method === "bkash" ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <div className="font-medium text-sm text-foreground">bKash</div>
                  <div className="text-xs text-muted-foreground">mobile wallet transfer</div>
                </div>
                <div className={`ml-auto w-4 h-4 rounded-full border-2 transition-all duration-200 ${method === "bkash" ? "border-primary bg-primary" : "border-muted-foreground/30"}`}>
                  {method === "bkash" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      className="w-full h-full rounded-full flex items-center justify-center"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                    </motion.div>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {method === "bkash" && (
                  <motion.div
                    variants={expandVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-border/30 space-y-3">
                      <div className="text-xs text-muted-foreground">Type: <span className="text-foreground font-medium">Send Money</span></div>
                      <CopyField label="bKash Number" value={BKASH_NUMBER} copyKey="bkash" copiedKey={copiedKey} onCopy={copyText} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>

        <motion.div variants={staggerItem}>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-400 mb-3 font-mono"
            >
              * {error}
            </motion.p>
          )}
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !email.trim() || !amount.trim() || !method}
            className="w-full h-12 text-base gap-3 group"
          >
            {isSubmitting ? (
              <>
                <span>sending</span>
                <Loader2 className="w-4 h-4 animate-spin" />
              </>
            ) : (
              <>
                <span>notify me</span>
                <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

function CopyRow({
  label,
  value,
  copyKey,
  copiedKey,
  onCopy,
}: {
  label: string;
  value: string;
  copyKey: string;
  copiedKey: string | null;
  onCopy: (text: string, key: string) => void;
}) {
  const isCopied = copiedKey === copyKey;
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onCopy(value, copyKey);
      }}
      className="group/row flex items-center justify-between gap-3 px-3.5 py-2.5 cursor-pointer hover:bg-primary/[0.03] transition-colors"
    >
      <span className="text-[11px] text-muted-foreground shrink-0">{label}</span>
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-xs font-mono text-foreground truncate">{value}</span>
        <AnimatePresence mode="wait" initial={false}>
          {isCopied ? (
            <motion.span
              key="check"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="shrink-0"
            >
              <Check className="w-3 h-3 text-emerald-400" />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="shrink-0 group-hover/row:!opacity-50 transition-opacity"
            >
              <Copy className="w-3 h-3 text-muted-foreground" />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CopyField({
  label,
  value,
  copyKey,
  copiedKey,
  onCopy,
}: {
  label: string;
  value: string;
  copyKey: string;
  copiedKey: string | null;
  onCopy: (text: string, key: string) => void;
}) {
  const isCopied = copiedKey === copyKey;
  return (
    <div className="space-y-1.5">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          onCopy(value, copyKey);
        }}
        className="group/copy flex items-center gap-2 bg-muted/20 rounded-md px-3 py-2 cursor-pointer hover:bg-muted/30 transition-colors"
      >
        <span className="text-xs font-mono text-foreground break-all flex-1">{value}</span>
        <AnimatePresence mode="wait" initial={false}>
          {isCopied ? (
            <motion.span
              key="check"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="shrink-0"
            >
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="shrink-0 group-hover/copy:!opacity-100 transition-opacity"
            >
              <Copy className="w-3.5 h-3.5 text-muted-foreground" />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}