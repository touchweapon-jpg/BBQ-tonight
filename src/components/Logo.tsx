/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Flame, UtensilsCrossed } from "lucide-react";

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textColor?: string;
  subColor?: string;
}

export default function Logo({
  className = "",
  iconClassName = "",
  textColor = "text-emerald-900",
  subColor = "text-gold-500",
}: LogoProps) {
  return (
    <div className={`flex items-center space-x-4 group ${className}`} id="brand-logo-container">
      {/* Premium Barbecue Medallion Logo */}
      <motion.div 
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 350, damping: 18 }}
        className={`relative flex items-center justify-center w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900 border border-gold-400/40 overflow-hidden shadow-2xl shadow-gold-500/10 group-hover:border-gold-300 transition-all duration-300 ${iconClassName}`}
      >
        {/* Slow-rotating outer luxury golden dial */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="absolute inset-1.5 border border-dashed border-gold-400/20 rounded-full z-0 pointer-events-none group-hover:border-gold-300/40 transition-colors"
        />

        {/* Outer solid golden ring */}
        <div className="absolute inset-1 border border-gold-400/30 rounded-full z-10 pointer-events-none group-hover:border-gold-300/50 transition-all duration-300" />
        
        {/* Glowing fire/embers gradient aura */}
        <div className="absolute inset-0 bg-radial-gradient from-amber-500/20 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        
        {/* Layered Barbecue Grill & Utensils Emblem */}
        <div className="relative flex items-center justify-center z-20 w-full h-full">
          {/* Crossed Barbecue Forks/Skewers in background */}
          <UtensilsCrossed className="w-6 h-6 sm:w-8 sm:h-8 text-gold-500/40 group-hover:text-gold-400/60 rotate-45 transition-all duration-300 absolute" />
          
          {/* Circular Grill Grates indicator overlay (Subtle CSS lines representing grill marks) */}
          <div className="absolute w-7 h-7 sm:w-9 sm:h-9 rounded-full border border-neutral-800/80 flex flex-col justify-between p-1 opacity-40 group-hover:opacity-60 transition-opacity">
            <div className="h-[1px] w-full bg-gold-400/50" />
            <div className="h-[1px] w-full bg-gold-400/50" />
            <div className="h-[1px] w-full bg-gold-400/50" />
          </div>

          {/* Active Center Flame representing the charcoal fire */}
          <div className="relative flex items-center justify-center mt-[-2px]">
            {/* Ambient blur glow behind flame */}
            <Flame className="w-5 h-5 sm:w-6.5 sm:h-6.5 text-amber-500/40 absolute blur-[3px] scale-125" />
            
            {/* Primary Golden Flame */}
            <Flame className="w-5 h-5 sm:w-6.5 sm:h-6.5 text-gold-400 group-hover:text-gold-300 transition-all duration-300" />
          </div>
        </div>

        {/* Glowing Pit Ember Sparks */}
        <div className="absolute bottom-2.5 right-2.5 sm:bottom-3.5 sm:right-3.5 w-1 h-1 rounded-full bg-amber-400 animate-pulse z-20" />
        <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 w-1 h-1 rounded-full bg-gold-500/60 z-20" />
      </motion.div>
      
      {/* Typography Design for BBQ Tonight */}
      <div className="flex flex-row items-baseline gap-2 text-left">
        <span className={`font-serif text-2xl sm:text-3xl tracking-[0.14em] font-black leading-none ${textColor} transition-colors duration-300`}>
          BBQ
        </span>
        <span className={`text-[12px] sm:text-[14px] tracking-[0.25em] font-mono font-black uppercase ${subColor} transition-colors duration-300`}>
          TONIGHT
        </span>
      </div>
    </div>
  );
}
