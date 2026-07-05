/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { GALLERY_ITEMS } from "../data";
import { GalleryItem } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<"all" | "ambiance" | "plating" | "culinary">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filters: { key: "all" | "ambiance" | "plating" | "culinary"; label: string }[] = [
    { key: "all", label: "View All" },
    { key: "ambiance", label: "Ambiance & Style" },
    { key: "plating", label: "Artisanal Plating" },
    { key: "culinary", label: "Culinary Theater" },
  ];

  // Filtered dataset
  const filteredGallery = GALLERY_ITEMS.filter((item) => {
    if (activeFilter === "all") return true;
    return item.category === activeFilter;
  });

  const openLightbox = (index: number) => {
    // Find the actual item from filtered list
    const item = filteredGallery[index];
    // Find its absolute index in global GALLERY_ITEMS for standard navigation
    const globalIdx = GALLERY_ITEMS.findIndex((gi) => gi.id === item.id);
    if (globalIdx !== -1) {
      setLightboxIndex(globalIdx);
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (lightboxIndex === null) return;
    
    let newIndex = lightboxIndex;
    if (direction === "prev") {
      newIndex = lightboxIndex === 0 ? GALLERY_ITEMS.length - 1 : lightboxIndex - 1;
    } else {
      newIndex = lightboxIndex === GALLERY_ITEMS.length - 1 ? 0 : lightboxIndex + 1;
    }
    setLightboxIndex(newIndex);
  };

  return (
    <section id="gallery" className="py-24 bg-white scroll-mt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-emerald-700 font-mono text-xs uppercase tracking-[0.3em] font-semibold block mb-3">
            Moments in Frame
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-gray-900 tracking-tight font-bold">
            The BBQ Tonight Gallery
          </h2>
          <div className="h-0.5 w-16 bg-gold-400 mx-auto mt-4" />
          <p className="text-gray-600 mt-5 text-sm md:text-base font-light leading-relaxed">
            Take a visual tour around our bespoke dining rooms, culinary masterpieces, 
            and passionate chefs at work creating gastrosensorial spectacles.
          </p>
        </div>

        {/* Gallery Filters */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeFilter === filter.key
                  ? "bg-emerald-900 text-white shadow-md shadow-emerald-950/20"
                  : "bg-emerald-50/50 text-emerald-800 hover:bg-emerald-100/50"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Responsive Bento Layout Image Grid */}
        <motion.div
          id="gallery-grid"
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item: GalleryItem, idx: number) => (
              <motion.div
                key={item.id}
                id={`gallery-item-card-${item.id}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl cursor-pointer bg-neutral-100"
                onClick={() => openLightbox(idx)}
              >
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8" />
                
                {/* Floating zoom indicator icon */}
                <div className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md">
                  <Maximize2 className="h-4 w-4 text-emerald-700" />
                </div>

                {/* Subtitle / Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 z-10 space-y-1">
                  <div className="flex items-center space-x-1.5 text-gold-400">
                    <Sparkles className="h-3 w-3" />
                    <span className="text-[10px] font-mono tracking-widest uppercase font-semibold">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="text-white font-serif text-sm md:text-base font-semibold leading-snug">
                    {item.caption}
                  </h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Dynamic Lightbox Modal Popup Component */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              id="gallery-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4 backdrop-blur-sm"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <button
                id="lightbox-close-btn"
                onClick={closeLightbox}
                className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Slider Content Wrapper */}
              <div 
                className="relative max-w-5xl w-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Previous Navigation Button */}
                <button
                  id="lightbox-prev-btn"
                  onClick={() => navigateLightbox("prev")}
                  className="absolute left-2 md:left-6 p-2 md:p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer z-10"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                </button>

                {/* Mid Image Panel */}
                <div className="flex flex-col items-center">
                  <motion.img
                    key={lightboxIndex}
                    src={GALLERY_ITEMS[lightboxIndex].image}
                    alt={GALLERY_ITEMS[lightboxIndex].caption}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="max-h-[70vh] md:max-h-[80vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/5"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating Caption Overlay underneath */}
                  <div className="mt-5 text-center max-w-2xl px-4 space-y-1.5">
                    <span className="text-gold-400 font-mono text-[10px] tracking-widest uppercase font-bold">
                      {GALLERY_ITEMS[lightboxIndex].category}
                    </span>
                    <p className="text-white font-serif text-sm md:text-base font-semibold">
                      {GALLERY_ITEMS[lightboxIndex].caption}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {lightboxIndex + 1} of {GALLERY_ITEMS.length}
                    </p>
                  </div>
                </div>

                {/* Next Navigation Button */}
                <button
                  id="lightbox-next-btn"
                  onClick={() => navigateLightbox("next")}
                  className="absolute right-2 md:right-6 p-2 md:p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer z-10"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
