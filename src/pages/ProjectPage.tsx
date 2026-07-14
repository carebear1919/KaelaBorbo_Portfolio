import { useState, useEffect } from "react";
import { ArrowRight, MapPin, Calendar, Briefcase, Wrench, ChevronRight, PencilRuler, Box, Camera, Aperture, Layers, type LucideIcon } from "lucide-react";
import { Project } from "../types";
import { SAMPLE_PROJECTS } from "../data";
import { initScrollReveal } from "../utils";
import Lightbox from "../components/Lightbox";

const TOOL_ICONS: Record<string, LucideIcon> = {
  "AutoCAD": PencilRuler,
  "SketchUp": Box,
  "Enscape": Camera,
  "V-Ray": Aperture,
  "Adobe Photoshop": Layers,
};

function ToolIcon({ tool, className }: { tool: string; className?: string }) {
  const Icon = TOOL_ICONS[tool] ?? Wrench;
  return <Icon className={className ?? "w-3 h-3 shrink-0"} />;
}

interface ProjectPageProps {
  slug: string;
  onNavigateProject: (slug: string) => void;
  onNavigateHome: () => void;
}

export default function ProjectPage({
  slug,
  onNavigateProject,
  onNavigateHome,
}: ProjectPageProps) {
  const projectIndex = SAMPLE_PROJECTS.findIndex((p) => p.slug === slug);
  const project: Project = projectIndex !== -1 ? SAMPLE_PROJECTS[projectIndex] : SAMPLE_PROJECTS[0];

  // Calculate Next Project
  const nextProjectIndex = (projectIndex + 1) % SAMPLE_PROJECTS.length;
  const nextProject = SAMPLE_PROJECTS[nextProjectIndex];

  // Lightbox State
  const [lightboxActiveIdx, setLightboxActiveIdx] = useState(-1);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);

  useEffect(() => {
    // Reset scroll position on project change
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    
    // Initialize scroll-reveal fade-ups
    const cleanup = initScrollReveal();
    return cleanup;
  }, [slug]);

  // Consolidate gallery images for lightbox preview
  const handleOpenLightbox = (imgUrl: string, list: string[]) => {
    setLightboxImages(list);
    const idx = list.indexOf(imgUrl);
    setLightboxActiveIdx(idx);
  };

  const handlePrevLightbox = () => {
    setLightboxActiveIdx((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
  };

  const handleNextLightbox = () => {
    setLightboxActiveIdx((prev) => (prev + 1) % lightboxImages.length);
  };

  if (project.slug === "community-resilience-facility") {
    return (
      <div className="paper-grain pb-24 animate-fade-in" id="project-view-community-resilience-facility">
        {/* SECTION 1: HERO - FULL BLEED PHOTO */}
        <section
          className="relative w-full h-[70vh] bg-cover bg-center flex items-end"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-transparent" />
          
          <div className="max-w-7xl mx-auto w-full px-6 pb-16 z-10 text-paper">
            {/* Breadcrumb back to home */}
            <button
              onClick={onNavigateHome}
              className="font-mono text-xxs tracking-widest uppercase text-mist hover:text-paper transition-colors mb-6 flex items-center gap-1.5 focus:outline-none"
              id="project-back-btn"
            >
              ← Back to Projects
            </button>
            
            <span className="font-mono text-xxs tracking-[0.25em] text-[#10B981] uppercase block mb-3 font-semibold">
              05 | COMMUNITY RESILIENCE FACILITY
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-light tracking-tight leading-tight mb-4 max-w-4xl uppercase text-paper">
              BANGON BAYAN
            </h1>

            {/* Metadata bar */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xxs tracking-[0.2em] text-mist uppercase border-t border-paper/10 pt-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate" /> THESIS PROJECT 2025
              </span>
              <span>—</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate" /> TONDO, MANILA, PH
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 2: DESCRIPTION & PROJECT SCOPE */}
        <section className="py-20 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Left Column: Thesis Context Info */}
          <div className="md:col-span-4 space-y-8 md:sticky md:top-28 h-fit">
            <div className="border-l-2 border-[#10B981] pl-6 py-2">
              <span className="font-mono text-xxs tracking-widest text-mist uppercase block mb-1">
                PROJECT SCOPE
              </span>
              <h2 className="font-serif text-2xl font-light text-ink">
                Thesis Context
              </h2>
            </div>

            <div className="space-y-4 text-xs font-mono tracking-wider text-ink/75">
              <div>
                <span className="text-mist block text-[10px] uppercase mb-1">YEAR</span>
                <span className="text-sm font-semibold">2025</span>
              </div>
              <hr className="border-mist/10" />
              <div>
                <span className="text-mist block text-[10px] uppercase mb-1">TOTAL FOOTPRINT</span>
                <span className="text-sm font-semibold">1,512 SQM</span>
              </div>
              <hr className="border-mist/10" />
              <div>
                <span className="text-mist block text-[10px] uppercase mb-1">LOCATION</span>
                <span className="text-sm font-semibold">TONDO, MANILA</span>
              </div>
              <hr className="border-mist/10" />
              <div>
                <span className="text-mist block text-[10px] uppercase mb-2">TOOLS USED</span>
                <div className="flex flex-wrap gap-1.5">
                  {["AutoCAD", "SketchUp", "Enscape", "Adobe Photoshop"].map((tool) => (
                    <span
                      key={tool}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#10B981]/5 text-[#047857] text-[10px] rounded font-semibold border border-[#10B981]/10"
                    >
                      <ToolIcon tool={tool} />
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Project Statement */}
          <div className="md:col-span-8 space-y-6 text-base font-light text-ink/80 leading-relaxed md:pt-2">
            <h3 className="font-serif text-2xl md:text-3xl font-light text-ink leading-snug">
              Bangon Bayan is a proposed community resilience facility that centers on providing the community of Tondo a space for food security and a space for evacuating in consideration with the area’s high urban density and high rate of food insecurity. The space has a 1,512sqm area with spaces for resting, urban farming, skill improvement spaces, and areas where the community can access nutritious meals.
            </h3>
          </div>
        </section>

        {/* SECTION 3: DINING AREA (2 IMAGES) */}
        <section className="pb-20 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              "/images/projects/05-bangon-bayan/05-bangon-dining-area-1.jpg",
              "/images/projects/05-bangon-bayan/05-bangon-dining-area-2.jpg"
            ].map((img, idx, arr) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-sm shadow-sm group cursor-pointer aspect-[16/10]"
                onClick={() => handleOpenLightbox(img, arr)}
              >
                <img
                  src={img}
                  alt={`Bangon Bayan Dining Area ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-[1200ms] ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 bg-ink/75 backdrop-blur-xs text-[8px] font-mono uppercase tracking-widest text-paper px-3 py-1.5 rounded-xs border border-white/5">
                  DINING AREA
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: CONCEPT - NODES OF RESILIENCE */}
        <section className="py-24 border-t border-b border-mist/10 bg-paper/30">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
            <div className="space-y-3">
              <span className="font-mono text-xxs tracking-[0.3em] text-[#047857] font-semibold uppercase block">
                02 / CONCEPTUAL ANALYSIS
              </span>
              <h3 className="font-serif text-3xl md:text-4xl font-light text-ink uppercase tracking-wider">
                Nodes of Resilience
              </h3>
              <span className="font-serif italic text-lg text-slate block lowercase">
                “Bending without Breaking”
              </span>
            </div>

            <img
              src={project.inspiration.image}
              alt="Bangon Bayan Concept Diagram"
              className="w-full max-w-2xl mx-auto object-contain rounded-sm shadow-sm cursor-pointer"
              referrerPolicy="no-referrer"
              onClick={() => handleOpenLightbox(project.inspiration.image, [project.inspiration.image])}
            />

            <p className="text-sm md:text-base text-slate/90 font-light leading-relaxed max-w-3xl mx-auto text-left md:text-center">
              {project.inspiration.text}
            </p>
          </div>
        </section>

        {/* SECTION 6: LOBBY/RECEPTION & OUTDOOR AGRICULTURE (2 IMAGES) */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { image: "/images/projects/05-bangon-bayan/05-bangon-lobby-reception.jpg", label: "LOBBY / RECEPTION AREA" },
              { image: "/images/projects/05-bangon-bayan/05-bangon-outdoor-agriculture.jpg", label: "OUTDOOR AGRICULTURE AREA" }
            ].map((item, idx, arr) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-sm shadow-sm group cursor-pointer aspect-[16/10]"
                onClick={() => handleOpenLightbox(item.image, arr.map((i) => i.image))}
              >
                <img
                  src={item.image}
                  alt={`Bangon Bayan ${item.label}`}
                  className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-[1200ms] ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 bg-ink/75 backdrop-blur-xs text-[8px] font-mono uppercase tracking-widest text-paper px-3 py-1.5 rounded-xs border border-white/5">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7: COMMUNITY PANTRY (1 IMAGE + TEXT) */}
        <section className="py-20 border-t border-mist/10 bg-paper/10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div
                className="relative overflow-hidden rounded-sm shadow-sm group cursor-pointer aspect-[16/10]"
                onClick={() => handleOpenLightbox("/images/projects/05-bangon-bayan/05-bangon-community-pantry.jpg", ["/images/projects/05-bangon-bayan/05-bangon-community-pantry.jpg"])}
              >
                <img
                  src="/images/projects/05-bangon-bayan/05-bangon-community-pantry.jpg"
                  alt="Bangon Bayan Community Pantry"
                  className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-[1200ms] ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 bg-ink/75 backdrop-blur-xs text-[8px] font-mono uppercase tracking-widest text-paper px-3 py-1.5 rounded-xs border border-white/5">
                  COMMUNITY PANTRY
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 space-y-6">
              <div className="border-l-2 border-[#10B981] pl-6 py-1">
                <span className="font-mono text-xxs tracking-[0.25em] text-slate uppercase block mb-1">
                  03 / MICRO-ENTERPRISE & FOOD SECURITY
                </span>
                <h3 className="font-serif text-3xl font-light text-ink uppercase tracking-wide">
                  Community Pantry Hub
                </h3>
              </div>
              <p className="text-sm text-slate/85 font-light leading-relaxed">
                The community pantry provides free essential goods and donated items for families facing food insecurity in Tondo, Manila. The second level is also a pantry but hosts micro-enterprise non-food stalls selling low-cost essentials and community-made products to support household income and self-reliance.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 8: FLEXIBLE SPACES & DISASTER RESPONSE (4 IMAGES + TEXT) */}
        <section className="py-20 border-t border-mist/10">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            <div className="max-w-4xl space-y-4">
              <div className="border-l-2 border-[#B45309] pl-6 py-1">
                <span className="font-mono text-xxs tracking-[0.25em] text-slate uppercase block mb-1">
                  04 / MULTI-FUNCTIONAL ADAPTIVITY
                </span>
                <h3 className="font-serif text-3xl font-light text-ink uppercase tracking-wide">
                  Flexible Zones & Evacuation Centers
                </h3>
              </div>
              <p className="text-sm text-slate/85 font-light leading-relaxed">
                {project.extendedDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-stretch">
              {[
                {
                  title: "WORKSHOP AREA",
                  image: "/images/projects/05-bangon-bayan/05-bangon-workshop-area.jpg",
                  gridClass: "lg:col-span-5",
                  aspectClass: "aspect-4/3 lg:aspect-[3/4.2]"
                },
                {
                  title: "LEARNING AREA",
                  image: "/images/projects/05-bangon-bayan/05-bangon-learning-area.jpg",
                  gridClass: "lg:col-span-7",
                  aspectClass: "aspect-4/3 lg:aspect-[1.6/1.05]"
                },
                {
                  title: "EVACUATION AREA",
                  image: "/images/projects/05-bangon-bayan/05-bangon-evacuation-area.jpg",
                  gridClass: "lg:col-span-7",
                  aspectClass: "aspect-4/3 lg:aspect-[1.6/1.05]"
                },
                {
                  title: "INDOOR HYDROPONICS AREA",
                  image: "/images/projects/05-bangon-bayan/05-bangon-indoor-hydroponics.jpg",
                  gridClass: "lg:col-span-5",
                  aspectClass: "aspect-4/3 lg:aspect-[3/4.2]"
                }
              ].map((item, idx, arr) => {
                const allImages = arr.map(i => i.image);
                return (
                  <div
                    key={idx}
                    onClick={() => handleOpenLightbox(item.image, allImages)}
                    className={`group cursor-pointer flex flex-col h-full rounded-sm overflow-hidden transition-all duration-500 fade-up ${item.gridClass}`}
                    id={`resilience-zone-card-${idx}`}
                  >
                    {/* Image Wrap */}
                    <div className={`relative overflow-hidden w-full bg-ink rounded-sm ${item.aspectClass}`}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-[1.025]"
                        referrerPolicy="no-referrer"
                      />
                      {/* Subtle top-left badge overlay */}
                      <div className="absolute top-4 left-4 bg-[#242424]/90 backdrop-blur-xs px-2.5 py-1 rounded-xs text-[8px] font-mono tracking-widest uppercase text-paper border border-white/5">
                        PERSPECTIVE 0{idx + 1}
                      </div>
                    </div>

                    {/* Banner underneath */}
                    <div className="pt-4 pb-2 bg-transparent shrink-0 flex flex-col justify-between">
                      <div className="space-y-1">
                        <h4 className="font-serif text-lg font-medium text-ink tracking-wide group-hover:text-slate transition-colors leading-tight uppercase">
                          {item.title}
                        </h4>
                      </div>

                      <div className="w-full h-px bg-mist/20 group-hover:bg-slate/30 transition-colors mt-4" />
                      <div className="flex items-center justify-between text-[7px] font-mono tracking-widest uppercase text-slate/60 group-hover:text-ink transition-colors pt-3">
                        <span>Magnify View</span>
                        <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 9: NEXT PROJECT CYCLE CARD */}
        <section className="py-12 max-w-7xl mx-auto px-6" id="project-next-cycle">
          <div
            onClick={() => onNavigateProject(nextProject.slug)}
            className="relative group overflow-hidden rounded-md shadow-xl aspect-21/9 md:aspect-32/9 bg-ink cursor-pointer"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-60 transition-all duration-[1200ms] group-hover:scale-103"
              style={{ backgroundImage: `url(${nextProject.heroImage})` }}
            />
            <div className="absolute inset-0 bg-navy/30 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent" />

            <div className="absolute inset-0 flex items-center px-8 md:px-16 text-paper justify-between">
              <div className="space-y-2 select-none">
                <span className="font-mono text-xxs tracking-[0.3em] text-mist uppercase block">
                  UP NEXT
                </span>
                <h4 className="font-serif text-3xl md:text-5xl font-light tracking-tight group-hover:text-slate transition-colors">
                  {nextProject.name}
                </h4>
                <span className="font-mono text-xxs text-paper/60 uppercase tracking-widest block">
                  {nextProject.category} — {nextProject.year}
                </span>
              </div>
              
              <div className="p-5 bg-paper text-ink rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                <ChevronRight className="w-6 h-6 text-slate" />
              </div>
            </div>
          </div>
        </section>

        {/* LIGHTBOX STAGE OVERLAY */}
        {lightboxActiveIdx >= 0 && (
          <Lightbox
            images={lightboxImages}
            activeIndex={lightboxActiveIdx}
            onClose={() => setLightboxActiveIdx(-1)}
            onPrev={handlePrevLightbox}
            onNext={handleNextLightbox}
          />
        )}
      </div>
    );
  }

  if (project.slug === "giliw-learning-facility") {
    return (
      <div className="paper-grain pb-24 animate-fade-in" id="project-view-giliw-learning-facility">
        {/* SECTION 1: HERO - FULL BLEED PHOTO */}
        <section
          className="relative w-full h-[70vh] bg-cover bg-center flex items-end"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-transparent" />
          
          <div className="max-w-7xl mx-auto w-full px-6 pb-16 z-10 text-paper">
            {/* Breadcrumb back to home */}
            <button
              onClick={onNavigateHome}
              className="font-mono text-xxs tracking-widest uppercase text-mist hover:text-paper transition-colors mb-6 flex items-center gap-1.5 focus:outline-none"
              id="project-back-btn"
            >
              ← Back to Projects
            </button>
            
            <span className="font-mono text-xxs tracking-[0.25em] text-[#10B981] uppercase block mb-3 font-semibold">
              04 | GILIW LEARNING FACILITY
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-light tracking-tight leading-tight mb-4 max-w-4xl uppercase text-paper">
              GILIW
            </h1>

            {/* Metadata bar */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xxs tracking-[0.2em] text-mist uppercase border-t border-paper/10 pt-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate" /> COMMUNITY ACADEMIC PROJECT FOR AYDA 2024
              </span>
              <span>—</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate" /> MANILA, PH
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 2: DESCRIPTION & PROJECT SCOPE */}
        <section className="py-20 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Left Column: Details */}
          <div className="md:col-span-4 space-y-8 md:sticky md:top-28 h-fit">
            <div className="border-l-2 border-[#10B981] pl-6 py-2">
              <span className="font-mono text-xxs tracking-widest text-mist uppercase block mb-1">
                PROJECT SCOPE
              </span>
              <h2 className="font-serif text-2xl font-light text-ink">
                Academic Context
              </h2>
            </div>

            <div className="space-y-4 text-xs font-mono tracking-wider text-ink/75">
              <div>
                <span className="text-mist block text-[10px] uppercase mb-1">YEAR</span>
                <span className="text-sm font-semibold">2024</span>
              </div>
              <hr className="border-mist/10" />
              <div>
                <span className="text-mist block text-[10px] uppercase mb-1">PROGRAM</span>
                <span className="text-sm font-semibold">AYDA 2024</span>
              </div>
              <hr className="border-mist/10" />
              <div>
                <span className="text-mist block text-[10px] uppercase mb-1">LOCATION</span>
                <span className="text-sm font-semibold">MANILA, PHILIPPINES</span>
              </div>
              <hr className="border-mist/10" />
              <div>
                <span className="text-mist block text-[10px] uppercase mb-2">TOOLS USED</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#10B981]/5 text-[#047857] text-[10px] rounded font-semibold border border-[#10B981]/10"
                    >
                      <ToolIcon tool={tool} />
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Statement */}
          <div className="md:col-span-8 space-y-6 text-base font-light text-ink/80 leading-relaxed md:pt-2">
            <h3 className="font-serif text-2xl md:text-3xl font-light text-ink leading-snug">
              {project.description}
            </h3>
          </div>
        </section>

        {/* SECTION 3: MOOD BOARD & DESIGN PHILOSOPHY */}
        <section className="py-24 border-t border-b border-mist/10 bg-paper/30">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
            <div className="space-y-3">
              <span className="font-mono text-xxs tracking-[0.3em] text-[#047857] font-semibold uppercase block">
                01 / DESIGN PHILOSOPHY
              </span>
              <h3 className="font-serif text-3xl md:text-4xl font-light text-ink uppercase tracking-wider">
                GILIW
              </h3>
              <span className="font-serif italic text-lg text-slate block">
                A Learning Center for Street Children
              </span>
            </div>

            <img
              src={project.moodboardImages[0]}
              alt="Giliw Mood Board"
              className="w-full object-contain rounded-sm shadow-sm cursor-pointer"
              referrerPolicy="no-referrer"
              onClick={() => handleOpenLightbox(project.moodboardImages[0], project.moodboardImages)}
            />

            <p className="text-sm md:text-base text-slate/90 font-light leading-relaxed max-w-3xl mx-auto text-left md:text-center font-serif leading-relaxed">
              {project.concept ? project.concept.text : ""}
            </p>
          </div>
        </section>

        {/* SECTION 3.5: MATERIAL SELECTION */}
        <section className="py-20 max-w-7xl mx-auto px-6 border-b border-mist/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="border-l-2 border-[#10B981] pl-6 py-1">
                <span className="font-mono text-xxs tracking-[0.25em] text-slate uppercase block mb-1">
                  02 / TACTILE REFINEMENT
                </span>
                <h3 className="font-serif text-3xl font-light text-ink uppercase tracking-wide">
                  Material Selection
                </h3>
              </div>
              <p className="text-sm text-slate/85 font-light leading-relaxed">
                The materials utilized throughout Giliw reflect the facility's commitment to sustainability. Rattan and wood laminates add organic warmth and texture, tying the interiors to the outside, while long-lasting and environmentally friendly textiles boost convenience and durability. Terrazzo tiles have been used for flooring because of its adaptability, which matters in high-traffic areas, considering they are also easy to maintain. In addition to their advantages for the environment, these materials are perfect for Giliw as they can be used to create a unified space that is aligned with the center's objectives.
              </p>
            </div>
            <div className="lg:col-span-7">
              <img
                src="/images/projects/04-giliw-learning-facility/04-giliw-material-selection.jpg"
                alt="Giliw Material Selection"
                className="w-full object-contain rounded-sm shadow-sm cursor-pointer"
                referrerPolicy="no-referrer"
                onClick={() => handleOpenLightbox("/images/projects/04-giliw-learning-facility/04-giliw-material-selection.jpg", ["/images/projects/04-giliw-learning-facility/04-giliw-material-selection.jpg"])}
              />
            </div>
          </div>
        </section>

        {/* SECTION 4: FLOOR PLAN & LAYOUT INDEX */}
        <section className="py-20 max-w-7xl mx-auto px-6 border-b border-mist/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <img
                src={project.floorPlanImage}
                alt="Giliw Learning Center Floor Plan"
                className="w-full object-contain rounded-sm shadow-sm cursor-pointer"
                referrerPolicy="no-referrer"
                onClick={() => handleOpenLightbox(project.floorPlanImage, [project.floorPlanImage])}
              />
            </div>
            <div className="lg:col-span-5 space-y-6">
              <div className="border-l-2 border-[#10B981] pl-6 py-1">
                <span className="font-mono text-xxs tracking-[0.25em] text-slate uppercase block mb-1">
                  03 / SPATIAL ARRANGEMENT
                </span>
                <h3 className="font-serif text-3xl font-light text-ink uppercase tracking-wide">
                  Layout Index
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 font-mono text-[11px] text-ink/80 border-t border-mist/10 pt-4 max-h-[300px] overflow-y-auto pr-2">
                {project.floorPlanContents.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 py-1.5 border-b border-mist/5">
                    <span className="text-slate font-semibold w-5">{item.number}</span>
                    <span className="truncate uppercase tracking-wider">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: ELEVATION DRAWINGS */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="mb-10 text-center">
            <span className="font-mono text-xxs tracking-[0.25em] text-slate uppercase block mb-2">
              04 / DRAWING STUDIES
            </span>
            <h3 className="font-serif text-3xl font-light text-ink uppercase tracking-wide">
              ELEVATION A & ELEVATION B
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <img
                src="/images/projects/04-giliw-learning-facility/04-giliw-elevation-a.jpg"
                alt="Giliw Elevation A"
                className="w-full object-contain rounded-sm shadow-sm cursor-pointer"
                referrerPolicy="no-referrer"
                onClick={() => handleOpenLightbox("/images/projects/04-giliw-learning-facility/04-giliw-elevation-a.jpg", ["/images/projects/04-giliw-learning-facility/04-giliw-elevation-a.jpg", "/images/projects/04-giliw-learning-facility/04-giliw-elevation-b.jpg"])}
              />
              <span className="font-mono text-[9px] tracking-widest text-mist uppercase block text-center">
                ELEVATION A
              </span>
            </div>
            <div className="space-y-2">
              <img
                src="/images/projects/04-giliw-learning-facility/04-giliw-elevation-b.jpg"
                alt="Giliw Elevation B"
                className="w-full object-contain rounded-sm shadow-sm cursor-pointer"
                referrerPolicy="no-referrer"
                onClick={() => handleOpenLightbox("/images/projects/04-giliw-learning-facility/04-giliw-elevation-b.jpg", ["/images/projects/04-giliw-learning-facility/04-giliw-elevation-a.jpg", "/images/projects/04-giliw-learning-facility/04-giliw-elevation-b.jpg"])}
              />
              <span className="font-mono text-[9px] tracking-widest text-mist uppercase block text-center">
                ELEVATION B
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 6: LOUNGE AREA */}
        <section className="py-20 border-t border-mist/10 bg-paper/20">
          <div className="max-w-5xl mx-auto px-6">
            <div
              className="relative overflow-hidden rounded-md shadow-md group cursor-pointer aspect-16/9"
              onClick={() => handleOpenLightbox(project.galleryImages[0], project.galleryImages)}
            >
              <img
                src={project.galleryImages[0]}
                alt="Giliw Lounge Area"
                className="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-[1200ms] ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 bg-ink/75 backdrop-blur-xs text-[8px] font-mono uppercase tracking-widest text-paper px-3 py-1.5 rounded-xs border border-white/5">
                LOUNGE AREA
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: LEARNING AREAS */}
        <section className="py-20 max-w-7xl mx-auto px-6 border-t border-mist/10">
          <div className="space-y-6">
            <div className="border-l-2 border-[#D97706] pl-4">
              <h4 className="font-serif text-2xl font-light text-ink uppercase tracking-wide">
                Learning Areas
              </h4>
              <span className="font-mono text-xxs tracking-widest text-slate uppercase block mt-1">
                05 / LEARNING AREA & ART STUDIO
              </span>
            </div>

            <p className="text-xs text-slate font-light leading-relaxed max-w-4xl">
              The learning areas are designed to foster creativity, collaboration, and focused learning in a welcoming environment. Flexible seating, individual study nooks, and interactive workspaces accommodate different learning styles, while soft curves, natural materials, and playful colors create a calming atmosphere. Abundant natural light and an open layout encourage engagement, making the spaces comfortable for reading, studying, group discussions, and creative activities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { image: project.galleryImages[1], label: "LEARNING AREA" },
                { image: project.galleryImages[2], label: "ART STUDIO" }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden rounded-md shadow-md group cursor-pointer aspect-[16/10] fade-up"
                  onClick={() => handleOpenLightbox(item.image, project.galleryImages)}
                >
                  <img
                    src={item.image}
                    alt={`Giliw ${item.label}`}
                    className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-[1200ms] ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 bg-ink/75 backdrop-blur-xs text-[8px] font-mono uppercase tracking-widest text-paper px-3 py-1.5 rounded-xs border border-white/5">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8: BUILT-IN DETAILS */}
        <section className="py-20 max-w-7xl mx-auto px-6 border-t border-mist/10">
          <div className="space-y-6">
            <div className="border-l-2 border-[#065F46] pl-4">
              <h4 className="font-serif text-2xl font-light text-ink uppercase tracking-wide">
                Built-in Details
              </h4>
              <span className="font-mono text-xxs tracking-widest text-slate uppercase block mt-1">
                06 / TECHNICAL ASSEMBLY KEY
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-7">
                <img
                  src="/images/projects/04-giliw-learning-facility/04-giliw-built-in-details.jpg"
                  alt="Giliw Built-in Details"
                  className="w-full object-contain rounded-sm shadow-sm cursor-pointer"
                  referrerPolicy="no-referrer"
                  onClick={() => handleOpenLightbox("/images/projects/04-giliw-learning-facility/04-giliw-built-in-details.jpg", ["/images/projects/04-giliw-learning-facility/04-giliw-built-in-details.jpg"])}
                />
              </div>

              <div className="md:col-span-5 space-y-4">
                <div className="bg-[#FAF9F5]/80 border border-mist/20 p-6 rounded-md shadow-sm">
                  <span className="font-mono text-xxs text-slate font-semibold tracking-widest block mb-4 uppercase">
                    TECHNICAL ASSEMBLY KEY
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 font-mono text-[10px] text-ink">
                    {[
                      { key: "A", label: "FRONT PANEL" },
                      { key: "B", label: "SIDE PANEL" },
                      { key: "C", label: "BACK PANEL" },
                      { key: "D", label: "BOTTOM PANEL" },
                      { key: "E", label: "TOP PANEL" },
                      { key: "F", label: "CURVED PANEL" },
                      { key: "G", label: "TOP SHELF PANEL" },
                      { key: "H", label: "BOTTOM SHELF PANEL" },
                      { key: "I", label: "CURVED BACK PANEL" },
                      { key: "J", label: "CURVED FRAMING" },
                      { key: "K", label: "CABINET TABLETOP" },
                      { key: "L", label: "DESK TABLETOP" },
                      { key: "M", label: "TOE KICK" }
                    ].map((part, idx) => (
                      <div key={idx} className="flex items-center gap-2 py-1 border-b border-mist/10">
                        <span className="w-5 h-5 rounded-full bg-[#065F46] text-paper flex items-center justify-center font-bold text-[8px]">
                          {part.key}
                        </span>
                        <span className="tracking-wide text-ink font-light uppercase">
                          {part.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: WORKSHOP STUDIO & FITNESS AREA */}
        <section className="py-20 max-w-7xl mx-auto px-6 border-t border-mist/10">
          <div className="space-y-6">
            <div className="border-l-2 border-[#B45309] pl-4">
              <h4 className="font-serif text-2xl font-light text-ink uppercase tracking-wide">
                Workshop Studio & Fitness Area
              </h4>
              <span className="font-mono text-xxs tracking-widest text-slate uppercase block mt-1">
                07 / HOLISTIC DEVELOPMENT
              </span>
            </div>

            <p className="text-xs text-slate font-light leading-relaxed max-w-4xl">
              {project.extendedDescription}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { image: project.galleryImages[3], label: "WORKSHOP STUDIO" },
                { image: project.galleryImages[4], label: "FITNESS AREA" }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden rounded-md shadow-md group cursor-pointer aspect-[16/10] fade-up"
                  onClick={() => handleOpenLightbox(item.image, project.galleryImages)}
                >
                  <img
                    src={item.image}
                    alt={`Giliw ${item.label}`}
                    className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-[1200ms] ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 bg-ink/75 backdrop-blur-xs text-[8px] font-mono uppercase tracking-widest text-paper px-3 py-1.5 rounded-xs border border-white/5">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: NEXT PROJECT CARD */}
        <section className="py-12 max-w-7xl mx-auto px-6" id="project-next-cycle">
          <div
            onClick={() => onNavigateProject(nextProject.slug)}
            className="relative group overflow-hidden rounded-md shadow-xl aspect-21/9 md:aspect-32/9 bg-ink cursor-pointer"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-60 transition-all duration-[1200ms] group-hover:scale-103"
              style={{ backgroundImage: `url(${nextProject.heroImage})` }}
            />
            <div className="absolute inset-0 bg-navy/30 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent" />

            <div className="absolute inset-0 flex items-center px-8 md:px-16 text-paper justify-between">
              <div className="space-y-2 select-none">
                <span className="font-mono text-xxs tracking-[0.3em] text-mist uppercase block">
                  UP NEXT
                </span>
                <h4 className="font-serif text-3xl md:text-5xl font-light tracking-tight group-hover:text-slate transition-colors">
                  {nextProject.name}
                </h4>
                <span className="font-mono text-xxs text-paper/60 uppercase tracking-widest block">
                  {nextProject.category} — {nextProject.year}
                </span>
              </div>
              
              <div className="p-5 bg-paper text-ink rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                <ChevronRight className="w-6 h-6 text-slate" />
              </div>
            </div>
          </div>
        </section>

        {/* LIGHTBOX STAGE OVERLAY */}
        {lightboxActiveIdx >= 0 && (
          <Lightbox
            images={lightboxImages}
            activeIndex={lightboxActiveIdx}
            onClose={() => setLightboxActiveIdx(-1)}
            onPrev={handlePrevLightbox}
            onNext={handleNextLightbox}
          />
        )}
      </div>
    );
  }

  if (project.slug === "iglu-round-sofa") {
    return (
      <div className="paper-grain pb-24 animate-fade-in" id="project-view-iglu-round-sofa">
        {/* SECTION 1: HERO - FULL BLEED PHOTO */}
        <section
          className="relative w-full h-[70vh] bg-cover bg-center flex items-end"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-transparent" />
          
          <div className="max-w-7xl mx-auto w-full px-6 pb-16 z-10 text-paper">
            {/* Breadcrumb back to home */}
            <button
              onClick={onNavigateHome}
              className="font-mono text-xxs tracking-widest uppercase text-mist hover:text-paper transition-colors mb-6 flex items-center gap-1.5 focus:outline-none"
              id="project-back-btn"
            >
              ← Back to Projects
            </button>
            
            <span className="font-mono text-xxs tracking-[0.25em] text-[#B45309] uppercase block mb-3 font-semibold">
              06 | FURNITURE
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-light tracking-tight leading-tight mb-4 max-w-4xl uppercase text-paper">
              Iglu Round Sofa
            </h1>

            {/* Metadata bar */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xxs tracking-[0.2em] text-mist uppercase border-t border-paper/10 pt-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate" /> ACADEMIC PROJECT 2023
              </span>
              <span>—</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate" /> MANILA, PH
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 2: OVERVIEW - TWO-COLUMN LAYOUT */}
        <section className="py-24 max-w-7xl mx-auto px-6 border-b border-mist/10" id="project-overview-section">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
            {/* Left Column: Scope Details Sidebar */}
            <div className="md:col-span-4 space-y-8 md:sticky md:top-28 h-fit" id="project-scope-sidebar">
              <div className="space-y-4">
                <span className="font-mono text-xxs tracking-[0.25em] text-slate uppercase block">
                  Project Scope
                </span>
                <div className="w-8 h-px bg-slate" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-y-6 gap-x-4 font-mono text-xxs uppercase tracking-wider">
                <div className="space-y-1">
                  <span className="text-mist block">TYPOLOGY</span>
                  <span className="text-ink font-semibold">Furniture Design / Industrial</span>
                </div>
                <div className="space-y-1">
                  <span className="text-mist block">CO-CREATOR</span>
                  <span className="text-ink font-semibold">Kaela V. Borbon</span>
                </div>
                <div className="space-y-1">
                  <span className="text-mist block">INSPIRATION</span>
                  <span className="text-ink font-semibold">Lanelle Abueva-Fernando</span>
                </div>
                <div className="space-y-1">
                  <span className="text-mist block">AWARDS</span>
                  <span className="text-ink font-semibold text-[#B45309]">3rd Runner-Up, LIKHAYAN 2023</span>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative Description */}
            <div className="md:col-span-8 space-y-8" id="project-narrative-panel">
              <span className="font-mono text-xxs tracking-[0.25em] text-slate uppercase block">
                00 / Concept Narrative
              </span>
              <p className="font-serif text-xl sm:text-2xl font-light text-ink/90 leading-relaxed italic">
                “The Iglu Round Sofa was co-created by Kaela V. Borbon and draws inspiration from the ceramic works of artist Lanelle Abueva-Fernando, translating her handcrafted textures into a multifunctional seating piece with an integrated planter that symbolizes community and growth.”
              </p>
              <div className="space-y-6 text-sm text-ink/80 font-light leading-relaxed max-w-3xl">
                <p>
                  The design celebrates Filipino craftsmanship while promoting interaction and connection through its circular form. It was recognized as the 3rd Runner-Up in the People's Choice Awards during the LIKHAYAN Exhibit 2023, highlighting its creative interpretation of local artistry and innovative furniture design.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: THE INSPIRATION - 2 IMAGES GRID */}
        <section className="py-24 max-w-7xl mx-auto px-6 border-b border-mist/10" id="project-inspiration-section">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-16">
            <div className="md:col-span-4 space-y-4">
              <span className="font-mono text-xxs tracking-[0.25em] text-slate uppercase block">
                01 / THE INSPIRATION
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-ink uppercase">
                Ceramics by Lanelle Abueva-Fernando
              </h2>
            </div>
            <div className="md:col-span-8 text-sm text-ink/80 font-light leading-relaxed space-y-6">
              <p>
                The Iglu Round Sofa draws inspiration from the ceramic works of Lanelle Abueva-Fernando, particularly the handcrafted vessel forms that celebrate organic textures and Filipino craftsmanship. Its circular silhouette echoes the rounded geometry of her pottery, while the woven base references the tactile quality of handcrafted ceramics.
              </p>
              <p>
                The integrated planter at the center symbolizes growth and community, creating a gathering space that encourages interaction and connection. Through its soft curves, natural materials, and earthy tones, the sofa reflects the warmth, artistry, and timeless character found in Abueva-Fernando's ceramic creations.
              </p>
            </div>
          </div>

          {/* Inspiration 2-Image Grid (Highly Asymmetric & Elegant) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            <div 
              className="md:col-span-5 aspect-[4/5] rounded-sm overflow-hidden bg-ink shadow-md cursor-pointer group relative"
              onClick={() => handleOpenLightbox("/images/projects/06-iglu-round-sofa/06-iglu-inspiration-ceramics-1.jpg", ["/images/projects/06-iglu-round-sofa/06-iglu-inspiration-ceramics-1.jpg", "/images/projects/06-iglu-round-sofa/06-iglu-inspiration-artist.jpg"])}
            >
              <img 
                src="/images/projects/06-iglu-round-sofa/06-iglu-inspiration-ceramics-1.jpg" 
                alt="Ceramic works of Lanelle Abueva-Fernando"
                className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 bg-ink/75 backdrop-blur-xs text-[8px] font-mono uppercase tracking-widest text-paper px-3 py-1.5 rounded-xs border border-white/5">
                CERAMIC WORKS
              </div>
            </div>

            <div 
              className="md:col-span-7 aspect-[16/10] md:aspect-auto rounded-sm overflow-hidden bg-ink shadow-md cursor-pointer group relative"
              onClick={() => handleOpenLightbox("/images/projects/06-iglu-round-sofa/06-iglu-inspiration-artist.jpg", ["/images/projects/06-iglu-round-sofa/06-iglu-inspiration-ceramics-1.jpg", "/images/projects/06-iglu-round-sofa/06-iglu-inspiration-artist.jpg"])}
            >
              <img 
                src="/images/projects/06-iglu-round-sofa/06-iglu-inspiration-artist.jpg" 
                alt="Lanelle Abueva-Fernando"
                className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 bg-ink/75 backdrop-blur-xs text-[8px] font-mono uppercase tracking-widest text-paper px-3 py-1.5 rounded-xs border border-white/5">
                LANELLE ABUEVA-FERNANDO
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: THE PROCESS & 3 IMAGES (TOP VIEW, SECTION, PERSPECTIVE) */}
        <section className="py-24 max-w-7xl mx-auto px-6 border-b border-mist/10" id="project-process-section">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-16">
            <div className="md:col-span-4 space-y-4">
              <span className="font-mono text-xxs tracking-[0.25em] text-slate uppercase block">
                02 / THE PROCESS
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-ink uppercase">
                Form Exploration & Schematics
              </h2>
            </div>
            <div className="md:col-span-8 text-sm text-ink/80 font-light leading-relaxed space-y-6">
              <p>
                The design process of the Iglu Round Sofa began by studying the organic forms and handcrafted textures found in the ceramic works of Lanelle Abueva-Fernando. The rounded silhouette of the ceramic vessel was translated into a circular seating arrangement that encourages gathering and interaction. An integrated planter was placed at the center to symbolize growth, connection, and harmony with nature, while the woven base reflects the tactile quality of handcrafted Filipino craftsmanship.
              </p>
              <p>
                Through sketching, form exploration, and 3D modeling, the concept evolved into a multifunctional furniture piece that combines seating, greenery, and cultural inspiration, creating a welcoming focal point that celebrates both community and local artistry.
              </p>
            </div>
          </div>

          {/* 3 Images Technical Grid - Top view, section view, perspective */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {[
              { image: "/images/projects/06-iglu-round-sofa/06-iglu-top-view.jpg", plate: "PLATE 01", label: "TOP VIEW" },
              { image: "/images/projects/06-iglu-round-sofa/06-iglu-section-view.jpg", plate: "PLATE 02", label: "SECTION VIEW" },
              { image: "/images/projects/06-iglu-round-sofa/06-iglu-perspective.jpg", plate: "PLATE 03", label: "PERSPECTIVE" }
            ].map((item, idx, arr) => (
              <div
                key={idx}
                className="flex flex-col justify-between p-6 bg-paper border border-mist/20 rounded shadow-sm hover:border-slate/40 transition-all cursor-pointer group relative overflow-hidden"
                onClick={() => handleOpenLightbox(item.image, arr.map((i) => i.image))}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center font-mono text-[8px] text-mist tracking-widest uppercase">
                    <span>{item.plate}</span>
                    <span>{item.label}</span>
                  </div>
                  <div className="h-44 overflow-hidden rounded-sm bg-[#FAF9F5]/80 border border-mist/10 shadow-inner relative">
                    <img
                      src={item.image}
                      alt={`Iglu Round Sofa ${item.label}`}
                      className="w-full h-full object-contain transition-transform duration-[1200ms] group-hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2 bg-paper/90 px-1.5 py-0.5 rounded-xs text-[6px] font-mono tracking-widest uppercase text-ink border border-mist/10">
                      CLICK TO MAGNIFY
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-mist/10 space-y-1">
                  <span className="font-serif text-sm font-semibold text-ink block uppercase">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 12: NEXT PROJECT - CYCLE CARD */}
        <section className="py-12 max-w-7xl mx-auto px-6" id="project-next-cycle">
          <div
            onClick={() => onNavigateProject(nextProject.slug)}
            className="relative group overflow-hidden rounded-md shadow-xl aspect-21/9 md:aspect-32/9 bg-ink cursor-pointer"
          >
            {/* Next Image with hover slow scale zoom */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-60 transition-all duration-[1200ms] group-hover:scale-103"
              style={{ backgroundImage: `url(${nextProject.heroImage})` }}
            />
            {/* Deep blue color overlay */}
            <div className="absolute inset-0 bg-navy/30 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent" />

            {/* Content details overlay */}
            <div className="absolute inset-0 flex items-center px-8 md:px-16 text-paper justify-between">
              <div className="space-y-2 select-none">
                <span className="font-mono text-xxs tracking-[0.3em] text-mist uppercase block">
                  UP NEXT
                </span>
                <h4 className="font-serif text-3xl md:text-5xl font-light tracking-tight group-hover:text-slate transition-colors">
                  {nextProject.name}
                </h4>
                <span className="font-mono text-xxs text-paper/60 uppercase tracking-widest block">
                  {nextProject.category} — {nextProject.year}
                </span>
              </div>
              
              <div className="p-5 bg-paper text-ink rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                <ChevronRight className="w-6 h-6 text-slate" />
              </div>
            </div>
          </div>
        </section>

        {/* LIGHTBOX STAGE OVERLAY */}
        {lightboxActiveIdx >= 0 && (
          <Lightbox
            images={lightboxImages}
            activeIndex={lightboxActiveIdx}
            onClose={() => setLightboxActiveIdx(-1)}
            onPrev={handlePrevLightbox}
            onNext={handleNextLightbox}
          />
        )}
      </div>
    );
  }

  return (
    <div className="paper-grain pb-24" id={`project-view-${project.slug}`}>
      {/* SECTION 1: HERO - FULL BLEED PHOTO */}
      <section
        className="relative w-full h-[70vh] bg-cover flex items-end"
        style={{
          backgroundImage: `url(${project.heroImage})`,
          backgroundPosition: project.slug === "hotel-concept" ? "center 35%" : "center 75%"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />

        <div className="max-w-7xl mx-auto w-full px-6 pb-16 z-10 text-paper">
          {/* Breadcrumb back to home */}
          <button
            onClick={onNavigateHome}
            className="font-mono text-xxs tracking-widest uppercase text-sky-200/80 hover:text-white transition-colors mb-6 flex items-center gap-1.5 focus:outline-none"
            id="project-back-btn"
          >
            ← Back to Projects
          </button>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-tight mb-4 max-w-4xl uppercase text-paper">
            {project.name}
          </h1>

          {/* Metadata bar */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xxs tracking-[0.25em] text-sky-100 uppercase border-t border-paper/10 pt-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-sky-200/70" /> {project.year}
            </span>
            <span className="text-paper/30">—</span>
            <span className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-sky-200/70" /> {project.category}
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 2: OVERVIEW - TWO COLUMNS */}

      <section className="py-20 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        {/* Left Sticky Sidebar */}
        <div className="md:col-span-4 space-y-8 md:sticky md:top-28 h-fit" id="project-overview-sidebar">
          <div className="border-l-2 border-slate pl-6 py-2">
            <span className="font-mono text-xxs tracking-widest text-mist uppercase block mb-1">
              PROJECT SCOPE
            </span>
            <h2 className="font-serif text-2xl font-light text-ink">
              Executive Details
            </h2>
          </div>

          <div className="space-y-4 text-xs font-mono tracking-wider text-ink/75">
            <div>
              <span className="text-mist block text-[10px] uppercase mb-1">DATE DELIVERED</span>
              <span className="text-sm font-semibold">{project.year}</span>
            </div>
            <hr className="border-mist/10" />
            <div>
              <span className="text-mist block text-[10px] uppercase mb-1">TYPOLOGY</span>
              <span className="text-sm font-semibold">{project.category}</span>
            </div>
            <hr className="border-mist/10" />
            <div>
              <span className="text-mist block text-[10px] uppercase mb-2">SYSTEMS & TOOLS</span>
              <div className="flex flex-wrap gap-1.5">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-ink/5 text-ink text-[10px] rounded"
                  >
                    <ToolIcon tool={tool} />
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Description Paragraphs */}
        <div className="md:col-span-8 space-y-6 text-base font-light text-ink/80 leading-relaxed md:pt-2" id="project-overview-content">
          <h3 className="font-serif text-2xl md:text-3xl font-light text-ink leading-snug">
            {project.description}
          </h3>
          {project.extendedDescription && !project.pullQuote && project.slug !== "coastal-residence" && (
            <p className="text-sm md:text-base">
              {project.extendedDescription}
            </p>
          )}
        </div>
      </section>

      {/* SECTION 3, 4, 5: CURATED LOOKBOOK 'CONCEPT & MOOD' 3-COLUMN SHEET (Slide 3 style) */}
      {(project.moodboardImages.length > 0 || project.concept?.image) && (
      <section className="py-24 border-t border-b border-mist/10 bg-paper/30" id="project-concept-mood-lookbook">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Column 1: Massive Header & Metadata Panel */}
            <div className={`${
              project.concept?.image ? "lg:col-span-4" : "lg:col-span-3"
            } flex flex-col justify-between p-8 bg-paper border border-mist/20 rounded-md shadow-sm fade-up`}>
              <div className="space-y-12">
                <div>
                  <span className="font-mono text-[9px] tracking-[0.3em] text-slate uppercase block mb-1">
                    VOL. 01 / SCHEMATICS
                  </span>
                  <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-ink leading-[1.05] uppercase">
                    CONCEPT <br />
                    <span className="italic font-normal text-slate lowercase">& mood</span>
                  </h2>
                </div>

                <div className="w-8 h-px bg-slate/40" />

                {project.concept?.text && (
                  <div className="space-y-4">
                    <span className="font-mono text-xxs tracking-[0.25em] text-mist uppercase block">
                      INSPIRATION & ATMOSPHERE
                    </span>
                    <p className="text-xs text-slate/90 leading-relaxed font-light">
                      {project.concept.text}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-8 mt-8 border-t border-mist/10 flex justify-between items-baseline font-mono text-[9px] text-mist tracking-widest uppercase">
                <span>YEAR OF DESIGN</span>
                <span>{project.year}</span>
              </div>
            </div>

            {/* Column 2: Central Floating Highlight Image (only when project has one) */}
            {project.concept?.image && (
              <div className="lg:col-span-4 bg-mist/5 border border-mist/10 p-8 flex flex-col justify-center items-center rounded-md shadow-sm group cursor-pointer fade-up"
                   onClick={() => handleOpenLightbox(project.concept!.image, [project.concept!.image])}>
                <div className="w-full h-full flex flex-col justify-between">
                  <span className="font-mono text-[8px] tracking-[0.3em] text-mist uppercase block mb-4">
                    01 / CENTRAL INTENT
                  </span>

                  <div className="overflow-hidden rounded-sm w-full grow flex items-center justify-center bg-paper/20 py-6">
                    <img
                      src={project.concept.image}
                      alt={`${project.name} primary concept`}
                      className="max-h-[300px] w-auto object-contain transition-transform duration-700 group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <span className="font-mono text-[8px] tracking-[0.25em] text-mist uppercase block mt-4 text-center">
                    TOUCH TO MAGNIFY VIEW
                  </span>
                </div>
              </div>
            )}

            {/* Column 3: Mood board (wide & centered when no central intent column) */}
            {project.moodboardImages.length > 0 && (
              <div className={`${
                project.concept?.image ? "lg:col-span-4" : "lg:col-span-9"
              } flex flex-col justify-between p-8 bg-paper border border-mist/20 rounded-md shadow-sm fade-up`}>
                <div className="space-y-6">
                  <span className="font-mono text-[9px] tracking-[0.3em] text-slate uppercase block">
                    {project.concept?.image ? "02" : "01"} / MOOD BOARD
                  </span>

                  <div
                    className="overflow-hidden rounded-sm bg-paper/20 border border-mist/10 cursor-pointer group flex items-center justify-center"
                    onClick={() => handleOpenLightbox(project.moodboardImages[0], project.moodboardImages)}
                  >
                    <img
                      src={project.moodboardImages[0]}
                      alt={`${project.name} Mood Board`}
                      className="w-full object-contain transition-transform duration-500 group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {project.inspiration?.text && (
                  <div className="space-y-4 pt-6 border-t border-mist/10">
                    <p className="text-sm text-slate/85 leading-relaxed font-light">
                      {project.inspiration.text}
                    </p>
                    <span className="font-mono text-[8px] tracking-[0.25em] text-mist uppercase block">
                      CURATED INSPIRATION MATRIX
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      )}

      {/* SECTION 5.4: CONCEPT & MOOD — COLOR PALETTE, MOOD BOARD & GIFT SHOP (FOR YUHUM HOTEL ONLY) */}
      {project.slug === "hotel-concept" && (
        <section className="py-24 bg-paper/30 border-t border-b border-mist/10" id="project-hotel-palette-section">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Column 1: Massive Header & Metadata Panel */}
              <div className="lg:col-span-3 flex flex-col justify-between p-8 bg-paper border border-mist/20 rounded-md shadow-sm fade-up">
                <div>
                  <span className="font-mono text-[9px] tracking-[0.3em] text-slate uppercase block mb-1">
                    VOL. 01 / SCHEMATICS
                  </span>
                  <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-ink leading-[1.05] uppercase">
                    CONCEPT <br />
                    <span className="italic font-normal text-slate lowercase">& mood</span>
                  </h2>
                  <div className="w-8 h-px bg-slate/40 mt-12" />
                </div>

                <div className="pt-8 mt-8 border-t border-mist/10 flex justify-between items-baseline font-mono text-[9px] text-mist tracking-widest uppercase">
                  <span>YEAR OF DESIGN</span>
                  <span>{project.year}</span>
                </div>
              </div>

              {/* Column 2: Color palette image + description */}
              <div className="lg:col-span-9 flex flex-col justify-between p-8 bg-paper border border-mist/20 rounded-md shadow-sm fade-up">
                <div className="space-y-6">
                  <span className="font-mono text-[9px] tracking-[0.3em] text-slate uppercase block">
                    01 / CHROMATIC COORDINATION — COLOR PALETTE
                  </span>
                  <img
                    src="/images/projects/03-yuhum-hotel/03-yuhum-color-palette.jpg"
                    alt="Yuhum Hotel Color Palette"
                    className="w-full object-contain rounded-sm cursor-pointer"
                    referrerPolicy="no-referrer"
                    onClick={() => handleOpenLightbox("/images/projects/03-yuhum-hotel/03-yuhum-color-palette.jpg", ["/images/projects/03-yuhum-hotel/03-yuhum-color-palette.jpg"])}
                  />
                </div>
                <p className="text-sm text-slate/85 font-light leading-relaxed pt-6 border-t border-mist/10 mt-6">
                  The color palette of the Yuhum Hotel & Restaurant revolves around soft red, blue, and neutral colors such as brown to evoke a sense of theatrics and flamboyance with a mix of French Countryside vibe that helps balance the overall space and create a more cohesive area. The hotel also features high quality materials such as stone, wood, brass, glass, and velvet fabrics that bring out a sophisticated look reflecting Galliano’s works.
                </p>
              </div>
            </div>

            {/* Mood board card with Sugar Rush headline — image | description */}
            <div className="p-8 md:p-12 bg-paper border border-mist/20 rounded-md shadow-sm space-y-10 fade-up">
              <div className="space-y-3 text-center">
                <span className="font-mono text-xxs tracking-[0.3em] text-slate uppercase block">
                  02 / MOOD BOARD
                </span>
                <h3 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-ink uppercase">
                  Sugar Rush
                </h3>
                <span className="font-serif italic text-xl text-slate block lowercase tracking-wide">
                  French-Filipino Interior
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7">
                  <img
                    src="/images/projects/03-yuhum-hotel/03-yuhum-moodboard.jpg"
                    alt="Yuhum Hotel Mood Board"
                    className="w-full object-contain rounded-sm shadow-sm cursor-pointer"
                    referrerPolicy="no-referrer"
                    onClick={() => handleOpenLightbox("/images/projects/03-yuhum-hotel/03-yuhum-moodboard.jpg", ["/images/projects/03-yuhum-hotel/03-yuhum-moodboard.jpg"])}
                  />
                </div>
                {project.inspiration?.text && (
                  <p className="lg:col-span-5 text-sm md:text-base text-slate/90 font-light leading-relaxed">
                    {project.inspiration.text}
                  </p>
                )}
              </div>
            </div>

          </div>
        </section>
      )}

      {/* SECTION 5.5: SUSTAINABLE INCLUSIONS (FOR CONTAINER-HOME ONLY) */}
      {project.slug === "container-home" && (
        <section className="py-20 bg-paper/30 border-b border-mist/10" id="project-sustainable-inclusions">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <span className="font-mono text-xxs tracking-[0.25em] text-slate uppercase block mb-2">
                ECO-FRIENDLY INCLUSIONS
              </span>
              <h3 className="font-serif text-3xl font-light text-ink uppercase">
                SUSTAINABLE INCLUSIONS
              </h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <img
                  src="/images/projects/02-container-home/02-container-sustainable-inclusions.jpg"
                  alt="Container Home Sustainable Inclusions"
                  className="w-full object-contain rounded-sm shadow-sm cursor-pointer"
                  referrerPolicy="no-referrer"
                  onClick={() => handleOpenLightbox("/images/projects/02-container-home/02-container-sustainable-inclusions.jpg", ["/images/projects/02-container-home/02-container-sustainable-inclusions.jpg"])}
                />
              </div>
              <div className="lg:col-span-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 font-mono text-xs">
                  {[
                    "Rainwater Harvest Tank",
                    "Occupancy Sensor",
                    "Tankless Water Heater",
                    "Smart Plugs",
                    "Smart Home Technologies",
                    "Solar Panels",
                    "Smart Pet Feeders"
                  ].map((inclusion, idx) => (
                    <div key={idx} className="flex items-center gap-3 py-2.5 border-b border-mist/10">
                      <span className="text-slate font-bold tracking-wider text-[10px]">
                        0{idx + 1}
                      </span>
                      <span className="text-ink font-light text-sm tracking-wide">
                        {inclusion}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 6: COLOR PALETTE (OPTIONAL) */}
      {project.colorPalette && (
        <section className="py-20 max-w-7xl mx-auto px-6 border-b border-mist/10" id="project-palette-section">
          <div className="mb-12 text-center fade-up">
            <span className="font-mono text-xxs tracking-[0.25em] text-slate uppercase block mb-2">
              CHROMATIC COORDINATION
            </span>
            <h3 className="font-serif text-3xl font-light text-ink uppercase">
              The Color Swatches
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {project.colorPalette.map((color) => (
              <div
                key={color.hex}
                className="bg-paper p-4 rounded-md shadow-sm flex flex-col gap-3 items-center text-center fade-up"
              >
                {/* Visual Swatch */}
                <div
                  className="w-full aspect-square rounded-sm shadow-inner"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="space-y-1">
                  <span className="font-serif text-sm font-semibold text-ink block">
                    {color.name}
                  </span>
                  <span className="font-mono text-xxs text-mist block">
                    {color.hex}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 7: MATERIAL SELECTION (OPTIONAL) */}
      {project.materials && (
        <section className="py-20 max-w-7xl mx-auto px-6 border-b border-mist/10" id="project-materials-section">
          <div className="mb-12 fade-up">
            <span className="font-mono text-xxs tracking-[0.25em] text-slate uppercase block mb-2">
              TACTILE REFINEMENT
            </span>
            <h3 className="font-serif text-3xl font-light text-ink uppercase">
              Material Curation
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {project.materials.map((mat) => (
              <div
                key={mat.caption}
                className="group cursor-pointer bg-paper rounded-md overflow-hidden shadow-sm fade-up"
                onClick={() => handleOpenLightbox(mat.image, project.materials!.map((m) => m.image))}
              >
                <div className="overflow-hidden aspect-4/3">
                  <img
                    src={mat.image}
                    alt={mat.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-4 bg-paper">
                  <span className="font-mono text-xxs tracking-wider uppercase text-slate">
                    {mat.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 8: FLOOR PLAN */}
      <section className="py-20 bg-paper/30 border-b border-mist/10" id="project-floorplan-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center fade-up">
            <span className="font-mono text-xxs tracking-[0.25em] text-slate uppercase block mb-2">
              ARCHITECTURAL COMPOSITION
            </span>
            <h3 className="font-serif text-3xl font-light text-ink uppercase">
              The Spatial Layout
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* The Plan Sketch (displayed large on the paper texture) */}
            <div className="md:col-span-7 fade-up">
              <div className="bg-paper p-6 rounded-md shadow-inner max-w-3xl mx-auto">
                {project.slug === "coastal-residence" ? (
                  <img
                    src={project.floorPlanImage}
                    alt={`${project.name} Floor Plan`}
                    className="w-full object-contain rounded-sm cursor-pointer"
                    referrerPolicy="no-referrer"
                    onClick={() => handleOpenLightbox(project.floorPlanImage, [project.floorPlanImage])}
                  />
                ) : project.slug === "container-home" ? (
                  <div className="space-y-6">
                    <img
                      src={project.floorPlanImage}
                      alt={`${project.name} Floor Plan`}
                      className="w-full object-contain rounded-sm cursor-pointer"
                      referrerPolicy="no-referrer"
                      onClick={() => handleOpenLightbox(project.floorPlanImage, [project.floorPlanImage, "/images/projects/02-container-home/02-container-elevation-a.jpg", "/images/projects/02-container-home/02-container-elevation-b.jpg"])}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <img
                          src="/images/projects/02-container-home/02-container-elevation-a.jpg"
                          alt="Container Home Elevation A"
                          className="w-full object-contain rounded-sm cursor-pointer"
                          referrerPolicy="no-referrer"
                          onClick={() => handleOpenLightbox("/images/projects/02-container-home/02-container-elevation-a.jpg", [project.floorPlanImage, "/images/projects/02-container-home/02-container-elevation-a.jpg", "/images/projects/02-container-home/02-container-elevation-b.jpg"])}
                        />
                        <span className="font-mono text-[9px] tracking-widest text-mist uppercase block text-center">
                          ELEVATION A
                        </span>
                      </div>
                      <div className="space-y-2">
                        <img
                          src="/images/projects/02-container-home/02-container-elevation-b.jpg"
                          alt="Container Home Elevation B"
                          className="w-full object-contain rounded-sm cursor-pointer"
                          referrerPolicy="no-referrer"
                          onClick={() => handleOpenLightbox("/images/projects/02-container-home/02-container-elevation-b.jpg", [project.floorPlanImage, "/images/projects/02-container-home/02-container-elevation-a.jpg", "/images/projects/02-container-home/02-container-elevation-b.jpg"])}
                        />
                        <span className="font-mono text-[9px] tracking-widest text-mist uppercase block text-center">
                          ELEVATION B
                        </span>
                      </div>
                    </div>
                  </div>
                ) : project.slug === "hotel-concept" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <img
                        src="/images/projects/03-yuhum-hotel/03-yuhum-floor-plan-first.jpg"
                        alt="Yuhum Hotel First Floor Plan"
                        className="w-full object-contain rounded-sm cursor-pointer"
                        referrerPolicy="no-referrer"
                        onClick={() => handleOpenLightbox("/images/projects/03-yuhum-hotel/03-yuhum-floor-plan-first.jpg", ["/images/projects/03-yuhum-hotel/03-yuhum-floor-plan-first.jpg", "/images/projects/03-yuhum-hotel/03-yuhum-floor-plan-second.jpg"])}
                      />
                      <span className="font-mono text-[9px] tracking-widest text-mist uppercase block text-center">
                        1ST FLOOR PLAN
                      </span>
                    </div>
                    <div className="space-y-2">
                      <img
                        src="/images/projects/03-yuhum-hotel/03-yuhum-floor-plan-second.jpg"
                        alt="Yuhum Hotel Second Floor Plan"
                        className="w-full object-contain rounded-sm cursor-pointer"
                        referrerPolicy="no-referrer"
                        onClick={() => handleOpenLightbox("/images/projects/03-yuhum-hotel/03-yuhum-floor-plan-second.jpg", ["/images/projects/03-yuhum-hotel/03-yuhum-floor-plan-first.jpg", "/images/projects/03-yuhum-hotel/03-yuhum-floor-plan-second.jpg"])}
                      />
                      <span className="font-mono text-[9px] tracking-widest text-mist uppercase block text-center">
                        2ND FLOOR PLAN
                      </span>
                    </div>
                  </div>
                ) : project.slug === "giliw-learning-facility" ? (
                  <div className="w-full aspect-[16/10] border border-dashed border-mist/35 bg-[#FAF9F5] flex flex-col items-center justify-center rounded-sm p-8 text-center select-none">
                    <span className="font-mono text-xs tracking-widest text-slate uppercase mb-1">
                      LEARNING CENTER FLOOR PLAN
                    </span>
                    <span className="font-mono text-[9px] tracking-widest text-mist uppercase">
                      placeholder image
                    </span>
                  </div>
                ) : project.slug === "community-resilience-facility" ? (
                  <div className="w-full aspect-[16/10] border border-dashed border-mist/35 bg-[#FAF9F5] flex flex-col items-center justify-center rounded-sm p-8 text-center select-none">
                    <span className="font-mono text-xs tracking-widest text-slate uppercase mb-1">
                      GROUND FLOOR AND DECK PLAN
                    </span>
                    <span className="font-mono text-[9px] tracking-widest text-mist uppercase mb-3">
                      1,512sqm Spatial Layout
                    </span>
                    <span className="text-[10px] text-slate/70 max-w-md font-mono leading-relaxed block uppercase tracking-wider">
                      Main Food Corridor connects the health, care, and administrative zones, functioning like structural bamboo nodes.
                    </span>
                  </div>
                ) : (
                  <img
                    src={project.floorPlanImage}
                    alt={`${project.name} Architectural Floor Plan`}
                    className="w-full object-contain rounded-sm aspect-4/3 mix-blend-multiply opacity-80"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>
            </div>

            {/* Two-Column Legend list */}
            <div className="md:col-span-5 space-y-6 fade-up">
              <div className="border-l-2 border-slate pl-4">
                <h4 className="font-serif text-xl text-ink font-semibold uppercase tracking-wider">
                  Layout Index
                </h4>
                <p className="text-xs text-mist font-mono uppercase tracking-widest mt-1">
                  FLOOR PLAN CONTENTS
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                {project.floorPlanContents.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 py-2 border-b border-mist/10"
                  >
                    <span className="text-slate font-bold tracking-wider">
                      {item.number}
                    </span>
                    <span className="text-ink/80 tracking-wide font-light">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {project.slug === "giliw-learning-facility" && (
            <div className="mt-16 pt-16 border-t border-mist/10 space-y-8 fade-up">
              <div className="text-center">
                <span className="font-mono text-xxs tracking-[0.25em] text-slate uppercase block mb-2">
                  ARCHITECTURAL COMPOSITION
                </span>
                <h4 className="font-serif text-2xl font-light text-ink">
                  ELEVATION A & ELEVATION B DRAWINGS
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <div className="w-full aspect-[16/10] border border-dashed border-mist/35 bg-[#FAF9F5] flex flex-col items-center justify-center rounded-sm p-8 text-center select-none shadow-sm">
                  <span className="font-mono text-xs tracking-widest text-slate uppercase mb-1">
                    ELEVATION A
                  </span>
                  <span className="font-mono text-[9px] tracking-widest text-mist uppercase">
                    placeholder image
                  </span>
                </div>
                <div className="w-full aspect-[16/10] border border-dashed border-mist/35 bg-[#FAF9F5] flex flex-col items-center justify-center rounded-sm p-8 text-center select-none shadow-sm">
                  <span className="font-mono text-xs tracking-widest text-slate uppercase mb-1">
                    ELEVATION B
                  </span>
                  <span className="font-mono text-[9px] tracking-widest text-mist uppercase">
                    placeholder image
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* SECTION 9: THE PROCESS (OPTIONAL) */}
      {project.process && (
        <section className="py-20 max-w-7xl mx-auto px-6 border-b border-mist/10" id="project-process-section">
          <div className="mb-16 text-center fade-up">
            <span className="font-mono text-xxs tracking-[0.25em] text-slate uppercase block mb-2">
              METHODICAL STEPS
            </span>
            <h3 className="font-serif text-3xl font-light text-ink uppercase">
              The Creative Process
            </h3>
          </div>

          {/* Timeline of process steps connected by a thin line */}
          <div className="relative" id="process-timeline-container">
            {/* Connecting line (Desktop only) */}
            <div className="hidden md:block absolute top-[43px] left-8 right-8 h-0.5 bg-mist/20 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {project.process.map((step, idx) => {
                const parts = step.split(" — ");
                const title = parts[0];
                const detail = parts[1] || "";

                return (
                  <div key={idx} className="space-y-4 fade-up" id={`process-step-${idx}`}>
                    {/* Circle and number */}
                    <div className="flex md:flex-col gap-4 items-center md:items-start">
                      <div className="w-12 h-12 rounded-full bg-slate text-paper flex items-center justify-center font-mono font-bold shadow-md z-10">
                        {idx + 1}
                      </div>
                      <div className="md:hidden h-0.5 bg-mist/20 grow" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-serif text-lg font-semibold text-ink">
                        {title}
                      </h4>
                      <p className="text-xs text-ink/70 font-light leading-relaxed">
                        {detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 10: EXTENDED DESCRIPTION WITH DISPLAY PULL QUOTE */}
      {project.pullQuote && (
        <section className="py-24 bg-paper/50" id="project-quote-section">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-8 fade-up">
            <div className="text-slate text-6xl font-serif select-none pointer-events-none mb-2">
              “
            </div>
            <blockquote className="font-serif text-3xl md:text-4xl font-light leading-relaxed italic text-ink">
              {project.pullQuote}
            </blockquote>
            <div className="w-12 h-0.5 bg-mist/30 mx-auto" />
            {project.extendedDescription && (
              <p className="text-sm md:text-base text-ink/70 font-light leading-relaxed max-w-2xl mx-auto pt-4">
                {project.extendedDescription}
              </p>
            )}
          </div>
        </section>
      )}

      {/* SECTION 11: PHOTO GALLERY - EDITORIAL MIXED GRID */}
      <section className="py-20 max-w-7xl mx-auto px-6" id="project-gallery-section">
        <div className="mb-12 fade-up">
          <span className="font-mono text-xxs tracking-[0.25em] text-slate uppercase block mb-2">
            DETAILED PERSPECTIVES
          </span>
          <h3 className="font-serif text-3xl font-light text-ink uppercase">
            Project Photo Gallery
          </h3>
          {project.slug === "coastal-residence" && project.extendedDescription && (
            <p className="text-sm md:text-base text-ink/70 font-light leading-relaxed max-w-4xl mt-6">
              {project.extendedDescription}
            </p>
          )}
        </div>

        {/* Alternate full-width with 2-up rows */}
        <div className="space-y-8">
          {project.slug === "container-home" ? (
            <>
              {/* Full-width exterior perspective */}
              {project.galleryImages[0] && (
                <div
                  className="overflow-hidden rounded-md shadow-lg group cursor-pointer fade-up"
                  onClick={() => handleOpenLightbox(project.galleryImages[0], project.galleryImages)}
                >
                  <img
                    src={project.galleryImages[0]}
                    alt={`${project.name} Exterior Perspective`}
                    className="w-full h-auto group-hover:scale-[1.015] transition-transform duration-[1200ms] ease-out"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              {/* Masonry columns: dining area, living area, office, kitchen */}
              <div className="columns-1 md:columns-2 gap-8">
                {project.galleryImages.slice(1).map((img, idx) => (
                  <div
                    key={idx}
                    className="break-inside-avoid mb-8 overflow-hidden rounded-md shadow-md group cursor-pointer fade-up"
                    onClick={() => handleOpenLightbox(img, project.galleryImages)}
                  >
                    <img
                      src={img}
                      alt={`${project.name} Detail Perspective ${idx + 2}`}
                      className="w-full h-auto group-hover:scale-103 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </>
          ) : project.slug === "hotel-concept" ? (
            <div className="space-y-16">
              {/* Part 1: Restaurant Design with 2 images */}
              <div className="space-y-6">
                <div className="border-l-2 border-[#B93C3C] pl-4">
                  <h4 className="font-serif text-2xl font-light text-ink uppercase tracking-wide">
                    The Restaurant / Filipino-French Fusion
                  </h4>
                  <span className="font-mono text-xxs tracking-widest text-slate uppercase block mt-1">
                    01 / BACOLOD FOOD CULTURE INFLUENCE
                  </span>
                </div>
                
                <p className="text-xs text-slate font-light leading-relaxed max-w-4xl">
                  The restaurant plays an integral part in the hotel project as it offers a glimpse of the food culture of Bacolod. The space features dramatic wall finishes such as dark red paint and wallpapers matched with checkerboard flooring and wood ceiling finishes to evoke grandeur, highlighting the Filipino-French fusion.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                  <div
                    className="md:col-span-8 overflow-hidden rounded-md shadow-lg group cursor-pointer aspect-16/9 fade-up"
                    onClick={() => handleOpenLightbox(project.galleryImages[0], project.galleryImages)}
                  >
                    <img
                      src={project.galleryImages[0]}
                      alt="Yuhum Hotel Restaurant"
                      className="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-[1200ms] ease-out"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div
                    className="md:col-span-4 overflow-hidden rounded-md shadow-lg group cursor-pointer fade-up"
                    onClick={() => handleOpenLightbox(project.galleryImages[6], project.galleryImages)}
                  >
                    <img
                      src={project.galleryImages[6]}
                      alt="Yuhum Hotel Gift Shop"
                      className="w-full h-full object-cover object-bottom group-hover:scale-[1.015] transition-transform duration-[1200ms] ease-out"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>

              {/* Part 2: Guest Suites & Recreational Spaces with 5 images */}
              <div className="space-y-6 pt-8 border-t border-mist/10">
                <div className="border-l-2 border-[#3C5A7D] pl-4">
                  <h4 className="font-serif text-2xl font-light text-ink uppercase tracking-wide">
                    Guest Suites & Recreation Spaces
                  </h4>
                  <span className="font-mono text-xxs tracking-widest text-slate uppercase block mt-1">
                    02 / THEATRICAL GRANDEUR & SUGAR RUSH CONCEPT
                  </span>
                </div>

                <p className="text-xs text-slate font-light leading-relaxed max-w-4xl">
                  The guest suites and recreational spaces of Yuhum Hotel reflect the vibrant heritage of Bacolod and the bold, theatrical style of John Galliano. Inspired by the City of Smiles and the concept of Sugar Rush, the interiors feature rich colors, elegant detailing, and dramatic patterns that create a luxurious and memorable experience. By combining Filipino materials and motifs with the sophistication of a French chateau, the spaces celebrate local culture while embodying Galliano's signature sense of storytelling, elegance, and grandeur.
                </p>

                <div className="space-y-8">
                  {/* Row 1: Deluxe & Presidential suites */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    {[project.galleryImages[1], project.galleryImages[2]].map((img, idx) => (
                      <div
                        key={idx}
                        className="overflow-hidden rounded-sm shadow-md group cursor-pointer aspect-[8/5] fade-up"
                        onClick={() => handleOpenLightbox(img, project.galleryImages)}
                      >
                        <img
                          src={img}
                          alt={`Yuhum Hotel Suite ${idx + 1}`}
                          className="w-full h-full object-cover object-left-bottom group-hover:scale-[1.025] transition-transform duration-[1200ms] ease-out"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Row 2: Executive, Premiere, Game Area */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {[project.galleryImages[3], project.galleryImages[4], project.galleryImages[5]].map((img, idx) => (
                      <div
                        key={idx}
                        className="overflow-hidden rounded-sm shadow-md group cursor-pointer aspect-[5/3] fade-up"
                        onClick={() => handleOpenLightbox(img, project.galleryImages)}
                      >
                        <img
                          src={img}
                          alt={`Yuhum Hotel Suite ${idx + 3}`}
                          className="w-full h-full object-cover object-left-bottom group-hover:scale-[1.025] transition-transform duration-[1200ms] ease-out"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          ) : project.slug === "giliw-learning-facility" ? (
            <div className="space-y-16">
              {/* Part 1: Learning Areas with 2 images */}
              <div className="space-y-6">
                <div className="border-l-2 border-[#D97706] pl-4">
                  <h4 className="font-serif text-2xl font-light text-ink uppercase tracking-wide">
                    Learning Areas / Creative & Collaborative Spaces
                  </h4>
                  <span className="font-mono text-xxs tracking-widest text-slate uppercase block mt-1">
                    01 / WORKSPACES & INDIVIDUAL STUDY NOOKS (2 PERSPECTIVES)
                  </span>
                </div>
                
                <p className="text-xs text-slate font-light leading-relaxed max-w-4xl">
                  The learning areas are designed to foster creativity, collaboration, and focused learning in a welcoming environment. Flexible seating, individual study nooks, and interactive workspaces accommodate different learning styles, while soft curves, natural materials, and playful colors create a calming atmosphere. Abundant natural light and an open layout encourage engagement, making the spaces comfortable for reading, studying, group discussions, and creative activities.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[1, 2].map((num) => (
                    <div
                      key={num}
                      className="w-full aspect-[16/10] border border-dashed border-mist/35 bg-[#FAF9F5] flex flex-col items-center justify-center rounded-sm p-8 text-center select-none fade-up"
                    >
                      <span className="font-mono text-xs tracking-widest text-slate uppercase mb-1">
                        LEARNING AREA PERSPECTIVE 0{num}
                      </span>
                      <span className="font-mono text-[9px] tracking-widest text-mist uppercase">
                        placeholder image
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Part 2: Built-in Details (1 image + list overlay of lettered parts) */}
              <div className="space-y-6 pt-8 border-t border-mist/10">
                <div className="border-l-2 border-[#065F46] pl-4">
                  <h4 className="font-serif text-2xl font-light text-ink uppercase tracking-wide">
                    Built-in Furniture Details
                  </h4>
                  <span className="font-mono text-xxs tracking-widest text-slate uppercase block mt-1">
                    02 / ERGONOMIC JOINERY DETAILS (1 SCHEMATIC DETAIL)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-7 aspect-[4/3] border border-dashed border-mist/35 bg-[#FAF9F5] flex flex-col items-center justify-center rounded-sm p-8 text-center select-none">
                    <span className="font-mono text-xs tracking-widest text-slate uppercase mb-1">
                      BUILT-IN DETAILS ASSEMBLY DRAWING
                    </span>
                    <span className="font-mono text-[9px] tracking-widest text-mist uppercase">
                      placeholder image
                    </span>
                  </div>

                  <div className="md:col-span-5 space-y-4">
                    <div className="bg-[#FAF9F5]/80 border border-mist/20 p-6 rounded-md shadow-sm">
                      <span className="font-mono text-xxs text-slate font-semibold tracking-widest block mb-4 uppercase">
                        TECHNICAL ASSEMBLY KEY
                      </span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 font-mono text-[10px] text-ink">
                        {[
                          { key: "A", label: "FRONT PANEL" },
                          { key: "B", label: "FRONT PANEL" },
                          { key: "C", label: "SIDE PANEL" },
                          { key: "D", label: "BACK PANEL" },
                          { key: "E", label: "BOTTOM PANEL" },
                          { key: "F", label: "TOP PANEL" },
                          { key: "G", label: "CURVED PANEL" },
                          { key: "H", label: "TOP SHELF PANEL" },
                          { key: "I", label: "BOTTOM SHELF PANEL" },
                          { key: "J", label: "CURVED BACK PANEL" },
                          { key: "K", label: "CURVED FRAMING" },
                          { key: "L", label: "CABINET TABLETOP" },
                          { key: "M", label: "DESK TABLETOP" },
                          { key: "N", label: "TOE KICK" }
                        ].map((part, idx) => (
                          <div key={idx} className="flex items-center gap-2 py-1 border-b border-mist/10">
                            <span className="w-5 h-5 rounded-full bg-[#065F46] text-paper flex items-center justify-center font-bold text-[8px]">
                              {part.key}
                            </span>
                            <span className="tracking-wide text-ink font-light uppercase">
                              {part.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Part 3: Workshop Area & Fitness Area with 2 images */}
              <div className="space-y-6 pt-8 border-t border-mist/10">
                <div className="border-l-2 border-[#B45309] pl-4">
                  <h4 className="font-serif text-2xl font-light text-ink uppercase tracking-wide">
                    Workshop & Fitness Areas
                  </h4>
                  <span className="font-mono text-xxs tracking-widest text-slate uppercase block mt-1">
                    03 / HOLISTIC DEVELOPMENT & LIFESKILLS TRAINING (2 PERSPECTIVES)
                  </span>
                </div>

                <p className="text-xs text-slate font-light leading-relaxed max-w-4xl">
                  As the facility is dedicated to providing a safe, nurturing, and empowering environment where street children and children in need can learn, grow, and develop practical life skills. The Workshop Area encourages creativity, collaboration, and hands-on learning through flexible workspaces, while the Fitness Area promotes physical activity and overall well-being. Together, these spaces reflect Giliw's mission of fostering holistic development and creating opportunities for a brighter future.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[1, 2].map((num) => (
                    <div
                      key={num}
                      className="w-full aspect-[16/10] border border-dashed border-mist/35 bg-[#FAF9F5] flex flex-col items-center justify-center rounded-sm p-8 text-center select-none fade-up"
                    >
                      <span className="font-mono text-xs tracking-widest text-slate uppercase mb-1">
                        {num === 1 ? "WORKSHOP STUDIOS" : "FITNESS AREA"} PERSPECTIVE
                      </span>
                      <span className="font-mono text-[9px] tracking-widest text-mist uppercase">
                        placeholder image
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : project.slug === "community-resilience-facility" ? (
            <div className="space-y-16">
              {/* Part 1: Community Pantry / Two-Level Pantry Hub with 2 images */}
              <div className="space-y-6">
                <div className="border-l-2 border-[#047857] pl-4">
                  <h4 className="font-serif text-2xl font-light text-ink uppercase tracking-wide">
                    Double-Tiered Community Pantry Hub
                  </h4>
                  <span className="font-mono text-xxs tracking-widest text-slate uppercase block mt-1">
                    01 / ESSENTIALS PANTRY & LOCAL MICRO-ENTERPRISE STALLS (2 PERSPECTIVES)
                  </span>
                </div>
                
                <p className="text-xs text-slate font-light leading-relaxed max-w-4xl">
                  The community pantry provides free essential goods and donated items for families facing food insecurity in Tondo, Manila. The second level is also a pantry but hosts micro-enterprise non-food stalls selling low-cost essentials and community-made products to support household income and self-reliance.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[1, 2].map((num) => (
                    <div
                      key={num}
                      className="w-full aspect-[16/10] border border-dashed border-mist/35 bg-[#FAF9F5] flex flex-col items-center justify-center rounded-sm p-8 text-center select-none fade-up"
                    >
                      <span className="font-mono text-xs tracking-widest text-slate uppercase mb-1">
                        {num === 1 ? "GROUND LEVEL COMMUNITY PANTRY" : "SECOND LEVEL MICRO-ENTERPRISE STALLS"}
                      </span>
                      <span className="font-mono text-[9px] tracking-widest text-mist uppercase">
                        perspective 0{num} image placeholder
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Part 2: Flexible Spaces & Livelihood / Evacuation Centers with 4 images */}
              <div className="space-y-6 pt-8 border-t border-mist/10">
                <div className="border-l-2 border-[#B45309] pl-4">
                  <h4 className="font-serif text-2xl font-light text-ink uppercase tracking-wide">
                    Flexible Zones & Disaster Response Systems
                  </h4>
                  <span className="font-mono text-xxs tracking-widest text-slate uppercase block mt-1">
                    02 / DAILY PRODUCTIVITY & MONSOON EMERGENCY EVACUATION (4 PERSPECTIVES)
                  </span>
                </div>

                <p className="text-xs text-slate font-light leading-relaxed max-w-4xl">
                  These spaces showcase the facility's flexibility in supporting both everyday community use and disaster response. The workshop area promotes skills development and livelihood opportunities, while the multipurpose hall serves as a venue for community activities and converts into an evacuation area during emergencies. Privacy pods provide comfort and dignity for evacuees, and the indoor hydroponics with the community garden strengthen food security by enabling sustainable food production and encouraging community participation.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-stretch">
                  {[
                    { 
                      title: "LIVELIHOOD & WORKSHOP AREA", 
                      detail: "Skills development & vocational training",
                      image: "/images/projects/05-bangon-bayan/05-bangon-workshop-area.jpg",
                      gridClass: "lg:col-span-5",
                      aspectClass: "aspect-4/3 lg:aspect-[3/4.2]"
                    },
                    { 
                      title: "MULTIPURPOSE HALL", 
                      detail: "Evacuation conversion & community meetings",
                      image: "/images/projects/05-bangon-bayan/05-bangon-multipurpose-hall.jpg",
                      gridClass: "lg:col-span-7",
                      aspectClass: "aspect-4/3 lg:aspect-[1.6/1.05]"
                    },
                    { 
                      title: "PRIVACY PODS", 
                      detail: "Dignified temporary emergency shelter",
                      image: "/images/projects/05-bangon-bayan/05-bangon-privacy-pods.jpg",
                      gridClass: "lg:col-span-7",
                      aspectClass: "aspect-4/3 lg:aspect-[1.6/1.05]"
                    },
                    { 
                      title: "INDOOR HYDROPONICS", 
                      detail: "Sustainable food production & green spaces",
                      image: "/images/projects/05-bangon-bayan/05-bangon-indoor-hydroponics.jpg",
                      gridClass: "lg:col-span-5",
                      aspectClass: "aspect-4/3 lg:aspect-[3/4.2]"
                    }
                  ].map((item, index, arr) => {
                    const allImages = arr.map(i => i.image);
                    return (
                      <div
                        key={index}
                        onClick={() => handleOpenLightbox(item.image, allImages)}
                        className={`group cursor-pointer flex flex-col h-full rounded-sm overflow-hidden transition-all duration-500 fade-up ${item.gridClass}`}
                        id={`gallery-resilience-card-${index}`}
                      >
                        {/* Image Wrap */}
                        <div className={`relative overflow-hidden w-full bg-ink rounded-sm ${item.aspectClass}`}>
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-[1.025]"
                            referrerPolicy="no-referrer"
                          />
                          {/* Subtle top-left badge overlay */}
                          <div className="absolute top-4 left-4 bg-[#242424]/90 backdrop-blur-xs px-2.5 py-1 rounded-xs text-[8px] font-mono tracking-widest uppercase text-paper border border-white/5">
                            PERSPECTIVE 0{index + 3}
                          </div>
                        </div>

                        {/* Banner underneath */}
                        <div className="pt-4 pb-2 bg-transparent shrink-0 flex flex-col justify-between">
                          <div className="space-y-1">
                            <h4 className="font-serif text-lg font-medium text-ink tracking-wide group-hover:text-slate transition-colors leading-tight uppercase">
                              {item.title}
                            </h4>
                            <p className="text-[10px] text-mist font-light font-mono leading-relaxed uppercase tracking-wider">
                              {item.detail}
                            </p>
                          </div>
                          
                          <div className="w-full h-px bg-mist/20 group-hover:bg-slate/30 transition-colors mt-4" />
                          <div className="flex items-center justify-between text-[7px] font-mono tracking-widest uppercase text-slate/60 group-hover:text-ink transition-colors pt-3">
                            <span>Magnify View</span>
                            <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Full-width image */}
              {project.galleryImages[0] && (
                <div
                  className="overflow-hidden rounded-md shadow-lg group cursor-pointer fade-up"
                  onClick={() => handleOpenLightbox(project.galleryImages[0], project.galleryImages)}
                >
                  <img
                    src={project.galleryImages[0]}
                    alt={`${project.name} Wide Perspective`}
                    className="w-full h-auto group-hover:scale-[1.015] transition-transform duration-[1200ms] ease-out"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              {/* Masonry columns — natural aspect, no cropping */}
              <div className="columns-1 md:columns-2 gap-8">
                {project.galleryImages.slice(1).map((img, idx) => (
                  <div
                    key={idx}
                    className="break-inside-avoid mb-8 overflow-hidden rounded-md shadow-md group cursor-pointer fade-up"
                    onClick={() => handleOpenLightbox(img, project.galleryImages)}
                  >
                    <img
                      src={img}
                      alt={`${project.name} Detail Perspective ${idx + 2}`}
                      className="w-full h-auto group-hover:scale-103 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* SECTION 12: NEXT PROJECT - CYCLE CARD */}
      <section className="py-12 max-w-7xl mx-auto px-6" id="project-next-cycle">
        <div
          onClick={() => onNavigateProject(nextProject.slug)}
          className="relative group overflow-hidden rounded-md shadow-xl aspect-21/9 md:aspect-32/9 bg-ink cursor-pointer"
        >
          {/* Next Image with hover slow scale zoom */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-60 transition-all duration-[1200ms] group-hover:scale-103"
            style={{ backgroundImage: `url(${nextProject.heroImage})` }}
          />
          {/* Deep blue color overlay */}
          <div className="absolute inset-0 bg-navy/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent" />

          {/* Content details overlay */}
          <div className="absolute inset-0 flex items-center px-8 md:px-16 text-paper justify-between">
            <div className="space-y-2 select-none">
              <span className="font-mono text-xxs tracking-[0.3em] text-mist uppercase block">
                UP NEXT
              </span>
              <h4 className="font-serif text-3xl md:text-5xl font-light tracking-tight group-hover:text-slate transition-colors">
                {nextProject.name}
              </h4>
              <span className="font-mono text-xxs text-paper/60 uppercase tracking-widest block">
                {nextProject.category} — {nextProject.year}
              </span>
            </div>
            
            <div className="p-5 bg-paper text-ink rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
              <ChevronRight className="w-6 h-6 text-slate" />
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX STAGE OVERLAY */}
      {lightboxActiveIdx >= 0 && (
        <Lightbox
          images={lightboxImages}
          activeIndex={lightboxActiveIdx}
          onClose={() => setLightboxActiveIdx(-1)}
          onPrev={handlePrevLightbox}
          onNext={handleNextLightbox}
        />
      )}
    </div>
  );
}
