"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";

const HIDDEN_ROUTES = ["/donate", "/donate/thanks"];

export function NavbarWrapper() {
  const pathname = usePathname();

  if (HIDDEN_ROUTES.includes(pathname)) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-[44rem] px-6 pt-10 md:pt-16">
      <Navbar />
    </div>
  );
}