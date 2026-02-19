/**
 * Sun Icon - Mittag (11-15h)
 * Volle Sonne mit Strahlen
 */

interface IconProps {
  className?: string;
  size?: number;
}

export const SunIcon = ({ className = '', size = 20 }: IconProps) => {
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
      
      {/* Strahlen (8 Richtungen) */}
      <path d="M12 2v3" />
      <path d="M12 19v3" />
      <path d="M4.22 4.22l2.12 2.12" />
      <path d="M17.66 17.66l2.12 2.12" />
      <path d="M2 12h3" />
      <path d="M19 12h3" />
      <path d="M4.22 19.78l2.12-2.12" />
      <path d="M17.66 6.34l2.12-2.12" />
    </svg>
  );
};
