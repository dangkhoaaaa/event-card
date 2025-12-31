'use client';

import { ReactNode } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface AnimatedImageProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  animationType?: 'fadeIn' | 'slideUp' | 'zoomIn' | 'scale';
}

export function AnimatedImage({ 
  children, 
  delay = 0, 
  className = '',
  animationType = 'fadeIn'
}: AnimatedImageProps) {
  const { ref, isVisible } = useScrollAnimation();

  const animationClasses = {
    fadeIn: isVisible ? 'animate-fadeInSlow' : 'opacity-0',
    slideUp: isVisible ? 'animate-slideUpSlow' : 'opacity-0 translate-y-10',
    zoomIn: isVisible ? 'animate-zoomIn' : 'opacity-0 scale-95',
    scale: isVisible ? 'animate-scaleInSlow' : 'opacity-0 scale-90',
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1500 ${animationClasses[animationType]} ${className}`}
      style={{ transitionDelay: `${delay}ms`, position: 'relative' }}
    >
      {children}
    </div>
  );
}

