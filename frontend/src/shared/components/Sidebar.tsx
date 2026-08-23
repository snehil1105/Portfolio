import { User, Code, Briefcase, Terminal, History, Mail } from 'lucide-react';

export type TabId = 'about' | 'skills' | 'services' | 'projects' | 'experience' | 'contact';

interface SidebarProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  // Configured labels exactly as requested (using Journey for the experience tab)
  const menuItems = [
    { id: 'about' as TabId, label: 'About', icon: <User size={20} /> },
    { id: 'skills' as TabId, label: 'Skills', icon: <Code size={20} /> },
    { id: 'services' as TabId, label: 'Services', icon: <Briefcase size={20} /> },
    { id: 'projects' as TabId, label: 'Projects', icon: <Terminal size={20} /> },
    { id: 'experience' as TabId, label: 'Journey', icon: <History size={20} /> },
    { id: 'contact' as TabId, label: 'Contact', icon: <Mail size={20} /> },
  ];

  return (
    <aside className="w-20 sm:w-24 bg-[#111318] border-r border-white/5 flex flex-col items-center py-8 h-full flex-shrink-0 relative z-20">
      
      {/* Brand logo */}
      <div className="mb-12 text-center">
        <span className="font-serif font-semibold text-sm text-slate-100 tracking-tight block">
          Snehil
        </span>
        <span className="text-[9px] font-mono text-accent uppercase tracking-widest block scale-90 mt-0.5">
          Dev
        </span>
      </div>

      {/* Vertical dock menu */}
      <nav className="flex-1 flex flex-col gap-3 w-full px-2">
        {menuItems.map((item) => {
          const isActive = item.id === activeTab;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex flex-col items-center justify-center gap-1.5 py-3 px-1 rounded-xl transition-all duration-200 border text-center ${
                isActive
                  ? 'bg-accent/15 border-accent/30 text-accent shadow-md shadow-accent/5'
                  : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
              aria-label={`Show ${item.label}`}
            >
              {/* Icon (Top) */}
              <div className="transition-transform duration-200 group-hover:scale-105">
                {item.icon}
              </div>

              {/* Section label (Directly underneath, always visible) */}
              <span className="text-[9px] font-sans tracking-wider font-semibold">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Tiny active node */}
      <div className="mt-auto">
        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
      </div>

    </aside>
  );
}
