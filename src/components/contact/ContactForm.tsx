"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Send, Loader2, Mail, CornerDownLeft } from "lucide-react";
import Link from "next/link";
import { useDiscordPresence } from "@/hooks/useDiscordPresence";
import DiscordPresenceDot from "@/components/integrations/DiscordPresenceDot";

type Step = "name" | "message" | "email" | "sending" | "done";

interface ChatBubble {
  id: string;
  type: "bot" | "user";
  content: string;
  inputType?: Step;
}

const statusLabel = (status: string | null | undefined) => {
  switch (status) {
    case "online":
      return "online";
    case "idle":
      return "idle";
    case "dnd":
      return "do not disturb";
    case "offline":
    default:
      return "offline";
  }
};

export default function ContactForm() {
  const discordStatus = useDiscordPresence();
  const [step, setStep] = useState<Step>("name");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [bubbles, setBubbles] = useState<ChatBubble[]>([]);
  const [botTyping, setBotTyping] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 50);
  };

  const addBotBubble = (content: string, onDone?: () => void) => {
    setBotTyping(true);
    scrollToBottom();
    setTimeout(() => {
      setBubbles((prev) => [
        ...prev,
        { id: `bot-${Date.now()}`, type: "bot", content },
      ]);
      setBotTyping(false);
      scrollToBottom();
      onDone?.();
    }, 800);
  };

  const addUserBubble = (content: string) => {
    setBubbles((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, type: "user", content },
    ]);
    scrollToBottom();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      addBotBubble("hey there. what's your name?");
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!botTyping) {
      setTimeout(() => {
        if (step === "message") {
          textareaRef.current?.focus();
        } else if (step !== "sending" && step !== "done") {
          inputRef.current?.focus();
        }
      }, 100);
    }
  }, [botTyping, step]);

  const validateAndProceed = () => {
    setError("");

    if (step === "name") {
      if (!inputValue.trim()) {
        setError("what should i call you?");
        return;
      }
      const name = inputValue.trim();
      setFormData((prev) => ({ ...prev, name }));
      addUserBubble(name);
      setInputValue("");
      addBotBubble(
        `nice to meet you, ${name.split(" ")[0].toLowerCase()}. so what's on your mind?`,
        () => {
          setStep("message");
        }
      );
      return;
    }

    if (step === "message") {
      if (!inputValue.trim()) {
        setError("go ahead, type something");
        return;
      }
      const msg = inputValue.trim();
      setFormData((prev) => ({ ...prev, message: msg }));
      addUserBubble(msg);
      setInputValue("");
      addBotBubble(
        `got it. drop your email so i can reply back, or type "skip" if you'd rather not.`,
        () => {
          setStep("email");
        }
      );
      return;
    }

    if (step === "email") {
      const val = inputValue.trim();
      if (val.toLowerCase() === "skip" || val === "") {
        addUserBubble(val || "skipped");
        setInputValue("");
        setStep("sending");
        submitForm({ ...formData, email: "" });
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        setError("that doesn't look right. try again or type \"skip\"");
        return;
      }
      setFormData((prev) => ({ ...prev, email: val }));
      addUserBubble(val);
      setInputValue("");
      setStep("sending");
      submitForm({ ...formData, email: val });
    }
  };

  const submitForm = async (data: typeof formData) => {
    setBotTyping(true);
    scrollToBottom();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setTimeout(() => {
        setBubbles((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            type: "bot",
            content: "message received. i'll get back to you soon. thanks for reaching out ✌️",
          },
        ]);
        setBotTyping(false);
        setStep("done");
        scrollToBottom();
      }, 1200);
    } catch {
      setTimeout(() => {
        setBubbles((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            type: "bot",
            content: "something went wrong on my end. try again, or just email me directly.",
          },
        ]);
        setBotTyping(false);
        setStep("email");
        scrollToBottom();
      }, 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      validateAndProceed();
    }
  };

  return (
    <main className="layout-container">
      <Link
        href="/"
        className="group mb-10 inline-flex items-center gap-2 font-mono text-[13px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
      >
        <CornerDownLeft className="h-[14px] w-[14px] transition-transform duration-200 group-hover:-translate-x-0.5" />
        <span>Back</span>
      </Link>

      <div className="mb-10 flex items-center gap-3">
        <div className="relative h-12 w-12 shrink-0">
          <div
            className="relative h-full w-full overflow-hidden bg-background"
            style={{ borderRadius: "14px" }}
          >
            <Image
              src="/avatar/avatar.png"
              alt="avi"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5">
            <DiscordPresenceDot
              status={discordStatus}
              className="h-[13px] w-[13px] border-[2.5px] border-background"
            />
          </div>
        </div>

        <div className="min-w-0">
          <p
            className="font-semibold text-foreground"
            style={{ fontSize: "16px", lineHeight: "20px" }}
          >
            avi
          </p>
          <p
            className="font-mono uppercase tracking-[0.12em] text-muted-foreground"
            style={{ fontSize: "10px", lineHeight: "1", marginTop: "5px" }}
          >
            {botTyping ? "typing..." : statusLabel(discordStatus)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 pb-6">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className={`flex ${bubble.type === "user" ? "justify-end" : "justify-start"}`}
            style={{ animation: "chatReveal 0.3s ease-out both" }}
          >
            {bubble.type === "bot" ? (
              <div className="flex max-w-[85%] items-end gap-2">
                <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src="/avatar/avatar.png"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <div
                  className="rounded-2xl rounded-bl-md border border-border/50 bg-card/50 px-3.5 py-2.5 text-foreground/90 backdrop-blur-sm"
                  style={{ fontSize: "15px", lineHeight: "22px", letterSpacing: "0.1px" }}
                >
                  {bubble.content}
                </div>
              </div>
            ) : (
              <div
                className="max-w-[80%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-primary-foreground shadow-sm"
                style={{ fontSize: "15px", lineHeight: "22px", letterSpacing: "0.1px" }}
              >
                {bubble.content}
              </div>
            )}
          </div>
        ))}

        {botTyping && (
          <div className="flex items-end gap-2">
            <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/avatar/avatar.png"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border/50 bg-card/50 px-3.5 py-3 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:300ms]" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {step !== "done" && step !== "sending" && (
        <div className="sticky bottom-4 mt-4">
          <div className="flex items-end gap-2 rounded-2xl border border-border/60 bg-background/85 p-2 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            {step === "message" ? (
              <div className="flex min-h-[38px] flex-1 items-end px-2 py-2">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    if (error) setError("");
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="type your message..."
                  rows={1}
                  className="max-h-32 w-full resize-none bg-transparent text-foreground outline-none placeholder:text-muted-foreground/50"
                  style={{
                    minHeight: "22px",
                    fontSize: "15px",
                    lineHeight: "22px",
                    letterSpacing: "0.1px",
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
                  }}
                />
              </div>
            ) : (
              <div className="flex h-[38px] flex-1 items-center px-2">
                {step === "email" && (
                  <Mail className="mr-2 h-4 w-4 shrink-0 text-muted-foreground/40" />
                )}
                <input
                  ref={inputRef}
                  type={step === "email" ? "email" : "text"}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    if (error) setError("");
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    step === "name" ? "your name..." : "email or type skip..."
                  }
                  className="w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground/50"
                  style={{
                    fontSize: "15px",
                    lineHeight: "22px",
                    letterSpacing: "0.1px",
                  }}
                  autoComplete="off"
                />
              </div>
            )}

            <button
              onClick={validateAndProceed}
              disabled={!inputValue.trim() && step !== "email"}
              className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 active:scale-95 disabled:opacity-30 disabled:hover:bg-primary"
              aria-label="send"
            >
              <Send className="h-[15px] w-[15px]" />
            </button>
          </div>

          <div
            className="overflow-hidden transition-all duration-200 ease-out"
            style={{
              maxHeight: error ? "36px" : "0px",
              opacity: error ? 1 : 0,
            }}
          >
            <p
              className="mt-2 pl-3 text-red-400/90"
              style={{ fontSize: "12px", lineHeight: "16px", letterSpacing: "0.1px" }}
            >
              * {error}
            </p>
          </div>
        </div>
      )}

      {step === "sending" && (
        <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span
            className="font-mono uppercase tracking-[0.12em]"
            style={{ fontSize: "11px" }}
          >
            sending your message...
          </span>
        </div>
      )}

      <style jsx>{`
        @keyframes chatReveal {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}