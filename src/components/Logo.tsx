/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";

import logoImg from "../assets/images/bbq-t-web-logo.png";

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
    <div className={`flex items-center space-x-3 group ${className}`} id="brand-logo-container">
      {/* Premium Barbecue Medallion Logo utilizing uploaded assets */}
      <motion.div 
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 350, damping: 18 }}
        className={`relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gold-400/50 overflow-hidden shadow-lg shadow-black/30 group-hover:border-gold-300 transition-all duration-300 ${iconClassName}`}
      >
        <img
          src={logoImg}
          alt="BBQ Tonight Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        
        {/* Subtle high-contrast golden sheen overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </motion.div>
      
      {/* Typography Design for BBQ Tonight */}
      <div className="flex flex-row items-baseline gap-1.5 text-left">
        <span className={`font-serif text-xl sm:text-2xl tracking-[0.12em] font-black leading-none ${textColor} transition-colors duration-300`}>
          BBQ
        </span>
        <span className={`text-[10px] sm:text-[11.5px] tracking-[0.2em] font-mono font-black uppercase ${subColor} transition-colors duration-300`}>
          TONIGHT
        </span>
      </div>
    </div>
  );
}

