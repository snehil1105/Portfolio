import { SERVICES_DATA } from './services.data';

export function Services() {
  return (
    <div className="w-full">
      {/* Consistent Bold Section Title */}
      <h2 className="font-serif font-bold text-3xl sm:text-4xl text-accent mb-8">
        Services
      </h2>

      <div className="flex flex-col">
        {SERVICES_DATA.map((service) => (
          <div 
            key={service.id} 
            className="group border-t border-slate-300/40 py-8 flex flex-col md:flex-row gap-4 md:gap-12 items-start transition-all duration-300 hover:translate-x-1"
          >
            {/* Large Service Number */}
            <span className="font-serif text-3xl sm:text-4xl text-accent font-light leading-none block md:w-16">
              {service.number}
            </span>

            {/* Title & Description */}
            <div className="flex-1 space-y-2">
              <h4 className="font-serif text-xl sm:text-2xl font-normal text-slate-900 group-hover:text-accent transition-colors duration-200">
                {service.title}
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed font-light max-w-2xl">
                {service.description}
              </p>
            </div>
          </div>
        ))}
        {/* Bottom closing divider line */}
        <div className="border-t border-slate-300/40 w-full" />
      </div>
    </div>
  );
}
