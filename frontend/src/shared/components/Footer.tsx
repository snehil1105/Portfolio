export function Footer() {
  return (
    <footer className="bg-[#0b0c10] py-12 px-6 border-t border-white/5 text-slate-500 font-mono text-xs">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Brand */}
        <div>
          <span className="text-slate-400 font-serif font-semibold text-sm">Snehil Tripathi</span>
          <span className="text-[10px] ml-2 text-slate-600">// Web Developer</span>
        </div>

        {/* Back to top & copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
          <a 
            href="#hero" 
            className="hover:text-accent transition-colors duration-200 uppercase tracking-widest text-[10px]"
          >
            Back to Top ↑
          </a>
          <span className="text-slate-600 text-[10px]">
            &copy; 2026 Snehil. All rights reserved.
          </span>
        </div>

      </div>
    </footer>
  );
}
