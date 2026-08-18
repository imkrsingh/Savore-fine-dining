"use client";

import React, { useState } from "react";
import SafeImage from "@/components/SafeImage";
import { useFood } from "@/context/FoodContext";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
    setIsReservationOpen,
  } = useFood();

  const [deliveryType, setDeliveryType] = useState<"dine-in" | "pickup" | "delivery">("dine-in");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const chefPrepFee = cart.length > 0 ? 4.5 : 0;
  const taxes = Number(((cartTotal - discount) * 0.08).toFixed(2));
  const finalTotal = Math.max(0, cartTotal - discount + chefPrepFee + (deliveryType === "delivery" ? 8 : 0) + taxes);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "SAVORE15" || promoCode.trim().toUpperCase() === "CHEF") {
      setDiscount(Number((cartTotal * 0.15).toFixed(2)));
    } else if (promoCode.trim().toUpperCase() === "VIP") {
      setDiscount(20);
    } else {
      alert("Invalid code. Try using 'SAVORE15' for 15% off!");
    }
  };

  const handleCheckout = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
    }, 4000);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-in Panel */}
      <div className="relative w-full max-w-md bg-[#0f1115] text-[#f5f0e8] h-full shadow-2xl z-10 flex flex-col border-l border-white/10 overflow-hidden animate-slide-left">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#14171d]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold tracking-wide text-white">Your Culinary Bag</h3>
              <p className="text-xs text-[#a0a4b0] font-mono">{cartCount} {cartCount === 1 ? "artisan item" : "artisan items"}</p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            aria-label="Close bag"
          >
            ✕
          </button>
        </div>

        {orderPlaced ? (
          /* Confirmation state */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#0d0f13]">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#e85d34] flex items-center justify-center text-white text-3xl mb-5 shadow-lg shadow-[#d4af37]/20 animate-bounce">
              ✓
            </div>
            <span className="font-mono text-xs text-[#d4af37] uppercase tracking-widest mb-1">SAVORÉ KITCHEN</span>
            <h4 className="font-serif text-2xl font-bold text-white mb-2">Order Dispatched to Chef!</h4>
            <p className="text-sm text-[#9da1b0] mb-6 max-w-xs leading-relaxed">
              Executive Chef has received your order. Handcrafting each course with precision and seasonal ingredients.
            </p>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 w-full mb-6 text-left text-xs font-mono space-y-2">
              <div className="flex justify-between text-[#8f94a6]">
                <span>Order Ref:</span>
                <span className="text-white">#SAV-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between text-[#8f94a6]">
                <span>Estimated Prep:</span>
                <span className="text-[#d4af37]">20-25 minutes</span>
              </div>
              <div className="flex justify-between text-[#8f94a6]">
                <span>Dining Style:</span>
                <span className="text-white capitalize">{deliveryType}</span>
              </div>
            </div>
            <button
              onClick={() => {
                setOrderPlaced(false);
                setIsCartOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c59e2b] text-black font-semibold text-sm hover:brightness-110 transition-all shadow-md"
            >
              Back to Master Menu
            </button>
          </div>
        ) : cart.length === 0 ? (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/40 text-3xl mb-4">
              🍷
            </div>
            <h4 className="font-serif text-xl font-medium text-white mb-2">Your Bag is Empty</h4>
            <p className="text-sm text-[#8c91a0] mb-6 max-w-xs">
              Explore our woodfired Wagyu, handmade truffle pasta, and sommelier reserve cocktails.
            </p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="px-6 py-2.5 rounded-full bg-[#d4af37] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#e5a93b] transition-all"
            >
              Explore Menu
            </button>
          </div>
        ) : (
          /* Items List & Summary */
          <>
            {/* Dining type switcher */}
            <div className="p-4 bg-[#14171d] border-b border-white/5">
              <div className="grid grid-cols-3 gap-1 p-1 bg-black/40 rounded-xl text-xs font-medium">
                {(["dine-in", "pickup", "delivery"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setDeliveryType(type)}
                    className={`py-1.5 rounded-lg capitalize transition-all ${
                      deliveryType === type
                        ? "bg-[#d4af37] text-black font-semibold shadow-sm"
                        : "text-[#9da1b0] hover:text-white"
                    }`}
                  >
                    {type === "dine-in" ? "🍽️ Table" : type === "pickup" ? "🛍️ Pickup" : "🛵 Delivery"}
                  </button>
                ))}
              </div>
            </div>

            {/* Cart Items Scroll */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-white/5">
              {cart.map(({ item, quantity }) => (
                <div key={item.id} className="pt-3 first:pt-0 flex gap-3 items-center">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
                    <SafeImage
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h5 className="font-serif text-sm font-semibold text-white truncate">{item.name}</h5>
                      <span className="font-mono text-xs text-[#d4af37] font-semibold">${(item.price * quantity).toFixed(2)}</span>
                    </div>
                    <p className="text-[11px] text-[#8e93a4] truncate">{item.tags.join(" • ")}</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-white/15 rounded-lg bg-black/30 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-xs text-white/70 hover:text-white hover:bg-white/10"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono text-white">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-xs text-white/70 hover:text-white hover:bg-white/10"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[11px] text-red-400/80 hover:text-red-400 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Input */}
            <div className="p-4 bg-[#14171d]/60 border-t border-white/5">
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo (Try: SAVORE15)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#d4af37] hover:text-black text-xs font-mono text-white transition-colors"
                >
                  Apply
                </button>
              </form>
            </div>

            {/* Bill Summary */}
            <div className="p-4 bg-[#14171d] border-t border-white/10 space-y-2 text-xs">
              <div className="flex justify-between text-[#8e93a4]">
                <span>Artisan Subtotal</span>
                <span className="font-mono text-white">${cartTotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>VIP Culinary Discount</span>
                  <span className="font-mono">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#8e93a4]">
                <span>Chef&apos;s Mise-en-Place & Service</span>
                <span className="font-mono text-white">${chefPrepFee.toFixed(2)}</span>
              </div>
              {deliveryType === "delivery" && (
                <div className="flex justify-between text-[#8e93a4]">
                  <span>Climate-Controlled Courier</span>
                  <span className="font-mono text-white">$8.00</span>
                </div>
              )}
              <div className="flex justify-between text-[#8e93a4]">
                <span>Estimated Taxes (8%)</span>
                <span className="font-mono text-white">${taxes.toFixed(2)}</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between items-center">
                <span className="font-serif text-sm font-bold text-white">Grand Total</span>
                <span className="font-mono text-base font-bold text-[#d4af37]">${finalTotal.toFixed(2)}</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 grid grid-cols-1 gap-2">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5a93b] to-[#e85d34] text-black font-bold text-xs tracking-wider uppercase hover:opacity-95 transition-all shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2"
                >
                  <span>Place Culinary Order</span>
                  <span>→</span>
                </button>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsReservationOpen(true);
                  }}
                  className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-mono transition-colors text-center"
                >
                  Or Book a Table & Pre-order this menu ✦
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
