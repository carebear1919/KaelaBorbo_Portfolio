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

  return (
    <div className="paper-grain pt-32 pb-24 relative min-h-screen" id="contact-view">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Page Header */}
        <div className="mb-16 text-center fade-up" id="contact-header-block">
          <span className="font-mono text-xs tracking-[0.3em] text-slate uppercase block mb-3">
            COLLABORATION & COMMISSION
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-ink leading-[0.95] uppercase">
            LET'S WORK <br />
            <span className="italic font-normal text-slate lowercase">together</span>
          </h1>
          <div className="w-12 h-0.5 bg-slate mx-auto mt-6" />
        </div>

        {/* Centerpiece Contact Card */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch fade-up"
          id="centerpiece-contact-card"
        >
          {/* Column 1: Grayscale Portrait */}
          <div className="lg:col-span-5 relative aspect-square lg:aspect-auto overflow-hidden rounded-md border border-mist/20 shadow-sm">
            <img
              src="/images/about/about-portrait.jpg"
              alt="Kaela V. Borbon"
              className="w-full h-full object-cover filter grayscale contrast-[1.04] brightness-95 hover:grayscale-0 transition-all duration-[1500ms] ease-in-out scale-101 hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 left-4 bg-[#242424]/90 backdrop-blur-xs text-paper px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest border border-white/10 rounded-xs">
              Kaela V. Borbon
            </div>
          </div>

          {/* Column 2: Contact Details Card */}
          <div className="lg:col-span-7 p-8 md:p-12 bg-paper border border-mist/20 rounded-md shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <span className="font-mono text-[9px] tracking-[0.3em] text-slate uppercase block border-b border-mist/10 pb-3">
                DIRECT CLIENT INQUIRIES
              </span>

              <h3 className="font-serif text-2xl md:text-3xl font-light leading-snug text-ink italic">
                "Every great room begins with an honest conversation about how you want to live."
              </h3>

              <p className="text-sm text-ink/70 font-light leading-relaxed">
                A fresh Interior Design graduate open to residential, commercial, hospitality, and community-centered projects. Whether you have a clear vision or just a raw space, I'd love to help shape it into something functional and striking.
              </p>
            </div>

            {/* Contact Rows */}
            <div className="space-y-4 my-8 font-mono text-xs text-ink/85 tracking-wider">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-ink/5 rounded-lg">
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
                <div className="p-2.5 bg-ink/5 rounded-lg">
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
                <div className="p-2.5 bg-ink/5 rounded-lg">
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-ink text-paper rounded-full font-mono text-xs uppercase tracking-widest hover:bg-slate transition-all duration-300 shadow-md"
                id="send-email-contact-btn"
              >
                Send an Email <Send className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
