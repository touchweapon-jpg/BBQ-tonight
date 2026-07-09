import { useState, useEffect } from "react";
import { db, Order, Reservation } from "../../utils/db";
import { 
  ShoppingBag, 
  Calendar, 
  UtensilsCrossed, 
  Grid, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Eye
} from "lucide-react";

interface AdminDashboardProps {
  onViewChange: (view: "dashboard" | "orders" | "reservations" | "menu" | "pos" | "customers" | "settings") => void;
  setSelectedOrderForModal: (order: Order | null) => void;
  setSelectedResForModal: (res: Reservation | null) => void;
}

export default function AdminDashboard({ 
  onViewChange, 
  setSelectedOrderForModal, 
  setSelectedResForModal 
}: AdminDashboardProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [menuItemsCount, setMenuItemsCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);

  useEffect(() => {
    const loadData = () => {
      setOrders(db.getOrders());
      setReservations(db.getReservations());
      setMenuItemsCount(db.getMenuItems().length);
      setCategoriesCount(db.getCategories().length);
    };

    loadData();
    window.addEventListener("bbq_db_updated", loadData);
    return () => window.removeEventListener("bbq_db_updated", loadData);
  }, []);

  const todayStr = new Date().toISOString().split("T")[0];

  // Calculations
  const totalOrders = orders.length;
  const todayOrders = orders.filter(o => o.orderTime.startsWith(todayStr)).length;
  const totalReservations = reservations.length;
  const todayReservations = reservations.filter(r => r.date === todayStr).length;

  const statCards = [
    {
      title: "Total Orders",
      value: totalOrders,
      subtitle: "Lifetime volume",
      icon: ShoppingBag,
      color: "bg-emerald-50 text-emerald-500 border-emerald-100",
      view: "orders"
    },
    {
      title: "Today's Orders",
      value: todayOrders,
      subtitle: "Fresh requests today",
      icon: Clock,
      color: "bg-amber-50 text-amber-500 border-amber-100",
      view: "orders"
    },
    {
      title: "Total Reservations",
      value: totalReservations,
      subtitle: "Secured seatings",
      icon: Calendar,
      color: "bg-blue-50 text-blue-500 border-blue-100",
      view: "reservations"
    },
    {
      title: "Today's Reservations",
      value: todayReservations,
      subtitle: "Scheduled for tonight",
      icon: CheckCircle,
      color: "bg-indigo-50 text-indigo-500 border-indigo-100",
      view: "reservations"
    },
    {
      title: "Total Menu Items",
      value: menuItemsCount,
      subtitle: "Culinary listings",
      icon: UtensilsCrossed,
      color: "bg-rose-50 text-rose-500 border-rose-100",
      view: "menu"
    },
    {
      title: "Total Categories",
      value: categoriesCount,
      subtitle: "Diverse flavor families",
      icon: Grid,
      color: "bg-teal-50 text-teal-500 border-teal-100",
      view: "menu"
    }
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Header Greeting */}
      <div>
        <h1 className="font-serif text-3xl font-extrabold text-gray-900 tracking-tight">
          Executive Dashboard
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Real-time insights and operational indicators for BBQ Tonight.
        </p>
      </div>

      {/* Grid of 6 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div 
              key={idx}
              onClick={() => onViewChange(card.view as any)}
              className="bg-white border border-neutral-100 rounded-[2rem] p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group flex items-center justify-between"
            >
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">
                  {card.title}
                </span>
                <p className="text-3xl font-serif font-black text-gray-900 group-hover:text-emerald-500 transition-colors">
                  {card.value}
                </p>
                <span className="text-xs text-gray-400 block">
                  {card.subtitle}
                </span>
              </div>
              <div className={`p-3.5 rounded-2xl border ${card.color} transition-all duration-300 group-hover:scale-105`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders & Reservations Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Recent Orders (7/12 width) */}
        <div className="xl:col-span-7 bg-white border border-neutral-100 rounded-[2.5rem] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div>
              <h3 className="font-serif text-xl font-bold text-gray-900">
                Recent Orders
              </h3>
              <p className="text-xs text-gray-400">Latest active table and POS transactions</p>
            </div>
            <button 
              onClick={() => onViewChange("orders")}
              className="text-xs font-bold text-emerald-500 hover:text-emerald-600 transition-colors cursor-pointer uppercase tracking-wider"
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID</th>
                  <th className="py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                  <th className="py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Qty</th>
                  <th className="py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total</th>
                  <th className="py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                  <th className="py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs">
                {orders.slice(0, 5).map((order) => {
                  let badgeColor = "bg-gray-50 text-gray-600 border-gray-200/50";
                  if (order.status === "Pending") badgeColor = "bg-amber-50 text-amber-600 border-amber-200/50";
                  if (order.status === "Confirmed") badgeColor = "bg-blue-50 text-blue-600 border-blue-200/50";
                  if (order.status === "Preparing") badgeColor = "bg-indigo-50 text-indigo-600 border-indigo-200/50";
                  if (order.status === "Ready") badgeColor = "bg-teal-50 text-teal-600 border-teal-200/50";
                  if (order.status === "Completed") badgeColor = "bg-emerald-50 text-emerald-600 border-emerald-200/50";
                  if (order.status === "Cancelled") badgeColor = "bg-red-50 text-red-600 border-red-200/50";

                  return (
                    <tr key={order.id} className="hover:bg-[#FAF9F5]/30 group transition-colors">
                      <td className="py-3.5 font-mono font-semibold text-gray-700">{order.id}</td>
                      <td className="py-3.5">
                        <p className="font-semibold text-gray-900">{order.customerName}</p>
                        <p className="text-[10px] text-gray-400 font-mono mt-0.5">{order.phone}</p>
                      </td>
                      <td className="py-3.5 text-center font-semibold text-gray-700">{order.quantity}</td>
                      <td className="py-3.5 font-bold text-gray-900">${order.totalPrice.toFixed(2)}</td>
                      <td className="py-3.5">
                        <div className="flex justify-center">
                          <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${badgeColor}`}>
                            {order.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 text-right">
                        <button 
                          onClick={() => setSelectedOrderForModal(order)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 transition-all cursor-pointer inline-flex items-center"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-gray-400 italic">
                      No orders placed yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Reservations (5/12 width) */}
        <div className="xl:col-span-5 bg-white border border-neutral-100 rounded-[2.5rem] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div>
              <h3 className="font-serif text-xl font-bold text-gray-900">
                Recent Bookings
              </h3>
              <p className="text-xs text-gray-400">Latest online table scheduling logs</p>
            </div>
            <button 
              onClick={() => onViewChange("reservations")}
              className="text-xs font-bold text-emerald-500 hover:text-emerald-600 transition-colors cursor-pointer uppercase tracking-wider"
            >
              View All
            </button>
          </div>

          <div className="space-y-4">
            {reservations.slice(0, 5).map((res) => {
              let iconColor = "text-amber-500 bg-amber-50 border-amber-100";
              let statusLabel = "Pending";
              if (res.status === "Confirmed") {
                iconColor = "text-emerald-500 bg-emerald-50 border-emerald-100";
                statusLabel = "Confirmed";
              } else if (res.status === "Cancelled") {
                iconColor = "text-red-500 bg-rose-50 border-rose-100";
                statusLabel = "Cancelled";
              } else if (res.status === "Completed") {
                iconColor = "text-blue-500 bg-blue-50 border-blue-100";
                statusLabel = "Completed";
              }

              return (
                <div 
                  key={res.id} 
                  onClick={() => setSelectedResForModal(res)}
                  className="flex items-center justify-between p-3 rounded-2xl border border-neutral-50 hover:bg-[#FAF9F5]/45 hover:border-emerald-500/10 cursor-pointer transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-xl border ${iconColor}`}>
                      <Calendar className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-gray-900">{res.name}</h4>
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                        {new Date(res.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} at {res.time} • {res.guests} pax
                      </p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border ${
                    res.status === "Pending" ? "bg-amber-50 border-amber-200/50 text-amber-600" :
                    res.status === "Confirmed" ? "bg-emerald-50 border-emerald-200/50 text-emerald-600" :
                    res.status === "Cancelled" ? "bg-rose-50 border-rose-200/50 text-rose-600" :
                    "bg-blue-50 border-blue-200/50 text-blue-600"
                  }`}>
                    {res.status}
                  </span>
                </div>
              );
            })}
            {reservations.length === 0 && (
              <div className="py-10 text-center text-gray-400 italic text-xs">
                No bookings scheduled yet.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
