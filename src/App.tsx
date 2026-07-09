/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import ReservationSection from "./components/ReservationSection";
import AboutSection from "./components/AboutSection";
import GallerySection from "./components/GallerySection";
import ReviewsSection from "./components/ReviewsSection";
import FAQsSection from "./components/FAQsSection";
import Footer from "./components/Footer";
import AdminPanel from "./components/admin/AdminPanel";

export default function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    const handleUrlCheck = () => {
      const hash = window.location.hash;
      const params = new URLSearchParams(window.location.search);
      if (hash === "#admin" || params.get("admin") === "true") {
        setIsAdminMode(true);
      } else {
        setIsAdminMode(false);
      }
    };

    handleUrlCheck();
    window.addEventListener("hashchange", handleUrlCheck);
    return () => window.removeEventListener("hashchange", handleUrlCheck);
  }, []);

  const handleBackToClient = () => {
    window.location.hash = "";
    // also strip query parameters if any
    const url = new URL(window.location.href);
    url.searchParams.delete("admin");
    window.history.pushState({}, "", url.pathname + url.hash);
    setIsAdminMode(false);
  };

  const handleEnterAdmin = () => {
    window.location.hash = "admin";
    setIsAdminMode(true);
  };

  if (isAdminMode) {
    return <AdminPanel onBackToClient={handleBackToClient} />;
  }

  return (
    <div id="main-restaurant-app" className="min-h-screen bg-[#faf9f5] font-sans antialiased text-[#1c1d1f] selection:bg-gold-200 selection:text-emerald-950">
      {/* Universal Floating Header / Navigation */}
      <Navbar />

      {/* Main Structural Framework Content */}
      <main id="restaurant-main-content">
        {/* Unit 1: Panoramic Hero Section */}
        <Hero />

        {/* Unit 2: Digital Gourmet Menu Offerings */}
        <MenuSection />

        {/* Unit 3: Dynamic Online Table Scheduler */}
        <ReservationSection />

        {/* Unit 4: Restaurant Narrative & Opening Schedules */}
        <AboutSection />

        {/* Unit 5: Bento Visual Moments Gallery */}
        <GallerySection />

        {/* Unit 6: Guest Testimonial Carousel */}
        <ReviewsSection />

        {/* Unit 7: Interactive Gourmet FAQ Accordion */}
        <FAQsSection />
      </main>

      {/* Sophisticated Brand Coordinates Footer */}
      <Footer onEnterAdmin={handleEnterAdmin} />
    </div>
  );
}
