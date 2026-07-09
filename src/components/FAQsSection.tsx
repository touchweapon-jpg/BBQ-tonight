/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "Do I need to make a reservation in advance?",
    answer: "Yes, we highly recommend booking your table in advance through our online secure scheduler. Walk-in seating is subject to daily ingredient availability and cannot be guaranteed. Weekend tables are often booked 2-3 weeks ahead."
  },
  {
    id: "faq-2",
    question: "What is your dress code policy?",
    answer: "To maintain our sophisticated atmosphere, we operate an elegant smart-casual dress code. We kindly request guests refrain from wearing sportswear, beachwear, or athletic apparel."
  },
  {
    id: "faq-3",
    question: "Can you accommodate dietary restrictions and severe allergies?",
    answer: "Absolutely. Our culinary team is highly trained in managing complex food dietary profiles. Please specify any severe allergies or requirements in our reservation form during booking so we can curate a custom dining map for you."
  },
  {
    id: "faq-4",
    question: "Is there private dining or custom events hosting available?",
    answer: "Indeed. We offer a private dining salon for exclusive gatherings, banquets, and culinary masterclasses. Please reach out to our events coordinator via the contact coordinates or send us a reservation request."
  },
  {
    id: "faq-5",
    question: "Is valet parking provided at the restaurant?",
    answer: "Yes, complimentary valet parking is offered for all our dining guests. Simply drive up to our main entrance on Gourmet Blvd and our stewards will assist you."
  }
];

export default function FAQsSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-24 bg-white scroll-mt-12 overflow-hidden border-t border-neutral-100">
      <div className="max-w-4xl 2xl:max-w-5xl mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-emerald-500 font-mono text-xs uppercase tracking-[0.3em] font-semibold block mb-3">
            Gourmet Queries
          </span>
          <h2 className="font-serif text-4xl md:text-5xl 2xl:text-6xl text-gray-900 tracking-tight font-bold">
            Frequently Asked Questions
          </h2>
          <div className="h-0.5 w-16 bg-gold-400 mx-auto mt-4" />
          <p className="text-gray-600 mt-5 text-sm md:text-base font-light leading-relaxed">
            Got queries about our dining experience, reservations, or culinary practices? 
            Find answers to frequently asked concerns below.
          </p>
        </div>

        {/* FAQs List Container */}
        <div className="space-y-4">
          {FAQ_DATA.map((faq, idx) => {
            const isExpanded = expandedId === faq.id;
            return (
              <motion.div
                key={faq.id}
                id={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`rounded-[1.5rem] border transition-all duration-300 overflow-hidden ${
                  isExpanded 
                    ? "border-emerald-500/25 bg-emerald-50/20 shadow-lg shadow-emerald-950/[0.02]" 
                    : "border-neutral-150 bg-[#FAF9F5]/45 hover:bg-[#FAF9F5] hover:border-neutral-250"
                }`}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full text-left px-5 py-4 md:px-8 md:py-6 flex items-start md:items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-start md:items-center gap-3 md:gap-4">
                    <HelpCircle className={`h-4.5 w-4.5 md:h-5 md:w-5 flex-shrink-0 mt-0.5 md:mt-0 transition-colors duration-300 ${
                      isExpanded ? "text-emerald-500" : "text-gray-400"
                    }`} />
                    <span className="font-serif font-bold text-gray-900 text-sm xs:text-base md:text-lg tracking-tight leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  
                  {/* Rotating Chevron Icon wrapper */}
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
                    className={`p-1 rounded-full flex-shrink-0 transition-colors duration-300 ${
                      isExpanded ? "bg-emerald-500/10 text-emerald-500" : "bg-neutral-100 text-gray-500"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4 md:h-5 md:w-5" />
                  </motion.div>
                </button>

                {/* Animated Answer Body */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 md:px-8 md:pb-7 md:pl-[3.5rem] text-gray-600 text-sm md:text-base leading-relaxed font-sans font-light border-t border-neutral-100/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Contact Help Micro Card */}
        <div className="mt-14 p-6 bg-gradient-to-r from-emerald-950 to-emerald-900 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="p-3 bg-white/10 rounded-2xl">
              <Sparkles className="h-6 w-6 text-gold-400 animate-pulse" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg text-white">Have another question?</h4>
              <p className="text-gray-300 text-xs font-sans font-light mt-0.5">We are here to elevate your gastronomic journey.</p>
            </div>
          </div>
          <a
            href="#reservation"
            className="bg-gold-400 hover:bg-gold-500 text-emerald-950 px-6 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg active:scale-95 duration-200 shrink-0"
          >
            Get In Touch
          </a>
        </div>

      </div>
    </section>
  );
}
