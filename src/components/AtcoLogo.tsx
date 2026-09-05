import React from 'react';

interface AtcoLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
}

/**
 * Official Atco Laboratory Emblem (as provided in brand reference).
 * Features the signature circular mark divided into four corporate blue sectors
 * with a white central tree/arrow emblem of life and progress.
 */
export const AtcoLogo: React.FC<AtcoLogoProps> = ({
  className = 'w-10 h-10',
  size,
  showText = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${showText ? 'flex-col sm:flex-row' : ''}`}>
      <svg
        className={`${className} flex-shrink-0 drop-shadow-sm`}
        style={size ? { width: size, height: size } : undefined}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Atco Laboratory Official Logo"
        role="img"
      >
        {/* Crisp white backing ensuring the negative-space tree is solid white across any background */}
        <circle cx="50" cy="50" r="48" fill="#ffffff" />

        {/* Top-Left Corporate Blue Sail */}
        <path
          d="M 50 2 A 48 48 0 0 0 3.79 63 C 28 50, 46 22, 50 2 Z"
          fill="#0082cb"
        />

        {/* Top-Right Corporate Blue Sail */}
        <path
          d="M 50 2 A 48 48 0 0 1 96.21 63 C 72 50, 54 22, 50 2 Z"
          fill="#0082cb"
        />

        {/* Bottom-Left Corporate Blue Quadrant Block */}
        <path
          d="M 43 69 L 5.92 69 A 48 48 0 0 0 43 97.49 L 43 69 Z"
          fill="#0082cb"
        />

        {/* Bottom-Right Corporate Blue Quadrant Block */}
        <path
          d="M 57 69 L 94.08 69 A 48 48 0 0 1 57 97.49 L 57 69 Z"
          fill="#0082cb"
        />
      </svg>

      {showText && (
        <span className="font-black text-[#0082cb] tracking-wider text-sm sm:text-base leading-none">
          ATCO
        </span>
      )}
    </div>
  );
};
