interface RoyalTeaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const RoyalTeaLogo = ({ className = '', size = 'md' }: RoyalTeaLogoProps) => {
  const sizes = {
    sm: 'w-32 h-16',
    md: 'w-48 h-24',
    lg: 'w-64 h-32',
  };

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 1200 600" 
      role="img" 
      aria-label="Royal-Tea Logo"
      className={`${sizes[size]} ${className}`}
    >
      <defs>
        <style>
          {`.word { fill: #ffffff; font-family: 'Playfair Display', 'Cormorant Garamond', 'Times New Roman', serif; font-weight: 700; letter-spacing: 0.02em; }`}
        </style>
      </defs>
      {/* Tea leaf above the hyphen */}
      <g transform="translate(600,160)">
        {/* Leaf body */}
        <path 
          d="M 0 -70 C 28 -60, 56 -28, 56 0 C 56 42, 20 78, 0 96 C -20 78, -56 42, -56 0 C -56 -28, -28 -60, 0 -70 Z"
          fill="#c6b975"
        />
        {/* Central vein */}
        <path 
          d="M 0 -60 L 0 80" 
          stroke="#a99e61" 
          strokeWidth="4" 
          strokeLinecap="round" 
          opacity="0.7"
        />
        {/* Side veins */}
        <path 
          d="M 0 -24 C 18 -16, 30 -6, 42 10" 
          stroke="#a99e61" 
          strokeWidth="3" 
          fill="none" 
          opacity="0.5"
        />
        <path 
          d="M 0 8 C -16 16, -28 28, -40 46" 
          stroke="#a99e61" 
          strokeWidth="3" 
          fill="none" 
          opacity="0.5"
        />
      </g>
      {/* Wordmark - moved down significantly for more spacing */}
      <text className="word" x="50%" y="450" fontSize="140" textAnchor="middle">
        ROYAL-TEA
      </text>
    </svg>
  );
};
