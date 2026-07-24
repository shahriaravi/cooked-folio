import type { MDXComponents } from "mdx/types";
import Image from "next/image";

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="mt-12 mb-5 font-semibold text-foreground"
      style={{
        fontSize: "26px",
        lineHeight: "32px",
        letterSpacing: "-0.02em",
      }}
      {...props}
    />
  ),

  h2: (props) => (
    <h2
      className="mt-12 mb-4 font-semibold text-foreground"
      style={{
        fontSize: "22px",
        lineHeight: "28px",
        letterSpacing: "-0.01em",
      }}
      {...props}
    />
  ),

  h3: (props) => (
    <h3
      className="mt-8 mb-3 font-semibold text-foreground"
      style={{
        fontSize: "18px",
        lineHeight: "24px",
        letterSpacing: "-0.005em",
      }}
      {...props}
    />
  ),

  h4: (props) => (
    <h4
      className="mt-6 mb-2 font-semibold text-foreground"
      style={{
        fontSize: "16px",
        lineHeight: "22px",
      }}
      {...props}
    />
  ),

  p: (props) => (
    <p
      className="mb-5 text-foreground/85"
      style={{
        fontSize: "16px",
        lineHeight: "27px",
        letterSpacing: "0.1px",
      }}
      {...props}
    />
  ),

  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith("http");
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="font-medium text-foreground underline underline-offset-[3px] decoration-muted-foreground/40 transition-colors hover:text-primary hover:decoration-primary"
        {...props}
      >
        {children}
      </a>
    );
  },

  strong: (props) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),

  em: (props) => <em className="italic text-foreground/90" {...props} />,

  ul: (props) => (
    <ul
      className="mb-6 ml-1 flex flex-col gap-2 text-foreground/85 marker:text-muted-foreground/60"
      style={{ fontSize: "16px", lineHeight: "26px", letterSpacing: "0.1px" }}
      {...props}
    />
  ),

  ol: (props) => (
    <ol
      className="mb-6 ml-1 flex list-decimal flex-col gap-2 pl-5 text-foreground/85 marker:font-mono marker:text-[13px] marker:text-muted-foreground/70"
      style={{ fontSize: "16px", lineHeight: "26px", letterSpacing: "0.1px" }}
      {...props}
    />
  ),

  li: ({ children, ...props }) => (
    <li className="pl-2 [&>ul]:mt-2 [&>ol]:mt-2" {...props}>
      <span className="mr-2 inline-block text-muted-foreground/60">–</span>
      {children}
    </li>
  ),

  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-2 border-primary/40 pl-5 italic text-foreground/70"
      style={{ fontSize: "16px", lineHeight: "26px", letterSpacing: "0.1px" }}
      {...props}
    />
  ),

  code: (props) => (
    <code
      className="rounded-md border border-border/50 bg-secondary/60 px-[6px] py-[2px] font-mono text-[13.5px] text-foreground before:content-none after:content-none"
      {...props}
    />
  ),

  pre: (props) => (
    <pre
      className="mb-6 overflow-x-auto rounded-xl border border-border/60 bg-secondary/40 p-4 font-mono text-[13.5px] leading-[22px] text-foreground"
      {...props}
    />
  ),

  hr: () => (
    <hr className="my-10 border-0 border-t border-border/40" />
  ),

  img: ({ src, alt, ...props }) => {
    if (!src) return null;
    const isExternal = typeof src === "string" && src.startsWith("http");
    return (
      <span className="my-8 block overflow-hidden rounded-xl border border-border/50 bg-secondary/30">
        {isExternal ? (
          <Image
            src={src as string}
            alt={alt || ""}
            width={1200}
            height={630}
            className="h-auto w-full"
            unoptimized
            {...(props as any)}
          />
        ) : (
          <Image
            src={src as string}
            alt={alt || ""}
            width={1200}
            height={630}
            className="h-auto w-full"
            {...(props as any)}
          />
        )}
      </span>
    );
  },

  table: (props) => (
    <div className="mb-6 overflow-x-auto rounded-xl border border-border/60">
      <table
        className="w-full border-collapse text-left"
        style={{ fontSize: "14px", lineHeight: "22px" }}
        {...props}
      />
    </div>
  ),

  thead: (props) => (
    <thead className="border-b border-border/60 bg-secondary/40" {...props} />
  ),

  th: (props) => (
    <th
      className="px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground"
      {...props}
    />
  ),

  td: (props) => (
    <td
      className="border-t border-border/40 px-4 py-2.5 text-foreground/85"
      {...props}
    />
  ),
};