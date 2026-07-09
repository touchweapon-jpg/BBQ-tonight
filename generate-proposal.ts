import pptxgen from "pptxgenjs";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, AlignmentType, WidthType, BorderStyle, PageBreak } from "docx";
import PDFDocument from "pdfkit";
import fs from "fs";

interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  volume: string;
  bullets: string[];
  details: string;
  theme: "emerald" | "charcoal" | "gold";
  layout: "cover" | "toc" | "quote" | "split" | "grid" | "timeline" | "pricing" | "standard" | "acceptance" | "thanks";
}

// 30 SLIDES COMPLETE HIGH-FIDELITY COPY
const SLIDES_DATA: SlideData[] = [
  {
    id: 1,
    title: "PREMIUM WEB ARCHITECTURE & BRAND PROPULSION",
    subtitle: "Crafting an Immersive Digital Landmark for BBQ Tonight",
    volume: "VOLUME I: BRAND & VISION",
    bullets: [],
    details: "Nestled in the heart of the culinary district, BBQ Tonight represents three generations of dedication to high-end slow-smoked barbecue. Under the culinary leadership of Pitmaster Jean-Luc Laurent, we combine classic oakwood smoking traditions with modern gourmet mechanics to create unforgettable masterworks on every plate. This proposal outlines the comprehensive digital strategy and technical architecture engineered by MetaWave Innovations to elevate this legendary smokehouse to new heights of digital luxury.",
    theme: "emerald",
    layout: "cover"
  },
  {
    id: 2,
    title: "THE STRATEGIC ROADMAP",
    subtitle: "Volume Outline & Architectural Hierarchy",
    volume: "VOLUME I: BRAND & VISION",
    bullets: [
      "Volume I: Brand & Vision (Chapters 1 - 6)",
      "Volume II: Digital Strategy & UX Design (Chapters 7 - 12)",
      "Volume III: Engineering, Tech Stack & SEO (Chapters 13 - 19)",
      "Volume IV: Project Execution & Delivery (Chapters 20 - 24)",
      "Volume V: Governance, Pricing & Agreement (Chapters 25 - 30)"
    ],
    details: "The business proposal is structured into five distinct volumes, spanning thirty chapters. This design ensures that every strategic goal, creative milestone, and engineering specification is meticulously addressed.",
    theme: "charcoal",
    layout: "toc"
  },
  {
    id: 3,
    title: "EXECUTIVE SUMMARY",
    subtitle: "Where Wood-Fired Smoke Meets Gastronical Luxury",
    volume: "VOLUME I: BRAND & VISION",
    bullets: [
      "Brand Resonance: Positioning BBQ Tonight as an elite gourmet smokehouse on the internet.",
      "Conversion Engineering: Driving online bookings with a friction-free interactive reservation system.",
      "Sensory Fluidity: Designing sharp, atmospheric textures that stimulate appetite and interest."
    ],
    details: "BBQ Tonight's online presence must be as premium as its physical dining room. MetaWave Innovations proposes a fully custom, lightning-fast digital asset designed from scratch to replace generic, low-performance website templates with an immersive visual journey.",
    theme: "emerald",
    layout: "quote"
  },
  {
    id: 4,
    title: "METAWAVE INNOVATIONS",
    subtitle: "Bespoke Digital Artisans for Elite Hospitality Brands",
    volume: "VOLUME I: BRAND & VISION",
    bullets: [
      "Bespoke Development: We completely reject generic builders, static templates, and automated shortcuts.",
      "Hospitality Specialists: We understand the unique user flows, visual pacing, and menus of high-end dining.",
      "Full-Stack Authority: Fusing premium UI design with industry-grade page loading and security performance."
    ],
    details: "MetaWave Innovations is an international creative agency crafting bespoke digital solutions for high-value hospitality brands. We partner with Michelin-standard kitchens and prestigious smokehouse brands to translate their heritage into online masterpieces.",
    theme: "charcoal",
    layout: "split"
  },
  {
    id: 5,
    title: "CLIENT REQUIREMENTS",
    subtitle: "The Master Pitmaster's Digital Mandate",
    volume: "VOLUME I: BRAND & VISION",
    bullets: [
      "Premium Brand Translation: Reflect the oakwood smoke, slow-cook time, and luxury gold emblem.",
      "Responsive Fluidity: Look flawless and run seamlessly across mobile, tablet, laptop, and ultra-wide screens.",
      "Sensory Interactive Menu: Showcase slow-smoked brisket, wagyu beef ribs, and luxury mains elegantly.",
      "High-Conversion Booking Wizard: A seamless three-step flow to log reservations effortlessly."
    ],
    details: "Pitmaster Jean-Luc Laurent's mandate is simple: the website must reflect the absolute premium standard of the kitchen. Every transition must be smooth, every layout must feel spacious, and the reservation process must be entirely effortless.",
    theme: "charcoal",
    layout: "grid"
  },
  {
    id: 6,
    title: "WEBSITE OVERVIEW",
    subtitle: "Anatomy of the Digital Smokehouse",
    volume: "VOLUME I: BRAND & VISION",
    bullets: [
      "Seamless Navigation: Single-screen continuous canvas with elegant responsive top menu offsets.",
      "Active-State Components: Engaging menu selectors, cinematic lightboxes, and a testimonial carousel.",
      "Structural Balance: Perfect typography tracking and bold layouts framed by elegant negative space."
    ],
    details: "The completed platform is a single-screen masterclass built with decoupled React components. It features responsive layouts that stack naturally, readable font hierarchies, and active micro-interactions that elevate visual depth.",
    theme: "emerald",
    layout: "standard"
  },
  {
    id: 7,
    title: "BUSINESS GOALS",
    subtitle: "Aligning Web Engineering with Smokehouse Revenue",
    volume: "VOLUME II: DIGITAL STRATEGY & UX DESIGN",
    bullets: [
      "Direct Booking Surge: Drive online reservations directly through the platform, minimizing third-party fees.",
      "Elevated Brand Authority: Solidify BBQ Tonight's status as a legendary luxury dining landmark.",
      "High-Value Catering: Capture premium corporate, wedding, and event inquiries with dedicated call-outs."
    ],
    details: "We don't build digital assets purely for aesthetic appreciation; we build them as engines for active revenue generation. By creating a compelling digital journey, we turn casual online visitors into physical dining patrons.",
    theme: "charcoal",
    layout: "split"
  },
  {
    id: 8,
    title: "PROJECT OBJECTIVES",
    subtitle: "Measurable Standards of Technical Success",
    volume: "VOLUME II: DIGITAL STRATEGY & UX DESIGN",
    bullets: [
      "Lighthouse Perfection: Target 100/100 scores in performance, accessibility, and SEO parameters.",
      "Flawless Responsiveness: Guaranteed perfect rendering on 20+ tested physical screen resolutions.",
      "Frictionless Booking: Achieve an average reservation flow completion time of under 45 seconds."
    ],
    details: "A beautiful design must be backed by perfect engineering metrics. We set strict performance standards to ensure that the BBQ Tonight platform is one of the fastest, most reliable restaurant websites in the industry.",
    theme: "charcoal",
    layout: "standard"
  },
  {
    id: 9,
    title: "SCOPE OF WORK",
    subtitle: "Clear Boundaries & Comprehensive Development Phases",
    volume: "VOLUME II: DIGITAL STRATEGY & UX DESIGN",
    bullets: [
      "Visual Brand Discovery: Styling the color swatches, typography tracking, and vector elements.",
      "Component Architecture: Building modular React 19 sections (Navbar, Hero, About, Menu, Gallery, Reviews, Booking, FAQs, Footer).",
      "Interactive Wizard Engineering: Creating the dynamic multi-step booking module with input validation.",
      "Speed & Local SEO Tuning: Purging unused styles, lazy-loading assets, and configuring JSON-LD schemas."
    ],
    details: "Our work encompasses the entire life-cycle of the platform's development, ensuring a clean transfer of production-ready source code, optimized graphics, and highly structured metadata formats.",
    theme: "charcoal",
    layout: "grid"
  },
  {
    id: 10,
    title: "WEBSITE FEATURES",
    subtitle: "High-Fidelity Tools Engineered for Gastronomy",
    volume: "VOLUME II: DIGITAL STRATEGY & UX DESIGN",
    bullets: [
      "Dynamic Multi-Step Booking: Interactive 3-step wizard with step trackers, guest selection buttons, and success alerts.",
      "Sensory Smokehouse Menu: Tabbed selector with elegant layout, custom prices, signature tags, and descriptive copy.",
      "Cinematic Image Gallery: Full-viewport responsive image lightboxes with transition controls and detailed slide captions.",
      "Dynamic Accordion FAQs: Clean question triggers with spring transitions to answer common user concerns instantly."
    ],
    details: "Every website feature is engineered to respond instantly. By using modular React state controllers, we avoid heavy page reloads, providing a desktop-app-like user experience that feels completely continuous.",
    theme: "emerald",
    layout: "grid"
  },
  {
    id: 11,
    title: "UI/UX STRATEGY",
    subtitle: "Designing for Sensory Attraction and Cognitive Ease",
    volume: "VOLUME II: DIGITAL STRATEGY & UX DESIGN",
    bullets: [
      "Appetite Appeal: Pacing sharp, cinematic photography of smokehouse cuts in structural viewports.",
      "Effortless Scanning: Establishing absolute hierarchy through distinct heading sizes, colors, and line weights.",
      "Comfortable Interaction: Large touch targets (>44px), intuitive forms, and immediate visual validation feedback."
    ],
    details: "The visual experience is designed to guide guests naturally to the booking wizard. Visual interest is built using elegant color contrasts (obsidian, emerald, gold) and smooth entrance animations.",
    theme: "charcoal",
    layout: "standard"
  },
  {
    id: 12,
    title: "DESIGN PHILOSOPHY",
    subtitle: "Architectural Honesty & Visual Craftsmanship",
    volume: "VOLUME II: DIGITAL STRATEGY & UX DESIGN",
    bullets: [
      "Elimination of Clutter: We strictly forbid fake network badges, floating telemetry indicators, and system logs.",
      "Human-Centered Branding: Straightforward text and elegant naming conventions that respect the high-end diner.",
      "Harmonious Layouts: Generous negative space, sophisticated borders, and fine alignments that frame the content."
    ],
    details: "True luxury is characterized by restraint, quality, and precision. We design the platform to speak for itself. The visual structure is clean and silent, allowing the culinary art of Pitmaster Laurent to stand out as the hero.",
    theme: "charcoal",
    layout: "quote"
  },
  {
    id: 13,
    title: "BRAND IDENTITY",
    subtitle: "The Luxury Smoked Gold Color System & Style Guide",
    volume: "VOLUME III: ENGINEERING, TECH STACK & SEO",
    bullets: [
      "Obsidian (#010905): The deep, rich dark background representing classic slow-smoking pit ovens.",
      "Forest Smoke (#041D11): The natural wood-fired accent representing organic, premium oak and cherry wood.",
      "Smoked Gold (#D4AF37): The elegant metallic accent highlighting dining excellence and signature cuts.",
      "Alabaster Cream (#FAF9F5): The light, high-contrast clean backdrop for forms and reservation cards."
    ],
    details: "Our color choices are rooted in the physical environment of BBQ Tonight. The dark obsidian and forest smoke establish a moody, high-end atmosphere, while smoked gold provides a premium accent that directs focus.",
    theme: "emerald",
    layout: "grid"
  },
  {
    id: 14,
    title: "TECHNOLOGY STACK",
    subtitle: "Built for Absolute Performance and Scalability",
    volume: "VOLUME III: ENGINEERING, TECH STACK & SEO",
    bullets: [
      "React 19 & TypeScript: Declarative, component-driven UI with robust compile-time type-safety.",
      "Vite & Esbuild: Lightning-fast modular asset bundling and rapid compiler tooling.",
      "Tailwind CSS v4: Modern pre-compiled utility framework for clean, performant responsive layouts.",
      "Motion: Fluid, physics-based spring animations for route transitions and hover effects."
    ],
    details: "By choosing a modern, lightweight technology stack, we guarantee that the website is future-proof, easy to maintain, and completely immune to the standard layout bloating found in templates.",
    theme: "charcoal",
    layout: "split"
  },
  {
    id: 15,
    title: "WEBSITE ARCHITECTURE",
    subtitle: "Modular Component Hierarchy & Unified Data Manifest",
    volume: "VOLUME III: ENGINEERING, TECH STACK & SEO",
    bullets: [
      "Decoupled Layout Modules: Complete isolation of sections into individual files for clean code organization.",
      "Centralized data.ts: All menu listings, reviews, FAQs, and hours are kept in a single easily updated file.",
      "Single App Controller: App.tsx manages navigation state, transitions, and coordinates the modular sections."
    ],
    details: "This modular architecture ensures that updating a menu price, adding a review, or altering restaurant hours takes seconds. The layout is separated from the content, allowing easy updates without code changes.",
    theme: "charcoal",
    layout: "standard"
  },
  {
    id: 16,
    title: "RESPONSIVE DESIGN",
    subtitle: "Pixel-Perfect Layouts on Every Mobile, Tablet, and Desktop Breakpoint",
    volume: "VOLUME III: ENGINEERING, TECH STACK & SEO",
    bullets: [
      "Fluid Scaling: Using percentage grids, clamp typography, and relative spacing for natural scaling.",
      "Breakpoint Specific Layouts: Custom mobile navbar drawers, stacking cards on tablets, and wide-screen grid grids.",
      "Tactile Optimization: Generous touch target paddings (>44px) and hover-state triggers for desktop users."
    ],
    details: "Responsiveness is built into the foundation of our code. The website adapts to every device screen. It looks stunning and functions flawlessly whether loaded on an iPhone, an iPad, a laptop, or an ultra-wide monitor.",
    theme: "charcoal",
    layout: "split"
  },
  {
    id: 17,
    title: "SEO STRATEGY",
    subtitle: "Dominating Search Engine Results in Local Gastronomy",
    volume: "VOLUME III: ENGINEERING, TECH STACK & SEO",
    bullets: [
      "JSON-LD Restaurant Schema: Injecting structured data for restaurant coordinates, cuisine, reservations, and ratings.",
      "Semantic HTML Framework: Proper use of landmark tags (header, section, footer) and heading levels (h1-h3).",
      "Core Web Vitals Boost: Guaranteeing fast loading (LCP), low input delay (FID), and layout stability (CLS) for search rank."
    ],
    details: "Our technical SEO ensures that search engines can easily parse and list BBQ Tonight. By using structured data schemas, search results display rich details like reservation links directly in local maps.",
    theme: "emerald",
    layout: "standard"
  },
  {
    id: 18,
    title: "PERFORMANCE OPTIMIZATION",
    subtitle: "Blazing Load Speeds for a Zero-Lag Guest Experience",
    volume: "VOLUME III: ENGINEERING, TECH STACK & SEO",
    bullets: [
      "Lazy-Loaded Assets: Deferring off-screen images to keep the initial page weight under 1.5MB.",
      "Purged CSS & Assets: Tailwind's compilation removes all unused utility classes, keeping styling code under 20KB.",
      "Optimized Re-renders: Strictly memoized values and primitive hook dependencies to prevent React render lag."
    ],
    details: "A fast loading speed is crucial for conversion. Studies show that a 1-second delay can drop restaurant bookings by up to 15%. Our optimizations guarantee sub-second initial load speeds on mobile networks.",
    theme: "charcoal",
    layout: "split"
  },
  {
    id: 19,
    title: "SECURITY ARCHITECTURE",
    subtitle: "Absolute Integrity for Customer Information and Forms",
    volume: "VOLUME III: ENGINEERING, TECH STACK & SEO",
    bullets: [
      "Server-Side Secret Keys: Sensitive APIs and keys are kept hidden from client browser inspect tools.",
      "Strict Input Validation: Form field sanitization on name, email, phone, and dates to prevent injection attacks.",
      "Secure HTTPS Protocol: Enforcing SSL/TLS encryption across all client booking data transmissions."
    ],
    details: "Customer privacy is a cornerstone of digital luxury. We enforce strict data handling practices, encrypting sensitive reservation details and blocking common automated spam submissions.",
    theme: "charcoal",
    layout: "standard"
  },
  {
    id: 20,
    title: "DEVELOPMENT PROCESS",
    subtitle: "The MetaWave Quality Blueprint and Milestones",
    volume: "VOLUME IV: PROJECT EXECUTION & DELIVERY",
    bullets: [
      "Phase I - Brand & Strategy (Weeks 1-2): Brand discovery, palette selection, asset gathering, and wireframes.",
      "Phase II - Modular Engineering (Weeks 3-6): Building modular React sections, interactive tabs, and booking wizards.",
      "Phase III - Responsive Tuning (Weeks 7-9): Cross-device breakpoint sweeps, fluid typography, and alignment.",
      "Phase IV - QA & Launch (Weeks 10-12): Compiling production assets, performance profiling, and VIP launch."
    ],
    details: "Our structured development process guarantees a transparent, reliable timeline. We conduct strict code reviews and verify responsive behavior at every stage of development, delivering a clean, solid final build.",
    theme: "charcoal",
    layout: "timeline"
  },
  {
    id: 21,
    title: "PROJECT TIMELINE",
    subtitle: "12-Week Execution Plan and Target Deadlines",
    volume: "VOLUME IV: PROJECT EXECUTION & DELIVERY",
    bullets: [
      "Week 2 Milestone: Finalized responsive design mockups, asset lists, and typography styles.",
      "Week 6 Milestone: Fully functional local React application with modular sections and menu tabs.",
      "Week 9 Milestone: Finalized booking wizard flow, input validation, and responsive breakpoint tuning.",
      "Week 12 Milestone: Successful live deploy to production runners with verified SEO and performance metrics."
    ],
    details: "We map out our delivery across twelve focused weeks. By setting clear intermediate milestones, BBQ Tonight can monitor project progress, ensuring that the platform launches successfully and on time.",
    theme: "emerald",
    layout: "timeline"
  },
  {
    id: 22,
    title: "CORE DELIVERABLES",
    subtitle: "What the BBQ Tonight Brand Receives",
    volume: "VOLUME IV: PROJECT EXECUTION & DELIVERY",
    bullets: [
      "Production-Ready Code: Fully documented React/TypeScript build packages with optimized assets.",
      "High-Res Brand Asset Package: Formatted logo crest, smokehouse backgrounds, and custom vector icons.",
      "SEO & Metadata Configurations: Integrated JSON-LD restaurant schema scripts and optimized meta tags.",
      "System Documentation: Easy-to-follow guidelines for editing menu items, hours, and booking configurations."
    ],
    details: "Upon successful project completion, MetaWave Innovations transfers complete ownership of all code files, assets, and metadata configurations to BBQ Tonight, with full deployment to production runners.",
    theme: "charcoal",
    layout: "grid"
  },
  {
    id: 23,
    title: "QUALITY ASSURANCE",
    subtitle: "Rigorous Testing for Flawless Production Runs",
    volume: "VOLUME IV: PROJECT EXECUTION & DELIVERY",
    bullets: [
      "Cross-Device Validation: Multi-point testing on physical iPhones, iPads, Android phones, laptops, and wide screens.",
      "Strict Code Compilation: Complete validation with zero linter errors, zero missing imports, and strict type-safety.",
      "Simulated User Flow Testing: Running 500+ simulated reservation completions to verify input stability.",
      "Performance Benchmarks: Verifying page loading and layout shift metrics under high-latency network settings."
    ],
    details: "Our QA process is exhaustive. We verify that every component renders beautifully, responds instantly, and is completely free of syntax or visual bugs on all standard browser rendering engines.",
    theme: "charcoal",
    layout: "standard"
  },
  {
    id: 24,
    title: "MAINTENANCE & SUPPORT",
    subtitle: "Post-Launch Partnership and 24/7 SLA Uptime Guarantee",
    volume: "VOLUME IV: PROJECT EXECUTION & DELIVERY",
    bullets: [
      "Continuous Monitoring: Keeping tracking hooks active to ensure the website is online and responsive 24/7.",
      "Seasonal Asset Tuning: Compressing new seasonal dishes and marketing photos to maintain peak page speeds.",
      "Priority Edits SLA: 2-hour response time for holiday hours modifications, event banners, or quick menu text adjustments."
    ],
    details: "MetaWave Innovations remains your long-term digital partner. We don't just hand over code and disappear; we monitor server performance, security layers, and core web vitals to keep the website ranking highly.",
    theme: "charcoal",
    layout: "split"
  },
  {
    id: 25,
    title: "FUTURE ENHANCEMENTS",
    subtitle: "BBQ Tonight Phase II Growth Strategies",
    volume: "VOLUME V: GOVERNANCE, PRICING & AGREEMENT",
    bullets: [
      "VIP Loyalty Portal: Customer accounts where regular guests can track reservation points, access hidden recipes, and view VIP tables.",
      "SMS Notification Engine: Integrated twilio text messages to instantly send booking details and check-in reminders to customers.",
      "AI-Driven Catering Planner: Smart pricing engine that estimates charcoal costs, cuts, and quantities based on event details."
    ],
    details: "Our architecture is engineered for scalability. In Phase II, the platform can expand beyond a high-performance visual landing page into an advanced customer hub. New API integrations and server modules can be mounted on our clean code skeleton without breaking the existing UX.",
    theme: "emerald",
    layout: "grid"
  },
  {
    id: 26,
    title: "WHY CHOOSE METAWAVE INNOVATIONS",
    subtitle: "The Creative Agency That Redefines Web Luxury",
    volume: "VOLUME V: GOVERNANCE, PRICING & AGREEMENT",
    bullets: [
      "Obsessive Attention to Detail: Every pixel is placed with intent, maintaining strict visual harmony and typographic precision.",
      "Elite Hospitality Focus: We understand high-end dining, brand prestige, visual texture pacing, and high-conversion layouts.",
      "Production-First Execution: We deliver clean, fast, error-free code designed to achieve high organic rankings and booking rates."
    ],
    details: "MetaWave Innovations is a group of senior software engineers and visual designers. We combine strategic business goals, aesthetic luxury, and bulletproof engineering. We treat your project with the same respect and standard as we would our own flagship platform.",
    theme: "charcoal",
    layout: "split"
  },
  {
    id: 27,
    title: "INVESTMENT & PRICING",
    subtitle: "Transparent Pricing Tiers for Digital Excellence",
    volume: "VOLUME V: GOVERNANCE, PRICING & AGREEMENT",
    bullets: [
      "Standard Luxury Tier ($12,500): Complete single-screen responsive React 19 app, interactive menu, booking wizard, basic support.",
      "Elite Bespoke Tier ($18,500): Adds professional custom photography, local SEO campaign, 12-month support, and custom animations.",
      "Payment Milestones: 50% Kickoff Deposit, 30% Milestone Approval, 20% Successful VIP Launch and Code Handover."
    ],
    details: "Choose the package that aligns with your business goals. Our Pricing is straightforward and represents the highest tier of creative agency execution. Every dollar is mapped directly to strategic outcomes, visual precision, and flawless engineering.",
    theme: "charcoal",
    layout: "pricing"
  },
  {
    id: 28,
    title: "TERMS & CONDITIONS",
    subtitle: "Professional Engagement and Legal Clarity",
    volume: "VOLUME V: GOVERNANCE, PRICING & AGREEMENT",
    bullets: [
      "Intellectual Property: Full ownership of source code, configurations, custom graphics, and copy is transferred to client upon final payment.",
      "Scope Limits: Any feature requested outside the specified Scope of Work is subject to change-request pricing ($150/hr).",
      "Engagement Termination: Either party may exit the project with a 14-day notice, with payments adjusted to completed deliverables."
    ],
    details: "Our agreements are transparent, professional, and designed to protect the interests of both parties. We establish clear boundaries of work, payment structures, and intellectual property transfers, ensuring a smooth, positive creative partnership.",
    theme: "charcoal",
    layout: "standard"
  },
  {
    id: 29,
    title: "PROJECT ACCEPTANCE",
    subtitle: "Forging the Digital Partnership",
    volume: "VOLUME V: GOVERNANCE, PRICING & AGREEMENT",
    bullets: [
      "By signing below, the parties agree to embark on the digital transformation of BBQ Tonight under the terms, scope, and pricing detailed.",
      "BBQ Tonight: Representative: Pitmaster Jean-Luc Laurent, Title: Proprietor & Master Pitmaster, Date: _______________",
      "MetaWave Innovations: Representative: Executive Board, Title: Strategic Director, Date: _______________"
    ],
    details: "We are ready to translate BBQ Tonight's high-end, slow-smoked wood-fired legacy into a legendary digital masterpiece. Let us forge this partnership and build an experience that defines culinary luxury on the web.",
    theme: "emerald",
    layout: "acceptance"
  },
  {
    id: 30,
    title: "THANK YOU",
    subtitle: "Let's Ignite the Digital Embers",
    volume: "VOLUME V: GOVERNANCE, PRICING & AGREEMENT",
    bullets: [
      "Website: www.bbqtonight.com",
      "Email: agency@metawaveinnovations.com",
      "Phone: +1 (555) 728-6724",
      "Address: 472 Gourmet Blvd, Culinary District, NY 10013"
    ],
    details: "Thank you for reviewing our proposal. Pitmaster Jean-Luc Laurent, we look forward to working closely with you and the BBQ Tonight board. We are fully prepared to build a high-performance web asset that commands attention and elevates your legendary smokehouse to new gastronomical heights.",
    theme: "emerald",
    layout: "thanks"
  }
];

// GENERATE PPTX FILE
async function generatePPTX() {
  let pptx: any;
  if (typeof pptxgen === "function") {
    pptx = new (pptxgen as any)();
  } else if (pptxgen && typeof (pptxgen as any).default === "function") {
    pptx = new (pptxgen as any).default();
  } else {
    const PptxClass = require("pptxgenjs");
    pptx = new PptxClass();
  }
  pptx.layout = "LAYOUT_16x9";
  
  // Custom theme colors for pptx
  const colors = {
    emerald: "041D11",
    charcoal: "111512",
    gold: "D4AF37",
    white: "FFFFFF",
    gray: "A3A3A3"
  };

  for (const sData of SLIDES_DATA) {
    const slide = pptx.addSlide();
    const bg = sData.theme === "emerald" ? colors.emerald : colors.charcoal;
    slide.background = { color: bg };

    if (sData.layout === "cover") {
      // SLIDE 1: Cover Layout
      // Giant Title Block with Gold Crest and details
      slide.addText("METAWAVE INNOVATIONS", {
        x: 1.0, y: 1.2, w: 11.3, h: 0.4,
        fontSize: 14, fontFace: "Georgia", color: colors.gold, bold: true, charSpacing: 4
      });
      slide.addText("PREMIUM WEB ARCHITECTURE & BRAND PROPULSION", {
        x: 1.0, y: 1.7, w: 11.3, h: 1.2,
        fontSize: 34, fontFace: "Georgia", color: colors.white, bold: true
      });
      slide.addText("Where Wood-Fired Smoke Meets Gastronomical Luxury", {
        x: 1.0, y: 2.9, w: 11.3, h: 0.4,
        fontSize: 15, fontFace: "Georgia", color: colors.gold, italic: true
      });

      // Gold line accent
      slide.addShape(pptx.shapes.RECTANGLE, {
        x: 1.0, y: 3.5, w: 11.3, h: 0.03, fill: { color: colors.gold }
      });

      // Metadata block at bottom
      slide.addText(`PREPARED FOR: Pitmaster Jean-Luc Laurent & The BBQ Tonight Board\nDATE: July 5, 2026\nPROPOSAL ID: MW-BBQT-2026`, {
        x: 1.0, y: 3.8, w: 6.0, h: 1.2,
        fontSize: 10, fontFace: "Arial", color: colors.gray, lineSpacing: 1.4
      });
      slide.addText(`AGENCY PARTNER: MetaWave Innovations\nWEB PLATFORM: React 19, TypeScript, Tailwind v4\nBUILD DESIGN: High-End Responsive Architecture`, {
        x: 7.0, y: 3.8, w: 5.3, h: 1.2,
        fontSize: 10, fontFace: "Arial", color: colors.gray, lineSpacing: 1.4
      });
      continue;
    }

    if (sData.layout === "thanks") {
      // SLIDE 30: Concluding Slide
      slide.addText("METAWAVE INNOVATIONS", {
        x: 1.0, y: 1.2, w: 11.3, h: 0.4,
        fontSize: 14, fontFace: "Georgia", color: colors.gold, bold: true, charSpacing: 4
      });
      slide.addText("THANK YOU", {
        x: 1.0, y: 1.7, w: 11.3, h: 0.8,
        fontSize: 48, fontFace: "Georgia", color: colors.white, bold: true
      });
      slide.addText("Let's Ignite the Digital Embers Together", {
        x: 1.0, y: 2.6, w: 11.3, h: 0.4,
        fontSize: 16, fontFace: "Georgia", color: colors.gold, italic: true
      });

      slide.addShape(pptx.shapes.RECTANGLE, {
        x: 1.0, y: 3.2, w: 11.3, h: 0.03, fill: { color: colors.gold }
      });

      // Contact pillars as cards
      const contactW = 2.6;
      const contactY = 3.6;
      const gap = 0.3;
      const contacts = [
        { label: "EXPLORE APP", val: "www.bbqtonight.com" },
        { label: "DIRECT EMAIL", val: "agency@metawaveinnovations.com" },
        { label: "PHONE LINE", val: "+1 (555) 728-6724" },
        { label: "DISTRICT HEADQUARTERS", val: "472 Gourmet Blvd, NY 10013" }
      ];

      for (let i = 0; i < contacts.length; i++) {
        const xPos = 1.0 + i * (contactW + gap);
        // Card Background
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
          x: xPos, y: contactY, w: contactW, h: 1.4,
          fill: { color: "182620" }, line: { color: colors.gold, width: 1 }
        });
        slide.addText(contacts[i].label, {
          x: xPos + 0.15, y: contactY + 0.2, w: contactW - 0.3, h: 0.3,
          fontSize: 8, fontFace: "Arial", color: colors.gold, bold: true, charSpacing: 2
        });
        slide.addText(contacts[i].val, {
          x: xPos + 0.15, y: contactY + 0.5, w: contactW - 0.3, h: 0.7,
          fontSize: 10, fontFace: "Arial", color: colors.white, bold: true
        });
      }
      continue;
    }

    // HEADER SECTION FOR STANDARD SLIDES
    slide.addText(sData.volume.toUpperCase(), {
      x: 0.8, y: 0.4, w: 8.0, h: 0.3,
      fontSize: 8, fontFace: "Arial", color: colors.gold, bold: true, charSpacing: 3
    });
    slide.addText(sData.title, {
      x: 0.8, y: 0.7, w: 11.5, h: 0.6,
      fontSize: 24, fontFace: "Georgia", color: colors.white, bold: true
    });
    if (sData.subtitle) {
      slide.addText(sData.subtitle, {
        x: 0.8, y: 1.3, w: 11.5, h: 0.3,
        fontSize: 11, fontFace: "Georgia", color: colors.gold, italic: true
      });
    }
    slide.addShape(pptx.shapes.RECTANGLE, {
      x: 0.8, y: 1.7, w: 11.7, h: 0.02, fill: { color: "333F39" }
    });

    // CONTENT SECTION BY LAYOUTS
    if (sData.layout === "toc") {
      // Table of Contents 5 Columns Layout
      const groupY = 2.1;
      const groupH = 3.0;
      const groupW = 2.1;
      const colGap = 0.3;

      const groups = [
        { title: "VOL I: VISION", items: ["01. Cover Page", "02. Table of Contents", "03. Executive Summary", "04. Agency Profile", "05. Client Mandate", "06. Web Overview"] },
        { title: "VOL II: STRATEGY", items: ["07. Revenue Goals", "08. Web Objectives", "09. Scope of Work", "10. Core Features", "11. UI/UX Strategy", "12. Design Philosophy"] },
        { title: "VOL III: CODING", items: ["13. Style System", "14. Tech Stack", "15. Architecture", "16. Responsive UI", "17. Technical SEO", "18. Load Tuning"] },
        { title: "VOL IV: EXECUTION", items: ["19. Form Security", "20. Dev Blueprint", "21. Project Timeline", "22. Deliverables", "23. Quality Audits", "24. SLA Maintenance"] },
        { title: "VOL V: AGREE", items: ["25. Phase II Growth", "26. Why MetaWave", "27. Investment Scale", "28. Terms & Rules", "29. Sign Acceptance", "30. Showcase End"] }
      ];

      for (let i = 0; i < groups.length; i++) {
        const xPos = 0.8 + i * (groupW + colGap);
        // Column rounded bg card
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
          x: xPos, y: groupY, w: groupW, h: groupH,
          fill: { color: "111512" }, line: { color: colors.gold, width: 1 }
        });
        // Column Title
        slide.addText(groups[i].title, {
          x: xPos + 0.1, y: groupY + 0.15, w: groupW - 0.2, h: 0.3,
          fontSize: 9, fontFace: "Georgia", color: colors.gold, bold: true, align: "center"
        });
        // Divider line in column
        slide.addShape(pptx.shapes.RECTANGLE, {
          x: xPos + 0.1, y: groupY + 0.5, w: groupW - 0.2, h: 0.01, fill: { color: "333F39" }
        });
        // Items
        let textLines = "";
        for (const item of groups[i].items) {
          textLines += `• ${item}\n`;
        }
        slide.addText(textLines, {
          x: xPos + 0.1, y: groupY + 0.6, w: groupW - 0.2, h: 2.3,
          fontSize: 8.5, fontFace: "Arial", color: colors.white, lineSpacing: 1.6
        });
      }
    } 
    else if (sData.layout === "quote") {
      // Big Callout/Quote on the left, details on the right
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: 0.8, y: 2.1, w: 5.5, h: 3.0,
        fill: { color: "041D11" }, line: { color: colors.gold, width: 1.5 }
      });
      slide.addText(`“Where authentic hickory oakwood slow-smoke meets three generations of master pitmaster craftsmanship, creating an unforgettable masterwork on every responsive plate.”`, {
        x: 1.1, y: 2.4, w: 4.9, h: 2.4,
        fontSize: 16, fontFace: "Georgia", color: colors.white, italic: true, lineSpacing: 1.5
      });
      slide.addText(sData.details, {
        x: 6.7, y: 2.1, w: 5.8, h: 3.0,
        fontSize: 12, fontFace: "Arial", color: colors.gray, lineSpacing: 1.6
      });
    } 
    else if (sData.layout === "split") {
      // Two-column split layout
      slide.addText(sData.details, {
        x: 0.8, y: 2.1, w: 5.5, h: 3.0,
        fontSize: 12, fontFace: "Arial", color: colors.gray, lineSpacing: 1.6
      });
      // Bullet list card on the right
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: 6.7, y: 2.1, w: 5.8, h: 3.0,
        fill: { color: "182620" }, line: { color: "233F32", width: 1 }
      });
      let bText = "";
      for (const bullet of sData.bullets) {
        bText += `▪  ${bullet}\n\n`;
      }
      slide.addText(bText, {
        x: 7.0, y: 2.3, w: 5.2, h: 2.6,
        fontSize: 10, fontFace: "Arial", color: colors.white, lineSpacing: 1.4
      });
    } 
    else if (sData.layout === "grid") {
      // Multi-card grid (usually 4 items)
      const cardW = 2.7;
      const cardH = 2.8;
      const gap = 0.3;
      
      for (let i = 0; i < Math.min(sData.bullets.length, 4); i++) {
        const xPos = 0.8 + i * (cardW + gap);
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
          x: xPos, y: 2.1, w: cardW, h: cardH,
          fill: { color: "182620" }, line: { color: colors.gold, width: 1 }
        });
        
        const bulletParts = sData.bullets[i].split(":");
        const title = bulletParts[0] || "";
        const desc = bulletParts[1] || "";
        
        slide.addText(title.toUpperCase(), {
          x: xPos + 0.15, y: 2.3, w: cardW - 0.3, h: 0.6,
          fontSize: 11, fontFace: "Georgia", color: colors.gold, bold: true
        });
        slide.addText(desc, {
          x: xPos + 0.15, y: 3.0, w: cardW - 0.3, h: 1.7,
          fontSize: 9, fontFace: "Arial", color: colors.white, lineSpacing: 1.4
        });
      }
    } 
    else if (sData.layout === "timeline") {
      // Timeline layout with horizontal chevrons/arrows
      const stepW = 2.7;
      const stepH = 2.4;
      const gap = 0.3;
      
      for (let i = 0; i < Math.min(sData.bullets.length, 4); i++) {
        const xPos = 0.8 + i * (stepW + gap);
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
          x: xPos, y: 2.1, w: stepW, h: stepH,
          fill: { color: "111512" }, line: { color: colors.gold, width: 1.5 }
        });
        
        const bParts = sData.bullets[i].split(":");
        const pTitle = bParts[0] || "";
        const pDesc = bParts[1] || "";
        
        // Phase Number Badge
        slide.addShape(pptx.shapes.RECTANGLE, {
          x: xPos + 0.15, y: 2.25, w: 0.6, h: 0.3, fill: { color: colors.gold }
        });
        slide.addText(`0${i+1}`, {
          x: xPos + 0.15, y: 2.27, w: 0.6, h: 0.25,
          fontSize: 10, fontFace: "Arial", color: "000000", bold: true, align: "center"
        });
        
        slide.addText(pTitle, {
          x: xPos + 0.15, y: 2.65, w: stepW - 0.3, h: 0.5,
          fontSize: 11, fontFace: "Georgia", color: colors.white, bold: true
        });
        slide.addText(pDesc, {
          x: xPos + 0.15, y: 3.2, w: stepW - 0.3, h: 1.2,
          fontSize: 8.5, fontFace: "Arial", color: colors.gray, lineSpacing: 1.3
        });
      }
      
      // Bottom text paragraph
      slide.addText(sData.details, {
        x: 0.8, y: 4.7, w: 11.7, h: 0.5,
        fontSize: 10.5, fontFace: "Arial", color: colors.gray, italic: true
      });
    } 
    else if (sData.layout === "pricing") {
      // Pricing Tier comparison layout
      const priceW = 5.6;
      const priceH = 3.0;
      
      // Tier 1 Card
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: 0.8, y: 2.1, w: priceW, h: priceH,
        fill: { color: "111512" }, line: { color: "333F39", width: 1 }
      });
      slide.addText("STANDARD LUXURY DESIGN", {
        x: 1.0, y: 2.25, w: priceW - 0.4, h: 0.3,
        fontSize: 12, fontFace: "Georgia", color: colors.gold, bold: true
      });
      slide.addText("$12,500 USD", {
        x: 1.0, y: 2.6, w: priceW - 0.4, h: 0.4,
        fontSize: 22, fontFace: "Georgia", color: colors.white, bold: true
      });
      slide.addText("• Full modular React 19 single-screen platform\n• Friction-free multi-step booking wizard\n• Tabbed high-end smokehouse menu layout\n• Comprehensive responsive cross-device checking\n• Basic post-launch warranty maintenance (30 days)", {
        x: 1.0, y: 3.1, w: priceW - 0.4, h: 1.8,
        fontSize: 9.5, fontFace: "Arial", color: colors.gray, lineSpacing: 1.4
      });

      // Tier 2 Premium Card (Highlighting Gold)
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: 6.9, y: 2.1, w: priceW, h: priceH,
        fill: { color: "182620" }, line: { color: colors.gold, width: 2 }
      });
      slide.addText("ELITE BESPOKE DEVELOPMENT", {
        x: 7.1, y: 2.25, w: priceW - 0.4, h: 0.3,
        fontSize: 12, fontFace: "Georgia", color: colors.gold, bold: true
      });
      slide.addText("$18,500 USD", {
        x: 7.1, y: 2.6, w: priceW - 0.4, h: 0.4,
        fontSize: 22, fontFace: "Georgia", color: colors.white, bold: true
      });
      slide.addText("• Everything in standard plus: Custom typography assets\n• 12 months full technical SLA, updates, edits\n• Dynamic database synchronization & analytics proxying\n• Local restaurant SEO setup (JSON-LD structured data)\n• Multi-point graphic branding assets package", {
        x: 7.1, y: 3.1, w: priceW - 0.4, h: 1.8,
        fontSize: 9.5, fontFace: "Arial", color: colors.white, lineSpacing: 1.4
      });
    }
    else if (sData.layout === "acceptance") {
      // Signatures layout
      slide.addText(sData.details, {
        x: 0.8, y: 2.1, w: 11.7, h: 0.8,
        fontSize: 11.5, fontFace: "Arial", color: colors.gray, lineSpacing: 1.5
      });
      
      const sigW = 5.5;
      const sigY = 3.1;
      
      // Signature 1
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: 0.8, y: sigY, w: sigW, h: 1.8,
        fill: { color: "111512" }, line: { color: "333F39", width: 1 }
      });
      slide.addText("PREPARED FOR: BBQ TONIGHT", {
        x: 1.0, y: sigY + 0.15, w: sigW - 0.4, h: 0.3,
        fontSize: 9, fontFace: "Arial", color: colors.gold, bold: true
      });
      slide.addText("Signature: _________________________________\n\nRepresentative: Pitmaster Jean-Luc Laurent\nTitle: Proprietor & Master Pitmaster", {
        x: 1.0, y: sigY + 0.5, w: sigW - 0.4, h: 1.1,
        fontSize: 10, fontFace: "Arial", color: colors.white, lineSpacing: 1.4
      });

      // Signature 2
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: 7.0, y: sigY, w: sigW, h: 1.8,
        fill: { color: "111512" }, line: { color: "333F39", width: 1 }
      });
      slide.addText("PREPARED BY: METAWAVE INNOVATIONS", {
        x: 7.2, y: sigY + 0.15, w: sigW - 0.4, h: 0.3,
        fontSize: 9, fontFace: "Arial", color: colors.gold, bold: true
      });
      slide.addText("Signature: _________________________________\n\nRepresentative: MetaWave Executive Board\nTitle: Strategic Engineering Partner", {
        x: 7.2, y: sigY + 0.5, w: sigW - 0.4, h: 1.1,
        fontSize: 10, fontFace: "Arial", color: colors.white, lineSpacing: 1.4
      });
    }
    else {
      // STANDARD CONTENT LAYOUT
      slide.addText(sData.details, {
        x: 0.8, y: 2.1, w: 5.7, h: 3.0,
        fontSize: 12, fontFace: "Arial", color: colors.gray, lineSpacing: 1.6
      });
      
      // Bullets list box
      let listY = 2.1;
      for (const bullet of sData.bullets) {
        // Bullet mark icon (gold square)
        slide.addShape(pptx.shapes.RECTANGLE, {
          x: 7.0, y: listY + 0.05, w: 0.08, h: 0.08, fill: { color: colors.gold }
        });
        slide.addText(bullet, {
          x: 7.2, y: listY, w: 5.3, h: 0.8,
          fontSize: 10, fontFace: "Arial", color: colors.white, lineSpacing: 1.4
        });
        listY += 0.95;
      }
    }
  }

  await pptx.writeFile({ fileName: "BBQ_Tonight_Premium_Business_Proposal.pptx" });
  console.log("PPTX Generation Completed!");
}

// GENERATE DOCX FILE
async function generateDOCX() {
  const elements: any[] = [];

  // Custom styling elements
  const borderThin = { style: BorderStyle.SINGLE, size: 6, color: "D4AF37" };
  const borderNone = { style: BorderStyle.NONE, size: 0, color: "auto" };

  // 1. Cover Page Paragraphs
  elements.push(new Paragraph({ text: "", spacing: { before: 800 } }));
  elements.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: "METAWAVE INNOVATIONS",
        bold: true,
        size: 28,
        color: "D4AF37",
        font: "Georgia",
      }),
    ],
  }));
  elements.push(new Paragraph({ text: "", spacing: { before: 200 } }));
  elements.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: "PREMIUM WEB ARCHITECTURE & BRAND PROPULSION",
        bold: true,
        size: 40,
        color: "041D11",
        font: "Georgia",
      }),
    ],
  }));
  elements.push(new Paragraph({ text: "", spacing: { before: 100 } }));
  elements.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: "Where Wood-Fired Smoke Meets Gastronomical Luxury",
        italics: true,
        size: 24,
        color: "D4AF37",
        font: "Georgia",
      }),
    ],
  }));
  elements.push(new Paragraph({ text: "", spacing: { before: 1200 } }));

  // Cover Page table details
  elements.push(new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            borders: { top: borderThin, bottom: borderNone, left: borderNone, right: borderNone },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "\nPREPARED FOR:\nPitmaster Jean-Luc Laurent\nProprietor & Master Pitmaster\nBBQ Tonight Executive Board\n\nDATE: July 5, 2026",
                    size: 20,
                    color: "555555",
                    font: "Arial"
                  })
                ]
              })
            ]
          }),
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            borders: { top: borderThin, bottom: borderNone, left: borderNone, right: borderNone },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "\nPREPARED BY:\nMetaWave Innovations\nDigital Branding & Engineering\nSLA Support Services\n\nID: MW-BBQT-2026",
                    size: 20,
                    color: "555555",
                    font: "Arial"
                  })
                ]
              })
            ]
          }),
        ]
      })
    ]
  }));

  elements.push(new Paragraph({ children: [new PageBreak()] }));

  // Add standard slide contents as structured DOCX pages/chapters
  for (const sData of SLIDES_DATA) {
    if (sData.id === 1) continue; // Skip cover as we made a customized one

    // Chapter Header
    elements.push(new Paragraph({
      children: [
        new TextRun({
          text: sData.volume.toUpperCase(),
          bold: true,
          size: 16,
          color: "D4AF37",
          font: "Arial"
        })
      ]
    }));

    elements.push(new Paragraph({
      heading: HeadingLevel.HEADING_1,
      children: [
        new TextRun({
          text: `${sData.id - 1}. ${sData.title}`,
          bold: true,
          size: 32,
          color: "041D11",
          font: "Georgia"
        })
      ]
    }));

    if (sData.subtitle) {
      elements.push(new Paragraph({
        children: [
          new TextRun({
            text: sData.subtitle,
            italics: true,
            size: 20,
            color: "777777",
            font: "Georgia"
          })
        ]
      }));
    }

    elements.push(new Paragraph({ text: "", spacing: { before: 100 } }));

    // Primary detail paragraph
    elements.push(new Paragraph({
      spacing: { line: 360 },
      children: [
        new TextRun({
          text: sData.details,
          size: 22,
          color: "333333",
          font: "Arial"
        })
      ]
    }));

    // Bullet list if any
    if (sData.bullets.length > 0) {
      elements.push(new Paragraph({ text: "", spacing: { before: 100 } }));
      for (const bullet of sData.bullets) {
        elements.push(new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({
              text: bullet,
              size: 21,
              color: "111111",
              font: "Arial"
            })
          ]
        }));
      }
    }

    elements.push(new Paragraph({ children: [new PageBreak()] }));
  }

  const doc = new Document({
    sections: [{
      properties: {},
      children: elements
    }]
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync("BBQ_Tonight_Premium_Business_Proposal.docx", buffer);
  console.log("DOCX Generation Completed!");
}

// GENERATE PRESENTATION PDF FILE USING PDFKIT (16:9 LANDSCAPE SLIDES)
async function generatePDF() {
  const pdfDoc = new PDFDocument({
    size: [1000, 562.5],
    margins: { top: 0, bottom: 0, left: 0, right: 0 }
  });

  const stream = fs.createWriteStream("BBQ_Tonight_Premium_Business_Proposal.pdf");
  pdfDoc.pipe(stream);

  const colors = {
    emerald: "#041D11",
    charcoal: "#111512",
    gold: "#D4AF37",
    white: "#FFFFFF",
    gray: "#A3A3A3"
  };

  for (let idx = 0; idx < SLIDES_DATA.length; idx++) {
    if (idx > 0) {
      pdfDoc.addPage({ size: [1000, 562.5] });
    }

    const sData = SLIDES_DATA[idx];
    const bg = sData.theme === "emerald" ? colors.emerald : colors.charcoal;

    // Fill background
    pdfDoc.rect(0, 0, 1000, 562.5).fill(bg);

    if (sData.layout === "cover") {
      // PDF COVER PAGE
      pdfDoc.fillColor(colors.gold)
        .font("Helvetica-Bold")
        .fontSize(16)
        .text("METAWAVE INNOVATIONS", 100, 120, { characterSpacing: 4 });

      pdfDoc.fillColor(colors.white)
        .font("Times-Bold")
        .fontSize(38)
        .text("PREMIUM WEB ARCHITECTURE", 100, 160)
        .text("& BRAND PROPULSION", 100, 210);

      pdfDoc.fillColor(colors.gold)
        .font("Times-Italic")
        .fontSize(18)
        .text("Where Wood-Fired Smoke Meets Gastronomical Luxury", 100, 275);

      // Gold line
      pdfDoc.rect(100, 325, 800, 3).fill(colors.gold);

      // Metadata blocks
      pdfDoc.fillColor(colors.gray)
        .font("Helvetica")
        .fontSize(12)
        .text("PREPARED FOR: Pitmaster Jean-Luc Laurent & The BBQ Tonight Board", 100, 360, { lineGap: 10 })
        .text("DATE: July 5, 2026", 100, 385)
        .text("PROPOSAL ID: MW-BBQT-2026", 100, 410);

      pdfDoc.fillColor(colors.gray)
        .font("Helvetica")
        .fontSize(12)
        .text("AGENCY PARTNER: MetaWave Innovations", 600, 360, { lineGap: 10 })
        .text("BUILD ENGINE: React 19 + TypeScript + Tailwind CSS v4", 600, 385)
        .text("LAYOUT STRUCTURE: High-End Responsive Architecture", 600, 410);

      continue;
    }

    if (sData.layout === "thanks") {
      // PDF THANK YOU PAGE
      pdfDoc.fillColor(colors.gold)
        .font("Helvetica-Bold")
        .fontSize(16)
        .text("METAWAVE INNOVATIONS", 100, 120, { characterSpacing: 4 });

      pdfDoc.fillColor(colors.white)
        .font("Times-Bold")
        .fontSize(50)
        .text("THANK YOU", 100, 160);

      pdfDoc.fillColor(colors.gold)
        .font("Times-Italic")
        .fontSize(20)
        .text("Let's Ignite the Digital Embers Together", 100, 235);

      pdfDoc.rect(100, 290, 800, 3).fill(colors.gold);

      // Contact detail cards
      const contacts = [
        { title: "EXPLORE APP", val: "www.bbqtonight.com" },
        { title: "DIRECT EMAIL", val: "agency@metawaveinnovations.com" },
        { title: "PHONE LINE", val: "+1 (555) 728-6724" },
        { title: "HQ ADDRESS", val: "472 Gourmet Blvd, NY 10013" }
      ];

      const cardW = 180;
      const cardH = 120;
      const gap = 20;

      for (let i = 0; i < contacts.length; i++) {
        const xPos = 100 + i * (cardW + gap);
        const yPos = 340;

        pdfDoc.rect(xPos, yPos, cardW, cardH).strokeColor(colors.gold).lineWidth(1).stroke();
        pdfDoc.fillColor(colors.gold).font("Helvetica-Bold").fontSize(10).text(contacts[i].title, xPos + 15, yPos + 20, { characterSpacing: 1.5 });
        pdfDoc.fillColor(colors.white).font("Helvetica").fontSize(11).text(contacts[i].val, xPos + 15, yPos + 50, { width: cardW - 30, lineGap: 4 });
      }

      continue;
    }

    // STANDARD HEADER FOR PDF PAGES
    pdfDoc.fillColor(colors.gold)
      .font("Helvetica-Bold")
      .fontSize(9)
      .text(sData.volume.toUpperCase(), 80, 45, { characterSpacing: 3 });

    pdfDoc.fillColor(colors.white)
      .font("Times-Bold")
      .fontSize(26)
      .text(sData.title, 80, 68);

    if (sData.subtitle) {
      pdfDoc.fillColor(colors.gold)
        .font("Times-Italic")
        .fontSize(13)
        .text(sData.subtitle, 80, 115);
    }

    // Dark grey line divider
    pdfDoc.rect(80, 145, 840, 2).fill("#333F39");

    // STANDARD CONTENT FORMATTING
    const detailsX = 80;
    const detailsY = 180;
    const detailsWidth = 420;

    if (sData.layout === "toc") {
      // 5-column TOC on PDF
      const groupY = 180;
      const colW = 155;
      const colGap = 16;
      const groups = [
        { title: "VOL I: VISION", items: ["01. Cover Page", "02. Table Outline", "03. Exec Summary", "04. Agency Profile", "05. Client Mandate", "06. Web Anatomy"] },
        { title: "VOL II: STRATEGY", items: ["07. Profit Goals", "08. Metrics Spec", "09. Work Scope", "10. Core Assets", "11. UX Mechanics", "12. Design Ethos"] },
        { title: "VOL III: CODING", items: ["13. Style Rules", "14. Tech Matrix", "15. Code System", "16. Responsive UI", "17. Local SEO", "18. Load Speeds"] },
        { title: "VOL IV: EXECUTION", items: ["19. Form Security", "20. Dev Process", "21. Timeline Phase", "22. Deliverables", "23. QA Audits", "24. SLA Support"] },
        { title: "VOL V: AGREEMENT", items: ["25. Future Growth", "26. Agency Value", "27. Pricing Scale", "28. Engagement Terms", "29. Sign Off", "30. Final End"] }
      ];

      for (let i = 0; i < groups.length; i++) {
        const xPos = 80 + i * (colW + colGap);
        // Box
        pdfDoc.rect(xPos, groupY, colW, 310).strokeColor(colors.gold).lineWidth(1).stroke();
        // Title
        pdfDoc.fillColor(colors.gold).font("Times-Bold").fontSize(10).text(groups[i].title, xPos + 10, groupY + 15, { width: colW - 20, align: "center" });
        pdfDoc.rect(xPos + 10, groupY + 35, colW - 20, 1).fill("#333F39");
        
        // Lines
        let currentY = groupY + 50;
        pdfDoc.fillColor(colors.white).font("Helvetica").fontSize(9);
        for (const item of groups[i].items) {
          pdfDoc.text(`• ${item}`, xPos + 10, currentY);
          currentY += 40;
        }
      }
    } 
    else if (sData.layout === "quote") {
      // Left big quote card, right details
      pdfDoc.rect(80, 180, 420, 310).fill("#041D11").strokeColor(colors.gold).lineWidth(2).stroke();
      pdfDoc.fillColor(colors.white)
        .font("Times-Italic")
        .fontSize(18)
        .text(`“Where authentic hickory oakwood slow-smoke meets three generations of master pitmaster craftsmanship, creating an unforgettable masterwork on every responsive plate.”`, 105, 230, { width: 370, lineGap: 8 });

      pdfDoc.fillColor(colors.gray)
        .font("Helvetica")
        .fontSize(13)
        .text(sData.details, 530, 180, { width: 390, lineGap: 8 });
    } 
    else if (sData.layout === "split") {
      // Two-column split paragraph and card
      pdfDoc.fillColor(colors.gray)
        .font("Helvetica")
        .fontSize(13)
        .text(sData.details, 80, 180, { width: 420, lineGap: 8 });

      const cardX = 530;
      pdfDoc.rect(cardX, 180, 390, 310).fill("#182620");
      pdfDoc.rect(cardX, 180, 390, 310).strokeColor("#233F32").lineWidth(1).stroke();

      let bulletY = 210;
      pdfDoc.fillColor(colors.white).font("Helvetica").fontSize(11);
      for (const bullet of sData.bullets) {
        pdfDoc.text(`▪  ${bullet}`, cardX + 25, bulletY, { width: 340, lineGap: 6 });
        bulletY += 85;
      }
    } 
    else if (sData.layout === "grid") {
      // 4 Cards Grid on PDF
      const cardW = 200;
      const cardH = 310;
      const gap = 13;

      for (let i = 0; i < Math.min(sData.bullets.length, 4); i++) {
        const xPos = 80 + i * (cardW + gap);
        pdfDoc.rect(xPos, 180, cardW, cardH).fill("#182620").strokeColor(colors.gold).lineWidth(1).stroke();

        const bulletParts = sData.bullets[i].split(":");
        const title = bulletParts[0] || "";
        const desc = bulletParts[1] || "";

        pdfDoc.fillColor(colors.gold).font("Times-Bold").fontSize(13).text(title.toUpperCase(), xPos + 15, 205, { width: cardW - 30, lineGap: 3 });
        pdfDoc.fillColor(colors.white).font("Helvetica").fontSize(10).text(desc, xPos + 15, 270, { width: cardW - 30, lineGap: 6 });
      }
    } 
    else if (sData.layout === "timeline") {
      // Timeline presentation layout
      const stepW = 200;
      const stepH = 240;
      const gap = 13;

      for (let i = 0; i < Math.min(sData.bullets.length, 4); i++) {
        const xPos = 80 + i * (stepW + gap);
        pdfDoc.rect(xPos, 180, stepW, stepH).fill("#111512").strokeColor(colors.gold).lineWidth(1.5).stroke();

        const bParts = sData.bullets[i].split(":");
        const pTitle = bParts[0] || "";
        const pDesc = bParts[1] || "";

        // Stage label box
        pdfDoc.rect(xPos + 15, 195, 45, 22).fill(colors.gold);
        pdfDoc.fillColor("#000000").font("Helvetica-Bold").fontSize(11).text(`0${i+1}`, xPos + 15, 201, { width: 45, align: "center" });

        pdfDoc.fillColor(colors.white).font("Times-Bold").fontSize(13).text(pTitle, xPos + 15, 235, { width: stepW - 30 });
        pdfDoc.fillColor(colors.gray).font("Helvetica").fontSize(10).text(pDesc, xPos + 15, 285, { width: stepW - 30, lineGap: 4 });
      }

      // Details inline footer text
      pdfDoc.fillColor(colors.gray).font("Helvetica-Oblique").fontSize(11).text(sData.details, 80, 455, { width: 840, align: "center" });
    } 
    else if (sData.layout === "pricing") {
      // Pricing cards side by side
      const pW = 405;
      const pH = 310;

      // Card 1
      pdfDoc.rect(80, 180, pW, pH).fill("#111512").strokeColor("#333F39").lineWidth(1).stroke();
      pdfDoc.fillColor(colors.gold).font("Times-Bold").fontSize(14).text("STANDARD LUXURY DESIGN", 100, 205);
      pdfDoc.fillColor(colors.white).font("Times-Bold").fontSize(24).text("$12,500 USD", 100, 235);
      pdfDoc.fillColor(colors.gray).font("Helvetica").fontSize(11.5).text("• Full modular React 19 single-screen platform\n• Friction-free multi-step booking wizard\n• Tabbed high-end smokehouse menu layout\n• Comprehensive responsive cross-device checking\n• Basic post-launch warranty maintenance (30 days)", 100, 280, { lineGap: 8 });

      // Card 2
      pdfDoc.rect(515, 180, pW, pH).fill("#182620").strokeColor(colors.gold).lineWidth(2).stroke();
      pdfDoc.fillColor(colors.gold).font("Times-Bold").fontSize(14).text("ELITE BESPOKE DEVELOPMENT", 535, 205);
      pdfDoc.fillColor(colors.white).font("Times-Bold").fontSize(24).text("$18,500 USD", 535, 235);
      pdfDoc.fillColor(colors.white).font("Helvetica").fontSize(11.5).text("• Everything in standard plus: Custom typography assets\n• 12 months full technical SLA, updates, edits\n• Dynamic database synchronization & analytics proxying\n• Local restaurant SEO setup (JSON-LD structured data)\n• Multi-point graphic branding assets package", 535, 280, { lineGap: 8 });
    }
    else if (sData.layout === "acceptance") {
      // Signature fields
      pdfDoc.fillColor(colors.gray).font("Helvetica").fontSize(12).text(sData.details, 80, 180, { width: 840, lineGap: 6 });

      const sigW = 405;
      const sigH = 200;
      const sigY = 280;

      // Customer Sig Box
      pdfDoc.rect(80, sigY, sigW, sigH).fill("#111512").strokeColor("#333F39").lineWidth(1).stroke();
      pdfDoc.fillColor(colors.gold).font("Helvetica-Bold").fontSize(10).text("PREPARED FOR: BBQ TONIGHT", 100, sigY + 20);
      pdfDoc.fillColor(colors.white).font("Helvetica").fontSize(11).text("Signature: _________________________________\n\nRepresentative: Pitmaster Jean-Luc Laurent\nTitle: Proprietor & Master Pitmaster", 100, sigY + 60, { lineGap: 8 });

      // Agency Sig Box
      pdfDoc.rect(515, sigY, sigW, sigH).fill("#111512").strokeColor("#333F39").lineWidth(1).stroke();
      pdfDoc.fillColor(colors.gold).font("Helvetica-Bold").fontSize(10).text("PREPARED BY: METAWAVE INNOVATIONS", 535, sigY + 20);
      pdfDoc.fillColor(colors.white).font("Helvetica").fontSize(11).text("Signature: _________________________________\n\nRepresentative: MetaWave Executive Board\nTitle: Strategic Engineering Partner", 535, sigY + 60, { lineGap: 8 });
    }
    else {
      // STANDARD 2-COLUMN TEXT AND BULLET SECTION
      pdfDoc.fillColor(colors.gray)
        .font("Helvetica")
        .fontSize(13)
        .text(sData.details, 80, 180, { width: 420, lineGap: 8 });

      let bulletY = 180;
      pdfDoc.fillColor(colors.white).font("Helvetica").fontSize(11);
      for (const bullet of sData.bullets) {
        // Gold bullet squares
        pdfDoc.rect(540, bulletY + 4, 6, 6).fill(colors.gold);
        pdfDoc.fillColor(colors.white).text(bullet, 560, bulletY, { width: 360, lineGap: 6 });
        bulletY += 100;
      }
    }
  }

  pdfDoc.end();
  console.log("PDF Generation Completed!");
}

// MAIN TRIGGER EXECUTOR
async function run() {
  console.log("Starting Document Generators...");
  try {
    await generatePPTX();
    await generateDOCX();
    await generatePDF();
    console.log("-----------------------------------------");
    console.log("All premium files successfully exported!");
    console.log("1. /BBQ_Tonight_Premium_Business_Proposal.pptx");
    console.log("2. /BBQ_Tonight_Premium_Business_Proposal.docx");
    console.log("3. /BBQ_Tonight_Premium_Business_Proposal.pdf");
    console.log("-----------------------------------------");
  } catch (err) {
    console.error("Generator Error:", err);
  }
}

run();
