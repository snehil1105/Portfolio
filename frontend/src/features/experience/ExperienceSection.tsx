import { TIMELINE_DATA } from './experience.data';

export function ExperienceSection() {
  return (
    <div className="w-full">
      {/* Consistent Bold Section Title */}
      <h2 className="font-serif font-bold text-3xl sm:text-4xl text-accent mb-12">
        Learning Journey
      </h2>

      {/* Vertical Timeline container */}
      <div className="relative border-l border-slate-300/40 ml-4 pl-8 py-2 space-y-12">
        
        {TIMELINE_DATA.map((item) => (
          <div key={item.id} className="relative group transition-all duration-300">
            
            {/* Pulsating timeline indicator dot */}
            <span className="absolute -left-[37px] top-1.5 flex items-center justify-center">
              {item.current ? (
                <>
                  <span className="animate-ping absolute inline-flex h-4.5 w-4.5 rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
                </>
              ) : (
                <span className="inline-flex rounded-full h-2 w-2 bg-slate-400 group-hover:bg-accent transition-colors duration-250" />
              )}
            </span>

            {/* Timeline Row Content */}
            <div className="space-y-2">
              
              {/* Year & Current Stage Highlight */}
              <div className="flex items-baseline gap-3">
                <span className={`font-serif text-2xl sm:text-3xl font-light leading-none ${
                  item.current ? 'text-accent font-normal' : 'text-slate-900'
                }`}>
                  {item.year}
                </span>
                {item.current && (
                  <span className="text-[9px] font-mono uppercase text-accent bg-accent/5 border border-accent/15 px-2 py-0.5 rounded tracking-wider font-semibold">
                    Current Stage
                  </span>
                )}
              </div>

              {/* Title */}
              <h4 className="font-serif text-lg sm:text-xl font-normal text-slate-950">
                {item.title}
              </h4>

              {/* Description */}
              <p className="text-slate-600 text-sm leading-relaxed font-light max-w-xl">
                {item.description}
              </p>

              {/* Focus tags (no pills, just clean monospace metadata) */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1.5">
                {item.focus.map((tech) => (
                  <span key={tech} className="text-xs font-mono text-slate-500">
                    // {tech}
                  </span>
                ))}
              </div>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}
export default ExperienceSection;
