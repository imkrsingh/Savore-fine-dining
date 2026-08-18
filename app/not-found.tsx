"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-[#0b0c10] text-[#f5f0e8]">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-[#d4af37]/30 text-[10px] font-mono tracking-[0.25em] text-[#d4af37] uppercase mb-4">
        ✦ Error 404 ✦
      </div>
      <h1 className="font-serif text-5xl sm:text-7xl text-white mb-4">
        Dish <span className="italic text-[#d4af37]">Not Found</span>
      </h1>
      <p className="text-sm text-[#9da2b2] max-w-md mb-8 leading-relaxed">
        The culinary creation or cellar reserve you are looking for has been retired from the seasonal tasting roster.
      </p>
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-[#d4af37] hover:bg-[#e5a93b] text-black font-mono font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-[#d4af37]/20"
        >
          Return to Sanctuary
        </Link>
        <Link
          href="/menu"
          className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-wider transition-colors"
        >
          View Tasting Menu
        </Link>
      </div>
    </div>
  );
}
