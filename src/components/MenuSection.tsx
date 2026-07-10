/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { MenuCategoryType, MenuItem } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { db } from "../utils/db";
import { 
  Coffee, 
  GlassWater, 
  Sparkles, 
  Flame, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  Utensils,
  Leaf,
  Info
} from "lucide-react";

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryType>("lunch");
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1); // 1 = forward, -1 = backward
  const [menuItems, setMenuItems] = useState(() => db.getMenuItems());

  useEffect(() => {
    const handleUpdate = () => {
      setMenuItems(db.getMenuItems());
    };
    window.addEventListener("bbq_db_updated", handleUpdate);
    return () => window.removeEventListener("bbq_db_updated", handleUpdate);
  }, []);

  const categories: { key: MenuCategoryType; label: string; icon: any }[] = [
    { key: "breakfast", label: "Sunday Brunch", icon: Coffee },
    { key: "lunch", label: "Lunch Affair", icon: Flame },
    { key: "dinner", label: "Signature Dinner", icon: Sparkles },
    { key: "drinks", label: "Artisanal Libations", icon: GlassWater },
  ];

  const filteredItems = menuItems.filter((item) => item.category === activeCategory);
  const activeItem = filteredItems[activeIndex] || filteredItems[0];

  // Reset active index when category changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  const handleNext = () => {
    if (filteredItems.length === 0) return;
    setSlideDirection(1);
    setActiveIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (filteredItems.length === 0) return;
    setSlideDirection(-1);
    setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleSelectIndex = (idx: number) => {
    if (idx === activeIndex) return;
    setSlideDirection(idx > activeIndex ? 1 : -1);
    setActiveIndex(idx);
  };

  // Autoplay cycle every 5 seconds - restarts on change to prevent immediate skip
  useEffect(() => {
    if (filteredItems.length <= 1) return;
    const timer = setInterval(() => {
      setSlideDirection(1);
      setActiveIndex((prev) => (prev + 1) % filteredItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIndex, activeCategory, filteredItems.length]);

  // Premium editorial entry slide animations (coming from right)
  const imageVariants = {
    enter: {
      x: 120,
      opacity: 0,
      scale: 0.98,
    },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 180, damping: 24 },
        opacity: { duration: 0.6 },
        scale: { duration: 0.6 },
      }
    },
    exit: {
      x: -120,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring", stiffness: 180, damping: 24 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      }
    }
  };

  const detailsVariants = {
    enter: {
      x: 100,
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 160, damping: 22, delay: 0.1 },
        opacity: { duration: 0.5, delay: 0.1 },
      }
    },
    exit: {
      x: -100,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 160, damping: 22 },
        opacity: { duration: 0.45 },
      }
    }
  };

  return (
    <section id="menu" className="py-24 bg-gradient-to-b from-emerald-50/15 via-white to-emerald-50/10 scroll-mt-12 overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-[1440px] 3xl:max-w-[1600px] 4xl:max-w-[1728px] 5xl:max-w-[1920px] mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-emerald-700 font-mono text-xs uppercase tracking-[0.3em] font-bold block mb-3">
            Culinary Offerings
          </span>
          <h2 className="font-serif text-4xl md:text-5xl 2xl:text-6xl text-gray-900 tracking-tight font-bold">
            Browse Our Digital Menu
          </h2>
          <div className="h-0.5 w-16 bg-gold-400 mx-auto mt-4" />
          <p className="text-gray-600 mt-5 text-sm md:text-base font-light font-sans leading-relaxed">
            Every dish is handcrafted by our master chefs utilizing organic hand-harvested ingredients, 
            blending heritage culinary wisdom with revolutionary gastronomy.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-14">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                id={`menu-tab-${cat.key}`}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center space-x-2.5 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-sm cursor-pointer ${
                  isActive
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                    : "bg-white text-gray-800 hover:bg-emerald-50 hover:text-emerald-500 border border-neutral-100"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-gray-400 group-hover:text-emerald-500"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* One-by-One Theatrical Showcase Block */}
        {activeItem && (
          <div className="relative max-w-6xl 2xl:max-w-[1320px] 3xl:max-w-[1480px] 4xl:max-w-[1600px] 5xl:max-w-[1800px] mx-auto">
            {/* 
              No rigid card container here! An elegant, open, grid structure floating 
              seamlessly over the body theme background with deep artistic negative space.
            */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
              
              {/* Left Column: Image Theater (7/12 width) */}
              <div className="lg:col-span-7 flex flex-col justify-center relative">
                <div className="relative aspect-[4/3] md:aspect-[16/10] lg:aspect-[1.3] rounded-[3rem] overflow-hidden border border-emerald-950/5 shadow-2xl bg-neutral-950">
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeItem.id}
                      variants={imageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0 w-full h-full"
                    >
                      <img
                        src={activeItem.image}
                        alt={activeItem.name}
                        className="w-full h-full object-cover transform scale-100 filter brightness-95 hover:scale-105 transition-transform duration-[1.5s]"
                        referrerPolicy="no-referrer"
                      />
                      {/* Deep premium shadow framing */}
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent pointer-events-none" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Inner Decorative Framing Line */}
                  <div className="absolute inset-5 border border-white/15 rounded-[2.2rem] pointer-events-none z-10" />

                  {/* Dynamic Floating Badges */}
                  <div className="absolute top-4 left-4 sm:top-8 sm:left-8 flex flex-col space-y-2 z-15">
                    <span className="bg-emerald-950/90 backdrop-blur-md text-gold-300 text-[8px] sm:text-[9px] font-mono font-bold tracking-[0.2em] uppercase px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-xl border border-gold-400/20 shadow-md">
                      Plated Signature
                    </span>
                  </div>

                  {/* Floated Price Label badge */}
                  <div className="absolute top-4 right-4 sm:top-8 sm:right-8 bg-white/95 backdrop-blur-md px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full border border-neutral-150 shadow-lg z-15">
                    <span className="font-serif font-black text-emerald-500 text-sm sm:text-xl">
                      ${activeItem.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Floating Left/Right Arrows */}
                  <div className="absolute inset-x-2 sm:inset-x-6 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-20">
                    <button
                      onClick={handlePrev}
                      className="pointer-events-auto p-2 sm:p-3.5 rounded-full bg-white/90 hover:bg-white text-emerald-500 hover:text-emerald-650 shadow-md active:scale-90 transition-all cursor-pointer backdrop-blur-sm border border-neutral-100"
                      aria-label="Previous Culinary Creation"
                    >
                      <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="pointer-events-auto p-2 sm:p-3.5 rounded-full bg-white/90 hover:bg-white text-emerald-500 hover:text-emerald-650 shadow-md active:scale-90 transition-all cursor-pointer backdrop-blur-sm border border-neutral-100"
                      aria-label="Next Culinary Creation"
                    >
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>

                  {/* Active Slide Step counter */}
                  <div className="absolute bottom-8 left-8 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-white/90 font-mono text-[10px] uppercase tracking-wider z-20 border border-white/10">
                    Dish {activeIndex + 1} of {filteredItems.length}
                  </div>
                </div>
              </div>

              {/* Right Column: Gastronomy Chronicles (5/12 width) - Slides in from right */}
              <div className="lg:col-span-5 flex flex-col justify-between py-2 space-y-10">
                
                {/* Upper Text Content Area */}
                <div className="space-y-6 text-left">
                  
                  {/* Category and Tags header */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-gold-600 font-mono text-[10px] tracking-widest uppercase font-extrabold">
                      <Sparkles className="h-3.5 w-3.5 text-gold-400 animate-pulse" />
                      <span>{categories.find(c => c.key === activeCategory)?.label} Specimen</span>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeItem.id}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-wrap gap-1.5"
                      >
                        {activeItem.availability === "Out of Stock" && (
                          <span
                            className="bg-rose-50 text-rose-700 border border-rose-200 text-[9px] font-bold font-sans tracking-wide uppercase px-2.5 py-1.5 rounded-lg shadow-sm animate-pulse"
                          >
                            Sold Out
                          </span>
                        )}
                        {activeItem.tags && activeItem.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-emerald-50 text-emerald-800 text-[9px] font-bold font-sans tracking-wide uppercase px-2.5 py-1.5 rounded-lg border border-emerald-900/5 shadow-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Name and Description with Stagger animations */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeItem.id}
                      variants={detailsVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="space-y-5"
                    >
                      <h3 className="font-serif text-3xl md:text-5xl 2xl:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
                        {activeItem.name}
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base font-light font-sans leading-relaxed">
                        {activeItem.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Quality Assurance Badges */}
                  <div className="pt-5 border-t border-neutral-200/50 grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2.5 text-xs text-emerald-800">
                      <Leaf className="h-4.5 w-4.5 text-emerald-600 flex-shrink-0" />
                      <span className="font-sans font-medium">100% Organic Sourced</span>
                    </div>
                    <div className="flex items-center space-x-2.5 text-xs text-emerald-800">
                      <Utensils className="h-4.5 w-4.5 text-gold-500 flex-shrink-0" />
                      <span className="font-sans font-medium">Prepared Fresh</span>
                    </div>
                  </div>
                </div>

                {/* Lower Selector Area (The direct thumbnail triggers) */}
                <div className="space-y-4 pt-5 border-t border-neutral-200/50">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase font-semibold">
                      Direct Select Options
                    </span>
                    <span className="text-[10px] text-emerald-700 font-sans font-medium flex items-center space-x-1">
                      <Info className="h-3.5 w-3.5" />
                      <span>Click to swap</span>
                    </span>
                  </div>

                  {/* Grid of other category options */}
                  <div className="grid grid-cols-3 gap-3">
                    {filteredItems.map((item, idx) => {
                      const isSelected = idx === activeIndex;
                      return (
                        <button
                          key={item.id}
                          id={`menu-thumbnail-${item.id}`}
                          onClick={() => handleSelectIndex(idx)}
                          className={`group relative text-left rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer p-1.5 flex flex-col items-center justify-center space-y-1.5 ${
                            isSelected
                              ? "border-emerald-500 bg-white ring-2 ring-emerald-500/15 shadow-lg"
                              : "border-neutral-150 bg-white hover:bg-emerald-50/10 hover:border-emerald-500/30"
                          }`}
                        >
                          <div className="w-full aspect-square rounded-xl overflow-hidden relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className={`w-full h-full object-cover transition-all duration-500 ${
                                isSelected ? "scale-105 saturate-100" : "scale-100 saturate-50 group-hover:saturate-100 group-hover:scale-105"
                              }`}
                              referrerPolicy="no-referrer"
                            />
                            {isSelected && (
                              <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center" />
                            )}
                          </div>
                          
                          {/* Squeezed text label */}
                          <span className={`block text-[9px] font-sans font-bold text-center truncate w-full px-1 ${
                            isSelected ? "text-emerald-500 font-extrabold" : "text-gray-500 group-hover:text-emerald-500"
                          }`}>
                            {item.name.split(" ")[0]}...
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
