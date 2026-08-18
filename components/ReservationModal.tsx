"use client";

import React, { useState } from "react";
import { useFood } from "@/context/FoodContext";

export default function ReservationModal() {
  const { isReservationOpen, setIsReservationOpen, submitReservation } = useFood();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("2026-08-20");
  const [timeSlot, setTimeSlot] = useState("19:30");
  const [seatingArea, setSeatingArea] = useState<
    "Main Dining Room" | "Chef's Counter" | "Garden Terrace" | "Private Wine Chamber"
  >("Main Dining Room");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    occasion: "Anniversary",
    notes: "",
  });

  if (!isReservationOpen) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      submitReservation({
        guests,
        date,
        time: timeSlot,
        seatingArea,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        specialRequests: formData.notes,
      });
      setStep(3);
    }
  };

  const handleClose = () => {
    setIsReservationOpen(false);
    setStep(1);
  };

  const seatingOptions = [
    {
      name: "Main Dining Room",
      desc: "Warm ambient candlelight, velvet booths & gentle live jazz.",
      icon: "🕯️",
    },
    {
      name: "Chef's Counter",
      desc: "Front-row view of the live Binchotan hearth & tasting course prep.",
      icon: "🔥",
    },
    {
      name: "Garden Terrace",
      desc: "Lush botanical setting with starlit canopy & outdoor heaters.",
      icon: "🌿",
    },
    {
      name: "Private Wine Chamber",
      desc: "Enclosed sommelier cellar for curated vintage pairings & groups.",
      icon: "🍷",
    },
  ] as const;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#0f1116] border border-[#d4af37]/30 text-[#f5f0e8] rounded-2xl shadow-2xl overflow-hidden z-10 animate-scale-up">
        {/* Top gold bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#d4af37] via-[#e5a93b] to-[#e85d34]" />

        {/* Header */}
        <div className="p-6 pb-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#d4af37] uppercase">
              Table Reservation ✦ Michelin Experience
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
              Reserve at SAVORÉ
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-3 bg-[#14171e] border-b border-white/5 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center ${step >= 1 ? "bg-[#d4af37] text-black font-bold" : "bg-white/10 text-white/40"}`}>1</span>
            <span className={step >= 1 ? "text-white" : "text-white/40"}>Experience & Time</span>
          </div>
          <div className="h-[1px] w-8 bg-white/10" />
          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center ${step >= 2 ? "bg-[#d4af37] text-black font-bold" : "bg-white/10 text-white/40"}`}>2</span>
            <span className={step >= 2 ? "text-white" : "text-white/40"}>Guest Details</span>
          </div>
          <div className="h-[1px] w-8 bg-white/10" />
          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center ${step === 3 ? "bg-[#d4af37] text-black font-bold" : "bg-white/10 text-white/40"}`}>3</span>
            <span className={step === 3 ? "text-white" : "text-white/40"}>Confirmed</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-6">
              {/* Party Size */}
              <div>
                <label className="block text-xs font-mono text-[#a0a4b5] uppercase tracking-wider mb-2">
                  Number of Guests
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 6, 8].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      className={`py-3 rounded-xl border text-sm font-bold transition-all ${
                        guests === num
                          ? "bg-[#d4af37] text-black border-[#d4af37] shadow-lg shadow-[#d4af37]/20"
                          : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                      }`}
                    >
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seating Area */}
              <div>
                <label className="block text-xs font-mono text-[#a0a4b5] uppercase tracking-wider mb-2">
                  Choose Ambience / Seating Zone
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {seatingOptions.map((opt) => (
                    <button
                      key={opt.name}
                      type="button"
                      onClick={() => setSeatingArea(opt.name)}
                      className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                        seatingArea === opt.name
                          ? "border-[#d4af37] bg-[#d4af37]/10 ring-1 ring-[#d4af37]"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <span className="text-2xl">{opt.icon}</span>
                      <div>
                        <h4 className="font-serif text-sm font-semibold text-white">{opt.name}</h4>
                        <p className="text-[11px] text-[#9397a8] mt-0.5 leading-snug">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#a0a4b5] uppercase tracking-wider mb-2">
                    Reservation Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#a0a4b5] uppercase tracking-wider mb-2">
                    Seating Time
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <optgroup label="Lunch Service">
                      <option value="12:30">12:30 PM — Afternoon Service</option>
                      <option value="13:15">01:15 PM — Afternoon Service</option>
                      <option value="14:00">02:00 PM — Afternoon Service</option>
                    </optgroup>
                    <optgroup label="Dinner Gastronomy">
                      <option value="18:30">06:30 PM — Twilight Seating</option>
                      <option value="19:30">07:30 PM — Prime Dinner</option>
                      <option value="20:45">08:45 PM — Prime Dinner</option>
                      <option value="21:30">09:30 PM — Late Night Chef Flight</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5a93b] to-[#e85d34] text-black font-bold text-sm tracking-wider uppercase hover:opacity-95 transition-all shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2"
                >
                  <span>Continue to Guest Details</span>
                  <span>→</span>
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[#8e93a4]">Selected:</span>{" "}
                  <span className="text-white font-bold">{guests} Guests • {date} at {timeSlot}</span>
                </div>
                <span className="text-[#d4af37]">{seatingArea}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#a0a4b5] uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord Alexander Wright"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#a0a4b5] uppercase tracking-wider mb-1.5">
                    Phone Number (SMS Confirmation) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

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
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#a0a4b5] uppercase tracking-wider mb-1.5">
                    Occasion (Optional)
                  </label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Casual Fine Dining">Casual Fine Dining</option>
                    <option value="Anniversary">Anniversary Celebration</option>
                    <option value="Birthday">Birthday Gathering</option>
                    <option value="Business Dinner">Executive Business Dinner</option>
                    <option value="Romantic Date">Romantic Date Night</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#a0a4b5] uppercase tracking-wider mb-1.5">
                    Dietary Notes / Allergies
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Shellfish allergy, Vegan wine only"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-xl border border-white/15 bg-white/5 text-xs font-mono text-white hover:bg-white/10"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5a93b] to-[#e85d34] text-black font-bold text-sm tracking-wider uppercase hover:opacity-95 transition-all shadow-lg shadow-[#d4af37]/20"
                >
                  Confirm Table Reservation ✦
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#e85d34] flex items-center justify-center text-white text-3xl mx-auto shadow-xl shadow-[#d4af37]/25 animate-bounce">
                🍷
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37]">
                  Table Locked & Confirmed
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                  We look forward to hosting you!
                </h4>
                <p className="text-sm text-[#9fa3b5] max-w-md mx-auto mt-2">
                  A concierge confirmation has been sent to <span className="text-white font-medium">{formData.email || "your email"}</span>. Our maître d&apos; will prepare your table in the <span className="text-[#d4af37]">{seatingArea}</span>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-[#d4af37]/30 max-w-md mx-auto text-left font-mono text-xs space-y-2.5">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-[#8f94a6]">Reservation Code:</span>
                  <span className="text-white font-bold">#SVR-{Math.floor(10000 + Math.random() * 90000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8f94a6]">Party Size:</span>
                  <span className="text-white">{guests} Guests</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8f94a6]">Date & Time:</span>
                  <span className="text-[#d4af37]">{date} at {timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8f94a6]">Dress Code:</span>
                  <span className="text-white">Smart Elegant / Semi-Formal</span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="px-8 py-3 rounded-xl bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#e5a93b] transition-all"
              >
                Close & Return to Site
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
