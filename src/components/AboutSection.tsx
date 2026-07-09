/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RESTAURANT_INFO } from "../data";
import { Award, Clock, Leaf, Shield, User } from "lucide-react";
import { motion } from "motion/react";

export default function AboutSection() {
  const { tagline, description, chef, hours, stats } = RESTAURANT_INFO;

  return (
    <section id="about" className="py-24 bg-[#FAF9F5] scroll-mt-12 overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-[1440px] 3xl:max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-emerald-500 font-mono text-xs uppercase tracking-[0.3em] font-semibold block">
              Our Heritage & Story
            </span>
            <h2 className="font-serif text-4xl md:text-5xl 2xl:text-6xl text-gray-900 tracking-tight font-bold">
              Gastronomy Crafted <br />With Soul & Integrity
            </h2>
            <div className="h-0.5 w-16 bg-gold-400" />
            
            <p className="font-serif text-lg text-emerald-600 italic font-medium">
              "{tagline}"
            </p>
            <p className="text-gray-600 font-sans text-sm md:text-base font-light leading-relaxed">
              {description}
            </p>
            
            {/* Core Values badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center space-x-3 bg-white p-4.5 rounded-2xl border border-neutral-100 shadow-sm">
                <div id="about-value-1" className="p-2.5 bg-emerald-50 rounded-xl text-emerald-500">
                  <Leaf className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">100% Organic</h4>
                  <p className="text-gray-400 text-[11px]">Direct farm-to-table supply</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 bg-white p-4.5 rounded-2xl border border-neutral-100 shadow-sm">
                <div id="about-value-2" className="p-2.5 bg-emerald-50 rounded-xl text-emerald-500">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Culinary Rigor</h4>
                  <p className="text-gray-400 text-[11px]">No synthetic chemical agents</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Showcase (Story Photo) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl z-10 border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80"
                alt="Chef plating exquisite recipe"
                className="w-full h-full object-cover transform hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative Gold Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-100/30 rounded-full filter blur-xl opacity-70" />
            <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-gold-200/20 rounded-full filter blur-xl opacity-60" />
          </div>
        </div>

        {/* Dynamic Numerical Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 bg-white border border-neutral-100 rounded-3xl p-6 md:p-12 shadow-md mb-24">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className={`text-center space-y-1.5 py-2 ${
                idx % 2 === 0 ? "border-r border-neutral-100" : "lg:border-r lg:border-neutral-100"
              } ${idx === 1 ? "lg:border-r" : ""} ${idx === 2 ? "border-r lg:border-r" : ""} ${idx === 3 ? "border-r-0" : ""}`}
            >
              <span className="font-serif text-2xl xs:text-3xl md:text-4xl lg:text-5xl font-black text-emerald-800 block">
                {stat.value}
              </span>
              <span className="text-gray-500 text-[10px] md:text-[11px] font-sans font-semibold uppercase tracking-wider block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Chef Introduction & Opening Hours Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Chef Card */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ y: -6, boxShadow: "0 25px 50px -12px rgba(4, 47, 31, 0.08)" }}
            className="lg:col-span-7 bg-white rounded-[2.5rem] border border-emerald-950/5 shadow-xl shadow-emerald-950/[0.02] p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start transition-all duration-500 hover:bg-gradient-to-br hover:from-white hover:to-emerald-50/25 group relative overflow-hidden"
          >
            {/* Absolute accent ornament inside the card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full filter blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 border border-emerald-100/50 relative group-hover:border-gold-400/30 transition-colors duration-500 bg-neutral-100">
              <img
                src={chef.image}
                alt={chef.name}
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-emerald-950/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            <div className="space-y-4 flex-grow text-left relative z-10">
              <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 text-[10px] font-extrabold tracking-widest uppercase px-3.5 py-1.5 rounded-lg border border-emerald-900/5 shadow-sm">
                <User className="h-3.5 w-3.5 text-gold-500" />
                <span>Meet Our Visionary</span>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-serif text-2xl md:text-3xl font-black text-gray-900 tracking-tight transition-colors duration-300 group-hover:text-emerald-900">
                  {chef.name}
                </h3>
                <p className="text-gold-600 text-[10px] md:text-xs tracking-[0.2em] font-mono uppercase font-bold">
                  {chef.role}
                </p>
              </div>

              <div className="h-[1.5px] bg-neutral-200/50 w-full group-hover:bg-gold-400/30 transition-colors duration-500" />
              
              <p className="text-gray-500 text-xs md:text-sm font-light leading-relaxed font-sans">
                {chef.bio}
              </p>
              
              {/* Extra visual element: Signature styled mark */}
              <div className="pt-2 flex items-center space-x-3 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                <span className="font-serif text-emerald-900 font-extrabold italic text-lg tracking-wider">
                  M. {chef.name.split(" ").pop()}
                </span>
                <span className="text-gray-300">|</span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400">
                  Executive Chef Signature
                </span>
              </div>
            </div>
          </motion.div>

          {/* Opening Hours Card */}
          <div className="lg:col-span-5 bg-emerald-950 rounded-3xl p-8 md:p-10 text-white flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-32 h-32 bg-gold-500/10 rounded-full filter blur-xl" />
            
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gold-400" />
                <h3 className="font-serif text-xl md:text-2xl font-bold tracking-tight text-white">
                  Opening Schedules & Hours
                </h3>
              </div>
              <p className="text-gray-300 font-sans text-xs leading-relaxed">
                Please refer below lock hours for dining scheduling. Walk-in seating stops 30 minutes before closing time.
              </p>
              
              <div className="space-y-3 pt-2">
                {hours.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs md:text-sm">
                    <span className="text-gray-300 font-medium">{item.days}</span>
                    <span className="font-mono text-gold-400 text-right">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 mt-6 flex justify-between items-center">
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest block">
                  Location Coordinates
                </span>
                <span className="text-white text-xs font-semibold">
                  472 Gourmet Blvd, NY
                </span>
              </div>
              <div className="inline-flex items-center space-x-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs hover:bg-white/10 transition-colors">
                <Award className="h-3.5 w-3.5 text-gold-400" />
                <span className="text-gray-300">Valet Parking Available</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
