import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: string[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  images,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    // Lock background scroll when lightbox is open
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  if (activeIndex < 0 || activeIndex >= images.length) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] bg-ink/95 flex items-center justify-center p-4 backdrop-blur-md transition-all duration-300 animate-fade-in"
      id="lightbox-backdrop"
    >
      {/* Top bar */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-paper z-10">
        <span className="font-mono text-xs tracking-widest uppercase">
          Image {activeIndex + 1} of {images.length}
        </span>
        <button
          onClick={onClose}
          className="p-2 bg-paper/10 rounded-full hover:bg-paper/20 text-paper transition-all focus:outline-none"
          aria-label="Close Lightbox"
          id="lightbox-close-btn"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative max-w-5xl max-h-[80vh] w-full flex items-center justify-center">
        {/* Previous Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 p-3 bg-paper/10 rounded-full hover:bg-paper/20 text-paper transition-all z-10 focus:outline-none hover:scale-105"
          aria-label="Previous Image"
          id="lightbox-prev-btn"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* The active image */}
        <img
          src={images[activeIndex]}
          alt={`Gallery item ${activeIndex + 1}`}
          className="max-w-full max-h-[75vh] object-contain rounded-md shadow-2xl transition-transform duration-300"
          referrerPolicy="no-referrer"
          id="lightbox-active-img"
        />

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 p-3 bg-paper/10 rounded-full hover:bg-paper/20 text-paper transition-all z-10 focus:outline-none hover:scale-105"
          aria-label="Next Image"
          id="lightbox-next-btn"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Lower Caption / Helper Bar */}
      <div className="absolute bottom-6 text-center text-paper/60 font-mono text-xxs tracking-wider uppercase">
        Use Left/Right arrow keys to navigate — Escape to close
      </div>
    </div>
  );
}
