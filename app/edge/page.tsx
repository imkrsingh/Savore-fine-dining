"use client";

import SafeImage from "@/components/SafeImage";
import { useFood } from "@/context/FoodContext";

export default function ExperiencePage() {
  const { setIsReservationOpen } = useFood();

  const experiences = [
    {
      title: "The Chef's Open Hearth Counter",
      subtitle: "Front-Row Culinary Theatre",
      capacity: "Limited to 10 Seats",
      desc: "Sit directly adjacent to the open Binchotan hearth. Witness each course crafted, smoked, and plated inches away with direct dialogue with Executive Chef.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=85",
      badge: "Most Exclusive",
      features: ["7-Course Degustation", "Direct interaction with Chef", "Personalized menu keepsake"],
    },
    {
      title: "The Sommelier Wine Chamber",
      subtitle: "Subterranean Cellar Tasting",
      capacity: "Up to 14 Guests",
      desc: "An ambient, temperature-controlled cellar housing 850+ grand cru bottles. Private sommelier guides you through rare verticals paired with artisan charcuterie and cheeses.",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=85",
      badge: "Wine Aficionado",
      features: ["Curated vintage verticals", "Artisan cheese pairing", "Private sommelier service"],
    },
    {
      title: "The Botanical Garden Terrace",
      subtitle: "Open-Air Starlit Dining",
      capacity: "Up to 40 Guests",
      desc: "Surrounded by aromatic herb walls, olive trees, and soft fire pits. Perfect for relaxed evenings, aperitivo flights, and celebratory toasts under the stars.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85",
      badge: "Atmospheric",
      features: ["Fire pit lounge", "Aperitivo cocktail cart", "Botanical soundscapes"],
    },
    {
      title: "Private Grand Gala & Celebrations",
      subtitle: "Full Venue Buyout & Catering",
      capacity: "Up to 120 Guests",
      desc: "For extraordinary milestones, corporate galas, and bespoke weddings. Our culinary team designs custom tasting flights, floral arrangements, and live acoustic ensembles.",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=85",
      badge: "Bespoke Events",
      features: ["Custom bespoke menu", "Dedicated event planner", "Full bar & sommelier team"],
    },
  ];

  return (
    <div className="w-full bg-[#0b0c10] text-[#f5f0e8] overflow-hidden">
      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="inline-block text-xs font-mono text-[#d4af37] uppercase tracking-[0.3em] border border-[#d4af37]/30 px-3.5 py-1 rounded-full bg-white/5">
            Atmosphere & Gastronomic Spaces
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white">
            The SAVORÉ Experience
          </h1>
          <p className="text-sm sm:text-base text-[#9ea3b3] max-w-2xl mx-auto leading-relaxed">
            Dining is more than food; it is an immersive atmosphere sculpted by lighting, aroma, sound, and hospitality.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setIsReservationOpen(true)}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5a93b] to-[#e85d34] text-black font-bold text-xs font-mono uppercase tracking-wider shadow-lg shadow-[#d4af37]/20 hover:scale-105 transition-all"
            >
              Book an Experience ✦
            </button>
          </div>
        </div>
      </section>

      {/* ── 2. THE FOUR SPACES ──────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        {experiences.map((exp, idx) => (
          <div
            key={exp.title}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
              idx % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div
              className={`lg:col-span-6 relative h-[380px] sm:h-[450px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group ${
                idx % 2 === 1 ? "lg:order-2" : "lg:order-1"
              }`}
            >
              <SafeImage
                src={exp.image}
                alt={exp.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#d4af37] text-black text-[10px] font-mono font-bold uppercase z-10">
                {exp.badge}
              </div>
              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm text-white/90 text-[11px] font-mono z-10">
                👥 {exp.capacity}
              </div>
            </div>

            {/* Content */}
            <div className={`lg:col-span-6 space-y-5 ${idx % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
              <div>
                <span className="text-xs font-mono text-[#d4af37] uppercase tracking-[0.25em]">
                  {exp.subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white mt-1">
                  {exp.title}
                </h3>
              </div>

              <p className="text-sm text-[#9da2b2] leading-relaxed">
                {exp.desc}
              </p>

              <div className="space-y-2 pt-2">
                {exp.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-xs font-mono text-white/90">
                    <span className="text-[#d4af37]">✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <button
                  onClick={() => setIsReservationOpen(true)}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-[#d4af37] hover:text-black border border-white/15 text-xs font-mono uppercase tracking-wider text-white transition-all"
                >
                  Reserve This Space ↗
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── 3. SOMMELIER MASTERCLASS CALLOUT ────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#12141c] border-t border-white/10">
        <div className="max-w-5xl mx-auto p-8 sm:p-12 rounded-3xl bg-black/60 border border-[#d4af37]/30 text-center space-y-6">
          <span className="text-xs font-mono text-[#d4af37] uppercase tracking-[0.25em]">
            Weekend Masterclasses
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            The Sommelier & Truffle Masterclass
          </h3>
          <p className="text-xs sm:text-sm text-[#9aa0b0] max-w-xl mx-auto leading-relaxed">
            Every Saturday afternoon, our Head Sommelier and Sous Chef lead an intimate 90-minute workshop exploring wine pairing mechanics, blind vintage tasting, and fresh truffle shaved creations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setIsReservationOpen(true)}
              className="px-8 py-3.5 rounded-xl bg-[#d4af37] hover:bg-[#e5a93b] text-black font-mono font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#d4af37]/20 transition-all"
            >
              Inquire for Masterclass Pass ✦
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
