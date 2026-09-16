import { LikeButton } from '../../features/like-button/LikeButton';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Navbar({ activeTab = 'home', setActiveTab }: NavbarProps) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Journey' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="w-full max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 pt-16 sm:pt-20 pb-4 relative z-30">
      {/* Brand Logo */}
      <button 
        onClick={() => setActiveTab && setActiveTab('home')}
        className="font-serif font-bold text-2xl tracking-tight text-white flex items-center gap-1 hover:opacity-90 transition-opacity focus:outline-none"
      >
        <span>Snehil</span>
        <span className="text-[#E63B2E]">.</span>
      </button>

      {/* Nav Links */}
      <div className="flex items-center gap-1 sm:gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 shadow-lg">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab && setActiveTab(item.id)}
              className={`text-xs font-sans px-2.5 sm:px-3.5 py-1.5 rounded-full transition-all duration-200 font-medium tracking-wide ${
                isActive
                  ? 'bg-[#E63B2E] text-white font-bold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Right: Like Button Support Widget */}
      <div className="hidden md:flex items-center gap-4">
        <LikeButton showPrompt={true} />
      </div>
    </nav>
  );
}
export default Navbar;
