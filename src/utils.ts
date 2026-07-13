export function initScrollReveal() {
  // Respect prefers-reduced-motion
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
  const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (prefersReduced) {
          (entry.target as HTMLElement).classList.add("visible");
          (entry.target as HTMLElement).style.transition = "none";
          (entry.target as HTMLElement).style.transform = "none";
          (entry.target as HTMLElement).style.opacity = "1";
        } else {
          entry.target.classList.add("visible");
        }
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(callback, {
    root: null,
    rootMargin: "0px 0px -12% 0px", // Trigger when 12% from the bottom of the viewport
    threshold: 0.02,
  });

  const targets = document.querySelectorAll(".fade-up");
  targets.forEach((t) => observer.observe(t));

  return () => {
    targets.forEach((t) => observer.unobserve(t));
    observer.disconnect();
  };
}
