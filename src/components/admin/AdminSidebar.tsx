import { 
  LayoutDashboard, 
  ShoppingBag, 
  Calendar, 
  UtensilsCrossed, 
  MonitorPlay, 
  Users, 
  Settings as SettingsIcon, 
  LogOut,
  Sparkles,
  X,
  Menu
} from "lucide-react";

export type AdminView = "dashboard" | "orders" | "reservations" | "menu" | "pos" | "customers" | "settings";

interface AdminSidebarProps {
  currentView: AdminView;
  onViewChange: (view: AdminView) => void;
  onLogout: () => void;
  restaurantName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ 
  currentView, 
  onViewChange, 
  onLogout, 
  restaurantName,
  isOpen,
  onClose 
}: AdminSidebarProps) {

  const menuItems = [
    { view: "dashboard" as AdminView, label: "Dashboard", icon: LayoutDashboard },
    { view: "orders" as AdminView, label: "Orders", icon: ShoppingBag },
    { view: "reservations" as AdminView, label: "Reservations", icon: Calendar },
    { view: "menu" as AdminView, label: "Menu Management", icon: UtensilsCrossed },
    { view: "pos" as AdminView, label: "Point of Sale (POS)", icon: MonitorPlay },
    { view: "customers" as AdminView, label: "Customers", icon: Users },
    { view: "settings" as AdminView, label: "Settings", icon: SettingsIcon },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/25 backdrop-blur-xs z-40 lg:hidden transition-opacity" 
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-neutral-150 z-50 transform lg:translate-x-0 lg:static flex flex-col justify-between transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        {/* Upper Brand / Logo Header */}
        <div>
          <div className="h-20 border-b border-neutral-150 px-6 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-emerald-50 rounded-xl text-emerald-500 border border-emerald-500/10">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-serif font-black text-gray-900 leading-none">
                  {restaurantName}
                </h2>
                <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-500 font-bold mt-1 block">
                  Admin Portal
                </span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-lg text-gray-400 hover:bg-neutral-100 lg:hidden cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => {
                    onViewChange(item.view);
                    onClose();
                  }}
                  className={`w-full flex items-center space-x-3.5 px-4.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/15"
                      : "text-gray-600 hover:bg-emerald-50/40 hover:text-emerald-500"
                  }`}
                >
                  <Icon className={`h-4.5 w-4.5 ${isActive ? "text-white" : "text-gray-400 group-hover:text-emerald-500"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Lower Logout Section */}
        <div className="p-4 border-t border-neutral-150">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3.5 px-4.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-all duration-300 cursor-pointer"
          >
            <LogOut className="h-4.5 w-4.5 text-rose-500" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
