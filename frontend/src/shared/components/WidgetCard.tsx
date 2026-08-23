import React from 'react';

interface WidgetCardProps {
  children: React.ReactNode;
  className?: string;
}

export function WidgetCard({ children, className = '' }: WidgetCardProps) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-[#131720]/45 backdrop-blur-md p-6 shadow-xl transition-all duration-300 hover:border-amber-500/30 ${className}`}>
      {children}
    </div>
  );
}
