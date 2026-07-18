import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import ProjectPage from "./pages/ProjectPage";

export default function App() {
  const [currentPath, setCurrentPath] = useState("home");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      
      if (!hash || hash === "#" || hash === "#home") {
        setCurrentPath("home");
        window.scrollTo({ top: 0, behavior: "instant" });
      } else if (hash === "#about") {
        setCurrentPath("about");
        window.scrollTo({ top: 0, behavior: "instant" });
      } else if (hash === "#projects") {
        setCurrentPath("projects");
        window.scrollTo({ top: 0, behavior: "instant" });
      } else if (hash === "#contact") {
        setCurrentPath("contact");
        window.scrollTo({ top: 0, behavior: "instant" });
      } else if (hash.startsWith("#project/")) {
        const slug = hash.substring("#project/".length);
        setCurrentPath(`project/${slug}`);
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    // Initial load parse
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Page Navigation Handlers to bypass manual window.location writes in subcomponents
  const handleNavigateProject = (slug: string) => {
    window.location.hash = `#project/${slug}`;
  };

  const handleNavigateHome = () => {
    window.location.hash = "#home";
  };

  const handleNavigateProjects = () => {
    window.location.hash = "#projects";
  };

  const handleNavigateContact = () => {
    window.location.hash = "#contact";
  };

  return (
    <div className="paper-grain min-h-screen flex flex-col justify-between" id="app-wrapper">
      {/* GLOBAL HIGH-END NAVIGATION */}
      <Header currentPath={currentPath} />

      {/* RENDER ACTIVE ROUTE VIEWS WITH ANIMATED TRANSITION EFFECT */}
      <main className="grow" id="main-content-stage">
        {currentPath === "home" && (
          <div className="animate-fade-in">
            <Home onNavigate={handleNavigateProject} />
          </div>
        )}

        {currentPath.startsWith("project/") && (
          <div className="animate-fade-in">
            <ProjectPage
              slug={currentPath.substring("project/".length)}
              onNavigateProject={handleNavigateProject}
              onNavigateProjects={handleNavigateProjects}
            />
          </div>
        )}

        {currentPath === "about" && (
          <div className="animate-fade-in">
            <About />
          </div>
        )}

        {currentPath === "projects" && (
          <div className="animate-fade-in">
            <Projects onNavigate={handleNavigateProject} />
          </div>
        )}

        {currentPath === "contact" && (
          <div className="animate-fade-in">
            <Contact />
          </div>
        )}
      </main>

      {/* GLOBAL FOOTER */}
      <Footer />
    </div>
  );
}
