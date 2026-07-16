"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Copy,
  Loader2,
  Send,
  CornerDownLeft,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
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

const expandVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      opacity: { duration: 0.2 },
    },
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

  const canSubmit = email.trim() && amount.trim() && method && !isSubmitting;

  return (
    <main className="layout-container">
      <Link
        href="/"
        className="group mb-10 inline-flex items-center gap-2 font-mono text-[13px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
      >
        <CornerDownLeft className="h-[14px] w-[14px] transition-transform duration-200 group-hover:-translate-x-0.5" />
        <span>Back</span>
      </Link>

      <div className="mb-10 flex flex-col gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          support
        </span>
        <h1
          className="font-semibold text-foreground"
          style={{
            fontSize: "22px",
            lineHeight: "28px",
            letterSpacing: "-0.01em",
          }}
        >
          Buy me a coffee, or something stronger
        </h1>
        <p
          className="text-muted-foreground"
          style={{
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: "0.2px",
          }}
        >
          If anything I&apos;ve built has been useful to you, this is the tip
          jar. No pressure, no paywalls, just genuine appreciation that keeps
          the caffeine flowing and the commits pushing.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="font-mono uppercase tracking-[0.12em] text-muted-foreground"
            style={{ fontSize: "10px", lineHeight: "1" }}
          >
            your email
          </label>
          <input
            id="email"
            type="email"
            placeholder="hi@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            className="h-11 rounded-xl border border-border/60 bg-card/40 px-4 text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground/50 focus:border-primary/40 focus:bg-card/70 disabled:opacity-50"
            style={{
              fontSize: "15px",
              lineHeight: "22px",
              letterSpacing: "0.1px",
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="amount"
            className="font-mono uppercase tracking-[0.12em] text-muted-foreground"
            style={{ fontSize: "10px", lineHeight: "1" }}
          >
            amount
          </label>
          <div className="relative">
            <input
              id="amount"
              type="number"
              placeholder="10.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isSubmitting}
              min="1"
              className="h-11 w-full rounded-xl border border-border/60 bg-card/40 px-4 pr-20 text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground/50 focus:border-primary/40 focus:bg-card/70 disabled:opacity-50"
              style={{
                fontSize: "15px",
                lineHeight: "22px",
                letterSpacing: "0.1px",
              }}
            />
            <span
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono uppercase tracking-[0.12em] text-muted-foreground/60"
              style={{ fontSize: "10px", lineHeight: "1" }}
            >
              usd / bdt
            </span>
          </div>
        </div>

        <div className="mt-2 flex flex-col gap-3">
          <label
            className="font-mono uppercase tracking-[0.12em] text-muted-foreground"
            style={{ fontSize: "10px", lineHeight: "1" }}
          >
            payment method
          </label>

          <div className="flex flex-col gap-2.5">
            <MethodOption
              active={method === "wise"}
              disabled={isSubmitting}
              onClick={() => !isSubmitting && setMethod("wise")}
              icon={<SiWise className="h-[18px] w-[18px]" />}
              title="Wise"
              subtitle="international bank transfer"
              expanded={method === "wise"}
            >
              <div className="space-y-3 pt-3">
                <a
                  href="https://www.youtube.com/watch?v=gwD7VsqcHsY"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="group/video flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/[0.06] px-3.5 py-2.5 transition-all duration-200 hover:border-primary/30 hover:bg-primary/[0.09]"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 transition-colors duration-200 group-hover/video:bg-primary/25">
                    <svg
                      className="ml-0.5 h-3 w-3 fill-primary text-primary"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p
                      className="font-semibold text-primary"
                      style={{ fontSize: "13px", lineHeight: "16px" }}
                    >
                      watch instruction video
                    </p>
                    <p
                      className="text-muted-foreground"
                      style={{
                        fontSize: "11px",
                        lineHeight: "14px",
                        marginTop: "2px",
                      }}
                    >
                      step by step guide for Wise transfer
                    </p>
                  </div>
                </a>

                <div className="overflow-hidden rounded-xl border border-border/50 bg-background/40 divide-y divide-border/40">
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
            </MethodOption>

            <MethodOption
              active={method === "bkash"}
              disabled={isSubmitting}
              onClick={() => !isSubmitting && setMethod("bkash")}
              icon={<Smartphone className="h-[18px] w-[18px]" />}
              title="bKash"
              subtitle="mobile wallet, send money"
              expanded={method === "bkash"}
            >
              <div className="space-y-3 pt-3">
                <div
                  className="flex items-center gap-2 text-muted-foreground"
                  style={{
                    fontSize: "13px",
                    lineHeight: "18px",
                    letterSpacing: "0.1px",
                  }}
                >
                  <span
                    className="font-mono uppercase tracking-[0.12em] text-muted-foreground/70"
                    style={{ fontSize: "10px", lineHeight: "1" }}
                  >
                    type
                  </span>
                  <span className="font-semibold text-foreground">
                    Send Money
                  </span>
                </div>

                <CopyField
                  label="bKash Number"
                  value={BKASH_NUMBER}
                  copyKey="bkash"
                  copiedKey={copiedKey}
                  onCopy={copyText}
                />
              </div>
            </MethodOption>
          </div>
        </div>

        <div className="mt-2 flex flex-col gap-3">
          <div
            className="overflow-hidden transition-all duration-200 ease-out"
            style={{
              maxHeight: error ? "32px" : "0px",
              opacity: error ? 1 : 0,
            }}
          >
            <p
              className="text-red-400/90"
              style={{
                fontSize: "12px",
                lineHeight: "16px",
                letterSpacing: "0.1px",
              }}
            >
              * {error}
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="group inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-primary text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-primary"
            style={{ fontSize: "15px", lineHeight: "20px", fontWeight: 600 }}
          >
            {isSubmitting ? (
              <>
                <span>sending</span>
                <Loader2 className="h-4 w-4 animate-spin" />
              </>
            ) : (
              <>
                <span>notify me</span>
                <Send className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </>
            )}
          </button>

          <p
            className="text-center text-muted-foreground/70"
            style={{
              fontSize: "12px",
              lineHeight: "18px",
              letterSpacing: "0.1px",
            }}
          >
            after payment, hit notify so I can send a proper thank you
          </p>
        </div>
      </div>
    </main>
  );
}

function MethodOption({
  active,
  disabled,
  onClick,
  icon,
  title,
  subtitle,
  expanded,
  children,
}: {
  active: boolean;
  disabled: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  expanded: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      onClick={onClick}
      className={`
        w-full cursor-pointer rounded-2xl border p-4 transition-all duration-200
        ${
          active
            ? "border-primary/40 bg-primary/[0.04]"
            : "border-border/50 bg-card/40 hover:border-primary/25 hover:bg-primary/[0.02]"
        }
        ${disabled ? "pointer-events-none opacity-60" : ""}
      `}
    >
      <div className="flex items-center gap-3">
        <div
          className={`
            flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-200
            ${
              active
                ? "bg-primary/10 text-primary"
                : "bg-muted/30 text-muted-foreground"
            }
          `}
        >
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <p
            className="font-semibold text-foreground"
            style={{ fontSize: "15px", lineHeight: "20px" }}
          >
            {title}
          </p>
          <p
            className="text-muted-foreground"
            style={{
              fontSize: "12px",
              lineHeight: "16px",
              letterSpacing: "0.1px",
              marginTop: "2px",
            }}
          >
            {subtitle}
          </p>
        </div>

        <div
          className={`
            ml-2 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200
            ${
              active
                ? "border-primary bg-primary"
                : "border-muted-foreground/30"
            }
          `}
        >
          {active && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="h-1.5 w-1.5 rounded-full bg-primary-foreground"
            />
          )}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            variants={expandVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
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
      className="group/row flex cursor-pointer items-center justify-between gap-3 px-3.5 py-2.5 transition-colors duration-200 hover:bg-primary/[0.04]"
    >
      <span
        className="shrink-0 font-mono uppercase tracking-[0.1em] text-muted-foreground/70"
        style={{ fontSize: "10px", lineHeight: "1" }}
      >
        {label}
      </span>
      <div className="flex min-w-0 items-center gap-2">
        <span
          className="truncate font-mono text-foreground"
          style={{ fontSize: "12px", lineHeight: "18px" }}
        >
          {value}
        </span>
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
              <Check className="h-3 w-3 text-emerald-400" />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="shrink-0 transition-opacity group-hover/row:!opacity-70"
            >
              <Copy className="h-3 w-3 text-muted-foreground" />
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
    <div className="flex flex-col gap-2">
      <span
        className="font-mono uppercase tracking-[0.12em] text-muted-foreground/70"
        style={{ fontSize: "10px", lineHeight: "1" }}
      >
        {label}
      </span>
      <div
        onClick={(e) => {
          e.stopPropagation();
          onCopy(value, copyKey);
        }}
        className="group/copy flex cursor-pointer items-center gap-2 rounded-xl border border-border/50 bg-background/40 px-3.5 py-2.5 transition-colors duration-200 hover:border-primary/30 hover:bg-primary/[0.03]"
      >
        <span
          className="flex-1 break-all font-mono text-foreground"
          style={{ fontSize: "14px", lineHeight: "20px" }}
        >
          {value}
        </span>
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
              <Check className="h-[14px] w-[14px] text-emerald-400" />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="shrink-0 transition-opacity group-hover/copy:!opacity-100"
            >
              <Copy className="h-[14px] w-[14px] text-muted-foreground" />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}