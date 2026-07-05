/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import ReservationSection from "./components/ReservationSection";
import AboutSection from "./components/AboutSection";
import GallerySection from "./components/GallerySection";
import ReviewsSection from "./components/ReviewsSection";
import FAQsSection from "./components/FAQsSection";
import Footer from "./components/Footer";

export default function App() {
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
      <Footer />
    </div>
  );
}
