import { MenuItem, MenuCategoryType } from "../types";
import { MENU_ITEMS, RESTAURANT_INFO } from "../data";

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
}

export type OrderStatus = "Pending" | "Confirmed" | "Preparing" | "Ready" | "Completed" | "Cancelled";
export type ReservationStatus = "Pending" | "Confirmed" | "Cancelled" | "Completed";

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  items: OrderItem[];
  quantity: number; // Total item count
  totalPrice: number;
  paymentMethod: "Cash" | "Card";
  orderTime: string;
  status: OrderStatus;
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  status: ReservationStatus;
}

export interface AdminMenuItem extends MenuItem {
  availability: "Available" | "Out of Stock";
  categoryName?: string; // friendly category name if customized
}

export interface RestaurantSettings {
  restaurantName: string;
  phone: string;
  email: string;
  address: string;
  openingHours: string;
  restaurantLogo: string;
}

export interface Customer {
  name: string;
  phone: string;
  email?: string;
  totalOrders: number;
  totalSpent: number;
  lastVisited?: string;
}

// Initial default categories
const DEFAULT_CATEGORIES = [
  "breakfast",
  "lunch",
  "dinner",
  "drinks",
  "BBQ",
  "Karahi",
  "Handi",
  "Biryani",
  "Fast Food",
  "Chinese",
  "Beverages",
  "Desserts"
];

// Initial default orders to populate dashboard nicely
const DEFAULT_ORDERS: Order[] = [
  {
    id: "ORD-7081",
    customerName: "Eleanor Sterling",
    phone: "+1 (555) 728-6724",
    items: [
      { menuItemId: "d1", name: "Dry-Aged USDA Prime Filet Mignon", quantity: 1, price: 54 },
      { menuItemId: "dr1", name: "Smoky Barrel Old Fashioned", quantity: 2, price: 18 }
    ],
    quantity: 3,
    totalPrice: 90.00,
    paymentMethod: "Card",
    orderTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 min ago
    status: "Preparing"
  },
  {
    id: "ORD-9425",
    customerName: "Marcus Vance",
    phone: "+1 (555) 123-4567",
    items: [
      { menuItemId: "l3", name: "Savor Signature Wagyu Burger", quantity: 2, price: 28 },
      { menuItemId: "dr3", name: "Hibiscus Mocktail Elixir", quantity: 2, price: 12 }
    ],
    quantity: 4,
    totalPrice: 80.00,
    paymentMethod: "Cash",
    orderTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    status: "Completed"
  },
  {
    id: "ORD-1152",
    customerName: "Sophia Delgado",
    phone: "+1 (555) 987-6543",
    items: [
      { menuItemId: "b1", name: "Truffled Eggs Benedict", quantity: 1, price: 24 },
      { menuItemId: "dr2", name: "Lavender Empress Gin & Tonic", quantity: 1, price: 17 }
    ],
    quantity: 2,
    totalPrice: 41.00,
    paymentMethod: "Card",
    orderTime: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    status: "Confirmed"
  }
];

// Initial default reservations
const DEFAULT_RESERVATIONS: Reservation[] = [
  {
    id: "RES-9281",
    name: "Eleanor Sterling",
    phone: "+1 (555) 728-6724",
    email: "eleanor@sterling.com",
    date: new Date().toISOString().split("T")[0], // today
    time: "19:30",
    guests: 2,
    specialRequests: "Requesting window seating if possible, celebrating an anniversary.",
    status: "Confirmed"
  },
  {
    id: "RES-1049",
    name: "Marcus Vance",
    phone: "+1 (555) 123-4567",
    email: "marcus@vancecritic.com",
    date: new Date().toISOString().split("T")[0], // today
    time: "20:00",
    guests: 4,
    specialRequests: "Needs a high chair for child.",
    status: "Pending"
  },
  {
    id: "RES-3342",
    name: "Lord Alexander Sterling",
    phone: "+1 (555) 999-8888",
    email: "alexander@sterlingmanor.co.uk",
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0], // tomorrow
    time: "18:00",
    guests: 6,
    specialRequests: "Aromatic dessert plaque requested.",
    status: "Pending"
  }
];

// Helper to initialize database if empty
function initializeDB() {
  if (!localStorage.getItem("bbq_menu_items")) {
    const formatted: AdminMenuItem[] = MENU_ITEMS.map(item => ({
      ...item,
      availability: "Available"
    }));
    localStorage.setItem("bbq_menu_items", JSON.stringify(formatted));
  }
  if (!localStorage.getItem("bbq_categories")) {
    localStorage.setItem("bbq_categories", JSON.stringify(DEFAULT_CATEGORIES));
  }
  if (!localStorage.getItem("bbq_orders")) {
    localStorage.setItem("bbq_orders", JSON.stringify(DEFAULT_ORDERS));
  }
  if (!localStorage.getItem("bbq_reservations")) {
    localStorage.setItem("bbq_reservations", JSON.stringify(DEFAULT_RESERVATIONS));
  }
  if (!localStorage.getItem("bbq_settings")) {
    const defaultSettings: RestaurantSettings = {
      restaurantName: RESTAURANT_INFO.name,
      phone: RESTAURANT_INFO.phone,
      email: RESTAURANT_INFO.email,
      address: RESTAURANT_INFO.address,
      openingHours: RESTAURANT_INFO.hours.map(h => `${h.days}: ${h.time}`).join("\n"),
      restaurantLogo: ""
    };
    localStorage.setItem("bbq_settings", JSON.stringify(defaultSettings));
  }
}

// Ensure db is initialized upon importing
if (typeof window !== "undefined") {
  initializeDB();
}

export const db = {
  // --- MENU ITEMS ---
  getMenuItems(): AdminMenuItem[] {
    initializeDB();
    return JSON.parse(localStorage.getItem("bbq_menu_items") || "[]");
  },

  saveMenuItems(items: AdminMenuItem[]) {
    localStorage.setItem("bbq_menu_items", JSON.stringify(items));
    // Dispatch event to trigger real-time updates in other components
    window.dispatchEvent(new Event("bbq_db_updated"));
  },

  addMenuItem(item: Omit<AdminMenuItem, "id">): AdminMenuItem {
    const items = this.getMenuItems();
    const newItem: AdminMenuItem = {
      ...item,
      id: "item-" + Math.floor(Math.random() * 1000000)
    };
    items.push(newItem);
    this.saveMenuItems(items);
    return newItem;
  },

  updateMenuItem(updatedItem: AdminMenuItem) {
    const items = this.getMenuItems();
    const idx = items.findIndex(i => i.id === updatedItem.id);
    if (idx !== -1) {
      items[idx] = updatedItem;
      this.saveMenuItems(items);
    }
  },

  deleteMenuItem(id: string) {
    const items = this.getMenuItems();
    const filtered = items.filter(i => i.id !== id);
    this.saveMenuItems(filtered);
  },

  // --- CATEGORIES ---
  getCategories(): string[] {
    initializeDB();
    return JSON.parse(localStorage.getItem("bbq_categories") || "[]");
  },

  addCategory(category: string) {
    const categories = this.getCategories();
    if (!categories.includes(category)) {
      categories.push(category);
      localStorage.setItem("bbq_categories", JSON.stringify(categories));
      window.dispatchEvent(new Event("bbq_db_updated"));
    }
  },

  deleteCategory(category: string) {
    const categories = this.getCategories();
    const filtered = categories.filter(c => c !== category);
    localStorage.setItem("bbq_categories", JSON.stringify(filtered));
    window.dispatchEvent(new Event("bbq_db_updated"));
  },

  // --- ORDERS ---
  getOrders(): Order[] {
    initializeDB();
    return JSON.parse(localStorage.getItem("bbq_orders") || "[]");
  },

  saveOrders(orders: Order[]) {
    localStorage.setItem("bbq_orders", JSON.stringify(orders));
    window.dispatchEvent(new Event("bbq_db_updated"));
  },

  addOrder(order: Omit<Order, "id" | "orderTime">): Order {
    const orders = this.getOrders();
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...order,
      id: `ORD-${randNum}`,
      orderTime: new Date().toISOString()
    };
    orders.unshift(newOrder); // Add to beginning of recent orders
    this.saveOrders(orders);
    return newOrder;
  },

  updateOrder(updatedOrder: Order) {
    const orders = this.getOrders();
    const idx = orders.findIndex(o => o.id === updatedOrder.id);
    if (idx !== -1) {
      orders[idx] = updatedOrder;
      this.saveOrders(orders);
    }
  },

  deleteOrder(id: string) {
    const orders = this.getOrders();
    const filtered = orders.filter(o => o.id !== id);
    this.saveOrders(filtered);
  },

  // --- RESERVATIONS ---
  getReservations(): Reservation[] {
    initializeDB();
    return JSON.parse(localStorage.getItem("bbq_reservations") || "[]");
  },

  saveReservations(reservations: Reservation[]) {
    localStorage.setItem("bbq_reservations", JSON.stringify(reservations));
    window.dispatchEvent(new Event("bbq_db_updated"));
  },

  addReservation(reservation: Omit<Reservation, "id">): Reservation {
    const reservations = this.getReservations();
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const newRes: Reservation = {
      ...reservation,
      id: `RES-${randNum}`
    };
    reservations.unshift(newRes);
    this.saveReservations(reservations);
    return newRes;
  },

  updateReservation(updatedRes: Reservation) {
    const reservations = this.getReservations();
    const idx = reservations.findIndex(r => r.id === updatedRes.id);
    if (idx !== -1) {
      reservations[idx] = updatedRes;
      this.saveReservations(reservations);
    }
  },

  deleteReservation(id: string) {
    const reservations = this.getReservations();
    const filtered = reservations.filter(r => r.id !== id);
    this.saveReservations(filtered);
  },

  // --- SETTINGS ---
  getSettings(): RestaurantSettings {
    initializeDB();
    return JSON.parse(localStorage.getItem("bbq_settings") || "{}");
  },

  updateSettings(settings: RestaurantSettings) {
    localStorage.setItem("bbq_settings", JSON.stringify(settings));
    window.dispatchEvent(new Event("bbq_db_updated"));
  },

  // --- CUSTOMERS (AGREGGATED DYNAMICALLY FOR TRUTH & CONSISTENCY) ---
  getCustomers(): Customer[] {
    const orders = this.getOrders();
    const reservations = this.getReservations();
    const customerMap = new Map<string, Customer>();

    // 1. Process from orders
    orders.forEach(o => {
      const key = o.phone.trim();
      const existing = customerMap.get(key);
      if (existing) {
        existing.totalOrders += 1;
        existing.totalSpent += o.totalPrice;
        if (!existing.lastVisited || new Date(o.orderTime) > new Date(existing.lastVisited)) {
          existing.lastVisited = o.orderTime;
        }
      } else {
        customerMap.set(key, {
          name: o.customerName,
          phone: o.phone,
          totalOrders: 1,
          totalSpent: o.totalPrice,
          lastVisited: o.orderTime
        });
      }
    });

    // 2. Supplement from reservations
    reservations.forEach(r => {
      const key = r.phone.trim();
      const existing = customerMap.get(key);
      if (existing) {
        if (r.email && !existing.email) {
          existing.email = r.email;
        }
        const resDate = `${r.date}T${r.time}`;
        if (!existing.lastVisited || new Date(resDate) > new Date(existing.lastVisited)) {
          existing.lastVisited = resDate;
        }
      } else {
        customerMap.set(key, {
          name: r.name,
          phone: r.phone,
          email: r.email,
          totalOrders: 0,
          totalSpent: 0,
          lastVisited: `${r.date}T${r.time}`
        });
      }
    });

    return Array.from(customerMap.values());
  },

  resetToSeed() {
    localStorage.removeItem("bbq_menu_items");
    localStorage.removeItem("bbq_categories");
    localStorage.removeItem("bbq_orders");
    localStorage.removeItem("bbq_reservations");
    localStorage.removeItem("bbq_settings");
    initializeDB();
    window.dispatchEvent(new Event("bbq_db_updated"));
  }
};
