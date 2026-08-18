"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useFood } from "@/context/FoodContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Gourmet Menu" },
  { href: "/about", label: "Chef & Story" },
  { href: "/edge", label: "The Experience" },
  { href: "/contact", label: "Reservations" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount, setIsCartOpen, setIsReservationOpen } = useFood();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── TOP ANNOUNCEMENT TICKER ── */}
      <div className="bg-[#0b0c0f] text-[#d4af37] text-[10px] sm:text-xs font-mono py-1.5 px-4 text-center border-b border-white/5 flex items-center justify-center gap-3">
        <span className="inline-block w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
        <span>Michelin Guide 2026 Recommended · Savor Our Autumn Truffle Tasting Flight</span>
        <span className="hidden md:inline text-white/40">|</span>
        <button
          onClick={() => setIsReservationOpen(true)}
          className="hidden md:inline underline hover:text-white transition-colors"
        >
          Book Chef&apos;s Table ↗
        </button>
      </div>

      {/* ── MAIN HEADER ── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0d0f14]/90 backdrop-blur-md border-b border-white/10 shadow-xl py-3"
            : "bg-[#0d0f14]/60 backdrop-blur-sm border-b border-white/5 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* ── BRAND LOGO ── */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37] via-[#c59e2b] to-[#8c6514] flex items-center justify-center text-black font-serif font-black text-xl shadow-lg shadow-[#d4af37]/20 group-hover:rotate-6 transition-transform">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-black text-xl tracking-[0.18em] text-white leading-none">
                SAVORÉ<span className="text-[#d4af37]">.</span>
              </span>
              <span className="text-[9px] font-mono text-[#d4af37]/80 tracking-[0.3em] uppercase mt-0.5">
                Artisan Gastronomy
              </span>
            </div>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-mono tracking-[0.14em] uppercase transition-colors relative py-1 ${
                    active
                      ? "text-[#d4af37] font-semibold"
                      : "text-[#a0a4b4] hover:text-white"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#d4af37] rounded-full animate-fade-in" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── ACTIONS (CART + RESERVE) ── */}
          <div className="flex items-center gap-3">
            {/* Bag / Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#d4af37]/50 text-white hover:text-[#d4af37] transition-all flex items-center gap-2 group"
              aria-label="View Order Bag"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="hidden sm:inline text-xs font-mono uppercase tracking-wider text-white group-hover:text-[#d4af37]">
                Bag
              </span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#d4af37] text-black font-mono font-bold text-[10px] flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Table Booking Button */}
            <button
              onClick={() => setIsReservationOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5a93b] to-[#e85d34] text-black font-bold text-xs font-mono uppercase tracking-wider hover:opacity-95 shadow-md shadow-[#d4af37]/20 transition-all hover:scale-[1.02]"
            >
              <span>Book Table</span>
              <span>✦</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* ── MOBILE DRAWER ── */}
        {open && (
          <div className="lg:hidden bg-[#0e1016] border-b border-white/10 px-6 py-6 space-y-4 animate-slide-down">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-sm font-mono tracking-wider uppercase py-2 transition-colors ${
                      active ? "text-[#d4af37] font-bold" : "text-[#a0a4b4] hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/10 grid grid-cols-1 gap-2.5">
              <button
                onClick={() => {
                  setOpen(false);
                  setIsReservationOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#e85d34] text-black font-bold text-xs font-mono uppercase tracking-wider shadow-lg shadow-[#d4af37]/20 text-center"
              >
                Book A Table ✦
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs uppercase text-center"
              >
                View Culinary Bag ({cartCount})
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
