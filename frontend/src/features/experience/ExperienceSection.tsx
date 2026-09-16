import { TIMELINE_DATA } from './experience.data';

export function ExperienceSection() {
  return (
    <section id="experience" className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6">
      {/* Crimson Red Gradient Card Container matching Hero design */}
      <div className="relative rounded-[36px] overflow-hidden border border-white/15 bg-gradient-to-br from-[#1C0807] via-[#A8281C] to-[#E63B2E] p-6 sm:p-12 shadow-[0_30px_90px_rgba(230,59,46,0.35)] text-white">
        
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E63B2E]/40 blur-3xl rounded-full pointer-events-none" />

        {/* Category Header Tag */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-6 mb-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-200 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-200 font-bold bg-black/40 border border-white/15 px-3.5 py-1 rounded-full">
              JOURNEY
            </span>
          </div>
        </div>

        <h3 className="relative z-10 font-serif font-bold text-3xl sm:text-5xl text-white mb-10 drop-shadow">
          Learning &amp; Growth History
        </h3>

        {/* Timeline Container */}
        <div className="relative z-10 border-l border-white/20 ml-4 pl-8 py-2 space-y-12">
          {TIMELINE_DATA.map((item) => (
            <div key={item.id} className="relative group transition-all duration-300">
              
              {/* Dot */}
              <span className="absolute -left-[37px] top-1.5 flex items-center justify-center">
                {item.current ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-4.5 w-4.5 rounded-full bg-amber-200 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-200" />
                  </>
                ) : (
                  <span className="inline-flex rounded-full h-2.5 w-2.5 bg-white/40 group-hover:bg-amber-200 transition-colors duration-250" />
                )}
              </span>

              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className={`font-serif text-2xl sm:text-3xl font-bold leading-none ${
                    item.current ? 'text-amber-200' : 'text-white'
                  }`}>
                    {item.year}
                  </span>
                  {item.current && (
                    <span className="text-[9px] font-mono uppercase text-amber-200 bg-black/40 border border-white/15 px-2.5 py-0.5 rounded-full font-bold tracking-wider">
                      Current Stage
                    </span>
                  )}
                </div>

                <h4 className="font-serif text-xl font-bold text-white">
                  {item.title}
                </h4>

                <p className="text-slate-100 text-sm sm:text-base leading-relaxed font-light max-w-xl">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {item.focus.map((tech) => (
                    <span key={tech} className="text-xs font-mono font-medium text-slate-100 bg-black/40 border border-white/15 px-3 py-0.5 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
export default ExperienceSection;
