import React, { useState, useEffect } from "react";
import { db, Reservation, ReservationStatus } from "../../utils/db";
import { Search, Calendar, Edit, Trash2, Check, X, RefreshCw, Eye, Sparkles } from "lucide-react";

interface AdminReservationsProps {
  onNotify: (msg: string, type: "success" | "error") => void;
  selectedResForModal: Reservation | null;
  setSelectedResForModal: (res: Reservation | null) => void;
}

export default function AdminReservations({ onNotify, selectedResForModal, setSelectedResForModal }: AdminReservationsProps) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRes, setEditingRes] = useState<Reservation | null>(null);

  const loadReservations = () => {
    setReservations(db.getReservations());
  };

  useEffect(() => {
    loadReservations();
    window.addEventListener("bbq_db_updated", loadReservations);
    return () => window.removeEventListener("bbq_db_updated", loadReservations);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this reservation?")) {
      try {
        db.deleteReservation(id);
        onNotify("Reservation Deleted Successfully", "success");
      } catch (err) {
        onNotify("Failed to delete reservation.", "error");
      }
    }
  };

  const handleQuickStatus = (res: Reservation, status: ReservationStatus) => {
    try {
      const updated = { ...res, status };
      db.updateReservation(updated);
      onNotify(status === "Confirmed" ? "Reservation Approved" : `Reservation set to ${status}`, "success");
    } catch (err) {
      onNotify("Failed to update reservation status.", "error");
    }
  };

  const handleEditClick = (res: Reservation) => {
    setEditingRes({ ...res });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRes) return;

    try {
      db.updateReservation(editingRes);
      setIsEditModalOpen(false);
      setEditingRes(null);
      onNotify("Reservation Updated Successfully", "success");
    } catch (err) {
      onNotify("Failed to update reservation.", "error");
    }
  };

  const filteredReservations = reservations.filter((res) => {
    const matchesSearch = 
      res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.phone.includes(searchQuery) ||
      (res.email && res.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      res.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || res.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-extrabold text-gray-900 tracking-tight">
          Reservation Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage guest schedules, table arrangements, and special seating requests.
        </p>
      </div>

      {/* Filters Card */}
      <div className="bg-white border border-neutral-100 rounded-[2rem] p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
              <Search className="h-4.5 w-4.5" />
            </span>
            <input
              type="text"
              placeholder="Search bookings by Guest Name, Phone, Email, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF9F5]/40 border border-gray-250 rounded-xl pl-11 pr-4 py-3 text-xs transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-gray-900 font-medium"
            />
          </div>

          <button 
            onClick={loadReservations}
            className="p-3 bg-neutral-50 hover:bg-neutral-100 border border-neutral-150 rounded-xl text-gray-500 hover:text-emerald-500 transition-all cursor-pointer flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="md:hidden">Refresh</span>
          </button>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-50">
          {["All", "Pending", "Confirmed", "Cancelled", "Completed"].map((st) => (
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

      {/* Table of bookings */}
      <div className="bg-white border border-neutral-100 rounded-[2.5rem] p-6 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-150">
                <th className="py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">ID</th>
                <th className="py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Guest Details</th>
                <th className="py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Date & Time</th>
                <th className="py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-center">Covers</th>
                <th className="py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Special Requests</th>
                <th className="py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredReservations.map((res) => {
                let badgeColor = "bg-gray-50 text-gray-600 border-gray-200/50";
                if (res.status === "Pending") badgeColor = "bg-amber-50 text-amber-600 border-amber-200/50";
                if (res.status === "Confirmed") badgeColor = "bg-emerald-50 text-emerald-600 border-emerald-200/50";
                if (res.status === "Cancelled") badgeColor = "bg-rose-50 text-rose-600 border-rose-200/50";
                if (res.status === "Completed") badgeColor = "bg-blue-50 text-blue-600 border-blue-200/50";

                return (
                  <tr key={res.id} className="hover:bg-[#FAF9F5]/35 group transition-colors">
                    <td className="py-4.5 font-mono font-bold text-gray-700">{res.id}</td>
                    <td className="py-4.5">
                      <p className="font-extrabold text-gray-900 text-sm">{res.name}</p>
                      <p className="text-[11px] text-gray-500 font-mono mt-0.5">{res.phone}</p>
                      {res.email && <p className="text-[10px] text-gray-400 mt-0.5 font-mono">{res.email}</p>}
                    </td>
                    <td className="py-4.5">
                      <p className="font-bold text-gray-900 text-sm">
                        {new Date(res.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </p>
                      <p className="text-gray-500 text-[11px] font-medium mt-0.5">{res.time}</p>
                    </td>
                    <td className="py-4.5 text-center">
                      <span className="bg-gray-100 font-extrabold text-gray-800 text-xs px-2.5 py-1 rounded-md">
                        {res.guests} pax
                      </span>
                    </td>
                    <td className="py-4.5 max-w-xs">
                      {res.specialRequests?.trim() ? (
                        <p className="text-gray-600 text-[11px] leading-relaxed italic line-clamp-2">
                          "{res.specialRequests}"
                        </p>
                      ) : (
                        <span className="text-gray-300 italic">—</span>
                      )}
                    </td>
                    <td className="py-4.5">
                      <div className="flex justify-center">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${badgeColor}`}>
                          {res.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4.5 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        {res.status === "Pending" && (
                          <>
                            <button
                              onClick={() => handleQuickStatus(res, "Confirmed")}
                              className="p-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/35 rounded-lg text-emerald-600 transition-all cursor-pointer"
                              title="Approve / Confirm"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleQuickStatus(res, "Cancelled")}
                              className="p-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200/35 rounded-lg text-rose-600 transition-all cursor-pointer"
                              title="Reject / Cancel"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleEditClick(res)}
                          className="p-1.5 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all cursor-pointer"
                          title="Edit Booking"
                        >
                          <Edit className="h-4.5 w-4.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(res.id)}
                          className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                          title="Delete Record"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredReservations.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-14 text-center text-gray-400 italic">
                    No reservations logged matching your active criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Reservation Modal */}
      {isEditModalOpen && editingRes && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-2xl max-w-lg w-full overflow-hidden animate-scaleIn">
            <form onSubmit={handleEditSubmit}>
              <div className="h-16 px-6 border-b border-neutral-150 flex items-center justify-between bg-neutral-50">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs text-gray-400 uppercase tracking-widest font-semibold">Editing Seating Book</span>
                  <span className="font-mono font-bold text-gray-800 text-sm">{editingRes.id}</span>
                </div>
                <button 
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingRes(null);
                  }}
                  className="p-1.5 rounded-lg text-gray-400 hover:bg-neutral-100 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">Guest Full Name</label>
                    <input
                      type="text"
                      required
                      value={editingRes.name}
                      onChange={(e) => setEditingRes({ ...editingRes, name: e.target.value })}
                      className="w-full bg-[#FAF9F5] border border-neutral-250 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-800 focus:outline-none"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">Phone Number</label>
                    <input
                      type="text"
                      required
                      value={editingRes.phone}
                      onChange={(e) => setEditingRes({ ...editingRes, phone: e.target.value })}
                      className="w-full bg-[#FAF9F5] border border-neutral-250 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-800 focus:outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={editingRes.email || ""}
                      onChange={(e) => setEditingRes({ ...editingRes, email: e.target.value })}
                      className="w-full bg-[#FAF9F5] border border-neutral-250 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-800 focus:outline-none"
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">Dinner Date</label>
                    <input
                      type="date"
                      required
                      value={editingRes.date}
                      onChange={(e) => setEditingRes({ ...editingRes, date: e.target.value })}
                      className="w-full bg-[#FAF9F5] border border-neutral-250 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-800 focus:outline-none"
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">Arrival Time</label>
                    <input
                      type="time"
                      required
                      value={editingRes.time}
                      onChange={(e) => setEditingRes({ ...editingRes, time: e.target.value })}
                      className="w-full bg-[#FAF9F5] border border-neutral-250 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-800 focus:outline-none"
                    />
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">Covers (Guests)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={20}
                      value={editingRes.guests}
                      onChange={(e) => setEditingRes({ ...editingRes, guests: parseInt(e.target.value) || 2 })}
                      className="w-full bg-[#FAF9F5] border border-neutral-250 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-800 focus:outline-none"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">Booking Status</label>
                    <select
                      value={editingRes.status}
                      onChange={(e) => setEditingRes({ ...editingRes, status: e.target.value as ReservationStatus })}
                      className="w-full bg-[#FAF9F5] border border-neutral-250 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-800 focus:outline-none cursor-pointer"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  {/* Special Requests */}
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">Special Requests Note</label>
                    <textarea
                      rows={3}
                      value={editingRes.specialRequests || ""}
                      onChange={(e) => setEditingRes({ ...editingRes, specialRequests: e.target.value })}
                      className="w-full bg-[#FAF9F5] border border-neutral-250 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-800 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4 border-t border-neutral-150 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setEditingRes(null);
                    }}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold uppercase rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold uppercase rounded-xl cursor-pointer shadow-md shadow-emerald-500/10"
                  >
                    Apply Changes
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
