"use client";

import { useState } from "react";
import FoodItemCard from "@/components/FoodItemCard";
import { MENU_ITEMS, MenuItem, useFood } from "@/context/FoodContext";

export default function MenuPage() {
  const { setIsReservationOpen, setIsCartOpen } = useFood();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietaryFilter, setDietaryFilter] = useState<string>("all");
  const [viewLayout, setViewLayout] = useState<"grid" | "horizontal">("grid");

  const categories = [
    { id: "all", label: "All Creations", icon: "✨" },
    { id: "starters", label: "Antipasti & Starters", icon: "🥗" },
    { id: "woodfire", label: "Woodfire & Steaks", icon: "🔥" },
    { id: "pasta", label: "Handcrafted Pasta", icon: "🍝" },
    { id: "mains", label: "Signature Mains", icon: "🥩" },
    { id: "desserts", label: "Artisan Pastry", icon: "🍫" },
    { id: "drinks", label: "Sommelier Cellar & Cocktails", icon: "🍸" },
  ];

  const dietaryTags = [
    { id: "all", label: "All Diets" },
    { id: "Signature", label: "Signature Only" },
    { id: "Vegetarian", label: "Vegetarian" },
    { id: "Gluten-Free", label: "Gluten-Free" },
    { id: "Organic", label: "Organic" },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCat = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDiet =
      dietaryFilter === "all" || item.tags.some((t) => t.includes(dietaryFilter));

    return matchesCat && matchesSearch && matchesDiet;
  });

  return (
    <div className="w-full bg-[#0b0c10] text-[#f5f0e8] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* ── HEADER ── */}
      <div className="max-w-7xl mx-auto text-center space-y-4 pt-6 pb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-[#d4af37]/30 text-[10px] font-mono tracking-[0.25em] text-[#d4af37] uppercase">
          ✦ The Autumn / Winter Gastronomy Roster ✦
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white">
          Our Master Culinary Menu
        </h1>
        <p className="text-sm sm:text-base text-[#9fa3b4] max-w-2xl mx-auto leading-relaxed">
          Explore artisanal dishes prepared table-side and over Japanese white oak coals. Add dishes to your bag for express order or lock in your tasting reservation.
        </p>

        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => setIsReservationOpen(true)}
            className="px-6 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#e5a93b] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#d4af37]/20"
          >
            Book Tasting Table ✦
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs uppercase tracking-wider transition-colors"
          >
            Open Order Bag 🛍️
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* ── SEARCH & FILTER CONTROLS ── */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#12141c] border border-white/10 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search dishes, ingredients (e.g. Wagyu, Truffle, Burrata)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/50 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37]"
              />
              <span className="absolute left-3.5 top-2.5 text-white/40 text-xs">🔍</span>
            </div>

            {/* Dietary Tags */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {dietaryTags.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDietaryFilter(d.id)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-mono whitespace-nowrap transition-all ${
                    dietaryFilter === d.id
                      ? "bg-[#d4af37] text-black font-bold"
                      : "bg-white/5 text-[#9aa0b0] hover:text-white border border-white/10"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Layout Switcher */}
            <div className="hidden sm:flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 shrink-0">
              <button
                onClick={() => setViewLayout("grid")}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewLayout === "grid" ? "bg-[#d4af37] text-black" : "text-white/60 hover:text-white"
                }`}
                title="Grid View"
              >
                ⊞ Grid
              </button>
              <button
                onClick={() => setViewLayout("horizontal")}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewLayout === "horizontal" ? "bg-[#d4af37] text-black" : "text-white/60 hover:text-white"
                }`}
                title="List View"
              >
                ☰ List
              </button>
            </div>
          </div>

          {/* Categories Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-2 border-t border-white/5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? "bg-white/15 text-[#d4af37] border border-[#d4af37]/40 font-bold"
                    : "text-[#8e93a4] hover:text-white"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── DISHES LIST / GRID ── */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#12141c] rounded-2xl border border-white/10 p-8 space-y-3">
            <div className="text-4xl">🍽️</div>
            <h3 className="font-serif text-xl text-white">No dishes matched your criteria</h3>
            <p className="text-xs text-[#8f94a4]">Try clearing your search query or selecting &ldquo;All Diets&rdquo;.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setDietaryFilter("all");
              }}
              className="px-4 py-2 rounded-lg bg-[#d4af37] text-black text-xs font-mono font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : viewLayout === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <FoodItemCard key={item.id} item={item} layout="grid" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
              <FoodItemCard key={item.id} item={item} layout="horizontal" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
