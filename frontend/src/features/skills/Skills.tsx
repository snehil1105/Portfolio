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

// A high-quality self-contained component to render inline SVG tech logos that match the current text color (currentColor)
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
    case 'html':
      return (
        <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 5l1.5 14 8.5 3 8.5-3L22 5L12 2z" />
          <path d="M12 6v12M8 9h8" />
        </svg>
      );
    case 'css':
      return (
        <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 5l1.5 14 8.5 3 8.5-3L22 5L12 2z" />
          <path d="M8 10h8M8 14h8" />
        </svg>
      );
    case 'tailwind':
      return (
        <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 6c3.27 0 5.45 1.63 6.55 4.9C17.45 8.18 15.27 6.55 12 6.55c-3.27 0-5.45 1.63-6.55 4.9C6.55 8.18 8.73 6.55 12 6.55zM12 12c3.27 0 5.45 1.63 6.55 4.9C17.45 14.18 15.27 12.55 12 12.55c-3.27 0-5.45 1.63-6.55 4.9C6.55 14.18 8.73 12.55 12 12.55z" />
        </svg>
      );
    case 'postgresql':
      return (
        <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a9 9 0 0 0-9 9c0 2 1.5 3.5 2.5 4.5.5-1 1-2.5 1.5-4s2-2 3.5-2.5c1.5-.5 3-.5 4.5-.5s3-.5 3.5-1.5" />
          <path d="M12 21a9 9 0 0 0 8-5.5c-1-.5-2.5-1-4-1s-3 1-3.5 2.5-.5 3-1.5 4" />
        </svg>
      );
    case 'mysql':
      return (
        <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="6" rx="8" ry="3" />
          <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
          <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
        </svg>
      );
    case 'redis':
      return (
        <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6l8-4 8 4-8 4-8-4z" />
          <path d="M4 12l8 4 8-4M4 18l8 4 8-4" />
        </svg>
      );
    case 'docker':
      return (
        <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10.5c0-.8-.7-1.5-1.5-1.5h-3.3c-.3 0-.6-.2-.7-.5-.4-1.2-1.3-2-2.5-2-1.2 0-2.1.8-2.5 2h-1c-.4-1.2-1.3-2-2.5-2-1.2 0-2.1.8-2.5 2H3.5C2.7 9 2 9.7 2 10.5V17c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6.5z" />
          <path d="M6 12h2v2H6zm4 0h2v2H10zm4 0h2v2h-2z" />
        </svg>
      );
    case 'git':
      return (
        <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M6 9v6M9 9l7 7" />
        </svg>
      );
    case 'github':
      return (
        <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      );
    case 'python':
      return (
        <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 10c0-1.5-1-2.5-2.5-2.5S7 8.5 7 10s1 2.5 2.5 2.5h5c1.5 0 2.5 1 2.5 2.5s-1 2.5-2.5 2.5H7" />
          <path d="M17 15c0-1.5-1-2.5-2.5-2.5H12" />
          <circle cx="9.5" cy="9.5" r="0.5" fill="currentColor" />
          <circle cx="14.5" cy="14.5" r="0.5" fill="currentColor" />
        </svg>
      );
    case 'fastapi':
      return (
        <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    case 'cpp':
      return (
        <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 10a2 2 0 1 0 0 4M14 12h4M16 10v4" />
        </svg>
      );
    
    // Lucide fallback mappings for abstract tech items
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
    <div className="w-full">
      {/* Consistent Bold Section Title */}
      <h2 className="font-serif font-bold text-3xl sm:text-4xl text-accent mb-8">
        Skills
      </h2>

      <div className="space-y-12">
        {SKILLS_DATA.map((group) => (
          <div 
            key={group.category} 
            className="border-b border-slate-300/40 pb-10 flex flex-col md:flex-row gap-6 md:gap-12 items-start"
          >
            
            {/* Category Header */}
            <div className="w-full md:w-60 flex-shrink-0">
              <h4 className="font-serif text-xl sm:text-2xl font-normal text-slate-900 tracking-tight leading-tight">
                {group.category}
              </h4>
            </div>

            {/* List of Skills */}
            <div className="flex-1 flex flex-wrap gap-x-8 gap-y-5">
              {group.items.map((skill: SkillItem) => (
                <div 
                  key={skill.name}
                  className="flex items-center gap-2.5 group transition-transform duration-200 hover:translate-x-1 cursor-default text-slate-600 hover:text-accent"
                >
                  <TechIcon name={skill.iconName || 'default'} />
                  
                  <span className="text-sm font-sans font-normal tracking-wide transition-colors duration-200">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
