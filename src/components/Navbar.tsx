/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Menu, X, Utensils, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "./Logo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Menu", href: "#menu" },
    { name: "Reservation", href: "#reservation" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Reviews", href: "#reviews" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active link detection based on section visibility
      const scrollPosition = window.scrollY + 120;
      for (const link of navLinks) {
        const el = document.querySelector(link.href);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          const height = el.clientHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.href.substring(1));
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
      setActiveSection(href.substring(1));
    }
  };

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-350 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-emerald-900/5 py-4.5"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo and Brand */}
        <a
          id="nav-logo"
          href="#home"
          onClick={(e) => handleSmoothScroll(e, "#home")}
          className="block"
        >
          <Logo 
            textColor={isScrolled ? "text-emerald-950" : "text-white"} 
            subColor={isScrolled ? "text-gold-600" : "text-gold-300"} 
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav" className="hidden lg:flex items-center space-x-10">
          <ul className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  id={`nav-link-${link.name.toLowerCase()}`}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`text-sm tracking-wider font-semibold transition-all duration-200 relative py-1.5 ${
                    isScrolled
                      ? activeSection === link.href.substring(1)
                        ? "text-emerald-900 font-bold"
                        : "text-gray-800 hover:text-emerald-700"
                      : activeSection === link.href.substring(1)
                        ? "text-gold-400 font-bold"
                        : "text-white/85 hover:text-white"
                  }`}
                >
                  {link.name}
                  {activeSection === link.href.substring(1) && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400 rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <a
            id="nav-cta-btn"
            href="#reservation"
            onClick={(e) => handleSmoothScroll(e, "#reservation")}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border transform hover:scale-[1.02] cursor-pointer ${
              isScrolled
                ? "text-white bg-emerald-900 hover:bg-emerald-950 shadow-md shadow-emerald-950/20 border-transparent"
                : "text-emerald-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-lg shadow-gold-500/10 border-transparent"
            }`}
          >
            <Calendar className={`h-4 w-4 ${isScrolled ? "text-gold-300" : "text-emerald-950"}`} />
            <span>Book Table</span>
          </a>
        </nav>

        {/* Hamburger Menu Trigger */}
        <button
          id="nav-hamburger-trigger"
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden p-2 transition-colors focus:outline-none ${
            isScrolled ? "text-gray-800 hover:text-emerald-700" : "text-white hover:text-gold-300"
          }`}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl py-6 px-8 z-40 lg:hidden"
          >
            <ul className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    id={`mobile-nav-link-${link.name.toLowerCase()}`}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className={`block py-2 text-base font-semibold border-l-4 pl-3 ${
                      activeSection === link.href.substring(1)
                        ? "text-emerald-800 border-emerald-600 bg-emerald-50/50"
                        : "text-gray-700 border-transparent hover:text-emerald-600 hover:border-emerald-200"
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  id="mobile-nav-cta"
                  href="#reservation"
                  onClick={(e) => handleSmoothScroll(e, "#reservation")}
                  className="flex items-center justify-center space-x-2 w-full py-3.5 rounded-xl bg-emerald-900 text-white font-bold tracking-widest uppercase text-xs shadow-md shadow-emerald-950/20 hover:bg-emerald-950 active:scale-[0.98] transition-all"
                >
                  <Calendar className="h-4 w-4 text-gold-300" />
                  <span>Reserve a Table</span>
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
