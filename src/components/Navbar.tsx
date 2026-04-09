"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hasDarkHero, setHasDarkHero] = useState(false);

  useEffect(() => {
    // Detect if the page has a dark (animated) hero — only homepage.
    // This is a one-time DOM check on mount, not a subscription.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasDarkHero(!!document.querySelector('section.bg-navy'));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-border"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-icon.png"
              alt="Spiffy Tec"
              width={56}
              height={56}
              className="h-12 w-12 rounded-lg"
              priority
            />
            <span className={cn(
              "text-3xl font-bold tracking-tight ml-3 transition-colors duration-300",
              !scrolled && hasDarkHero ? "text-white" : "text-navy"
            )}>
              Spiffy Tec<span className="text-amber">.</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-300 relative",
                  "after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-amber after:transition-all after:duration-300 hover:after:w-full",
                  !scrolled && hasDarkHero ? "text-white/80 hover:text-white" : "text-navy hover:text-navy-light"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="bg-amber text-navy-dark rounded-full px-6 py-2.5 text-sm font-semibold inline-block transition-colors hover:bg-amber-dark"
            >
              Book a Strategy Call
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X
                className={cn(
                  "w-6 h-6 transition-colors",
                  "text-navy"
                )}
              />
            ) : (
              <Menu
                className={cn(
                  "w-6 h-6 transition-colors",
                  "text-navy"
                )}
              />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 bg-white border-b border-border",
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-navy font-medium rounded-lg hover:bg-surface-muted transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block text-center bg-amber text-navy-dark rounded-full px-6 py-3 font-semibold hover:bg-amber-dark transition-colors"
            >
              Book a Strategy Call
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
