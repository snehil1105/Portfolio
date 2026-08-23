export function LearningJourney() {
  const milestones = [
    {
      year: "2026",
      title: "Modular Integration & Webhooks",
      description: "Designed HookRelay to explore asynchronous event processing, database locks, and retry queues using Spring Data JPA."
    },
    {
      year: "2025",
      title: "StudyPilot Architecture",
      description: "Built StudyPilot, implementing Spring Boot MVC alongside server-rendered Thymeleaf pages to practice session state handling."
    },
    {
      year: "2024",
      title: "Foundations in MVC & Relational Databases",
      description: "Gained deep experience in PostgreSQL query design, transactions, index optimization, and the basic Spring lifecycle."
    }
  ];

  return (
    <section id="timeline" className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-mono text-xs uppercase tracking-wider text-amber-500">06 / Milestones</span>
      </div>
      <h2 className="font-serif font-semibold text-3xl text-slate-100 mb-6 border-b border-white/10 pb-2">
        Learning Journey
      </h2>

      <div className="relative border-l border-white/10 ml-4 pl-8 space-y-12">
        {milestones.map((item, idx) => (
          <div key={idx} className="relative">
            {/* Timeline node */}
            <div className="absolute -left-[38px] top-1 bg-amber-500 border-4 border-[#0f1115] w-4 h-4 rounded-full" />
            
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-2">
              <span className="font-mono text-sm font-semibold text-amber-500">{item.year}</span>
              <h3 className="font-serif font-semibold text-lg text-slate-200">{item.title}</h3>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-2xl font-light">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
