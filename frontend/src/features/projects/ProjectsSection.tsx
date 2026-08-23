import { ProjectCard } from './ProjectCard';
import { PROJECTS_DATA } from './projects.data';

export function ProjectsSection() {
  return (
    <section id="projects" className="pt-16 pb-24 px-6 text-slate-800 bg-bgLightDark">
      <div className="max-w-4xl mx-auto">
        
        {/* Consistent Bold Section Title */}
        <h2 className="font-serif font-bold text-3xl sm:text-4xl text-accent mb-12">
          Projects
        </h2>

        {/* List of projects */}
        <div className="flex flex-col">
          {PROJECTS_DATA.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
            />
          ))}
          {/* Closing bottom rule */}
          <div className="border-t border-slate-300 w-full" />
        </div>
      </div>
    </section>
  );
}
export default ProjectsSection;
