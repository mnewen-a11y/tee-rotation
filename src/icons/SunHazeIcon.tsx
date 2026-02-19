/**
 * SunHaze Icon - Nachmittag (15-18h)
 * Sonne mit weniger intensiven Strahlen
 */

interface IconProps {
  className?: string;
  size?: number;
}

export const SunHazeIcon = ({ className = '', size = 20 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Zentrale Sonne */}
      <circle cx="12" cy="12" r="4" />
      
      {/* Weniger Strahlen (4 Richtungen) */}
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      
      {/* Dunst-Linien */}
      <path d="M4 18h4" opacity="0.5" />
      <path d="M16 18h4" opacity="0.5" />
      <path d="M4 6h4" opacity="0.5" />
      <path d="M16 6h4" opacity="0.5" />
    </svg>
  );
};
