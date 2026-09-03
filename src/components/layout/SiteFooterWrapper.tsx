"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "./SiteFooter";

const HIDDEN_ROUTES = ["/donate"];

export function SiteFooterWrapper() {
  const pathname = usePathname();

  if (HIDDEN_ROUTES.includes(pathname)) {
    return null;
  }

  return <SiteFooter />;
}