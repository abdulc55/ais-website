"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/siteConfig";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const initial = (siteConfig.business.name || "•").trim().charAt(0);

  return (
    <nav className="sticky top-0 z-50 bg-surface border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-md bg-accent-soft text-accent flex items-center justify-center font-display text-lg">
              {initial}
            </div>
            <span className="font-display text-lg text-primary tracking-tight">
              {siteConfig.business.name}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {siteConfig.navigation.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-secondary hover:text-primary px-3 py-2 transition"
              >
                {link.label}
              </Link>
            ))}
            <div className="w-px h-6 bg-border-subtle mx-2" />
            <Link
              href={siteConfig.navigation.ctaHref}
              className="bg-accent hover:bg-accent-dark text-white text-sm font-semibold px-5 py-2 rounded-md transition"
            >
              {siteConfig.navigation.ctaLabel}
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="md:hidden p-2 text-primary"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border-subtle bg-surface px-4 py-4 space-y-1">
          {siteConfig.navigation.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-base text-primary py-3 px-3 rounded-md hover:bg-muted transition"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={siteConfig.navigation.ctaHref}
            onClick={() => setOpen(false)}
            className="block bg-accent hover:bg-accent-dark text-white text-base font-semibold px-5 py-3 rounded-md text-center mt-2 transition"
          >
            {siteConfig.navigation.ctaLabel}
          </Link>
        </div>
      )}
    </nav>
  );
}
