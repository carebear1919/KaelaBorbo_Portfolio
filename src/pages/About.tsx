import React, { useEffect } from "react";
import { initScrollReveal } from "../utils";

export default function About() {
  useEffect(() => {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    
    // Trigger scroll reveals
    const cleanup = initScrollReveal();
    return cleanup;
  }, []);

  const interests = [
    "Sketching",
    "Singing",
    "Travelling",
    "Photography",
    "Exploring new opportunities"
  ];

  return (
    <div className="paper-grain pt-32 pb-24 relative overflow-hidden min-h-screen animate-fade-in" id="about-view">
      
      {/* Dynamic Background Grid lines mimicking structural draft layouts */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] z-0">
        <div className="absolute left-[8%] top-0 bottom-0 w-px bg-ink" />
        <div className="absolute left-[25%] top-0 bottom-0 w-px bg-ink" />
        <div className="absolute right-[15%] top-0 bottom-0 w-px bg-ink" />
        <div className="absolute top-[20%] left-0 right-0 h-px bg-ink" />
        <div className="absolute top-[55%] left-0 right-0 h-px bg-ink" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* SECTION 1: HERO DISPLAY TYPOGRAPHY & PORTRAIT STATEMENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-32 items-end">
          
          <div className="lg:col-span-8 space-y-4 fade-up">
            <span className="font-mono text-[9px] tracking-[0.45em] text-slate uppercase block">
              PORTFOLIO BIOGRAPHY / EST. 2026
            </span>
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-[5.5rem] font-light tracking-tighter text-ink leading-[0.85] uppercase">
              KAELA V.<br />
              <span className="italic pl-12 font-normal text-slate/90 lowercase tracking-normal">borbon</span>
            </h1>
          </div>

          <div className="lg:col-span-4 lg:text-right font-mono text-[9px] text-mist/80 tracking-[0.25em] uppercase pb-2 border-b lg:border-b-0 border-mist/20 flex flex-col items-start lg:items-end gap-2">
            <span>Manila, Philippines</span>
            <span className="block">Interior Design Specialist</span>
            <div className="flex items-center gap-1.5 text-slate text-[9px] font-mono tracking-[0.2em] uppercase select-none mt-2" id="about-open-to-work">
              <span className="w-1.5 h-1.5 rounded-full bg-slate/40" />
              <span>Available for Projects</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: THE ABSTRACT BIO & INTERVIEW SPREAD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-36">
          
          {/* Asymmetrical Floating Block (Left Side) */}
          <div className="lg:col-span-4 flex flex-col justify-between p-8 bg-ink text-paper rounded-sm shadow-xl relative overflow-hidden lg:-mt-12 lg:mb-12 min-h-[300px] fade-up">
            <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-paper/5 pointer-events-none" />
            <div>
              <span className="font-mono text-[8px] tracking-[0.3em] text-mist uppercase block mb-1">DESIGN PHILOSOPHY</span>
              <div className="w-10 h-px bg-mist/30 my-4" />
              <p className="font-serif text-lg font-light leading-relaxed italic text-paper/90">
                Transforming spaces into functional and striking environments with a strong interest in creating research-driven spaces.
              </p>
            </div>
            <div className="font-mono text-[9px] text-mist/60 uppercase tracking-widest pt-8">
              <span>VOL. 01 — PORTFOLIO ARCHIVE</span>
            </div>
          </div>

          {/* Clean Grayscale Portrait (Middle Column) */}
          <div className="lg:col-span-4 relative group overflow-hidden rounded-sm border border-mist/20 shadow-lg fade-up">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80"
              alt="Kaela V. Borbon Portrait"
              className="w-full h-full min-h-[380px] object-cover filter grayscale contrast-[1.04] brightness-95 group-hover:scale-101 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 left-4 bg-[#242424]/90 backdrop-blur-xs text-paper px-3 py-1 font-mono text-[8px] uppercase tracking-widest border border-white/10 rounded-xs">
              BS Interior Design
            </div>
          </div>

          {/* Core Biography Statement utilizing Exact words */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-8 fade-up">
            <p className="text-xs md:text-sm text-ink leading-relaxed font-light text-justify">
              A fresh Bachelor of Science in Interior Design graduate (July 2026) and a creative individual with a passion for transforming spaces into functional and striking environments. Adept at utilizing various software applications and design methods to create visually appealing design concepts. Has experience in residential, commercial, hospitality, and community-centered design, with a strong interest in creating research-driven spaces that foster sustainability and positive social impact.
            </p>

            {/* Editorial list of personal interests */}
            <div className="pt-6 border-t border-mist/20">
              <span className="font-mono text-[8px] tracking-[0.3em] text-mist uppercase block mb-3">Interests</span>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-[10px] text-slate font-light">
                {interests.map((item, idx) => (
                  <span key={item} className="flex items-center">
                    <span>{item}</span>
                    {idx < interests.length - 1 && <span className="text-mist/50 ml-3 select-none">|</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 3: WORK EXPERIENCE & ACCOMPLISHMENTS (Staggered Layout) */}
        <div className="mb-36">
          <div className="border-b border-mist/20 pb-4 mb-16 fade-up">
            <span className="font-mono text-[9px] tracking-[0.4em] text-slate uppercase block mb-2">RECORD OF EXECUTION</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-ink uppercase">
              WORK EXPERIENCE
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Job block 1 */}
            <div className="lg:col-span-6 relative bg-paper border border-mist/15 p-8 rounded-sm shadow-2xs hover:shadow-xs transition-shadow duration-300 fade-up">
              <div className="absolute -left-1.5 top-8 w-3 h-px bg-slate" />
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-serif text-2xl font-light text-ink tracking-tight">
                      Sketch Interiors
                    </h3>
                    <p className="font-mono text-[10px] text-slate uppercase tracking-wider mt-1">
                      Student Intern
                    </p>
                  </div>
                  <span className="font-mono text-[9px] text-mist bg-[#FAF9F5] border border-mist/20 px-2.5 py-1 rounded-sm uppercase tracking-wider shrink-0">
                    Oct-Dec 2025
                  </span>
                </div>

                <div className="font-mono text-[9px] text-slate font-medium">
                  Accomplished 140 required hours
                </div>

                <p className="text-xs text-slate/85 font-light leading-relaxed pt-2 border-t border-mist/10">
                  Created AutoCAD layouts, 3D renders, presentations for clients, and assisted in site visits and consultations.
                </p>
              </div>
            </div>

            {/* Job block 2 (Staggered slightly lower on desktop grids) */}
            <div className="lg:col-span-6 relative bg-paper border border-mist/15 p-8 rounded-sm shadow-2xs hover:shadow-xs transition-shadow duration-300 lg:translate-y-8 fade-up">
              <div className="absolute -left-1.5 top-8 w-3 h-px bg-slate" />
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-serif text-2xl font-light text-ink tracking-tight">
                      IEO Studio, Inc.
                    </h3>
                    <p className="font-mono text-[10px] text-slate uppercase tracking-wider mt-1">
                      Student Intern
                    </p>
                  </div>
                  <span className="font-mono text-[9px] text-mist bg-[#FAF9F5] border border-mist/20 px-2.5 py-1 rounded-sm uppercase tracking-wider shrink-0">
                    Jan-Feb 2026
                  </span>
                </div>

                <div className="font-mono text-[9px] text-slate font-medium">
                  Accomplished 140 required hours
                </div>

                <p className="text-xs text-slate/85 font-light leading-relaxed pt-2 border-t border-mist/10">
                  Provided design research, created AutoCAD layouts, 3D renders, and working drawings, assisted in materials, accessories, and furniture sourcing, and helped during site consultations and client meetings.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 4: EDUCATIONAL BLUEPRINT (Clean grid timeline) */}
        <div className="mb-36 pt-12">
          <div className="border-b border-mist/20 pb-4 mb-16 fade-up">
            <span className="font-mono text-[9px] tracking-[0.4em] text-slate uppercase block mb-2">ACADEMIC FRAMEWORK</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-ink uppercase">
              EDUCATION
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Institution 1 (Benilde) */}
            <div className="lg:col-span-7 bg-paper border border-mist/15 p-8 md:p-10 rounded-sm shadow-2xs relative overflow-hidden fade-up">
              {/* Subtle visual watermark of years */}
              <div className="absolute right-4 bottom-2 font-serif text-8xl font-bold text-slate/[0.04] select-none pointer-events-none">
                22-26
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap justify-between items-baseline gap-2">
                  <h3 className="font-serif text-2xl font-light tracking-tight text-ink">
                    De La Salle-College of Saint Benilde
                  </h3>
                  <span className="font-mono text-[10px] text-mist font-medium tracking-widest">
                    2022-2026
                  </span>
                </div>
                
                <p className="font-mono text-[9px] text-slate uppercase tracking-widest border-b border-mist/15 pb-2">
                  BS Interior Design Major in Construction and Project Management
                </p>

                <ul className="space-y-3 pt-2">
                  <li className="text-xs text-slate/85 font-light flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate mt-1.5 shrink-0" />
                    <span>Graduated cum laude</span>
                  </li>
                  <li className="text-xs text-slate/85 font-light flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate mt-1.5 shrink-0" />
                    <span>Dean’s Lister (2022-2026)</span>
                  </li>
                  <li className="text-xs text-slate/85 font-light flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate mt-1.5 shrink-0" />
                    <span>Best Thesis Awardee</span>
                  </li>
                  <li className="text-xs text-slate/85 font-light flex items-start gap-2.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate mt-1.5 shrink-0" />
                    <span>Relevant Coursework on Residential Design, Furniture Design, Manual and Digital Drafting, Retail Design, and Public/Hospitality Centers</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Institution 2 (Statefields) */}
            <div className="lg:col-span-5 bg-paper border border-mist/15 p-8 md:p-10 rounded-sm shadow-2xs relative overflow-hidden fade-up">
              <div className="absolute right-4 bottom-2 font-serif text-8xl font-bold text-slate/[0.04] select-none pointer-events-none">
                20-22
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap justify-between items-baseline gap-2">
                  <h3 className="font-serif text-2xl font-light tracking-tight text-ink">
                    Statefields School, Inc.
                  </h3>
                  <span className="font-mono text-[10px] text-mist font-medium tracking-widest">
                    2020-2022
                  </span>
                </div>
                
                <p className="font-mono text-[9px] text-slate uppercase tracking-widest border-b border-mist/15 pb-2">
                  Humanities and Social Sciences Strand in Senior High School
                </p>

                <ul className="space-y-3 pt-2">
                  <li className="text-xs text-slate/85 font-light flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate mt-1.5 shrink-0" />
                    <span>Fidelity Awardee</span>
                  </li>
                  <li className="text-xs text-slate/85 font-light flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate mt-1.5 shrink-0" />
                    <span>Graduated with High Honors</span>
                  </li>
                  <li className="text-xs text-slate/85 font-light flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate mt-1.5 shrink-0" />
                    <span>Specialized in Technical Drafting</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 5: ACCOMPLISHMENTS (Fine-Art Grid Spread) */}
        <div className="mb-36">
          <div className="border-b border-mist/20 pb-4 mb-16 fade-up">
            <span className="font-mono text-[9px] tracking-[0.4em] text-slate uppercase block mb-2">HONORS & LAURELS</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-ink uppercase">
              ACCOMPLISHMENTS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: "01",
                title: "Graduated cum laude, July 2026",
                category: "Academic distinction"
              },
              {
                id: "02",
                title: "Best Thesis Awardee for Solo Thesis Project, “Bangon Bayan: Designing A Facility for Food and Community Resilience Through Capability Approach Theory,” July 2026",
                category: "Research thesis"
              },
              {
                id: "03",
                title: "Top 6 Finalist in Shell Balik-Likha Competition, September 2024",
                category: "National contest"
              },
              {
                id: "04",
                title: "Creatives Department Head, LIKHAYAN Furniture Design Exhibit, September-October 2023",
                category: "Curational role"
              },
              {
                id: "05",
                title: "3rd Runner Up for LIKHAYAN Furniture Exhibit 2023, October 2023",
                category: "Design showcase"
              },
              {
                id: "06",
                title: "Assistant Programs Head, SIGLA 2026 Interior Design Exhibit, April 2026",
                category: "Executive curation"
              }
            ].map((item) => (
              <div 
                key={item.id} 
                className="bg-paper border border-mist/15 hover:border-slate/40 p-6 rounded-sm shadow-3xs flex flex-col justify-between gap-6 transition-all duration-300 group fade-up"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] text-slate font-semibold tracking-widest">
                      {item.id}
                    </span>
                    <span className="font-mono text-[8px] text-mist uppercase tracking-widest">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-ink font-light leading-relaxed group-hover:text-slate transition-colors">
                    {item.title}
                  </p>
                </div>
                
                {/* Visual balance line */}
                <div className="w-6 h-px bg-mist/30 group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 6: SKILLS, LANGUAGES & ENGAGEMENTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SKILLS COLUMN */}
          <div className="lg:col-span-5 bg-paper border border-mist/15 p-8 rounded-sm shadow-3xs relative overflow-hidden fade-up">
            <div className="absolute right-4 top-4 font-serif text-5xl font-bold text-slate/[0.03] select-none pointer-events-none uppercase">
              Draft
            </div>

            <span className="font-mono text-[9px] tracking-[0.2em] text-mist uppercase block mb-4 border-b border-mist/10 pb-2">
              SKILLS
            </span>
            <div className="space-y-4">
              <div>
                <span className="font-mono text-[8px] text-slate uppercase block mb-1 font-semibold tracking-wider">Design</span>
                <p className="text-xs text-ink font-light leading-relaxed">
                  Technical Drafting, 3D Rendering, Space Planning, Concept Development, Furniture Design, Visual Merchandising, Residential Design, Hospitality Design
                </p>
              </div>
            </div>
          </div>

          {/* LANGUAGES COLUMN */}
          <div className="lg:col-span-3 bg-paper border border-mist/15 p-8 rounded-sm shadow-3xs relative overflow-hidden fade-up">
            <span className="font-mono text-[9px] tracking-[0.2em] text-mist uppercase block mb-4 border-b border-mist/10 pb-2">
              LANGUAGES
            </span>
            <ul className="space-y-3.5 text-xs text-ink font-light">
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate" />
                <span>Filipino</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate" />
                <span>English</span>
              </li>
            </ul>
          </div>

          {/* ACTIVITIES COLUMN */}
          <div className="lg:col-span-4 bg-paper border border-mist/15 p-8 rounded-sm shadow-3xs relative overflow-hidden fade-up">
            <span className="font-mono text-[9px] tracking-[0.2em] text-mist uppercase block mb-4 border-b border-mist/10 pb-2">
              ACTIVITIES
            </span>
            <div className="space-y-3">
              <h4 className="font-serif text-base font-light text-ink uppercase tracking-tight">
                New Life Bacoor
              </h4>
              <p className="text-xs text-slate/85 font-light leading-relaxed">
                Media Department Team Leader since October 2025
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
