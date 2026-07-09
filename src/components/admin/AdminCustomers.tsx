import { useState, useEffect } from "react";
import { db, Order } from "../../utils/db";
import { Search, Users, TrendingUp, Award, DollarSign, Filter } from "lucide-react";

interface AdminCustomersProps {
  onNotify: (msg: string, type: "success" | "error") => void;
}

interface CustomerMetrics {
  name: string;
  phone: string;
  email: string;
  totalOrders: number;
  totalSpend: number;
  lastOrderDate: string;
}

export default function AdminCustomers({ onNotify }: AdminCustomersProps) {
  const [customers, setCustomers] = useState<CustomerMetrics[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"spend" | "orders" | "name">("spend");

  useEffect(() => {
    const calculateCustomerMetrics = () => {
      const orders = db.getOrders();
      const customerMap = new Map<string, CustomerMetrics>();

      orders.forEach((order) => {
        const key = order.phone.trim();
        const existing = customerMap.get(key);

        if (existing) {
          existing.totalOrders += 1;
          existing.totalSpend += order.totalPrice;
          if (new Date(order.orderTime) > new Date(existing.lastOrderDate)) {
            existing.lastOrderDate = order.orderTime;
          }
        } else {
          customerMap.set(key, {
            name: order.customerName,
            phone: order.phone,
            email: `${order.customerName.toLowerCase().replace(/\s+/g, "")}@example.com`, // beautiful fallback email
            totalOrders: 1,
            totalSpend: order.totalPrice,
            lastOrderDate: order.orderTime
          });
        }
      });

      setCustomers(Array.from(customerMap.values()));
    };

    calculateCustomerMetrics();
    window.addEventListener("bbq_db_updated", calculateCustomerMetrics);
    return () => window.removeEventListener("bbq_db_updated", calculateCustomerMetrics);
  }, []);

  // Filter & Search
  const filteredCustomers = customers.filter((cust) => 
    cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cust.phone.includes(searchQuery) ||
    cust.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (sortBy === "spend") return b.totalSpend - a.totalSpend;
    if (sortBy === "orders") return b.totalOrders - a.totalOrders;
    return a.name.localeCompare(b.name);
  });

  // Insights Metrics
  const totalCustomerCount = customers.length;
  const topSpender = customers.reduce((max, c) => c.totalSpend > (max?.totalSpend || 0) ? c : max, null as CustomerMetrics | null);
  const averageSpend = customers.length > 0 
    ? (customers.reduce((sum, c) => sum + c.totalSpend, 0) / customers.length)
    : 0;

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-extrabold text-gray-900 tracking-tight">
          Customer Insights
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Review guest visitation frequency, historical spending metrics, and loyalty trends.
        </p>
      </div>

      {/* Analytical Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-neutral-100 rounded-[2rem] p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Total Guests List</span>
            <p className="text-2xl font-serif font-black text-gray-900">{totalCustomerCount}</p>
            <span className="text-xs text-gray-400">Unique guest contacts</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-500 border border-emerald-100 rounded-2xl">
            <Users className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white border border-neutral-100 rounded-[2rem] p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-1 text-left">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">VIP Customer</span>
            <p className="text-md font-bold text-gray-950 truncate max-w-[170px]">
              {topSpender ? topSpender.name : "N/A"}
            </p>
            <span className="text-xs text-emerald-500 font-mono font-bold">
              {topSpender ? `$${topSpender.totalSpend.toFixed(2)} spent` : "No purchases"}
            </span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-500 border border-amber-100 rounded-2xl">
            <Award className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white border border-neutral-100 rounded-[2rem] p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Average Spend / Guest</span>
            <p className="text-2xl font-serif font-black text-gray-900">${averageSpend.toFixed(2)}</p>
            <span className="text-xs text-gray-400">Lifetime value index</span>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-500 border border-indigo-100 rounded-2xl">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-neutral-100 rounded-[2rem] p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
              <Search className="h-4.5 w-4.5" />
            </span>
            <input
              type="text"
              placeholder="Search customers by Name, Phone, or Email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF9F5]/40 border border-gray-250 rounded-xl pl-11 pr-4 py-3 text-xs transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-gray-900 font-medium"
            />
          </div>

          {/* Sort selection */}
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <Filter className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full md:w-48 bg-[#FAF9F5] border border-neutral-250 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-700 cursor-pointer focus:outline-none"
            >
              <option value="spend">Sort by Spend (Highest)</option>
              <option value="orders">Sort by Order Count</option>
              <option value="name">Sort by Alphabetical Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer Listing Card */}
      <div className="bg-white border border-neutral-100 rounded-[2.5rem] p-6 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-150">
                <th className="py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Customer Profile</th>
                <th className="py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Contact Information</th>
                <th className="py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-center">Lifetime Orders</th>
                <th className="py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-right">Lifetime Spend</th>
                <th className="py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-right">Last Transaction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {sortedCustomers.map((cust, idx) => (
                <tr key={idx} className="hover:bg-[#FAF9F5]/35 transition-colors">
                  <td className="py-4.5 flex items-center space-x-3 text-left">
                    <div className="w-9 h-9 rounded-full bg-emerald-55/15 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      {cust.name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-extrabold text-gray-900 text-sm">{cust.name}</p>
                      <span className="text-[10px] text-gray-400 tracking-wider uppercase font-mono mt-0.5 block">
                        Level {cust.totalOrders > 5 ? "Platinum VIP" : cust.totalOrders > 2 ? "Gold regular" : "Silver Guest"}
                      </span>
                    </div>
                  </td>
                  <td className="py-4.5 text-left">
                    <p className="font-mono text-gray-800 font-semibold">{cust.phone}</p>
                    <p className="text-[11px] text-gray-400 font-mono mt-0.5">{cust.email}</p>
                  </td>
                  <td className="py-4.5 text-center">
                    <span className="bg-neutral-50 font-extrabold text-gray-800 text-xs px-2.5 py-1 rounded-md border border-neutral-150">
                      {cust.totalOrders} order{cust.totalOrders > 1 && "s"}
                    </span>
                  </td>
                  <td className="py-4.5 text-right font-black text-emerald-500 text-sm">
                    ${cust.totalSpend.toFixed(2)}
                  </td>
                  <td className="py-4.5 text-right text-gray-500 text-[11px] font-mono">
                    {new Date(cust.lastOrderDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </td>
                </tr>
              ))}
              {sortedCustomers.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-14 text-center text-gray-400 italic">
                    No customers found. Place some orders in the POS or website to build a customer database!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
