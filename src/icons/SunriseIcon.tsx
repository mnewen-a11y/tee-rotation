/**
 * Sunrise Icon - Morgen (6-11h)
 * Minimalistische aufgehende Sonne mit Horizont
 */

interface IconProps {
  className?: string;
  size?: number;
}

export const SunriseIcon = ({ className = '', size = 20 }: IconProps) => {
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
      {/* Horizont */}
      <path d="M2 18h20" />
      
      {/* Sonne (halb) */}
      <circle cx="12" cy="18" r="5" />
      
      {/* Strahlen */}
      <path d="M12 2v3" />
      <path d="M19.07 4.93l-2.12 2.12" />
      <path d="M22 12h-3" />
      <path d="M4.93 4.93l2.12 2.12" />
      <path d="M2 12h3" />
    </svg>
  );
};
