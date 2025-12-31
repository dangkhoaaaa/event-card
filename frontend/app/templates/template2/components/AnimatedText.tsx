'use client';

import { ReactNode } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface AnimatedTextProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  animationType?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';
}

export function AnimatedText({ 
  children, 
  delay = 0, 
  className = '',
  animationType = 'fadeIn'
}: AnimatedTextProps) {
  const { ref, isVisible } = useScrollAnimation();

  const animationClasses = {
    fadeIn: isVisible ? 'animate-fadeIn' : 'opacity-0',
    slideUp: isVisible ? 'animate-slideUp' : 'opacity-0 translate-y-10',
    slideLeft: isVisible ? 'animate-slideLeft' : 'opacity-0 translate-x-10',
    slideRight: isVisible ? 'animate-slideRight' : 'opacity-0 -translate-x-10',
    scale: isVisible ? 'animate-scaleIn' : 'opacity-0 scale-95',
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1500 ${animationClasses[animationType]} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

