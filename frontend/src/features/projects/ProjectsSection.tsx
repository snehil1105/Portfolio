import { ProjectCard } from './ProjectCard';
import { PROJECTS_DATA } from './projects.data';

export function ProjectsSection() {
  return (
    <section id="projects" className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6">
      {/* Crimson Red Gradient Card Container matching Hero design */}
      <div className="relative rounded-[36px] overflow-hidden border border-white/15 bg-gradient-to-br from-[#1C0807] via-[#A8281C] to-[#E63B2E] p-6 sm:p-12 shadow-[0_30px_90px_rgba(230,59,46,0.35)] text-white">
        
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E63B2E]/40 blur-3xl rounded-full pointer-events-none" />

        {/* Category Header Tag Row */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-6 mb-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-200 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-200 font-bold bg-black/40 border border-white/15 px-3.5 py-1 rounded-full">
              WORK SHOWCASE
            </span>
          </div>

          <a 
            href="https://github.com/snehil1105" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-black/40 hover:bg-black/70 text-white border border-white/20 text-xs font-mono uppercase tracking-widest px-5 py-2.5 rounded-full font-bold transition-all duration-200 shadow-md hover:text-amber-200"
          >
            <span>View All GitHub</span>
            <span>→</span>
          </a>
        </div>

        <h2 className="relative z-10 font-serif font-bold text-3xl sm:text-5xl text-white mb-12 drop-shadow">
          A Selection of <br className="hidden sm:inline" /> My Best Work.
        </h2>

        {/* List of Projects */}
        <div className="relative z-10 flex flex-col">
          {PROJECTS_DATA.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
            />
          ))}
          <div className="border-t border-white/15 w-full" />
        </div>

      </div>
    </section>
  );
}
export default ProjectsSection;
