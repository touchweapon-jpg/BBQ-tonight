import React, { useState, useEffect } from "react";
import { db, AdminMenuItem } from "../../utils/db";
import { Search, Plus, Minus, Trash2, ShoppingCart, User, Phone, CheckCircle } from "lucide-react";

interface AdminPOSProps {
  onNotify: (msg: string, type: "success" | "error") => void;
}

interface CartItem {
  item: AdminMenuItem;
  quantity: number;
}

export default function AdminPOS({ onNotify }: AdminPOSProps) {
  const [menuItems, setMenuItems] = useState<AdminMenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"Cash" | "Card">("Cash");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const loadPOSData = () => {
    setMenuItems(db.getMenuItems());
    setCategories(db.getCategories());
  };

  useEffect(() => {
    loadPOSData();
    window.addEventListener("bbq_db_updated", loadPOSData);
    return () => window.removeEventListener("bbq_db_updated", loadPOSData);
  }, []);

  const handleAddToCart = (item: AdminMenuItem) => {
    if (item.availability === "Out of Stock") {
      onNotify(`${item.name} is currently out of stock!`, "error");
      return;
    }

    const existing = cart.find(cartItem => cartItem.item.id === item.id);
    if (existing) {
      setCart(cart.map(cartItem => 
        cartItem.item.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { item, quantity: 1 }]);
    }
    onNotify(`Added ${item.name} to ticket`, "success");
  };

  const handleUpdateQty = (itemId: string, diff: number) => {
    const existing = cart.find(cartItem => cartItem.item.id === itemId);
    if (!existing) return;

    const newQty = existing.quantity + diff;
    if (newQty <= 0) {
      handleRemoveFromCart(itemId);
    } else {
      setCart(cart.map(cartItem => 
        cartItem.item.id === itemId 
          ? { ...cartItem, quantity: newQty }
          : cartItem
      ));
    }
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart(cart.filter(cartItem => cartItem.item.id !== itemId));
    onNotify("Item removed from ticket", "success");
  };

  const handleClearCart = () => {
    setCart([]);
    setCustomerName("");
    setCustomerPhone("");
    setPaymentMethod("Cash");
  };

  const handleGenerateOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      onNotify("Cannot process empty ticket. Add some dishes first!", "error");
      return;
    }

    if (!customerName.trim() || !customerPhone.trim()) {
      onNotify("Please provide a Customer Name & Phone Number for the POS ticket.", "error");
      return;
    }

    try {
      // Submitting the order to db!
      const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = cart.reduce((sum, item) => sum + (item.item.price * item.quantity), 0);

      db.addOrder({
        customerName: customerName.trim(),
        phone: customerPhone.trim(),
        items: cart.map(cartItem => ({
          menuItemId: cartItem.item.id,
          name: cartItem.item.name,
          quantity: cartItem.quantity,
          price: cartItem.item.price
        })),
        quantity: totalQty,
        totalPrice: totalPrice,
        paymentMethod: paymentMethod,
        status: "Completed" // POS orders are usually instantly completed
      });

      onNotify("POS Order Completed Successfully", "success");
      handleClearCart();
    } catch (err) {
      onNotify("Failed to compile order. Try again.", "error");
    }
  };

  // Calculations
  const subtotal = cart.reduce((sum, cartItem) => sum + (cartItem.item.price * cartItem.quantity), 0);
  const total = subtotal; // matching "subtotal, total, order summary"

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sans">
      
      {/* Left Panel: Food Items Catalog (8/12 width) */}
      <div className="lg:col-span-7 space-y-6">
        <div>
          <h1 className="font-serif text-3xl font-extrabold text-gray-900 tracking-tight">
            Point of Sale (POS)
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Instantly key in table orders and print receipts.
          </p>
        </div>

        {/* Filters bar */}
        <div className="bg-white border border-neutral-100 p-5 rounded-[2rem] shadow-sm space-y-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
              <Search className="h-4.5 w-4.5" />
            </span>
            <input
              type="text"
              placeholder="Quick search dishes by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF9F5]/40 border border-gray-250 rounded-xl pl-11 pr-4 py-3 text-xs transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-gray-900 font-medium"
            />
          </div>

          {/* Quick Categories filter */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-50">
            {["All", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-[9px] font-extrabold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/15"
                    : "bg-neutral-50 text-gray-500 hover:bg-emerald-50 hover:text-emerald-500 border border-neutral-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of POS Items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const isOOS = item.availability === "Out of Stock";
            return (
              <div
                key={item.id}
                onClick={() => !isOOS && handleAddToCart(item)}
                className={`bg-white border rounded-[1.8rem] p-3 flex flex-col justify-between h-44 cursor-pointer transition-all duration-300 select-none shadow-xs hover:shadow-md ${
                  isOOS 
                    ? "opacity-45 border-dashed border-red-200 cursor-not-allowed bg-red-50/10" 
                    : "border-neutral-100 hover:border-emerald-500/30 hover:scale-[1.02]"
                }`}
              >
                {/* Thumb + price */}
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-100">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-serif font-extrabold text-xs px-2 py-1 rounded-lg">
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                {/* Details */}
                <div className="mt-2 text-left">
                  <h4 className="font-bold text-xs text-gray-900 line-clamp-2 leading-tight">
                    {item.name}
                  </h4>
                  <span className="text-[9px] uppercase font-mono text-gray-400 font-semibold mt-1 block">
                    {item.category}
                  </span>
                </div>

                {/* Status indicator */}
                {isOOS && (
                  <span className="text-[8px] font-bold text-red-600 uppercase tracking-wider block mt-1">
                    Out of Stock
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Panel: Active Receipt (4/12 width) */}
      <div className="lg:col-span-5 bg-white border border-neutral-150 rounded-[2.5rem] p-6 shadow-md flex flex-col justify-between h-[calc(100vh-140px)] sticky top-6 overflow-y-auto">
        
        {/* Ticket Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3.5 border-b border-neutral-100">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-emerald-500" />
              <h3 className="font-serif text-lg font-bold text-gray-900">Active Ticket</h3>
            </div>
            <button 
              onClick={handleClearCart}
              className="text-[10px] font-bold text-gray-400 hover:text-rose-600 transition-colors uppercase tracking-wider cursor-pointer"
            >
              Clear Ticket
            </button>
          </div>

          {/* Customer Input Fields */}
          <div className="grid grid-cols-2 gap-3 bg-neutral-50/65 p-3 rounded-2xl border border-neutral-100">
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-gray-500 mb-1">Customer Name *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-2 flex items-center text-gray-400">
                  <User className="h-3 w-3" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Eleanor"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-white border border-neutral-200 rounded-lg pl-6 pr-2 py-1 text-xs font-semibold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-gray-500 mb-1">Phone Number *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-2 flex items-center text-gray-400">
                  <Phone className="h-3 w-3" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="(555) 728-6724"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-white border border-neutral-200 rounded-lg pl-6 pr-2 py-1 text-xs font-semibold focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Cart Item Rows */}
          <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
            {cart.map((cartItem) => (
              <div 
                key={cartItem.item.id} 
                className="flex items-center justify-between p-2.5 rounded-xl border border-neutral-50 hover:bg-[#FAF9F5]/40 transition-colors text-xs"
              >
                <div className="flex-grow min-w-0 pr-3 text-left">
                  <p className="font-bold text-gray-800 truncate">{cartItem.item.name}</p>
                  <p className="text-[10px] text-gray-400 font-mono mt-0.5">${cartItem.item.price.toFixed(2)} each</p>
                </div>

                {/* Adjust Qty */}
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <button 
                    onClick={() => handleUpdateQty(cartItem.item.id, -1)}
                    className="p-1 rounded-md bg-neutral-100 hover:bg-neutral-200 transition-all cursor-pointer text-gray-600"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="font-bold text-gray-800 text-xs w-6 text-center">{cartItem.quantity}</span>
                  <button 
                    onClick={() => handleUpdateQty(cartItem.item.id, 1)}
                    className="p-1 rounded-md bg-neutral-100 hover:bg-neutral-200 transition-all cursor-pointer text-gray-600"
                  >
                    <Plus className="h-3 w-3" />
                  </button>

                  <button 
                    onClick={() => handleRemoveFromCart(cartItem.item.id)}
                    className="p-1 rounded-md hover:bg-rose-50 text-gray-400 hover:text-rose-600 transition-all cursor-pointer ml-1"
                    title="Remove item"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
            {cart.length === 0 && (
              <div className="py-12 text-center text-gray-400 italic">
                Your POS ticket is empty. Select available menu items on the left.
              </div>
            )}
          </div>
        </div>

        {/* Totals & Complete Area */}
        <div className="space-y-4 pt-4 border-t border-neutral-100 bg-white">
          {/* Subtotal, Total, etc. */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span className="font-mono font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-900 border-t border-neutral-50 pt-2 text-sm">
              <span className="font-bold">Total Due</span>
              <span className="font-mono font-black text-emerald-500 text-base">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment method */}
          <div>
            <label className="block text-[9px] font-bold uppercase tracking-wider text-gray-500 mb-2 text-left">Payment Method</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("Cash")}
                className={`py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider border cursor-pointer transition-all duration-300 ${
                  paymentMethod === "Cash"
                    ? "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/10"
                    : "bg-neutral-50 border-neutral-150 text-gray-600 hover:bg-neutral-100"
                }`}
              >
                Cash
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("Card")}
                className={`py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider border cursor-pointer transition-all duration-300 ${
                  paymentMethod === "Card"
                    ? "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/10"
                    : "bg-neutral-50 border-neutral-150 text-gray-600 hover:bg-neutral-100"
                }`}
              >
                Card
              </button>
            </div>
          </div>

          {/* Complete action */}
          <button
            onClick={handleGenerateOrder}
            className="w-full flex items-center justify-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl uppercase text-xs tracking-wider transition-all cursor-pointer shadow-md shadow-emerald-500/15"
          >
            <CheckCircle className="h-4.5 w-4.5" />
            <span>Complete & Generate Order</span>
          </button>
        </div>

      </div>
    </div>
  );
}
