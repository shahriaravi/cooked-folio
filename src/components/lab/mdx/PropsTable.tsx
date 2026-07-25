import React from "react";

interface PropsTableProps {
  children: React.ReactNode;
}

interface PropRowProps {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
}

export function PropsTable({ children }: PropsTableProps) {
  return (
    <div className="mb-6 overflow-x-auto rounded-xl border border-border/60">
      <table
        className="w-full border-collapse text-left"
        style={{ fontSize: "13px" }}
      >
        <thead className="border-b border-border/60 bg-secondary/40">
          <tr>
            <th className="px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Prop
            </th>
            <th className="px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Type
            </th>
            <th className="px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Default
            </th>
            <th className="px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Description
            </th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function PropRow({
  name,
  type,
  defaultValue,
  description,
}: PropRowProps) {
  return (
    <tr className="border-t border-border/40">
      <td
        className="px-4 py-3 font-mono text-foreground"
        style={{ fontSize: "13px" }}
      >
        {name}
      </td>
      <td
        className="px-4 py-3 font-mono text-muted-foreground"
        style={{ fontSize: "12px" }}
      >
        {type}
      </td>
      <td
        className="px-4 py-3 font-mono text-muted-foreground/70"
        style={{ fontSize: "12px" }}
      >
        {defaultValue ?? "—"}
      </td>
      <td
        className="px-4 py-3 text-foreground/85"
        style={{ fontSize: "13px", lineHeight: "20px" }}
      >
        {description}
      </td>
    </tr>
  );
}