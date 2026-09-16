import { useState } from 'react';
import { Navbar } from './shared/components/Navbar';
import { StreakCurtain } from './features/streaks/StreakCurtain';
import { Hero } from './features/hero/Hero';
import { About } from './features/about/About';
import { Skills } from './features/skills/Skills';
import { Services } from './features/services/Services';
import { ProjectsSection } from './features/projects/ProjectsSection';
import { ExperienceSection } from './features/experience/ExperienceSection';
import { ContactSection } from './features/contact/ContactSection';
import { SideRays } from './shared/components/SideRays';
import { Footer } from './shared/components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState<string>('home');

  const renderSection = () => {
    switch (activeTab) {
      case 'home':
        return <Hero onNavigate={setActiveTab} />;
      case 'about':
        return <About />;
      case 'skills':
        return <Skills />;
      case 'services':
        return <Services />;
      case 'projects':
        return <ProjectsSection />;
      case 'experience':
        return <ExperienceSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <Hero onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0E0606] text-slate-100 font-sans relative overflow-x-hidden selection:bg-[#E63B2E]/30 selection:text-amber-200">
      
      {/* 1. Top Hanging Pull-Down Curtain Widget for LeetCode & Codeforces Live Coding Activity */}
      <StreakCurtain />

      {/* Ambient Red/Orange Background Glow matching Dribbble Reference */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_-10%,rgba(230,59,46,0.35),rgba(14,6,6,1))]" />
        <div className="absolute inset-0 opacity-40">
          <SideRays 
            rayColor1="#E63B2E"
            rayColor2="#FF8C00"
            origin="top-right"
            speed={2}
            intensity={1.8}
            spread={2}
            tilt={0}
            opacity={0.8}
          />
        </div>
      </div>

      {/* Main Container Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Top Navbar */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dynamic Section Card Page */}
        <main className="flex-1 py-4 transition-all duration-300">
          {renderSection()}
        </main>

        {/* Footer */}
        <Footer onNavigate={setActiveTab} />

      </div>

    </div>
  );
}

export default App;
