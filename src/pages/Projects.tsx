import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { SAMPLE_PROJECTS } from "../data";
import { initScrollReveal } from "../utils";

interface ProjectsProps {
  onNavigate: (slug: string) => void;
}

export default function Projects({ onNavigate }: ProjectsProps) {
  useEffect(() => {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    
    // Trigger scroll reveals
    const cleanup = initScrollReveal();
    return cleanup;
  }, []);

  // Map slugs to their precise lookbook asymmetric grid configurations (as seen in the reference image)
  const getGridConfig = (slug: string) => {
    switch (slug) {
      case "coastal-residence": // Position 1: Wide Top Left (spans 2 columns)
        return {
          gridClass: "lg:col-span-2 lg:col-start-1 lg:row-start-1",
          aspectClass: "aspect-[16/9] lg:aspect-[21/10]",
        };
      case "container-home": // Position 2: Top Right (vertical-ish)
        return {
          gridClass: "lg:col-span-1 lg:col-start-3 lg:row-start-1",
          aspectClass: "aspect-4/3 lg:aspect-[4/4.8]",
        };
      case "hotel-concept": // Position 3: Middle Center (horizontal-ish)
        return {
          gridClass: "lg:col-span-1 lg:col-start-2 lg:row-start-2",
          aspectClass: "aspect-16/10 lg:aspect-[1.6/1]",
        };
      case "giliw-learning-facility": // Position 4: Bottom Left (vertical-ish)
        return {
          gridClass: "lg:col-span-1 lg:col-start-1 lg:row-start-2 lg:row-span-2",
          aspectClass: "aspect-[3/4] lg:aspect-[3/4.9]",
        };
      case "community-resilience-facility": // Position 5: Bottom Center (horizontal-ish)
        return {
          gridClass: "lg:col-span-1 lg:col-start-2 lg:row-start-3",
          aspectClass: "aspect-16/10 lg:aspect-[1.6/1]",
        };
      case "iglu-round-sofa": // Position 6: Bottom Right (vertical-ish)
        return {
          gridClass: "lg:col-span-1 lg:col-start-3 lg:row-start-2 lg:row-span-2",
          aspectClass: "aspect-[3/4] lg:aspect-[3/4.9]",
        };
      default:
        return {
          gridClass: "",
          aspectClass: "aspect-4/3",
        };
    }
  };

  return (
    <div className="paper-grain pt-32 pb-24 relative overflow-hidden min-h-screen animate-fade-in" id="projects-view">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* LOOKBOOK HEADER */}
        <div className="border-b border-mist/20 pb-8 mb-16 flex flex-col md:flex-row justify-between items-baseline gap-4 fade-up">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-ink uppercase">
              SELECTED PROJECTS
            </h1>
          </div>
          <div className="font-mono text-[9px] text-mist tracking-widest uppercase font-light">
            <span>KAELA V. BORBON PORTFOLIO</span>
            <span className="mx-2 select-none">|</span>
            <span>VOL. 01 — ARCHIVE</span>
          </div>
        </div>

        {/* ASYMMETRICAL LOOKBOOK GRID (Exactly matching reference image structure) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch" id="projects-lookbook-grid">
          {SAMPLE_PROJECTS.map((project) => {
            const config = getGridConfig(project.slug);
            
            return (
              <div
                key={project.slug}
                onClick={() => onNavigate(project.slug)}
                className={`group cursor-pointer flex flex-col h-full rounded-sm overflow-hidden transition-all duration-500 fade-up ${config.gridClass}`}
                id={`projects-lookbook-card-${project.slug}`}
              >
                {/* Image Wrap */}
                <div className={`relative overflow-hidden w-full grow bg-ink rounded-sm ${config.aspectClass}`}>
                  <img
                    src={project.heroImage}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-[1.025]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle top-left badge overlay */}
                  <div className="absolute top-4 left-4 bg-[#242424]/90 backdrop-blur-xs px-2.5 py-1 rounded-xs text-[8px] font-mono tracking-widest uppercase text-paper border border-white/5">
                    {project.category}
                  </div>
                </div>

                {/* Clean minimalist banner underneath the image (no dark backsplash) */}
                <div className="pt-4 pb-2 bg-transparent shrink-0 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg md:text-xl font-light text-ink tracking-wide group-hover:text-slate transition-colors leading-tight">
                      {project.name}
                    </h3>
                  </div>
                  
                  {/* Micro hover indicator line */}
                  <div className="w-full h-px bg-mist/20 group-hover:bg-slate/30 transition-colors mt-4 pt-0.5" />
                  <div className="flex items-center justify-between text-[8px] font-mono tracking-widest uppercase text-slate/60 group-hover:text-ink transition-colors pt-3">
                    <span>Explore project</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Design Quality Assurance Footnote */}
        <div className="mt-24 border-t border-mist/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[9px] text-mist tracking-widest uppercase fade-up" id="projects-assurance">
          <span>All blueprints signed & verified</span>
          <span>Manila — CSB Construction & Project Management aligned</span>
          <span>© Kaela V. Borbon</span>
        </div>

      </div>
    </div>
  );
}
