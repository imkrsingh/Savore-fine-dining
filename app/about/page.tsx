"use client";

import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { useFood } from "@/context/FoodContext";

export default function AboutPage() {
  const { setIsReservationOpen } = useFood();

  const farmPartners = [
    {
      name: "Truffières d'Ombrie",
      location: "Umbria, Italy",
      item: "Wild Périgord & White Truffles",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
      desc: "Harvested at dawn by fourth-generation truffle hounds and flown in weekly.",
    },
    {
      name: "Ozaki Miyazaki Cattle Ranch",
      location: "Miyazaki, Japan",
      item: "A5 Black Wagyu Beef",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
      desc: "Raised on mountain spring water and whole-grain mash for supreme marbling.",
    },
    {
      name: "Pugliese Caseificio Artigianale",
      location: "Puglia, Italy",
      item: "Heirloom Fior di Latte & Burrata",
      image: "https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=600&q=80",
      desc: "Crafted by hand daily using morning milk from heritage Podolica cows.",
    },
    {
      name: "Château de Haute-Vigne",
      location: "Bordeaux, France",
      item: "Biodynamic Grand Cru Vintages",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80",
      desc: "Single-vineyard organic natural wines harvested according to lunar cycles.",
    },
  ];

  return (
    <div className="w-full bg-[#0b0c10] text-[#f5f0e8] overflow-hidden">
      {/* ── 1. HERO STORY ───────────────────────────────────────────── */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="inline-block text-xs font-mono text-[#d4af37] uppercase tracking-[0.3em] border border-[#d4af37]/30 px-3.5 py-1 rounded-full bg-white/5">
            The Story of SAVORÉ
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-tight text-white">
            Honoring Ancient Fire, Elevating Modern Palates.
          </h1>
          <p className="text-sm sm:text-base text-[#a0a5b5] max-w-2xl mx-auto leading-relaxed">
            Founded in 2018 by Executive Chef Matteo Sterling, SAVORÉ was conceived as a sanctuary for those who appreciate the poetry of genuine artisan craft.
          </p>
        </div>
      </section>

      {/* ── 2. EXECUTIVE CHEF FEATURE ───────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Chef Portrait */}
          <div className="lg:col-span-5 relative h-[500px] rounded-3xl overflow-hidden border border-[#d4af37]/40 shadow-2xl shadow-[#d4af37]/10">
            <SafeImage
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=90"
              alt="Executive Chef Matteo Sterling"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 z-10">
              <h3 className="font-serif text-xl font-bold text-white">Matteo Sterling</h3>
              <p className="text-xs font-mono text-[#d4af37]">Executive Chef & Founder · 2 Michelin Stars</p>
            </div>
          </div>

          {/* Chef Bio */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono text-[#d4af37] uppercase tracking-[0.25em]">
              A Decade in Pursuit of Flavor
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              &ldquo;Cooking is not chemistry; it is memory, terroir, and respect.&rdquo;
            </h2>
            <p className="text-sm text-[#9fa3b4] leading-relaxed">
              Trained under masters in Lyon, Modena, and Kyoto, Chef Matteo discovered that the pinnacle of dining is not found in excessive molecular techniques, but in the purity of rare ingredients treated with mastery over open embers.
            </p>
            <p className="text-sm text-[#9fa3b4] leading-relaxed">
              At SAVORÉ, every sauce begins with 48-hour simmered stocks, every pasta is hand-kneaded with golden alpine egg yolks every morning at 6 AM, and every cut of wagyu is sliced only upon guest order.
            </p>

            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-white/10 font-mono text-center">
              <div className="p-3 bg-white/5 rounded-xl">
                <span className="text-xl font-bold text-[#d4af37] block">16+</span>
                <span className="text-[10px] text-[#8e93a4]">Years in Gastronomy</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <span className="text-xl font-bold text-white block">2 Stars</span>
                <span className="text-[10px] text-[#8e93a4]">Michelin Legacy</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <span className="text-xl font-bold text-[#d4af37] block">100%</span>
                <span className="text-[10px] text-[#8e93a4]">Scratch Prepared</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. OUR FOUR PILLARS ─────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#10121a] border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-mono text-[#d4af37] uppercase tracking-[0.25em]">
              The Guiding Virtues
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              The Four Pillars of SAVORÉ
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🔥",
                title: "Live Binchotan Charcoal",
                desc: "We use exclusively Kishu white oak charcoal that burns smokeless and radiant at 1,000°C for intense caramelization.",
              },
              {
                icon: "🌾",
                title: "40-Yolk Pasta Craft",
                desc: "Our pasta dough contains 40 rich egg yolks per kilogram of stone-milled Italian semolina for velvety bite and golden color.",
              },
              {
                icon: "🌿",
                title: "Wild Foraging Network",
                desc: "Wild chanterelles, elderflower, and alpine thyme hand-foraged weekly by our certified botanist purveyors.",
              },
              {
                icon: "🍷",
                title: "Living Wine Cellar",
                desc: "Curated by Grand Master Sommelier featuring rare biodynamic vintages, orange wines, and single-cask whiskeys.",
              },
            ].map((p) => (
              <div key={p.title} className="p-6 rounded-2xl bg-[#141722] border border-white/10 space-y-3 glow-card">
                <span className="text-3xl">{p.icon}</span>
                <h4 className="font-serif text-lg font-bold text-white">{p.title}</h4>
                <p className="text-xs text-[#9aa0b0] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PURVEYORS & ORGANIC PARTNERS ─────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-mono text-[#d4af37] uppercase tracking-[0.25em]">
            Terroir & Traceability
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Our Farm & Vineyard Partners
          </h2>
          <p className="text-xs sm:text-sm text-[#8f94a6]">
            We know the name of every farmer, fisher, and winemaker whose produce enters our kitchen doors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {farmPartners.map((f) => (
            <div key={f.name} className="group rounded-2xl overflow-hidden bg-[#12141c] border border-white/10 flex flex-col">
              <div className="relative h-44 w-full">
                <SafeImage
                  src={f.image}
                  alt={f.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] font-mono text-[#d4af37] z-10">
                  📍 {f.location}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <span className="text-[10px] font-mono text-[#d4af37] block">{f.item}</span>
                  <h4 className="font-serif text-base font-bold text-white group-hover:text-[#d4af37] transition-colors">{f.name}</h4>
                  <p className="text-xs text-[#8f94a4] leading-relaxed mt-1">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={() => setIsReservationOpen(true)}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5a93b] to-[#e85d34] text-black font-bold text-xs font-mono uppercase tracking-wider shadow-lg shadow-[#d4af37]/20 hover:scale-105 transition-all"
          >
            Experience Our Culinary Story ✦
          </button>
        </div>
      </section>
    </div>
  );
}
