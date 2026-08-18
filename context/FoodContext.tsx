"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface MenuItem {
  id: string;
  name: string;
  category: "starters" | "mains" | "woodfire" | "pasta" | "desserts" | "drinks";
  description: string;
  price: number;
  image: string;
  tags: string[];
  calories?: number;
  prepTime?: string;
  pairing?: string;
  chefSpecial?: boolean;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export interface ReservationDetails {
  guests: number;
  date: string;
  time: string;
  seatingArea: "Main Dining Room" | "Chef's Counter" | "Garden Terrace" | "Private Wine Chamber";
  name: string;
  phone: string;
  email: string;
  specialRequests?: string;
}

interface FoodContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isReservationOpen: boolean;
  setIsReservationOpen: (open: boolean) => void;
  activeReservation: ReservationDetails | null;
  submitReservation: (details: ReservationDetails) => void;
  clearReservation: () => void;
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "dish-1",
    name: "Black Truffle Wagyu Ribeye",
    category: "woodfire",
    description: "A5 Miyazaki Wagyu, aged for 35 days, finished over Japanese Binchotan charcoal with fresh shaved Périgord black truffles and smoked bone marrow jus.",
    price: 68,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=85",
    tags: ["Signature", "Chef's Choice", "Gluten-Free"],
    calories: 620,
    prepTime: "20 min",
    pairing: "2018 Barolo DOCG",
    chefSpecial: true,
  },
  {
    id: "dish-2",
    name: "Handmade Tagliolini al Tartufo",
    category: "pasta",
    description: "Silky 40-yolk egg pasta twirled in alpine butter, 24-month Parmigiano-Reggiano, and topped generously with freshly grated seasonal truffles.",
    price: 36,
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281292?auto=format&fit=crop&w=1000&q=85",
    tags: ["Vegetarian", "Signature"],
    calories: 510,
    prepTime: "15 min",
    pairing: "Chardonnay Riserva",
    chefSpecial: true,
  },
  {
    id: "dish-3",
    name: "Wood-Fired Burrata & Heirloom Figs",
    category: "starters",
    description: "Creamy artisanal pugliese burrata, roasted caramelized mission figs, aged balsamic glaze, wild arugula, and warm house sourdough.",
    price: 24,
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=1000&q=85",
    tags: ["Vegetarian", "Organic"],
    calories: 380,
    prepTime: "10 min",
    pairing: "Prosecco Valdobbiadene",
    chefSpecial: false,
  },
  {
    id: "dish-4",
    name: "Pan-Seared Chilean Sea Bass",
    category: "mains",
    description: "Wild caught sea bass, saffron-infused lobster velouté, confit baby leeks, samphire, and crispy lotus root chips.",
    price: 52,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=85",
    tags: ["Gluten-Free", "Chef's Choice"],
    calories: 440,
    prepTime: "18 min",
    pairing: "Sancerre Blanc 2021",
    chefSpecial: true,
  },
  {
    id: "dish-5",
    name: "Artisan Woodfire Truffle Pizza",
    category: "woodfire",
    description: "72-hour fermented sourdough crust, fior di latte mozzarella, wild forest chanterelles, taleggio cheese, and cold-pressed white truffle oil.",
    price: 32,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=85",
    tags: ["Vegetarian", "Bestseller"],
    calories: 680,
    prepTime: "12 min",
    pairing: "Chianti Classico",
    chefSpecial: false,
  },
  {
    id: "dish-6",
    name: "Lobster & Saffron Ravioloni",
    category: "pasta",
    description: "Large handmade pasta parcels filled with sweet Maine lobster and ricotta, bathed in a tarragon bisque reduction and golden caviar.",
    price: 44,
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1000&q=85",
    tags: ["Signature", "Seafood"],
    calories: 490,
    prepTime: "16 min",
    pairing: "Chablis Premier Cru",
    chefSpecial: true,
  },
  {
    id: "dish-7",
    name: "Smoked Golden Beetroot Carpaccio",
    category: "starters",
    description: "Paper-thin yellow and candy-stripe beets, whipped goat cheese quenelle, toasted pistachios, and orange blossom reduction.",
    price: 22,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=85",
    tags: ["Vegan Available", "Organic", "Gluten-Free"],
    calories: 260,
    prepTime: "10 min",
    pairing: "Sauvignon Blanc",
    chefSpecial: false,
  },
  {
    id: "dish-8",
    name: "Valrhona Dark Chocolate Sphere",
    category: "desserts",
    description: "70% Guanaja chocolate dome melted table-side with warm salted caramel, containing hazelnut praline, passionfruit cream, and gold leaf.",
    price: 22,
    image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=1000&q=85",
    tags: ["Signature", "Vegetarian"],
    calories: 420,
    prepTime: "10 min",
    pairing: "Tawny Port 20-Year",
    chefSpecial: true,
  },
  {
    id: "dish-9",
    name: "Sicilian Pistachio & Raspberry Tart",
    category: "desserts",
    description: "Crisp almond sable, roasted Bronte pistachio ganache, fresh organic raspberries, and Tahitian vanilla bean gelato.",
    price: 19,
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1000&q=85",
    tags: ["Vegetarian", "Bestseller"],
    calories: 340,
    prepTime: "8 min",
    pairing: "Moscato d'Asti",
    chefSpecial: false,
  },
  {
    id: "dish-10",
    name: "Smoked Rosemary Old Fashioned",
    category: "drinks",
    description: "Small-batch Kentucky bourbon, house demerara syrup, Angostura & orange bitters, smoked with torched fresh rosemary.",
    price: 20,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=85",
    tags: ["Signature Cocktail", "Artisan Mixology"],
    calories: 180,
    prepTime: "5 min",
    chefSpecial: true,
  },
  {
    id: "dish-11",
    name: "Hibiscus & Yuzu Botanical Fizz",
    category: "drinks",
    description: "Distilled non-alcoholic botanical spirit, wild hibiscus nectar, Japanese yuzu, sparkling artisanal soda, and edible dried rose petals.",
    price: 16,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1000&q=85",
    tags: ["Zero-Proof", "Refreshing", "Organic"],
    calories: 90,
    prepTime: "5 min",
    chefSpecial: false,
  },
  {
    id: "dish-12",
    name: "Slow-Roasted Duck Breast with Cherry Glaze",
    category: "mains",
    description: "Crispy skin Moulard duck breast, spiced sour cherry reduction, celeriac silk, and sautéed rainbow chard.",
    price: 48,
    image: "https://images.unsplash.com/photo-1514944298350-f1947b69c849?auto=format&fit=crop&w=1000&q=85",
    tags: ["Chef's Choice", "Gluten-Free"],
    calories: 580,
    prepTime: "22 min",
    pairing: "Pinot Noir Reserve",
    chefSpecial: true,
  }
];

export function FoodProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [activeReservation, setActiveReservation] = useState<ReservationDetails | null>(null);

  // Load cart from local storage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("savore_cart");
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem("savore_cart", JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const addToCart = (item: MenuItem, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + quantity } : ci
        );
      }
      return [...prev, { item, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.item.id === id) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const submitReservation = (details: ReservationDetails) => {
    setActiveReservation(details);
  };

  const clearReservation = () => {
    setActiveReservation(null);
  };

  return (
    <FoodContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        isReservationOpen,
        setIsReservationOpen,
        activeReservation,
        submitReservation,
        clearReservation,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
}

export function useFood() {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error("useFood must be used within a FoodProvider");
  }
  return context;
}
