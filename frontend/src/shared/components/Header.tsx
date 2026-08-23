import { LikeButton } from '../../features/like-button/LikeButton';

export function Header() {
  return (
    <header className="h-16 border-b border-white/5 flex items-center justify-center px-6 w-full flex-shrink-0 relative z-30 shadow-sm bg-transparent">
      
      {/* Centered Heart count support widget (floats above the rays and drops down) */}
      <div className="relative z-10 flex items-center justify-center">
        <LikeButton showPrompt={true} />
      </div>

    </header>
  );
}
export default Header;
