"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#090a0d] text-[#f5f0e8] border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#d4af37]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37] via-[#c59e2b] to-[#8c6514] flex items-center justify-center text-black font-serif font-black text-xl shadow-lg shadow-[#d4af37]/20">
                S
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-black text-2xl tracking-[0.18em] text-white">
                  SAVORÉ<span className="text-[#d4af37]">.</span>
                </span>
                <span className="text-[9px] font-mono text-[#d4af37] tracking-[0.3em] uppercase">
                  Artisan Gastronomy & Wine Cellar
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#9aa0b0] leading-relaxed max-w-sm">
              A celebration of woodfire culinary heritage, wild foraging, and artisanal gastronomy. Winner of Best Luxury Dining Experience & Michelin Guide Recommended 2026.
            </p>

            <div className="flex items-center gap-3 text-xs font-mono text-[#d4af37]">
              <span className="px-2.5 py-1 rounded bg-[#d4af37]/10 border border-[#d4af37]/30">★ Michelin 2026</span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/80">✦ Relais & Châteaux</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wider uppercase">Culinary Journeys</h4>
            <ul className="space-y-2 text-xs font-mono text-[#8f94a4]">
              <li><Link href="/projects" className="hover:text-[#d4af37] transition-colors">A La Carte Menu</Link></li>
              <li><Link href="/projects" className="hover:text-[#d4af37] transition-colors">Chef&apos;s Tasting Flight</Link></li>
              <li><Link href="/edge" className="hover:text-[#d4af37] transition-colors">Private Wine Cellar</Link></li>
              <li><Link href="/edge" className="hover:text-[#d4af37] transition-colors">Chef&apos;s Table Experience</Link></li>
              <li><Link href="/about" className="hover:text-[#d4af37] transition-colors">Farm-To-Table Partners</Link></li>
            </ul>
          </div>

          {/* Hours & Service */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wider uppercase">Hours of Service</h4>
            <div className="space-y-2 text-xs font-mono text-[#8f94a4]">
              <div>
                <span className="text-white block font-medium">Lunch Service</span>
                <span>Tue – Sun: 12:00 PM – 3:30 PM</span>
              </div>
              <div>
                <span className="text-white block font-medium">Dinner Gastronomy</span>
                <span>Tue – Sun: 6:30 PM – 11:30 PM</span>
              </div>
              <div className="text-[#d4af37]">
                <span>Monday: Closed for Mise-en-Place</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wider uppercase">The Epicure Club</h4>
            <p className="text-xs text-[#9aa0b0] leading-relaxed">
              Receive secret invitations to seasonal truffle harvests & winemaker dinners.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                ✓ Welcome to the Epicure Club! Check your inbox.
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37]"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-[#d4af37] hover:bg-[#e5a93b] text-black font-bold text-xs font-mono uppercase tracking-wider transition-colors shadow-md shadow-[#d4af37]/15"
                >
                  Join Exclusive Circle
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#747888] gap-4">
          <div>
            © {new Date().getFullYear()} SAVORÉ ARTISAN GASTRONOMY. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span>Valet Parking Available</span>
            <span>✦</span>
            <span>Reservations Required for Chef&apos;s Table</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
