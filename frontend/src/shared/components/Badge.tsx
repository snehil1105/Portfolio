import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono border border-slate-300/60 dark:border-white/10 bg-slate-200/50 dark:bg-white/5 text-slate-600 dark:text-slate-300 transition-colors duration-200 hover:border-accent hover:text-accent ${className}`}>
      {children}
    </span>
  );
}
