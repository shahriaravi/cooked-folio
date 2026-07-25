import { Copy } from "lucide-react";
import { codeToHtml } from "shiki";
import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  maxHeight?: number;
}

export async function CodeBlock({
  code,
  language = "tsx",
  filename,
  maxHeight = 400,
}: CodeBlockProps) {
  let html = "";
  try {
    html = await codeToHtml(code, {
      lang: language,
      theme: "github-dark-dimmed",
    });
  } catch {
    html = `<pre><code>${code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")}</code></pre>`;
  }

  return (
    <div className="min-w-0">
      {filename && (
        <div
          className="flex items-center gap-2 rounded-t-xl border border-b-0 border-border/60 bg-secondary/30 px-3 py-2"
          style={{ fontSize: "11px", lineHeight: "1" }}
        >
          <span className="font-mono uppercase tracking-[0.1em] text-muted-foreground/60">
            {language}
          </span>
          <span className="font-mono text-muted-foreground">{filename}</span>
        </div>
      )}

      <div className="relative min-w-0">
        <CopyButton text={code} />
        <div
          className={`shiki-wrapper overflow-auto border border-border/60 ${
            filename ? "rounded-b-xl" : "rounded-xl"
          }`}
          style={{ maxWidth: "100%", maxHeight: `${maxHeight}px` }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}