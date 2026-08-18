"use client";

import React, { useState } from "react";
import SafeImage from "@/components/SafeImage";
import { MenuItem, useFood } from "@/context/FoodContext";

interface FoodItemCardProps {
  item: MenuItem;
  layout?: "grid" | "horizontal";
}

export default function FoodItemCard({ item, layout = "grid" }: FoodItemCardProps) {
  const { addToCart } = useFood();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    addToCart(item, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  if (layout === "horizontal") {
    return (
      <div className="group relative bg-[#13151b] border border-white/10 hover:border-[#d4af37]/50 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-5 transition-all duration-300 hover:shadow-xl hover:shadow-[#d4af37]/5">
        {/* Dish Image */}
        <div className="relative w-full sm:w-44 h-44 sm:h-auto rounded-xl overflow-hidden shrink-0">
          <SafeImage
            src={item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {item.chefSpecial && (
            <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#d4af37] text-black text-[9px] font-mono font-bold uppercase tracking-wider shadow-md z-10">
              Chef&apos;s Star ★
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h4 className="font-serif text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">
                {item.name}
              </h4>
              <span className="font-mono text-base font-bold text-[#d4af37] shrink-0">
                ${item.price.toFixed(2)}
              </span>
            </div>

            <p className="text-xs text-[#9aa0b0] leading-relaxed line-clamp-2 mb-3">
              {item.description}
            </p>

            {/* Tags & Pairing */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-[#b8bcc8]"
                >
                  {tag}
                </span>
              ))}
              {item.pairing && (
                <span className="text-[10px] font-mono text-[#d4af37] flex items-center gap-1">
                  <span>🍷</span>
                  <span>Pairs with {item.pairing}</span>
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <div className="flex items-center gap-3 text-[11px] font-mono text-[#8a8e9e]">
              {item.calories && <span>🔥 {item.calories} kcal</span>}
              {item.prepTime && <span>⏱️ {item.prepTime}</span>}
            </div>

            <button
              onClick={handleAdd}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                justAdded
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                  : "bg-[#d4af37] hover:bg-[#e5a93b] text-black shadow-md shadow-[#d4af37]/15 hover:scale-[1.02]"
              }`}
            >
              {justAdded ? (
                <>
                  <span>✓</span>
                  <span>Added</span>
                </>
              ) : (
                <>
                  <span>+</span>
                  <span>Add to Order</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-[#13151b] border border-white/10 hover:border-[#d4af37]/50 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-[#d4af37]/10 hover:-translate-y-1">
      {/* Dish Image */}
      <div className="relative w-full h-56 overflow-hidden bg-black/40">
        <SafeImage
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#13151b] via-transparent to-transparent opacity-80 pointer-events-none" />

        {item.chefSpecial && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#d4af37] text-black text-[9px] font-mono font-bold uppercase tracking-wider shadow-md z-10">
            Chef&apos;s Signature ★
          </div>
        )}

        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-mono font-bold text-[#d4af37] z-10">
          ${item.price.toFixed(2)}
        </div>

        {item.prepTime && (
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-[10px] font-mono text-white/80 z-10">
            ⏱️ {item.prepTime}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
            {item.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-[#a6abbb]"
              >
                {tag}
              </span>
            ))}
            {item.calories && (
              <span className="text-[10px] font-mono text-[#8a8e9e] ml-auto">
                {item.calories} kcal
              </span>
            )}
          </div>

          <h4 className="font-serif text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors mb-2">
            {item.name}
          </h4>

          <p className="text-xs text-[#9297a7] leading-relaxed line-clamp-2 mb-4">
            {item.description}
          </p>

          {item.pairing && (
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono text-[#d4af37] mb-4 flex items-center gap-2">
              <span>🍷</span>
              <span className="truncate">Sommelier Pairing: {item.pairing}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={handleAdd}
          className={`w-full py-2.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
            justAdded
              ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
              : "bg-[#d4af37] hover:bg-[#e5a93b] text-black shadow-md shadow-[#d4af37]/15 hover:scale-[1.01]"
          }`}
        >
          {justAdded ? (
            <>
              <span>✓</span>
              <span>Added to Culinary Bag</span>
            </>
          ) : (
            <>
              <span>+</span>
              <span>Add to Order</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
