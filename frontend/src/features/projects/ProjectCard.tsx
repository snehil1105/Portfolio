import { Github, ExternalLink } from 'lucide-react';
import { ProjectItem } from './projects.data';

interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isWebhook = project.id === 'webhook';

  const formatHighlight = (text: string) => {
    const words = text.split(' ');
    const boldCount = words.length > 2 ? 2 : 1;
    const boldPart = words.slice(0, boldCount).join(' ');
    const restPart = words.slice(boldCount).join(' ');
    return (
      <span>
        <strong className="font-semibold text-white">{boldPart}</strong>{' '}
        <span className="text-slate-200 font-light">{restPart}</span>
      </span>
    );
  };

  return (
    <div className="group border-t border-white/15 py-12 flex flex-col md:flex-row gap-6 md:gap-12 items-start transition-all duration-300">
      
      {/* Index Number */}
      <span className="font-mono text-sm text-amber-200 tracking-widest block font-bold pt-1.5">
        {project.number}
      </span>

      {/* Details */}
      <div className="flex-1 space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <h3 className={`font-serif font-bold text-white group-hover:text-amber-200 transition-colors duration-200 ${
            isWebhook ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
          }`}>
            {project.title}
          </h3>
          
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-white hover:text-amber-200 border border-white/20 hover:border-amber-200/50 bg-black/40 hover:bg-black/60 px-4 py-2 rounded-full transition-all duration-200 shadow-sm"
            aria-label={`View code for ${project.title} on GitHub`}
          >
            <Github size={14} />
            <span>View Code</span>
            <ExternalLink size={12} />
          </a>
        </div>

        <p className={`text-slate-100 leading-relaxed font-light ${
          isWebhook ? 'text-base sm:text-lg max-w-4xl' : 'text-sm sm:text-base max-w-3xl'
        }`}>
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {project.stack.map((tech) => (
            <span key={tech} className="text-xs font-mono font-bold text-slate-100 bg-black/40 border border-white/15 px-3 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>

        {/* Key Highlights */}
        {isWebhook ? (
          <div className="mt-5 border-l-2 border-amber-200 pl-5 py-3 space-y-3 bg-black/30 border border-white/10 p-5 rounded-r-2xl">
            <span className="block text-[10px] font-mono text-amber-200 uppercase tracking-widest font-bold mb-1">
              // Key Architecture Highlights:
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {project.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-200 flex-shrink-0 mt-2" />
                  {formatHighlight(highlight)}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-4 py-1">
            <span className="block text-[10px] font-mono text-amber-200/90 uppercase tracking-widest mb-2.5 font-bold">
              // Key Features:
            </span>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {project.highlights.map((highlight, idx) => (
                <span key={idx} className="text-sm flex items-center gap-2.5">
                  {idx > 0 && <span className="text-amber-200/40 font-mono">•</span>}
                  {formatHighlight(highlight)}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
export default ProjectCard;
