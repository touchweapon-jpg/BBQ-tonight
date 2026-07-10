/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useId } from "react";
import { 
  Calendar as CalendarIcon, 
  Users, 
  Clock, 
  User, 
  Phone, 
  Sparkles, 
  CheckCircle, 
  Loader2, 
  CalendarCheck,
  RotateCcw
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ReservationData } from "../types";
import { db } from "../utils/db";

export default function ReservationSection() {
  const [formData, setFormData] = useState<ReservationData>({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    specialRequests: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ReservationData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successData, setSuccessData] = useState<ReservationData | null>(null);
  const [bookingCode, setBookingCode] = useState("");

  const nameInputId = useId();
  const phoneInputId = useId();
  const dateInputId = useId();
  const timeInputId = useId();
  const guestsInputId = useId();
  const requestInputId = useId();

  // Block yesterday/past dates by setting min attribute to today's date
  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" ? parseInt(value) || 2 : value,
    }));

    // Clear specific error as user types
    if (errors[name as keyof ReservationData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ReservationData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required to secure the reservation.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Contact phone number is required.";
    } else {
      // Basic phone regex validation
      const cleanPhone = formData.phone.replace(/[^0-9]/g, "");
      if (cleanPhone.length < 9) {
        newErrors.phone = "Please enter a valid phone number (at least 9 digits).";
      }
    }

    if (!formData.date) {
      newErrors.date = "Please select a dining date.";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "Reservations are not available for past dates.";
      }
    }

    if (!formData.time) {
      newErrors.time = "Please select your preferred arrival time.";
    }

    if (formData.guests < 1 || formData.guests > 12) {
      newErrors.guests = "For parties exceeding 12 guests, please call us directly.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate luxury API booking delay
    setTimeout(() => {
      // Create random unique reference code
      const randNum = Math.floor(1000 + Math.random() * 9000);
      const code = `SV-${formData.date.replace(/-/g, "").substring(2, 6)}-X${randNum}`;
      
      // Save reservation to local database
      db.addReservation({
        name: formData.name,
        phone: formData.phone,
        email: "",
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        specialRequests: formData.specialRequests || "",
        status: "Pending"
      });

      setBookingCode(code);
      setSuccessData(formData);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1800);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      date: "",
      time: "",
      guests: 2,
      specialRequests: "",
    });
    setErrors({});
    setIsSuccess(false);
    setSuccessData(null);
  };

  return (
    <section id="reservation" className="py-24 bg-white scroll-mt-12 group">
      <div className="max-w-7xl 2xl:max-w-[1440px] 3xl:max-w-[1600px] 4xl:max-w-[1728px] 5xl:max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Reservation Story Banner Section */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <span className="text-emerald-700 font-mono text-xs uppercase tracking-[0.3em] font-semibold">
              Tables & Private Lounges
            </span>
            <h2 className="font-serif text-4xl md:text-5xl 2xl:text-6xl text-gray-900 tracking-tight font-bold">
              Secure Your Culinary Experience
            </h2>
            <p className="text-gray-600 font-sans text-sm md:text-base font-light leading-relaxed">
              We recommend reserving tables up to 30 days in advance to secure premium lounge slots. Walk-ins are seated on a limited first-come, first-served schedule depending on dining volume.
            </p>
            
            <div className="pt-4 border-t border-gray-100 flex flex-col space-y-4">
              <div className="flex items-start space-x-3.5">
                <div id="res-badge-1" className="p-2.5 bg-emerald-50 rounded-lg text-emerald-700 mt-1">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Custom Celebrations</h4>
                  <p className="text-gray-500 text-xs mt-0.5">Complementary artisan dessert plaques for birthdays and anniversaries.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3.5">
                <div id="res-badge-2" className="p-2.5 bg-emerald-50 rounded-lg text-emerald-700 mt-1">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Grace Period Guarantee</h4>
                  <p className="text-gray-500 text-xs mt-0.5">We maintain allocated table arrangements for up to 15 minutes past the booking time.</p>
                </div>
              </div>
            </div>
            
            <div className="p-5 bg-gradient-to-tr from-emerald-800 to-emerald-950 rounded-3xl text-white shadow-lg shadow-emerald-950/15 mt-4">
              <span className="font-mono text-[9px] uppercase tracking-widest font-bold opacity-80 block">
                Direct Booking Support
              </span>
              <p className="font-serif text-2xl font-bold mt-1 text-gold-300">+1 (555) 728-6724</p>
              <p className="text-[11px] opacity-90 mt-0.5">Need customized private arrangements or parties larger than 12 guests?</p>
            </div>
          </div>

          {/* Booking Slate Box / Cards Stack */}
          <div className="lg:col-span-7 bg-[#FAF9F5] border border-neutral-100 p-5 sm:p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-200/50">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                // FORM STATE
                <motion.form
                  key="booking-form"
                  id="booking-input-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <h3 className="font-serif text-2xl lg:text-3xl text-gray-900 font-bold mb-2">
                    Online Table Scheduler
                  </h3>
                  <p className="text-xs text-gray-500 -mt-2">
                    Complete the details below to initialize real-time seating availability.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                    {/* Guest Name */}
                    <div className="flex flex-col">
                      <label htmlFor={nameInputId} className="text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                        Your Full Name
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                          <User className="h-4.5 w-4.5" />
                        </span>
                        <input
                          id={nameInputId}
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Lord Alexander Sterling"
                          className={`w-full bg-white border rounded-xl pl-11 pr-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 ${
                            errors.name
                              ? "border-red-400 focus:ring-red-200 focus:border-red-500"
                              : "border-gray-250 focus:ring-emerald-500/55 focus:border-emerald-500"
                          }`}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-500 text-[11px] font-medium mt-1.5">{errors.name}</p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col">
                      <label htmlFor={phoneInputId} className="text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                          <Phone className="h-4.5 w-4.5" />
                        </span>
                        <input
                          id={phoneInputId}
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(555) 000-0000"
                          className={`w-full bg-white border rounded-xl pl-11 pr-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 ${
                            errors.phone
                              ? "border-red-400 focus:ring-red-200 focus:border-red-500"
                              : "border-gray-250 focus:ring-emerald-500/55 focus:border-emerald-500"
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-[11px] font-medium mt-1.5">{errors.phone}</p>
                      )}
                    </div>

                    {/* Date Picker */}
                    <div className="flex flex-col">
                      <label htmlFor={dateInputId} className="text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                          <CalendarIcon className="h-4.5 w-4.5" />
                        </span>
                        <input
                          id={dateInputId}
                          type="date"
                          name="date"
                          min={getTodayDateString()}
                          value={formData.date}
                          onChange={handleInputChange}
                          className={`w-full bg-white border rounded-xl pl-11 pr-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 ${
                            errors.date
                              ? "border-red-400 focus:ring-red-200 focus:border-red-500"
                              : "border-gray-250 focus:ring-emerald-500/55 focus:border-emerald-500"
                          }`}
                        />
                      </div>
                      {errors.date && (
                        <p className="text-red-500 text-[11px] font-medium mt-1.5">{errors.date}</p>
                      )}
                    </div>

                    {/* Time Picker */}
                    <div className="flex flex-col">
                      <label htmlFor={timeInputId} className="text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                        Arrival Time
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                          <Clock className="h-4.5 w-4.5" />
                        </span>
                        <select
                          id={timeInputId}
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className={`w-full bg-white border rounded-xl pl-11 pr-4 py-3 text-sm appearance-none transition-all focus:outline-none focus:ring-2 ${
                            errors.time
                              ? "border-red-400 focus:ring-red-200 focus:border-red-500"
                              : "border-gray-250 focus:ring-emerald-500/55 focus:border-emerald-500"
                          }`}
                        >
                          <option value="">Choose seating slot</option>
                          <option value="17:00">5:00 PM (Dinner Opening)</option>
                          <option value="17:30">5:30 PM</option>
                          <option value="18:00">6:00 PM</option>
                          <option value="18:30">6:30 PM</option>
                          <option value="19:00">7:00 PM (Premium Hour)</option>
                          <option value="19:30">7:30 PM (Premium Hour)</option>
                          <option value="20:00">8:00 PM</option>
                          <option value="20:30">8:30 PM</option>
                          <option value="21:00">9:00 PM</option>
                          <option value="21:30">9:30 PM (Late Seating)</option>
                        </select>
                      </div>
                      {errors.time && (
                        <p className="text-red-500 text-[11px] font-medium mt-1.5">{errors.time}</p>
                      )}
                    </div>

                    {/* Number of Guests */}
                    <div className="flex flex-col md:col-span-2">
                      <label htmlFor={guestsInputId} className="text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                        Total Table Guests
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                          <Users className="h-4.5 w-4.5" />
                        </span>
                        <select
                          id={guestsInputId}
                          name="guests"
                          value={formData.guests}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/55 focus:border-emerald-500 transition-all"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? "Guest" : "Guests"}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div className="flex flex-col md:col-span-2">
                      <label htmlFor={requestInputId} className="text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                        Dietary Notes & Special Occasions (Optional)
                      </label>
                      <textarea
                        id={requestInputId}
                        name="specialRequests"
                        rows={3}
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        placeholder="E.g., Gluten allergy, Celebrating a 10th anniversary, Requesting window seating if possible..."
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/55 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <button
                    id="reservation-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 cursor-pointer flex items-center justify-center space-x-3 bg-gradient-to-r from-gold-400 via-emerald-500 to-emerald-600 text-white font-bold py-4 rounded-xl uppercase hover:from-gold-350 hover:to-emerald-550 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transform hover:scale-[1.01]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Verifying table seating records...</span>
                      </>
                    ) : (
                      <>
                        <span>Request Table Booking</span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                // SUCCESS CONFIRMATION STATE
                <motion.div
                  key="booking-success"
                  id="booking-success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center py-6 text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-5 relative">
                    <CheckCircle className="h-9 w-9" />
                    <span className="absolute inset-0 bg-green-400/20 rounded-full animate-ping [animation-duration:1.5s]" />
                  </div>

                  <h3 className="font-serif text-3xl font-bold text-gray-900 mb-2">
                    Seating Secured!
                  </h3>
                  <p className="text-emerald-700 text-sm font-semibold uppercase tracking-widest font-sans mb-6">
                    Reservation Confirmed
                  </p>
 
                  {/* Booking Receipt Summary Card */}
                  <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm w-full max-w-md text-left mb-8 space-y-4">
                    <div className="border-b border-dashed border-gray-200 pb-3.5 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">
                          Receipt Code
                        </span>
                        <p className="font-mono text-sm font-bold text-gray-800">{bookingCode}</p>
                      </div>
                      <div className="bg-emerald-50 px-3 py-1.5 rounded-lg text-emerald-800 font-bold text-xs flex items-center space-x-1 border border-emerald-900/5">
                        <CalendarCheck className="h-3.5 w-3.5" />
                        <span>Booked</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-xs">
                      <div>
                        <span className="text-gray-400 uppercase tracking-widest text-[9px] block">
                          Guest Name
                        </span>
                        <span className="font-semibold text-gray-800 text-sm">
                          {successData?.name}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400 uppercase tracking-widest text-[9px] block">
                          Contact Call
                        </span>
                        <span className="font-semibold text-gray-800 text-sm">
                          {successData?.phone}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400 uppercase tracking-widest text-[9px] block">
                          Date Of Dinner
                        </span>
                        <span className="font-semibold text-gray-800 text-sm">
                          {successData ? new Date(successData.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }) : ""}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400 uppercase tracking-widest text-[9px] block">
                          Scheduled Arrival
                        </span>
                        <span className="font-semibold text-gray-800 text-sm">
                          {successData?.time ? (
                            (() => {
                              const [hStr, mStr] = successData.time.split(":");
                              const Hours = parseInt(hStr);
                              const ampm = Hours >= 12 ? "PM" : "AM";
                              const Displayh = Hours % 12 || 12;
                              return `${Displayh}:${mStr} ${ampm}`;
                            })()
                          ) : ""}
                        </span>
                      </div>
                      <div className="col-span-2 pt-2 border-t border-gray-50 flex justify-between items-center">
                        <span className="text-gray-400 uppercase tracking-widest text-[9px]">
                          Table Reserved For
                        </span>
                        <span className="bg-gray-100 text-gray-800 px-2.5 py-1 rounded-md font-bold text-xs">
                          {successData?.guests} {successData?.guests === 1 ? "Guest" : "Guests"}
                        </span>
                      </div>
                    </div>

                    {successData?.specialRequests?.trim() && (
                      <div className="bg-emerald-50/40 p-3 rounded-lg border border-emerald-100/50">
                        <span className="text-emerald-800 uppercase tracking-widest text-[8px] font-bold block mb-1">
                          Special Requirements Note
                        </span>
                        <p className="text-gray-600 text-xs leading-relaxed italic">
                          "{successData.specialRequests}"
                        </p>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-500 text-xs px-4 leading-relaxed max-w-sm mb-6">
                    A text notification and digital invitation card have been dispatched to your phone. We can't wait to serve you!
                  </p>

                  <button
                    id="reservation-reset-btn"
                    onClick={handleReset}
                    className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl text-xs uppercase tracking-widest transition-all cursor-pointer"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Reschedule / Book Another</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
