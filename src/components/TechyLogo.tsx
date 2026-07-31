import React from 'react';

interface TechyLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  categoriesText?: string;
}

export const TechyLogo: React.FC<TechyLogoProps> = ({ className = '', size = 'md', categoriesText = 'COMPUTERS • TABLETS • PHONES' }) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-4xl sm:text-5xl'
  };

  return (
    <div className={`flex flex-col items-start select-none ${className}`}>
      <div className={`font-black tracking-tighter text-slate-900 flex items-center ${sizeClasses[size]}`}>
        <span>T</span>
        <span>e</span>
        <span className="relative inline-flex items-center justify-center text-sky-500 mx-[-0.05em]">
          e
          {/* Wrench icon inside the 'e' loop */}
          <svg 
            className="absolute w-[0.55em] h-[0.55em] text-sky-500 rotate-[-45deg] translate-y-[0.02em]" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        </span>
        <span>h</span>
        <span className="text-slate-900">y</span>
      </div>
      <div className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-sky-600 uppercase mt-[-2px]">
        {categoriesText}
      </div>
    </div>
  );
};
