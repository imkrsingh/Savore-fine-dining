export interface MenuItem {
  id: string;
  name: string;
  category: "starters" | "woodfire" | "pasta" | "mains" | "desserts" | "drinks";
  price: number;
  description: string;
  image: string;
  tags: string[];
  pairing?: string;
  calories?: number;
  prepTime?: string;
  spicyLevel?: number;
  chefSpecial?: boolean;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
  instructions?: string;
}

export interface ReservationDetails {
  fullName?: string;
  name?: string;
  email: string;
  phone: string;
  date: string;
  time?: string;
  timeSlot?: string;
  guests?: number;
  partySize?: number;
  seatingArea?: string;
  dietaryNotes?: string;
  specialRequests?: string;
  occasion?: string;
  notes?: string;
}

export interface MenuCategory {
  id: string;
  label: string;
  icon: string;
  description?: string;
}
