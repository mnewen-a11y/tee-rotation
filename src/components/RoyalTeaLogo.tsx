import React from 'react';

interface RoyalTeaLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const RoyalTeaLogo: React.FC<RoyalTeaLogoProps> = ({ 
  size = 'md',
  showText = true 
}) => {
  const dimensions = {
    sm: { icon: 32, text: 'text-sm' },
    md: { icon: 40, text: 'text-base' },
    lg: { icon: 56, text: 'text-xl' }
  };

  const { icon, text } = dimensions[size];

  return (
    <div className="flex items-center gap-3">
      {/* Rolex-Style Crown Logo */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Crown Base Circle - Gold */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="#c6b975"
          stroke="#242b46"
          strokeWidth="2"
        />
        
        {/* Inner Circle - Darker Gold */}
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="#b8a665"
          opacity="0.3"
        />
        
        {/* Crown - Rolex Style */}
        <g transform="translate(50, 50)">
          {/* Center Peak */}
          <path
            d="M 0,-25 L 6,-10 L -6,-10 Z"
            fill="#242b46"
            stroke="#242b46"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          
          {/* Left Peak */}
          <path
            d="M -15,-20 L -9,-10 L -21,-10 Z"
            fill="#242b46"
            stroke="#242b46"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          
          {/* Right Peak */}
          <path
            d="M 15,-20 L 21,-10 L 9,-10 Z"
            fill="#242b46"
            stroke="#242b46"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          
          {/* Crown Base */}
          <rect
            x="-24"
            y="-10"
            width="48"
            height="8"
            fill="#242b46"
            rx="1"
          />
          
          {/* Tea Cup */}
          <g transform="translate(0, 8)">
            {/* Cup Body */}
            <path
              d="M -12,0 L -10,12 L 10,12 L 12,0 Z"
              fill="#242b46"
              stroke="#242b46"
              strokeWidth="1"
            />
            
            {/* Cup Handle */}
            <path
              d="M 12,3 Q 18,6 18,9 Q 18,12 12,9"
              fill="none"
              stroke="#242b46"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            
            {/* Steam Lines - Elegant */}
            <path
              d="M -5,-4 Q -5,-8 -3,-8"
              fill="none"
              stroke="#242b46"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M 0,-5 Q 0,-9 2,-9"
              fill="none"
              stroke="#242b46"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M 5,-4 Q 5,-8 7,-8"
              fill="none"
              stroke="#242b46"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>
        </g>
        
        {/* Outer Ring Decoration - Rolex Style */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="#242b46"
          strokeWidth="1"
          opacity="0.3"
        />
      </svg>

      {/* Text - Rolex Typography Style */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`font-bold tracking-wider ${text} text-white`}
                style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
            ROYAL-TEE
          </span>
          <span className="text-xs text-white/60 tracking-widest"
                style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
            SINCE 2026
          </span>
        </div>
      )}
    </div>
  );
};
