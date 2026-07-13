import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

interface HeaderProps {
  currentPath: string;
}

export default function Header({ currentPath }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Call once to check initial scroll position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine if the header should start transparent.
  // Home and Project page heroes are full bleed, so starting transparent is perfect there.
  const isHeroPage = currentPath === "home" || currentPath.startsWith("project/");
  const isTransparent = isHeroPage && !isScrolled;

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    window.location.hash = href;
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isTransparent
          ? "bg-transparent text-paper border-b border-transparent"
          : "bg-paper text-ink border-b border-mist/20 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left: Wordmark */}
        <a
          href="#home"
          onClick={() => handleLinkClick("#home")}
          className="font-serif tracking-[0.2em] text-lg font-bold hover:opacity-80 transition-opacity"
          id="logo-link"
        >
          KAELA V. BORBON
        </a>

        {/* Center: Nav links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest uppercase">
          {navLinks.map((link) => {
            const isActive =
              currentPath === link.href.substring(1) ||
              (link.href === "#home" && currentPath === "home") ||
              (link.href === "#about" && currentPath === "about") ||
              (link.href === "#projects" && currentPath === "projects");

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`transition-colors duration-300 relative py-2 hover:text-slate ${
                  isActive
                    ? isTransparent
                      ? "text-paper border-b border-paper"
                      : "text-slate border-b border-slate"
                    : isTransparent
                    ? "text-paper/80"
                    : "text-ink/60"
                }`}
                id={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right: CTA button (Desktop) */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full border text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
              isTransparent
                ? "border-paper text-paper hover:bg-paper hover:text-ink"
                : "border-slate text-slate hover:bg-slate hover:text-paper"
            }`}
            id="nav-cta-btn"
          >
            Let's Work Together <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:opacity-80 transition-opacity focus:outline-none"
          aria-label="Toggle Menu"
          id="mobile-menu-trigger"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-20 bg-paper z-40 md:hidden flex flex-col justify-between p-8 animate-fade-in"
          style={{ height: "calc(100vh - 5rem)" }}
          id="mobile-nav-overlay"
        >
          <nav className="flex flex-col gap-6 text-xl font-serif tracking-widest">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="text-ink/80 hover:text-slate transition-colors py-2 border-b border-mist/10"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pb-8">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-slate text-paper text-sm font-mono tracking-widest uppercase hover:bg-slate/90 transition-colors"
            >
              Let's Work Together <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
