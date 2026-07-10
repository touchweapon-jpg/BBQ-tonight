/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { CUSTOMER_REVIEWS } from "../data";
import { Review } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

export default function ReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === CUSTOMER_REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? CUSTOMER_REVIEWS.length - 1 : prev - 1));
  };

  // Optional: Auto slide reviews every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 8500);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const currentReview: Review = CUSTOMER_REVIEWS[activeIndex];

  return (
    <section id="reviews" className="py-24 bg-emerald-50/20 scroll-mt-12 overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-[1440px] 3xl:max-w-[1600px] 4xl:max-w-[1728px] 5xl:max-w-[1920px] mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-emerald-500 font-mono text-xs uppercase tracking-[0.3em] font-semibold block mb-3">
            Guest Testimonials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl 2xl:text-6xl text-gray-900 tracking-tight font-bold">
            Reviewed by Connoisseurs
          </h2>
          <div className="h-0.5 w-16 bg-gold-400 mx-auto mt-4" />
          <p className="text-gray-600 mt-5 text-sm md:text-base font-light leading-relaxed">
            Discover why food enthusiasts, local culinary critics, and wood-fired smoke connoisseurs 
            consistently rank BBQ Tonight among their absolute elite dining choices.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-3xl 2xl:max-w-4xl 3xl:max-w-5xl 4xl:max-w-6xl mx-auto bg-white border border-neutral-100 rounded-[2.5rem] p-5 sm:p-8 md:p-14 shadow-xl shadow-gray-200/50">
          
          {/* Decorative Giant Quote icon */}
          <div className="absolute top-8 left-8 text-emerald-100/30 -z-50 select-none">
            <Quote className="h-24 w-24 fill-emerald-50/45 text-emerald-50/40" />
          </div>

          {/* Staged Animations for Slide transition */}
          <div className="relative overflow-hidden min-h-[340px] sm:min-h-[260px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full flex flex-col items-center text-center space-y-6"
              >
                {/* Stars container */}
                <div className="flex space-x-1.5 justify-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < currentReview.rating
                          ? "fill-gold-400 text-gold-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>

                {/* Review Text comment */}
                <blockquote className="font-serif text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
                  "{currentReview.comment}"
                </blockquote>

                {/* Author Metadata information */}
                <div className="flex items-center space-x-3.5 pt-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-neutral-200">
                    <img
                      src={currentReview.avatar}
                      alt={currentReview.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="font-serif font-bold text-gray-900 text-sm md:text-base">
                      {currentReview.name}
                    </h4>
                    <p className="text-emerald-500 text-xs font-sans tracking-wide uppercase font-semibold">
                      {currentReview.role || "Discerning Patron"}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Left Arrow trigger button */}
          <button
            id="testimonial-prev-trigger"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full border border-neutral-100 bg-white shadow-md hover:bg-emerald-50 hover:text-emerald-750 active:scale-95 transition-all cursor-pointer hidden md:flex items-center justify-center"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Right Arrow trigger button */}
          <button
            id="testimonial-next-trigger"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full border border-neutral-100 bg-white shadow-md hover:bg-emerald-50 hover:text-emerald-750 active:scale-95 transition-all cursor-pointer hidden md:flex items-center justify-center"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Bottom Bullet navigation dots picker selection */}
          <div className="flex space-x-2.5 justify-center mt-10">
            {CUSTOMER_REVIEWS.map((_, idx) => (
              <button
                key={idx}
                id={`testimonial-bullet-${idx}`}
                onClick={() => {
                  setDirection(idx > activeIndex ? 1 : -1);
                  setActiveIndex(idx);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx ? "w-8 bg-gold-400" : "w-2.5 bg-emerald-100/50 hover:bg-emerald-100"
                }`}
                aria-label={`Go to testimonial index ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
