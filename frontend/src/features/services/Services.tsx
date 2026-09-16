import { SERVICES_DATA } from './services.data';

export function Services() {
  return (
    <section id="services-section" className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6">
      {/* Crimson Red Gradient Card Container matching Hero design */}
      <div className="relative rounded-[36px] overflow-hidden border border-white/15 bg-gradient-to-br from-[#1C0807] via-[#A8281C] to-[#E63B2E] p-6 sm:p-12 shadow-[0_30px_90px_rgba(230,59,46,0.35)] text-white">
        
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E63B2E]/40 blur-3xl rounded-full pointer-events-none" />

        {/* Category Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-6 mb-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-200 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-200 font-bold bg-black/40 border border-white/15 px-3.5 py-1 rounded-full">
              SERVICES
            </span>
          </div>
        </div>

        <h3 className="relative z-10 font-serif font-bold text-3xl sm:text-5xl text-white mb-10 drop-shadow">
          What I Offer
        </h3>

        <div className="relative z-10 flex flex-col">
          {SERVICES_DATA.map((service) => (
            <div 
              key={service.id} 
              className="group border-t border-white/15 py-8 flex flex-col md:flex-row gap-4 md:gap-12 items-start transition-all duration-300 hover:translate-x-1"
            >
              <span className="font-serif text-3xl sm:text-4xl text-amber-200 font-light leading-none block md:w-16">
                {service.number}
              </span>

              <div className="flex-1 space-y-2">
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-amber-200 transition-colors duration-200">
                  {service.title}
                </h4>
                <p className="text-slate-100 text-sm sm:text-base leading-relaxed font-light max-w-2xl">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t border-white/15 w-full" />
        </div>

      </div>
    </section>
  );
}
export default Services;
