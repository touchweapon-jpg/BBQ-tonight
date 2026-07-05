/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem, Review, GalleryItem } from "./types";

export const RESTAURANT_INFO = {
  name: "BBQ Tonight",
  tagline: "Where Wood-Fired Smoke Meets Gastronomical Luxury",
  description: "Nestled in the heart of the culinary district, BBQ Tonight represents three generations of dedication to high-end slow-smoked barbecue. Under the leadership of Pitmaster Jean-Luc Laurent, we combine classic oakwood smoking traditions with modern gourmet mechanics to create unforgettable masterworks on every plate.",
  address: "472 Gourmet Blvd, Culinary District, NY 10013",
  phone: "+1 (555) 728-6724",
  email: "reservations@bbqtonight.com",
  chef: {
    name: "Pitmaster Jean-Luc Laurent",
    role: "Proprietor & Master Pitmaster",
    bio: "Hailing from Austin, Texas, Pitmaster Jean-Luc Laurent trained under legendary barbecue virtuosos before establishing BBQ Tonight. Over twenty-five years, they have refined a philosophy of smoking integrity: honoring each cut with precise temperature control and premium wood pairings.",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&auto=format&fit=crop&q=80"
  },
  hours: [
    { days: "Monday - Thursday", time: "5:00 PM - 10:00 PM" },
    { days: "Friday - Saturday", time: "4:00 PM - 11:00 PM" },
    { days: "Sunday Brunch", time: "10:30 AM - 3:00 PM" },
    { days: "Sunday Dinner", time: "5:00 PM - 9:30 PM" }
  ],
  stats: [
    { label: "Michelin Worthy Stars", value: "2" },
    { label: "Years of Culinary Mastery", value: "15+" },
    { label: "Locally Sourced Farms", value: "12" },
    { label: "Premium Wine Cellar Labels", value: "340+" }
  ]
};

export const MENU_ITEMS: MenuItem[] = [
  // BREAKFAST (available Sunday Brunch & Specials)
  {
    id: "b1",
    name: "Truffled Eggs Benedict",
    description: "Two poached organic farmstead eggs, artisanal house-cured brioche, heritage prosciutto, and freshly prepared black truffle hollandaise sauce.",
    price: 24,
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=600&auto=format&fit=crop&q=80",
    tags: ["Chef's Special", "Gluten-Free Available"]
  },
  {
    id: "b2",
    name: "Avocado & Heirloom Toast",
    description: "Cold-pressed olive oil seasoned guacamole, slow-roasted heirloom tomatoes, pickled red onion pearls, and micro-cilantro on fire-toasted country sourdough bread.",
    price: 18,
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80",
    tags: ["Vegan", "Healthy Choice"]
  },
  {
    id: "b3",
    name: "Belgian Liege Waffles",
    description: "Slow-fermented brioche dough waffles caramelized with pearl sugar, topped with organic vanilla bean chantilly cream and hand-harvested wild berries.",
    price: 19,
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1546272989-40c929af4c48?w=600&auto=format&fit=crop&q=80",
    tags: ["Vegetarian"]
  },

  // LUNCH
  {
    id: "l1",
    name: "Mediterranean Harvest Salad",
    description: "Organic baby field greens, roasted butternut squash cubes, seasoned warm red quinoa, Persian cucumbers, crumbled French feta, and toasted pine nuts with honey-lemon vinaigrette.",
    price: 21,
    category: "lunch",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80",
    tags: ["Vegetarian", "Gluten-Free", "Healthy Choice"]
  },
  {
    id: "l2",
    name: "Wood-Fired Margherita Premium",
    description: "Rich San Marzano tomato reduction, fresh Buffalo Mozzarella circles, extra virgin olive oil drizzles, and hand-torn sweet basil leaves atop a hand-stretched 48-hour fermented crust.",
    price: 23,
    category: "lunch",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
    tags: ["Vegetarian", "Classic"]
  },
  {
    id: "l3",
    name: "Savor Signature Wagyu Burger",
    description: "An 8oz dry-aged A5 Wagyu beef patty, thick-cut balsamic onions, melted 18-month cave-aged white cheddar, black truffle aioli, on a house-baked buttered brioche roll.",
    price: 28,
    category: "lunch",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    tags: ["Chef's Special"]
  },

  // DINNER
  {
    id: "d1",
    name: "Dry-Aged USDA Prime Filet Mignon",
    description: "A center-cut 8oz tenderloin steak grilled to perfection, accompanied by organic roasted marble potatoes, grilled baby asparagus spear array, and a rich, velvety green peppercorn reduction.",
    price: 54,
    category: "dinner",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
    tags: ["Gluten-Free", "Luxe Selection"]
  },
  {
    id: "d2",
    name: "Pan-Seared Atlantic Salmon",
    description: "Sustainably caught pan-crisped salmon filet situated on organic baby turnip heads, rich cauliflower-garlic cream, and customized Meyer lemon dill beurre blanc.",
    price: 39,
    category: "dinner",
    image: "https://images.unsplash.com/photo-1485704100591-3240141f6e27?w=600&auto=format&fit=crop&q=80",
    tags: ["Gluten-Free", "Omega Rich"]
  },
  {
    id: "d3",
    name: "Truffle & Mushroom Pappardelle",
    description: "Hand-rolled wide flat pasta strips tossed in a decadent sauce of wild forest chanterelle mushrooms, porcinis, Grana Padano reserve, and fresh shaved summer truffles.",
    price: 34,
    category: "dinner",
    image: "https://images.unsplash.com/photo-1621996346565-e3bb64e0be5e?w=600&auto=format&fit=crop&q=80",
    tags: ["Vegetarian", "Chef's Special"]
  },

  // DRINKS
  {
    id: "dr1",
    name: "Smoky Barrel Old Fashioned",
    description: "Small-batch Kentucky straight bourbon whiskey muddled with Angostura bitters, organic sugar cube, expressed orange oil peel, and tableside Applewood smoke containment.",
    price: 18,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&auto=format&fit=crop&q=80",
    tags: ["Contains Alcohol", "Signature"]
  },
  {
    id: "dr2",
    name: "Lavender Empress Gin & Tonic",
    description: "Empress 1908 color-shifting indigo gin, house-distilled lavender simple syrup, premium elderflower tonic water, and dehydrated lemon wheels.",
    price: 17,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80",
    tags: ["Contains Alcohol"]
  },
  {
    id: "dr3",
    name: "Hibiscus Mocktail Elixir",
    description: "A sparkling cooling refresher containing cold-brewed organic Sudanese hibiscus leaves, muddled sweet spearmint, freshly pressed Persian lime, and club soda sparkle.",
    price: 12,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=600&auto=format&fit=crop&q=80",
    tags: ["Non-Alcoholic", "Organic"]
  }
];

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Eleanor Sterling",
    role: "Gastronomy Enthusiast",
    rating: 5,
    comment: "The Smoked Brisket at BBQ Tonight was an absolute dream. Velvety texture, incredible smoke ring, and slow-cooked to flawless perfection. The tableside smoked Old Fashioned was the perfect pairing. Exceptional hospitality!",
    date: "June 14, 2026",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "r2",
    name: "Marcus Vance",
    role: "Local Food Critic",
    rating: 5,
    comment: "BBQ Tonight successfully maintains the perfect balance between high gastronomy presentation and rich, authentic wood-fired barbecue flavors. The smoked Wagyu beef ribs are a absolute masterclass. A gem in the city.",
    date: "May 28, 2026",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "r3",
    name: "Sophia Delgado",
    role: "Culinary Blogger",
    rating: 5,
    comment: "Their Sunday Brunch Truffled Eggs Benedict blew me away—the rich hollandaise has this subtle, aromatic essence that leaves you craving more. Very beautifully lit, perfect for date nights or elegant celebrations.",
    date: "June 02, 2026",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "r4",
    name: "Julian Kincaid",
    role: "Wine Connoisseur",
    rating: 5,
    comment: "The wine program here is outstanding, rivaled only by the sublime cuisine. Every suggestion from the sommelier was spot on. A premium experience from the moment you step through the beautiful solid oak doors.",
    date: "June 18, 2026",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
    caption: "Main Dining Lounge featuring custom ambient accent illumination",
    category: "ambiance"
  },
  {
    id: "g2",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop&q=80",
    caption: "Decadent house-prepared molten dark chocolate truffle sponge dessert",
    category: "plating"
  },
  {
    id: "g3",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
    caption: "Chef Jean-Luc adding micro-green embellishments to a seasonal special",
    category: "culinary"
  },
  {
    id: "g4",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80",
    caption: "Fresh gourmet pasta prepared organically from scratch daily",
    category: "plating"
  },
  {
    id: "g5",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    caption: "A meticulously prepared modern prime tenderloin plating setup",
    category: "culinary"
  },
  {
    id: "g6",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop&q=80",
    caption: "Sommelier wine-pouring service matching guests' customized tastings",
    category: "ambiance"
  }
];
