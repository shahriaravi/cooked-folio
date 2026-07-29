"use client";

import NewsletterPill from "../registry/NewsletterPill";

export default function NewsletterPillPreview() {
  const fakeSubscribe = async (email: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (email.toLowerCase().includes("already")) {
      throw new Error("You're already subscribed");
    }
  };

  return (
    <div className="flex min-h-[80px] w-full items-center justify-center">
      <NewsletterPill onSubscribe={fakeSubscribe} />
    </div>
  );
}