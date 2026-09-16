import { SKILLS_DATA, SkillItem } from './skills.data';
import { 
  ShieldAlert, 
  Key, 
  Layers, 
  Database, 
  Hammer, 
  Cpu, 
  Share2, 
  Send 
} from 'lucide-react';

function TechIcon({ name }: { name: string }) {
  const sizeClass = "w-5 h-5 flex-shrink-0";
  
  switch (name) {
    case 'java':
      return (
        <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 15c0 3 3 4 6 4s6-1 6-4" />
          <path d="M8 9c0-2 1-4 3-5 .5 1 .5 2 0 3" />
          <path d="M11 9c0-1.5.5-3 1.5-4 .5 1 .5 2 0 3" />
          <path d="M14 9c0-1 0-2 1-3" />
          <ellipse cx="12" cy="15" rx="7" ry="2" />
        </svg>
      );
    case 'spring':
      return (
        <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 22c6-1 12-7 15-12 1.5-2.5 1-6.5-1-8.5-2-2-6-2.5-8.5-1-5 3-11 9-12 15z" />
          <path d="M2 22c4-3 7-7 9-11" />
          <path d="M11 11c2-1 4-1 5-2" />
        </svg>
      );
    case 'react':
      return (
        <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <ellipse cx="12" cy="12" rx="10" ry="4" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
        </svg>
      );
    case 'typescript':
      return (
        <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M8 8h4M10 8v8M15 9c0-1 1-1 2-1s2 1 2 2v1c0 1-1 2-2 2s-2 1-2 2v1c0 1 1 1 2 1s2-1 2-1" />
        </svg>
      );
    case 'javascript':
      return (
        <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M10 15c0 1 .5 1.5 1.5 1.5s1.5-.5 1.5-1.5v-2" />
          <path d="M16 11c0-.5-.5-1-1-1s-1 .5-1 1v1c0 .5.5 1 1 1s1 .5 1 1v1c0 .5-.5 1-1 1s-1-.5-1-1" />
        </svg>
      );
    case 'tailwind':
      return (
        <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 6c3.27 0 5.45 1.63 6.55 4.9C17.45 8.18 15.27 6.55 12 6.55c-3.27 0-5.45 1.63-6.55 4.9C6.55 8.18 8.73 6.55 12 6.55zM12 12c3.27 0 5.45 1.63 6.55 4.9C17.45 14.18 15.27 12.55 12 12.55c-3.27 0-5.45 1.63-6.55 4.9C6.55 14.18 8.73 12.55 12 12.55z" />
        </svg>
      );
    case 'security':
      return <ShieldAlert className={sizeClass} />;
    case 'jwt':
      return <Key className={sizeClass} />;
    case 'layers':
      return <Layers className={sizeClass} />;
    case 'database':
      return <Database className={sizeClass} />;
    case 'maven':
      return <Hammer className={sizeClass} />;
    case 'postman':
      return <Send className={sizeClass} />;
    case 'api':
      return <Share2 className={sizeClass} />;
    default:
      return <Cpu className={sizeClass} />;
  }
}

export function Skills() {
  return (
    <section id="skills-section" className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6">
      {/* Crimson Red Gradient Card Container matching Hero design */}
      <div className="relative rounded-[36px] overflow-hidden border border-white/15 bg-gradient-to-br from-[#1C0807] via-[#A8281C] to-[#E63B2E] p-6 sm:p-12 shadow-[0_30px_90px_rgba(230,59,46,0.35)] text-white">
        
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E63B2E]/40 blur-3xl rounded-full pointer-events-none" />

        {/* Category Header Tag */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-6 mb-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-200 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-200 font-bold bg-black/40 border border-white/15 px-3.5 py-1 rounded-full">
              SKILLS &amp; TECH
            </span>
          </div>
        </div>

        <h3 className="relative z-10 font-serif font-bold text-3xl sm:text-5xl text-white mb-10 drop-shadow">
          Technical Capabilities &amp; Stack
        </h3>

        <div className="relative z-10 space-y-10">
          {SKILLS_DATA.map((group) => (
            <div 
              key={group.category} 
              className="border-b border-white/15 pb-8 flex flex-col md:flex-row gap-6 md:gap-12 items-start"
            >
              <div className="w-full md:w-60 flex-shrink-0">
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-amber-200 tracking-tight">
                  {group.category}
                </h4>
              </div>

              <div className="flex-1 flex flex-wrap gap-x-6 gap-y-4">
                {group.items.map((skill: SkillItem) => (
                  <div 
                    key={skill.name}
                    className="flex items-center gap-2.5 py-1.5 px-3.5 rounded-xl bg-black/40 border border-white/20 text-slate-100 hover:text-amber-200 hover:border-amber-200/50 hover:bg-black/60 transition-all duration-200 shadow-sm"
                  >
                    <TechIcon name={skill.iconName || 'default'} />
                    <span className="text-sm font-sans font-medium">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
export default Skills;
