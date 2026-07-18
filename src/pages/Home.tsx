import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SAMPLE_PROJECTS } from "../data";
import { initScrollReveal } from "../utils";

interface HomeProps {
  onNavigate: (slug: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  // 1. Hero Carousel Setup
  const heroPhotos = [
    "/images/projects/01-coastal-residence/01-coastal-hero.jpg", // Coastal Residence
    "/images/projects/02-container-home/02-container-hero.jpg", // Container Home
    "/images/projects/03-yuhum-hotel/03-yuhum-hero.jpg" // Yuhum Hotel
  ];

  const [heroIndex, setHeroIndex] = useState(0);
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const heroTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isHoveringHero) {
      heroTimer.current = setInterval(() => {
        setHeroIndex((prev) => (prev + 1) % heroPhotos.length);
      }, 6000);
    } else {
      if (heroTimer.current) clearInterval(heroTimer.current);
    }

    return () => {
      if (heroTimer.current) clearInterval(heroTimer.current);
    };
  }, [isHoveringHero]);

  const handlePrevHero = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHeroIndex((prev) => (prev - 1 + heroPhotos.length) % heroPhotos.length);
  };

  const handleNextHero = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHeroIndex((prev) => (prev + 1) % heroPhotos.length);
  };

  // 2. Bio Expansion State ("Discover My Story")
  const [storyExpanded, setStoryExpanded] = useState(false);

  // 4. Scroll Reveal Setup
  useEffect(() => {
    const cleanup = initScrollReveal();
    return cleanup;
  }, []);

  return (
    <div className="paper-grain" id="home-view">
      {/* SECTION 1: HERO - FULL-WIDTH LOOKBOOK COVER CAROUSEL */}
      <section
        id="home"
        className="relative w-full h-screen overflow-hidden"
        onMouseEnter={() => setIsHoveringHero(true)}
        onMouseLeave={() => setIsHoveringHero(false)}
      >
        {/* Full cover carousel with overlapping massive serif text and frosted banner */}
        <div className="relative w-full h-full bg-ink flex flex-col justify-between">
          
          {/* Carousel Background Images */}
          {heroPhotos.map((photo, idx) => (
            <div
              key={photo}
              className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-[1500ms] ease-out ${
                idx === heroIndex
                  ? "opacity-100 scale-100 translate-x-0"
                  : "opacity-0 scale-105"
              }`}
              style={{ backgroundImage: `url(${photo})` }}
            />
          ))}

          {/* Soft premium dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/30 to-transparent pointer-events-none z-10" />

          {/* Vignette Overlay for focus & text contrast */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(26,26,27,0.55)_100%)] pointer-events-none z-10 opacity-80" />

          {/* Header Spacer for lookbook style */}
          <div className="h-24 w-full z-10 shrink-0 select-none" />

          {/* Centerpiece: Simple elegant left-aligned serif titles exactly like the image */}
          <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-4xl select-none flex flex-col justify-center grow">
            {/* Elegant Open to Work indicator */}
            <div className="flex items-center gap-2.5 text-paper/85 text-[10px] font-mono tracking-[0.25em] uppercase mb-6 animate-fade-in select-none" id="hero-open-to-work">
              <span className="w-1.5 h-1.5 rounded-full bg-paper/50" />
              <span>Available for Commissions</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight text-paper mb-4 uppercase animate-fade-in">
              DESIGN <br />PORTFOLIO
            </h1>
            <p className="font-sans text-xs sm:text-sm md:text-base text-paper/90 font-light leading-relaxed mb-10 max-w-xl animate-fade-in delay-100">
              A curated selection of residential, commercial, and community projects designed for holistic spatial harmony.
            </p>
            <div>
              <button 
                onClick={() => { window.location.hash = "#contact"; }}
                className="px-8 py-3.5 border border-paper/30 bg-ink/25 hover:bg-paper hover:text-ink hover:border-paper text-paper transition-all duration-300 font-sans text-xs tracking-wider uppercase font-medium rounded-sm shadow-md cursor-pointer inline-block"
                id="hero-cta-btn"
              >
                Book a Consultation
              </button>
            </div>
          </div>

          {/* Bottom Controls / Indicator Row */}
          <div className="relative z-10 p-8 md:p-12 flex justify-end items-center bg-gradient-to-t from-ink/40 to-transparent">
            {/* Navigation buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevHero}
                className="w-10 h-10 rounded-full border border-paper/20 flex items-center justify-center text-paper hover:bg-paper hover:text-ink transition-all duration-300"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextHero}
                className="w-10 h-10 rounded-full border border-paper/20 flex items-center justify-center text-paper hover:bg-paper hover:text-ink transition-all duration-300"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>



      {/* SECTION 3: ABOUT SPLIT SECTION */}
      <section className="py-24 bg-paper/50 border-t border-b border-mist/10" id="about">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          {/* Left Column: Biography */}
          <div className="md:col-span-6 space-y-6 fade-up" id="about-bio-panel">
            <span className="font-mono text-xs tracking-[0.25em] text-slate uppercase block">
              ABOUT THE DESIGNER
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-ink uppercase">
              Crafting Meaningful Interiors
            </h2>
            <div className="space-y-4 text-sm text-ink/70 font-light leading-relaxed">
              <p>
                A fresh Bachelor of Science in Interior Design graduate with a passion for transforming spaces into functional and striking environments.
              </p>
              <p>
                Experienced in residential, commercial, hospitality, and community-centered design. Focused on research-driven, sustainable spaces with positive social impact.
              </p>
            </div>

            {/* Toggleable detailed Story for premium craft feel */}
            {storyExpanded && (
              <div className="pt-4 border-t border-mist/20 text-sm text-ink/70 font-light space-y-4 animate-fade-in" id="expanded-story">
                <p>
                  Kaela's solo design thesis, "Bangon Bayan: Designing A Facility for Food and Community Resilience Through Capability Approach Theory," received the prestigious Best Thesis Award in July 2026. This foundation informs her holistic, research-driven approach to architectural well-being.
                </p>
                <p>
                  Graduating cum laude from De La Salle-College of Saint Benilde with a major in Construction and Project Management, she bridges technical structural execution with human-centric ergonomics. Her design methodology integrates natural ventilation, sustainable material sourcing, and adaptive spatial reuse.
                </p>
              </div>
            )}

            <div className="pt-4">
              <button
                onClick={() => setStoryExpanded(!storyExpanded)}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-ink text-paper font-mono text-xs uppercase tracking-widest hover:bg-slate transition-all duration-300 focus:outline-none"
                id="discover-story-btn"
              >
                {storyExpanded ? "Hide Story" : "Discover My Story"}
              </button>
            </div>
          </div>

          {/* Right Column: Featured Project card */}
          <div className="md:col-span-6 fade-up" id="about-featured-card-panel">
            <div className="relative group overflow-hidden rounded-md shadow-xl aspect-4/3 cursor-pointer" onClick={() => onNavigate("coastal-residence")}>
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                style={{ backgroundImage: `url('/images/projects/01-coastal-residence/01-coastal-hero.jpg')` }}
              />
              {/* Dark subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />

              {/* Stylized Photography Border Frame */}
              <div className="absolute inset-4 border border-paper/10 group-hover:border-paper/20 transition-all duration-500 pointer-events-none z-10" />
              <div className="absolute inset-5 border border-paper/5 opacity-50 group-hover:opacity-75 transition-all duration-500 pointer-events-none z-10" />

              {/* Text overlays */}
              <div className="absolute bottom-8 left-8 right-8 text-paper">
                <span className="font-mono text-xxs tracking-[0.25em] text-sky-100 uppercase block mb-1">
                  FEATURED PROJECT
                </span>
                <h3 className="font-serif text-2xl tracking-tight mb-4">
                  Coastal Residence
                </h3>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-sky-200/80 group-hover:text-white transition-colors">
                  View Project <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURED PROJECTS (ASYMMETRICAL EDITORIAL GRID) */}
      <section className="py-24 max-w-7xl mx-auto px-6" id="projects">
        <div className="mb-16 text-center fade-up">
          <span className="font-mono text-xs tracking-[0.25em] text-slate uppercase block mb-3">
            PORTFOLIO HIGHLIGHTS
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-ink uppercase">
            Crafted Environments
          </h2>
          <div className="w-12 h-1 bg-slate mx-auto mt-6 rounded-full" />
        </div>

        {/* 6 projects in asymmetric editorial grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          {SAMPLE_PROJECTS.map((project, index) => {
            // Asymmetric layout sizing per project card
            let colSpan = "col-span-12";
            if (index === 0) colSpan = "col-span-12 md:col-span-8"; // Wide
            else if (index === 1) colSpan = "col-span-12 md:col-span-4"; // Narrow
            else if (index === 2) colSpan = "col-span-12 md:col-span-5"; // Medium
            else if (index === 3) colSpan = "col-span-12 md:col-span-7"; // Wide-Medium
            else if (index === 4) colSpan = "col-span-12 md:col-span-7"; // Wide-Medium
            else if (index === 5) colSpan = "col-span-12 md:col-span-5"; // Medium-Narrow

            // Alternate aspect ratios for layout organic rhythm
            const aspectClass = index === 0 || index === 3 || index === 4 ? "aspect-16/10" : "aspect-4/5";

            return (
              <div
                key={project.slug}
                onClick={() => onNavigate(project.slug)}
                className={`${colSpan} group cursor-pointer fade-up`}
                id={`project-card-${project.slug}`}
              >
                <div className="relative overflow-hidden rounded-md shadow-md mb-4 bg-ink">
                  {/* Photo with slow zoom */}
                  <div
                    className={`${aspectClass} w-full bg-cover bg-center transition-transform duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-103`}
                    style={{ backgroundImage: `url(${project.heroImage})` }}
                  />

                  {/* Navy overlay tinted color block fading in on hover */}
                  <div className="absolute inset-0 bg-navy/40 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Fine linear gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent opacity-85" />

                  {/* Stylized Photography Inset Frame */}
                  <div className="absolute inset-3 border border-paper/10 group-hover:border-paper/20 transition-all duration-500 pointer-events-none z-10" />
                  <div className="absolute inset-4 border border-paper/5 opacity-40 group-hover:opacity-60 transition-all duration-500 pointer-events-none z-10" />

                  {/* Overlay text detail info */}
                  <div className="absolute bottom-6 left-6 right-6 text-paper flex items-end justify-between">
                    <div>
                      <span className="font-mono text-xxs tracking-[0.25em] text-sky-100 uppercase block mb-1">
                        {project.category}
                      </span>
                      <h4 className="font-serif text-xl md:text-2xl tracking-wide">
                        {project.name}
                      </h4>
                    </div>
                    <span className="p-3.5 bg-paper text-ink rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 shadow-lg">
                      <ArrowRight className="w-4 h-4 text-slate" />
                    </span>
                  </div>
                </div>

                {/* Metadata details beneath card for pristine typography alignment */}
                <div className="flex justify-between items-baseline px-1">
                  <span className="font-serif text-base text-ink/90 font-medium tracking-tight">
                    {project.name}
                  </span>
                  <span className="font-mono text-xxs text-mist tracking-widest uppercase">
                    {project.year}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 6: CTA BAND (NAVY BACKGROUND) */}
      <section className="py-24 bg-navy text-paper" id="cta-band">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8 fade-up">
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight leading-tight max-w-3xl mx-auto">
            Have a space in mind? <br />
            Let's create something <span className="italic font-normal text-mist">meaningful.</span>
          </h2>
          <p className="text-sm text-paper/80 font-light max-w-md mx-auto leading-relaxed">
            From spatial consults to full luxury installations, let's turn your environment into a personalized, sustainable masterpiece.
          </p>
          <div className="pt-4">
            <a
              href="#contact"
              onClick={() => onNavigate("contact")}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full border border-paper/40 text-paper font-mono text-xs uppercase tracking-widest hover:bg-paper hover:text-navy hover:border-paper transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98]"
              id="cta-contact-btn"
            >
              Contact Me <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
