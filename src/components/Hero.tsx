/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowDown, Calendar, Menu, Star, Award } from "lucide-react";
import React, { useState } from "react";

export default function Hero() {
  const [activeHighlight, setActiveHighlight] = useState(0);

  const highlights = [
    {
      title: "Cured Wagyu Fillet",
      desc: "Heirloom beet essence & black winter truffle shavings",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Wild Atlantic Turbot",
      desc: "Infused with sea fennel & organic saffron emulsion",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Artisan Pear Confit",
      desc: "Slow-poached in biological honey & wild lavender",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80",
    }
  ];

  const handleSmoothScroll = (href: string) => {
    const targetElement = document.querySelector(href);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-gold-50 to-emerald-100 flex items-start lg:items-center justify-center overflow-hidden pt-32 sm:pt-40 lg:pt-[13%] pb-16 lg:pb-24"
    >
      {/* Decorative High-End Ambient Lighting Overlays shifted down to leave top pristine */}
      <div className="absolute top-[25%] left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-gold-500/10 rounded-full filter blur-[100px] pointer-events-none" />
      
      {/* Background Micro Texture starting from the content area - Orange/ember colored sparklers */}
      <div className="absolute inset-x-0 bottom-0 top-32 sm:top-40 lg:top-[13%] opacity-[0.035] bg-[radial-gradient(#E65A1E_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Main Grid Wrapper */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Editorial Typography & Copywriting */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          {/* Michelin/Award Floating Pill */}
          <motion.div
            id="hero-badge"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center space-x-2.5 bg-emerald-100/80 border border-gold-400/30 px-4 py-1.5 rounded-full backdrop-blur-md"
          >
            <Award className="h-4 w-4 text-gold-600 animate-pulse" />
            <span className="text-emerald-700 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold font-sans">
              Michelin-Starred Dining Excellence
            </span>
          </motion.div>

          {/* Premium Headline */}
          <div className="space-y-4">
            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl text-emerald-950 tracking-tight leading-[1.1]"
            >
              Where culinary <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-emerald-500 to-emerald-600 italic font-medium pr-1">
                genius
              </span>{" "}
              meets timeless theater.
            </motion.h1>
            
            {/* Elegant visual separating accent rule */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "90px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-[1.5px] bg-gradient-to-r from-emerald-500 to-transparent"
            />
          </div>

          {/* Luxury Tagline Copy */}
          <motion.p
            id="hero-tagline"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-emerald-900/80 font-sans text-base md:text-lg max-w-2xl font-light leading-relaxed"
          >
            BBQ Tonight is an elite wood-fired smokehouse where heritage pitmaster secrets are combined with avant-garde culinary mechanics to craft spectacular dining realities.
          </motion.p>

          {/* Luxury Actions/CTA Grid */}
          <motion.div
            id="hero-actions"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <button
              id="hero-view-menu-btn"
              onClick={() => handleSmoothScroll("#menu")}
              className="flex items-center justify-center space-x-2.5 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-gradient-to-r from-gold-400 via-emerald-500 to-emerald-600 hover:from-gold-300 hover:to-emerald-500 shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/35 active:scale-[0.98] transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
            >
              <Menu className="h-4 w-4 text-white" />
              <span>Explore The Menu</span>
            </button>
            
            <button
              id="hero-reserve-btn"
              onClick={() => handleSmoothScroll("#reservation")}
              className="flex items-center justify-center space-x-2.5 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest text-emerald-550 border border-emerald-500/30 bg-white hover:bg-emerald-50 hover:text-emerald-600 active:scale-[0.98] shadow-lg transition-all duration-300 cursor-pointer"
            >
              <Calendar className="h-4 w-4 text-gold-500" />
              <span>Reserve Seating</span>
            </button>
          </motion.div>

          {/* Quick Elite Stats Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="grid grid-cols-3 gap-3 xs:gap-6 pt-8 border-t border-emerald-200 max-w-lg"
          >
            <div>
              <span className="block font-serif text-sm xs:text-base sm:text-xl lg:text-2xl font-black text-emerald-500">3 Michelin</span>
              <span className="block text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-gray-500 font-mono mt-0.5">Rating Guide</span>
            </div>
            <div>
              <span className="block font-serif text-sm xs:text-base sm:text-xl lg:text-2xl font-black text-emerald-500">100% Raw</span>
              <span className="block text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-gray-500 font-mono mt-0.5">Organic Certified</span>
            </div>
            <div>
              <span className="block font-serif text-sm xs:text-base sm:text-xl lg:text-2xl font-black text-emerald-500">98% Pure</span>
              <span className="block text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-gray-500 font-mono mt-0.5">Guest Satisfaction</span>
            </div>
          </motion.div>

        </div>

        {/* Right Side: Ultra-Modern Multi-Layer Interactive Collage */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center w-full max-w-md lg:max-w-none mx-auto">
          
          {/* Main Portrait Frame with arch curves */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-gold-400/30 shadow-2xl group"
          >
            <img
              src={highlights[activeHighlight].image}
              alt={highlights[activeHighlight].title}
              className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[2s] brightness-95"
              referrerPolicy="no-referrer"
            />
            
            {/* Elegant dark vignette shade */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent opacity-80" />

            {/* Inner Golden border framing */}
            <div className="absolute inset-3 border border-gold-400/25 rounded-[2rem] pointer-events-none" />

            {/* Chef Highlight Caption details */}
            <div className="absolute bottom-6 left-6 right-6 text-left z-20 space-y-1">
              <span className="inline-block bg-gold-500/25 border border-gold-400/30 text-gold-100 text-[8px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-md backdrop-blur-sm">
                Active Chef Highlight
              </span>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-white tracking-tight">
                {highlights[activeHighlight].title}
              </h3>
              <p className="text-gray-300 text-xs font-light">
                {highlights[activeHighlight].desc}
              </p>
            </div>
          </motion.div>

          {/* Interactive highlight togglers */}
          <div className="flex space-x-2 mt-4 z-20">
            {highlights.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveHighlight(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  activeHighlight === idx ? "w-8 bg-emerald-500" : "w-2.5 bg-emerald-200 hover:bg-emerald-300"
                }`}
                aria-label={`Show highlight ${idx + 1}`}
              />
            ))}
          </div>

          {/* Small floating guest badge overlay */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute -top-4 -right-4 bg-white/95 border border-gold-400/30 rounded-2xl p-4.5 shadow-xl backdrop-blur-md hidden sm:flex items-center space-x-3 max-w-[200px]"
          >
            <div className="flex -space-x-2">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&fit=crop" className="w-8 h-8 rounded-full border border-white object-cover" />
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&fit=crop" className="w-8 h-8 rounded-full border border-white object-cover" />
            </div>
            <div className="text-left">
              <div className="flex items-center space-x-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-2.5 h-2.5 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <p className="text-[10px] text-emerald-950 font-semibold mt-0.5">12k+ Elite Bookings</p>
            </div>
          </motion.div>

        </div>

      </div>

      {/* Modern, elegant downward arrow with micro interaction */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden lg:block">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="cursor-pointer flex flex-col items-center space-y-1 opacity-60 hover:opacity-100 transition-opacity"
          onClick={() => handleSmoothScroll("#menu")}
        >
          <span className="text-[9px] uppercase tracking-[0.25em] text-emerald-800 font-mono">
            Scroll to Feast
          </span>
          <ArrowDown className="h-4 w-4 text-emerald-500" />
        </motion.div>
      </div>

    </section>
  );
}

