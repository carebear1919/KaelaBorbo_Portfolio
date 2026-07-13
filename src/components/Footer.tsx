import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-ink text-paper pt-20 pb-12 px-6 border-t border-mist/10" id="footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-mist/10">
          {/* Brand/Wordmark Column */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="font-serif tracking-[0.25em] text-2xl font-bold mb-4">
                KAELA V. BORBON
              </h3>
              <p className="text-paper/60 text-sm font-light leading-relaxed max-w-sm mb-6">
                A graduate interior designer based in Manila, specializing in sustainable,
                research-driven, and highly functional spaces that elevate daily life.
              </p>
            </div>
            <div className="hidden md:block text-xs font-mono text-paper/40 uppercase tracking-wider">
              EST. 2026 — MANILA, PHILIPPINES
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-xs tracking-widest uppercase text-mist mb-6">
              Studio Navigation
            </h4>
            <ul className="space-y-3 font-mono text-xs tracking-wider uppercase">
              <li>
                <a href="#home" className="text-paper/80 hover:text-slate transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-paper/80 hover:text-slate transition-colors">
                  About the Designer
                </a>
              </li>
              <li>
                <a href="#projects" className="text-paper/80 hover:text-slate transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="text-paper/80 hover:text-slate transition-colors">
                  Get In Touch
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-xs tracking-widest uppercase text-mist mb-6">
              Connect With Us
            </h4>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-start gap-3">
                <Mail className="w-4.5 h-4.5 text-slate shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-mono text-paper/40 uppercase tracking-wider mb-0.5">
                    Email Inquiry
                  </span>
                  <a
                    href="mailto:borbonkaela@gmail.com"
                    className="text-paper/80 hover:text-slate transition-colors font-mono text-xs"
                  >
                    borbonkaela@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4.5 h-4.5 text-slate shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-mono text-paper/40 uppercase tracking-wider mb-0.5">
                    Direct Line
                  </span>
                  <a
                    href="tel:09999546845"
                    className="text-paper/80 hover:text-slate transition-colors font-mono text-xs"
                  >
                    0999 954 6845
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4.5 h-4.5 text-slate shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-mono text-paper/40 uppercase tracking-wider mb-0.5">
                    Location
                  </span>
                  <span className="text-paper/80 text-xs tracking-wider uppercase font-mono">
                    Manila, Philippines
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-paper/40 uppercase tracking-wider">
          <div>
            &copy; {new Date().getFullYear()} KAELA V. BORBON. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-paper transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-paper transition-colors cursor-pointer">
              Terms of Service
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-mist hover:text-paper transition-colors group focus:outline-none"
              id="back-to-top-btn"
            >
              Top <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
