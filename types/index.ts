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
  spicyLevel?: number;
  chefSpecial?: boolean;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  instructions?: string;
}

export interface ReservationDetails {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  seatingArea: "main" | "terrace" | "chef-counter" | "private-vault";
  dietaryNotes?: string;
  occasion?: string;
}

export interface MenuCategory {
  id: string;
  label: string;
  icon: string;
  description?: string;
}
