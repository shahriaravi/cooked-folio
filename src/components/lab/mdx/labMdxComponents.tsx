import type { MDXComponents } from "mdx/types";
import { mdxComponents as blogComponents } from "@/components/writing/MdxComponents";
import { CodeFile } from "./CodeFile";
import { Callout } from "./Callout";
import { PropsTable, PropRow } from "./PropsTable";

export const labMdxComponents: MDXComponents = {
  ...blogComponents,
  CodeFile,
  Callout,
  PropsTable,
  PropRow,
};