import { useEffect } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { initScrollReveal } from "../utils";

export default function Contact() {
  useEffect(() => {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    
    // Trigger scroll reveals
    const cleanup = initScrollReveal();
    return cleanup;
  }, []);

  const footerStripPhotos = [
    "/images/projects/01-coastal-residence/01-coastal-gallery-01-living-area.jpg",
    "/images/projects/01-coastal-residence/01-coastal-gallery-02-guest-bedroom.jpg",
    "/images/projects/01-coastal-residence/01-coastal-gallery-04-dining-area.jpg",
    "/images/projects/01-coastal-residence/01-coastal-gallery-05-kitchen.jpg",
    "/images/projects/01-coastal-residence/01-coastal-gallery-03-living-area.jpg",
  ];

  return (
    <div className="paper-grain pt-32 pb-24 relative overflow-hidden min-h-screen" id="contact-view">
      {/* BACKGROUND DECORATIVE TILES OFFSET BEHIND THE CARD AT LOW WEIGHT */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-0" id="decorative-ambient-background">
        {/* Tile 1: Top Left */}
        <div
          className="absolute top-24 left-[8%] w-48 aspect-square rounded-md bg-cover bg-center opacity-15 filter blur-[0.5px] rotate-[-6deg] transition-all duration-1000 hover:opacity-25"
          style={{ backgroundImage: `url('/images/projects/01-coastal-residence/01-coastal-gallery-05-kitchen.jpg')` }}
        />
        {/* Tile 2: Top Right */}
        <div
          className="absolute top-36 right-[10%] w-56 aspect-4/5 rounded-md bg-cover bg-center opacity-15 filter blur-[0.5px] rotate-[8deg] transition-all duration-1000 hover:opacity-25"
          style={{ backgroundImage: `url('/images/projects/01-coastal-residence/01-coastal-gallery-02-guest-bedroom.jpg')` }}
        />
        {/* Tile 3: Mid Left Bottom */}
        <div
          className="absolute bottom-40 left-[4%] w-52 aspect-3/4 rounded-md bg-cover bg-center opacity-15 filter blur-[0.5px] rotate-[5deg] transition-all duration-1000 hover:opacity-25"
          style={{ backgroundImage: `url('/images/projects/01-coastal-residence/01-coastal-gallery-04-dining-area.jpg')` }}
        />
        {/* Tile 4: Mid Right Bottom */}
        <div
          className="absolute bottom-32 right-[6%] w-48 aspect-square rounded-md bg-cover bg-center opacity-15 filter blur-[0.5px] rotate-[-4deg] transition-all duration-1000 hover:opacity-25"
          style={{ backgroundImage: `url('/images/projects/01-coastal-residence/01-coastal-living-area.jpg')` }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Page Header */}
        <div className="mb-16 text-center fade-up" id="contact-header-block">
          <span className="font-mono text-xs tracking-[0.3em] text-slate uppercase block mb-3">
            COLLABORATION & COMMISSION
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-ink uppercase">
            LET'S WORK TOGETHER
          </h1>
          <div className="w-12 h-0.5 bg-slate mx-auto mt-6" />
        </div>

        {/* Centerpiece Contact Card (Navy Background) */}
        <div
          className="bg-navy text-paper rounded-md shadow-2xl overflow-hidden relative z-10 fade-up"
          id="centerpiece-contact-card"
        >
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Left side: Grayscale Portrait */}
            <div className="md:col-span-5 relative aspect-square md:aspect-auto md:min-h-[480px] overflow-hidden bg-ink">
              <div
                className="absolute inset-0 bg-cover bg-center filter grayscale contrast-[1.1] brightness-95 hover:grayscale-0 transition-all duration-[1500ms] ease-in-out scale-101 hover:scale-105"
                style={{ backgroundImage: `url('/images/about/about-portrait.jpg')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent pointer-events-none" />
              {/* Corner badge overlay */}
              <div className="absolute bottom-4 left-4 bg-paper/15 backdrop-blur-md border border-paper/10 py-1.5 px-3 rounded font-mono text-[9px] tracking-widest uppercase">
                Kaela V. Borbon
              </div>
            </div>

            {/* Right side: Contact Details */}
            <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-between">
              <div className="space-y-6">
                <span className="font-mono text-xxs tracking-[0.25em] text-mist uppercase block border-b border-paper/10 pb-2">
                  DIRECT CLIENT INQUIRIES
                </span>
                
                <h3 className="font-serif text-2xl md:text-3xl font-light leading-snug">
                  "Every great room begins with an honest conversation about how you want to live."
                </h3>
                
                <p className="text-sm text-paper/85 font-light leading-relaxed">
                  A fresh Interior Design graduate open to residential, commercial, hospitality, and community-centered projects. Whether you have a clear vision or just a raw space, I'd love to help shape it into something functional and striking.
                </p>
              </div>

              {/* Contact Rows */}
              <div className="space-y-4 my-8 font-mono text-xs text-paper/90 tracking-wider">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-paper/10 rounded-lg">
                    <Mail className="w-4 h-4 text-slate" />
                  </div>
                  <div>
                    <span className="text-[9px] text-mist uppercase block mb-0.5">Email</span>
                    <a
                      href="mailto:borbonkaela@gmail.com?subject=Design%20Inquiry"
                      className="hover:text-slate transition-colors"
                    >
                      borbonkaela@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-paper/10 rounded-lg">
                    <Phone className="w-4 h-4 text-slate" />
                  </div>
                  <div>
                    <span className="text-[9px] text-mist uppercase block mb-0.5">Direct Line</span>
                    <a href="tel:09999546845" className="hover:text-slate transition-colors">
                      0999 954 6845
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-paper/10 rounded-lg">
                    <MapPin className="w-4 h-4 text-slate" />
                  </div>
                  <div>
                    <span className="text-[9px] text-mist uppercase block mb-0.5">HQ Studio</span>
                    <span>Manila, Philippines</span>
                  </div>
                </div>
              </div>

              {/* Button Action */}
              <div className="pt-2">
                <a
                  href="mailto:borbonkaela@gmail.com?subject=Design%20Inquiry"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-paper text-navy rounded-full font-mono text-xs uppercase tracking-widest hover:bg-slate hover:text-paper transition-all duration-300 shadow-md font-bold"
                  id="send-email-contact-btn"
                >
                  Send an Email <Send className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SOFT HORIZONTAL STRIP OF SMALL IMAGES ALONG THE BOTTOM OF THE PAGE */}
      <div className="mt-24 border-t border-mist/20 pt-10" id="contact-footer-strip">
        <div className="max-w-7xl mx-auto px-6">
          <span className="font-mono text-xxs tracking-[0.25em] text-mist uppercase text-center block mb-6">
            ATMOSPHERE & SHADOW PLAYS — CURATED PERSPECTIVES
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {footerStripPhotos.map((url, idx) => (
              <div
                key={idx}
                className="aspect-square rounded-md bg-cover bg-center opacity-65 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 shadow-sm"
                style={{ backgroundImage: `url(${url})` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
