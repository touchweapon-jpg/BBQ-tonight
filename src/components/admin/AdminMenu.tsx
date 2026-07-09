import React, { useState, useEffect } from "react";
import { db, AdminMenuItem } from "../../utils/db";
import { Search, Plus, Edit, Trash2, Check, X, Sparkles, Filter } from "lucide-react";

interface AdminMenuProps {
  onNotify: (msg: string, type: "success" | "error") => void;
}

export default function AdminMenu({ onNotify }: AdminMenuProps) {
  const [menuItems, setMenuItems] = useState<AdminMenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Add/Edit modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminMenuItem | null>(null);

  // New item form state
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formAvailability, setFormAvailability] = useState<"Available" | "Out of Stock">("Available");

  const loadMenuData = () => {
    setMenuItems(db.getMenuItems());
    setCategories(db.getCategories());
  };

  useEffect(() => {
    loadMenuData();
    window.addEventListener("bbq_db_updated", loadMenuData);
    return () => window.removeEventListener("bbq_db_updated", loadMenuData);
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormName("");
    setFormCategory(categories[0] || "BBQ");
    setFormDescription("");
    setFormPrice("");
    setFormImage("");
    setFormAvailability("Available");
    setIsModalOpen(true);
  };

  const openEditModal = (item: AdminMenuItem) => {
    setEditingItem(item);
    setFormName(item.name);
    setFormCategory(item.category);
    setFormDescription(item.description);
    setFormPrice(item.price.toString());
    setFormImage(item.image);
    setFormAvailability(item.availability || "Available");
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this menu item?")) {
      try {
        db.deleteMenuItem(id);
        onNotify("Item Deleted Successfully", "success");
      } catch (err) {
        onNotify("Failed to delete item.", "error");
      }
    }
  };

  const handleToggleAvailability = (item: AdminMenuItem) => {
    try {
      const updated: AdminMenuItem = {
        ...item,
        availability: item.availability === "Available" ? "Out of Stock" : "Available"
      };
      db.updateMenuItem(updated);
      onNotify(`${item.name} availability updated!`, "success");
    } catch (err) {
      onNotify("Failed to update availability.", "error");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formName || !formCategory || !formPrice) {
      onNotify("Please fill out all required fields.", "error");
      return;
    }

    const priceNum = parseFloat(formPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      onNotify("Please enter a valid price.", "error");
      return;
    }

    // Default premium fallback image if empty
    const imgUrl = formImage.trim() || "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80";

    try {
      if (editingItem) {
        // Edit mode
        const updated: AdminMenuItem = {
          ...editingItem,
          name: formName,
          category: formCategory as any,
          description: formDescription,
          price: priceNum,
          image: imgUrl,
          availability: formAvailability
        };
        db.updateMenuItem(updated);
        onNotify("Menu Updated Successfully", "success");
      } else {
        // Add mode
        db.addMenuItem({
          name: formName,
          category: formCategory as any,
          description: formDescription,
          price: priceNum,
          image: imgUrl,
          availability: formAvailability,
          tags: ["Freshly Added"]
        });
        onNotify("Menu Added Successfully", "success");
      }
      setIsModalOpen(false);
    } catch (err) {
      onNotify("An error occurred. Please try again.", "error");
    }
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-extrabold text-gray-900 tracking-tight">
            Menu Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Build, structure, and organize the culinary offerings of the restaurant.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-5 rounded-xl uppercase text-xs tracking-wider transition-all cursor-pointer shadow-md shadow-emerald-500/10"
        >
          <Plus className="h-4.5 w-4.5" />
          <span>Add Culinary Item</span>
        </button>
      </div>

      {/* Search and Category Filter Panel */}
      <div className="bg-white border border-neutral-100 rounded-[2rem] p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
              <Search className="h-4.5 w-4.5" />
            </span>
            <input
              type="text"
              placeholder="Search dishes by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF9F5]/40 border border-gray-250 rounded-xl pl-11 pr-4 py-3 text-xs transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-gray-900 font-medium"
            />
          </div>

          {/* Category Dropdown/Selector */}
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <Filter className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full md:w-48 bg-[#FAF9F5] border border-neutral-250 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-700 cursor-pointer focus:outline-none"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid Layout of Menu Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div 
            key={item.id}
            className="bg-white border border-neutral-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Theater */}
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900 border-b border-neutral-50">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover filter brightness-95"
                referrerPolicy="no-referrer"
              />
              <span className={`absolute top-4 left-4 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-lg border shadow-sm ${
                item.availability === "Available"
                  ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                  : "bg-rose-50 text-rose-600 border-rose-200"
              }`}>
                {item.availability === "Available" ? "Available" : "Out of Stock"}
              </span>

              <span className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-emerald-500 font-serif font-black text-lg px-3 py-1 rounded-full shadow-md">
                ${item.price.toFixed(2)}
              </span>
            </div>

            {/* Content area */}
            <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest font-mono text-emerald-500 font-bold">
                  {item.category.toUpperCase()}
                </span>
                <h3 className="font-serif text-lg font-bold text-gray-900 tracking-tight">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                {/* Availability Toggle */}
                <button
                  onClick={() => handleToggleAvailability(item)}
                  className={`text-[9px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    item.availability === "Available"
                      ? "bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100"
                      : "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100"
                  }`}
                >
                  Mark {item.availability === "Available" ? "Out" : "In"}
                </button>

                {/* Edit & Delete row */}
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 bg-neutral-50 hover:bg-emerald-50 text-gray-400 hover:text-emerald-500 rounded-xl transition-all cursor-pointer"
                    title="Edit Item"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-neutral-50 hover:bg-rose-50 text-gray-400 hover:text-rose-600 rounded-xl transition-all cursor-pointer"
                    title="Delete Item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredItems.length === 0 && (
          <div className="col-span-full bg-white border border-neutral-100 rounded-[2.5rem] p-12 text-center text-gray-400 italic">
            No items match your query. Add a new menu item to get started!
          </div>
        )}
      </div>

      {/* Add / Edit Menu Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-2xl max-w-lg w-full overflow-hidden animate-scaleIn">
            <form onSubmit={handleSubmit}>
              <div className="h-16 px-6 border-b border-neutral-150 flex items-center justify-between bg-neutral-50">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-4.5 w-4.5 text-emerald-500" />
                  <span className="font-serif font-black text-gray-800 text-sm">
                    {editingItem ? "Edit Culinary Item" : "Add New Dish"}
                  </span>
                </div>
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:bg-neutral-100 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Food Name */}
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">Food Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Seekh Kabab"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-[#FAF9F5] border border-neutral-250 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-800 focus:outline-none"
                    />
                  </div>

                  {/* Category select */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">Category *</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full bg-[#FAF9F5] border border-neutral-250 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-800 focus:outline-none cursor-pointer"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">Price ($) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="e.g. 15.99"
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      className="w-full bg-[#FAF9F5] border border-neutral-250 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-800 focus:outline-none"
                    />
                  </div>

                  {/* Image URL */}
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">Image URL</label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      className="w-full bg-[#FAF9F5] border border-neutral-250 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-800 focus:outline-none"
                    />
                  </div>

                  {/* Availability */}
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">Availability Status</label>
                    <div className="flex gap-4">
                      <label className="flex items-center space-x-2 text-xs font-bold text-gray-700 cursor-pointer">
                        <input
                          type="radio"
                          name="availability"
                          checked={formAvailability === "Available"}
                          onChange={() => setFormAvailability("Available")}
                          className="text-emerald-500 focus:ring-emerald-500"
                        />
                        <span>Available</span>
                      </label>
                      <label className="flex items-center space-x-2 text-xs font-bold text-gray-700 cursor-pointer">
                        <input
                          type="radio"
                          name="availability"
                          checked={formAvailability === "Out of Stock"}
                          onChange={() => setFormAvailability("Out of Stock")}
                          className="text-emerald-500 focus:ring-emerald-500"
                        />
                        <span>Out of Stock</span>
                      </label>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">Description</label>
                    <textarea
                      rows={3}
                      placeholder="Brief gourmet description of the ingredients and preparation methods..."
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      className="w-full bg-[#FAF9F5] border border-neutral-250 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-800 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Submit buttons */}
                <div className="pt-4 border-t border-neutral-150 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold uppercase rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold uppercase rounded-xl cursor-pointer shadow-md shadow-emerald-500/10"
                  >
                    {editingItem ? "Apply Changes" : "Create Listing"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
