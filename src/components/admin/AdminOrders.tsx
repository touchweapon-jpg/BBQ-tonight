import { useState, useEffect } from "react";
import { db, Order, OrderStatus } from "../../utils/db";
import { Search, Filter, Trash2, Eye, RefreshCw, X } from "lucide-react";

interface AdminOrdersProps {
  onNotify: (msg: string, type: "success" | "error") => void;
  selectedOrderForModal: Order | null;
  setSelectedOrderForModal: (order: Order | null) => void;
}

export default function AdminOrders({ onNotify, selectedOrderForModal, setSelectedOrderForModal }: AdminOrdersProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const loadOrders = () => {
    setOrders(db.getOrders());
  };

  useEffect(() => {
    loadOrders();
    window.addEventListener("bbq_db_updated", loadOrders);
    return () => window.removeEventListener("bbq_db_updated", loadOrders);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this order? This action is irreversible.")) {
      try {
        db.deleteOrder(id);
        onNotify("Order Deleted Successfully", "success");
      } catch (err) {
        onNotify("Failed to delete order.", "error");
      }
    }
  };

  const handleStatusChange = (order: Order, newStatus: OrderStatus) => {
    try {
      const updated = { ...order, status: newStatus };
      db.updateOrder(updated);
      if (selectedOrderForModal && selectedOrderForModal.id === order.id) {
        setSelectedOrderForModal(updated);
      }
      onNotify(`Order Status Updated to ${newStatus}`, "success");
    } catch (err) {
      onNotify("Failed to update order status.", "error");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statuses: (OrderStatus | "All")[] = ["All", "Pending", "Confirmed", "Preparing", "Ready", "Completed", "Cancelled"];

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-extrabold text-gray-900 tracking-tight">
            Order Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Track and process real-time culinary order transactions.
          </p>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white border border-neutral-100 rounded-[2rem] p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
              <Search className="h-4.5 w-4.5" />
            </span>
            <input
              type="text"
              placeholder="Search by ID, Customer Name, or Phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF9F5]/40 border border-gray-250 rounded-xl pl-11 pr-4 py-3 text-xs transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-gray-900 font-medium"
            />
          </div>

          {/* Quick Refresh */}
          <button 
            onClick={loadOrders}
            className="p-3 bg-neutral-50 hover:bg-neutral-100 border border-neutral-150 rounded-xl text-gray-500 hover:text-emerald-500 transition-all cursor-pointer self-stretch md:self-auto flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="md:hidden">Refresh Data</span>
          </button>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-50">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-4.5 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                statusFilter === st
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/15"
                  : "bg-neutral-50 text-gray-500 hover:bg-emerald-50 hover:text-emerald-500 border border-neutral-100"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table Card */}
      <div className="bg-white border border-neutral-100 rounded-[2.5rem] p-6 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-150">
                <th className="py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Order ID</th>
                <th className="py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Customer Details</th>
                <th className="py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Items</th>
                <th className="py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-right">Total Price</th>
                <th className="py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-center">Payment</th>
                <th className="py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredOrders.map((order) => {
                let badgeColor = "bg-gray-50 text-gray-600 border-gray-200/50";
                if (order.status === "Pending") badgeColor = "bg-amber-50 text-amber-600 border-amber-200/50";
                if (order.status === "Confirmed") badgeColor = "bg-blue-50 text-blue-600 border-blue-200/50";
                if (order.status === "Preparing") badgeColor = "bg-indigo-50 text-indigo-600 border-indigo-200/50";
                if (order.status === "Ready") badgeColor = "bg-teal-50 text-teal-600 border-teal-200/50";
                if (order.status === "Completed") badgeColor = "bg-emerald-50 text-emerald-600 border-emerald-200/50";
                if (order.status === "Cancelled") badgeColor = "bg-rose-50 text-rose-600 border-rose-200/50";

                return (
                  <tr key={order.id} className="hover:bg-[#FAF9F5]/35 group transition-colors">
                    <td className="py-4.5 font-mono font-bold text-gray-900">{order.id}</td>
                    <td className="py-4.5">
                      <p className="font-extrabold text-gray-900 text-sm">{order.customerName}</p>
                      <p className="text-[11px] text-gray-500 font-mono mt-0.5">{order.phone}</p>
                      <p className="text-[10px] text-gray-400 mt-1">
                        {new Date(order.orderTime).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </p>
                    </td>
                    <td className="py-4.5 max-w-xs">
                      <div className="space-y-1">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-[11px] text-gray-600">
                            <span className="truncate pr-2">
                              {item.name} <span className="text-gray-400 font-mono font-bold">x{item.quantity}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-4.5 text-right font-black text-gray-900 text-sm">
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td className="py-4.5 text-center">
                      <span className={`px-2 py-1 rounded-lg font-mono text-[10px] font-bold ${
                        order.paymentMethod === "Cash" 
                          ? "bg-amber-50 text-amber-700 border border-amber-200/40" 
                          : "bg-blue-50 text-blue-700 border border-blue-200/40"
                      }`}>
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="py-4.5">
                      <div className="flex flex-col items-center gap-1.5">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${badgeColor}`}>
                          {order.status}
                        </span>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order, e.target.value as OrderStatus)}
                          className="bg-[#FAF9F5] border border-neutral-150 rounded-lg text-[9px] px-2 py-1 font-bold text-gray-600 cursor-pointer focus:outline-none"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Ready">Ready</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                    <td className="py-4.5 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setSelectedOrderForModal(order)}
                          className="p-2 rounded-xl text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 transition-all cursor-pointer"
                          title="View Order Details"
                        >
                          <Eye className="h-4.5 w-4.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(order.id)}
                          className="p-2 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                          title="Delete Order Record"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-14 text-center text-gray-400 italic">
                    No orders match your current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal overlay */}
      {selectedOrderForModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-2xl max-w-lg w-full overflow-hidden animate-scaleIn">
            <div className="h-16 px-6 border-b border-neutral-150 flex items-center justify-between bg-neutral-50">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs text-gray-400 uppercase tracking-widest font-semibold">Details for</span>
                <span className="font-mono font-bold text-gray-800 text-sm">{selectedOrderForModal.id}</span>
              </div>
              <button 
                onClick={() => setSelectedOrderForModal(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:bg-neutral-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer details */}
              <div className="grid grid-cols-2 gap-4 bg-emerald-50/20 border border-emerald-500/10 p-4.5 rounded-2xl">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Guest Name</span>
                  <p className="font-bold text-gray-800 text-sm">{selectedOrderForModal.customerName}</p>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Phone Contact</span>
                  <p className="font-bold text-gray-800 text-sm font-mono">{selectedOrderForModal.phone}</p>
                </div>
                <div className="col-span-2 pt-2 border-t border-dashed border-emerald-500/10">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Ordered Time</span>
                  <p className="font-medium text-gray-600 text-xs">
                    {new Date(selectedOrderForModal.orderTime).toLocaleString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit"
                    })}
                  </p>
                </div>
              </div>

              {/* Order Items List */}
              <div className="space-y-3">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold block">Items List</span>
                <div className="border border-neutral-100 rounded-2xl divide-y divide-neutral-50 overflow-hidden">
                  {selectedOrderForModal.items.map((item, i) => (
                    <div key={i} className="p-3 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-gray-800">{item.name}</p>
                        <p className="text-gray-400 text-[10px] font-mono">${item.price.toFixed(2)} each</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-600">x{item.quantity}</p>
                        <p className="font-bold text-gray-950">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Totals & Status Controls */}
              <div className="pt-4 border-t border-neutral-150 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="text-left w-full sm:w-auto">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Total Price Due</span>
                  <p className="text-2xl font-serif font-black text-emerald-500">${selectedOrderForModal.totalPrice.toFixed(2)}</p>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-mono">Paid via {selectedOrderForModal.paymentMethod}</p>
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                  <span className="text-xs text-gray-500 font-bold">Status:</span>
                  <select
                    value={selectedOrderForModal.status}
                    onChange={(e) => handleStatusChange(selectedOrderForModal, e.target.value as OrderStatus)}
                    className="bg-[#FAF9F5] border border-neutral-250 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 cursor-pointer focus:outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Ready">Ready</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
