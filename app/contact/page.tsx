"use client";

import { useState } from "react";
import { useFood } from "@/context/FoodContext";

export default function ContactPage() {
  const { setIsReservationOpen } = useFood();
  const [inquirySent, setInquirySent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "Private Dining / Event",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        type: "Private Dining / Event",
        message: "",
      });
    }, 4000);
  };

  return (
    <div className="w-full bg-[#0b0c10] text-[#f5f0e8] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* ── 1. HEADER ───────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto text-center space-y-4 pt-4 pb-14">
        <span className="inline-block text-xs font-mono text-[#d4af37] uppercase tracking-[0.3em] border border-[#d4af37]/30 px-3.5 py-1 rounded-full bg-white/5">
          Concierge & Reservations
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white">
          Connect with SAVORÉ
        </h1>
        <p className="text-sm sm:text-base text-[#9fa4b4] max-w-2xl mx-auto leading-relaxed">
          Book a table online instantly, inquire about private buyouts, or speak directly with our Head Maître d&apos;.
        </p>

        <div className="pt-2">
          <button
            onClick={() => setIsReservationOpen(true)}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5a93b] to-[#e85d34] text-black font-bold text-xs font-mono uppercase tracking-wider shadow-lg shadow-[#d4af37]/20 hover:scale-105 transition-all"
          >
            Launch Table Booking Engine ✦
          </button>
        </div>
      </div>

      {/* ── 2. TWO COLUMN DETAILS & FORM ─────────────────────────────── */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Details & Guidelines */}
        <div className="lg:col-span-5 space-y-6">
          {/* Location & Hours Card */}
          <div className="p-6 rounded-2xl bg-[#12141c] border border-white/10 space-y-4">
            <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <span>📍</span> Location & Valet
            </h3>
            <p className="text-xs font-mono text-[#9da2b2] leading-relaxed">
              44 Epicurean Promenade, Heritage Quarter<br />
              New Delhi / Mumbai Metropolitan
            </p>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#d4af37] flex items-center gap-2">
              <span>🚗</span>
              <span>Complimentary Valet Parking at Main Portico</span>
            </div>
          </div>

          {/* Contact Direct */}
          <div className="p-6 rounded-2xl bg-[#12141c] border border-white/10 space-y-4 text-xs font-mono">
            <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <span>📞</span> Direct Lines
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#8e93a4]">Concierge & Bookings:</span>
                <a href="tel:+919876543210" className="text-white hover:text-[#d4af37]">+91 98765 43210</a>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#8e93a4]">Sommelier Cellar Inquiries:</span>
                <span className="text-white">cellar@savore-dining.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8e93a4]">Private Buyouts & Press:</span>
                <span className="text-white">events@savore-dining.com</span>
              </div>
            </div>
          </div>

          {/* Dress Code & Etiquette */}
          <div className="p-6 rounded-2xl bg-[#12141c] border border-white/10 space-y-3">
            <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <span>✨</span> Guest Guidelines
            </h3>
            <div className="space-y-2 text-xs text-[#9da1b0] leading-relaxed">
              <p><strong className="text-white">Dress Code:</strong> Smart Elegant / Evening Semi-Formal. Athletic wear, beachwear, and flip-flops are politely discouraged.</p>
              <p><strong className="text-white">Corkage Policy:</strong> Up to two 750ml bottles per party for special vintages not on our cellar list ($45 corkage fee applies).</p>
              <p><strong className="text-white">Children:</strong> We welcome guests of all ages during lunch; dinner service is best suited for guests aged 10+.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Inquiries Form */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-3xl bg-[#12141c] border border-[#d4af37]/30 space-y-6">
            <div>
              <span className="text-xs font-mono text-[#d4af37] uppercase tracking-[0.2em]">
                Private Events & Press
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Send Concierge Inquiry
              </h2>
              <p className="text-xs text-[#8f94a4] mt-1">
                For groups larger than 8 or bespoke private banquet planning, our events director will respond within 4 hours.
              </p>
            </div>

            {inquirySent ? (
              <div className="p-8 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/40 text-center space-y-3">
                <div className="text-4xl text-[#d4af37]">✓</div>
                <h4 className="font-serif text-xl font-bold text-white">Inquiry Received</h4>
                <p className="text-xs text-[#9aa0b0] max-w-sm mx-auto">
                  Thank you, <span className="text-white font-medium">{formData.name || "Guest"}</span>. Our Maître d&apos; and Events Concierge will reach out to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#a0a4b5] uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lord Alexander"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#a0a4b5] uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#a0a4b5] uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alexander@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#a0a4b5] uppercase tracking-wider mb-1.5">
                      Nature of Inquiry
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="Private Dining / Event">Private Dining / Celebration</option>
                      <option value="Chef's Table Group">Chef&apos;s Table Full Booking</option>
                      <option value="Corporate Buyout">Full Restaurant Buyout</option>
                      <option value="Sommelier Masterclass">Sommelier Masterclass Booking</option>
                      <option value="Press & Media">Press & Media Feature</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#a0a4b5] uppercase tracking-wider mb-1.5">
                    Message & Event Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide preferred dates, guest count, dietary notes or special arrangements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 rounded-xl p-4 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5a93b] to-[#e85d34] text-black font-bold text-xs font-mono uppercase tracking-wider hover:opacity-95 transition-all shadow-lg shadow-[#d4af37]/20"
                >
                  Send Concierge Inquiry ✦
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
