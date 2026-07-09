import { useState, useEffect } from "react";
import AdminLogin from "./AdminLogin";
import AdminSidebar, { AdminView } from "./AdminSidebar";
import AdminDashboard from "./AdminDashboard";
import AdminOrders from "./AdminOrders";
import AdminReservations from "./AdminReservations";
import AdminMenu from "./AdminMenu";
import AdminPOS from "./AdminPOS";
import AdminCustomers from "./AdminCustomers";
import AdminSettings from "./AdminSettings";
import { db, Order, Reservation } from "../../utils/db";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, 
  Sparkles, 
  Bell, 
  CheckCircle2, 
  XCircle, 
  User, 
  Home,
  Info
} from "lucide-react";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error";
}

interface AdminPanelProps {
  onBackToClient: () => void;
}

export default function AdminPanel({ onBackToClient }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<AdminView>("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Modal shares across dashboard / orders / reservations
  const [selectedOrderForModal, setSelectedOrderForModal] = useState<Order | null>(null);
  const [selectedResForModal, setSelectedResForModal] = useState<Reservation | null>(null);

  const settings = db.getSettings();

  useEffect(() => {
    // Check local storage session
    const session = localStorage.getItem("bbq_admin_session");
    if (session === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    triggerNotification("Logged in successfully as Administrator", "success");
  };

  const handleLogout = () => {
    localStorage.removeItem("bbq_admin_session");
    setIsAuthenticated(false);
    triggerNotification("Administrator session terminated", "success");
  };

  const triggerNotification = (message: string, type: "success" | "error") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Automatically dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const renderActiveView = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <AdminDashboard 
            onViewChange={(view) => setCurrentView(view)} 
            setSelectedOrderForModal={(order) => {
              setSelectedOrderForModal(order);
              setCurrentView("orders");
            }}
            setSelectedResForModal={(res) => {
              setSelectedResForModal(res);
              setCurrentView("reservations");
            }}
          />
        );
      case "orders":
        return (
          <AdminOrders 
            onNotify={triggerNotification} 
            selectedOrderForModal={selectedOrderForModal}
            setSelectedOrderForModal={setSelectedOrderForModal}
          />
        );
      case "reservations":
        return (
          <AdminReservations 
            onNotify={triggerNotification} 
            selectedResForModal={selectedResForModal}
            setSelectedResForModal={setSelectedResForModal}
          />
        );
      case "menu":
        return <AdminMenu onNotify={triggerNotification} />;
      case "pos":
        return <AdminPOS onNotify={triggerNotification} />;
      case "customers":
        return <AdminCustomers onNotify={triggerNotification} />;
      case "settings":
        return <AdminSettings onNotify={triggerNotification} />;
      default:
        return <AdminDashboard onViewChange={setCurrentView} setSelectedOrderForModal={setSelectedOrderForModal} setSelectedResForModal={setSelectedResForModal} />;
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex overflow-hidden text-[#1C1D1F]">
      
      {/* Sidebar navigation */}
      <AdminSidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={handleLogout}
        restaurantName={settings.restaurantName}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header Bar */}
        <header className="h-20 bg-white border-b border-neutral-150 px-4 sm:px-6 lg:px-8 flex items-center justify-between flex-shrink-0 sticky top-0 z-35 shadow-xs">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-xl text-gray-500 hover:bg-neutral-50 lg:hidden cursor-pointer"
            >
              <Menu className="h-5.5 w-5.5" />
            </button>
            <div className="hidden sm:flex items-center space-x-2 text-xs text-gray-400 font-mono tracking-wider font-semibold uppercase">
              <Home className="h-3.5 w-3.5" />
              <span>/</span>
              <span>Admin</span>
              <span>/</span>
              <span className="text-emerald-550">{currentView}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Back to Client Site button */}
            <button
              onClick={onBackToClient}
              className="flex items-center space-x-2 bg-neutral-100 hover:bg-neutral-200 text-gray-700 font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer"
            >
              <Home className="h-4 w-4" />
              <span className="hidden md:inline">Customer Site</span>
            </button>

            {/* Profile Avatar indicator */}
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center font-bold">
              A
            </div>
          </div>
        </header>

        {/* Dynamic Inner Panel viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderActiveView()}
          </div>
        </main>
      </div>

      {/* Toast notifications overlay stack */}
      <div className="fixed top-6 right-6 z-[120] flex flex-col space-y-3 pointer-events-none max-w-sm w-full">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
              className={`p-4 rounded-2xl border shadow-xl flex items-start space-x-3 pointer-events-auto bg-white ${
                toast.type === "success" 
                  ? "border-emerald-500/15 text-emerald-950" 
                  : "border-red-500/15 text-red-950"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              )}
              <div className="text-left">
                <p className="font-sans font-bold text-xs">
                  {toast.type === "success" ? "Operation Succeeded" : "Operation Failed"}
                </p>
                <p className="font-sans text-xs text-gray-500 mt-1 leading-relaxed">
                  {toast.message}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
