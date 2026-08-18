"use client";

import { useState } from "react";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import FoodItemCard from "@/components/FoodItemCard";
import { MENU_ITEMS, MenuItem, useFood } from "@/context/FoodContext";

export default function HomePage() {
  const { setIsReservationOpen, setIsCartOpen } = useFood();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Masterpieces", icon: "✨" },
    { id: "starters", label: "Antipasti & Starters", icon: "🥗" },
    { id: "woodfire", label: "Woodfire & Wagyu", icon: "🔥" },
    { id: "pasta", label: "Handmade Pastas", icon: "🍝" },
    { id: "mains", label: "Signature Mains", icon: "🥩" },
    { id: "desserts", label: "Decadent Pastry", icon: "🍫" },
    { id: "drinks", label: "Artisan Mixology", icon: "🍸" },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  const chefHighlights = MENU_ITEMS.filter((item) => item.chefSpecial).slice(0, 3);

  return (
    <div className="w-full bg-[#0b0c10] text-[#f5f0e8] overflow-hidden">
      {/* ── 1. HERO SECTION ─────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
        {/* Background Image with Deep Overlay */}
        <div className="absolute inset-0 z-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2200&q=90"
            alt="Artisan culinary steak dish with garnish"
            fill
            priority
            className="object-cover object-center scale-105 animate-hero-zoom opacity-40 brightness-75"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/60 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c10]/90 via-transparent to-[#0b0c10]/80 pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 pt-8">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-[#d4af37]/40 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
            <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#d4af37] uppercase">
              Michelin Guide Recommended 2026
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.05] tracking-tight text-white">
            A Symphony of <span className="italic font-light text-[#f8e7b9]">Fire, Earth</span> & Pure Artistry.
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#a9aebf] font-sans leading-relaxed">
            Where 35-day dry-aged Miyazaki Wagyu meets 40-yolk handmade truffle pasta and wild botanicals, crafted over live Japanese Binchotan coals.
          </p>

          {/* Quick CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setIsReservationOpen(true)}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5a93b] to-[#e85d34] text-black font-bold text-xs font-mono uppercase tracking-[0.18em] hover:brightness-110 shadow-xl shadow-[#d4af37]/20 transition-all hover:scale-105 flex items-center gap-2"
            >
              <span>Reserve Chef&apos;s Table</span>
              <span>✦</span>
            </button>

            <Link
              href="/projects"
              className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 text-white font-mono text-xs uppercase tracking-[0.18em] backdrop-blur-md transition-all hover:border-[#d4af37]/50"
            >
              Explore Grand Menu
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="px-6 py-4 rounded-xl bg-black/40 hover:bg-black/70 border border-[#d4af37]/30 text-[#d4af37] font-mono text-xs uppercase tracking-[0.15em] transition-all flex items-center gap-2"
            >
              <span>🛍️ Order Online</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left border-t border-white/10">
            <div className="p-3">
              <div className="text-xl font-serif font-bold text-white">4.9 ★</div>
              <div className="text-[11px] font-mono text-[#8e93a4]">3,400+ Epicurean Reviews</div>
            </div>
            <div className="p-3">
              <div className="text-xl font-serif font-bold text-[#d4af37]">100%</div>
              <div className="text-[11px] font-mono text-[#8e93a4]">Organic & Foraged Sourcing</div>
            </div>
            <div className="p-3">
              <div className="text-xl font-serif font-bold text-white">850+</div>
              <div className="text-[11px] font-mono text-[#8e93a4]">Sommelier Cellar Vintages</div>
            </div>
            <div className="p-3">
              <div className="text-xl font-serif font-bold text-[#d4af37]">Binchotan</div>
              <div className="text-[11px] font-mono text-[#8e93a4]">Japanese White Oak Charcoal</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. TICKER RIBBON ────────────────────────────────────────── */}
      <div className="border-y border-white/10 bg-[#0e1016] py-3.5 ticker-wrap overflow-hidden">
        <div className="ticker-inner text-xs font-mono tracking-[0.2em] text-[#d4af37] uppercase select-none">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center gap-6 mr-6">
              <span>✦ &nbsp; MICHELIN GUIDE RECOMMENDED</span>
              <span>✦ &nbsp; A5 MIYAZAKI WAGYU</span>
              <span>✦ &nbsp; FRESH PÉRIGORD BLACK TRUFFLE</span>
              <span>✦ &nbsp; 72-HOUR FERMENTED SOURDOUGH</span>
              <span>✦ &nbsp; CELLAR RESERVE PAIRINGS</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── 3. CHEF'S STAR SPECIALS (HERO TRIO) ────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono text-[#d4af37] uppercase tracking-[0.25em] block mb-2">
              Culinary Accolades · Autumn Flight
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Chef&apos;s Signature Masterpieces
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#d4af37] hover:text-white transition-colors border-b border-[#d4af37]/40 pb-1"
          >
            <span>View All 30+ Creations</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {chefHighlights.map((item) => (
            <FoodItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* ── 4. INTERACTIVE MASTER MENU SHOWCASE ─────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0e1016] border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-mono text-[#d4af37] uppercase tracking-[0.25em]">
              The Kitchen Roster
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Explore Our Gastronomic Menu
            </h2>
            <p className="text-sm text-[#9aa0b0]">
              Every dish is individually prepared to order using pristine heirloom produce and ancient fire craft.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? "bg-[#d4af37] text-black font-bold shadow-lg shadow-[#d4af37]/20 scale-105"
                    : "bg-white/5 text-[#9fa3b4] hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <FoodItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. THE PHILOSOPHY (SPLIT SCREEN STORY) ─────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Media Collage */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-white/10">
              <SafeImage
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=85"
                alt="Executive Chef plating gourmet food"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-white/10 translate-y-6">
              <SafeImage
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=85"
                alt="Woodfire oven culinary interior"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right Narrative */}
          <div className="space-y-6">
            <span className="text-xs font-mono text-[#d4af37] uppercase tracking-[0.25em]">
              The Kitchen Philosophy · Farm to Fork
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Rooted in Ancestral Fire, Elevating Modern Gastronomy.
            </h2>
            <p className="text-sm text-[#a0a5b5] leading-relaxed">
              At SAVORÉ, we do not simply cook; we conduct an alchemy of temperature, patience, and unadulterated terroir. We source wild herbs from private alpine foragers, aged beef from grass-pastured cattle, and olive oils pressed within 48 hours of harvest.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] text-xs shrink-0 mt-0.5">
                  ✦
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-white">Live Binchotan Woodfire Coals</h4>
                  <p className="text-xs text-[#8f94a4]">Reaches 1,000°C smokeless searing to lock in natural umami without char bitterness.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] text-xs shrink-0 mt-0.5">
                  ✦
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-white">Zero-Waste Culinary Closed Loop</h4>
                  <p className="text-xs text-[#8f94a4]">Every vegetable trim, bone, and herb stem is transformed into 48-hour glazes and infused oils.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono uppercase tracking-wider text-white transition-all"
              >
                <span>Read Full Chef&apos;s Chronicle</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. DEGUSTATION TASTING FLIGHT SHOWCASE ───────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0b0c10] via-[#12141c] to-[#0b0c10] border-t border-white/10">
        <div className="max-w-5xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#141720] border border-[#d4af37]/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4af37]/5 blur-3xl pointer-events-none" />

          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-mono text-[#d4af37] uppercase tracking-[0.25em]">
              Limited to 24 Guests Nightly
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              The 7-Course Chef&apos;s Degustation Flight
            </h3>
            <p className="text-xs sm:text-sm text-[#9aa0b0] max-w-xl mx-auto">
              An immersive 2.5-hour dining narrative curated by Executive Chef Matteo Sterling with grand cru sommelier wine pairings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            {[
              { course: "I. Amuse-Bouche", title: "Crispy Sunchoke Tartlet & Osetra Caviar", wine: "Dom Pérignon 2013" },
              { course: "II. Crudo", title: "Wild Hokkaido Scallop with Yuzu Kosho", wine: "Chablis Premier Cru 2020" },
              { course: "III. Earth", title: "Smoked Golden Beetroot & Truffled Ricotta", wine: "Sancerre Blanc 2021" },
              { course: "IV. Pasta", title: "Handmade Tagliolini with Périgord Truffles", wine: "Barolo DOCG 2018" },
              { course: "V. Hearth", title: "Miyazaki A5 Wagyu Ribeye & Bone Marrow Jus", wine: "Château Margaux 2015" },
              { course: "VI. Pre-Dessert", title: "Blood Orange & Campari Granita", wine: "Palate Refresher" },
              { course: "VII. Grand Finale", title: "Valrhona 70% Chocolate Sphere & Gold Leaf", wine: "Taylor Fladgate 20-Year" },
            ].map((c) => (
              <div key={c.course} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center gap-2">
                <div>
                  <span className="text-[#d4af37] block font-bold text-[11px]">{c.course}</span>
                  <span className="text-white text-xs">{c.title}</span>
                </div>
                <span className="text-[10px] text-[#8e93a4] text-right shrink-0">🍷 {c.wine}</span>
              </div>
            ))}

            <div className="p-4 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/40 flex flex-col justify-center items-center text-center">
              <span className="text-xs font-mono text-[#d4af37] uppercase">Degustation Ticket</span>
              <span className="font-serif text-2xl font-bold text-white mt-0.5">$185 / guest</span>
              <span className="text-[10px] text-[#9fa3b4] mt-1">+ $85 Optional Sommelier Pairing</span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsReservationOpen(true)}
              className="px-8 py-3.5 rounded-xl bg-[#d4af37] hover:bg-[#e5a93b] text-black font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-lg shadow-[#d4af37]/20"
            >
              Reserve Degustation Seats ✦
            </button>
          </div>
        </div>
      </section>

      {/* ── 7. TESTIMONIALS & CRITICS REVIEWS ───────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono text-[#d4af37] uppercase tracking-[0.25em]">
            Critique & Accolades
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            What The Food World Says
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "The Binchotan Wagyu and the 40-yolk truffle pasta are nothing short of transcendent. SAVORÉ has set a new benchmark for fine dining.",
              author: "The Michelin Dining Inspector",
              role: "Michelin Guide 2026",
              rating: "★★★★★",
            },
            {
              quote: "Atmosphere that whispers luxury. Every plate is balanced like poetry, and the wine cellar selection is among the most thoughtful in the country.",
              author: "Elena Rostova",
              role: "International Culinary Tribune",
              rating: "★★★★★",
            },
            {
              quote: "A culinary spectacle! Sitting at the Chef's counter with front-row views of the open hearth made our anniversary unforgettable.",
              author: "Julian & Clara Vance",
              role: "Verified Epicurean Guests",
              rating: "★★★★★",
            },
          ].map((rev) => (
            <div key={rev.author} className="p-6 rounded-2xl bg-[#13151c] border border-white/10 space-y-4 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-[#d4af37] mb-3">{rev.rating}</div>
                <p className="text-xs sm:text-sm text-[#b0b5c5] leading-relaxed italic font-serif">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="border-t border-white/10 pt-3 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-white block font-bold">{rev.author}</span>
                  <span className="text-[10px] text-[#8e93a4]">{rev.role}</span>
                </div>
                <span className="text-base text-[#d4af37]">✦</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. RESERVATION CALLOUT BANNER ───────────────────────────── */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#090a0d] border-t border-white/10 overflow-hidden text-center">
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="text-xs font-mono text-[#d4af37] uppercase tracking-[0.25em]">
            An Unrivaled Gastronomic Affair
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            Your Table Awaits.
          </h2>
          <p className="text-sm text-[#9da1b0] max-w-lg mx-auto">
            Join us for an evening of warm candlelight, exceptional vintage wines, and artisanal woodfire gastronomy.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setIsReservationOpen(true)}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5a93b] to-[#e85d34] text-black font-bold text-xs font-mono uppercase tracking-[0.2em] shadow-xl shadow-[#d4af37]/20 hover:scale-105 transition-all"
            >
              Book Table Online ✦
            </button>
            <a
              href="tel:+919876543210"
              className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 text-white font-mono text-xs uppercase tracking-wider transition-colors"
            >
              Concierge: +91 98765 43210
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
