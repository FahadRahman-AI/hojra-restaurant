import type { MenuCategory, DiningRoom, PressQuote } from "@/types";

/* ─── Business information ─────────────────────────────────────── */
export const businessInfo = {
  name: "Hojra Restaurant",
  tagline: "Authentic Afghan & Pakistani Cuisine",
  // NOTE: exact street number not verifiable online (Google Maps behind a
  // consent wall). Coordinates 52.4218291, -1.8371591 sit in the Sparkhill
  // area of Birmingham. Owner to confirm the exact street line below.
  addressLine1: "Hojra Restaurant",
  addressStreet: "Sparkhill, Birmingham",
  addressLine3: "West Midlands, UK",
  phoneDisplay: "0121 714 0438",
  phoneHref: "tel:+441217140438",
  email: "hello@hojrarestaurant.com",
  website: "www.hojrarestaurant.com",
  websiteHref: "https://www.hojrarestaurant.com",
  facebook: "https://www.facebook.com/people/Hojra-Restaurant/61592156510257/",
  grandOpening: "Grand Opening · 17 August 2026",
  serviceCharge: "A discretionary service charge of 12.5% applies.",
};

/* ─── On-page teaser menu (real highlights) ────────────────────── */
export const menuCategories: MenuCategory[] = [
  {
    id: "starters",
    label: "Starters",
    subtitle: "To begin",
    dishes: [
      {
        name: "Chicken Samosa",
        description: "2 pcs. Triangular pastry parcels filled with spiced minced chicken",
        price: "£6.49",
      },
      {
        name: "Vegetable Samosa",
        description: "2 pcs. Triangular pastry parcels filled with spiced mixed vegetables",
        price: "£6.49",
        dietary: ["V"],
      },
      {
        name: "Hummus",
        description: "Topped with olive oil & fresh herbs with seasoning",
        price: "£5.99",
        dietary: ["V"],
      },
      {
        name: "Chicken Corn Soup",
        description: "Soup made with chicken, corn and eggs & spice sauce",
        price: "£5.99",
      },
      {
        name: "Afghan Salad",
        description: "Tomatoes, cucumber, lemon juice, herbs, cabbage, pomegranate",
        price: "£4.99",
        dietary: ["V"],
      },
    ],
  },
  {
    id: "mains",
    label: "Afghan Mains",
    subtitle: "Afghan specialities",
    dishes: [
      {
        name: "Qabli Pilau (Lamb)",
        description: "Afghan-style pilau with lamb, raisins and carrots, topped with almond and nuts",
        price: "£16.99",
        tag: "Signature",
      },
      {
        name: "Chinmak Afghan Style",
        description: "Lamb slow-cooked in clay or copper",
        price: "£16.99",
      },
      {
        name: "Lamb Dorak",
        description: "Lamb pilau, garnished and cooked with salad and herbs",
        price: "£14.99",
      },
      {
        name: "Marevi Pilaw",
        description: "Lamb stewed in mixed vegetables, seasoned with saffron and paired with fragrant Afghan rice",
        price: "£19.99",
      },
      {
        name: "Hojra Special Grilled Sea Bass",
        description: "Grilled seabass fillet with salad & rice",
        price: "£18.99",
        tag: "Signature",
      },
    ],
  },
  {
    id: "kebabs",
    label: "Kebabs & Grills",
    subtitle: "From the charcoal",
    dishes: [
      {
        name: "Hojra Afghan Kebabs",
        description: "Lamb tikka, naan, lamb kebab with salad & chutney",
        price: "£17.99",
        tag: "Signature",
      },
      {
        name: "Shami Kebab",
        description: "Minced meat kebabs, fried onions, spices over charcoal",
        price: "£18.99",
      },
      {
        name: "Lamb Tikka",
        description: "Marinated lamb tikka with small naan & salad",
        price: "£15.99",
      },
      {
        name: "Chicken Tikka",
        description: "Marinated chicken tikka with small naan & salad",
        price: "£15.99",
      },
      {
        name: "Lamb Chops (5 pcs)",
        description: "Marinated lamb chops grilled on charcoal",
        price: "£14.99",
      },
    ],
  },
];

/* ─── Full menu (complete, shown in the slide-up overlay) ───────── */
export interface FullMenuItem {
  name: string;
  price: string;
  description?: string;
}
export interface FullMenuSection {
  title: string;
  items: FullMenuItem[];
}

export const fullMenu: FullMenuSection[] = [
  {
    title: "Starters",
    items: [
      { name: "Chicken Samosa", price: "£6.49", description: "2 Pcs. Triangular Pastry Parcels filled with Spiced Minced Chicken" },
      { name: "Vegetable Samosa", price: "£6.49", description: "2 Pcs. Triangular Pastry Parcels filled with Spiced Mixed Vegetables" },
      { name: "Hummus", price: "£5.99", description: "Topped with Olive Oil & Fresh Herbs with seasoning" },
      { name: "Chicken Corn Soup", price: "£5.99", description: "Soup Made with Chicken, Corn and Eggs & Spice Sauce" },
      { name: "Afghan Salad", price: "£4.99", description: "Tomatoes, Cucumber, Lemon Juice, Herbs, Cabbage, Pomegranate, Caerda Dressing" },
      { name: "Greek Salad", price: "£5.69", description: "Tomatoes, Cucumber, Lemon Juice, Herbs, Cabbage, Pomegranate, Caerda Dressing" },
    ],
  },
  {
    title: "Veg Main Course",
    items: [
      { name: "Bukhare Badejan", price: "£11.99", description: "Fried Badejan With Tomatoes, Spices and topped with Yogurt" },
      { name: "Saket Palak (Spinach)", price: "£11.99", description: "All Served with Naan or Rice. Fresh Sauteed with Spinach, Herbs and Spices" },
      { name: "Bamia (Okra)", price: "£11.99", description: "All Served with Naan or Rice. Okra Cooked with Spices, Tomato, Onion and Sauce" },
      { name: "Hojra Special Ghana Dal Kabari", price: "£11.99", description: "All Served with Naan or Rice" },
      { name: "Red Kidney Beans Dal Kabari (Chef Special)", price: "£11.99", description: "All Served with Naan or Rice" },
    ],
  },
  {
    title: "Afghan Main Course (Afghan Style)",
    items: [
      { name: "Chinmak Afghan Style", price: "£16.99", description: "Lamb Slow-cooked in Clay or Copper topped" },
      { name: "Qabli Pilau (Lamb)", price: "£16.99", description: "Afghan Style Pilau with Lamb, Raisins and Carrots Topped with Almond and Nuts" },
      { name: "Qauli Pilau (Lamb Shank)", price: "£19.99", description: "Topped with Pilau, Lamb, Garnish-Cooked with Salad" },
      { name: "Lamb Dorak", price: "£14.99", description: "Lamb Pilau, Garnish-Cooked with Salad and Herbs" },
      { name: "Chicken Dorak (Boneless)", price: "£13.99", description: "Braised Chicken with Berry Sauce and Herbs" },
      { name: "Manti (5 Pcs)", price: "£14.99", description: "Topped with Minted Yogurt" },
      { name: "Kabul", price: "£15.99", description: "2 Pcs of Fine Ground Lamb/Beef, Marinated in Special Blend of Spices" },
      { name: "Marevi Pilaw", price: "£19.99", description: "Lamb Stewed in Mixed Vegetables, Seasoned with Saffron and Paired with Fragrant Afghan Rice" },
      { name: "Afghan Pilav", price: "£11.99", description: "Slow Cooked Lamb Simmered in a Savoury and Comforting Broth, accompanied by Flavourful Sauce Made with Aromatic Spices, Blended Herbs and Special Saffron Sauce" },
      { name: "Hojra Special Grilled Sea Bass", price: "£18.99", description: "Grilled Seabass Fillet with Salad & Rice" },
      { name: "Hojra Special Fried Sea Bass", price: "£18.99", description: "Full Size Sea Bass Fry Style, Side Dishes Beans & Rice" },
      { name: "Mahi Pilaw", price: "£17.99", description: "Fresh Fillet of Sea Bass Harmonised with Lemon, Saffron, Herbs & Spices, Served inside Saffron and Herbs Rice" },
    ],
  },
  {
    title: "Karahi",
    items: [
      { name: "Nahan Mandi Karahi (½ / 1 / 1.5kg)", price: "£15.99 / £26.99 / £38.95", description: "Freshly cooked with Fresh Onions, Oil. Served with Naan & Rice" },
      { name: "Full Chicken Karahi", price: "£24.99 / £28.99", description: "Freshly cooked and specially spiced karahi & chicken, blended with spices sauce" },
      { name: "Hojra Special Garabi", price: "£26.99 / £38.55", description: "Specially Cooked Lamb, Saffron, Spices and Special Sauce, Saffron Lamb Stewed & Rice" },
    ],
  },
  {
    title: "Kebabs",
    items: [
      { name: "Hojra Afghan Kebabs", price: "£17.99", description: "Lamb Tikka, Naan, Lamb Kebab with Salad & Chutney" },
      { name: "Shami Kebab", price: "£18.99", description: "Minced Meat Kebabs, Fried Onions, Spices Over Charcoal" },
      { name: "Lamb Tikka", price: "£15.99", description: "Marinated Lamb Tikka with Small Naan & Salad" },
      { name: "Chicken Tikka", price: "£15.99", description: "Marinated Chicken Tikka with Small Naan & Salad" },
      { name: "Mix Shish", price: "£16.99", description: "Marinated Combined Grilled Chicken Breast" },
      { name: "Chicken Kofta", price: "£14.99", description: "Marinated Chicken Kofta Grilled Over Charcoal with Small Naan & Salad" },
      { name: "Half Grilled Chicken", price: "£19.99", description: "Grilled Chicken" },
      { name: "Lamb Chops (5 Pcs)", price: "£14.99", description: "Marinated Lamb Chops Grilled on Charcoal" },
      { name: "Chapli Kebab (Special Offer)", price: "£11.99", description: "Lamb Chapli Kebab, Naan, Salad & Chutney" },
    ],
  },
  {
    title: "Kebab & Rice",
    items: [
      { name: "Chicken Kofta with Rice", price: "£16.99", description: "Marinated Chicken Kofta Grilled Over Charcoal" },
      { name: "Lamb Kofta with Rice", price: "£16.99", description: "Marinated Lamb Kofta Grilled Over Charcoal" },
      { name: "Chopan Kebab with Rice", price: "£21.99", description: "Marinated, Grilled on the side" },
      { name: "Chicken Wings with Rice", price: "£18.99", description: "Marinated Chicken Wings Grilled Over Charcoal" },
      { name: "Half Grilled Chicken with Rice", price: "£15.99", description: "Marinated" },
      { name: "Chicken Tikka with Rice", price: "£13.99" },
    ],
  },
  {
    title: "Extra Skewer",
    items: [
      { name: "1 Skewer Chicken Kofta (1 Pc)", price: "£6.99" },
      { name: "1 Skewer Chicken Tikka", price: "£6.99" },
      { name: "1 Skewer Lamb Rota", price: "£6.99" },
      { name: "1 Skewer Chopan Kebab", price: "£6.99" },
      { name: "1 Skewer Chicken Wings", price: "£6.99" },
    ],
  },
  {
    title: "Family Platters",
    items: [
      { name: "Hojra Special Mixed Grill (Up to 2 Person)", price: "£45", description: "Lamb Chops, Naan, Salad & Chutney" },
      { name: "Family Mixed Grill (Up to 6 Person)", price: "£75", description: "1 Skewer Chopan Kebab, 1 Skewer Chicken Kofta, 1 Skewer Chicken Tikka, 1 Skewer Lamb Kofta, 2 Skewer Chapli Kebab" },
      { name: "Hojra Grand Grill (Up to 8 Person)", price: "—", description: "Lamb Boti, Lamb Afghan Rice & Afghan Flat Bread, 2 Skewer Chopan Kebab, 2 Skewer Chicken Tikka, 2 Skewer Lamb Kofta, 1 Skewer Chapli Kebab" },
    ],
  },
  {
    title: "Side Order",
    items: [
      { name: "Fries", price: "£3.99" },
      { name: "Plain Rice", price: "£3.99" },
      { name: "Saffron Rice", price: "£3.99" },
      { name: "Afghan Naan", price: "£3.99" },
      { name: "Tandoori Naan", price: "£3.99" },
      { name: "Garlic Naan", price: "£3.99" },
      { name: "Roti", price: "£2.99" },
    ],
  },
  {
    title: "Desserts",
    items: [
      { name: "Baklava (2 Pcs)", price: "£4.99", description: "Layered Filo Pastry Filled With Chopped Nuts And Sweetened With Syrup" },
      { name: "Shiryakh", price: "£4.99", description: "A Traditional Afghan Frozen Dessert Hand Made With Milk, Cardamom, And Rosewater Topped With Pistachios And Almonds" },
      { name: "Halva", price: "£4.99", description: "A Warm, Smooth Dessert Made From Semolina, Sugar, Infused With Cardamom, Topped With Almonds And Pistachios, Garnished With Pistachio Cream And Caramel Sauce" },
      { name: "Afghan Cream Rolls (2 Pcs)", price: "£5.99", description: "Light, Crisp And Flaky Cream Filled Pastry Rolls Garnished With Cream And Pistachios" },
    ],
  },
  {
    title: "Cold Drinks",
    items: [
      { name: "Soft Drink (Glass)", price: "£2.45", description: "Coca-Cola, Diet Coke, Sprite, Fanta Orange" },
      { name: "Sparkling Water (330ml)", price: "£1.99" },
      { name: "Dough (Glass)", price: "£3.99" },
      { name: "Dough (Jug)", price: "£8.99" },
      { name: "Mango Lassi (Glass)", price: "£4.99", description: "Traditional yogurt mango drink" },
      { name: "Mango Lassi (Jug)", price: "£9.99" },
      { name: "Mango Juice (Glass)", price: "£3.99" },
      { name: "Pineapple Juice (Glass)", price: "£2.99" },
      { name: "Orange Juice (Glass)", price: "£2.99" },
      { name: "Water (500ml)", price: "£1.99" },
      { name: "Water Bottle (1 Ltr)", price: "£3.25" },
    ],
  },
  {
    title: "Hot Drinks",
    items: [
      { name: "Black Tea", price: "£2.99" },
      { name: "Green Tea (Pot)", price: "£3.99" },
      { name: "Cappuccino", price: "£3.49" },
      { name: "Black Coffee", price: "£2.99" },
      { name: "Latte Macchiato", price: "£3.49" },
      { name: "Peppermint", price: "£2.99" },
      { name: "Espresso", price: "£2.50" },
    ],
  },
  {
    title: "Milkshakes",
    items: [
      { name: "Mango Milkshake (Glass)", price: "£5.99", description: "Mangoes Blended With Milk And Ice" },
      { name: "Oreo Milkshake (Glass)", price: "£5.99", description: "Oreo Biscuits Blended With Milk And Ice" },
      { name: "Vanilla Milkshake (Glass)", price: "£5.99", description: "Vanilla With Milk And Ice" },
    ],
  },
  {
    title: "Kids Meal",
    items: [
      { name: "Chicken Nuggets (5 Pcs)", price: "£6.99", description: "Served with fries & soft drink" },
      { name: "Burger Fried Chicken Fillet", price: "£8.99", description: "Served with fries & soft drink" },
      { name: "Chicken Tikka (1 Skewer)", price: "£8.99", description: "Served with fries & soft drink" },
      { name: "Grill Chicken Wings (5 Pcs)", price: "£8.99", description: "Served with fries & soft drink" },
    ],
  },
];

export const menuNotices = {
  allergy:
    "If you have any food allergies, please notify a member of our team when placing your order. Due to the style of our cooking, we can't guarantee that any dishes are free from allergy-causing substances. Although all care has been taken to remove bones from our chicken, lamb and fish dishes, some bones may still remain.",
  key: "Key: (V) Vegetarian, (VE) Vegetarian on request, (VE) Vegan",
  serviceCharge: "A discretionary service charge of 12.5% applies.",
};

export const diningRooms: DiningRoom[] = [
  {
    id: "main",
    name: "The Main Room",
    tagline: "Where every evening becomes a memory",
    capacity: "Up to 60 guests",
    description:
      "Our principal dining room is dressed in warm linen, aged oak, and ambient candlelight. Designed for those who believe that a meal is not merely food — it is a ritual.",
    accentColor: "#9E6B48",
  },
  {
    id: "hojra",
    name: "The Hojra",
    tagline: "A chamber of absolute intimacy",
    capacity: "6–14 guests",
    description:
      "Our private namesake room — the original meaning of hojra. Secluded, tailored, and personal. Chef's Table experiences and bespoke tasting menus available exclusively here.",
    accentColor: "#2C352E",
  },
  {
    id: "cellar",
    name: "The Cellar Table",
    tagline: "Beneath the city, beyond the ordinary",
    capacity: "4–8 guests",
    description:
      "An underground wine-cellar setting for our most intimate experience. Surrounded by our curated bottle collection, guided wine pairing included in every sitting.",
    accentColor: "#9E6B48",
  },
];

export const pressQuotes: PressQuote[] = [
  {
    quote:
      "Hojra does something genuinely rare — it makes you feel that the chef cooked this dish for you, and only you. The Nihari Osso Buco alone is worth the journey to Birmingham.",
    author: "Marina Osei",
    publication: "The Guardian — Restaurant of the Year Longlist",
    year: "2024",
  },
  {
    quote:
      "An act of quiet confidence. The cooking is technically precise but never cold. The room feels like someone's home — the best kind of home.",
    author: "Tom Egerton",
    publication: "The Observer Food Monthly",
    year: "2024",
  },
  {
    quote:
      "Birmingham has been waiting for a restaurant like this. Hojra earns its place among the finest dining rooms in England.",
    author: "Fatima Al-Rashid",
    publication: "Eater UK",
    year: "2025",
  },
];

export const openingHours = [
  { day: "Monday",    lunch: null,           dinner: null },
  { day: "Tuesday",   lunch: "12:00–14:30",  dinner: "18:00–22:00" },
  { day: "Wednesday", lunch: "12:00–14:30",  dinner: "18:00–22:00" },
  { day: "Thursday",  lunch: "12:00–14:30",  dinner: "18:00–22:30" },
  { day: "Friday",    lunch: "12:00–15:00",  dinner: "18:00–23:00" },
  { day: "Saturday",  lunch: "12:00–15:00",  dinner: "18:00–23:00" },
  { day: "Sunday",    lunch: "13:00–21:00",  dinner: null },
];

export const timeSlots = [
  "12:00", "12:30", "13:00", "13:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00",
];

export const occasions = [
  "No special occasion",
  "Birthday",
  "Anniversary",
  "Proposal",
  "Business Dinner",
  "Celebration",
  "Other",
];
