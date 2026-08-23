import { useState } from 'react';
import { Sidebar, TabId } from './shared/components/Sidebar';
import { Header } from './shared/components/Header';
import { About } from './features/about/About';
import { Skills } from './features/skills/Skills';
import { Services } from './features/services/Services';
import { ProjectsSection } from './features/projects/ProjectsSection';
import { ExperienceSection } from './features/experience/ExperienceSection';
import { ContactSection } from './features/contact/ContactSection';
import { StreakSection } from './features/streaks/StreakSection';
import { QuoteRotator } from './features/hero/QuoteRotator';
import { SideRays } from './shared/components/SideRays';

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('about');
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  const isDarkTab = false; // All tabs use the light-cream theme background

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'about':
        return <About />;
      case 'skills':
        return (
          <section id="skills" className="bg-bgLightDark text-charcoal py-16 px-6">
            <div className="max-w-3xl mx-auto">
              <Skills />
            </div>
          </section>
        );
      case 'services':
        return (
          <section id="services" className="bg-bgLightDark text-charcoal py-16 px-6">
            <div className="max-w-3xl mx-auto">
              <Services />
            </div>
          </section>
        );
      case 'projects':
        return <ProjectsSection />;
      case 'experience':
        return (
          <section id="experience" className="bg-bgLightMed text-charcoal py-16 px-6">
            <div className="max-w-3xl mx-auto">
              <ExperienceSection />
            </div>
          </section>
        );
      case 'contact':
        return <ContactSection />;
      default:
        return <About />;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-bgDark text-slate-200 selection:bg-accent/30 selection:text-amber-200 font-sans">
      
      {/* Left: Sidebar Vertical Dock Menu */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Right: Work Panel */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#111318]">
        
        {/* Shared SideRays Background Animation across Header & Right Sidebar */}
        <div className="absolute inset-0 pointer-events-none opacity-85 z-0">
          <SideRays 
            rayColor1="#EAB308"
            rayColor2="#96c8ff"
            origin="top-right"
            speed={2.5}
            intensity={2}
            spread={2}
            tilt={0}
            opacity={1}
          />
        </div>

        {/* Top: Header centered with Heart support button */}
        <Header />

        {/* Bottom Pane: split center and right */}
        <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden relative z-10">
          
          {/* Center Column: Active section viewer & Quote speech bubble */}
          <div 
            className={`flex-1 flex flex-col overflow-y-auto no-scrollbar transition-colors duration-500 relative z-10 ${
              isDarkTab ? 'bg-bgDarkMed' : 'bg-bgLight'
            }`}
          >
            {/* Section Render */}
            <div className="flex-1">
              {renderActiveSection()}
            </div>

            {/* Centered Speech Bubble Quote */}
            <div className="py-12 flex-shrink-0 flex items-center justify-center border-t border-slate-300/20 dark:border-white/5">
              <QuoteRotator />
            </div>
          </div>

          {/* Right Column: Coding platform streak logs */}
          <aside 
            onMouseEnter={() => setIsSidebarHovered(true)}
            onMouseLeave={() => setIsSidebarHovered(false)}
            className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-white/5 p-6 flex flex-col gap-4 flex-shrink-0 relative z-10 bg-transparent"
          >
            
            {/* Content wrapped in relative layer to float above SideRays */}
            <div className="relative w-full flex flex-col gap-4">
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-100 mb-6 leading-tight px-1">
                Coding Activity
              </h2>
              <StreakSection isSidebarHovered={isSidebarHovered} />
            </div>
          </aside>

        </div>

      </div>

    </div>
  );
}

export default App;
