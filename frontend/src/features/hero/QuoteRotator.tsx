import { useEffect, useState } from 'react';

const QUOTES = [
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "Clean code always looks like it was written by someone who cares.", author: "Michael Feathers" },
  { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" }
];

export function QuoteRotator() {
  const [quote, setQuote] = useState({ text: '', author: '' });

  useEffect(() => {
    const randomIdx = Math.floor(Math.random() * QUOTES.length);
    setQuote(QUOTES[randomIdx]);
  }, []);

  if (!quote.text) return null;

  return (
    <div className="relative bg-[#16181D] border border-white/5 rounded-[30px] px-8 py-6 max-w-md mx-auto shadow-2xl flex flex-col justify-center items-center min-h-[140px] z-10">
      
      {/* Speech Text */}
      <p className="italic text-slate-200 font-serif text-base text-center leading-relaxed mb-3">
        "{quote.text}"
      </p>
      
      {/* Author */}
      <p className="text-[10px] uppercase tracking-widest text-accent font-mono">
        — {quote.author}
      </p>

      {/* Speech Bubble Tail pointing down-left */}
      <div 
        className="absolute bottom-0 left-16 translate-y-[9px] rotate-[60deg] skew-x-[30deg] w-4 h-4 bg-[#16181D] border-r border-b border-white/5 z-0" 
      />
    </div>
  );
}
