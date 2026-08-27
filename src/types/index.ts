export interface MenuDish {
  name: string;
  description: string;
  price: string;
  tag?: string;
  dietary?: ("V" | "VG" | "GF" | "DF")[];
  pairing?: string;
}

export interface MenuCategory {
  id: string;
  label: string;
  subtitle: string;
  dishes: MenuDish[];
}

export interface DiningRoom {
  id: string;
  name: string;
  tagline: string;
  capacity: string;
  description: string;
  accentColor: string;
}

export interface PressQuote {
  quote: string;
  author: string;
  publication: string;
  year: string;
}

export interface ReservationForm {
  date: string;
  time: string;
  covers: string;
  occasion: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dietary: string;
  notes: string;
}
