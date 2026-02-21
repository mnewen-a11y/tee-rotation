interface RoyalTeaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const RoyalTeaLogo = ({ className = '', size = 'md' }: RoyalTeaLogoProps) => {
  const sizes = {
    sm: 'h-7',
    md: 'h-12',
    lg: 'h-16',
  };

  return (
    <div className={`flex items-center gap-2 ${sizes[size]} ${className}`}>
      {/* Rolex-Style Crown */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 100 100"
        className="h-full w-auto"
        role="img" 
        aria-label="Crown"
      >
        <g transform="translate(50, 50)">
          {/* Crown - Rolex Style (flat, elegant) */}
          
          {/* Base */}
          <path 
            d="M -35 20 L -30 25 L 30 25 L 35 20 Z"
            fill="#C6B975"
          />
          
          {/* Center Point */}
          <path 
            d="M 0 -35 L 8 -10 L -8 -10 Z"
            fill="#C6B975"
          />
          
          {/* Left Point */}
          <path 
            d="M -25 -20 L -17 0 L -33 0 Z"
            fill="#C6B975"
          />
          
          {/* Right Point */}
          <path 
            d="M 25 -20 L 33 0 L 17 0 Z"
            fill="#C6B975"
          />
          
          {/* Crown Body - connecting all points */}
          <path 
            d="M -33 0 L -30 20 L -10 15 L 0 -10 L 10 15 L 30 20 L 33 0 L 25 -20 L 10 -5 L 0 -35 L -10 -5 L -25 -20 Z"
            fill="#C6B975"
            opacity="0.95"
          />
          
          {/* Highlight lines for depth (Rolex style) */}
          <path 
            d="M 0 -35 L 0 -10"
            stroke="#D4C47E"
            strokeWidth="1.5"
            opacity="0.4"
          />
          <path 
            d="M -25 -20 L -10 -5"
            stroke="#D4C47E"
            strokeWidth="1.5"
            opacity="0.4"
          />
          <path 
            d="M 25 -20 L 10 -5"
            stroke="#D4C47E"
            strokeWidth="1.5"
            opacity="0.4"
          />
        </g>
      </svg>
      
      {/* Royal-Tea Text */}
      <span 
        className="font-serif font-bold tracking-wide text-white"
        style={{
          fontFamily: '-apple-system, "Playfair Display", "Times New Roman", serif',
          fontSize: size === 'sm' ? '1.125rem' : size === 'md' ? '1.5rem' : '2rem',
          letterSpacing: '0.05em'
        }}
      >
        Royal-Tea
      </span>
    </div>
  );
};
