import { User, Code, Briefcase, Terminal, History, Mail } from 'lucide-react';

export type TabId = 'about' | 'skills' | 'services' | 'projects' | 'experience' | 'contact';

interface SidebarProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  // Configured labels exactly as requested (using Journey for the experience tab)
  const menuItems = [
    { id: 'about' as TabId, label: 'About', icon: <User size={19} /> },
    { id: 'skills' as TabId, label: 'Skills', icon: <Code size={19} /> },
    { id: 'services' as TabId, label: 'Services', icon: <Briefcase size={19} /> },
    { id: 'projects' as TabId, label: 'Projects', icon: <Terminal size={19} /> },
    { id: 'experience' as TabId, label: 'Journey', icon: <History size={19} /> },
    { id: 'contact' as TabId, label: 'Contact', icon: <Mail size={19} /> },
  ];

  return (
    <aside className="w-16 sm:w-20 md:w-24 bg-[#111827]/60 backdrop-blur-md border-r border-white/10 flex flex-col items-center py-6 sm:py-8 h-full flex-shrink-0 relative z-20 select-none">
      
      {/* Brand logo */}
      <div className="mb-8 sm:mb-12 text-center">
        <span className="font-serif font-semibold text-sm text-slate-100 tracking-tight block">
          Snehil
        </span>
        <span className="text-[9px] font-mono text-accent uppercase tracking-widest block scale-90 mt-0.5 font-semibold">
          Dev
        </span>
      </div>

      {/* Vertical dock menu */}
      <nav className="flex-1 flex flex-col gap-2 sm:gap-3 w-full px-1.5 sm:px-2">
        {menuItems.map((item) => {
          const isActive = item.id === activeTab;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative w-full flex flex-col items-center justify-center gap-1 sm:gap-1.5 py-2.5 sm:py-3 px-1 rounded-lg transition-all duration-200 text-center ${
                isActive
                  ? 'bg-accent/10 text-accent font-semibold before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[3px] before:bg-accent before:rounded-r'
                  : 'bg-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
              aria-label={`Show ${item.label}`}
            >
              {/* Icon (Top) */}
              <div className="transition-colors duration-200">
                {item.icon}
              </div>

              {/* Section label (Directly underneath, always visible) */}
              <span className="text-[8px] sm:text-[9px] font-sans tracking-wider">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Subtle indicator dot */}
      <div className="mt-auto">
        <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
      </div>

    </aside>
  );
}

