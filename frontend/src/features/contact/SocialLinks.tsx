import { Github, Linkedin, Mail } from 'lucide-react';

export function SocialLinks() {
  const links = [
    { name: 'GitHub', icon: <Github size={18} />, href: 'https://github.com/snehil1105' },
    { name: 'LinkedIn', icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/snehil-tripathi-38031131a/' },
    { name: 'Email', icon: <Mail size={18} />, href: 'mailto:snehilpy@gmail.com' },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 text-xs font-mono text-slate-400 hover:text-accent bg-white/5 border border-white/5 hover:border-accent/30 rounded-lg transition-all duration-200"
          aria-label={link.name}
        >
          {link.icon}
          <span>{link.name}</span>
        </a>
      ))}
    </div>
  );
}
