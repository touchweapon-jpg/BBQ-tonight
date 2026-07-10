/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { RESTAURANT_INFO } from "../data";
import Logo from "./Logo";
import { 
  Utensils, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUp, 
  Award,
  Instagram,
  Facebook,
  Globe
} from "lucide-react";

interface FooterProps {
  onEnterAdmin?: () => void;
}

export default function Footer({ onEnterAdmin }: FooterProps) {
  const { name, address, phone, email } = RESTAURANT_INFO;

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-emerald-950 text-gray-400 py-16 border-t border-white/5 relative overflow-hidden">
      
      {/* Absolute faint background glow */}
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-gold-500/5 rounded-full filter blur-3xl translate-y-20 -translate-x-20" />

      <div className="max-w-7xl 2xl:max-w-[1440px] 3xl:max-w-[1600px] 4xl:max-w-[1728px] 5xl:max-w-[1920px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Upper tier layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-14 pb-14 border-b border-white/5">
          
          {/* Brand Presentation column */}
          <div className="lg:col-span-4 space-y-5">
            <a
              id="footer-logo"
              href="#home"
              onClick={(e) => handleSmoothScroll(e, "#home")}
              className="block w-max"
            >
              <Logo textColor="text-white" subColor="text-gold-400" />
            </a>
            <p className="text-gray-300 font-sans text-xs md:text-sm font-light leading-relaxed max-w-sm">
              BBQ Tonight blends three generations of authentic slow-smoked pitmaster mastery with modern gastronomical luxury, serving unforgettable wood-fired experiences.
            </p>
            {/* Social linkages badges */}
            <div className="flex space-x-3.5 pt-2">
              <a
                id="footer-social-instagram"
                href="#instagram"
                className="p-2.5 bg-white/5 border border-white/10 text-gray-300 hover:text-gold-300 hover:bg-gold-400/10 hover:border-gold-400/30 rounded-xl transition-all"
                aria-label="Instagram Page Link"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a
                id="footer-social-facebook"
                href="#facebook"
                className="p-2.5 bg-white/5 border border-white/10 text-gray-300 hover:text-gold-300 hover:bg-gold-400/10 hover:border-gold-400/30 rounded-xl transition-all"
                aria-label="Facebook Page Link"
              >
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a
                id="footer-social-advisor"
                href="#tripadvisor"
                className="p-2.5 bg-white/5 border border-white/10 text-gray-300 hover:text-gold-300 hover:bg-gold-400/10 hover:border-gold-400/30 rounded-xl transition-all"
                aria-label="TripAdvisor Page Link"
              >
                <Globe className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Rapid Links list column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider font-mono">
              Restaurant Pathways
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              {[
                { name: "Home Welcome", href: "#home" },
                { name: "Browse Menu", href: "#menu" },
                { name: "Table Scheduler", href: "#reservation" },
                { name: "Our History", href: "#about" },
                { name: "Visual Gallery", href: "#gallery" },
                { name: "Discerning Patron reviews", href: "#reviews" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    id={`footer-path-${link.name.toLowerCase().replace(/\s/g, "-")}`}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="hover:text-gold-400 transition-colors focus:outline-none"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Coordinates column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider font-mono">
              Direct Coordinates
            </h4>
            <ul className="space-y-4 text-xs text-gray-300">
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="h-4 w-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-white transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-4 w-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </li>
            </ul>
          </div>

          {/* Opening summary details */}
          <div className="lg:col-span-3 space-y-4 bg-white/5 border border-white/10 rounded-2xl p-6 relative">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider font-mono flex items-center space-x-2">
              <Award className="h-4 w-4 text-gold-400" />
              <span>Table Assignments Enquiries</span>
            </h4>
            <p className="text-[11px] text-gray-300 leading-relaxed font-sans">
              All table assignments can be requested via our secure scheduler. Our concierge team is happy to accommodate custom dietary and seating requirements.
            </p>
            <div className="h-px bg-white/10 w-full" />
            <span className="text-[10px] text-gold-400 font-mono tracking-widest block uppercase font-bold">
              Secure Seating Settle Info
            </span>
          </div>

        </div>

        {/* Lower tier copyright & back to top page trigger */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs space-y-4 sm:space-y-0 text-gray-500">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p>© {new Date().getFullYear()} BBQ Tonight. All Rights Reserved.</p>
            {onEnterAdmin && (
              <>
                <span className="text-gray-700 select-none hidden sm:inline">•</span>
                <button
                  onClick={onEnterAdmin}
                  className="text-gray-400 hover:text-gold-400 transition-all cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 rounded-md px-2.5 py-1 focus:outline-none"
                >
                  Admin Portal
                </button>
              </>
            )}
          </div>

          {/* Back to top button */}
          <button
            id="back-to-top-trigger"
            onClick={handleScrollToTop}
            className="flex items-center space-x-2 bg-white/5 hover:bg-gold-400/20 border border-white/10 text-gray-300 hover:text-white py-2.5 px-4 rounded-xl text-[10px] uppercase tracking-wider font-semibold group cursor-pointer transition-all"
            aria-label="Back to top"
          >
            <span>Rise to Top</span>
            <ArrowUp className="h-3.5 w-3.5 group-hover:-translate-y-0.5 transition-transform text-gold-400" />
          </button>
        </div>

      </div>
    </footer>
  );
}
