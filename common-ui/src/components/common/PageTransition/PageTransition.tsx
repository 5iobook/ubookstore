import React, { useEffect, useState } from 'react';
import './PageTransition.css';

export type TransitionType = 
  | 'fade' 
  | 'slide-up' 
  | 'slide-down' 
  | 'slide-left' 
  | 'slide-right' 
  | 'scale' 
  | 'zoom';

export interface PageTransitionProps {
  children: React.ReactNode;
  type?: TransitionType;
  duration?: number;
  delay?: number;
  className?: string;
}

/**
 * PageTransition Component
 * 페이지 전환 애니메이션을 제공하는 래퍼 컴포넌트
 * 
 * @example
 * ```tsx
 * <PageTransition type="fade">
 *   <YourPage />
 * </PageTransition>
 * ```
 */
export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  type = 'fade',
  duration = 300,
  delay = 0,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  const transitionClass = `page-transition page-transition--${type}`;
  const visibleClass = isVisible ? 'page-transition--visible' : '';

  return (
    <div
      className={`${transitionClass} ${visibleClass} ${className}`}
      style={{
        animationDuration: `${duration}ms`,
        animationDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default PageTransition;
