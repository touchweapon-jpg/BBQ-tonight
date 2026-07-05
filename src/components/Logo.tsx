/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";

const logoImg = "/src/assets/images/bbq_tonight_logo_1782659570685.jpg";

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
    <div className={`flex items-center space-x-3.5 group ${className}`} id="brand-logo-container">
      {/* Exquisite Luxury Medallion Logo */}
      <motion.div 
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`relative flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-neutral-950 border border-gold-400/30 overflow-hidden shadow-xl shadow-emerald-950/10 group-hover:border-gold-400/80 transition-all duration-300 ${iconClassName}`}
      >
        {/* Subtle glowing brand aura */}
        <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/20 via-transparent to-gold-400/10 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* The Premium BBQ Logo Image */}
        <img
          src={logoImg}
          alt="BBQ Tonight Logo"
          className="w-full h-full object-cover relative z-10 filter brightness-105"
          referrerPolicy="no-referrer"
        />
        
        {/* Golden ring outline inside */}
        <div className="absolute inset-0.5 border border-gold-400/20 rounded-full z-20 pointer-events-none group-hover:border-gold-400/40 transition-all duration-300" />
      </motion.div>
      
      {/* Typography Design for BBQ Tonight */}
      <div className="flex flex-col text-left">
        <span className={`font-serif text-2xl sm:text-3xl tracking-[0.12em] font-black block leading-none ${textColor} transition-colors duration-300`}>
          BBQ
        </span>
        <span className={`text-[9px] sm:text-[11px] tracking-[0.38em] font-mono font-black block mt-1 uppercase ${subColor} transition-colors duration-300`}>
          TONIGHT
        </span>
      </div>
    </div>
  );
}
