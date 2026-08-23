import { Github } from 'lucide-react';
import { ProjectItem } from './projects.data';

interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isWebhook = project.id === 'webhook';

  // Helper to dynamically bold the first 1-2 words of each highlight for quick scanning
  const formatHighlight = (text: string) => {
    const words = text.split(' ');
    const boldCount = words.length > 2 ? 2 : 1;
    const boldPart = words.slice(0, boldCount).join(' ');
    const restPart = words.slice(boldCount).join(' ');
    return (
      <span>
        <strong className="font-semibold text-charcoal">{boldPart}</strong>{' '}
        <span className="text-slate-700 font-light">{restPart}</span>
      </span>
    );
  };

  return (
    <div className="group border-t border-slate-300 py-14 flex flex-col md:flex-row gap-6 md:gap-12 items-start transition-all duration-300">
      
      {/* Monospace Project Index Number */}
      <span className="font-mono text-sm text-accent tracking-widest block font-bold pt-1.5">
        {project.number}
      </span>

      {/* Project Details */}
      <div className="flex-1 space-y-5">
        
        {/* Title & GitHub Button */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <h3 className={`font-serif font-bold text-slate-900 group-hover:text-accent transition-colors duration-200 ${
            isWebhook ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
          }`}>
            {project.title}
          </h3>
          
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-slate-750 hover:text-accent border border-slate-350 hover:border-accent/40 bg-slate-200/60 hover:bg-accent/5 px-3.5 py-2 rounded-lg transition-all duration-200"
            aria-label={`View code for ${project.title} on GitHub`}
          >
            <Github size={14} />
            <span>View Code</span>
          </a>
        </div>

        {/* Description - Webhook platform is visually larger and prominent */}
        <p className={`text-charcoal leading-relaxed tracking-normal font-normal ${
          isWebhook ? 'text-[15px] sm:text-[17px] max-w-4.5xl' : 'text-sm sm:text-[15px] max-w-3xl'
        }`}>
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-x-4.5 gap-y-2 pt-1">
          {project.stack.map((tech) => (
            <span key={tech} className="text-xs font-mono font-bold text-slate-700">
              // {tech}
            </span>
          ))}
        </div>

        {/* Highlights List - Increased font size, spacing, and scanning visibility */}
        {isWebhook ? (
          <div className="mt-5 border-l-2 border-accent/30 pl-5 py-1.5 space-y-3">
            <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold mb-1">
              // Key Architecture Highlights:
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {project.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
                  {formatHighlight(highlight)}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-4 py-1">
            <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2.5 font-semibold">
              // Key Features:
            </span>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {project.highlights.map((highlight, idx) => (
                <span key={idx} className="text-sm flex items-center gap-2.5">
                  {idx > 0 && <span className="text-slate-400 font-mono">•</span>}
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
