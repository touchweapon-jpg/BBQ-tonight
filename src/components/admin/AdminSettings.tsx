import React, { useState, useEffect } from "react";
import { db, RestaurantSettings } from "../../utils/db";
import { Settings as SettingsIcon, Save, RotateCcw, Info, Sparkles } from "lucide-react";

interface AdminSettingsProps {
  onNotify: (msg: string, type: "success" | "error") => void;
}

export default function AdminSettings({ onNotify }: AdminSettingsProps) {
  const [settings, setSettings] = useState<RestaurantSettings>({
    restaurantName: "BBQ Tonight",
    phone: "+1 (555) 123-4567",
    email: "contact@bbqtonight.com",
    address: "123 Flame Grill Avenue, Karachi, Pakistan",
    openingHours: "Mon - Sun: 12:00 PM - 11:00 PM",
    restaurantLogo: ""
  });

  const loadSettings = () => {
    setSettings(db.getSettings());
  };

  useEffect(() => {
    loadSettings();
    window.addEventListener("bbq_db_updated", loadSettings);
    return () => window.removeEventListener("bbq_db_updated", loadSettings);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!settings.restaurantName || !settings.phone || !settings.email) {
      onNotify("Restaurant Name, Phone, and Email are required.", "error");
      return;
    }

    try {
      db.updateSettings(settings);
      onNotify("Settings Saved Successfully", "success");
    } catch (err) {
      onNotify("Failed to save settings.", "error");
    }
  };

  const handleResetDatabase = () => {
    if (confirm("DANGER ZONE: This will wipe all current orders, custom reservations, and custom menu changes, resetting the local storage database to the default startup seed. Do you wish to continue?")) {
      try {
        db.resetToSeed();
        onNotify("Database Reset Successfully", "success");
        // Quick short delay to let the toast show, then refresh page to load clean states
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } catch (err) {
        onNotify("Failed to reset database.", "error");
      }
    }
  };

  return (
    <div className="space-y-6 font-sans max-w-3xl text-left">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-extrabold text-gray-900 tracking-tight">
          System Configuration
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Adjust corporate branding, contact details, operational hours, and data backup limits.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        
        {/* Core Profile configuration */}
        <div className="bg-white border border-neutral-100 rounded-[2.5rem] p-6 shadow-sm">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="flex items-center space-x-2 pb-4 border-b border-gray-100">
              <SettingsIcon className="h-5 w-5 text-emerald-500" />
              <h3 className="font-serif text-lg font-bold text-gray-900">Restaurant Settings</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Restaurant Name */}
              <div className="col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                  Restaurant Corporate Name
                </label>
                <input
                  type="text"
                  required
                  value={settings.restaurantName}
                  onChange={(e) => setSettings({ ...settings, restaurantName: e.target.value })}
                  className="w-full bg-[#FAF9F5]/45 border border-gray-250 rounded-xl px-4 py-3 text-xs font-bold text-gray-850 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              {/* Contact phone */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                  Contact Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full bg-[#FAF9F5]/45 border border-gray-250 rounded-xl px-4 py-3 text-xs font-bold text-gray-850 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              {/* Contact email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                  Support Email Address
                </label>
                <input
                  type="email"
                  required
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full bg-[#FAF9F5]/45 border border-gray-250 rounded-xl px-4 py-3 text-xs font-bold text-gray-850 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              {/* Hours */}
              <div className="col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                  Business Operational Hours
                </label>
                <input
                  type="text"
                  required
                  value={settings.openingHours}
                  onChange={(e) => setSettings({ ...settings, openingHours: e.target.value })}
                  className="w-full bg-[#FAF9F5]/45 border border-gray-250 rounded-xl px-4 py-3 text-xs font-bold text-gray-850 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              {/* Address */}
              <div className="col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                  Corporate Physical Location
                </label>
                <textarea
                  rows={3}
                  required
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full bg-[#FAF9F5]/45 border border-gray-250 rounded-xl px-4 py-3 text-xs font-bold text-gray-850 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Submit settings */}
            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl uppercase text-xs tracking-wider transition-all cursor-pointer shadow-md shadow-emerald-500/10"
              >
                <Save className="h-4.5 w-4.5" />
                <span>Save Profile Settings</span>
              </button>
            </div>
          </form>
        </div>

        {/* System & Recovery danger zone */}
        <div className="bg-red-50/15 border border-red-500/10 rounded-[2.5rem] p-6 shadow-xs">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-red-50 text-red-600 rounded-2xl border border-red-100">
              <RotateCcw className="h-6 w-6 animate-spin-slow" />
            </div>
            <div className="space-y-4 text-left flex-grow">
              <div>
                <h4 className="font-serif text-lg font-black text-gray-900">System Disaster Recovery</h4>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                  Reset the local storage database tables to original baseline mockup settings. This will wipe out all currently stored custom items, reservations, orders, and customer logs, restoring the seed catalog state.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleResetDatabase}
                  className="bg-red-650 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-xl text-[10px] uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-red-500/10"
                >
                  Reset System Database
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
